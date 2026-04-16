import { describe, expect, test } from "bun:test";
import { buildHealthReport } from "../../src/core/health";
import { withRepoFixtureSourceDirs } from "../helpers/repo-source-dirs";

describe("health", () => {
  test("buildHealthReport summarizes maintenance pressure", () => {
    withRepoFixtureSourceDirs(
      [
        {
          dir: "raw",
          relativePath: "fresh-source.md",
          content: `---
id: article-fresh-source
type: source
title: Fresh Source
path: raw/articles/fresh-source.md
summary: Newly added source.
tags: [security]
status: processed
date_added: 2026-04-16
---
# Fresh Source

## Source Metadata

- Path: raw/articles/fresh-source.md

## TL;DR

Fresh source.

## Key Claims

- New information.

## Important Details

- Details.

## Entities

- Concepts: security

## My Notes

- Note.

## Open Questions

- What changed?

## Related

- [[agent-security]]

## Source Text

Fresh source text.
`,
        },
        {
          dir: "wiki",
          relativePath: "concepts/agent-security.md",
          content: `---
id: concept-agent-security
type: concept
title: Agent Security
summary: Security basics.
tags: [security]
source_count: 1
review_status: reviewed
last_reviewed: 2026-04-01
review_due: 2026-05-01
---
# Agent Security

## Summary

Security basics.

## Source Notes

- [[fresh-source]]
`,
        },
      ],
      () => {
        const report = buildHealthReport({
          limit: 10,
          minConceptSources: 2,
          minTagOccurrences: 1,
          rebuildIfStale: true,
        });

        expect(report.index.fileCount).toBeGreaterThan(0);
        expect(report.review.staleWikiCount).toBeGreaterThan(0);
        expect(report.maintenance.uncoveredTagCount).toBeGreaterThanOrEqual(0);
      },
    );
  });
});
