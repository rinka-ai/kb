---
id: concept-ai-agent-evals
type: concept
title: AI Agent Evals
tags: [evals, benchmarks, agents, web-agents, browser, computer-use]
source_count: 25
summary: AI agent evals measure full systems, including harnesses, tools, infrastructure, adversarial conditions, validation properties, failure attribution, and deployment constraints, rather than isolated model snapshots.
canonical_for: [agent evals, benchmark suites, agent benchmarks]
review_status: reviewed
last_reviewed: 2026-06-04
review_due: 2026-07-04
confidence: "0.87"
---

# AI Agent Evals

## Summary

AI agent evals measure full systems, not just model snapshots. Anthropic's engineering posts repeatedly show that harnesses, tools, infra, contamination, and grading design can all materially change the result. The textbook layer broadens "eval" into validation and assurance: useful evaluation should ask which properties the system is supposed to satisfy, how failures can be falsified, how stochastic behavior is measured, and what deployment constraints make a score meaningful. The newer additions broaden this from critique into concrete benchmark and framework coverage: agent evaluation now spans full-system harnesses, adversarial security environments, web-task benchmarks, realistic computer-use setups with deterministic state-based checks, and retrieval experiments where the harness and tool-result delivery path are part of what is being measured. AHE adds a further requirement for self-improving agents: when the harness changes between runs, evaluation should track which edits predicted which fixes or regressions, not only the final aggregate score. The LIFE survey adds the multi-agent version of that requirement: evals should not stop at team success or failure, but should test whether failures can be attributed across agents, steps, communication paths, and repair interventions. Cognee adds a retrieval-system version of the same lesson: chunking, graph construction, retriever choice, prompt template, top-k, and judge metric can all change system scores, so evals should track the full configuration rather than just a model and dataset. Learn Harness Engineering adds a useful distinction between structural harness validation and behavioral agent evaluation: checking whether `AGENTS.md`, feature state, verification commands, and handoff files exist is useful, but it does not replace before/after sessions on representative tasks. The Dynamic Workflows digest adds practical eval patterns: separate worker and verifier agents, one verifier per claim or rule, tournament comparison for ranking, and candidate-in-worktree grading loops. One visible gap remains company-understanding evals that test cross-tool synthesis, source arbitration, freshness, and identity resolution against messy enterprise data.

## Core Components

- tasks and trials
- harnesses and scaffolds
- transcripts and outcomes
- graders and pass criteria
- infrastructure and runtime conditions
- retrieval mode, result presentation, and context-delivery path when the agent uses search
- retrieval configuration, including chunking, graph-building prompts, retriever family, top-k, context summaries, and answer prompt
- edit manifests and attribution ledgers when the evaluated harness evolves over time
- agent, step, message, and causal-chain labels when evaluating multi-agent failure attribution
- structural harness checks for instructions, state, verification, scope, and lifecycle
- real-session replay or before/after tasks when the claim is that the harness improves agent performance

## Benchmark Families

- framework-level evaluation surfaces such as Inspect AI
- adversarial security suites such as AgentDojo
- web-environment benchmarks such as WebArena
- computer-use benchmarks such as OSWorld
- domain-specific workflow benchmarks that report accuracy, cost, latency, and throughput together
- organization-understanding benchmarks for multi-source company context
- validation and assurance workflows that specify properties, search for falsifying examples, and gather safety evidence

## Common Failure Modes

- benchmark contamination
- eval awareness
- hidden infra variance
- task saturation
- unrealistic task design
- benchmarks that test lookup or recall but never source conflict resolution or cross-system synthesis

## Practical Lessons

- Report harness and infra assumptions, not only scores.
- Expect benchmarks to stale as models improve.
- Prefer evals that reflect deployment conditions.
- Track what the system is actually optimizing for under a given setup.
- When evaluating agentic retrieval, report the harness, shell/tool interface, inline-vs-file delivery, distractor/noise setup, and grader model instead of only reporting the retriever family.
- Pair score deltas with edit-level predictions so self-improving systems can distinguish evidence-driven fixes from lucky changes.
- Track predicted regressions as seriously as predicted fixes, because regressions are easier for evolve loops to miss.
- Prefer execution-based or state-based validators over action-trace matching or LLM-only judging when possible.
- For security-sensitive agents, measure utility under attack, not only benign success.
- For production extraction systems, report cost per document, latency distribution, and throughput knee points alongside F1 or document-level accuracy.
- For deployed AI systems, separate benchmark performance from validation evidence: property specification, stochastic metrics, falsification, monitoring, and rollback readiness answer different questions.
- For multi-agent attribution, report whether the diagnosis supports verified repair rather than only whether it names the expected agent or step.
- For GraphRAG or memory systems, evaluate the KG-to-LLM interface as a whole: graph extraction, retrieval, context formatting, answer style, and grader choice interact.
- Pair exact-match/F1 metrics with semantic or LLM-judge metrics, but treat judge variance as a measured system property rather than a footnote.
- Keep hold-out questions even for small tuning loops; otherwise retrieval prompt tuning can overfit answer style instead of improving evidence use.
- Use structural validators as fast smoke tests, not as proof that agents complete more work.
- When reporting harness experiments, separate artifact coverage, eval-case coverage, and observed task completion.
- Use separate verifier contexts when self-preferential bias would make a worker's own judgment suspect.
- Use pairwise tournament comparison when absolute scores are too noisy for ranking many outputs.

## Source Notes

- [[2026-01-09-demystifying-evals-for-ai-agents]]
- [[2026-01-21-designing-ai-resistant-technical-evaluations]]
- [[2026-03-06-eval-awareness-in-claude-opus-4-6-browsecomp-performance]]
- [[2026-04-09-quantifying-infrastructure-noise-in-agentic-coding-evals]]
- [[2025-01-06-raising-the-bar-on-swe-bench-verified-with-claude-3-5-sonnet]]
- [[2025-09-17-a-postmortem-of-three-recent-issues]]
- [[2026-04-10-inspect-ai]]
- [[2026-04-10-agentdojo-a-dynamic-environment-to-evaluate-prompt-injection-attacks-and-defenses-for-llm-agents]]
- [[2026-04-10-agentdojo]]
- [[2026-04-10-webarena-a-realistic-web-environment-for-building-autonomous-agents]]
- [[2026-04-10-webarena]]
- [[2026-04-10-osworld-benchmarking-multimodal-agents-for-open-ended-tasks-in-real-computer-environments]]
- [[2026-04-10-osworld]]
- [[2026-04-19-your-company-needs-a-brain-not-more-connectors]]
- [[2026-04-28-agentic-harness-engineering-observability-driven-automatic-evolution-of-coding-agent-harnesses]]
- [[2026-03-24-benchmarking-multi-agent-llm-architectures-financial-document-processing]]
- [[2026-05-14-is-grep-all-you-need-how-agent-harnesses-reshape-agentic-search]]
- [[2026-05-18-algorithms-for-validation]]
- [[2026-05-18-machine-learning-systems-vol1]]
- [[2026-05-18-machine-learning-systems-vol2]]
- [[2026-05-14-beyond-individual-intelligence-multi-agent-life-survey]]
- [[2025-05-30-optimizing-interface-knowledge-graphs-llms-complex-reasoning]]
- [[2026-05-18-cognee]]
- [[2026-06-04-walkinglabs-learn-harness-engineering]]
- [[2026-06-03-dynamic-workflows-claude-code-ingest]]
