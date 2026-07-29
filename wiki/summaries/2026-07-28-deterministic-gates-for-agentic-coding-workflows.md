---
id: summary-2026-07-28-deterministic-gates-for-agentic-coding-workflows
type: summary
title: Deterministic Gates for Agentic Coding Workflows
tags: [agentic-coding, claude-code, deterministic-gates, verification, linting, hooks, sandboxing, multi-agent-systems]
summary: Reliable agentic coding separates guidance from enforced gates, binds completion claims to fresh task-specific evidence, and measures context additions against an unassisted baseline; fixed thresholds and ratcheted debt remain provisional local tactics.
source_count: 16
canonical_for: [deterministic gates for coding agents, instruction to gate workflow, ratcheted agent verification, reliable agentic coding workflow]
review_status: reviewed
last_reviewed: 2026-07-29
review_due: 2026-09-12
confidence: "0.92"
---

# Deterministic Gates for Agentic Coding Workflows

## Assessment

Caleb Curry's transcript is not evidence that its workflow works. It is worth preserving as a practitioner hypothesis generator, then checking claim by claim. Current Claude Code documentation and primary engineering sources strongly corroborate the distinction between behavioral guidance and enforced controls, deterministic command hooks, skills-versus-subagent context placement, permission-plus-sandbox defense in depth, and the value of simple orchestrator-worker patterns for suitable tasks. They do not establish the video's exact thresholds, productivity claims, or agent hierarchy.

> A recurring failure should move to the lowest layer that can prevent it reliably.

That means making an invalid state impossible through architecture when feasible, checking it through a deterministic gate when it is mechanically observable, using a scoped model verifier for remaining semantic judgment, and spending human review in proportion to consequence and reversibility. This core is supported by Anthropic's current instruction, hook, permission, sandbox, subagent, tool-design, and workflow guidance. A ratchet that blocks new violations while tolerating a legacy baseline is plausible, but it remains a local migration tactic requiring measurement.

Nick Nisi's WorkOS talk independently corroborates the same pattern at practitioner level and adds two useful refinements. First, workflow evidence must be fresh and bound to the exact task and code state; a marker or hash without a trusted capture path is replayable ceremony. Second, context changes need a no-addition control: Nisi reports that a comprehensive generated skill made one task worse than the unassisted model, while a much smaller gotchas set reduced eval runtime. The figures are under-specified and do not establish a general effect size, but the experimental question is correct.

## Primary-Source Cross-Check

### Corroborated

