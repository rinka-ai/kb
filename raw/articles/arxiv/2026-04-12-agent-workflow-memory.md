---
id: article-2026-04-12-agent-workflow-memory
type: source
title: "Agent Workflow Memory"
path: raw/articles/arxiv/2026-04-12-agent-workflow-memory.md
author: "Zora Zhiruo Wang, Jiayuan Mao, Daniel Fried, Graham Neubig"
publisher: arXiv.org
url: https://arxiv.org/abs/2409.07429
date_published: 2024-09-11
date_added: 2026-04-12
tags: [agents, workflows, memory, web-agents]
status: processed
quality: high
summary: Agent Workflow Memory induces reusable workflows from prior trajectories and selectively retrieves them to guide future actions, improving long-horizon web-agent performance and efficiency.
related: [agents, workflows, memory, web-agents]
---

# Agent Workflow Memory

## Source Metadata

- Path: raw/articles/arxiv/2026-04-12-agent-workflow-memory.md
- Author: Zora Zhiruo Wang, Jiayuan Mao, Daniel Fried, Graham Neubig
- Published: 2024-09-11
- Publisher: arXiv.org
- URL: https://arxiv.org/abs/2409.07429

## TL;DR

Agent Workflow Memory treats reusable procedures as a memory artifact: it induces workflows from successful trajectories and retrieves the right workflow later to guide the agent through long-horizon tasks.

## Key Claims

- Long-horizon tasks benefit from remembering reusable routines, not only factual context.
- Workflow induction can happen offline from training data or online from test-time experience.
- Retrieved workflows improve both success rates and action efficiency on realistic web benchmarks.
- Procedural memory can generalize across tasks, sites, and domains when represented well.

## Important Details

- The paper evaluates on Mind2Web and WebArena.
- AWM induces workflows from past examples and selectively provides them to the agent during future generations.
- The reported gains are large relative improvements on both Mind2Web and WebArena, with fewer steps on successful WebArena tasks.
- The online version is designed to generalize under increasing train-test distribution gaps.

## Entities

- Authors: Zora Zhiruo Wang, Jiayuan Mao, Daniel Fried, Graham Neubig
- Benchmarks: Mind2Web, WebArena
- Concepts: workflow induction, procedural memory, online memory, offline memory

## My Notes

- This is one of the clearest primary sources for "workflow memory" as distinct from retrieval memory or conversation history.
- It is especially relevant to Mari because the codebase already has planner and pack artifacts that could evolve into reusable workflow memory objects.

## Open Questions

- What should a Mari workflow-memory artifact look like: natural-language playbook, structured graph, or both?
- Which parts of Mari's task history are reusable procedures versus one-off observations?

## Related

- [[agent-memory]]
- [[llm-agents]]
- [[managed-agents]]

## Source Text

Not copied locally. Use the source URL above if the full text is needed.
