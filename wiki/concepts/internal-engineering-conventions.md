---
id: concept-internal-engineering-conventions
type: concept
title: Internal Engineering Conventions
tags: [engineering-conventions, agent-instructions, coding-agents, monorepos, tests]
source_count: 14
summary: Internal engineering conventions turn tacit team practice into reusable constraints for agents and humans, especially around scope, imports, validation, naming, tests, side effects, UI discipline, knowledge updates, and skillized gotchas.
canonical_for: [internal engineering conventions, repo conventions, coding conventions, agent coding rules]
review_status: reviewed
last_reviewed: 2026-08-07
review_due: 2026-11-07
confidence: "0.87"
---

# Internal Engineering Conventions

## Summary

Internal engineering conventions are the repo-specific rules that prevent common mistakes. They are strongest when they name a concrete failure mode, point to an existing pattern, and can be verified through code review, tests, lint, or source layout. They are weakest when they become a generic preference dump. Matt Pocock's skills repo adds a compact version of the same pattern: conventions should become invoked workflows only when they protect real work, and setup instructions should appear only where missing configuration would make the workflow wrong rather than merely less sharp. Anthropic's Claude Code skills article adds a team-scale operating pattern: a convention is often strongest as a gotcha, verification script, trigger description, setup config, or on-demand hook rather than as generic prose in a skill. Learn Harness Engineering adds the harness-maintenance rule: add the smallest artifact that fixes the observed failure mode, then keep completion, scope, and handoff tied to executable evidence. Anthropic's Claude 5 guidance adds a capability-aware pruning rule: keep repo instructions lightweight, prioritize non-obvious gotchas, omit facts visible in the filesystem, and prefer local-fit criteria over global stylistic prohibitions.

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
- **Skill rules:** repeated internal footguns become skill gotchas, executable verifiers, setup files, or scoped hooks only when they change recurring agent behavior.
- **Harness rules:** startup readiness, active feature state, verification evidence, clean handoff, and cleanup checks belong in files or scripts when coding agents repeatedly lose state.
- **Placement rules:** repo-wide gotchas stay in the root instruction map; conditional procedures move to skills; deterministic invariants move to schemas, tests, hooks, or lint; personal history moves to scoped memory.
- **Promotion rules:** recurring failures move from prose to the lowest reliable enforcement layer—architecture, types, schemas, generated interfaces, lint, tests, scripts, hooks, scoped model verification, then human approval.
- **Ratchet rules:** when immediate cleanup is unsafe, a locally evaluated gate may establish a visible legacy baseline and block increases, but the baseline needs an owner, false-positive review, and an explicit reduction path; this is a migration tactic rather than a universal default.
- **TypeScript module rules:** select compiler module settings from the actual runtime/bundler, make type-only erasure explicit, treat `exports` plus declarations as the package API, and prohibit `paths` aliases from impersonating workspace packages.
- **TypeScript state rules:** validate unknown data at runtime boundaries, model application-owned states as discriminated unions of complete variants, test custom predicates as runtime code, and enforce exhaustive handling without casts or silent catch-all branches.
- **TypeScript compatibility rules:** keep structural ports minimal, forbid `any` as boundary admission, make domain identity explicit when equal shapes must not mix, review callback inputs from producer ownership, and lock intended assignability into strict public-package type tests.
- **TypeScript conditional-type rules:** use named helpers only for coherent input-output relations, choose union distribution explicitly, keep recursion bounded, mirror the relation in runtime code, and test edge cases plus consumer compile behavior through packed declarations.
- **TypeScript mapped-type rules:** derive projections only from an owned key vocabulary, make modifier/remapping/filtering behavior obvious, never confuse static removal or requiredness with runtime redaction/defaulting, and test emitted declarations plus any runtime realization.

## Agent-Instruction Design

The best repo instructions are short enough to be followed and specific enough to matter. A rule earns its place when it prevents a mistake the repo has actually seen or is structurally exposed to.

Good rules usually include:

- the boundary being protected
- the path or file that owns the pattern
- the failure mode being prevented
- the verification command or review check
- whether the rule is absolute or only a default
- whether the rule belongs in always-on behavior instructions, repo-local guidance, a skill, or deterministic tooling
- whether the rule needs a repo setup artifact or can degrade gracefully from local code inspection
- whether the convention should be discoverable through a skill description, enforced through a hook, or measured through usage telemetry
- whether a feature-state row, progress log, checklist, or verifier command would enforce the convention better than another paragraph of instructions
- whether the instruction is still needed for the current model generation or is an untested workaround for an older one
- whether a local code example, test, schema, or artifact communicates the convention more precisely than prose

## Convention Drift Signals

- Agents keep asking the same architectural question in every session.
- The repo has multiple conflicting patterns for the same concern.
- A convention lives in chat history but not in repo docs or tests.
- A lint/test failure catches something that should have been explained in the repo instructions.
- A skill repeats obvious conventions but lacks the gotchas, examples, or checks that would prevent local failures.
- New files appear in the wrong layer because the existing folder taxonomy is too implicit.
- The instructions grow, but old rules no longer map to current code.
- Progress or completion state appears in chat but not in the repo, forcing new sessions to rediscover what is true.
- The same behavior is described differently in the system prompt, repo instructions, skill, and tool description.
- Rules prohibit behavior that surrounding code legitimately requires because the convention was written as an absolute instead of a local default.
- The root instruction file restates directory contents the model can inspect but omits the one non-obvious gotcha that causes recurring failures.
- A verifier repeatedly spends model context checking properties that a deterministic command could report faster and more consistently.
- Related contracts, docs, environment declarations, or generated artifacts drift because the repository has neither one source of truth nor a synchronization gate.

## Related

- [[codebase-architecture]]
- [[repo-local-knowledge-bases]]
- [[ai-instruction-design]]
- [[claude-code]]
- [[context-engineering]]
- [[ai-interface-design]]
- [[typescript-module-systems]]
- [[typescript-control-flow-narrowing]]
- [[typescript-structural-compatibility]]
- [[typescript-conditional-types]]
- [[typescript-mapped-types]]

## Source Notes

- [[2026-05-27-aya]]
- [[2026-05-27-conformis]]
- [[2026-05-09-mnimiy-claude-md-12-rules]]
- [[2026-05-04-pmarca-ai-custom-prompt]]
- [[2026-05-27-aya-conformis-internal-codebase-patterns]]
- [[2026-06-04-mattpocock-skills]]
- [[2026-06-03-lessons-from-building-claude-code-how-we-use-skills]]
- [[2026-06-04-walkinglabs-learn-harness-engineering]]
- [[2026-07-24-the-new-rules-of-context-engineering-for-claude-5-generation-models]]
- [[2026-07-15-these-90-minutes-will-change-the-way-you-use-ai]]
- [[2026-08-01-typescript-modules-reference]]
- [[2026-08-02-typescript-narrowing]]
- [[2026-08-03-typescript-type-compatibility]]
- [[2026-08-04-typescript-conditional-types]]
- [[2026-08-05-typescript-mapped-types]]
