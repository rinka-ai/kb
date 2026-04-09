#!/usr/bin/env bun

import { main } from "../src/http/server";

if (import.meta.main) {
  void main().catch((error) => {
    console.error("KB MCP HTTP server error:", error);
    process.exit(1);
  });
}
