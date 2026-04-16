---
id: summary-2026-04-10-kb-acquisition-priorities
type: summary
title: KB Acquisition Priorities
tags: [knowledge-base, research, agents, acquisition]
summary: Audit of the KB’s strongest clusters, weakest provenance gaps, and the next sources that most improve coverage.
review_status: reviewed
last_reviewed: 2026-04-16
review_due: 2026-05-16
confidence: "0.8"
---

# KB Acquisition Priorities

## Summary

The current KB is strongest on Anthropic's view of agent systems, the imported `momo-research` memory/context notes, and a newer cluster of voice-AI product documentation. It is weaker on primary academic papers, benchmark source repos, protocol specs, open-source agent implementations, and non-Anthropic design viewpoints.

This means the next gains should come less from adding more same-shape notes and more from triangulating the existing concepts with:

- primary papers behind ideas already summarized here
- benchmark repos and eval harnesses
- official protocol and framework repos
- recent non-Anthropic engineering writeups

## Status Update

Several of the top-priority additions from this audit have now been added to the KB:

- [[2025-07-18-context-engineering-for-ai-agents-lessons-from-building-manus]]
- [[2026-04-10-inspect-ai]]
- [[2026-04-10-memgpt-towards-llms-as-operating-systems]]
- [[2026-04-10-letta]]
- [[2026-04-10-longllmlingua-accelerating-and-enhancing-llms-in-long-context-scenarios-via-prompt-compression]]
- [[2026-04-10-agentdojo-a-dynamic-environment-to-evaluate-prompt-injection-attacks-and-defenses-for-llm-agents]]
- [[2026-04-10-agentdojo]]
- [[2026-04-10-webarena-a-realistic-web-environment-for-building-autonomous-agents]]
- [[2026-04-10-webarena]]
- [[2026-04-10-osworld-benchmarking-multimodal-agents-for-open-ended-tasks-in-real-computer-environments]]
- [[2026-04-10-osworld]]
- [[2026-04-10-model-context-protocol]]

## Current Coverage

- The KB currently contains 59 source notes, 10 concept notes, and 5 index notes.
- Publisher concentration is high: 22 source notes from Anthropic, 8 from Claude, and 11 imported `GitHub` notes from `momo-research`.
- The strongest concept clusters are [[context-engineering]], [[agent-memory]], [[ai-agent-evals]], and [[voice-ai]].
- The thinnest concepts are [[obsidian]], [[research-workflows]], [[managed-agents]], and [[llm-agents]].
- Frequent uncovered tags include `mcp`, `agentic-coding`, `multi-agent`, `security`, `skills`, and `subagents`.

## What Is Missing

### 1. Primary sources behind existing summaries

Several `momo-research` imports already mention specific papers, but the original papers are not yet in the KB. That creates a provenance gap: the KB often preserves the secondary interpretation without the source-of-truth document.

Most obvious examples:

- [[2026-04-09-longllmlingua]]
- [[2026-04-09-memagent]]
- [[2026-04-09-mem1]]
- [[2026-04-09-gam-vs-context-rot]]

### 2. Benchmark and eval ecosystems

[[ai-agent-evals]] is currently strong on Anthropic's critique of evals, contamination, and infra noise, but weak on the benchmark artifacts themselves. The KB should include the benchmark papers and official repos, not only commentary about them.

### 3. Protocol and framework ground truth

`mcp` is one of the most frequent uncovered tags, but the KB does not yet contain the official MCP specification repo. The same pattern appears for agent frameworks and eval harnesses: the KB talks about these systems more than it stores the canonical repos and docs for them.

### 4. Cross-vendor engineering viewpoints

For agent architecture and context engineering, Anthropic currently dominates the corpus. The highest-value balancing additions are strong recent sources from Manus, OpenAI, Google, and open-source agent teams.

## Highest-Priority Additions

