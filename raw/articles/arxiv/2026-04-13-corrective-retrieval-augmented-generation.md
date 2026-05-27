---
id: article-2026-04-13-corrective-retrieval-augmented-generation
type: source
title: "Corrective Retrieval Augmented Generation"
path: raw/articles/arxiv/2026-04-13-corrective-retrieval-augmented-generation.md
author: Unknown
publisher: arXiv.org
url: https://arxiv.org/abs/2401.15884
date_published:
date_added: 2026-04-13
tags: [rag, retrieval, crag, papers]
status: processed
quality: medium
summary: "Abstract page for arXiv paper 2401.15884: Corrective Retrieval Augmented Generation"
related: [rag, retrieval, crag, papers]
---

# Corrective Retrieval Augmented Generation

## Source Metadata

- Path: raw/articles/arxiv/2026-04-13-corrective-retrieval-augmented-generation.md
- Author: Unknown
- Published: Unknown
- Publisher: arXiv.org
- URL: https://arxiv.org/abs/2401.15884

## TL;DR

CRAG improves RAG robustness by evaluating retrieval quality, triggering corrective actions when evidence is weak, and selectively filtering retrieved information.

## Key Claims

- CRAG adds a lightweight retrieval evaluator that estimates whether retrieved documents are good enough to trust.
- When retrieval is weak, the system can trigger corrective actions such as broader web search.
- It also decomposes and recomposes retrieved material to preserve useful information while filtering irrelevant text.

## Important Details

- The paper reports gains across four datasets covering both short-form and long-form generation tasks.
- CRAG is useful because it focuses on what to do after retrieval goes wrong, not only on improving retrieval before generation.
- This is one of the strongest robustness-oriented additions in the RAG cluster.

## Entities

- People: Yunfan Gao, Xinyu Zhang, Zexuan Zhong, et al.
- Companies: Meta AI, University of Washington, Princeton University
- Tools: CRAG
- Concepts: Corrective retrieval, retrieval confidence, web augmentation

## My Notes

- This note matters because the KB increasingly treats retrieval as a pipeline with confidence checks and fallback paths, not a one-shot top-k lookup.
- Useful contrast with [[2024-09-19-introducing-contextual-retrieval]], which focuses more on pre-index enrichment.

## Open Questions

- Which CRAG-style corrective steps are realistic for this KB’s search flow?
- When should low-confidence retrieval trigger fallback behavior instead of simply returning weaker evidence?

## Related

- [[rag]]
- [[ai-agent-evals]]
- [[arxiv]]

## Source Text

View PDF
    HTML (experimental)
            Abstract:Large language models (LLMs) inevitably exhibit hallucinations since the accuracy of generated texts cannot be secured solely by the parametric knowledge they encapsulate. Although retrieval-augmented generation (RAG) is a practicable complement to LLMs, it relies heavily on the relevance of retrieved documents, raising concerns about how the model behaves if retrieval goes wrong. To this end, we propose the Corrective Retrieval Augmented Generation (CRAG) to improve the robustness of generation. Specifically, a lightweight retrieval evaluator is designed to assess the overall quality of retrieved documents for a query, returning a confidence degree based on which different knowledge retrieval actions can be triggered. Since retrieval from static and limited corpora can only return sub-optimal documents, large-scale web searches are utilized as an extension for augmenting the retrieval results. Besides, a decompose-then-recompose algorithm is designed for retrieved documents to selectively focus on key information and filter out irrelevant information in them. CRAG is plug-and-play and can be seamlessly coupled with various RAG-based approaches. Experiments on four datasets covering short- and long-form generation tasks show that CRAG can significantly improve the performance of RAG-based approaches.

Comments:
          Update results, add more analysis, and fix typos

Cite as:
          arXiv:2401.15884 [cs.CL]

(or
              arXiv:2401.15884v3 [cs.CL] for this version)

https://doi.org/10.48550/arXiv.2401.15884

Submission history From: Jia-Chen Gu [view email]                  [v1]
        Mon, 29 Jan 2024 04:36:39 UTC (315 KB)
            [v2]
        Fri, 16 Feb 2024 19:10:36 UTC (319 KB)
    [v3]
        Mon, 7 Oct 2024 02:19:21 UTC (322 KB)
