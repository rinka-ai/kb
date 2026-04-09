# External Agent Access

This knowledge base can be queried from other repositories, and MCP is now the preferred way to do it.

## Important Reality

- Claude Code or Codex working in another directory will not automatically discover this KB.
- The KB is accessible from anywhere on the same machine through a local stdio MCP server.
- The missing piece is awareness and mounting, not storage.

## Preferred Pattern: Mount The MCP Server

Point the other repo's MCP-capable agent client at this entrypoint:

```json
{
  "command": "bun",
  "args": ["/path/to/ai-research/bin/mcp.ts"]
}
```

Useful MCP tools once attached:

- `kb_build_context`
- `kb_find_gaps`
- `kb_make_handoff`
- `kb_search`
- `kb_search_file`
- `kb_read_note`
- `kb_refresh`
- `kb_trace_claim`
- `kb_ingest`

For a team-hosted deployment, use a second server name and an HTTP endpoint instead:

```bash
codex mcp add ai-research-kb-shared --url https://<your-host>/mcp
```

```bash
claude mcp add --transport http --scope user ai-research-kb-shared https://<your-host>/mcp
```

Tested local registration commands:

```bash
codex mcp add ai-research-kb -- bun /path/to/ai-research/bin/mcp.ts
```

```bash
claude mcp add --scope user ai-research-kb -- bun /path/to/ai-research/bin/mcp.ts
```

## Fallback Pattern

If you cannot mount MCP in that client yet, add a short section like this to the other repository's `CLAUDE.md` or `AGENTS.md`:

```md
## External Knowledge Base

For AI agent architecture, evals, tool use, MCP, context engineering, retrieval, and research workflow questions, consult the shared KB at `/path/to/ai-research`.

Useful commands:

- `bun --cwd /path/to/ai-research run kb:search --query "<topic>"`
- `bun --cwd /path/to/ai-research run kb:search --file /absolute/path/to/current/file.ts`
- `bun --cwd /path/to/ai-research run kb:refresh`
```

## Example Queries

- `bun --cwd /path/to/ai-research run kb:search --query "managed agents harness design sandboxing"`
- `bun --cwd /path/to/ai-research run kb:search --query "context rot retrieval long context"`
- `bun --cwd /path/to/ai-research run kb:search --file /path/to/some-other-repo/src/agent.ts`

## When This Is Enough

This works well when:

- the agent can run shell commands
- the agent can access the shared absolute path
- you are comfortable telling the agent about the KB explicitly

## Current Recommendation

Use the MCP server when possible. Keep the shell-command pattern only as a fallback for clients that do not support MCP yet.
