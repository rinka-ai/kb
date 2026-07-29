---
id: concept-agent-observability
type: concept
title: Agent Observability
tags: [agents, observability, opentelemetry, genai, traces, metrics, evals, mcp]
source_count: 5
summary: Agent observability correlates model calls, agent runs, tools, retrieval, state changes, costs, and outcomes while applying explicit privacy controls to captured content.
canonical_for: [agent observability, genai observability, opentelemetry genai, agent tracing, tool call tracing]
review_status: reviewed
last_reviewed: 2026-07-27
review_due: 2026-09-10
confidence: "0.86"
---

# Agent Observability

## Summary

Agent observability is the evidence layer that makes a probabilistic, tool-using system diagnosable. It should connect an external request to agent invocation, model calls, retrieval, tool execution, state mutations, approvals, errors, latency, token/cost signals, and business outcomes. OpenTelemetry's dedicated GenAI conventions provide a portable vocabulary for that hierarchy; the harness sources show why the vocabulary must be paired with durable traces, change manifests, and outcome-aware evaluation.

Observability is not equivalent to logging prompts. Content fields may contain credentials, personal data, proprietary documents, or regulated information. A production design starts with structural metadata and correlation identifiers, then adds sampled or redacted content only under explicit access, retention, and purpose rules.

## Trace Model

- Root the trace in a user request, scheduled job, event, or externally visible run.
- Represent agent invocation as a parent operation containing model, retrieval, tool, handoff, and approval spans.
- Give each run, task, tool call, artifact, and state mutation a stable identity.
- Record tool name, selected operation, outcome, latency, error class, retry, and authorization decision without capturing sensitive arguments by default.
- Correlate retrieval evidence with the model step that consumed it and the output or action it influenced.
- Connect online traces to eval cases, releases, model/provider versions, prompts, tool schemas, and harness commits.
- Preserve causal order across asynchronous tasks, streams, queues, and multi-agent handoffs.

## Signals That Matter

- success, partial success, policy violation, blocked action, escalation, and abandonment
- model and tool latency, queue time, retry count, timeout, and cancellation
- token use, cache behavior, external API cost, and return on compute
- tool-selection and abstention errors
- state diffs and artifact provenance
- retrieval quality, source freshness, and citation or grounding failures
- human override, approval delay, and unresolved handoff rate
- regressions associated with model, prompt, tool, policy, or harness changes

## Privacy And Security

- Treat prompts, responses, tool arguments/results, and retrieved documents as sensitive payloads.
- Default to metadata-only collection; allow content capture by field, environment, tenant, and purpose.
- Redact secrets and personal data before export, not only in the observability backend.
- Separate operator access from developer access and log access to sensitive traces.
- Use bounded retention, sampling, encryption, and deletion controls.
- Never let a trace exporter become a side channel around tool authorization or data-residency policy.

## Evaluation Loop

Operational traces should feed a controlled loop:

1. detect a repeated failure or cost pattern;
2. select representative, permission-safe traces;
3. turn them into a reproducible eval case;
4. change one model, prompt, tool, policy, or harness surface;
5. compare outcomes and predicted regressions;
6. promote or roll back the change;
7. continue monitoring the deployed distribution.

This preserves the distinction between observing production and training on production data. Trace reuse requires its own consent, privacy, and review gate.

## Tensions

- diagnostic detail vs privacy and data minimization
- portable conventions vs provider-specific signals
- complete traces vs latency, storage cost, and sampling
- high-cardinality identities vs backend cost
- outcome dashboards vs causal evidence
- automated anomaly detection vs alert fatigue

## Source Notes

- [[2026-07-25-opentelemetry-generative-ai-semantic-conventions]]
- [[2026-04-28-agentic-harness-engineering-observability-driven-automatic-evolution-of-coding-agent-harnesses]]
- [[2026-04-28-iii]]
- [[2026-05-18-machine-learning-systems-vol1]]
- [[2026-05-18-machine-learning-systems-vol2]]

## Related

- [[agent-harnesses]]
- [[managed-agents]]
- [[ai-agent-evals]]
- [[monitoring-drift-and-feedback]]
- [[agent-security]]
- [[agent-tools]]