- `CLAUDE.md` is contextual guidance, not enforced configuration; must-hold behavior belongs in settings, permissions, sandboxing, or hooks. See [Claude Code memory](https://code.claude.com/docs/en/memory) and [feature comparison](https://code.claude.com/docs/en/features-overview).
- Hooks fire at deterministic lifecycle events and are appropriate for linting or unsafe-command blocking. Current docs prefer command hooks for production because agent-based hooks remain experimental. See the [hooks reference](https://code.claude.com/docs/en/hooks).
- Skills add reusable instructions or knowledge to a context; subagents are isolated workers with separate context and bounded returns. See [Claude Code features](https://code.claude.com/docs/en/features-overview). The split is no longer a clean binary: a skill can run in isolated context with `context: fork`, and a subagent can preload skills through its `skills:` field, so "where does this content live" and "where does this work run" are separate decisions.
- Subagents and agent teams are distinct surfaces, and only the first is a stable default. Subagents run inside one session and return a summary to the caller. [Agent teams](https://code.claude.com/docs/en/agent-teams) are independent Claude Code sessions that message each other peer-to-peer and self-coordinate through a shared task list, at higher token cost because each teammate is a separate instance; they are experimental and disabled by default. A practitioner "bundle with a sub-orchestrator" approximates the team surface more than the subagent surface, so map its coordination and cost claims accordingly rather than assuming subagent economics.
- Permissions and sandboxing are complementary, not interchangeable. Sandboxing provides OS-level limits for Bash and child processes; it does not automatically wrap every Claude Code extension surface. See [permissions](https://code.claude.com/docs/en/permissions) and [sandboxing](https://code.claude.com/docs/en/sandboxing).
- Strict TypeScript and custom ESLint rules can encode mechanically checkable properties. See [TypeScript `strict`](https://www.typescriptlang.org/tsconfig/strict) and [ESLint custom rules](https://eslint.org/docs/latest/extend/custom-rules).
- PostgreSQL row security can enforce row visibility and modification policy at the database layer, which is stronger than relying only on an application adapter for tenant scoping. See [PostgreSQL row security](https://www.postgresql.org/docs/current/ddl-rowsecurity.html).

### Supported only with important caveats

- Permission bypass is not a normal autonomy shortcut. Current [permission-mode docs](https://code.claude.com/docs/en/permission-modes) restrict it to isolated environments without internet access that cannot damage the host and state that it offers no prompt-injection protection. Claude Code's sandbox also fails open by default if unavailable unless `sandbox.failIfUnavailable` is set.
- Multi-agent orchestrator-worker systems can improve breadth and context isolation on appropriate tasks, but Anthropic reports coordination, evaluation, reliability, and token-cost challenges. The video's exact planner/implementer/tester/verifier bundle is not validated by [Anthropic's multi-agent research report](https://www.anthropic.com/engineering/multi-agent-research-system) — and for coding specifically that report reads as counter-evidence rather than neutral. It measured multi-agent runs at roughly **15× the tokens of a chat interaction**, with single research agents at about **4×**, and concluded that "most coding tasks involve fewer truly parallelizable tasks than research, and LLM agents are not yet great at coordinating and delegating to other agents in real time." Treat both multipliers as specific to that report's system, model generation, and research workload — they are order-of-magnitude evidence that fan-out is expensive, not constants to budget against. The durable inference is that a coding bundle must clear a high value bar before its coordination and token cost is justified.
- Git worktrees provide multiple working trees and branches, but the [Git manual](https://git-scm.com/docs/git-worktree.html) does not prove that worktrees improve multi-agent productivity or merge quality.
- MCP tool descriptions and interfaces matter, but one API endpoint per tool is not a durable default. Anthropic's [tool-design guidance](https://www.anthropic.com/engineering/writing-tools-for-agents) warns that overlapping or vague tools confuse agents and recommends task-shaped interfaces plus evaluation.

### Not corroborated or rejected

- **Rejected as factually wrong:** the claim that bypassed permissions ignore allow and deny rules, leaving hooks as the only available restriction. [Permission modes](https://code.claude.com/docs/en/permission-modes) state that deny rules and explicit ask rules apply in every mode, including `bypassPermissions`, along with org-`ask` connector tools, MCP tools marked `requiresUserInteraction`, and a circuit breaker for removals targeting the filesystem root or home directory. Only allow rules go inert, because everything else is already approved. `PreToolUse` hooks remain a legitimate programmable check — the docs also note that hook decisions never override deny or ask rules — but the premise used to motivate them does not hold.
- No checked primary source supports a universal 500- or 1,000-line file threshold, "drastic" token savings from the proposed gates, or a general quality lift from the full workflow.
- "Self-learning" repo vaults are not automatically trustworthy; any agent-written project memory needs attribution, review, versioning, and rollback. Claude Code's shipped [auto memory](https://code.claude.com/docs/en/memory) is the auditable version of the idea and a useful contrast: Claude writes plain markdown to `~/.claude/projects/<project>/memory/`, only a bounded index loads each session, and the files are readable, editable, and deletable through `/memory`. It is machine-local rather than a shared repo artifact, so it complements versioned repo knowledge instead of replacing it, and its existence still says nothing about the quality gains the video claims.
- Model reasoning over logs is not a replacement for deterministic observability, incident thresholds, runbooks, or human authority. OpenTelemetry standardizes correlated evidence and highlights sensitive-payload risk; it does not validate autonomous monitoring outcomes.
- Passing browser cookies, ambient API keys, or production credentials directly to an agent is incompatible with the least-privilege and isolation model preserved in [[2026-05-27-zero-trust-for-ai-agents]].

## The Promotion Loop

1. **Observe a concrete failure.** Capture the wrong behavior, affected boundary, and evidence. Do not add rules for hypothetical style preferences.
2. **Choose the lowest reliable layer.**
   - Architecture or type system when the invalid state can be made unrepresentable.
   - Schema, generated interface, test, lint rule, script, or hook when the property is mechanically checkable.
   - Scoped model verifier when the property requires semantic judgment.
   - Human approval when the consequence is high, the action is irreversible, or product taste is load-bearing.
3. **Optionally test a legacy-debt ratchet.** If immediate cleanup is unsafe, baseline existing violations, block increases, publish the count, and measure false positives and maintenance cost while lowering the baseline. This is a provisional tactic, not a primary-source-backed universal rule.
4. **Run cheap checks first.** A verifier should not spend context rediscovering TypeScript errors, missing metadata, or known cross-file mismatches.
5. **Preserve proof.** Record commands, outputs, screenshots, traces, or state-based evidence so completion is inspectable and fresh sessions can resume. Bind the artifact to a trusted producer, task/run ID, exact code revision and dirty state, declared command/environment, captured result, and freshness window.
6. **Review the gate itself.** Track false positives, false negatives, bypasses, runtime cost, and whether the rule still matches the current model and codebase.

## Completion Evidence Contract

A completion artifact should answer:

- **Who produced it?** Prefer a trusted harness or runner over model-authored text.
- **What work does it cover?** Bind it to the task, acceptance criterion, commit, working-tree state, dependencies, and relevant environment.
- **What was executed or observed?** Record the exact command, state query, browser path, or validator and its exit status or end-state result.
- **When was it captured?** Reject stale or replayed artifacts after the covered state changes.
- **Can its integrity be checked?** Hashes and signatures can detect later alteration, but they do not prove that the underlying event happened.
- **Does it prove the requested outcome?** A test log, screenshot, or video is useful only when it demonstrates the actual acceptance criterion rather than adjacent activity.

This is stronger than checking that a marker file exists. It is also stricter than describing any digest as "cryptographic proof": a hash of fabricated or replayed output faithfully authenticates the wrong evidence.

## Context-Change Ablation

Treat prompts, skills, memory bundles, tool descriptions, retrieved context, and examples as interventions:

1. Keep a representative held-out task set and current-production or no-addition baseline.
2. Run the same harness and grader with and without the context change.
3. Compare task success, tail failures, latency, token/cost, retries, tool calls, and failure categories.
4. Check whether the change helps the rare cases it targets without regressing common cases.
5. Delete or narrow content that does not earn its context and maintenance cost; preserve complete raw references behind search or deferred loading for genuine long-tail needs.

Nisi reports reducing generated product guidance from more than 10,000 lines to 553 gotcha lines, with suite runtime falling from 68 minutes to six, and one task moving from 77% with a skill to 97% without it. Because the talk omits trial count, variance, model/version, task selection, and grader design, those numbers are directional evidence for running local ablations—not planning constants or proof that shorter skills always win.

## Workflow Shape

- Use the root instruction file as a router and precedence map, not as the whole project manual.
- Keep domain catalogs, architecture decisions, feature state, migrations, verification commands, and handoff evidence in scoped repo-local pages.
- Let a specification own scope and acceptance criteria when multiple agents collaborate.
- Give subagents bounded roles and outputs; escalate only decisions above an explicit consequence or ambiguity threshold.
- Keep worker and verifier contexts separate when self-review bias matters.
- Prototype state-rich user flows before backend integration when visual state and interaction coverage are still uncertain.
- Keep autonomous environments unable to reach secrets, production systems, unrelated repositories, or ambient user credentials.
- Treat permission rules, hooks, and sandboxing as distinct layers. For a hard sandbox requirement, fail closed when the sandbox is unavailable and account for extensions that may run outside Bash's boundary.
- Scale parallelism to merge and review capacity. More agents without review backpressure create an expensive queue, not a reliable workflow.

## Applied to This Knowledge Base

This repository already implements much of the pattern:

- `AGENTS.md` defines source immutability, page schemas, ingest/query/lint workflows, and the distinction between human-readable history and generated health state.
- `kb:lint`, `kb:refresh`, freshness checks, source-count checks, and retrieval evals convert several recurring prose requirements into executable evidence.
- `wiki/index.md`, per-collection indexes, concept pages, summaries, and `wiki/log.md` make durable knowledge and workflow state inspectable across sessions.

The next improvement should not be another broad instruction or agent hierarchy. When a real failure recurs, record it and ask:

- Can the schema or file layout make it impossible?
- Can one canonical source generate the dependent artifact?
- Can lint detect it?
- Would a measured, owned ratchet stop regression without creating a permanent waiver?
- If only a model can judge it, what exact evidence and false-positive budget justify the verifier?

This keeps the workflow from becoming prompt-heavy or bureaucratic while preserving a clear path from observed failure to durable protection.

## What Not to Adopt

- Do not pass browser cookies, ambient API keys, or production credentials directly to a coding agent as a normal integration path.
- Do not make bypassed permissions the default outside a truly isolated, task-scoped environment.
- Do not create planner/implementer/tester/verifier hierarchies for routine edits; use them only when isolation, specialization, or adversarial review repays the coordination cost. Anthropic's own report put multi-agent runs near 15× chat tokens and judged most coding work insufficiently parallelizable, so the bar is high and the burden of proof sits with the fan-out.
- Do not assume a multi-session "bundle" inherits subagent economics. If the pattern is really independent sessions with peer messaging and a shared task list, that is the experimental, disabled-by-default agent-teams surface, and each teammate is a full separate instance.
- Do not treat a fixed file-length threshold as universal. Tie limits to local evidence about change risk, cohesion, and testability.
- Do not let agents silently rewrite repo knowledge under a "self-learning" label. Use attributed diffs, review, and rollback.
- Do not replace deterministic observability, incident thresholds, and runbooks with open-ended model monitoring.

## Evidence Boundary

Confidence is high in the guidance-versus-enforcement distinction because current official Claude Code docs state it directly and it matches this repository's existing tooling. Confidence is moderate in the broader promotion sequence and evidence contract because architecture, types, lint, tests, hashes, state validators, and human review cover different failure modes. Confidence is low or unknown for Caleb Curry's exact thresholds, token claims, monitoring benefits, self-learning claims, and agent hierarchy, and for Nisi's exact 77%/97%, line-count, and runtime results, because the supplied talks do not expose enough experimental detail to reproduce them. Product-specific behavior remains fast-moving and must be rechecked before implementation.

Because the load-bearing claims here are Claude Code platform behavior, this page uses the 45-day fast-moving review tier rather than the 90-day operational tier. Permission, hook, sandbox, skill, subagent, and agent-team behavior was rechecked on 2026-07-28 against Claude Code CLI 2.1.220; the documentation consulted described behavior gated as recently as v2.1.219, so specific flags and defaults can move within a single minor series. Verdicts in the source-note ledger use a fixed vocabulary — Corroborated, Corroborated with caveat, Partially supported, Unverified, Rejected — so the ledger can be filtered and re-audited mechanically.

## Source Notes

- [[2026-07-15-these-90-minutes-will-change-the-way-you-use-ai]]
- [[2026-05-30-how-i-deleted-95-percent-of-my-agent-skills-and-got-better-results]]
- [[2026-07-24-the-new-rules-of-context-engineering-for-claude-5-generation-models]]
- [[2026-06-04-walkinglabs-learn-harness-engineering]]
- [[2026-05-24-the-orchestration-tax]]
- [[2026-05-27-zero-trust-for-ai-agents]]
- [[2026-04-06-how-and-when-to-use-subagents-in-claude-code]]
- [[2026-05-09-mnimiy-claude-md-12-rules]]
- [[2026-04-14-dive-into-claude-code-the-design-space-of-todays-and-future-ai-agent-systems]]
- [[2024-12-19-building-effective-agents]]
- [[2025-04-18-claude-code-best-practices-for-agentic-coding]]
- [[2025-09-11-writing-effective-tools-for-agents-with-agents]]
- [[2025-06-13-how-we-built-our-multi-agent-research-system]]
- [[2026-03-25-claude-code-auto-mode]]
- [[2025-10-20-beyond-permission-prompts-making-claude-code-more-secure-and-autonomous]]
- [[2026-07-25-opentelemetry-generative-ai-semantic-conventions]]

## Related

- [[internal-engineering-conventions]]
- [[agent-harnesses]]
- [[workflows]]
- [[claude-code]]
- [[repo-local-knowledge-bases]]
- [[multi-agent-systems]]
- [[agent-security]]
