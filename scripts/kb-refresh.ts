#!/usr/bin/env bun

import { type KbIndex, buildIndex, writeIndex } from "./kb-lib";
import { collectKbWarnings } from "./kb-lint";

export interface RefreshResponse {
  index: KbIndex;
  warnings: string[];
}

export function refreshKb(): RefreshResponse {
  const index = buildIndex();
  writeIndex(index);
  const warnings = collectKbWarnings();
  return { index, warnings };
}

export function formatRefreshResults(response: RefreshResponse): string {
  const lines = [
    `Built KB index with ${response.index.chunk_count} chunks from ${response.index.file_count} markdown files.`,
  ];

  if (response.warnings.length === 0) {
    lines.push("KB refresh complete.");
    return lines.join("\n");
  }

  lines.push("KB lint warnings:");
  for (const warning of response.warnings) {
    lines.push(`- ${warning}`);
  }
  lines.push(`\nTotal warnings: ${response.warnings.length}`);
  lines.push("KB refresh complete with lint warnings.");
  return lines.join("\n");
}

export function main(): number {
  const response = refreshKb();
  console.log(formatRefreshResults(response));
  return 0;
}

if (import.meta.main) {
  process.exit(main());
}
