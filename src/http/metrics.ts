export interface HttpMetrics {
  mcpRequests: number;
  byMethod: Record<string, number>;
  byStatus: Record<string, number>;
  rateLimited: number;
  bodyTooLarge: number;
  internalErrors: number;
}

export function createHttpMetrics(): HttpMetrics {
  return {
    mcpRequests: 0,
    byMethod: {},
    byStatus: {},
    rateLimited: 0,
    bodyTooLarge: 0,
    internalErrors: 0,
  };
}

export function recordMcpResponse(metrics: HttpMetrics, method: string, status: number): void {
  metrics.mcpRequests += 1;
  metrics.byMethod[method] = (metrics.byMethod[method] ?? 0) + 1;
  metrics.byStatus[String(status)] = (metrics.byStatus[String(status)] ?? 0) + 1;
}

export function cloneHttpMetrics(metrics: HttpMetrics): HttpMetrics {
  return {
    mcpRequests: metrics.mcpRequests,
    byMethod: { ...metrics.byMethod },
    byStatus: { ...metrics.byStatus },
    rateLimited: metrics.rateLimited,
    bodyTooLarge: metrics.bodyTooLarge,
    internalErrors: metrics.internalErrors,
  };
}