| Priority | Add | Type | Why it improves the KB | Best fit |
| --- | --- | --- | --- | --- |
| 1 | [modelcontextprotocol/modelcontextprotocol](https://github.com/modelcontextprotocol/modelcontextprotocol) | repo/spec | Canonical MCP specification and documentation; closes the biggest `mcp` provenance gap immediately. | `mcp`, `tool-use`, `protocols` |
| 2 | [Context Engineering for AI Agents: Lessons from Building Manus](https://manus.im/blog/Context-Engineering-for-AI-Agents-Lessons-from-Building-Manus) | engineering source | Strong non-Anthropic systems writeup that directly complements [[context-engineering]] and [[managed-agents]]. | `context-engineering`, `agents`, `sessions` |
| 3 | [Inspect AI](https://github.com/UKGovernmentBEIS/inspect_ai) | repo | Production-grade eval framework with built-in tool-use, multi-turn, and model-graded evaluation patterns. | `evals`, `harnesses`, `tool-use` |
| 4 | [SWE-bench paper](https://arxiv.org/abs/2310.06770) and [SWE-bench repo](https://github.com/SWE-bench/SWE-bench) | paper + repo | Gives [[ai-agent-evals]] the benchmark primary source that underlies several existing notes. | `evals`, `agentic-coding`, `benchmarks` |
| 5 | [AgentDojo paper](https://arxiv.org/abs/2406.13352) and [agentdojo repo](https://github.com/ethz-spylab/agentdojo) | paper + repo | Fills the current security blind spot with a benchmark specifically for prompt injection and agent defenses. | `security`, `prompt-injection`, `tool-use` |
| 6 | [WebArena paper](https://arxiv.org/abs/2307.13854) and [webarena repo](https://github.com/web-arena-x/webarena) | paper + repo | Important benchmark for web agents; broadens eval coverage beyond coding and Anthropic commentary. | `web-agents`, `benchmarks`, `llm-agents` |
| 7 | [OSWorld paper](https://arxiv.org/abs/2404.07972) and [OSWorld repo](https://github.com/xlang-ai/OSWorld) | paper + repo | Adds strong coverage for real computer-use agents across desktop and web workflows. | `computer-use`, `multimodal-agents`, `evals` |
| 8 | [MemGPT paper](https://arxiv.org/abs/2310.08560) and [letta-ai/letta](https://github.com/letta-ai/letta) | paper + repo | High-value primary source for memory-tier design and long-lived agents; directly strengthens [[agent-memory]]. | `agent-memory`, `memory`, `stateful-agents` |
| 9 | [LongLLMLingua paper](https://arxiv.org/abs/2310.06839) | paper | Converts an existing secondary note into a provenance-backed primary source. | `long-context`, `compression`, `retrieval` |

## Strong Second Wave

These are not as urgent as the items above, but they would materially improve the KB once the core gaps are covered.

- [ReAct: Synergizing Reasoning and Acting in Language Models](https://arxiv.org/abs/2210.03629)
  - Foundational paper for tool-using agents and action/reasoning interleaving.
- [Toolformer: Language Models Can Teach Themselves to Use Tools](https://arxiv.org/abs/2302.04761)
  - Foundational paper for tool-selection and API-use framing.
- [OpenHands/OpenHands](https://github.com/OpenHands/OpenHands)
  - Strong practical reference repo for autonomous software development agents.
- [langchain-ai/langgraph](https://github.com/langchain-ai/langgraph)
  - Useful implementation counterweight for graph-structured and resumable agent workflows.
- [openai/openai-agents-python](https://github.com/openai/openai-agents-python)
  - Good cross-vendor reference for multi-agent workflow abstractions.
- [google/adk-python](https://github.com/google/adk-python)
  - Helpful for comparing agent framework assumptions across vendors.
- [microsoft/graphrag](https://github.com/microsoft/graphrag)
  - Valuable if retrieval and knowledge-graph-backed synthesis become a larger KB theme.
- [stanfordnlp/dspy](https://github.com/stanfordnlp/dspy)
  - Useful if the KB expands from agent systems into compiled prompt/program optimization.
- [Wide Research: Beyond the Context Window](https://manus.im/blog/manus-wide-research-solve-context-problem)
  - Good follow-on Manus source for breadth-first research and scaling beyond single-context workflows.

## Suggested Ingest Order

If the goal is to improve the KB fastest without adding too much noise, ingest in this order:

1. MCP official spec repo
2. Manus context engineering post
3. Inspect AI
4. SWE-bench paper and repo
5. AgentDojo paper and repo
6. OSWorld paper and repo
7. MemGPT paper and Letta repo
8. LongLLMLingua paper
9. WebArena paper and repo
10. OpenHands, LangGraph, OpenAI Agents SDK, Google ADK

## Recommendation

The best immediate move is not to expand `voice-ai` further. That part of the KB is already denser and more balanced than the agent-systems side.

The biggest compounding win is to strengthen the existing agent concepts with:

- one protocol source of truth
- one strong non-Anthropic engineering lineage
- one eval framework
- three to four benchmark primary sources
- two memory/context primary papers

That would make the KB much more trustworthy, more reusable for future synthesis, and less dependent on any single organization's framing.

## Related

- [[context-engineering]]
- [[agent-memory]]
- [[ai-agent-evals]]
- [[llm-agents]]
- [[managed-agents]]
- [[research-workflows]]
- [[kb-system]]
