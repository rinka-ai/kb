---
id: wiki-index
type: index
title: Wiki Index
summary: Master human-readable catalog of all wiki pages and source collections. Updated on every ingest.
last_reviewed: 2026-05-16
---

# Wiki Index

This is the master catalog of the wiki. Every concept page, summary, and sub-index lives below with a one-line description. The LLM updates this file whenever wiki pages are created, renamed, or have their `summary` changed (see `AGENTS.md` → Agent Workflows).

For the chronological history of ingest, query, lint, and maintenance events, see [[log]].

## Concepts

- [[agent-frameworks]] — Agent frameworks package orchestration, runtime state, approval interrupts, tool surfaces, and durability into reusable system primitives instead of app-specific glue.
- [[agent-harnesses]] — Agent harnesses are the non-model execution layer that assembles context, runs tools, enforces policy, persists artifacts, attributes failures, and turns agent loops into deployable AI systems.
- [[agent-memory]] — Agent memory covers how systems preserve, retrieve, consolidate, and reuse information across time through explicit storage, load policy, write discipline, verification, and harness-owned context management.
- [[agent-protocols]] — Agent protocols define the typed interaction layer around tools, approvals, threads, and runtime state so agent systems stay inspectable and portable.
- [[agent-security]] — Agent security is a systems problem spanning prompt injection, authorization, sandbox boundaries, secret placement, tool restriction, skill supply-chain trust, and adversarial evaluation rather than a single prompting trick.
- [[agent-skills]] — Agent skills are reusable procedural capability modules that package task-specific guidance while keeping invocation, evidence, and mutation boundaries explicit.
- [[agent-tools]] — Agent tools are structured action surfaces for non-deterministic systems, so they need clearer schemas, tighter ergonomics, and better orchestration boundaries than APIs built only for humans.
- [[ai-validation-and-assurance]] — AI validation and assurance extends evals into system modeling, property specification, falsification, stochastic testing, robustness evidence, and safety cases.
- [[ai-agent-evals]] — AI agent evals measure full systems, including harnesses, tools, infrastructure, adversarial conditions, validation properties, failure attribution, and deployment constraints, rather than isolated model snapshots.
- [[benchmark-integrity]] — Benchmark integrity is the discipline of ensuring that reported agent scores still mean what people think they mean despite contamination, infra variance, and evaluator drift.
- [[claude-code]] — Claude Code is best understood as an agentic coding operating environment with explicit surfaces for permissions, context management, tool orchestration, hooks, MCP tools, skills, delegated work, append-oriented session state, and reviewable collaboration artifacts.
- [[computer-use]] — Computer-use agents extend web agents into full operating-system environments, where grounding, application knowledge, and multi-app coordination become first-class problems.
- [[context-engineering]] — Context engineering is the discipline of deciding what information enters active model context, in what form, and with what update policy.
- [[context-rot]] — Context rot is performance degradation caused by overly long, noisy, or repeatedly rewritten context that erodes semantic discrimination.
- [[decision-making-under-uncertainty]] — Decision-making under uncertainty connects probability, utility, planning, belief states, and sequential consequences into one action-oriented framework.
- [[deep-learning]] — Deep learning is representation learning with neural networks, where architecture, losses, optimization, data, and scale jointly shape model behavior.
- [[distributional-reinforcement-learning]] — Distributional reinforcement learning models the full distribution of returns rather than only expected value, enabling richer theory and algorithms for uncertainty over outcomes.
- [[durable-execution]] — Durable execution makes long-running agent work survivable by treating pause, resume, replay, retry, and human intervention as first-class runtime behaviors.
- [[embeddings]] — Embeddings turn text into vector representations for similarity search and clustering, but in this KB they matter mainly as one retriever component inside a broader retrieval pipeline.
- [[enterprise-agent-deployment-failure-modes]] — Enterprise AI value usually fails when models are poured onto messy workflows without real workflow discovery, deterministic orchestration, shared governance, model operations, and feedback loops.
- [[fairness-and-ml]] — Fairness and ML is a socio-technical discipline about measurement, legitimacy, classification criteria, causality, recourse, feedback loops, and institutional context.
- [[learning-theory]] — Learning theory explains when empirical learning should generalize, using sample complexity, hypothesis-class capacity, risk decomposition, and regularization rather than training loss alone.
- [[llm-agents]] — LLM agents are systems where models act over time with tools, memory, and structured runtime control rather than producing a single standalone response.
- [[managed-agents]] — Managed agents decouple model reasoning from durable runtime interfaces for sessions, runs, approvals, tools, entrypoints, and state.
- [[ml-systems-engineering]] — ML systems engineering treats AI as a deployed lifecycle across data, training, evaluation, serving, monitoring, scaling, governance, and compute economics.
- [[multi-agent-failure-attribution]] — Multi-agent failure attribution identifies where, how, and why errors emerge and propagate across agent roles, steps, tools, and coordination structures so diagnoses can support repair.
- [[multi-agent-reinforcement-learning]] — Multi-agent reinforcement learning studies learning agents in shared environments where strategic interaction, nonstationarity, coordination, communication, and partial observability matter.
- [[multi-agent-systems]] — Multi-agent systems include both LLM orchestration patterns and formal multi-agent learning settings; reliable designs need bounded roles plus attribution paths for diagnosing coordination failures.
- [[obsidian]] — Obsidian is the human-facing interface for navigating the repo's markdown corpus, wiki links, and mixed raw-versus-derived knowledge artifacts.
- [[optimization-for-ml]] — Optimization for ML is the search layer that turns objectives into trained models, tuned systems, falsifying examples, and efficient deployment choices.
- [[payment-integrations]] — Payment integrations should keep sensitive collection inside managed provider surfaces and complete business logic from verified events.
- [[personal-knowledge-bases]] — Personal knowledge bases turn one-off research into durable, cumulative assets by preserving raw material, synthesis, and reusable outputs together.
- [[probabilistic-machine-learning]] — Probabilistic machine learning treats uncertainty, latent structure, missing information, and prediction as first-class modeling problems.
- [[rag]] — RAG is a full retrieval pipeline that assembles external evidence at query time rather than a synonym for vector search alone.
- [[reasoning]] — Reasoning in agent loops is the deliberation layer that decides what to do next, when to gather more evidence, and when a tool result changes the plan.
- [[reinforcement-learning]] — Reinforcement learning studies agents that learn policies through interaction, delayed reward, value estimation, exploration, and sequential decision-making.
- [[research-workflows]] — Research workflows in this KB are compounding loops of ingest, retrieval, synthesis, and maintenance rather than one-shot question answering.
- [[resolvers]] — Resolvers are lightweight routing layers that decide which context, skill, or filing rule an agent should load for a given task.
- [[speech-to-text]] — Speech-to-text quality is shaped as much by capture conditions, output structure, and diarization choices as by the base transcription model.
- [[synthetic-voices]] — Synthetic voices create powerful accessibility and product opportunities, but they also demand consent, disclosure, provenance, and strong anti-impersonation controls.
- [[text-to-speech]] — Text-to-speech is an output design problem as much as an API call, balancing latency, style control, markup, and disclosure requirements.
- [[voice-ai]] — Voice AI is a full interaction stack spanning speech I/O, runtime control, tools, personalization, telephony, and trust controls.
- [[voice-dictation]] — Voice dictation systems optimize for fast cursor-level text entry and editing, which makes them a distinct product shape from conversational voice agents.
- [[web-agents]] — Web agents are agents that operate over browser environments, where the browser can be both the primary task world and a fallback integration layer for systems without clean APIs.
- [[workflows]] — Agent workflows wrap model calls in explicit orchestration so sequencing, approvals, and side effects stay inspectable instead of being improvised inside one autonomous loop.
- [[algorithmic-fairness-criteria]] — Algorithmic fairness criteria formalize non-discrimination goals such as independence, separation, and sufficiency, but these criteria can conflict and do not settle legitimacy by themselves.
- [[bandits-and-exploration]] — Bandits isolate the exploration-exploitation tradeoff by forcing agents to choose between actions with uncertain payoffs before full state dynamics enter the problem.
- [[causal-fairness-and-feedback-loops]] — Causal fairness and feedback loops focus on how model decisions intervene in the world, reshape future data, and affect agency, recourse, and institutional legitimacy.
- [[falsification-and-robustness-testing]] — Falsification and robustness testing search for counterexamples, disturbances, and failure modes instead of only estimating average benchmark performance.
- [[generalization-and-model-selection]] — Generalization and model selection explain how to choose models that perform beyond the training set by managing capacity, validation evidence, and regularization.
- [[generative-modeling]] — Generative modeling learns data distributions or simulators, connecting latent-variable models, autoregressive models, VAEs, GANs, flows, and diffusion models.
- [[markov-decision-processes]] — Markov decision processes model sequential decisions with states, actions, transitions, rewards, policies, value functions, and Bellman equations.
- [[ml-training-serving-lifecycle]] — The ML training-serving lifecycle covers how data, training, evaluation, deployment, inference, monitoring, and feedback connect into one operational system.
- [[monitoring-drift-and-feedback]] — Monitoring, drift, and feedback loops explain why deployed ML systems must track changing data, behavior, outcomes, and downstream effects after launch.
- [[monte-carlo-and-sampling]] — Monte Carlo and sampling methods approximate expectations, probabilities, and posterior quantities by drawing samples when exact inference is unavailable.
- [[neural-network-architectures]] — Neural network architectures encode inductive biases through composition, convolution, recurrence, attention, graph structure, residual paths, and latent-variable structure.
- [[neural-network-training]] — Neural network training combines losses, backpropagation, automatic differentiation, stochastic optimization, initialization, normalization, and regularization into one learning process.
- [[planning-and-online-decision-making]] — Planning and online decision-making choose actions by reasoning over models, simulations, beliefs, and future consequences before or during execution.
- [[policy-gradients-and-actor-critic]] — Policy gradients and actor-critic methods optimize policies directly, often using value estimates as variance-reducing critics.
- [[pomdps-and-belief-states]] — POMDPs model sequential decision-making under hidden state by replacing direct state access with observations and belief-state updates.
- [[probabilistic-inference]] — Probabilistic inference updates uncertain beliefs from evidence, giving ML systems a language for hidden state, missing data, latent variables, and calibrated decisions.
- [[scaling-laws-and-compute-economics]] — Scaling laws and compute economics help reason about capability, cost, resource allocation, efficiency, sustainability, and the limits of simply adding more compute.
- [[temporal-difference-and-value-learning]] — Temporal-difference and value-learning methods update value estimates from bootstrapped predictions rather than waiting for complete returns.
- [[variational-inference]] — Variational inference turns difficult probabilistic inference into optimization by fitting a tractable approximation to an intractable posterior.

