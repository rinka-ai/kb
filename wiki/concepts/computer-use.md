---
id: concept-computer-use
type: concept
title: Computer-Use Agents
tags: [computer-use, multimodal-agents, agents, gui, benchmarks]
source_count: 2
summary: Computer-use agents extend web agents into full operating-system environments, where grounding, application knowledge, and multi-app coordination become first-class problems.
canonical_for: [computer use, computer-use agents, gui agents, desktop agents]
review_status: reviewed
last_reviewed: 2026-04-16
review_due: 2026-05-16
confidence: "0.79"
---

# Computer-Use Agents

## Summary

Computer-use agents operate across full OS environments instead of only inside a browser tab. That adds GUI grounding, local files, desktop apps, popups, CLI surfaces, and cross-application workflows, making real-world task execution much harder than web-only automation.

## What Changes Versus Web Agents

- the environment includes arbitrary apps, windows, files, and system UI
- the agent must ground actions in screenshots, accessibility trees, or both
- tasks can span multiple applications and interface styles
- benchmark setup and evaluation become much more infrastructure-heavy

## Practical Lessons

- multi-app workflows are a stronger test of generality than single-app tasks
- execution-based validators are essential because many action traces are valid
- GUI grounding and operational knowledge are still major capability gaps
- environment packaging and reproducibility are part of benchmark credibility

## Source Notes

- [[2026-04-10-osworld-benchmarking-multimodal-agents-for-open-ended-tasks-in-real-computer-environments]]
- [[2026-04-10-osworld]]
