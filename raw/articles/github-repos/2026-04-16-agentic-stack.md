---
id: article-2026-04-16-agentic-stack-repo
type: source
title: "agentic-stack"
path: raw/articles/github-repos/2026-04-16-agentic-stack.md
author: codejunkie99
publisher: GitHub
url: https://github.com/codejunkie99/agentic-stack
date_published: 2026-04-15
date_added: 2026-04-16
tags: [agents, repositories, memory, skills, protocols, harnesses]
status: processed
quality: high
summary: A concrete reference implementation for a portable `.agent/` brain, with layered memory, progressive-disclosure skills, protocol files, hooks, adapters for multiple harnesses, and a nightly consolidation loop.
related: [agent-harnesses, agent-memory, agent-skills, agent-protocols]
---

# agentic-stack

## Source Metadata

- Path: raw/articles/github-repos/2026-04-16-agentic-stack.md
- Author: codejunkie99
- Published: 2026-04-15
- Publisher: GitHub
- URL: https://github.com/codejunkie99/agentic-stack

## TL;DR

This repository turns the Av1dlive-style builder doctrine into an installable reference implementation: a portable `.agent/` folder with memory layers, skills, protocols, hooks, adapters, and a small harness-specific shim per environment.

## Key Claims

- One portable `.agent/` brain can be reused across multiple harnesses while retaining its knowledge.
- The repo treats memory, skills, and protocols as first-class files rather than ephemeral runtime configuration.
- Skills should use progressive disclosure, while memory should be layered and periodically consolidated.
- Harness-agnosticism is an explicit design goal rather than an accidental byproduct.
- The compounding loop depends on episodic logging, reflection, conservative skill rewrites, and periodic promotion into semantic memory.

## Important Details

- The README ships with a concrete `.agent/` layout for memory, skills, protocols, hooks, and tools.
- It includes adapters for Claude Code, Cursor, Windsurf, OpenCode, OpenClient, Hermes, and a standalone Python harness.
- The seed skills are `skillforge`, `memory-manager`, `git-proxy`, `debug-investigator`, and `deploy-checklist`.
- The repo operationalizes a nightly dream cycle with a cron example that runs `auto_dream.py`.
- The project explicitly credits the Av1dlive article while also emphasizing that harness-agnosticism is the point.

## Entities

- Organization: GitHub
- Repository: `codejunkie99/agentic-stack`
- Artifacts: `.agent/`, `AGENTS.md`, `permissions.md`, `_manifest.jsonl`, `auto_dream.py`
- Concepts: portability, progressive disclosure, layered memory, harness adapters

## My Notes

- This is the best implementation companion to the builder guide because it shows what the doctrine looks like once translated into files, installers, and harness adapters.
- It is especially valuable as an implementation source because it narrows the gap between aspirational architecture and concrete operational patterns.

## Open Questions

- Which parts of this repo are durable architectural patterns versus author-specific defaults?
- How much of the portability claim survives once real teams add product-specific tools, approvals, and deployment workflows?

## Related

- [[agent-harnesses]]
- [[agent-memory]]
- [[agent-skills]]
- [[agent-protocols]]

## Source Text

Not copied locally. Use the source URL above if the full text is needed.
