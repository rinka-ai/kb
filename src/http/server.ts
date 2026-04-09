import { Hono } from "hono";
import { ROOT } from "../core/paths";
import { KB_MCP_SERVER_NAME, KB_MCP_SERVER_VERSION } from "../mcp/constants";
import { readKbHttpConfig } from "./config";
import { createHealthHandler } from "./handlers/health";
import { registerMcpRoutes, type SessionState } from "./handlers/mcp";
import { createRootHandler } from "./handlers/root";

export async function main(): Promise<void> {
  const config = readKbHttpConfig();
  const sessions = new Map<string, SessionState>();

  const app = new Hono();
  app.get("/", createRootHandler(config));
  app.get(
    "/health",
    createHealthHandler(config, () => sessions.size),
  );
  registerMcpRoutes({
    app,
    statefulSessions: config.statefulSessions,
    enableWrites: config.enableWrites,
    allowedHosts: config.allowedHosts,
    sessions,
  });

  const server = Bun.serve({
    hostname: config.host,
    port: config.port,
    fetch: app.fetch,
  });

  console.error(
    `${KB_MCP_SERVER_NAME} ${KB_MCP_SERVER_VERSION} listening on http://${server.hostname}:${server.port}/mcp`,
  );
  console.error(`KB root: ${ROOT}`);
  console.error(`Stateful sessions: ${config.statefulSessions}`);
  console.error(`Writes enabled: ${config.enableWrites}`);

  const shutdown = async () => {
    console.error("Shutting down KB MCP HTTP server...");
    const activeSessions = [...sessions.values()];
    await Promise.allSettled(activeSessions.map(({ server }) => server.close()));
    sessions.clear();
    server.stop();
    process.exit(0);
  };

  process.on("SIGINT", () => void shutdown());
  process.on("SIGTERM", () => void shutdown());
}
