---
id: concept-computer-use
type: concept
title: Computer-Use Agents
tags: [computer-use, multimodal-agents, agents, gui, benchmarks]
source_count: 3
summary: Computer-use agents extend web agents into full operating-system environments, where grounding, application knowledge, and multi-app coordination become first-class problems.
canonical_for: [computer use, computer-use agents, gui agents, desktop agents]
review_status: reviewed
last_reviewed: 2026-05-20
review_due: 2026-06-20
confidence: "0.79"
---

# Computer-Use Agents

## Summary

Computer-use agents operate across full OS environments instead of only inside a browser tab. That adds GUI grounding, local files, desktop apps, popups, CLI surfaces, and cross-application workflows, making real-world task execution much harder than web-only automation. Hermes adds a practical runtime example: desktop control can be exposed as an MCP toolset inside a broader agent harness, but platform-specific drivers and OS-level safety constraints remain load-bearing.

## What Changes Versus Web Agents

- the environment includes arbitrary apps, windows, files, and system UI
- the agent must ground actions in screenshots, accessibility trees, or both
- tasks can span multiple applications and interface styles
- benchmark setup and evaluation become much more infrastructure-heavy
- production implementations also need to decide whether desktop control steals focus, moves cursors, changes spaces, or operates through background/window-targeted APIs

## Practical Lessons

- multi-app workflows are a stronger test of generality than single-app tasks
- execution-based validators are essential because many action traces are valid
- GUI grounding and operational knowledge are still major capability gaps
- environment packaging and reproducibility are part of benchmark credibility
- private or platform-specific desktop APIs can unlock better UX but create fragility and portability risk
- computer-use tools should inherit the agent runtime's approval, sandboxing, and credential boundaries instead of becoming a parallel action surface

## Source Notes

- [[2026-04-10-osworld-benchmarking-multimodal-agents-for-open-ended-tasks-in-real-computer-environments]]
- [[2026-04-10-osworld]]
- [[2026-05-20-hermes-agent]]
