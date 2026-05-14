import { mkdirSync, writeFileSync } from "node:fs";
import { join, relative } from "node:path";
import invariant from "tiny-invariant";
import { buildIndex, writeIndex } from "../indexer";
import { slugify } from "../markdown";
import { ROOT } from "../paths";
import { parseIngestArgs } from "./cli";
import { applyOverrides, extractFromLocalFile, extractFromUrl } from "./extract";
import { appendIngestLog } from "./log";
import { chooseOutputPath, makeMarkdown } from "./render";
import type { IngestArgs, IngestResult } from "./types";

export type { ExtractedSource, IngestArgs, IngestResult } from "./types";

export async function ingestSource(args: IngestArgs): Promise<IngestResult> {
  invariant(args.url || args.file, "Provide either --url or --file.");

  const extracted = args.url
    ? await extractFromUrl(args.url)
    : extractFromLocalFile(args.file as string);

  const source = applyOverrides(extracted, args);
  const outputDirectory = args.collection
    ? join(ROOT, "raw", "articles", args.collection)
    : join(ROOT, "raw", "articles");
  const fileDate = source.datePublished || new Date().toISOString().slice(0, 10);
  const outputPath = chooseOutputPath(outputDirectory, `${fileDate}-${slugify(source.title)}`);
  const notePath = relative(ROOT, outputPath);
  const markdown = makeMarkdown(source, args, notePath);

  if (args.dryRun || args.stdout) {
    return {
      markdown,
      refreshed: false,
      source: {
        title: source.title,
        author: source.author,
        publisher: source.publisher,
        url: source.url,
        datePublished: source.datePublished,
        summary: source.summary,
        tags: source.tags,
        related: source.related,
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

  appendIngestLog({ notePath, title: source.title, chunkCount });

  return {
    markdown,
    outputPath,
    refreshed: !args.noRefresh,
    chunkCount,
    source: {
      title: source.title,
      author: source.author,
      publisher: source.publisher,
      url: source.url,
      datePublished: source.datePublished,
      summary: source.summary,
      tags: source.tags,
      related: source.related,
    },
  };
}

export async function main(): Promise<number> {
  const args = parseIngestArgs(process.argv.slice(2));
  if (!args.url && !args.file) {
    console.error("Provide --url or --file. Use --help for usage.");
    return 2;
  }

  const result = await ingestSource(args);
  if (args.dryRun || args.stdout) {
    console.log(result.markdown);
    return 0;
  }

  console.log(`Wrote KB source note -> ${result.outputPath}`);
  if (result.refreshed && result.chunkCount !== undefined) {
    console.log(`Rebuilt KB index with ${result.chunkCount} chunks.`);
  }
  return 0;
}
