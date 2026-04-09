#!/usr/bin/env bun

import { randomUUID } from "node:crypto";
import { createServer } from "node:http";
import { createMcpExpressApp } from "@modelcontextprotocol/sdk/server/express.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { isInitializeRequest } from "@modelcontextprotocol/sdk/types.js";
import { ROOT } from "./kb-lib";
import { KB_MCP_SERVER_NAME, KB_MCP_SERVER_VERSION, createKbMcpServer } from "./kb-mcp-core";

interface SessionState {
  server: ReturnType<typeof createKbMcpServer>;
  transport: StreamableHTTPServerTransport;
}

function parseBoolean(value: string | undefined, fallback: boolean): boolean {
  if (!value) {
    return fallback;
  }
  const normalized = value.trim().toLowerCase();
  if (["1", "true", "yes", "on"].includes(normalized)) {
    return true;
  }
  if (["0", "false", "no", "off"].includes(normalized)) {
    return false;
  }
  return fallback;
}

function parseCsv(value: string | undefined): string[] | undefined {
  const items =
    value
      ?.split(",")
      .map((item) => item.trim())
      .filter(Boolean) ?? [];
  return items.length > 0 ? items : undefined;
}

function parsePort(value: string | undefined, fallback: number): number {
  const parsed = Number.parseInt(value ?? "", 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

function sessionHeader(req: { headers: Record<string, string | string[] | undefined> }) {
  const header = req.headers["mcp-session-id"];
  return typeof header === "string" && header.trim() ? header : null;
}

function sendJsonRpcError(
  res: {
    headersSent: boolean;
    status: (code: number) => { json: (body: unknown) => void };
  },
  statusCode: number,
  message: string,
) {
  if (res.headersSent) {
    return;
  }

  res.status(statusCode).json({
    jsonrpc: "2.0",
    error: {
      code: -32000,
      message,
    },
    id: null,
  });
}

async function main(): Promise<void> {
  const host = process.env.HOST ?? "127.0.0.1";
  const port = parsePort(process.env.PORT, 3000);
  const allowedHosts = parseCsv(process.env.KB_ALLOWED_HOSTS);
  const statefulSessions = parseBoolean(process.env.KB_STATEFUL_SESSIONS, true);
  const enableWrites = parseBoolean(process.env.KB_ENABLE_WRITES, false);
  const sessions = new Map<string, SessionState>();

  const app = createMcpExpressApp({ host, allowedHosts });

  app.get("/", (_req, res) => {
    res.json({
      name: KB_MCP_SERVER_NAME,
      version: KB_MCP_SERVER_VERSION,
      transport: "streamable-http",
      endpoint: "/mcp",
      root: ROOT,
      statefulSessions,
      enableWrites,
    });
  });

  const sendHealth = (_req: unknown, res: { json: (body: unknown) => void }) => {
    res.json({
      ok: true,
      name: KB_MCP_SERVER_NAME,
      version: KB_MCP_SERVER_VERSION,
      sessions: sessions.size,
      statefulSessions,
      enableWrites,
    });
  };

  app.get("/health", sendHealth);
  app.get("/healthz", sendHealth);

  async function createStatefulSession() {
    const server = createKbMcpServer({ enableWrites });
    const transport = new StreamableHTTPServerTransport({
      sessionIdGenerator: () => randomUUID(),
      onsessioninitialized: (sessionId) => {
        sessions.set(sessionId, { server, transport });
      },
    });

    transport.onclose = () => {
      const currentSessionId = transport.sessionId;
      if (currentSessionId) {
        sessions.delete(currentSessionId);
      }
      void server.close();
    };

    await server.connect(transport);
    return { server, transport };
  }

  app.post("/mcp", async (req, res) => {
    try {
      if (!statefulSessions) {
        const server = createKbMcpServer({ enableWrites });
        const transport = new StreamableHTTPServerTransport({
          sessionIdGenerator: undefined,
        });
        await server.connect(transport);
        res.on("close", () => {
          void transport.close();
          void server.close();
        });
        await transport.handleRequest(req, res, req.body);
        return;
      }

      const sessionId = sessionHeader(req);
      if (sessionId) {
        const existing = sessions.get(sessionId);
        if (!existing) {
          sendJsonRpcError(res, 404, `Session not found: ${sessionId}`);
          return;
        }
        await existing.transport.handleRequest(req, res, req.body);
        return;
      }

      if (!isInitializeRequest(req.body)) {
        sendJsonRpcError(
          res,
          400,
          "Bad Request: no valid session ID provided and request is not initialize.",
        );
        return;
      }

      const session = await createStatefulSession();
      await session.transport.handleRequest(req, res, req.body);
    } catch (error) {
      console.error("Error handling MCP POST request:", error);
      sendJsonRpcError(res, 500, "Internal server error");
    }
  });

  app.get("/mcp", async (req, res) => {
    if (!statefulSessions) {
      sendJsonRpcError(
        res,
        405,
        "Method not allowed for stateless mode. Use POST /mcp for each request.",
      );
      return;
    }

    const sessionId = sessionHeader(req);
    if (!sessionId) {
      sendJsonRpcError(res, 400, "Missing MCP session ID.");
      return;
    }

    const session = sessions.get(sessionId);
    if (!session) {
      sendJsonRpcError(res, 404, `Session not found: ${sessionId}`);
      return;
    }

    try {
      await session.transport.handleRequest(req, res);
    } catch (error) {
      console.error("Error handling MCP GET request:", error);
      sendJsonRpcError(res, 500, "Internal server error");
    }
  });

  app.delete("/mcp", async (req, res) => {
    if (!statefulSessions) {
      sendJsonRpcError(
        res,
        405,
        "Method not allowed for stateless mode. Session termination is unsupported.",
      );
      return;
    }

    const sessionId = sessionHeader(req);
    if (!sessionId) {
      sendJsonRpcError(res, 400, "Missing MCP session ID.");
      return;
    }

    const session = sessions.get(sessionId);
    if (!session) {
      sendJsonRpcError(res, 404, `Session not found: ${sessionId}`);
      return;
    }

    try {
      await session.transport.handleRequest(req, res);
    } catch (error) {
      console.error("Error handling MCP DELETE request:", error);
      sendJsonRpcError(res, 500, "Internal server error");
    }
  });

  const httpServer = createServer(app);
  await new Promise<void>((resolve, reject) => {
    httpServer.once("error", reject);
    httpServer.listen(port, host, () => resolve());
  });

  console.error(
    `${KB_MCP_SERVER_NAME} ${KB_MCP_SERVER_VERSION} listening on http://${host}:${port}/mcp`,
  );
  console.error(`KB root: ${ROOT}`);
  console.error(`Stateful sessions: ${statefulSessions}`);
  console.error(`Writes enabled: ${enableWrites}`);

  const shutdown = async () => {
    console.error("Shutting down KB MCP HTTP server...");
    for (const { server, transport } of sessions.values()) {
      await Promise.allSettled([transport.close(), server.close()]);
    }
    sessions.clear();
    await new Promise<void>((resolve, reject) => {
      httpServer.close((error) => {
        if (error) {
          reject(error);
          return;
        }
        resolve();
      });
    });
    process.exit(0);
  };

  process.on("SIGINT", () => {
    void shutdown();
  });
  process.on("SIGTERM", () => {
    void shutdown();
  });
}

if (import.meta.main) {
  void main().catch((error) => {
    console.error("KB MCP HTTP server error:", error);
    process.exit(1);
  });
}
