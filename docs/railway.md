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
   - optionally `KB_ALLOWED_ORIGINS=https://codex.example.com,https://claude.example.com` if you want browser-origin allowlisting
   - optionally the search-telemetry variables below if you want to capture and review privacy-safe search observations
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
- Railway deployments inherit a simple in-memory per-client rate limit and a request body cap; raise them with `KB_RATE_LIMIT_MAX_REQUESTS`, `KB_RATE_LIMIT_WINDOW_MS`, or `KB_MAX_BODY_BYTES` only if a real client workflow needs it.
- The derived index should live in `KB_CACHE_DIR`, not the repo root, so hosted refreshes can safely rewrite cache files.
- Restarts are configured in [railway.toml](../railway.toml).
- Each merge to the tracked branch should trigger a new deploy with the latest KB content.

## Search Telemetry And Admin Reports

The hosted server can record privacy-safe search observations (query/result diagnostics and `kb_search_file` context labels, never raw pasted file text) and expose them through token-gated admin endpoints. All of this is opt-in.

Relevant variables:

- `KB_SEARCH_TELEMETRY_ENABLED` — defaults to `true`. Set to `false` to disable observation capture entirely.
- `KB_SEARCH_OBSERVATION_LOG_PATH` — absolute path to the NDJSON observation log. On Railway this must point at a **mounted persistent volume** (e.g. attach a volume at `/data` and set `KB_SEARCH_OBSERVATION_LOG_PATH=/data/search-observations.ndjson`). Without a volume the log lives on the ephemeral container filesystem and is lost on every deploy/restart. Leave unset to keep telemetry in-memory only for the container lifetime.
- `KB_SEARCH_TELEMETRY_SALT` — secret salt used to hash client identifiers before they are written to the log. Set it so observations cannot be linked back to a raw client identity. The salt value is never returned by `/health` (only a `telemetryHashingConfigured` readiness boolean).
- `KB_ADMIN_TOKEN` — bearer token that gates the admin telemetry routes. When unset, the admin routes are not registered. The token value is never returned by `/health` (only an `adminTelemetryConfigured` readiness boolean).

Admin endpoints (only mounted when `KB_ADMIN_TOKEN` is set):

- `GET /admin/search-observations/report` — aggregated report of repeated/low-quality queries. Supports `?format=text|json`, `?limit=`, `?minCount=`, `?maxTopScoreGap=`. Mirrors `bun run kb:search-report`.
- `GET /admin/search-observations/export` — raw observations. Supports `?format=ndjson|json`, `?limit=`, `?tool=`, `?query=`.

Authenticate with either header:

```bash
curl -H "Authorization: Bearer $KB_ADMIN_TOKEN" \
  "https://your-service.up.railway.app/admin/search-observations/report?format=text"
```

`/health` reports `searchTelemetryEnabled`, `telemetryHashingConfigured`, and `adminTelemetryConfigured` so you can confirm readiness without exposing any secret values.

## If You Ever Want Remote Writes

Do not turn on `KB_ENABLE_WRITES` casually.

If you ever need remote editing, do it deliberately:

- attach a storage strategy for persisted changes
- add a git sync or PR workflow
- gate writes behind auth and review

Until then, Railway should stay a shared retrieval surface, not the canonical editor.
