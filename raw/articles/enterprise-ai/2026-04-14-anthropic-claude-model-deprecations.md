---
id: article-2026-04-14-anthropic-claude-model-deprecations
type: source
title: "Claude API Docs: Model Deprecations"
path: raw/articles/enterprise-ai/2026-04-14-anthropic-claude-model-deprecations.md
author: Anthropic
publisher: Anthropic Docs
url: https://docs.anthropic.com/en/docs/about-claude/model-deprecations
date_published: 2026-04-14
date_added: 2026-05-02
tags: [model-operations, deprecations, ai-ops, claude, enterprise-ai]
status: processed
quality: high
summary: Anthropic's model deprecation documentation shows that production AI systems must plan for model retirement, replacement, auditing of model usage, and migration work.
related: [enterprise-ai, ai-ops, model-routing]
---

# Claude API Docs: Model Deprecations

## Source Metadata

- Path: raw/articles/enterprise-ai/2026-04-14-anthropic-claude-model-deprecations.md
- Author: Anthropic
- Published: 2026-04-14 (used here for the latest deprecation notice captured)
- Publisher: Anthropic Docs
- URL: https://docs.anthropic.com/en/docs/about-claude/model-deprecations

## TL;DR

Model deprecation docs are a concrete operational reminder: production AI systems cannot treat model selection as a one-time build decision. They need model inventories, migration paths, evals, routing, and ownership.

## Key Claims

- Anthropic maintains model status and deprecation history for Claude API models.
- Several older Claude models have been retired or scheduled for retirement over time.
- Developers are expected to migrate to recommended replacement models.
- Deprecation management includes auditing model usage and planning for downsides and mitigations.

## Important Details

- The page lists active, deprecated, and retired models and their replacement recommendations.
- This source supports the "AI as continuously evolving infrastructure" operating model.
- It does not prove model quality instability by itself; it proves that model lifecycle changes are normal and must be operationalized.

## Entities

- Organizations: Anthropic
- Concepts: model deprecation, model retirement, AI operations, model migration

## My Notes

- Useful for arguing that model-agnostic routing and regression evals are infrastructure needs, not nice-to-have abstractions.

## Open Questions

- How should enterprise AI platforms expose model deprecation risk to workflow owners before a retirement date?

## Related

- [[enterprise-agent-deployment-failure-modes]]

## Source Text

Not copied locally. Use the source URL above if the full text is needed.
