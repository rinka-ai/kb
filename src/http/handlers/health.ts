import type { Context } from "hono";
import { KB_MCP_SERVER_NAME, KB_MCP_SERVER_VERSION } from "../../mcp/constants";
import type { KbHttpConfig } from "../config";
import { cloneHttpMetrics, type HttpMetrics } from "../metrics";

export function createHealthHandler(
  config: Pick<KbHttpConfig, "statefulSessions" | "enableWrites">,
  getSessionCount: () => number,
  getMetrics: () => HttpMetrics,
) {
  return (c: Context) =>
    c.json({
      ok: true,
      name: KB_MCP_SERVER_NAME,
      version: KB_MCP_SERVER_VERSION,
      sessions: getSessionCount(),
      statefulSessions: config.statefulSessions,
      enableWrites: config.enableWrites,
      http: cloneHttpMetrics(getMetrics()),
    });
}
