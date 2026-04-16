import { describe, expect, test } from "bun:test";
import { formatRefreshResults, refreshKb } from "../../src/core/refresh";
import { withTempSourceDirs } from "../helpers/source-dirs";

describe("refresh", () => {
  test("formatRefreshResults renders clean success output", () => {
    const text = formatRefreshResults({
      index: {
        schema_version: 3,
        generated_at: "2026-04-09T00:00:00.000Z",
        root: "/repo",
        chunk_count: 12,
        file_count: 3,
        avg_doc_len: 10,
        idf: {},
        chunks: [],
      },
      warnings: [],
      health: {
        generatedAt: "2026-04-09T00:00:00.000Z",
        index: {
          fileCount: 3,
          chunkCount: 12,
          generatedAt: "2026-04-09T00:00:00.000Z",
        },
        corpus: {
          sourceNoteCount: 2,
          conceptNoteCount: 1,
          summaryNoteCount: 0,
          indexNoteCount: 0,
          conceptCoverageRatio: 0.5,
        },
        review: {
          reviewBacklogCount: 1,
          staleWikiCount: 0,
        },
        maintenance: {
          ingestedSourceCount: 0,
          thinConceptCount: 0,
          uncoveredTagCount: 1,
        },
        gapReport: {
          generatedAt: "2026-04-09T00:00:00.000Z",
          totalNotes: 3,
          sourceNoteCount: 2,
          conceptNoteCount: 1,
          indexNoteCount: 0,
          orphanSourceNoteCount: 0,
          ingestedSourceNoteCount: 0,
          thinConceptCount: 0,
          sourceCountMismatchCount: 0,
          reviewBacklogCount: 0,
          staleWikiNoteCount: 0,
          uncoveredTagCount: 0,
          orphanSourceNotes: [],
          ingestedSourceNotes: [],
          thinConcepts: [],
          sourceCountMismatches: [],
          reviewBacklog: [],
          staleWikiNotes: [],
          uncoveredTags: [],
          suggestedActions: [],
        },
      },
      artifacts: {
        jsonPath: "/repo/.kb/health.json",
        markdownPath: "/repo/.kb/health.md",
      },
    });

    expect(text).toContain("Built KB index with 12 chunks from 3 markdown files.");
    expect(text).toContain("KB refresh complete.");
  });

  test("refreshKb rebuilds the index and returns lint warnings for temp sources", () => {
    withTempSourceDirs(
      [
        {
          relativePath: "raw/articles/valid.md",
          content: `---
id: valid
type: source
title: Valid
path: raw/articles/valid.md
summary: Valid note.
---
# Valid

## Source Metadata

- Path: raw/articles/valid.md

## TL;DR

Summary long enough to be useful for refresh testing.

## Key Claims

- Valid claim that is long enough to be indexed.

## Important Details

- Useful detail for the test fixture.

## Entities

- Concepts: testing

## My Notes

- Note.

## Open Questions

- Question?

## Related

- None yet.

## Source Text

Original source text for the refresh test fixture.
`,
        },
      ],
      () => {
        const response = refreshKb();
        expect(response.index.file_count).toBe(1);
        expect(response.index.chunk_count).toBeGreaterThan(0);
        expect(response.warnings).toEqual([]);
      },
    );
  });
});
