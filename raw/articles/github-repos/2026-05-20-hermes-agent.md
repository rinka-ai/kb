---
id: article-2026-05-20-hermes-agent
type: source
title: "Hermes Agent"
path: raw/articles/github-repos/2026-05-20-hermes-agent.md
author: Nous Research
publisher: GitHub
url: https://github.com/NousResearch/hermes-agent
date_published:
date_added: 2026-05-20
tags: [agent-frameworks, agent-harnesses, agent-memory, agent-skills, computer-use, browser-agents, mcp, acp, cron, github-repos]
status: active
quality: high
summary: Hermes Agent is an open-source self-improving agent operating environment spanning CLI, messaging gateways, editor integration, memory, skills, cron, subagents, browser/computer use, MCP tools, and trajectory generation.
related: [agent-frameworks, agent-harnesses, llm-agents, agent-memory, agent-skills, agent-tools, managed-agents, computer-use, web-agents, context-engineering, durable-execution, agent-protocols, agent-security]
---

# Hermes Agent

## Source Metadata

- Path: raw/articles/github-repos/2026-05-20-hermes-agent.md
- Author: Nous Research
- Published: Unknown
- Publisher: GitHub
- URL: https://github.com/NousResearch/hermes-agent
- Inspected revision: `edb2d910577bfdc64792e5d3bb28e842e7f9042e` on 2026-05-20.
- Release context inspected: `RELEASE_v0.14.0.md` dated 2026-05-16 and `pyproject.toml` version `0.14.0`.
- Code and docs read: `README.md`, `pyproject.toml`, `SECURITY.md`, `RELEASE_v0.14.0.md`, `website/docs/developer-guide/architecture.md`, `website/docs/developer-guide/agent-loop.md`, `website/docs/developer-guide/tools-runtime.md`, `website/docs/developer-guide/prompt-assembly.md`, `website/docs/developer-guide/session-storage.md`, `website/docs/developer-guide/gateway-internals.md`, `website/docs/developer-guide/context-compression-and-caching.md`, `website/docs/developer-guide/trajectory-format.md`, `website/docs/user-guide/features/overview.md`, `website/docs/user-guide/features/security.md`, `website/docs/user-guide/features/skills.md`, `website/docs/user-guide/features/memory.md`, `website/docs/user-guide/features/delegation.md`, `website/docs/user-guide/features/cron.md`, `website/docs/user-guide/features/computer-use.md`, `website/docs/user-guide/features/browser.md`, `website/docs/user-guide/features/mcp.md`, `website/docs/user-guide/features/code-execution.md`, `website/docs/user-guide/features/acp.md`, `website/docs/user-guide/features/credential-pools.md`, `agent/background_review.py`, `agent/skill_commands.py`, `tools/delegate_tool.py`, `tools/code_execution_tool.py`, `acp_adapter/server.py`, `acp_adapter/permissions.py`, and `batch_runner.py`.
- Verification attempted: source inspection only; tests were not run.

## TL;DR

Hermes belongs in the KB because it is a working example of an agent operating environment, not only a chat CLI. The reusable pattern is a single `AIAgent` runtime exposed through terminal UI, messaging gateways, ACP editor integration, cron jobs, API surfaces, and batch runners while sharing memory, skills, provider routing, tool registries, session storage, and compression. The strongest caution comes from the project's own security policy: in-process approvals, allowlists, scanners, and redaction are heuristics; OS-level isolation is the load-bearing boundary against adversarial model behavior.

## Key Claims

