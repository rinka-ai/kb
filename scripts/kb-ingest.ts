#!/usr/bin/env bun

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { basename, extname, join, resolve } from "node:path";
import { URL } from "node:url";
import { ROOT, buildIndex, parseFrontmatter, slugify, stripMarkdown, writeIndex } from "./kb-lib";

export interface IngestArgs {
  url?: string;
  file?: string;
  collection?: string;
  tags: string[];
  title?: string;
  author?: string;
  publisher?: string;
  published?: string;
  dryRun: boolean;
  stdout: boolean;
  noRefresh: boolean;
}

interface ExtractedSource {
  title: string;
  author: string;
  publisher: string;
  url: string;
  datePublished: string;
  summary: string;
  keyClaims: string[];
  details: string[];
  sourceText: string;
  tags: string[];
  related: string[];
}

export interface IngestResult {
  markdown: string;
  outputPath?: string;
  refreshed: boolean;
  chunkCount?: number;
  source: {
    title: string;
    author: string;
    publisher: string;
    url: string;
    datePublished: string;
    summary: string;
    tags: string[];
    related: string[];
  };
}

function parseArgs(argv: string[]): IngestArgs {
  const args: IngestArgs = {
    tags: [],
    dryRun: false,
    stdout: false,
    noRefresh: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--url") {
      args.url = argv[index + 1];
      index += 1;
    } else if (arg === "--file") {
      args.file = argv[index + 1];
      index += 1;
    } else if (arg === "--collection") {
      args.collection = argv[index + 1];
      index += 1;
    } else if (arg === "--tags") {
      args.tags = (argv[index + 1] ?? "")
        .split(",")
        .map((value) => value.trim())
        .filter(Boolean);
      index += 1;
    } else if (arg === "--title") {
      args.title = argv[index + 1];
      index += 1;
    } else if (arg === "--author") {
      args.author = argv[index + 1];
      index += 1;
    } else if (arg === "--publisher") {
      args.publisher = argv[index + 1];
      index += 1;
    } else if (arg === "--published") {
      args.published = argv[index + 1];
      index += 1;
    } else if (arg === "--dry-run") {
      args.dryRun = true;
    } else if (arg === "--stdout") {
      args.stdout = true;
    } else if (arg === "--no-refresh") {
      args.noRefresh = true;
    } else if (arg === "--help" || arg === "-h") {
      printHelp();
      process.exit(0);
    }
  }

  return args;
}

function printHelp(): void {
  console.log(`Usage:
  bun run kb:ingest --url <url> [--collection <name>] [--tags a,b,c]
  bun run kb:ingest --file <path> [--collection <name>] [--tags a,b,c]

Options:
  --url         Remote URL to ingest
  --file        Local markdown, text, or html file to ingest
  --collection  Optional subdirectory under raw/articles/
  --tags        Comma-separated tag list
  --title       Override extracted title
  --author      Override extracted author
  --publisher   Override extracted publisher
  --published   Override extracted date (YYYY-MM-DD)
  --dry-run     Print the generated markdown without writing it
  --stdout      Same as --dry-run
  --no-refresh  Skip KB index rebuild after writing
`);
}

function normalizeWhitespace(text: string): string {
  return text
    .replace(/\r/g, "")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function decodeHtmlEntities(text: string): string {
  const named: Record<string, string> = {
    amp: "&",
    lt: "<",
    gt: ">",
    quot: '"',
    apos: "'",
    nbsp: " ",
    mdash: "-",
    ndash: "-",
    rsquo: "'",
    lsquo: "'",
    rdquo: '"',
    ldquo: '"',
    hellip: "...",
  };

  return text.replace(/&(#x?[0-9a-fA-F]+|[a-zA-Z]+);/g, (_, entity: string) => {
    if (entity.startsWith("#x")) {
      return String.fromCodePoint(Number.parseInt(entity.slice(2), 16));
    }
    if (entity.startsWith("#")) {
      return String.fromCodePoint(Number.parseInt(entity.slice(1), 10));
    }
    return named[entity] ?? `&${entity};`;
  });
}

function stripHtml(text: string): string {
  return decodeHtmlEntities(
    text
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<\/(p|div|section|article|li|ul|ol|h1|h2|h3|h4|h5|h6)>/gi, "\n\n")
      .replace(/<[^>]+>/g, " "),
  )
    .replace(/[ \t]+/g, " ")
    .replace(/\n[ \t]+/g, "\n");
}

