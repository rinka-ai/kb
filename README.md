# AI Research KB

[![CI](https://github.com/rinka-ai/kb/actions/workflows/ci.yml/badge.svg)](https://github.com/rinka-ai/kb/actions/workflows/ci.yml)

This repository is a markdown-first knowledge base for articles, papers, repos, datasets, and derived research notes about building with AI.

It supports two operating modes:

- personal/local use through filesystem workflows and a local stdio MCP server
- shared/team use through git, pull requests, and a hosted Streamable HTTP MCP server

## Why This Exists

This repo treats AI research as a durable system rather than a chat transcript:

- `raw/` stores source material and provenance
- `wiki/` stores synthesized understanding
- `.kb/` or `KB_CACHE_DIR` stores a rebuildable retrieval index
- MCP exposes the KB to Codex, Claude Code, and other compatible clients

## What This Repo Is

- `raw/articles/`: source notes and imported material
  Source notes include a canonical repo-relative `path` in frontmatter for agent-readable provenance.
- `raw/images/`: local images related to source material
- `wiki/concepts/`: concept pages synthesized across many sources
- `wiki/summaries/`: multi-source summaries, memos, and reports
- `wiki/index/`: maps of content and navigation pages
- `bin/`: executable entrypoints like `search.ts` and `mcp-http.ts`
- `src/core/`: indexing, ingest, lint, refresh, and search internals
- `src/mcp/`: MCP server construction and stdio transport
- `src/http/`: HTTP server, config, and route handlers
- `__tests__/`: test suites organized by subsystem
- `.kb/`: derived search index built from markdown files

## Core Workflow

1. Ingest source material into `raw/articles/`.
2. Synthesize durable notes into `wiki/`.
3. Rebuild the KB index with `bun run kb:refresh`.
4. Retrieve relevant notes with search or MCP tools.
5. Keep the current canonical view active and mark older contradictory notes `status: superseded`.

## Local Usage

Install dependencies:

`bun install`

Refresh the KB:

`bun run kb:refresh`

Search by topic:

`bun run kb:search --query "managed agents context engineering"`

Search from active file context:

`bun run kb:search --file /absolute/path/to/file.ts`

Summarize repeated remote HTTP MCP search observations:

`bun run kb:search-report`

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
- keep `KB_STATEFUL_SESSIONS=false`
- keep `KB_ENABLE_WRITES=false`
- expose the service with Railway Public Networking

Current shared MCP endpoint:

- `https://kb-production-1c43.up.railway.app/mcp`

Attach it in Codex:

```bash
codex mcp add ai-research-kb-shared --url https://kb-production-1c43.up.railway.app/mcp
```

Attach it in Claude Code:

```bash
claude mcp add --transport http --scope user ai-research-kb-shared https://kb-production-1c43.up.railway.app/mcp
```

Sanity-check the deployed service:

- root: `https://kb-production-1c43.up.railway.app/`
- health: `https://kb-production-1c43.up.railway.app/health`
- MCP endpoint: `https://kb-production-1c43.up.railway.app/mcp`

For hosted stateless deployments, `POST /mcp` is the normal MCP path. A plain `GET /mcp` may return `405 Method Not Allowed`, which is expected when standalone SSE is disabled.

Hosted HTTP MCP search telemetry is enabled by default so the team can learn from real retrieval traffic. The observation log keeps query text, query-expansion diagnostics, and top-result diagnostics. For `kb_search_file`, it keeps the `contextLabel` and text size only, not the raw pasted file text. Review the log with `bun run kb:search-report`.

Optional hosted search telemetry environment variables:

- `KB_SEARCH_TELEMETRY_ENABLED=false` disables HTTP MCP search observations
- `KB_SEARCH_OBSERVATION_LOG_PATH=/absolute/path/to/search-observations.ndjson` overrides the default log path
- `KB_SEARCH_TELEMETRY_SALT=...` enables privacy-safe client hashing so repeated bad queries can be grouped by caller without storing raw IPs
- `KB_ADMIN_TOKEN=...` enables protected admin telemetry endpoints for remote inspection

For shared deployment details, see [docs/mcp-deployment.md](./docs/mcp-deployment.md).
For the Railway-specific path, see [docs/railway.md](./docs/railway.md).

If `KB_ADMIN_TOKEN` is set, you can inspect remote telemetry without shell access to the host:

```bash
curl -H "Authorization: Bearer $KB_ADMIN_TOKEN" \
  https://kb.example.com/admin/search-observations/report?format=text
```

```bash
curl -H "Authorization: Bearer $KB_ADMIN_TOKEN" \
  "https://kb.example.com/admin/search-observations/export?format=json&tool=kb_search&limit=200"
```

## MCP Surface

Tools:

- `kb_build_context`
- `kb_find_gaps`
- `kb_list_catalog`
- `kb_make_handoff`
- `kb_search`
- `kb_search_file`
- `kb_read_note`
- `kb_refresh`
- `kb_trace_claim`
- `kb_ingest`

Resources:

- `kb://stats`
- `kb://catalog`
- `kb://catalog/page/{page}`

`kb://catalog` is an overview resource, not a full corpus dump. Use `kb_list_catalog` or `kb://catalog/page/{page}` when you need to browse at scale.

The higher-level tools are intentionally grounded in this repo's own wiki model:

- `kb_build_context` compiles a task-specific context pack from concept pages and source notes.
  Pass `compact=true` when you want a lighter-weight context pack that is less likely to flood client context windows.
- `kb_find_gaps` runs wiki health checks for orphan notes, thin concepts, uncovered tags, and unreviewed ingests.
- `kb_trace_claim` traces a claim through synthesis notes and primary source paths.
- `kb_make_handoff` turns the current wiki view into a reusable long-running-agent handoff artifact.
- `kb_search_file` accepts either a host-local `filePath` or raw `text`, which makes it usable both locally and over shared HTTP MCP.

By default, search and catalog browsing exclude notes marked `status: superseded`. Include them only when you intentionally want historical contradictions.

## Quality Gate

Run the full repo quality check before opening a PR:

`bun run check`

This runs:

- Biome formatting and lint checks
- TypeScript typechecking
- Bun tests from `__tests__/`
- KB refresh and linting

## Documentation

- Repo workflow and authoring rules: [AGENTS.md](./AGENTS.md)
- Claude Code usage: [CLAUDE.md](./CLAUDE.md)
- Contributing guide: [CONTRIBUTING.md](./CONTRIBUTING.md)
- Security policy: [SECURITY.md](./SECURITY.md)
- Code of conduct: [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md)
- MCP setup and commands: [docs/mcp-server.md](./docs/mcp-server.md)
- Shared deployment: [docs/mcp-deployment.md](./docs/mcp-deployment.md)
- Cross-repo access: [docs/external-agent-access.md](./docs/external-agent-access.md)
- Release checklist: [docs/release-checklist.md](./docs/release-checklist.md)

## Current Rule On Contradictions

If the KB contains contradictory knowledge, keep the current canonical note active. Preserve older material for provenance, but mark it `status: superseded` and point `superseded_by` at the current note so it drops out of default retrieval.
