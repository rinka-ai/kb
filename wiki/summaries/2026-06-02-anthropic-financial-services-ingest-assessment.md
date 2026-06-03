---
id: 2026-06-02-anthropic-financial-services-ingest-assessment
type: summary
title: Anthropic Financial Services Repo Ingest Assessment
tags: [github-repos, agent-skills, managed-agents, financial-services, agent-security, mcp, enterprise-ai]
source_count: 1
summary: Anthropic's financial-services repo is worth a targeted KB ingest because it is an official reference corpus for finance-domain Claude skills, managed-agent cookbooks, least-privilege subagent patterns, MCP data connectors, and enterprise Office deployment.
canonical_for: [anthropics financial services ingest, Claude financial services repo, financial services managed agents, finance agent skills]
review_status: draft
last_reviewed: 2026-06-02
review_due: 2026-07-02
confidence: "0.82"
---

# Anthropic Financial Services Repo Ingest Assessment

## Verdict

Ingest it, but do a targeted source teardown rather than copying the whole repository into the KB.

The repo is worth adding because it is an official Anthropic reference implementation for finance-domain Claude plugins, skills, managed-agent deployment templates, MCP connector configuration, and Microsoft 365 enterprise add-in provisioning. It fills a different gap than the existing financial-document multi-agent benchmark: this is not an eval paper, it is a runnable artifact corpus showing how Anthropic packages domain workflows for financial services.

Recommended priority: high, after fixing or at least noting the malformed core `.mcp.json` in the inspected snapshot.

## Snapshot Inspected

- Repository: `anthropics/financial-services`
- URL: `https://github.com/anthropics/financial-services`
- Inspected revision: `120a31dcede4affa1d771cbf286a63ee331f92a4`
- Latest commit subject: `Adding Box to MCP Integrations (#187)`
- Latest commit date shown locally: `2026-05-29 09:31:43 -0700`
- Size: about `3.4M`
- Files: `371` total non-git files, about `46,347` lines
- License: Apache 2.0

## What Is In The Repo

The repository is mostly markdown/YAML operational source, not application code:

- 10 named agent plugins: Pitch Agent, Market Researcher, Earnings Reviewer, Meeting Prep Agent, Model Builder, GL Reconciler, KYC Screener, Valuation Reviewer, Month-End Closer, Statement Auditor.
- 7 vertical plugins: financial analysis, investment banking, equity research, private equity, wealth management, fund admin, operations.
- 2 partner plugin bundles: LSEG and S&P Global/Kensho.
- 66 unique vertical/partner skill files across modeling, research, IB, PE, wealth, KYC, fund admin, fixed income, macro/rates, tear sheets, and funding digests.
- 50 slash-command markdown files that mostly route explicit user commands into skills.
- 10 managed-agent cookbooks, each with an orchestrator `agent.yaml`, 3 leaf subagents, steering examples, and security notes.
- Microsoft 365 add-in install tooling for direct Vertex, Bedrock, Azure Foundry, or gateway deployment plus per-user bootstrap config.
- Helper scripts for plugin validation, skill syncing, managed-agent deployment, cross-agent handoff routing, schema validation, cookbook dry-runs, and plugin version bumping.

## Strongest Ingest Value

1. Managed-agent architecture pattern

The cookbooks encode a reusable enterprise-agent pattern: an orchestrator holds minimal tools, trusted read-only MCPs sit behind explicit toolsets, untrusted-document reader workers get only `Read`/`Grep`, and exactly one downstream worker holds `Write`. This is directly useful for [[managed-agents]], [[workflows]], [[agent-security]], and [[agent-tools]].

2. Untrusted-document isolation

The repo repeatedly separates untrusted inputs from powerful tools: transcripts, counterparty statements, onboarding packets, GP valuation packages, LP statements, vendor invoices, client emails, issuer materials, and third-party research are routed through restricted reader workers. Those readers return length-capped, character-class-restricted JSON via `output_schema`.

3. Domain-specific skills as operational memory

The finance skills are highly procedural. The DCF, comps, 3-statement, pitch-deck, initiating-coverage, tear-sheet, and S&P/LSEG skills encode tool-source priority, formulas-over-hardcodes, Excel/Office JS caveats, data citation requirements, review checkpoints, and output-format standards. This is a strong source for [[agent-skills]] and domain workflow design.

4. MCP connector inventory for financial data