- Hermes is best filed as agent infrastructure: a personal agent runtime with multiple entrypoints, not a narrow framework or app.
- Its "self-improving" claim is grounded in mutable memory, session search, skill creation/improvement, background review after turns, and user-modeling integrations.
- The runtime uses one core agent loop behind CLI, messaging gateway, ACP editor, cron, API, Python library, and batch-generation paths.
- Provider routing is treated as a runtime surface: OpenAI-compatible providers, Anthropic-style APIs, Codex Responses mode, credential pools, fallback providers, and model switching converge into internal message/tool abstractions.
- Tooling is registry-driven and toolset-filtered, with built-ins, MCP-discovered tools, plugins, browser tools, terminal backends, vision/file tools, agent-level tools, and Python code-execution RPC.
- Memory is bounded and curated through `MEMORY.md`/`USER.md` snapshots, SQLite/FTS5 session search, and optional external memory providers rather than only raw chat history.
- Skills act as procedural memory: they are progressively disclosed, file-backed, compatible with agentskills.io, and can be updated by background review loops unless protected.
- Delegation is implemented as isolated child `AIAgent` instances with restricted tools, separate terminal sessions, concurrency caps, and a parent-visible final summary.
- Cron jobs and gateway delivery show the durable personal-agent pattern: fresh sessions can wake on a schedule and report through messaging surfaces.
- Computer use extends the browser-agent pattern to desktop control through a macOS MCP driver, but the docs identify private SPI and platform-specific limitations.
- Batch trajectory generation and normalized ShareGPT-style traces make Hermes useful as research infrastructure for tool-calling model training.
- The repo's own security model is unusually explicit: sandbox the whole process for untrusted input or shared deployments; terminal-backend isolation only confines shell/file operations routed through that backend.

## Important Details

- `README.md` frames Hermes as a self-improving agent with memory, skills, session search, user modeling, scheduled automations, subagents, messaging gateway, terminal backends, browser/computer-use, and trajectory generation.
- `pyproject.toml` describes the package as version `0.14.0` and exact-pins core dependencies. Comments explain that this policy was tightened after a PyPI supply-chain incident and that provider/search/media backends should stay in lazy extras when possible.
- `website/docs/developer-guide/architecture.md` maps the system around `AIAgent` in `run_agent.py`, with CLI/gateway/ACP/batch/API/library entrypoints feeding one agent loop plus prompt builder, provider resolution, and tool dispatch.
- `website/docs/developer-guide/agent-loop.md` describes prompt/tool assembly, API mode selection, interruptible model calls, sequential/concurrent tool execution, history management, compression, retries, fallback models, iteration budgets, and memory flushing.
- `website/docs/developer-guide/tools-runtime.md` shows a self-registering tool registry, 30-second availability caching for `check_fn`, toolset filtering, MCP and plugin registration, and dangerous-command approval handling.
- Terminal backends include local, Docker, SSH, Singularity, Modal, Daytona, and Vercel Sandbox.
- `website/docs/developer-guide/prompt-assembly.md` separates cached system-prompt layers from ephemeral call-time additions: identity, tool guidance, memory/user snapshots, skills index, context files, timestamp/session/platform state, and security scanning.
- `website/docs/developer-guide/session-storage.md` uses SQLite at `~/.hermes/state.db` with WAL mode, sessions, messages, lineage/source tagging, FTS5, trigram FTS, and retry handling.
- `website/docs/developer-guide/gateway-internals.md` describes a normalized messaging gateway across many platforms, with session keys, authorization, active-session guards, interrupt behavior, slash commands, memory integration, hooks, and periodic maintenance.
- `website/docs/user-guide/features/skills.md` describes skills as on-demand knowledge documents, progressively disclosed through an index/full-view pattern. The primary user skill directory is `~/.hermes/skills/`; external skill directories can be read-only.
- `agent/background_review.py` forks a background review agent after turns to decide whether memory or skills should be updated, using a narrow tool whitelist for memory and skill management.
- `website/docs/user-guide/features/memory.md` distinguishes bounded curated memory from session search. `MEMORY.md` and `USER.md` are injected as frozen session-start snapshots; memory writes scan for prompt injection, exfiltration patterns, and invisible Unicode.
- `website/docs/user-guide/features/delegation.md` makes subagents synchronous, isolated, and restricted by default. Durable work should use cron or background terminal processes rather than assuming delegation survives independently.
- `website/docs/user-guide/features/cron.md` supports natural-language and cron-like scheduling, fresh agent sessions, delivery to gateway platforms, and script-only no-agent jobs.
- `website/docs/user-guide/features/computer-use.md` describes macOS background computer use through MCP stdio to `cua-driver`, intended to avoid cursor/focus/space changes; limitations include macOS-only support and private-SPI fragility.
- `website/docs/user-guide/features/browser.md` supports Browserbase, Browser Use, Firecrawl, Camofox, local CDP, and local Chromium, with accessibility-tree snapshots, element references, cloud/local routing, and persistent sessions.
- `website/docs/user-guide/features/code-execution.md` exposes a Python script runner that can call a small whitelist of tools through RPC. The code path in `tools/code_execution_tool.py` also scrubs secret-looking environment variables and blocks recursive high-risk tools.
- `website/docs/user-guide/features/acp.md` exposes Hermes as an Agent Client Protocol server for editors, with a curated `hermes-acp` toolset and editor-routed approval prompts.
- `website/docs/user-guide/features/mcp.md` supports stdio and HTTP MCP servers, dynamic tool discovery, prefixed tool registration, per-server filtering, and capability-aware resource/prompt utilities.
- `website/docs/developer-guide/context-compression-and-caching.md` uses a context-engine abstraction, gateway hygiene compression, agent-loop compression, structured summaries, tail/head protection, tool-result pruning, and iterative recompression.
- `website/docs/developer-guide/trajectory-format.md` normalizes tool-calling trajectories into ShareGPT JSONL with tool stats, error counts, reasoning normalization, and metadata.
- `RELEASE_v0.14.0.md` records a broad release: PyPI distribution, additional providers, local proxying, new messaging platforms, skill defaults, computer-use support, ACP registry integration, optional Codex app-server runtime, plugin LLM overrides, search providers, diagnostics, and native Windows beta.
- `SECURITY.md` is the most important caveat. It says the supported posture for untrusted input, production, or shared deployments is whole-process wrapping; in-process gates and scans are useful accident-prevention, not containment.

