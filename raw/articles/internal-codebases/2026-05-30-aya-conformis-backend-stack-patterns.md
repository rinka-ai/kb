---
id: article-2026-05-30-aya-conformis-backend-stack-patterns
type: source
title: "Aya + Conformis Backend Stack And Patterns"
path: raw/articles/internal-codebases/2026-05-30-aya-conformis-backend-stack-patterns.md
author: AYA Labs, Conformis
publisher: Local repositories
url:
date_published:
date_added: 2026-05-30
tags: [internal-codebases, backend, backend-stack, api-architecture, hono, bun, postgres, drizzle, redis, queues, outbox, idempotency, security, aya, conformis]
status: active
quality: high
summary: "Aya and Conformis converge on a reusable backend default: Bun/Hono TypeScript services, Postgres/Drizzle persistence, Redis-backed coordination, explicit dependency envelopes, provider adapters, boundary validation, durable side-effect handling, and test-support quarantine."
related: [codebase-architecture, internal-engineering-conventions, repo-local-knowledge-bases, backend-architecture, ai-product-engineering]
---

# Aya + Conformis Backend Stack And Patterns

## Source Metadata

- Path: raw/articles/internal-codebases/2026-05-30-aya-conformis-backend-stack-patterns.md
- Author: AYA Labs (Aya), Conformis (Conformis)
- Published: Unknown
- Publisher: Local repositories
- URL:
- Local repos inspected: `/Users/josemanuelcerqueira/Desktop/aya` and `/Users/josemanuelcerqueira/Desktop/conformis`, on 2026-05-30.
- Working tree note: this note records reusable backend stack and architecture lessons; it does not modify either repo and does not treat either working tree as a clean release snapshot.
- Aya files read: `package.json`, `apps/api/package.json`, `apps/worker/package.json`, `packages/{core,db,config,logger,gateways,gateway-email,gateway-voice-call,gateway-http,types}/package.json`, `CLAUDE.md`, `docs/ARCHITECTURE.md`, `docs/DECISIONS.md`, `apps/api/src/{app,deps}.ts`, `packages/core/src/queue/{process-request-worker,outbox-drain-loop}.ts`, and test listings under `packages/core/src/**`.
- Conformis files read: `package.json`, `apps/server/package.json`, `packages/{db,contracts,validation,storage,logger}/package.json`, `AGENTS.md`, `conformis-knowledge/codebase/stack.md`, `conformis-knowledge/codebase/patterns/{domain-stores,workos-admin-client,encrypted-document-storage}.md`, `conformis-knowledge/codebase/decisions/0001-external-mutation-audit-boundary.md`, `apps/server/src/runtime/{app,deps,errors}.ts`, `apps/server/src/infra/idempotency/json-mutation.ts`, `apps/server/src/domains/transaction-context.ts`, `apps/server/src/domains/audit-plan/commit.ts`, and `apps/server/tests/**` listings.
- External docs used as authoritative anchors for the future blueprint: official docs for Bun, Hono, Drizzle, PostgreSQL, Redis locking, BullMQ, Zod, WorkOS, Resend, ElevenLabs, Telnyx, OpenRouter, OpenAI embeddings, AWS S3 encryption, OWASP API Security, and NIST CSF.
- Explicitly excluded: `.env`, `.env.*`, `accounts.json`, generated caches, `node_modules`, `.turbo`, `.next`, secret values, production payloads, tenant data, call transcripts, and full private source dumps.
- Verification attempted: source inspection only; backend services were not run and tests were not executed for Aya or Conformis.

## TL;DR

Aya and Conformis show a strong backend starting point for new internal apps: use Bun/Hono/TypeScript for thin service composition, Postgres + Drizzle for durable product state, Redis for coordination/idempotency/queues, Zod at runtime boundaries, explicit `Deps` objects instead of a DI container, provider SDKs behind app-owned adapters, domain state behind stores/sinks or core interfaces, and side effects behind either an outbox or a documented idempotent failure policy. The reusable pattern is not "copy every package." It is: name the product-owned state machine, isolate external systems, make concurrent writes deterministic, make every boundary validate/authorize/fail closed, and keep test doubles out of production code.

## Key Claims