The README and `.mcp.json` files show a practical connector map for Daloopa, Morningstar, S&P Global/Kensho, FactSet, Moody's, MT Newswires, Aiera, LSEG, PitchBook, Chronograph, Egnyte, and Box. The partner-built LSEG and S&P skills add concrete tool-chaining examples.

5. Enterprise Office deployment pattern

The `claude-for-msft-365-install` plugin captures deployment details that are easy to forget: custom manifest generation, Vertex/Bedrock/Foundry/gateway routing, Entra SSO, Graph admin consent, bootstrap endpoints, per-user skills/MCP config, CORS for browser-side add-in fetches, OTLP telemetry, and reserved inference headers.

## Caveats

- The repo is a reference template, not proof of production efficacy.
- There is little executable application logic; most value is in prompts, skills, YAML manifests, and deployment scaffolding.
- The latest inspected `plugins/vertical-plugins/financial-analysis/.mcp.json` is malformed after the Box addition: `python3 -m json.tool` fails with `Expecting ',' delimiter: line 47 column 5`.
- `scripts/check.py` passed after installing `pyyaml`, but it does not validate `.mcp.json`, so the malformed core MCP config escaped the repo's check path.
- The managed-agent dry-run script passed for all 10 cookbooks, producing four resolved agent bodies each.
- Some skills are duplicated into agent plugin bundles; an ingest should read vertical-plugin sources as canonical and avoid treating vendored copies as separate evidence.
- Many financial workflows imply regulated work. The repo repeatedly says outputs are drafts for qualified human sign-off, not investment/legal/tax/accounting advice or execution authority.

## Recommended Ingest Scope

Create one `raw/articles/github-repos/2026-06-02-anthropic-financial-services.md` source note with selected source anchors, not full repo text. Then create one durable synthesis summary.

Read and cite at minimum:

- `README.md`
- `.claude-plugin/marketplace.json`
- `managed-agent-cookbooks/README.md`
- all 10 `managed-agent-cookbooks/*/agent.yaml`
- representative subagents with `output_schema`: `gl-reconciler/reader.yaml`, `pitch-agent/researcher.yaml`, `kyc-screener/doc-reader.yaml`, `valuation-reviewer/package-reader.yaml`
- all 10 agent prompts under `plugins/agent-plugins/*/agents/*.md`
- canonical vertical skills for `dcf-model`, `comps-analysis`, `3-statement-model`, `audit-xls`, `pitch-deck`, `initiating-coverage`, `kyc-doc-parse`, `kyc-rules`, `portfolio-monitoring`, `ai-readiness`
- partner skills: LSEG `equity-research`, `macro-rates-monitor`, `fixed-income-portfolio`; S&P `tear-sheet`, `earnings-preview-beta`, `funding-digest`
- `scripts/deploy-managed-agent.sh`
- `scripts/orchestrate.py`
- `scripts/validate.py`
- `scripts/test-cookbooks.sh`
- `claude-for-msft-365-install/commands/setup.md`
- `claude-for-msft-365-install/commands/manifest.md`
- `claude-for-msft-365-install/commands/bootstrap.md`
- `claude-for-msft-365-install/examples/python-bootstrap/app.py`
- `claude-for-msft-365-install/scripts/build-manifest.mjs`

## Concept Pages To Update If Ingested

- [[managed-agents]]
- [[agent-skills]]
- [[agent-security]]
- [[agent-tools]]
- [[workflows]]
- [[agent-frameworks]]
- [[agent-harnesses]]
- [[enterprise-agent-deployment-failure-modes]]
- [[payment-integrations]] only if discussing money/credential boundaries
- consider adding a new concept for `financial-services-agents` if more finance-agent sources arrive

## Bottom Line

This is worth ingesting because it shows how an AI vendor packages serious financial-services workflows as skills, plugins, managed agents, connector maps, and Office deployment scaffolding. The reusable lesson is the packaging and control-plane pattern: domain skills plus least-privilege agent templates plus read-only data MCPs plus human sign-off, with untrusted documents isolated from write and system-of-record tools.

## Related

- [[managed-agents]]
- [[agent-skills]]
- [[agent-security]]
- [[agent-tools]]
- [[workflows]]
- [[enterprise-agent-deployment-failure-modes]]
- [[2026-03-24-benchmarking-multi-agent-llm-architectures-financial-document-processing]]
