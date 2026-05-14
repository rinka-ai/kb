---
id: article-2026-04-09-scaling-managed-agents
type: source
title: "Scaling Managed Agents: Decoupling the brain from the hands"
path: raw/articles/anthropic-engineering/2026-04-09-scaling-managed-agents-decoupling-the-brain-from-the-hands.md
author: Lance Martin, Gabe Cemaj, Michael Cohen
publisher: Anthropic
url: https://www.anthropic.com/engineering/managed-agents
date_published:
date_added: 2026-04-09
tags: [agents, managed-agents, context-engineering, sessions, sandboxes, architecture]
status: processed
quality: high
summary: "Anthropic describes Managed Agents as a hosted long-horizon agent system built around stable interfaces for sessions, harnesses, and sandboxes, so the underlying implementation can evolve as models improve."
related: [managed-agents, context-engineering, agent-memory, sandboxes, sessions]
---

# Scaling Managed Agents: Decoupling the brain from the hands

## Source Metadata

- Path: raw/articles/anthropic-engineering/2026-04-09-scaling-managed-agents-decoupling-the-brain-from-the-hands.md
- Author: Lance Martin, Gabe Cemaj, Michael Cohen
- Published: Unknown
- Publisher: Anthropic
- URL: https://www.anthropic.com/engineering/managed-agents

## TL;DR

Anthropic’s core argument is that agent harnesses encode assumptions that become obsolete as models improve, so long-horizon agent systems should be built around durable interfaces rather than tightly coupled implementations. Their Managed Agents design separates the brain, the hands, and the session into independent components.

## Key Claims

- Harness logic should be treated as replaceable because model capabilities change and old scaffolding becomes dead weight.
- Long-horizon agents work better when the session log, harness, and execution environments are decoupled.
- Session history should live outside the model’s active context window as a durable interrogable object.
- Stable interfaces make it easier to recover from failure, improve security, and scale to many execution environments.
- Agent systems should be designed for future harnesses and workflows, not only the current model generation.

## Important Details

- Anthropic frames Managed Agents as a hosted service for long-horizon work in the Claude Platform.
- The architecture virtualizes three components: session, harness, and sandbox.
- The session is described as an append-only event log external to Claude’s immediate context window.
- The harness can resume from durable session state after failure instead of depending on a single long-lived container.
- Sandboxes and tools become interchangeable “hands” accessed through tool-like interfaces.
- Decoupling improved time-to-first-token because a session only provisions an execution environment when needed.
- The security model is improved by keeping credentials outside the sandbox where model-generated code runs.
- The design explicitly supports many brains and many hands, including multiple tools, MCP servers, and customer-hosted resources.

## Entities

- Company: Anthropic
- Product: Claude Managed Agents
- Concepts: session log, harness, sandbox, long-horizon agents, context engineering, tool interfaces
- Protocols and systems: MCP, tool proxies, secure vaults

## My Notes

- This is a very strong architecture note for the KB because it bridges abstract context-engineering ideas with real system boundaries.
- It pairs especially well with the imported `momo-research` notes on sessions, file-system abstractions, and just-in-time context management.
- The most durable idea here is not “use Anthropic’s product,” but “design agent infrastructure around interfaces whose implementations can change underneath.”

## Open Questions

- Which parts of our own knowledge-base workflow should be treated as stable interfaces versus replaceable harness logic?
- Should our future tooling make session logs explicitly queryable outside the active context window?
- How should we separate credentials, execution environments, and long-lived state in any agent tooling we build?

## Related

- [[managed-agents]]
- [[context-engineering]]
- [[agent-memory]]
- [[agent-security]]

## Source Text

Not copied locally. Use the source URL above if the full text is needed.
