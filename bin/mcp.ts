#!/usr/bin/env bun

import { main } from "../src/mcp/stdio";

if (import.meta.main) {
  void main().catch((error) => {
    console.error("KB MCP server error:", error);
    process.exit(1);
  });
}
