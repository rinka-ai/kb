---
id: article-2026-03-24-benchmarking-multi-agent-llm-architectures-financial-document-processing
type: source
title: "Benchmarking Multi-Agent LLM Architectures for Financial Document Processing: A Comparative Study of Orchestration Patterns, Cost-Accuracy Tradeoffs and Production Scaling Strategies"
path: raw/articles/arxiv/2026-03-24-benchmarking-multi-agent-llm-architectures-financial-document-processing.md
author: "Siddhant Kulkarni, Yukta Kulkarni"
publisher: arXiv.org
url: https://arxiv.org/abs/2603.22651
date_published: 2026-03-24
date_added: 2026-05-05
tags: [agents, multi-agent, orchestration, workflows, evals, benchmarks, financial-documents, extraction, cost-accuracy, papers]
status: processed
quality: medium
summary: "This arXiv paper benchmarks sequential, parallel, hierarchical, and reflexive multi-agent orchestration patterns for structured extraction from SEC filings, arguing that hierarchical workflows offer the best cost-accuracy tradeoff while reflexive loops maximize accuracy at higher cost and latency."
related: [multi-agent-systems, workflows, ai-agent-evals, llm-agents, agent-frameworks]
---

# Benchmarking Multi-Agent LLM Architectures for Financial Document Processing: A Comparative Study of Orchestration Patterns, Cost-Accuracy Tradeoffs and Production Scaling Strategies

## Source Metadata

- Path: raw/articles/arxiv/2026-03-24-benchmarking-multi-agent-llm-architectures-financial-document-processing.md
- Author: Siddhant Kulkarni, Yukta Kulkarni
- Published: 2026-03-24
- Publisher: arXiv.org
- URL: https://arxiv.org/abs/2603.22651
- arXiv ID: 2603.22651
- DOI: https://doi.org/10.48550/arXiv.2603.22651

## TL;DR

This paper is useful as a domain-specific multi-agent orchestration benchmark: it compares sequential, parallel, hierarchical supervisor-worker, and reflexive self-correcting workflows for extracting structured fields from SEC filings. The most transferable claim is architectural rather than financial: feedback loops can increase accuracy, but their cost, tail latency, and throughput behavior can make a more selective hierarchical workflow the better production default.

## Key Claims

- Financial-document extraction is a good stress test for agent workflows because it combines long documents, tables, cross-references, regulated accuracy requirements, and cost-sensitive throughput.
- The benchmark compares four orchestration patterns: sequential pipeline, parallel fan-out with merge, hierarchical supervisor-worker, and reflexive self-correcting loop.
- The authors report that reflexive workflows achieve the highest field-level F1, but with materially higher cost and latency than simpler baselines.
- The authors report that hierarchical supervisor-worker workflows sit at the most favorable cost-accuracy point, especially when paired with confidence thresholds, selective retries, and model routing.
- The paper argues that semantic caching, model routing, and adaptive retries can recover much of the reflexive architecture's accuracy gain at much lower cost.
- Throughput changes the ranking: reflexive loops perform best at lower volumes but degrade fastest when queuing and timeouts truncate correction cycles.
- Failure modes are architecture-specific: sequential pipelines struggle with cross-table references, while more complex multi-agent systems introduce coordination failures and reflexive loops can oscillate on ambiguous disclosures.

## Important Details

- Dataset: 10,000 SEC filings from EDGAR, sampled from fiscal years 2021-2024 across 10-K, 10-Q, and 8-K forms.
- Dataset composition: 4,000 10-K filings, 4,000 10-Q filings, and 2,000 8-K filings.
- Extraction schema: 25 field types across financial metrics, governance, and executive compensation.
- Ground truth: the paper reports a three-stage annotation process combining XBRL pre-annotation, manual annotation by credentialed annotators, and adjudication by a senior financial analyst.
- Models evaluated: GPT-4o, Claude 3.5 Sonnet, Gemini 1.5 Pro, Llama 3 70B, and Mixtral 8x22B.
- Metrics: field-level F1, document-level accuracy, end-to-end latency, cost per document, and token efficiency.
- Implementation: the paper reports LangGraph v0.2 orchestration, custom agent nodes, vLLM serving for open-weight models, and an 8-machine cluster with A100 GPUs.
- Main reported result: Claude 3.5 Sonnet with the reflexive architecture reaches F1 0.943 and strict document accuracy 0.758, but at $0.430 per document and median latency of 74.1 seconds.
- Main tradeoff result: Claude 3.5 Sonnet with the hierarchical architecture reaches F1 0.929 and strict document accuracy 0.718 at $0.261 per document and median latency of 46.2 seconds.
- Parallel fan-out reduces latency relative to sequential processing, but the reported accuracy gains are modest compared with hierarchical and reflexive workflows.
- The combined "Hierarchical-Optimized" configuration uses hybrid semantic caching, two-tier model routing, and adaptive retries; the authors report F1 0.924, $0.148 per document, and 30.2 second latency.
- Scaling analysis reports that reflexive workflows degrade sharply past roughly 25,000 documents per day under the fixed cluster setup and become worse than hierarchical workflows at 50,000 documents per day.
- Failure analysis identifies cross-table reference failures, temporal confusion, unit/scale errors, compensation vesting misparses, context truncation, coordination failures, hallucinated values, and ambiguous disclosure resolution.
- The paper's limitations matter: the dataset is English-only SEC filings, the field schema is fixed, pricing/model assumptions are from January 2025, and public code/data artifacts were not evident from the arXiv page when this note was added.
- Some rendered text in the ar5iv HTML drops numeric expressions from the original LaTeX, so exact ratios should be checked against the PDF/abstract before reuse.

