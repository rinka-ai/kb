---
id: concept-context-engineering
type: concept
title: Context Engineering
tags: [agents, memory, long-context, compression]
source_count: 15
summary: Context engineering is the discipline of deciding what information enters active model context, in what form, and with what update policy.
canonical_for: [context engineering, context compression]
review_status: reviewed
last_reviewed: 2026-05-09
review_due: 2026-06-09
confidence: "0.89"
---

# Context Engineering

## Summary

Context engineering is the discipline of deciding what information an agent should see, in what form, at what time, and with what update rules. In this repo, it sits between raw source preservation and query-time synthesis, but the newer additions sharpen that into a more operational view: cache stability, attention placement, query-aware compaction, progressive disclosure, explicit context budgeting, and resolver-based routing are first-class design variables. The builder's guide adds a useful operational emphasis here: `build_context` is often the real center of the system because whatever stays outside the active context effectively does not exist to the model. The newer enterprise framing adds a further distinction between runtime retrieval and maintained organizational understanding: for some questions, the key choice is whether the agent should re-search raw tools from scratch or read from a continuously synthesized context layer. AHE adds the trajectory-debugging version of progressive disclosure: millions of rollout tokens become layered reports with drill-down access, so the evolve agent can reason over failures without swallowing raw traces whole. ContextLattice adds a concrete active-context artifact shape: context packs should be bounded, grounded, cited, and honest about incomplete retrieval.

## What It Is

- separating persistent history from active model context
- deciding what to compress, summarize, retrieve, preserve, or recite
- structuring context so it can evolve without collapsing

## Patterns

- Preserve raw material, then assemble context selectively.
- Prefer additive delta updates over full rewrites.
- For organization-specific work, compile repeated cross-source judgments into durable files when forcing the agent to rediscover them at runtime is noisier and less trustworthy.
- For extremely long prompts, consider keeping the input as external state with symbolic handles rather than copying it directly into active model context.
- Make compression restorable whenever possible.
- Treat files, URLs, and external artifacts as part of usable context.
- Load the most relevant working state, preferences, and permissions first when they are safety- or task-critical.
- Use registries or manifests so large skill libraries can stay mostly off-context until matched.
- Prefer small resolver documents or routing tables that load the right context on demand instead of bloating always-on instructions.
- Keep provenance and failure evidence instead of over-cleaning.
- Distill long trajectories into layered summaries while preserving raw trace access for claim checks.
- Keep high-value prefixes stable so cache reuse survives long tool loops.
- Mask or constrain actions when needed instead of constantly rewriting the tool surface.
- Recite plans or goal state when the agent needs help keeping attention on long tasks.
- Treat salience estimation and evidence ordering as context decisions, not only retrieval decisions.
- Every fragment in context should earn its place; irrelevant but plausible context is still noise.
- Prefer context packs that separate facts, numeric facts, citations, rendered result rows, warnings, and retrieval debug instead of pasting raw search results.
- Use topic rollups as an intermediate layer between raw history and active context, preserving raw refs while exposing recency, file partitions, and open inferences.
- Return lifecycle metadata with context assembly so the caller knows whether the context is ready, partial, degraded, or worth re-querying after cache warm.

## Tensions

- compression vs restorability
- internal learned memory vs external editable memory
- static precompiled memory vs just-in-time research and retrieval
- maintained synthesized worldview vs repeated raw-tool lookup
- dense context vs attention and distractor risk
- RLM-style externalized context vs simpler retrieval or summarization when task complexity is low
- query-aware compression quality vs cacheability and reuse
- richer always-loaded skills vs progressive disclosure and budget discipline
- compact evidence reports vs raw trace fidelity for attribution and rollback decisions

## Source Notes

- [[2026-04-09-agentic-context-engineering]]
- [[2026-04-09-context-engineering-sessions-memory]]
- [[2026-04-09-context-compression-strategies]]
- [[2026-04-09-context-rot]]
- [[2026-04-09-longllmlingua]]
- [[2026-04-10-longllmlingua-accelerating-and-enhancing-llms-in-long-context-scenarios-via-prompt-compression]]
- [[2026-04-09-agentic-file-system]]
- [[2026-04-09-scaling-managed-agents-decoupling-the-brain-from-the-hands]]
- [[2025-07-18-context-engineering-for-ai-agents-lessons-from-building-manus]]
- [[2026-04-16-ai-agent-stack-builders-guide-av1dlive]]
- [[2026-04-16-resolvers-the-routing-table-for-intelligence]]
- [[2026-04-19-your-company-needs-a-brain-not-more-connectors]]
- [[2026-04-28-agentic-harness-engineering-observability-driven-automatic-evolution-of-coding-agent-harnesses]]
- [[2026-04-23-recursive-language-models]]
- [[2026-05-09-contextlattice]]
