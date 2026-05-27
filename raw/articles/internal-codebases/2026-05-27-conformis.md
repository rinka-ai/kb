---
id: article-2026-05-27-conformis
type: source
title: "Conformis Internal Codebase"
path: raw/articles/internal-codebases/2026-05-27-conformis.md
author: Conformis
publisher: Local repository
url:
date_published:
date_added: 2026-05-27
tags: [internal-codebases, conformis, grc, audit, monorepo, knowledge-vault, workos, encrypted-storage, codebase-architecture]
status: active
quality: high
summary: "Conformis is an internal GRC/audit codebase whose strongest reusable patterns are a repo-local knowledge vault, domain-store boundaries, append-only audit logging, WorkOS adapter isolation, zod-free contracts, encrypted document storage, and strict test-support separation."
related: [codebase-architecture, internal-engineering-conventions, repo-local-knowledge-bases, personal-knowledge-bases, ai-interface-design]
---

# Conformis Internal Codebase

## Source Metadata

- Path: raw/articles/internal-codebases/2026-05-27-conformis.md
- Author: Conformis
- Published: Unknown
- Publisher: Local repository
- URL:
- Local repo inspected: `/Users/josemanuelcerqueira/Desktop/conformis`
- Inspected revision: `789a9034cffc960bedce5f53249879dbf8e72795` on 2026-05-27.
- Working tree note: repo had local modifications in `apps/web/next-env.d.ts` and `conformis-knowledge/.obsidian/graph.json` at inspection time; this note records durable architecture and conventions, not a clean-release snapshot.
- Code and docs read: `README.md`, `AGENTS.md`, `CLAUDE.md`, `package.json`, `turbo.json`, `commitlint.config.cjs`, app/package manifests, `conformis-knowledge/index.md`, `conformis-knowledge/meta/schema.md`, codebase/product/design vault pages, representative server runtime/domain/route/infra files, storage package files, and source-tree listings under `apps/` and `packages/`.
- Explicitly excluded: `.env`, `.env.*`, `accounts.json`, generated caches, `node_modules`, `.turbo`, secret values, and full private source dumps.
- Verification attempted: source inspection only; tests were not run.

## TL;DR

Conformis is useful to the KB because it treats product, codebase, and design knowledge as part of the repository architecture. The repo pairs a compliance-heavy product domain with a local `conformis-knowledge/` vault, strict server source organization, aggregate-shaped domain stores, append-only audit sinks, WorkOS adapter boundaries, idempotent mutation handling, encrypted document storage, and test-only support modules kept outside deployable source.

## Key Claims

- Conformis is a Turborepo workspace with a Next.js web app, a Bun/Hono server, shared packages, Drizzle-managed schema/migrations, WorkOS-backed auth/access control, encrypted document storage, and a repo-local knowledge vault.
- `AGENTS.md` is the canonical instruction file; `CLAUDE.md` only points back to it.
- The `conformis-knowledge/` vault is not a side note. It is a committed project memory layer for product truth, codebase conventions, design decisions, raw snapshots, glossary/loadouts, and a log.
- The vault has its own operating manual and update discipline: read the relevant index before non-trivial work, propose/update pages after learning something durable, keep raw files immutable, update glossary/loadouts/index/log when the schema requires it.
- Server code is organized into four concerns: `domains/` for product logic, `routes/` for Hono surfaces and handlers, `infra/` for external/framework wrappers, and `runtime/` for boot/config/deps/errors/logger.
- Domains own persistence through `Store` or `Sink` interfaces. Stores model aggregate lifecycles; sinks model append-only streams such as audit events.
- Mutations that must coordinate domain writes with audit events go through `TransactionContext`, so route/commit code can write through transaction-scoped facades rather than direct Drizzle calls.
- The product encodes GIAS/internal-audit expectations as structural guarantees: default-deny access, recorded board approvals, immutable audit logs, separation of duties, and break-glass auditability.
- WorkOS integration is adapter-isolated. The app depends on local `WorkOsAdminClient` and `AuthTokenVerifier` abstractions, not SDK types in handlers.
- External WorkOS mutation plus local audit recording has a known split-brain risk; the repo documents a fail-fast idempotency-cache policy and names durable outbox as the next stronger boundary.
- `@conformis/contracts` contains zod-free frontend-safe constants and types; `@conformis/validation` contains runtime Zod schemas that mirror those contracts at boundaries.
- `@conformis/storage` owns AES-256-GCM application-level envelope encryption before S3 writes, with a key-provider abstraction shaped for later KMS.
- Test doubles, in-memory stores, seeded E2E clients, and assertion helpers live under `tests/support/`, not deployable `src/` trees or public package exports.
- The design system favors calm, exacting, high-density operational UI for GRC work, with implementation tokens in `apps/web/src/app/globals.css` and visual reference in `docs/BRAND.html`.