## Summaries

- [[2026-04-10-kb-acquisition-priorities]] — Audit of the KB's strongest clusters, weakest provenance gaps, and the next sources that most improve coverage.
- [[2026-04-12-elevenlabs-voice-agent-architecture]] — Architecture summary of ElevenLabs' voice-agent stack across runtime control, tools, personalization, telephony, and operations.
- [[2026-04-13-rag-acquisition-priorities]] — Rationale and reading order for the core RAG paper, retriever, evaluation, and GraphRAG additions.
- [[2026-04-16-agent-stack-builder-guide-kb-upgrades]] — Summary of how the builder guide and follow-on sources sharpen the KB around memory, skills, protocols, and harnesses.
- [[2026-04-17-browserbase-agent-architecture-kb-upgrades]] — Browserbase strengthens KB patterns around zero-trust sandboxes, credential brokering, permission-aware skill loading, and reusing one agent runtime across multiple entrypoints.
- [[2026-04-17-claude-code-runtime-patterns-from-source-teardown]] — Reusable runtime-design patterns extracted from a Claude Code architecture teardown and cross-checked against adjacent sources.
- [[2026-04-17-goose-runtime-patterns-from-source-teardown]] — Reusable runtime-design patterns extracted from the Goose source tree, with emphasis on harness layering, unified tool runtime design, and durable multi-surface execution.
- [[2026-04-18-outbound-ai-agent-kb-upgrades]] — The strongest version of the Levi Munneke workflow is a context-rich outbound operations system with explicit source selection, deterministic data pipelines, human-reviewed messaging, and first-class deliverability and policy guardrails.
- [[2026-04-19-openai-agents-js-runtime-patterns-from-source-teardown]] — Lessons from openai-agents-js: separate the core loop from provider bindings, treat approvals and sessions as first-class state machines, and encode orchestration patterns as explicit framework surfaces.
- [[2026-04-20-akitaonrails-blog-durable-lessons]] — Full-corpus synthesis of the English AkitaOnRails archive — anti-cargo-cult engineering, software economics, operational ownership, and AI-era realism.
- [[2026-05-02-agent-memory-architecture-kb-upgrades]] — How the Nicolas Bustamante memory-architecture thread should improve the KB's agent-memory synthesis and its own authoring discipline.
- [[2026-05-02-flue-sandbox-agent-framework-source-teardown]] — Reusable lessons from Flue's source tree: how a compact TypeScript sandbox-agent framework should handle context, sessions, capabilities, events, and deployment lifecycle.
- [[2026-05-09-contextlattice-memory-context-orchestration-source-teardown]] — Reusable lessons from ContextLattice's source tree: memory contracts, context packs, topic rollups, staged retrieval, retrieval lifecycle metadata, and write-path hygiene.
- [[2026-05-09-durable-orchestration-background-agents-kb-upgrades]] — A durable-orchestration essay reinforces the KB's harness thesis: stable execution primitives should outlive shifting agent topologies, while background agents raise the cost of missing crash recovery, lifecycle controls, event waits, and structured traces.
- [[2026-05-18-cognee-memory-skills-kb-upgrades]] — Cognee reframes memory as a control plane spanning graph memory, session memory, retrieval routing, eval-driven tuning, feedback promotion, and proposal-first skill mutation.
- [[2026-05-18-ai-textbook-kb-improvement-map]] — Full-corpus audit of the official AI/ML textbook cache, identifying the KB's biggest gaps in ML foundations, probability, optimization, RL, fairness, validation, and ML systems engineering.