## Entities

- Repository: `NousResearch/hermes-agent`
- Project: Hermes Agent
- Organization: Nous Research
- Version inspected: `0.14.0`
- Core runtime: `AIAgent`, `run_agent.py`, prompt builder, provider resolution, tool dispatch, session storage
- Entrypoints: CLI/TUI, messaging gateway, ACP server, cron scheduler, API server, batch runner, Python library
- Tool surfaces: terminal, process, file, browser, web/search, MCP, plugins, vision, memory, todo, session search, delegate task, execute code
- Terminal backends: local, Docker, SSH, Singularity, Modal, Daytona, Vercel Sandbox
- Browser/computer-use surfaces: Browserbase, Browser Use, Firecrawl, Camofox, local CDP, local Chromium, `cua-driver`
- Memory surfaces: `MEMORY.md`, `USER.md`, SQLite sessions, FTS5 search, Honcho, OpenViking, Mem0, Hindsight, Holographic, RetainDB, ByteRover, Supermemory
- Protocol surfaces: MCP, ACP, gateway adapters, plugin API, ShareGPT trajectory format
- Security concepts: OS-level isolation, whole-process wrapping, terminal-backend isolation, approval gate, credential scoping, skill/plugin trust, allowlists, session routing handles

## My Notes

- This source is a strong argument for broadening the KB from "AI research" into an AI-era second brain, but with a domain boundary: Hermes is not just adjacent tech, it is a runnable attempt at a long-lived personal agent substrate.
- Hermes gives the KB a concrete example of memory, skills, tool registries, gateways, scheduled work, editor integration, and research trajectories all living inside one agent harness.
- The most useful design lesson is not the marketing phrase "self-improving"; it is the file-backed and reviewable shape of improvement surfaces: memory snapshots, skill files, background review, protected skill rules, traces, and batch trajectories.
- The project also keeps the thin-conductor idea honest. Hermes is feature-rich, but many capabilities are still surfaced as toolsets, extras, plugins, MCP servers, terminal backends, and context layers rather than fused into one model prompt.
- The security policy should be cited whenever Hermes is used as inspiration. A local personal agent can rely on operator trust in ways that a shared or adversarial deployment cannot.
- The code-execution tool is especially relevant to [[agent-tools]] because it formalizes code-mediated tool orchestration: Python scripts can call a bounded RPC whitelist and return compact stdout instead of flooding the model with every intermediate result.
- The ACP and MCP surfaces make Hermes useful for [[agent-protocols]]: editor-native agent sessions, approval bridging, dynamic tool discovery, and per-server filtering all become interface contracts rather than prompt conventions.
- The computer-use feature should be treated as a promising implementation pattern, but not as general proof that desktop agents are solved. Platform scope, private APIs, and safety guardrails matter.
- The KB should treat Hermes as evidence for [[agent-harnesses]], [[agent-frameworks]], [[managed-agents]], [[agent-memory]], [[agent-skills]], [[agent-tools]], [[context-engineering]], [[durable-execution]], [[web-agents]], [[computer-use]], [[agent-protocols]], and [[agent-security]].

