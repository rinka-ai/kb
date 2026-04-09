import { relative } from "node:path";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import * as z from "zod/v4";
import { ingestSource } from "../../core/ingest";
import { ROOT } from "../../core/paths";
import { toolErrorResponse, toolResponse } from "./shared";

export function registerIngestTool(
  server: McpServer,
  enableWrites: boolean,
): void {
  server.registerTool(
    "kb_ingest",
    {
      title: "Ingest Source Into KB",
      description:
        "Import a URL or local file into the KB source-note schema and optionally rebuild the index.",
      inputSchema: {
        url: z.url().optional().describe("Remote URL to ingest."),
        filePath: z.string().optional().describe("Local file path to ingest."),
        collection: z
          .string()
          .optional()
          .describe("Optional subdirectory under raw/articles/."),
        tags: z
          .array(z.string())
          .optional()
          .describe("Tags to attach to the new note."),
        title: z.string().optional().describe("Optional title override."),
        author: z.string().optional().describe("Optional author override."),
        publisher: z
          .string()
          .optional()
          .describe("Optional publisher override."),
        published: z
          .string()
          .optional()
          .describe("Optional published date override in YYYY-MM-DD format."),
        noRefresh: z
          .boolean()
          .optional()
          .describe("Skip index rebuild after writing the note."),
        dryRun: z
          .boolean()
          .optional()
          .describe("Return the markdown without writing the file."),
      },
    },
    async ({
      url,
      filePath,
      collection,
      tags = [],
      title,
      author,
      publisher,
      published,
      noRefresh = false,
      dryRun = false,
    }) => {
      if (!enableWrites) {
        return toolErrorResponse(
          "kb_ingest is disabled on this MCP server. Shared HTTP deployments should stay read-only; use the git/PR workflow or a local writable MCP server for ingestion.",
          { enableWrites },
        );
      }

      if (!url && !filePath) {
        return toolErrorResponse("Provide either url or filePath.");
      }

      try {
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

        const text = [
          `Title: ${result.source.title}`,
          `Author: ${result.source.author || "Unknown"}`,
          `Publisher: ${result.source.publisher || "Unknown"}`,
          ...(result.outputPath ? [`Output path: ${result.outputPath}`] : []),
          ...(result.refreshed && result.chunkCount !== undefined
            ? [`KB chunks after refresh: ${result.chunkCount}`]
            : []),
          "",
          result.markdown,
        ].join("\n");

        return toolResponse(text, {
          outputPath: result.outputPath
            ? relative(ROOT, result.outputPath)
            : undefined,
          refreshed: result.refreshed,
          chunkCount: result.chunkCount,
          source: result.source,
        });
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        return toolErrorResponse(`KB ingest failed: ${message}`, { message });
      }
    },
  );
}
