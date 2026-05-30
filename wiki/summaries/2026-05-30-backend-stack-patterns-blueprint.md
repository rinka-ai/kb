---
id: summary-2026-05-30-backend-stack-patterns-blueprint
type: summary
title: Backend Stack And Patterns Blueprint
tags: [backend, backend-stack, api-architecture, hono, bun, postgres, drizzle, redis, queues, outbox, idempotency, security, blueprint]
summary: "A retrieve-before-you-build backend blueprint for new apps/features: default Bun/Hono/TypeScript stack, package boundaries, API/runtime composition, persistence, queues/outbox/idempotency, provider adapters, validation, security, test support, and authoritative resources distilled from Aya and Conformis."
source_count: 4
canonical_for: [backend blueprint, backend stack, backend patterns, api architecture, outbox pattern, provider adapters, domain stores, idempotent mutations, Bun Hono backend default]
review_status: reviewed
last_reviewed: 2026-05-30
review_due: 2026-08-30
confidence: "0.84"
---

# Backend Stack And Patterns Blueprint

## Summary

This is the backend companion to [[2026-05-30-app-template-design-system-blueprint]]. Retrieve it before creating a new backend app, API surface, worker, provider integration, or durable mutation flow.

The core lesson from [[2026-05-27-aya|Aya]] and [[2026-05-27-conformis|Conformis]] is that great coding tools start with excellent defaults. For backend work, the defaults are not just libraries. They are package boundaries, composition roots, dependency envelopes, state machines, validation boundaries, provider adapters, side-effect policies, and tests that make the next correct move obvious.

The default posture: **Bun + Hono + strict TypeScript, Postgres + Drizzle, Redis for coordination, Zod at boundaries, explicit dependencies, app-owned provider adapters, durable side-effect handling, and a test-support quarantine.**

## When To Use This Blueprint

- Starting a new backend service, API app, worker, integration app, or SaaS/admin backend.
- Adding a new provider integration, webhook ingress, queue worker, idempotent mutation, file-storage path, or domain aggregate.
- Briefing a coding agent so it builds from existing boundaries instead of scattering SDK calls, validators, raw SQL, and one-off route logic.
- Auditing an app that "works" but has hidden side-effect, concurrency, validation, or provider-boundary risk.

Skip it for tiny scripts and pure one-off migrations where a full app boundary would be theater.

## Recommended Default Stack

| Layer | Default | Rule |
|---|---|---|
| Runtime | **Bun** | Use Bun for local dev, server runtime, scripts, and tests unless hosting constraints say otherwise. Keep `@types/bun` installed for TS projects. |
| HTTP | **Hono** | Thin route composition; app-owned middleware/error envelopes; no framework magic as architecture. |
| Language | **TypeScript strict** | Strict mode, named constants for enum-shaped values, branded IDs where domain identity matters. |
| Database | **Postgres + Drizzle ORM** | Schema and migrations are code-reviewed artifacts. Use transactions for multi-write invariants. Raw SQL only when it is the clearest expression or migration-level work. |
| Coordination | **Redis via ioredis** | Idempotency leases, request locks, queues, rate/session primitives. |
| Queue/workers | **BullMQ** when jobs/worker retries are real | Good fit for Aya-style async processing. Do not add a worker until a side effect or long-running process needs one. |
| Validation | **Zod at boundaries** | HTTP body/query/path, env vars, queue payloads, webhooks, LLM/tool args, provider payload normalization. Keep client-safe constants/contracts zod-free. |
| Logging | **Pino-style structured logs** | No `console.log` in committed backend code. Log fields are operational evidence. |
| Auth | Product-specific adapter: Better Auth (Aya) / WorkOS (Conformis) | SDK behind local auth/admin interfaces; handlers consume actor/session/workspace abstractions, not SDK objects. |
| Storage | S3-compatible object store; app-level encryption for sensitive files | Store descriptors, not guessed keys. Sensitive bytes should be encrypted before object-store write when the bucket is not the trust boundary. |
| AI/providers | OpenRouter/OpenAI/ElevenLabs/Telnyx/Resend/etc. behind interfaces | Read official provider docs before integration work. Provider SDK types stay inside adapters/gateways. |
| Tests | Bun test + smoke/integration harnesses | Test the boundary policy, not only happy paths. Test doubles live under `tests/support/`, not deployable source. |

