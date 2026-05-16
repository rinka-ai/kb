---
id: article-2026-05-14-beyond-individual-intelligence-multi-agent-life-survey
type: source
title: "Beyond Individual Intelligence: Surveying Collaboration, Failure Attribution, and Self-Evolution in LLM-based Multi-Agent Systems"
path: raw/articles/arxiv/2026-05-14-beyond-individual-intelligence-multi-agent-life-survey.md
author: Shihao Qi et al.
publisher: arXiv.org
url: https://arxiv.org/abs/2605.14892
date_published: 2026-05-14
date_added: 2026-05-16
tags: [agents, multi-agent, failure-attribution, self-evolution, evals, surveys, papers]
status: active
quality: medium
summary: "This survey organizes LLM-based multi-agent systems around the LIFE progression: individual capabilities, collaboration, failure attribution, and self-evolution, arguing that future systems need closed diagnosis-and-repair loops rather than coordination alone."
related: [multi-agent-systems, multi-agent-failure-attribution, ai-agent-evals, agent-harnesses, agent-protocols, llm-agents]
---

# Beyond Individual Intelligence: Surveying Collaboration, Failure Attribution, and Self-Evolution in LLM-based Multi-Agent Systems

## Source Metadata

- Path: raw/articles/arxiv/2026-05-14-beyond-individual-intelligence-multi-agent-life-survey.md
- Author: Shihao Qi, Jie Ma, Rui Xing, Wei Guo, Xiao Huang, Zhitao Gao, Jianhao Deng, Jun Liu, Lingling Zhang, Bifan Wei, Boqian Yang, Pinghui Wang, Jianwen Sun, Jing Tao, Yaqiang Wu, Hui Liu, Yu Yao, Tongliang Liu
- Published: 2026-05-14
- Publisher: arXiv.org
- URL: https://arxiv.org/abs/2605.14892
- PDF: https://arxiv.org/pdf/2605.14892
- DOI: https://doi.org/10.48550/arXiv.2605.14892
- GitHub: https://github.com/mira-ai-lab/awesome-mas-life

## TL;DR

This is a broad survey and roadmap for LLM-based multi-agent systems. Its most useful contribution for this KB is the LIFE progression: Lay individual capability foundations, Integrate agents through collaboration, Find faults through attribution, and Evolve through autonomous self-improvement. The survey argues that multi-agent work should be understood as a closed loop: collaboration creates new failure surfaces, attribution explains where and how failures propagate, and self-evolution should use those diagnostics to improve roles, communication, topology, memory, prompts, tools, or whole system designs.

## Key Claims

- Multi-agent systems are useful when specialized roles, parallel exploration, or structured coordination can outperform a single model context, but tighter coordination also creates new cascading failure modes.
- Prior surveys usually treat individual agents, multi-agent collaboration, and agent self-evolution separately; this paper argues they should be analyzed as causally linked lifecycle stages.
- Individual agent capability still matters as the foundation for collaboration, especially reasoning, memory, planning, tool use, and evaluation.
- Multi-agent collaboration can be organized by role capability/allocation, communication modes/protocols, orchestration topology, information flow, and interaction patterns.
- Failure attribution should answer more than "did the task fail?"; it should identify which agent, step, module, interaction, or propagation chain introduced the decisive error.
- Existing attribution work clusters into data-driven methods, constraint-guided methods, and causal-inference methods, but definitions and evaluation targets remain inconsistent.
- The hardest attribution problems are compound and delayed: the step where failure becomes visible may not be the root cause, and multiple local errors can jointly produce a global breakdown.
- Self-evolution spans three loci: agentic evolution of individual prompts, memory, or parameters; systemic evolution of topology, team composition, or shared memory; and meta evolution of whole system designs, archives, or generators.
- Attribution and evolution should form a repair loop: reliable diagnosis narrows the search space for improvement, while evolved collaboration structures change what can be observed and attributed next.
- Treat the paper as a map of the research landscape, not as independent empirical validation of any one multi-agent architecture.

## Important Details

- The PDF is an 89-page arXiv v1 survey submitted on 2026-05-14.
- The survey uses the LIFE acronym for four linked stages: individual intelligence, multi-agent collaboration, multi-agent failure attribution, and multi-agent system self-evolution.
- The individual-agent section frames an agent as a sequential decision-making system with observations, actions, tool-returned observations, memory state, reasoning, planning, and tool execution.
- The collaboration section covers roles, communication, orchestration, interaction, and evaluation. It compares communication protocols and multi-agent frameworks as part of the coordination layer.
- The failure taxonomy is organized around system structure, execution stages, and causal lifecycle. This separates where collaboration breaks down, where failures arise in the workflow, and how local triggers propagate into global failures.
- Representative attribution method families include data-driven trajectory models, constraint-guided LLM-as-judge or diagnostic pipelines, and causal/counterfactual approaches.
- The survey highlights five attribution challenges: unsettled attribution definitions, strongly coupled anomaly propagation, limited fine-grained attribution, insufficient data realism, and incomplete evaluation-to-repair loops.
- The self-evolution section divides adaptation targets into agentic, systemic, and meta scopes. Agentic methods change prompts, memory, or parameters; systemic methods change topology, roles, or shared memory; meta methods search or train generators over complete system configurations.
- The paper's tables are especially useful as literature maps: failure attribution methods and datasets, agentic/systemic/meta self-evolution methods, and mechanism landscapes for MAS self-evolution.
- The main limitation for this KB is genre: this is a fresh survey with broad coverage, so its value is taxonomy and bibliography more than settled production evidence.

## Entities

