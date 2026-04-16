---
id: article-2026-04-13-self-rag-learning-to-retrieve-generate-and-critique-through-self-reflection
type: source
title: "Self-RAG: Learning to Retrieve, Generate, and Critique through Self-Reflection"
path: raw/articles/arxiv/2026-04-13-self-rag-learning-to-retrieve-generate-and-critique-through-self-reflection.md
author: Unknown
publisher: arXiv.org
url: https://arxiv.org/abs/2310.11511
date_published:
date_added: 2026-04-13
tags: [rag, retrieval, self-rag, papers]
status: ingested
quality: medium
summary: "Abstract page for arXiv paper 2310.11511: Self-RAG: Learning to Retrieve, Generate, and Critique through Self-Reflection"
related: [rag, retrieval, self-rag, papers]
---

# Self-RAG: Learning to Retrieve, Generate, and Critique through Self-Reflection

## Source Metadata

- Path: raw/articles/arxiv/2026-04-13-self-rag-learning-to-retrieve-generate-and-critique-through-self-reflection.md
- Author: Unknown
- Published: Unknown
- Publisher: arXiv.org
- URL: https://arxiv.org/abs/2310.11511

## TL;DR

Abstract page for arXiv paper 2310.11511: Self-RAG: Learning to Retrieve, Generate, and Critique through Self-Reflection

## Key Claims

- Abstract page for arXiv paper 2310.11511: Self-RAG: Learning to Retrieve, Generate, and Critique through Self-Reflection
- View PDF
            Abstract:Despite their remarkable capabilities, large language models (LLMs) often produce responses containing factual inaccuracies due to their sole reliance on the parametric knowledge they encapsulate.
- Comments:
          30 pages, 2 figures, 12 tables
- Computation and Language (cs.CL); Artificial Intelligence (cs.AI); Machine Learning (cs.LG)

## Important Details

- Source captured from arxiv.org.
- Section heading: quick links
- Section heading: Submission history
- Section heading: Access Paper:
- Section heading: References & Citations
- Section heading: BibTeX formatted citation

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
- [[self-rag]]
- [[papers]]

## Source Text

View PDF
            Abstract:Despite their remarkable capabilities, large language models (LLMs) often produce responses containing factual inaccuracies due to their sole reliance on the parametric knowledge they encapsulate. Retrieval-Augmented Generation (RAG), an ad hoc approach that augments LMs with retrieval of relevant knowledge, decreases such issues. However, indiscriminately retrieving and incorporating a fixed number of retrieved passages, regardless of whether retrieval is necessary, or passages are relevant, diminishes LM versatility or can lead to unhelpful response generation. We introduce a new framework called Self-Reflective Retrieval-Augmented Generation (Self-RAG) that enhances an LM's quality and factuality through retrieval and self-reflection. Our framework trains a single arbitrary LM that adaptively retrieves passages on-demand, and generates and reflects on retrieved passages and its own generations using special tokens, called reflection tokens. Generating reflection tokens makes the LM controllable during the inference phase, enabling it to tailor its behavior to diverse task requirements. Experiments show that Self-RAG (7B and 13B parameters) significantly outperforms state-of-the-art LLMs and retrieval-augmented models on a diverse set of tasks. Specifically, Self-RAG outperforms ChatGPT and retrieval-augmented Llama2-chat on Open-domain QA, reasoning and fact verification tasks, and it shows significant gains in improving factuality and citation accuracy for long-form generations relative to these models.

Comments:
          30 pages, 2 figures, 12 tables

Computation and Language (cs.CL); Artificial Intelligence (cs.AI); Machine Learning (cs.LG)

Cite as:
          arXiv:2310.11511 [cs.CL]

(or
              arXiv:2310.11511v1 [cs.CL] for this version)

https://doi.org/10.48550/arXiv.2310.11511

Submission history From: Akari Asai [view email]          [v1]
        Tue, 17 Oct 2023 18:18:32 UTC (896 KB)
