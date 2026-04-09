---
id: article-2025-06-26-desktop-extensions
type: source
title: "Desktop Extensions: One-click MCP server installation for Claude Desktop"
author: Anthropic
publisher: Anthropic
url: https://www.anthropic.com/engineering/desktop-extensions
date_published: 2025-06-26
date_added: 2026-04-09
tags: [mcp, claude-desktop, packaging, extensions]
status: processed
quality: high
summary: Anthropic introduces Desktop Extensions as an installable packaging format for local MCP servers, aiming to remove manual configuration, runtime dependencies, and discovery friction for Claude Desktop users.
related: [mcp, claude-desktop, extensions, packaging]
---

# Desktop Extensions: One-click MCP server installation for Claude Desktop

## Source Metadata

- Author: Anthropic
- Published: 2025-06-26
- Publisher: Anthropic
- URL: https://www.anthropic.com/engineering/desktop-extensions

## TL;DR

This post is about packaging and distribution rather than core model behavior: make MCP servers installable like desktop extensions so non-technical users can actually use them.

## Key Claims

- MCP installation friction is a major barrier to adoption.
- Packaging local servers with dependencies removes a lot of setup complexity.
- Better distribution primitives matter for the practical ecosystem around agent tools.

## Important Details

- Desktop Extensions bundle the server, dependencies, and manifest into a single file.
- The post later notes a naming update from `.dxt` to `.mcpb`.
- Anthropic frames this as an accessibility and discoverability improvement.

## Entities

- Concepts: Desktop Extensions, `.mcpb`, packaging, dependency bundling
- Product: Claude Desktop

## My Notes

- This is important if the KB grows toward product and ecosystem thinking around tools.

## Open Questions

- What packaging and discovery layers are still missing for broader MCP adoption?

## Related

- [[mcp]]
- [[tool-use]]
- [[claude-desktop]]

## Source Text

Not copied locally. Use the source URL above if the full text is needed.
