import { describe, expect, test } from "bun:test";
import { mkdirSync, mkdtempSync, rmSync, utimesSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { buildIndex, listMarkdownFiles, newestMarkdownMtime } from "../../src/core/indexer";
import { SOURCE_DIRS } from "../../src/core/paths";

function withTempSourceDirs<T>(
  files: Array<{ relativePath: string; content: string; mtimeMs?: number }>,
  run: (paths: { tempRoot: string; rawDir: string; wikiDir: string }) => T,
): T {
  const tempRoot = mkdtempSync(join(tmpdir(), "ai-research-kb-"));
  const rawDir = join(tempRoot, "raw", "articles");
  const wikiDir = join(tempRoot, "wiki");
  mkdirSync(rawDir, { recursive: true });
  mkdirSync(wikiDir, { recursive: true });

  for (const file of files) {
    const absolutePath = join(tempRoot, file.relativePath);
    mkdirSync(join(absolutePath, ".."), { recursive: true });
    writeFileSync(absolutePath, file.content);
    if (file.mtimeMs !== undefined) {
      const time = new Date(file.mtimeMs);
      utimesSync(absolutePath, time, time);
    }
  }

  const originalSourceDirs = [...SOURCE_DIRS];
  SOURCE_DIRS.splice(0, SOURCE_DIRS.length, rawDir, wikiDir);

  try {
    return run({ tempRoot, rawDir, wikiDir });
  } finally {
    SOURCE_DIRS.splice(0, SOURCE_DIRS.length, ...originalSourceDirs);
    rmSync(tempRoot, { recursive: true, force: true });
  }
}

describe("indexer", () => {
  test("listMarkdownFiles returns sorted markdown paths from source directories only", () => {
    withTempSourceDirs(
      [
        {
          relativePath: "raw/articles/z-last.md",
          content: "# Z",
        },
        {
          relativePath: "raw/articles/a-first.md",
          content: "# A",
        },
        {
          relativePath: "wiki/concepts/alpha.md",
          content: "# Alpha",
        },
        {
          relativePath: "raw/articles/ignore.txt",
          content: "not markdown",
        },
      ],
      ({ tempRoot }) => {
        expect(listMarkdownFiles()).toEqual([
          join(tempRoot, "raw", "articles", "a-first.md"),
          join(tempRoot, "raw", "articles", "z-last.md"),
          join(tempRoot, "wiki", "concepts", "alpha.md"),
        ]);
      },
    );
  });

  test("buildIndex creates document and high-signal section chunks with metadata", () => {
    withTempSourceDirs(
      [
        {
          relativePath: "raw/articles/sample.md",
          content: `---
id: sample-source
type: source
title: Managed Agents Note
path: raw/articles/sample.md
summary: Durable interfaces for long-running agent systems.
tags: [agents, managed-agents, context-engineering]
related: [managed-agents, sessions]
status: superseded
superseded_by: wiki/concepts/managed-agents.md
url: https://example.com/post
author: Example Author
publisher: Example Publisher
date_published: 2026-01-01
date_added: 2026-01-02
---
# Managed Agents Note

## Source Metadata
- Path: raw/articles/sample.md
- author: Example Author

## TL;DR
Managed agents use durable interfaces for orchestration, sessions, and execution over long-running tasks.

## Key Claims
- Managed agents separate durable interfaces from underlying model implementations to preserve stability as systems evolve.

## Related
- [[managed-agents]]

## Tiny
short

## Source Text
Original source text that should not become a section chunk because it is low signal.
`,
        },
        {
          relativePath: "wiki/concepts/managed-agents.md",
          content: `---
id: concept-managed-agents
type: concept
title: Managed Agents
summary: Canonical concept page.
tags: [agents]
---
# Managed Agents

## Summary
Managed agents are built around stable interfaces for sessions, harnesses, and sandboxes.
`,
        },
      ],
      () => {
        const index = buildIndex();
        expect(index.file_count).toBe(2);
        expect(index.chunk_count).toBe(5);

        const documentChunk = index.chunks.find(
          (chunk) => chunk.path.endsWith("raw/articles/sample.md") && chunk.kind === "document",
        );
        expect(documentChunk).toBeDefined();
        expect(documentChunk?.summary).toBe("Durable interfaces for long-running agent systems.");
        expect(documentChunk?.tags).toEqual(["agents", "managed-agents", "context-engineering"]);
        expect(documentChunk?.status).toBe("superseded");
        expect(documentChunk?.superseded_by).toBe("wiki/concepts/managed-agents.md");
        expect(documentChunk?.url).toBe("https://example.com/post");
        expect(documentChunk?.author).toBe("Example Author");

        const sectionHeadings = index.chunks
          .filter(
            (chunk) => chunk.path.endsWith("raw/articles/sample.md") && chunk.kind === "section",
          )
          .map((chunk) => chunk.section)
          .sort();
        expect(sectionHeadings).toEqual(["Key Claims", "TL;DR"]);

        const keyClaimsChunk = index.chunks.find(
          (chunk) =>
            chunk.path.endsWith("raw/articles/sample.md") &&
            chunk.kind === "section" &&
            chunk.section === "Key Claims",
        );
        expect(keyClaimsChunk?.term_freq.managed).toBeGreaterThan(0);
        expect(keyClaimsChunk?.term_freq.agents).toBeGreaterThan(0);
      },
    );
  });

  test("newestMarkdownMtime returns the latest markdown modification time", () => {
    withTempSourceDirs(
      [
        {
          relativePath: "raw/articles/older.md",
          content: "# Older",
          mtimeMs: 1_700_000_000_000,
        },
        {
          relativePath: "wiki/newer.md",
          content: "# Newer",
          mtimeMs: 1_800_000_000_000,
        },
      ],
      () => {
        expect(newestMarkdownMtime()).toBe(1_800_000_000_000);
      },
    );
  });
});
