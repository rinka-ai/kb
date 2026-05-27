---
id: concept-agent-tools
type: concept
title: Agent Tools
tags: [tools, tool-use, agents, code-execution, mcp]
source_count: 14
summary: Agent tools are structured action surfaces for non-deterministic systems, so they need clearer schemas, tighter ergonomics, credential boundaries, and better orchestration boundaries than APIs built only for humans.
canonical_for: [agent tools, tool use, structured tools, code-mediated tool use]
review_status: reviewed
last_reviewed: 2026-05-20
review_due: 2026-06-20
confidence: "0.86"
---

# Agent Tools

## Summary

Agent tools are structured action surfaces for non-deterministic systems, so they need clearer schemas, tighter ergonomics, credential boundaries, and better orchestration boundaries than APIs built only for humans. The current sources draw two especially useful distinctions: client-side versus server-side tools, and direct tool calling versus code-mediated orchestration when tool ecosystems grow large. The Browserbase-style pattern sharpens this further: the model-facing surface can stay surprisingly small when typed service packages, broker layers, or runtime helpers absorb integration sprawl behind the scenes. Steward adds the money-and-credentials version of the same pattern: an agent-facing signing or API tool should expose a narrow capability while a vault/proxy layer owns real keys, policies, metering, and audit logs. Hermes adds the runtime-registry version: built-in tools, MCP tools, plugin tools, browser/computer-use tools, terminal backends, and code-execution RPC need explicit discovery, filtering, availability checks, and approval hooks. MemWal adds the memory-tool version: remember, recall, analyze, restore, login, and logout are not generic database calls; they are high-leverage state mutations and retrieval paths that need namespace, credential, and trust-boundary semantics. AHE adds evidence that tools themselves can be an evolvable performance surface: changed tool behavior can encode coordination patterns more reliably than adding more prose to the prompt.

## Design Principles

- make schemas explicit, narrow, and semantically meaningful
- optimize descriptions and parameters for model reliability, not only human developer taste
- keep high-risk or multi-step business logic behind durable workflow layers instead of giant tool handlers
- keep wallet keys and third-party API credentials behind brokers, vaults, or proxy gateways rather than inside tool-call context
- prefer code-mediated loops when the agent needs iteration, filtering, or orchestration across many tools
- keep the model-facing tool surface as small as possible; hide integration sprawl behind typed internal packages, brokers, or exec helpers when policy and preprocessing must stay centralized
- treat tool changes as falsifiable harness edits when they are meant to improve agent behavior over time
- register and filter tools through explicit toolsets so channel-specific modes can expose different capabilities without changing the core loop
- let scripts orchestrate whitelisted tools when iterative pipelines would otherwise return too many intermediate results to the model
- treat durable memory writes as privileged tool calls with capture filters, namespace scope, and deletion/revocation expectations

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

## Failure Modes

- giant tool menus with no discovery or routing support
- vague parameter semantics that collapse under spoken, messy, or partial inputs
- embedding business logic directly into fragile tool handlers
- exposing wallet private keys, API keys, or provider secrets to the model-controlled runtime instead of brokering the action
- assuming human-friendly APIs are automatically agent-friendly
- adding tool-side guardrails that help common cases but prematurely close long-horizon or edge-case tasks

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
