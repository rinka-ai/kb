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
import { tokenize, tokenizeForSearch, tokenVariants } from "../markdown";
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
  clone: ["cloning", "voice-cloning", "synthetic"],
  cloned: ["clone", "cloning", "voice-cloning", "synthetic"],
  cloning: ["voice-cloning", "synthetic"],
  coordinator: ["coordination", "orchestration", "workflow", "frameworks"],
  coordinators: ["coordination", "orchestration", "workflow", "frameworks"],
  copilot: ["subagent", "subagents", "multi-agent", "parallel-agents"],
  copilots: ["subagent", "subagents", "multi-agent", "parallel-agents"],
  delegate: ["delegation", "subagent", "subagents", "parallel"],
  delegation: ["delegate", "subagent", "subagents", "parallel"],
  eval: ["evaluation", "benchmark", "benchmarks"],
  evals: ["eval", "evaluation", "benchmark", "benchmarks"],
  framework: ["frameworks", "runtime", "orchestration"],
  frameworks: ["framework", "runtime", "orchestration"],
  gaming: ["contamination", "integrity", "reliability"],
  impersonation: ["voice-cloning", "synthetic", "disclosure", "governance"],
  kb: ["knowledge", "base", "knowledge-bases"],
  llms: ["llm"],
  mcp: ["model", "context", "protocol"],
  operator: ["computer-use", "gui", "desktop"],
  operators: ["computer-use", "gui", "desktop"],
  rag: ["retrieval", "augmented", "generation"],
  sdk: ["api", "runtime"],
  security: ["sandboxing", "approvals", "prompt", "injection"],
  specialist: ["specialized", "subagent", "subagents", "multi-agent"],
  specialists: ["specialized", "subagent", "subagents", "multi-agent"],
  stack: ["architecture", "framework", "frameworks", "runtime", "runtimes"],
  stt: ["speech", "text", "transcription"],
  synthetic: ["voice-cloning", "disclosure", "impersonation"],
  transcribe: ["transcription", "speech-to-text"],
  transcribing: ["transcription", "speech-to-text"],
  tts: ["speech", "voice", "audio"],
  voice: ["audio", "speech"],
};

const LOW_INFO_TERMS = new Set([
  "agent",
  "agents",
  "ai",
  "app",
  "apps",
  "architecture",
  "audio",
  "base",
  "browser",
  "code",
  "context",
  "desktop",
  "framework",
  "frameworks",
  "guide",
  "knowledge",
  "llm",
  "llms",
  "model",
  "models",
  "note",
  "notes",
  "research",
  "runtime",
  "runtimes",
  "source",
  "stack",
  "system",
  "systems",
  "tool",
  "tools",
  "voice",
  "workflow",
  "workflows",
]);

const BM25_K1 = 1.5;
const BM25_B = 0.75;
const TITLE_BOOST = 2.5;
const TAG_BOOST = 2;
const SECTION_BOOST = 1.5;
const RELATED_BOOST = 1.25;
const COVERAGE_BOOST = 1.75;
const DOCUMENT_KIND_BOOST = 0.2;
const SECTION_KIND_BOOST = 0.35;
const EXACT_VARIANT_WEIGHT = 0.6;
const EXPANDED_TERM_WEIGHT = 0.35;
const EXPANDED_COVERAGE_WEIGHT = 0.25;
const EXPANDED_CANONICAL_WEIGHT = 0.1;
const TITLE_PHRASE_BOOST = 20;
const CANONICAL_PHRASE_BOOST = 12;
const TAG_PHRASE_BOOST = 8;
const SECTION_PHRASE_BOOST = 4;

interface ScoredChunk {
  chunk: KbChunk;
  score: number;
  overlapTerms: string[];
  exactOverlapTerms: string[];
  expandedOverlapTerms: string[];
}

interface QueryPlan {
  queryText: string;
  queryPhrases: string[];
  queryTerms: string[];
  exactTerms: string[];
  expandedTerms: string[];
  scoringTerms: string[];
  termWeights: Record<string, number>;
}

interface SearchIndexOptions {
  includeSuperseded?: boolean;
  exactTerms?: string[];
  expandedTerms?: string[];
  termWeights?: Record<string, number>;
  queryPhrases?: string[];
  snippetTerms?: string[];
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
    for (const alias of QUERY_ALIASES[token] ?? []) {
      expanded.add(alias);
    }
  }

  return [...expanded];
}

function buildQueryPhrases(tokens: string[]): string[] {
  const phrases: string[] = [];

  for (let index = 0; index < tokens.length - 1; index += 1) {
    const left = tokens[index];
    const right = tokens[index + 1];
    if (!left || !right) {
      continue;
    }

    phrases.push(`${left} ${right}`);
  }

  return uniqueStrings(phrases, 8);
}

