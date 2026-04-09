import { buildIndex, writeIndex } from "./indexer";
import { collectKbWarnings } from "./lint";
import type { KbIndex } from "./types";

export interface RefreshResponse {
  index: KbIndex;
  warnings: string[];
}

export function refreshKb(): RefreshResponse {
  const index = buildIndex();
  writeIndex(index);
  return { index, warnings: collectKbWarnings() };
}

export function formatRefreshResults(response: RefreshResponse): string {
  const summary = `Built KB index with ${response.index.chunk_count} chunks from ${response.index.file_count} markdown files.`;

  if (response.warnings.length === 0) {
    return [summary, "KB refresh complete."].join("\n");
  }

  return [
    summary,
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
