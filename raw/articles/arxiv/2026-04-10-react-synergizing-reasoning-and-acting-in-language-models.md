---
id: article-2026-04-10-react-synergizing-reasoning-and-acting-in-language-models
type: source
title: "ReAct: Synergizing Reasoning and Acting in Language Models"
path: raw/articles/arxiv/2026-04-10-react-synergizing-reasoning-and-acting-in-language-models.md
author: "Shunyu Yao, Jeffrey Zhao, Dian Yu, Nan Du, Izhak Shafran, Karthik Narasimhan, Yuan Cao"
publisher: arXiv.org
url: https://arxiv.org/abs/2210.03629
date_published: 2022-10-06
date_added: 2026-04-10
tags: [agents, tool-use, reasoning, planning]
status: processed
quality: high
summary: ReAct proposes interleaving reasoning traces with external actions so agents can update plans, gather information, and recover from errors more effectively than reasoning-only or acting-only approaches.
related: [agents, tool-use, reasoning, planning]
---

# ReAct: Synergizing Reasoning and Acting in Language Models

## Source Metadata

- Path: raw/articles/arxiv/2026-04-10-react-synergizing-reasoning-and-acting-in-language-models.md
- Author: Shunyu Yao, Jeffrey Zhao, Dian Yu, Nan Du, Izhak Shafran, Karthik Narasimhan, Yuan Cao
- Published: 2022-10-06
- Publisher: arXiv.org
- URL: https://arxiv.org/abs/2210.03629

## TL;DR

ReAct is a prompt-level agent loop that alternates sparse reasoning with concrete actions, letting the model decompose goals, gather fresh evidence, and recover from mistakes without requiring a new model architecture.

## Key Claims

- Reasoning traces and actions are complementary: reasoning helps track and revise plans, while actions bring in fresh external information.
- ReAct reduces hallucination and error propagation on knowledge tasks by letting the model retrieve evidence instead of only reasoning from static context.
- Sparse reasoning is enough to add value: the paper uses thoughts mainly to decompose goals, track subgoals, and decide what to query next.
- ReAct is not always the single best prompting strategy on every knowledge task, but it consistently beats action-only prompting and combines especially well with CoT-style self-consistency.
- On ALFWorld and WebShop, ReAct outperforms imitation and reinforcement-learning baselines even with very few in-context examples.

## Important Details

- The paper evaluates ReAct on HotpotQA, FEVER, ALFWorld, and WebShop.
- For knowledge tasks, the authors use manually written ReAct trajectories with 6 HotpotQA exemplars and 3 FEVER exemplars plus a simple Wikipedia API.
- ReAct slightly trails pure CoT on HotpotQA but beats it on FEVER; hybrid ReAct/CoT-SC variants are the best overall prompting setup on the reasoning tasks.
- On ALFWorld, the best ReAct trial reaches 71% success versus 45% for the best Act trial and 37% for BUTLER.
- On WebShop, one-shot Act already matches earlier IL and IL+RL baselines, while adding sparse reasoning gives another 10-point absolute gain.
- The paper positions ReAct as a prompt-level method rather than a new model architecture.
- The arXiv entry notes a linked project site with code.

## Entities

- Authors: Shunyu Yao, Jeffrey Zhao, Dian Yu, Nan Du, Izhak Shafran, Karthik Narasimhan, Yuan Cao
- Benchmarks: HotpotQA, FEVER, ALFWorld, WebShop
- Concepts: reasoning traces, acting, chain-of-thought, interactive decision making, interpretability

## My Notes

- This is a foundational paper for agent loops that alternate between thinking and doing.
- Its more durable lesson is not “always think more” but “think exactly where the next action needs guidance.”
- Modern structured tool-calling agents still inherit this pattern even when the reasoning trace is hidden behind system scaffolding.

## Open Questions

- Which current concept pages should distinguish ReAct-style interleaving from more workflow-shaped orchestration?
- Where do modern tool loops still look like ReAct even when implemented with structured tool calling?

## Related

- [[llm-agents]]
- [[agent-tools]]
- [[reasoning]]

## Source Text

View PDF
            Abstract:While large language models (LLMs) have demonstrated impressive capabilities across tasks in language understanding and interactive decision making, their abilities for reasoning (e.g. chain-of-thought prompting) and acting (e.g. action plan generation) have primarily been studied as separate topics. In this paper, we explore the use of LLMs to generate both reasoning traces and task-specific actions in an interleaved manner, allowing for greater synergy between the two: reasoning traces help the model induce, track, and update action plans as well as handle exceptions, while actions allow it to interface with external sources, such as knowledge bases or environments, to gather additional information. We apply our approach, named ReAct, to a diverse set of language and decision making tasks and demonstrate its effectiveness over state-of-the-art baselines, as well as improved human interpretability and trustworthiness over methods without reasoning or acting components. Concretely, on question answering (HotpotQA) and fact verification (Fever), ReAct overcomes issues of hallucination and error propagation prevalent in chain-of-thought reasoning by interacting with a simple Wikipedia API, and generates human-like task-solving trajectories that are more interpretable than baselines without reasoning traces. On two interactive decision making benchmarks (ALFWorld and WebShop), ReAct outperforms imitation and reinforcement learning methods by an absolute success rate of 34% and 10% respectively, while being prompted with only one or two in-context examples. Project site with code: this https URL

Comments:
          v3 is the ICLR camera ready version with some typos fixed. Project site with code: this https URL

Computation and Language (cs.CL); Artificial Intelligence (cs.AI); Machine Learning (cs.LG)

Cite as:
          arXiv:2210.03629 [cs.CL]

(or
              arXiv:2210.03629v3 [cs.CL] for this version)

https://doi.org/10.48550/arXiv.2210.03629

Submission history From: Shunyu Yao [view email]                  [v1]
        Thu, 6 Oct 2022 01:00:32 UTC (538 KB)
            [v2]
        Sun, 27 Nov 2022 22:55:54 UTC (538 KB)
    [v3]
        Fri, 10 Mar 2023 01:00:17 UTC (1,256 KB)
