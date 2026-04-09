import { randomUUID } from "node:crypto";
import {
  type HandleRequestOptions,
  WebStandardStreamableHTTPServerTransport,
  type WebStandardStreamableHTTPServerTransportOptions,
} from "@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js";
import type { Hono } from "hono";
import { createKbMcpServer } from "../../mcp/server";
import type { HttpMetrics } from "../metrics";
import { recordMcpResponse } from "../metrics";
import type { InMemoryRateLimiter } from "../rate-limit";

export interface SessionState {
  server: ReturnType<typeof createKbMcpServer>;
  transport: WebStandardStreamableHTTPServerTransport;
}

interface RegisterMcpRoutesOptions {
  app: Hono;
  statefulSessions: boolean;
  enableWrites: boolean;
  allowedHosts?: string[];
  allowedOrigins?: string[];
  maxBodyBytes: number;
  metrics: HttpMetrics;
  rateLimiter?: InMemoryRateLimiter;
  sessions: Map<string, SessionState>;
}

function jsonRpcError(
  status: number,
  message: string,
  headers?: HeadersInit,
  code = -32000,
): Response {
  return Response.json(
    {
      jsonrpc: "2.0",
      error: { code, message },
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
  allowedOrigins: string[] | undefined,
  overrides: WebStandardStreamableHTTPServerTransportOptions,
): WebStandardStreamableHTTPServerTransportOptions {
  return {
    enableJsonResponse: true,
    ...overrides,
    ...(allowedHosts?.length || allowedOrigins?.length
      ? {
          allowedHosts,
          allowedOrigins,
          enableDnsRebindingProtection: true,
        }
      : {}),
  };
}

class BodyTooLargeError extends Error {
  constructor(
    readonly maxBytes: number,
    readonly actualBytes: number,
  ) {
    super(`Request body exceeds limit of ${maxBytes} bytes`);
  }
}

class InvalidJsonError extends Error {
  constructor() {
    super("Parse error: Invalid JSON");
  }
}

function rateLimitHeaders(result: {
  limit: number;
  remaining: number;
  resetAt: number;
  retryAfterSeconds?: number;
}): HeadersInit {
  return {
    "X-RateLimit-Limit": String(result.limit),
    "X-RateLimit-Remaining": String(result.remaining),
    "X-RateLimit-Reset": String(Math.ceil(result.resetAt / 1_000)),
    ...(result.retryAfterSeconds ? { "Retry-After": String(result.retryAfterSeconds) } : {}),
  };
}

function clientAddress(req: Request): string {
  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) {
    const first = forwardedFor
      .split(",")
      .map((value) => value.trim())
      .find(Boolean);
    if (first) return first;
  }

  return (
    req.headers.get("cf-connecting-ip") ||
    req.headers.get("x-real-ip") ||
    req.headers.get("fly-client-ip") ||
    "unknown"
  );
}

async function readParsedBody(req: Request, maxBodyBytes: number): Promise<HandleRequestOptions> {
  const contentLengthHeader = req.headers.get("content-length");
  const declaredContentLength = contentLengthHeader
    ? Number.parseInt(contentLengthHeader, 10)
    : NaN;

  if (Number.isFinite(declaredContentLength) && declaredContentLength > maxBodyBytes) {
    throw new BodyTooLargeError(maxBodyBytes, declaredContentLength);
  }

  if (!req.body) {
    return { parsedBody: null };
  }

  const reader = req.body.getReader();
  const decoder = new TextDecoder();
  let totalBytes = 0;
  let body = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      break;
    }

    totalBytes += value.byteLength;
    if (totalBytes > maxBodyBytes) {
      throw new BodyTooLargeError(maxBodyBytes, totalBytes);
    }

    body += decoder.decode(value, { stream: true });
  }

  body += decoder.decode();

  try {
    return { parsedBody: JSON.parse(body) };
  } catch {
    throw new InvalidJsonError();
  }
}

