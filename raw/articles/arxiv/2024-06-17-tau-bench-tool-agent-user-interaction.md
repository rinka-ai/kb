---
id: article-2024-06-17-tau-bench-tool-agent-user-interaction
type: source
title: "τ-bench: A Benchmark for Tool-Agent-User Interaction in Real-World Domains"
path: raw/articles/arxiv/2024-06-17-tau-bench-tool-agent-user-interaction.md
author: Shunyu Yao, Noah Shinn, Pedram Razavi, Karthik Narasimhan
publisher: arXiv.org
url: https://arxiv.org/abs/2406.12045
date_published: 2024-06-17
date_added: 2026-07-27
tags: [agents, evals, tool-use, benchmarks, tau-bench, user-simulation]
status: active
quality: high
summary: τ-bench evaluates tool-using agents in policy-constrained, multi-turn conversations by scoring the resulting environment state and measuring repeated-run reliability with pass^k.
related: [ai-agent-evals, benchmark-integrity, agent-tools, workflows]
---

# τ-bench: A Benchmark for Tool-Agent-User Interaction in Real-World Domains

## Source Metadata

- Path: raw/articles/arxiv/2024-06-17-tau-bench-tool-agent-user-interaction.md
- Authors: Shunyu Yao, Noah Shinn, Pedram Razavi, Karthik Narasimhan
- Published: 2024-06-17
- Publisher: arXiv.org
- URL: https://arxiv.org/abs/2406.12045
- PDF: https://arxiv.org/pdf/2406.12045

## TL;DR

τ-bench tests whether an agent can converse with a simulated user, follow domain policies, call APIs, and leave the environment in the correct final state. It also introduces pass^k to expose reliability decay across repeated trials, which is more operationally meaningful than a single successful run.

## Key Claims

- Realistic tool-agent evaluation requires dynamic interaction with both a user and an environment.
- Domain policies constrain which actions are valid even when an API call is technically possible.
- Final-state comparison can credit alternate valid action sequences instead of overfitting evaluation to one reference trajectory.
- Repeated-run reliability should be measured explicitly; pass^k captures the chance that all k trials succeed.
- The original experiments reported low absolute success and sharp consistency degradation across repeated runs.

## Important Details

- The benchmark combines domain databases, API tools, policy documents, user goals, and a user simulator.
- The initial domains model airline and retail customer-service tasks.
- Task success compares the final database state against a goal state and can include communication constraints.
- A model can fail by violating policy, calling the wrong tool, mutating the wrong records, or communicating an incorrect result.
- The benchmark's value is diagnostic only when simulator behavior, grading assumptions, and task validity are also audited.

## Entities

- People: Shunyu Yao, Noah Shinn, Pedram Razavi, Karthik Narasimhan
- Benchmark: τ-bench
- Domains: airline, retail
- Concepts: tool use, user simulation, policy compliance, end-state grading, pass^k

## My Notes

- τ-bench is a stronger fit for production-agent thinking than one-shot function-call accuracy because it combines policy, dialogue, tools, and side effects.
- End-state grading is a good default where multiple correct trajectories exist, but it can miss unsafe intermediate actions unless traces and policy violations are scored separately.
- pass^k should be interpreted as consistency under repeated sampling, not merely a harder version of pass@k.

## Open Questions

- How sensitive are results to the user simulator model and prompt?
- Which unsafe intermediate actions can still lead to a correct final state?
- How well do benchmark policies match the ambiguity and exceptions in real operations?

## Related

- [[ai-agent-evals]]
- [[benchmark-integrity]]
- [[agent-tools]]
- [[workflows]]
- [[2026-07-22-tau2-bench-v1-0-1]]

## Source Text

The full paper was not copied locally. Use the arXiv abstract and PDF links above for the canonical text.
