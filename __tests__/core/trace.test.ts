import { describe, expect, test } from "bun:test";
import { formatClaimTrace, traceClaim } from "../../src/core/trace";
import { withRepoFixtureSourceDirs } from "../helpers/repo-source-dirs";

describe("trace", () => {
  test("traceClaim returns evidence notes and source provenance for a claim", () => {
    withRepoFixtureSourceDirs(
      [
        {
          dir: "raw",
          relativePath: "managed-agents-source.md",
          content: `---
id: article-managed-agents-source
type: source
title: Managed Agents Source
path: raw/articles/managed-agents-source.md
summary: Managed agents separate durable sessions from sandboxes.
tags: [agents, sessions]
status: processed
---
# Managed Agents Source

## Source Metadata

- Path: raw/articles/managed-agents-source.md

## TL;DR

Managed agents separate durable sessions from sandboxes.

## Key Claims

- Managed agents separate durable sessions from sandboxes.
- Harnesses should stay replaceable.

## Important Details

- Sessions should survive harness crashes.

## Entities

- Concepts: sessions

## My Notes

- Note.

## Open Questions

- How should sessions be queried?

## Related

- [[managed-agents]]

## Source Text

Managed agents separate durable sessions from sandboxes.
`,
        },
        {
          dir: "wiki",
          relativePath: "concepts/managed-agents.md",
          content: `---
id: concept-managed-agents
type: concept
title: Managed Agents
summary: Managed agents use stable interfaces for sessions, harnesses, and sandboxes.
tags: [agents]
source_count: 1
---
# Managed Agents

## Summary

Managed agents use stable interfaces for sessions, harnesses, and sandboxes.

## Core Idea

- Decouple the brain from the hands.

## Source Notes

- [[managed-agents-source]]
`,
        },
      ],
      () => {
        const report = traceClaim({
          claim: "managed agents separate durable sessions from sandboxes",
          top: 4,
          includeSuperseded: false,
          rebuildIfStale: true,
        });

        expect(report.evidence.length).toBeGreaterThan(0);
        expect(
          report.primaryEvidence.some((entry) => entry.path.endsWith("/managed-agents-source.md")),
        ).toBe(true);
        expect(report.sourcePaths.some((path) => path.endsWith("/managed-agents-source.md"))).toBe(
          true,
        );
        expect(report.evidence[0]?.matchingSections.length).toBeGreaterThan(0);
        expect(formatClaimTrace(report)).toContain("Claim trace:");
      },
    );
  });
});
