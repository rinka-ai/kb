# KB MCP Server

This repository exposes the knowledge base through two MCP transports:

- local stdio
- hosted Streamable HTTP

## Entrypoint

- Script: `/Users/josemanuelcerqueira/Desktop/ai-research/scripts/kb-mcp.ts`
- Local convenience command: `bun run kb:mcp`
- Hosted script: `/Users/josemanuelcerqueira/Desktop/ai-research/scripts/kb-mcp-http.ts`
- Hosted convenience command: `bun run kb:mcp:http`

## What It Exposes

Tools:

- `kb_search`: search the KB by free-text query
- `kb_search_file`: search the KB using a local file as retrieval context
- `kb_read_note`: read a markdown note by KB path, basename slug, or absolute path
- `kb_refresh`: rebuild the index and run lint checks
- `kb_ingest`: ingest a URL or local file into the KB schema

Resources:

- `kb://stats`: index metadata and lint warnings
- `kb://catalog`: flat list of KB markdown documents

## Generic MCP Launch Block

Use a stdio MCP configuration equivalent to:

```json
{
  "command": "bun",
  "args": ["/Users/josemanuelcerqueira/Desktop/ai-research/scripts/kb-mcp.ts"]
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
codex mcp add ai-research-kb -- bun /Users/josemanuelcerqueira/Desktop/ai-research/scripts/kb-mcp.ts
```

```bash
claude mcp add --scope user ai-research-kb -- bun /Users/josemanuelcerqueira/Desktop/ai-research/scripts/kb-mcp.ts
```

Removal commands:

```bash
codex mcp remove ai-research-kb
```

```bash
claude mcp remove "ai-research-kb" -s user
```

## Operational Notes

- `kb_search` and `kb_search_file` auto-refresh the index when markdown files are newer than `.kb/index.json`.
- Both search tools exclude notes with `status: superseded` by default; pass `includeSuperseded=true` only when you intentionally want historical contradictions.
- `kb_refresh` is still useful after larger KB editing passes.
- `kb_watch` remains optional for background maintenance, but the MCP server does not require it to stay correct.
- The hosted HTTP server defaults to `KB_ENABLE_WRITES=false`, so shared deployments are read/query-first unless you opt into remote writes.
