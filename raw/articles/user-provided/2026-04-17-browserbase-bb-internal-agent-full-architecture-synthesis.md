---
id: article-2026-04-17-browserbase-bb-internal-agent-full-architecture-synthesis
type: source
title: How We Build Internal Agents at Browserbase (user-provided synthesis)
path: raw/articles/user-provided/2026-04-17-browserbase-bb-internal-agent-full-architecture-synthesis.md
author: Kyle Jeong
publisher: User-provided synthesis
url:
date_published:
date_added: 2026-04-17
tags: [browserbase, agents, sandboxes, permissions, skills, slack, webhooks, browser-automation, managed-agents, credential-brokering]
status: processed
quality: medium
summary: Secondary synthesis describing Browserbase's internal "bb" agent as a single generalized runtime with lazy-loaded skills, invocation-scoped permissions, browser automation as a fallback integration layer, ephemeral sandboxes, and proxy-mediated credentials across Slack, webhooks, and a web UI.
related: [managed-agents, agent-security, agent-skills, agent-tools, web-agents, agent-harnesses]
---

# How We Build Internal Agents at Browserbase (user-provided synthesis)

## Source Metadata

- Path: raw/articles/user-provided/2026-04-17-browserbase-bb-internal-agent-full-architecture-synthesis.md
- Author: Kyle Jeong
- Published: Unknown
- Publisher: User-provided synthesis
- URL: None

## TL;DR

This secondary synthesis describes Browserbase's internal agent as one reusable runtime deployed across several entrypoints. The main portable patterns are lazy-loaded skills and permissions, browser automation as a universal fallback interface, ephemeral per-thread sandboxes, credentials kept out of model-controlled environments, and a deliberately small model-facing tool surface backed by typed internal integrations.

## Key Claims

- One generalized agent loop plus lazy-loaded skills and permissions is more scalable than maintaining a fleet of narrow bots.
- The browser is a useful universal fallback API for systems that do not expose a clean programmable interface.
- The execution environment should be ephemeral, isolated, and cheap to resume or recreate.
- Secrets should never live inside the sandbox where model-directed code can access them.
- Permission scope should be bound to invocation source and task intent, not only to the agent's global identity.
- Skills encode operational playbooks so the agent does not have to rediscover routine workflows from scratch.
- The model-facing tool surface can stay intentionally small if richer deterministic integrations sit behind a brokered gateway.
- A well-built general agent can absorb many internal workflows if the harness, permissions, and skills remain composable.

## Important Details

- The synthesis describes four deployment modes for the same agent: Slack, background webhooks, a web UI, and direct interactive use.
- Slack sessions are said to reuse sandboxes keyed by thread ID for multi-turn continuity, while background jobs are started with hard-scoped permissions and then shut down.
- The sandbox is described as an ephemeral Linux VM with a pre-warmed snapshot and a short tool list: `read`, `write`, `edit`, `exec`, `safebash`, and `skill`.
- The `exec` tool is described as a gateway to typed service integrations rather than a raw secret-bearing SDK surface.
- Credential brokering is described in two layers: an integration proxy that checks session tokens and permission scopes before calling real services, plus network-level key injection for model providers and code hosts.
- Permission config is summarized as both service-level glob patterns and tool booleans.
- Skills are described as markdown playbooks loaded from `.opencode/skills/`, with routing controlled by a system-prompt table and, for some modes, by permission scoping.
- The synthesis frames the browser as the catch-all integration layer for systems that lack a clean API, rather than as a separate niche agent category.
- The reported outcomes focus on operational leverage: full feature-request coverage, faster first responses, one-message session investigation, and engineers shifting from writing PRs to reviewing them.

## Entities

- Organization: Browserbase
- Person: Kyle Jeong
- Systems: bb, OpenCode, Slack, Stagehand
- Concepts: credential brokering, invocation-scoped permissions, ephemeral sandboxes, skill routing, deployment modes, browser as fallback API

