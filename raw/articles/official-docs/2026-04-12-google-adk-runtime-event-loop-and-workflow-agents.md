---
id: article-2026-04-12-google-adk-runtime-event-loop-and-workflow-agents
type: source
title: "Google ADK: Runtime Event Loop and Workflow Agents"
path: raw/articles/official-docs/2026-04-12-google-adk-runtime-event-loop-and-workflow-agents.md
author: Google
publisher: Agent Development Kit Docs
url: https://adk.dev/runtime/event-loop/
date_published:
date_added: 2026-04-12
tags: [frameworks, agents, workflow-agents, runtime, orchestration]
status: processed
quality: high
summary: Google's ADK docs define an event-driven runtime where a runner coordinates agents, tools, services, and state, and they separate deterministic workflow agents from LLM-driven agents.
related: [frameworks, agents, workflow-agents, runtime, orchestration]
---

# Google ADK: Runtime Event Loop and Workflow Agents

## Source Metadata

- Path: raw/articles/official-docs/2026-04-12-google-adk-runtime-event-loop-and-workflow-agents.md
- Author: Google
- Published: Unknown
- Publisher: Agent Development Kit Docs
- URL: https://adk.dev/runtime/event-loop/

## TL;DR

ADK presents agent execution as an event loop run by a `Runner`, while separately formalizing deterministic workflow agents for sequential, looping, and parallel orchestration around LLM-powered subagents.

## Key Claims

- Agent runtimes need a clear control loop that separates orchestration responsibilities from agent and tool logic.
- State updates should be processed and committed by runtime services before execution logic resumes.
- Deterministic workflow orchestration is a distinct layer from LLM reasoning and should be modeled explicitly.
- Structured workflow agents can coexist with flexible LLM agents inside the same runtime.

## Important Details

- The runtime docs describe a back-and-forth loop between a `Runner` and execution logic, where agents and tools emit events and the runner commits the resulting state and artifact changes.
- ADK names sessions, memory, artifacts, events, and services as first-class runtime components rather than incidental implementation details.
- The event-loop docs emphasize that the runner is the orchestrator for a user invocation, while agent logic yields events and resumes only after the runner has processed them.
- The workflow-agent docs split orchestration from reasoning: sequential, loop, and parallel workflow agents are deterministic control structures that do not consult an LLM for the orchestration itself.
- ADK also exposes resume, runtime config, evaluation, observability, MCP, and A2A protocol surfaces in the same documentation tree, reinforcing that orchestration is broader than prompt handling.

## Entities

- Organization: Google
- Systems: Agent Development Kit, Runner, event loop, workflow agents
- Concepts: deterministic orchestration, event-driven runtime, sequential agents, loop agents, parallel agents

## My Notes

- This is a strong comparator for Mari because Mari is already splitting planner, executor, runtime, and domain logic in a very similar spirit.
- The most valuable design idea here is the explicit distinction between "workflow-shaped control" and "LLM-shaped reasoning" instead of treating everything as one generic agent loop.

## Open Questions

- How much of Mari's future planning layer should remain deterministic workflow structure versus model-directed planning?
- Should Mari expose its own orchestration concepts in a more framework-like way once the planner/executor layer matures further?

## Related

- [[managed-agents]]
- [[llm-agents]]
- [[context-engineering]]

## Source Text

Not copied locally. Use the source URL above if the full text is needed.
