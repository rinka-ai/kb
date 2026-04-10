import { describe, expect, test } from "bun:test";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { createDeepRead } from "../../src/core/deep-read";
import { parseDeepReadArgs } from "../../src/core/deep-read/cli";

const REACT_NOTE =
  "raw/articles/arxiv/2026-04-10-react-synergizing-reasoning-and-acting-in-language-models.md";

function withTempFile<T>(
  content: string,
  extension: string,
  run: (filePath: string) => Promise<T>,
): Promise<T> {
  const directory = mkdtempSync(join(tmpdir(), "ai-research-kb-deep-read-"));
  const filePath = join(directory, `fixture${extension}`);
  writeFileSync(filePath, content);
  return run(filePath).finally(() => {
    rmSync(directory, { recursive: true, force: true });
  });
}

describe("deep read", () => {
  test("parseDeepReadArgs parses repeated sources and focus areas", () => {
    const args = parseDeepReadArgs([
      "--source",
      REACT_NOTE,
      "--source",
      "2026-04-10-webarena-a-realistic-web-environment-for-building-autonomous-agents",
      "--focus",
      "method, evals, failure modes",
      "--collection",
      "paper-notes",
      "--dry-run",
      "--no-refresh",
    ]);

    expect(args.source).toEqual([
      REACT_NOTE,
      "2026-04-10-webarena-a-realistic-web-environment-for-building-autonomous-agents",
    ]);
    expect(args.focus).toEqual(["method", "evals", "failure modes"]);
    expect(args.collection).toBe("paper-notes");
    expect(args.dryRun).toBe(true);
    expect(args.noRefresh).toBe(true);
  });

  test("createDeepRead dry-run renders a selective summary note", async () => {
    await withTempFile(
      `# ReAct method notes

The method section emphasizes alternating reasoning traces with external actions instead of treating them as separate prompting strategies.

- The evaluation compares question answering, fact verification, and interactive decision-making tasks.
- The framing is useful for planner executor systems because it keeps plan revision inside the action loop.
`,
      ".md",
      async (filePath) => {
        const result = await createDeepRead({
          source: [REACT_NOTE],
          file: filePath,
          focus: ["method", "evals"],
          dryRun: true,
          stdout: false,
          noRefresh: false,
        });

        expect(result.outputPath).toBeUndefined();
        expect(result.refreshed).toBe(false);
        expect(result.note.sourcePaths).toEqual([REACT_NOTE]);
        expect(result.markdown).toContain("## Source Notes");
        expect(result.markdown).toContain(
          "- [[2026-04-10-react-synergizing-reasoning-and-acting-in-language-models]]",
        );
        expect(result.markdown).toContain("## Deep-Read Evidence");
        expect(result.markdown).toContain("alternating reasoning traces with external actions");
      },
    );
  });
});
