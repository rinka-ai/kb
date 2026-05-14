---
id: article-2026-04-10-inspect-ai
type: source
title: "Inspect AI"
path: raw/articles/github-repos/2026-04-10-inspect-ai.md
author: UK AI Security Institute
publisher: GitHub
url: https://github.com/UKGovernmentBEIS/inspect_ai
date_published: 
date_added: 2026-04-10
tags: [evals, agents, harnesses, frameworks]
status: processed
quality: high
summary: Inspect AI is the UK AI Security Institute's evaluation framework for LLM systems, with built-in support for prompt engineering, tool use, multi-turn interaction, model-graded evals, and a large library of ready-to-run evaluations.
related: [evals, agents, harnesses, frameworks]
---

# Inspect AI

## Source Metadata

- Path: raw/articles/github-repos/2026-04-10-inspect-ai.md
- Author: UK AI Security Institute
- Published: Unknown
- Publisher: GitHub
- URL: https://github.com/UKGovernmentBEIS/inspect_ai

## TL;DR

Inspect AI is a production-oriented evaluation framework for LLM systems that supports tool-using, multi-turn, and model-graded evaluations rather than only single-prompt scoring.

## Key Claims

- Inspect AI is an official evaluation framework created by the UK AI Security Institute.
- The framework includes built-in support for prompt engineering, tool usage, multi-turn dialog, and model-graded evaluations.
- It also ships with a large library of pre-built evals that can run on many different models.
- The design is extensible: other Python packages can add new elicitation and scoring techniques.

## Important Details

- The repository points to dedicated documentation at `inspect.aisi.org.uk`.
- The README states that Inspect includes more than 100 pre-built evaluations.
- The repo supports both core development and documentation workflows, with optional doc dependencies and Quarto-based docs.
- The codebase also contains a web UI submodule for frontend work.

## Entities

- Organization: UK AI Security Institute
- Tools and surfaces: model-graded evaluations, prompt engineering, multi-turn dialog, tool usage
- Concepts: eval frameworks, extensibility, pre-built evaluation suites

## My Notes

- This is the most directly useful framework source added for the repo's evaluation concept pages.
- It gives the KB a concrete implementation reference for full-system agent evaluation rather than only benchmark commentary.

## Open Questions

- Which pieces of Inspect AI map most directly onto our own full-system-eval architecture?
- What should this KB say about the tradeoff between pre-built eval libraries and custom domain-specific scenarios?

## Related

- [[ai-agent-evals]]
- [[llm-agents]]
- [[agent-harnesses]]
- [[agent-frameworks]]

## Source Text

Welcome to Inspect, a framework for large language model evaluations created by the UK AI Security Institute.
Inspect provides many built-in components, including facilities for prompt engineering, tool usage, multi-turn dialog, and model graded evaluations. Extensions to Inspect (e.g. to support new elicitation and scoring techniques) can be provided by other Python packages.
To get started with Inspect, please see the documentation at https://inspect.aisi.org.uk/.
Inspect also includes a collection of over 100 pre-built evaluations ready to run on any model (learn more at Inspect Evals)

To work on development of Inspect, clone the repository and install with the -e flag and [dev] optional dependencies:
git clone https://github.com/UKGovernmentBEIS/inspect_ai.git
cd inspect_ai
pip install -e ".[dev]"
Optionally install pre-commit hooks via
make hooks
Run linting, formatting, and tests via
make check
make test
If you use VS Code, you should be sure to have installed the recommended extensions (Python, Ruff, and MyPy). Note that you'll be prompted to install these when you open the project in VS Code.
Frontend development (TypeScript)
The web UI lives in a git submodule at src/inspect_ai/_view/ts-mono/. These steps are only needed if you plan to work on the TypeScript/React frontend — Python-only contributors can skip this entirely.
Initialize the submodule and install dependencies — see the one-time setup guide.
Documentation
To work on the Inspect documentation, install the optional [doc] dependencies with the -e flag and build the docs:
pip install -e ".[doc]"
cd docs
quarto render # or 'quarto preview'

If you intend to work on the docs iteratively, you'll want to install the Quarto extension in VS Code.
