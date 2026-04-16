import { Command } from "commander";
import type { SearchArgs } from "./types";

export {
  buildQueryPlan,
  ensureIndex,
  formatSearchResults,
  searchIndex,
  searchKb,
  topTermsFromFile,
  topTermsFromText,
} from "./engine";
export type { SearchArgs, SearchResponse, SearchResult } from "./types";

import { formatSearchResults, searchKb } from "./engine";

const searchCommand = new Command("search")
  .description("Search the KB index")
  .option("--query <text>", "Free-text search query")
  .option("--file <path>", "Use a local file as context for search")
  .option("--top <n>", "Number of results to return", "8")
  .option("--json", "Output results as JSON")
  .option("--no-rebuild-if-stale", "Skip automatic index rebuild")
  .option("--include-superseded", "Include superseded notes in results");

function parseArgs(argv: string[]): SearchArgs {
  searchCommand.parse(argv, { from: "user" });
  const opts = searchCommand.opts();
  return {
    query: opts.query,
    file: opts.file,
    top: Number(opts.top),
    json: opts.json ?? false,
    rebuildIfStale: opts.rebuildIfStale,
    includeSuperseded: opts.includeSuperseded ?? false,
  };
}

export function main(argv = process.argv.slice(2)): number {
  const args = parseArgs(argv);
  if (!args.query && !args.file) {
    console.error("Provide --query or --file. Use --help for usage.");
    return 2;
  }

  const response = searchKb(args);
  if (args.json) {
    console.log(JSON.stringify(response, null, 2));
    return 0;
  }

  console.log(formatSearchResults(response));
  return 0;
}
