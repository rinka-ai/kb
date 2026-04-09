import { describe, expect, test } from "bun:test";
import { buildHandoffPacket, formatHandoffPacket } from "../../src/core/handoff";
import { withRepoFixtureSourceDirs } from "../helpers/repo-source-dirs";

describe("handoff", () => {
  test("buildHandoffPacket creates a structured handoff from wiki notes", () => {
    withRepoFixtureSourceDirs(
      [
        {
          dir: "raw",
          relativePath: "context-source.md",
          content: `---
id: article-context-source
type: source
title: Context Source
path: raw/articles/context-source.md
summary: Context engineering curates what the agent sees and when.
tags: [context-engineering, agents]
status: processed
---
# Context Source

## Source Metadata

- Path: raw/articles/context-source.md

## TL;DR

Context engineering curates what the agent sees and when.

## Key Claims

- Context should be assembled selectively.

## Important Details

- Compression should be restorable.

## Entities

- Concepts: context engineering

## My Notes

- Note.

## Open Questions

- What belongs in active context?

## Related

- [[context-engineering]]

## Source Text

Context engineering curates what the agent sees and when.
`,
        },
        {
          dir: "wiki",
          relativePath: "concepts/context-engineering.md",
          content: `---
id: concept-context-engineering
type: concept
title: Context Engineering
summary: Context engineering is the discipline of deciding what an agent should see, when, and in what form.
tags: [context-engineering, agents]
source_count: 1
---
# Context Engineering

## Summary

Context engineering is the discipline of deciding what an agent should see, when, and in what form.

## Patterns

- Preserve raw material, then assemble context selectively.

## Tensions

- compression vs restorability

## Open Questions

- What belongs in active context?

## Source Notes

- [[context-source]]
`,
        },
      ],
      () => {
        const packet = buildHandoffPacket({
          goal: "Prepare a context-engineering brief",
          query: "context engineering",
          top: 4,
          includeSuperseded: false,
          rebuildIfStale: true,
        });

        expect(packet.goal).toBe("Prepare a context-engineering brief");
        expect(packet.readFirst.length).toBeGreaterThan(0);
        expect(packet.primarySources.some((path) => path.endsWith("/context-source.md"))).toBe(
          true,
        );
        expect(packet.keyPoints).toContain(
          "Preserve raw material, then assemble context selectively.",
        );
        expect(packet.suggestedNextSteps.length).toBeGreaterThan(0);
        expect(formatHandoffPacket(packet)).toContain("Handoff goal:");
      },
    );
  });
});
