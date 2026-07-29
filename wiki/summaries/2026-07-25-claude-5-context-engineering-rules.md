---
id: summary-2026-07-25-claude-5-context-engineering-rules
type: summary
title: "Claude 5 Context Engineering: Constraint Budget and Interface-First Rules"
tags: [claude-5, context-engineering, claude-code, system-prompts, progressive-disclosure, agent-skills, agent-tools, repo-instructions]
summary: "Claude 5 shifts context engineering from accumulating instructions toward budgeting constraints: keep product identity and authority boundaries stable, encode repo gotchas briefly, defer conditional procedures, design expressive interfaces, and pass task intent through rich references."
source_count: 6
canonical_for: [Claude 5 context engineering rules, Claude 5 system prompt guidance, how to simplify CLAUDE.md, constraint budget for agents]
review_status: reviewed
last_reviewed: 2026-07-25
review_due: 2026-08-25
confidence: "0.86"
---

# Claude 5 Context Engineering: Constraint Budget and Interface-First Rules

## Summary

The Claude 5 guidance changes the default question from “what else should the prompt say?” to “which context surface has earned the right to constrain the model?” Anthropic's strongest new evidence is an internal product result: Claude Code removed over 80% of its system prompt for Opus 5 and Fable 5 without measurable loss on its coding evaluations. Combined with the KB's earlier context, skill, harness, and repo-memory sources, the durable rule is not prompt minimalism for its own sake. It is constraint budgeting: keep stable product identity, authority boundaries, and universally relevant behavior always on; place repo-specific gotchas in lightweight project instructions; load conditional procedures through skills or deferred tools; keep durable memory in a scoped memory surface; and attach task-specific intent through high-fidelity references.

The migration is model-dependent. Instructions written around older failure modes can become an accumulated compatibility layer that slows newer models or creates conflicts, but safety and authorization controls do not become optional. Soft behavioral defaults can often yield to local judgment; hard boundaries should move into schemas, permissions, hooks, tests, and runtime enforcement.

## The Six Rule Changes

| Older default | Claude 5 default | Durable interpretation |
| --- | --- | --- |
| Give rules | Let the model use judgment | Replace overbroad stylistic prohibitions with local-fit criteria such as matching surrounding naming, idiom, and comment density. |
| Give worked examples | Design interfaces | Express state spaces, invariants, parameters, and consequences in schemas and tool contracts before adding demonstrations. |
| Put everything upfront | Use progressive disclosure | Keep only routing context hot; fetch skills, verifier guidance, tool schemas, and deeper references when the task reaches them. |
| Repeat instructions | Keep one concise authoritative description | Put tool-use guidance with the tool and remove duplicate prose from the system prompt. |
| Store memory in repo instructions | Use a memory surface | Separate repo conventions from personal or cross-session memory, while retaining provenance, scope, review, and security controls. |
| Use simple Markdown specs | Use rich references | Let tests, code, HTML artifacts, mockups, whole codebases, and executable rubrics carry task intent when they are more precise. |

## Context Placement Model

### System prompt

Use the system prompt for product identity, operating role, invariant authority boundaries, and behavior that genuinely applies across requests. It should not become a second copy of every tool description, review checklist, workflow, or repository convention.

### Repo instructions

Keep `CLAUDE.md` or `AGENTS.md` lightweight. Briefly state what the repository is for, then spend the remaining budget on non-obvious local gotchas, precedence rules, and routing pointers. Omit facts the model can discover reliably from the filesystem. A repo file should be a map and behavioral contract, not a warehouse for every practice.

### Skills and deferred tools

Use skills for conditional procedures, team opinions, verification methods, and deep domain guidance. Expose enough trigger context for discovery, then load the body, references, scripts, or tool schemas only after selection. Expressive interfaces should carry enums, allowed transitions, invariants, and parameter consequences directly.

### Memory

Keep personal preferences, cross-session facts, prior outcomes, and learned habits in a scoped memory layer rather than silently appending them to repo instructions. Auto-memory can improve convenience, but it does not remove the need for source attribution, write gates, retention, conflict handling, or user review.

### Task references

Attach the current task's detailed intent through the highest-fidelity available artifact: code, tests, specs, HTML mockups, example implementations, datasets, rubrics, or complete repositories. Rich references reduce the pressure to make always-on instructions predict every future request.

## Instruction-Placement Test

For each instruction or context fragment, ask:

