---
id: concept-llm-agents
type: concept
title: LLM Agents
tags: [agents, llms, tool-use]
source_count: 18
---

# LLM Agents

## Summary

LLM agents are systems where a model acts over time using tools, memory, and structured context rather than only producing a single response. The newer additions make the category much less abstract: beyond ReAct-style loops, real agents need durable execution, resumable interruptions, session or thread state, memory surfaces, reusable skills, stable protocols for tools and runtime control, and a harness that coordinates those pieces without owning all of them invisibly. A useful newer framing is that many high-leverage agent systems decompose into memory, skills, protocols, and a harness rather than one monolithic "agent brain."

## Key Dimensions

- how much autonomy the model has
- what tools and execution environments it can access
- how state and memory are managed across turns
- how memory, skills, protocols, and harness logic are separated or collapsed
- how the harness constrains or amplifies behavior
- who owns the durable memory when the runtime or framework changes
- how runs, threads, sessions, and approvals are represented
- how tool protocols and action schemas shape interoperability
- how durable the execution model is under pauses, failures, and retries
- how evaluation environments differ from deployment environments
- how well the agent can explore, recover from failure, and ground actions in realistic interfaces

## Source Notes

- [[2024-12-19-building-effective-agents]]
- [[2026-04-09-scaling-managed-agents-decoupling-the-brain-from-the-hands]]
- [[2025-09-29-effective-context-engineering-for-ai-agents]]
- [[2026-04-09-agentic-context-engineering]]
- [[2026-04-10-react-synergizing-reasoning-and-acting-in-language-models]]
- [[2026-04-10-model-context-protocol]]
- [[2025-07-18-context-engineering-for-ai-agents-lessons-from-building-manus]]
- [[2026-04-10-webarena-a-realistic-web-environment-for-building-autonomous-agents]]
- [[2026-04-10-osworld-benchmarking-multimodal-agents-for-open-ended-tasks-in-real-computer-environments]]
- [[2026-04-12-temporal-ai-cookbook]]
- [[2026-04-12-langgraph-durable-execution-persistence-and-human-in-the-loop]]
- [[2026-04-12-openai-agents-sdk-sessions-handoffs-and-human-in-the-loop]]
- [[2026-04-12-google-adk-runtime-event-loop-and-workflow-agents]]
- [[2026-04-12-agent-protocol]]
- [[2026-04-16-externalization-in-llm-agents-a-unified-review-of-memory-skills-protocols-and-harness-engineering]]
- [[2026-04-16-the-anatomy-of-an-agent-harness]]
- [[2026-04-16-your-harness-your-memory]]
- [[2026-04-16-ai-agent-stack-builders-guide-av1dlive]]
