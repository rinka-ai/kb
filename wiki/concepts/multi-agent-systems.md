---
id: concept-multi-agent-systems
type: concept
title: Multi-Agent Systems
tags: [agents, multi-agent, parallel-agents, orchestration]
source_count: 7
summary: Multi-agent systems use multiple model contexts coordinated through code; the most reliable production pattern is often one coordinating writer plus bounded reviewer, search, or manager agents.
canonical_for: [multi-agent systems, parallel agents, subagents]
review_status: reviewed
last_reviewed: 2026-04-23
review_due: 2026-05-23
confidence: "0.84"
---

# Multi-Agent Systems

## Summary

Multi-agent systems use multiple model contexts coordinated through code when parallel exploration, specialization, or fresh-context review beats a single agent loop. The current sources agree on a useful caution: most tasks do not need multi-agent decomposition, and the overhead only pays off when context separation, bounded delegation, or concurrent exploration creates meaningful leverage. Recent production evidence sharpens the current sweet spot further for coding-heavy work: one writer usually owns the mutable thread while auxiliary agents contribute review, search, routing, or management intelligence around that writer.

## When They Help

- breadth-first research where multiple search threads can run in parallel
- software projects where work can be partitioned into bounded subproblems
- evaluator or reviewer roles where a fresh context is useful
- long-running workflows where handoff artifacts and specialization matter more than one giant context

## Common Design Rules

- keep one coordinator responsible for synthesis and final decisions
- prefer one active writer when code changes encode many implicit decisions; let other agents contribute review, search, routing, or management around that writer
- give subagents bounded scope, clear outputs, and disjoint responsibilities when possible
- use artifacts or structured summaries to compress each agent’s findings back into the main thread
- do not decompose work unless the coordination cost is lower than the benefit from parallelism or specialization

## Tensions

- parallel speedup vs coordination overhead
- fresh contexts vs fragmented global understanding
- specialization vs duplicated work
- autonomy vs the need for explicit task locking and review

## Source Notes

- [[2025-06-13-how-we-built-our-multi-agent-research-system]]
- [[2026-01-23-building-multi-agent-systems-when-and-how-to-use-them]]
- [[2026-04-06-how-and-when-to-use-subagents-in-claude-code]]
- [[2026-02-05-building-a-c-compiler-with-a-team-of-parallel-claudes]]
- [[2026-03-24-harness-design-for-long-running-application-development]]
- [[2026-04-22-multi-agents-whats-actually-working]]
- [[2025-04-18-claude-code-best-practices-for-agentic-coding]]
