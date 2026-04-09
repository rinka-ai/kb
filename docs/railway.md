# Railway Deployment

This is the recommended first shared host for the team HTTP MCP server.

## What Gets Deployed

- Railway deploys the HTTP MCP server from [bin/mcp-http.ts](../bin/mcp-http.ts).
- The root [Dockerfile](../Dockerfile) installs dependencies and runs `bun run kb:refresh` during image build.
- The root [railway.toml](../railway.toml) tells Railway to use the Dockerfile and health-check `/health`.

## Recommended Model

- Keep the KB repo in GitHub.
- Let Railway deploy from the main branch.
- Keep `KB_ENABLE_WRITES=false`.
- Treat the hosted server as shared read/query infrastructure.
- Keep canonical KB edits in git via pull requests.

This matters because Railway deploys an image from the repo. It is excellent for shared retrieval, but it is not the right place for unreviewed canonical note edits.

## Railway Setup

1. Create a new Railway project and add this GitHub repo as a service.
2. Railway should detect the root `Dockerfile`. Keep that builder path.
3. In service variables, set:
   - `HOST=0.0.0.0`
   - `KB_CACHE_DIR=/home/bun/.cache/ai-research-kb`
   - `KB_STATEFUL_SESSIONS=false`
   - `KB_ENABLE_WRITES=false`
4. Do not set `PORT` manually unless you have a special reason. Railway injects it.
5. In Railway Public Networking, generate a Railway domain.
6. After deploy, verify `https://<your-domain>/health`.

## Client Registration

Once Railway gives you a public URL, teammates can attach it as a second shared MCP server.

Codex:

```bash
codex mcp add ai-research-kb-shared --url https://your-service.up.railway.app/mcp
```

Claude Code:

```bash
claude mcp add --transport http --scope user ai-research-kb-shared https://your-service.up.railway.app/mcp
```

Keep the local stdio server too:

- `ai-research-kb`: local personal KB access
- `ai-research-kb-shared`: Railway-hosted team KB access

## Operational Notes

- Public Networking gives the service an HTTPS Railway domain.
- The health check path is `/health`.
- The hosted KB is intentionally stateless by default, so `GET /mcp` may return `405` and clients should use `POST /mcp` for normal traffic.
- The derived index should live in `KB_CACHE_DIR`, not the repo root, so hosted refreshes can safely rewrite cache files.
- Restarts are configured in [railway.toml](../railway.toml).
- Each merge to the tracked branch should trigger a new deploy with the latest KB content.

## If You Ever Want Remote Writes

Do not turn on `KB_ENABLE_WRITES` casually.

If you ever need remote editing, do it deliberately:

- attach a storage strategy for persisted changes
- add a git sync or PR workflow
- gate writes behind auth and review

Until then, Railway should stay a shared retrieval surface, not the canonical editor.
