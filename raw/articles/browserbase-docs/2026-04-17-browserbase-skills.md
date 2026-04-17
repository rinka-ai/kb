---
id: article-2026-04-17-browserbase-skills
type: source
title: "Browserbase Skills"
path: raw/articles/browserbase-docs/2026-04-17-browserbase-skills.md
author: Browserbase
publisher: Browserbase Documentation
url: https://docs.browserbase.com/integrations/skills/introduction
date_published:
date_added: 2026-04-17
tags: [browserbase, skills, browser-automation, functions, tools]
status: processed
quality: high
summary: Browserbase describes skills as modular capability packs that teach coding agents how to use browser sessions, lightweight fetches, deployment workflows, and the `bb` CLI through structured, workflow-specific guidance.
related: [agent-skills, agent-tools, computer-use]
---

# Browserbase Skills

## Source Metadata

- Path: raw/articles/browserbase-docs/2026-04-17-browserbase-skills.md
- Author: Browserbase
- Published: Unknown
- Publisher: Browserbase Documentation
- URL: https://docs.browserbase.com/integrations/skills/introduction

## TL;DR

Browserbase presents skills as modular capability packs for coding agents. The main pattern is progressive disclosure by workflow: separate skill surfaces teach the agent when to use interactive browser sessions, lightweight fetches, deployment workflows, or direct `bb` CLI commands.

## Key Claims

- Skills are modular capabilities that package domain-specific instructions, workflows, and best practices for AI agents.
- Browser automation benefits from separate skill surfaces for browsing, fetching, deployment, and CLI management instead of one overloaded monolith.
- Skills are meant to activate when relevant to the user's request rather than living fully in context all the time.
- A strong skill package teaches both tool usage and workflow shape, not just command syntax.

## Important Details

- Browserbase says its skills teach agents across four workflow styles: interactive browser automation with `browse`, lightweight page fetching via the Fetch API, Browserbase Functions deployment, and Browserbase CLI workflows with `bb`.
- The docs emphasize structured guidance and natural-language use rather than raw command memorization.
- The examples show skills being used to inspect live pages, debug selectors, handle login flows, and run CLI workflows.
- The installation paths span multiple agent ecosystems, reinforcing that skill content can be portable even when runtimes differ.

## Entities

- Organization: Browserbase
- Systems: Browserbase Skills, browse CLI, Fetch API, Browserbase Functions, Browserbase CLI
- Concepts: progressive disclosure, workflow-specific skills, browser automation playbooks

## My Notes

- This is good corroboration for the KB's existing view that skills should be routing-friendly, modular, and task-shaped rather than giant static prompt appendices.
- It also adds a nice example of splitting one domain into multiple skills by workflow shape instead of by team or product area.

## Open Questions

- When should a domain split into multiple workflow-specific skills rather than one broader capability file?
- Should the KB make "workflow-shaped skill boundaries" more explicit as a general design heuristic?

## Related

- [[agent-skills]]
- [[agent-tools]]
- [[computer-use]]

## Source Text

Not copied locally. Use the source URL above if the full text is needed.
