import { slugify } from "./markdown";
import { type KbNote, createKbNoteLookup, listKbNotes, sourcePathsForNote } from "./notes";

export interface FindGapsArgs {
  limit: number;
  minConceptSources: number;
  minTagOccurrences: number;
}

export interface GapNote {
  path: string;
  title: string;
  summary: string;
  tags: string[];
}

export interface ThinConcept {
  path: string;
  title: string;
  declaredSourceCount: number | null;
  actualSourceCount: number;
  linkedSourcePaths: string[];
}

export interface UncoveredTag {
  tag: string;
  count: number;
  examplePaths: string[];
}

export interface GapReport {
  generatedAt: string;
  totalNotes: number;
  sourceNoteCount: number;
  conceptNoteCount: number;
  indexNoteCount: number;
  orphanSourceNotes: GapNote[];
  ingestedSourceNotes: GapNote[];
  thinConcepts: ThinConcept[];
  sourceCountMismatches: ThinConcept[];
  uncoveredTags: UncoveredTag[];
  suggestedActions: string[];
}

function uniqueStrings(items: string[]): string[] {
  const seen = new Set<string>();
  const result: string[] = [];

  for (const item of items.map((value) => value.trim()).filter(Boolean)) {
    const key = item.toLowerCase();
    if (seen.has(key)) {
      continue;
    }
    seen.add(key);
    result.push(item);
  }

  return result;
}

function asGapNote(note: KbNote): GapNote {
  return {
    path: note.path,
    title: note.title,
    summary: note.summary,
    tags: note.tags,
  };
}

function declaredSourceCount(note: KbNote): number | null {
  const raw = note.metadata.source_count;
  if (raw === undefined || raw === "") {
    return null;
  }

  const parsed = Number(raw);
  return Number.isFinite(parsed) ? parsed : null;
}

function suggestedActions(report: GapReport): string[] {
  const actions: string[] = [];

  if (report.orphanSourceNotes.length > 0) {
    actions.push(
      "Link orphan source notes from an existing concept page or create a new concept page for them.",
    );
  }
  if (report.ingestedSourceNotes.length > 0) {
    actions.push(
      "Promote `status: ingested` source notes into reviewed notes by refining claims, details, and related links.",
    );
  }
  if (report.thinConcepts.length > 0) {
    actions.push(
      "Strengthen thin concept pages with more source-note links and sharper synthesis sections.",
    );
  }
  if (report.sourceCountMismatches.length > 0) {
    actions.push(
      "Correct `source_count` metadata so concept pages reflect their actual linked sources.",
    );
  }
  if (report.uncoveredTags.length > 0) {
    actions.push(
      "Consider new concept pages or stronger coverage for the most frequent uncovered tags.",
    );
  }

  return actions;
}

export function findKbGaps(args: FindGapsArgs): GapReport {
  const notes = listKbNotes();
  const lookup = createKbNoteLookup(notes);

  const sourceNotes = notes.filter((note) => note.type === "source");
  const conceptNotes = notes.filter((note) => note.type === "concept");
  const indexNotes = notes.filter((note) => note.type === "index");
  const wikiNotes = notes.filter((note) => note.path.startsWith("wiki/"));

  const referencedSlugs = new Set(
    wikiNotes.flatMap((note) => note.wikiLinks.map((link) => lookup.get(link)?.slug ?? link)),
  );

  const orphanSourceNotes = sourceNotes
    .filter((note) => !referencedSlugs.has(note.slug))
    .slice(0, args.limit)
    .map(asGapNote);

  const ingestedSourceNotes = sourceNotes
    .filter((note) => note.status === "ingested")
    .slice(0, args.limit)
    .map(asGapNote);

  const conceptAnalysis = conceptNotes.map((note) => {
    const linkedSourcePaths = sourcePathsForNote(note, lookup);
    return {
      path: note.path,
      title: note.title,
      declaredSourceCount: declaredSourceCount(note),
      actualSourceCount: linkedSourcePaths.length,
      linkedSourcePaths,
    };
  });

  const thinConcepts = conceptAnalysis
    .filter((concept) => concept.actualSourceCount < args.minConceptSources)
    .slice(0, args.limit);

  const sourceCountMismatches = conceptAnalysis
    .filter(
      (concept) =>
        concept.declaredSourceCount != null &&
        concept.declaredSourceCount !== concept.actualSourceCount,
    )
    .slice(0, args.limit);

  const representedTags = new Set(
    conceptNotes
      .flatMap((note) => [...note.tags, note.slug, slugify(note.title)])
      .map((tag) => tag.toLowerCase()),
  );

  const uncoveredTags = [
    ...sourceNotes
      .reduce<Map<string, string[]>>((acc, note) => {
        for (const tag of note.tags) {
          const key = tag.toLowerCase();
          const existing = acc.get(key) ?? [];
          if (!existing.includes(note.path)) {
            existing.push(note.path);
          }
          acc.set(key, existing);
        }
        return acc;
      }, new Map())
      .entries(),
  ]
    .filter(([tag, paths]) => paths.length >= args.minTagOccurrences && !representedTags.has(tag))
    .sort((a, b) => b[1].length - a[1].length || a[0].localeCompare(b[0]))
    .slice(0, args.limit)
    .map(([tag, paths]) => ({
      tag,
      count: paths.length,
      examplePaths: paths.slice(0, 3),
    }));

  const report: GapReport = {
    generatedAt: new Date().toISOString(),
    totalNotes: notes.length,
    sourceNoteCount: sourceNotes.length,
    conceptNoteCount: conceptNotes.length,
    indexNoteCount: indexNotes.length,
    orphanSourceNotes,
    ingestedSourceNotes,
    thinConcepts,
    sourceCountMismatches,
    uncoveredTags,
    suggestedActions: [],
  };

  report.suggestedActions = suggestedActions(report);
  return report;
}

export function formatGapReport(report: GapReport): string {
  const sections = [
    "KB Gap Report",
    `Notes: ${report.totalNotes} total, ${report.sourceNoteCount} source, ${report.conceptNoteCount} concept, ${report.indexNoteCount} index`,
  ];

  const block = (title: string, lines: string[]) => {
    if (lines.length === 0) {
      return [];
    }
    return [title, lines.join("\n")];
  };

  sections.push(
    ...block(
      "Orphan Source Notes",
      report.orphanSourceNotes.map((note) => `- ${note.title} (${note.path})`),
    ),
    ...block(
      "Ingested But Not Curated",
      report.ingestedSourceNotes.map((note) => `- ${note.title} (${note.path})`),
    ),
    ...block(
      "Thin Concepts",
      report.thinConcepts.map(
        (concept) =>
          `- ${concept.title} (${concept.path}) actual=${concept.actualSourceCount} declared=${concept.declaredSourceCount ?? "unset"}`,
      ),
    ),
    ...block(
      "Source Count Mismatches",
      report.sourceCountMismatches.map(
        (concept) =>
          `- ${concept.title} (${concept.path}) actual=${concept.actualSourceCount} declared=${concept.declaredSourceCount ?? "unset"}`,
      ),
    ),
    ...block(
      "Uncovered Tags",
      report.uncoveredTags.map(
        (tag) => `- ${tag.tag} (${tag.count} source notes): ${tag.examplePaths.join(", ")}`,
      ),
    ),
    ...block(
      "Suggested Actions",
      report.suggestedActions.map((action) => `- ${action}`),
    ),
  );

  return sections.join("\n\n").trim();
}
