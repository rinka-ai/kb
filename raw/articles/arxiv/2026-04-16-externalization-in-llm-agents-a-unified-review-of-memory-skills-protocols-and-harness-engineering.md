---
id: article-2026-04-16-externalization-in-llm-agents
type: source
title: "Externalization in LLM Agents: A Unified Review of Memory, Skills, Protocols and Harness Engineering"
path: raw/articles/arxiv/2026-04-16-externalization-in-llm-agents-a-unified-review-of-memory-skills-protocols-and-harness-engineering.md
author: Chenyu Zhou et al.
publisher: arXiv.org
url: https://arxiv.org/abs/2604.08224
date_published: 2026-04-09
date_added: 2026-04-16
tags: [agents, externalization, memory, skills, protocols, harnesses, papers]
status: processed
quality: high
summary: A systems-level review arguing that practical agent progress increasingly depends on externalized memory, reusable skills, interaction protocols, and the harness layer that coordinates them.
related: [agent-memory, agent-skills, agent-protocols, agent-harnesses, llm-agents]
---

# Externalization in LLM Agents: A Unified Review of Memory, Skills, Protocols and Harness Engineering

## Source Metadata

- Path: raw/articles/arxiv/2026-04-16-externalization-in-llm-agents-a-unified-review-of-memory-skills-protocols-and-harness-engineering.md
- Author: Chenyu Zhou et al.
- Published: 2026-04-09
- Publisher: arXiv.org
- URL: https://arxiv.org/abs/2604.08224

## TL;DR

This paper argues that modern LLM agents increasingly improve not by changing model weights, but by externalizing state, procedures, and interaction structure into memory systems, skill modules, protocols, and harness engineering.

## Key Claims

- Agent progress increasingly depends on external cognitive infrastructure rather than only stronger model weights.
- Memory externalizes state across time, skills externalize procedural expertise, and protocols externalize interaction structure.
- Harness engineering is the coordinating layer that turns those separate modules into governed execution.
- The relevant design shift is historical as well as architectural: from weights, to context, to harness.
- Evaluation and governance need to account for the co-evolution of models with external infrastructure, not only model internals.

## Important Details

- The paper frames externalization through the lens of cognitive artifacts rather than as an ad hoc pile of auxiliary tools.
- It treats memory, skills, and protocols as distinct but coupled design surfaces that should not be collapsed into one generic "agent architecture" bucket.
- It explicitly discusses the trade-off between parametric capability and externalized capability.
- The paper highlights open challenges around governance, evaluation, shared infrastructure, and self-evolving harnesses.

## Entities

- People: Chenyu Zhou and coauthors
- Concepts: externalization, cognitive artifacts, memory, skills, protocols, harness engineering
- Systems: LLM agents, external memory stores, skill modules, interaction protocols

## My Notes

- This is the strongest theoretical triangulation for the Av1dlive guide in the current KB because it supplies a vocabulary that generalizes beyond one builder stack.
- The most reusable contribution is the explicit four-way split between memory, skills, protocols, and harness coordination.

## Open Questions

- Which parts of the paper are descriptive of current practice versus prescriptive for future agent architectures?
- What evaluation methods best compare parametric capability against externalized infrastructure choices?

## Related

- [[agent-memory]]
- [[agent-skills]]
- [[agent-protocols]]
- [[agent-harnesses]]
- [[llm-agents]]

## Source Text

Not copied locally. Use the source URL above if the full text is needed.
