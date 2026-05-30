---
id: index-internal-codebases
type: index
title: Internal Codebases
summary: Sub-index for local internal repository teardowns used to preserve reusable architecture, convention, structure, dependency, and project-memory patterns.
---

# Internal Codebases

## Overview

This index groups local internal repositories ingested as architecture and convention sources. These notes preserve patterns, package boundaries, product constraints, testing habits, source-of-truth docs, and project-memory structures rather than full private source code.

## Sources

- [[2026-05-27-aya]] — Aya is an AI-first real-estate voice platform with provider-neutral core runtime, gateway packages, durable request/session/run state, outbox delivery, and dashboard/design-routing discipline.
- [[2026-05-27-conformis]] — Conformis is a GRC/audit platform with a repo-local knowledge vault, domain stores/sinks, transaction-scoped audit writes, WorkOS adapter boundaries, encrypted storage, and strict test-support separation.
- [[2026-05-30-aya-conformis-app-template-design-system]] — Combined frontend/design-system teardown of Aya and Conformis: shared Next 16 / React 19 / React Query baseline, token-first CSS-variable design systems, a minimum role-driven component set, server-seed data routing, and accessibility/motion/state rules.
- [[2026-05-30-aya-conformis-backend-stack-patterns]] — Combined backend teardown of Aya and Conformis: Bun/Hono/TypeScript services, Postgres/Drizzle persistence, Redis coordination, explicit dependency envelopes, provider adapters, outbox/idempotency policies, boundary validation, and test-support quarantine.

## Synthesis

- [[2026-05-27-aya-conformis-internal-codebase-patterns]] — Cross-repo synthesis of the reusable patterns from Aya and Conformis.
- [[2026-05-30-app-template-design-system-blueprint]] — Retrieve-before-you-build blueprint for starting a new app/feature: default stack, token contract, component minimum set, data-routing and state rules, anti-patterns, agent-prompting guidance, and authoritative references.
- [[2026-05-30-backend-stack-patterns-blueprint]] — Retrieve-before-you-build backend blueprint for starting API apps, workers, provider integrations, webhook ingress, durable mutations, side-effect policies, persistence boundaries, security baselines, and tests.

## Related

- [[codebase-architecture]]
- [[internal-engineering-conventions]]
- [[repo-local-knowledge-bases]]
- [[personal-knowledge-bases]]
- [[ai-interface-design]]
