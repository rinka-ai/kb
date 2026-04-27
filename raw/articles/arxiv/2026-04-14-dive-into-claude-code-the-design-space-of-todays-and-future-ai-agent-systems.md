---
id: article-2026-04-14-dive-into-claude-code-design-space
type: source
title: "Dive into Claude Code: The Design Space of Today's and Future AI Agent Systems"
path: raw/articles/arxiv/2026-04-14-dive-into-claude-code-the-design-space-of-todays-and-future-ai-agent-systems.md
author: Jiacheng Liu et al.
publisher: arXiv.org
url: https://arxiv.org/abs/2604.14228
date_published: 2026-04-14
date_added: 2026-04-27
tags: [claude-code, coding-agents, agent-harnesses, permissions, context-engineering, subagents, agent-architecture, openclaw]
status: processed
quality: high
summary: Source-grounded architecture study of Claude Code that maps its model loop, permission system, context management, extensibility, subagents, and persistence into a broader design space for future agent systems.
related: [claude-code, agent-harnesses, context-engineering, agent-security, multi-agent-systems, managed-agents, durable-execution]
---

# Dive into Claude Code: The Design Space of Today's and Future AI Agent Systems

## Source Metadata

- Path: raw/articles/arxiv/2026-04-14-dive-into-claude-code-the-design-space-of-todays-and-future-ai-agent-systems.md
- Author: Jiacheng Liu, Xiaohan Zhao, Xinyi Shang, Zhiqiang Shen
- Published: 2026-04-14
- Publisher: arXiv.org
- URL: https://arxiv.org/abs/2604.14228
- DOI: https://doi.org/10.48550/arXiv.2604.14228
- Code: https://github.com/VILA-Lab/Dive-into-Claude-Code

## TL;DR

This paper treats Claude Code as a production agent harness rather than a prompt wrapper. Its main value for this KB is a formal design-space map: a simple model-tool loop is surrounded by permissioning, context compaction, extensibility, subagent isolation, and append-oriented persistence. The paper is especially useful because it turns a Claude Code source-code teardown into reusable architecture language and contrasts Claude Code with OpenClaw, a persistent personal-assistant gateway.

## Key Claims

- Claude Code's core is a simple iterative loop where the model proposes tool use, the harness checks and executes actions, and results are returned for the next step.
- The bulk of the architecture sits around that loop: permissions, context management, tools, extensibility, subagent delegation, state, and execution environment boundaries.
- The paper identifies five values behind the architecture: human decision authority, safety and security, reliable execution, capability amplification, and contextual adaptability.
- Those values become thirteen design principles, including deny-first escalation, graduated trust, defense in depth, externalized policy, progressive context management, append-only durable state, isolated subagent boundaries, and graceful recovery.
- Claude Code favors model judgment inside a deterministic harness over heavy explicit planning graphs or rule-based orchestration.
- Context is treated as a scarce resource, with a graduated compaction pipeline and multiple extension mechanisms at different context costs.
- Claude Code and OpenClaw answer similar design questions differently because their deployment contexts differ: Claude Code is a repository-scoped coding harness, while OpenClaw is a persistent multi-channel gateway.
- The most important future-agent questions are not only how to add autonomy, but how to close silent-failure gaps, preserve memory across sessions, scale horizons, expose governance surfaces, and protect long-term human capability.

## Important Details

- Evidence base:
  - Tier A: official Anthropic documentation and engineering publications.
  - Tier B: code-verified claims from the publicly available TypeScript package snapshot analyzed by the authors.
  - Tier C: reconstructed claims from community analysis, OpenClaw comparison, and code-pattern inference.