## Backend Package Shape

Start with a simple package split and earn more packages later.

For a single backend app:

```
apps/server or apps/api
packages/db
packages/config
packages/logger
packages/contracts        # zod-free route constants / shared wire types
packages/validation       # Zod schemas mirroring contracts, if shared
packages/storage          # only if sensitive/object storage is central
```

For an AI/integration product with async delivery:

```
apps/api                  # Hono HTTP ingress/composition
apps/worker               # queue consumers/outbox drain loops
packages/core             # provider-neutral domain/runtime logic
packages/gateways         # provider-agnostic gateway interfaces
packages/gateway-email    # concrete SDK/provider package
packages/gateway-voice    # concrete SDK/provider package
packages/db/config/logger/types
```

Package rules:

- Every package gets one ownership sentence. If you cannot write it, do not create the package.
- `apps/*/src/index.ts` bootstraps only: config, logger, DB, Redis, providers, app creation, graceful shutdown.
- `app.ts` composes Hono, middleware, route groups, global error behavior, and not-found behavior.
- Route `index.ts` files are routing tables; endpoint files live under `handlers/`; `schema.ts` owns HTTP boundary schemas.
- `runtime/` is boot/config/deps/errors/logger. No product rules there.
- `infra/` wraps external/framework concerns: auth, idempotency, provider clients, health, storage adapters.
- `domains/` owns product logic, state transitions, store/sink interfaces, policy checks, and named errors.
- Shared contracts/constants used by client code must not import Zod. Put schemas in a validation package or server-only module.

## Dependency Envelope

Use an explicit typed `Deps` object, not an implicit global dependency soup and not a heavyweight DI container.

Recommended shape:

```
interface Deps {
  config: Config;
  logger: Logger;
  lifecycle: { shutdownSignal: ShutdownSignal };
  infra: {
    db: Db;
    appDb: AppDbTransactor;
    redis: Redis;
    storage?: DocumentStorage;
    healthChecker: HealthChecker;
  };
  auth: {
    tokenVerifier: AuthTokenVerifier;
    adminClient?: ProviderAdminClient;
  };
  queues?: {
    processThing: Queue;
  };
  gateways?: {
    email?: OutboundGateway;
    voice?: InboundGateway;
  };
  stores: {
    [domain: string]: DomainStore | DomainSink;
  };
}
```

Rules:

- `createDeps(config, logger)` builds process-level singletons once.
- Route groups receive only the dependencies they need.
- Handlers do not call `loadConfig()`, create DB clients, instantiate SDKs, or import env directly.
- Test harnesses inject fake/in-memory implementations through the same interfaces, but the fake classes live outside deployable `src`.

## API Route Shape

Handlers should read as orchestration through named steps:

1. Read actor/session/workspace context.
2. Parse and validate path/query/body with Zod.
3. Authorize before loading or mutating sensitive resources.
4. Load aggregate or provider resource through an app-owned store/client.
5. Apply domain transition/policy guard.
6. Commit through transaction/outbox/idempotency helper.
7. Return a stable response/error envelope.

Prefer imperative early-return guards and typed errors. Do not introduce `Result`/`Effect` chains unless the whole codebase is built around them.

Stable error envelope:

```
{ "error": { "code": "BAD_REQUEST", "message": "request body must be valid JSON" } }
```

