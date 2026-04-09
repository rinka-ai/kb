# AI Research KB

This repository is a markdown-first knowledge base for articles, papers, repos, datasets, and derived research notes about building with AI.

It supports two operating modes:

- personal/local use through filesystem workflows and a local stdio MCP server
- shared/team use through git, pull requests, and a hosted Streamable HTTP MCP server

## What This Repo Is

- `raw/articles/`: source notes and imported material
- `raw/images/`: local images related to source material
- `wiki/concepts/`: concept pages synthesized across many sources
- `wiki/summaries/`: multi-source summaries, memos, and reports
- `wiki/index/`: maps of content and navigation pages
- `scripts/`: Bun + TypeScript KB tooling
- `.kb/`: derived search index built from markdown files

## Core Workflow

1. Ingest source material into `raw/articles/`.
2. Synthesize durable notes into `wiki/`.
3. Rebuild the KB index with `bun run kb:refresh`.
4. Retrieve relevant notes with search or MCP tools.
5. Keep the current canonical view active and mark older contradictory notes `status: superseded`.

## Local Usage

Refresh the KB:

`bun run kb:refresh`

Search by topic:

`bun run kb:search --query "managed agents context engineering"`

Search from active file context:

`bun run kb:search --file /absolute/path/to/file.ts`

Run the local stdio MCP server:

`bun run kb:mcp`

## Shared Team Usage

Run the hosted Streamable HTTP MCP server:

`bun run kb:mcp:http`

Containerize it:

`docker build -t ai-research-kb .`

Railway is the recommended first host for the shared/team HTTP server:

- add this repo as a Railway service
- let Railway build from the included `Dockerfile`
- keep `KB_ENABLE_WRITES=false`
- expose the service with Railway Public Networking

For shared deployment details, see [mcp-deployment.md](/Users/josemanuelcerqueira/Desktop/ai-research/docs/mcp-deployment.md).
For the Railway-specific path, see [railway.md](/Users/josemanuelcerqueira/Desktop/ai-research/docs/railway.md).

## MCP Surface

Tools:

- `kb_search`
- `kb_search_file`
- `kb_read_note`
- `kb_refresh`
- `kb_ingest`

Resources:

- `kb://stats`
- `kb://catalog`

By default, search excludes notes marked `status: superseded`. Include them only when you intentionally want historical contradictions.

## Documentation

- Repo workflow and authoring rules: [AGENTS.md](/Users/josemanuelcerqueira/Desktop/ai-research/AGENTS.md)
- Claude Code usage: [CLAUDE.md](/Users/josemanuelcerqueira/Desktop/ai-research/CLAUDE.md)
- MCP setup and commands: [mcp-server.md](/Users/josemanuelcerqueira/Desktop/ai-research/docs/mcp-server.md)
- Shared deployment: [mcp-deployment.md](/Users/josemanuelcerqueira/Desktop/ai-research/docs/mcp-deployment.md)
- Cross-repo access: [external-agent-access.md](/Users/josemanuelcerqueira/Desktop/ai-research/docs/external-agent-access.md)

## Current Rule On Contradictions

If the KB contains contradictory knowledge, keep the current canonical note active. Preserve older material for provenance, but mark it `status: superseded` and point `superseded_by` at the current note so it drops out of default retrieval.
