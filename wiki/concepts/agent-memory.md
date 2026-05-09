---
id: concept-agent-memory
type: concept
title: Agent Memory
tags: [agents, memory, retrieval, reinforcement-learning, stateful-agents, context-engineering, agent-harnesses]
source_count: 21
summary: Agent memory covers how systems preserve, retrieve, consolidate, and reuse information across time through explicit storage, load policy, write discipline, verification, and harness-owned context management.
canonical_for: [agent memory, workflow memory, semantic memory]
review_status: reviewed
last_reviewed: 2026-05-09
review_due: 2026-06-09
confidence: "0.90"
---

# Agent Memory

## Summary

Agent memory refers to the mechanisms that let an agent preserve, retrieve, and reuse information across time. The KB now covers four broad families: explicit external memory stores, structured context playbooks, reusable workflow memory, and learned internal memory systems. The newer additions sharpen five related distinctions: memory is not only storage but also policy about what stays in the hot path; "memory" often needs working/episodic/semantic/personal separation; memory ownership is partly a harness question; memory quality depends on write gates and verification discipline; and prompt-cache stability constrains where dynamic memory can safely enter context. The newer enterprise framing also treats memory as synthesized organizational understanding, where identity resolution, source authority, and freshness tracking matter as much as storage itself. AHE adds an eval-grounded version of memory as a harness component: long-term memory can encode boundary-case lessons that transfer across coding tasks, but stacked with prompt and middleware changes it can also create redundant checks and regressions. ContextLattice adds the operational version: memory systems should expose explicit read/write/preflight/recency/degraded-state contracts, not only retrieval endpoints.

## Main Families

- External memory systems: memory managers, vector stores, graphs, and page stores.
- Structured context systems: curated bullet playbooks, delta updates, and file-backed context.
- Markdown filesystem memory: compact always-loaded indexes, lazily read note bodies, and ordinary file tools for edits, search, audit, and forgetting.
- Organizational memory: continuously updated company models or context graphs that unify people, projects, authority, and recency across tools.
- Workflow or procedural memory: reusable routines distilled from prior successful trajectories.
- Decision memory: ADR-style or rationale-preserving records that explain why a long-lived design choice was accepted and whether it is still active.
- Learned internal memory: fixed-length or compact state updated through reinforcement learning.
- Memory-tier systems: agents that treat context windows as a fast working tier and external stores or files as slower but larger memory.
- Context-pack systems: retrieval layers that return bounded facts, numeric facts, citations, source summaries, and lifecycle state instead of unstructured memory dumps.

## Operational Layers

- Working memory: live task state, open hypotheses, and resumable checkpoints that matter now and decay quickly.
- Episodic memory: what happened in prior runs, including failures, decisions, and outcomes.
- Semantic memory: abstractions, lessons, and durable design decisions that outlive any one episode.
- Personal memory: user-specific preferences and conventions that should not be mistaken for universal best practice.

## Maintenance Patterns

- Failures often need higher salience than routine successes so they are easier to retrieve before repetition.
- Consolidation can happen in the background rather than only on the hot path.
- Promotion from episodic to semantic memory should be evidence-based rather than automatic on every run.
- Promotion from rollout traces into long-term memory should carry evidence and expected impact so later eval rounds can confirm or revert the lesson.
- Some teams split semantic memory again into lessons versus decision records so architecture rationale stays inspectable instead of getting buried inside generic summaries.
- Personal preference memory should remain separate from general lessons to avoid overgeneralizing one user's style into doctrine.
- Memory portability depends on who controls the harness layer that stores, retrieves, and migrates it.
- Enterprise memory that only retrieves fragments is weaker than memory that resolves identity, staleness, and source priority ahead of time.
- Durable memory should default to no-op writes; a new memory has to justify future user time saved, not only future agent convenience.
- Always-loaded memory should usually be an index, not the full body of every memory. Bodies can be loaded with standard read/search tools when the task needs them.
- Memory reads need staleness pressure. If a memory names a file, function, flag, API, line number, price, model, or runtime behavior, verify current reality before asserting it.
- Prompt-cache stability is a design constraint: avoid mutating the stable system/developer prefix mid-session when a frozen snapshot, user-message recall block, or tool read would preserve cacheability.
- Persistent memory is also a persistent injection surface, so write paths should scan for instruction hijacks, secret-exfiltration patterns, and invisible Unicode before promoting content.
- Global user preferences and project-specific facts need explicit scoping, precedence, and conflict handling to avoid leakage across repositories or workflows.
- Retrieval output should carry lifecycle and provenance metadata, including whether results are ready, empty, degraded, pending, or missing slow-source continuation.
- Write policies should isolate telemetry, metrics, and other low-value operational state from semantic memory unless the query explicitly targets those records.
- Retrieval quality needs saved eval cases, especially for numeric exactness and repeated bad queries, so memory tuning is evidence-backed rather than vibe-backed.

## Important Distinctions

- Session history is not the same thing as retrieved context.
- Factual or profile memory differs from workflow memory about how to do a task.
- Lessons explain what tends to work; decision memory explains why a specific architecture choice was made and when it should be revisited.
- Editable, provenance-rich memory differs from learned latent memory.
- Working memory should usually be archived or reset, not treated as durable truth.
- Lightweight guide memory can coexist with deeper runtime retrieval.
- Paging, summarization, and interrupt handling are memory mechanisms too, not just implementation details.
- Hot-path memory tools and background consolidation jobs solve different problems and should not be collapsed into one layer.
- Storage layout is separate from load policy: the same markdown file can be always injected, frozen once per session, wrapped as recall context, or read lazily by tools.
- Eviction and verification are different answers to staleness. Eviction removes low-value memories; verification lets old memories remain useful without pretending they are live state.
- A memory index tells the agent what it might know; a memory body should still be treated as dated evidence.

## Design Questions

- What must remain inspectable and editable by humans?
- What can be safely compressed without harming future tasks?
- Should memory be updated continuously, periodically, or only on demand?
- When should the agent page, summarize, or interrupt itself instead of replying immediately?
- Which knowledge should become a reusable workflow artifact instead of staying as raw history?
- Which lessons belong in memory versus in tools, middleware, skills, or prompts when all of those surfaces can evolve?
- Who writes memory: the live agent, an offline consolidation pipeline, or a user-reviewed workflow?
- When does the stable prompt prefix update: every turn, only at session start, or never?
- How much context is always loaded: every memory, only an index, or no durable memory until retrieval?
- What is the staleness policy: character cap, usage decay, explicit verification, supersession, or some combination?
- How should global, project, and task-specific memory scopes inherit from or override each other?

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
- [[2026-04-19-your-company-needs-a-brain-not-more-connectors]]
- [[2026-04-28-agentic-harness-engineering-observability-driven-automatic-evolution-of-coding-agent-harnesses]]
- [[2026-05-01-agent-memory-engineering-nicolas-bustamante-user-provided-brief]]
- [[2026-05-09-contextlattice]]
