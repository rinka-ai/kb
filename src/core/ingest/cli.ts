import { Command } from "commander";
import type { IngestArgs } from "./types";

export const ingestCommand = new Command("ingest")
  .description("Ingest a new article into the KB")
  .option("--url <url>", "Remote URL to ingest")
  .option("--file <path>", "Local markdown, text, or html file to ingest")
  .option("--collection <name>", "Subdirectory under raw/articles/")
  .option("--tags <list>", "Comma-separated tag list", (v) =>
    v
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
  )
  .option("--title <title>", "Override extracted title")
  .option("--author <author>", "Override extracted author")
  .option("--publisher <publisher>", "Override extracted publisher")
  .option("--published <date>", "Override extracted date (YYYY-MM-DD)")
  .option("--dry-run", "Print the generated markdown without writing it")
  .option("--stdout", "Same as --dry-run")
  .option("--no-refresh", "Skip KB index rebuild after writing");

export function parseIngestArgs(argv: string[]): IngestArgs {
  ingestCommand.parse(argv, { from: "user" });
  const opts = ingestCommand.opts();
  return {
    url: opts.url,
    file: opts.file,
    collection: opts.collection,
    tags: opts.tags ?? [],
    title: opts.title,
    author: opts.author,
    publisher: opts.publisher,
    published: opts.published,
    dryRun: opts.dryRun ?? false,
    stdout: opts.stdout ?? false,
    noRefresh: !opts.refresh,
  };
}