## My Notes

- This is a useful pattern source, but it is still a secondary synthesis rather than a primary Browserbase engineering write-up.
- The most KB-worthy ideas here are infrastructural: brokered credentials, source-aware permission scoping, small model-facing tool surfaces, and deployment-mode invariance.
- It is also a good corrective to benchmark-only thinking about browser agents: here the browser matters as an integration fallback for a general internal agent.
- The official Browserbase docs on skills, functions, and enterprise security corroborate some adjacent patterns, but they do not independently verify every internal detail in this synthesis.

## Open Questions

- Which of these ideas are Browserbase-specific conveniences versus general runtime patterns?
- Should the KB eventually look for a primary engineering post or talk that confirms the credential-brokering and Slack-thread sandbox details?

## Related

- [[managed-agents]]
- [[agent-security]]
- [[agent-skills]]
- [[agent-tools]]
- [[web-agents]]
- [[agent-harnesses]]

## Source Text

Browserbase Internal Agent ("bb") - Full Architecture
The Core Philosophy

One generalized agent loop, not a bot-per-task
"Lazy load" two things per task: skills (playbooks) and permissions (scope)
The browser is the universal API for everything that doesn't expose one
Target easy, already-solved problems first -> encode them as skills -> free up humans for hard problems

Results achieved

Feature request pipeline: 100% coverage, zero human effort
First response time: 99% reduction to <24hrs
Session investigation: 30-60 min of manual log-diving -> single Slack message
PRs: many engineers went from writing to reviewing

1. The Sandbox (Execution Environment)

Ephemeral isolated Linux VM - own filesystem, network stack, process tree
Idles out after 30 min of inactivity; no state persists between sessions unless explicitly snapshotted
Pre-warmed snapshot rebuilt every 30 min via cron containing:

Key repos cloned into /knowledge/ (agent can grep/read/reason without network fetches)
Agents monorepo, fully built with dependencies installed
OpenCode (agent runtime) pre-installed and pre-started on a local port
System tools: bun, git, GitHub CLI, ripgrep, prettier, pdftotext, TypeScript LSP, Tailscale

On new sandbox boot: pulls only the delta (handful of commits) -> nearly instant startup

The agent has exactly 6 tools:

read - read files from filesystem
write - create new files
edit - patch existing files
exec - execute JavaScript with access to all service integrations via proxy (gateway to everything external)
safebash - run allowlisted shell commands (grep, git, find, jq, etc.)
skill - load domain-specific instruction sets into context

Architecture direction: Migrating toward separating harness from compute (brain and hands) - isolated, modular, composable building blocks to reconfigure to SOTA architectures rapidly.

2. Deployment Modes (same agent, 4 modes)
Deployed (Slack interactive):

User types @bb -> Slack events handler dispatches to internal endpoint
Creates or reuses sandbox keyed by Slack thread ID in a KV store
Agent streams SSE events -> translated into real-time Slack message updates
Sandbox persists for multi-turn continuity; follow-ups in same thread hit same sandbox with full history
If new message sent mid-response -> auto-abort current run, restart with new context

Background (webhooks):

External events (support ticket closed, meeting transcript landed) -> trigger webhook handlers
Dispatches to same sandbox infrastructure in "webhook" mode
Agent does work (detect feature requests, log to HubSpot, post Slack summary) -> sandbox shuts down
Hard-scoped permissions at invocation time

Web UI:

Rich interface showing reasoning traces, tool calls, sandbox state and filesystem
Anyone can use it anytime

3. Credential Brokering (sandbox never touches a secret)
The problem: Sandbox runs arbitrary code. LLM decides what to execute. If API keys are env vars, nothing stops echo $SOME_API_KEY.
Two-layer solution:
Layer 1 - Integration Proxy:
Sandbox boots with only 3 references (no real secrets):

