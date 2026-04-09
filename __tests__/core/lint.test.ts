import { describe, expect, test } from "bun:test";
import { collectKbWarnings } from "../../src/core/lint";
import { withRepoFixtureSourceDirs } from "../helpers/repo-source-dirs";

describe("lint", () => {
  test("flags missing path metadata and source metadata path bullets", () => {
    withRepoFixtureSourceDirs(
      [
        {
          dir: "raw",
          relativePath: "broken.md",
          content: `---
id: broken
type: source
title: Broken Note
summary: Missing path metadata on purpose.
---
# Broken Note

## Source Metadata

- Author: Unknown

## TL;DR

Summary.

## Key Claims

- Claim.

## Important Details

- Detail.

## Entities

- Concepts: testing

## My Notes

- Note.

## Open Questions

- Question?

## Related

- [[missing]]

## Source Text

Original source.
`,
        },
      ],
      () => {
        const warnings = collectKbWarnings();
        expect(
          warnings.some((warning) => warning.includes("missing or empty frontmatter key `path`")),
        ).toBe(true);
        expect(
          warnings.some((warning) =>
            warning.includes("`Source Metadata` should include a `Path` bullet"),
          ),
        ).toBe(true);
      },
    );
  });

  test("flags superseded notes without superseded_by and dangling wiki links", () => {
    withRepoFixtureSourceDirs(
      [
        {
          dir: "raw",
          relativePath: "old.md",
          content: `---
id: old-note
type: source
title: Old Note
path: raw/articles/old.md
summary: Old note.
status: superseded
---
# Old Note

## Source Metadata

- Path: raw/articles/old.md

## TL;DR

Summary.

## Key Claims

- Claim.

## Important Details

- Detail.

## Entities

- Concepts: testing

## My Notes

- Note.

## Open Questions

- Question?

## Related

- [[missing-concept]]

## Source Text

Original source.
`,
        },
        {
          dir: "wiki",
          relativePath: "concepts/testing.md",
          content: `# Testing

## Summary

See [[missing-page]] for more.
`,
        },
      ],
      () => {
        const warnings = collectKbWarnings();
        expect(
          warnings.some((warning) =>
            warning.includes("`status: superseded` should include `superseded_by`"),
          ),
        ).toBe(true);
        expect(
          warnings.some((warning) => warning.includes("dangling wiki link `[[missing-page]]`")),
        ).toBe(true);
      },
    );
  });
});