async function createStatefulSession(
  sessions: Map<string, SessionState>,
  enableWrites: boolean,
  allowedHosts?: string[],
  allowedOrigins?: string[],
): Promise<SessionState> {
  const server = createKbMcpServer({ enableWrites });
  const cleanupSession = (sessionId?: string) => {
    if (sessionId) sessions.delete(sessionId);
  };
  const transport = new WebStandardStreamableHTTPServerTransport(
    createTransportOptions(allowedHosts, allowedOrigins, {
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
  allowedOrigins?: string[],
  options?: HandleRequestOptions,
): Promise<Response> {
  const server = createKbMcpServer({ enableWrites });
  const transport = new WebStandardStreamableHTTPServerTransport(
    createTransportOptions(allowedHosts, allowedOrigins, {
      sessionIdGenerator: undefined,
    }),
  );

  try {
    await server.connect(transport);
    return await transport.handleRequest(req, options);
  } finally {
    await Promise.allSettled([transport.close(), server.close()]);
  }
}

async function handleStateful(
  req: Request,
  sessions: Map<string, SessionState>,
  enableWrites: boolean,
  allowedHosts?: string[],
  allowedOrigins?: string[],
  options?: HandleRequestOptions,
): Promise<Response> {
  const sessionId = req.headers.get("mcp-session-id");

  if (sessionId) {
    const existing = sessions.get(sessionId);
    if (!existing) {
      return jsonRpcError(404, `Session not found: ${sessionId}`);
    }
    return existing.transport.handleRequest(req, options);
  }

  const session = await createStatefulSession(sessions, enableWrites, allowedHosts, allowedOrigins);
  return session.transport.handleRequest(req, options);
}

export function registerMcpRoutes({
  app,
  statefulSessions,
  enableWrites,
  allowedHosts,
  allowedOrigins,
  maxBodyBytes,
  metrics,
  rateLimiter,
  sessions,
}: RegisterMcpRoutesOptions): void {
  app.all("/mcp", async (c) => {
    const req = c.req.raw;
    const method = req.method;

    try {
      if (rateLimiter) {
        const rate = rateLimiter.consume(clientAddress(req));
        if (!rate.allowed) {
          metrics.rateLimited += 1;
          const response = jsonRpcError(
            429,
            "Rate limit exceeded. Try again later.",
            rateLimitHeaders(rate),
          );
          recordMcpResponse(metrics, method, response.status);
          return response;
        }
      }

      let transportOptions: HandleRequestOptions | undefined;
      if (method === "POST") {
        try {
          transportOptions = await readParsedBody(req, maxBodyBytes);
        } catch (error) {
          if (error instanceof BodyTooLargeError) {
            metrics.bodyTooLarge += 1;
            const response = jsonRpcError(
              413,
              `Request body too large. Limit is ${error.maxBytes} bytes.`,
            );
            recordMcpResponse(metrics, method, response.status);
            return response;
          }
          if (error instanceof InvalidJsonError) {
            const response = jsonRpcError(400, error.message, undefined, -32700);
            recordMcpResponse(metrics, method, response.status);
            return response;
          }
          throw error;
        }
      }

      if (statefulSessions) {
        if (req.method === "GET") {
          const response = methodNotAllowed(["POST", "DELETE"]);
          recordMcpResponse(metrics, method, response.status);
          return response;
        }

        const response = await handleStateful(
          req,
          sessions,
          enableWrites,
          allowedHosts,
          allowedOrigins,
          transportOptions,
        );
        recordMcpResponse(metrics, method, response.status);
        return response;
      }

      if (req.method !== "POST") {
        const response = methodNotAllowed(["POST"]);
        recordMcpResponse(metrics, method, response.status);
        return response;
      }

      const response = await handleStatelessPost(
        req,
        enableWrites,
        allowedHosts,
        allowedOrigins,
        transportOptions,
      );
      recordMcpResponse(metrics, method, response.status);
      return response;
    } catch (error) {
      console.error("Error handling MCP request:", error);
      metrics.internalErrors += 1;
      const response = jsonRpcError(500, "Internal server error");
      recordMcpResponse(metrics, method, response.status);
      return response;
    }
  });
}