BB_PROXY_URL - URL of serverless integration proxy
BB_SESSION_TOKEN - rotating session token (TTL'd in KV store)
AUTOMATION_BYPASS_TOKEN - required for certain third-party automation flows

Proxy flow (POST /api/proxy with { token, service, method, args }):

Validate session token against KV store
Retrieve session's permission scope
Check if service.method is allowed (glob pattern matching)
If allowed -> call real service package (real credentials only inside serverless function env) -> return result
If denied -> 403

Layer 2 - Network-level credential brokering (for model providers & code hosting):

Sandbox firewall intercepts outbound HTTP to specific hosts
Injects real API keys on egress
Sandbox env var is set to placeholder "credential-brokered" so SDK initializes without error

Additional: Domain allowlisting on outbound requests (enforces what domains browser tool can reach).

4. RBAC + ABAC (Permissions)

Interactive Slack sessions -> full access; agent self-selects skills/services
Background webhook sessions -> hard-scoped permissions at invocation time
Layered defense: service-level RBAC (Snowflake role is read-only) + agent-specific restrictions on top
Even if agent has Snowflake access, scoped session might only allow SELECT, not DROP
Even if agent has HubSpot access, scoped session might only allow hubspot.search*, not hubspot.delete*
Permissions tend to correlate with invocation source (webhook carries intent -> scoped to relevant tools)

5. Skill System (how bb generalizes)
Core loop (OpenCode) handles: LLM conversation, tool orchestration, context management, streaming, context compaction. Never touched.
Skills = markdown files in .opencode/skills/ - inject domain-specific workflows, schemas, and decision trees into context on demand (progressive disclosure).
Key skills:

data-warehouse - query patterns, table definitions, column types, common joins
customer-intelligence - cross-system patterns (warehouse + CRM + support + billing)
crm - deal fields, pipeline stages, contact properties, dedup logic
investigate-session - multi-source log correlation (Tinybird + Loki + NATS message flow)
create-pr - Linear ticket -> git branch -> code changes -> PR workflow
write-browserbase-web-automations - Stagehand scripting patterns
log-feature-request - feature request detection, CRM dedup, categorization
notion - read-only Notion access

Skill routing table in system prompt (bb.md):

Session investigation/debugging -> load `investigate-session`
PR / code change / Linear ticket -> load `create-pr`
Customer data / usage trends -> load `snowflake` + `customer-intelligence`
Feature request logging -> load `log-feature-request`
HubSpot deal/contact -> load `hubspot-crm`
Browser automation -> load `write-browserbase-web-automations`
Load only what you need. Do not load all skills for every request.

For interactive sessions -> agent self-selects from routing table.
For webhook sessions -> permissions hard-restrict what skills can even be loaded.

6. Service Packages (Typed API Wrappers)

Typed TypeScript wrappers around external APIs called through the proxy
Keep tool surface small; define interfaces once in exec tool
Agent does dynamic pre-transforming in deterministic code before results hit context
Use Promise.all for parallel calls, parse/normalize in TypeScript, write large payloads to disk via exec.writeToFile instead of bloating the prompt

Adding a new integration: write service package -> add to proxy dispatch map -> expose exec method -> write skill with domain instructions. Most take less than an afternoon.

7. The 4 Things You Need to Build This

A sandbox - any isolated execution environment with snapshot support and fast cold starts
A proxy - serverless function holding real credentials, brokering access with scoped permissions
An agent harness - any agent loop with a server API (they use OpenCode)
An agent interface - Slack is highest-leverage starting point (team is already there)

Key Patterns to Carry Forward

One agent loop + lazy-loaded skills + scoped permissions > fleet of narrow bots
Sandbox keyed by Slack thread ID in KV -> natural multi-turn continuity
Skills encode senior engineer playbooks so the agent doesn't have to figure out what to check
Proxy pattern = credentials never touch the sandbox; misbehavior becomes structurally impossible
Large payloads write to disk, agent gets a file reference - never bloat the context
Permissions correlate with invocation source; webhooks carry intent, scope accordingly
