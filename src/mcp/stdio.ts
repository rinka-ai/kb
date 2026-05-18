import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { ROOT } from "../core/paths";
import { createKbMcpServer } from "./server";

const DISABLED = new Set(["0", "false", "no", "off"]);

function searchTelemetryEnabled(): boolean {
  const value = process.env.KB_SEARCH_TELEMETRY_ENABLED;
  return value == null ? true : !DISABLED.has(value.trim().toLowerCase());
}

export async function main(): Promise<void> {
  const server = createKbMcpServer({
    enableWrites: false,
    enableSearchTelemetry: searchTelemetryEnabled(),
    searchObservationLogPath: process.env.KB_SEARCH_OBSERVATION_LOG_PATH,
  });
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error(`ai-research-kb MCP server running from ${ROOT}`);
}
