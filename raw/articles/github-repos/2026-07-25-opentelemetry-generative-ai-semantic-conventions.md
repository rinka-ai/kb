---
id: article-2026-07-25-opentelemetry-generative-ai-semantic-conventions
type: source
title: "OpenTelemetry Semantic Conventions for Generative AI"
path: raw/articles/github-repos/2026-07-25-opentelemetry-generative-ai-semantic-conventions.md
author: OpenTelemetry Authors
publisher: GitHub
url: https://github.com/open-telemetry/semantic-conventions-genai
date_published: 2026-07-25
date_added: 2026-07-27
tags: [opentelemetry, observability, genai, agents, mcp, semantic-conventions]
status: active
quality: high
summary: The dedicated OpenTelemetry GenAI semantic-conventions repository defines portable spans, metrics, events, and MCP/provider conventions for observing model calls, agent runs, tool execution, retrieval, and sensitive payloads.
related: [agent-observability, agent-harnesses, managed-agents, ai-agent-evals, agent-tools]
---

# OpenTelemetry Semantic Conventions for Generative AI

## Source Metadata

- Path: raw/articles/github-repos/2026-07-25-opentelemetry-generative-ai-semantic-conventions.md
- Author: OpenTelemetry Authors
- Published: 2026-07-25
- Publisher: GitHub
- URL: https://github.com/open-telemetry/semantic-conventions-genai
- Pinned commit: `64cfaa612a1af8472b2f063374fbe3c9e6cea2ab`
- License: Apache-2.0
- Release status at capture: no tagged release; commit pin used because the repository is active and mutable

## TL;DR

OpenTelemetry now maintains GenAI observability conventions in a dedicated repository. The model spans client calls, agent invocation, tool execution, retrieval, events, token/cost-related metrics, MCP operations, and provider-specific extensions. It is the best primary-source anchor for portable agent telemetry, but many conventions remain active work and payload fields require strict privacy controls.

## Key Claims

- GenAI systems need standardized spans, metrics, and events across model clients, agents, tools, retrieval systems, and MCP.
- Agent traces should preserve hierarchy, such as an agent invocation containing model calls and tool execution.
- Common semantic attributes make telemetry portable across instrumentation libraries and observability backends.
- Tool arguments, tool results, prompts, responses, and retrieved documents can contain sensitive data and should not be captured indiscriminately.
- Provider-specific conventions extend, rather than replace, the common GenAI model.

## Important Details

- The repository includes dedicated documents for agent spans, model/client spans, events, metrics, MCP, and provider-specific behavior.
- The machine-readable model covers retrieval documents and tool names, descriptions, arguments, results, and definitions.
- Reference scenarios and reports are included to validate semantic-convention generation and consistency.
- The OpenTelemetry registry notes that GenAI attributes have moved to this dedicated repository.
- Because no stable release existed at capture time, this note records an immutable commit rather than treating the default branch as a fixed specification.
- Telemetry usefulness depends on sampling, correlation, redaction, access control, and retention policy—not naming conventions alone.

## Entities

- Organization: OpenTelemetry
- Specifications: GenAI semantic conventions, MCP semantic conventions
- Signals: traces, spans, metrics, events
- Operations: agent invocation, chat/model inference, tool execution, retrieval

## My Notes

- This source closes a material KB gap: observability was scattered across harness and managed-agent pages without a canonical telemetry concept.
- The convention hierarchy supports the KB's existing view that agent quality is a system property visible only when model, tool, environment, and orchestration evidence can be joined.
- Adoption should begin with low-risk structural metadata and add content capture only behind explicit privacy controls.

## Open Questions

- Which conventions are stable enough for production dashboards versus still experimental?
- How should organizations version dashboards and instrumentation as semantic attributes change?
- What minimum trace captures enough causal evidence without retaining prompts, tool payloads, or retrieved content?

## Related

- [[agent-observability]]
- [[agent-harnesses]]
- [[managed-agents]]
- [[ai-agent-evals]]
- [[agent-tools]]
- [[2026-04-28-agentic-harness-engineering-observability-driven-automatic-evolution-of-coding-agent-harnesses]]

## Source Text

Source capture is intentionally bounded to repository metadata, the pinned commit, and the document map summarized above. The complete Apache-2.0 material remains available at the pinned repository URL.
