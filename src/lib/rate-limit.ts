// Fixed-window in-memory rate limiter. Per serverless instance, so it's a
// first line of defense against bursts and brute force, not a global quota.
// Swap the store for Upstash Redis (@upstash/ratelimit) when a shared limit
// across instances is needed.

type Window = { count: number; resetAt: number };

const globalForRateLimit = global as unknown as {
  rateLimitStore: Map<string, Window> | undefined;
};

const store = (globalForRateLimit.rateLimitStore ??= new Map());

export function clientIp(req: Request): string {
  const forwarded = req.headers.get('x-forwarded-for');
  return forwarded?.split(',')[0]?.trim() || req.headers.get('x-real-ip') || 'unknown';
}

export function rateLimit(
  key: string,
  limit: number,
  windowMs: number
): { ok: boolean; retryAfterSeconds: number } {
  const now = Date.now();

  // Opportunistic cleanup so the map doesn't grow unbounded.
  if (store.size > 10_000) {
    for (const [k, w] of store) {
      if (w.resetAt <= now) store.delete(k);
    }
  }

  const window = store.get(key);
  if (!window || window.resetAt <= now) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, retryAfterSeconds: 0 };
  }

  window.count++;
  if (window.count > limit) {
    return { ok: false, retryAfterSeconds: Math.ceil((window.resetAt - now) / 1000) };
  }
  return { ok: true, retryAfterSeconds: 0 };
}

export function rateLimitResponse(retryAfterSeconds: number) {
  return new Response(
    JSON.stringify({ error: 'Too many requests. Please try again later.' }),
    {
      status: 429,
      headers: {
        'Content-Type': 'application/json',
        'Retry-After': String(retryAfterSeconds),
      },
    }
  );
}
