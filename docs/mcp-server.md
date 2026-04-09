# KB MCP Server

This repository exposes the knowledge base through two MCP transports:

- local stdio
- hosted Streamable HTTP

## Entrypoint

- Script: `bin/mcp.ts`
- Local convenience command: `bun run kb:mcp`
- Hosted script: `bin/mcp-http.ts`
- Hosted convenience command: `bun run kb:mcp:http`

## What It Exposes

Tools:

- `kb_build_context`: compile a task-specific context pack from the wiki's concept and source-note structure
  - pass `compact=true` when you want a smaller response for token-sensitive clients
- `kb_find_gaps`: run wiki health checks for orphan notes, thin concepts, uncovered tags, and unreviewed ingests
- `kb_list_catalog`: browse the KB catalog page by page with optional filters
- `kb_make_handoff`: turn the current wiki view into a reusable handoff packet for another agent or future session
- `kb_search`: search the KB by free-text query
- `kb_search_file`: search the KB using either a host-local file path or raw text as retrieval context
- `kb_read_note`: read a markdown note by KB path, basename slug, or absolute path
- `kb_refresh`: rebuild the index and run lint checks
- `kb_trace_claim`: trace a claim through synthesis notes and primary source paths
- `kb_ingest`: ingest a URL or local file into the KB schema

Resources:

- `kb://stats`: index metadata and lint warnings
- `kb://catalog`: catalog overview, counts, and a bounded sample
- `kb://catalog/page/{page}`: paginated catalog browse resource at the default page size

## Generic MCP Launch Block

Use a stdio MCP configuration equivalent to:

```json
{
  "command": "bun",
  "args": ["/path/to/ai-research/bin/mcp.ts"]
}
```

This works well for cross-repo usage because it does not depend on the calling repo's current working directory.

## Hosted HTTP Launch Block

For a team-shared deployment, serve the HTTP entrypoint and register clients against:

```text
https://<your-host>/mcp
```

Client commands:

```bash
codex mcp add ai-research-kb-shared --url https://<your-host>/mcp
```

```bash
claude mcp add --transport http --scope user ai-research-kb-shared https://<your-host>/mcp
```

## Tested Client Commands

These exact commands were used successfully on this machine:

```bash
codex mcp add ai-research-kb -- bun /path/to/ai-research/bin/mcp.ts
```

```bash
claude mcp add --scope user ai-research-kb -- bun /path/to/ai-research/bin/mcp.ts
```

Removal commands:

```bash
codex mcp remove ai-research-kb
```

```bash
claude mcp remove "ai-research-kb" -s user
```

## Operational Notes

- Prefer `kb_build_context` before long-running research, planning, or synthesis work.
- Prefer `kb_build_context(compact=true)` when the client warns that a full context pack is too large.
- Prefer `kb_find_gaps` when you want the Karpathy-style wiki maintenance loop rather than one-off retrieval.
- Prefer `kb_trace_claim` before turning a wiki claim into an external-facing assertion.
- Prefer `kb_make_handoff` when a task will span sessions, subagents, or parallel work.
- Prefer `kb_search` when you already know the topic or question.
- Prefer `kb_list_catalog` when you need to browse many notes or inspect a collection.
- Treat `kb://catalog` as a lightweight overview resource; it intentionally avoids returning the full corpus in one payload.
- `kb_search` and `kb_search_file` auto-refresh the index when markdown files are newer than the derived index in `.kb/` or `KB_CACHE_DIR`.
- For shared HTTP MCP, prefer passing `text` to `kb_search_file` because your laptop path usually will not exist on the server host.
- Both search tools exclude notes with `status: superseded` by default; pass `includeSuperseded=true` only when you intentionally want historical contradictions.
- Catalog browsing also excludes `status: superseded` by default unless you opt in.
- `kb_refresh` is still useful after larger KB editing passes. On hosted deployments it only rewrites the derived cache, not the source markdown corpus.
- `kb_watch` remains optional for background maintenance, but the MCP server does not require it to stay correct.
- The hosted HTTP server defaults to `KB_ENABLE_WRITES=false`, so shared deployments are read/query-first unless you opt into remote writes.
- Set `KB_CACHE_DIR` to a writable path on hosted deployments so refresh and auto-rebuild can update the derived index safely.
