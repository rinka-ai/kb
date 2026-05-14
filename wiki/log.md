---
id: wiki-log
type: log
title: Wiki Operations Log
summary: Append-only chronological record of ingest, query, lint, refresh, and maintenance events.
---

# Wiki Operations Log

Append-only. Newest entries at the **bottom**. Entry header format:

```
## [YYYY-MM-DD] <op> | <subject>
```

where `<op>` ∈ `ingest | query | lint | refresh | sync | note`. Body is 1–4 bullets covering files touched, wiki pages updated, and anything future-you would want to recall. Do not rewrite past entries — correct via a new entry instead.

See `AGENTS.md` → Agent Workflows for when to append. The master catalog of wiki pages is [[index]].

---

## [2026-05-14] note | LLM Wiki pattern adoption

- Rewrote `AGENTS.md` to cover the full LLM Wiki schema: three layers, wiki frontmatter (concept/summary), roles of `wiki/index.md` and `wiki/log.md`, cross-linking convention, and ingest/query/lint agent workflows.
- Created `wiki/index.md` as the master human-readable catalog: 32 concepts, 16 summaries, 9 sub-indexes, 17 source collections.
- Created `wiki/log.md` (this file) as the append-only ops log.
- Set `.obsidian/app.json` `attachmentFolderPath` to `raw/images/` so clipped images land in the canonical raw images directory.
- Schema-conformance pass on existing files: `bun run kb:lint` passed with zero warnings; no source-article fixes were required. The only lint adjustments were in `AGENTS.md` and `wiki/index.md` where example wiki-link placeholders were converted to prose so they no longer triggered dangling-link warnings.
- `bun run kb:refresh` rebuilt `.kb/index.json` cleanly: 223 markdown files / 1590 chunks. Health: review_backlog=0, stale_wiki=0, uncovered_tags=19.
- `bun test` passed 92/92 — MCP and HTTP server suites unaffected by this turn's edits.
- Updated `README.md` to surface `wiki/index.md` and `wiki/log.md` alongside the existing `wiki/index/` description so the new top-level files don't get lost.

## [2026-05-14] note | Schema audit + Obsidian-graph case-collision cleanup