Named backend error codes should be finite and boring: `BAD_REQUEST`, `UNAUTHORIZED`, `FORBIDDEN`, `NOT_FOUND`, `CONFLICT`, `PAYLOAD_TOO_LARGE`, `UNSUPPORTED_MEDIA_TYPE`, `INTERNAL_SERVER_ERROR`, `SERVICE_UNAVAILABLE`.

When a stable response envelope repeats across several Next proxy routes, centralize the envelope and small parsing helpers in a narrow server-only module. Keep the helper boring: map known app-owned API errors, emit the shared `{ error: { code, message } }` shape, and rethrow unknown errors so real defects still reach the framework/runtime error path.

Schema files can also be compatibility facades. If validation ownership moves into a shared `@app/validation` package and frontend-safe wire types live in `@app/contracts`, keep route-local `schema.ts` files as re-export facades when that preserves existing handler imports without duplicating large Zod schemas.

## Persistence Patterns

Use Postgres transactions when multiple local writes encode one invariant. PostgreSQL's transaction model gives the all-or-nothing, invisible-until-commit semantics that Conformis uses for audit-event + domain-state commits.

Choose one boundary style per domain:

- **Store** — aggregate with lifecycle: aggregate-shaped reads, named writes, no generic CRUD on the aggregate root.
- **Sink** — append-only stream such as audit events; intentionally no update/delete.
- **Core repository functions** — fine for smaller products when the package boundary is already strong, but still use product-owned types and named operations.

Rules:

- Reads return aggregates or named slices, not arbitrary row fragments.
- Writes are domain verbs (`grant`, `revoke`, `saveApproval`, `record`) rather than generic `update`.
- Translate DB conflicts into named domain errors; handlers should not inspect raw driver codes.
- Tenant/workspace-owned tables carry tenant/workspace keys and query helpers must scope by them every time.
- Keep provider payloads out of canonical tables. Store provider raw payloads for replay/debugging if needed, but downstream logic reads app-owned normalized fields.

For Drizzle/Postgres error handling, do not rely on a top-level `err.code`. ORMs and drivers may wrap the real Postgres error under `cause`, so a small infra helper should walk a bounded cause chain and classify only the specific database facts the app needs. Unique checks may be permissive when a driver omits constraint names; foreign-key checks should require the expected constraint name so unrelated FK failures do not become false domain errors. Test this helper with plain wrapped error objects instead of requiring a live database.

## Side Effects, Queues, And Idempotency

Pick the smallest side-effect policy that is honest about failure.

Use **direct in-transaction local writes** when all state is in your database.

Use **idempotent fail-fast** when a small slice calls an external system before local audit/state and a full outbox is not yet warranted:

- Require `Idempotency-Key` for mutation routes where retries can duplicate external side effects.
- Fingerprint method + path + actor + body.
- Once the external mutation succeeds, do not release the idempotency lease on later failure.
- Cache the 500 body if the local audit/state write fails, so a retry does not call the provider again.
- Log/page the failure; manual reconciliation is required.

Use a **durable outbox** when the side effect must be crash-safe, retryable, audited, or ordered with app-owned state:

1. Inside the same DB transaction as the domain mutation, insert an outbox row describing intent.
2. A worker claims due rows with a lease.
3. Worker builds provider message from app-owned state.
4. Gateway sends.
5. Worker records delivery result and marks succeeded/failed/retry.

Use **queue + Redis lock** when work can be triggered concurrently but must serialize by business key:

- Deduplicate inbound event (`webhook:{provider}:{event_id}`).
- Enqueue job with stable `jobId` where possible.
- Acquire `lock:{businessKey}:{id}` with TTL and a random lease token.
- Heartbeat/extend locks for long LLM/provider calls.
- Re-enqueue with jitter if lock is busy.
- Keep lock ownership and stale-lease caveats documented; add a durable `lease_token` column if duplicate sends become unacceptable.

## Provider Adapter Rules

