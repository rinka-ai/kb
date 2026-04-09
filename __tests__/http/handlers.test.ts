import { describe, expect, test } from "bun:test";
import { Hono } from "hono";
import { createHealthHandler } from "../../src/http/handlers/health";
import { registerMcpRoutes } from "../../src/http/handlers/mcp";
import { createRootHandler } from "../../src/http/handlers/root";

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

  test("createHealthHandler returns the expected payload", async () => {
    const app = new Hono();
    app.get(
      "/health",
      createHealthHandler({ statefulSessions: true, enableWrites: false }, () => 3),
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
    registerMcpRoutes({
      app,
      statefulSessions: true,
      enableWrites: false,
      sessions: new Map(),
    });

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

    // GET without session ID → transport rejects before session lookup
    const getRes = await app.request("/mcp", {
      method: "GET",
      headers: { Accept: "text/event-stream" },
    });
    expect(getRes.status).toBe(400);
    expect(await getRes.json()).toMatchObject({
      error: { message: "Bad Request: Server not initialized" },
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
    registerMcpRoutes({
      app,
      statefulSessions: true,
      enableWrites: false,
      sessions,
    });

    const initRes = await app.request("/mcp", {
      method: "POST",
      headers: mcpHeaders,
      body: initializeBody,
    });
    expect(initRes.status).toBe(200);

    const sessionId = initRes.headers.get("mcp-session-id");
    expect(sessionId).toBeTruthy();
    expect(sessions.has(sessionId!)).toBe(true);

    const deleteRes = await app.request("/mcp", {
      method: "DELETE",
      headers: {
        Accept: "application/json, text/event-stream",
        "mcp-protocol-version": "2025-03-26",
        "mcp-session-id": sessionId!,
      },
    });
    expect(deleteRes.status).toBe(200);

    await Bun.sleep(0);

    expect(sessions.has(sessionId!)).toBe(false);
  });

  test("registerMcpRoutes handles stateless initialize POST", async () => {
    const app = new Hono();
    registerMcpRoutes({
      app,
      statefulSessions: false,
      enableWrites: false,
      sessions: new Map(),
    });

    const res = await app.request("/mcp", {
      method: "POST",
      headers: mcpHeaders,
      body: initializeBody,
    });
    // Transport handles initialize and returns 200 with SSE or JSON
    expect(res.status).toBe(200);
  });
});
