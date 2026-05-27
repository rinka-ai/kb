---
id: article-2026-04-09-gam-vs-context-rot
type: source
title: GAM vs Context Rot
path: raw/articles/momo-research/2026-04-09-gam-vs-context-rot.md
author: momo personal assistant
publisher: GitHub
url: https://github.com/momo-personal-assistant/momo-research/blob/main/GAM%20vs.%20Context%20Rot.md
date_published:
date_added: 2026-04-09
tags: [agent-memory, deep-research, retrieval, context-rot]
status: processed
quality: medium
summary: Summary of General Agentic Memory as a just-in-time memory system that uses a memorizer plus researcher architecture to construct task-specific context at runtime.
related: [agent-memory, context-rot, deep-research, retrieval]
---

# GAM vs Context Rot

## Source Metadata

- Path: raw/articles/momo-research/2026-04-09-gam-vs-context-rot.md
- Author: momo personal assistant
- Published: Unknown
- Publisher: GitHub
- URL: https://github.com/momo-personal-assistant/momo-research/blob/main/GAM%20vs.%20Context%20Rot.md

## TL;DR

This note presents GAM as an alternative to pre-compressed memory systems: keep full historical pages, then use a deep-research style runtime agent to assemble the right context when needed.

## Key Claims

- Ahead-of-time memory compression inevitably loses information.
- Runtime "just-in-time" context construction is better suited to complex multi-step reasoning.
- A lightweight memory layer is still useful if it helps guide deeper runtime retrieval.

## Important Details

- The system is split into an offline Memorizer and an online Researcher.
- Full history is preserved in a page store instead of being aggressively flattened into static memory.
- The Researcher combines planning, search, reflection, and multiple retrieval tools.
- The note highlights strong performance on HotpotQA and multi-hop reasoning tasks.

## Entities

- Paper: General Agentic Memory
- Concepts: just-in-time compilation, page store, memorizer, researcher, deep research
- Benchmarks: HotpotQA, RULER

## My Notes

- This note is especially relevant to your KB vision because it validates a "store rich source material, compile selectively at query time" approach.
- It pairs well with the Karpathy-style knowledge-base workflow you started this repo with.

## Open Questions

- Should this repo favor richer source preservation plus query-time synthesis over heavy up-front summarization?
- What lightweight guide memory would help search across our future article corpus?

## Related

- [[agent-memory]]
- [[context-rot]]
- [[research-workflows]]
- [[rag]]

## Source Text

Not copied locally. Use the source URL above if the full text is needed.