## Entities

- Authors: Siddhant Kulkarni, Yukta Kulkarni
- Organizations and platforms: arXiv, U.S. Securities and Exchange Commission, EDGAR, OpenAI, Anthropic, Google, Meta, Mistral
- Models: GPT-4o, Claude 3.5 Sonnet, Gemini 1.5 Pro, Llama 3 70B, Mixtral 8x22B
- Tools and frameworks: LangGraph, vLLM, sec-edgar-downloader
- Concepts: multi-agent orchestration, financial document extraction, structured extraction, sequential pipeline, parallel fan-out, hierarchical supervisor-worker, reflexive self-correction, semantic caching, model routing, adaptive retry, cost-accuracy Pareto frontier

## My Notes

- Add this to multi-agent and workflow coverage as a medium-confidence, domain-specific benchmark rather than a general law of agent design.
- The most durable lesson is that architecture choice has operational consequences beyond benchmark accuracy: cost, latency distribution, and queue behavior can reverse the apparent winner.
- The hierarchical result fits the KB's existing bias toward explicit orchestration and bounded delegation.
- The reflexive result is a useful caution against treating self-correction loops as free accuracy: they can be expensive, slow, and brittle under throughput pressure.
- The paper would be much stronger with public artifacts, repeatable prompts, dataset details, and current model/pricing assumptions.

## Open Questions

- Are the dataset, prompts, orchestration code, or evaluation scripts publicly available anywhere outside the arXiv page?
- Would the cost-accuracy frontier change under current 2026 model pricing and model quality?
- How much of the reported improvement comes from orchestration shape versus prompt engineering, confidence calibration, and field-specific validation rules?
- Can financial identity constraints be enforced symbolically outside the LLM loop to reduce reliance on reflexive critique?
- Does the benchmark contain possible contamination or leakage through public SEC filings, XBRL tags, or model pretraining exposure?

## Related

- [[multi-agent-systems]]
- [[workflows]]
- [[ai-agent-evals]]
- [[llm-agents]]
- [[agent-frameworks]]

## Source Text

Title: Benchmarking Multi-Agent LLM Architectures for Financial Document Processing: A Comparative Study of Orchestration Patterns, Cost-Accuracy Tradeoffs and Production Scaling Strategies

Authors: Siddhant Kulkarni, Yukta Kulkarni

Submitted: 24 Mar 2026

Abstract: The adoption of large language models (LLMs) for structured information extraction from financial documents has accelerated rapidly, yet production deployments face fundamental architectural decisions with limited empirical guidance. We present a systematic benchmark comparing four multi-agent orchestration architectures: sequential pipeline, parallel fan-out with merge, hierarchical supervisor-worker and reflexive self-correcting loop.

These are evaluated across five frontier and open-weight LLMs on a corpus of 10,000 SEC filings (10-K, 10-Q and 8-K forms). Our evaluation spans 25 extraction field types covering governance structures, executive compensation and financial metrics, measured along five axes: field-level F1, document-level accuracy, end-to-end latency, cost per document and token efficiency.

We find that reflexive architectures achieve the highest field-level F1 (0.943) but at 2.3x the cost of sequential baselines, while hierarchical architectures occupy the most favorable position on the cost-accuracy Pareto frontier (F1 0.921 at 1.4x cost). We further present ablation studies on semantic caching, model routing and adaptive retry strategies, demonstrating that hybrid configurations can recover 89% of the reflexive architecture's accuracy gains at only 1.15x baseline cost.

Our scaling analysis from 1K to 100K documents per day reveals non-obvious throughput-accuracy degradation curves that inform capacity planning. These findings provide actionable guidance for practitioners deploying multi-agent LLM systems in regulated financial environments.

Subjects: Artificial Intelligence (cs.AI); Computation and Language (cs.CL); Machine Learning (cs.LG)

Cite as: arXiv:2603.22651 [cs.AI]

DOI: https://doi.org/10.48550/arXiv.2603.22651

Submission history: [v1] Tue, 24 Mar 2026 00:02:47 UTC
