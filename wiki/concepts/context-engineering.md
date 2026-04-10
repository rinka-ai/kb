---
id: concept-context-engineering
type: concept
title: Context Engineering
tags: [agents, memory, long-context]
source_count: 9
---

# Context Engineering

## Summary

Context engineering is the discipline of deciding what information an agent should see, in what form, at what time, and with what update rules. In this repo, it sits between raw source preservation and query-time synthesis, but the newer Manus and LongLLMLingua additions sharpen that into a more operational view: cache stability, attention placement, and restorable compression are first-class design variables.

## What It Is

- separating persistent history from active model context
- deciding what to compress, summarize, retrieve, preserve, or recite
- structuring context so it can evolve without collapsing

## Patterns

- Preserve raw material, then assemble context selectively.
- Prefer additive delta updates over full rewrites.
- Make compression restorable whenever possible.
- Treat files, URLs, and external artifacts as part of usable context.
- Keep provenance and failure evidence instead of over-cleaning.
- Keep high-value prefixes stable so cache reuse survives long tool loops.
- Mask or constrain actions when needed instead of constantly rewriting the tool surface.
- Recite plans or goal state when the agent needs help keeping attention on long tasks.

## Tensions

- compression vs restorability
- internal learned memory vs external editable memory
- static precompiled memory vs just-in-time research and retrieval
- dense context vs attention and distractor risk

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
