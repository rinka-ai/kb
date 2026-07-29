---
id: concept-multi-agent-systems
type: concept
title: Multi-Agent Systems
tags: [agents, multi-agent, parallel-agents, orchestration]
source_count: 16
summary: Multi-agent systems span LLM orchestration and formal multi-agent learning; reliable deployments need bounded roles, interoperable discovery and task contracts, human-review backpressure, and failure attribution.
canonical_for: [multi-agent systems, parallel agents, subagents, a2a, agent2agent, orchestration tax, parallel agent review bottleneck, attention bottleneck]
review_status: reviewed
last_reviewed: 2026-07-29
review_due: 2026-10-27
confidence: "0.89"
---

# Multi-Agent Systems

## Summary

Multi-agent systems use multiple agents when parallel exploration, specialization, strategic interaction, or fresh-context review beats a single agent loop. The current agent-engineering sources agree on a useful caution: most LLM tasks do not need multi-agent decomposition, and the overhead only pays off when context separation, bounded delegation, or concurrent exploration creates meaningful leverage. A2A v1.0.1 adds a standardized cross-runtime boundary: agents can advertise skills through Agent Cards and exchange messages, tasks, artifacts, streaming updates, or push notifications without revealing internal memory, prompts, or tools. That solves interoperability, not coordination quality; trust, delegation limits, identity, audit, and repair policy still belong above the protocol. The textbook layer adds an important boundary: multi-agent reinforcement learning and game-theoretic multi-agent systems are not the same thing as LLM subagents. They study strategic interaction, nonstationarity, coordination, communication, partial observability, and equilibrium-like behavior in shared environments. Recent production evidence still sharpens the LLM-agent sweet spot for coding-heavy work: one writer usually owns the mutable thread while auxiliary agents contribute review, search, routing, or management intelligence around that writer. Osmani's orchestration-tax framing adds the missing human-throughput constraint: even if agents generate work in parallel, architectural judgment, merge reconciliation, and final review remain serial unless the system adds backpressure around the human reviewer. The LIFE survey adds a diagnostic requirement: once agents are tightly coupled, the system also needs attribution paths that explain how role, message, tool, or topology failures propagate and what should be repaired. Mukta's dreaming design adds an offline fan-out pattern: one coordinator can assign bounded session transcripts to subagents, aggregate recurring failure evidence, and propose shared-memory changes, provided concurrent store writes, permissions, attribution, and the final promotion gate remain deterministic.

The domain-specific-agent proposal adds a useful decomposition test: make a specialist a separate agent when context, tools, authority, state, and evaluation criteria form a stable boundary. A smaller worker prompt is only a local saving, however; the system still pays for routing, coordinator context, handoffs, summaries, retries, verification, and failure recovery.

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
- specialize by separable context and authority boundaries rather than job-title metaphors; keep tightly shared state and sequential reasoning in one agent
- require a compact task/result contract with evidence and explicit errors so context isolation does not become an unauditable natural-language telephone game
- measure total-system tokens, latency, and end-state quality rather than reporting only the reduced context inside one specialist call
- for structured extraction workloads, treat reflexive correction loops as an accuracy-cost-latency tradeoff rather than a free improvement; medium-confidence benchmark evidence favors selective hierarchical routing and retry when scale matters
- when reading multi-agent RL sources, separate strategic learning problems from software-orchestration patterns; they share vocabulary but not always assumptions
- for cross-session memory consolidation, partition evidence by permission-compatible session, give each reviewer a bounded transcript, and let one coordinator aggregate prevalence before proposing shared-store changes
- clone the target memory store for multi-agent curation and use content-hash preconditions or a single-writer merge stage so parallel reviewers cannot silently overwrite one another
- use capability-advertisement and task-lifecycle protocols for cross-runtime collaboration, while keeping authorization, delegation ceilings, and audit policy explicit above the wire format
- make one specification the authority for scope and acceptance criteria when planner, implementer, tester, and verifier roles collaborate; route unresolved high-consequence ambiguity back to the coordinator or human instead of letting agents negotiate the product indefinitely
- budget fan-out as a large multiplier, not a marginal cost: Anthropic's research system measured multi-agent runs at roughly 15× the tokens of a chat interaction and single research agents at about 4×. Those figures are specific to that report's system, models, and research workload, so treat them as order-of-magnitude evidence that decomposition is expensive rather than as planning constants
- weight coding work down when deciding to decompose: the same report found that "most coding tasks involve fewer truly parallelizable tasks than research" and that agents remain weak at real-time coordination and delegation. Breadth-first research is the demonstrated sweet spot; feature delivery is not
- distinguish in-session workers from independent sessions before reasoning about cost or coordination. A subagent runs inside one session and returns a summary to its caller; independent sessions that message each other peer-to-peer and self-coordinate through a shared task list are a different topology whose price is one full instance per participant. In Claude Code that second surface is agent teams, which is experimental and disabled by default, so verify its current status before designing around it

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
- broader fleet visibility vs permission isolation when reviewers compare transcripts across agents, teams, or tenants
- role specialization vs agent bureaucracy when context reconstruction, cross-agent debate, and serial integration exceed the value of parallel work
- specialist-local context savings vs coordinator, routing, retry, and verification overhead across the full system
- summarized in-session delegation vs fully independent peer sessions: richer collaboration buys discussion and self-coordination at roughly one full instance per teammate

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
- [[2026-06-22-lamis-mukta-learning-while-you-sleep-beyond-memory-to-dreaming]]
- [[2026-05-28-agent2agent-a2a-protocol-v1-0-1]]
- [[2026-07-15-these-90-minutes-will-change-the-way-you-use-ai]]
- [[2026-06-28-the-future-is-domain-specific-agents]]
