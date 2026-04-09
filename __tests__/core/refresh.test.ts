import { describe, expect, test } from "bun:test";
import { formatRefreshResults, refreshKb } from "../../src/core/refresh";
import { withTempSourceDirs } from "../helpers/source-dirs";

describe("refresh", () => {
  test("formatRefreshResults renders clean success output", () => {
    const text = formatRefreshResults({
      index: {
        schema_version: 2,
        generated_at: "2026-04-09T00:00:00.000Z",
        root: "/repo",
        chunk_count: 12,
        file_count: 3,
        avg_doc_len: 10,
        idf: {},
        chunks: [],
      },
      warnings: [],
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
