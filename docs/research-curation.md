# Research Curation and Learning Brief Policy

This document defines the operating policy for Hermes's recurring AI research curation for Jose.

## Reader profile

- Location and scheduling timezone: `Europe/Lisbon`
- Background: programmer and author of the repositories on this VPS
- Daily learning budget: up to 60 minutes
- Desired depth: practitioner-first, technically rigorous, with research depth when it changes engineering decisions
- Delivery channel: the originating Telegram conversation
- Scope: agents, coding workflows, context and memory, evaluations, tool use, MCP, orchestration, model research, product strategy, security, and production infrastructure

## Daily learning brief

Target schedule: 08:00 Europe/Lisbon.

Select one to three items that fit within 60 minutes total. Each recommendation must include:

1. title, publisher or speaker, format, URL, and publication date when known
2. estimated reading or viewing time and technical level
3. why it is relevant to a programmer building AI systems
4. three to five ideas to focus on
5. one practical question, experiment, or coding exercise when useful
6. whether the item or its core claims already exist in this KB

Prefer a coherent daily theme over unrelated links. Do not recommend an item merely because it is new.

## Weekly newsletter

Target schedule: overnight Sunday, currently 04:00 UTC (05:00 Europe/Lisbon during daylight saving and 04:00 in winter).

The newsletter should synthesize the previous seven days rather than dump links. Keep research deliberately bounded: scan the configured feeds once, use no more than five targeted web searches, deeply inspect at most twelve candidates, and stop early once there is enough evidence for a useful digest. Do not attempt exhaustive coverage. Organize selected items as:

- Must read or watch
- Worth scanning
- Reference or emerging signal
- Patterns across sources
- Implications for Jose's coding and agent workflows
- Suggested experiments for the following week

Ingest only the strongest two to four durable sources. Create or update a dated multi-source summary under `wiki/summaries/` when the week's material supports durable synthesis. Follow `AGENTS.md` for provenance, cross-linking, index, log, refresh, and lint requirements.

## Source hierarchy

### Highest priority

- First-party research and engineering from Anthropic, OpenAI, Google DeepMind, Google Research, Microsoft Research, Meta AI, GitHub, and Hugging Face
- Primary papers, technical reports, official documentation, release notes, and repositories
- Agent and tool builders including the MCP ecosystem, AI Engineer, Cloudflare, and Vercel
- Do not select LangChain/LangGraph-specific content unless it has broader ecosystem significance independent of those frameworks

### Trusted practitioners

- Simon Willison
- Chip Huyen
- Lilian Weng
- Eugene Yan
- Addy Osmani
- Other practitioners with demonstrated technical work, reproducible examples, and transparent evidence

### Research

Selectively filter arXiv and conference papers. Favor work with clear methods, useful evaluations, reproducible artifacts, or direct relevance to agent systems and software engineering. Novelty alone is insufficient.

### Video

High-quality video is welcome, including:

- official research and engineering channels
- strong university lectures
- reputable conference talks and recorded workshops
- AI Engineer and DeepLearning.AI
- technically strong YouTube channels with credible speakers, concrete demonstrations, or source-backed analysis

Evaluate videos by transcript or detailed agenda when possible. Prefer talks that teach a durable mental model or workflow. Avoid recommending a long video when an equivalent primary article is clearer and faster.

## Exclusions

Reject or heavily down-rank:

- SEO content and generic listicles
- recycled announcements without technical substance
- shallow product promotion
- unverified benchmark or performance claims
- sensational predictions without evidence
- duplicate coverage when the primary source is available
- content already represented in the KB unless it materially updates, contradicts, or improves the existing view

## Ranking rubric

Rank candidates by:

1. relevance to the declared topic scope
2. technical substance and evidence quality
3. novelty relative to this KB
4. practical applicability to current coding and agent workflows
5. source credibility
6. information gained per minute
7. potential to update or challenge an existing canonical concept

## KB maintenance and repository safety

- Search the KB before recommending or ingesting to avoid duplicates.
- Preserve raw source text and provenance.
- Prefer additive maintenance over destructive rewrites.
- Run `bun run kb:refresh` after research changes and `bun run check` after tooling or architecture changes.
- If the worktree contains unrelated user changes, do not overwrite or mix them into an automated commit; report the conflict instead.
- Automated research runs may create local commits with focused messages but must not push unless Jose explicitly authorizes remote pushes.
- Architecture improvements should be evidence-driven, scoped, tested, and separated from routine content-ingest commits.

## Feedback loop

Interpret short feedback as ranking signals:

- `useful`: increase similar topics, sources, and depth
- `too basic`: prefer primary research, implementation detail, and harder exercises
- `too deep`: add more framing and reduce paper density
- `not relevant`: down-rank that topic/source pattern
- `already knew`: increase novelty threshold and search the KB more aggressively

The objective is not maximal coverage. It is a compounding, healthy KB and a daily learning queue with high information value.
