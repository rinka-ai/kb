import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { KB_MCP_SERVER_NAME, KB_MCP_SERVER_VERSION } from "./constants";
import { registerKbResources } from "./resources";
import { registerKbTools } from "./tools";

export { KB_MCP_SERVER_NAME, KB_MCP_SERVER_VERSION } from "./constants";

export interface CreateKbMcpServerOptions {
  enableWrites?: boolean;
}

export function createKbMcpServer(options: CreateKbMcpServerOptions = {}): McpServer {
  const server = new McpServer({
    name: KB_MCP_SERVER_NAME,
    version: KB_MCP_SERVER_VERSION,
  });

  registerKbTools(server, {
    enableWrites: options.enableWrites ?? true,
  });
  registerKbResources(server);

  return server;
}
