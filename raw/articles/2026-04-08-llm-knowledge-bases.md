---
id: article-2026-04-08-llm-knowledge-bases
type: source
title: LLM Knowledge Bases
author: Andrej Karpathy
publisher: X
url: https://x.com/karpathy
date_published: 2026-04-08
date_added: 2026-04-08
tags: [llm, knowledge-base, obsidian, research, workflow]
status: processed
quality: high
summary: A practical workflow for collecting raw research materials, compiling them into a markdown wiki with an LLM, querying the wiki, and filing outputs back into the knowledge base so research accumulates over time.
related: [personal-knowledge-bases, obsidian, llm-agents, research-workflows]
---

# LLM Knowledge Bases

## Source Metadata

- Author: Andrej Karpathy
- Published: 2026-04-08
- Publisher: X
- URL: https://x.com/karpathy

## TL;DR

Raw material is collected into a local repository, incrementally compiled by an LLM into a markdown wiki, queried by agents and tools, and then extended by filing outputs back into the same knowledge base.

## Key Claims

- LLMs are useful not only for manipulating code, but also for manipulating and maintaining knowledge stored as markdown and images.
- A local markdown wiki can act as a practical compiled knowledge base over a set of raw source documents.
- At modest scale, an LLM can answer complex questions over the wiki without requiring a heavy RAG system.
- Research outputs become more valuable when they are rendered as reusable artifacts such as markdown, slides, or plots and then filed back into the knowledge base.
- LLM-driven linting and health checks can improve consistency, fill data gaps, and suggest new avenues of inquiry.
- There is product potential in turning this workflow into something more coherent than a set of scripts.

## Important Details

- Source material may include articles, papers, repos, datasets, and images.
- Obsidian is used as the main viewing environment for raw material, compiled wiki content, and visualizations.
- Obsidian Web Clipper is used to convert web articles into markdown.
- Local images are downloaded so the LLM can reference them more easily.
- The wiki contains summaries, backlinks, categories, and concept pages.
- The LLM maintains the wiki directly; manual editing is rare.
- Additional tooling includes search and CLI-accessible utilities used by the LLM during larger queries.
- The corpus example cited is roughly 100 articles and around 400K words.

## Entities

- Tools: Obsidian, Obsidian Web Clipper, Marp, matplotlib
- Concepts: personal knowledge base, markdown wiki, backlinks, health checks, synthetic data generation, finetuning
- Artifacts: markdown notes, slide decks, plots, local images

## My Notes

- The strongest idea here is treating the LLM as a knowledge compiler and maintainer rather than only a chat interface.
- The workflow is compelling because outputs compound over time instead of disappearing into chat history.
- The trust model still matters: provenance, citations, and drift control will become more important as the repo grows.

## Open Questions

- What repo conventions will best preserve provenance as the corpus grows?
- At what scale does this workflow need explicit retrieval infrastructure?
- Which integrity checks should run regularly against the wiki?
- When does synthetic data generation improve the system, and when does it reduce trust?

## Related

- [[personal-knowledge-bases]]
- [[obsidian]]
- [[llm-agents]]
- [[research-workflows]]

## Source Text

Something I'm finding very useful recently: using LLMs to build personal knowledge bases for various topics of research interest. In this way, a large fraction of my recent token throughput is going less into manipulating code, and more into manipulating knowledge (stored as markdown and images). The latest LLMs are quite good at it. So:

Data ingest:
I index source documents (articles, papers, repos, datasets, images, etc.) into a raw/ directory, then I use an LLM to incrementally "compile" a wiki, which is just a collection of .md files in a directory structure. The wiki includes summaries of all the data in raw/, backlinks, and then it categorizes data into concepts, writes articles for them, and links them all. To convert web articles into .md files I like to use the Obsidian Web Clipper extension, and then I also use a hotkey to download all the related images to local so that my LLM can easily reference them.

IDE:
I use Obsidian as the IDE "frontend" where I can view the raw data, the the compiled wiki, and the derived visualizations. Important to note that the LLM writes and maintains all of the data of the wiki, I rarely touch it directly. I've played with a few Obsidian plugins to render and view data in other ways (e.g. Marp for slides).

Q&A:
Where things get interesting is that once your wiki is big enough (e.g. mine on some recent research is ~100 articles and ~400K words), you can ask your LLM agent all kinds of complex questions against the wiki, and it will go off, research the answers, etc. I thought I had to reach for fancy RAG, but the LLM has been pretty good about auto-maintaining index files and brief summaries of all the documents and it reads all the important related data fairly easily at this ~small scale.

Output:
Instead of getting answers in text/terminal, I like to have it render markdown files for me, or slide shows (Marp format), or matplotlib images, all of which I then view again in Obsidian. You can imagine many other visual output formats depending on the query. Often, I end up "filing" the outputs back into the wiki to enhance it for further queries. So my own explorations and queries always "add up" in the knowledge base.

Linting:
I've run some LLM "health checks" over the wiki to e.g. find inconsistent data, impute missing data (with web searchers), find interesting connections for new article candidates, etc., to incrementally clean up the wiki and enhance its overall data integrity. The LLMs are quite good at suggesting further questions to ask and look into.

Extra tools:
I find myself developing additional tools to process the data, e.g. I vibe coded a small and naive search engine over the wiki, which I both use directly (in a web ui), but more often I want to hand it off to an LLM via CLI as a tool for larger queries.

Further explorations:
As the repo grows, the natural desire is to also think about synthetic data generation + finetuning to have your LLM "know" the data in its weights instead of just context windows.

TLDR: raw data from a given number of sources is collected, then compiled by an LLM into a .md wiki, then operated on by various CLIs by the LLM to do Q&A and to incrementally enhance the wiki, and all of it viewable in Obsidian. You rarely ever write or edit the wiki manually, it's the domain of the LLM. I think there is room here for an incredible new product instead of a hacky collection of scripts.
