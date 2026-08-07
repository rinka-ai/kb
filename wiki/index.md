---
id: wiki-index
type: index
title: Wiki Index
summary: Master human-readable catalog of all wiki pages and source collections. Updated on every ingest.
last_reviewed: 2026-08-07
---

# Wiki Index

This is the master catalog of the wiki. Every concept page, summary, and sub-index lives below with a one-line description. The LLM updates this file whenever wiki pages are created, renamed, or have their `summary` changed (see `AGENTS.md` → Agent Workflows).

For the chronological history of ingest, query, lint, and maintenance events, see [[log]].

## Concepts

- [[agent-frameworks]] — Agent frameworks package orchestration, runtime state, approval interrupts, tool surfaces, and durability into reusable system primitives instead of app-specific glue.
- [[agent-harnesses]] — Agent harnesses are the non-model execution layer that assembles context, runs tools, enforces policy, brokers credentials, persists artifacts, attributes failures, and turns agent loops into deployable AI systems.
- [[agent-memory]] — Agent memory covers how systems preserve, retrieve, consolidate, secure, and reuse information across time through explicit storage, load policy, write discipline, verification, integrity controls, belief-state modeling, and harness-owned context management.
- [[agent-protocols]] — Agent protocols define the typed interaction layer around tools, approvals, identity, authorization, inter-agent communication, threads, and runtime state so agent systems stay inspectable and portable.
- [[agent-security]] — Agent security is a systems problem spanning prompt injection, zero-trust identity, authorization, sandbox boundaries, secret placement, wallet custody, memory privacy, tool restriction, skill supply-chain trust, validation, fairness, and adversarial evaluation rather than a single prompting trick.
- [[agent-skills]] — Agent skills are reusable procedural capability modules that package task-specific guidance, examples, scripts, setup state, hooks, and verification habits while keeping invocation, evidence, and mutation boundaries explicit.
- [[agent-tools]] — Agent tools are structured action surfaces for non-deterministic systems, so they need clearer schemas, tighter ergonomics, credential boundaries, zero-trust authorization, and better orchestration boundaries than APIs built only for humans.
- [[agent-wallet-infrastructure]] — Agent wallet infrastructure gives autonomous agents policy-bounded authority to sign transactions, spend money, and use paid credentials without exposing raw keys to model-controlled runtimes.
- [[ai-validation-and-assurance]] — AI validation and assurance extends evals into system modeling, property specification, falsification, stochastic testing, robustness evidence, safety cases, and operational detection metrics.
- [[ai-agent-evals]] — AI agent evals measure full systems, including harnesses, tools, infrastructure, adversarial conditions, validation properties, failure attribution, and deployment constraints, rather than isolated model snapshots.
- [[ai-interface-design]] — AI-designed interfaces should optimize for job clarity, trust, inspectable and reversible control, distinctive human intent, collective diversity, and precise interaction constraints rather than visual novelty, generic defaults, or output volume alone.
- [[human-centered-ai-product-design]] — Human-centered AI product design connects a validated user need to an explicit autonomy policy, realistic mental models, meaningful control, graceful recovery, and lifecycle evaluation rather than treating the model or chat surface as the product.
- [[ai-assisted-creative-ideation]] — AI-assisted ideation should use models to elicit distinctive intent and expand the search space while measuring collective convergence, human ownership, quality, and accessibility—not merely idea volume or speed.
- [[ai-instruction-design]] — AI instruction design turns prompts into scoped, testable behavioral contracts whose evidence, lifecycle, uncertainty, tool boundaries, and regressions remain inspectable instead of trusting one successful completion.
- [[ai-saas-strategy]] — AI-era SaaS and agency strategy shifts advantage from mere software construction toward picking payable workflow pain, validating mechanisms against real data, pricing against value created, and building moats in implementation, data, compliance, and distribution.
- [[ai-agency-strategy]] — AI agency strategy should compound around one repeatable buyer, one measurable workflow system, validated delivery SOPs, and compliance-aware evidence rather than scattered automations or unverified hype.
- [[local-business-ai-acquisition-system]] — A local-business AI acquisition system sequences reactivation, reputation/referrals, speed-to-lead, sales coaching, and paid ads into one measurable workflow so new demand enters a less leaky funnel.
- [[database-reactivation]] — Database reactivation re-engages dormant leads or former customers through permission-aware conversations, booking paths, and outcome tracking before a local business increases paid acquisition spend.
- [[review-referral-automation]] — Review and referral automation turns real customer interactions into reputation, feedback, and referred leads, but it must avoid deceptive review gating, undisclosed incentives, and borrowed proof.
- [[speed-to-lead-and-missed-call-recovery]] — Speed-to-lead and missed-call recovery protect organic and paid demand by responding quickly, booking or rescheduling prospects, and handing edge cases to humans before lead value decays.
- [[sales-coaching-gpt]] — A sales-coaching GPT turns consultation recordings or transcripts into rubric-based feedback so local businesses can improve close rate with a standardized, auditable sales process.
- [[ai-agency-sales-process]] — The AI-agency sales process is a diagnostic call flow: quantify the buyer's funnel gap, build doubt in the current approach, map offer pillars to measured problems, temperature-check buy-in, and close with clear next steps.
- [[ai-agency-paid-ads-process]] — The AI-agency paid-ads process uses simple lead-generation campaign structure, sharp niche-specific creative, landing-page and booking follow-up, and CRM-backed measurement rather than treating cheap leads as proof.
- [[benchmark-integrity]] — Benchmark integrity is the discipline of ensuring that reported agent scores still mean what people think they mean despite contamination, infra variance, and evaluator drift.
- [[claude-code]] — Claude Code is best understood as an agentic coding operating environment with explicit surfaces for permissions, context management, tool orchestration, hooks, MCP tools, skills, delegated work, append-oriented session state, and reviewable collaboration artifacts.
- [[codebase-architecture]] — Codebase architecture is the durable organization of product scope, package boundaries, runtime state, provider adapters, tests, docs, and agent instructions so future changes inherit the right constraints.
- [[content-creation-strategy]] — Content creation strategy compounds when audience insight, first-hand expertise, platform-native formats, repurposing, paid distribution, and measurement produce reusable proof instead of isolated posts.
- [[computer-use]] — Computer-use agents extend web agents into full operating-system environments, where grounding, application knowledge, and multi-app coordination become first-class problems.
- [[context-engineering]] — Context engineering is the discipline of deciding what information enters active model context, in what form, and with what update policy, including which behavioral instructions deserve always-on placement.
- [[context-rot]] — Context rot is performance degradation caused by overly long, noisy, or repeatedly rewritten context that erodes semantic discrimination.
- [[copywriting]] — Copywriting for paid growth turns customer language, offer truth, objections, proof, and channel intent into concise, policy-safe messages that move the buyer to the next action.
- [[decision-making-under-uncertainty]] — Decision-making under uncertainty connects probability, utility, planning, belief states, and sequential consequences into one action-oriented framework.
- [[deep-learning]] — Deep learning is representation learning with neural networks, where architecture, losses, optimization, data, and scale jointly shape model behavior.
- [[distributional-reinforcement-learning]] — Distributional reinforcement learning models the full distribution of returns rather than only expected value, enabling richer theory and algorithms for uncertainty over outcomes.
- [[durable-execution]] — Durable execution makes long-running agent work survivable by treating pause, resume, replay, retry, and human intervention as first-class runtime behaviors.
- [[effective-go-for-production-servers]] — Effective Go becomes a production-server discipline when its core idioms are combined with modern Go semantics, explicit lifecycle and dependency bounds, repository-owned architecture, and verification at the layer each claim concerns.
- [[embeddings]] — Embeddings turn text into vector representations for similarity search and clustering, but in this KB they matter mainly as one retriever component inside a broader retrieval pipeline.
- [[enterprise-agent-deployment-failure-modes]] — Enterprise AI value usually fails when models are poured onto messy workflows without real workflow discovery, deterministic orchestration, shared governance, model operations, feedback loops, and business metrics that justify adoption.
- [[fairness-and-ml]] — Fairness and ML is a socio-technical discipline about measurement, legitimacy, classification criteria, causality, recourse, feedback loops, and institutional context.
- [[learning-theory]] — Learning theory explains when empirical learning should generalize, using sample complexity, hypothesis-class capacity, risk decomposition, and regularization rather than training loss alone.
- [[llm-agents]] — LLM agents are systems where models act over time with tools, memory, and structured runtime control rather than producing a single standalone response.
- [[managed-agents]] — Managed agents decouple model reasoning from durable runtime interfaces for sessions, runs, approvals, tools, credentials, entrypoints, and state.
- [[ml-systems-engineering]] — ML systems engineering treats AI as a deployed lifecycle across data, training, evaluation, serving, monitoring, scaling, governance, and compute economics.
- [[multi-agent-failure-attribution]] — Multi-agent failure attribution identifies where, how, and why errors emerge and propagate across agent roles, steps, tools, and coordination structures so diagnoses can support repair.
- [[multi-agent-reinforcement-learning]] — Multi-agent reinforcement learning studies learning agents in shared environments where strategic interaction, nonstationarity, coordination, communication, and partial observability matter.
- [[multi-agent-systems]] — Multi-agent systems include both LLM orchestration patterns and formal multi-agent learning settings; reliable designs need bounded roles, human-review backpressure, and attribution paths for diagnosing coordination failures.
- [[obsidian]] — Obsidian is the human-facing interface for navigating the repo's markdown corpus, wiki links, and mixed raw-versus-derived knowledge artifacts.
- [[onchain-market-manipulation]] — Onchain manipulation in low-liquidity token markets runs as a sequence — cheap artificial growth first, profit extraction second — and measuring it demands contamination-adjusted causal design because the manipulators' own transactions sit inside the outcome variable.
- [[optimization-for-ml]] — Optimization for ML is the search layer that turns objectives into trained models, tuned systems, falsifying examples, and efficient deployment choices.
- [[payment-integrations]] — Payment and value-transfer integrations should keep sensitive collection, credentials, and signing authority inside managed or policy-enforced surfaces while completing business logic from verified events.
- [[paid-growth]] — Paid growth is now an operating system of offer clarity, creative supply, first-party data, platform automation, compliance, and incrementality discipline rather than only media buying.
- [[personal-knowledge-bases]] — Personal knowledge bases turn one-off research into durable, cumulative assets by preserving raw material, synthesis, and reusable outputs together.
- [[performance-creative]] — Performance creative turns customer insight into policy-safe ad concepts, modular assets, tests, fatigue diagnosis, and refreshed winners across paid channels.
- [[probabilistic-machine-learning]] — Probabilistic machine learning treats uncertainty, latent structure, missing information, and prediction as first-class modeling problems.
- [[proprietary-automated-market-makers]] — Proprietary AMMs are automated principal dealers combining private fair-value and inventory models with compact onchain state, deterministic settlement, and aggregator distribution.
- [[rag]] — RAG is a full retrieval pipeline that assembles external evidence at query time rather than a synonym for vector search alone.
- [[reasoning]] — Reasoning in agent loops is the deliberation layer that decides what to do next, when to gather more evidence, and when a tool result changes the plan.
- [[reinforcement-learning]] — Reinforcement learning studies agents that learn policies through interaction, delayed reward, value estimation, exploration, and sequential decision-making.
- [[repo-local-knowledge-bases]] — Repo-local knowledge bases are committed project-memory layers that help coding agents and humans reuse product, codebase, design, decision, progress, verification, and handoff knowledge without rereading the whole source tree.
- [[research-workflows]] — Research workflows in this KB are compounding loops of ingest, retrieval, synthesis, and maintenance rather than one-shot question answering.
- [[resolvers]] — Resolvers are lightweight routing layers that decide which context, skill, or filing rule an agent should load for a given task.
- [[rust-async-cancellation-and-select]] — Rust async cancellation is an ownership protocol built on dropping futures, so reliable select loops must make partial progress, child-task lifetime, pinned operation identity, fairness, and teardown observable and explicit.
- [[rust-destructors-drop-scopes-and-resource-lifecycle]] — Rust destruction is deterministic local ownership cleanup with specified scope and ordering rules, but sound APIs must tolerate leaked values, aborting termination, and externally incomplete teardown.
- [[rust-lifetime-subtyping-and-variance]] — Rust lifetime subtyping is narrow but API-shaping: outlives relations and higher-ranked bounds flow through generic types according to representation-derived covariance, contravariance, or invariance.
- [[rust-pinning-and-address-sensitive-types]] — Rust pinning is a library-enforced lifecycle contract that lets unsafe implementations rely on an address-sensitive pointee remaining valid in place through destruction while safe APIs prevent moves and invalidation.
- [[rust-send-sync-and-thread-safety]] — Rust thread-safety boundaries arise from what ownership and shared-reference capabilities a type exposes, with Send and Sync auto traits turning representation, generic bounds, hidden aliases, and destructor context into auditable soundness contracts.
- [[rust-trait-coherence-and-implementation-ownership]] — Rust trait coherence assigns implementation authority across the crate graph, using overlap and orphan checks to preserve one selectable meaning while making blanket impls and extension points semver-sensitive API decisions.
- [[rust-unsafe-validity-and-undefined-behavior]] — Rust unsafe code is sound only when its hidden representation, aliasing, validity, lifetime, ABI, and destruction invariants make undefined behavior unreachable through every safe client and foreign boundary.
- [[speech-to-text]] — Speech-to-text quality is shaped as much by capture conditions, output structure, and diarization choices as by the base transcription model.
- [[synthetic-voices]] — Synthetic voices create powerful accessibility and product opportunities, but they also demand consent, disclosure, provenance, and strong anti-impersonation controls.
- [[text-to-speech]] — Text-to-speech is an output design problem as much as an API call, balancing latency, style control, markup, and disclosure requirements.
- [[token-launchpad-microstructure]] — Bonding-curve launchpads convert token creation into a sub-1% lottery whose outcome is best predicted by accumulation velocity, and whose migration step creates a depth discontinuity that makes pre-graduation dumping structurally rational.
- [[typescript-conditional-types]] — TypeScript conditional types encode generic input-output relations through structural tests, inference, and deliberate union distribution, but public helpers must stay explainable, declaration-safe, measured, and aligned with runtime behavior.
- [[typescript-generic-api-design]] — TypeScript generics are safest when each parameter preserves a real caller-visible relation, inference does most of the work, constraints expose minimal capabilities, and packed-consumer tests verify declarations, variance, runtime alignment, and checker cost.
- [[typescript-mapped-types]] — TypeScript mapped types derive property-wise API projections from owned key vocabularies, but modifiers, remapping, filtering, declaration cost, and runtime realization must remain explicit.
- [[typescript-template-literal-types]] — TypeScript template literal types derive bounded string protocols from owned vocabularies, but union multiplication, runtime erasure, locale behavior, declarations, and extension ownership must remain explicit.
- [[typescript-module-systems]] — TypeScript module correctness comes from making compiler resolution, runtime loading, package export maps, declaration files, and workspace topology describe the same public module graph.
- [[typescript-control-flow-narrowing]] — TypeScript narrowing is safest when runtime evidence admits values into domain-owned discriminated unions and exhaustive control flow preserves state-payload correlations without assertions.
- [[typescript-structural-compatibility]] — TypeScript structural compatibility enables low-coupling JavaScript-style composition, but API safety depends on variance-aware callbacks, truthful declarations, strict settings, runtime admission, and executable assignability tests.
- [[voice-ai]] — Voice AI is a full interaction stack spanning speech I/O, runtime control, tools, personalization, telephony, and trust controls.
- [[voice-dictation]] — Voice dictation systems optimize for fast cursor-level text entry and editing, which makes them a distinct product shape from conversational voice agents.
- [[web-agents]] — Web agents are agents that operate over browser environments, where the browser can be both the primary task world and a fallback integration layer for systems without clean APIs.
- [[workflows]] — Agent workflows wrap model calls in explicit orchestration so sequencing, approvals, side effects, and human review capacity stay inspectable instead of being improvised inside one autonomous loop.
- [[algorithmic-fairness-criteria]] — Algorithmic fairness criteria formalize non-discrimination goals such as independence, separation, and sufficiency, but these criteria can conflict and do not settle legitimacy by themselves.
- [[bandits-and-exploration]] — Bandits isolate the exploration-exploitation tradeoff by forcing agents to choose between actions with uncertain payoffs before full state dynamics enter the problem.
- [[causal-fairness-and-feedback-loops]] — Causal fairness and feedback loops focus on how model decisions intervene in the world, reshape future data, and affect agency, recourse, and institutional legitimacy.
- [[falsification-and-robustness-testing]] — Falsification and robustness testing search for counterexamples, disturbances, and failure modes instead of only estimating average benchmark performance.
- [[generalization-and-model-selection]] — Generalization and model selection explain how to choose models that perform beyond the training set by managing capacity, validation evidence, and regularization.
- [[generative-modeling]] — Generative modeling learns data distributions or simulators, connecting latent-variable models, autoregressive models, VAEs, GANs, flows, and diffusion models.
- [[google-ads]] — Google Ads increasingly runs on modular assets, AI assembly, search intent, Performance Max breadth, video creative principles, policy-safe landing pages, and conversion lift rather than static keyword-and-ad setups alone.
- [[internal-engineering-conventions]] — Internal engineering conventions turn tacit team practice into reusable constraints for agents and humans, especially around scope, imports, validation, naming, tests, side effects, UI discipline, knowledge updates, and skillized gotchas.
- [[markov-decision-processes]] — Markov decision processes model sequential decisions with states, actions, transitions, rewards, policies, value functions, and Bellman equations.
- [[marketing-measurement]] — Marketing measurement separates optimization, attribution, funnel quality, and causal incrementality so paid growth decisions are not overfit to platform dashboards.
- [[meta-ads]] — Meta Ads performance now depends on simplified structures, automation, diversified creative, creator/UGC supply, first-party conversion signals, policy-safe claims, and validation beyond dashboard ROAS.
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
- [[ugc-ads]] — UGC ads are paid creative assets that borrow the credibility and native grammar of customer or creator content, but they require clear briefs, usage rights, truthful claims, disclosure, and performance testing.
- [[variational-inference]] — Variational inference turns difficult probabilistic inference into optimization by fitting a tractable approximation to an intractable posterior.

