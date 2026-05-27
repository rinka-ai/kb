---
id: article-2026-04-12-openai-agents-sdk-sessions-handoffs-and-human-in-the-loop
type: source
title: "OpenAI Agents SDK: Sessions, Handoffs, and Human-in-the-Loop"
path: raw/articles/official-docs/2026-04-12-openai-agents-sdk-sessions-handoffs-and-human-in-the-loop.md
author: OpenAI
publisher: OpenAI Docs
url: https://openai.github.io/openai-agents-python/
date_published:
date_added: 2026-04-12
tags: [frameworks, agents, sessions, handoffs, approvals]
status: processed
quality: high
summary: The OpenAI Agents SDK docs package session state, resumable human approval, and agent-to-agent handoffs as reusable runtime surfaces rather than ad hoc application logic.
related: [frameworks, agents, sessions, handoffs, approvals]
---

# OpenAI Agents SDK: Sessions, Handoffs, and Human-in-the-Loop

## Source Metadata

- Path: raw/articles/official-docs/2026-04-12-openai-agents-sdk-sessions-handoffs-and-human-in-the-loop.md
- Author: OpenAI
- Published: Unknown
- Publisher: OpenAI Docs
- URL: https://openai.github.io/openai-agents-python/

## TL;DR

The SDK treats multi-turn memory, human approval interrupts, and agent delegation as standard runtime primitives: sessions store history, interruptions serialize resumable state, and handoffs are modeled as structured tool-like transfers between agents.

## Key Claims

- Session state should be a reusable storage abstraction rather than something each app manually reconstructs from prior outputs.
- Human approval is best modeled as a paused run that can be resumed with preserved state.
- Agent handoffs should be explicit, typed, and inspectable instead of hidden inside prompt text.
- Memory, approvals, and handoffs all shape orchestration and should live in the SDK surface, not only in app code.

## Important Details

- The sessions docs describe built-in session backends such as SQLite, Redis, SQLAlchemy, Dapr, and encrypted sessions.
- Session history is retrieved before each run and appended back after each run, with hooks for custom pruning and merge behavior.
- The human-in-the-loop flow resumes paused work by re-running from serialized state, using the same session so conversation history stays consistent across the pause.
- The sessions docs explicitly call out resumed approval flows as a primary use case for shared session state.
- The handoffs docs represent delegation as tools with names like `transfer_to_refund_agent`.
- Handoffs can carry typed metadata through `input_type`, filter what the next agent sees, and optionally nest or rewrite handoff history.
- The docs distinguish changing handoff metadata from changing run context, which is useful for thinking about structured handoff payloads.

## Entities

- Organization: OpenAI
- Systems: OpenAI Agents SDK, sessions, handoffs, Runner, RunConfig
- Concepts: session backends, resumable interruptions, handoff tools, typed metadata, history filtering

## My Notes


## Open Questions


## Related

- [[managed-agents]]
- [[llm-agents]]
- [[context-engineering]]

## Source Text

Not copied locally. Use the source URL above if the full text is needed.
