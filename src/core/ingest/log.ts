import { appendFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { ROOT } from "../paths";

const WIKI_LOG_PATH = join(ROOT, "wiki", "log.md");

interface IngestLogEntry {
  notePath: string;
  title: string;
  chunkCount?: number;
}

export function appendIngestLog(entry: IngestLogEntry): void {
  if (!existsSync(WIKI_LOG_PATH)) return;

  const date = new Date().toISOString().slice(0, 10);
  const safeTitle = entry.title.replace(/\s+/g, " ").trim();
  const indexLine =
    entry.chunkCount !== undefined
      ? `- Index rebuilt: ${entry.chunkCount} chunks.`
      : "- Index not rebuilt this run (`--no-refresh`).";

  const block = `\n## [${date}] ingest | ${safeTitle}\n- Source note: \`${entry.notePath}\`\n${indexLine}\n`;
  appendFileSync(WIKI_LOG_PATH, block);
}
