---
id: article-2026-04-12-memagent-reshaping-long-context-llm-with-multi-conv-rl-based-memory-agent
type: source
title: "MemAgent: Reshaping Long-Context LLM with Multi-Conv RL-based Memory Agent"
path: raw/articles/arxiv/2026-04-12-memagent-reshaping-long-context-llm-with-multi-conv-rl-based-memory-agent.md
author: "Hongli Yu, Tinghong Chen, Jiangtao Feng, Jiangjie Chen, Weinan Dai, Qiying Yu, Ya-Qin Zhang, Wei-Ying Ma, Jingjing Liu, Mingxuan Wang, Hao Zhou"
publisher: arXiv.org
url: https://arxiv.org/abs/2507.02259
date_published: 2025-07-03
date_added: 2026-04-12
tags: [agent-memory, long-context, reinforcement-learning, memory-efficiency]
status: processed
quality: high
summary: MemAgent learns a fixed-length memory-update policy for long-text processing, enabling strong extrapolation to very long contexts with linear complexity.
related: [agent-memory, long-context, reinforcement-learning, memory-efficiency]
---

# MemAgent: Reshaping Long-Context LLM with Multi-Conv RL-based Memory Agent

## Source Metadata

- Path: raw/articles/arxiv/2026-04-12-memagent-reshaping-long-context-llm-with-multi-conv-rl-based-memory-agent.md
- Author: Hongli Yu, Tinghong Chen, Jiangtao Feng, Jiangjie Chen, Weinan Dai, Qiying Yu, Ya-Qin Zhang, Wei-Ying Ma, Jingjing Liu, Mingxuan Wang, Hao Zhou
- Published: 2025-07-03
- Publisher: arXiv.org
- URL: https://arxiv.org/abs/2507.02259

## TL;DR

MemAgent reframes long-context processing as iterative memory updating: read a segment, overwrite a fixed-length memory, and use reinforcement learning to decide what that memory should preserve.

## Key Claims

- Fixed-length memory with learned updates can scale better than brute-force long-context expansion.
- End-to-end RL can train the model to retain the right information across arbitrarily long inputs.
- Linear-complexity memory processing can extrapolate far beyond the context sizes seen during training.
- Internal memory management can become a specialized agent policy rather than only an attention mechanism.

## Important Details

- The method processes text in segments and updates memory with an overwrite strategy.
- Memory is represented directly as ordinary tokens in context rather than as a separate external store.
- The paper reports strong extrapolation from 32K training text to multi-million-token QA settings and strong RULER performance.
- Training extends DAPO with independent-context multi-conversation generation.

## Entities

- Authors: Hongli Yu, Tinghong Chen, Jiangtao Feng, Jiangjie Chen, Weinan Dai, Qiying Yu, Ya-Qin Zhang, Wei-Ying Ma, Jingjing Liu, Mingxuan Wang, Hao Zhou
- Organizations: ByteDance Seed, Tsinghua University
- Concepts: fixed-length memory, overwrite strategy, RL memory update, long-context extrapolation

## My Notes

- This is a strong primary source for the learned-internal-memory branch of the design space.
- For Mari it is mainly useful as contrast: it clarifies which memory problems might disappear in future models and which inspectability, provenance, and control requirements will still favor explicit external memory.

## Open Questions

- Which parts of Mari's long-horizon behavior are fundamentally product-memory problems rather than model-memory problems?
- How should the KB compare learned internal memory to external file-backed or store-backed memory on auditability and operator trust?

## Related

- [[agent-memory]]
- [[llm-agents]]
- [[long-context]]

## Source Text

Not copied locally. Use the source URL above if the full text is needed.
