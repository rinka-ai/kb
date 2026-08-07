---
id: article-2026-05-28-agent2agent-a2a-protocol-v1-0-1
type: source
title: "Agent2Agent Protocol v1.0.1"
path: raw/articles/github-repos/2026-05-28-agent2agent-a2a-protocol-v1-0-1.md
author: A2A Project
publisher: GitHub
url: https://github.com/a2aproject/A2A/tree/v1.0.1
date_published: 2026-05-28
date_added: 2026-07-27
tags: [a2a, protocols, agents, multi-agent-systems, interoperability]
status: active
quality: high
summary: The pinned A2A v1.0.1 specification defines interoperable agent discovery, messaging, task lifecycle, artifacts, streaming, push notifications, and authentication without requiring agents to expose their internal implementation.
related: [agent-protocols, multi-agent-systems, managed-agents, agent-tools]
---

# Agent2Agent Protocol v1.0.1

## Source Metadata

- Path: raw/articles/github-repos/2026-05-28-agent2agent-a2a-protocol-v1-0-1.md
- Author: A2A Project
- Published: 2026-05-28
- Publisher: GitHub
- URL: https://github.com/a2aproject/A2A/tree/v1.0.1
- Specification: https://github.com/a2aproject/A2A/blob/v1.0.1/docs/specification.md
- Pinned tag commit: `3303592588e388e62e0f69f701af531d2f4e3991`
- License: Apache-2.0

## TL;DR

A2A standardizes how independently implemented agents discover capabilities, exchange messages, manage long-running tasks, return artifacts, and negotiate streaming or asynchronous delivery. It complements tool/context protocols such as MCP: A2A is the agent-to-agent collaboration layer, while MCP primarily connects an agent to tools and context.

## Key Claims

- Agents can collaborate without exposing their memory, tools, prompts, or orchestration internals.
- An Agent Card advertises identity, endpoint, skills, capabilities, and supported security schemes.
- The protocol models interactions through messages, tasks, parts, artifacts, and explicit task states.
- Implementations can use request/response, Server-Sent Events streaming, polling, and authenticated push notifications.
- The core binding uses JSON-RPC 2.0 over HTTP(S) and standard web authentication mechanisms.
- A2A and MCP solve adjacent but distinct interoperability problems.

## Important Details

- Public Agent Cards may be published at `/.well-known/agent-card.json`; private discovery can use authenticated registries or platform-specific catalogs.
- A task provides a stable unit of work for operations that outlive one request and can accumulate status updates and artifacts.
- Parts carry typed content such as text, files, or structured data; artifacts are task outputs composed of parts.
- Capability negotiation prevents clients from assuming support for streaming, push notifications, or extended card features.
- Authentication is described in the Agent Card and applied using ordinary HTTP credentials rather than embedded inside protocol payloads.
- This note pins v1.0.1 rather than the mutable default branch.

## Entities

- Organization: A2A Project
- Protocols: Agent2Agent Protocol, JSON-RPC 2.0, HTTP, Server-Sent Events
- Objects: Agent Card, skill, message, task, part, artifact, push notification
- Related protocol: Model Context Protocol

## My Notes

- A2A gives the KB a primary-source basis for multi-agent interoperability; earlier coverage relied mainly on secondary mentions.
- The important architectural boundary is opaque collaboration: protocol conformance should not require shared internal state or a shared agent framework.
- Production implementations still need policy above the wire format: trust, delegation limits, identity, audit trails, and human escalation are not solved by transport interoperability alone.

## Open Questions

- How will private Agent Card registries establish trust and revocation across organizations?
- Which task-state and cancellation semantics remain stable across future A2A revisions?
- How should A2A identities and MCP tool identities compose in a single audit trail?

## Related

- [[agent-protocols]]
- [[multi-agent-systems]]
- [[managed-agents]]
- [[agent-tools]]
- [[2026-04-10-model-context-protocol]]

## Source Text

Source capture is intentionally bounded to the pinned release metadata and specification mapping above. The complete Apache-2.0 specification remains available at the pinned URL; it was not duplicated into this note.
