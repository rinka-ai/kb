---
id: concept-claude-code
type: concept
title: Claude Code
tags: [claude-code, agentic-coding, skills, hooks, subagents, workflows]
source_count: 6
summary: Claude Code is best understood as an agentic coding operating environment with explicit surfaces for permissions, context management, hooks, MCP tools, skills, and delegated work.
canonical_for: [claude code, agentic coding, hooks, subagents, skills]
review_status: reviewed
last_reviewed: 2026-04-16
review_due: 2026-05-16
confidence: "0.86"
---

# Claude Code

## Summary

Claude Code is best understood as an agentic coding operating environment rather than a single chat loop. The strongest sources converge on a few stable surfaces: permission handling, verification loops, context management, hooks, MCP-based tool access, reusable skills, and deliberate delegation to subagents. The practical lesson is that quality comes less from a single giant prompt than from a harness that makes good behavior easy to repeat.

## Core Surfaces

- permissions and approval policies determine how much autonomy is safe in a given repository or runtime
- context management keeps long sessions from degrading as tasks accumulate weight
- hooks automate repeated checks, policy enforcement, and dynamic context injection
- skills package reusable tactics and project conventions beyond one-off prompt text
- MCP tools expose structured external capabilities without hard-coding them into prompts
- subagents create parallel or fresh-context workstreams when the main session would become overloaded

## Practical Patterns

- give the agent clear ways to verify work with tests, linting, and file inspection
- keep repo instructions short, durable, and operational instead of writing giant prompt manifests
- encode recurring team rules into hooks or skills when they should be enforced repeatedly
- delegate breadth-first research and bounded side tasks, not the critical path by default
- treat permissions and sandboxing as product surfaces, not as annoying interruptions around “real” work

## Tensions

- autonomy vs approval fatigue
- reusable automation vs repo-specific local judgment
- deep single-thread context vs parallel subagent decomposition
- prompt guidance vs harness-enforced behavior

## Source Notes

- [[2025-04-18-claude-code-best-practices-for-agentic-coding]]
- [[2026-04-06-how-and-when-to-use-subagents-in-claude-code]]
- [[2025-12-11-claude-code-power-user-customization-how-to-configure-hooks]]
- [[2025-11-13-skills-explained-how-skills-compares-to-prompts-projects-mcp-and-subagents]]
- [[2025-11-12-improving-frontend-design-through-skills]]
- [[2025-07-23-how-anthropic-teams-use-claude-code]]
