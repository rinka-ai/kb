# Contributing

Thanks for improving the AI Research KB.

## Local Setup

1. Install [Bun](https://bun.sh/).
2. Clone the repo.
3. Run `bun install`.
4. Run `bun run kb:refresh`.

## Common Commands

- `bun run kb:refresh`: rebuild the KB index and run lint checks
- `bun run kb:search --query "..."`: search the KB
- `bun run kb:ingest --url <url>`: ingest a new source note
- `bun run biome:write`: format the codebase
- `bun run check`: run the full quality gate

## Contribution Guidelines

- Preserve source text and provenance.
- Keep source notes and synthesized wiki notes clearly separated.
- Favor small, reviewable pull requests.
- Update docs when behavior, commands, or structure change.
- Do not silently rewrite historical source material.
- Mark contradictory older notes as `status: superseded` and set `superseded_by`.

## Before Opening A Pull Request

Run:

```bash
bun run check
```

If your change affects the hosted MCP server, also smoke-test:

```bash
bun run kb:mcp:http
```

## Project Structure

- `raw/`: durable source material
- `wiki/`: compiled knowledge and synthesis
- `bin/`: executable entrypoints
- `src/`: internal implementation
- `__tests__/`: test suites organized by subsystem
- `docs/`: operational and integration docs
