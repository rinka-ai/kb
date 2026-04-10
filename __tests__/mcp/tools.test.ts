import { describe, expect, test } from "bun:test";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerKbTools } from "../../src/mcp/tools";
import { FakeMcpServer } from "../helpers/fake-mcp-server";

interface ToolResult {
  content: Array<{ text: string }>;
  structuredContent: Record<string, unknown>;
}

function withTempFile<T>(
  content: string,
  extension: string,
  run: (filePath: string) => Promise<T>,
): Promise<T> {
  const directory = mkdtempSync(join(tmpdir(), "ai-research-kb-mcp-tools-"));
  const filePath = join(directory, `fixture${extension}`);
  writeFileSync(filePath, content);
  return run(filePath).finally(() => {
    rmSync(directory, { recursive: true, force: true });
  });
}

describe("mcp tools", () => {
  test("registers the expected KB tool surface", () => {
    const server = new FakeMcpServer();
    registerKbTools(server as unknown as McpServer, { enableWrites: false });

    expect([...server.tools.keys()].sort()).toEqual([
      "kb_build_context",
      "kb_deep_read",
      "kb_find_gaps",
      "kb_ingest",
      "kb_list_catalog",
      "kb_make_handoff",
      "kb_read_note",
      "kb_refresh",
      "kb_search",
      "kb_search_file",
      "kb_trace_claim",
    ]);
  });

  test("kb_list_catalog returns paginated catalog entries", async () => {
    const server = new FakeMcpServer();
    registerKbTools(server as unknown as McpServer, { enableWrites: false });

    const result = (await server.tools.get("kb_list_catalog")?.handler({
      page: 1,
      pageSize: 5,
      pathPrefix: "raw/articles/anthropic-engineering",
      includeSuperseded: false,
      rebuildIfStale: false,
    })) as ToolResult | undefined;

    const items = result?.structuredContent.items as Array<{ path: string }> | undefined;
    expect(Array.isArray(items)).toBe(true);
    expect(items?.length ?? 0).toBeLessThanOrEqual(5);
    expect(
      items?.every((entry) => entry.path.startsWith("raw/articles/anthropic-engineering")),
    ).toBe(true);
    expect(result?.content[0].text).toContain("Catalog page 1/");
  });

  test("kb_build_context returns a structured context pack", async () => {
    const server = new FakeMcpServer();
    registerKbTools(server as unknown as McpServer, { enableWrites: false });

    const result = (await server.tools.get("kb_build_context")?.handler({
      query: "managed agents",
      top: 4,
      includeSuperseded: false,
      rebuildIfStale: false,
    })) as ToolResult | undefined;

    expect(Array.isArray(result?.structuredContent.notes)).toBe(true);
    expect(result?.content[0].text).toContain("Context pack for: managed agents");
  });

  test("kb_build_context supports compact output for token-sensitive clients", async () => {
    const server = new FakeMcpServer();
    registerKbTools(server as unknown as McpServer, { enableWrites: false });

    const result = (await server.tools.get("kb_build_context")?.handler({
      query: "managed agents",
      top: 4,
      compact: true,
      includeSuperseded: false,
      rebuildIfStale: false,
    })) as ToolResult | undefined;

    expect(Array.isArray(result?.structuredContent.recommendedReadOrder)).toBe(true);
    expect("notes" in (result?.structuredContent ?? {})).toBe(false);
    expect(result?.content[0].text).toContain("Compact context pack for: managed agents");
  });

  test("kb_find_gaps returns health-check categories", async () => {
    const server = new FakeMcpServer();
    registerKbTools(server as unknown as McpServer, { enableWrites: false });

    const result = (await server.tools.get("kb_find_gaps")?.handler({
      limit: 5,
      minConceptSources: 2,
      minTagOccurrences: 2,
    })) as ToolResult | undefined;

    expect(Array.isArray(result?.structuredContent.suggestedActions)).toBe(true);
    expect(result?.content[0].text).toContain("KB Gap Report");
  });

  test("kb_trace_claim returns provenance-oriented evidence", async () => {
    const server = new FakeMcpServer();
    registerKbTools(server as unknown as McpServer, { enableWrites: false });

    const result = (await server.tools.get("kb_trace_claim")?.handler({
      claim: "managed agents separate durable sessions from sandboxes",
      top: 4,
      includeSuperseded: false,
      rebuildIfStale: false,
    })) as ToolResult | undefined;

    expect(Array.isArray(result?.structuredContent.evidence)).toBe(true);
    expect(result?.content[0].text).toContain("Claim trace:");
  });

  test("kb_make_handoff returns a structured handoff packet", async () => {
    const server = new FakeMcpServer();
    registerKbTools(server as unknown as McpServer, { enableWrites: false });

    const result = (await server.tools.get("kb_make_handoff")?.handler({
      goal: "Prepare a managed-agents brief",
      query: "managed agents",
      top: 4,
      includeSuperseded: false,
      rebuildIfStale: false,
    })) as ToolResult | undefined;

    expect(Array.isArray(result?.structuredContent.readFirst)).toBe(true);
    expect(result?.content[0].text).toContain("Handoff goal:");
  });

  test("kb_search returns the expected wrapper shape for a query", async () => {
    const server = new FakeMcpServer();
    registerKbTools(server as unknown as McpServer, { enableWrites: false });

    const result = (await server.tools.get("kb_search")?.handler({
      query: "LLM Knowledge Bases",
      top: 3,
      includeSuperseded: false,
      rebuildIfStale: false,
    })) as ToolResult | undefined;

    const results = result?.structuredContent.results as Array<unknown> | undefined;
    expect(Array.isArray(results)).toBe(true);
    expect(result?.structuredContent.query).toBe("LLM Knowledge Bases");
    expect(result?.content[0].text).toContain("Query: LLM Knowledge Bases");
  });

  test("kb_read_note returns structured note content", async () => {
    const server = new FakeMcpServer();
    registerKbTools(server as unknown as McpServer, { enableWrites: false });

    const result = (await server.tools.get("kb_read_note")?.handler({
      path: "2026-04-08-llm-knowledge-bases",
      maxChars: 500,
    })) as ToolResult | undefined;

    expect(result?.structuredContent.path).toBe("raw/articles/2026-04-08-llm-knowledge-bases.md");
    expect(result?.content[0].text).toContain("Title: LLM Knowledge Bases");
  });

  test("kb_read_note allows small maxChars values for cheap previews", async () => {
    const server = new FakeMcpServer();
    registerKbTools(server as unknown as McpServer, { enableWrites: false });

    const result = (await server.tools.get("kb_read_note")?.handler({
      path: "2026-04-08-llm-knowledge-bases",
      maxChars: 100,
    })) as ToolResult | undefined;

    expect(result?.content[0].text).toContain("Title: LLM Knowledge Bases");
    expect(result?.structuredContent.truncated).toBe(true);
  });

  test("kb_refresh returns current index stats", async () => {
    const server = new FakeMcpServer();
    registerKbTools(server as unknown as McpServer, { enableWrites: false });

    const result = (await server.tools.get("kb_refresh")?.handler({})) as ToolResult | undefined;

    expect((result?.structuredContent.chunkCount as number | undefined) ?? 0).toBeGreaterThan(0);
    expect((result?.structuredContent.fileCount as number | undefined) ?? 0).toBeGreaterThan(0);
  });

  test("kb_search_file accepts raw text context for remote MCP use", async () => {
    const server = new FakeMcpServer();
    registerKbTools(server as unknown as McpServer, { enableWrites: false });

    const result = (await server.tools.get("kb_search_file")?.handler({
      text: "managed agents sandbox durable sessions context engineering",
      contextLabel: "managed-agents-brief.md",
      top: 3,
      includeSuperseded: false,
      rebuildIfStale: false,
    })) as ToolResult | undefined;

    expect(result?.structuredContent.contextLabel).toBe("managed-agents-brief.md");
    expect(result?.content[0].text).toContain("Context: managed-agents-brief.md");
  });

  test("kb_search_file returns a clear remote-host hint for missing file paths", async () => {
    const server = new FakeMcpServer();
    registerKbTools(server as unknown as McpServer, { enableWrites: false });

    const result = (await server.tools.get("kb_search_file")?.handler({
      filePath: "/definitely/not/on/the/server.ts",
      top: 3,
      includeSuperseded: false,
      rebuildIfStale: false,
    })) as { content: Array<{ text: string }>; isError?: boolean } | undefined;

    expect(result?.isError).toBe(true);
    expect(result?.content[0].text).toContain("File not found on MCP host");
    expect(result?.content[0].text).toContain("Pass text instead");
  });

  test("kb_ingest is blocked when writes are disabled", async () => {
    const server = new FakeMcpServer();
    registerKbTools(server as unknown as McpServer, { enableWrites: false });

    const result = (await server.tools.get("kb_ingest")?.handler({
      filePath: "/tmp/example.md",
      dryRun: true,
    })) as { content: Array<{ text: string }>; isError?: boolean } | undefined;

    expect(result?.isError).toBe(true);
    expect(result?.content[0].text).toContain("kb_ingest is disabled on this MCP server");
  });

  test("kb_ingest supports dry-run when writes are enabled", async () => {
    await withTempFile(
      `# MCP Ingest Fixture

This fixture exists to prove the MCP ingest tool can render a source note in dry-run mode.

Another paragraph keeps the extracted content substantial enough for ingestion heuristics.
`,
      ".md",
      async (filePath) => {
        const server = new FakeMcpServer();
        registerKbTools(server as unknown as McpServer, { enableWrites: true });

        const result = (await server.tools.get("kb_ingest")?.handler({
          filePath,
          collection: "mcp-dry-run",
          tags: ["agents"],
          dryRun: true,
        })) as ToolResult | undefined;

        expect(result?.structuredContent.outputPath).toBeUndefined();
        expect(result?.content[0].text).toContain("Title: MCP Ingest Fixture");
        expect(result?.content[0].text).toContain("path: raw/articles/mcp-dry-run/");
      },
    );
  });

  test("kb_deep_read is blocked when writes are disabled", async () => {
    const server = new FakeMcpServer();
    registerKbTools(server as unknown as McpServer, { enableWrites: false });

    const result = (await server.tools.get("kb_deep_read")?.handler({
      sourcePaths: [
        "raw/articles/arxiv/2026-04-10-react-synergizing-reasoning-and-acting-in-language-models.md",
      ],
      dryRun: true,
    })) as { content: Array<{ text: string }>; isError?: boolean } | undefined;

    expect(result?.isError).toBe(true);
    expect(result?.content[0].text).toContain("kb_deep_read is disabled on this MCP server");
  });

  test("kb_deep_read supports dry-run when writes are enabled", async () => {
    await withTempFile(
      `# Deep read companion notes

This file captures only the high-signal notes from a closer read of the paper.

- The evaluation section matters because it spans both retrieval and interactive environments.
- Failure recovery is one of the clearest reasons to keep reasoning traces visible.
`,
      ".md",
      async (filePath) => {
        const server = new FakeMcpServer();
        registerKbTools(server as unknown as McpServer, { enableWrites: true });

        const result = (await server.tools.get("kb_deep_read")?.handler({
          sourcePaths: [
            "raw/articles/arxiv/2026-04-10-react-synergizing-reasoning-and-acting-in-language-models.md",
          ],
          filePath,
          focus: ["method", "evals"],
          dryRun: true,
        })) as ToolResult | undefined;

        expect(result?.structuredContent.outputPath).toBeUndefined();
        expect(result?.content[0].text).toContain(
          "Title: ReAct: Synergizing Reasoning and Acting in Language Models Deep Read",
        );
        expect(result?.content[0].text).toContain("## Deep-Read Evidence");
      },
    );
  });
});