## Important Details

- Root `package.json` uses `pnpm@9.15.4` as package manager while scripts use Bun/Turbo: `dev`, `build`, `db:generate`, `db:migrate`, `db:studio`, `start`, `lint`, `commitlint`, `typecheck`, and `test`.
- Root `turbo.json` declares env/pass-through variables for database, server URL, document encryption, idempotency, Redis, S3, WorkOS, and runtime config.
- `apps/server/package.json` uses Bun/Hono, WorkOS SDK, jose, ioredis, Drizzle, Zod, and internal packages.
- `apps/web/package.json` uses Next.js 16, React 19, WorkOS AuthKit Next.js, React Query, Lucide, skeleton loading, and Playwright.
- Shared packages are `@conformis/contracts`, `@conformis/db`, `@conformis/logger`, `@conformis/storage`, and `@conformis/validation`.
- `conformis-knowledge/index.md` catalogs product, codebase, design, raw, and meta sections; the codebase layer already names patterns such as domain stores, HTTP error envelopes, encrypted storage, WorkOS auth/admin, audit write routes, audit-log read surface, and audit-universe routes.
- `conformis-knowledge/meta/schema.md` defines the vault as a three-layer system: raw sources, wiki pages, and schema, with ingest/query/lint loops.
- `conformis-knowledge/codebase/repo-layout.md` records the server source layout and the package/app structure; this is actively referenced from `AGENTS.md`.
- `conformis-knowledge/codebase/patterns/domain-stores.md` gives the most reusable codebase pattern: aggregate-shaped reads, named writes, transaction context, named conflict errors, tenant-scoped persistence keys, and test doubles outside production code.
- `apps/server/src/runtime/app.ts` centralizes Hono app composition, CORS, route mounting, error-envelope handling, and not-found behavior.
- `apps/server/src/runtime/deps.ts` builds runtime dependencies: DB, app DB transactor, Redis, JWKS, encrypted storage, health checker, WorkOS verifier/admin client, stores, idempotency, and optional E2E runtime support.
- `apps/server/src/domains/transaction-context.ts` binds transaction-scoped facades for audit events, audit plans, audit universe, and role assignments.
- `apps/server/src/domains/audit-plan/commit.ts` commits domain writes and audit events in one app DB transaction.
- `apps/server/src/routes/audit-plans/handlers/transition-audit-plan.ts` shows the route shape: read actor, parse path/body, assert permission, load aggregate, apply transition guard, check risk readiness, build audit event, commit transaction, mark idempotency committed.
- `apps/server/src/infra/idempotency/json-mutation.ts` standardizes Idempotency-Key behavior and the external-mutation failure policy.
- `apps/server/src/infra/workos-admin/pagination.ts` bounds active membership lookup to 5 WorkOS pages and fails closed if the cap is exhausted.
- `packages/storage/src/encrypted-document-storage.ts` provides upload/download APIs over an `ObjectStore` and `DocumentKeyProvider`, returning a `DocumentObjectDescriptor`.

## Entities

- Repository: `/Users/josemanuelcerqueira/Desktop/conformis`
- Product: Conformis
- Domain: governance, risk, compliance, internal audit, Audit Plan workflow
- Apps: `apps/web`, `apps/server`
- Packages: `@conformis/contracts`, `@conformis/db`, `@conformis/logger`, `@conformis/storage`, `@conformis/validation`
- Knowledge vault: `conformis-knowledge/`
- Runtime technologies: pnpm, Bun, Turborepo, TypeScript, Hono, Next.js, React, Redis, Drizzle, Postgres, WorkOS, jose, Zod, Playwright
- Product concepts: Audit Plan, Audit Universe, RiskAssessment, role assignments, separation of duties, audit log, supporting documents, approval evidence, amendments
- Reusable patterns: repo-local vault, domain stores/sinks, transaction context, append-only audit sink, idempotent mutation helper, WorkOS adapter, bounded external pagination, encrypted object storage, zod-free contracts plus runtime validation, test-support quarantine

## My Notes

