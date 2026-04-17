---
id: article-2026-04-17-browserbase-functions
type: source
title: "Browserbase Functions"
path: raw/articles/browserbase-docs/2026-04-17-browserbase-functions.md
author: Browserbase
publisher: Browserbase Documentation
url: https://docs.browserbase.com/platform/runtime/overview
date_published:
date_added: 2026-04-17
tags: [browserbase, managed-agents, functions, sandboxes, browser-agents]
status: processed
quality: high
summary: Browserbase Functions describe a serverless runtime for deploying browser agents and automations onto Browserbase infrastructure, with API-first invocation, built-in browser/session management, and sandboxed execution environments.
related: [managed-agents, agent-tools, agent-frameworks]
---

# Browserbase Functions

## Source Metadata

- Path: raw/articles/browserbase-docs/2026-04-17-browserbase-functions.md
- Author: Browserbase
- Published: Unknown
- Publisher: Browserbase Documentation
- URL: https://docs.browserbase.com/platform/runtime/overview

## TL;DR

Browserbase Functions frame browser agents as deployable runtime artifacts: the same local automation can be promoted into an API-invocable function running inside Browserbase-managed sandbox environments with session context already wired in.

## Key Claims

- Browser agents should be deployable as first-class runtime units rather than only as local scripts.
- The runtime should handle browser and session provisioning so agent code focuses on task logic instead of infrastructure glue.
- API-first invocation is a useful default for background agent work, webhooks, and scheduled automation.
- A managed runtime is valuable when the workload needs full browser sandboxes without the user managing servers or containers directly.

## Important Details

- The docs describe Functions as a way to deploy browser agents or automation scripts directly onto Browserbase infrastructure.
- Browserbase lists three example shapes: Playwright scripts, Stagehand agents, and a deployed Claude Code browser agent.
- Key benefits include zero infrastructure management, instant local testing, full serverless sandbox execution environments, API-first invocation, and built-in browser and session management.
- The function handler receives a `ctx` object that includes session information, including a browser connection URL.
- The platform pitches a local-to-cloud workflow: develop locally, test, and deploy directly as an invokable function.

## Entities

- Organization: Browserbase
- Systems: Browserbase Functions, Stagehand, Playwright
- Concepts: managed runtime, browser sandboxes, API-first invocation, local-to-cloud deployment

## My Notes

- This strengthens the KB's "same harness, multiple entrypoints" pattern because it explicitly treats local experimentation and deployed agent execution as different wrappers around the same core logic.
- It also reinforces that sandbox provisioning and session context are runtime responsibilities, not prompt responsibilities.

## Open Questions

- How much state should stay inside a Browserbase Function invocation versus an external session or workflow store?
- Which parts of this pattern are browser-specific, and which should be generalized into the KB's broader managed-agent guidance?

## Related

- [[managed-agents]]
- [[agent-tools]]
- [[agent-frameworks]]

## Source Text

Not copied locally. Use the source URL above if the full text is needed.
