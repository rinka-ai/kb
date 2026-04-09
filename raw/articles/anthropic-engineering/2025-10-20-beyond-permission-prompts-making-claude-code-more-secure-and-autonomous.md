---
id: article-2025-10-20-claude-code-sandboxing
type: source
title: "Beyond permission prompts: making Claude Code more secure and autonomous"
author: Anthropic
publisher: Anthropic
url: https://www.anthropic.com/engineering/claude-code-sandboxing
date_published: 2025-10-20
date_added: 2026-04-09
tags: [claude-code, sandboxing, security, permissions, autonomy]
status: processed
quality: high
summary: Anthropic introduces Claude Code sandboxing features that combine filesystem and network isolation to reduce approval fatigue while improving safety and enabling more autonomous operation.
related: [claude-code, sandboxing, security, auto-mode]
---

# Beyond permission prompts: making Claude Code more secure and autonomous

## Source Metadata

- Author: Anthropic
- Published: 2025-10-20
- Publisher: Anthropic
- URL: https://www.anthropic.com/engineering/claude-code-sandboxing

## TL;DR

This post argues that permission prompts alone do not scale. Better security comes from hard execution boundaries, especially filesystem and network isolation, which also let agents act with less interruption.

## Key Claims

- Approval-heavy workflows create both friction and safety failure modes.
- Effective sandboxing requires both filesystem and network isolation.
- Secure execution boundaries can increase autonomy rather than only restricting it.

## Important Details

- Anthropic reports an 84% reduction in permission prompts with sandboxing.
- The post introduces a sandboxed bash tool and Claude Code on the web.
- The framing centers prompt injection as a primary threat model.

## Entities

- Product: Claude Code
- Concepts: sandboxed bash, filesystem isolation, network isolation, approval fatigue

## My Notes

- This is a core systems post for any serious coding-agent security model.

## Open Questions

- Which sandbox guarantees are essential versus nice-to-have in local agent workflows?

## Related

- [[claude-code]]
- [[sandboxing]]
- [[managed-agents]]

## Source Text

Not copied locally. Use the source URL above if the full text is needed.
