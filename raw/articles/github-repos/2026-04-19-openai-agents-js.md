---
id: article-2026-04-19-openai-agents-js
type: source
title: "openai-agents-js"
path: raw/articles/github-repos/2026-04-19-openai-agents-js.md
author: OpenAI
publisher: GitHub
url: https://github.com/openai/openai-agents-js
date_published:
date_added: 2026-04-19
tags: [agents, agent-frameworks, sessions, approvals, tracing, mcp, typescript]
status: processed
quality: high
summary: The OpenAI Agents JS repository shows a mature TypeScript agent framework design that treats sessions, approvals, handoffs, tool execution, tracing, and cross-runtime packaging as first-class runtime surfaces rather than app-level glue.
related: [agent-frameworks, agent-harnesses, durable-execution, agent-protocols, workflows]
---

# openai-agents-js

## Source Metadata

- Path: raw/articles/github-repos/2026-04-19-openai-agents-js.md
- Author: OpenAI
- Published: Unknown
- Publisher: GitHub
- URL: https://github.com/openai/openai-agents-js
- Inspected revision: `40900fd563de54270216964bc67629026e7cda35` on 2026-04-19

## TL;DR

The OpenAI Agents JS repo is most useful here as a framework teardown, not just an SDK reference. It shows how a modern agent framework turns core abstractions such as agent definitions, tools, handoffs, sessions, approvals, tracing, and streaming into explicit runtime surfaces with serialization, test coverage, and cross-runtime shims instead of leaving them as ad hoc application logic.

## Key Claims

- The repository is organized as a layered monorepo that separates a reusable core runtime from OpenAI bindings, realtime support, and optional extensions.
- The public `@openai/agents` package is intentionally simple, but most of the framework value lives in `agents-core` runner modules that manage turns, tool execution, approvals, retries, sessions, and streaming.
- The framework distinguishes two different delegation models: `agent.asTool()` for manager-controlled subtask execution and `handoff()` for conversation ownership transfer.
- Sessions are treated as a formal storage interface, with local memory, OpenAI Conversations-backed memory, and compaction-aware wrappers sharing the same contract.
- Human-in-the-loop is a runtime primitive built around interruptions and resumable serialized `RunState`, not a one-off UI trick.
- The project is provider-agnostic in architecture, but OpenAI-optimized in the default bundle, hosted tools, tracing exporter, and server-managed conversation features.
- Cross-runtime support is a first-class engineering concern, with explicit Node, browser, and Cloudflare Worker shims plus integration tests across Node, Bun, Deno, Workers, and browser setups.

## Important Details

- The package split is deliberate: `packages/agents-core` contains the main abstractions and run loop, `packages/agents-openai` contains OpenAI-specific bindings, `packages/agents-realtime` isolates voice/realtime logic, `packages/agents-extensions` adds optional adapters, and `packages/agents` is a convenience bundle that sets the default OpenAI provider and tracing exporter.
- `packages/agents-core/src/run.ts` stays mostly orchestration-only while deeper behavior lives under `packages/agents-core/src/runner/`, including turn preparation, model retries, tool execution, approval handling, session persistence, streaming, and turn resolution.
- The docs emphasize a clean distinction between LLM-driven orchestration and code-driven orchestration, and the examples directory mirrors that by exposing separate scripts for routing, deterministic pipelines, parallelization, guardrails, human approval, MCP, memory, and realtime flows.
- `docs/src/content/docs/guides/tools.mdx` defines a practical tool taxonomy: hosted OpenAI tools, built-in execution tools like shell and apply-patch, function tools, agents-as-tools, MCP servers, and an experimental Codex tool.
- `docs/src/content/docs/guides/handoffs.mdx` and `docs/src/content/docs/guides/multi-agent.md` make a particularly useful conceptual split explicit: use handoffs when the specialist should take over the conversation, and use agents-as-tools when the manager should retain control of the final answer.
- `packages/agents-core/src/memory/session.ts` exposes a compact `Session` interface with CRUD-like operations plus optional Responses compaction hooks, while `memorySession.ts` shows the minimal in-process implementation and the docs point to file-backed, Prisma, and OpenAI-backed variants.
- `docs/src/content/docs/guides/human-in-the-loop.mdx` and the corresponding runtime modules show that approvals can originate inside nested agent-tool calls yet still bubble up to one outer run state, which then supports serialization, rehydration, and later resume.
- `docs/src/content/docs/guides/tracing.mdx` shows a tracing-first philosophy: traces and spans are on by default in server runtimes, workflow/group identifiers are explicit, and exporters are configurable instead of being hard-coded.
- The cross-runtime shims in `packages/agents-core/src/shims/` adapt environment-sensitive behavior such as `AsyncLocalStorage`, timers, env loading, streams, and tracing defaults for Node, browser, and Cloudflare-style runtimes.
- `integration-tests/README.md` shows an unusually realistic integration strategy for an SDK project: publish built packages to a local Verdaccio registry and then test them from separate environment fixtures instead of only relying on monorepo-internal unit tests.

## Entities

- Packages: `@openai/agents`, `@openai/agents-core`, `@openai/agents-openai`, `@openai/agents-realtime`, `@openai/agents-extensions`
- Runtime surfaces: `Agent`, `Runner`, `run()`, `RunState`, `Session`, `MemorySession`, handoffs, guardrails, tracing, MCP servers
- Tool categories: hosted tools, shell, apply patch, computer use, function tools, agents as tools, MCP tools, Codex tool
- Runtime targets: Node.js, Bun, Deno, Cloudflare Workers, browser/Vite/React
- Concepts: agent frameworks, durable execution, human-in-the-loop, session persistence, tool governance, cross-runtime shims

## My Notes

- The repo's strongest lesson is that agent frameworks are really runtime-design projects. The visible `Agent` API is small, but the hard work sits in interruption semantics, session persistence, tool dispatch, streaming, and traceability.
- This repo strengthens the KB's existing framework notes by showing how much practical structure accumulates around even a "lightweight" agent SDK once it supports real tools, approvals, resumability, and multiple runtimes.
- The project also shows a useful tension: it is provider-agnostic in shape, but the highest-leverage features are still OpenAI-specific. That seems like the likely equilibrium for many "agnostic" frameworks in practice.
- The examples are part of the architecture, not just documentation. They encode the maintainers' recommended workflow patterns as runnable reference scripts.

## Open Questions

- Which parts of this framework should update `[[agent-frameworks]]` directly versus remaining a source-specific case study?
- How portable is the tracing-first design to teams that cannot export traces to a vendor backend or operate under stricter data-retention limits?
- Does the browser/runtime shim model hold up as feature complexity grows, or does it mainly work because the strongest guarantees remain server-side?

## Related

- [[agent-frameworks]]
- [[agent-harnesses]]
- [[durable-execution]]
- [[agent-protocols]]
- [[workflows]]

## Source Text

Not copied locally. Use the repository URL above if the exact README, docs, or source files are needed.
