---
id: article-2025-07-13-berkeley-function-calling-leaderboard
type: source
title: "The Berkeley Function Calling Leaderboard: From Tool Use to Agentic Evaluation of Large Language Models"
path: raw/articles/academic-papers/2025-07-13-berkeley-function-calling-leaderboard.md
author: Shishir G. Patil, Huanzhi Mao, Fanjia Yan, Charlie Cheng-Jie Ji, Vishnu Suresh, Ion Stoica, Joseph E. Gonzalez
publisher: Proceedings of Machine Learning Research
url: https://proceedings.mlr.press/v267/patil25a.html
date_published: 2025-07-13
date_added: 2026-07-27
tags: [agents, evals, tool-use, function-calling, benchmarks, bfcl, papers]
status: active
quality: high
summary: The BFCL paper defines a broad function-calling and agentic evaluation suite covering executable call correctness, parallel and multilingual calls, abstention, stateful multi-turn tasks, memory, and long-horizon failure modes.
related: [ai-agent-evals, benchmark-integrity, agent-tools, llm-agents]
---

# The Berkeley Function Calling Leaderboard: From Tool Use to Agentic Evaluation of Large Language Models

## Source Metadata

- Path: raw/articles/academic-papers/2025-07-13-berkeley-function-calling-leaderboard.md
- Authors: Shishir G. Patil, Huanzhi Mao, Fanjia Yan, Charlie Cheng-Jie Ji, Vishnu Suresh, Ion Stoica, Joseph E. Gonzalez
- Published: 2025-07-13
- Publisher: Proceedings of Machine Learning Research, volume 267
- Venue: ICML 2025
- URL: https://proceedings.mlr.press/v267/patil25a.html
- PDF: https://raw.githubusercontent.com/mlresearch/v267/main/assets/patil25a/patil25a.pdf

## TL;DR

BFCL moves tool-use evaluation beyond simple syntax matching. It checks whether generated calls are structurally and executably correct across languages, parallel calls, relevance/abstention, stateful multi-turn interactions, memory, and web-oriented tasks. The paper also shows that function calling remains brittle under long horizons and changing state.

## Key Claims

- Tool-use evaluation should test executable function-call correctness rather than rely only on string matching.
- A useful suite must cover serial and parallel calls, multiple programming languages, relevance detection, and abstention.
- Stateful multi-turn tasks expose failures that single-turn tests hide.
- Memory, dynamic environments, and long-horizon composition remain major weaknesses.
- Test data should mix expert-authored and user-contributed functions while protecting benchmark integrity.

## Important Details

- BFCL uses abstract-syntax-tree-oriented evaluation for structured function calls.
- The suite includes single-turn, multi-turn, live, memory, and agentic categories.
- Irrelevance cases measure whether a model avoids calling tools when none applies.
- Stateful evaluation checks how models update arguments and choose tools as the conversation and environment change.
- Leaderboard results are meaningful only relative to a fixed dataset and evaluator version.

## Entities

- People: Shishir G. Patil, Huanzhi Mao, Fanjia Yan, Charlie Cheng-Jie Ji, Vishnu Suresh, Ion Stoica, Joseph E. Gonzalez
- Institutions: University of California, Berkeley
- Benchmark: Berkeley Function Calling Leaderboard
- Concepts: function calling, AST evaluation, abstention, parallel calls, multi-turn state, memory

## My Notes

- BFCL complements τ-bench: BFCL gives deep coverage of the tool-call surface, while τ-bench emphasizes policy-constrained user/environment interaction and final state.
- A production eval portfolio needs both. Passing call-structure tests does not establish policy compliance or safe side effects; end-state success does not prove well-formed tool behavior at every step.
- “Live” leaderboard status should never be treated as a timeless fact; the code/data pin belongs next to any quoted score.

## Open Questions

- How much leaderboard variance comes from prompt templates and provider-specific tool schemas?
- Which categories best predict production failures rather than benchmark-specific formatting errors?
- How should long-horizon tasks distinguish model reasoning failure from tool or environment nondeterminism?

## Related

- [[ai-agent-evals]]
- [[benchmark-integrity]]
- [[agent-tools]]
- [[llm-agents]]
- [[2026-04-12-berkeley-function-calling-leaderboard-v4]]

## Source Text

The full paper was not copied locally. Use the PMLR landing page and PDF above for the canonical text.
