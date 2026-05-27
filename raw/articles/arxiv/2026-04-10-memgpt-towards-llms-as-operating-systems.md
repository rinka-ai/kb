---
id: article-2026-04-10-memgpt-towards-llms-as-operating-systems
type: source
title: "MemGPT: Towards LLMs as Operating Systems"
path: raw/articles/arxiv/2026-04-10-memgpt-towards-llms-as-operating-systems.md
author: "Charles Packer, Sarah Wooders, Kevin Lin, Vivian Fang, Shishir G. Patil, Ion Stoica, Joseph E. Gonzalez"
publisher: arXiv.org
url: https://arxiv.org/abs/2310.08560
date_published: 2023-10-12
date_added: 2026-04-10
tags: [agent-memory, memory, stateful-agents, long-context]
status: processed
quality: high
summary: MemGPT proposes virtual context management for LLMs, using hierarchical memory tiers and interrupts to make limited context windows behave more like a larger operating-system-style memory system.
related: [agent-memory, memory, stateful-agents, long-context]
---

# MemGPT: Towards LLMs as Operating Systems

## Source Metadata

- Path: raw/articles/arxiv/2026-04-10-memgpt-towards-llms-as-operating-systems.md
- Author: Charles Packer, Sarah Wooders, Kevin Lin, Vivian Fang, Shishir G. Patil, Ion Stoica, Joseph E. Gonzalez
- Published: 2023-10-12
- Publisher: arXiv.org
- URL: https://arxiv.org/abs/2310.08560

## TL;DR

MemGPT treats long-horizon agent memory as an operating-systems problem: keep a constrained main context, page information between fast and slow stores, and use explicit interrupts and function chaining so the agent can manage memory without constant user intervention.

## Key Claims

- Limited context windows are a practical systems bottleneck for document analysis and persistent conversations.
- MemGPT proposes virtual context management inspired by hierarchical memory systems in operating systems.
- The design uses memory tiers plus interrupts so the agent can manage control flow between user interaction and memory operations.
- Memory architecture is not just storage choice: scheduling, paging, summarization, and follow-up execution are all part of the system design.
- The paper argues that this architecture enables richer document analysis and multi-session chat without requiring a model with a vastly larger native context window.

## Important Details

- Main context is split into system instructions, working context, and a FIFO queue; the queue also stores a recursive summary of evicted history.
- External memory is split between archival storage and recall storage, and the agent can search, insert, replace, or page data through function calls.
- The queue manager can issue a memory-pressure warning at roughly 70% full and flush at 100%, evicting part of the queue while preserving a recursive summary.
- Function chaining is enabled with a `request_heartbeat=true` control flag so the agent can execute multiple memory operations before yielding to the user.
- The paper evaluates MemGPT on document analysis and multi-session chat.
- On the deep-memory-retrieval task, MemGPT improves accuracy from 38.7% to 66.9% with GPT-3.5 Turbo, from 32.1% to 92.5% with GPT-4, and from 35.3% to 93.4% with GPT-4 Turbo.
- The nested key-value retrieval experiments show that MemGPT-style paging is the only approach that consistently handles nesting beyond two levels.

## Entities

- Authors: Charles Packer, Sarah Wooders, Kevin Lin, Vivian Fang, Shishir G. Patil, Ion Stoica, Joseph E. Gonzalez
- Concepts: virtual context management, hierarchical memory, interrupts, function chaining, long-term memory, multi-session chat
- Domains: document analysis, conversational agents

## My Notes

- This paper is one of the clearest primary sources for memory-tier thinking in agent systems.
- It is a strong bridge between the repo's file-backed memory ideas and stateful-agent product frameworks such as Letta.
- The most reusable idea here is that memory requires a control plane, not just a storage backend.

## Open Questions

- Which parts of MemGPT should be treated as general memory architecture versus product-specific implementation guidance?
- Where does MemGPT's memory-tier framing diverge from file-system-backed context designs in this KB?

## Related

- [[agent-memory]]
- [[context-engineering]]

## Source Text

View PDF
            Abstract:Large language models (LLMs) have revolutionized AI, but are constrained by limited context windows, hindering their utility in tasks like extended conversations and document analysis. To enable using context beyond limited context windows, we propose virtual context management, a technique drawing inspiration from hierarchical memory systems in traditional operating systems that provide the appearance of large memory resources through data movement between fast and slow memory. Using this technique, we introduce MemGPT (Memory-GPT), a system that intelligently manages different memory tiers in order to effectively provide extended context within the LLM's limited context window, and utilizes interrupts to manage control flow between itself and the user. We evaluate our OS-inspired design in two domains where the limited context windows of modern LLMs severely handicaps their performance: document analysis, where MemGPT is able to analyze large documents that far exceed the underlying LLM's context window, and multi-session chat, where MemGPT can create conversational agents that remember, reflect, and evolve dynamically through long-term interactions with their users. We release MemGPT code and data for our experiments at this https URL.

Comments:
          Code and data available at this https URL

Cite as:
          arXiv:2310.08560 [cs.AI]

(or
              arXiv:2310.08560v2 [cs.AI] for this version)

https://doi.org/10.48550/arXiv.2310.08560

Submission history From: Charles Packer [view email]                  [v1]
        Thu, 12 Oct 2023 17:51:32 UTC (391 KB)
    [v2]
        Mon, 12 Feb 2024 18:59:46 UTC (419 KB)
