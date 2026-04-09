import { existsSync, readFileSync, statSync } from "node:fs";
import { resolve } from "node:path";
import { ACTIVE_STATUSES, STATUS_SUPERSEDED } from "../constants";
import { buildIndex, loadIndex, newestMarkdownMtime, writeIndex } from "../indexer";
import { tokenize } from "../markdown";
import { OUTPUT_FILE } from "../paths";
import type { KbChunk, KbIndex } from "../types";
import type { SearchArgs, SearchResponse, SearchResult } from "./types";

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

const BM25_K1 = 1.5;
const BM25_B = 0.75;
const TITLE_BOOST = 2.5;
const TAG_BOOST = 2;
const SECTION_BOOST = 1.5;

export function topTermsFromFile(filePath: string, limit = 12): string[] {
  const tokens = tokenize(readFileSync(filePath, "utf-8").slice(0, 20000));
  const counts = tokens
    .filter((t) => !STOPWORDS.has(t) && t.length > 2)
    .reduce<Map<string, number>>((acc, t) => acc.set(t, (acc.get(t) ?? 0) + 1), new Map());

  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([term]) => term);
}

export function topTermsFromText(text: string, limit = 12): string[] {
  const tokens = tokenize(text.slice(0, 20000));
  const counts = tokens
    .filter((t) => !STOPWORDS.has(t) && t.length > 2)
    .reduce<Map<string, number>>((acc, t) => acc.set(t, (acc.get(t) ?? 0) + 1), new Map());

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
  if (newestMarkdownMtime() > indexMtime) {
    const index = buildIndex();
    writeIndex(index);
    return index;
  }

  return loadIndex();
}

function buildQuery(args: SearchArgs): { queryText: string; queryTerms: string[] } {
  const parts: string[] = [];
  if (args.query) parts.push(args.query);
  if (args.file) {
    const filePath = resolve(args.file);
    parts.push(filePath.split("/").at(-1) ?? filePath);
    parts.push(...topTermsFromFile(filePath));
  }
  if (args.text) {
    if (args.contextLabel) {
      parts.push(args.contextLabel);
    }
    parts.push(...topTermsFromText(args.text));
  }
  const queryText = parts.join(" ").trim();
  const queryTerms = tokenize(queryText).filter((t) => !STOPWORDS.has(t));
  return { queryText, queryTerms };
}

function scoreChunk(chunk: KbChunk, queryTerms: string[], index: KbIndex): number {
  if (queryTerms.length === 0) return 0;

  const titleTokens = new Set(tokenize(chunk.title));
  const sectionTokens = new Set(tokenize(chunk.section));
  const tagTokens = new Set(tokenize(chunk.tags.join(" ")));

  return queryTerms.reduce((score, term) => {
    const freq = chunk.term_freq[term] ?? 0;
    if (!freq) return score;

    const idf = index.idf[term] ?? Math.log(3);
    const bm25 =
      (idf * freq * (BM25_K1 + 1)) /
      (freq + BM25_K1 * (1 - BM25_B + (BM25_B * chunk.doc_len) / Math.max(index.avg_doc_len, 1)));

    const boost =
      (titleTokens.has(term) ? TITLE_BOOST : 0) +
      (sectionTokens.has(term) ? SECTION_BOOST : 0) +
      (tagTokens.has(term) ? TAG_BOOST : 0);

    return score + bm25 + boost;
  }, 0);
}

function makeSnippet(text: string, queryTerms: string[], width = 220): string {
  const lower = text.toLowerCase();
  for (const term of queryTerms) {
    const idx = lower.indexOf(term);
    if (idx < 0) continue;
    const start = Math.max(0, idx - Math.floor(width / 3));
    const end = Math.min(text.length, idx + width);
    const core = text.slice(start, end).trim();
    return `${start > 0 ? "..." : ""}${core}${end < text.length ? "..." : ""}`;
  }
  return text.length > width ? `${text.slice(0, width).trim()}...` : text;
}

function chunkToResult(chunk: KbChunk, queryTerms: string[], index: KbIndex): SearchResult {
  return {
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
  };
}

function dedupeByPath(items: SearchResult[], limit: number): SearchResult[] {
  const seen = new Set<string>();
  const result: SearchResult[] = [];
  for (const item of items) {
    if (seen.has(item.path)) continue;
    seen.add(item.path);
    result.push(item);
    if (result.length >= limit) break;
  }
  return result;
}

export function searchIndex(
  index: KbIndex,
  queryTerms: string[],
  topN: number,
  options: { includeSuperseded?: boolean } = {},
): SearchResult[] {
  const includeSuperseded = options.includeSuperseded ?? false;
  const scored = index.chunks
    .filter((chunk) => includeSuperseded || chunk.status !== STATUS_SUPERSEDED)
    .map((chunk) => chunkToResult(chunk, queryTerms, index))
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score);

  return dedupeByPath(scored, topN);
}

export function searchKb(args: SearchArgs): SearchResponse {
  if (!args.query && !args.file && !args.text) {
    throw new Error("Provide a query, file path, or raw text context.");
  }

  const index = ensureIndex(args.rebuildIfStale);
  const { queryText, queryTerms } = buildQuery(args);

  return {
    query: queryText,
    queryTerms,
    file: args.file,
    contextLabel: args.contextLabel,
    includeSuperseded: args.includeSuperseded,
    results: searchIndex(index, queryTerms, args.top, {
      includeSuperseded: args.includeSuperseded,
    }),
  };
}

function formatResult(item: SearchResult, position: number): string {
  const lines = [
    `${position}. ${item.title} [${item.section}] score=${item.score}`,
    `   path: ${item.path}`,
    ...(!ACTIVE_STATUSES.has(item.status) ? [`   status: ${item.status}`] : []),
    ...(item.superseded_by ? [`   superseded_by: ${item.superseded_by}`] : []),
    ...(item.tags.length > 0 ? [`   tags: ${item.tags.join(", ")}`] : []),
    ...(item.summary ? [`   summary: ${item.summary}`] : []),
    ...(item.snippet ? [`   snippet: ${item.snippet}`] : []),
    ...(item.url ? [`   source: ${item.url}`] : []),
  ];
  return lines.join("\n");
}

export function formatSearchResults(response: SearchResponse): string {
  const header = [
    `Query: ${response.query}`,
    ...(response.file ? [`File context: ${response.file}`] : []),
    ...(!response.file && response.contextLabel ? [`Context: ${response.contextLabel}`] : []),
    ...(response.includeSuperseded ? ["Including superseded notes: yes"] : []),
  ];

  if (response.results.length === 0) {
    return [...header, "", "No KB matches found."].join("\n");
  }

  const body = response.results.map((item, i) => formatResult(item, i + 1));
  return [...header, "", ...body].join("\n\n").trimEnd();
}
