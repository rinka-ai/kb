---
id: article-2026-03-25-claude-code-auto-mode
type: source
title: "Claude Code auto mode: a safer way to skip permissions"
author: Anthropic
publisher: Anthropic
url: https://www.anthropic.com/engineering/claude-code-auto-mode
date_published: 2026-03-25
date_added: 2026-04-09
tags: [claude-code, security, sandboxing, autonomy, permissions]
status: processed
quality: high
summary: Anthropic presents auto mode for Claude Code as a middle ground between manual approvals and unrestricted autonomy, using model-based classifiers and prompt-injection screening to reduce approval fatigue while preserving safety.
related: [claude-code, agent-safety, permissions, sandboxing]
---

# Claude Code auto mode: a safer way to skip permissions

## Source Metadata

- Author: Anthropic
- Published: 2026-03-25
- Publisher: Anthropic
- URL: https://www.anthropic.com/engineering/claude-code-auto-mode

## TL;DR

Auto mode is Anthropic's attempt to automate common approval decisions in Claude Code without giving up all guardrails. It combines input-side prompt-injection checks with output-side transcript classification.

## Key Claims

- Manual permission prompts create approval fatigue.
- Fully skipping permissions is unsafe in most real workflows.
- Model-based approval layers can reduce prompts while still blocking risky actions.

## Important Details

- Anthropic says users approve 93% of prompts anyway.
- The design uses an input-layer prompt-injection probe and an output-layer transcript classifier.
- The classifier is intentionally reasoning-blind to reduce leakage from Claude's own internal process.

## Entities

- Product: Claude Code
- Concepts: auto mode, transcript classifier, prompt-injection probe, approval fatigue

## My Notes

- This is best read together with the sandboxing and managed-agents posts.

## Open Questions

- When should automated approval be preferred over explicit sandboxing boundaries?

## Related

- [[claude-code]]
- [[agent-safety]]
- [[managed-agents]]

## Source Text

Not copied locally. Use the source URL above if the full text is needed.
