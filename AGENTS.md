# Repository Instructions

`AGENTS.md` is the only canonical agent-instruction file for this repository.
If another file references agent instructions, treat it as a pointer back here.
If any instruction file appears to conflict with this one, `AGENTS.md` wins.

This repository is an LLM-maintained personal research wiki on AI, agents, and adjacent topics. The pattern it implements: raw sources are immutable, a compounding wiki of synthesized markdown is built and maintained by the LLM, and this file is the schema that keeps the LLM disciplined as a wiki maintainer rather than a generic chatbot.

## The Three Layers

1. **Raw sources** — `raw/`. Curated source documents. Articles, papers, transcripts, images. Immutable: the LLM reads from them but never rewrites their `## Source Text`.
2. **The wiki** — `wiki/`. LLM-authored synthesis. Concept pages, multi-source summaries, sub-indexes, the master catalog, and the operations log. The LLM owns this layer end-to-end.
3. **The schema** — this file. Tells the LLM how the wiki is structured, what the conventions are, and which workflows to follow.

## Objectives

- Keep raw source material easy to inspect and provenance-preserving.
- Make derived knowledge easy to update incrementally as new sources arrive.
- Maintain cross-references so the wiki compounds in value with each ingest.
- Favor simple, repeatable markdown structures over clever formatting.

## Directory Conventions

- `raw/articles/<collection>/` — source articles and long-form notes, grouped by source/publisher (e.g. `anthropic-engineering`, `arxiv`, `voice-ai`).
- `raw/images/` — images downloaded from source material. New Obsidian-clipped attachments land here.
- `wiki/concepts/` — concept pages (synthesized, topic-level).
- `wiki/summaries/` — cross-source summaries, memos, reports, dated.
- `wiki/index/` — per-collection sub-index pages and the landing page (`home.md`).
- `wiki/index.md` — **master human-readable catalog** of the entire wiki (see below).
- `wiki/log.md` — **append-only operations log** (see below).
- `bin/` — executable KB command entrypoints.
- `src/core/` — KB internals shared by CLI and MCP.
- `src/mcp/` — MCP server construction and stdio transport.
- `src/http/` — HTTP server, config, and handlers.
- `.kb/` — generated artifacts: `.kb/index.json` search index, `.kb/health.md` health report, `.kb/telemetry/` search observations. Generated, not hand-edited.

`wiki/index.md` (the file) and `wiki/index/` (the folder) are distinct. The file is the master catalog. The folder holds per-collection sub-indexes.

## Source Article Format

Each source article uses YAML frontmatter followed by these headings, in order:

1. `# Title`
2. `## Source Metadata`
3. `## TL;DR`
4. `## Key Claims`
5. `## Important Details`
6. `## Entities`
7. `## My Notes`
8. `## Open Questions`
9. `## Related`
10. `## Source Text`

## Source Article Frontmatter

Use these keys for source articles. Leave a field empty (not invented) when unknown.

- `id` — stable slug
- `type` — `source`
- `title`
- `path` — repo-relative path to this file (e.g. `raw/articles/arxiv/2026-03-22-foo.md`)
- `author`
- `publisher`
- `url`
- `date_published`
- `date_added`
- `tags`
- `status` — `active` or `superseded`
- `quality`
- `summary` — one or two sentences
- `related` — list of slugs (no `[[ ]]`)
- `superseded_by` — slug, required when `status: superseded`

## Wiki Page Frontmatter

Concept and summary pages use the extended schema below. Required keys: `id`, `type`, `title`, `summary`.

- `id` — stable slug
- `type` — `concept` | `summary` | `index` | `log`
- `title`
- `tags`
- `summary` — one-line synthesis used by `wiki/index.md` and search ranking
- `source_count` — number of source notes synthesized
- `canonical_for` — list of phrases this page is the canonical answer for
- `review_status` — `draft` | `reviewed` | `stale`
- `last_reviewed` — ISO date
- `review_due` — ISO date; freshness target
- `confidence` — quoted decimal, e.g. `"0.85"`

