---
id: article-2026-04-12-berkeley-function-calling-leaderboard-v4
type: source
title: "Berkeley Function Calling Leaderboard v4"
path: raw/articles/github-repos/2026-04-12-berkeley-function-calling-leaderboard-v4.md
author: Gorilla LLM Team
publisher: GitHub and UC Berkeley
url: https://github.com/ShishirPatil/gorilla/tree/f7cf7359b7ac615a0b294831c5ba2bc95ee4a000/berkeley-function-call-leaderboard
date_published: 2026-04-12
date_added: 2026-07-27
tags: [agents, evals, tool-use, function-calling, benchmarks, bfcl]
status: active
quality: high
summary: The pinned BFCL implementation behind the April 2026 leaderboard spans single-turn, multi-turn, live, memory, web-search, abstention, parallel-call, and format-sensitivity evaluations.
related: [ai-agent-evals, benchmark-integrity, agent-tools]
---

# Berkeley Function Calling Leaderboard v4

## Source Metadata

- Path: raw/articles/github-repos/2026-04-12-berkeley-function-calling-leaderboard-v4.md
- Author: Gorilla LLM Team
- Published: 2026-04-12
- Publisher: GitHub and UC Berkeley
- Repository: https://github.com/ShishirPatil/gorilla
- Pinned implementation: https://github.com/ShishirPatil/gorilla/tree/f7cf7359b7ac615a0b294831c5ba2bc95ee4a000/berkeley-function-call-leaderboard
- Leaderboard: https://gorilla.cs.berkeley.edu/leaderboard
- Pinned commit: `f7cf7359b7ac615a0b294831c5ba2bc95ee4a000`
- Evaluator package shown by leaderboard: `2025.12.17`
- License: Apache-2.0

## TL;DR

The BFCL v4 implementation provides a wide tool-use test matrix rather than one aggregate function-call score. It separates single-turn structure, live data, multi-turn state, memory, web search, abstention, parallel calls, and format sensitivity, which makes category-level diagnosis more useful than leaderboard rank alone.

## Key Claims

- Function-calling capability is multidimensional and should be reported by category.
- Exact benchmark comparisons require the same code, dataset, evaluator, model endpoint, and prompting configuration.
- Irrelevance tests measure appropriate non-use of tools, not just call generation.
- Stateful multi-turn and memory tests expose different failure classes from isolated calls.
- Live-data tests improve realism but reduce reproducibility unless the environment is recorded.

## Important Details

- Top-level groups include agentic, multi-turn, single-turn, live/non-live, memory, and web search.
- Individual categories include simple calls in Python, Java, and JavaScript; parallel and multiple calls; irrelevance; live variants; missing-function and missing-parameter tasks; long context; key-value, vector, and recursive-summary memory; web-search variants; and format sensitivity.
- The public leaderboard reported its model runs against commit `f7cf735` and evaluator package `2025.12.17`.
- The leaderboard page was updated on 2026-04-12, while the pinned implementation commit dates to 2025-12-17.
- Scores should be cited with category and version, not copied as unqualified model facts.

## Entities

- Organization: UC Berkeley Gorilla LLM Team
- Benchmark: BFCL v4
- Categories: single turn, multi-turn, live, memory, web search, irrelevance, parallel calls, format sensitivity
- Artifacts: Gorilla repository, `bfcl-eval` package, public leaderboard

## My Notes

- The test taxonomy is the durable knowledge; model rankings will age quickly.
- A local agent eval suite can borrow the layered design: schema correctness, appropriate abstention, stateful workflows, memory, live dependencies, and end-to-end outcomes.
- Live tests should log environmental inputs so regressions can be separated from changed web/API state.

## Open Questions

- Are all public leaderboard rows rerun on exactly the same provider and evaluator conditions?
- How much of format sensitivity should be treated as model failure versus interface-adapter failure?
- Which BFCL categories correlate with τ-bench end-state reliability?

## Related

- [[ai-agent-evals]]
- [[benchmark-integrity]]
- [[agent-tools]]
- [[2025-07-13-berkeley-function-calling-leaderboard]]

## Source Text

Source capture is intentionally bounded to the pinned implementation, leaderboard metadata, and test taxonomy above. The complete Apache-2.0 implementation remains available at the pinned URL.
