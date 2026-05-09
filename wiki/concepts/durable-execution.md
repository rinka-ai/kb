---
id: concept-durable-execution
type: concept
title: Durable Execution
tags: [durable-execution, agents, orchestration, sessions, checkpoints, hitl]
source_count: 8
summary: Durable execution makes long-running agent work survivable by treating pause, resume, replay, retry, and human intervention as first-class runtime behaviors.
canonical_for: [durable execution, resumable agents, replayable workflows, checkpointed agents]
review_status: reviewed
last_reviewed: 2026-05-09
review_due: 2026-06-09
confidence: "0.85"
---

# Durable Execution

## Summary

Durable execution means an agent run can survive crashes, long pauses, human approvals, and external retries without pretending the whole task fits inside one uninterrupted process. In practice, it is about explicit run identity, checkpointed state, replay discipline, and isolated side-effect boundaries. Goose adds a useful product-level implementation example: durability is not only storage, but also cancellable live work, scheduled resumes, and replayable client event streams around the same execution state. Flue adds the useful boundary case: persisted session history and Durable Object storage are valuable, but they are not by themselves a durable run contract unless active work, approvals, retries, event logs, and side effects are also represented explicitly. The durable-orchestration source adds the background-agent frame: durable steps, external state, event waits, lifecycle controls, and traces should outlive whichever agent topology is fashionable.

## Core Properties

- explicit execution units such as threads, sessions, runs, or workflows
- persisted checkpoints or workflow state, not only chat history
- replay-safe boundaries around network calls and other side effects
- pause-resume semantics for review, approval, or delayed continuation
- reconnectable event streams or logs so clients can reattach to active work without losing execution context
- lifecycle state for status, cancellation, scheduling, inspection, and wake-up triggers
- separation between conversation/session persistence and the lifecycle of active execution runs
- structured traces that explain completed steps, pending waits, retries, cancellations, and replay-safe side effects

## Where It Matters

- long-running coding or research tasks that exceed a single context window
- human-in-the-loop systems where approval pauses are normal rather than exceptional
- tool flows with retries, external APIs, or background processing
- systems that need crash recovery, auditability, or deterministic restarts
- background agents whose work outlives one HTTP request, process, deployment, or sandbox session

## Design Rules

- checkpoint state before and after meaningful control transitions
- isolate non-deterministic or external work into explicit task boundaries
- store enough execution metadata to explain why the run is waiting or resumable
- treat interruption and resume as product features, not recovery hacks
- distinguish user-visible thread state from internal execution state when forks, provider changes, or background jobs make them diverge
- keep semantic workflow state above sandbox or VM snapshots so completed steps and side effects are inspectable without replaying everything
- treat "stored chat history" as necessary but insufficient; persist active run metadata and side-effect checkpoints as their own state
- keep sandbox snapshots separate from workflow snapshots so compute state does not become the only durability record

## Source Notes

- [[2026-04-12-langgraph-durable-execution-persistence-and-human-in-the-loop]]
- [[2026-04-12-temporal-ai-cookbook]]
- [[2026-04-12-durable-mcp-weather-server]]
- [[2026-04-12-openai-agents-sdk-sessions-handoffs-and-human-in-the-loop]]
- [[2026-04-09-scaling-managed-agents-decoupling-the-brain-from-the-hands]]
- [[2026-04-17-goose]]
- [[2026-05-02-flue]]
- [[2026-05-09-durable-orchestration-agent-patterns-user-provided]]
