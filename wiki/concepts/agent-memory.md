---
id: concept-agent-memory
type: concept
title: Agent Memory
tags: [agents, memory, retrieval]
source_count: 7
---

# Agent Memory

## Summary

Agent memory refers to the mechanisms that let an agent preserve, retrieve, and reuse information across time. The imported momo-research notes show three broad families: explicit external memory stores, structured context playbooks, and learned internal memory systems.

## Main Families

- External memory systems: memory managers, vector stores, graphs, and page stores.
- Structured context systems: curated bullet playbooks, delta updates, and file-backed context.
- Learned internal memory: fixed-length or compact state updated through reinforcement learning.

## Important Distinctions

- Session history is not the same thing as retrieved context.
- Editable, provenance-rich memory differs from learned latent memory.
- Lightweight guide memory can coexist with deeper runtime retrieval.

## Design Questions

- What must remain inspectable and editable by humans?
- What can be safely compressed without harming future tasks?
- Should memory be updated continuously, periodically, or only on demand?

## Source Notes

- [[2026-04-09-context-engineering-sessions-memory]]
- [[2026-04-09-agentic-context-engineering]]
- [[2026-04-09-gam-vs-context-rot]]
- [[2026-04-09-mem1]]
- [[2026-04-09-memagent]]
- [[2026-04-09-agentic-file-system]]
- [[2026-04-09-scaling-managed-agents-decoupling-the-brain-from-the-hands]]