- Both repos use a TypeScript strict monorepo with Bun runtime, Turborepo task orchestration, Hono for backend HTTP services, Postgres + Drizzle for persistence, Redis via `ioredis` for coordination, Pino for structured logging, and Zod for runtime boundary validation.
- Aya uses Bun as package manager (`bun@1.1.34`) and runtime; Conformis uses pnpm as package manager (`pnpm@9.15.4`) while server/runtime/test scripts use Bun.
- Aya separates backend deployables into `apps/api` and `apps/worker`; Conformis keeps the backend as one Bun/Hono server app under `apps/server` with no separate worker yet.
- Both repos use explicit dependency envelopes: Aya `apps/api/src/deps.ts` passes DB, logger, storage, embeddings, queues, auth, cache, gateways, and public URL; Conformis `runtime/deps.ts` groups config/logger/lifecycle, infra, auth, and stores.
- Both repos keep bootstrapping separate from route composition: `index.ts` creates process-level dependencies; `app.ts` mounts Hono middleware/routes and central error behavior.
- Aya's strongest backend pattern is provider-neutral agent/runtime architecture: `packages/core` cannot import provider SDKs or DB packages; apps/worker bind DB helper closures and gateway/model implementations at the composition root.
- Conformis' strongest backend pattern is domain persistence discipline: `apps/server/src/domains/<domain>` exposes `Store` or `Sink` interfaces; transaction-scoped facades coordinate domain writes with append-only audit events.
- Both treat validators as boundary tools, not bundle-wide defaults: Zod validates HTTP, queue payloads, env vars, LLM/tool args, and wire contracts; frontend-safe constants/types stay zod-free (`@aya/types/constants`, `@conformis/contracts`).
- Aya makes async side effects crash-safe with an outbox table plus a worker drain loop; Conformis documents the WorkOS local-audit split and uses `Idempotency-Key` caching until a future outbox is justified.
- Aya serializes per-request agent work with BullMQ jobs plus Redis locks keyed by `requestId`; Conformis coordinates local mutations through database transactions and uses Redis idempotency around JSON mutations.
- Both fail closed at external boundaries: webhook signature verification before parsing, tenant/workspace scoping before action, bounded external pagination, named provider error translation, and no provider IDs/schema details leaking into core business states.
- Both quarantine test support: Conformis requires `InMemory*`, fake clients, and seeded E2E support to live under `tests/support/`; Aya queue/worker tests prefer per-test harness factories and core test seams rather than production test doubles.
- Both encode backend architecture in markdown instructions and repo-local knowledge, so future coding agents can reuse the pattern without rediscovering it from source files.

## Important Details

