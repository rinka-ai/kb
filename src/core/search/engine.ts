import { existsSync, readFileSync, statSync } from "node:fs";
import { resolve } from "node:path";
import { ACTIVE_STATUSES, STATUS_SUPERSEDED } from "../constants";
import {
  buildIndex,
  INDEX_SCHEMA_VERSION,
  loadIndex,
  newestMarkdownMtime,
  writeIndex,
} from "../indexer";
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
  "best",
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

const QUERY_ALIASES: Record<string, string[]> = {
  adk: ["agent", "development", "kit"],
  agent: ["agents"],
  agents: ["agent"],
  claude: ["anthropic"],
  eval: ["evaluation", "benchmark", "benchmarks"],
  evals: ["eval", "evaluation", "benchmark", "benchmarks"],
  framework: ["frameworks", "runtime", "orchestration"],
  frameworks: ["framework", "runtime", "orchestration"],
  kb: ["knowledge", "base", "knowledge-bases"],
  llms: ["llm"],
  mcp: ["model", "context", "protocol"],
  rag: ["retrieval", "augmented", "generation"],
  sdk: ["api", "runtime"],
  security: ["sandboxing", "approvals", "prompt", "injection"],
  stt: ["speech", "text", "transcription"],
  tts: ["speech", "voice", "audio"],
  voice: ["audio", "speech"],
};

const BM25_K1 = 1.5;
const BM25_B = 0.75;
const TITLE_BOOST = 2.5;
const TAG_BOOST = 2;
const SECTION_BOOST = 1.5;
const RELATED_BOOST = 1.25;
const COVERAGE_BOOST = 1.75;
const DOCUMENT_KIND_BOOST = 0.2;
const SECTION_KIND_BOOST = 0.35;

interface ScoredChunk {
  chunk: KbChunk;
  score: number;
  overlapTerms: string[];
}

function uniqueStrings(items: string[], limit = Number.POSITIVE_INFINITY): string[] {
  const seen = new Set<string>();
  const result: string[] = [];

  for (const item of items.map((value) => value.trim()).filter(Boolean)) {
    const key = item.toLowerCase();
    if (seen.has(key)) {
      continue;
    }
    seen.add(key);
    result.push(item);
    if (result.length >= limit) {
      break;
    }
  }

  return result;
}

function filterSearchTerms(tokens: string[]): string[] {
  return uniqueStrings(tokens.filter((token) => !STOPWORDS.has(token) && token.length > 1));
}

function expandQueryTerms(tokens: string[]): string[] {
  const expanded = new Set<string>();

  for (const token of filterSearchTerms(tokens)) {
    expanded.add(token);
    if (token.endsWith("ies") && token.length > 4) {
      expanded.add(`${token.slice(0, -3)}y`);
    } else if (token.endsWith("s") && token.length > 3 && !token.endsWith("ss")) {
      expanded.add(token.slice(0, -1));
    }

    for (const alias of QUERY_ALIASES[token] ?? []) {
      expanded.add(alias);
    }
  }

  return [...expanded];
}

export function topTermsFromFile(filePath: string, limit = 12): string[] {
  const tokens = tokenize(readFileSync(filePath, "utf-8").slice(0, 20_000));
  const counts = tokens
    .filter((token) => !STOPWORDS.has(token) && token.length > 2)
    .reduce<Map<string, number>>(
      (acc, token) => acc.set(token, (acc.get(token) ?? 0) + 1),
      new Map(),
    );

  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([term]) => term);
}

export function topTermsFromText(text: string, limit = 12): string[] {
  const tokens = tokenize(text.slice(0, 20_000));
  const counts = tokens
    .filter((token) => !STOPWORDS.has(token) && token.length > 2)
    .reduce<Map<string, number>>(
      (acc, token) => acc.set(token, (acc.get(token) ?? 0) + 1),
      new Map(),
    );

  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([term]) => term);
}

