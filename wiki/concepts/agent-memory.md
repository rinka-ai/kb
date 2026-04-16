---
id: concept-agent-memory
type: concept
title: Agent Memory
tags: [agents, memory, retrieval, reinforcement-learning, stateful-agents]
source_count: 17
summary: Agent memory covers how systems preserve, retrieve, consolidate, and reuse information across time, from editable external stores to learned compact state.
canonical_for: [agent memory, workflow memory, semantic memory]
review_status: reviewed
last_reviewed: 2026-04-16
review_due: 2026-05-16
confidence: "0.89"
---

# Agent Memory

## Summary

Agent memory refers to the mechanisms that let an agent preserve, retrieve, and reuse information across time. The KB now covers four broad families: explicit external memory stores, structured context playbooks, reusable workflow memory, and learned internal memory systems. The newer additions sharpen three related distinctions: memory is not only storage but also policy about what stays in the hot path, "memory" itself often needs working/episodic/semantic/personal separation, and memory ownership is partly a harness question rather than only a storage question.

## Main Families

- External memory systems: memory managers, vector stores, graphs, and page stores.
- Structured context systems: curated bullet playbooks, delta updates, and file-backed context.
- Workflow or procedural memory: reusable routines distilled from prior successful trajectories.
- Learned internal memory: fixed-length or compact state updated through reinforcement learning.
- Memory-tier systems: agents that treat context windows as a fast working tier and external stores or files as slower but larger memory.

## Operational Layers

- Working memory: live task state, open hypotheses, and resumable checkpoints that matter now and decay quickly.
- Episodic memory: what happened in prior runs, including failures, decisions, and outcomes.
- Semantic memory: abstractions, lessons, and durable design decisions that outlive any one episode.
- Personal memory: user-specific preferences and conventions that should not be mistaken for universal best practice.

## Maintenance Patterns

- Failures often need higher salience than routine successes so they are easier to retrieve before repetition.
- Consolidation can happen in the background rather than only on the hot path.
- Promotion from episodic to semantic memory should be evidence-based rather than automatic on every run.
- Personal preference memory should remain separate from general lessons to avoid overgeneralizing one user's style into doctrine.
- Memory portability depends on who controls the harness layer that stores, retrieves, and migrates it.

## Important Distinctions

- Session history is not the same thing as retrieved context.
- Factual or profile memory differs from workflow memory about how to do a task.
- Editable, provenance-rich memory differs from learned latent memory.
- Working memory should usually be archived or reset, not treated as durable truth.
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
- [[2026-04-16-externalization-in-llm-agents-a-unified-review-of-memory-skills-protocols-and-harness-engineering]]
- [[2026-04-16-your-harness-your-memory]]
- [[2026-04-16-agentic-stack]]
- [[2026-04-16-ai-agent-stack-builders-guide-av1dlive]]
