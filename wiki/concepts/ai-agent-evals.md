---
id: concept-ai-agent-evals
type: concept
title: AI Agent Evals
tags: [evals, benchmarks, agents, web-agents, browser, computer-use, tau-bench, bfcl, function-calling, user-simulation]
source_count: 39
summary: AI agent evals measure full systems across tool correctness, abstention, policy-constrained interaction, final state, reliability, observability, failure attribution, validation properties, infrastructure, adversarial conditions, and deployment constraints.
canonical_for: [agent evals, benchmark suites, agent benchmarks, tau bench, tau2 bench, bfcl, function calling evals]
review_status: reviewed
last_reviewed: 2026-08-06
review_due: 2026-11-04
confidence: "0.90"
---

# AI Agent Evals

## Summary

AI agent evals measure full systems, not just model snapshots. Anthropic's engineering posts repeatedly show that harnesses, tools, infra, contamination, and grading design can all materially change the result. OpenAI's ARC-AGI-3 harness comparison makes that dependence quantitative: retained reasoning plus compaction raised GPT-5.6 Sol's public-set score from 13.3% to 38.3% while using roughly six times fewer output tokens, although the bundled intervention does not isolate either setting's individual contribution. The textbook layer broadens "eval" into validation and assurance: useful evaluation should ask which properties the system is supposed to satisfy, how failures can be falsified, how stochastic behavior is measured, and what deployment constraints make a score meaningful. τ-bench and τ2 add policy-constrained user/environment interaction, end-state grading, repeated-run pass^k, and full-duplex voice metrics; BFCL adds executable call structure, parallelism, abstention, multi-turn state, memory, live data, and format sensitivity. Together they show why one aggregate “tool use” score is inadequate: local call correctness and end-to-end workflow success are complementary layers. OpenTelemetry's GenAI conventions add the production evidence bridge: model calls, agent invocation, tools, and retrieval need correlated spans and carefully governed content capture so benchmark failures can be compared with live traces. The newer additions broaden this from critique into concrete benchmark and framework coverage: agent evaluation now spans full-system harnesses, adversarial security environments, web-task benchmarks, realistic computer-use setups with deterministic state-based checks, and retrieval experiments where the harness and tool-result delivery path are part of what is being measured. AHE adds a further requirement for self-improving agents: when the harness changes between runs, evaluation should track which edits predicted which fixes or regressions, not only the final aggregate score. The LIFE survey adds the multi-agent version of that requirement: evals should not stop at team success or failure, but should test whether failures can be attributed across agents, steps, communication paths, and repair interventions. Cognee adds a retrieval-system version of the same lesson: chunking, graph construction, retriever choice, prompt template, top-k, and judge metric can all change system scores, so evals should track the full configuration rather than just a model and dataset. Learn Harness Engineering adds a useful distinction between structural harness validation and behavioral agent evaluation: checking whether `AGENTS.md`, feature state, verification commands, and handoff files exist is useful, but it does not replace before/after sessions on representative tasks. The Dynamic Workflows digest adds practical eval patterns: separate worker and verifier agents, one verifier per claim or rule, tournament comparison for ranking, and candidate-in-worktree grading loops. One visible gap remains company-understanding evals that test cross-tool synthesis, source arbitration, freshness, and identity resolution against messy enterprise data.

Nisi's practitioner experiment adds a direct context-ablation case: generated documentation skills reportedly made one task less accurate and made the suite much slower until the content was reduced to recurring gotchas. The figures are under-specified, but the evaluation lesson is durable: a prompt, skill, memory bundle, or reference pack needs a no-addition control on the same representative tasks, not merely a post-change pass rate.

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
- no-addition or current-production control runs when evaluating a prompt, skill, memory, tool-description, or retrieved-context change

## Benchmark Families

- framework-level evaluation surfaces such as Inspect AI
- adversarial security suites such as AgentDojo
- web-environment benchmarks such as WebArena
- computer-use benchmarks such as OSWorld
- domain-specific workflow benchmarks that report accuracy, cost, latency, and throughput together
- creativity-support evaluations that separate within-user variety from cross-user semantic or category convergence
- organization-understanding benchmarks for multi-source company context
- validation and assurance workflows that specify properties, search for falsifying examples, and gather safety evidence

## Common Failure Modes

- benchmark contamination
- eval awareness
- hidden infra variance
- task saturation
- unrealistic task design
- benchmarks that test lookup or recall but never source conflict resolution or cross-system synthesis
- evaluation prompts that declare isolation or scope without validating the real network boundary, allowing the benchmark to spill into production systems

## Practical Lessons

