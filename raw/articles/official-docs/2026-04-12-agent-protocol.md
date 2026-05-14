---
id: article-2026-04-12-agent-protocol
type: source
title: "Agent Protocol"
path: raw/articles/official-docs/2026-04-12-agent-protocol.md
author: LangChain
publisher: Agent Protocol Docs
url: https://langchain-ai.github.io/agent-protocol/
date_published:
date_added: 2026-04-12
tags: [protocols, agents, runs, threads, memory]
status: processed
quality: high
summary: Agent Protocol proposes framework-agnostic production APIs for agents, centering execution around runs, threads, and long-term store operations rather than framework-specific internals.
related: [protocols, agents, runs, threads, memory]
---

# Agent Protocol

## Source Metadata

- Path: raw/articles/official-docs/2026-04-12-agent-protocol.md
- Author: LangChain
- Published: Unknown
- Publisher: Agent Protocol Docs
- URL: https://langchain-ai.github.io/agent-protocol/

## TL;DR

Agent Protocol argues that production agent systems should expose stable APIs for three core surfaces: runs for execution, threads for multi-turn state, and a store for long-term memory.

## Key Claims

- Production agent APIs should be organized around runs, threads, and store operations rather than vendor-specific abstractions.
- Multi-turn agent systems need append-only thread history and explicit concurrency rules, not only chat-style message exchange.
- Long-term memory benefits from a first-class storage API with scopes, retrieval, and CRUD semantics.
- Execution APIs should support both ephemeral one-shot runs and persistent background runs with waiting, streaming, and cancellation.

## Important Details

- The docs frame runs, threads, and store as the three central concepts in a framework-agnostic serving API.
- The thread surface includes history browsing, copy/delete, metadata updates, and explicit handling of concurrent runs.
- The run surface includes background runs, wait endpoints, stream reconnection, cancellation, and CRUD operations on runs.
- The store surface supports namespace/key addressing, search, and multiple memory scopes such as user, thread, or assistant.
- The protocol also includes agent introspection endpoints to expose metadata and schemas.

## Entities

- Organization: LangChain
- Systems: Agent Protocol, runs API, threads API, store API
- Concepts: append-only history, concurrency control, streaming runs, long-term memory APIs

## My Notes

- The most reusable lesson is not a specific endpoint list, but the separation between thread state, run lifecycle, and memory store.

## Open Questions


## Related

- [[managed-agents]]
- [[llm-agents]]
- [[context-engineering]]

## Source Text

Not copied locally. Use the source URL above if the full text is needed.
