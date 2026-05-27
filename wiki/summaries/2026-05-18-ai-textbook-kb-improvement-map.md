---
id: summary-2026-05-18-ai-textbook-kb-improvement-map
type: summary
title: AI Textbook KB Improvement Map
tags: [knowledge-base, machine-learning, ai-textbooks, reinforcement-learning, ml-systems, fairness, probabilistic-modeling]
summary: Full-corpus audit of the official AI/ML textbook cache, identifying the KB's biggest gaps in ML foundations, probability, optimization, RL, fairness, validation, and ML systems engineering.
source_count: 16
canonical_for: [ai-textbook-kb-improvement-map, ml-foundations-kb-gaps, ai-textbook-ingest-roadmap]
review_status: reviewed
last_reviewed: 2026-05-18
review_due: 2026-08-18
confidence: "0.82"
---

# AI Textbook KB Improvement Map

## Summary

The downloaded textbook corpus should improve this KB by adding the missing substrate underneath its existing agent-systems work. The wiki is already strong on [[llm-agents]], [[agent-harnesses]], [[context-engineering]], [[agent-memory]], [[rag]], [[ai-agent-evals]], and [[voice-ai]]. It is thin on the older but still essential disciplines that explain why ML systems behave the way they do: learning theory, optimization, probabilistic modeling, deep learning, reinforcement learning, decision-making under uncertainty, fairness, validation, and large-scale ML systems engineering.

The best move is not to ingest all twelve textbooks as giant source notes. Instead, keep the official PDFs/HTML mirrors as a local corpus, create compact source/TOC notes only where useful, and use the books to seed a new "ML foundations for agents" layer of concept pages.

## Corpus Read

Full text was extracted from every downloaded official source into `/Users/josemanuelcerqueira/Desktop/mit-ai-books/_extracted_text/`. The extraction manifest and topic map are local artifacts, not copied into the wiki:

- `MANIFEST.md` records every PDF/HTML mirror and word count.
- `CORPUS_TOPIC_MAP.md` records per-book chapter signals and corpus-vs-wiki topic coverage.

The processed corpus covers roughly 4.2 million words across the twelve requested book entries and 16 downloaded source artifacts. Machine Learning Systems contributes two volumes, and the Kochenderfer textbook hub contributes additional official free PDFs beyond the already-covered Algorithms for Decision Making.

## Coverage Gap

The current wiki signal check is stark:

| Topic | Current wiki signal | Textbook corpus signal | KB read |
| --- | ---: | ---: | --- |
| Learning theory/generalization | 0 | 1,619 | missing |
| Optimization | 2 | 6,842 | missing |
| Deep learning architectures | 3 | 5,364 | missing |
| Probabilistic modeling | 0 | 6,179 | missing |
| Reinforcement learning | 6 | 4,941 | missing |
| Decision-making under uncertainty | 8 | 4,036 | missing |
| Multi-agent systems/game theory | 41 | 1,822 | partially covered, but mostly LLM-agent flavored |
| Distributional RL | 0 | 584 | absent |
| Fairness/causality/privacy | 18 | 4,564 | thin |
| ML systems/deployment | 170 | 25,127 | adjacent coverage, needs ML-specific grounding |
| Evaluation/validation | 173 | 5,541 | adjacent coverage, needs assurance/falsification grounding |
| Retrieval/search | 241 | 3,739 | covered, but could be strengthened with classical retrieval and nearest-neighbor framing |

This means the books are most valuable as a foundation layer, not as another agent-framework collection.

## Concept Pages To Add

Create these concept pages first:

- `learning-theory` — PAC learning, sample complexity, VC dimension, Rademacher complexity, model selection, empirical risk, regularization, and generalization.
- `optimization-for-ml` — gradients, automatic differentiation, local/global search, stochastic gradient methods, constrained optimization, Bayesian optimization, and why optimization is different in ML than in ordinary software.
- `probabilistic-machine-learning` — uncertainty, Bayesian inference, graphical models, latent variables, Monte Carlo, variational inference, Gaussian processes, and probabilistic prediction.
- `deep-learning` — neural networks, loss functions, backpropagation, regularization, convolutional/recurrent/attention architectures, generative models, and training pathologies.
- `reinforcement-learning` — MDPs, value functions, Bellman equations, bandits, dynamic programming, TD learning, policy gradients, actor-critic methods, exploration, and function approximation.
- `decision-making-under-uncertainty` — decision theory, Bayesian networks, planning, POMDPs, belief states, utility, online planning, and model uncertainty.
- `ml-systems-engineering` — data/training/serving/inference pipelines, compute economics, latency, throughput, monitoring, scaling laws, deployment lifecycle, and operational reliability.
- `ai-validation-and-assurance` — system modeling, property specification, falsification, robustness, stochastic testing, temporal logic, reachability, and safety cases.
- `fairness-and-ml` — measurement, legitimacy, classification criteria, demographic parity, separation/equalized odds, causality, feedback loops, recourse, and limits of technical fairness.
- `multi-agent-reinforcement-learning` — games, stochastic games, partial observability, centralized training/decentralized execution, coordination, communication, equilibrium concepts, and learning dynamics.
- `distributional-reinforcement-learning` — return distributions, distributional Bellman equations, categorical/quantile TD methods, distributional dynamic programming, control, function approximation, and deep distributional RL.

