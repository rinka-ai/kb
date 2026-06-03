---
id: concept-workflows
type: concept
title: Agent Workflows
tags: [workflows, agents, orchestration, workflow-agents, deterministic-control]
source_count: 13
summary: Agent workflows wrap model calls in explicit orchestration so sequencing, approvals, side effects, and human review capacity stay inspectable instead of being improvised inside one autonomous loop.
canonical_for: [workflows, workflow agents, agent workflows, deterministic orchestration, review backpressure]
review_status: reviewed
last_reviewed: 2026-06-03
review_due: 2026-07-03
confidence: "0.84"
---

# Agent Workflows

## Summary

Agent workflows are deterministic or semi-deterministic control structures around model calls. They matter when ordering, retries, approval gates, and business rules are known well enough that orchestration should live in code rather than be rediscovered by the model on every run. The durable-orchestration source frames workflows as a stable substrate for changing agent patterns: ReAct loops, planners, routers, and multi-agent delegation are all compositions of step, state, event, retry, and trace primitives. Osmani adds an operator-capacity constraint: approval gates are not free, so workflow throughput should model human review as the slow consumer and apply backpressure before agent output becomes an unreviewed queue. The AI SaaS case-study transcript extends this into product discovery: a workflow can also move from metric definition to mechanism mining, simulation, parameter search, live rollout, and business-metric feedback. The AI-agency source adds a GTM/delivery version: reactivation, review/referral capture, speed-to-lead, sales coaching, and ads should be sequenced as one measurable funnel workflow rather than sold as disconnected automations. The Van Horn digest adds a personal-operator version: research, plan, build, verify, review, and skillize can be treated as an artifact loop across multiple agent sessions. The Claude use-case digest adds a product-packaging version: a useful AI workflow is described by its task boundary, required context, product surface, output artifact, follow-up action, and troubleshooting guidance.

## When They Fit

- repeatable task skeletons with known stages or approval points
- systems where side effects must stay narrow, auditable, and idempotent
- cases where multiple model calls still benefit from a fixed control graph
- applications that need long-running progress without granting full planning autonomy

## Design Rules

- keep the workflow explicit and let the model handle the ambiguous subproblems inside it
- separate orchestration from tool implementations and side-effect handlers
- preserve run state and artifacts so human review and resume are possible
- model human review as a scarce workflow resource; use work-in-progress limits and backpressure instead of unbounded agent fan-out
- require agents to produce machine-checkable proof for routine work before an approval gate consumes human attention
- batch review gates when possible so the reviewer pays fewer cold context-reload costs
- add more autonomy only when a deterministic skeleton is clearly too rigid for the task
- compose new agent patterns from explicit workflow primitives instead of hiding orchestration inside prompts or framework-specific topology
- choose feedback loops with operational constraints in view: iterative correction can improve accuracy, but cost, latency tails, and queuing behavior can dominate at production scale
- keep workflow state outside sandbox snapshots when completed steps, external waits, and side-effect replay need to be inspectable
- treat simulations as workflow stages with explicit assumptions, then verify the same mechanism in live deployment before promoting it to product truth
- for commercial agency workflows, define consent, opt-out, fallback, attribution, and dashboard state as workflow steps rather than after-the-fact operations
- make the plan artifact earn its place by carrying source context, acceptance criteria, files or surfaces to inspect, and a restart point for fresh sessions
- research-before-planning is a workflow stage, not a nicety, when current tool choice, docs, market context, or codebase conventions affect the plan
- convert repeated successful workflow fragments into skills or scripts once their shape is stable enough to reuse
- package user-facing workflows around concrete artifacts and continuations: what context is required, what file/report/tracker gets produced, what downstream tool receives it, and what still needs review

## Failure Modes

- hiding business logic in prompts when it really belongs in the workflow layer
- using a model loop where plain sequential or parallel orchestration would be simpler
- overfitting the workflow to one provider or runtime so portability disappears
- treating workflows as static forever instead of evolving them when failure patterns become obvious
- adding verification or retry loops without explicit timeout, routing, and budget policy
- letting background agents produce faster than humans can review, which converts parallelism into queue growth and shallow approvals
- mistaking a simulated metric lift for a live business result when unmodeled confounders remain in the real workflow
- using parallel agent sessions to create more work than the human can review, turning throughput into an uninspected queue
- treating a plan as proof of correctness when it is only a contract for later verification
- treating a polished use-case template as production evidence before reliability, ROI, compliance, and side-effect controls are independently verified

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
- [[2026-05-24-the-orchestration-tax]]
- [[2026-06-02-every-agentic-engineering-hack-i-know]]
- [[2026-06-03-claude-use-cases-full-digest]]
