import { randomUUID } from "node:crypto";
import { WebStandardStreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js";
import type { Hono } from "hono";
import { createKbMcpServer } from "../../mcp/server";

export interface SessionState {
  server: ReturnType<typeof createKbMcpServer>;
  transport: WebStandardStreamableHTTPServerTransport;
}

interface RegisterMcpRoutesOptions {
  app: Hono;
  statefulSessions: boolean;
  enableWrites: boolean;
  sessions: Map<string, SessionState>;
}

async function createStatefulSession(
  sessions: Map<string, SessionState>,
  enableWrites: boolean,
): Promise<SessionState> {
  const server = createKbMcpServer({ enableWrites });
  const cleanupSession = (sessionId?: string) => {
    if (sessionId) sessions.delete(sessionId);
  };
  const transport = new WebStandardStreamableHTTPServerTransport({
    sessionIdGenerator: () => randomUUID(),
    onsessioninitialized: (sessionId) => {
      sessions.set(sessionId, { server, transport });
    },
    onsessionclosed: (sessionId) => {
      cleanupSession(sessionId);
    },
  });

  transport.onclose = () => {
    cleanupSession(transport.sessionId);
  };

  await server.connect(transport);
  return { server, transport };
}

async function handleStateless(req: Request, enableWrites: boolean): Promise<Response> {
  const server = createKbMcpServer({ enableWrites });
  const transport = new WebStandardStreamableHTTPServerTransport({
    sessionIdGenerator: undefined,
  });
  await server.connect(transport);
  const response = await transport.handleRequest(req);
  void server.close();
  return response;
}

async function handleStateful(
  req: Request,
  sessions: Map<string, SessionState>,
  enableWrites: boolean,
): Promise<Response> {
  const sessionId = req.headers.get("mcp-session-id");

  if (sessionId) {
    const existing = sessions.get(sessionId);
    if (!existing) {
      return Response.json(
        {
          jsonrpc: "2.0",
          error: { code: -32000, message: `Session not found: ${sessionId}` },
          id: null,
        },
        { status: 404 },
      );
    }
    return existing.transport.handleRequest(req);
  }

  const session = await createStatefulSession(sessions, enableWrites);
  return session.transport.handleRequest(req);
}

export function registerMcpRoutes({
  app,
  statefulSessions,
  enableWrites,
  sessions,
}: RegisterMcpRoutesOptions): void {
  app.all("/mcp", async (c) => {
    try {
      if (statefulSessions) {
        return await handleStateful(c.req.raw, sessions, enableWrites);
      }
      return await handleStateless(c.req.raw, enableWrites);
    } catch (error) {
      console.error("Error handling MCP request:", error);
      return Response.json(
        { jsonrpc: "2.0", error: { code: -32000, message: "Internal server error" }, id: null },
        { status: 500 },
      );
    }
  });
}
