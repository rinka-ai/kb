---
id: article-2026-01-09-demystifying-evals-for-ai-agents
type: source
title: "Demystifying evals for AI agents"
author: Anthropic
publisher: Anthropic
url: https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents
date_published: 2026-01-09
date_added: 2026-04-09
tags: [evals, agents, harnesses, graders]
status: processed
quality: high
summary: Anthropic explains the structure of agent evals, including tasks, trials, graders, transcripts, outcomes, and harnesses, and argues that useful evaluations are essential for shipping agent systems safely and confidently.
related: [ai-agent-evals, harnesses, transcripts, grading]
---

# Demystifying evals for AI agents

## Source Metadata

- Author: Anthropic
- Published: 2026-01-09
- Publisher: Anthropic
- URL: https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents

## TL;DR

This post is a practical taxonomy of agent evaluation. It explains what eval components are and why evaluating agents is harder than evaluating simpler single-turn systems.

## Key Claims

- Good evals are essential for agent development, not optional overhead.
- Agent evals are harder because agents act over many turns and modify state.
- Teams need clear distinctions between transcripts, outcomes, graders, and harnesses.

## Important Details

- Anthropic defines tasks, trials, graders, transcripts, outcomes, eval harnesses, and agent harnesses.
- The post emphasizes repeated trials and environment-based grading.
- It treats eval design as a deployment discipline, not just a research exercise.

## Entities

- Concepts: tasks, trials, graders, transcripts, outcomes, eval harnesses
- Domain: agent evaluation

## My Notes

- This is one of the best import candidates for a baseline eval vocabulary page.

## Open Questions

- Which of these evaluation primitives should become explicit objects in our KB?

## Related

- [[ai-agent-evals]]
- [[harnesses]]
- [[benchmarking]]

## Source Text

Not copied locally. Use the source URL above if the full text is needed.