## Summaries

- [[2026-08-07-onchain-launch-manipulation-and-measurement]] — Three 2025–2026 papers on pump.fun and cross-chain meme coins converge on one operational conclusion: onchain activity is cheap to fabricate, manipulation runs as a sequence rather than an event, and naive effect estimates over-state coordination by roughly an order of magnitude unless the manipulators' own transactions are excluded from the outcome.
- [[2026-08-02-explicit-state-and-enforced-boundaries-weekly]] — This week's strongest agent-systems evidence converges on one rule: make useful state explicit and inspectable, while enforcing authority, scope, and isolation outside the model's beliefs.
- [[2026-08-01-proprietary-amm-expert-handbook]] — An evidence-ranked expert handbook on proprietary AMMs: dealer theory, CFMM mathematics, LVR, Solana architecture and venues, routing, MEV, execution measurement, security, and due diligence.
- [[2026-08-01-effective-go-applied-to-zappx-server]] — A complete 60-section Effective Go audit of the Zappx backend finds strong modern player-auth code, but material lifecycle, worker-ownership, legacy error-boundary, wallet-durability, documentation, and capacity-evidence gaps remain.
- [[2026-07-31-kery-beyond-hermes-evidence-locked-financial-agent]] — Kery can exceed Hermes in a high-assurance financial domain by preserving deterministic authority isolation while adding iterative evidence tools, durable runs, provenance-preserving context, progressive disclosure, and finance-specific evaluation.
- [[2026-07-30-harness-context-continuity-and-trust-boundaries]] — Retained reasoning and compaction can sharply improve agent performance, but state continuity must preserve authority and provenance or it can also preserve and propagate attacker influence.
- [[2026-06-20-loop-engineer-template-ingest-assessment]] — JayZeeDesign/loop-engineer-template is worth a selective repo-level ingest for its compact loop-memory schema and Claude Code harness skills, but not worth copying wholesale because the KB already covers stronger harness-engineering and Claude Code skill sources.
- [[2026-06-12-vertical-agent-context-cache-hierarchy]] — Peter Wang's vertical-agent article is best preserved as a design rule: encode the domain task distribution into L1 always-resident wrappers, L2 fetched specs/tool schemas, and L3 raw-reference escape hatches so the model stays accurate without bloated context.
- [[2026-06-04-claude-code-dynamic-workflows-operating-patterns]] — A user-provided Dynamic Workflows digest is best preserved as an operating-pattern map: use model-written workflow harnesses for parallel, long-running, adversarial, or structured tasks; control cost with goals and budgets; quarantine untrusted input; save proven workflows as skills.
- [[2026-06-04-learn-harness-engineering-kb-upgrades]] — walkinglabs/learn-harness-engineering turns harness engineering into a practical curriculum: five subsystems, repo-as-system-of-record, feature-list state, executable verification, observability, clean handoff, and a portable harness-creator skill.
- [[2026-06-04-ai-native-content-machine]] — Alex Lieberman's content-machine digest is best preserved as an AI-native creator workflow: human first/final mile, skillized middle steps, raw source preservation, critique routing, platform-native repurposing, and a learning loop that turns final edits into creator memory.
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
- [[2026-05-20-hermes-agent-runtime-patterns-from-source-teardown]] — Hermes Agent shows a personal-agent runtime pattern where one core agent loop is reused across CLI, messaging, ACP, cron, API, batch, memory, skills, browser/computer-use, and trajectory surfaces.
- [[2026-05-20-memwal-encrypted-agent-memory-source-teardown]] — MemWal adds a user-owned encrypted memory pattern: durable Walrus blobs, rebuildable vector indexes, Sui delegate-key access, SDK/MCP/harness integrations, and explicit relayer trust trade-offs.
- [[2026-05-21-ai-saas-million-arr-lessons]] — The Clairvo case-study transcript is most useful as a playbook for AI-era SaaS discovery: pick a costly measurable workflow problem, use agents for mechanism search and simulation, validate in live deployments, and capture value through high-touch operational moats.
- [[2026-05-25-uniswap-interface-ui-ux-source-teardown]] — Uniswap/interface shows how a production UI/UX codebase compounds quality through shared design primitives, cross-platform product flows, typed transaction state, telemetry, feature gates, localization, and layered testing.
- [[2026-05-27-ai-aristotle-agency-build-plan]] — The Middleton video should become a validation-backed agency build plan: sell one sequenced local-business acquisition system, verify compliance and niche economics, and use the KB as the operating memory for scripts, SOPs, ads, metrics, and case studies.
- [[2026-05-27-ai-agency-meta-ad-checklist]] — Tactical checklist for AI-agency Meta ads: niche call-out before the cutoff, legible AI mechanism, appointment/result framing, high-contrast creative, and substantiated proof claims.
- [[2026-05-30-website-agency-operator-playbook]] — The Pavlo website-agency interview is useful as an operator playbook for a contractor-focused, low-ticket agency: use cold outbound to build sales skill, sell a cheap website/reputation/follow-up wedge, add upsells after trust, systematize sales and CSM delivery, and only then use AI to compress fulfillment labor.
- [[2026-05-27-aya-conformis-internal-codebase-patterns]] — Aya and Conformis show how internal repos can become reusable architecture sources when they encode product scope, package boundaries, runtime state, design rules, verification habits, and project memory as inspectable code and markdown.
- [[2026-05-30-app-template-design-system-blueprint]] — Retrieve-before-you-build blueprint for starting a new web app or feature: default Next 16 / React 19 / React Query stack, token-first design contract, minimum component set, data-routing and interaction-state rules, accessibility/motion/density baselines, component/theme source selection, anti-patterns, agent-prompting guidance, and an authoritative resources inventory, distilled from Aya and Conformis.
- [[2026-05-30-component-theme-source-library]] — Retrieve-before-you-build source map for improving AI-built apps with Refero style references, shadcn/ui, Radix, Tailwind Plus/Catalyst, and mature public design systems without copying brands or mixing incompatible UI vocabularies.
- [[2026-05-30-backend-stack-patterns-blueprint]] — Retrieve-before-you-build backend blueprint for starting API apps, workers, provider integrations, webhook ingress, durable mutations, and storage/auth surfaces: default Bun/Hono/TypeScript stack, Postgres/Drizzle persistence, Redis coordination, provider adapters, outbox/idempotency decision rules, validation/security baselines, tests, and authoritative resources.
- [[2026-05-31-aya-conformis-latest-commit-lessons]] — Latest Aya and Conformis commits show how small product/UI fixes and larger infrastructure migrations become reusable rules: intent-scoped prefetch, no raw IDs in operator UI, normalized product facts, narrow proxy matchers, tested i18n wiring, and executable React quality gates.
- [[2026-05-31-ai-custom-instruction-profile]] — Reusable distilled custom-instruction profile that preserves anti-sycophancy, independent estimation, uncertainty, and verification while removing persona inflation and verbosity defaults.
- [[2026-05-31-zero-trust-ai-agents-kb-upgrades]] — Anthropic's Zero Trust for AI Agents ebook upgrades the KB's agent-security model around cryptographic identity, least agency, MCP/tool authorization, memory integrity, sandboxing, and AI-speed defensive operations.
- [[2026-06-02-graphed-ai-agents-aristotle-pavlo-comparison]] — Graphed matches the AI Aristotle pattern at the systems-architecture level: integrated agents, shared data infrastructure, dashboards, and high-touch deployment, but it is closer to a marketing-ops agent platform than the local-business Aristotle or Pavlo agency methods.
- [[2026-06-02-ai-search-optimization-build-read]] — AI search optimization is worth building around as an execution and source-influence system, but a pure dashboard, schema helper, or generic blog generator is likely weakly differentiated.
- [[2026-06-02-anthropic-financial-services-ingest-assessment]] — Anthropic's financial-services repo is worth a targeted KB ingest because it is an official reference corpus for finance-domain Claude skills, managed-agent cookbooks, least-privilege subagent patterns, MCP data connectors, and enterprise Office deployment.
- [[2026-06-03-agentic-engineering-practitioner-stack]] — Van Horn's agentic-engineering field report is useful as an operator-stack snapshot: plan-first artifacts, research-before-planning, parallel agent sessions, voice/raw-context capture, notes as agent memory, reusable skills, agent-native CLIs, and human taste as the bottleneck.
- [[2026-06-03-claude-use-cases-workflow-map]] — Anthropic's Claude use-case digest is best preserved as a workflow-packaging map: task boundaries, required context, product surface, output artifact, follow-up action, and operational cautions across 94 jobs-to-be-done.
- [[2026-06-03-matt-pocock-skills-ingest-assessment]] — Matt Pocock's skills repo is worth a targeted repo-level ingest for agentic engineering workflow design, and the approved ingest preserved it as one GitHub-repo source note rather than copying every skill wholesale.
- [[2026-05-27-kb-health-search-methodology-audit]] — Audit of the KB's local health, remote MCP observability, search methodology, telemetry, and eval coverage after the May 2026 paid-growth and internal-codebase expansions.
- [[2026-05-27-meta-google-ads-creative-content-kb-expansion]] — Deep online research pass turning Meta, Google, UGC, copywriting, content, compliance, and measurement sources into a reusable paid-growth operating model for the KB.

