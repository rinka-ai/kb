---
id: concept-agent-frameworks
type: concept
title: Agent Frameworks
tags: [frameworks, agents, orchestration, runtimes, durable-execution, sessions, openai, architecture]
source_count: 6
summary: Agent frameworks package orchestration, runtime state, approval interrupts, tool surfaces, and durability into reusable system primitives instead of app-specific glue.
canonical_for: [agent frameworks, agent runtimes, orchestration frameworks, langgraph, openai agents sdk, google adk]
review_status: reviewed
last_reviewed: 2026-04-16
review_due: 2026-05-16
confidence: "0.83"
---

# Agent Frameworks

## Summary

Agent frameworks package orchestration, runtime state, approval interrupts, tool surfaces, and durability into reusable system primitives instead of app-specific glue. Across the current source set, the important distinction is not “framework or no framework,” but which control-plane responsibilities are made explicit: sessions or threads, pause-resume execution, handoffs, memory stores, deterministic workflow structure, and tool/runtime observability.

## Common Responsibilities

- model the execution unit explicitly as a run, thread, session, or workflow invocation
- persist enough state for pause-resume, replay, human review, and crash recovery
- separate deterministic orchestration from model-driven reasoning where reliability matters
- expose tools, memory, and artifacts through inspectable runtime contracts
- support agent handoffs without hiding state transfer inside prompt text

## Useful Framework Shapes

- LangGraph emphasizes durable execution, checkpoints, interrupts, and replay
- OpenAI Agents SDK emphasizes sessions, handoffs, and human-in-the-loop pauses
- Google ADK emphasizes an event loop runner with deterministic workflow agents around LLM subagents
- Letta emphasizes stateful memory-rich agents with explicit long-term storage surfaces

## Selection Heuristics

- choose a framework when you want repeatable execution semantics more than prompt-level freedom
- prefer explicit thread or session state when conversations or tasks must survive interruption
- keep deterministic workflow structure outside the model when correctness and auditability matter
- avoid collapsing memory, orchestration, and policy into one prompt when they should evolve independently

## Tensions

- framework leverage vs product-specific constraints
- deterministic workflow structure vs flexible model planning
- runtime abstraction vs direct control over infrastructure
- reusable primitives vs framework lock-in

## Source Notes

- [[2026-04-12-google-adk-runtime-event-loop-and-workflow-agents]]
- [[2026-04-12-openai-agents-sdk-sessions-handoffs-and-human-in-the-loop]]
- [[2026-04-12-langgraph-durable-execution-persistence-and-human-in-the-loop]]
- [[2026-04-10-letta]]
- [[2026-04-09-scaling-managed-agents-decoupling-the-brain-from-the-hands]]
- [[2025-07-18-context-engineering-for-ai-agents-lessons-from-building-manus]]