function buildQueryText(args: SearchArgs): string {
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

  return parts.join(" ").trim();
}

function conceptExpansionTerms(index: KbIndex, queryTerms: string[]): string[] {
  const querySet = new Set(filterSearchTerms(queryTerms));
  const candidates = new Map<string, number>();

  for (const chunk of index.chunks) {
    if (chunk.kind !== "document" || chunk.type !== "concept") {
      continue;
    }

    const conceptTokens = uniqueStrings(
      tokenizeForSearch(
        [chunk.title, chunk.note_slug, chunk.tags.join(" "), chunk.canonical_for.join(" ")].join(
          " ",
        ),
      ),
    );
    const matchedTerms = conceptTokens.filter((term) => querySet.has(term));
    const strongMatches = matchedTerms.filter(
      (term) => !LOW_INFO_TERMS.has(term) && (index.idf[term] ?? 0) >= 0.8,
    );

    if (strongMatches.length === 0) {
      continue;
    }

    const conceptScore = strongMatches.length + matchedTerms.length * 0.2;
    for (const term of conceptTokens) {
      if (querySet.has(term) || STOPWORDS.has(term) || LOW_INFO_TERMS.has(term)) {
        continue;
      }

      const idf = index.idf[term] ?? 0;
      if (idf < 0.6) {
        continue;
      }

      const score = conceptScore * (idf + (chunk.tags.includes(term) ? 0.4 : 0));
      candidates.set(term, Math.max(candidates.get(term) ?? 0, score));
    }
  }

  return [...candidates.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, 6)
    .map(([term]) => term);
}

export function buildQueryPlan(index: KbIndex, args: SearchArgs): QueryPlan {
  const queryText = buildQueryText(args);
  const baseTerms = filterSearchTerms(tokenize(queryText));
  const baseTermSet = new Set(baseTerms);
  const queryPhrases = buildQueryPhrases(baseTerms);
  const exactTerms = uniqueStrings(baseTerms.flatMap((term) => tokenVariants(term)));
  const expansionSeedTerms = uniqueStrings(
    expandQueryTerms(baseTerms.flatMap((term) => [term, ...tokenVariants(term)])).flatMap((term) =>
      tokenVariants(term),
    ),
  );
  const expandedConceptTerms = conceptExpansionTerms(
    index,
    uniqueStrings([...exactTerms, ...expansionSeedTerms]),
  );
  const exactTermSet = new Set(exactTerms);
  const expandedTerms = uniqueStrings(
    [...expansionSeedTerms, ...expandedConceptTerms].flatMap((term) => tokenVariants(term)),
  ).filter((term) => !exactTermSet.has(term));
  const scoringTerms = uniqueStrings([...exactTerms, ...expandedTerms]);
  const termWeights = Object.fromEntries([
    ...expandedTerms.map((term) => [term, EXPANDED_TERM_WEIGHT] as const),
    ...exactTerms.map((term) => [term, baseTermSet.has(term) ? 1 : EXACT_VARIANT_WEIGHT] as const),
  ]);

  return {
    queryText,
    queryPhrases,
    queryTerms: exactTerms,
    exactTerms,
    expandedTerms,
    scoringTerms,
    termWeights,
  };
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
    titleTokens: new Set(tokenizeForSearch(`${chunk.title} ${chunk.note_slug}`)),
    sectionTokens: new Set(tokenizeForSearch(chunk.section)),
    tagTokens: new Set(tokenizeForSearch(chunk.tags.join(" "))),
    relatedTokens: new Set(
      tokenizeForSearch([...chunk.related, ...chunk.canonical_for, ...chunk.wiki_links].join(" ")),
    ),
  };
}

