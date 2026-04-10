---
id: article-2026-04-10-agentdojo-a-dynamic-environment-to-evaluate-prompt-injection-attacks-and-defenses-for-llm-agents
type: source
title: "AgentDojo: A Dynamic Environment to Evaluate Prompt Injection Attacks and Defenses for LLM Agents"
path: raw/articles/arxiv/2026-04-10-agentdojo-a-dynamic-environment-to-evaluate-prompt-injection-attacks-and-defenses-for-llm-agents.md
author: Unknown
publisher: arXiv.org
url: https://arxiv.org/abs/2406.13352
date_published: 2024-06-19
date_added: 2026-04-10
tags: [security, prompt-injection, agents, evals]
status: processed
quality: high
summary: AgentDojo introduces an extensible benchmark environment for evaluating prompt injection attacks and defenses in tool-using agents that operate over untrusted data.
related: [security, prompt-injection, agents, evals]
---

# AgentDojo: A Dynamic Environment to Evaluate Prompt Injection Attacks and Defenses for LLM Agents

## Source Metadata

- Path: raw/articles/arxiv/2026-04-10-agentdojo-a-dynamic-environment-to-evaluate-prompt-injection-attacks-and-defenses-for-llm-agents.md
- Author: Unknown
- Published: Unknown
- Publisher: arXiv.org
- URL: https://arxiv.org/abs/2406.13352

## TL;DR

AgentDojo frames prompt injection as a first-class agent-evaluation problem and provides an environment where both task performance and security properties can be measured together.

## Key Claims

- Tool-using agents are vulnerable to prompt injection because external data can steer subsequent reasoning and actions.
- AgentDojo is designed as an extensible environment rather than a static fixed test suite so new attacks, tasks, and defenses can be added over time.
- The paper shows that both attacks and defenses remain brittle: strong models still fail many tasks and current defenses do not secure all relevant properties.
- Robust agent evaluation should measure both task success and adversarial resilience.

## Important Details

- The paper populates the environment with 97 realistic tasks and 629 security test cases.
- Example task domains include email, e-banking, and travel booking.
- The arXiv page notes later updates to the Llama implementation and travel suite.

## Entities

- Authors: Edoardo Debenedetti, Jie Zhang, Mislav Balunovic, Luca Beurer-Kellner, Marc Fischer, Florian Tramèr
- Organizations: ETH Zurich, Invariant Labs
- Concepts: prompt injection, adversarial robustness, tool-using agents, benchmark environments
- Domains: email, banking, travel

## My Notes

- This is one of the most useful security papers in the KB because it evaluates realistic agent tasks rather than only isolated prompt attacks.
- It should inform any future enterprise-agent hardening guidance in this repo.

## Open Questions

- How should this KB distinguish between benchmark suites for general capability and suites for adversarial robustness?
- Which security properties from AgentDojo should become explicit eval dimensions in our concept pages?

## Related

- [[security]]
- [[prompt-injection]]
- [[agents]]
- [[evals]]

## Source Text

View PDF
    HTML (experimental)
            Abstract:AI agents aim to solve complex tasks by combining text-based reasoning with external tool calls. Unfortunately, AI agents are vulnerable to prompt injection attacks where data returned by external tools hijacks the agent to execute malicious tasks. To measure the adversarial robustness of AI agents, we introduce AgentDojo, an evaluation framework for agents that execute tools over untrusted data. To capture the evolving nature of attacks and defenses, AgentDojo is not a static test suite, but rather an extensible environment for designing and evaluating new agent tasks, defenses, and adaptive attacks. We populate the environment with 97 realistic tasks (e.g., managing an email client, navigating an e-banking website, or making travel bookings), 629 security test cases, and various attack and defense paradigms from the literature. We find that AgentDojo poses a challenge for both attacks and defenses: state-of-the-art LLMs fail at many tasks (even in the absence of attacks), and existing prompt injection attacks break some security properties but not all. We hope that AgentDojo can foster research on new design principles for AI agents that solve common tasks in a reliable and robust manner.. We release the code for AgentDojo at this https URL.

Comments:
          Updated version after fixing a bug in the Llama implementation and updating the travel suite

Cryptography and Security (cs.CR); Machine Learning (cs.LG)

Cite as:
          arXiv:2406.13352 [cs.CR]

(or
              arXiv:2406.13352v3 [cs.CR] for this version)

https://doi.org/10.48550/arXiv.2406.13352

Submission history From: Edoardo Debenedetti [view email]                  [v1]
        Wed, 19 Jun 2024 08:55:56 UTC (563 KB)
            [v2]
        Thu, 18 Jul 2024 07:37:28 UTC (565 KB)
    [v3]
        Sun, 24 Nov 2024 22:04:23 UTC (573 KB)
