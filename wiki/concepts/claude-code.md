---
id: concept-claude-code
type: concept
title: Claude Code
tags: [claude-code, agentic-coding, skills, hooks, subagents, workflows]
source_count: 8
summary: Claude Code is best understood as an agentic coding operating environment with explicit surfaces for permissions, context management, tool orchestration, hooks, MCP tools, skills, delegated work, and append-oriented session state.
canonical_for: [claude code, agentic coding, hooks, subagents, skills]
review_status: reviewed
last_reviewed: 2026-04-27
review_due: 2026-05-27
confidence: "0.88"
---

# Claude Code

## Summary

Claude Code is best understood as an agentic coding operating environment rather than a single chat loop. The strongest sources converge on a few stable surfaces: permission handling, verification loops, context management, tool orchestration, hooks, MCP-based tool access, reusable skills, and deliberate delegation to subagents. The newer teardown-style source sharpens the runtime picture further: quality comes less from a single giant prompt than from a harness with evented control flow, cache-aware context assembly, explicit recovery logic, and bounded delegated work. The arXiv design-space study adds a more formal lens: Claude Code gives the model broad local judgment inside a deterministic harness that enforces policy, manages context, preserves auditability, and keeps the human in authority.

## Core Surfaces

- permissions and approval policies determine how much autonomy is safe in a given repository or runtime
- context management keeps long sessions from degrading as tasks accumulate weight
- tool orchestration decides what can run in parallel, what must serialize, and how large results should be represented back to the model
- the runtime loop is evented and streaming rather than a blocking request-response wrapper
- hooks automate repeated checks, policy enforcement, and dynamic context injection
- skills package reusable tactics and project conventions beyond one-off prompt text
- MCP tools expose structured external capabilities without hard-coding them into prompts
- subagents create parallel or fresh-context workstreams when the main session would become overloaded

## Design Lens

- the central architecture question is not "how smart is the model?" but where model judgment stops and deterministic harness responsibility begins
- permissions are a product surface for human authority and safety, not just a security wrapper around shell access
- context management, deferred tool loading, skills, hooks, and MCP form a layered extension stack with different context costs
- append-oriented transcripts and session artifacts favor resume, fork, rewind, and audit over direct query power
- Claude Code's repository-scoped CLI design should not be treated as the universal agent architecture; persistent gateways such as OpenClaw move trust, memory, and extension boundaries outward

## Practical Patterns

- give the agent clear ways to verify work with tests, linting, and file inspection
- keep repo instructions short, durable, and operational instead of writing giant prompt manifests
- keep the most stable prompt sections cache-friendly and inject volatile context as late as possible
- use cheap-first compaction and only escalate to summarization or collapse when lighter tactics fail
- classify tools by concurrency and side-effect risk at definition time rather than improvising per turn
- treat retries, context overflow, and auth failures as explicit loop states with tailored recovery paths
- encode recurring team rules into hooks or skills when they should be enforced repeatedly
- delegate breadth-first research and bounded side tasks, not the critical path by default
- treat permissions and sandboxing as product surfaces, not as annoying interruptions around “real” work

## Tensions

- autonomy vs approval fatigue
- reusable automation vs repo-specific local judgment
- deep single-thread context vs parallel subagent decomposition
- prompt guidance vs harness-enforced behavior
- short-term capability amplification vs long-term human understanding and codebase coherence

## Source Notes

- [[2026-04-14-dive-into-claude-code-the-design-space-of-todays-and-future-ai-agent-systems]]
- [[2025-04-18-claude-code-best-practices-for-agentic-coding]]
- [[2026-04-06-how-and-when-to-use-subagents-in-claude-code]]
- [[2025-12-11-claude-code-power-user-customization-how-to-configure-hooks]]
- [[2025-11-13-skills-explained-how-skills-compares-to-prompts-projects-mcp-and-subagents]]
- [[2025-11-12-improving-frontend-design-through-skills]]
- [[2025-07-23-how-anthropic-teams-use-claude-code]]
- [[2026-04-17-claude-code-agent-complete-architecture-deep-dive-source-code-analysis]]
