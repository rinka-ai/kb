---
id: concept-internal-engineering-conventions
type: concept
title: Internal Engineering Conventions
tags: [engineering-conventions, agent-instructions, coding-agents, monorepos, tests]
source_count: 4
summary: Internal engineering conventions turn tacit team practice into reusable constraints for agents and humans, especially around scope, imports, validation, naming, tests, side effects, UI discipline, and knowledge updates.
canonical_for: [internal engineering conventions, repo conventions, coding conventions, agent coding rules]
review_status: reviewed
last_reviewed: 2026-05-27
review_due: 2026-06-27
confidence: "0.82"
---

# Internal Engineering Conventions

## Summary

Internal engineering conventions are the repo-specific rules that prevent common mistakes. They are strongest when they name a concrete failure mode, point to an existing pattern, and can be verified through code review, tests, lint, or source layout. They are weakest when they become a generic preference dump.

Aya and Conformis show the value of ingesting conventions into the KB. Aya's conventions protect an AI voice product from provider leakage, magic strings, zod bundle bloat, broad refactors, dashboard latency regressions, and bilingual/design drift. Conformis' conventions protect a compliance product from audit-log gaps, unbounded WorkOS scans, test doubles in production bundles, raw-source mutation, and stale project memory.

## Useful Convention Types

- **Scope rules:** smallest reviewable change, no adjacent features, no speculative packages, no empty future modules.
- **Boundary rules:** core/domain code does not import provider SDKs or persistence rows when adapters/interfaces own the boundary.
- **Naming rules:** enum-shaped values are named constants; lifecycle states avoid channels/vendors/failure details.
- **Validation rules:** Zod or equivalent schemas sit at HTTP/provider/env boundaries; frontend-safe constants avoid importing validator runtimes.
- **Handler shape rules:** handlers orchestrate named steps instead of mixing parsing, domain logic, persistence, and side effects inline.
- **Side-effect rules:** external calls go through gateways, outboxes, idempotency helpers, or documented transaction boundaries.
- **Test rules:** test harnesses are per-test, support fakes live outside production source, and tests cover intentful contracts.
- **UI rules:** token usage, copy parity, data-routing, screenshot review, and design-vault references protect operational surfaces.
- **Knowledge rules:** durable discoveries update the repo or shared KB instead of disappearing into chat.

## Agent-Instruction Design

The best repo instructions are short enough to be followed and specific enough to matter. A rule earns its place when it prevents a mistake the repo has actually seen or is structurally exposed to.

Good rules usually include:

- the boundary being protected
- the path or file that owns the pattern
- the failure mode being prevented
- the verification command or review check
- whether the rule is absolute or only a default
- whether the rule belongs in always-on behavior instructions, repo-local guidance, a skill, or deterministic tooling

## Convention Drift Signals

- Agents keep asking the same architectural question in every session.
- The repo has multiple conflicting patterns for the same concern.
- A convention lives in chat history but not in repo docs or tests.
- A lint/test failure catches something that should have been explained in the repo instructions.
- New files appear in the wrong layer because the existing folder taxonomy is too implicit.
- The instructions grow, but old rules no longer map to current code.

## Related

- [[codebase-architecture]]
- [[repo-local-knowledge-bases]]
- [[ai-instruction-design]]
- [[claude-code]]
- [[context-engineering]]
- [[ai-interface-design]]

## Source Notes

- [[2026-05-27-aya]]
- [[2026-05-27-conformis]]
- [[2026-05-09-mnimiy-claude-md-12-rules]]
- [[2026-05-04-pmarca-ai-custom-prompt]]
- [[2026-05-27-aya-conformis-internal-codebase-patterns]]
