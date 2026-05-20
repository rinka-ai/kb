---
id: summary-2026-05-20-memwal-encrypted-agent-memory-source-teardown
type: summary
title: MemWal Encrypted Agent Memory Source Teardown
tags: [agent-memory, agent-security, agent-protocols, rag, personal-knowledge-bases]
summary: "MemWal adds a user-owned encrypted memory pattern: durable Walrus blobs, rebuildable vector indexes, Sui delegate-key access, SDK/MCP/harness integrations, and explicit relayer trust trade-offs."
source_count: 1
canonical_for: [memwal, encrypted agent memory, user-owned agent memory, walrus memory]
review_status: draft
last_reviewed: 2026-05-20
review_due: 2026-06-20
confidence: "0.78"
---

# MemWal Encrypted Agent Memory Source Teardown

## Summary

MemWal [[2026-05-20-memwal]] adds an important memory-infrastructure pattern to the KB: user-owned, encrypted, semantically searchable memory that can be shared across agents, apps, and MCP clients. It sits between ordinary vector stores and personal knowledge bases. The system stores encrypted blobs on Walrus, indexes vectors in PostgreSQL/pgvector, enforces owner/delegate access through Sui, and exposes SDK, manual-client, MCP, OpenClaw, relayer, and restore paths.

The key lesson is not "decentralization makes memory private." The useful pattern is a layered memory control plane with clear trust boundaries: onchain ownership is cryptographic, Walrus is durable encrypted storage, pgvector is a rebuildable search index, and the relayer is a trust point unless the user self-hosts, verifies a TEE deployment, or uses the manual client flow.

## Patterns To Keep

- Separate durable memory from search index. Encrypted blobs are the source of truth; vector entries are operational state that can be rebuilt.
- Make memory scope explicit. MemWal's `owner + namespace + package_id` boundary is a good model for personal, work, project, and app-specific memories.
- Treat delegate keys as agent capabilities. Agents can read/write memory without receiving the owner wallet, and delegate revocation becomes part of memory governance.
- Preserve restore as a first-class verb. A memory system that cannot rebuild its index from durable storage is really a cache pretending to be memory.
- Offer multiple trust postures. Managed relayer, self-hosted relayer, TEE relayer, and manual client flow serve different privacy and developer-experience needs.
- Expose memory through protocol adapters. SDK middleware, MCP tools, and OpenClaw hooks show that memory has to meet agents where they run.
- Guard memory injection and capture. Stored memories are prompt-injection surfaces, so recall filters, escaping, context framing, and tag-stripping are not optional details.

## Concept Updates

- [[agent-memory]]: MemWal strengthens the ownership-and-portability branch of memory engineering: memory spaces, restore, delegate keys, and encrypted durable storage.
- [[agent-security]]: the repo is a useful case study in honest trust boundaries. Onchain delegates are enforceable; default relayer plaintext handling is still operator trust.
- [[agent-tools]]: memory tools become write/read/restore/analyze capabilities that should be namespaced, authenticated, and scoped like any other high-leverage agent tool.
- [[agent-protocols]]: the MCP package shows memory as a protocol surface, including first-run auth, local login/logout tools, and remote relayer bridging.
- [[managed-agents]]: user-owned memory and delegate keys help decouple agent runtimes from one provider's internal memory database.
- [[agent-harnesses]]: OpenClaw integration shows auto-recall and auto-capture as harness hooks, not just model instructions.
- [[context-engineering]]: memory middleware injects retrieved facts before generation and saves facts after generation, so load policy and write policy are active context decisions.
- [[rag]]: MemWal is a RAG-like memory pipeline where retrieval quality depends on embeddings, vector indexing, recency ranking, encrypted storage constraints, and restore semantics.
- [[personal-knowledge-bases]]: MemWal broadens the PKB idea from markdown-only stores into user-owned encrypted memory that can move across apps and agents.

## Cautions

- The default relayer sees plaintext memory content and decrypted recall results. For sensitive memory, the trust posture matters more than the "encrypted storage" phrase.
- Vector embeddings and metadata can still leak signals, even when plaintext blobs are encrypted.
- Auto-save middleware risks storing noisy, wrong, or sensitive facts unless the product provides review, filtering, or deletion paths.
- Logout in the MCP package removes local credentials but does not revoke the onchain delegate; revocation remains a separate account-management step.
- Restore can rebuild lost indexes, but durable deletion, supersession, and freshness policies need explicit semantics beyond "find all blobs again."
- The project is beta, so operational claims should be revisited after future releases.

## Source Notes

- [[2026-05-20-memwal]]
