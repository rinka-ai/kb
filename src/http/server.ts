import { Hono } from "hono";
import { ROOT } from "../core/paths";
import { KB_MCP_SERVER_NAME, KB_MCP_SERVER_VERSION } from "../mcp/constants";
import { readKbHttpConfig } from "./config";
import { createHealthHandler } from "./handlers/health";
import { registerMcpRoutes, type SessionState } from "./handlers/mcp";
import { createRootHandler } from "./handlers/root";
import {
  createSearchObservationExportHandler,
  createSearchObservationReportHandler,
} from "./handlers/search-observations";
import { createHttpMetrics } from "./metrics";
import { InMemoryRateLimiter } from "./rate-limit";

export async function main(): Promise<void> {
  const config = readKbHttpConfig();
  const sessions = new Map<string, SessionState>();
  const metrics = createHttpMetrics();
  const rateLimiter =
    config.rateLimitMaxRequests > 0 && config.rateLimitWindowMs > 0
      ? new InMemoryRateLimiter(config.rateLimitWindowMs, config.rateLimitMaxRequests)
      : undefined;

  const app = new Hono();
  app.get("/", createRootHandler(config));
  app.get(
    "/health",
    createHealthHandler(
      config,
      () => sessions.size,
      () => metrics,
    ),
  );
  if (config.adminToken) {
    app.get(
      "/admin/search-observations/report",
      createSearchObservationReportHandler({
        adminToken: config.adminToken,
        logPath: config.searchObservationLogPath,
      }),
    );
    app.get(
      "/admin/search-observations/export",
      createSearchObservationExportHandler({
        adminToken: config.adminToken,
        logPath: config.searchObservationLogPath,
      }),
    );
  }
  registerMcpRoutes({
    app,
    statefulSessions: config.statefulSessions,
    enableWrites: config.enableWrites,
    enableSearchTelemetry: config.searchTelemetryEnabled,
    searchObservationLogPath: config.searchObservationLogPath,
    searchTelemetrySalt: config.searchTelemetrySalt,
    allowedHosts: config.allowedHosts,
    allowedOrigins: config.allowedOrigins,
    maxBodyBytes: config.maxBodyBytes,
    metrics,
    rateLimiter,
    sessions,
  });

  const server = Bun.serve({
    hostname: config.host,
    port: config.port,
    fetch: app.fetch,
  });

  console.log(
    `${KB_MCP_SERVER_NAME} ${KB_MCP_SERVER_VERSION} listening on http://${server.hostname}:${server.port}/mcp`,
  );
  console.log(`KB root: ${ROOT}`);
  console.log(`Stateful sessions: ${config.statefulSessions}`);
  console.log(`Writes enabled: ${config.enableWrites}`);
  console.log(`Search telemetry: ${config.searchTelemetryEnabled}`);
  if (config.searchObservationLogPath) {
    console.log(`Search observation log path: ${config.searchObservationLogPath}`);
  }
  console.log(`Admin telemetry routes: ${config.adminToken ? "enabled" : "disabled"}`);
  console.log(
    `Search telemetry client hashing: ${config.searchTelemetrySalt ? "enabled" : "disabled"}`,
  );
  if (config.allowedOrigins?.length) {
    console.log(`Allowed origins: ${config.allowedOrigins.join(", ")}`);
  }
  console.log(`Max MCP body bytes: ${config.maxBodyBytes}`);
  if (rateLimiter) {
    console.log(
      `Rate limit: ${config.rateLimitMaxRequests} requests per ${config.rateLimitWindowMs}ms per client`,
    );
  }

  const shutdown = async () => {
    console.log("Shutting down KB MCP HTTP server...");
    const activeSessions = [...sessions.values()];
    await Promise.allSettled(activeSessions.map(({ server }) => server.close()));
    sessions.clear();
    server.stop();
    process.exit(0);
  };

  process.on("SIGINT", () => void shutdown());
  process.on("SIGTERM", () => void shutdown());
}