## Sub-Indexes

These per-collection sub-index pages in `wiki/index/` enumerate notes within a single source collection.

- [[home]] — Landing page and navigation hub. (Master catalog is this file.)
- [[addy-osmani]] — Sub-index for Addy Osmani source notes on AI-assisted software engineering, agent orchestration, and engineering productivity.
- [[anthropic-engineering]] — Sub-index for `raw/articles/anthropic-engineering/` notes.
- [[arxiv]] — Sub-index for `raw/articles/arxiv/` papers.
- [[business-strategy]] — Sub-index for `raw/articles/business-strategy/` sources on AI SaaS, GTM, pricing, workflow value, and commercial moats.
- [[claude-blog]] — Sub-index for `raw/articles/claude-blog/` posts.
- [[design-systems]] — Sub-index for `raw/articles/design-systems/` notes covering component libraries, themes, UI references, and design-system calibration sources.
- [[github-repos]] — Sub-index for `raw/articles/github-repos/` teardowns.
- [[hci-research]] — Sub-index for peer-reviewed and institutionally reviewed human-computer interaction research.
- [[internal-codebases]] — Sub-index for local internal repository teardowns used to preserve reusable architecture, convention, structure, dependency, and project-memory patterns.
- [[kb-system]] — Overview of the KB tooling, schema, and MCP surface.
- [[momo-research]] — Sub-index for `raw/articles/momo-research/` memory/context notes.
- [[official-docs]] — Sub-index for `raw/articles/official-docs/` language, runtime, framework, protocol, platform, and compliance documentation.
- [[openai]] — Sub-index for primary OpenAI research and engineering publications.
- [[paid-growth-sources]] — Sub-index for `raw/articles/paid-growth/` source notes covering paid acquisition, Meta Ads, Google Ads, UGC, copywriting, content strategy, policy, and measurement.
- [[security-research]] — Sub-index for technical AI-security research, vulnerability analysis, and coordinated disclosures.
- [[textbooks]] — Sub-index for official AI/ML textbook source notes used to ground the KB's ML foundations layer.
- [[user-provided]] — Sub-index for user-provided source notes, screenshots, pasted prompts, transcripts, and local captures.
- [[voice-ai-sources]] — Sub-index for `raw/articles/voice-ai/` product and architecture notes.

## Source Collections

Counts as of `2026-08-07`. Folders under `raw/articles/`.

- `addy-osmani` (1)
- `anthropic-engineering` (23)
- `arxiv` (32)
- `voice-ai` (33)
- `official-docs` (35)
- `openai` (1)
- `textbooks` (16)
- `github-repos` (20)
- `hci-research` (7)
- `internal-codebases` (6)
- `design-systems` (3)
- `enterprise-ai` (12)
- `momo-research` (11)
- `claude-blog` (10)
- `user-provided` (14)
- `business-strategy` (4)
- `paid-growth` (26)
- `security-research` (1)
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
