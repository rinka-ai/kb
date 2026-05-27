import { describe, expect, test } from "bun:test";
import { existsSync, renameSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { collectKbWarnings } from "../../src/core/lint";
import { ROOT } from "../../src/core/paths";
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

  test("flags wiki pages missing from wiki/index.md catalog", () => {
    const indexPath = join(ROOT, "wiki", "index.md");
    const backupPath = `${indexPath}.bak-${Date.now()}`;
    const hadIndex = existsSync(indexPath);
    if (hadIndex) renameSync(indexPath, backupPath);

    writeFileSync(
      indexPath,
      `---\nid: wiki-index\ntype: index\ntitle: Wiki Index\nsummary: Test stub.\n---\n\n# Wiki Index\n\n## Concepts\n- [[listed-concept]]\n`,
    );

    try {
      withRepoFixtureSourceDirs(
        [
          {
            dir: "wiki",
            relativePath: "concepts/listed-concept.md",
            content: "# Listed Concept\n",
          },
          {
            dir: "wiki",
            relativePath: "concepts/orphan-concept.md",
            content: "# Orphan Concept\n",
          },
        ],
        () => {
          // The fixture redirects SOURCE_DIRS away from real wiki/, so the
          // listed/orphan pages live under wiki/<fixtureId>/. Read the same
          // stub wiki/index.md from disk; orphan-concept is not listed.
          const warnings = collectKbWarnings();
          expect(
            warnings.some((w) => w.includes("orphan-concept.md: not listed in wiki/index.md")),
          ).toBe(true);
          expect(
            warnings.some((w) => w.includes("listed-concept.md: not listed in wiki/index.md")),
          ).toBe(false);
        },
      );
    } finally {
      if (hadIndex) {
        renameSync(backupPath, indexPath);
      } else if (existsSync(indexPath)) {
        // Defensive cleanup if the index file didn't exist before.
        rmSync(indexPath);
      }
    }
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