- Report harness and infra assumptions, not only scores.
- Report context retention, reasoning-state retention, compaction or truncation policy, API mode, and termination rules; these can dominate an agent score while changing cost at the same time.
- Expect benchmarks to stale as models improve.
- Prefer evals that reflect deployment conditions.
- Track what the system is actually optimizing for under a given setup.
- When evaluating agentic retrieval, report the harness, shell/tool interface, inline-vs-file delivery, distractor/noise setup, and grader model instead of only reporting the retriever family.
- Pair score deltas with edit-level predictions so self-improving systems can distinguish evidence-driven fixes from lucky changes.
- Track predicted regressions as seriously as predicted fixes, because regressions are easier for evolve loops to miss.
- Prefer execution-based or state-based validators over action-trace matching or LLM-only judging when possible.
- For security-sensitive agents, measure utility under attack, not only benign success.
- Treat high-capability eval infrastructure as production-grade security infrastructure: prove egress policy, continuously monitor transcripts and network events, retain traces for retrospective review, and apply the same assurance to third-party ranges.
- Define target scope so it is machine-enforceable; model situational awareness can be evaluated as defense in depth but must not be the containment boundary.
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
- Report context ablations against the current model without the added material, including accuracy, latency, token/cost, retry behavior, and tail failures; more coverage is not evidence of more value.
- For generative design and creativity support, evaluate at two levels: per-user fluency, quality, and diversity, then cross-user or portfolio-level convergence. Validate embedding-based similarity against domain judgments and do not mistake semantic distance for usefulness.
- For editable AI workflows, compare the complete interaction design rather than model outputs alone: task success, blinded artifact preference, regeneration versus curation behavior, local recovery, propagation understanding, reliance, cognitive load, accessibility, latency, and cost can move in different directions.
- Treat perceived transparency as one outcome, not proof of calibrated trust. Inspectable stages need failure tasks that test whether users can locate an error, correct it, preserve accepted work, and recover without hidden downstream damage.
- For generative editors, evaluate the whole steering loop against meaningful ablations: objective task fit where possible, blinded or expert artifact quality, intent match, correction locus, accepted-work preservation, version recovery, workload, latency, accessibility, provenance, rights, and cross-user convergence. A bundled interface win does not identify which control caused the gain.
- For human-facing AI products, begin with a user-benefit and non-AI baseline, then connect model metrics to the autonomy policy and full interaction loop. Evaluate comprehension, appropriate reliance, steering, correction, manual takeover, fallback, accessibility, privacy choices, and disaggregated outcomes before and after launch; aggregate model quality cannot show whether responsibility and failure costs shifted onto users.
- Evaluate AI interface prototypes with live-but-sandboxed behavior before polishing static frames. Test output length and cardinality, malformed or missing fields, duplicates, refusals, latency, harmful content, diverse inputs, layout recovery, and manual fallback in the actual interaction shell; record multiple runs rather than treating a selected completion as representative. Pair perceived communication and efficiency measures with objective task, artifact, accessibility, safety, privacy, and longitudinal outcomes.
- Evaluate whether human authors can use the eval surface, not only whether the runner exists. [[2023-04-19-why-johnny-can-t-prompt-how-non-ai-experts-try-and-fail-to-design-llm-prompts]] found that ten non-expert prompt designers relied on local retries, overgeneralized from one or two outputs, and never used an available systematic testing interface during the study task. Prompt and agent workbenches should test case discovery, error labeling comprehension, old/new comparison, regression preservation, variability interpretation, rollback, and accessible operation as first-class human-system outcomes.

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
- [[2024-06-17-tau-bench-tool-agent-user-interaction]]
- [[2026-07-22-tau2-bench-v1-0-1]]
- [[2025-07-13-berkeley-function-calling-leaderboard]]
- [[2026-04-12-berkeley-function-calling-leaderboard-v4]]
- [[2026-07-25-opentelemetry-generative-ai-semantic-conventions]]
- [[2026-05-30-how-i-deleted-95-percent-of-my-agent-skills-and-got-better-results]]
- [[2026-07-29-how-enabling-two-settings-tripled-our-arc-agi-3-scores]]
- [[2024-06-22-homogenization-effects-of-large-language-models-on-human-creative-ideation]]
- [[2026-07-30-investigating-three-real-world-incidents-in-our-cybersecurity-evaluations]]
- [[2022-04-29-ai-chains-transparent-and-controllable-human-ai-interaction]]
- [[2024-05-11-promptcharm-multimodal-prompting-and-refinement]]
- [[2026-08-04-people-ai-guidebook]]
- [[2024-06-29-promptinfuser-ai-ui-design-workflows]]
- [[2023-04-19-why-johnny-can-t-prompt-how-non-ai-experts-try-and-fail-to-design-llm-prompts]]