- SDKs belong in `infra/*`, `packages/gateway-*`, or provider-specific packages, not in domain/core logic.
- Handlers see local interfaces (`WorkOsAdminClient`, `OutboundGateway`, `ModelProvider`, `DocumentStorage`), not SDK types.
- Map provider errors into app-owned errors at the adapter boundary.
- Bound external pagination with an explicit page cap and fail closed when exhausted.
- Provider identifiers, channel names, and failure subreasons live in metadata/events, not lifecycle enum names.
- Read official provider docs before writing/changing integration code; cite URLs in the PR or response.

## Webhook Ingress Rules

Every provider webhook should follow the same order:

1. Read raw body before JSON parsing.
2. Verify signature/auth with constant-time compare or official verifier.
3. Reject timestamps outside a short replay window when provider supplies one.
4. Deduplicate event id with Redis/database.
5. Ack quickly; enqueue or persist intent for real work.
6. Store raw payload only when it helps replay/debugging; normalize into app-owned fields before business logic reads it.

For real-time agent tools, validate args and return structured 200-level tool errors when the provider agent can adapt mid-call; reserve transport errors for auth/provider failures.

## Security Baseline

- Default-deny authorization; authorize before exposing existence across tenant/workspace boundaries.
- Use 404 instead of 403 when revealing resource existence would leak cross-tenant data.
- Bounded pagination for external provider scans and internal list routes.
- CORS allow-list, not wildcard credentials.
- Validate env vars at boot; secrets are not optional at runtime unless the mode explicitly gates them.
- Sensitive object storage: route resolves descriptors from domain records; clients never submit raw storage keys for download.
- Audit logs are append-only sinks; successful disclosure of confidential bytes emits an audit event.
- Do not expose raw JSON blobs, UUIDs, provider ids, storage keys, embeddings, distances, or secret-adjacent metadata in user-facing API responses unless the product explicitly needs them.
- Use OWASP API Security as the general risk checklist and NIST CSF for governance/compliance mapping in regulated products.

## Test And Verification Rules

- Smoke tests cover route envelope, auth/authorization, CORS, config validation, and representative domain transitions.
- Integration tests cover real Postgres/Redis/storage behavior where driver semantics matter: conflicts, transactions, idempotency leases, encryption/tamper detection.
- Queue/worker tests use per-test `buildHarness(...)` state, not shared module-level mutable state.
- In-memory stores/fakes live under `tests/support/`; production source may import them only through explicitly gated E2E runtime hooks.
- Add tests for failure policy, not just success: duplicate idempotency key, provider succeeds then audit fails, webhook duplicate, lock busy, provider throws, storage tamper, bounded-pagination cap.
- Run typecheck/lint/test for touched packages; for KB-only updates here, `bun run kb:refresh` is enough.

## Anti-Patterns To Reject

Provider SDK imports inside core/domain/handlers · direct external side effects inside webhook request/response cycle · generic `utils` folders · raw SQL scattered through handlers · generic CRUD stores for aggregate-heavy domains · Zod imported into client-safe constants/contracts · unbounded cursor loops · raw provider payloads as canonical state · `router.refresh()`-style backend equivalent of "just re-run everything" · magic strings for lifecycle/status/provider values · test doubles in deployable source · silent best-effort audit drops · retrying external mutations without idempotency · adding a worker/queue/package before a real slice needs it.

## How To Prompt A Coding Agent With This Blueprint

1. "Before backend work, read `wiki/summaries/2026-05-30-backend-stack-patterns-blueprint.md` and follow its stack, package, dependency, validation, side-effect, and test rules."
2. "Use the existing composition root and `Deps` envelope. Do not instantiate config/DB/SDK clients inside route handlers."
3. "Put provider SDK calls behind an app-owned adapter/gateway. Handlers/core consume local interfaces and normalized types."
4. "For local multi-write invariants, use a DB transaction. For external side effects, choose idempotent fail-fast or outbox and explain why."
5. "Add Zod only at runtime boundaries; keep client-safe constants/contracts zod-free."
6. "Implement webhook ingress as raw-body verify -> dedupe -> ack/queue. Do not do heavy work in the provider HTTP request."
7. "Keep test doubles under `tests/support/`; add failure-policy tests for the touched path."
8. "Read official provider docs before integration changes and cite the URLs."

