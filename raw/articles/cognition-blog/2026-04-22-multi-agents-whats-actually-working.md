---
id: article-2026-04-22-multi-agents-whats-actually-working
type: source
title: "Multi-Agents: What's Actually Working"
path: raw/articles/cognition-blog/2026-04-22-multi-agents-whats-actually-working.md
author: Walden Yan
publisher: Cognition
url: https://cognition.ai/blog/multi-agents-working
date_published: 2026-04-22
date_added: 2026-04-23
tags: [agents, multi-agent, context-engineering, parallel-agents, agentic-coding, model-routing]
status: processed
quality: high
summary: "Walden Yan argues that multi-agent systems now work in production in a narrower form: additional agents contribute review, routing, and management intelligence while writes stay single-threaded."
related: [multi-agent-systems, context-engineering, managed-agents, agent-harnesses, resolvers]
---

# Multi-Agents: What's Actually Working

## Source Metadata

- Path: raw/articles/cognition-blog/2026-04-22-multi-agents-whats-actually-working.md
- Author: Walden Yan
- Published: 2026-04-22
- Publisher: Cognition
- URL: https://cognition.ai/blog/multi-agents-working

## TL;DR

Walden Yan updates his earlier anti-swarm stance with a narrower production claim: multi-agent systems now work in practice when additional agents contribute intelligence around a single active writer, especially through clean-context review loops, stronger-model consultation, and manager-child delegation with explicit synthesis.

## Key Claims

- The core caution from the earlier "Don't Build Multi-Agents" post still holds for parallel-writer swarms: write actions encode implicit decisions that fragment style, edge-case handling, and implementation choices.
- The current production sweet spot is not arbitrary parallel collaboration but setups where writes stay single-threaded while additional agents contribute review, routing, search, or management intelligence.
- Clean-context generator-verifier loops can materially improve coding outcomes because a reviewer with a fresh context can detect bugs and security issues that the coding agent misses.
- A "smart friend" architecture, where a primary model calls a stronger model for help on harder cases, can work today when both models are strong, but reliable escalation and context transfer remain open problems.
- Higher-level delegation can extend this one-writer pattern: a manager agent can decompose and coordinate child agents, but coherence depends on explicit communication and synthesis rather than unstructured swarms.

## Important Details

- The post reaffirms two context-engineering rules from the earlier essay: share as much context as possible, and treat write actions as bundles of implicit decisions that do not compose cleanly in parallel.
- Cognition says most deployed multi-agent setups are still effectively read-only subagents, such as web-search or code-search helpers, because they look more like tool calls than true collaborative co-authors.
- Yan reports that Devin Review catches an average of 2 bugs per Devin-authored PR, with roughly 58% of those bugs categorized as severe.
- The review loop works best when the reviewer does not inherit the coding agent's working context. The reviewer sees the diff, re-derives missing context from the code, and avoids the attention degradation associated with very long contexts.
- The post ties this result to context rot: long working contexts dilute attention, while a shorter review context can improve detection of nuanced issues.
- The bridge between coder and reviewer matters as much as the separation itself. The coding agent must filter returned findings against user instructions and task scope to avoid loops and out-of-scope changes.
- In the "smart friend" pattern, the main communication failures are calibration and handoff shape: the weaker model may not know when to escalate, what question to ask, or how much context to send.
- Cognition says the most practical 80/20 handoff for smart friend today is often a fork of the primary agent's full context, plus broad questions that let the stronger model decide what matters.
- Smart friend worked poorly when the primary model was too weak, but worked better across frontier-model pairings where routing becomes a capability-selection problem rather than only a difficulty-escalation problem.
- For larger delegated work, Cognition describes a manager Devin coordinating child Devins over an internal MCP. The main failures were over-prescriptive managers, mistaken assumptions about shared state, and weak default cross-agent communication.
- Yan argues that unstructured swarms are mostly a distraction and that the practical shape is "map-reduce-and-manage": a manager splits work, children execute, and the manager synthesizes and reports back.

## Entities

- People: Walden Yan
- Companies: Cognition, Anthropic, OpenAI
- Products and Models: Devin, Devin Review, Windsurf, SWE-1.5, SWE-1.6, Claude, GPT, Sonnet 4.5, Opus-class models, Mythos
- Concepts: context engineering, context rot, generator-verifier loops, smart friend, capability routing, manager-child delegation, internal MCP, single-threaded writes, map-reduce-and-manage

## My Notes

- This is a strong source for moving the KB's multi-agent coverage from generic caution into concrete production patterns and failure modes.
- The most reusable synthesis is "many minds, one writer": additional agents help most when they sharpen judgment rather than competing to mutate the same decision surface.
- It pairs well with Anthropic's subagent and harness posts, but adds sharper production evidence for clean-context review loops and model-routing as communication problems.

## Open Questions

- Should [[multi-agent-systems]] explicitly center single-writer architectures as the current production default for coding-heavy work?
- Does the "smart friend" pattern deserve a sub-pattern under [[resolvers]] or a future model-routing concept page?
- How much of the clean-context reviewer gain comes from shorter context alone versus backward reasoning from the implementation without the original spec?
- Where should manager-child orchestration boundaries live between [[multi-agent-systems]], [[managed-agents]], and [[agent-harnesses]]?

## Related

- [[multi-agent-systems]]
- [[context-engineering]]
- [[agent-harnesses]]
- [[managed-agents]]
- [[resolvers]]

## Source Text

Not copied locally. Use the source URL above if the full text is needed.
