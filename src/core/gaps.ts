import { slugify } from "./markdown";
import { createKbNoteLookup, type KbNote, listKbNotes, sourcePathsForNote } from "./notes";

const IGNORED_UNCOVERED_TAGS = new Set(["papers", "google-cloud"]);
const TAG_COVERAGE_ALIASES: Record<string, string[]> = {
  "browser-agents": ["web-agents"],
  "browser-automation": ["web-agents", "agent-tools"],
  browserbase: ["web-agents", "managed-agents", "agent-security", "agent-skills", "agent-tools"],
  design: ["claude-code", "agent-skills"],
  dictation: ["voice-ai"],
  efficiency: ["agent-tools", "agent-memory"],
  "file-system": ["managed-agents", "context-engineering"],
  functions: ["managed-agents", "agent-frameworks", "agent-tools"],
  frontend: ["claude-code", "agent-skills"],
  input: ["voice-ai"],
  "knowledge-base": ["knowledge-bases", "personal-knowledge-bases", "rag"],
  "kv-cache": ["context-engineering"],
  "long-running-agents": ["agent-harnesses", "managed-agents"],
  "memory-efficiency": ["agent-memory"],
  "multimodal-agents": ["llm-agents", "ai-agent-evals"],
  "open-domain-qa": ["rag", "embeddings"],
  payments: ["agent-security"],
  pci: ["agent-security"],
  permissions: ["claude-code", "agent-security"],
  personalization: ["voice-ai"],
  prompting: ["context-engineering", "voice-ai"],
  reasoning: ["llm-agents"],
};

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

