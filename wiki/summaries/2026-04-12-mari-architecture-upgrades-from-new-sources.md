---
id: summary-2026-04-12-mari-architecture-upgrades-from-new-sources
type: summary
title: Mari Architecture Upgrades From New Sources
tags: [mari, architecture, agents, workflows, memory, payments]
---

# Mari Architecture Upgrades From New Sources

## Summary

The newly added sources sharpen Mari in four places that mattered more than another round of generic agent reading:

- durable execution and resumability for planner/executor loops
- explicit run, thread, session, and handoff surfaces
- memory split between hot-path retrieval, background consolidation, and reusable workflow memory
- payment and billing side effects that stay narrow, verified, and PCI-safe

## What Changes Architecturally

- Treat long-running work as durable runs on durable threads.
  Temporal, LangGraph, OpenAI Agents SDK, Google ADK, and Agent Protocol all point toward the same shape: stateful threads or sessions, explicit run lifecycle, interrupts, resume, and stream/wait semantics.
- Separate run-local memory from reusable cross-task memory.
  LangMem and Agent Workflow Memory are especially useful here because they distinguish hot-path memory from background memory and factual memory from procedural workflow memory.
- Keep operator approval and money movement outside the model's improvisation loop.
  OpenAI Agents SDK shows resumable approval as a runtime primitive, while Stripe Checkout and Stripe's security guidance show how to push sensitive payment handling into managed session flows plus verified webhooks.
- Use learned-memory papers as boundaries, not blueprints.
  MEM1 and MemAgent are important because they show what future models may absorb internally, but Mari still benefits from external memory because inspectability, provenance, and safe operations remain product requirements.

## Best Borrowing Order

1. [[2026-04-12-langgraph-durable-execution-persistence-and-human-in-the-loop]]
2. [[2026-04-12-openai-agents-sdk-sessions-handoffs-and-human-in-the-loop]]
3. [[2026-04-12-agent-protocol]]
4. [[2026-04-12-temporal-ai-cookbook]]
5. [[2026-04-12-langmem]]
6. [[2026-04-12-agent-workflow-memory]]
7. [[2026-04-12-stripe-integration-security-guide]]
8. [[2026-04-12-stripe-checkout-how-checkout-works]]

## Mari-Shaped Takeaways

- Mari should probably converge on one active run per conversation thread, with explicit pause, resume, and replay semantics.
- Planner artifacts, playbooks, and successful execution traces look like candidates for workflow memory rather than only transient logs.
- Payment flows should be session-based and webhook-driven, with the agent choosing among safe operations rather than composing raw payment mechanics.

## Related

- [[2026-04-10-mari-sources-to-add-now]]
- [[managed-agents]]
- [[agent-memory]]
- [[llm-agents]]
