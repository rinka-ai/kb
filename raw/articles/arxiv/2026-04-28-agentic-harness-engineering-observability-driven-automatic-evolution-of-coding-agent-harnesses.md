---
id: article-2026-04-28-agentic-harness-engineering
type: source
title: "Agentic Harness Engineering: Observability-Driven Automatic Evolution of Coding-Agent Harnesses"
path: raw/articles/arxiv/2026-04-28-agentic-harness-engineering-observability-driven-automatic-evolution-of-coding-agent-harnesses.md
author: Jiahang Lin et al.
publisher: arXiv.org
url: https://arxiv.org/abs/2604.25850
date_published: 2026-04-28
date_added: 2026-04-29
tags: [agents, harnesses, coding-agents, self-evolution, observability, evals, papers]
status: processed
quality: high
summary: AHE is an observability-driven framework for automatically evolving coding-agent harnesses by making components file-level editable artifacts, turning trajectories into layered evidence, and recording each harness edit as a falsifiable prediction checked against the next evaluation round.
related: [agent-harnesses, agent-tools, agent-skills, agent-memory, agent-protocols, context-engineering, ai-agent-evals, llm-agents]
---

# Agentic Harness Engineering: Observability-Driven Automatic Evolution of Coding-Agent Harnesses

## Source Metadata

- Path: raw/articles/arxiv/2026-04-28-agentic-harness-engineering-observability-driven-automatic-evolution-of-coding-agent-harnesses.md
- Author: Jiahang Lin, Shichun Liu, Chengjun Pan, Lizhi Lin, Shihan Dou, Xuanjing Huang, Hang Yan, Zhenhua Han, Tao Gui
- Published: 2026-04-28
- Publisher: arXiv.org
- URL: https://arxiv.org/abs/2604.25850
- PDF: https://arxiv.org/pdf/2604.25850
- Code: https://github.com/china-qijizhifeng/agentic-harness-engineering

## TL;DR

Agentic Harness Engineering (AHE) treats a coding-agent harness as a learnable, inspectable adaptation surface rather than a fixed wrapper around the model. Its core move is observability: expose prompts, tools, middleware, skills, sub-agents, and memory as file-level editable components; distill long trajectories into layered evidence; and require every harness edit to carry a predicted impact that the next evaluation round can confirm or reject.

## Key Claims

- Coding-agent performance depends heavily on the surrounding harness, including prompts, tools, middleware, execution constraints, memory, and environment interfaces.
- Automating harness engineering is hard because the action space is heterogeneous, benchmark signals are sparse and noisy, trajectories can span millions of tokens, and edit effects are hard to attribute.
- AHE's three observability pillars make harness evolution tractable: component observability, experience observability, and decision observability.
- Component observability comes from a decoupled harness substrate where seven component types are exposed as explicit files: system prompt, tool description, tool implementation, middleware, skill, sub-agent configuration, and long-term memory.
- Experience observability comes from an Agent Debugger pipeline that turns raw rollouts into per-task reports and a benchmark-level overview while preserving drill-down access to the original traces.
- Decision observability comes from a change manifest where each edit names the evidence, inferred root cause, targeted fix, expected improvements, and possible regressions.
- In the reported experiment, ten AHE iterations lift Terminal-Bench 2 pass@1 from 69.7% to 77.0%, above Codex CLI at 71.9% and the self-evolving baselines ACE and TF-GRPO.
- The frozen AHE harness transfers without re-evolution to SWE-bench-verified, where it reports the highest aggregate success rate and lower token use than the seed and self-evolved baselines.
- Component ablations suggest the gains live mostly in long-term memory, tools, and middleware; swapping in the evolved system prompt alone regresses performance.
- The evolve model predicts intended fixes much better than random, but regression prediction remains weak, making unforeseen breakage a central limitation.

## Important Details

