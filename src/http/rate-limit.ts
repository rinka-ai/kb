export interface RateLimitResult {
  allowed: boolean;
  limit: number;
  remaining: number;
  resetAt: number;
  retryAfterSeconds: number;
}

interface RateLimitBucket {
  count: number;
  resetAt: number;
}

export class InMemoryRateLimiter {
  private readonly buckets = new Map<string, RateLimitBucket>();
  private cleanupCounter = 0;

  constructor(
    private readonly windowMs: number,
    private readonly maxRequests: number,
  ) {}

  consume(key: string, now = Date.now()): RateLimitResult {
    this.cleanupCounter += 1;
    if (this.cleanupCounter % 100 === 0) {
      this.cleanup(now);
    }

    const current = this.buckets.get(key);
    const resetAt = current && current.resetAt > now ? current.resetAt : now + this.windowMs;
    const count = current && current.resetAt > now ? current.count + 1 : 1;
    this.buckets.set(key, { count, resetAt });

    const remaining = Math.max(this.maxRequests - count, 0);
    const retryAfterSeconds = Math.max(1, Math.ceil((resetAt - now) / 1_000));

    return {
      allowed: count <= this.maxRequests,
      limit: this.maxRequests,
      remaining,
      resetAt,
      retryAfterSeconds,
    };
  }

  private cleanup(now: number): void {
    for (const [key, bucket] of this.buckets.entries()) {
      if (bucket.resetAt <= now) {
        this.buckets.delete(key);
      }
    }
  }
}