export interface ReviewGap {
  path: string;
  title: string;
  type: string;
  reviewStatus: string;
  lastReviewed: string;
  reviewDue: string;
  newestLinkedSourceDate: string;
  reason: string;
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
  orphanSourceNoteCount: number;
  ingestedSourceNoteCount: number;
  thinConceptCount: number;
  sourceCountMismatchCount: number;
  reviewBacklogCount: number;
  staleWikiNoteCount: number;
  uncoveredTagCount: number;
  orphanSourceNotes: GapNote[];
  ingestedSourceNotes: GapNote[];
  thinConcepts: ThinConcept[];
  sourceCountMismatches: ThinConcept[];
  reviewBacklog: ReviewGap[];
  staleWikiNotes: ReviewGap[];
  uncoveredTags: UncoveredTag[];
  suggestedActions: string[];
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

function stringValue(note: KbNote, key: string): string {
  const raw = note.metadata[key];
  return typeof raw === "string" ? raw.trim() : "";
}

function parseDate(value: string): number | null {
  if (!value) {
    return null;
  }
  const parsed = Date.parse(value);
  return Number.isNaN(parsed) ? null : parsed;
}

function isoDate(value: number): string {
  return new Date(value).toISOString().slice(0, 10);
}

function isCoveredTag(tag: string, representedTags: Set<string>): boolean {
  const normalized = tag.toLowerCase();
  if (IGNORED_UNCOVERED_TAGS.has(normalized) || representedTags.has(normalized)) {
    return true;
  }

  return (TAG_COVERAGE_ALIASES[normalized] ?? []).some((alias) =>
    representedTags.has(alias.toLowerCase()),
  );
}

function newestLinkedSourceDate(
  linkedSourcePaths: string[],
  lookup: ReturnType<typeof createKbNoteLookup>,
): string {
  let newest: number | null = null;

  for (const path of linkedSourcePaths) {
    const note = lookup.byPath.get(path);
    if (!note) {
      continue;
    }

    for (const key of ["date_added", "date_published"]) {
      const timestamp = parseDate(stringValue(note, key));
      if (timestamp != null && (newest == null || timestamp > newest)) {
        newest = timestamp;
      }
    }
  }

  return newest == null ? "" : isoDate(newest);
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
  if (report.reviewBacklog.length > 0) {
    actions.push(
      "Add `review_status`, `last_reviewed`, and optionally `review_due` metadata to concept and summary pages so freshness can be tracked automatically.",
    );
  }
  if (report.staleWikiNotes.length > 0) {
    actions.push(
      "Review wiki pages that are overdue or older than their linked source notes so the canonical layer stays fresher than the raw corpus.",
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

  const orphanSourceCandidates = sourceNotes.filter((note) => !referencedSlugs.has(note.slug));
  const orphanSourceNotes = orphanSourceCandidates.slice(0, args.limit).map(asGapNote);

  const ingestedSourceCandidates = sourceNotes.filter((note) => note.status === "ingested");
  const ingestedSourceNotes = ingestedSourceCandidates.slice(0, args.limit).map(asGapNote);

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

  const thinConceptCandidates = conceptAnalysis.filter(
    (concept) => concept.actualSourceCount < args.minConceptSources,
  );
  const thinConcepts = thinConceptCandidates.slice(0, args.limit);

  const sourceCountMismatchCandidates = conceptAnalysis
    .filter(
      (concept) =>
        concept.declaredSourceCount != null &&
        concept.declaredSourceCount !== concept.actualSourceCount,
    )
    .slice(0, args.limit);
  const sourceCountMismatches = sourceCountMismatchCandidates;

  const reviewAnalysis = notes
    .filter((note) => note.type === "concept" || note.type === "summary")
    .map((note) => {
      const linkedSourcePaths = sourcePathsForNote(note, lookup);
      const newestSourceDate = newestLinkedSourceDate(linkedSourcePaths, lookup);
      const reviewStatus = stringValue(note, "review_status");
      const lastReviewed = stringValue(note, "last_reviewed");
      const reviewDue = stringValue(note, "review_due");
      const lastReviewedTs = parseDate(lastReviewed);
      const reviewDueTs = parseDate(reviewDue);
      const newestSourceTs = parseDate(newestSourceDate);
      const now = Date.now();

      let reason = "";
      if (!reviewStatus || !lastReviewed) {
        reason = "missing review metadata";
      } else if (reviewDueTs != null && reviewDueTs < now) {
        reason = "review due date has passed";
      } else if (
        newestSourceTs != null &&
        lastReviewedTs != null &&
        newestSourceTs > lastReviewedTs
      ) {
        reason = "linked source is newer than the page review date";
      }

      return {
        path: note.path,
        title: note.title,
        type: note.type,
        reviewStatus,
        lastReviewed,
        reviewDue,
        newestLinkedSourceDate: newestSourceDate,
        reason,
      };
    });

  const reviewBacklogCandidates = reviewAnalysis.filter(
    (item) => item.reason === "missing review metadata",
  );
  const reviewBacklog = reviewBacklogCandidates.slice(0, args.limit);

  const staleWikiCandidates = reviewAnalysis
    .filter(
      (item) =>
        item.reason === "review due date has passed" ||
        item.reason === "linked source is newer than the page review date",
    )
    .slice(0, args.limit);
  const staleWikiNotes = staleWikiCandidates;

  const representedTags = new Set(
    conceptNotes
      .flatMap((note) => [...note.tags, note.slug, slugify(note.title)])
      .map((tag) => tag.toLowerCase()),
  );

  const uncoveredTagCandidates = [
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
    .filter(
      ([tag, paths]) =>
        paths.length >= args.minTagOccurrences && !isCoveredTag(tag, representedTags),
    )
    .sort((a, b) => b[1].length - a[1].length || a[0].localeCompare(b[0]))
    .slice(0, args.limit)
    .map(([tag, paths]) => ({
      tag,
      count: paths.length,
      examplePaths: paths.slice(0, 3),
    }));
  const uncoveredTags = uncoveredTagCandidates;

  const report: GapReport = {
    generatedAt: new Date().toISOString(),
    totalNotes: notes.length,
    sourceNoteCount: sourceNotes.length,
    conceptNoteCount: conceptNotes.length,
    indexNoteCount: indexNotes.length,
    orphanSourceNoteCount: orphanSourceCandidates.length,
    ingestedSourceNoteCount: ingestedSourceCandidates.length,
    thinConceptCount: thinConceptCandidates.length,
    sourceCountMismatchCount: conceptAnalysis.filter(
      (concept) =>
        concept.declaredSourceCount != null &&
        concept.declaredSourceCount !== concept.actualSourceCount,
    ).length,
    reviewBacklogCount: reviewBacklogCandidates.length,
    staleWikiNoteCount: reviewAnalysis.filter(
      (item) =>
        item.reason === "review due date has passed" ||
        item.reason === "linked source is newer than the page review date",
    ).length,
    uncoveredTagCount: [
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
    ].filter(
      ([tag, paths]) =>
        paths.length >= args.minTagOccurrences && !isCoveredTag(tag, representedTags),
    ).length,
    orphanSourceNotes,
    ingestedSourceNotes,
    thinConcepts,
    sourceCountMismatches,
    reviewBacklog,
    staleWikiNotes,
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
    `Backlog totals: orphan=${report.orphanSourceNoteCount}, ingested=${report.ingestedSourceNoteCount}, thin_concepts=${report.thinConceptCount}, review_backlog=${report.reviewBacklogCount}, stale_wiki=${report.staleWikiNoteCount}, uncovered_tags=${report.uncoveredTagCount}`,
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
      "Review Backlog",
      report.reviewBacklog.map(
        (note) =>
          `- ${note.title} (${note.path}) status=${note.reviewStatus || "unset"} last_reviewed=${note.lastReviewed || "unset"} reason=${note.reason}`,
      ),
    ),
    ...block(
      "Stale Wiki Notes",
      report.staleWikiNotes.map(
        (note) =>
          `- ${note.title} (${note.path}) last_reviewed=${note.lastReviewed || "unset"} newest_source=${note.newestLinkedSourceDate || "unknown"} reason=${note.reason}`,
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
