import { describe, expect, test } from "bun:test";
import { setTimeout as delay } from "node:timers/promises";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";
import { ROOT } from "../../src/core/paths";
import { KB_MCP_SERVER_NAME } from "../../src/mcp/constants";
import { findFreePort, startBunCommand, waitForHttp } from "../helpers/bun-process";

function resourceText(result: unknown): string {
  const record =
    typeof result === "object" && result !== null ? (result as Record<string, unknown>) : {};
  const contents = Array.isArray(record.contents) ? record.contents : [];

  return contents
    .flatMap((entry) =>
      typeof entry === "object" &&
      entry !== null &&
      "text" in entry &&
      typeof entry.text === "string"
        ? [entry.text]
        : [],
    )
    .join("\n");
}

function toolText(result: unknown): string {
  const record =
    typeof result === "object" && result !== null ? (result as Record<string, unknown>) : {};
  const content = Array.isArray(record.content) ? record.content : [];

  return content
    .flatMap((entry) =>
      typeof entry === "object" &&
      entry !== null &&
      "type" in entry &&
      entry.type === "text" &&
      "text" in entry &&
      typeof entry.text === "string"
        ? [entry.text]
        : [],
    )
    .join("\n");
}

async function waitForSessionCount(
  port: number,
  expected: number,
  timeoutMs = 5_000,
): Promise<void> {
  const deadline = Date.now() + timeoutMs;

  while (Date.now() < deadline) {
    const response = await fetch(`http://127.0.0.1:${port}/health`);
    if (response.ok) {
      const body = (await response.json()) as { sessions?: number };
      if (body.sessions === expected) {
        return;
      }
    }

    await delay(100);
  }

  throw new Error(`Timed out waiting for /health sessions=${expected}`);
}

describe("MCP transport integration", () => {
  test("stdio transport serves tools and resources end to end", async () => {
    const transport = new StdioClientTransport({
      command: process.execPath,
      args: ["bin/mcp.ts"],
      cwd: ROOT,
      stderr: "pipe",
    });
    const client = new Client({ name: "kb-stdio-smoke", version: "0.0.0" });

    try {
      await client.connect(transport);

      const tools = await client.listTools();
      expect(tools.tools.some((tool) => tool.name === "kb_build_context")).toBe(true);
      expect(tools.tools.some((tool) => tool.name === "kb_find_gaps")).toBe(true);
      expect(tools.tools.some((tool) => tool.name === "kb_make_handoff")).toBe(true);
      expect(tools.tools.some((tool) => tool.name === "kb_search")).toBe(true);
      expect(tools.tools.some((tool) => tool.name === "kb_list_catalog")).toBe(true);
      expect(tools.tools.some((tool) => tool.name === "kb_read_note")).toBe(true);
      expect(tools.tools.some((tool) => tool.name === "kb_trace_claim")).toBe(true);

      const stats = await client.readResource({ uri: "kb://stats" });
      expect(resourceText(stats)).toContain('"chunkCount"');
      expect(resourceText(stats)).toContain('"fileCount"');

      const catalog = await client.readResource({ uri: "kb://catalog" });
      expect(resourceText(catalog)).toContain('"totalDocuments"');

      const search = await client.callTool({
        name: "kb_search",
        arguments: { query: "managed agents", top: 1 },
      });
      expect(toolText(search)).toContain("Query: managed agents");
    } finally {
      await transport.close();
    }
  });

  test("streamable HTTP transport serves health, tools, and resources end to end", async () => {
    const port = await findFreePort();
    const server = startBunCommand(["bin/mcp-http.ts"], {
      HOST: "127.0.0.1",
      PORT: String(port),
      KB_STATEFUL_SESSIONS: "true",
      KB_ENABLE_WRITES: "false",
    });

    try {
      const health = await waitForHttp(`http://127.0.0.1:${port}/health`);
      const healthPayload = (await health.json()) as { ok: boolean; name: string };

      expect(healthPayload.ok).toBe(true);
      expect(healthPayload.name).toBe(KB_MCP_SERVER_NAME);

      const root = await fetch(`http://127.0.0.1:${port}/`);
      const rootPayload = (await root.json()) as { name: string; transport: string };
      expect(root.ok).toBe(true);
      expect(rootPayload.name).toBe(KB_MCP_SERVER_NAME);
      expect(rootPayload.transport).toBe("streamable-http");

      const transport = new StreamableHTTPClientTransport(new URL(`http://127.0.0.1:${port}/mcp`));
      const client = new Client({ name: "kb-http-smoke", version: "0.0.0" });

      try {
        await client.connect(transport);

        const tools = await client.listTools();
        expect(tools.tools.some((tool) => tool.name === "kb_build_context")).toBe(true);
        expect(tools.tools.some((tool) => tool.name === "kb_find_gaps")).toBe(true);
        expect(tools.tools.some((tool) => tool.name === "kb_make_handoff")).toBe(true);
        expect(tools.tools.some((tool) => tool.name === "kb_search")).toBe(true);
        expect(tools.tools.some((tool) => tool.name === "kb_list_catalog")).toBe(true);
        expect(tools.tools.some((tool) => tool.name === "kb_trace_claim")).toBe(true);

        const stats = await client.readResource({ uri: "kb://stats" });
        expect(resourceText(stats)).toContain('"generatedAt"');

        const catalog = await client.readResource({ uri: "kb://catalog" });
        expect(resourceText(catalog)).toContain('"sample"');

        const note = await client.callTool({
          name: "kb_read_note",
          arguments: { path: "2026-04-08-llm-knowledge-bases", maxChars: 1_200 },
        });
        expect(toolText(note)).toContain("Title: LLM Knowledge Bases");
      } finally {
        await transport.terminateSession().catch(() => undefined);
        await transport.close();
      }
    } finally {
      await server.stop();
    }
  });

  test("streamable HTTP session termination does not crash the server", async () => {
    const port = await findFreePort();
    const server = startBunCommand(["bin/mcp-http.ts"], {
      HOST: "127.0.0.1",
      PORT: String(port),
      KB_STATEFUL_SESSIONS: "true",
      KB_ENABLE_WRITES: "false",
    });

    try {
      await waitForHttp(`http://127.0.0.1:${port}/health`);

      const transport = new StreamableHTTPClientTransport(new URL(`http://127.0.0.1:${port}/mcp`));
      const client = new Client({ name: "kb-http-terminate", version: "0.0.0" });

      await client.connect(transport);
      await client.listTools();
      await waitForSessionCount(port, 1);

      await transport.terminateSession();
      await transport.close();
      await waitForSessionCount(port, 0);

      expect(server.child.exitCode).toBeNull();
      expect(server.getStderr()).not.toContain("Maximum call stack size exceeded");

      const secondTransport = new StreamableHTTPClientTransport(
        new URL(`http://127.0.0.1:${port}/mcp`),
      );
      const secondClient = new Client({ name: "kb-http-reconnect", version: "0.0.0" });

      try {
        await secondClient.connect(secondTransport);
        const tools = await secondClient.listTools();
        expect(tools.tools.some((tool) => tool.name === "kb_search")).toBe(true);
      } finally {
        await secondTransport.terminateSession().catch(() => undefined);
        await secondTransport.close();
      }
    } finally {
      await server.stop();
    }
  });
});
