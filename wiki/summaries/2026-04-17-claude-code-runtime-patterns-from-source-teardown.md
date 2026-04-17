---
id: summary-2026-04-17-claude-code-runtime-patterns-from-source-teardown
type: summary
title: Claude Code Runtime Patterns From A Source Teardown
tags: [claude-code, agent-harnesses, context-engineering, permissions, subagents]
summary: Reusable runtime-design patterns extracted from a Claude Code architecture teardown and cross-checked against adjacent Claude Code and context-engineering sources.
review_status: reviewed
last_reviewed: 2026-04-17
review_due: 2026-05-17
confidence: "0.8"
---

# Claude Code Runtime Patterns From A Source Teardown

## Summary

The teardown is most useful as pattern extraction, not as a canonical map of Claude Code internals. The durable ideas cluster around runtime design rather than prompt wording: use an evented loop, classify tool concurrency explicitly, keep cache-stable prompt prefixes intact, compact context in cheap-to-expensive stages, treat retry behavior as part of the loop state machine, and isolate delegated work behind clear boundaries.

## Patterns Worth Keeping

- Build the main loop as a streaming `async function*` so UI updates, cancellation, backpressure, and composition all share one abstraction.
- Separate read-only and mutating tools at the orchestration layer so safe parallelism does not create file or state races.
- Start tool execution as soon as the model has emitted enough structured input instead of waiting for the whole response when latency matters.
- Budget tool results before every model call and spill oversized outputs into durable artifacts with previews instead of dumping everything back into the hot path.
- Treat prompt caching as a layout problem: keep the most stable instructions high in the prefix and inject volatile context as late as possible.
- Use a compaction ladder rather than one summarization switch: micro-compaction first, then removal or snipping, then summarization or collapse only when necessary.
- Model retries should branch by error class instead of sharing one generic backoff wrapper.
- Keep subagents isolated by default and make coordination explicit through artifacts, task boundaries, or controlled message surfaces.

## What To Copy Carefully

- Exact retry thresholds, token ceilings, fallback-model choices, and cooldown durations are implementation details, not portable principles.
- The specific `CLAUDE.md` hierarchy and some prompt-cache boundary tactics are product choices that may not transfer directly to non-Claude systems.
- Git worktrees per subagent are especially useful for coding agents, but they are not a universal multi-agent requirement.
- Reverse-engineered teardown notes are valuable for pattern discovery but weaker than official documentation for claims about current product behavior.

## Best KB Fit

- `[[claude-code]]` for the overall operating-environment picture
- `[[agent-harnesses]]` for orchestration responsibilities and loop design
- `[[context-engineering]]` for cache stability, result budgeting, and compaction strategy
- `[[agent-security]]` for approval pipelines, hooks, and runtime enforcement
- `[[multi-agent-systems]]` and `[[managed-agents]]` for subagent isolation, delegation overhead, and durable coordination

## Open Questions

- Which of these patterns recur strongly enough across other agent stacks to deserve a dedicated concept page on runtime-loop design?
- How much of Claude Code's advantage comes from prompt design versus harness and infrastructure quality?
- Which parts of the teardown should be upgraded later with official Anthropic documentation or direct code references?

## Source Notes

- [[2026-04-17-claude-code-agent-complete-architecture-deep-dive-source-code-analysis]]
- [[2026-04-06-how-and-when-to-use-subagents-in-claude-code]]
- [[2025-12-11-claude-code-power-user-customization-how-to-configure-hooks]]
- [[2026-03-25-claude-code-auto-mode]]
- [[2026-04-09-context-compression-strategies]]
- [[2026-04-16-ai-agent-stack-builders-guide-av1dlive]]
