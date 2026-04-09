---
id: article-2026-04-09-agentic-context-engineering
type: source
title: Agentic Context Engineering
path: raw/articles/momo-research/2026-04-09-agentic-context-engineering.md
author: momo personal assistant
publisher: GitHub
url: https://github.com/momo-personal-assistant/momo-research/blob/main/Agentic%20Context%20Engineering.md
date_published:
date_added: 2026-04-09
tags: [context-engineering, agents, memory, delta-updates]
status: processed
quality: medium
summary: Summary note comparing ACE and EvoMemory, with emphasis on self-evolving contexts, incremental updates, and structured playbooks that avoid full-context rewrites.
related: [context-engineering, agent-memory, context-rot, evolving-contexts]
---

# Agentic Context Engineering

## Source Metadata

- Path: raw/articles/momo-research/2026-04-09-agentic-context-engineering.md
- Author: momo personal assistant
- Published: Unknown
- Publisher: GitHub
- URL: https://github.com/momo-personal-assistant/momo-research/blob/main/Agentic%20Context%20Engineering.md

## TL;DR

This note argues that agents improve when they evolve structured context through small curated updates instead of repeatedly rewriting prompts, highlighting ACE as a patch-like model for accumulating expertise without retraining.

## Key Claims

- Full prompt rewrites cause context collapse and erase specialized knowledge.
- Structured incremental updates let agents learn continuously without changing model weights.
- ACE works by separating generation, reflection, and curation into distinct modules.
- A bullet-style playbook with delta updates is a better substrate than monolithic rewritten prompts.

## Important Details

- The note frames ACE and EvoMemory as two related lines of work around self-evolving knowledge systems.
- ACE uses a Generator, Reflector, and Curator pipeline.
- Learned knowledge is stored as small bullet-like entries with metadata and helpful/harmful signals.
- A grow-and-refine mechanism manages appending, updating, and deduplicating entries.
- The note highlights reported gains on AppWorld and finance-oriented reasoning tasks.

## Entities

- Papers: ACE, EvoMemory
- Concepts: context collapse, delta updates, grow-and-refine, playbook context
- Benchmarks: AppWorld, FiNER, Formula

## My Notes

- This is one of the highest-value imports because it connects directly to how we want our own markdown KB to evolve.
- The "Git patches, not rewrites" framing maps well onto repository-native knowledge maintenance.

## Open Questions

- What minimal schema would let our own KB support delta-style updates safely?
- How should helpful or harmful feedback be tracked for individual notes or claims?

## Related

- [[context-engineering]]
- [[context-rot]]
- [[agent-memory]]
- [[evolving-contexts]]

## Source Text

Not copied locally. Use the source URL above if the full text is needed.
