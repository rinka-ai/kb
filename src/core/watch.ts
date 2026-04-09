import { watch } from "node:fs";
import { relative } from "node:path";
import { Command } from "commander";
import { buildIndex, writeIndex } from "./indexer";
import { collectKbWarnings } from "./lint";
import { ROOT, SOURCE_DIRS } from "./paths";

const watchCommand = new Command("watch")
  .description("Watch raw/articles and wiki for changes and rebuild the index")
  .option("--lint", "Run KB lint after each rebuild");

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

export function main(argv = process.argv.slice(2)): void {
  watchCommand.parse(argv, { from: "user" });
  const opts = watchCommand.opts();

  runRefresh(opts.lint ?? false, "startup");

  let timer: ReturnType<typeof setTimeout> | null = null;

  for (const directory of SOURCE_DIRS) {
    watch(directory, { recursive: true }, (_eventType, filename) => {
      const label = filename ? relative(ROOT, `${directory}/${filename}`) : directory;
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        runRefresh(opts.lint ?? false, label);
      }, 300);
    });
  }

  console.log("[kb-watch] Watching raw/articles and wiki for changes.");
}