- Aya root/package stack: Bun/Turborepo/TypeScript with `biome`, `knip`, `madge`, and scripts for dev/build/lint/typecheck/test/db/provisioning. API app dependencies include `hono`, `better-auth`, `ioredis`, `@hono/zod-validator`, `unpdf`, AWS S3 client, and workspace packages. Worker dependencies include `openai`, gateway packages, DB/config/logger/types, and Zod.
- Aya `packages/core` depends on `@aya/gateways`, `@aya/logger`, `@aya/types`, `bullmq`, `ioredis`, `libphonenumber-js`, and `zod`; it deliberately does not depend on `@aya/db` or provider SDK packages.
- Aya `packages/db` owns Drizzle/Postgres (`drizzle-orm`, `postgres`, `drizzle-kit`) and exports schema/subpaths. `packages/config` validates env with Zod. `packages/logger` wraps Pino. `packages/types` exports a zod-free `./constants` subpath. Gateway packages isolate Resend/Svix, voice webhook normalization, HTTP scraping/readability, and provider interfaces.
- Aya `docs/ARCHITECTURE.md` names the core rule: the agent core knows no channels or providers; gateways normalize provider events into Aya-owned envelopes and translate proposed outbound actions into provider calls.
- Aya `apps/api/src/app.ts` composes Hono routes for health/auth/me/admin/tenants/tools/webhooks, mounts Better Auth session/role guards, restricts CORS to allowed origins, and verifies ElevenLabs/Resend webhook signatures before route handlers run.
- Aya `apps/api/src/deps.ts` is intentionally simple: a typed object passed into route groups. Routes do not load config or create DB clients. This keeps tests and future apps from importing global singletons by accident.
- Aya `packages/core/src/queue/process-request-worker.ts` mirrors DB helper signatures locally so core stays free of `@aya/db`; worker composition passes closures. The worker validates BullMQ job payloads, acquires a Redis request lock, claims the request, loads context, chooses webhook-fast-path vs model-fallback path, and persists outcomes/outbox intents through injected functions.
- Aya `packages/core/src/queue/outbox-drain-loop.ts` owns the row pipeline: claim due rows, build outbound message, send through gateway, classify result, record gateway delivery, and mark succeeded/failed/retry. Concrete email copy and payload building live outside core.
- Aya backend state model: Request/session/run/outbox/gateway_delivery tables separate business lifecycle, event history, execution attempts, delivery intents, and provider results. Outcomes are business-level; failure details live in event metadata.
- Conformis root stack: pnpm workspaces plus Bun/Turborepo/TypeScript. Server app dependencies include `hono`, `drizzle-orm`, `ioredis`, `@workos-inc/node`, `jose`, `zod`, and internal packages.
- Conformis shared packages: `@conformis/contracts` is zod-free route constants/wire types; `@conformis/validation` owns Zod runtime schemas; `@conformis/db` owns Drizzle schema/migrations/client; `@conformis/storage` owns AES-256-GCM object encryption; `@conformis/logger` wraps Pino.
- Conformis `apps/server/src/runtime/app.ts` composes Hono routes, CORS, global `onError`, and `notFound` handling. The app emits one stable error envelope: `{ error: { code, message } }`.
- Conformis `apps/server/src/runtime/deps.ts` builds DB, app DB transactor, Redis, JWKS verifier, encrypted document storage, WorkOS admin client, health checker, domain stores, and optional E2E-only support modules through dynamically imported `tests/support/*` hooks gated by config/environment.
- Conformis `AGENTS.md` enforces server source organization: `domains/` for product logic and stores/sinks, `routes/` for Hono surfaces/handlers, `infra/` for external/framework wrappers, and `runtime/` for boot/config/deps/errors/logger. Only `src/index.ts` lives at server source root.
- Conformis `domain-stores.md` is the reusable persistence model: aggregate-shaped reads, named domain writes, named conflict errors over raw Postgres codes, tenant-scoped keys, transaction context for coordinated audit writes, and `Sink` for append-only streams.
- Conformis `transaction-context.ts` binds store/sink facades to the current `AppDbExecutor`; `audit-plan/commit.ts` writes plan mutations and audit events inside one transaction.
- Conformis `idempotentJsonMutation` fingerprints `method + path + actor + body`, claims a Redis idempotency lease, and changes cleanup behavior depending on whether the handler called `markExternalMutationSucceeded()` or `markCommitted()`. This protects WorkOS mutations from being replayed after the external side effect has fired.
- Conformis `workos-admin-client.md` maps WorkOS SDK types/errors into app-owned types/errors, keeps SDK types out of handlers, and bounds external cursor scans to explicit page caps that fail closed.
- Conformis `encrypted-document-storage.md` describes an app-level AES-256-GCM envelope before S3 writes, AAD-bound headers, key-provider abstraction, boot-time key validation, descriptor verification on download, and typed storage errors separate from HTTP errors.

## Entities

- Repositories: `/Users/josemanuelcerqueira/Desktop/aya`, `/Users/josemanuelcerqueira/Desktop/conformis`
- Backend apps: Aya `apps/api`, Aya `apps/worker`, Conformis `apps/server`
- Shared packages: `@aya/core`, `@aya/db`, `@aya/config`, `@aya/logger`, `@aya/types`, `@aya/gateways`, `@aya/gateway-*`; `@conformis/contracts`, `@conformis/db`, `@conformis/logger`, `@conformis/storage`, `@conformis/validation`
- Stack: Bun, Turborepo, TypeScript strict, Hono, Postgres, Drizzle ORM, Redis, ioredis, BullMQ (Aya), Zod, Pino, Biome/ESLint, Playwright/smoke tests
- Providers/adapters: Better Auth, WorkOS, Resend, ElevenLabs, Telnyx, OpenRouter, OpenAI embeddings, AWS/S3-compatible object storage, jose/JWKS
- Reusable backend patterns: explicit dependency envelope, composition root, provider adapter/gateway, domain store/sink, transaction context, outbox, Redis lock, idempotent JSON mutation, webhook verify/dedupe/ack, named error envelope, zod-free contracts plus validation package, encrypted storage package, test-support quarantine

## My Notes

- The strongest shared default is "thin framework, strong boundaries." Hono is not the architecture; the architecture is the app-owned dependency graph, route grouping, validation boundary, provider adapter, and domain state model around it.
- Aya and Conformis make two different side-effect tradeoffs. Aya uses outbox because request-derived broker notification must be crash-safe and retryable. Conformis uses idempotent fail-fast around WorkOS because a full external-mutation outbox would be larger than the slice. The blueprint should teach both, with a decision rule for when to upgrade to outbox.
- Conformis' `Store`/`Sink` language is worth reusing for compliance or aggregate-heavy products. Aya's provider-neutral `core` language is worth reusing for AI/voice/integration-heavy products. A generic app does not need both on day one; it needs one crisp boundary style for its real invariants.
- Both repos preserve bundle and mental-model health by separating zod-free constants/contracts from Zod validation. That belongs in any new app template because validator leakage is easy for coding agents to create accidentally.
- Both repos encode "do not invent architecture" in instructions. This is one reason coding agents perform better there: the repos have named places for backend concerns, and the agent can fit work into them rather than deciding from scratch.
- The backend blueprint should explicitly tell future agents to read provider docs before integration work. Aya already names that failure mode; the KB should make it cross-project policy for backend providers.

