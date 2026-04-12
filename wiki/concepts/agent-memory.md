---
id: concept-agent-memory
type: concept
title: Agent Memory
tags: [agents, memory, retrieval]
source_count: 13
---

# Agent Memory

## Summary

Agent memory refers to the mechanisms that let an agent preserve, retrieve, and reuse information across time. The KB now covers four broad families: explicit external memory stores, structured context playbooks, reusable workflow memory, and learned internal memory systems. The newer additions sharpen an important distinction: memory is not only storage, but also policy about what stays in the hot path, what gets consolidated in the background, and what becomes a reusable procedure.

## Main Families

- External memory systems: memory managers, vector stores, graphs, and page stores.
- Structured context systems: curated bullet playbooks, delta updates, and file-backed context.
- Workflow or procedural memory: reusable routines distilled from prior successful trajectories.
- Learned internal memory: fixed-length or compact state updated through reinforcement learning.
- Memory-tier systems: agents that treat context windows as a fast working tier and external stores or files as slower but larger memory.

## Important Distinctions

- Session history is not the same thing as retrieved context.
- Factual or profile memory differs from workflow memory about how to do a task.
- Editable, provenance-rich memory differs from learned latent memory.
- Lightweight guide memory can coexist with deeper runtime retrieval.
- Paging, summarization, and interrupt handling are memory mechanisms too, not just implementation details.
- Hot-path memory tools and background consolidation jobs solve different problems and should not be collapsed into one layer.

## Design Questions

- What must remain inspectable and editable by humans?
- What can be safely compressed without harming future tasks?
- Should memory be updated continuously, periodically, or only on demand?
- When should the agent page, summarize, or interrupt itself instead of replying immediately?
- Which knowledge should become a reusable workflow artifact instead of staying as raw history?

## Source Notes

- [[2026-04-09-context-engineering-sessions-memory]]
- [[2026-04-09-agentic-context-engineering]]
- [[2026-04-09-gam-vs-context-rot]]
- [[2026-04-09-mem1]]
- [[2026-04-09-memagent]]
- [[2026-04-10-memgpt-towards-llms-as-operating-systems]]
- [[2026-04-10-letta]]
- [[2026-04-09-agentic-file-system]]
- [[2026-04-09-scaling-managed-agents-decoupling-the-brain-from-the-hands]]
- [[2026-04-12-langmem]]
- [[2026-04-12-agent-workflow-memory]]
- [[2026-04-12-mem1-learning-to-synergize-memory-and-reasoning-for-efficient-long-horizon-agents]]
- [[2026-04-12-memagent-reshaping-long-context-llm-with-multi-conv-rl-based-memory-agent]]
