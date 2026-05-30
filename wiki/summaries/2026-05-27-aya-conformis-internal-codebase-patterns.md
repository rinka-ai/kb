---
id: summary-2026-05-27-aya-conformis-internal-codebase-patterns
type: summary
title: Aya And Conformis Internal Codebase Patterns
tags: [internal-codebases, codebase-architecture, conventions, monorepos, knowledge-bases, ai-products]
summary: Aya and Conformis show how internal repos can become reusable architecture sources when they encode product scope, package boundaries, runtime state, design rules, verification habits, and project memory as inspectable code and markdown.
source_count: 3
canonical_for: [internal codebase patterns, Aya Conformis repo patterns, repo convention ingestion, internal engineering knowledge ingestion]
review_status: reviewed
last_reviewed: 2026-05-30
review_due: 2026-06-27
confidence: "0.84"
---

# Aya And Conformis Internal Codebase Patterns

## Summary

Aya and Conformis are worth ingesting because they contain tacit engineering knowledge that does not live in external papers: how this workspace actually scopes product work, names packages, separates providers from core logic, stores durable state, keeps UI systems coherent, and instructs coding agents. The two repos are different products, but they share a pattern: architecture is encoded in code, markdown, tests, route shape, package boundaries, and agent instructions together.

The durable lesson is to ingest internal repos as pattern maps, not source dumps. The KB should preserve what future agents can reuse: conventions, boundaries, decision records, failure modes, and examples of enforcement.

## Shared Lessons

- **Repo instructions are a control plane.** Aya uses a short `AGENTS.md` that delegates to a richer `CLAUDE.md`; Conformis makes `AGENTS.md` canonical and keeps `CLAUDE.md` as a pointer. In both cases, instructions are most valuable when they prevent observed failures rather than collecting generic preferences.
- **Product scope is architectural.** Aya refuses multi-agent orchestration, runtime MCP exposure, and speculative future modules in V1. Conformis refuses unrequested product/compliance/backend architecture. This keeps agents from expanding the system just because they can.
- **Apps and packages have named jobs.** Aya separates API, web, worker, scripts, core, gateways, DB, config, logger, and types. Conformis separates web, server, contracts, DB, logger, storage, validation, and its vault.
- **Core logic should not know provider SDKs.** Aya's `packages/core` talks through gateway and model-provider interfaces. Conformis route/domain code talks through WorkOS and storage adapters rather than scattering SDK types through handlers.
- **Runtime validators should stay at boundaries.** Both repos protect frontend bundles from validator sprawl: Aya has zod-free constants under `@aya/types/constants`; Conformis separates zod-free `@conformis/contracts` from Zod-backed `@conformis/validation`.
- **Durable state beats prompt folklore.** Aya makes Request/session/run/outbox state explicit; Conformis makes Audit Plan state, approval evidence, append-only audit events, and transaction-scoped commits explicit.
- **Side effects need their own boundary.** Aya uses outbox-driven delivery for broker notifications. Conformis documents the WorkOS external-mutation split and uses idempotent failure replay until a stronger outbox boundary is warranted.
- **UI quality is sourced, not sprinkled on.** Aya's dashboard uses design docs, tokens, bilingual copy parity, and React Query routing contracts. Conformis uses a design vault, implementation tokens, and operational-surface patterns.
- **Test support stays quarantined.** Conformis has an especially strong rule that `InMemory*`, `Fake*`, seeded clients, and readback helpers live under `tests/support/`, with runtime importing them only behind explicit E2E gates. Aya similarly prefers focused harnesses and small tests for touched behavior.
- **Knowledge should compound at the repo boundary.** Conformis has a repo-local vault with index/glossary/loadouts/log. Aya consumes the shared AI research KB at development time but keeps runtime agency content separate.

## Important Differences

- Aya is an AI/voice product. Its strongest architecture pattern is provider-neutral agent/runtime state around voice, tools, post-call extraction, queues, and broker handoff delivery.
- Conformis is a compliance/GRC product. Its strongest architecture pattern is structural auditability: domain stores/sinks, transaction context, approval evidence, separation of duties, WorkOS boundaries, encrypted evidence storage, and a repo-local knowledge vault.
- Aya's shared KB relationship is external and development-only. Conformis' knowledge vault is committed inside the repo and treated as part of the done condition for substantive work.
- Aya currently mirrors DB helper types inside core to preserve package boundaries. Conformis keeps stores in server-domain source and coordinates them through a transaction facade.
- Aya's product posture is "small wedge, real call, right broker, under 60 seconds." Conformis' posture is "GIAS/IIA-aligned, production-grade, audit-evidence-preserving." The codebase structures reflect those different truths.

## Patterns To Reuse

- Build source notes from internal repos by reading docs, manifests, route/runtime composition, package boundaries, representative domain files, and tests; do not ingest secrets or full source text.
- Give each package a crisp ownership sentence and enforce it in imports.
- Put external providers behind adapters/gateways, then keep core/domain code expressed in product-owned types.
- Make lifecycle states and side effects inspectable through tables, logs, events, queues, outboxes, or transaction contexts.
- Use named domain errors instead of leaking driver or provider error codes into route handlers.
- Promote repeated boundary cleanup into shared infra only after the behavior appears in enough places to drift; then test the helper at the wrapper/adapter shape rather than only through happy-path routes.
- Keep frontend-safe contracts/constants free of runtime validators unless the bundle explicitly needs them.
- Let repo instructions earn their place by naming a failure mode they prevent.
- Preserve design systems as operational rules: tokens, state grammar, typography, copy, accessibility, screenshots, and data-routing contracts.
- Store durable project memory in markdown with indexes and logs so future coding agents do not rediscover patterns through expensive source spelunking.

## What To Copy Carefully

- A repo-local vault is powerful, but it can become stale bureaucracy unless the update path is lightweight and tied to real work.
- Outbox patterns are not free. They are worth it when external side effects must be crash-safe and audited; otherwise idempotent fail-fast policies may be enough for a thin slice.
- Provider-neutrality can turn into over-abstraction. Aya earns its gateway boundary because voice, email, webhooks, model providers, and future channels are real product axes.
- Domain stores help compliance-heavy systems, but small apps should not cargo-cult them before aggregates and invariants exist.
- Strict agent instructions can protect a repo, but every new rule should delete more confusion than it creates.

## KB Fit

- [[codebase-architecture]] should hold the general pattern: source organization, package boundaries, runtime state, tests, docs, and agent instructions are all architecture.
- [[internal-engineering-conventions]] should hold the operational guidance around repo rules, coding practices, naming, testing, and failure-mode-specific instructions.
- [[repo-local-knowledge-bases]] should hold the Conformis-style project vault pattern and the Aya-style distinction between dev KB and runtime product knowledge.
- [[ai-interface-design]] should cite both repos as examples of operational UI quality encoded in source architecture.
- [[personal-knowledge-bases]] and [[research-workflows]] should treat internal codebase ingestion as another compounding loop, not only article/paper ingestion.

## Source Notes

- [[2026-05-27-aya]]
- [[2026-05-27-conformis]]
- [[2026-05-30-conformis-cleanup-helpers-commit]]