## Open Questions

- Should the workspace extract a real backend starter template (apps/api, apps/worker, packages/db/config/logger/contracts/validation) or keep this as a KB blueprint until the next app proves the exact package split?
- Should new apps default to Aya's outbox from day one, or only adopt it after the first external side effect that must be crash-safe/audited?
- Should Conformis' `Store`/`Sink` pattern be the default for all domain persistence, or reserved for aggregate/compliance-heavy systems where generic CRUD would hide invariants?
- Should the zod-free contracts plus validation split become a mandatory package convention across future apps?
- Should Redis locks/idempotency have a shared test harness package, or stay app-local because each app's concurrency key and failure policy differ?

## Related

- [[codebase-architecture]]
- [[internal-engineering-conventions]]
- [[repo-local-knowledge-bases]]
- [[2026-05-27-aya]]
- [[2026-05-27-conformis]]
- [[2026-05-27-aya-conformis-internal-codebase-patterns]]
- [[2026-05-30-app-template-design-system-blueprint]]

## Source Text

Selected source anchors inspected (no secrets or large private code copied):

- Aya `CLAUDE.md`: backend stack table names Bun, Hono, Postgres + Drizzle + pgvector, BullMQ/Redis, Better Auth, Resend, Telnyx, ElevenLabs, OpenRouter, OpenAI embeddings, S3, Pino, Biome, Zod, Railway, EU region, EN/PT.
- Aya `CLAUDE.md`: "Zod schemas at every boundary: HTTP requests, queue payloads, LLM tool args, env vars."
- Aya `CLAUDE.md`: "packages/core may not import provider SDKs"; concrete implementations live in `packages/gateway-*`.
- Aya `CLAUDE.md`: "Webhook handlers: verify signature -> dedupe -> enqueue -> return 200 fast."
- Aya `CLAUDE.md`: "All side effects go through the outbox pattern."
- Aya `CLAUDE.md`: per-request serialization uses Redis lock `lock:request:{requestId}` with 60s TTL, lease token, and heartbeat extension.
- Aya `docs/ARCHITECTURE.md`: core sees normalized Requests and proposed actions; gateways translate provider events and provider API calls.
- Aya `apps/api/src/app.ts`: Hono composition mounts health/auth/me/admin/tenant/tool/webhook route groups and signature middleware.
- Aya `apps/api/src/deps.ts`: typed dependency envelope includes DB, logger, object storage, embeddings, queues, auth, cache, email gateway, and public app URL.
- Aya `packages/core/src/queue/process-request-worker.ts`: local DB-helper type mirrors keep core free of `@aya/db`; worker validates job payload and takes per-request lock.
- Aya `packages/core/src/queue/outbox-drain-loop.ts`: comments name the lifecycle as claim, build, dispatch, persist, retry.
- Conformis `AGENTS.md`: server source is grouped by `domains`, `routes`, `infra`, and `runtime`; test doubles live under `tests/support/`.
- Conformis `codebase/stack.md`: stack is Bun, Hono, Zod, ioredis, WorkOS, jose, Drizzle, Postgres, and shared packages.
- Conformis `domain-stores.md`: domains own a Store or Sink; reads are aggregate-shaped and writes are named domain operations.
- Conformis `runtime/app.ts`: Hono app composition, CORS, route mounting, `onError`, and stable error envelope.
- Conformis `runtime/deps.ts`: builds app DB transactor, Redis, JWKS, encrypted storage, WorkOS admin client, stores, idempotency, and gated E2E support.
- Conformis `infra/idempotency/json-mutation.ts`: `markExternalMutationSucceeded` switches failure cleanup to cached 500 so WorkOS is not called again on retry.
- Conformis `transaction-context.ts`: transaction-scoped facades bind store/sink methods to the current DB executor.
- Conformis `encrypted-document-storage.md`: AES-256-GCM encryption before S3 writes, AAD-bound header, key-provider abstraction, and typed storage errors.
