# AI Research KB

This repo is a markdown-first knowledge base for articles, papers, repos, datasets, and derived research notes about building with AI.

It supports both local/personal workflows and shared/team access through a hosted MCP server.

The canonical top-level overview now lives in [README.md](/Users/josemanuelcerqueira/Desktop/ai-research/README.md).

## Layout

- `raw/articles/`: source articles captured as structured markdown
- `raw/images/`: local images related to source material
- `wiki/concepts/`: concept pages synthesized across many sources
- `wiki/summaries/`: multi-source summaries, memos, and reports
- `wiki/index/`: maps of content, reading queues, and overview pages
- `scripts/`: local KB tooling for build, search, and lint workflows
- `.kb/`: derived search index built from markdown files

## Quick Start

Build or refresh the local KB:

`bun run kb:refresh`

Ingest a new URL into the KB:

`bun run kb:ingest --url https://example.com/article --tags agents,tool-use`

Watch the KB and auto-rebuild the index when notes change:

`bun run kb:watch --lint`

Run the KB as a local MCP server for Claude Code, Codex, or any other MCP client:

`bun run kb:mcp`

Run the KB as a shared Streamable HTTP MCP server:

`bun run kb:mcp:http`

Search by topic:

`bun run kb:search --query "managed agents sandboxing context engineering"`

Search including superseded or outdated notes:

`bun run kb:search --query "managed agents sandboxing context engineering" --include-superseded`

Search based on a file you are actively working on:

`bun run kb:search --file /absolute/path/to/file.ts`

Run health checks:

`bun run kb:lint`

Format and lint the TypeScript tooling:

`bun run biome:write`

## MCP

The preferred shared-access path is now MCP, not shell snippets. The server entrypoint is:

`/Users/josemanuelcerqueira/Desktop/ai-research/scripts/kb-mcp.ts`

Hosted/team entrypoint:

`/Users/josemanuelcerqueira/Desktop/ai-research/scripts/kb-mcp-http.ts`

Any MCP-capable client can launch it with a stdio command equivalent to:

```json
{
  "command": "bun",
  "args": ["/Users/josemanuelcerqueira/Desktop/ai-research/scripts/kb-mcp.ts"]
}
```

The server exposes:

- `kb_search`
- `kb_search_file`
- `kb_read_note`
- `kb_refresh`
- `kb_ingest`

It also exposes read-only resources:

- `kb://stats`
- `kb://catalog`

For shared deployment, see `docs/mcp-deployment.md`.

## Working Rules

- Preserve source material clearly.
- Separate source claims from personal interpretation.
- Keep one source article per file.
- Prefer stable markdown headings and frontmatter over ad hoc formatting.
- Add derived notes back into `wiki/` so research compounds over time.
- If knowledge changes, keep the current canonical note active and mark older contradictory notes `status: superseded` so they disappear from default retrieval.

## First Source Doc

The first structured source document lives at `raw/articles/2026-04-08-llm-knowledge-bases.md`.

## Agent Guidance

For repo-specific authoring and maintenance rules, see `AGENTS.md`.

## Use From Other Repos

If Claude Code or Codex is running in a different directory, mount this repo's MCP server there. Shell access via `bun --cwd ...` still works, but MCP is now the cleaner default.

See `docs/external-agent-access.md` for the copy-paste integration snippet.
