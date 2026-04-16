---
id: article-2026-04-16-your-harness-your-memory
type: source
title: "Your harness, your memory"
path: raw/articles/langchain-blog/2026-04-16-your-harness-your-memory.md
author: Harrison Chase
publisher: LangChain Blog
url: https://www.langchain.com/blog/your-harness-your-memory
date_published: 2026-04-11
date_added: 2026-04-16
tags: [agents, harnesses, memory, deployment, portability]
status: processed
quality: high
summary: Harrison Chase argues that agent harnesses are becoming the dominant implementation surface for agents, and that whoever controls the harness often controls the agent's memory and long-term lock-in.
related: [agent-harnesses, agent-memory, llm-agents, managed-agents]
---

# Your harness, your memory

## Source Metadata

- Path: raw/articles/langchain-blog/2026-04-16-your-harness-your-memory.md
- Author: Harrison Chase
- Published: 2026-04-11
- Publisher: LangChain Blog
- URL: https://www.langchain.com/blog/your-harness-your-memory

## TL;DR

The post argues that harnesses are now the main way agents are built, and that memory ownership is inseparable from harness ownership. Closed harnesses create memory lock-in; open harnesses preserve portability.

## Key Claims

- Agent harnesses are becoming the dominant way to build agent systems.
- Harness design is tightly coupled to agent memory because the harness decides how state is stored, resumed, and reused.
- Closed harnesses, especially behind proprietary APIs, can force teams to yield control of their own memory layer.
- Memory is a major source of product stickiness, so harness openness matters strategically, not just technically.

## Important Details

- The post traces a progression from simple RAG chains to richer flows and then to full agent harnesses as model capability improved.
- It uses concrete harness examples such as Claude Code, Deep Agents, Pi/OpenClaw, OpenCode, and Codex-style systems.
- The strongest practical claim is not merely "use memory," but "own the layer that stores and carries your memory forward."

## Entities

- People: Harrison Chase
- Organizations: LangChain
- Concepts: harnesses, memory ownership, portability, lock-in
- Systems: Claude Code, Deep Agents, Pi, OpenClaw, OpenCode, Codex

## My Notes

- This is a valuable counterweight to purely technical memory discussions because it makes memory ownership an architectural and strategic concern.
- It also sharpens why the KB should keep portable, provenance-rich memory patterns distinct from vendor-specific runtime features.

## Open Questions

- What is the thinnest memory contract that still preserves portability across harnesses?
- Which parts of harness-owned memory should be standardized, and which are inevitably product-specific?

## Related

- [[agent-harnesses]]
- [[agent-memory]]
- [[llm-agents]]
- [[managed-agents]]

## Source Text

Not copied locally. Use the source URL above if the full text is needed.
