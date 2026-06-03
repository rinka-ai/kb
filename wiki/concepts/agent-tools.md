---
id: concept-agent-tools
type: concept
title: Agent Tools
tags: [tools, tool-use, agents, code-execution, mcp]
source_count: 17
summary: Agent tools are structured action surfaces for non-deterministic systems, so they need clearer schemas, tighter ergonomics, credential boundaries, zero-trust authorization, and better orchestration boundaries than APIs built only for humans.
canonical_for: [agent tools, tool use, structured tools, code-mediated tool use]
review_status: reviewed
last_reviewed: 2026-06-03
review_due: 2026-07-03
confidence: "0.86"
---

# Agent Tools

## Summary

Agent tools are structured action surfaces for non-deterministic systems, so they need clearer schemas, tighter ergonomics, credential boundaries, zero-trust authorization, and better orchestration boundaries than APIs built only for humans. The current sources draw two especially useful distinctions: client-side versus server-side tools, and direct tool calling versus code-mediated orchestration when tool ecosystems grow large. The Browserbase-style pattern sharpens this further: the model-facing surface can stay surprisingly small when typed service packages, broker layers, or runtime helpers absorb integration sprawl behind the scenes. Steward adds the money-and-credentials version of the same pattern: an agent-facing signing or API tool should expose a narrow capability while a vault/proxy layer owns real keys, policies, metering, and audit logs. Hermes adds the runtime-registry version: built-in tools, MCP tools, plugin tools, browser/computer-use tools, terminal backends, and code-execution RPC need explicit discovery, filtering, availability checks, and approval hooks. MemWal adds the memory-tool version: remember, recall, analyze, restore, login, and logout are not generic database calls; they are high-leverage state mutations and retrieval paths that need namespace, credential, and trust-boundary semantics. AHE adds evidence that tools themselves can be an evolvable performance surface: changed tool behavior can encode coordination patterns more reliably than adding more prose to the prompt. Anthropic's zero-trust guide adds a sharper baseline: tool access is one of the highest-risk agent surfaces, so tool allowlists, per-agent authentication, parameter validation, capability restrictions, sandboxing, spend limits, and approval escalation should be designed as first-class controls. The Van Horn digest adds a consumer-operator pattern: agent-native CLIs plus browser-session handoff can make ordinary services operable by agents, but credentials and side effects become the real design problem. The Claude use-case digest adds a product-surface map: folders, browsers, calendars, CRMs, email, dashboards, Drive, Office files, task trackers, and scheduled jobs become agent tools only when the surrounding product constrains context, approvals, and handoff.

## Design Principles

- make schemas explicit, narrow, and semantically meaningful
- optimize descriptions and parameters for model reliability, not only human developer taste
- enforce tool authorization outside the model as well as inside the agent prompt or settings
- authenticate tools with short-lived tokens or certificate-backed agent identity rather than static API keys
- validate tool parameters on both the agent side and the tool-server side before execution
- separate allowlisting, capability restriction, sandbox containment, and approval escalation instead of treating "tool available" as enough governance
- keep high-risk or multi-step business logic behind durable workflow layers instead of giant tool handlers
- keep wallet keys and third-party API credentials behind brokers, vaults, or proxy gateways rather than inside tool-call context
- prefer code-mediated loops when the agent needs iteration, filtering, or orchestration across many tools
- keep the model-facing tool surface as small as possible; hide integration sprawl behind typed internal packages, brokers, or exec helpers when policy and preprocessing must stay centralized
- treat tool changes as falsifiable harness edits when they are meant to improve agent behavior over time
- register and filter tools through explicit toolsets so channel-specific modes can expose different capabilities without changing the core loop
- let scripts orchestrate whitelisted tools when iterative pipelines would otherwise return too many intermediate results to the model
- treat durable memory writes as privileged tool calls with capture filters, namespace scope, and deletion/revocation expectations
- when wrapping real-world services for agents, broker logged-in browser sessions or cookies behind narrow commands rather than exposing ambient account access
- make allowlists, dry-run modes, confirmation thresholds, and audit logs part of the CLI surface when tool calls can spend money, message people, buy goods, or change accounts
- turn ordinary work surfaces into agent tools only with explicit context scope, output format, downstream handoff, and approval policy

## Tool Families

- client tools that manipulate local UI or application state
- server tools that fetch data or trigger external side effects
- MCP tools that standardize access to external context and capabilities
- programmatic tool orchestration where code becomes the control plane for large tool sets
- brokered gateway tools that front many richer integrations while exposing one controlled model-facing capability
- signing and credential-proxy tools that expose policy-bounded capability handles instead of raw private keys or API keys
- code-execution RPC tools that let short programs call a bounded tool subset and return compact artifacts
- browser and computer-use tools that bridge human-facing interfaces when no reliable API exists
- memory tools that expose recall, fact extraction, durable writes, restore, and client authentication across agent runtimes
- agent-native service CLIs that let agents operate products such as travel, shopping, cars, calendars, or media through authenticated but bounded command surfaces
- productized work-surface tools such as folder access, browser extensions, document/spreadsheet generation, task-manager connectors, analytics dashboards, calendar/email access, and scheduled task runners

## Failure Modes

- giant tool menus with no discovery or routing support
- vague parameter semantics that collapse under spoken, messy, or partial inputs
- embedding business logic directly into fragile tool handlers
- exposing wallet private keys, API keys, or provider secrets to the model-controlled runtime instead of brokering the action
- assuming human-friendly APIs are automatically agent-friendly
- treating MCP discovery as ambient authority instead of a signed, authenticated, filtered tool registry
- using rate limits or spending caps as the only containment for resource-exhaustion attacks
- adding tool-side guardrails that help common cases but prematurely close long-horizon or edge-case tasks
- letting browser-session auth turn into ambient authority where the agent inherits everything the human account can do
- optimizing away permission prompts before replacing them with scoped credentials, action logs, and review policy

## Source Notes

- [[2025-09-11-writing-effective-tools-for-agents-with-agents]]
- [[2025-11-04-code-execution-with-mcp-building-more-efficient-agents]]
- [[2025-11-24-introducing-advanced-tool-use-on-the-claude-developer-platform]]
- [[2026-04-12-durable-mcp-weather-server]]
- [[2026-04-12-tools]]
- [[2026-04-12-client-tools]]
- [[2026-04-12-server-tools]]
- [[2026-04-16-the-anatomy-of-an-agent-harness]]
- [[2026-04-17-browserbase-functions]]
- [[2026-04-17-browserbase-bb-internal-agent-full-architecture-synthesis]]
- [[2026-04-28-agentic-harness-engineering-observability-driven-automatic-evolution-of-coding-agent-harnesses]]
- [[2026-05-20-steward]]
- [[2026-05-20-hermes-agent]]
- [[2026-05-20-memwal]]
- [[2026-05-27-zero-trust-for-ai-agents]]
- [[2026-06-02-every-agentic-engineering-hack-i-know]]
- [[2026-06-03-claude-use-cases-full-digest]]
