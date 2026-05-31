---
id: concept-multi-agent-systems
type: concept
title: Multi-Agent Systems
tags: [agents, multi-agent, parallel-agents, orchestration]
source_count: 12
summary: Multi-agent systems include both LLM orchestration patterns and formal multi-agent learning settings; reliable designs need bounded roles, human-review backpressure, and attribution paths for diagnosing coordination failures.
canonical_for: [multi-agent systems, parallel agents, subagents, orchestration tax, parallel agent review bottleneck, attention bottleneck]
review_status: reviewed
last_reviewed: 2026-05-31
review_due: 2026-06-30
confidence: "0.85"
---

# Multi-Agent Systems

## Summary

Multi-agent systems use multiple agents when parallel exploration, specialization, strategic interaction, or fresh-context review beats a single agent loop. The current agent-engineering sources agree on a useful caution: most LLM tasks do not need multi-agent decomposition, and the overhead only pays off when context separation, bounded delegation, or concurrent exploration creates meaningful leverage. The textbook layer adds an important boundary: multi-agent reinforcement learning and game-theoretic multi-agent systems are not the same thing as LLM subagents. They study strategic interaction, nonstationarity, coordination, communication, partial observability, and equilibrium-like behavior in shared environments. Recent production evidence still sharpens the LLM-agent sweet spot for coding-heavy work: one writer usually owns the mutable thread while auxiliary agents contribute review, search, routing, or management intelligence around that writer. Osmani's orchestration-tax framing adds the missing human-throughput constraint: even if agents generate work in parallel, architectural judgment, merge reconciliation, and final review remain serial unless the system adds backpressure around the human reviewer. The LIFE survey adds a diagnostic requirement: once agents are tightly coupled, the system also needs attribution paths that explain how role, message, tool, or topology failures propagate and what should be repaired.

## When They Help

- breadth-first research where multiple search threads can run in parallel
- software projects where work can be partitioned into bounded subproblems
- evaluator or reviewer roles where a fresh context is useful
- long-running workflows where handoff artifacts and specialization matter more than one giant context

## Common Design Rules

- keep one coordinator responsible for synthesis and final decisions
- prefer one active writer when code changes encode many implicit decisions; let other agents contribute review, search, routing, or management around that writer
- scale parallel workers to the coordinator's real review rate, not to the number of agents the UI can spawn
- parallelize isolated or mechanically verifiable tasks; keep architecture design, weird bugs, and merge-heavy work near the human judgment path
- make agents attach proof artifacts, such as tests, screenshots, trace summaries, or risk notes, before spending human review attention
- give subagents bounded scope, clear outputs, and disjoint responsibilities when possible
- use artifacts or structured summaries to compress each agent’s findings back into the main thread
- preserve enough trace structure to attribute failures across role assignments, communication handoffs, tool calls, and final synthesis
- do not decompose work unless the coordination cost is lower than the benefit from parallelism or specialization
- for structured extraction workloads, treat reflexive correction loops as an accuracy-cost-latency tradeoff rather than a free improvement; medium-confidence benchmark evidence favors selective hierarchical routing and retry when scale matters
- when reading multi-agent RL sources, separate strategic learning problems from software-orchestration patterns; they share vocabulary but not always assumptions

## Tensions

- parallel speedup vs coordination overhead
- parallel agent production vs serial human review throughput
- dashboard activity vs reliable merged work
- fresh contexts vs fragmented global understanding
- specialization vs duplicated work
- autonomy vs the need for explicit task locking and review
- iterative self-correction vs cost, tail latency, and throughput collapse under load
- LLM-agent manager/worker metaphors vs formal multi-agent models such as games, stochastic games, and partially observable stochastic games
- more collaboration surface vs harder failure attribution and repair

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
- [[2026-05-14-beyond-individual-intelligence-multi-agent-life-survey]]
- [[2026-05-24-the-orchestration-tax]]
