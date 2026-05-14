---
id: article-2026-04-10-agentdojo
type: source
title: "AgentDojo"
path: raw/articles/github-repos/2026-04-10-agentdojo.md
author: ETH Zurich SPY Lab
publisher: GitHub
url: https://github.com/ethz-spylab/agentdojo
date_published: 
date_added: 2026-04-10
tags: [security, prompt-injection, agents, evals]
status: processed
quality: high
summary: AgentDojo is the official repository for the prompt-injection benchmark environment, with runnable suites, defense and attack configurations, and docs for inspecting benchmark results.
related: [security, prompt-injection, agents, evals]
---

# AgentDojo

## Source Metadata

- Path: raw/articles/github-repos/2026-04-10-agentdojo.md
- Author: ETH Zurich SPY Lab
- Published: Unknown
- Publisher: GitHub
- URL: https://github.com/ethz-spylab/agentdojo

## TL;DR

The AgentDojo repository turns the paper's security benchmark into a usable evaluation environment for testing attacks, defenses, and tool-using-agent behavior over realistic tasks.

## Key Claims

- The repo is the canonical implementation for the AgentDojo benchmark environment.
- It provides an installable Python package and runnable benchmark scripts.
- The benchmark surface includes configurable attacks and defenses, making it useful for comparative robustness experiments rather than only fixed-score reporting.
- The repository also points to documentation and dedicated results inspection workflows.

## Important Details

- The quickstart installs the package with `pip install agentdojo`.
- The repo also documents an optional `transformers` extra for the prompt-injection detector.
- The example benchmark commands show suites, user tasks, model choice, defense selection, and attack configuration as first-class parameters.
- The source text links the repo to both the paper and benchmark-result inspection surfaces.

## Entities

- People: Edoardo Debenedetti, Jie Zhang, Mislav Balunović, Luca Beurer-Kellner, Marc Fischer, Florian Tramèr
- Organizations: ETH Zurich, Invariant Labs
- Tools and concepts: prompt-injection detector, benchmark scripts, attacks, defenses, result inspection

## My Notes

- This repo matters because it makes prompt-injection evaluation operational rather than purely conceptual.
- It is a good companion source whenever the KB needs to discuss how security benchmarks are actually run.

## Open Questions

- How should this repo compare static benchmark scores against parameterized benchmark configurations?
- Which AgentDojo defenses are most generalizable to enterprise agent systems?

## Related

- [[agent-security]]
- [[llm-agents]]
- [[ai-agent-evals]]

## Source Text

Edoardo Debenedetti1, Jie Zhang1, Mislav Balunović1,2, Luca Beurer-Kellner1,2, Marc Fischer1,2, Florian Tramèr1
1ETH Zurich and 2Invariant Labs
Read Paper | Inspect Results

Quickstart
pip install agentdojo
ImportantNote that the API of the package is still under development and might change in the future.

If you want to use the prompt injection detector, you need to install the transformers extra:
pip install "agentdojo[transformers]"
Running the benchmark
The benchmark can be run with the benchmark script. Documentation on how to use the script can be obtained with the --help flag.
For example, to run the workspace suite on the tasks 0 and 1, with gpt-4o-2024-05-13 as the LLM, the tool filter as a defense, and the attack with tool knowlege, run the following command:
python -m agentdojo.scripts.benchmark -s workspace -ut user_task_0 \
    -ut user_task_1 --model gpt-4o-2024-05-13 \
    --defense tool_filter --attack tool_knowledge
To run the above, but on all suites and tasks, run the following:
python -m agentdojo.scripts.benchmark --model gpt-4o-2024-05-13 \
    --defense tool_filter --attack tool_knowledge
Inspect the results
To inspect the results, go to the dedicated results page of the documentation. AgentDojo results are also listed in the Invariant Benchmark Registry.Agent
Documentation of the Dojo
Take a look at our documentation.
Development set-up
Take a look at the development set-up docs.
Citing
If you use AgentDojo in your research, please consider citing our paper:
@inproceedings{
 debenedetti2024agentdojo,
 title={AgentDojo: A Dynamic Environment to Evaluate Prompt Injection Attacks and Defenses for {LLM} Agents},
 author={Edoardo Debenedetti and Jie Zhang and Mislav Balunovic and Luca Beurer-Kellner and Marc Fischer and Florian Tram{\`e}r},
 booktitle={The Thirty-eight Conference on Neural Information Processing Systems Datasets and Benchmarks Track},
 year={2024},
 url={https://openreview.net/forum?id=m1YYAQjO3w}
}
