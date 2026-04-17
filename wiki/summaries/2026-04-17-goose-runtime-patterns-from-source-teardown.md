---
id: summary-2026-04-17-goose-runtime-patterns-from-source-teardown
type: summary
title: Goose Runtime Patterns From A Source Teardown
tags: [goose, agent-harnesses, agent-frameworks, mcp, durable-execution, skills]
summary: Reusable runtime-design patterns extracted from the Goose source tree, with emphasis on harness layering, unified tool runtime design, and durable multi-surface execution.
review_status: reviewed
last_reviewed: 2026-04-17
review_due: 2026-05-17
confidence: "0.8"
---

# Goose Runtime Patterns From A Source Teardown

## Summary

Goose is most valuable as a high-breadth open implementation of an agent runtime rather than as a clean reference architecture. The durable lessons are architectural: separate provider concerns from orchestration, unify built-in and external tools behind one extension surface, keep governance in runtime inspectors rather than prompts, treat session durability and reconnectability as product primitives, and let multiple client surfaces reuse the same core engine instead of growing separate agent loops.

## Patterns Worth Keeping

- Keep the core agent loop provider-agnostic so model vendors can change without rewriting the harness.
- Unify built-in tools and MCP tools behind one extension runtime so the loop does not need separate mental models for "native" versus "external" capabilities.
- Treat tool governance as a pipeline: security, egress, adversary, permission, and repetition checks can all run before dispatch.
- Make sessions durable and operationally meaningful through stored state, cancellation tokens, schedulers, and reconnectable event streams.
- Distinguish user-visible conversation state from internal execution state when provider swaps, resumes, forks, or background work make them diverge.
- Keep a lightweight skill registry available all the time and load full skill content only when the task or trigger warrants it.
- Use deterministic structural tools such as code analyzers before model reasoning when low-cost preprocessing can reduce context waste.
- Let desktop, CLI, and server surfaces share the same runtime primitives rather than forking their own orchestration semantics.

## What To Copy Carefully

- Goose's exact product breadth is not the portable lesson; the broad provider list, multiple UI tracks, and large release surface also create real maintenance cost.
- Some of Goose's surfaces are transitional, so it is stronger as evidence for recurring harness patterns than as a frozen blueprint for product structure.
- Exact extension names, package layout, and transport choices are implementation details; the reusable idea is the shared control plane around them.
- The repo shows the benefits of an ambitious agent platform, but it also shows how quickly complexity accumulates once scheduling, apps, ACP, MCP, desktop packaging, and local inference all coexist.

## Best KB Fit

- `[[agent-harnesses]]` for the separation between provider layer, extension layer, session layer, and product surfaces
- `[[agent-protocols]]` for approval semantics, request replay, and runtime inspection hooks
- `[[agent-skills]]` for progressive disclosure and skill discovery instead of always-on loading
- `[[durable-execution]]` for schedulers, resumability, event replay, and cancellation-aware runtime state
- `[[agent-frameworks]]` for a concrete example of a broad reusable local agent runtime

## Open Questions

- Should the KB add a dedicated concept note for tool-inspection pipelines as a recurring design pattern across agent runtimes?
- How often do open agent systems converge on the same thread/session split that Goose exposes through its core and ACP layers?
- What is the right boundary between a "thin conductor" harness and a full agent platform before complexity starts to dominate reuse?

## Source Notes

- [[2026-04-17-goose]]
