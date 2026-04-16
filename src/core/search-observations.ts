import { appendFileSync, existsSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { Command } from "commander";
import { OUTPUT_DIR } from "./paths";
import type { SearchResponse, SearchResult } from "./search";

export interface SearchObservationRequestMeta {
  transport: "http";
  requestId: string;
  sessionId?: string;
  clientHash?: string;
  userAgent?: string;
  receivedAt: string;
}

export interface SearchObservationResult {
  rank: number;
  path: string;
  score: number;
  type: string;
  section: string;
  exactMatchCount: number;
  expandedMatchCount: number;
  exactTitleMatchCount: number;
  exactCanonicalMatchCount: number;
  exactTagMatchCount: number;
  fuzzyOnly: boolean;
}

export interface SearchObservation {
  observedAt: string;
  tool: "kb_search" | "kb_search_file";
  rawQuery?: string;
  queryText: string;
  contextLabel?: string;
  filePathProvided: boolean;
  textBytes?: number;
  includeSuperseded: boolean;
  top: number;
  rebuildIfStale: boolean;
  exactTerms: string[];
  expandedTerms: string[];
  results: SearchObservationResult[];
  resultCount: number;
  zeroResults: boolean;
  top1Path?: string;
  top1Score?: number;
  top1FuzzyOnly: boolean;
  top12ScoreGap: number | null;
  request: SearchObservationRequestMeta;
}

export interface RecordSearchObservationArgs {
  request: SearchObservationRequestMeta;
  tool: SearchObservation["tool"];
  response: SearchResponse;
  rawQuery?: string;
  contextLabel?: string;
  filePathProvided?: boolean;
  textBytes?: number;
  top: number;
  rebuildIfStale: boolean;
  includeSuperseded: boolean;
  logPath?: string;
}

export interface SearchObservationIssueSummary {
  query: string;
  count: number;
  lastSeen: string;
  exampleTop1Path?: string;
  distinctTop1PathCount: number;
}

export interface FileSearchObservationSummary {
  label: string;
  count: number;
  lastSeen: string;
}

export interface SearchObservationReport {
  totalObservations: number;
  kbSearchCount: number;
  kbSearchFileCount: number;
  uniqueQueryCount: number;
  frequentQueries: SearchObservationIssueSummary[];
  zeroResultQueries: SearchObservationIssueSummary[];
  fuzzyTop1Queries: SearchObservationIssueSummary[];
  lowConfidenceQueries: SearchObservationIssueSummary[];
  ambiguousQueries: SearchObservationIssueSummary[];
  fileContextLabels: FileSearchObservationSummary[];
}

export interface SearchObservationReportArgs {
  limit: number;
  minCount: number;
  maxTopScoreGap: number;
}

interface SearchObservationReportCliArgs extends SearchObservationReportArgs {
  json: boolean;
  logPath: string;
}

export const DEFAULT_SEARCH_OBSERVATION_REPORT_LIMIT = 10;
export const DEFAULT_SEARCH_OBSERVATION_REPORT_MIN_COUNT = 2;
export const DEFAULT_SEARCH_OBSERVATION_REPORT_MAX_TOP_SCORE_GAP = 1.5;
export const DEFAULT_SEARCH_OBSERVATION_LOG_PATH = join(
  OUTPUT_DIR,
  "telemetry",
  "search-observations.ndjson",
);

function uniqueStrings(items: string[]): string[] {
  const seen = new Set<string>();
  const result: string[] = [];

  for (const item of items.map((value) => value.trim()).filter(Boolean)) {
    const key = item.toLowerCase();
    if (seen.has(key)) {
      continue;
    }
    seen.add(key);
    result.push(item);
  }

  return result;
}

function observationResults(results: SearchResult[]): SearchObservationResult[] {
  return results.slice(0, 5).map((result, index) => ({
    rank: index + 1,
    path: result.path,
    score: result.score,
    type: result.type,
    section: result.section,
    exactMatchCount: result.exact_match_count,
    expandedMatchCount: result.expanded_match_count,
    exactTitleMatchCount: result.exact_title_match_count,
    exactCanonicalMatchCount: result.exact_canonical_match_count,
    exactTagMatchCount: result.exact_tag_match_count,
    fuzzyOnly: result.fuzzy_only,
  }));
}

export function createSearchObservation(
  args: Omit<RecordSearchObservationArgs, "logPath">,
): SearchObservation {
  const results = observationResults(args.response.results);
  const top1 = results[0];
  const top2 = results[1];

  return {
    observedAt: new Date().toISOString(),
    tool: args.tool,
    rawQuery: args.rawQuery?.trim() || undefined,
    queryText: args.response.query,
    contextLabel: args.contextLabel?.trim() || args.response.contextLabel || undefined,
    filePathProvided: args.filePathProvided ?? false,
    textBytes: args.textBytes,
    includeSuperseded: args.includeSuperseded,
    top: args.top,
    rebuildIfStale: args.rebuildIfStale,
    exactTerms: uniqueStrings(args.response.exactTerms),
    expandedTerms: uniqueStrings(args.response.expandedTerms),
    results,
    resultCount: args.response.results.length,
    zeroResults: args.response.results.length === 0,
    top1Path: top1?.path,
    top1Score: top1?.score,
    top1FuzzyOnly: top1?.fuzzyOnly ?? false,
    top12ScoreGap: top1 && top2 ? Number((top1.score - top2.score).toFixed(3)) : null,
    request: args.request,
  };
}

export function resolveSearchObservationLogPath(override?: string): string {
  return resolve(
    override ?? process.env.KB_SEARCH_OBSERVATION_LOG_PATH ?? DEFAULT_SEARCH_OBSERVATION_LOG_PATH,
  );
}

export function appendSearchObservation(observation: SearchObservation, logPath?: string): string {
  const targetPath = resolveSearchObservationLogPath(logPath);
  mkdirSync(dirname(targetPath), { recursive: true });
  appendFileSync(targetPath, `${JSON.stringify(observation)}\n`, "utf-8");
  return targetPath;
}

export function recordSearchObservation(args: RecordSearchObservationArgs): string {
  return appendSearchObservation(createSearchObservation(args), args.logPath);
}

export function loadSearchObservations(logPath?: string): SearchObservation[] {
  const targetPath = resolveSearchObservationLogPath(logPath);
  if (!existsSync(targetPath)) {
    return [];
  }

  return readFileSync(targetPath, "utf-8")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .flatMap((line) => {
      try {
        return [JSON.parse(line) as SearchObservation];
      } catch {
        return [];
      }
    });
}

function normalizeQuery(query: string): string {
  return query.trim().toLowerCase().replace(/\s+/g, " ");
}

function summaryFromEntries(entries: SearchObservation[]): SearchObservationIssueSummary {
  const top1Paths = uniqueStrings(
    entries.flatMap((entry) => (entry.top1Path ? [entry.top1Path] : [])),
  );
  const sample = entries.at(-1);

  return {
    query: sample?.rawQuery?.trim() || sample?.queryText || "",
    count: entries.length,
    lastSeen: sample?.observedAt || "",
    exampleTop1Path: top1Paths[0],
    distinctTop1PathCount: top1Paths.length,
  };
}

export function isLowConfidenceObservation(
  observation: SearchObservation,
  maxTopScoreGap = DEFAULT_SEARCH_OBSERVATION_REPORT_MAX_TOP_SCORE_GAP,
): boolean {
  return (
    !observation.zeroResults &&
    (observation.top1FuzzyOnly ||
      (observation.top12ScoreGap != null && observation.top12ScoreGap <= maxTopScoreGap))
  );
}

export function buildSearchObservationReport(
  observations: SearchObservation[],
  args: SearchObservationReportArgs,
): SearchObservationReport {
  const kbSearches = observations.filter((entry) => entry.tool === "kb_search");
  const groupedQueries = kbSearches.reduce<Map<string, SearchObservation[]>>((acc, entry) => {
    const rawQuery = entry.rawQuery?.trim();
    if (!rawQuery) {
      return acc;
    }

    const key = normalizeQuery(rawQuery);
    const existing = acc.get(key) ?? [];
    existing.push(entry);
    acc.set(
      key,
      existing.sort((a, b) => a.observedAt.localeCompare(b.observedAt)),
    );
    return acc;
  }, new Map());

  const summarize = (predicate: (entries: SearchObservation[]) => boolean) =>
    [...groupedQueries.values()]
      .filter((entries) => entries.length >= args.minCount && predicate(entries))
      .map(summaryFromEntries)
      .sort((a, b) => b.count - a.count || b.lastSeen.localeCompare(a.lastSeen))
      .slice(0, args.limit);

  const fileContextLabels = observations
    .filter((entry) => entry.tool === "kb_search_file" && entry.contextLabel)
    .reduce<Map<string, SearchObservation[]>>((acc, entry) => {
      const key = entry.contextLabel?.trim() ?? "";
      if (!key) {
        return acc;
      }

      const existing = acc.get(key) ?? [];
      existing.push(entry);
      acc.set(
        key,
        existing.sort((a, b) => a.observedAt.localeCompare(b.observedAt)),
      );
      return acc;
    }, new Map());

  return {
    totalObservations: observations.length,
    kbSearchCount: kbSearches.length,
    kbSearchFileCount: observations.filter((entry) => entry.tool === "kb_search_file").length,
    uniqueQueryCount: groupedQueries.size,
    frequentQueries: [...groupedQueries.values()]
      .filter((entries) => entries.length >= args.minCount)
      .map(summaryFromEntries)
      .sort((a, b) => b.count - a.count || b.lastSeen.localeCompare(a.lastSeen))
      .slice(0, args.limit),
    zeroResultQueries: summarize((entries) => entries.some((entry) => entry.zeroResults)),
    fuzzyTop1Queries: summarize((entries) => entries.some((entry) => entry.top1FuzzyOnly)),
    lowConfidenceQueries: summarize((entries) =>
      entries.some((entry) => isLowConfidenceObservation(entry, args.maxTopScoreGap)),
    ),
    ambiguousQueries: summarize(
      (entries) => summaryFromEntries(entries).distinctTop1PathCount >= 2,
    ),
    fileContextLabels: [...fileContextLabels.entries()]
      .map(([label, entries]) => ({
        label,
        count: entries.length,
        lastSeen: entries.at(-1)?.observedAt ?? "",
      }))
      .sort((a, b) => b.count - a.count || b.lastSeen.localeCompare(a.lastSeen))
      .slice(0, args.limit),
  };
}

export function formatSearchObservationReport(report: SearchObservationReport): string {
  const formatIssues = (title: string, entries: SearchObservationIssueSummary[]): string[] => {
    const body =
      entries.length > 0
        ? entries.map(
            (entry) =>
              `- ${entry.query} count=${entry.count} distinct_top1=${entry.distinctTop1PathCount} last_seen=${entry.lastSeen}${
                entry.exampleTop1Path ? ` top1=${entry.exampleTop1Path}` : ""
              }`,
          )
        : ["- none"];

    return [title, ...body];
  };

  return [
    "KB search observation report",
    `total_observations=${report.totalObservations} kb_search=${report.kbSearchCount} kb_search_file=${report.kbSearchFileCount} unique_queries=${report.uniqueQueryCount}`,
    "",
    ...formatIssues("Frequent queries", report.frequentQueries),
    "",
    ...formatIssues("Zero-result queries", report.zeroResultQueries),
    "",
    ...formatIssues("Fuzzy top-1 queries", report.fuzzyTop1Queries),
    "",
    ...formatIssues("Low-confidence queries", report.lowConfidenceQueries),
    "",
    ...formatIssues("Ambiguous queries", report.ambiguousQueries),
    "",
    "File-context labels",
    ...(report.fileContextLabels.length > 0
      ? report.fileContextLabels.map(
          (entry) => `- ${entry.label} count=${entry.count} last_seen=${entry.lastSeen}`,
        )
      : ["- none"]),
  ].join("\n");
}

const reportCommand = new Command("search-report")
  .description("Summarize remote KB search observations captured from HTTP MCP usage.")
  .option("--json", "Output the report as JSON")
  .option("--log-path <path>", "Path to the search observation NDJSON log")
  .option(
    "--limit <n>",
    "Maximum items per section",
    String(DEFAULT_SEARCH_OBSERVATION_REPORT_LIMIT),
  )
  .option(
    "--min-count <n>",
    "Minimum repeated observations before a query is considered interesting",
    String(DEFAULT_SEARCH_OBSERVATION_REPORT_MIN_COUNT),
  )
  .option(
    "--max-top-score-gap <n>",
    "Treat top-1/top-2 score gaps at or below this value as low-confidence",
    String(DEFAULT_SEARCH_OBSERVATION_REPORT_MAX_TOP_SCORE_GAP),
  );

function parseArgs(argv: string[]): SearchObservationReportCliArgs {
  reportCommand.parse(argv, { from: "user" });
  const opts = reportCommand.opts();
  return {
    json: opts.json ?? false,
    logPath: resolveSearchObservationLogPath(opts.logPath),
    limit: Number(opts.limit),
    minCount: Number(opts.minCount),
    maxTopScoreGap: Number(opts.maxTopScoreGap),
  };
}

export function main(argv = process.argv.slice(2)): number {
  const args = parseArgs(argv);
  const observations = loadSearchObservations(args.logPath);
  const report = buildSearchObservationReport(observations, args);

  if (args.json) {
    console.log(JSON.stringify(report, null, 2));
    return 0;
  }

  console.log(formatSearchObservationReport(report));
  return 0;
}
