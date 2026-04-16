import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerCatalogTool } from "./catalog";
import { registerContextTool } from "./context";
import { registerGapTool } from "./gaps";
import { registerHandoffTool } from "./handoff";
import { registerIngestTool } from "./ingest";
import { registerReadTool } from "./read";
import { registerRefreshTool } from "./refresh";
import { registerSearchTools } from "./search";
import { registerTraceTool } from "./trace";

export interface RegisterKbToolsOptions {
  enableWrites: boolean;
  enableSearchTelemetry?: boolean;
  searchObservationLogPath?: string;
}

export function registerKbTools(server: McpServer, options: RegisterKbToolsOptions): void {
  registerCatalogTool(server);
  registerContextTool(server);
  registerGapTool(server);
  registerHandoffTool(server);
  registerSearchTools(server, {
    enableSearchTelemetry: options.enableSearchTelemetry ?? false,
    searchObservationLogPath: options.searchObservationLogPath,
  });
  registerReadTool(server);
  registerRefreshTool(server);
  registerTraceTool(server);
  registerIngestTool(server, options.enableWrites);
}
