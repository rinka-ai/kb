---
id: concept-personal-knowledge-bases
type: concept
title: Personal Knowledge Bases
tags: [knowledge-bases, research, markdown, obsidian]
source_count: 7
summary: Personal knowledge bases turn one-off research into durable, cumulative assets by preserving raw material, synthesis, and reusable outputs together.
canonical_for: [personal knowledge base, markdown knowledge base]
review_status: reviewed
last_reviewed: 2026-06-04
review_due: 2026-07-04
confidence: "0.83"
---

# Personal Knowledge Bases

## Summary

A personal knowledge base is a durable, cumulative system for storing raw source material, synthesized notes, and reusable outputs so research compounds over time instead of disappearing into chat history. In this repo the dominant shape is markdown plus local indexing, but MemWal adds a neighboring pattern: user-owned encrypted memory that can move across apps and agents when the user controls account, namespace, and delegate access. The Conformis and Aya internal-codebase ingests add a project-local version of the same idea: code repositories can carry their own durable knowledge layers for product truth, conventions, design rules, and architectural decisions. Van Horn's agentic-engineering digest adds the operator version: prior plans, meeting transcripts, and personal notes become better agent context when exposed through a CLI, API, or filesystem. Lieberman's content-machine digest adds the creator version: an idea vault, raw interview files, style guides, final edits, and content lessons can become a creator-facing knowledge base for repeated publishing work.

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
- internal codebase teardowns can turn tacit repo practice into durable wiki knowledge without copying full private source code
- repo-local vaults such as Conformis' `conformis-knowledge/` show how a project can carry its own inspectable memory while still feeding selected patterns back into this broader KB
- prior agent plans are reusable memory only when they remain searchable, dated, and tied to outcome or verification context
- creator content vaults are personal knowledge bases when they preserve ideas, raw language, feedback, and approved lessons rather than only finished posts

## Related

- [[repo-local-knowledge-bases]]
- [[research-workflows]]
- [[codebase-architecture]]
- [[2026-06-04-ai-native-content-machine]]

## Source Notes

- [[2026-04-08-llm-knowledge-bases]]
- [[2026-04-09-momo-research-repo-overview]]
- [[2026-05-20-memwal]]
- [[2026-05-27-conformis]]
- [[2026-05-27-aya]]
- [[2026-06-02-every-agentic-engineering-hack-i-know]]
- [[2026-06-03-alex-lieberman-content-machine]]
