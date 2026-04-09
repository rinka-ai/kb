#!/usr/bin/env bun

import { existsSync, readFileSync, statSync } from "node:fs";
import { resolve } from "node:path";
import {
  type KbChunk,
  type KbIndex,
  OUTPUT_FILE,
  buildIndex,
  loadIndex,
  newestMarkdownMtime,
  tokenize,
  writeIndex,
} from "./kb-lib";

const STOPWORDS = new Set([
  "a",
  "an",
  "and",
  "are",
  "as",
  "at",
  "be",
  "by",
  "for",
  "from",
  "how",
  "i",
  "in",
  "into",
  "is",
  "it",
  "of",
  "on",
  "or",
  "that",
  "the",
  "their",
  "this",
  "to",
  "we",
  "with",
]);

const ACTIVE_STATUSES = new Set(["", "current", "processed", "ingested"]);

export interface SearchArgs {
  query?: string;
  file?: string;
  top: number;
  json: boolean;
  rebuildIfStale: boolean;
  includeSuperseded: boolean;
}

export interface SearchResult {
  score: number;
  path: string;
  title: string;
  section: string;
  status: string;
  superseded_by: string;
  tags: string[];
  summary: string;
  snippet: string;
  url: string;
  kind: KbChunk["kind"];
}

export interface SearchResponse {
  query: string;
  queryTerms: string[];
  file?: string;
  includeSuperseded: boolean;
  results: SearchResult[];
}

function parseArgs(argv: string[]): SearchArgs {
  const args: SearchArgs = {
    top: 8,
    json: false,
    rebuildIfStale: true,
    includeSuperseded: false,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--query") {
      args.query = argv[index + 1];
      index += 1;
    } else if (arg === "--file") {
      args.file = argv[index + 1];
      index += 1;
    } else if (arg === "--top") {
      args.top = Number(argv[index + 1] ?? "8");
      index += 1;
    } else if (arg === "--json") {
      args.json = true;
    } else if (arg === "--no-rebuild-if-stale") {
      args.rebuildIfStale = false;
    } else if (arg === "--include-superseded") {
      args.includeSuperseded = true;
    }
  }
  return args;
}

export function topTermsFromFile(filePath: string, limit = 12): string[] {
  const text = readFileSync(filePath, "utf-8").slice(0, 20000);
  const counts = new Map<string, number>();
  for (const token of tokenize(text)) {
    if (STOPWORDS.has(token) || token.length <= 2) {
      continue;
    }
    counts.set(token, (counts.get(token) ?? 0) + 1);
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([term]) => term);
}

export function ensureIndex(rebuildIfStale: boolean): KbIndex {
  if (!existsSync(OUTPUT_FILE)) {
    const index = buildIndex();
    writeIndex(index);
    return index;
  }

  if (!rebuildIfStale) {
    return loadIndex();
  }

  const indexMtime = statSync(OUTPUT_FILE).mtimeMs;
  const newestSource = newestMarkdownMtime();
  if (newestSource > indexMtime) {
    const index = buildIndex();
    writeIndex(index);
    return index;
  }
  return loadIndex();
}

function buildQuery(args: SearchArgs): { queryText: string; queryTerms: string[] } {
  const parts: string[] = [];
  if (args.query) {
    parts.push(args.query);
  }
  if (args.file) {
    const filePath = resolve(args.file);
    parts.push(filePath.split("/").at(-1) ?? filePath);
    parts.push(...topTermsFromFile(filePath));
  }
  const queryText = parts.join(" ").trim();
  const queryTerms = tokenize(queryText).filter((token) => !STOPWORDS.has(token));
  return { queryText, queryTerms };
}

function scoreChunk(chunk: KbChunk, queryTerms: string[], index: KbIndex): number {
  if (queryTerms.length === 0) {
    return 0;
  }
  const k1 = 1.5;
  const b = 0.75;
  const titleTokens = new Set(tokenize(chunk.title));
  const sectionTokens = new Set(tokenize(chunk.section));
  const tagTokens = new Set(tokenize(chunk.tags.join(" ")));

  let score = 0;
  for (const term of queryTerms) {
    const freq = chunk.term_freq[term] ?? 0;
    if (!freq) {
      continue;
    }
    const idf = index.idf[term] ?? Math.log(3);
    const numerator = freq * (k1 + 1);
    const denominator = freq + k1 * (1 - b + (b * chunk.doc_len) / Math.max(index.avg_doc_len, 1));
    score += (idf * numerator) / denominator;
    if (titleTokens.has(term)) {
      score += 2.5;
    }
    if (sectionTokens.has(term)) {
      score += 1.5;
    }
    if (tagTokens.has(term)) {
      score += 2;
    }
  }
  return score;
}