function extractMetaTags(html: string): Record<string, string> {
  const tags: Record<string, string> = {};
  for (const match of html.matchAll(/<meta\s+([^>]+)>/gi)) {
    const attrs = match[1];
    const parsed: Record<string, string> = {};
    for (const attr of attrs.matchAll(/([:@a-zA-Z0-9_-]+)\s*=\s*("([^"]*)"|'([^']*)')/g)) {
      parsed[attr[1].toLowerCase()] = decodeHtmlEntities(attr[3] ?? attr[4] ?? "");
    }
    const key = parsed.name ?? parsed.property ?? parsed.itemprop;
    const content = parsed.content;
    if (key && content && !tags[key]) {
      tags[key] = content;
    }
  }
  return tags;
}

function flattenJsonLd(value: unknown): Record<string, unknown>[] {
  if (Array.isArray(value)) {
    return value.flatMap(flattenJsonLd);
  }
  if (!value || typeof value !== "object") {
    return [];
  }
  const record = value as Record<string, unknown>;
  const graph = Array.isArray(record["@graph"]) ? record["@graph"] : [];
  return [record, ...graph.flatMap(flattenJsonLd)];
}

function extractJsonLdObjects(html: string): Record<string, unknown>[] {
  const objects: Record<string, unknown>[] = [];
  for (const match of html.matchAll(
    /<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi,
  )) {
    const raw = match[1].trim();
    if (!raw) {
      continue;
    }
    try {
      objects.push(...flattenJsonLd(JSON.parse(raw)));
    } catch {
      // Ignore malformed JSON-LD blocks and keep scanning.
    }
  }
  return objects;
}

function asString(value: unknown): string {
  if (typeof value === "string") {
    return decodeHtmlEntities(value).trim();
  }
  if (Array.isArray(value)) {
    return value.map(asString).find(Boolean) ?? "";
  }
  if (value && typeof value === "object") {
    const record = value as Record<string, unknown>;
    return asString(record.name ?? record.headline ?? record.text ?? "");
  }
  return "";
}

function findArticleJsonLd(objects: Record<string, unknown>[]): Record<string, unknown> | null {
  for (const object of objects) {
    const type = object["@type"];
    const values = Array.isArray(type) ? type : [type];
    const normalized = values.map((value) => String(value).toLowerCase());
    if (
      normalized.some((value) =>
        ["article", "blogposting", "newsarticle", "techarticle", "webpage"].includes(value),
      )
    ) {
      return object;
    }
  }
  return null;
}

function extractParagraphsFromHtml(html: string): string[] {
  const articleMatch =
    html.match(/<article\b[^>]*>([\s\S]*?)<\/article>/i) ??
    html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i) ??
    html.match(/<body\b[^>]*>([\s\S]*?)<\/body>/i);
  const candidate = articleMatch?.[1] ?? html;
  const cleaned = candidate
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<(nav|footer|header|aside)[\s\S]*?<\/\1>/gi, " ");

  const paragraphs = [...cleaned.matchAll(/<(p|li)[^>]*>([\s\S]*?)<\/\1>/gi)]
    .map((match) => normalizeWhitespace(stripHtml(match[2])))
    .filter((text) => text.length >= 40);

  if (paragraphs.length > 0) {
    return paragraphs;
  }

  return normalizeWhitespace(stripHtml(cleaned))
    .split("\n\n")
    .map((chunk) => chunk.trim())
    .filter((chunk) => chunk.length >= 40);
}

function extractHeadingsFromHtml(html: string): string[] {
  return [...html.matchAll(/<h[23][^>]*>([\s\S]*?)<\/h[23]>/gi)]
    .map((match) => normalizeWhitespace(stripHtml(match[1])))
    .filter(Boolean)
    .slice(0, 6);
}

function normalizeDate(value: string): string {
  if (!value) {
    return "";
  }
  const trimmed = value.trim();
  if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
    return trimmed;
  }
  const parsed = new Date(trimmed);
  if (Number.isNaN(parsed.getTime())) {
    return "";
  }
  return parsed.toISOString().slice(0, 10);
}

function firstMeaningfulSentence(paragraph: string): string {
  const sentences = paragraph
    .split(/(?<=[.!?])\s+/)
    .map((sentence) => sentence.trim())
    .filter((sentence) => sentence.length >= 40);
  return sentences[0] ?? paragraph;
}