## Existing Pages To Upgrade

Several existing pages should absorb narrow lessons from the textbooks:

- [[multi-agent-systems]] should distinguish LLM multi-agent orchestration from game-theoretic and MARL multi-agent systems. The current page is useful, but it risks treating "multi-agent" as only a prompt-orchestration pattern.
- [[ai-agent-evals]] should import the validation/falsification framing from Algorithms for Validation: evaluation is not only benchmark scoring, but also property specification, adversarial search over failures, stochastic system modeling, and safety evidence.
- [[agent-harnesses]] and [[durable-execution]] should connect to ML systems engineering: deployed AI systems fail through data drift, infrastructure constraints, latency, monitoring gaps, and lifecycle mismatch, not only tool-loop bugs.
- [[agent-memory]] should separate file-backed memory from RL-style learned memory, Bayesian belief state, state estimation, and POMDP framing. This would make memory concepts less LLM-specific.
- [[rag]] and [[embeddings]] should pick up more classical grounding: nearest-neighbor search, ranking, retrieval evaluation, representation quality, and the limits of embeddings as learned geometry.
- [[agent-security]] should cross-link to fairness, validation, and deployment governance so safety is not reduced to prompt injection and sandbox boundaries.
- [[research-workflows]] should include textbook-backed acquisition discipline: broad source corpora should produce concept maps and targeted pages, not giant undigested summaries.

## Ingest Strategy

The safest ingest strategy is staged:

1. Preserve the official downloads and extracted text as local artifacts outside `raw/`; do not paste full book text into markdown.
2. Add compact source/TOC notes only when a book becomes an active citation target for concept pages.
3. Create the new concept pages above from cross-book synthesis, with short provenance notes pointing to the official local book folder and source URL.
4. Update existing agent concept pages with only the parts that improve agent work directly.
5. Run a second pass where individual chapters become summaries only if they answer recurring questions.

The first wave now exists as wiki concept pages: [[ml-systems-engineering]], [[reinforcement-learning]], [[probabilistic-machine-learning]], [[fairness-and-ml]], [[optimization-for-ml]], [[learning-theory]], [[ai-validation-and-assurance]], [[deep-learning]], [[decision-making-under-uncertainty]], [[multi-agent-reinforcement-learning]], and [[distributional-reinforcement-learning]]. The next pass should deepen individual chapters only when they answer recurring questions.

## Source Corpus

- Foundations of Machine Learning — `/Users/josemanuelcerqueira/Desktop/mit-ai-books/01_foundations_of_ml/foundations_of_machine_learning.pdf`
- Understanding Deep Learning — `/Users/josemanuelcerqueira/Desktop/mit-ai-books/02_understanding_deep_learning/understanding_deep_learning.pdf`
- Machine Learning Systems Vol. 1 and Vol. 2 — `/Users/josemanuelcerqueira/Desktop/mit-ai-books/03_machine_learning_systems/`
- Algorithms for Decision Making — `/Users/josemanuelcerqueira/Desktop/mit-ai-books/04_algorithms_for_decision_making/algorithms_for_decision_making.pdf`
- Deep Learning — `/Users/josemanuelcerqueira/Desktop/mit-ai-books/05_deep_learning_goodfellow/`
- Reinforcement Learning: An Introduction — `/Users/josemanuelcerqueira/Desktop/mit-ai-books/06_rl_sutton_barto/reinforcement_learning_an_introduction.pdf`
- Distributional Reinforcement Learning — `/Users/josemanuelcerqueira/Desktop/mit-ai-books/07_distributional_rl/`
- Multi-Agent Reinforcement Learning — `/Users/josemanuelcerqueira/Desktop/mit-ai-books/08_multi_agent_rl/multi_agent_reinforcement_learning.pdf`
- Kochenderfer textbooks hub downloads — `/Users/josemanuelcerqueira/Desktop/mit-ai-books/09_kochenderfer_textbooks/`
- Fairness and Machine Learning — `/Users/josemanuelcerqueira/Desktop/mit-ai-books/10_fairness_and_ml/fairness_and_machine_learning.pdf`
- Probabilistic Machine Learning Vol. 1 — `/Users/josemanuelcerqueira/Desktop/mit-ai-books/11_probabilistic_ml_vol1/probabilistic_machine_learning_vol1.pdf`
- Probabilistic Machine Learning Vol. 2 — `/Users/josemanuelcerqueira/Desktop/mit-ai-books/12_probabilistic_ml_vol2/probabilistic_machine_learning_vol2.pdf`

## Related

- [[agent-harnesses]]
- [[agent-memory]]
- [[ai-agent-evals]]
- [[embeddings]]
- [[llm-agents]]
- [[multi-agent-systems]]
- [[rag]]
- [[research-workflows]]