- The analyzed Claude Code snapshot is version `v2.1.88`; feature flags and build targets may make runtime behavior differ across deployments.
- The paper decomposes Claude Code into seven high-level components: user, interfaces, agent loop, permission system, tools, state and persistence, and execution environment.
- The paper's subsystem analysis covers the agent loop, permission architecture, extensibility, context and memory, subagent delegation, persistence, and recovery.
- The permission analysis frames approvals as a layered safety system rather than a single prompt: tool filtering, deny rules, permission modes, classifier-mediated auto behavior, sandboxing, hook interception, and session-scoped reset behavior all matter.
- The context-management discussion emphasizes graduated compaction, lazy-loaded instructions, deferred tool schemas, and summary-only returns from subagents.
- Extensibility is split across MCP, plugins, skills, and hooks rather than collapsed into one universal extension API.
- Subagents are framed as isolated execution contexts with scoped permissions and separate transcripts, not merely branches in a shared prompt.
- Persistence is append-oriented: transcripts and session artifacts are designed for resume, fork, audit, and read-time projection rather than destructive rewrite.
- The OpenClaw comparison highlights a different center of gravity: perimeter-level identity and access control, gateway-wide capability registration, structured memory, and persistent daemon operation.
- The conclusion argues that future systems should treat long-term human understanding, codebase coherence, and the developer pipeline as first-class design problems instead of downstream evaluation metrics.

## Entities

- People: Jiacheng Liu, Xiaohan Zhao, Xinyi Shang, Zhiqiang Shen
- Institutions: VILA Lab, Mohamed bin Zayed University of Artificial Intelligence, University College London
- Systems: Claude Code, OpenClaw, OpenAI Codex CLI, Aider, SWE-Agent, OpenHands, Cursor, Windsurf, Devin
- Protocols and mechanisms: MCP, plugins, skills, hooks, ACP, permission modes, context compaction, append-only session storage
- Concepts: agent harnesses, coding agents, human decision authority, defense in depth, context engineering, subagent isolation, durable state, observability-evaluation gap, horizon scaling, long-term human capability

## My Notes

- This should be treated as a formal companion to the existing Claude Code teardown, not a replacement for official Anthropic documentation.
- Its strongest KB contribution is the design-space framing: it names the recurring questions production agent systems must answer and shows how one widely used coding agent answers them.
- The paper usefully connects Claude Code patterns to adjacent KB concepts: managed agents, context engineering, agent security, multi-agent systems, durable execution, and long-running harnesses.
- The OpenClaw contrast is valuable because it prevents overfitting the KB's agent-harness model to CLI coding agents. Gateway agents need different trust, memory, and extension boundaries.
- The paper's most portable synthesis is "model judgment within a deterministic harness": let the model choose locally, but make the surrounding runtime enforce permissions, manage context, recover from failures, and preserve auditability.
- Caveat: source-level reverse engineering can reveal implemented structure but cannot prove product intent, production flag state, or runtime prevalence.
- Caveat: because Claude Code is fast-moving, specific file names, feature flags, tool counts, and permission modes should be rechecked before making current-product claims.

## Open Questions

- Which Claude Code architecture claims remain stable across later product versions?
- How much of the reported runtime structure is active in production builds versus gated, experimental, or package-specific code?
- Should "long-term human capability preservation" become its own KB concept, or stay inside agent UX, evals, and harness design notes?
- Can OpenClaw-style gateway memory and Claude Code-style repository harnesses compose cleanly without duplicating policy, identity, and context layers?
- Where should generator-evaluator separation live: inside the coding harness, in hooks, in a separate eval runner, or in organizational review workflows?
- What are the right external audit surfaces for agent permission decisions as governance requirements mature?

## Related

- [[claude-code]]
- [[agent-harnesses]]
- [[context-engineering]]
- [[agent-security]]
- [[multi-agent-systems]]
- [[managed-agents]]
- [[durable-execution]]
- [[2026-04-17-claude-code-agent-complete-architecture-deep-dive-source-code-analysis]]
- [[2026-04-17-claude-code-runtime-patterns-from-source-teardown]]
- [[2026-04-16-externalization-in-llm-agents-a-unified-review-of-memory-skills-protocols-and-harness-engineering]]
- [[2026-03-24-harness-design-for-long-running-application-development]]
- [[2026-04-09-scaling-managed-agents-decoupling-the-brain-from-the-hands]]

## Source Text

Not copied locally. Use the arXiv page and PDF URL above if the full text is needed.
