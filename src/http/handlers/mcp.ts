import { randomUUID } from "node:crypto";
import {
  WebStandardStreamableHTTPServerTransport,
  type WebStandardStreamableHTTPServerTransportOptions,
} from "@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js";
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
  allowedHosts?: string[];
  sessions: Map<string, SessionState>;
}

function jsonRpcError(status: number, message: string, headers?: HeadersInit): Response {
  return Response.json(
    {
      jsonrpc: "2.0",
      error: { code: -32000, message },
      id: null,
    },
    { status, headers },
  );
}

function methodNotAllowed(allow: string[]): Response {
  return jsonRpcError(405, "Method not allowed.", { Allow: allow.join(", ") });
}

function createTransportOptions(
  allowedHosts: string[] | undefined,
  overrides: WebStandardStreamableHTTPServerTransportOptions,
): WebStandardStreamableHTTPServerTransportOptions {
  return {
    enableJsonResponse: true,
    ...overrides,
    ...(allowedHosts?.length
      ? {
          allowedHosts,
          enableDnsRebindingProtection: true,
        }
      : {}),
  };
}

async function createStatefulSession(
  sessions: Map<string, SessionState>,
  enableWrites: boolean,
  allowedHosts?: string[],
): Promise<SessionState> {
  const server = createKbMcpServer({ enableWrites });
  const cleanupSession = (sessionId?: string) => {
    if (sessionId) sessions.delete(sessionId);
  };
  const transport = new WebStandardStreamableHTTPServerTransport(
    createTransportOptions(allowedHosts, {
      sessionIdGenerator: () => randomUUID(),
      onsessioninitialized: (sessionId) => {
        sessions.set(sessionId, { server, transport });
      },
      onsessionclosed: (sessionId) => {
        cleanupSession(sessionId);
      },
    }),
  );

  transport.onclose = () => {
    cleanupSession(transport.sessionId);
  };

  await server.connect(transport);
  return { server, transport };
}

async function handleStatelessPost(
  req: Request,
  enableWrites: boolean,
  allowedHosts?: string[],
): Promise<Response> {
  const server = createKbMcpServer({ enableWrites });
  const transport = new WebStandardStreamableHTTPServerTransport(
    createTransportOptions(allowedHosts, {
      sessionIdGenerator: undefined,
    }),
  );

  try {
    await server.connect(transport);
    return await transport.handleRequest(req);
  } finally {
    await Promise.allSettled([transport.close(), server.close()]);
  }
}

async function handleStateful(
  req: Request,
  sessions: Map<string, SessionState>,
  enableWrites: boolean,
  allowedHosts?: string[],
): Promise<Response> {
  const sessionId = req.headers.get("mcp-session-id");

  if (sessionId) {
    const existing = sessions.get(sessionId);
    if (!existing) {
      return jsonRpcError(404, `Session not found: ${sessionId}`);
    }
    return existing.transport.handleRequest(req);
  }

  const session = await createStatefulSession(sessions, enableWrites, allowedHosts);
  return session.transport.handleRequest(req);
}

export function registerMcpRoutes({
  app,
  statefulSessions,
  enableWrites,
  allowedHosts,
  sessions,
}: RegisterMcpRoutesOptions): void {
  app.all("/mcp", async (c) => {
    try {
      const req = c.req.raw;

      if (statefulSessions) {
        if (req.method === "GET") {
          return methodNotAllowed(["POST", "DELETE"]);
        }

        return await handleStateful(req, sessions, enableWrites, allowedHosts);
      }

      if (req.method !== "POST") {
        return methodNotAllowed(["POST"]);
      }

      return await handleStatelessPost(req, enableWrites, allowedHosts);
    } catch (error) {
      console.error("Error handling MCP request:", error);
      return jsonRpcError(500, "Internal server error");
    }
  });
}