- Verified frontmatter schema match: every key used across the 33 concept and 16 summary pages (`canonical_for, confidence, id, last_reviewed, review_due, review_status, source_count, summary, tags, title, type`) is documented in `AGENTS.md`. No drift.
- Verified backlinks: every wiki link in `wiki/index.md` resolves to an existing markdown file in the vault — Obsidian's backlinks panel will populate from each concept/summary page back to `wiki/index.md`.
- Fixed two case-collision orphans that produced twin nodes in Obsidian's graph view: replaced 8 occurrences of the bare-lowercase `agents` wiki-link with `llm-agents` and 4 occurrences of `security` with `agent-security` across raw articles' `## Related` sections. Original intent (the topic, not the schema/policy files at repo root) is preserved.
- Extended `src/core/lint.ts`: added `checkWikiIndexCoverage` (every wiki page must be listed in `wiki/index.md`) and `checkCaseCollisionWikiLinks` (warn when a wiki-link slug doesn't case-sensitively resolve but does case-insensitively, indicating a near-collision orphan). Both rules run for all files including raw articles.
- Wired `src/core/ingest/log.ts` into `ingestSource()`: every non-dry-run ingest now appends an `## [YYYY-MM-DD] ingest | <title>` entry to `wiki/log.md` automatically, so the log stays current without manual maintenance.
- Added focused unit test for the new catalog-coverage lint rule.
- Full `bun run check` gate: biome clean, typecheck clean, 93/93 tests pass, `kb:refresh` rebuilt 1590 chunks from 223 files.

## [2026-05-14] note | Orphan-node cleanup across raw articles

- Eliminated all remaining unresolved wiki links across the repo. Repo-wide scan now returns **zero** unresolved Obsidian-style wiki link references — the graph view will no longer display ghost/placeholder nodes for tag-style refs.
- Built a curated mapping of ~100 dangling slug aliases to canonical wiki pages and applied it across `raw/articles/`. Examples: `memory` → `agent-memory`; `evals` / `evaluation` → `ai-agent-evals`; `retrieval` / `dense-retrieval` / `crag` / `self-rag` / `colbert` / `beir` / `ragas` / `hyde` / `graphrag` → `rag`; `mcp` / `protocols` → `agent-protocols`; `tool-use` / `tools` / `client-tools` / `server-tools` → `agent-tools`; `harnesses` → `agent-harnesses`; `frameworks` → `agent-frameworks`; `subagents` / `parallel-agents` → `multi-agent-systems`; `agentic-coding` / `claude-md` / `hooks` → `claude-code`; voice topic family (`voice-agents`, `elevenlabs`, `audio`, `realtime`, `telephony`, `twilio`, `sip`, etc.) → `voice-ai`; `transcription` → `speech-to-text`; `voice-cloning` / `voice-design` → `synthetic-voices`; `prompt-injection` / `sandboxes` / `privacy` / `retention` / `policy` / `governance` → `agent-security`.
- Removed 14 vague-tag slugs that had no good canonical (`azure`, `google-cloud`, `analytics`, `case-studies`, `frontend`, `visual-specs`, `design`, `architecture`, `onboarding`, `product-overview`, `technical-interviews`, `input`, `webhooks`, `testing`) — those belong in frontmatter `tags:`, not as wiki-link bullets.
- Deduplicated bullets in 82 raw articles where two distinct original slugs mapped to the same canonical (e.g. a file with both `voice-agents` and `voice-ai` ended up with two `[[voice-ai]]` bullets; only one is kept now).
- Touched 104 raw article files in total.
- Full `bun run check` gate green: biome clean, typecheck clean, 93/93 tests pass, `kb:refresh` rebuilt 1591 chunks from 223 files.
- Net effect for Obsidian graph view: every concept page now collects all the inbound edges that were previously scattered across orphan ghost nodes. Concept pages like `agent-memory`, `rag`, `agent-security`, and `voice-ai` become substantially more central hubs in the graph.

## [2026-05-14] note | Configure Obsidian to ignore node_modules / .git / .kb / .github / evals

- Cause of duplicate README/Readme clusters in the graph view: Obsidian was indexing all 520 markdown files including the 153 README/Readme/readme files inside `node_modules/` (and identical case variants across npm packages).
- Set `userIgnoreFilters` in `.obsidian/app.json` to: `node_modules/`, `.git/`, `.kb/`, `.github/`, `evals/`, `**/*.bak-*`. Vault drops from 520 → 234 visible markdown files. No basename collisions remain in the visible set.
- Obsidian must be reloaded (Cmd-P → "Reload app without saving", or quit + reopen) for the filter to take effect.

## [2026-05-14] note | Remove personal project references

- Deleted two summary pages dedicated to a personal project (filenames redacted from this log).
- Stripped 12 raw articles of inline applicability bullets to that project: removed each related bullet from `## My Notes` and `## Open Questions` sections only. Headings, source text, frontmatter, and unrelated bullets are all preserved. Files touched: `agent-protocol.md`, `durable-mcp-weather-server.md`, `google-adk-runtime-event-loop-and-workflow-agents.md`, `langgraph-durable-execution-persistence-and-human-in-the-loop.md`, `langmem.md`, `openai-agents-sdk-sessions-handoffs-and-human-in-the-loop.md`, `stripe-checkout-how-checkout-works.md`, `stripe-integration-security-guide.md`, `temporal-ai-cookbook.md` (official-docs); `agent-workflow-memory.md`, `mem1-learning-to-synergize-memory-and-reasoning-for-efficient-long-horizon-agents.md`, `memagent-reshaping-long-context-llm-with-multi-conv-rl-based-memory-agent.md` (arxiv).
- Patched `wiki/index.md` Summaries section and `wiki/index/home.md` Recent Summaries list to drop the deleted page links.
- Final repo-wide sweep: zero remaining personal-project references. Lint passes.

## [2026-05-14] note | Orphan-node audit and fix

- Built a wiki-link connection graph across the visible vault and flagged every node with zero inbound and/or zero outbound wiki links.
- Before fix: 11 fully disconnected nodes (`docs/*.md` × 5 operator guides; repo-root governance files: `README.md`, `AGENTS.md`, `CLAUDE.md`, `CONTRIBUTING.md`, `SECURITY.md`, `CODE_OF_CONDUCT.md`) + 1 zero-outbound summary (`2026-04-13-rag-acquisition-priorities.md`).
- Operator docs and repo-root governance are legitimately not wiki content — they exist for CI, GitHub display, and Codex/Claude schema reading. Decision: hide them from the Obsidian vault rather than force fake graph links. Extended `.obsidian/app.json` `userIgnoreFilters` to also exclude `docs/` and each repo-root meta file by name.
- Added a `## Source Notes` section to `2026-04-13-rag-acquisition-priorities.md` listing the 13 cited papers and the related `[[rag]]` concept page as proper Obsidian wiki links. The summary now has 14 outbound edges (was 0).
- After fix: visible vault drops to 221 markdown files (the pure knowledge graph) and contains **zero** fully-disconnected nodes, **zero** zero-inbound nodes, and **zero** zero-outbound nodes.
- Hubs after the fix (degree, in+out): `context-engineering` 72, `voice-ai` 71, `index` (master catalog) 59, `llm-agents` 59, `agent-memory` 59, `agent-harnesses` 58, `managed-agents` 49, `ai-agent-evals` 48, `rag` 46, `home` 45. These match the actual research focus of the KB.

## [2026-05-14] note | Reader Discipline — prevent LLM auto-fan-out on wiki links

- Established that MCP tools never auto-expand Obsidian-style wiki-link references at the protocol level; the only risk is an LLM choosing to fetch every link it sees.
- Tightened tool descriptions in `src/mcp/tools/` so every MCP client gets the message: `kb_read_note` now states that wiki-link references inside a returned note are NOT auto-expanded and that `kb_build_context` is the right multi-note entrypoint; `kb_search` says "Do not fetch every linked note; pick the most relevant 1-3."; `kb_build_context` is positioned as the bounded multi-note entrypoint ("caps fan-out and keeps token usage predictable").
- Added a "Reader Discipline" section to `AGENTS.md` codifying the consumption pattern for sessions working in this repo: read frontmatter `summary` first, stop at `## Related` / `## Source Notes` unless needed, prefer `kb_build_context` over chained `kb_read_note` for multi-note synthesis.
- No code logic changed — tools still return one slice per call. The change is informational, but it lands directly in tool descriptions which every MCP client sees on `tools/list`.
