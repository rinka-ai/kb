import { describe, expect, test } from "bun:test";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { ingestSource } from "../../src/core/ingest";
import { parseIngestArgs } from "../../src/core/ingest/cli";
import {
  applyOverrides,
  extractFromLocalFile,
  extractFromUrl,
  isBlockedFetchUrl,
  normalizeDate,
} from "../../src/core/ingest/extract";
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

  test("isBlockedFetchUrl blocks local, private, metadata, and non-http URLs", () => {
    expect(isBlockedFetchUrl("http://localhost/article")).toBe(true);
    expect(isBlockedFetchUrl("http://127.0.0.1/article")).toBe(true);
    expect(isBlockedFetchUrl("http://169.254.169.254/latest/meta-data")).toBe(true);
    expect(isBlockedFetchUrl("http://192.168.1.10/article")).toBe(true);
    expect(isBlockedFetchUrl("http://[::ffff:127.0.0.1]/article")).toBe(true);
    expect(isBlockedFetchUrl("file:///tmp/article.md")).toBe(true);
    expect(isBlockedFetchUrl("https://example.com/article")).toBe(false);
  });

  test("extractFromUrl follows redirects and prefers a safe canonical URL", async () => {
    const originalFetch = globalThis.fetch;
    const calls: string[] = [];
    globalThis.fetch = (async (input: RequestInfo | URL) => {
      const url = String(input);
      calls.push(url);
      if (url === "https://example.com/start") {
        return new Response("", {
          status: 302,
          headers: { location: "/final" },
        });
      }

      return new Response(
        `<!doctype html>
<html>
  <head>
    <title>Fetched Fixture</title>
    <link rel="canonical" href="https://example.com/canonical" />
    <meta name="author" content="Test Author" />
    <meta property="og:site_name" content="Example Site" />
    <meta name="description" content="This fetched fixture is long enough to become a useful source summary." />
  </head>
  <body>
    <article>
      <p>This fetched fixture is long enough to become part of the extracted source text.</p>
      <p>Another paragraph gives the source note enough body content for downstream ingestion.</p>
    </article>
  </body>
</html>`,
        {
          status: 200,
          headers: { "content-type": "text/html; charset=utf-8" },
        },
      );
    }) as typeof fetch;

    try {
      const result = await extractFromUrl("https://example.com/start");
      expect(calls).toEqual(["https://example.com/start", "https://example.com/final"]);
      expect(result.title).toBe("Fetched Fixture");
      expect(result.author).toBe("Test Author");
      expect(result.publisher).toBe("Example Site");
      expect(result.url).toBe("https://example.com/canonical");
      expect(result.details).toContain("Canonical URL detected as https://example.com/canonical.");
      expect(result.details).toContain(
        "Final fetched URL after redirects: https://example.com/final.",
      );
      expect(result.sourceText).toContain("Another paragraph gives the source note");
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  test("extractFromUrl rejects unsupported binary content types", async () => {
    const originalFetch = globalThis.fetch;
    globalThis.fetch = (async () =>
      new Response("%PDF-1.7", {
        status: 200,
        headers: { "content-type": "application/pdf" },
      })) as unknown as typeof fetch;

    try {
      await expect(extractFromUrl("https://example.com/paper.pdf")).rejects.toThrow(
        "unsupported content type application/pdf",
      );
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  test("extractFromUrl retries transient HTTP failures", async () => {
    const originalFetch = globalThis.fetch;
    let calls = 0;
    globalThis.fetch = (async () => {
      calls += 1;
      if (calls === 1) {
        return new Response("temporary", {
          status: 503,
          statusText: "Service Unavailable",
          headers: { "content-type": "text/plain" },
        });
      }

      return new Response(
        `# Retry Fixture

This retry fixture is long enough to become the extracted summary after a transient failure.
`,
        {
          status: 200,
          headers: { "content-type": "text/markdown" },
        },
      );
    }) as unknown as typeof fetch;

    try {
      const result = await extractFromUrl("https://example.com/retry.md");
      expect(calls).toBe(2);
      expect(result.title).toBe("Retry Fixture");
      expect(result.summary).toContain("This retry fixture is long enough");
    } finally {
      globalThis.fetch = originalFetch;
    }
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
