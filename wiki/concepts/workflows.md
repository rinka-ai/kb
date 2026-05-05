---
id: concept-workflows
type: concept
title: Agent Workflows
tags: [workflows, agents, orchestration, workflow-agents, deterministic-control]
source_count: 6
summary: Agent workflows wrap model calls in explicit orchestration so sequencing, approvals, and side effects stay inspectable instead of being improvised inside one autonomous loop.
canonical_for: [workflows, workflow agents, agent workflows, deterministic orchestration]
review_status: reviewed
last_reviewed: 2026-04-16
review_due: 2026-05-16
confidence: "0.83"
---

# Agent Workflows

## Summary

Agent workflows are deterministic or semi-deterministic control structures around model calls. They matter when ordering, retries, approval gates, and business rules are known well enough that orchestration should live in code rather than be rediscovered by the model on every run.

## When They Fit

- repeatable task skeletons with known stages or approval points
- systems where side effects must stay narrow, auditable, and idempotent
- cases where multiple model calls still benefit from a fixed control graph
- applications that need long-running progress without granting full planning autonomy

## Design Rules

- keep the workflow explicit and let the model handle the ambiguous subproblems inside it
- separate orchestration from tool implementations and side-effect handlers
- preserve run state and artifacts so human review and resume are possible
- add more autonomy only when a deterministic skeleton is clearly too rigid for the task
- choose feedback loops with operational constraints in view: iterative correction can improve accuracy, but cost, latency tails, and queuing behavior can dominate at production scale

## Failure Modes

- hiding business logic in prompts when it really belongs in the workflow layer
- using a model loop where plain sequential or parallel orchestration would be simpler
- overfitting the workflow to one provider or runtime so portability disappears
- treating workflows as static forever instead of evolving them when failure patterns become obvious
- adding verification or retry loops without explicit timeout, routing, and budget policy

## Source Notes

- [[2024-12-19-building-effective-agents]]
- [[2026-04-12-google-adk-runtime-event-loop-and-workflow-agents]]
- [[2026-04-12-temporal-ai-cookbook]]
- [[2026-04-12-agent-workflow-memory]]
- [[2026-04-12-durable-mcp-weather-server]]
- [[2026-03-24-benchmarking-multi-agent-llm-architectures-financial-document-processing]]
