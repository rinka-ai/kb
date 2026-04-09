import { tokenize } from "./markdown";
import {
  createKbNoteLookup,
  findSection,
  type KbNote,
  listKbNotes,
  sourcePathsForNote,
} from "./notes";
import { type SearchResponse, type SearchResult, searchKb } from "./search";

const FOCUSED_HEADINGS = new Set([
  "summary",
  "tl;dr",
  "overview",
  "key claims",
  "important details",
  "tensions",
  "open questions",
]);

export interface TraceClaimArgs {
  claim: string;
  top: number;
  includeSuperseded: boolean;
  rebuildIfStale: boolean;
}

export interface ClaimSectionMatch {
  heading: string;
  score: number;
  snippet: string;
}

export interface ClaimEvidence {
  path: string;
  title: string;
  type: string;
  status: string;
  summary: string;
  tags: string[];
  score: number;
  matchType: "primary" | "synthesis" | "historical";
  sourcePaths: string[];
  matchingSections: ClaimSectionMatch[];
}

export interface ClaimTraceReport {
  generatedAt: string;
  claim: string;
  queryTerms: string[];
  evidence: ClaimEvidence[];
  primaryEvidence: ClaimEvidence[];
  synthesisEvidence: ClaimEvidence[];
  historicalEvidence: ClaimEvidence[];
  sourcePaths: string[];
  openQuestions: string[];
  caution: string;
}

function uniqueStrings(items: string[], limit: number): string[] {
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

function makeSnippet(text: string, queryTerms: string[], width = 220): string {
  const lower = text.toLowerCase();
  for (const term of queryTerms) {
    const index = lower.indexOf(term);
    if (index < 0) {
      continue;
    }
    const start = Math.max(0, index - Math.floor(width / 3));
    const end = Math.min(text.length, index + width);
    const snippet = text.slice(start, end).trim();
    return `${start > 0 ? "..." : ""}${snippet}${end < text.length ? "..." : ""}`;
  }

  return text.length > width ? `${text.slice(0, width).trim()}...` : text;
}

function sectionMatchScore(
  note: KbNote,
  heading: string,
  text: string,
  queryTerms: string[],
): number {
  if (queryTerms.length === 0) {
    return 0;
  }

  const tokens = new Set(tokenize(`${heading} ${text}`));
  const overlap = queryTerms.reduce((count, term) => count + (tokens.has(term) ? 1 : 0), 0);
  const headingBoost = FOCUSED_HEADINGS.has(heading.trim().toLowerCase()) ? 0.5 : 0;
  const typeBoost = note.type === "source" ? 0.35 : note.type === "concept" ? 0.2 : 0.1;
  return overlap + headingBoost + typeBoost;
}

function noteMatchType(note: KbNote): ClaimEvidence["matchType"] {
  if (note.status === "superseded") {
    return "historical";
  }
  return note.type === "source" ? "primary" : "synthesis";
}

function sectionMatchesForNote(note: KbNote, queryTerms: string[]): ClaimSectionMatch[] {
  const matches = note.sections
    .map((section) => ({
      heading: section.heading,
      score: Number(sectionMatchScore(note, section.heading, section.text, queryTerms).toFixed(3)),
      snippet: makeSnippet(section.text, queryTerms),
    }))
    .filter((match) => match.score > 0)
    .sort((a, b) => b.score - a.score || a.heading.localeCompare(b.heading))
    .slice(0, 3);

  if (matches.length > 0) {
    return matches;
  }

  const summarySection = findSection(note, ["summary", "tl;dr", "overview"]);
  if (!summarySection) {
    return [];
  }

  return [
    {
      heading: summarySection.heading,
      score: 0,
      snippet: makeSnippet(summarySection.text, queryTerms),
    },
  ];
}

function evidenceFromResult(
  result: SearchResult,
  lookup: ReturnType<typeof createKbNoteLookup>,
  queryTerms: string[],
): ClaimEvidence | null {
  const note = lookup.byPath.get(result.path);
  if (!note) {
    return null;
  }

  return {
    path: note.path,
    title: note.title,
    type: note.type,
    status: note.status,
    summary: note.summary,
    tags: note.tags,
    score: result.score,
    matchType: noteMatchType(note),
    sourcePaths: sourcePathsForNote(note, lookup),
    matchingSections: sectionMatchesForNote(note, queryTerms),
  };
}

export function traceClaim(args: TraceClaimArgs): ClaimTraceReport {
  const response: SearchResponse = searchKb({
    query: args.claim,
    top: args.top,
    json: false,
    includeSuperseded: args.includeSuperseded,
    rebuildIfStale: args.rebuildIfStale,
  });

  const lookup = createKbNoteLookup(listKbNotes());
  const evidence = response.results
    .map((result) => evidenceFromResult(result, lookup, response.queryTerms))
    .filter((entry): entry is ClaimEvidence => !!entry);

  return {
    generatedAt: new Date().toISOString(),
    claim: args.claim,
    queryTerms: response.queryTerms,
    evidence,
    primaryEvidence: evidence.filter((entry) => entry.matchType === "primary"),
    synthesisEvidence: evidence.filter((entry) => entry.matchType === "synthesis"),
    historicalEvidence: evidence.filter((entry) => entry.matchType === "historical"),
    sourcePaths: uniqueStrings(
      evidence.flatMap((entry) => entry.sourcePaths),
      24,
    ),
    openQuestions: uniqueStrings(
      evidence
        .flatMap((entry) => lookup.byPath.get(entry.path)?.sections ?? [])
        .filter((section) => section.heading.trim().toLowerCase() === "open questions")
        .flatMap((section) => section.text.split(/\?\s+/).map((item) => item.trim()))
        .filter((item) => item.length >= 20)
        .map((item) => (item.endsWith("?") ? item : `${item}?`)),
      8,
    ),
    caution:
      "This trace ranks relevant evidence from the current wiki and source notes. It improves provenance review, but it does not prove truth or automatically detect every contradiction.",
  };
}

export function formatClaimTrace(report: ClaimTraceReport): string {
  const sections = [
    `Claim trace: ${report.claim}`,
    ...(report.queryTerms.length > 0 ? [`Query terms: ${report.queryTerms.join(", ")}`] : []),
    `Evidence notes: ${report.evidence.length}`,
  ];

  const evidenceLines =
    report.evidence.length > 0
      ? report.evidence.map((entry, index) =>
          [
            `${index + 1}. ${entry.title} (${entry.matchType}) score=${entry.score}`,
            `   path: ${entry.path}`,
            ...(entry.summary ? [`   summary: ${entry.summary}`] : []),
            ...entry.matchingSections.map(
              (section) =>
                `   section: ${section.heading} score=${section.score} snippet=${section.snippet}`,
            ),
          ].join("\n"),
        )
      : ["No relevant evidence notes found."];

  return [
    ...sections,
    "",
    "Evidence",
    evidenceLines.join("\n\n"),
    ...(report.sourcePaths.length > 0
      ? ["", "Primary Sources", report.sourcePaths.map((path) => `- ${path}`).join("\n")]
      : []),
    ...(report.openQuestions.length > 0
      ? ["", "Open Questions", report.openQuestions.map((item) => `- ${item}`).join("\n")]
      : []),
    "",
    `Caution: ${report.caution}`,
  ].join("\n");
}