export function ensureIndex(rebuildIfStale: boolean): KbIndex {
  const shouldRebuild = () => {
    if (!existsSync(OUTPUT_FILE)) {
      return true;
    }

    const loaded = loadIndex();
    if (loaded.schema_version !== INDEX_SCHEMA_VERSION) {
      return true;
    }

    if (!rebuildIfStale) {
      return false;
    }

    return newestMarkdownMtime() > statSync(OUTPUT_FILE).mtimeMs;
  };

  if (shouldRebuild()) {
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
  if (args.text) {
    if (args.contextLabel) {
      parts.push(args.contextLabel);
    }
    parts.push(...topTermsFromText(args.text));
  }

  const queryText = parts.join(" ").trim();
  const queryTerms = expandQueryTerms(tokenize(queryText));
  return { queryText, queryTerms };
}

function bm25Score(chunk: KbChunk, term: string, index: KbIndex): number {
  const freq = chunk.term_freq[term] ?? 0;
  if (!freq) {
    return 0;
  }

  const idf = index.idf[term] ?? Math.log(3);
  return (
    (idf * freq * (BM25_K1 + 1)) /
    (freq + BM25_K1 * (1 - BM25_B + (BM25_B * chunk.doc_len) / Math.max(index.avg_doc_len, 1)))
  );
}

function chunkSignalTokens(chunk: KbChunk): {
  titleTokens: Set<string>;
  sectionTokens: Set<string>;
  tagTokens: Set<string>;
  relatedTokens: Set<string>;
} {
  return {
    titleTokens: new Set(tokenize(`${chunk.title} ${chunk.note_slug}`)),
    sectionTokens: new Set(tokenize(chunk.section)),
    tagTokens: new Set(tokenize(chunk.tags.join(" "))),
    relatedTokens: new Set(
      tokenize([...chunk.related, ...chunk.canonical_for, ...chunk.wiki_links].join(" ")),
    ),
  };
}

function scoreChunk(chunk: KbChunk, queryTerms: string[], index: KbIndex): ScoredChunk {
  if (queryTerms.length === 0) {
    return { chunk, score: 0, overlapTerms: [] };
  }

  const { titleTokens, sectionTokens, tagTokens, relatedTokens } = chunkSignalTokens(chunk);
  const overlapTerms: string[] = [];

  const baseScore = queryTerms.reduce((score, term) => {
    const freq = chunk.term_freq[term] ?? 0;
    if (!freq) {
      return score;
    }

    overlapTerms.push(term);
    const boost =
      (titleTokens.has(term) ? TITLE_BOOST : 0) +
      (sectionTokens.has(term) ? SECTION_BOOST : 0) +
      (tagTokens.has(term) ? TAG_BOOST : 0) +
      (relatedTokens.has(term) ? RELATED_BOOST : 0);

    return score + bm25Score(chunk, term, index) + boost;
  }, 0);

  if (overlapTerms.length === 0) {
    return { chunk, score: 0, overlapTerms: [] };
  }

  const coverage = overlapTerms.length / Math.max(queryTerms.length, 1);
  const kindBoost = chunk.kind === "section" ? SECTION_KIND_BOOST : DOCUMENT_KIND_BOOST;
  const reviewBoost = chunk.review_status === "reviewed" ? 0.2 : 0;
  const canonicalTerms = tokenize(chunk.canonical_for.join(" "));
  const canonicalMatchCount = queryTerms.filter((term) => canonicalTerms.includes(term)).length;
  const canonicalBoost = Math.min(canonicalMatchCount, 3) * 0.25;

  return {
    chunk,
    score: baseScore + coverage * COVERAGE_BOOST + kindBoost + reviewBoost + canonicalBoost,
    overlapTerms,
  };
}

function makeSnippet(text: string, queryTerms: string[], width = 220): string {
  const lower = text.toLowerCase();
  for (const term of queryTerms) {
    const index = lower.indexOf(term);
    if (index < 0) {
      continue;
    }
    const start = Math.max(0, index - Math.floor(width / 3));
    const end = Math.min(text.length, index + width);
    const core = text.slice(start, end).trim();
    return `${start > 0 ? "..." : ""}${core}${end < text.length ? "..." : ""}`;
  }

  return text.length > width ? `${text.slice(0, width).trim()}...` : text;
}

function rankGroupedResults(
  groups: Map<string, ScoredChunk[]>,
  queryTerms: string[],
): SearchResult[] {
  return [...groups.values()]
    .map((entries) => {
      const sorted = [...entries].sort(
        (a, b) => b.score - a.score || a.chunk.section.localeCompare(b.chunk.section),
      );
      const top = sorted[0];
      const matchedTerms = uniqueStrings(sorted.flatMap((entry) => entry.overlapTerms));
      const matchedSections = uniqueStrings(
        sorted
          .filter((entry) => entry.chunk.kind === "section")
          .map((entry) => entry.chunk.section),
        4,
      );
      const secondarySupport = sorted
        .slice(1, 3)
        .reduce((sum, entry, index) => sum + entry.score * (index === 0 ? 0.35 : 0.2), 0);
      const coverage = matchedTerms.length / Math.max(queryTerms.length, 1);
      const diversityBonus = Math.min(matchedSections.length, 3) * 0.2;
      const typeBoost = top.chunk.type === "concept" ? 0.9 : top.chunk.type === "summary" ? 0.3 : 0;
      const score = top.score + secondarySupport + coverage * 1.5 + diversityBonus + typeBoost;

      return {
        score: Number(score.toFixed(3)),
        path: top.chunk.path,
        title: top.chunk.title,
        type: top.chunk.type,
        section: top.chunk.section,
        matched_sections: matchedSections,
        status: top.chunk.status,
        superseded_by: top.chunk.superseded_by,
        tags: top.chunk.tags,
        summary: top.chunk.summary,
        snippet: makeSnippet(top.chunk.text, queryTerms),
        url: top.chunk.url,
        kind: top.chunk.kind,
      } satisfies SearchResult;
    })
    .sort((a, b) => b.score - a.score || a.path.localeCompare(b.path));
}

export function searchIndex(
  index: KbIndex,
  queryTerms: string[],
  topN: number,
  options: { includeSuperseded?: boolean } = {},
): SearchResult[] {
  const includeSuperseded = options.includeSuperseded ?? false;
  const groups = index.chunks
    .filter((chunk) => includeSuperseded || chunk.status !== STATUS_SUPERSEDED)
    .map((chunk) => scoreChunk(chunk, queryTerms, index))
    .filter((entry) => entry.score > 0)
    .reduce<Map<string, ScoredChunk[]>>((acc, entry) => {
      const existing = acc.get(entry.chunk.path) ?? [];
      existing.push(entry);
      acc.set(entry.chunk.path, existing);
      return acc;
    }, new Map());

  return rankGroupedResults(groups, queryTerms).slice(0, topN);
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
    `${position}. ${item.title} (${item.type}) [${item.section}] score=${item.score}`,
    `   path: ${item.path}`,
    ...(!ACTIVE_STATUSES.has(item.status) ? [`   status: ${item.status}`] : []),
    ...(item.superseded_by ? [`   superseded_by: ${item.superseded_by}`] : []),
    ...(item.matched_sections.length > 0
      ? [`   matched_sections: ${item.matched_sections.join(", ")}`]
      : []),
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

  const body = response.results.map((item, index) => formatResult(item, index + 1));
  return [...header, "", ...body].join("\n\n").trimEnd();
}
