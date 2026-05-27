---
id: article-2024-09-19-contextual-retrieval
type: source
title: "Introducing Contextual Retrieval"
path: raw/articles/anthropic-engineering/2024-09-19-introducing-contextual-retrieval.md
author: Anthropic
publisher: Anthropic
url: https://www.anthropic.com/engineering/contextual-retrieval
date_published: 2024-09-19
date_added: 2026-04-09
tags: [retrieval, rag, contextual-retrieval, bm25, embeddings]
status: processed
quality: high
summary: Anthropic introduces Contextual Retrieval, a RAG improvement that augments chunk representations with contextual information and combines contextual embeddings with contextual BM25 to reduce retrieval failures.
related: [retrieval, rag, contextual-retrieval, embeddings]
---

# Introducing Contextual Retrieval

## Source Metadata

- Path: raw/articles/anthropic-engineering/2024-09-19-introducing-contextual-retrieval.md
- Author: Anthropic
- Published: 2024-09-19
- Publisher: Anthropic
- URL: https://www.anthropic.com/engineering/contextual-retrieval

## TL;DR

The post argues that naive RAG often strips away too much local context during chunking. Contextual Retrieval restores more situational information to the retrieval step and combines semantic and lexical methods.

## Key Claims

- Traditional RAG often fails because chunk representations lose too much context.
- Contextual Embeddings and Contextual BM25 improve retrieval quality significantly.
- For smaller corpora, just stuffing the whole corpus into context can still be the simplest option.

## Important Details

- Anthropic reports fewer failed retrievals with contextual methods.
- The post explicitly combines semantic and lexical retrieval instead of treating them as substitutes.
- Prompt caching is mentioned as a reason full-context approaches remain viable at smaller scales.

## Entities

- Concepts: RAG, Contextual Retrieval, Contextual Embeddings, Contextual BM25, prompt caching

## My Notes

- This is especially relevant to your KB because it sits right at the boundary between full-context and retrieval-based knowledge systems.

## Open Questions

- At what scale should this repo shift from full-context strategies to retrieval-heavy ones?

## Related

- [[rag]]
- [[context-engineering]]

## Source Text

Not copied locally. Use the source URL above if the full text is needed.