1. Is it a safety, authorization, or irreversible-action boundary? Enforce it in permissions, schemas, hooks, sandboxes, or workflow gates; do not rely on prompt prose alone.
2. Is it true for nearly every request in this product? Keep a concise version in the system prompt.
3. Is it a non-obvious repository fact or recurring local footgun? Keep it in the repo instruction file, ideally with a path or verification command.
4. Is it conditional on a task type? Put it in a discoverable skill, deferred tool definition, or routed reference file.
5. Is it personal, cross-session, or learned from prior work? Put it in scoped memory with provenance and a write policy.
6. Is it specific to the current task? Attach it as a task reference rather than promoting it globally.
7. Can the model infer it reliably from code, schema, file layout, or an executable test? Prefer the inspectable artifact and remove redundant prose.
8. Does it exist only because an older model needed it? Re-evaluate it against the current model and tail-risk evals before retaining or deleting it.

## Where the Article Strengthens Existing KB Guidance

- [[context-engineering]] gains direct official evidence that instruction volume can be reduced without average coding-eval loss when model capability, tools, memory, and progressive disclosure improve together.
- [[agent-tools]] gains a concrete interface-first comparison: a roughly 9,100-character TodoWrite guide can collapse into a concise description, typed status enum, and one state invariant.
- [[agent-skills]] gains a sharper anti-overconstraint rule: skills should guide discovery and encode local opinions, while long procedures split across progressively loaded files.
- [[repo-local-knowledge-bases]] gains a boundary: durable project knowledge is valuable, but it should not all become always-loaded agent instructions.
- [[agent-memory]] gains a product transition from manual `CLAUDE.md` memory to auto-memory, with the caveat that automatic persistence still needs governance.
- [[claude-code]] gains a model-generation migration story: system-prompt simplification depends on newer judgment plus richer harness surfaces, not on removing the harness.

## Evidence Limits and Tensions

- The “over 80%” result is an Anthropic internal practitioner claim. The article does not disclose the evaluation suite, absolute scores, sample size, variance, prompt baseline, or tail-risk coverage.
- The result concerns Claude Code with Opus 5 and Fable 5; it should not be generalized automatically to older Claude models, other providers, or agents with weaker tools and memory.
- Fewer examples can widen exploration, but examples may still be the clearest way to communicate output shape, taste, policy edge cases, or uncommon semantics.
- Auto-memory reduces manual filing friction but can increase hidden-state, privacy, staleness, and instruction-conflict risk if its writes and precedence are opaque.
- Rich artifacts can carry more precise intent, but they can also hide complexity or become harder to diff and maintain than plain text.
- A shorter system prompt can improve context signal, yet removing a rare but important constraint may leave average evaluations unchanged while increasing tail risk.
- “Use judgment” applies best to soft defaults. It is not a substitute for least privilege, deterministic validation, or explicit approval around destructive actions.

## Recommended Migration Procedure

1. Inventory every system, repo, skill, memory, and tool-description instruction.
2. Mark duplicates, conflicts, obvious repository facts, model-version workarounds, and rules that are false for legitimate tasks.
3. Classify each remaining item by product-wide, repo-wide, task-conditional, personal-memory, or current-reference scope.
4. Move safety and authorization requirements into enforceable runtime controls.
5. Replace example-heavy tool prose with expressive schemas and explicit invariants; retain only examples that add information the interface cannot.
6. Split long skills and repo documents into routed trees with clear trigger descriptions.
7. Test the simplified context on representative tasks, conflict cases, destructive-operation cases, and rare repo gotchas—not only average coding tasks.
8. Version the context bundle by model capability when one product serves mixed model generations.
9. Record what was removed and why so regressions can restore the smallest proven constraint instead of rebuilding prompt sediment.

## Source Notes

- [[2026-07-24-the-new-rules-of-context-engineering-for-claude-5-generation-models]]
- [[2025-09-29-effective-context-engineering-for-ai-agents]]
- [[2025-11-25-using-claude-md-files-customizing-claude-code-for-your-codebase]]
- [[2026-06-03-lessons-from-building-claude-code-how-we-use-skills]]
- [[2026-06-03-dynamic-workflows-claude-code-ingest]]
- [[2026-06-11-building-good-vertical-agent]]

## Related

- [[context-engineering]]
- [[claude-code]]
- [[agent-skills]]
- [[agent-tools]]
- [[agent-harnesses]]
- [[ai-instruction-design]]
- [[context-rot]]
- [[repo-local-knowledge-bases]]
- [[internal-engineering-conventions]]
- [[agent-memory]]
