---
id: article-2026-04-17-browserbase-enterprise-security
type: source
title: "Browserbase Enterprise Security"
path: raw/articles/browserbase-docs/2026-04-17-browserbase-enterprise-security.md
author: Browserbase
publisher: Browserbase Documentation
url: https://docs.browserbase.com/account/enterprise/security
date_published:
date_added: 2026-04-17
tags: [browserbase, security, sandboxing, browser-agents, infrastructure]
status: processed
quality: high
summary: Browserbase presents browser-agent security as a zero-trust infrastructure problem built around per-browser VM isolation, network segmentation, no session reuse, optional zero-retention logging, and tightly scoped AI assistance.
related: [agent-security, managed-agents, computer-use]
---

# Browserbase Enterprise Security

## Source Metadata

- Path: raw/articles/browserbase-docs/2026-04-17-browserbase-enterprise-security.md
- Author: Browserbase
- Published: Unknown
- Publisher: Browserbase Documentation
- URL: https://docs.browserbase.com/account/enterprise/security

## TL;DR

Browserbase treats browser-agent security as infrastructure engineering, not prompt hygiene: every browser gets its own VM and subnet, sessions are never reused, logging can be disabled, and AI browsing workflows are constrained into atomic, auditable steps.

## Key Claims

- Browser agents should be designed under a zero-trust assumption that any browser may be compromised.
- Isolation needs to happen at the VM and network layers, not only inside the agent prompt or application logic.
- Sensitive workflows benefit from zero-retention options and runtime parameterization so raw secrets do not need to live inside model context.
- Deterministic, step-bounded browsing reduces the blast radius of LLM fallbacks.

## Important Details

- The docs summarize Browserbase isolation as "1 browser per VM" plus isolated subnets and strict firewall rules.
- The security guidance explicitly says Browserbase assumes any browser may be compromised.
- Browser reuse is disabled; after each session the VM is killed and recreated from scratch.
- GPU access is intentionally disabled to avoid shared-memory attack surfaces.
- Logging and session recording can be disabled to support zero-retention workflows.
- The Stagehand section emphasizes atomic, auditable, cacheable commands, with LLM fallback limited to selector repair or similarly narrow steps.
- Prompt templating is positioned as a way to inject sensitive values at runtime without exposing them broadly to the LLM.

## Entities

- Organization: Browserbase
- Systems: Browserbase, Stagehand
- Concepts: zero-trust isolation, browser VMs, network segmentation, zero retention, runtime parameterization

## My Notes

- This is useful KB evidence that "credentials outside the sandbox" should be generalized into a broader principle: keep sensitive execution and secret surfaces outside model-controlled runtime whenever possible.
- It also gives the KB a concrete browser-agent security source rather than relying only on coding-agent examples.

## Open Questions

- Which of these isolation patterns transfer cleanly to non-browser agent sandboxes?
- Where should the KB draw the line between agent-level policy and infrastructure-level containment?

## Related

- [[agent-security]]
- [[managed-agents]]
- [[computer-use]]

## Source Text

Not copied locally. Use the source URL above if the full text is needed.
