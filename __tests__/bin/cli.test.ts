import { describe, expect, test } from "bun:test";
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { runBunCommand } from "../helpers/bun-process";

const CLI_INTEGRATION_TIMEOUT_MS = 20_000;

function withTempFile<T>(
  content: string,
  extension: string,
  run: (filePath: string) => Promise<T>,
): Promise<T> {
  const directory = mkdtempSync(join(tmpdir(), "ai-research-kb-cli-"));
  const filePath = join(directory, `fixture${extension}`);
  writeFileSync(filePath, content);
  return run(filePath).finally(() => {
    rmSync(directory, { recursive: true, force: true });
  });
}

describe("CLI integration", () => {
  test(
    "build and lint commands succeed",
    async () => {
      const build = await runBunCommand(["bin/build.ts"]);
      expect(build.code).toBe(0);
      expect(`${build.stdout}${build.stderr}`).toContain("Built KB index with");

      const lint = await runBunCommand(["bin/lint.ts"]);
      expect(lint.code).toBe(0);
      expect(`${lint.stdout}${lint.stderr}`).toContain("KB lint passed with no warnings.");
    },
    CLI_INTEGRATION_TIMEOUT_MS,
  );

  test(
    "eval command runs successfully against a small dataset",
    async () => {
      await withTempFile(
        JSON.stringify([
          {
            id: "llm-kb-smoke",
            query: "LLM Knowledge Bases",
            preferredPaths: ["raw/articles/2026-04-08-llm-knowledge-bases.md"],
            relevantPaths: ["raw/articles/2026-04-08-llm-knowledge-bases.md"],
          },
        ]),
        ".json",
        async (datasetPath) => {
          const evalRun = await runBunCommand([
            "bin/eval.ts",
            "--dataset",
            datasetPath,
            "--top",
            "3",
          ]);

          expect(evalRun.code).toBe(0);
          expect(`${evalRun.stdout}${evalRun.stderr}`).toContain("Search eval dataset:");
        },
      );
    },
    CLI_INTEGRATION_TIMEOUT_MS,
  );

  test("report command runs successfully", async () => {
    const report = await runBunCommand(["bin/report.ts"]);
    expect(report.code).toBe(0);
    expect(`${report.stdout}${report.stderr}`).toContain("KB health report");
  });

  test(
    "refresh respects KB_CACHE_DIR for hosted-style writable caches",
    async () => {
      const cacheDir = mkdtempSync(join(tmpdir(), "ai-research-kb-cache-"));

      try {
        const refresh = await runBunCommand(["bin/refresh.ts"], {
          KB_CACHE_DIR: cacheDir,
        });

        expect(refresh.code).toBe(0);
        expect(`${refresh.stdout}${refresh.stderr}`).toContain("Built KB index with");
        expect(existsSync(join(cacheDir, "index.json"))).toBe(true);
      } finally {
        rmSync(cacheDir, { recursive: true, force: true });
      }
    },
    CLI_INTEGRATION_TIMEOUT_MS,
  );

  test(
    "search returns relevant results for query and file context",
    async () => {
      const query = await runBunCommand(
        ["bin/search.ts", "--query", "LLM Knowledge Bases", "--top", "3"],
        {
          KB_SEARCH_TELEMETRY_ENABLED: "false",
        },
      );
      expect(query.code).toBe(0);
      expect(query.stdout).toContain("raw/articles/2026-04-08-llm-knowledge-bases.md");

      await withTempFile(
        "managed agents context engineering sandboxing\n",
        ".ts",
        async (filePath) => {
          const contextual = await runBunCommand(
            ["bin/search.ts", "--file", filePath, "--top", "3"],
            {
              KB_SEARCH_TELEMETRY_ENABLED: "false",
            },
          );
          expect(contextual.code).toBe(0);
          expect(contextual.stdout).toContain(
            "raw/articles/anthropic-engineering/2026-04-09-scaling-managed-agents-decoupling-the-brain-from-the-hands.md",
          );
        },
      );
    },
    CLI_INTEGRATION_TIMEOUT_MS,
  );

  test("search writes local telemetry to a configured log path", async () => {
    const directory = mkdtempSync(join(tmpdir(), "ai-research-kb-search-log-"));
    const logPath = join(directory, "local-search-observations.ndjson");

    try {
      const result = await runBunCommand(
        ["bin/search.ts", "--query", "nonexistenttelemetrygap qzxqzxqzx", "--top", "3"],
        {
          KB_SEARCH_OBSERVATION_LOG_PATH: logPath,
        },
      );

      expect(result.code).toBe(0);
      const [line] = readFileSync(logPath, "utf-8").trim().split("\n");
      const observation = JSON.parse(line) as {
        rawQuery: string;
        zeroResults: boolean;
        request: { transport: string };
      };

      expect(observation.rawQuery).toBe("nonexistenttelemetrygap qzxqzxqzx");
      expect(observation.zeroResults).toBe(true);
      expect(observation.request.transport).toBe("cli");
    } finally {
      rmSync(directory, { recursive: true, force: true });
    }
  });

  test("ingest dry-run renders the expected source-note schema", async () => {
    await withTempFile(
      `# CLI Integration Fixture

This fixture exercises the CLI ingest command in dry-run mode.

It mentions managed agents, context engineering, and retrieval.
`,
      ".md",
      async (filePath) => {
        const ingest = await runBunCommand([
          "bin/ingest.ts",
          "--file",
          filePath,
          "--collection",
          "cli-smoke",
          "--dry-run",
        ]);

        expect(ingest.code).toBe(0);
        expect(ingest.stdout).toContain('title: "CLI Integration Fixture"');
        expect(ingest.stdout).toContain("path: raw/articles/cli-smoke/");
        expect(ingest.stdout).toContain("## Source Metadata");
        expect(ingest.stdout).toContain("## Source Text");
      },
    );
  });
});
