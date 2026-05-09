---
id: summary-2026-05-09-durable-orchestration-background-agents-kb-upgrades
type: summary
title: Durable Orchestration and Background Agent Infrastructure
tags: [agents, durable-execution, orchestration, agent-harnesses, frameworks, background-agents, sandboxes]
summary: "A user-provided durable-orchestration essay reinforces the KB's harness thesis: stable execution primitives should outlive shifting agent topologies, while background agents raise the cost of missing crash recovery, lifecycle controls, event waits, and structured traces."
review_status: reviewed
last_reviewed: 2026-05-09
review_due: 2026-06-09
confidence: "0.72"
---

# Durable Orchestration and Background Agent Infrastructure

## Summary

The durable-orchestration source is best treated as a synthesis booster for `[[agent-harnesses]]`, `[[durable-execution]]`, `[[agent-frameworks]]`, and `[[workflows]]`. Its durable lesson is that agent topologies are short-lived while execution guarantees are longer-lived. ReAct loops, planners, routers, role-based crews, and sub-agent delegation should sit above a stable layer of step checkpoints, external state, event waits, retries, cancellation, scheduling, and traces.

## Patterns Worth Keeping

- Separate the architecture into a stable orchestration layer, a fluid agent layer, and a volatile model layer.
- Abstract execution primitives rather than agent topology. Durable steps, events, state, retries, sleeps, lifecycle controls, and traces are the composable substrate.
- Treat background agents as the production forcing function. Long-running work needs crash recovery, pause/resume, cancellation, scheduling, and inspection before it needs a clever new topology.
- Keep sandboxes and orchestration distinct. Sandboxes decide where code runs; orchestration decides what completed, what can resume, and which side effects are safe to skip.
- Make traces part of the learning system. Structured traces support debugging, evals, prompt/tool experiments, and topology recomposition.

## What To Copy Carefully

- The anti-framework claim is too broad if read literally. The KB's stronger version is: frameworks are useful when they expose durable control-plane contracts and risky when they hide prompts, state transitions, or replay behavior behind a fixed topology.
- Step APIs such as `step.run()`, `step.invoke()`, `step.waitForEvent()`, and `step.sleep()` are useful examples, but the principle should remain vendor-neutral.
- Sandbox snapshots can be good enough for local/personal agents, but production systems need a separate semantic record of steps, outputs, waits, retries, and side effects.

## Best KB Fit

- `[[agent-harnesses]]` for the stable execution layer around changing agent logic
- `[[durable-execution]]` for crash recovery, pause/resume, replay, and side-effect boundaries
- `[[agent-frameworks]]` for the topology-coupling risk and framework-selection nuance
- `[[workflows]]` for deterministic orchestration around model calls

## Open Questions

- Should the KB create a dedicated concept for "background agents" if more sources converge on async lifecycle controls as the production boundary?
- How should agent traces be stored so they are useful for evals and self-improvement without overfitting prompts to local anecdotes?
- Which sandbox providers expose enough lifecycle API for an external orchestration layer to own run state cleanly?

## Source Notes

- [[2026-05-09-durable-orchestration-agent-patterns-user-provided]]
