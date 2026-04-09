---
id: index-kb-system
type: index
title: KB System
---

# KB System

## Goal

Turn this repo from a pile of markdown files into an inspectable, agent-friendly knowledge operating system:

- source notes are durable
- retrieval is local and fast
- synthesis compounds into `wiki/`
- maintenance is partly automated

## Karpathy-Style Loop

1. Ingest source material into `raw/articles/`.
   - or use `bun run kb:ingest --url <url>`
2. Compile durable synthesis into `wiki/concepts/` and `wiki/summaries/`.
3. Rebuild the local KB index with `bun run kb:build`.
4. Retrieve relevant notes during active work with `bun run kb:search`.
5. Run health checks with `bun run kb:lint`.
6. Expose the KB through `bun run kb:mcp` so other agent sessions can query it cleanly.
7. Expose the KB through `bun run kb:mcp:http` when the knowledge base needs a shared team endpoint.
8. Periodically automate steps 3-7.

## Retrieval Patterns

- Query-driven:
  - `bun run kb:search --query "context engineering eval contamination"`
- Work-context-driven:
  - `bun run kb:search --file /absolute/path/to/current/file`
- MCP-driven:
  - attach `bin/mcp.ts`
  - use `kb_search`, `kb_search_file`, `kb_read_note`, and `kb_refresh`
- Team-hosted MCP:
  - deploy `bin/mcp-http.ts`
  - register clients against `https://<your-host>/mcp`
- Ingestion:
  - `bun run kb:ingest --url https://example.com/post --tags agents,evals`
- Maintenance:
  - `bun run kb:refresh`
  - `bun run kb:watch --lint`

## What Makes This Useful To Agents

- The KB is local markdown, so agents can inspect and edit it directly.
- Search returns exact file paths, sections, summaries, and snippets.
- The index is derived and rebuildable, so retrieval stays portable.
- Linting keeps metadata and wiki links from drifting.
- Contradictory older notes can remain for provenance but should be marked `status: superseded`, which removes them from default retrieval.

## Next Layer For Automation

- Daily or on-demand `kb_refresh`
- URL ingestion helpers for new articles
- related-note suggestions based on tags and lexical overlap
- background concept-page refresh jobs

## Related

- [[context-engineering]]
- [[agent-memory]]
- [[managed-agents]]
- [[ai-agent-evals]]