## Sub-Indexes

These per-collection sub-index pages in `wiki/index/` enumerate notes within a single source collection.

- [[home]] — Landing page and navigation hub. (Master catalog is this file.)
- [[anthropic-engineering]] — Sub-index for `raw/articles/anthropic-engineering/` notes.
- [[arxiv]] — Sub-index for `raw/articles/arxiv/` papers.
- [[claude-blog]] — Sub-index for `raw/articles/claude-blog/` posts.
- [[github-repos]] — Sub-index for `raw/articles/github-repos/` teardowns.
- [[kb-system]] — Overview of the KB tooling, schema, and MCP surface.
- [[momo-research]] — Sub-index for `raw/articles/momo-research/` memory/context notes.
- [[official-docs]] — Sub-index for `raw/articles/official-docs/` framework and protocol docs.
- [[textbooks]] — Sub-index for official AI/ML textbook source notes used to ground the KB's ML foundations layer.
- [[voice-ai-sources]] — Sub-index for `raw/articles/voice-ai/` product and architecture notes.

## Source Collections

Counts as of `2026-05-18`. Folders under `raw/articles/`.

- `anthropic-engineering` (22)
- `arxiv` (30)
- `voice-ai` (33)
- `official-docs` (19)
- `textbooks` (16)
- `github-repos` (13)
- `enterprise-ai` (12)
- `momo-research` (11)
- `claude-blog` (8)
- `user-provided` (7)
- `browserbase-docs` (3)
- `langchain-blog` (2)
- `akitaonrails` (1)
- `cognition-blog` (1)
- `daniel-miessler` (1)
- `github-gists` (1)
- `hyperspell` (1)
- `manus-blog` (1)

## How To Use

- Start here when scanning the wiki by topic. Drill into linked pages for synthesis; follow source wiki links from there to raw notes.
- The chronological history of edits, ingests, and lint runs is in [[log]].
- Authoring rules and workflows live in `AGENTS.md` at repo root.
