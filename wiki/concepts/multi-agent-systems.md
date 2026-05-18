---
id: concept-multi-agent-systems
type: concept
title: Multi-Agent Systems
tags: [agents, multi-agent, parallel-agents, orchestration]
source_count: 10
summary: Multi-agent systems include both LLM orchestration patterns and technical multi-agent learning settings; production LLM systems often work best with one coordinator plus bounded reviewer, search, or manager agents.
canonical_for: [multi-agent systems, parallel agents, subagents]
review_status: reviewed
last_reviewed: 2026-05-18
review_due: 2026-06-18
confidence: "0.84"
---

# Multi-Agent Systems

## Summary

Multi-agent systems use multiple agents when parallel exploration, specialization, strategic interaction, or fresh-context review beats a single agent loop. The current agent-engineering sources agree on a useful caution: most LLM tasks do not need multi-agent decomposition, and the overhead only pays off when context separation, bounded delegation, or concurrent exploration creates meaningful leverage. The textbook layer adds an important boundary: multi-agent reinforcement learning and game-theoretic multi-agent systems are not the same thing as LLM subagents. They study strategic interaction, nonstationarity, coordination, communication, partial observability, and equilibrium-like behavior in shared environments. Recent production evidence still sharpens the LLM-agent sweet spot for coding-heavy work: one writer usually owns the mutable thread while auxiliary agents contribute review, search, routing, or management intelligence around that writer.

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
- for structured extraction workloads, treat reflexive correction loops as an accuracy-cost-latency tradeoff rather than a free improvement; medium-confidence benchmark evidence favors selective hierarchical routing and retry when scale matters
- when reading multi-agent RL sources, separate strategic learning problems from software-orchestration patterns; they share vocabulary but not always assumptions

## Tensions

- parallel speedup vs coordination overhead
- fresh contexts vs fragmented global understanding
- specialization vs duplicated work
- autonomy vs the need for explicit task locking and review
- iterative self-correction vs cost, tail latency, and throughput collapse under load
- LLM-agent manager/worker metaphors vs formal multi-agent models such as games, stochastic games, and partially observable stochastic games

## Source Notes

- [[2025-06-13-how-we-built-our-multi-agent-research-system]]
- [[2026-01-23-building-multi-agent-systems-when-and-how-to-use-them]]
- [[2026-04-06-how-and-when-to-use-subagents-in-claude-code]]
- [[2026-02-05-building-a-c-compiler-with-a-team-of-parallel-claudes]]
- [[2026-03-24-harness-design-for-long-running-application-development]]
- [[2026-04-22-multi-agents-whats-actually-working]]
- [[2025-04-18-claude-code-best-practices-for-agentic-coding]]
- [[2026-03-24-benchmarking-multi-agent-llm-architectures-financial-document-processing]]
- [[2026-05-18-multi-agent-reinforcement-learning]]
- [[2026-05-18-algorithms-for-decision-making]]
