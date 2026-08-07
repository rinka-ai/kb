---
id: concept-workflows
type: concept
title: Agent Workflows
tags: [workflows, agents, orchestration, workflow-agents, deterministic-control]
source_count: 22
summary: Agent workflows wrap model calls in explicit orchestration so sequencing, approvals, side effects, and human review capacity stay inspectable instead of being improvised inside one autonomous loop.
canonical_for: [workflows, workflow agents, agent workflows, deterministic orchestration, review backpressure]
review_status: reviewed
last_reviewed: 2026-08-02
review_due: 2026-11-02
confidence: "0.86"
---

# Agent Workflows

## Summary

Agent workflows are deterministic or semi-deterministic control structures around model calls. They matter when ordering, retries, approval gates, and business rules are known well enough that orchestration should live in code rather than be rediscovered by the model on every run. The durable-orchestration source frames workflows as a stable substrate for changing agent patterns: ReAct loops, planners, routers, and multi-agent delegation are all compositions of step, state, event, retry, and trace primitives. Osmani adds an operator-capacity constraint: approval gates are not free, so workflow throughput should model human review as the slow consumer and apply backpressure before agent output becomes an unreviewed queue. The AI SaaS case-study transcript extends this into product discovery: a workflow can also move from metric definition to mechanism mining, simulation, parameter search, live rollout, and business-metric feedback. The AI-agency source adds a GTM/delivery version: reactivation, review/referral capture, speed-to-lead, sales coaching, and ads should be sequenced as one measurable funnel workflow rather than sold as disconnected automations. The Van Horn digest adds a personal-operator version: research, plan, build, verify, review, and skillize can be treated as an artifact loop across multiple agent sessions. The Claude use-case digest adds a product-packaging version: a useful AI workflow is described by its task boundary, required context, product surface, output artifact, follow-up action, and troubleshooting guidance. The Lieberman content-machine digest adds a creator-operations version: the human owns premise and final approval, while the middle stages become artifact-producing AI skills with explicit upstream routes when information is missing. Anthropic's Claude Code skills article adds a workflow-library lens: recurring business processes, scaffolds, reviews, CI/CD operations, runbooks, and infrastructure procedures can become skills when the repeated skeleton is stable, measurable, and configured enough to avoid wrong side effects. Learn Harness Engineering adds the coding-session skeleton: initialize, select one active feature, implement against a verification command, record evidence, update handoff, and leave a clean restartable state. The Dynamic Workflows digest adds a model-generated workflow lens: the orchestration plan itself can become task-specific code when fan-out, verification, ranking, or loop-until-done behavior would be too fragile in one conversation. Litt adds a second human gate alongside approval: after the system verifies correctness, risk-bearing changes may need an explanation and teach-back step to refresh the accountable human's mental model before the next creative or architectural loop.

Nisi's Case harness adds a small but useful state-machine example: implementation cannot advance until a verifier produces evidence; review failures return to implementation; closure packages proof for the human; and only then does a retrospective analyze the run. The role names are optional—the durable part is that external transition logic, not a prompt, owns required gates and loops.

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
- split initialization from implementation so startup readiness is verified before feature work begins
- drive coding-agent sessions from one active feature with explicit status, dependencies, verification, and evidence
- treat handoff and cleanup as workflow stages, not optional afterthoughts
- use classify-and-act when heterogeneous items need routing before action
- use fan-out-and-synthesize when independent items can be processed in parallel and merged later
- use adversarial verification when the worker should not grade its own output
- use generate-and-filter or tournament comparison when quality depends on exploring alternatives before committing
- use loop-until-done when the stop condition is known but the number of iterations is not
- quarantine untrusted content in read-only workflow stages before privileged action stages run
- split skillized workflows by operating category; verification, deployment, runbook, and infrastructure skills have different risk and evidence requirements
- keep setup, prior-run logs, and output destinations explicit when a workflow skill posts, deploys, files tickets, or reports deltas
- package user-facing workflows around concrete artifacts and continuations: what context is required, what file/report/tracker gets produced, what downstream tool receives it, and what still needs review
- for creative workflows, separate first-mile taste/context, middle-stage artifact production, and final-mile approval so model throughput does not erase creator judgment
- promote recurring failures into the lowest reliable control layer, run deterministic checks before semantic verifiers, and reserve human gates for consequences or taste that cannot be encoded safely
- when immediate cleanup is unsafe, test a visible, owned, declining ratchet locally rather than assuming it is the right migration mechanism for every legacy system
- when several agents collaborate, make one specification the scope and acceptance authority, bound each role, and escalate only ambiguity whose consequence exceeds an explicit threshold
- separate correctness evidence from comprehension evidence; the first can be machine-produced, while the second requires a real human retrieval, prediction, or teach-back response
- trigger understanding gates by novelty, hidden state, blast radius, changed invariants, and ownership distance; ordinary local edits should keep the normal lightweight handoff
- make explanation artifacts identify the code state they project and invalidate them when the relevant diff changes
- use interactive micro-worlds only when state evolution or transformation is materially easier to understand by manipulation than by a trace, table, or static figure
- when the workflow is user-facing, expose intermediate artifacts as editable checkpoints: users should be able to accept or freeze upstream work, branch and compare alternatives, rerun from one stage, and inspect propagation before applying it
- keep freeform exploration and structured execution interoperable; use a sandbox while intent is ambiguous and promote a stable path into named stages rather than forcing every task into a graph from the start

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
- skillizing a workflow before its category, side effects, setup dependencies, evidence checks, and review points are clear
- letting the agent choose its own definition of "done" instead of binding workflow transitions to evidence
- letting stale, replayable, or agent-authored proof satisfy a transition without binding it to the current task, revision, command, environment, and requested end state
- using a high-compute workflow for a routine task that a normal session would finish faster and cheaper
- omitting token budgets or hard goals from broad workflow runs
- letting raw untrusted content reach the same agent or stage that can edit code, open PRs, or call privileged tools
- letting AI-generated critique close information gaps by invention instead of routing missing facts, stories, or numbers back to the human/source-gathering stage
- spending model calls on deterministic checks whose inputs, expected output, and failure condition are already known
- adding planner, implementer, tester, and verifier roles to routine work when coordination, context reconstruction, and serial review cost more than one focused session
- accepting a ratchet baseline without an owner or reduction path, turning a migration tool into a hidden permanent waiver
- treating machine verification as proof that the responsible human retained a usable mental model of the system
- requiring elaborate explanations and quizzes for every change until the understanding gate becomes ignored ceremony
- allowing the producing agent to impersonate the human and mark its own comprehension artifact as passed
- keeping team-critical explanations in private local files or chats where comments, corrections, and shared reference cannot accumulate
- exposing a complex node graph without local undo, propagation previews, stage summaries, accessibility support, or a simpler progressive-disclosure view and calling it transparency
- decomposing interdependent work into independent steps until global coherence or essential context is lost

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
- [[2026-06-03-alex-lieberman-content-machine]]
- [[2026-06-03-lessons-from-building-claude-code-how-we-use-skills]]
- [[2026-06-04-walkinglabs-learn-harness-engineering]]
- [[2026-06-03-dynamic-workflows-claude-code-ingest]]
- [[2026-07-15-these-90-minutes-will-change-the-way-you-use-ai]]
- [[2026-07-29-understanding-is-the-new-bottleneck]]
- [[2026-06-28-explain-diff-skill]]
- [[2026-05-30-how-i-deleted-95-percent-of-my-agent-skills-and-got-better-results]]
- [[2022-04-29-ai-chains-transparent-and-controllable-human-ai-interaction]]
