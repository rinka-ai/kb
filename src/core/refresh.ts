import { buildHealthReport, writeHealthArtifacts } from "./health";
import { buildIndex, writeIndex } from "./indexer";
import { collectKbWarnings } from "./lint";
import type { KbIndex } from "./types";

export interface RefreshResponse {
  index: KbIndex;
  warnings: string[];
  health: ReturnType<typeof buildHealthReport>;
  artifacts: {
    jsonPath: string;
    markdownPath: string;
  };
}

export function refreshKb(): RefreshResponse {
  const index = buildIndex();
  writeIndex(index);
  const health = buildHealthReport({
    limit: 10,
    minConceptSources: 2,
    minTagOccurrences: 2,
    rebuildIfStale: false,
  });
  const artifacts = writeHealthArtifacts(health);
  return { index, warnings: collectKbWarnings(), health, artifacts };
}

export function formatRefreshResults(response: RefreshResponse): string {
  const summary = `Built KB index with ${response.index.chunk_count} chunks from ${response.index.file_count} markdown files.`;
  const healthSummary = `KB health: review_backlog=${response.health.review.reviewBacklogCount} stale_wiki=${response.health.review.staleWikiCount} uncovered_tags=${response.health.maintenance.uncoveredTagCount}.`;
  const artifactSummary = `Wrote health artifacts to ${response.artifacts.jsonPath} and ${response.artifacts.markdownPath}.`;

  if (response.warnings.length === 0) {
    return [summary, healthSummary, artifactSummary, "KB refresh complete."].join("\n");
  }

  return [
    summary,
    healthSummary,
    artifactSummary,
    "KB lint warnings:",
    ...response.warnings.map((w) => `- ${w}`),
    `\nTotal warnings: ${response.warnings.length}`,
    "KB refresh complete with lint warnings.",
  ].join("\n");
}

export function main(): number {
  const response = refreshKb();
  console.log(formatRefreshResults(response));
  return 0;
}
