---
id: 2026-06-08-railway-egress-thin-client-api-gateway
type: summary
title: Railway egress, Vercel topology, and the thin-client API-gateway pattern
tags: [infrastructure, deployment, latency, edge, serverless, database, web-architecture, cost, auth]
summary: Decision rationale for moving all DB and auth access behind a co-located API so a Vercel-hosted web app opens zero raw Postgres connections — covering Railway's egress billing, the serverless-to-single-region-Postgres anti-pattern, and the latency levers that actually matter.
source_count: 0
canonical_for: [railway egress fees, vercel railway postgres latency, thin client api gateway pattern, serverless database connection pooling, better auth cross-subdomain relocation]
review_status: reviewed
last_reviewed: 2026-06-08
review_due: 2026-12-08
confidence: "0.8"
---

# Railway egress, Vercel topology, and the thin-client API-gateway pattern

Synthesized decision rationale (derived from a Penna engineering planning session, not an external source). Applies to any app running serverless compute (Vercel/Netlify) against a single-region managed Postgres (Railway/Render/Fly). Provider-pricing specifics are time-sensitive — verify against current Railway docs before quoting numbers.

## Context

Trigger question: *"Won't Next.js accessing the DB on Railway incur extra egress fees?"* The honest answer is topology-dependent, and chasing it surfaced a deeper architecture decision: stop letting edge serverless touch Postgres directly at all.

## The egress cost model (Railway)

- Railway bills **egress** (data leaving its network), **not ingress**. The query sent *to* Postgres is free; the **result rows coming back** are what can be billed.
- **Private networking (`*.railway.internal`) is free** — internal traffic between services in the same project/environment is not counted as egress.
- The **public TCP proxy (`*.proxy.rlwy.net`) is billed as egress — even between two Railway services.** A `DATABASE_URL` on the proxy host costs money and adds latency even after you co-locate everything; switch it to the `.railway.internal` host.

## The anti-pattern: edge serverless → single-region Postgres directly

1. **Connection exhaustion** — each serverless invocation opens its own un-pooled connection over the public proxy; under load this blows past `max_connections`. Usually the worst problem, ahead of the dollars.
2. **Per-query WAN latency** — every query is a cross-provider round trip.
3. **Egress** — every result row leaves over the billed proxy.

## The pattern: API gateway co-located with the DB; thin client on the edge

```
Browser ──static shell (edge, instant)── Web host (auth gate + chrome only)
   │
   └──credentialed fetch, ONE WAN leg, preflight cached──► API (same region as DB) ──private net──► Postgres
```

The API (same provider/region as Postgres) becomes the single owner of data and auth. API↔DB stays internal (sub-ms, free, pooled by one long-lived server). Only shaped JSON crosses provider boundaries, on one WAN leg — not the double hop browser→web-server→API. Secrets (LLM keys, OAuth tokens, third-party calls) live on the API, never in the browser.

## Latency levers, in order of impact (single-region backend)

1. **Co-locate the serverless function region with the DB region**; pick a region central to users. The #1 lever — kills the double WAN hop.
2. **Serve a static/edge shell** for instant global first paint. SSR against one region cannot match this.
3. **One WAN leg for data** — browser→API directly, not via a server-action proxy.
4. **Private networking** API↔DB so the only WAN leg is browser↔region.

Caveat: none of this removes the WAN RTT itself for distant users — that needs **read replicas / edge caching near users**, a separate infra decision.

## Cross-origin specifics

- Browser→cross-origin API with credentials + JSON body triggers a CORS **preflight** (`OPTIONS`) = an extra round trip to the far region. Cache it with `Access-Control-Max-Age`.
- Alternative: an edge rewrite (`app.<root>/api/* → api.<root>`) keeps requests same-origin (no preflight, simpler cookies) at the cost of an extra edge proxy hop.

## Relocating a DB-backed auth library off the edge

To get the web host to *zero* raw DB connections, auth must move too (DB-session libraries hit Postgres on every `getSession`):

- Mount the auth handler on the API; delete the web framework's auth route.
- Point the browser auth client `baseURL` at the API domain; set the library's base-URL env to the API.
- OAuth redirect URIs derive from the base URL → they move to the API domain automatically; re-register in each provider console.
- **Cross-subdomain cookies**: put web (`app.<root>`) and API (`api.<root>`) under one parent domain and enable `crossSubDomainCookies` (cookie domain `.<root>`) + `trustedOrigins`. Without a shared parent, fall back to bearer tokens.
- Replace web-side server calls to the auth instance with API session/account endpoints; keep only a cheap cookie-presence middleware on the web (no DB lookup).

## Client data layer

With the browser calling the API directly, adopt a real client cache. For mutation-heavy apps prefer **TanStack Query** over SWR: `useQuery` (skeletons key off `isPending`; `staleTime` → stale-while-revalidate), `useMutation` with `onMutate` (optimistic patch) → `onError` (rollback) → `onSettled` (invalidate). If mutations return the authoritative snapshot, `setQueryData` it to skip a refetch — instant optimistic paint instead of blocking on each round trip.

## Open questions

- When does the single-region WAN RTT justify read replicas or edge caches near users?
- Preflight caching vs. edge-rewrite same-origin proxy — which wins net latency for a globally distributed user base?
- Does streaming the first dashboard payload (server-prefetched into the query cache) beat a pure client fetch enough to be worth the added SSR surface?

## Provenance

Engineering decision rationale, Penna (2026-06-08). No external KB source note; topic is adjacent to this wiki's AI-systems focus and filed here at the maintainer's request.
