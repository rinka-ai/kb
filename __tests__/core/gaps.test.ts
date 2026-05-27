import { describe, expect, test } from "bun:test";
import { findKbGaps, formatGapReport } from "../../src/core/gaps";
import { withRepoFixtureSourceDirs } from "../helpers/repo-source-dirs";

describe("gaps", () => {
  test("findKbGaps identifies orphan notes, thin concepts, and uncovered tags", () => {
    withRepoFixtureSourceDirs(
      [
        {
          dir: "raw",
          relativePath: "orphan-tooling.md",
          content: `---
id: article-orphan-tooling
type: source
title: Orphan Tooling
path: raw/articles/orphan-tooling.md
summary: Tooling note not linked from the wiki.
tags: [tool-use, mcp]
status: processed
---
# Orphan Tooling

## Source Metadata

- Path: raw/articles/orphan-tooling.md

## TL;DR

Tooling note not linked from the wiki.

## Key Claims

- Tool ergonomics matter.

## Important Details

- Keep tool interfaces tight.

## Entities

- Concepts: tools

## My Notes

- Note.

## Open Questions

- Which tools should be built first?

## Related

- None yet.

## Source Text

Tool interfaces matter.
`,
        },
        {
          dir: "raw",
          relativePath: "ingested-memory.md",
          content: `---
id: article-ingested-memory
type: source
title: Ingested Memory
path: raw/articles/ingested-memory.md
summary: Memory note still in ingested state.
tags: [tool-use, memory]
status: ingested
---
# Ingested Memory

## Source Metadata

- Path: raw/articles/ingested-memory.md

## TL;DR

Memory note still in ingested state.

## Key Claims

- Memory should be curated.

## Important Details

- Memory has provenance.

## Entities

- Concepts: memory

## My Notes

- Note.

## Open Questions

- How should memory be reviewed?

## Related

- None yet.

## Source Text

Memory needs curation.
`,
        },
        {
          dir: "raw",
          relativePath: "sessions-source.md",
          content: `---
id: article-sessions-source
type: source
title: Sessions Source
path: raw/articles/sessions-source.md
summary: Sessions note linked from a concept.
tags: [sessions]
status: processed
---
# Sessions Source

## Source Metadata

- Path: raw/articles/sessions-source.md

## TL;DR

Sessions note linked from a concept.

## Key Claims

- Sessions should be durable.

## Important Details

- Session logs can be queried.

## Entities

- Concepts: sessions

## My Notes

- Note.

## Open Questions

- How should sessions be compacted?

## Related

- [[sessions]]

## Source Text

Sessions should be durable.
`,
        },
        {
          dir: "wiki",
          relativePath: "concepts/sessions.md",
          content: `---
id: concept-sessions
type: concept
title: Sessions
summary: Sessions track long-running agent history.
tags: [sessions]
source_count: 3
---
# Sessions

## Summary

Sessions track long-running agent history.

## Source Notes

- [[sessions-source]]
`,
        },
      ],
      () => {
        const report = findKbGaps({
          limit: 10,
          minConceptSources: 2,
          minTagOccurrences: 2,
        });

        expect(report.orphanSourceNotes.some((note) => note.title === "Orphan Tooling")).toBe(true);
        expect(report.ingestedSourceNotes.some((note) => note.title === "Ingested Memory")).toBe(
          true,
        );
        expect(report.thinConcepts.some((concept) => concept.title === "Sessions")).toBe(true);
        expect(report.sourceCountMismatches.some((concept) => concept.title === "Sessions")).toBe(
          true,
        );
        expect(report.reviewBacklog.some((note) => note.title === "Sessions")).toBe(true);
        expect(report.uncoveredTags.some((tag) => tag.tag === "tool-use")).toBe(true);
        expect(formatGapReport(report)).toContain("Suggested Actions");
      },
    );
  });

  test("findKbGaps compares linked source dates chronologically", () => {
    withRepoFixtureSourceDirs(
      [
        {
          dir: "raw",
          relativePath: "older-source.md",
          content: `---
id: article-older-source
type: source
title: Older Source
path: raw/articles/older-source.md
summary: Older linked source.
tags: [agents]
status: processed
date_added: 2026-04-29
---
# Older Source

## Source Metadata

- Path: raw/articles/older-source.md

## TL;DR

Older source.

## Key Claims

- Older evidence.

## Important Details

- Details.

## Entities

- Concepts: agents

## My Notes

- Note.

## Open Questions

- What changed later?

## Related

- [[agent-harnesses]]

## Source Text

Older source text.
`,
        },
        {
          dir: "raw",
          relativePath: "newer-source.md",
          content: `---
id: article-newer-source
type: source
title: Newer Source
path: raw/articles/newer-source.md
summary: Newer linked source.
tags: [agents]
status: processed
date_added: 2026-05-09
---
# Newer Source

## Source Metadata

- Path: raw/articles/newer-source.md

## TL;DR

Newer source.

## Key Claims

- Newer evidence.

## Important Details

- Details.

## Entities

- Concepts: agents

## My Notes

- Note.

## Open Questions

- What should be reviewed?

## Related

- [[agent-harnesses]]

## Source Text

Newer source text.
`,
        },
        {
          dir: "wiki",
          relativePath: "concepts/agent-harnesses.md",
          content: `---
id: concept-agent-harnesses
type: concept
title: Agent Harnesses
summary: Harness concept.
tags: [agents]
source_count: 2
review_status: reviewed
last_reviewed: 2026-05-02
review_due: 2026-06-02
---
# Agent Harnesses

## Summary

Harness concept.

## Source Notes

- [[older-source]]
- [[newer-source]]
`,
        },
      ],
      () => {
        const report = findKbGaps({
          limit: 10,
          minConceptSources: 2,
          minTagOccurrences: 2,
        });

        const staleHarness = report.staleWikiNotes.find((note) => note.title === "Agent Harnesses");
        expect(staleHarness?.newestLinkedSourceDate).toBe("2026-05-09");
        expect(staleHarness?.reason).toBe("linked source is newer than the page review date");
      },
    );
  });
});