- People: Shihao Qi, Jie Ma, Rui Xing, Wei Guo, Xiao Huang, Zhitao Gao, Jianhao Deng, Jun Liu, Lingling Zhang, Bifan Wei, Boqian Yang, Pinghui Wang, Jianwen Sun, Jing Tao, Yaqiang Wu, Hui Liu, Yu Yao, Tongliang Liu
- Institutions: MOE KLINNS Lab, Xi'an Jiaotong University, Central China Normal University, Lenovo AI Technology Center, Sydney AI Centre, University of Sydney
- Systems and methods: LIFE progression, MCP, A2A, Who&When, TRAIL, TraceElephant, AgentFail, AgentAsk, AEGIS, AGENTRACER, GraphTracer, MASC, DOVER, AgentRx, GPTSwarm, ADAS, AgentBreeder, AFlow, MAS-ZERO, FlowReasoner, MaAS, MAS-GPT, G-Memory
- Concepts: LLM-based agents, multi-agent systems, collaboration topology, failure attribution, anomaly propagation, causal lifecycle, attribution-repair loop, agentic self-evolution, systemic self-evolution, meta self-evolution

## My Notes

- This source earns a place in the KB because it names a gap the current wiki only implied: multi-agent systems need traceable failure attribution before self-improvement can be trusted.
- The most durable pattern is the closed loop from collaboration to attribution to evolution. That links the KB's existing multi-agent, harness, eval, and protocol pages without needing to accept every surveyed method as mature.
- The survey complements AHE: AHE gives a concrete harness-evolution experiment, while this paper provides a wider taxonomy for multi-agent diagnosis and structural repair.
- The attribution framing is especially useful for future code-agent work: "one writer plus reviewers" is only safe if handoffs, critiques, tool calls, and final synthesis leave enough evidence to debug failures later.
- Use this as a bibliography gateway when looking for specific attribution datasets or self-evolving MAS methods; do not cite it as proof that autonomous multi-agent self-evolution is production-ready.

## Open Questions

- Which attribution labels survive contact with real production traces where errors can involve user input, retrieval, tools, model behavior, permissions, and orchestration code at once?
- How should a harness represent causal chains across agents without overwhelming the active context or forcing brittle trace schemas?
- Can repair-oriented evaluation measure whether an attribution actually improved the next system version, instead of only whether it localized a known injected fault?
- Where should self-evolution be allowed to act in deployed systems: prompts, memory, tool descriptions, tool implementations, communication topology, or only suggestion artifacts reviewed by humans?
- How much of the self-evolution literature is benchmark-specific search over workflows rather than general, durable organizational learning?

## Related

- [[multi-agent-systems]]
- [[multi-agent-failure-attribution]]
- [[ai-agent-evals]]
- [[agent-harnesses]]
- [[agent-protocols]]
- [[llm-agents]]
- [[2026-04-28-agentic-harness-engineering-observability-driven-automatic-evolution-of-coding-agent-harnesses]]
- [[2026-04-16-autogenesis-a-self-evolving-agent-protocol]]
- [[2026-03-24-benchmarking-multi-agent-llm-architectures-financial-document-processing]]

## Source Text

Title: Beyond Individual Intelligence: Surveying Collaboration, Failure Attribution, and Self-Evolution in LLM-based Multi-Agent Systems

Authors: Shihao Qi, Jie Ma, Rui Xing, Wei Guo, Xiao Huang, Zhitao Gao, Jianhao Deng, Jun Liu, Lingling Zhang, Bifan Wei, Boqian Yang, Pinghui Wang, Jianwen Sun, Jing Tao, Yaqiang Wu, Hui Liu, Yu Yao, Tongliang Liu

Submitted: 14 May 2026

Abstract: LLM-based autonomous agents have demonstrated strong capabilities in reasoning, planning, and tool use, yet remain limited when tasks require sustained coordination across roles, tools, and environments. Multi-agent systems address this limitation through structured collaboration among specialized agents, but tighter coordination also amplifies a less explored risk: errors can propagate across agents and interaction rounds, producing failures that are difficult to diagnose and, even once identified, rarely translate into structural self-improvement. Existing surveys have separately covered individual agent capabilities, multi-agent collaboration, or agent self-evolution, but treat these topics in isolation, leaving the causal dependencies among them largely unexamined. This survey provides a unified and comprehensive review organized around four causally linked stages, which we term the LIFE progression: Lay the capability foundation, Integrate agents through collaboration, Find faults through attribution, and Evolve through autonomous self-improvement. We review the capability foundations of individual agents, the organizational mechanisms of multi-agent collaboration, the methodological landscape of failure attribution, and the hierarchical design space of self-evolution. Throughout, we formally characterize the dependencies between adjacent stages, revealing how each stage both depends on and constrains the next. Beyond synthesizing existing work, we identify open challenges at the boundaries between LIFE stages and propose a cross-stage research agenda for closed-loop multi-agent systems capable of continuously diagnosing failures, reorganizing collaborative structures, and refining agent behaviors, thereby extending current human-engineered coordination frameworks toward more self-organizing and resilient forms of collective intelligence. By bridging these previously fragmented research threads into a coherent progression, this survey aims to offer both a systematic reference for current research and a conceptual roadmap toward autonomous, self-improving multi-agent intelligence.

Subjects: Artificial Intelligence (cs.AI)

Cite as: arXiv:2605.14892 [cs.AI]

DOI: https://doi.org/10.48550/arXiv.2605.14892

Submission history: [v1] Thu, 14 May 2026 14:36:13 UTC

Full PDF not copied locally. Use the arXiv page and PDF URL above for the complete paper.
