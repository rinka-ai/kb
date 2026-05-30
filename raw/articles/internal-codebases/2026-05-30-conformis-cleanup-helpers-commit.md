---
id: article-2026-05-30-conformis-cleanup-helpers-commit
type: source
title: "Conformis Cleanup Helpers Commit"
path: raw/articles/internal-codebases/2026-05-30-conformis-cleanup-helpers-commit.md
author: Conformis
publisher: Local repository
url:
date_published: 2026-05-30
date_added: 2026-05-30
tags: [internal-codebases, conformis, backend, postgres, drizzle, error-handling, validation, nextjs, api-architecture]
status: active
quality: medium
summary: "Conformis commit 2cd099c shows when repeated boundary cleanup should become shared infrastructure: central Postgres error classification, JSON serialization, Next API response helpers, validation re-export facades, and focused smoke tests."
related: [codebase-architecture, internal-engineering-conventions, 2026-05-30-backend-stack-patterns-blueprint, 2026-05-27-aya-conformis-internal-codebase-patterns]
superseded_by:
---

# Conformis Cleanup Helpers Commit

## Source Metadata

- Path: raw/articles/internal-codebases/2026-05-30-conformis-cleanup-helpers-commit.md
- Author: Conformis
- Published: 2026-05-30
- Publisher: Local repository
- URL:
- Local repo inspected: `/Users/josemanuelcerqueira/Desktop/conformis`
- Inspected commit: `2cd099c627751ce16456e98a9c176f445a0c678a` (`refactor: centralize cleanup helpers`) on 2026-05-30T21:57:26+01:00.
- Working tree note: the Conformis repo had an unrelated local modification in `conformis-knowledge/.obsidian/graph.json`; this note records the committed diff only.
- Files changed: 24 files, 245 insertions, 669 deletions.
- Verification attempted: source inspection only; tests were not run.
- Explicitly excluded: secrets, generated caches, tenant data, and full private source dumps.

## TL;DR

The commit turns repeated, easy-to-get-wrong cleanup code into small shared boundary helpers. The durable lesson is not "centralize everything"; it is "centralize only the repeated boundary behavior whose correctness matters," then cover the helper with focused tests so domain stores and route handlers can stay boring.

## Key Claims

- Conformis moved repeated Postgres unique/foreign-key violation detection out of individual stores and handlers into `apps/server/src/infra/postgres/errors.ts`.
- The Postgres helper walks Drizzle/postgres-js `cause` chains instead of checking only top-level error codes, which preserves intended 409/conflict behavior under wrapped production errors.
- Unique-violation checks remain permissive when a driver omits the constraint name, while foreign-key checks require an exact constraint name to avoid misclassifying unrelated FK failures.
- Repeated `JSON.parse(JSON.stringify(value))` serialization was centralized as `toJsonValue` in `apps/server/src/infra/json.ts`.
- Repeated Next API route error envelope helpers were centralized in `apps/web/src/lib/server/api-route-response.ts`.
- `apps/server/src/routes/audit-universe/schema.ts` stopped owning large local Zod schemas and became a compatibility re-export facade from `@conformis/validation/audit-universe` and `@conformis/contracts/audit-universe`.
- The commit added smoke tests for the Postgres helper, covering wrapped cause chains, permissive unique checks without constraint names, and strict FK constraint matching.
- The refactor reduced 669 lines while preserving existing import paths and route behavior.

## Important Details

- The centralized Postgres helper replaces near-duplicate `isPgUniqueViolation` implementations in access-control, audit-plan, audit-universe, multi-year audit-plan, and risk stores.
- Route handlers that previously checked raw `err.code === '23505'` now import the same helper, so raw driver errors and Drizzle-wrapped errors share one classification path.
- The helper is deliberately small and infrastructure-scoped. It does not introduce a generic error framework or a broad result type.
- The `requireConstraintName` option encodes a useful asymmetry: unique violations can still map to conflicts when the driver loses a name, but FK handling should fail closed unless the exact expected constraint is present.
- The audit-universe schema facade keeps existing server route imports stable while preserving the broader Conformis rule: Zod runtime schemas live in `@conformis/validation`, while frontend-safe wire types live in `@conformis/contracts`.
- The web helper standardizes proxy route responses for bad requests, optional string parsing, and upstream `ConformisApiError` mapping while rethrowing unknown errors.
- The `bodyHas` cleanup in `update-entity.ts` is a small but useful TypeScript pattern: accept `object` for own-property presence checks and avoid widening parsed discriminated-union bodies into generic records.

