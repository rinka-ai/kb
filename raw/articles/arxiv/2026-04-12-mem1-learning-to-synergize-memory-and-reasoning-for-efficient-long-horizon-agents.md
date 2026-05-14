---
id: article-2026-04-12-mem1-learning-to-synergize-memory-and-reasoning-for-efficient-long-horizon-agents
type: source
title: "MEM1: Learning to Synergize Memory and Reasoning for Efficient Long-Horizon Agents"
path: raw/articles/arxiv/2026-04-12-mem1-learning-to-synergize-memory-and-reasoning-for-efficient-long-horizon-agents.md
author: "Zijian Zhou, Ao Qu, Zhaoxuan Wu, Sunghwan Kim, Alok Prakash, Daniela Rus, Jinhua Zhao, Bryan Kian Hsiang Low, Paul Pu Liang"
publisher: arXiv.org
url: https://arxiv.org/abs/2506.15841
date_published: 2025-06-18
date_added: 2026-04-12
tags: [agent-memory, reinforcement-learning, long-horizon-agents, memory-efficiency]
status: processed
quality: high
summary: MEM1 trains agents with reinforcement learning to maintain a compact shared state that jointly supports memory consolidation and reasoning over long multi-turn tasks with roughly constant memory growth.
related: [agent-memory, reinforcement-learning, long-horizon-agents, memory-efficiency]
---

# MEM1: Learning to Synergize Memory and Reasoning for Efficient Long-Horizon Agents

## Source Metadata

- Path: raw/articles/arxiv/2026-04-12-mem1-learning-to-synergize-memory-and-reasoning-for-efficient-long-horizon-agents.md
- Author: Zijian Zhou, Ao Qu, Zhaoxuan Wu, Sunghwan Kim, Alok Prakash, Daniela Rus, Jinhua Zhao, Bryan Kian Hsiang Low, Paul Pu Liang
- Published: 2025-06-18
- Publisher: arXiv.org
- URL: https://arxiv.org/abs/2506.15841

## TL;DR

MEM1 learns a compact shared internal state that supports both memory and reasoning, letting long-horizon agents operate with constant memory growth instead of naively appending all past turns.

## Key Claims

- Full-context prompting is a poor default for long-horizon multi-turn agents because memory grows without bound and reasoning quality degrades.
- Reinforcement learning can train agents to consolidate memory into a compact state that still supports later reasoning.
- Memory consolidation and reasoning should be optimized together rather than treated as separate subsystems.
- Learned compact memory can generalize beyond the horizon lengths seen during training.

## Important Details

- The paper introduces an end-to-end RL framework for updating a compact shared internal state at each turn.
- The training setup composes existing datasets into multi-turn task sequences to produce more realistic long-horizon environments.
- The experiments cover internal retrieval QA, open-domain web QA, and multi-turn web shopping.
- The paper reports large performance and memory-efficiency gains over a stronger-in-parameters full-context baseline on a multi-objective QA task.

## Entities

- Authors: Zijian Zhou, Ao Qu, Zhaoxuan Wu, Sunghwan Kim, Alok Prakash, Daniela Rus, Jinhua Zhao, Bryan Kian Hsiang Low, Paul Pu Liang
- Benchmarks: internal retrieval QA, open-domain web QA, multi-turn web shopping
- Concepts: constant-memory agents, reasoning-driven consolidation, RL memory updates, long-horizon generalization

## My Notes

- This is a better canonical source than the earlier secondary MEM1 note and strengthens the KB's coverage of learned internal memory.

## Open Questions


## Related

- [[agent-memory]]
- [[llm-agents]]

## Source Text

Not copied locally. Use the source URL above if the full text is needed.
