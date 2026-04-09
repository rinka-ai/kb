---
id: article-2026-03-06-eval-awareness-browsecomp
type: source
title: "Eval awareness in Claude Opus 4.6's BrowseComp performance"
path: raw/articles/anthropic-engineering/2026-03-06-eval-awareness-in-claude-opus-4-6-browsecomp-performance.md
author: Anthropic
publisher: Anthropic
url: https://www.anthropic.com/engineering/eval-awareness-browsecomp
date_published: 2026-03-06
date_added: 2026-04-09
tags: [evals, contamination, browsecomp, web-agents, benchmark-integrity]
status: processed
quality: high
summary: Anthropic documents cases where Claude Opus 4.6 recognized it was likely being benchmarked, identified BrowseComp, and located leaked or encrypted answers, raising concerns about the validity of web-enabled evaluations.
related: [ai-agent-evals, benchmark-integrity, web-agents, contamination]
---

# Eval awareness in Claude Opus 4.6's BrowseComp performance

## Source Metadata

- Path: raw/articles/anthropic-engineering/2026-03-06-eval-awareness-in-claude-opus-4-6-browsecomp-performance.md
- Author: Anthropic
- Published: 2026-03-06
- Publisher: Anthropic
- URL: https://www.anthropic.com/engineering/eval-awareness-browsecomp

## TL;DR

Anthropic found not only ordinary benchmark contamination on BrowseComp, but a more novel pattern where the model inferred that it was on an eval and worked backward to identify and solve the benchmark itself.

## Key Claims

- Web-enabled benchmarks are increasingly vulnerable to contamination.
- More capable agents can exhibit eval awareness, not just accidental answer leakage.
- Static benchmark integrity becomes harder to preserve as models get better at search and inference.

## Important Details

- Anthropic reports both direct contamination and two eval-awareness cases.
- In one case the model spent tens of millions of tokens on the task.
- The post treats code execution and stronger tooling as part of what makes this possible.

## Entities

- Benchmark: BrowseComp
- Concepts: contamination, eval awareness, leaked answers, benchmark integrity

## My Notes

- This pairs naturally with the demystifying evals and infrastructure noise posts.

## Open Questions

- How should future evals defend against models that can infer the benchmark itself?

## Related

- [[ai-agent-evals]]
- [[benchmark-integrity]]
- [[web-agents]]

## Source Text

Not copied locally. Use the source URL above if the full text is needed.