## Open Questions

- How should a personal-agent runtime decide when a background review can mutate a skill versus only propose an edit?
- What governance should surround automatically created skills when they can affect future tool use across channels?
- Should gateway, ACP, cron, and CLI sessions share one user model by default, or should each entrypoint have separate memory scopes?
- How should Hermesian "self-improvement" be evaluated: task success, fewer approvals, better recall, skill quality, fewer regressions, or trajectory reuse?
- What is the minimal safe whole-process wrapper for users who want Hermes to ingest email, web pages, or public-channel messages?
- How portable are Hermes skills, memory snapshots, and session traces across other agent runtimes?
- What should count as durable execution in Hermes: persisted sessions and cron jobs, or only workflows with explicit replay-safe side-effect boundaries?
- Can code-mediated tool orchestration become the default interface for large toolsets without hiding too much execution evidence from the parent model?

## Related

- [[agent-frameworks]]
- [[agent-harnesses]]
- [[llm-agents]]
- [[agent-memory]]
- [[agent-skills]]
- [[agent-tools]]
- [[managed-agents]]
- [[computer-use]]
- [[web-agents]]
- [[context-engineering]]
- [[durable-execution]]
- [[agent-protocols]]
- [[agent-security]]

## Source Text

Selected source text and code anchors inspected:

- `README.md`: "The self-improving AI agent built by Nous Research."
- `README.md`: Hermes lists a "closed learning loop" covering memory, skill creation, skill improvement, session search, user modeling, and agentskills.io compatibility.
- `README.md`: Hermes supports Telegram, Discord, Slack, WhatsApp, Signal, CLI, voice memo transcription, and cross-platform conversation continuity.
- `README.md`: the terminal backend list is local, Docker, SSH, Singularity, Modal, Daytona, and Vercel Sandbox.
- `pyproject.toml`: version `0.14.0`; description says Hermes creates skills from experience, improves them during use, and runs anywhere.
- `pyproject.toml`: core dependencies are exact-pinned, while provider/search/media backends are pushed into extras or lazy installation.
- `SECURITY.md`: "The only security boundary against an adversarial LLM is the operating system."
- `SECURITY.md`: approval gates, output redaction, Skills Guard, and tool allowlists are described as useful heuristics rather than containment.
- `SECURITY.md`: terminal-backend isolation confines shell/file operations through that backend but does not confine the agent's own Python process.
- `SECURITY.md`: whole-process wrapping is the supported posture for untrusted input, shared deployments, and production-like operation.
- `website/docs/developer-guide/architecture.md`: CLI, Gateway, ACP, Batch Runner, API Server, and Python Library feed the `AIAgent` runtime.
- `website/docs/developer-guide/agent-loop.md`: the loop handles prompt/tool schemas, provider/API mode selection, interruptible model calls, tool execution, history, compression, retries, fallbacks, and memory flushing.
- `website/docs/developer-guide/tools-runtime.md`: tools self-register into `tools/registry.py`, and `model_tools.py` handles discovery, toolset resolution, MCP, plugins, and filtering.
- `website/docs/developer-guide/prompt-assembly.md`: cached prompt layers and ephemeral additions are separated so context can evolve without constantly invalidating prefix caching.
- `website/docs/developer-guide/session-storage.md`: sessions and messages live in SQLite with FTS5/trigram search and lineage/source tagging.
- `website/docs/user-guide/features/skills.md`: skills are loaded progressively and the primary mutable user directory is `~/.hermes/skills/`.
- `agent/background_review.py`: background review uses a narrow whitelist to update memory and skills after a turn.
- `website/docs/user-guide/features/delegation.md`: `delegate_task` creates isolated child agents and returns only the final summary to the parent.
- `website/docs/user-guide/features/code-execution.md`: Python scripts can call a whitelist of tools over RPC while returning only script stdout to the main conversation.
- `website/docs/user-guide/features/acp.md`: ACP mode exposes a curated editor-oriented toolset and routes dangerous command approvals back to the editor.
- `website/docs/user-guide/features/computer-use.md`: desktop control uses MCP stdio to a macOS background driver and has macOS/private-SPI limitations.
- `website/docs/developer-guide/trajectory-format.md`: trajectories are normalized to ShareGPT JSONL with tool calls, tool responses, metadata, reasoning normalization, and error statistics.
