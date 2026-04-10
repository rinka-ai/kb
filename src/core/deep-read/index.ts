import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import invariant from "tiny-invariant";
import { buildIndex, writeIndex } from "../indexer";
import { extractFromLocalFile } from "../ingest/extract";
import { chooseOutputPath } from "../ingest/render";
import { slugify } from "../markdown";
import { type KbNote, readKbNoteFile, resolveKbNotePath } from "../notes";
import { ROOT } from "../paths";
import { parseDeepReadArgs } from "./cli";
import { deepReadTags, deriveDeepReadTitle, makeDeepReadMarkdown } from "./render";
import type { DeepReadArgs, DeepReadResult } from "./types";

export type { DeepReadArgs, DeepReadResult } from "./types";

function resolveSourceNotes(inputs: string[]): KbNote[] {
  const notes = inputs.map((input) => readKbNoteFile(resolveKbNotePath(input)));
  const unique = new Map<string, KbNote>();

  for (const note of notes) {
    unique.set(note.path, note);
  }

  return [...unique.values()];
}

function normalizeFocus(focus: string[]): string[] {
  const seen = new Set<string>();
  const result: string[] = [];

  for (const item of focus.map((value) => value.trim()).filter(Boolean)) {
    const key = item.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    result.push(item);
  }

  return result.length > 0 ? result : ["method", "evals", "limitations"];
}

export async function createDeepRead(args: DeepReadArgs): Promise<DeepReadResult> {
  invariant(args.source.length > 0, "Provide at least one --source.");

  const sourceNotes = resolveSourceNotes(args.source);
  const focus = normalizeFocus(args.focus);
  const supportingNotes = args.file ? extractFromLocalFile(args.file) : undefined;
  const title = args.title || deriveDeepReadTitle(sourceNotes);
  const outputDirectory = join(ROOT, "wiki", "summaries", args.collection || "deep-reads");
  const fileDate = new Date().toISOString().slice(0, 10);
  const outputPath = chooseOutputPath(outputDirectory, `${fileDate}-${slugify(title)}`);
  const markdown = makeDeepReadMarkdown({
    title,
    sourceNotes,
    focus,
    supportingNotes,
  });

  if (args.dryRun || args.stdout) {
    return {
      markdown,
      refreshed: false,
      note: {
        title,
        sourcePaths: sourceNotes.map((note) => note.path),
        focus,
        tags: deepReadTags(sourceNotes, focus),
      },
    };
  }

  mkdirSync(outputDirectory, { recursive: true });
  writeFileSync(outputPath, markdown);

  let chunkCount: number | undefined;
  if (!args.noRefresh) {
    const index = buildIndex();
    writeIndex(index);
    chunkCount = index.chunk_count;
  }

  return {
    markdown,
    outputPath,
    refreshed: !args.noRefresh,
    chunkCount,
    note: {
      title,
      sourcePaths: sourceNotes.map((note) => note.path),
      focus,
      tags: deepReadTags(sourceNotes, focus),
    },
  };
}

export async function main(): Promise<number> {
  const args = parseDeepReadArgs(process.argv.slice(2));
  if (args.source.length === 0) {
    console.error("Provide at least one --source. Use --help for usage.");
    return 2;
  }

  const result = await createDeepRead(args);
  if (args.dryRun || args.stdout) {
    console.log(result.markdown);
    return 0;
  }

  console.log(`Wrote KB deep-read note -> ${result.outputPath}`);
  if (result.refreshed && result.chunkCount !== undefined) {
    console.log(`Rebuilt KB index with ${result.chunkCount} chunks.`);
  }
  return 0;
}
