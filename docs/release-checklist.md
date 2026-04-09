# Release Checklist

Use this before sharing the repository publicly or announcing major updates.

## Repo Quality

- `bun install`
- `bun run check`
- README reflects the current structure and commands
- docs use repo-relative links instead of machine-local paths

## KB Integrity

- `bun run kb:refresh` passes
- important new notes have frontmatter and required headings
- contradictory older notes are marked `status: superseded` when needed

## MCP And Deployment

- local stdio MCP still starts
- HTTP MCP server responds on `/health`
- deployment docs match the current host setup

## Community Readiness

- issue templates are present
- PR template is present
- CONTRIBUTING and SECURITY docs are up to date
- legal/license decision has been made explicitly
