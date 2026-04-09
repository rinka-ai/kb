import { describe, expect, test } from "bun:test";
import { buildContextPack, formatContextPack } from "../../src/core/context";
import { withRepoFixtureSourceDirs } from "../helpers/repo-source-dirs";

describe("context", () => {
  test("buildContextPack compiles a wiki-shaped context packet from search results", () => {
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
summary: Managed agents separate durable sessions from execution environments.
tags: [agents, sessions, architecture]
status: processed
---
# Managed Agents Source

## Source Metadata

- Path: raw/articles/managed-agents-source.md

## TL;DR

Managed agents separate durable sessions from execution environments.

## Key Claims

- Durable sessions matter for long-running agents.
- Harnesses should stay replaceable.

## Important Details

- Sandboxes should be provisioned only when needed.

## Entities

- Concepts: sessions

## My Notes

- Useful source note.

## Open Questions

- How should sessions be queried?

## Related

- [[managed-agents]]

## Source Text

Managed agents separate sessions from sandboxes.
`,
        },
        {
          dir: "raw",
          relativePath: "context-engineering-source.md",
          content: `---
id: article-context-engineering-source
type: source
title: Context Engineering Source
path: raw/articles/context-engineering-source.md
summary: Context engineering curates what the agent sees and when.
tags: [context-engineering, agents]
status: processed
---
# Context Engineering Source

## Source Metadata

- Path: raw/articles/context-engineering-source.md

## TL;DR

Context engineering curates what the agent sees and when.

## Key Claims

- Context should be assembled selectively.

## Important Details

- Compression should remain restorable.

## Entities

- Concepts: context engineering

## My Notes

- Useful source note.

## Open Questions

- What belongs in active context?

## Related

- [[context-engineering]]

## Source Text

Context engineering is the curation layer for agent context.
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
tags: [agents, architecture]
source_count: 2
---
# Managed Agents

## Summary

Managed agents use stable interfaces for sessions, harnesses, and sandboxes.

## Core Idea

- Decouple the brain from the hands.

## Tensions

- general interfaces vs task-specific optimization

## Open Questions

- Which interfaces should stay stable over time?

## Source Notes

- [[managed-agents-source]]
- [[context-engineering-source]]
`,
        },
      ],
      () => {
        const pack = buildContextPack({
          query: "managed agents sessions",
          top: 4,
          includeSuperseded: false,
          rebuildIfStale: true,
        });

        expect(pack.notes.length).toBeGreaterThan(0);
        expect(pack.recommendedReadOrder[0]?.type).toBe("concept");
        expect(pack.themes).toContain("agents");
        expect(pack.keyPoints).toContain("Decouple the brain from the hands.");
        expect(pack.openQuestions).toContain("Which interfaces should stay stable over time?");
        expect(pack.sourcePaths.some((path) => path.endsWith("/managed-agents-source.md"))).toBe(
          true,
        );
        expect(formatContextPack(pack)).toContain("Recommended Notes");
      },
    );
  });
});
