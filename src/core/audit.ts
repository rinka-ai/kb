import { Command } from "commander";
import {
  DEFAULT_SEARCH_EVAL_DATASET,
  formatSearchEvalReport,
  runSearchEval,
  type SearchEvalReport,
} from "./eval";
import { type RefreshResponse, refreshKb } from "./refresh";
import {
  buildSearchObservationReport,
  DEFAULT_SEARCH_OBSERVATION_REPORT_LIMIT,
  DEFAULT_SEARCH_OBSERVATION_REPORT_MAX_TOP_SCORE_GAP,
  DEFAULT_SEARCH_OBSERVATION_REPORT_MIN_COUNT,
  formatSearchObservationReport,
  loadSearchObservations,
  resolveSearchObservationLogPath,
  type SearchObservationReport,
} from "./search-observations";

export interface AuditArgs {
  dataset: string;
  top: number;
  json: boolean;
  includeSuperseded: boolean;
  searchLogPath: string;
  searchReportLimit: number;
  searchReportMinCount: number;
  maxTopScoreGap: number;
}

export interface KbAuditReport {
  generatedAt: string;
  passed: boolean;
  refresh: AuditRefreshSummary;
  searchObservations: SearchObservationReport;
  eval: SearchEvalReport;
  recommendedActions: string[];
}

export interface AuditRefreshSummary {
  index: {
    fileCount: number;
    chunkCount: number;
    generatedAt: string;
  };
  warnings: string[];
  health: RefreshResponse["health"];
  artifacts: RefreshResponse["artifacts"];
}

function summarizeRefresh(refresh: RefreshResponse): AuditRefreshSummary {
  return {
    index: {
      fileCount: refresh.index.file_count,
      chunkCount: refresh.index.chunk_count,
      generatedAt: refresh.index.generated_at,
    },
    warnings: refresh.warnings,
    health: refresh.health,
    artifacts: refresh.artifacts,
  };
}

function recommendedActions(
  refresh: AuditRefreshSummary,
  searchObservations: SearchObservationReport,
  evalReport: SearchEvalReport,
): string[] {
  const actions = [...refresh.health.gapReport.suggestedActions];

  if (refresh.warnings.length > 0) {
    actions.push("Fix lint warnings before relying on this KB snapshot.");
  }
  if (evalReport.failures.length > 0) {
    actions.push("Review failed retrieval evals before changing the ranking model.");
  }
  if (searchObservations.zeroResultQueries.length > 0) {
    actions.push("Add aliases, concepts, or source coverage for repeated zero-result searches.");
  }
  if (searchObservations.lowConfidenceQueries.length > 0) {
    actions.push("Inspect low-confidence search observations for alias or canonical-page drift.");
  }
  if (searchObservations.kbSearchFileCount === 0) {
    actions.push(
      "Exercise `kb_search_file` against real file contexts so file-context retrieval is observed.",
    );
  }

  return [...new Set(actions)];
}

export function runKbAudit(args: Omit<AuditArgs, "json">): KbAuditReport {
  const refresh = summarizeRefresh(refreshKb());
  const searchObservations = buildSearchObservationReport(
    loadSearchObservations(args.searchLogPath),
    {
      limit: args.searchReportLimit,
      minCount: args.searchReportMinCount,
      maxTopScoreGap: args.maxTopScoreGap,
    },
  );
  const evalReport = runSearchEval({
    dataset: args.dataset,
    top: args.top,
    rebuildIfStale: false,
    includeSuperseded: args.includeSuperseded,
  });

  return {
    generatedAt: new Date().toISOString(),
    passed: refresh.warnings.length === 0 && evalReport.failures.length === 0,
    refresh,
    searchObservations,
    eval: evalReport,
    recommendedActions: recommendedActions(refresh, searchObservations, evalReport),
  };
}

export function formatKbAuditReport(report: KbAuditReport): string {
  const health = report.refresh.health;
  const lines = [
    "KB audit report",
    `generated_at=${report.generatedAt} passed=${report.passed}`,
    `index_files=${report.refresh.index.fileCount} index_chunks=${report.refresh.index.chunkCount}`,
    `health review_backlog=${health.review.reviewBacklogCount} stale_wiki=${health.review.staleWikiCount} thin_concepts=${health.maintenance.thinConceptCount} uncovered_tags=${health.maintenance.uncoveredTagCount}`,
    `search_observations total=${report.searchObservations.totalObservations} low_confidence=${report.searchObservations.lowConfidenceQueries.length} zero_results=${report.searchObservations.zeroResultQueries.length}`,
    `eval cases=${report.eval.totalCases} failures=${report.eval.failures.length} preferred_hit@1=${report.eval.metrics.preferredHitAt1} relevant_hit@3=${report.eval.metrics.relevantHitAt3}`,
    "",
    formatSearchObservationReport(report.searchObservations),
    "",
    formatSearchEvalReport(report.eval),
    "",
    "Recommended actions",
    ...(report.recommendedActions.length > 0
      ? report.recommendedActions.map((action) => `- ${action}`)
      : ["- none"]),
  ];

  return lines.join("\n");
}

const auditCommand = new Command("audit")
  .description("Run the combined KB maintenance, telemetry, and retrieval-quality audit.")
  .option("--json", "Output the full audit report as JSON")
  .option("--dataset <path>", "Path to the retrieval eval dataset", DEFAULT_SEARCH_EVAL_DATASET)
  .option("--top <n>", "Number of ranked results to inspect per eval query", "5")
  .option("--include-superseded", "Include superseded notes while scoring evals")
  .option("--search-log-path <path>", "Path to the search observation NDJSON log")
  .option(
    "--search-report-limit <n>",
    "Maximum search-observation items per section",
    String(DEFAULT_SEARCH_OBSERVATION_REPORT_LIMIT),
  )
  .option(
    "--search-report-min-count <n>",
    "Minimum repeated observations before a query is considered interesting",
    String(DEFAULT_SEARCH_OBSERVATION_REPORT_MIN_COUNT),
  )
  .option(
    "--max-top-score-gap <n>",
    "Treat top-1/top-2 score gaps at or below this value as low-confidence",
    String(DEFAULT_SEARCH_OBSERVATION_REPORT_MAX_TOP_SCORE_GAP),
  );

function parseArgs(argv: string[]): AuditArgs {
  auditCommand.parse(argv, { from: "user" });
  const opts = auditCommand.opts();
  return {
    json: opts.json ?? false,
    dataset: opts.dataset,
    top: Number(opts.top),
    includeSuperseded: opts.includeSuperseded ?? false,
    searchLogPath: resolveSearchObservationLogPath(opts.searchLogPath),
    searchReportLimit: Number(opts.searchReportLimit),
    searchReportMinCount: Number(opts.searchReportMinCount),
    maxTopScoreGap: Number(opts.maxTopScoreGap),
  };
}

export function main(argv = process.argv.slice(2)): number {
  const args = parseArgs(argv);
  const report = runKbAudit(args);

  if (args.json) {
    console.log(JSON.stringify(report, null, 2));
  } else {
    console.log(formatKbAuditReport(report));
  }

  return report.passed ? 0 : 1;
}
