# Repository Instructions

`AGENTS.md` is the only canonical agent-instruction file for this repository.
If another file references agent instructions, treat it as a pointer back here.
If any instruction file appears to conflict with this one, `AGENTS.md` wins.

This repository stores an LLM-assisted research knowledge base built from markdown source files and synthesized wiki pages.

## Objectives

- Keep raw source material easy to inspect.
- Make derived knowledge easy to update incrementally.
- Preserve provenance between source files and synthesized notes.
- Favor simple, repeatable markdown structures over clever formatting.

## Directory Conventions

- `raw/articles/`: source articles and long-form notes
- `raw/images/`: images downloaded from source material
- `wiki/concepts/`: concept pages
- `wiki/summaries/`: cross-source summaries and reports
- `wiki/index/`: navigation pages and maps of content
- `bin/`: executable KB command entrypoints
- `src/core/`: KB internals shared by CLI and MCP
- `src/mcp/`: MCP server construction and stdio transport
- `src/http/`: HTTP server, config, and handlers

## Source Article Format

Each source article should use YAML frontmatter followed by the exact headings below when possible:

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

## Frontmatter Fields

Use these keys for source articles unless a field is unknown:

- `id`
- `type`
- `title`
- `path`
- `author`
- `publisher`
- `url`
- `date_published`
- `date_added`
- `tags`
- `status`
- `quality`
- `summary`
- `related`
- `superseded_by`

## Authoring Rules

- Keep one source article per file.
- Set `path` to the canonical repo-relative markdown path, for example `raw/articles/anthropic-engineering/2026-04-09-scaling-managed-agents-decoupling-the-brain-from-the-hands.md`.
- Preserve exact source text inside `## Source Text` when the goal is archival fidelity.
- Separate extracted claims from personal interpretation.
- Keep quotes and copied material clearly attributed.
- Prefer bullets for extracted structure.
- Use ISO dates: `YYYY-MM-DD`.
- Use stable filenames like `YYYY-MM-DD-slug.md`.
- When synthesizing, link back to source files with wiki links where useful.
- If a newer note contradicts an older one, keep the older note for provenance but mark it `status: superseded` and set `superseded_by` to the current canonical note.
- Concept pages should present the current accepted view, not multiple contradictory views side by side.

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

## KB Tooling

This repo includes lightweight local tooling for knowledge retrieval and maintenance:

- `bun run kb:build`: build the local search index in `.kb/index.json`
- `bun run kb:search --query "..."`: retrieve relevant notes by free-text query
- `bun run kb:search --query "..." --include-superseded`: include notes that were marked as outdated or contradicted
- `bun run kb:search --file /absolute/path/to/file`: retrieve relevant notes using a local file as context
- `bun run kb:lint`: check for missing metadata and dangling wiki links
- `bun run kb:refresh`: rebuild index and run lint checks together
- `bun run kb:ingest --url <url>`: ingest a new article or post into the source-note schema
- `bun run kb:deep-read --source <kb-note>`: create a selective deep-read summary from one or more existing source notes, optionally using a local notes file for chosen sections instead of ingesting a full PDF
- `bun run kb:mcp`: expose the KB as a local stdio MCP server for cross-repo agent access
- `bun run kb:mcp:http`: expose the KB as a Streamable HTTP MCP server for shared/team access
- `bun run kb:watch --lint`: auto-rebuild the index as KB files change
- `bun run biome:write`: format and lint the TypeScript KB tooling

## Agent Workflow

When working in this repository as an agent:

1. Run `bun run kb:search` before synthesizing or adding concept pages.
2. Rebuild the index after adding or changing markdown files.
3. Use concept pages in `wiki/` for synthesis and source notes in `raw/articles/` for provenance.
4. Run `bun run kb:lint` before wrapping up substantial KB edits.
5. If the `ai-research-kb` MCP server is attached, prefer `kb_build_context`, `kb_find_gaps`, `kb_trace_claim`, `kb_make_handoff`, `kb_search`, `kb_search_file`, `kb_list_catalog`, and `kb_read_note` over ad hoc shell lookups. On shared HTTP MCP, prefer passing raw text to `kb_search_file` instead of a local laptop path.
6. When contradictory knowledge appears, update the canonical note and mark the older source note `status: superseded` so it drops out of default retrieval.
7. For long papers such as arXiv sources, prefer `kb:deep-read` over full-PDF ingestion by default: keep the processed source note compact, then add a selective deep-read note only for sections that materially improve future synthesis.

## Codex And Claude Code Awareness

- Codex uses `AGENTS.md` as the main repo instruction file, so keep the KB workflow documented here.
- `CLAUDE.md` exists only to direct Claude Code back to `AGENTS.md`.
- Both agents should treat KB lookup as part of the default workflow for research, architecture, eval, tool-use, and agent-systems tasks.
- When configuring external repos, point them at `bin/mcp.ts` in this repository through their MCP client config rather than relying only on shell snippets.
- For team-shared access, prefer the hosted HTTP MCP endpoint while keeping local stdio for personal use.
