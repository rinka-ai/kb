#!/usr/bin/env bun

import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { ROOT } from "./kb-lib";
import { createKbMcpServer } from "./kb-mcp-core";

async function main(): Promise<void> {
  const server = createKbMcpServer({ enableWrites: false });
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error(`ai-research-kb MCP server running from ${ROOT}`);
}

if (import.meta.main) {
  void main().catch((error) => {
    console.error("KB MCP server error:", error);
    process.exit(1);
  });
}
