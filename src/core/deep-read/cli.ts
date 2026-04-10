import { Command } from "commander";
import type { DeepReadArgs } from "./types";

const DEFAULT_FOCUS = ["method", "evals", "limitations"];

export const deepReadCommand = new Command("deep-read")
  .description("Create a selective deep-read summary from existing KB source notes")
  .option(
    "--source <path>",
    "KB note path or slug to deepen; repeat the flag to add companion notes",
    (value: string, previous: string[]) => [...previous, value],
    [],
  )
  .option("--file <path>", "Local markdown, text, or html notes file with selected excerpts")
  .option("--collection <name>", "Subdirectory under wiki/summaries/ (defaults to deep-reads)")
  .option("--title <title>", "Override the generated note title")
  .option("--focus <list>", "Comma-separated focus areas", (value: string) =>
    value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean),
  )
  .option("--dry-run", "Print the generated markdown without writing it")
  .option("--stdout", "Same as --dry-run")
  .option("--no-refresh", "Skip KB index rebuild after writing");

export function parseDeepReadArgs(argv: string[]): DeepReadArgs {
  deepReadCommand.parse(argv, { from: "user" });
  const opts = deepReadCommand.opts();

  return {
    source: opts.source ?? [],
    file: opts.file,
    collection: opts.collection,
    focus: opts.focus ?? DEFAULT_FOCUS,
    title: opts.title,
    dryRun: opts.dryRun ?? false,
    stdout: opts.stdout ?? false,
    noRefresh: !opts.refresh,
  };
}
