import type { ExtractedSource } from "../ingest";
import { slugify } from "../markdown";
import { extractBulletItems, findSection, type KbNote } from "../notes";

export interface DeepReadRenderInput {
  title: string;
  sourceNotes: KbNote[];
  focus: string[];
  supportingNotes?: ExtractedSource;
}

function yamlList(values: string[]): string {
  return `[${values.join(", ")}]`;
}

function unique(values: string[], limit?: number): string[] {
  const result: string[] = [];
  const seen = new Set<string>();

  for (const value of values.map((item) => item.trim()).filter(Boolean)) {
    const key = value.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    result.push(value);
    if (limit !== undefined && result.length >= limit) break;
  }

  return result;
}

function focusSummary(focus: string[]): string {
  if (focus.length === 0) return "the most important sections";
  if (focus.length === 1) return focus[0];
  if (focus.length === 2) return `${focus[0]} and ${focus[1]}`;
  return `${focus.slice(0, -1).join(", ")}, and ${focus.at(-1)}`;
}

function sourceLinks(notes: KbNote[]): string[] {
  return notes.map((note) => `[[${note.slug}]]`);
}

function sourceReferenceText(notes: KbNote[]): string {
  const links = sourceLinks(notes);
  if (links.length === 0) return "the selected source notes";
  if (links.length === 1) return links[0] as string;
  if (links.length === 2) return `${links[0]} and ${links[1]}`;
  return `${links.slice(0, -1).join(", ")}, and ${links.at(-1)}`;
}

function sourceCarryForwardBullets(sourceNotes: KbNote[]): string[] {
  const notesWithPrefix = sourceNotes.length > 1;
  const collected: string[] = [];

  for (const note of sourceNotes) {
    const prefix = notesWithPrefix ? `[${note.title}] ` : "";
    if (note.summary) {
      collected.push(`${prefix}${note.summary}`);
    }

    for (const heading of ["Key Claims", "Important Details", "My Notes"]) {
      const section = findSection(note, [heading]);
      if (!section) continue;
      for (const bullet of extractBulletItems(section.content)) {
        collected.push(`${prefix}${bullet}`);
      }
    }
  }

  return unique(collected, 10);
}

function evidenceBullets(supportingNotes?: ExtractedSource): string[] {
  if (!supportingNotes) {
    return [
      "No supporting notes were provided yet.",
      "Add selected sections or your own reading notes from the paper, then refine this draft.",
    ];
  }

  return unique(
    [
      supportingNotes.summary,
      ...supportingNotes.keyClaims,
      ...supportingNotes.details.filter((detail) => !detail.startsWith("Imported from local file")),
    ],
    10,
  );
}

export function deriveDeepReadTitle(sourceNotes: KbNote[]): string {
  if (sourceNotes.length === 0) return "Deep Read";
  if (sourceNotes.length === 1) return `${sourceNotes[0]?.title} Deep Read`;
  return `Deep Read: ${sourceNotes[0]?.title} + ${sourceNotes.length - 1} Companion Sources`;
}

export function deepReadTags(sourceNotes: KbNote[], focus: string[]): string[] {
  return unique(
    [
      "deep-read",
      ...sourceNotes.flatMap((note) => note.tags),
      ...focus.map((item) => slugify(item)),
    ],
    12,
  );
}

export function makeDeepReadMarkdown({
  title,
  sourceNotes,
  focus,
  supportingNotes,
}: DeepReadRenderInput): string {
  const dateAdded = new Date().toISOString().slice(0, 10);
  const noteId = `summary-${dateAdded}-${slugify(title)}`;
  const tags = deepReadTags(sourceNotes, focus);
  const focusItems = unique(focus.length > 0 ? focus : ["method", "evals", "limitations"]);
  const carryForward = sourceCarryForwardBullets(sourceNotes);
  const evidence = evidenceBullets(supportingNotes);
  const sourceLinksBlock = sourceLinks(sourceNotes)
    .map((link) => `- ${link}`)
    .join("\n");
  const carryForwardBlock =
    carryForward.length > 0
      ? carryForward.map((item) => `- ${item}`).join("\n")
      : "- Refine the linked source note first so this deep read starts from stronger KB context.";
  const evidenceBlock = evidence.map((item) => `- ${item}`).join("\n");
  const summary = `Selective deep-read note for ${sourceReferenceText(sourceNotes)} focused on ${focusSummary(focusItems)} without indexing the full paper body.`;

  return `---
id: ${noteId}
type: summary
title: ${JSON.stringify(title)}
tags: ${yamlList(tags)}
source_count: ${sourceNotes.length}
summary: ${JSON.stringify(summary)}
---

# ${title}

## Summary

${summary}

## Why This Exists

- Keeps default retrieval compact and lower-noise than full-PDF ingestion.
- Preserves only the details that matter for future synthesis, implementation, and eval design.
- Creates an explicit bridge from a processed source note to follow-up concept or summary updates.

## Focus Areas

${focusItems.map((item) => `- ${item}`).join("\n")}

## Source Notes

${sourceLinksBlock}

## What The KB Already Captures

${carryForwardBlock}

## Deep-Read Evidence

${evidenceBlock}

## Carry Forward

- Which details are strong enough to update concept pages or benchmark summaries?
- What implementation, eval, or hardening implications matter most after the closer read?
- Which facts deserve to be cited again instead of rediscovered later?

## Open Questions

- Which parts of ${sourceReferenceText(sourceNotes)} changed your view after a closer read?
- What companion repo, benchmark, or engineering note should be paired with this deep read next?
`;
}
