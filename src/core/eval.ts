import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { Command } from "commander";
import { ROOT } from "./paths";
import { searchKb } from "./search";

export interface SearchEvalCase {
  id: string;
  query: string;
  preferredPaths: string[];
  relevantPaths: string[];
  forbiddenPaths?: string[];
  minPrecisionAt3?: number;
  maxPreferredRank?: number;
  notes?: string;
}

export interface SearchEvalCaseResult {
  id: string;
  query: string;
  preferredRank: number | null;
  firstRelevantRank: number | null;
  precisionAt3: number;
  minPrecisionAt3: number;
  maxPreferredRank: number | null;
  forbiddenHits: string[];
  topPaths: string[];
  passed: boolean;
  notes?: string;
}

export interface SearchEvalMetrics {
  preferredHitAt1: number;
  relevantHitAt3: number;
  relevantHitAt5: number;
  mrrPreferred: number;
  precisionAt3: number;
}

export interface SearchEvalReport {
  generatedAt: string;
  datasetPath: string;
  totalCases: number;
  metrics: SearchEvalMetrics;
  cases: SearchEvalCaseResult[];
  failures: SearchEvalCaseResult[];
}

interface EvalArgs {
  dataset: string;
  top: number;
  json: boolean;
  rebuildIfStale: boolean;
  includeSuperseded: boolean;
}

const DEFAULT_DATASET = resolve(ROOT, "evals", "search-gold.json");

function rankForAny(paths: string[], acceptedPaths: string[]): number | null {
  if (acceptedPaths.length === 0) {
    return null;
  }

  const accepted = new Set(acceptedPaths);
  const index = paths.findIndex((path) => accepted.has(path));
  return index >= 0 ? index + 1 : null;
}

export function evaluateRetrievedPaths(
  topPaths: string[],
  testCase: SearchEvalCase,
): SearchEvalCaseResult {
  const preferredRank = rankForAny(topPaths, testCase.preferredPaths);
  const firstRelevantRank = rankForAny(topPaths, testCase.relevantPaths);
  const minPrecisionAt3 = testCase.minPrecisionAt3 ?? 0.333;
  const maxPreferredRank = testCase.maxPreferredRank ?? null;
  const precisionAt3 =
    topPaths.slice(0, 3).filter((path) => testCase.relevantPaths.includes(path)).length /
    Math.max(Math.min(topPaths.length, 3), 1);
  const roundedPrecisionAt3 = Number(precisionAt3.toFixed(3));
  const forbidden = new Set(testCase.forbiddenPaths ?? []);
  const forbiddenHits = topPaths.filter((path) => forbidden.has(path));
  const preferredSatisfied =
    maxPreferredRank == null || (preferredRank != null && preferredRank <= maxPreferredRank);

  return {
    id: testCase.id,
    query: testCase.query,
    preferredRank,
    firstRelevantRank,
    precisionAt3: roundedPrecisionAt3,
    minPrecisionAt3,
    maxPreferredRank,
    forbiddenHits,
    topPaths,
    passed:
      (firstRelevantRank ?? Number.POSITIVE_INFINITY) <= 3 &&
      roundedPrecisionAt3 >= minPrecisionAt3 &&
      preferredSatisfied &&
      forbiddenHits.length === 0,
    notes: testCase.notes,
  };
}

export function summarizeEvalResults(results: SearchEvalCaseResult[]): SearchEvalMetrics {
  const total = Math.max(results.length, 1);
  const preferredHitAt1 =
    results.filter((result) => (result.preferredRank ?? Number.POSITIVE_INFINITY) <= 1).length /
    total;
  const relevantHitAt3 =
    results.filter((result) => (result.firstRelevantRank ?? Number.POSITIVE_INFINITY) <= 3).length /
    total;
  const relevantHitAt5 =
    results.filter((result) => (result.firstRelevantRank ?? Number.POSITIVE_INFINITY) <= 5).length /
    total;
  const mrrPreferred =
    results.reduce(
      (sum, result) => sum + (result.preferredRank ? 1 / result.preferredRank : 0),
      0,
    ) / total;
  const precisionAt3 = results.reduce((sum, result) => sum + result.precisionAt3, 0) / total;

  return {
    preferredHitAt1: Number(preferredHitAt1.toFixed(3)),
    relevantHitAt3: Number(relevantHitAt3.toFixed(3)),
    relevantHitAt5: Number(relevantHitAt5.toFixed(3)),
    mrrPreferred: Number(mrrPreferred.toFixed(3)),
    precisionAt3: Number(precisionAt3.toFixed(3)),
  };
}

