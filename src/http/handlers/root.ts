import type { Context } from "hono";
import { ROOT } from "../../core/paths";
import { KB_MCP_SERVER_NAME, KB_MCP_SERVER_VERSION } from "../../mcp/constants";
import type { KbHttpConfig } from "../config";

export function createRootHandler(config: Pick<KbHttpConfig, "statefulSessions" | "enableWrites">) {
  return (c: Context) =>
    c.json({
      name: KB_MCP_SERVER_NAME,
      version: KB_MCP_SERVER_VERSION,
      transport: "streamable-http",
      endpoint: "/mcp",
      root: ROOT,
      statefulSessions: config.statefulSessions,
      enableWrites: config.enableWrites,
    });
}
