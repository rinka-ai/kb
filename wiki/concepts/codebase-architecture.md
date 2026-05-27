---
id: concept-codebase-architecture
type: concept
title: Codebase Architecture
tags: [software-architecture, codebase-architecture, monorepo, monorepos, conventions, source-organization]
source_count: 4
summary: Codebase architecture is the durable organization of product scope, package boundaries, runtime state, provider adapters, tests, docs, and agent instructions so future changes inherit the right constraints.
canonical_for: [codebase architecture, source architecture, repo architecture, monorepo architecture, codebase organization]
review_status: reviewed
last_reviewed: 2026-05-27
review_due: 2026-06-27
confidence: "0.84"
---

# Codebase Architecture

## Summary

Codebase architecture is the durable organization of a repository so future changes inherit the right constraints. It includes folder structure and package boundaries, but also product scope, runtime state, provider adapters, tests, docs, source-of-truth decision records, and agent instructions. A good architecture makes the correct path obvious and the risky path visible.

The internal Aya and Conformis repos make this concrete. Aya organizes an AI voice product around provider-neutral runtime state, gateways, queues, outbox delivery, and dashboard contracts. Conformis organizes a compliance product around domain stores/sinks, transaction-scoped audit writes, WorkOS adapters, encrypted storage, and a repo-local vault. Uniswap adds the frontend version: UI quality is also architecture when tokens, domain flows, state, telemetry, tests, and feature gates live in source.

## Core Pattern

- Product scope is an architectural boundary, not only a roadmap note.
- Apps own entrypoints and composition; packages own reusable contracts, adapters, infrastructure, and domain logic.
- Provider SDKs should be isolated behind gateways or adapters when the product needs portability, normalized errors, or stable domain types.
- Durable state should be explicit: sessions, runs, events, audit rows, outbox rows, transaction contexts, or stored descriptors.
- Runtime validators belong at boundaries, while frontend-safe contracts/constants should stay cheap to import.
- Tests, lint rules, and route shape should enforce the architecture instead of relying only on docs.
- Repo instructions should describe the failure modes agents must avoid in that codebase.

## Boundary Styles

Aya demonstrates a **provider-neutral core** style:

- `packages/core` owns request/runtime/handoff/tool logic without importing provider SDKs or DB row types.
- Gateway packages translate external systems into Aya-owned interfaces.
- Apps bind concrete providers at composition roots.
- Workers serialize per-request work and drain outbox side effects.

Conformis demonstrates a **domain-store compliance** style:

- `apps/server/src/domains/<domain>/` owns schema, policy, transitions, and store/sink interfaces.
- Route handlers validate/authenticate/orchestrate, then commit through domain helpers.
- `TransactionContext` coordinates audit events with aggregate writes.
- External WorkOS and storage systems sit behind local adapters.

Uniswap demonstrates a **product-UX source architecture** style:

- App shells, UI primitives, domain flows, platform implementations, feature flags, telemetry, localization, and journey tests are separate but connected.
- UI quality is encoded as primitives, state contracts, route metadata, and tests rather than left to per-screen taste.

## Anti-Patterns

- Generic `utils` or `services` buckets that hide ownership.
- Provider SDKs imported deep inside product logic.
- Lifecycle states that encode channels, vendors, or temporary failure details.
- Generic CRUD stores where domain invariants require named operations.
- Runtime validators accidentally imported into client bundles through barrels.
- Agent instruction files that accumulate preferences without pointing to real failures.
- Repo-local knowledge that is too stale or too verbose for future agents to trust.

## Open Questions

- Which architecture rules should be prose, which should be lint/test enforced, and which should be impossible by package structure?
- When does provider neutrality become useful optionality versus unnecessary abstraction?
- How should repo-local knowledge bases sync into broader cross-project KBs without leaking secrets or creating stale duplicates?
- What is the smallest source-architecture pattern that gives small teams Uniswap-like UI discipline without enterprise-scale overhead?

## Related

- [[internal-engineering-conventions]]
- [[repo-local-knowledge-bases]]
- [[ai-interface-design]]
- [[agent-harnesses]]
- [[managed-agents]]
- [[research-workflows]]

## Source Notes

- [[2026-05-27-aya]]
- [[2026-05-27-conformis]]
- [[2026-05-25-uniswap-interface]]
- [[2026-05-09-mnimiy-claude-md-12-rules]]
- [[2026-05-27-aya-conformis-internal-codebase-patterns]]