export function loadSearchEvalDataset(filePath: string): SearchEvalCase[] {
  const payload = JSON.parse(readFileSync(filePath, "utf-8")) as unknown;
  if (!Array.isArray(payload)) {
    throw new Error(`Eval dataset must be a JSON array: ${filePath}`);
  }

  return payload.map((entry, index) => {
    if (typeof entry !== "object" || !entry) {
      throw new Error(`Invalid eval case at index ${index}`);
    }

    const value = entry as Record<string, unknown>;
    const id =
      typeof value.id === "string" && value.id.trim() ? value.id.trim() : `case-${index + 1}`;
    const query = typeof value.query === "string" ? value.query.trim() : "";
    const preferredPaths = Array.isArray(value.preferredPaths)
      ? value.preferredPaths.filter(
          (path): path is string => typeof path === "string" && path.length > 0,
        )
      : [];
    const relevantPaths = Array.isArray(value.relevantPaths)
      ? value.relevantPaths.filter(
          (path): path is string => typeof path === "string" && path.length > 0,
        )
      : preferredPaths;
    const forbiddenPaths = Array.isArray(value.forbiddenPaths)
      ? value.forbiddenPaths.filter(
          (path): path is string => typeof path === "string" && path.length > 0,
        )
      : undefined;
    const minPrecisionAt3 =
      typeof value.minPrecisionAt3 === "number" && Number.isFinite(value.minPrecisionAt3)
        ? value.minPrecisionAt3
        : undefined;
    const maxPreferredRank =
      typeof value.maxPreferredRank === "number" && Number.isFinite(value.maxPreferredRank)
        ? value.maxPreferredRank
        : undefined;

    if (!query || relevantPaths.length === 0) {
      throw new Error(`Eval case ${id} must include a query and at least one relevant path.`);
    }

    return {
      id,
      query,
      preferredPaths: preferredPaths.length > 0 ? preferredPaths : relevantPaths,
      relevantPaths,
      forbiddenPaths,
      minPrecisionAt3,
      maxPreferredRank,
      notes: typeof value.notes === "string" ? value.notes.trim() : undefined,
    };
  });
}

export function runSearchEval(args: Omit<EvalArgs, "json">): SearchEvalReport {
  const datasetPath = resolve(args.dataset);
  const cases = loadSearchEvalDataset(datasetPath);
  const results = cases.map((testCase) => {
    const search = searchKb({
      query: testCase.query,
      top: args.top,
      json: false,
      rebuildIfStale: args.rebuildIfStale,
      includeSuperseded: args.includeSuperseded,
    });

    return evaluateRetrievedPaths(
      search.results.map((result) => result.path),
      testCase,
    );
  });

  return {
    generatedAt: new Date().toISOString(),
    datasetPath,
    totalCases: cases.length,
    metrics: summarizeEvalResults(results),
    cases: results,
    failures: results.filter((result) => !result.passed),
  };
}

export function formatSearchEvalReport(report: SearchEvalReport): string {
  const lines = [
    `Search eval dataset: ${report.datasetPath}`,
    `Cases: ${report.totalCases}`,
    `preferred_hit@1=${report.metrics.preferredHitAt1}`,
    `relevant_hit@3=${report.metrics.relevantHitAt3}`,
    `relevant_hit@5=${report.metrics.relevantHitAt5}`,
    `mrr_preferred=${report.metrics.mrrPreferred}`,
    `precision@3=${report.metrics.precisionAt3}`,
  ];

  if (report.failures.length === 0) {
    return [...lines, "", "All eval cases passed."].join("\n");
  }

  return [
    ...lines,
    "",
    "Failures",
    ...report.failures
      .slice(0, 12)
      .map((result) =>
        [
          `- ${result.id}: ${result.query}`,
          `  preferred_rank=${result.preferredRank ?? "miss"} relevant_rank=${result.firstRelevantRank ?? "miss"} precision@3=${result.precisionAt3}`,
          `  constraints=min_precision@3:${result.minPrecisionAt3} max_preferred_rank:${result.maxPreferredRank ?? "any"} forbidden_hits:${result.forbiddenHits.join(",") || "none"}`,
          `  top_paths=${result.topPaths.join(", ")}`,
        ].join("\n"),
      ),
  ].join("\n");
}

const evalCommand = new Command("eval")
  .description("Run KB retrieval evals against a gold dataset.")
  .option("--dataset <path>", "Path to the eval dataset JSON file", DEFAULT_DATASET)
  .option("--top <n>", "Number of ranked results to inspect per query", "5")
  .option("--json", "Output the full eval report as JSON")
  .option("--no-rebuild-if-stale", "Skip automatic index rebuild")
  .option("--include-superseded", "Include superseded notes while scoring");

function parseArgs(argv: string[]): EvalArgs {
  evalCommand.parse(argv, { from: "user" });
  const opts = evalCommand.opts();
  return {
    dataset: opts.dataset,
    top: Number(opts.top),
    json: opts.json ?? false,
    rebuildIfStale: opts.rebuildIfStale,
    includeSuperseded: opts.includeSuperseded ?? false,
  };
}

export function main(argv = process.argv.slice(2)): number {
  const args = parseArgs(argv);
  const report = runSearchEval(args);

  if (args.json) {
    console.log(JSON.stringify(report, null, 2));
    return 0;
  }

  console.log(formatSearchEvalReport(report));
  return report.failures.length === 0 ? 0 : 1;
}
