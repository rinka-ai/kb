# Shared MCP Deployment

This repository now supports both:

- local stdio MCP via `bun run kb:mcp`
- hosted Streamable HTTP MCP via `bun run kb:mcp:http`

## Recommended Team Architecture

- Keep the markdown KB in git.
- Use pull requests for source-note and wiki changes.
- Host the HTTP MCP server against the latest deployed checkout.
- Keep hosted writes disabled by default with `KB_ENABLE_WRITES=false`.
- Let CI rebuild the KB index and run lint checks on every merge.
- Railway is the recommended first host for the shared HTTP MCP service.

## Environment Variables

- `HOST`: bind address for the HTTP server. Default: `127.0.0.1`
- `PORT`: listen port. Default: `3000`
- `KB_STATEFUL_SESSIONS`: `true` or `false`. Default: `false`
- `KB_ENABLE_WRITES`: `true` or `false`. Default: `false`
- `KB_CACHE_DIR`: writable directory for the derived index on hosted deployments
- `KB_ALLOWED_HOSTS`: optional comma-separated allowlist for host-header validation
- `KB_ALLOWED_ORIGINS`: optional comma-separated allowlist for `Origin` header validation
- `KB_MAX_BODY_BYTES`: maximum accepted MCP POST body size. Default: `1048576`
- `KB_RATE_LIMIT_WINDOW_MS`: per-client rate-limit window in milliseconds. Default: `60000`
- `KB_RATE_LIMIT_MAX_REQUESTS`: max MCP requests per client within the window. Default: `120`

## Local HTTP Run

```bash
bun run kb:mcp:http
```

Health check:

```bash
curl http://127.0.0.1:3000/health
```

## Docker Run

```bash
docker build -t ai-research-kb .
docker run --rm -p 3000:3000 \
  -e HOST=0.0.0.0 \
  -e PORT=3000 \
  -e KB_CACHE_DIR=/home/bun/.cache/ai-research-kb \
  -e KB_STATEFUL_SESSIONS=false \
  -e KB_ENABLE_WRITES=false \
  -e KB_ALLOWED_ORIGINS=https://codex.example.com,https://claude.example.com \
  ai-research-kb
```

## Railway

This repo includes a root [railway.toml](../railway.toml) and a Dockerfile that prebuilds the KB index during image build. Railway should be pointed at this repository as a Dockerfile-backed web service.

For the full Railway setup flow, see [railway.md](./railway.md).

## Team Client Registration

Keep the current local stdio registration for personal work and add a second shared server name for the hosted endpoint:

```bash
codex mcp add ai-research-kb-shared --url https://kb.example.com/mcp
```

```bash
claude mcp add --transport http --scope user ai-research-kb-shared https://kb.example.com/mcp
```

That lets each client keep:

- `ai-research-kb`: local stdio server on the contributor's machine
- `ai-research-kb-shared`: hosted team-wide server

## Operational Guidance

- Put the hosted server behind your normal auth/network controls.
- Prefer read/query access over direct remote writes.
- If you enable writes, treat the deployment as an editor against a git checkout and add a review workflow around it.
- On Railway, the default and safest model is read-only shared retrieval. Image filesystem writes are not your canonical source of truth.
- For read-only hosted KB access, prefer stateless HTTP sessions. They avoid in-memory session loss and SSE edge timeouts on platforms like Railway.
- The hosted server now applies a request-size cap and a simple per-client rate limit by default. Tune them with `KB_MAX_BODY_BYTES`, `KB_RATE_LIMIT_WINDOW_MS`, and `KB_RATE_LIMIT_MAX_REQUESTS` if needed.
