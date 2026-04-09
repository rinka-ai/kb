---
id: article-2026-04-09-agentic-file-system
type: source
title: Agentic File System
path: raw/articles/momo-research/2026-04-09-agentic-file-system.md
author: momo personal assistant
publisher: GitHub
url: https://github.com/momo-personal-assistant/momo-research/blob/main/Agentic%20File%20System.md
date_published:
date_added: 2026-04-09
tags: [context-engineering, file-system, provenance, agents]
status: processed
quality: medium
summary: Note on the Agentic File System idea, which treats memory, tools, human input, and external knowledge as governed files within a unified context architecture.
related: [context-engineering, agentic-file-systems, provenance, persistent-memory]
---

# Agentic File System

## Source Metadata

- Path: raw/articles/momo-research/2026-04-09-agentic-file-system.md
- Author: momo personal assistant
- Published: Unknown
- Publisher: GitHub
- URL: https://github.com/momo-personal-assistant/momo-research/blob/main/Agentic%20File%20System.md

## TL;DR

The note proposes a file-system abstraction for context engineering, where heterogeneous context sources become governed files with metadata, access control, and lifecycle management.

## Key Claims

- Context engineering becomes more robust when all context sources are handled through one architectural abstraction.
- A file-system metaphor helps make provenance, governance, and traceability explicit.
- Persistent context should be separated into history, memory, and scratchpad layers.

## Important Details

- The note references the AIGNE framework as an implementation of the idea.
- It describes a context engineering pipeline with Constructor, Updater, and Evaluator components.
- Human judgment is explicitly included as part of the system design rather than treated as an afterthought.
- The model is positioned as a response to statelessness, limited token windows, and context rot.

## Entities

- Concepts: Agentic File System, persistent context repository, history, memory, scratchpad
- Systems: AIGNE, MCP
- Themes: provenance, governance, verifiability

## My Notes

- This is especially relevant to your repo because your KB already behaves like a file-system-native context store.
- It offers a clean conceptual bridge between agent memory systems and ordinary developer tooling.

## Open Questions

- Which file-level metadata should be standardized in our KB to support provenance and policy?
- Should we model scratchpad material separately from stable memory in the repo layout?

## Related

- [[context-engineering]]
- [[persistent-memory]]
- [[agentic-file-systems]]
- [[momo-research]]

## Source Text

Not copied locally. Use the source URL above if the full text is needed.
