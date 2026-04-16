---
id: concept-ai-agent-evals
type: concept
title: AI Agent Evals
tags: [evals, benchmarks, agents, web-agents, browser, computer-use]
source_count: 13
summary: AI agent evals measure full systems, including harnesses, tools, infrastructure, and adversarial conditions, rather than isolated model snapshots.
canonical_for: [agent evals, benchmark suites, agent benchmarks]
review_status: reviewed
last_reviewed: 2026-04-16
review_due: 2026-05-16
confidence: "0.87"
---

# AI Agent Evals

## Summary

AI agent evals measure full systems, not just model snapshots. Anthropic's engineering posts repeatedly show that harnesses, tools, infra, contamination, and grading design can all materially change the result. The newer additions broaden this from critique into concrete benchmark and framework coverage: agent evaluation now spans full-system harnesses, adversarial security environments, web-task benchmarks, and realistic computer-use setups with deterministic state-based checks.

## Core Components

- tasks and trials
- harnesses and scaffolds
- transcripts and outcomes
- graders and pass criteria
- infrastructure and runtime conditions

## Benchmark Families

- framework-level evaluation surfaces such as Inspect AI
- adversarial security suites such as AgentDojo
- web-environment benchmarks such as WebArena
- computer-use benchmarks such as OSWorld

## Common Failure Modes

- benchmark contamination
- eval awareness
- hidden infra variance
- task saturation
- unrealistic task design

## Practical Lessons

- Report harness and infra assumptions, not only scores.
- Expect benchmarks to stale as models improve.
- Prefer evals that reflect deployment conditions.
- Track what the system is actually optimizing for under a given setup.
- Prefer execution-based or state-based validators over action-trace matching or LLM-only judging when possible.
- For security-sensitive agents, measure utility under attack, not only benign success.

## Source Notes

- [[2026-01-09-demystifying-evals-for-ai-agents]]
- [[2026-01-21-designing-ai-resistant-technical-evaluations]]
- [[2026-03-06-eval-awareness-in-claude-opus-4-6-browsecomp-performance]]
- [[2026-04-09-quantifying-infrastructure-noise-in-agentic-coding-evals]]
- [[2025-01-06-raising-the-bar-on-swe-bench-verified-with-claude-3-5-sonnet]]
- [[2025-09-17-a-postmortem-of-three-recent-issues]]
- [[2026-04-10-inspect-ai]]
- [[2026-04-10-agentdojo-a-dynamic-environment-to-evaluate-prompt-injection-attacks-and-defenses-for-llm-agents]]
- [[2026-04-10-agentdojo]]
- [[2026-04-10-webarena-a-realistic-web-environment-for-building-autonomous-agents]]
- [[2026-04-10-webarena]]
- [[2026-04-10-osworld-benchmarking-multimodal-agents-for-open-ended-tasks-in-real-computer-environments]]
- [[2026-04-10-osworld]]
