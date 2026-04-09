import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { ROOT } from "../core/paths";
import { createKbMcpServer } from "./server";

export async function main(): Promise<void> {
  const server = createKbMcpServer({ enableWrites: false });
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error(`ai-research-kb MCP server running from ${ROOT}`);
}
