---
id: summary-2026-04-10-mari-sources-to-add-now
type: summary
title: Mari Sources For A World-Class Agent
tags: [mari, agents, research, evals, memory]
---

# Mari Sources For A World-Class Agent

## Summary

After reviewing the `../mari` codebase and roadmap, the right additions split into two buckets:

- Phase 2: memory storage, retrieval, and compaction
- Phase 3: planner, executor, multi-turn loops, and handoff artifacts
- Phase 6: full-system evals, debugging, and hardening
- world-class agent capabilities: protocol interoperability, benchmark coverage, adversarial robustness, and real-environment evaluation

Mari is already well aligned with the KB's managed-agent architecture. What it needed most was not more Anthropic material, but a stronger supporting source set for implementation, evaluation, and long-term competitiveness.

## Why These Sources

### Context and runtime memory

- [[2025-07-18-context-engineering-for-ai-agents-lessons-from-building-manus]]
  - Best immediate non-Anthropic source for KV-cache discipline, append-only context, file-backed external memory, restorable compression, and long-loop attention management.
- [[2026-04-10-longllmlingua-accelerating-and-enhancing-llms-in-long-context-scenarios-via-prompt-compression]]
  - Useful for Mari's remaining compaction and token-budget work because it treats compression as salience management rather than blunt truncation.
- [[2026-04-10-memgpt-towards-llms-as-operating-systems]]
  - Helpful for the upcoming memory-storage phase because it frames extended-context behavior as memory-tier management.
- [[2026-04-10-letta]]
  - Practical implementation counterpart to MemGPT; useful as a stateful-agent reference, not just a paper concept.

### Planner, executor, and multi-turn runtime loops

- [[2026-04-10-react-synergizing-reasoning-and-acting-in-language-models]]
  - Foundational source for interleaving reasoning traces with actions, which fits Mari's planner/executor evolution better than adding another generic agent overview.
- [[2025-07-18-context-engineering-for-ai-agents-lessons-from-building-manus]]
  - Also matters here because it contains concrete loop-design advice about stable prefixes, tool masking, recitation, and keeping failures visible.

### Evals and hardening

- [[2026-04-10-inspect-ai]]
  - Best direct fit for Mari's eval framework work because it is an official, production-oriented evaluation framework with tool use, multi-turn dialogs, and model-graded evaluations.
- [[2026-04-10-agentdojo-a-dynamic-environment-to-evaluate-prompt-injection-attacks-and-defenses-for-llm-agents]]
  - Strong addition for enterprise hardening. Mari operates across channels with untrusted user inputs, so prompt injection and tool-safety coverage should be part of the eval story early, not late.

### Protocol and world-class benchmark coverage

- [[2026-04-10-model-context-protocol]]
  - Canonical protocol source for tool interoperability. Even if Mari does not adopt MCP immediately, world-class agents increasingly need clean integration boundaries with external tools and tool ecosystems.
- [[2026-04-10-agentdojo]]
  - Useful counterpart to the paper because it gives a concrete benchmark environment rather than only the abstract framing.
- [[2026-04-10-webarena-a-realistic-web-environment-for-building-autonomous-agents]]
  - Important benchmark paper for web-task agents and multi-step browser interaction.
- [[2026-04-10-webarena]]
  - Reference implementation for the benchmark environment itself.
- [[2026-04-10-osworld-benchmarking-multimodal-agents-for-open-ended-tasks-in-real-computer-environments]]
  - Strong benchmark for computer-use agents in realistic environments.
- [[2026-04-10-osworld]]
  - Practical companion to the paper; useful when comparing eval environment design choices.

## What To Use First

If the goal is to help Mari immediately, the best reading order is:

1. [[2025-07-18-context-engineering-for-ai-agents-lessons-from-building-manus]]
2. [[2026-04-10-inspect-ai]]
3. [[2026-04-10-react-synergizing-reasoning-and-acting-in-language-models]]
4. [[2026-04-10-longllmlingua-accelerating-and-enhancing-llms-in-long-context-scenarios-via-prompt-compression]]
5. [[2026-04-10-memgpt-towards-llms-as-operating-systems]]
6. [[2026-04-10-letta]]
7. [[2026-04-10-agentdojo-a-dynamic-environment-to-evaluate-prompt-injection-attacks-and-defenses-for-llm-agents]]

## What Makes Mari More World-Class

If the goal is to make Mari more world-class rather than only nearer-term productive, the most important additions are:

1. [[2026-04-10-model-context-protocol]]
2. [[2026-04-10-inspect-ai]]
3. [[2025-07-18-context-engineering-for-ai-agents-lessons-from-building-manus]]
4. [[2026-04-10-agentdojo-a-dynamic-environment-to-evaluate-prompt-injection-attacks-and-defenses-for-llm-agents]]
5. [[2026-04-10-webarena-a-realistic-web-environment-for-building-autonomous-agents]]
6. [[2026-04-10-osworld-benchmarking-multimodal-agents-for-open-ended-tasks-in-real-computer-environments]]
7. [[2026-04-10-memgpt-towards-llms-as-operating-systems]]
8. [[2026-04-10-react-synergizing-reasoning-and-acting-in-language-models]]

## Recommendation

For Mari specifically, the next KB work should not stop at implementation-oriented memory and runtime notes.

The best follow-up is:

- process the new source notes from `ingested` into sharper reviewed notes
- update [[managed-agents]], [[agent-memory]], [[ai-agent-evals]], and [[llm-agents]] with these new sources
- add one synthesis note specifically on benchmark strategy for enterprise agents
- add one synthesis note on protocol and tool-surface design once Mari's adapter layer expands

## Related

- [[managed-agents]]
- [[agent-memory]]
- [[ai-agent-evals]]
- [[context-engineering]]
- [[research-workflows]]
- [[2026-04-10-kb-acquisition-priorities]]
