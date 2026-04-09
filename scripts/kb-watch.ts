#!/usr/bin/env bun

import { watch } from "node:fs";
import { relative } from "node:path";
import { ROOT, SOURCE_DIRS, buildIndex, writeIndex } from "./kb-lib";
import { collectKbWarnings } from "./kb-lint";

interface WatchArgs {
  lint: boolean;
  help: boolean;
}

function parseArgs(argv: string[]): WatchArgs {
  return {
    lint: argv.includes("--lint"),
    help: argv.includes("--help") || argv.includes("-h"),
  };
}

function printHelp(): void {
  console.log(`Usage:
  bun run kb:watch [--lint]

Options:
  --lint   Run KB lint after each rebuild
`);
}

function runRefresh(lint: boolean, reason: string): void {
  const index = buildIndex();
  writeIndex(index);
  console.log(`[kb-watch] Rebuilt index (${index.chunk_count} chunks) after ${reason}.`);
  if (!lint) {
    return;
  }
  const warnings = collectKbWarnings();
  if (warnings.length === 0) {
    console.log("[kb-watch] Lint clean.");
    return;
  }
  console.log(`[kb-watch] Lint warnings: ${warnings.length}`);
}

const args = parseArgs(process.argv.slice(2));
if (args.help) {
  printHelp();
  process.exit(0);
}

runRefresh(args.lint, "startup");

let timer: ReturnType<typeof setTimeout> | null = null;

for (const directory of SOURCE_DIRS) {
  watch(directory, { recursive: true }, (_eventType, filename) => {
    const label = filename ? relative(ROOT, `${directory}/${filename}`) : directory;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      runRefresh(args.lint, label);
    }, 300);
  });
}

console.log("[kb-watch] Watching raw/articles and wiki for changes.");