## Wiki Pages: `index.md` and `log.md`

These two files at the wiki root anchor navigation and history.

### `wiki/index.md` — master catalog

- Human-readable table of contents for the whole wiki.
- Sections: `## Concepts`, `## Summaries`, `## Sub-Indexes`, `## Source Collections`, `## How To Use`.
- One bullet per page: `- WIKILINK(slug) — <one-line description>` where `WIKILINK(slug)` is the slug wrapped in Obsidian double-bracket notation.
- The LLM updates `wiki/index.md` whenever it creates or renames a wiki page, ingests a new source that adds entries, or changes a page's one-line summary.

### `wiki/log.md` — append-only operations log

- Append-only chronological record of ingest / query / lint / refresh events.
- New entries go at the **bottom** so `tail -n 30 wiki/log.md` shows recent activity and `grep "^## \[" wiki/log.md | tail -10` works.
- Entry header format: `## [YYYY-MM-DD] <op> | <subject>` where `<op>` ∈ `ingest | query | lint | refresh | sync | note`.
- Body: 1–4 bullets covering files touched, wiki pages updated, contradictions noted, or anything future-you would want to recall.
- Do not rewrite or delete past entries; correct via a new entry instead.

## Cross-Linking

- Use Obsidian-style wiki links (`[[ ]]` around a slug) from wiki pages back to source notes and across concept pages. The slug is the filename without `.md`.
- In frontmatter `related` / `canonical_for` lists, use bare slugs (no `[[ ]]`).
- Concept pages should cite source notes by wiki link so provenance is browsable in Obsidian's graph view.

## Authoring Rules

- One source article per file.
- Set `path` to the canonical repo-relative markdown path.
- Preserve exact source text inside `## Source Text` for archival fidelity.
- Separate extracted claims from personal interpretation.
- Keep quotes and copied material clearly attributed.
- Prefer bullets for extracted structure.
- Use ISO dates (`YYYY-MM-DD`) and stable filenames (`YYYY-MM-DD-slug.md`).
- When synthesizing, link back to source notes with Obsidian wiki links where useful.
- If a newer note contradicts an older one, keep the older note for provenance, mark it `status: superseded`, and set `superseded_by` to the canonical note.
- Concept pages present the current accepted view, not multiple contradictory views side by side. Track tensions and superseded claims explicitly when relevant.
- When creating a new wiki page, add a line to `wiki/index.md` the same turn.
- When ingesting a source or making any non-trivial wiki edit, append an entry to `wiki/log.md` the same turn.
- Good query answers that synthesize across sources are durable knowledge — file them in `wiki/summaries/` rather than letting them die in chat history.

## Compiled Wiki Rules

Concept and summary pages in `wiki/` should:

- synthesize across multiple sources
- avoid copying full source text
- state tensions, patterns, and open questions explicitly
- link back to the source documents that informed them

## Maintenance Rules

- Do not silently rewrite source text.
- When improving metadata or extracted notes, preserve the original source section.
- Prefer additive edits over destructive rewrites.
- Treat `.kb/health.md` and `wiki/log.md` as complementary: health is machine-generated state, log is human-readable history.

## KB Tooling

This repo includes lightweight local tooling for knowledge retrieval and maintenance:

- `bun run kb:build` — build the local search index in `.kb/index.json`.
- `bun run kb:search --query "..."` — retrieve relevant notes by free-text query.
- `bun run kb:search --query "..." --include-superseded` — include notes marked outdated or contradicted.
- `bun run kb:search --file /absolute/path/to/file` — retrieve relevant notes using a local file as context.
- `bun run kb:search-report` — summarize repeated remote HTTP MCP search observations to target real bad queries.
- `bun run kb:lint` — check for missing metadata and dangling wiki links.
- `bun run kb:refresh` — rebuild index and run lint checks together.
- `bun run kb:ingest --url <url>` — ingest a new article or post into the source-note schema.
- `bun run kb:mcp` — expose the KB as a local stdio MCP server.
- `bun run kb:mcp:http` — expose the KB as a Streamable HTTP MCP server.
- `bun run kb:watch --lint` — auto-rebuild the index as KB files change.
- `bun run biome:write` — format and lint the TypeScript KB tooling.

