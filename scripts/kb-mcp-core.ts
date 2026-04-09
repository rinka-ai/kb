import { existsSync, readFileSync } from "node:fs";
import { isAbsolute, relative, resolve } from "node:path";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import * as z from "zod/v4";
import { ingestSource } from "./kb-ingest";
import { ROOT, extractTitle, listMarkdownFiles, parseFrontmatter } from "./kb-lib";
import { collectKbWarnings } from "./kb-lint";
import { formatRefreshResults, refreshKb } from "./kb-refresh";
import { ensureIndex, formatSearchResults, searchKb } from "./kb-search";

export const KB_MCP_SERVER_NAME = "ai-research-kb";
export const KB_MCP_SERVER_VERSION = "1.1.0";

export interface CreateKbMcpServerOptions {
  enableWrites?: boolean;
}

function toJson(value: unknown): string {
  return JSON.stringify(value, null, 2);
}

function listDocumentCatalog() {
  return listMarkdownFiles().map((file) => {
    const relPath = relative(ROOT, file);
    const raw = readFileSync(file, "utf-8");
    const { metadata, body } = parseFrontmatter(raw);
    const title = extractTitle(metadata, body, relPath.replace(/\.md$/, ""));
    const tags = Array.isArray(metadata.tags) ? metadata.tags : [];
    const type = typeof metadata.type === "string" ? metadata.type : "";
    const summary = typeof metadata.summary === "string" ? metadata.summary : "";

    return {
      path: relPath,
      title,
      type,
      status: typeof metadata.status === "string" ? metadata.status : "",
      superseded_by: typeof metadata.superseded_by === "string" ? metadata.superseded_by : "",
      tags,
      summary,
    };
  });
}

