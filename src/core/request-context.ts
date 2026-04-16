import { AsyncLocalStorage } from "node:async_hooks";
import { createHash, randomUUID } from "node:crypto";
import type { SearchObservationRequestMeta } from "./search-observations";

export interface HttpRequestContext extends SearchObservationRequestMeta {}

const requestContextStorage = new AsyncLocalStorage<HttpRequestContext>();

export function runWithRequestContext<T>(
  context: HttpRequestContext,
  callback: () => Promise<T>,
): Promise<T> {
  return requestContextStorage.run(context, callback);
}

export function getRequestContext(): HttpRequestContext | undefined {
  return requestContextStorage.getStore();
}

export function createHttpRequestContext(args: {
  clientHash?: string;
  sessionId?: string;
  userAgent?: string;
}): HttpRequestContext {
  return {
    transport: "http",
    requestId: randomUUID(),
    clientHash: args.clientHash,
    sessionId: args.sessionId,
    userAgent: args.userAgent,
    receivedAt: new Date().toISOString(),
  };
}

export function hashClientIdentifier(value: string, salt?: string): string | undefined {
  const trimmed = value.trim();
  if (!trimmed || !salt?.trim()) {
    return undefined;
  }

  return createHash("sha256").update(`${salt}:${trimmed}`).digest("hex").slice(0, 16);
}