- The loop uses three roles: Code Agent, Agent Debugger, and Evolve Agent. In the main experiment, all three share the same base model to isolate the gain to harness edits rather than stronger analysis or editing models.
- AHE starts from a deliberately minimal NexAU seed harness with one shell-execution tool and no middleware, skills, or sub-agents.
- Each iteration runs rollouts, cleans traces, attributes the prior round's manifest, rolls back rejected edits, distills trajectories, lets the Evolve Agent edit the harness, and commits the result.
- The paper reports `k=2` rollouts per task per iteration over 89 Terminal-Bench 2 tasks, with the ten-iteration campaign taking about 32 hours.
- Terminal-Bench 2 results: NexAU0 69.7%, ACE 68.9%, TF-GRPO 72.3%, AHE 77.0%, and Codex CLI 71.9% overall. AHE improves most clearly on Medium tasks but trails Codex on Hard tasks.
- SWE-bench-verified transfer results: AHE reports 75.6% aggregate success across 500 tasks, compared with 75.2% for the seed, 74.6% for ACE, and 74.2% for TF-GRPO, while using fewer tokens per trial than all three.
- Cross-model transfer is positive across several alternate base models, with larger reported gains on weaker or more distant model families.
- Ablation results: memory-only, tool-only, and middleware-only variants outperform the seed; prompt-only underperforms it. The paper interprets this as evidence that executable or structured harness artifacts transfer better than prose strategy alone.
- The strongest limitation is regression blindness: fix prediction precision and recall are far above random, but regression prediction precision and recall remain low.
- The public repository exists and is MIT licensed, but the README says the Agent Debugger is only partially open-sourced and some setup paths depend on private repositories or access-controlled infrastructure.

## Entities

- People: Jiahang Lin, Shichun Liu, Chengjun Pan, Lizhi Lin, Shihan Dou, Xuanjing Huang, Hang Yan, Zhenhua Han, Tao Gui
- Institutions: Fudan University, Peking University, Shanghai Qiji Zhifeng Co., Ltd
- Systems: AHE, NexAU, Agent Debugger, Evolve Agent, Code Agent, Terminal-Bench 2, SWE-bench-verified, ACE, TF-GRPO, Codex CLI, opencode, terminus-2
- Concepts: agent harnesses, harness evolution, component observability, experience observability, decision observability, trajectory distillation, self-attribution, rollback, test-time learning, externalized agent experience

## My Notes

- This belongs in the KB because it turns the harness-engineering discussion from architecture doctrine into an empirical optimization loop.
- The most reusable pattern is not the leaderboard claim; it is the contract shape: each harness edit should be explicit, scoped, evidence-backed, predicted, evaluated, and revertible.
- The paper strengthens the KB's existing externalization thesis. Experience accumulates in files, memory, middleware, and tools rather than in model weights or prompt text alone.
- The ablation is especially useful for our agent-harness concept page because it provides a concrete warning against treating prompt editing as the main self-improvement surface.
- The regression-blindness result is important: self-evolving systems need not only predicted-fix ledgers but also better interaction and regression modeling across components.
- For evals, the important lesson is that scores should be paired with per-edit attribution and regression analysis when the harness is changing between runs.
- For context engineering, the Agent Debugger layer is a progressive-disclosure pattern: summarize trajectories into layered reports, but keep raw traces reachable for verification.
- Treat the empirical results as promising but not yet settled. This is a fresh arXiv v1 preprint, the implementation is only partially reproducible from the public repo, and the method may still be benchmark-sensitive.

## Open Questions

- Which AHE components would remain useful outside coding-agent benchmarks, especially in research, browser, or document workflows?
- Can the decision manifest be made strong enough to predict regressions and component interactions rather than only intended fixes?
- How should a production system bound the action space when the harness can mutate tools, middleware, memory, and prompts?
- What is the smallest observability substrate that preserves most of AHE's gains without the full benchmark-and-debugger compute overhead?
- How much of the transfer result comes from general engineering heuristics versus artifacts that match Terminal-Bench and SWE-bench task structure?

## Related

- [[agent-harnesses]]
- [[agent-tools]]
- [[agent-skills]]
- [[agent-memory]]
- [[agent-protocols]]
- [[context-engineering]]
- [[ai-agent-evals]]
- [[llm-agents]]
- [[2026-04-16-externalization-in-llm-agents-a-unified-review-of-memory-skills-protocols-and-harness-engineering]]
- [[2026-04-16-autogenesis-a-self-evolving-agent-protocol]]
- [[2026-04-14-dive-into-claude-code-the-design-space-of-todays-and-future-ai-agent-systems]]

## Source Text

Not copied locally. Use the arXiv page and PDF URL above if the full text is needed.