function makeSnippet(text: string, queryTerms: string[], width = 220): string {
  const lower = text.toLowerCase();
  for (const term of queryTerms) {
    const index = lower.indexOf(term);
    if (index >= 0) {
      const start = Math.max(0, index - Math.floor(width / 3));
      const end = Math.min(text.length, index + width);
      let snippet = text.slice(start, end).trim();
      if (start > 0) {
        snippet = `...${snippet}`;
      }
      if (end < text.length) {
        snippet = `${snippet}...`;
      }
      return snippet;
    }
  }
  return text.length > width ? `${text.slice(0, width).trim()}...` : text;
}

export function searchIndex(
  index: KbIndex,
  queryTerms: string[],
  topN: number,
  options: { includeSuperseded?: boolean } = {},
): SearchResult[] {
  const includeSuperseded = options.includeSuperseded ?? false;
  const scored = index.chunks
    .filter((chunk) => includeSuperseded || chunk.status !== "superseded")
    .map((chunk) => ({
      score: Number(scoreChunk(chunk, queryTerms, index).toFixed(3)),
      path: chunk.path,
      title: chunk.title,
      section: chunk.section,
      status: chunk.status,
      superseded_by: chunk.superseded_by,
      tags: chunk.tags,
      summary: chunk.summary,
      snippet: makeSnippet(chunk.text, queryTerms),
      url: chunk.url,
      kind: chunk.kind,
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score);

  const deduped: typeof scored = [];
  const seenPaths = new Set<string>();
  for (const item of scored) {
    if (seenPaths.has(item.path)) {
      continue;
    }
    seenPaths.add(item.path);
    deduped.push(item);
    if (deduped.length >= topN) {
      break;
    }
  }
  return deduped;
}

export function searchKb(args: SearchArgs): SearchResponse {
  if (!args.query && !args.file) {
    throw new Error("Provide --query or --file.");
  }

  const index = ensureIndex(args.rebuildIfStale);
  const { queryText, queryTerms } = buildQuery(args);
  const results = searchIndex(index, queryTerms, args.top, {
    includeSuperseded: args.includeSuperseded,
  });

  return {
    query: queryText,
    queryTerms,
    file: args.file,
    includeSuperseded: args.includeSuperseded,
    results,
  };
}

export function formatSearchResults(response: SearchResponse): string {
  const lines = [`Query: ${response.query}`];
  if (response.file) {
    lines.push(`File context: ${response.file}`);
  }
  if (response.includeSuperseded) {
    lines.push("Including superseded notes: yes");
  }
  lines.push("");

  if (response.results.length === 0) {
    lines.push("No KB matches found.");
    return lines.join("\n");
  }

  for (const [indexPosition, item] of response.results.entries()) {
    lines.push(`${indexPosition + 1}. ${item.title} [${item.section}] score=${item.score}`);
    lines.push(`   path: ${item.path}`);
    if (!ACTIVE_STATUSES.has(item.status)) {
      lines.push(`   status: ${item.status}`);
    }
    if (item.superseded_by) {
      lines.push(`   superseded_by: ${item.superseded_by}`);
    }
    if (item.tags.length > 0) {
      lines.push(`   tags: ${item.tags.join(", ")}`);
    }
    if (item.summary) {
      lines.push(`   summary: ${item.summary}`);
    }
    if (item.snippet) {
      lines.push(`   snippet: ${item.snippet}`);
    }
    if (item.url) {
      lines.push(`   source: ${item.url}`);
    }
    lines.push("");
  }

  return lines.join("\n").trimEnd();
}

export function main(argv = process.argv.slice(2)): number {
  const args = parseArgs(argv);
  if (!args.query && !args.file) {
    console.error("Provide --query or --file.");
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

if (import.meta.main) {
  process.exit(main());
}
