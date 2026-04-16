---
id: article-2026-04-16-the-anatomy-of-an-agent-harness
type: source
title: "The Anatomy of an Agent Harness"
path: raw/articles/langchain-blog/2026-04-16-the-anatomy-of-an-agent-harness.md
author: Vivek Trivedy
publisher: LangChain Blog
url: https://www.langchain.com/blog/the-anatomy-of-an-agent-harness
date_published: 2026-03-11
date_added: 2026-04-16
tags: [agents, harnesses, orchestration, tools, execution]
status: processed
quality: high
summary: Vivek Trivedy defines the harness as every part of an agent system that is not the model itself, including prompts, tools, infrastructure, orchestration logic, and deterministic hooks.
related: [agent-harnesses, agent-skills, agent-protocols, llm-agents]
---

# The Anatomy of an Agent Harness

## Source Metadata

- Path: raw/articles/langchain-blog/2026-04-16-the-anatomy-of-an-agent-harness.md
- Author: Vivek Trivedy
- Published: 2026-03-11
- Publisher: LangChain Blog
- URL: https://www.langchain.com/blog/the-anatomy-of-an-agent-harness

## TL;DR

This post defines the harness as everything around the model that turns model intelligence into useful work: prompts, tools, bundled infrastructure, orchestration, and hooks.

## Key Claims

- Agent = model + harness.
- A harness is every piece of code, configuration, and execution logic that is not the model itself.
- Raw models do not become useful agents without harness-level features like durable state, tools, feedback loops, and constraints.
- Desired agent behavior should be translated into explicit harness features rather than assumed to emerge from the model alone.

## Important Details

- The post lists system prompts, tools, skills/MCPs, bundled infrastructure, orchestration logic, and hooks or middleware as core harness components.
- It frames the model as fundamentally limited to consuming multimodal inputs and producing outputs, while the harness adds persistence, action, environment control, and runtime structure.
- It treats "chatting" itself as a simple harness pattern: a loop that tracks prior messages and appends new turns.
- The article's practical direction is to work backwards from desired behavior and encode the missing machinery in the harness.

## Entities

- People: Vivek Trivedy
- Organizations: LangChain
- Concepts: harnesses, orchestration logic, hooks, bundled infrastructure, persistent state
- Systems: system prompts, tools, MCPs, sandboxes, subagents, handoffs

## My Notes

- This is the cleanest definitional source in the KB for what a harness includes.
- It complements the Av1dlive guide by broadening "thin conductor" into a larger component inventory without losing the separation-of-concerns point.

## Open Questions

- Which harness components should stay inspectable and configurable versus being hidden inside frameworks?
- At what point does a "thin" harness stop being thin and become an opinionated platform?

## Related

- [[agent-harnesses]]
- [[agent-skills]]
- [[agent-protocols]]
- [[llm-agents]]

## Source Text

Not copied locally. Use the source URL above if the full text is needed.
