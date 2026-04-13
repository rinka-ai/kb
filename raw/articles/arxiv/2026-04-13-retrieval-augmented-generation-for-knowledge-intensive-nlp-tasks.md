---
id: article-2026-04-13-retrieval-augmented-generation-for-knowledge-intensive-nlp-tasks
type: source
title: "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks"
path: raw/articles/arxiv/2026-04-13-retrieval-augmented-generation-for-knowledge-intensive-nlp-tasks.md
author: Unknown
publisher: arXiv.org
url: https://arxiv.org/abs/2005.11401
date_published: 
date_added: 2026-04-13
tags: [rag, retrieval, open-domain-qa, papers]
status: ingested
quality: medium
summary: "Abstract page for arXiv paper 2005.11401: Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks"
related: [rag, retrieval, open-domain-qa, papers]
---

# Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks

## Source Metadata

- Path: raw/articles/arxiv/2026-04-13-retrieval-augmented-generation-for-knowledge-intensive-nlp-tasks.md
- Author: Unknown
- Published: Unknown
- Publisher: arXiv.org
- URL: https://arxiv.org/abs/2005.11401

## TL;DR

Abstract page for arXiv paper 2005.11401: Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks

## Key Claims

- Abstract page for arXiv paper 2005.11401: Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks
- Comments:
          Accepted at NeurIPS 2020
- Computation and Language (cs.CL); Machine Learning (cs.LG)
- Cite as:
          arXiv:2005.11401 [cs.CL]

## Important Details

- Source captured from arxiv.org.
- Section heading: quick links
- Section heading: Submission history
- Section heading: Access Paper:
- Section heading: References & Citations
- Section heading: 13 blog links

## Entities

- People: Unknown
- Companies: Unknown
- Tools: Unknown
- Concepts: Unknown

## My Notes

- Imported automatically by `bun run kb:ingest`.
- Review and refine the structured sections before relying on this note heavily.

## Open Questions

- What claims in this source matter most for the current knowledge base?
- Which concept pages should link back to this note?

## Related

- [[rag]]
- [[retrieval]]
- [[open-domain-qa]]
- [[papers]]

## Source Text

Authors:Patrick Lewis, Ethan Perez, Aleksandra Piktus, Fabio Petroni, Vladimir Karpukhin, Naman Goyal, Heinrich Küttler, Mike Lewis, Wen-tau Yih, Tim Rocktäschel, Sebastian Riedel, Douwe Kiela
    View PDF
    HTML (experimental)
            Abstract:Large pre-trained language models have been shown to store factual knowledge in their parameters, and achieve state-of-the-art results when fine-tuned on downstream NLP tasks. However, their ability to access and precisely manipulate knowledge is still limited, and hence on knowledge-intensive tasks, their performance lags behind task-specific architectures. Additionally, providing provenance for their decisions and updating their world knowledge remain open research problems. Pre-trained models with a differentiable access mechanism to explicit non-parametric memory can overcome this issue, but have so far been only investigated for extractive downstream tasks. We explore a general-purpose fine-tuning recipe for retrieval-augmented generation (RAG) -- models which combine pre-trained parametric and non-parametric memory for language generation. We introduce RAG models where the parametric memory is a pre-trained seq2seq model and the non-parametric memory is a dense vector index of Wikipedia, accessed with a pre-trained neural retriever. We compare two RAG formulations, one which conditions on the same retrieved passages across the whole generated sequence, the other can use different passages per token. We fine-tune and evaluate our models on a wide range of knowledge-intensive NLP tasks and set the state-of-the-art on three open domain QA tasks, outperforming parametric seq2seq models and task-specific retrieve-and-extract architectures. For language generation tasks, we find that RAG models generate more specific, diverse and factual language than a state-of-the-art parametric-only seq2seq baseline.

Comments:
          Accepted at NeurIPS 2020

Computation and Language (cs.CL); Machine Learning (cs.LG)

Cite as:
          arXiv:2005.11401 [cs.CL]

(or
              arXiv:2005.11401v4 [cs.CL] for this version)

https://doi.org/10.48550/arXiv.2005.11401

Submission history From: Patrick Lewis [view email]                  [v1]
        Fri, 22 May 2020 21:34:34 UTC (698 KB)
            [v2]
        Mon, 7 Dec 2020 16:23:06 UTC (767 KB)
            [v3]
        Mon, 29 Mar 2021 10:12:16 UTC (767 KB)
    [v4]
        Mon, 12 Apr 2021 15:42:18 UTC (767 KB)
