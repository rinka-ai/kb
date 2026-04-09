import { describe, expect, test } from "bun:test";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { ingestSource } from "../../src/core/ingest";
import { parseIngestArgs } from "../../src/core/ingest/cli";
import { applyOverrides, extractFromLocalFile, normalizeDate } from "../../src/core/ingest/extract";
import { chooseOutputPath, makeMarkdown } from "../../src/core/ingest/render";

function withTempFile<T>(content: string, extension: string, run: (filePath: string) => T): T {
  const directory = mkdtempSync(join(tmpdir(), "ai-research-kb-ingest-"));
  const filePath = join(directory, `fixture${extension}`);
  writeFileSync(filePath, content);
  try {
    return run(filePath);
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
}

describe("ingest", () => {
  test("parseIngestArgs parses tags and no-refresh correctly", () => {
    const args = parseIngestArgs([
      "--file",
      "/tmp/example.md",
      "--collection",
      "fixtures",
      "--tags",
      "agents, managed-agents, context-engineering",
      "--author",
      "Test Author",
      "--no-refresh",
      "--dry-run",
    ]);

    expect(args.file).toBe("/tmp/example.md");
    expect(args.collection).toBe("fixtures");
    expect(args.tags).toEqual(["agents", "managed-agents", "context-engineering"]);
    expect(args.author).toBe("Test Author");
    expect(args.noRefresh).toBe(true);
    expect(args.dryRun).toBe(true);
  });

  test("normalizeDate accepts ISO dates and normalizes datetime strings", () => {
    expect(normalizeDate("2026-04-09")).toBe("2026-04-09");
    expect(normalizeDate("2026-04-09T12:34:56Z")).toBe("2026-04-09");
    expect(normalizeDate("not-a-date")).toBe("");
  });

  test("extractFromLocalFile captures title, summary, and source text from markdown", () => {
    withTempFile(
      `# Fixture Title

This is a local fixture for ingest testing and it should be long enough to become the summary sentence.

Another paragraph with enough content to stay in the extracted source text for downstream formatting.
`,
      ".md",
      (filePath) => {
        const result = extractFromLocalFile(filePath);
        expect(result.title).toBe("Fixture Title");
        expect(result.publisher).toBe("local file");
        expect(result.author).toBe("Unknown");
        expect(result.summary).toContain("This is a local fixture for ingest testing");
        expect(result.sourceText).toContain("Another paragraph");
      },
    );
  });

  test("applyOverrides updates scalar metadata and deduplicates tags", () => {
    const source = {
      title: "Original Title",
      author: "Original Author",
      publisher: "Original Publisher",
      url: "https://example.com",
      datePublished: "2026-01-01",
      summary: "Summary",
      keyClaims: [],
      details: [],
      sourceText: "Body",
      tags: ["agents"],
      related: ["agents"],
    };

    const updated = applyOverrides(source, {
      tags: ["agents", "managed-agents"],
      title: "Updated Title",
      author: "Updated Author",
      publisher: "Updated Publisher",
      published: "2026-02-03T10:00:00Z",
      dryRun: false,
      stdout: false,
      noRefresh: false,
    });

    expect(updated.title).toBe("Updated Title");
    expect(updated.author).toBe("Updated Author");
    expect(updated.publisher).toBe("Updated Publisher");
    expect(updated.datePublished).toBe("2026-02-03");
    expect(updated.tags).toEqual(["agents", "managed-agents"]);
    expect(updated.related).toEqual(["agents", "managed-agents"]);
  });

  test("chooseOutputPath appends a numeric suffix when a note already exists", () => {
    const directory = mkdtempSync(join(tmpdir(), "ai-research-kb-paths-"));
    const firstPath = join(directory, "2026-04-09-example.md");
    writeFileSync(firstPath, "# Existing");

    try {
      const secondPath = chooseOutputPath(directory, "2026-04-09-example");
      expect(secondPath.endsWith("2026-04-09-example-2.md")).toBe(true);
    } finally {
      rmSync(directory, { recursive: true, force: true });
    }
  });

  test("makeMarkdown includes path metadata and structured sections", () => {
    const markdown = makeMarkdown(
      {
        title: "Managed Agents Fixture",
        author: "Test Author",
        publisher: "Test Publisher",
        url: "https://example.com/managed-agents",
        datePublished: "2026-04-09",
        summary: "A fixture summary for the ingest renderer.",
        keyClaims: ["Managed agents separate orchestration from execution."],
        details: ["Fixture detail."],
        sourceText: "Original captured text.",
        tags: ["agents"],
        related: ["managed-agents"],
      },
      {
        tags: ["agents", "managed-agents"],
        dryRun: false,
        stdout: false,
        noRefresh: false,
      },
      "raw/articles/test/2026-04-09-managed-agents-fixture.md",
    );

    expect(markdown).toContain("path: raw/articles/test/2026-04-09-managed-agents-fixture.md");
    expect(markdown).toContain("- Path: raw/articles/test/2026-04-09-managed-agents-fixture.md");
    expect(markdown).toContain("## Key Claims");
    expect(markdown).toContain("## Source Text");
  });

  test("ingestSource dry-run returns markdown without writing a file", async () => {
    await withTempFile(
      `# Dry Run Fixture

This fixture is long enough to exercise dry-run ingestion without touching the repo tree.

Another paragraph makes sure source text extraction has more than one chunk of content.
`,
      ".md",
      async (filePath) => {
        const result = await ingestSource({
          file: filePath,
          collection: "dry-run-tests",
          tags: ["agents", "ingest"],
          dryRun: true,
          stdout: false,
          noRefresh: false,
        });

        expect(result.outputPath).toBeUndefined();
        expect(result.refreshed).toBe(false);
        expect(result.markdown).toContain("path: raw/articles/dry-run-tests/");
        expect(result.markdown).toContain("## Source Metadata");
        expect(result.source.title).toBe("Dry Run Fixture");
      },
    );
  });
});