## Entities

- Repository: `/Users/josemanuelcerqueira/Desktop/conformis`
- Commit: `2cd099c627751ce16456e98a9c176f445a0c678a`
- Backend app: `apps/server`
- Web app: `apps/web`
- New helpers: `apps/server/src/infra/postgres/errors.ts`, `apps/server/src/infra/json.ts`, `apps/web/src/lib/server/api-route-response.ts`
- Affected domains/routes: access control, audit log, audit plan, audit universe, multi-year audit plan, risk
- Shared packages referenced: `@conformis/contracts`, `@conformis/validation`, `@conformis/db`
- Technologies: Bun test, Drizzle, postgres-js, Postgres, Next.js route handlers, Zod

## My Notes

- This is a good example of "abstraction after duplication." Earlier duplication was defensible while only a few stores needed the behavior; once the helper appeared across stores and route handlers, centralizing reduced both line count and behavioral drift.
- The most important reusable detail is the test shape. The tests do not need a real database; they model the wrapped error objects directly and lock down the adapter contract.
- Driver wrappers are a recurring source of false confidence. A top-level `err.code` check can pass in hand-written tests and fail in production if the ORM wraps the real error under `cause`.
- Compatibility facades are useful migration tools. The audit-universe route kept its local `schema.ts` import path while moving ownership to contracts/validation packages.
- The commit reinforces the Conformis pattern that boundary helpers belong in `infra/`, but domain code should still translate those raw boundary facts into named domain errors.

## Open Questions

- Should Conformis document `infra/postgres/errors.ts` in its repo-local vault as the canonical DB error classification helper?
- Should future stores be linted or reviewed against local `err.code` checks to prevent reintroducing wrapper-blind error handling?
- Should `toJsonValue` preserve non-JSON values more explicitly, or is JSON round-tripping the desired audit/event payload contract?
- Should the Next API response helper grow tests, or is it simple enough to remain covered through route-level behavior?

## Related

- [[codebase-architecture]]
- [[internal-engineering-conventions]]
- [[2026-05-27-conformis]]
- [[2026-05-30-aya-conformis-backend-stack-patterns]]
- [[2026-05-30-backend-stack-patterns-blueprint]]

## Source Text

Selected source text and code anchors inspected (no secrets or large private code copied):

- Commit: `2cd099c627751ce16456e98a9c176f445a0c678a`, message `refactor: centralize cleanup helpers`, 24 files changed.
- `apps/server/src/infra/postgres/errors.ts`: defines `MAX_CAUSE_DEPTH = 5`, reads `code`, `constraint_name`, `constraint`, and `cause`, and exports `isPgUniqueViolation` / `isPgForeignKeyViolation`.
- `apps/server/src/infra/postgres/errors.ts`: comments note that Drizzle wraps postgres-js errors in a cause chain.
- `apps/server/tests/smoke/postgres-errors.test.ts`: tests wrapped unique violations, omitted unique constraint names, and exact foreign-key constraint matching.
- `apps/server/src/infra/json.ts`: exports `toJsonValue(value: unknown)` using JSON round-tripping typed as `JsonValue`.
- `apps/server/src/routes/audit-universe/schema.ts`: re-exports route validators from `@conformis/validation/audit-universe` and contract types from `@conformis/contracts/audit-universe`.
- `apps/web/src/lib/server/api-route-response.ts`: exports `apiErrorResponse`, `badRequest`, and `optionalString`.
- Removed duplicated helper code from domain stores and Next route handlers while preserving stable response envelopes and existing route imports.
