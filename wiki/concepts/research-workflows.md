---
id: concept-research-workflows
type: concept
title: Research Workflows
tags: [research, workflows, agents, multi-agent]
source_count: 5
summary: Research workflows in this KB are compounding loops of ingest, retrieval, synthesis, and maintenance rather than one-shot question answering.
canonical_for: [research workflows]
review_status: reviewed
last_reviewed: 2026-05-27
review_due: 2026-06-27
confidence: "0.8"
---

# Research Workflows

## Summary

Research workflows in this KB are loops of ingest, retrieval, synthesis, and maintenance. The goal is not just to answer questions, but to improve the corpus each time work is done.

## Common Loop

- ingest a source note
- retrieve related notes
- produce a synthesis artifact
- file the result back into the wiki
- run health checks and rebuild the index

## Internal Codebase Ingests

Internal codebase ingestion follows the same loop, but the source is a repository rather than an article or paper. The useful output is a teardown of durable patterns: directory structure, package ownership, dependency boundaries, agent instructions, source-of-truth docs, testing habits, design contracts, and project-memory conventions. The source note should explicitly exclude secrets, environment files, generated caches, and full private source dumps.

## Source Notes

- [[2026-04-08-llm-knowledge-bases]]
- [[2025-06-13-how-we-built-our-multi-agent-research-system]]
- [[2026-03-24-harness-design-for-long-running-application-development]]
- [[2026-05-27-aya]]
- [[2026-05-27-conformis]]
