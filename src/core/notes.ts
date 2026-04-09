import { readFileSync } from "node:fs";
import { basename, relative } from "node:path";
import { parseFrontmatter } from "./frontmatter";
import { listMarkdownFiles, newestMarkdownMtime } from "./indexer";
import { extractSections, extractTitle, stripMarkdown } from "./markdown";
import { ROOT, SOURCE_DIRS } from "./paths";
import type { Frontmatter } from "./types";

const WIKI_LINK_RE = /\[\[([^\]]+)\]\]/g;
const SOURCE_NOTE_HEADINGS = ["source notes"];

interface NoteCache {
  key: string;
  notes: KbNote[];
}

let noteCache: NoteCache | null = null;

export interface KbNoteSection {
  heading: string;
  content: string;
  text: string;
  wikiLinks: string[];
}

export interface KbNote {
  path: string;
  slug: string;
  title: string;
  metadata: Frontmatter;
  body: string;
  type: string;
  status: string;
  summary: string;
  tags: string[];
  related: string[];
  wikiLinks: string[];
  sections: KbNoteSection[];
}

export interface KbNoteLookup {
  byPath: Map<string, KbNote>;
  bySlug: Map<string, KbNote>;
  get: (input: string) => KbNote | undefined;
}

function stringValue(metadata: Frontmatter, key: string): string {
  const value = metadata[key];
  return typeof value === "string" ? value : "";
}

function listValue(metadata: Frontmatter, key: string): string[] {
  const value = metadata[key];
  return Array.isArray(value) ? value : [];
}

function stripMdExt(path: string): string {
  return path.replace(/\.md$/, "");
}

function cacheKey(): string {
  return `${SOURCE_DIRS.join("::")}::${newestMarkdownMtime()}`;
}

export function extractWikiLinks(text: string): string[] {
  const seen = new Set<string>();
  const links: string[] = [];

  for (const match of text.matchAll(WIKI_LINK_RE)) {
    const target = match[1]?.split("|", 1)[0]?.trim();
    if (!target || seen.has(target)) {
      continue;
    }
    seen.add(target);
    links.push(target);
  }

  return links;
}

export function parseKbNote(text: string, relPath: string): KbNote {
  const { metadata, body } = parseFrontmatter(text);
  const sections = extractSections(body).map((section) => ({
    heading: section.heading,
    content: section.content,
    text: stripMarkdown(section.content),
    wikiLinks: extractWikiLinks(section.content),
  }));

  return {
    path: relPath,
    slug: basename(relPath, ".md"),
    title: extractTitle(metadata, body, stripMdExt(relPath)),
    metadata,
    body,
    type: stringValue(metadata, "type"),
    status: stringValue(metadata, "status"),
    summary: stringValue(metadata, "summary"),
    tags: listValue(metadata, "tags"),
    related: listValue(metadata, "related"),
    wikiLinks: extractWikiLinks(text),
    sections,
  };
}

export function readKbNoteFile(filePath: string): KbNote {
  const raw = readFileSync(filePath, "utf-8");
  return parseKbNote(raw, relative(ROOT, filePath));
}

export function listKbNotes(): KbNote[] {
  const key = cacheKey();
  if (noteCache?.key === key) {
    return noteCache.notes;
  }

  const notes = listMarkdownFiles()
    .map(readKbNoteFile)
    .sort((a, b) => a.path.localeCompare(b.path));
  noteCache = { key, notes };
  return notes;
}

export function createKbNoteLookup(notes = listKbNotes()): KbNoteLookup {
  const byPath = new Map<string, KbNote>();
  const bySlug = new Map<string, KbNote>();

  for (const note of notes) {
    byPath.set(note.path, note);
    bySlug.set(note.slug, note);
  }

  return {
    byPath,
    bySlug,
    get: (input: string) => {
      const trimmed = input.trim().replace(/^\.\//, "");
      const directPath = trimmed.endsWith(".md") ? trimmed : `${trimmed}.md`;
      return (
        byPath.get(trimmed) ??
        byPath.get(directPath) ??
        bySlug.get(stripMdExt(trimmed).split("/").at(-1) ?? stripMdExt(trimmed))
      );
    },
  };
}

export function findSection(note: KbNote, headings: string[]): KbNoteSection | undefined {
  const normalized = new Set(headings.map((heading) => heading.trim().toLowerCase()));
  return note.sections.find((section) => normalized.has(section.heading.trim().toLowerCase()));
}

export function extractBulletItems(text: string): string[] {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => /^[-*]\s+/.test(line) || /^\d+\.\s+/.test(line))
    .map((line) =>
      line
        .replace(/^[-*]\s+/, "")
        .replace(/^\d+\.\s+/, "")
        .trim(),
    )
    .filter(Boolean);
}

export function sourcePathsForNote(
  note: KbNote,
  lookup: ReturnType<typeof createKbNoteLookup>,
): string[] {
  if (note.type === "source") {
    return [note.path];
  }

  const sourceLinks = findSection(note, SOURCE_NOTE_HEADINGS)?.wikiLinks ?? [];
  const seen = new Set<string>();
  const paths: string[] = [];

  for (const link of sourceLinks) {
    const candidate = lookup.get(link);
    if (!candidate || candidate.type !== "source" || seen.has(candidate.path)) {
      continue;
    }
    seen.add(candidate.path);
    paths.push(candidate.path);
  }

  return paths;
}