- Conformis is the clearest local example of a repo-local knowledge base as architecture. The vault is not only documentation; it is an agent-facing retrieval and maintenance protocol for future work.
- The domain-store pattern is valuable because it encodes compliance invariants structurally. A generic CRUD repository would make audit integrity depend on every handler remembering rules; a `Sink` that cannot update/delete is harder to misuse.
- The split between `@conformis/contracts` and `@conformis/validation` mirrors Aya's zod-free constants lesson. Both repos independently converged on "frontend-safe type/constant surfaces must not casually import runtime validators."
- The WorkOS mutation/audit boundary is especially honest. It documents the residual risk, implements idempotent fail-fast behavior, and names the stronger future pattern instead of pretending local and external commits are atomic.
- Conformis' vault update rule is stricter than the AI research KB's default workflow: substantive code/product/design/schema work is not done until the vault pass is either completed or explicitly deemed unnecessary.
- The repo makes "GIAS-aligned" concrete through state machines, audit rows, access-control gates, and supporting-document rules rather than copy-only compliance claims.

## Open Questions

- Should Conformis' repo-local vault eventually sync selected pages into the broader AI research KB automatically, or should cross-repo ingestion stay manual and curated?
- When does the external WorkOS mutation boundary deserve a durable outbox rather than idempotent fail-fast replay?
- How much of the `TransactionContext` facade should be generated or linted to prevent new domain stores from bypassing audit-event coordination?
- Should `@conformis/contracts` and `@conformis/validation` stay mirrored manually, or would schema/codegen reduce drift without making the repo harder to read?
- Could the vault's glossary/loadout protocol become a general template for other agent-maintained product repos?

## Related

- [[codebase-architecture]]
- [[internal-engineering-conventions]]
- [[repo-local-knowledge-bases]]
- [[personal-knowledge-bases]]
- [[ai-interface-design]]

## Source Text

Selected source text and code anchors inspected:

- `README.md`: Conformis is a bare-bones Turborepo workspace with a Next.js web app and Bun/Hono server app.
- `AGENTS.md`: the repo contains Next.js web, Bun/Hono server, shared packages, Drizzle schema/migrations, WorkOS auth/access control, encrypted document storage, and `conformis-knowledge/`.
- `AGENTS.md`: server source is grouped by concern: `domains`, `routes`, `infra`, and `runtime`.
- `AGENTS.md`: stores are aggregate persistence boundaries, not generic CRUD wrappers; append-only streams use a `Sink`.
- `AGENTS.md`: project knowledge lives in `conformis-knowledge/`; agents read it before non-trivial work and propose updates when learning durable facts.
- `AGENTS.md`: raw vault pages are immutable; updates create dated files rather than rewriting history.
- `CLAUDE.md`: it points back to `AGENTS.md` and says all Conformis work must be GIAS/IIA-aligned and production-grade.
- `conformis-knowledge/index.md`: the vault catalogs raw sources, product, codebase, design, and meta pages.
- `conformis-knowledge/meta/schema.md`: the vault is a persistent LLM-maintained second brain with raw, wiki, and schema layers.
- `conformis-knowledge/codebase/repo-layout.md`: only `src/index.ts` lives at the root of server `src`; product logic, routes, infra, and runtime are separated.
- `conformis-knowledge/codebase/stack.md`: the stack is Next.js 16, React 19, Bun, Hono, Redis, WorkOS, Drizzle, Turborepo, and pnpm.
- `conformis-knowledge/codebase/patterns/domain-stores.md`: each domain owns a `Store` or `Sink`; reads are aggregate-shaped and writes are named domain operations.
- `conformis-knowledge/codebase/patterns/encrypted-document-storage.md`: evidence files are encrypted with AES-256-GCM before S3-compatible storage.
- `conformis-knowledge/codebase/patterns/workos-admin-client.md`: route handlers never import WorkOS SDK types directly; they see `WorkOsAdminClient`.
- `conformis-knowledge/product/audit-plan/state-machine.md`: publication requires discrete approval evidence rows and direct shortcuts are invalid.
- `conformis-knowledge/product/governance/gias.md`: GIAS expectations are encoded as structural guarantees rather than advisory docs.
- `apps/server/src/runtime/app.ts`: route mounting and error-envelope handling are centralized in `createApp`.
- `apps/server/src/runtime/deps.ts`: runtime dependencies include DB, Redis, encrypted document storage, WorkOS, stores, idempotency, and optional E2E support.
- `apps/server/src/domains/transaction-context.ts`: transaction-scoped facades bind store/sink calls to the current DB executor.
- `apps/server/src/infra/idempotency/json-mutation.ts`: JSON mutation handling records when external mutation succeeded or local commit completed and changes cleanup behavior accordingly.
- `packages/contracts/package.json`: contracts are described as zod-free value constants, route shapes, and TypeScript types safe for frontend imports.
- `packages/validation/package.json`: validation owns Zod schemas for runtime wire validation.