MCP complement to `kb:lint`: `kb_find_gaps` surfaces orphan sources, thin concepts, source-count mismatches, unreviewed ingests, and uncovered tags.

## Reader Discipline

When consuming this KB as a knowledge base (from any agent — Codex, Claude Code, or a remote MCP client), follow these rules to keep context usage bounded:

- Obsidian-style wiki-link references inside a returned note are **inert text**. The MCP tools never auto-expand them. Do not fetch every linked note you see.
- Read a note's frontmatter `summary` first, then the body. If the summary plus body answers the question, stop — do not chase `## Related` or `## Source Notes` bullets.
- For a single targeted lookup, use `kb_search` (returns ranked previews) or `kb_read_note` (one note).
- For multi-note synthesis, prefer `kb_build_context` over chained `kb_read_note` calls. It produces a bounded, task-specific pack and supports `compact=true` for tighter token budgets.
- Treat `## Related` and `## Source Notes` sections as opt-in expansion points, not required reading. They exist for the Obsidian graph and for follow-up retrieval — not for default consumption.
- If you must follow a link, prefer reading the linked note's `summary` (via `kb_read_note` and stopping early, or via `kb_list_catalog` filtered by slug) before reading the full body.
- When the task is broad ("everything we know about X"), use `kb_build_context` with the query; do not loop over wiki links manually.

## Agent Workflows

Three workflows the LLM is expected to follow when operating on this wiki.

### Ingest workflow

1. Run `kb_search` (or `bun run kb:search`) for adjacent concepts before writing anything.
2. Read the new source. Discuss key takeaways with the user.
3. Write the source note to `raw/articles/<collection>/YYYY-MM-DD-slug.md` with full frontmatter and the 10 required headings.
4. Update relevant concept pages in `wiki/concepts/` — propagate new claims, refresh `summary`, bump `source_count`, refresh `last_reviewed`. A single source typically touches 5–15 wiki files.
5. If the source warrants synthesis across multiple existing sources, write a `wiki/summaries/YYYY-MM-DD-slug.md` page.
6. Update `wiki/index.md` with any new pages added or renamed.
7. Append an entry to `wiki/log.md`.
8. Run `bun run kb:refresh` to rebuild the index and re-lint.

### Query workflow

1. Consult `wiki/index.md` first to scan available pages.
2. Drill into linked concept and summary pages.
3. Use `kb_search` / `kb_search_file` for fuzzy lookups when the catalog doesn't hit.
4. Answer with citations (wiki links or `raw/...` paths).
5. If the answer is a durable synthesis (comparison, decision rationale, cross-source analysis), file it under `wiki/summaries/` and update `wiki/index.md` + append to `wiki/log.md`. Don't let valuable synthesis decay into chat-only artifact.

### Lint workflow

1. Run `bun run kb:lint`.
2. Run `kb_find_gaps` (MCP) for orphan/thin-concept/stale signals.
3. Fix: missing required frontmatter, path mismatches, dangling wiki links, `superseded` without `superseded_by`, `review_due` past today.
4. Append a `lint` entry to `wiki/log.md` summarizing what changed.

## Codex And Claude Code Awareness

- Codex uses `AGENTS.md` as the main repo instruction file, so keep the KB workflow documented here.
- `CLAUDE.md` exists only to direct Claude Code back to `AGENTS.md`.
- Both agents should treat KB lookup as part of the default workflow for research, architecture, eval, tool-use, and agent-systems tasks.
- When configuring external repos, point them at `bin/mcp.ts` in this repository through their MCP client config rather than relying only on shell snippets.
- For team-shared access, prefer the hosted HTTP MCP endpoint while keeping local stdio for personal use.
- The hosted HTTP MCP path may capture privacy-safe search observations for retrieval tuning. It records query/result diagnostics and `kb_search_file` context labels, but not raw pasted file text.
