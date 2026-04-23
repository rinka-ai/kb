---
id: article-2026-04-23-recursive-language-models
type: source
title: "Recursive Language Models"
path: raw/articles/arxiv/2026-04-23-recursive-language-models.md
author: "Alex L. Zhang, Tim Kraska, Omar Khattab"
publisher: arXiv.org
url: https://arxiv.org/abs/2512.24601
date_published: 2025-12-31
date_added: 2026-04-23
tags: [agents, long-context, context-engineering, inference-time-scaling, tool-use]
status: processed
quality: high
summary: Recursive Language Models treat long prompts as external REPL state, letting an LLM inspect, transform, and recursively query slices instead of loading the whole input into active context.
related: [llm-agents, context-engineering, context-rot, long-context]
---

# Recursive Language Models

## Source Metadata

- Path: raw/articles/arxiv/2026-04-23-recursive-language-models.md
- Author: Alex L. Zhang, Tim Kraska, Omar Khattab
- Published: 2025-12-31
- Revised: 2026-01-28
- Publisher: arXiv.org
- URL: https://arxiv.org/abs/2512.24601
- Code: https://github.com/alexzhang13/rlm

## TL;DR

Recursive Language Models externalize a long prompt into a persistent REPL environment, give the root model symbolic handles and metadata instead of the whole prompt, and let it write code that inspects slices, launches recursive model calls, stores intermediate variables, and returns a final value.

## Key Claims

- Long-context difficulty depends on task complexity, not only token count; simple needle-style retrieval can hide failures that appear in dense aggregation and pairwise reasoning tasks.
- Keeping the prompt as external REPL state avoids polluting the root model context with the entire input.
- Programmatic recursion lets the model launch many sub-calls over generated slices or transformations instead of verbally enumerating a small number of sub-agent tasks.
- The paper reports stronger performance than base models, CodeAct-style agents, BM25-backed agents, and summary agents across CodeQA, BrowseComp-Plus, OOLONG, and OOLONG-Pairs.
- REPL access alone is useful for scaling past the context limit, while recursive sub-calls matter most for information-dense semantic transformation.
- A small fine-tuning run on RLM trajectories improves Qwen3-8B in the RLM scaffold, suggesting native recursive behavior may be trainable.

## Important Details

- The root model sees constant-size metadata about the prompt and stdout rather than the full prompt.
- Intermediate state lives in the REPL as variables, so the scaffold can preserve long strings and return long outputs without autoregressively fitting everything in one model context.
- Experiments use GPT-5, Qwen3-Coder-480B-A35B, and Qwen3-8B variants, with GPT-5-mini used for recursive sub-calls in the GPT-5 setup.
- Baselines include direct model calls, CodeAct with BM25, CodeAct with sub-calls, summary agents, and an RLM ablation without sub-calls.
- The authors emphasize that the implementation uses synchronous Python REPL calls and a max recursion depth of one; sandboxing, asynchronous calls, and deeper recursion remain open engineering questions.
- Cost is comparable or sometimes lower at the median, but trajectory length creates high variance and long-tail cost/runtime risk.

## Entities

- Authors: Alex L. Zhang, Tim Kraska, Omar Khattab
- Organizations: MIT OASYS, MIT DSG
- Code: alexzhang13/rlm
- Models: GPT-5, GPT-5-mini, Qwen3-Coder-480B-A35B, Qwen3-8B
- Benchmarks: S-NIAH, BrowseComp-Plus, OOLONG, OOLONG-Pairs, LongBench-v2 CodeQA
- Concepts: recursive language models, externalized context, REPL state, programmatic sub-calls, inference-time scaling, context rot

## My Notes

- This is worth keeping as a primary source for the externalized-context branch of context engineering.
- The main contribution is the environment-and-recursion abstraction, not a literal proof that context has become free or unlimited.
- It complements LongLLMLingua and MemAgent: LongLLMLingua compresses question-relevant prompt content, MemAgent trains fixed-length internal memory, and RLMs externalize raw prompt state into an inspectable execution environment.
- It is especially relevant to resolver and skill-routing systems: an RLM-style loop could inspect a large capability corpus, test routing coverage, and propose trigger updates without stuffing every skill into always-on context.
- Treat the results as promising but still preprint-level; follow-up reproduction and selection-method papers should be tracked before treating RLMs as a default architecture.

## Open Questions

- When is an RLM materially better than simpler retrieval, batching, or map-reduce scaffolds?
- How should production systems sandbox REPL execution when prompt data or generated code is untrusted?
- What policy should choose between direct model calls, RLM mode, retrieval mode, and summary mode?
- How much of the gain comes from recursion itself versus better programmatic search and selection over external state?
- Can resolver maintenance and context-rot repair be evaluated with a similar task-complexity lens?

## Related

- [[context-engineering]]
- [[context-rot]]
- [[llm-agents]]
- [[2026-04-10-longllmlingua-accelerating-and-enhancing-llms-in-long-context-scenarios-via-prompt-compression]]
- [[2026-04-12-memagent-reshaping-long-context-llm-with-multi-conv-rl-based-memory-agent]]
- [[2026-04-16-externalization-in-llm-agents-a-unified-review-of-memory-skills-protocols-and-harness-engineering]]
- [[2026-04-16-resolvers-the-routing-table-for-intelligence]]

## Source Text

Not copied locally. Use the source URL above if the full text is needed.
