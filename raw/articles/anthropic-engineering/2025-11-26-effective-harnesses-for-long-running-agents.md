---
id: article-2025-11-26-effective-harnesses-for-long-running-agents
type: source
title: "Effective harnesses for long-running agents"
author: Anthropic
publisher: Anthropic
url: https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents
date_published: 2025-11-26
date_added: 2026-04-09
tags: [harnesses, long-running-agents, context-engineering, coding-agents]
status: processed
quality: high
summary: Anthropic shows how an initializer agent, a coding agent, and structured handoff artifacts can help coding agents make reliable progress across many context windows.
related: [harnesses, long-running-agents, context-engineering, coding-agents]
---

# Effective harnesses for long-running agents

## Source Metadata

- Author: Anthropic
- Published: 2025-11-26
- Publisher: Anthropic
- URL: https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents

## TL;DR

The core idea is to treat long-running work as a sequence of fresh sessions connected by durable environment artifacts, rather than expecting one continuous context window to carry the project.

## Key Claims

- Compaction alone is not sufficient for long-running coding work.
- Agents need explicit environment setup and explicit progress artifacts.
- Structured session boundaries can improve reliability on multi-window tasks.

## Important Details

- Anthropic uses an initializer agent and a coding agent.
- Key artifacts include setup scripts, progress files, and git history.
- The approach is framed as borrowing from how human engineers leave work in a clean handoff state.

## Entities

- Concepts: initializer agent, coding agent, handoff artifacts, progress logs
- Domain: long-running coding agents

## My Notes

- This is foundational for any repo-based autonomous coding workflow.

## Open Questions

- Which progress artifacts should our own agent workflows standardize across sessions?

## Related

- [[context-engineering]]
- [[managed-agents]]
- [[agentic-coding]]

## Source Text

Not copied locally. Use the source URL above if the full text is needed.
