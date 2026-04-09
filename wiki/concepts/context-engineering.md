---
id: concept-context-engineering
type: concept
title: Context Engineering
tags: [agents, memory, long-context]
source_count: 7
---

# Context Engineering

## Summary

Context engineering is the discipline of deciding what information an agent should see, in what form, at what time, and with what update rules. In this repo, it sits between raw source preservation and query-time synthesis.

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
- [[2026-04-09-agentic-file-system]]
- [[2026-04-09-scaling-managed-agents-decoupling-the-brain-from-the-hands]]
