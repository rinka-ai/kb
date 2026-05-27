---
id: summary-2026-05-02-flue-sandbox-agent-framework-source-teardown
type: summary
title: Flue Sandbox Agent Framework Source Teardown
tags: [flue, agent-frameworks, agent-harnesses, sandbox-agents, skills, durable-execution, mcp]
summary: Reusable lessons from Flue's source tree, focused on how a compact TypeScript sandbox-agent framework should handle context, sessions, capabilities, events, and deployment lifecycle.
review_status: reviewed
last_reviewed: 2026-05-02
review_due: 2026-06-02
confidence: "0.82"
---

# Flue Sandbox Agent Framework Source Teardown

## Summary

Flue is valuable as a compact implementation of the sandbox-agent thesis: a headless TypeScript handler can initialize an agent, give it a sandbox, open a session, run prompts or skills with typed results, grant specific commands, spawn child task sessions, connect MCP tools, and compile to target-specific deployment artifacts. The KB lesson is sharper than "sandbox everything": the better framework shape is a portable runtime contract around context, runs, capabilities, events, and infrastructure lifecycle. Flue has elegant ergonomics, but its current pain points show that those contracts must be explicit before the framework feels reliable across Node, Cloudflare, local, virtual, R2, and container sandboxes.

## Patterns Worth Keeping

- Use a tiny programmable agent entrypoint rather than forcing users through a hosted chat-product model.
- Make `init() -> agent.session() -> prompt/skill/task/shell` the dominant mental model; this is easy to teach and compose.
- Represent sandboxes through a universal `SessionEnv` interface so local filesystems, virtual filesystems, containers, and third-party providers can plug into one runtime.
- Keep privileged CLIs behind named command grants with explicit env injection instead of leaking host secrets into the sandbox.
- Treat prompt and skill results as typed orchestration values, not just assistant prose.
- Let child tasks share a sandbox but isolate message history and role/context overlays.
- Keep MCP connection in trusted code and pass discovered tools into the harness, preserving secret boundaries.
- Build deploy targets through plugins that own platform-specific routing and storage details.
- Persist session history as structured entries rather than a flat text transcript, so compaction, branch summaries, deletion, and child sessions have room to grow.

## Design Warnings

- Context is a first-class runtime plane, not a side effect of filesystem visibility. Roles, skills, `AGENTS.md`, dynamic project context, and R2-backed knowledge should have one coherent loading contract.
- Session persistence is not full durable execution. A framework still needs a run id, status, event history, cancellation, pause/resume, approval interrupts, retry semantics, and replay-safe side-effect boundaries.
- Request contracts matter because every endpoint can spend money. Method validation, content-type validation, payload schema validation, auth hooks, and consistent error envelopes belong in the framework wrapper.
- Observability is not polish for agents. Tool events, command grants, model used, role applied, token usage, latency, context sources, files read/modified, and child task trees should be queryable.
- Platform lifecycle is part of the framework when the framework emits deployable infrastructure. Durable Object migrations, container config, generated Wrangler config, and dev-server error surfacing are not "just docs."
- Development servers must fail loudly and locally. One broken agent file should not wedge unrelated agents without a visible parse/build error.

## Better Framework Shape

- **Definition plane:** agent files, roles, skills, static context, trigger declarations, payload schemas, env schemas, and capability manifests are discovered and validated before deploy.
- **Context plane:** every run gets an explicit context manifest listing bundled files, sandbox-mounted files, dynamic stores, freshness, visibility scope, and target compatibility.
- **Run plane:** each invocation creates a durable run object with status, parent/child relationships, current step, resumability, cancellation, approval waits, and a stable event log.
- **Capability plane:** tools, MCP servers, commands, environment grants, network egress, and filesystem permissions share one policy model and one audit ledger.
- **Session plane:** conversational history remains separate from execution state, but both point to common artifacts and compaction checkpoints.
- **Deployment plane:** target plugins own infrastructure migrations, generated config, local dev compatibility, and preflight diagnostics with explicit guarantees.
- **Observability plane:** streams are only one view; the framework should also expose a structured trace for postmortem, UI, eval, billing, and debugging.

## Best KB Fit

- `[[agent-harnesses]]` for the split between model loop, tools, commands, sandbox, context, and product entrypoints.
- `[[agent-frameworks]]` for the framework-level contract around deploy targets, sessions, runtime state, and portability.
- `[[agent-skills]]` for the lesson that skill discovery must be portable and explicit, not dependent on hidden filesystem assumptions.
- `[[durable-execution]]` for the distinction between persisted session history and durable run semantics.
- `[[agent-protocols]]` for request validation, capability policy, error envelopes, and event schema design.

## Open Questions

- Should the KB add a standalone concept page for "agent context planes" as distinct from memory, skills, and session history?
- Is "sandbox agent framework" a useful enough category to split from general "agent frameworks," or is it a deployment flavor of the same pattern?
- What is the smallest durable-run contract that still preserves Flue-like simplicity?
- How much infrastructure lifecycle should be encoded declaratively before a framework starts feeling like a platform rather than a library?

## Source Notes

- [[2026-05-02-flue]]
