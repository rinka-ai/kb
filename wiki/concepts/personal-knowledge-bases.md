---
id: concept-personal-knowledge-bases
type: concept
title: Personal Knowledge Bases
tags: [knowledge-bases, research, markdown, obsidian]
source_count: 3
summary: Personal knowledge bases turn one-off research into durable, cumulative assets by preserving raw material, synthesis, and reusable outputs together.
canonical_for: [personal knowledge base, markdown knowledge base]
review_status: reviewed
last_reviewed: 2026-05-20
review_due: 2026-06-20
confidence: "0.83"
---

# Personal Knowledge Bases

## Summary

A personal knowledge base is a durable, cumulative system for storing raw source material, synthesized notes, and reusable outputs so research compounds over time instead of disappearing into chat history. In this repo the dominant shape is markdown plus local indexing, but MemWal adds a neighboring pattern: user-owned encrypted memory that can move across apps and agents when the user controls account, namespace, and delegate access.

## Why It Matters

- turns one-off reading into reusable knowledge
- supports iterative synthesis and Q&A
- gives agents durable context outside a single conversation
- preserves user agency when memory can outlive any one app, provided access, revocation, and restore semantics are explicit

## In This Repo

- `raw/articles/` stores source notes
- `wiki/` stores compiled concepts and summaries
- `.kb/index.json` gives local retrieval over the markdown corpus
- adjacent infrastructure such as MemWal shows how encrypted, cross-client memory can complement a markdown wiki when the goal is portable personal context rather than only inspectable notes

## Source Notes

- [[2026-04-08-llm-knowledge-bases]]
- [[2026-04-09-momo-research-repo-overview]]
- [[2026-05-20-memwal]]
