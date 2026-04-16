import { describe, expect, test } from "bun:test";
import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { Hono } from "hono";
import { createHealthHandler } from "../../src/http/handlers/health";
import { registerMcpRoutes } from "../../src/http/handlers/mcp";
import { createRootHandler } from "../../src/http/handlers/root";
import {
  createSearchObservationExportHandler,
  createSearchObservationReportHandler,
} from "../../src/http/handlers/search-observations";
import { createHttpMetrics } from "../../src/http/metrics";
import { InMemoryRateLimiter } from "../../src/http/rate-limit";

describe("http handlers", () => {
  const mcpHeaders = {
    "Content-Type": "application/json",
    Accept: "application/json, text/event-stream",
  };

  const initializeBody = JSON.stringify({
    jsonrpc: "2.0",
    method: "initialize",
    params: {
      protocolVersion: "2025-03-26",
      capabilities: {},
      clientInfo: { name: "test", version: "1.0" },
    },
    id: 1,
  });

  function registerRoutes(
    app: Hono,
    overrides: Partial<Parameters<typeof registerMcpRoutes>[0]> = {},
  ): void {
    registerMcpRoutes({
      app,
      statefulSessions: false,
      enableWrites: false,
      allowedHosts: undefined,
      allowedOrigins: undefined,
      maxBodyBytes: 1_048_576,
      metrics: createHttpMetrics(),
      rateLimiter: undefined,
      sessions: new Map(),
      ...overrides,
    });
  }

  test("createHealthHandler returns the expected payload", async () => {
    const app = new Hono();
    app.get(
      "/health",
      createHealthHandler(
        { statefulSessions: true, enableWrites: false },
        () => 3,
        createHttpMetrics,
      ),
    );
    const res = await app.request("/health");
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({
      ok: true,
      name: "ai-research-kb",
      version: "1.1.0",
      sessions: 3,
      statefulSessions: true,
      enableWrites: false,
      http: {
        mcpRequests: 0,
        byMethod: {},
        byStatus: {},
        rateLimited: 0,
        bodyTooLarge: 0,
        internalErrors: 0,
      },
    });
  });

  test("createRootHandler returns streamable-http metadata", async () => {
    const app = new Hono();
    app.get("/", createRootHandler({ statefulSessions: false, enableWrites: true }));
    const res = await app.request("/");
    expect(res.status).toBe(200);
    expect(await res.json()).toMatchObject({
      name: "ai-research-kb",
      version: "1.1.0",
      transport: "streamable-http",
      endpoint: "/mcp",
      statefulSessions: false,
      enableWrites: true,
    });
  });

  test("registerMcpRoutes returns protocol-level errors for stateful invalid requests", async () => {
    const app = new Hono();
    registerRoutes(app, { statefulSessions: true });

    // POST without session ID and non-initialize body → transport rejects
    const postRes = await app.request("/mcp", {
      method: "POST",
      headers: mcpHeaders,
      body: JSON.stringify({ jsonrpc: "2.0", method: "ping" }),
    });
    expect(postRes.status).toBe(400);
    expect(await postRes.json()).toMatchObject({
      error: { message: "Bad Request: Server not initialized" },
    });

    // GET is intentionally disabled for this server's hosted HTTP mode
    const getRes = await app.request("/mcp", {
      method: "GET",
      headers: { Accept: "text/event-stream" },
    });
    expect(getRes.status).toBe(405);
    expect(await getRes.json()).toMatchObject({
      error: { message: "Method not allowed." },
    });

    // DELETE with missing session
    const deleteRes = await app.request("/mcp", {
      method: "DELETE",
      headers: { ...mcpHeaders, "mcp-session-id": "missing" },
    });
    expect(deleteRes.status).toBe(404);
    const deleteBody = await deleteRes.json();
    expect(deleteBody).toMatchObject({
      error: { message: "Session not found: missing" },
    });
  });

  test("registerMcpRoutes closes a stateful session without recursive shutdown", async () => {
    const app = new Hono();
    const sessions = new Map();
    registerRoutes(app, { statefulSessions: true, sessions });

    const initRes = await app.request("/mcp", {
      method: "POST",
      headers: mcpHeaders,
      body: initializeBody,
    });
    expect(initRes.status).toBe(200);

    const sessionId = initRes.headers.get("mcp-session-id");
    expect(sessionId).toBeTruthy();
    if (!sessionId) {
      throw new Error("Expected MCP initialize response to include a session ID.");
    }
    expect(sessions.has(sessionId)).toBe(true);

    const deleteRes = await app.request("/mcp", {
      method: "DELETE",
      headers: {
        Accept: "application/json, text/event-stream",
        "mcp-protocol-version": "2025-03-26",
        "mcp-session-id": sessionId,
      },
    });
    expect(deleteRes.status).toBe(200);

    await Bun.sleep(0);

    expect(sessions.has(sessionId)).toBe(false);
  });

  test("registerMcpRoutes handles stateless initialize POST", async () => {
    const app = new Hono();
    registerRoutes(app);

    const res = await app.request("/mcp", {
      method: "POST",
      headers: mcpHeaders,
      body: initializeBody,
    });
    // Stateless hosted mode returns plain JSON and avoids server-held sessions.
    expect(res.status).toBe(200);
    expect(res.headers.get("content-type")).toContain("application/json");
    expect(res.headers.get("mcp-session-id")).toBeNull();
  });

  test("registerMcpRoutes rejects stateless GET and DELETE requests", async () => {
    const app = new Hono();
    registerRoutes(app);

    const getRes = await app.request("/mcp", {
      method: "GET",
      headers: { Accept: "text/event-stream" },
    });
    expect(getRes.status).toBe(405);
    expect(await getRes.json()).toMatchObject({
      error: { message: "Method not allowed." },
    });

    const deleteRes = await app.request("/mcp", {
      method: "DELETE",
      headers: mcpHeaders,
    });
    expect(deleteRes.status).toBe(405);
    expect(await deleteRes.json()).toMatchObject({
      error: { message: "Method not allowed." },
    });
  });

  test("registerMcpRoutes enforces origin allowlisting when configured", async () => {
    const app = new Hono();
    registerRoutes(app, { allowedOrigins: ["https://trusted.example.com"] });

    const res = await app.request("/mcp", {
      method: "POST",
      headers: { ...mcpHeaders, Origin: "https://evil.example.com" },
      body: initializeBody,
    });

    expect(res.status).toBe(403);
    expect(await res.json()).toMatchObject({
      error: { message: "Invalid Origin header: https://evil.example.com" },
    });
  });

  test("registerMcpRoutes rejects oversized request bodies", async () => {
    const app = new Hono();
    registerRoutes(app, { maxBodyBytes: 32 });

    const res = await app.request("/mcp", {
      method: "POST",
      headers: mcpHeaders,
      body: `${initializeBody}   `,
    });

    expect(res.status).toBe(413);
    expect(await res.json()).toMatchObject({
      error: { message: "Request body too large. Limit is 32 bytes." },
    });
  });

  test("registerMcpRoutes rate limits repeated callers", async () => {
    const app = new Hono();
    registerRoutes(app, { rateLimiter: new InMemoryRateLimiter(60_000, 1) });

    const first = await app.request("/mcp", {
      method: "POST",
      headers: { ...mcpHeaders, "x-forwarded-for": "203.0.113.10" },
      body: initializeBody,
    });
    expect(first.status).toBe(200);

    const second = await app.request("/mcp", {
      method: "POST",
      headers: { ...mcpHeaders, "x-forwarded-for": "203.0.113.10" },
      body: initializeBody,
    });
    expect(second.status).toBe(429);
    expect(second.headers.get("retry-after")).toBeTruthy();
    expect(await second.json()).toMatchObject({
      error: { message: "Rate limit exceeded. Try again later." },
    });
  });

  test("search observation admin report requires a bearer token", async () => {
    const app = new Hono();
    app.get(
      "/admin/search-observations/report",
      createSearchObservationReportHandler({
        adminToken: "secret-token",
      }),
    );

    const res = await app.request("/admin/search-observations/report");
    expect(res.status).toBe(401);
    expect(res.headers.get("www-authenticate")).toContain("Bearer");
    expect(await res.json()).toMatchObject({
      error: { message: "Unauthorized." },
    });
  });

  test("search observation admin routes expose report and filtered export", async () => {
    const directory = mkdtempSync(join(tmpdir(), "kb-search-observations-"));
    const logPath = join(directory, "search-observations.ndjson");
    writeFileSync(
      logPath,
      [
        JSON.stringify({
          observedAt: "2026-04-16T10:00:00.000Z",
          tool: "kb_search",
          rawQuery: "bad fuzzy query",
          queryText: "bad fuzzy query",
          filePathProvided: false,
          includeSuperseded: false,
          top: 5,
          rebuildIfStale: true,
          exactTerms: ["bad", "fuzzy", "query"],
          expandedTerms: ["approximate"],
          results: [],
          resultCount: 0,
          zeroResults: true,
          top1FuzzyOnly: false,
          top12ScoreGap: null,
          request: {
            transport: "http",
            requestId: "req-1",
            receivedAt: "2026-04-16T10:00:00.000Z",
          },
        }),
        JSON.stringify({
          observedAt: "2026-04-16T10:05:00.000Z",
          tool: "kb_search_file",
          queryText: "context label billing",
          contextLabel: "billing-debug.md",
          filePathProvided: false,
          textBytes: 512,
          includeSuperseded: false,
          top: 5,
          rebuildIfStale: true,
          exactTerms: ["billing"],
          expandedTerms: [],
          results: [],
          resultCount: 0,
          zeroResults: true,
          top1FuzzyOnly: false,
          top12ScoreGap: null,
          request: {
            transport: "http",
            requestId: "req-2",
            receivedAt: "2026-04-16T10:05:00.000Z",
          },
        }),
      ].join("\n"),
      "utf-8",
    );

    const app = new Hono();
    app.get(
      "/admin/search-observations/report",
      createSearchObservationReportHandler({
        adminToken: "secret-token",
        logPath,
      }),
    );
    app.get(
      "/admin/search-observations/export",
      createSearchObservationExportHandler({
        adminToken: "secret-token",
        logPath,
      }),
    );

    const reportRes = await app.request("/admin/search-observations/report?format=text", {
      headers: { Authorization: "Bearer secret-token" },
    });
    expect(reportRes.status).toBe(200);
    expect(await reportRes.text()).toContain("KB search observation report");

    const exportRes = await app.request(
      "/admin/search-observations/export?format=json&tool=kb_search&query=fuzzy",
      {
        headers: { Authorization: "Bearer secret-token" },
      },
    );
    expect(exportRes.status).toBe(200);
    expect(await exportRes.json()).toMatchObject({
      totalMatching: 1,
      returned: 1,
      observations: [{ rawQuery: "bad fuzzy query", tool: "kb_search" }],
    });
  });
});
