---
id: article-2026-04-09-context-engineering-sessions-memory
type: source
title: Context Engineering Sessions Memory
path: raw/articles/momo-research/2026-04-09-context-engineering-sessions-memory.md
author: momo personal assistant
publisher: GitHub
url: https://github.com/momo-personal-assistant/momo-research/blob/main/Context%20Engineering:%20Sessions,%20Memory.md
date_published:
date_added: 2026-04-09
tags: [context-engineering, sessions, memory, multi-agent]
status: processed
quality: medium
summary: Detailed synthesis of session management and memory management for AI agents, drawing from Google's context engineering whitepaper and Manus's context engineering notes.
related: [context-engineering, sessions, agent-memory, memory-as-a-tool]
---

# Context Engineering Sessions Memory

## Source Metadata

- Path: raw/articles/momo-research/2026-04-09-context-engineering-sessions-memory.md
- Author: momo personal assistant
- Published: Unknown
- Publisher: GitHub
- URL: https://github.com/momo-personal-assistant/momo-research/blob/main/Context%20Engineering:%20Sessions,%20Memory.md

## TL;DR

This note separates persistent session history from actively assembled context, then explains how memory managers extract, consolidate, store, and retrieve durable information for multi-agent systems.

## Key Claims

- Session history and model context are different objects and should be managed differently.
- Long-running agents need explicit compaction strategies to avoid cost, latency, and attention decay.
- Memory layers provide a framework-agnostic way to share durable information across agents.
- Memory quality depends on extraction, consolidation, provenance, and placement in context.

## Important Details

- The note distinguishes shared histories from private per-agent histories.
- It treats memory as a universal data layer that can outlive framework-specific session logs.
- Compaction strategies include last-N turns, token truncation, recursive summarization, and restorable file-system-based compression.
- The note covers memory generation, consolidation, provenance, triggering, and inference-time placement.
- It explicitly discusses memory-as-a-tool and the tradeoffs of placing memory in system prompts versus conversation history.

## Entities

- Sources: Google's whitepaper on context engineering, Manus blog
- Concepts: session, context, memory manager, provenance, memory-as-a-tool
- Systems: ADK, LangGraph, Mem0, Zep, Redis, Spanner

## My Notes

- This is one of the strongest notes in the repo because it turns a vague "memory" idea into concrete architectural pieces.
- It is especially useful as a bridge note between research papers and actual agent implementation patterns.

## Open Questions

- What should our own repo store as session history versus durable memory?
- Should memory generation in this KB be automatic, tool-invoked, or periodic?

## Related

- [[context-engineering]]
- [[agent-memory]]
- [[managed-agents]]

## Source Text

Not copied locally. Use the source URL above if the full text is needed.
