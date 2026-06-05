---
id: concept-research-workflows
type: concept
title: Research Workflows
tags: [research, workflows, agents, multi-agent]
source_count: 6
summary: Research workflows in this KB are compounding loops of ingest, retrieval, synthesis, and maintenance rather than one-shot question answering.
canonical_for: [research workflows, repo ingest workflow, github repo teardown, skills repo ingest, source teardown workflow]
review_status: reviewed
last_reviewed: 2026-06-05
review_due: 2026-07-05
confidence: "0.84"
---

# Research Workflows

## Summary

Research workflows in this KB are loops of ingest, retrieval, synthesis, and maintenance. The goal is not just to answer questions, but to improve the corpus each time work is done. Recent repo-level ingests sharpen the pattern: inspect the source as a system, preserve one provenance-bearing source note, synthesize reusable operating lessons, then update the concept layer and health checks instead of copying every internal file.

## Common Loop

- ingest a source note
- retrieve related notes
- produce a synthesis artifact
- file the result back into the wiki
- run health checks and rebuild the index
- use search telemetry and stale-page reports as maintenance input for the next content pass

## Internal Codebase Ingests

Internal codebase ingestion follows the same loop, but the source is a repository rather than an article or paper. The useful output is a teardown of durable patterns: directory structure, package ownership, dependency boundaries, agent instructions, source-of-truth docs, testing habits, design contracts, and project-memory conventions. The source note should explicitly exclude secrets, environment files, generated caches, and full private source dumps.

For public skill repositories, the same discipline applies: inspect the whole repo, preserve one repo-level source note, separate stable skills from deprecated or in-progress material, and synthesize the workflow patterns rather than copying every skill file into the KB.

## Source Notes

- [[2026-04-08-llm-knowledge-bases]]
- [[2025-06-13-how-we-built-our-multi-agent-research-system]]
- [[2026-03-24-harness-design-for-long-running-application-development]]
- [[2026-05-27-aya]]
- [[2026-05-27-conformis]]
- [[2026-06-04-mattpocock-skills]]
