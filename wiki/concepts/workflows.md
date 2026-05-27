---
id: concept-workflows
type: concept
title: Agent Workflows
tags: [workflows, agents, orchestration, workflow-agents, deterministic-control]
source_count: 10
summary: Agent workflows wrap model calls in explicit orchestration so sequencing, approvals, and side effects stay inspectable instead of being improvised inside one autonomous loop.
canonical_for: [workflows, workflow agents, agent workflows, deterministic orchestration]
review_status: reviewed
last_reviewed: 2026-05-27
review_due: 2026-06-27
confidence: "0.84"
---

# Agent Workflows

## Summary

Agent workflows are deterministic or semi-deterministic control structures around model calls. They matter when ordering, retries, approval gates, and business rules are known well enough that orchestration should live in code rather than be rediscovered by the model on every run. The durable-orchestration source frames workflows as a stable substrate for changing agent patterns: ReAct loops, planners, routers, and multi-agent delegation are all compositions of step, state, event, retry, and trace primitives. The AI SaaS case-study transcript extends this into product discovery: a workflow can also move from metric definition to mechanism mining, simulation, parameter search, live rollout, and business-metric feedback. The AI-agency source adds a GTM/delivery version: reactivation, review/referral capture, speed-to-lead, sales coaching, and ads should be sequenced as one measurable funnel workflow rather than sold as disconnected automations.

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
- compose new agent patterns from explicit workflow primitives instead of hiding orchestration inside prompts or framework-specific topology
- choose feedback loops with operational constraints in view: iterative correction can improve accuracy, but cost, latency tails, and queuing behavior can dominate at production scale
- keep workflow state outside sandbox snapshots when completed steps, external waits, and side-effect replay need to be inspectable
- treat simulations as workflow stages with explicit assumptions, then verify the same mechanism in live deployment before promoting it to product truth
- for commercial agency workflows, define consent, opt-out, fallback, attribution, and dashboard state as workflow steps rather than after-the-fact operations

## Failure Modes

- hiding business logic in prompts when it really belongs in the workflow layer
- using a model loop where plain sequential or parallel orchestration would be simpler
- overfitting the workflow to one provider or runtime so portability disappears
- treating workflows as static forever instead of evolving them when failure patterns become obvious
- adding verification or retry loops without explicit timeout, routing, and budget policy
- mistaking a simulated metric lift for a live business result when unmodeled confounders remain in the real workflow

## Source Notes

- [[2024-12-19-building-effective-agents]]
- [[2026-04-12-google-adk-runtime-event-loop-and-workflow-agents]]
- [[2026-04-12-temporal-ai-cookbook]]
- [[2026-04-12-agent-workflow-memory]]
- [[2026-04-12-durable-mcp-weather-server]]
- [[2026-03-24-benchmarking-multi-agent-llm-architectures-financial-document-processing]]
- [[2026-05-09-durable-orchestration-agent-patterns-user-provided]]
- [[2026-05-21-saas-million-arr-clairvo]]
- [[2026-02-27-how-i-made-25m-selling-just-one-ai-system]]
- [[2026-04-22-ai-business-zero-employees-jp-middleton]]