function deriveKeyClaims(summary: string, paragraphs: string[]): string[] {
  const candidates = [summary, ...paragraphs.slice(0, 5).map(firstMeaningfulSentence)]
    .map((text) => normalizeWhitespace(text))
    .filter((text) => text.length >= 40 && text.length <= 260);

  const claims: string[] = [];
  const seen = new Set<string>();
  for (const candidate of candidates) {
    const key = candidate.toLowerCase();
    if (seen.has(key)) {
      continue;
    }
    seen.add(key);
    claims.push(candidate);
    if (claims.length >= 4) {
      break;
    }
  }
  return claims;
}

function deriveImportantDetails(
  headings: string[],
  sourceLabel: string,
  published: string,
): string[] {
  const details = [`Source captured from ${sourceLabel}.`];
  if (published) {
    details.push(`Published date detected as ${published}.`);
  }
  for (const heading of headings.slice(0, 5)) {
    details.push(`Section heading: ${heading}`);
  }
  return details;
}

function extractTitleFromMarkdown(text: string, fallback: string): string {
  const { metadata, body } = parseFrontmatter(text);
  if (typeof metadata.title === "string" && metadata.title.trim()) {
    return metadata.title.trim();
  }
  for (const line of body.split("\n")) {
    const match = line.match(/^#\s+(.+)$/);
    if (match) {
      return match[1].trim();
    }
  }
  return fallback;
}

function extractParagraphsFromMarkdown(text: string): string[] {
  return normalizeWhitespace(stripMarkdown(text))
    .split("\n\n")
    .map((paragraph) => paragraph.trim())
    .filter((paragraph) => paragraph.length >= 40);
}

async function fetchRemoteText(url: string): Promise<string> {
  const response = await fetch(url, {
    headers: {
      "user-agent": "ai-research-kb-ingest/1.0",
    },
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
  }
  return await response.text();
}

async function extractFromUrl(url: string): Promise<ExtractedSource> {
  const html = await fetchRemoteText(url);
  const meta = extractMetaTags(html);
  const jsonLd = extractJsonLdObjects(html);
  const article = findArticleJsonLd(jsonLd);
  const parsedUrl = new URL(url);
  const title =
    asString(article?.headline) ||
    meta["og:title"] ||
    meta["twitter:title"] ||
    decodeHtmlEntities(html.match(/<title>([\s\S]*?)<\/title>/i)?.[1] ?? "").replace(
      /\s+\|\s+.+$/,
      "",
    ) ||
    slugify(parsedUrl.pathname.split("/").filter(Boolean).at(-1) ?? "untitled");
  const author = asString(article?.author) || meta.author || "Unknown";
  const publisher =
    asString(article?.publisher) ||
    meta["og:site_name"] ||
    parsedUrl.hostname.replace(/^www\./, "");
  const published =
    normalizeDate(asString(article?.datePublished)) ||
    normalizeDate(meta["article:published_time"] ?? "") ||
    normalizeDate(meta.datepublished ?? "");
  const summary =
    meta.description ||
    meta["og:description"] ||
    meta["twitter:description"] ||
    firstMeaningfulSentence(extractParagraphsFromHtml(html)[0] ?? "Imported article.");
  const paragraphs = extractParagraphsFromHtml(html);
  const headings = extractHeadingsFromHtml(html);
  const sourceText = paragraphs.join("\n\n");

  return {
    title,
    author,
    publisher,
    url,
    datePublished: published,
    summary: normalizeWhitespace(summary),
    keyClaims: deriveKeyClaims(summary, paragraphs),
    details: deriveImportantDetails(headings, parsedUrl.hostname, published),
    sourceText,
    tags: [],
    related: [],
  };
}

function extractFromLocalFile(filePath: string): ExtractedSource {
  const absolutePath = resolve(filePath);
  const raw = readFileSync(absolutePath, "utf-8");
  const extension = extname(absolutePath).toLowerCase();
  const fallbackTitle = basename(absolutePath, extension);
  const title = extractTitleFromMarkdown(raw, fallbackTitle);
  const paragraphs =
    extension === ".html" || extension === ".htm"
      ? extractParagraphsFromHtml(raw)
      : extractParagraphsFromMarkdown(raw);
  const summary = firstMeaningfulSentence(
    paragraphs[0] ?? `Imported from local file ${absolutePath}.`,
  );

  return {
    title,
    author: "Unknown",
    publisher: "local file",
    url: "",
    datePublished: "",
    summary,
    keyClaims: deriveKeyClaims(summary, paragraphs),
    details: [`Imported from local file ${absolutePath}.`],
    sourceText: paragraphs.join("\n\n"),
    tags: [],
    related: [],
  };
}

function yamlList(values: string[]): string {
  return `[${values.join(", ")}]`;
}

function chooseOutputPath(baseDirectory: string, filenameBase: string): string {
  let candidate = join(baseDirectory, `${filenameBase}.md`);
  let counter = 2;
  while (existsSync(candidate)) {
    candidate = join(baseDirectory, `${filenameBase}-${counter}.md`);
    counter += 1;
  }
  return candidate;
}

function makeMarkdown(source: ExtractedSource, args: IngestArgs): string {
  const dateAdded = new Date().toISOString().slice(0, 10);
  const fileDate = source.datePublished || dateAdded;
  const noteId = `article-${dateAdded}-${slugify(source.title)}`;
  const tags = [...new Set([...args.tags, ...source.tags].filter(Boolean))];
  const related = [...new Set([...tags, ...source.related].filter(Boolean))];
  const tlDr = source.summary || "Imported automatically. Review and refine.";
  const keyClaims =
    source.keyClaims.length > 0
      ? source.keyClaims.map((claim) => `- ${claim}`).join("\n")
      : "- Imported automatically. Review and refine key claims.";
  const details =
    source.details.length > 0
      ? source.details.map((detail) => `- ${detail}`).join("\n")
      : "- Imported automatically. Review and refine important details.";
  const relatedBlock =
    related.length > 0 ? related.map((item) => `- [[${item}]]`).join("\n") : "- None yet.";

  return `---
id: ${noteId}
type: source
title: ${JSON.stringify(source.title)}
author: ${source.author || "Unknown"}
publisher: ${source.publisher || "Unknown"}
url: ${source.url}
date_published: ${source.datePublished}
date_added: ${dateAdded}
tags: ${yamlList(tags)}
status: ingested
quality: medium
summary: ${source.summary || tlDr}
related: ${yamlList(related)}
---

# ${source.title}

## Source Metadata

- Author: ${source.author || "Unknown"}
- Published: ${source.datePublished || "Unknown"}
- Publisher: ${source.publisher || "Unknown"}
- URL: ${source.url || "Local file"}

## TL;DR

${tlDr}

## Key Claims

${keyClaims}

## Important Details

${details}

## Entities

- People: Unknown
- Companies: Unknown
- Tools: Unknown
- Concepts: Unknown

## My Notes

- Imported automatically by \`bun run kb:ingest\`.
- Review and refine the structured sections before relying on this note heavily.

## Open Questions

- What claims in this source matter most for the current knowledge base?
- Which concept pages should link back to this note?

## Related

${relatedBlock}

## Source Text

${source.sourceText || "No source text extracted."}
`;
}

function applyOverrides(source: ExtractedSource, args: IngestArgs): ExtractedSource {
  return {
    ...source,
    title: args.title || source.title,
    author: args.author || source.author,
    publisher: args.publisher || source.publisher,
    datePublished: normalizeDate(args.published || source.datePublished),
    tags: [...new Set([...source.tags, ...args.tags])],
    related: [...new Set([...source.related, ...args.tags])],
  };
}

export async function ingestSource(args: IngestArgs): Promise<IngestResult> {
  if (!args.url && !args.file) {
    throw new Error("Provide either --url or --file.");
  }

  const extracted = args.url
    ? await extractFromUrl(args.url)
    : args.file
      ? extractFromLocalFile(args.file)
      : null;
  if (!extracted) {
    throw new Error("Provide either --url or --file.");
  }
  const source = applyOverrides(extracted, args);
  const markdown = makeMarkdown(source, args);

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

  const outputDirectory = args.collection
    ? join(ROOT, "raw", "articles", args.collection)
    : join(ROOT, "raw", "articles");
  mkdirSync(outputDirectory, { recursive: true });
  const fileDate = source.datePublished || new Date().toISOString().slice(0, 10);
  const outputPath = chooseOutputPath(outputDirectory, `${fileDate}-${slugify(source.title)}`);
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

async function main(): Promise<number> {
  const args = parseArgs(process.argv.slice(2));
  if (!args.url && !args.file) {
    printHelp();
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

if (import.meta.main) {
  void main().then((code) => {
    process.exit(code);
  });
}
