import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { Command } from "commander";
import { type FindGapsArgs, findKbGaps, type GapReport } from "./gaps";
import { listKbNotes } from "./notes";
import { OUTPUT_DIR } from "./paths";
import { ensureIndex } from "./search";

export interface HealthReport {
  generatedAt: string;
  index: {
    fileCount: number;
    chunkCount: number;
    generatedAt: string;
  };
  corpus: {
    sourceNoteCount: number;
    conceptNoteCount: number;
    summaryNoteCount: number;
    indexNoteCount: number;
    conceptCoverageRatio: number;
  };
  review: {
    reviewBacklogCount: number;
    staleWikiCount: number;
  };
  maintenance: {
    ingestedSourceCount: number;
    thinConceptCount: number;
    uncoveredTagCount: number;
  };
  gapReport: GapReport;
}

interface HealthArgs extends FindGapsArgs {
  rebuildIfStale: boolean;
  json: boolean;
}

const DEFAULT_GAP_ARGS: FindGapsArgs = {
  limit: 10,
  minConceptSources: 2,
  minTagOccurrences: 2,
};

export function buildHealthReport(args: Omit<HealthArgs, "json">): HealthReport {
  const index = ensureIndex(args.rebuildIfStale);
  const notes = listKbNotes();
  const gapReport = findKbGaps(args);
  const sourceNoteCount = notes.filter((note) => note.type === "source").length;
  const conceptNoteCount = notes.filter((note) => note.type === "concept").length;
  const summaryNoteCount = notes.filter((note) => note.type === "summary").length;
  const indexNoteCount = notes.filter((note) => note.type === "index").length;

  return {
    generatedAt: new Date().toISOString(),
    index: {
      fileCount: index.file_count,
      chunkCount: index.chunk_count,
      generatedAt: index.generated_at,
    },
    corpus: {
      sourceNoteCount,
      conceptNoteCount,
      summaryNoteCount,
      indexNoteCount,
      conceptCoverageRatio: Number((conceptNoteCount / Math.max(sourceNoteCount, 1)).toFixed(3)),
    },
    review: {
      reviewBacklogCount: gapReport.reviewBacklogCount,
      staleWikiCount: gapReport.staleWikiNoteCount,
    },
    maintenance: {
      ingestedSourceCount: gapReport.ingestedSourceNoteCount,
      thinConceptCount: gapReport.thinConceptCount,
      uncoveredTagCount: gapReport.uncoveredTagCount,
    },
    gapReport,
  };
}

export function formatHealthReport(report: HealthReport): string {
  return [
    "KB health report",
    `files=${report.index.fileCount} chunks=${report.index.chunkCount} generated_at=${report.index.generatedAt}`,
    `source_notes=${report.corpus.sourceNoteCount} concepts=${report.corpus.conceptNoteCount} summaries=${report.corpus.summaryNoteCount} indexes=${report.corpus.indexNoteCount}`,
    `concept_coverage_ratio=${report.corpus.conceptCoverageRatio}`,
    `review_backlog=${report.review.reviewBacklogCount} stale_wiki=${report.review.staleWikiCount}`,
    `ingested_sources=${report.maintenance.ingestedSourceCount} thin_concepts=${report.maintenance.thinConceptCount} uncovered_tags=${report.maintenance.uncoveredTagCount}`,
    "",
    "Suggested actions",
    ...report.gapReport.suggestedActions.map((action) => `- ${action}`),
  ].join("\n");
}

export function formatHealthMarkdown(report: HealthReport): string {
  return [
    "# KB Health Report",
    "",
    `Generated: ${report.generatedAt}`,
    "",
    "## Index",
    `- Files: ${report.index.fileCount}`,
    `- Chunks: ${report.index.chunkCount}`,
    `- Index generated at: ${report.index.generatedAt}`,
    "",
    "## Corpus",
    `- Source notes: ${report.corpus.sourceNoteCount}`,
    `- Concept pages: ${report.corpus.conceptNoteCount}`,
    `- Summaries: ${report.corpus.summaryNoteCount}`,
    `- Index pages: ${report.corpus.indexNoteCount}`,
    `- Concept coverage ratio: ${report.corpus.conceptCoverageRatio}`,
    "",
    "## Review Health",
    `- Review backlog: ${report.review.reviewBacklogCount}`,
    `- Stale wiki notes: ${report.review.staleWikiCount}`,
    "",
    "## Maintenance",
    `- Ingested sources: ${report.maintenance.ingestedSourceCount}`,
    `- Thin concepts: ${report.maintenance.thinConceptCount}`,
    `- Uncovered tags: ${report.maintenance.uncoveredTagCount}`,
    "",
    "## Suggested Actions",
    ...report.gapReport.suggestedActions.map((action) => `- ${action}`),
  ].join("\n");
}

export function writeHealthArtifacts(report: HealthReport): {
  jsonPath: string;
  markdownPath: string;
} {
  mkdirSync(OUTPUT_DIR, { recursive: true });
  const jsonPath = join(OUTPUT_DIR, "health.json");
  const markdownPath = join(OUTPUT_DIR, "health.md");
  writeFileSync(jsonPath, JSON.stringify(report, null, 2));
  writeFileSync(markdownPath, `${formatHealthMarkdown(report)}\n`);
  return { jsonPath, markdownPath };
}

const healthCommand = new Command("report")
  .description("Build a KB health and maintenance report.")
  .option("--json", "Output the health report as JSON")
  .option("--limit <n>", "Maximum items per gap category", String(DEFAULT_GAP_ARGS.limit))
  .option(
    "--min-concept-sources <n>",
    "Minimum linked source notes expected for a healthy concept page",
    String(DEFAULT_GAP_ARGS.minConceptSources),
  )
  .option(
    "--min-tag-occurrences <n>",
    "Minimum source-tag frequency before an uncovered topic becomes interesting",
    String(DEFAULT_GAP_ARGS.minTagOccurrences),
  )
  .option("--no-rebuild-if-stale", "Skip automatic index rebuild");

function parseArgs(argv: string[]): HealthArgs {
  healthCommand.parse(argv, { from: "user" });
  const opts = healthCommand.opts();
  return {
    json: opts.json ?? false,
    rebuildIfStale: opts.rebuildIfStale,
    limit: Number(opts.limit),
    minConceptSources: Number(opts.minConceptSources),
    minTagOccurrences: Number(opts.minTagOccurrences),
  };
}

export function main(argv = process.argv.slice(2)): number {
  const args = parseArgs(argv);
  const report = buildHealthReport(args);
  writeHealthArtifacts(report);

  if (args.json) {
    console.log(JSON.stringify(report, null, 2));
    return 0;
  }

  console.log(formatHealthReport(report));
  return 0;
}
