import { basename, resolve } from "node:path";
import { Command } from "commander";
import { createCliRequestContext } from "../request-context";
import { recordSearchObservation } from "../search-observations";
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

interface SearchCliArgs extends SearchArgs {
  logSearch: boolean;
  searchObservationLogPath?: string;
}

const DISABLED = new Set(["0", "false", "no", "off"]);

function searchTelemetryEnabled(cliEnabled: boolean): boolean {
  const value = process.env.KB_SEARCH_TELEMETRY_ENABLED;
  return cliEnabled && (value == null || !DISABLED.has(value.trim().toLowerCase()));
}

function maybeRecordLocalObservation(args: SearchCliArgs, response: ReturnType<typeof searchKb>) {
  if (!searchTelemetryEnabled(args.logSearch)) {
    return;
  }

  recordSearchObservation({
    request: createCliRequestContext(),
    tool: args.file ? "kb_search_file" : "kb_search",
    response,
    rawQuery: args.query,
    contextLabel: args.contextLabel ?? (args.file ? basename(resolve(args.file)) : undefined),
    filePathProvided: !!args.file,
    top: args.top,
    rebuildIfStale: args.rebuildIfStale,
    includeSuperseded: args.includeSuperseded,
    logPath: args.searchObservationLogPath,
  });
}

const searchCommand = new Command("search")
  .description("Search the KB index")
  .option("--query <text>", "Free-text search query")
  .option("--file <path>", "Use a local file as context for search")
  .option("--top <n>", "Number of results to return", "8")
  .option("--json", "Output results as JSON")
  .option("--no-rebuild-if-stale", "Skip automatic index rebuild")
  .option("--include-superseded", "Include superseded notes in results")
  .option("--no-log-search", "Skip writing a local search observation")
  .option("--search-log-path <path>", "Path to the local search observation NDJSON log");

function parseArgs(argv: string[]): SearchCliArgs {
  searchCommand.parse(argv, { from: "user" });
  const opts = searchCommand.opts();
  return {
    query: opts.query,
    file: opts.file,
    top: Number(opts.top),
    json: opts.json ?? false,
    rebuildIfStale: opts.rebuildIfStale,
    includeSuperseded: opts.includeSuperseded ?? false,
    logSearch: opts.logSearch ?? true,
    searchObservationLogPath: opts.searchLogPath,
  };
}

export function main(argv = process.argv.slice(2)): number {
  const args = parseArgs(argv);
  if (!args.query && !args.file) {
    console.error("Provide --query or --file. Use --help for usage.");
    return 2;
  }

  const response = searchKb(args);
  maybeRecordLocalObservation(args, response);
  if (args.json) {
    console.log(JSON.stringify(response, null, 2));
    return 0;
  }

  console.log(formatSearchResults(response));
  return 0;
}