## Authoritative Resources Inventory

Use primary docs first:

- **Bun runtime/TypeScript/test docs** — https://bun.com/docs/runtime/typescript and https://bun.com/docs/test — runtime, TS compiler options, built-in tests, scripts.
- **Hono docs** — https://hono.dev/docs and https://hono.dev/docs/guides/middleware — routing, middleware, validation, error handling.
- **Drizzle ORM docs** — https://orm.drizzle.team/docs and https://orm.drizzle.team/docs/transactions — schema, migrations, transactions.
- **PostgreSQL docs** — https://www.postgresql.org/docs/current/tutorial-transactions.html and https://www.postgresql.org/docs/current/datatype-json.html — transactions, JSONB, indexing.
- **Redis distributed locks** — https://redis.io/docs/latest/develop/clients/patterns/distributed-locks/ and https://redis.io/docs/latest/commands/set/ — `SET NX`/expiry/lease-token lock basics.
- **BullMQ docs** — https://docs.bullmq.io/ — Redis-backed queue/worker/job semantics.
- **Zod docs** — https://zod.dev/ — TypeScript-first runtime validation.
- **WorkOS docs** — https://workos.com/docs/reference/user-management/invitation/send — organizations, users, invitations, admin API surfaces.
- **Better Auth docs** — https://better-auth.com/docs/basic-usage and https://better-auth.com/docs/concepts/typescript — TypeScript auth/session integration.
- **Resend webhooks docs** — https://resend.com/docs/webhooks/introduction — webhook event delivery and retry behavior.
- **ElevenLabs Conversational AI webhooks/tools docs** — https://elevenlabs.io/docs/conversational-ai/workflows/post-call-webhooks and https://elevenlabs.io/docs/eleven-api/resources/webhooks — post-call webhook/tool integration surfaces.
- **Telnyx SIP trunking docs** — https://developers.telnyx.com/docs/voice/sip-trunking/get-started/ — SIP trunking and voice routing.
- **OpenRouter API docs** — https://openrouter.ai/docs/api-reference/overview — provider-routed chat completion APIs.
- **OpenAI embeddings docs** — https://platform.openai.com/docs/guides/embeddings — embedding model/API behavior for retrieval pipelines.
- **AWS S3 encryption docs** — https://docs.aws.amazon.com/amazon-s3-encryption-client/latest/developerguide/client-server-side.html and https://docs.aws.amazon.com/AmazonS3/latest/userguide/specifying-s3-encryption.html — client-side vs server-side encryption tradeoffs.
- **OWASP API Security Top 10** — https://owasp.org/API-Security/ — API authorization/object access/security-misconfiguration checklist.
- **NIST Cybersecurity Framework** — https://www.nist.gov/cyberframework — governance/risk/compliance framing for regulated products.

## Source Notes

- [[2026-05-30-aya-conformis-backend-stack-patterns]] — combined backend/source teardown this blueprint distills.
- [[2026-05-30-conformis-cleanup-helpers-commit]] — Conformis commit showing small shared boundary helpers for Postgres errors, JSON payloads, Next API responses, and route schema facades.
- [[2026-05-27-aya]] — Aya internal codebase source note.
- [[2026-05-27-conformis]] — Conformis internal codebase source note.
- [[2026-05-27-aya-conformis-internal-codebase-patterns]] — broader internal-codebase architecture synthesis.
- [[2026-05-30-app-template-design-system-blueprint]] — frontend/design-system companion blueprint.

## Related

- [[codebase-architecture]]
- [[internal-engineering-conventions]]
- [[repo-local-knowledge-bases]]
