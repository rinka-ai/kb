import {
  type KbNote,
  createKbNoteLookup,
  extractBulletItems,
  findSection,
  listKbNotes,
  sourcePathsForNote,
} from "./notes";
import { type SearchResponse, type SearchResult, searchKb } from "./search";

const KEY_POINT_HEADINGS = [
  "key claims",
  "important details",
  "what it is",
  "patterns",
  "core idea",
  "core components",
  "main families",
  "important distinctions",
  "practical lessons",
  "practical implications",
  "key dimensions",
  "common loop",
  "design shape",
  "why it matters",
];
const TENSION_HEADINGS = ["tensions", "important distinctions", "design questions"];
const OPEN_QUESTION_HEADINGS = ["open questions", "design questions"];

const NOTE_TYPE_ORDER: Record<string, number> = {
  index: 0,
  concept: 1,
  summary: 2,
  source: 3,
};

export interface BuildContextArgs {
  query?: string;
  file?: string;
  top: number;
  includeSuperseded: boolean;
  rebuildIfStale: boolean;
}

export interface ContextPackNote {
  path: string;
  title: string;
  type: string;
  status: string;
  summary: string;
  tags: string[];
  score: number;
  reason: string;
  keyPoints: string[];
  tensions: string[];
  openQuestions: string[];
  sourcePaths: string[];
}

export interface ContextPack {
  generatedAt: string;
  query: string;
  queryTerms: string[];
  file?: string;
  themes: string[];
  notes: ContextPackNote[];
  recommendedReadOrder: ContextPackNote[];
  concepts: ContextPackNote[];
  sources: ContextPackNote[];
  indexes: ContextPackNote[];
  keyPoints: string[];
  tensions: string[];
  openQuestions: string[];
  sourcePaths: string[];
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

function sentenceFallback(text: string): string[] {
  return uniqueStrings(
    text
      .split(/(?<=[.!?])\s+/)
      .map((sentence) => sentence.trim())
      .filter((sentence) => sentence.length >= 25)
      .slice(0, 2),
    2,
  );
}

function extractSectionItems(note: KbNote, headings: string[], fallback = 0): string[] {
  const items = headings.flatMap((heading) => {
    const section = findSection(note, [heading]);
    if (!section) {
      return [];
    }

    const bullets = extractBulletItems(section.content);
    return bullets.length > 0 ? bullets : sentenceFallback(section.text);
  });

  if (items.length > 0 || fallback === 0) {
    return uniqueStrings(items, Math.max(fallback, items.length));
  }

  return uniqueStrings(
    note.sections.flatMap((section) => sentenceFallback(section.text)).slice(0, fallback),
    fallback,
  );
}

function contextNoteFromResult(
  result: SearchResult,
  lookup: ReturnType<typeof createKbNoteLookup>,
): ContextPackNote | null {
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
    reason: result.summary || result.snippet,
    keyPoints: extractSectionItems(note, KEY_POINT_HEADINGS, 3),
    tensions: extractSectionItems(note, TENSION_HEADINGS, 2),
    openQuestions: extractSectionItems(note, OPEN_QUESTION_HEADINGS, 2),
    sourcePaths: uniqueStrings(sourcePathsForNote(note, lookup), 12),
  };
}

function noteTypeRank(note: ContextPackNote): number {
  return NOTE_TYPE_ORDER[note.type] ?? 99;
}

function aggregateThemes(notes: ContextPackNote[]): string[] {
  const counts = notes.reduce<Map<string, number>>((acc, note) => {
    for (const tag of note.tags) {
      acc.set(tag, (acc.get(tag) ?? 0) + 1);
    }
    return acc;
  }, new Map());

  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, 8)
    .map(([tag]) => tag);
}

export function buildContextPack(args: BuildContextArgs): ContextPack {
  const response: SearchResponse = searchKb({
    query: args.query,
    file: args.file,
    top: args.top,
    json: false,
    includeSuperseded: args.includeSuperseded,
    rebuildIfStale: args.rebuildIfStale,
  });

  const lookup = createKbNoteLookup(listKbNotes());
  const notes = response.results
    .map((result) => contextNoteFromResult(result, lookup))
    .filter((note): note is ContextPackNote => !!note);

  const recommendedReadOrder = [...notes].sort(
    (a, b) =>
      noteTypeRank(a) - noteTypeRank(b) || b.score - a.score || a.path.localeCompare(b.path),
  );

  return {
    generatedAt: new Date().toISOString(),
    query: response.query,
    queryTerms: response.queryTerms,
    file: response.file,
    themes: aggregateThemes(notes),
    notes,
    recommendedReadOrder,
    concepts: recommendedReadOrder.filter((note) => note.type === "concept"),
    sources: recommendedReadOrder.filter((note) => note.type === "source"),
    indexes: recommendedReadOrder.filter((note) => note.type === "index"),
    keyPoints: uniqueStrings(
      notes.flatMap((note) => note.keyPoints),
      12,
    ),
    tensions: uniqueStrings(
      notes.flatMap((note) => note.tensions),
      8,
    ),
    openQuestions: uniqueStrings(
      notes.flatMap((note) => note.openQuestions),
      8,
    ),
    sourcePaths: uniqueStrings(
      notes.flatMap((note) => note.sourcePaths),
      20,
    ),
  };
}

export function formatContextPack(pack: ContextPack): string {
  const header = [
    `Context pack for: ${pack.query}`,
    ...(pack.file ? [`File context: ${pack.file}`] : []),
    ...(pack.themes.length > 0 ? [`Themes: ${pack.themes.join(", ")}`] : []),
  ];

  const noteLines =
    pack.recommendedReadOrder.length > 0
      ? pack.recommendedReadOrder.map((note, index) =>
          [
            `${index + 1}. ${note.title} (${note.type}) score=${note.score}`,
            `   path: ${note.path}`,
            ...(note.summary ? [`   summary: ${note.summary}`] : []),
            ...(note.reason ? [`   why: ${note.reason}`] : []),
          ].join("\n"),
        )
      : ["No relevant notes found."];

  const sections = [
    header.join("\n"),
    "Recommended Notes",
    noteLines.join("\n\n"),
    ...(pack.keyPoints.length > 0
      ? ["Core Points", pack.keyPoints.map((item) => `- ${item}`).join("\n")]
      : []),
    ...(pack.tensions.length > 0
      ? ["Tensions", pack.tensions.map((item) => `- ${item}`).join("\n")]
      : []),
    ...(pack.openQuestions.length > 0
      ? ["Open Questions", pack.openQuestions.map((item) => `- ${item}`).join("\n")]
      : []),
    ...(pack.sourcePaths.length > 0
      ? ["Primary Sources", pack.sourcePaths.map((path) => `- ${path}`).join("\n")]
      : []),
  ];

  return sections.join("\n\n").trim();
}