function resolveKbNotePath(inputPath: string): string {
  const trimmed = inputPath.trim();
  const directPath = isAbsolute(trimmed) ? resolve(trimmed) : resolve(ROOT, trimmed);
  if (existsSync(directPath) && directPath.startsWith(ROOT)) {
    return directPath;
  }

  const normalized = trimmed.replace(/^\.\//, "").replace(/\.md$/, "");
  const matches = listMarkdownFiles().filter((file) => {
    const relPath = relative(ROOT, file);
    return (
      relPath === normalized ||
      relPath === `${normalized}.md` ||
      relPath.replace(/\.md$/, "") === normalized ||
      relPath.split("/").at(-1)?.replace(/\.md$/, "") === normalized
    );
  });

  if (matches.length === 1) {
    return matches[0];
  }

  if (matches.length > 1) {
    const candidates = matches.map((match) => relative(ROOT, match)).join(", ");
    throw new Error(`Multiple KB notes matched "${trimmed}": ${candidates}`);
  }

  throw new Error(`KB note not found: ${trimmed}`);
}

function readKbNote(inputPath: string, maxChars = 24000) {
  const absolutePath = resolveKbNotePath(inputPath);
  const relPath = relative(ROOT, absolutePath);
  const raw = readFileSync(absolutePath, "utf-8");
  const { metadata, body } = parseFrontmatter(raw);
  const title = extractTitle(metadata, body, relPath.replace(/\.md$/, ""));
  const truncated = raw.length > maxChars;
  const text = truncated ? `${raw.slice(0, maxChars)}\n\n[truncated]` : raw;

  return {
    path: relPath,
    title,
    metadata,
    text,
    truncated,
  };
}

function formatRefreshSummary() {
  const index = ensureIndex(true);
  const warnings = collectKbWarnings();
  return {
    generatedAt: index.generated_at,
    chunkCount: index.chunk_count,
    fileCount: index.file_count,
    warnings,
  };
}

export function createKbMcpServer(options: CreateKbMcpServerOptions = {}): McpServer {
  const enableWrites = options.enableWrites ?? true;
  const server = new McpServer({
    name: KB_MCP_SERVER_NAME,
    version: KB_MCP_SERVER_VERSION,
  });

  server.registerTool(
    "kb_search",
    {
      title: "Search KB",
      description:
        "Search the AI research knowledge base by free-text query. Use this first when you need relevant notes, concepts, or source articles.",
      inputSchema: {
        query: z.string().min(2).describe("Search query to run against the KB."),
        top: z.number().int().min(1).max(20).optional().describe("Maximum number of results."),
        includeSuperseded: z
          .boolean()
          .optional()
          .describe("Include notes marked as superseded. Defaults to false."),
        rebuildIfStale: z
          .boolean()
          .optional()
          .describe("Rebuild the derived KB index automatically if markdown files changed."),
      },
    },
    async ({ query, top = 8, includeSuperseded = false, rebuildIfStale = true }) => {
      const response = searchKb({
        query,
        top,
        json: false,
        includeSuperseded,
        rebuildIfStale,
      });

      return {
        content: [{ type: "text", text: formatSearchResults(response) }],
        structuredContent: { ...response } as Record<string, unknown>,
      };
    },
  );

  server.registerTool(
    "kb_search_file",
    {
      title: "Search KB From File Context",
      description:
        "Search the KB using the contents of a local file as context. Useful when you are already working in a code or markdown file.",
      inputSchema: {
        filePath: z
          .string()
          .min(1)
          .describe("Absolute path to the local file whose contents should seed retrieval."),
        top: z.number().int().min(1).max(20).optional().describe("Maximum number of results."),
        includeSuperseded: z
          .boolean()
          .optional()
          .describe("Include notes marked as superseded. Defaults to false."),
        rebuildIfStale: z
          .boolean()
          .optional()
          .describe("Rebuild the derived KB index automatically if markdown files changed."),
      },
    },
    async ({ filePath, top = 8, includeSuperseded = false, rebuildIfStale = true }) => {
      const response = searchKb({
        file: filePath,
        top,
        json: false,
        includeSuperseded,
        rebuildIfStale,
      });

      return {
        content: [{ type: "text", text: formatSearchResults(response) }],
        structuredContent: { ...response } as Record<string, unknown>,
      };
    },
  );

  server.registerTool(
    "kb_read_note",
    {
      title: "Read KB Note",
      description:
        "Read a KB markdown note by relative path, basename slug, or absolute path. Use paths returned by kb_search when possible.",
      inputSchema: {
        path: z
          .string()
          .min(1)
          .describe("KB-relative path, basename slug, or absolute path to a markdown note."),
        maxChars: z
          .number()
          .int()
          .min(500)
          .max(100000)
          .optional()
          .describe("Maximum number of characters to return from the note."),
      },
    },
    async ({ path, maxChars = 24000 }) => {
      const note = readKbNote(path, maxChars);
      const header = [
        `Path: ${note.path}`,
        `Title: ${note.title}`,
        `Truncated: ${note.truncated}`,
      ].join("\n");

      return {
        content: [{ type: "text", text: `${header}\n\n${note.text}` }],
        structuredContent: { ...note } as Record<string, unknown>,
      };
    },
  );

  server.registerTool(
    "kb_refresh",
    {
      title: "Refresh KB",
      description:
        "Rebuild the derived KB index and run lint checks. Use this after changing markdown notes or wiki pages.",
    },
    async () => {
      const response = refreshKb();

      return {
        content: [{ type: "text", text: formatRefreshResults(response) }],
        structuredContent: {
          chunkCount: response.index.chunk_count,
          fileCount: response.index.file_count,
          generatedAt: response.index.generated_at,
          warnings: response.warnings,
          message:
            response.warnings.length === 0
              ? "KB refresh complete."
              : "KB refresh complete with lint warnings.",
        },
      };
    },
  );

  server.registerTool(
    "kb_ingest",
    {
      title: "Ingest Source Into KB",
      description:
        "Import a URL or local file into the KB source-note schema and optionally rebuild the index.",
      inputSchema: {
        url: z.string().url().optional().describe("Remote URL to ingest."),
        filePath: z.string().optional().describe("Local file path to ingest."),
        collection: z.string().optional().describe("Optional subdirectory under raw/articles/."),
        tags: z.array(z.string()).optional().describe("Tags to attach to the new note."),
        title: z.string().optional().describe("Optional title override."),
        author: z.string().optional().describe("Optional author override."),
        publisher: z.string().optional().describe("Optional publisher override."),
        published: z
          .string()
          .optional()
          .describe("Optional published date override in YYYY-MM-DD format."),
        noRefresh: z.boolean().optional().describe("Skip index rebuild after writing the note."),
        dryRun: z.boolean().optional().describe("Return the markdown without writing the file."),
      },
    },
    async ({
      author,
      collection,
      dryRun = false,
      filePath,
      noRefresh = false,
      published,
      publisher,
      tags = [],
      title,
      url,
    }) => {
      if (!enableWrites) {
        throw new Error(
          "kb_ingest is disabled on this MCP server. Enable writes explicitly or use the git/PR workflow for shared KB updates.",
        );
      }

      if (!url && !filePath) {
        throw new Error("Provide either url or filePath.");
      }

      const result = await ingestSource({
        url,
        file: filePath,
        collection,
        tags,
        title,
        author,
        publisher,
        published,
        dryRun,
        stdout: false,
        noRefresh,
      });

      const lines = [
        `Title: ${result.source.title}`,
        `Author: ${result.source.author || "Unknown"}`,
        `Publisher: ${result.source.publisher || "Unknown"}`,
      ];
      if (result.outputPath) {
        lines.push(`Output path: ${result.outputPath}`);
      }
      if (result.refreshed && result.chunkCount !== undefined) {
        lines.push(`KB chunks after refresh: ${result.chunkCount}`);
      }
      lines.push("");
      lines.push(result.markdown);

      return {
        content: [{ type: "text", text: lines.join("\n") }],
        structuredContent: {
          outputPath: result.outputPath ? relative(ROOT, result.outputPath) : undefined,
          refreshed: result.refreshed,
          chunkCount: result.chunkCount,
          source: result.source,
        },
      };
    },
  );

  server.registerResource(
    "kb-stats",
    "kb://stats",
    {
      title: "KB Stats",
      description: "High-level metadata about the knowledge base.",
      mimeType: "application/json",
    },
    async () => {
      const payload = formatRefreshSummary();
      return {
        contents: [{ uri: "kb://stats", text: toJson(payload) }],
      };
    },
  );

  server.registerResource(
    "kb-catalog",
    "kb://catalog",
    {
      title: "KB Catalog",
      description: "Flat list of markdown documents available in the knowledge base.",
      mimeType: "application/json",
    },
    async () => {
      const payload = listDocumentCatalog();
      return {
        contents: [{ uri: "kb://catalog", text: toJson(payload) }],
      };
    },
  );

  return server;
}