function scoreChunk(
  chunk: KbChunk,
  queryTerms: string[],
  index: KbIndex,
  options: SearchIndexOptions = {},
): ScoredChunk {
  if (queryTerms.length === 0) {
    return {
      chunk,
      score: 0,
      overlapTerms: [],
      exactOverlapTerms: [],
      expandedOverlapTerms: [],
    };
  }

  const exactTermSet = new Set(options.exactTerms ?? queryTerms);
  const expandedTermSet = new Set(options.expandedTerms ?? []);
  const termWeights = options.termWeights ?? {};
  const { titleTokens, sectionTokens, tagTokens, relatedTokens } = chunkSignalTokens(chunk);
  const overlapTerms: string[] = [];
  const exactOverlapTerms: string[] = [];
  const expandedOverlapTerms: string[] = [];

  const baseScore = queryTerms.reduce((score, term) => {
    const freq = chunk.term_freq[term] ?? 0;
    if (!freq) {
      return score;
    }

    overlapTerms.push(term);
    if (exactTermSet.has(term)) {
      exactOverlapTerms.push(term);
    } else if (expandedTermSet.has(term)) {
      expandedOverlapTerms.push(term);
    }
    const boost =
      (titleTokens.has(term) ? TITLE_BOOST : 0) +
      (sectionTokens.has(term) ? SECTION_BOOST : 0) +
      (tagTokens.has(term) ? TAG_BOOST : 0) +
      (relatedTokens.has(term) ? RELATED_BOOST : 0);
    const weightedTermScore = (bm25Score(chunk, term, index) + boost) * (termWeights[term] ?? 1);

    return score + weightedTermScore;
  }, 0);

  if (overlapTerms.length === 0) {
    return {
      chunk,
      score: 0,
      overlapTerms: [],
      exactOverlapTerms: [],
      expandedOverlapTerms: [],
    };
  }

  const exactOverlapCount = uniqueStrings(exactOverlapTerms).length;
  const expandedOverlapCount = uniqueStrings(expandedOverlapTerms).length;
  const exactCoverage =
    exactTermSet.size > 0 ? exactOverlapCount / Math.max(exactTermSet.size, 1) : 0;
  const expandedCoverage =
    expandedTermSet.size > 0 ? expandedOverlapCount / Math.max(expandedTermSet.size, 1) : 0;
  const kindBoost = chunk.kind === "section" ? SECTION_KIND_BOOST : DOCUMENT_KIND_BOOST;
  const reviewBoost = chunk.review_status === "reviewed" ? 0.2 : 0;
  const canonicalTerms = tokenizeForSearch(chunk.canonical_for.join(" "));
  const exactCanonicalMatchCount = [...exactTermSet].filter((term) =>
    canonicalTerms.includes(term),
  ).length;
  const expandedCanonicalMatchCount = [...expandedTermSet].filter((term) =>
    canonicalTerms.includes(term),
  ).length;
  const canonicalBoost =
    Math.min(exactCanonicalMatchCount, 3) * 0.3 +
    Math.min(expandedCanonicalMatchCount, 3) * EXPANDED_CANONICAL_WEIGHT;
  const fuzzyOnlyPenalty = exactTermSet.size > 0 && exactOverlapCount === 0 ? 0.8 : 0;

  return {
    chunk,
    score:
      baseScore +
      exactCoverage * COVERAGE_BOOST +
      expandedCoverage * (COVERAGE_BOOST * EXPANDED_COVERAGE_WEIGHT) +
      kindBoost +
      reviewBoost +
      canonicalBoost -
      fuzzyOnlyPenalty,
    overlapTerms,
    exactOverlapTerms,
    expandedOverlapTerms,
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

function phraseMatchCount(phrases: string[], text: string): number {
  if (phrases.length === 0 || !text.trim()) {
    return 0;
  }

  const normalizedText = tokenize(text).join(" ");
  if (!normalizedText) {
    return 0;
  }

  return phrases.filter((phrase) => normalizedText.includes(phrase)).length;
}

function rankGroupedResults(
  groups: Map<string, ScoredChunk[]>,
  queryTerms: string[],
  options: SearchIndexOptions = {},
): SearchResult[] {
  const exactTerms = options.exactTerms ?? queryTerms;
  const expandedTerms = options.expandedTerms ?? [];
  const queryPhrases = options.queryPhrases ?? [];

  return [...groups.values()]
    .map((entries) => {
      const sorted = [...entries].sort(
        (a, b) => b.score - a.score || a.chunk.section.localeCompare(b.chunk.section),
      );
      const top = sorted[0];
      const exactMatchedTerms = uniqueStrings(sorted.flatMap((entry) => entry.exactOverlapTerms));
      const expandedMatchedTerms = uniqueStrings(
        sorted.flatMap((entry) => entry.expandedOverlapTerms),
      );
      const matchedSections = uniqueStrings(
        sorted
          .filter((entry) => entry.chunk.kind === "section")
          .map((entry) => entry.chunk.section),
        4,
      );
      const secondarySupport = sorted
        .slice(1, 3)
        .reduce((sum, entry, index) => sum + entry.score * (index === 0 ? 0.35 : 0.2), 0);
      const exactCoverage = exactMatchedTerms.length / Math.max(exactTerms.length, 1);
      const expandedCoverage =
        expandedTerms.length > 0 ? expandedMatchedTerms.length / expandedTerms.length : 0;
      const diversityBonus = Math.min(matchedSections.length, 3) * 0.2;
      const typeBoost = top.chunk.type === "concept" ? 0.9 : top.chunk.type === "summary" ? 0.3 : 0;
      const titleTokens = new Set(tokenizeForSearch(`${top.chunk.title} ${top.chunk.note_slug}`));
      const canonicalTokens = new Set(tokenizeForSearch(top.chunk.canonical_for.join(" ")));
      const tagTokens = new Set(tokenizeForSearch(top.chunk.tags.join(" ")));
      const exactTitleMatches = exactTerms.filter((term) => titleTokens.has(term)).length;
      const exactCanonicalMatches = exactTerms.filter((term) => canonicalTokens.has(term)).length;
      const exactTagMatches = exactTerms.filter((term) => tagTokens.has(term)).length;
      const titlePhraseMatches = phraseMatchCount(
        queryPhrases,
        `${top.chunk.title} ${top.chunk.note_slug}`,
      );
      const canonicalPhraseMatches = phraseMatchCount(
        queryPhrases,
        top.chunk.canonical_for.join(" "),
      );
      const tagPhraseMatches = phraseMatchCount(queryPhrases, top.chunk.tags.join(" "));
      const sectionPhraseMatches = phraseMatchCount(
        queryPhrases,
        [top.chunk.section, ...matchedSections].join(" "),
      );
      const rerankBoost =
        exactCoverage * 1.5 +
        Math.min(exactTitleMatches, 3) * 0.8 +
        Math.min(exactCanonicalMatches, 3) * 0.9 +
        Math.min(exactTagMatches, 2) * 0.3;
      const phraseBoost =
        titlePhraseMatches * TITLE_PHRASE_BOOST +
        canonicalPhraseMatches * CANONICAL_PHRASE_BOOST +
        tagPhraseMatches * TAG_PHRASE_BOOST +
        sectionPhraseMatches * SECTION_PHRASE_BOOST;
      const fuzzyOnlyPenalty = exactTerms.length > 0 && exactMatchedTerms.length === 0 ? 1.5 : 0;
      const expansionHeavyPenalty =
        exactMatchedTerms.length > 0 && expandedMatchedTerms.length >= exactMatchedTerms.length + 3
          ? 0.25
          : 0;
      const score =
        top.score +
        secondarySupport +
        exactCoverage * 1.3 +
        expandedCoverage * 0.35 +
        diversityBonus +
        typeBoost +
        rerankBoost +
        phraseBoost -
        fuzzyOnlyPenalty -
        expansionHeavyPenalty;

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
        snippet: makeSnippet(top.chunk.text, options.snippetTerms ?? queryTerms),
        url: top.chunk.url,
        kind: top.chunk.kind,
        exact_match_count: exactMatchedTerms.length,
        expanded_match_count: expandedMatchedTerms.length,
        exact_title_match_count: exactTitleMatches,
        exact_canonical_match_count: exactCanonicalMatches,
        exact_tag_match_count: exactTagMatches,
        fuzzy_only: exactTerms.length > 0 && exactMatchedTerms.length === 0,
      } satisfies SearchResult;
    })
    .sort((a, b) => b.score - a.score || a.path.localeCompare(b.path));
}

export function searchIndex(
  index: KbIndex,
  queryTerms: string[],
  topN: number,
  options: SearchIndexOptions = {},
): SearchResult[] {
  const includeSuperseded = options.includeSuperseded ?? false;
  const groups = index.chunks
    .filter((chunk) => includeSuperseded || chunk.status !== STATUS_SUPERSEDED)
    .map((chunk) => scoreChunk(chunk, queryTerms, index, options))
    .filter((entry) => entry.score > 0)
    .reduce<Map<string, ScoredChunk[]>>((acc, entry) => {
      const existing = acc.get(entry.chunk.path) ?? [];
      existing.push(entry);
      acc.set(entry.chunk.path, existing);
      return acc;
    }, new Map());

  return rankGroupedResults(groups, queryTerms, options).slice(0, topN);
}

export function searchKb(args: SearchArgs): SearchResponse {
  if (!args.query && !args.file && !args.text) {
    throw new Error("Provide a query, file path, or raw text context.");
  }

  const index = ensureIndex(args.rebuildIfStale);
  const plan = buildQueryPlan(index, args);

  return {
    query: plan.queryText,
    queryTerms: plan.queryTerms,
    exactTerms: plan.exactTerms,
    expandedTerms: plan.expandedTerms,
    file: args.file,
    contextLabel: args.contextLabel,
    includeSuperseded: args.includeSuperseded,
    results: searchIndex(index, plan.scoringTerms, args.top, {
      includeSuperseded: args.includeSuperseded,
      exactTerms: plan.exactTerms,
      expandedTerms: plan.expandedTerms,
      termWeights: plan.termWeights,
      queryPhrases: plan.queryPhrases,
      snippetTerms: [...plan.exactTerms, ...plan.expandedTerms],
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
