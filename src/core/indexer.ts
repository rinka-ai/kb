import { mkdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { basename, relative } from "node:path";
import { globSync } from "glob";
import { parseFrontmatter } from "./frontmatter";
import { extractSections, extractTitle, slugify, stripMarkdown, tokenize } from "./markdown";
import { OUTPUT_DIR, OUTPUT_FILE, ROOT, SOURCE_DIRS } from "./paths";
import type { Frontmatter, KbChunk, KbIndex } from "./types";

const LOW_SIGNAL_SECTIONS = new Set(["Source Metadata", "Source Text", "Related"]);
const WIKI_LINK_RE = /\[\[([^\]]+)\]\]/g;

export const INDEX_SCHEMA_VERSION = 3;

const stringValue = (metadata: Frontmatter, key: string): string => {
  const value = metadata[key];
  return typeof value === "string" ? value : "";
};

const listValue = (metadata: Frontmatter, key: string): string[] => {
  const value = metadata[key];
  return Array.isArray(value) ? value : [];
};

function buildTermFreq(tokens: string[]): Record<string, number> {
  return tokens.reduce<Record<string, number>>((acc, token) => {
    acc[token] = (acc[token] ?? 0) + 1;
    return acc;
  }, {});
}

function buildChunk(params: {
  chunkId: string;
  relPath: string;
  noteSlug: string;
  kind: "document" | "section";
  title: string;
  section: string;
  metadata: Frontmatter;
  content: string;
  wikiLinks: string[];
  contextLines?: string[];
}): KbChunk {
  const summary = stringValue(params.metadata, "summary");
  const tags = listValue(params.metadata, "tags");
  const related = listValue(params.metadata, "related");
  const canonicalFor = listValue(params.metadata, "canonical_for");
  const text = stripMarkdown(params.content);
  const searchable = [
    params.noteSlug,
    params.title,
    params.section,
    summary,
    tags.join(" "),
    related.join(" "),
    canonicalFor.join(" "),
    params.wikiLinks.join(" "),
    params.contextLines?.join(" ") ?? "",
    text,
  ]
    .filter(Boolean)
    .join(" ");
  const tokens = tokenize(searchable);

  return {
    id: params.chunkId,
    path: params.relPath,
    note_slug: params.noteSlug,
    kind: params.kind,
    title: params.title,
    section: params.section,
    type: stringValue(params.metadata, "type"),
    status: stringValue(params.metadata, "status"),
    superseded_by: stringValue(params.metadata, "superseded_by"),
    summary,
    tags,
    related,
    canonical_for: canonicalFor,
    wiki_links: params.wikiLinks,
    url: stringValue(params.metadata, "url"),
    date_published: stringValue(params.metadata, "date_published"),
    date_added: stringValue(params.metadata, "date_added"),
    author: stringValue(params.metadata, "author"),
    publisher: stringValue(params.metadata, "publisher"),
    review_status: stringValue(params.metadata, "review_status"),
    last_reviewed: stringValue(params.metadata, "last_reviewed"),
    review_due: stringValue(params.metadata, "review_due"),
    confidence: stringValue(params.metadata, "confidence"),
    text,
    term_freq: buildTermFreq(tokens),
    doc_len: tokens.length,
  };
}

export function listMarkdownFiles(): string[] {
  return SOURCE_DIRS.flatMap((dir) => globSync("**/*.md", { cwd: dir, absolute: true })).sort();
}

function extractWikiLinks(text: string): string[] {
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

function buildDocumentPreview(
  summary: string,
  sections: Array<{ heading: string; content: string }>,
  sectionHeadings: string[],
): string {
  const highSignalSections = sections
    .filter((section) => !LOW_SIGNAL_SECTIONS.has(section.heading))
    .slice(0, 6)
    .map((section) => `## ${section.heading}\n${section.content}`)
    .join("\n\n");

  return [
    summary,
    sectionHeadings.length > 0 ? `Section headings: ${sectionHeadings.join(", ")}` : "",
    highSignalSections,
  ]
    .filter(Boolean)
    .join("\n\n")
    .slice(0, 4_000);
}

function fileToChunks(file: string): KbChunk[] {
  const relPath = relative(ROOT, file);
  const raw = readFileSync(file, "utf-8");
  const { metadata, body } = parseFrontmatter(raw);
  const title = extractTitle(metadata, body, relPath.replace(/\.md$/, ""));
  const sections = extractSections(body);
  const noteSlug = basename(relPath, ".md");
  const wikiLinks = extractWikiLinks(body);
  const sectionHeadings = sections.map((section) => section.heading);
  const summary = stringValue(metadata, "summary");
  const preview = buildDocumentPreview(summary, sections, sectionHeadings);

  const docChunk = buildChunk({
    chunkId: `${relPath}::document`,
    relPath,
    noteSlug,
    kind: "document",
    title,
    section: "Document",
    metadata,
    content: preview,
    wikiLinks,
    contextLines: sectionHeadings,
  });

  const sectionChunks = sections
    .filter((s) => stripMarkdown(s.content).length >= 40 && !LOW_SIGNAL_SECTIONS.has(s.heading))
    .map((s) =>
      buildChunk({
        chunkId: `${relPath}::${slugify(s.heading) || "section"}`,
        relPath,
        noteSlug,
        kind: "section",
        title,
        section: s.heading,
        metadata,
        content: [summary, `Section headings: ${sectionHeadings.join(", ")}`, s.content]
          .filter(Boolean)
          .join("\n\n"),
        wikiLinks,
        contextLines: sectionHeadings.filter((heading) => heading !== s.heading),
      }),
    );

  return [docChunk, ...sectionChunks];
}

function computeIdf(chunks: KbChunk[]): Record<string, number> {
  const df = chunks.reduce<Record<string, number>>((acc, chunk) => {
    for (const term of Object.keys(chunk.term_freq)) {
      acc[term] = (acc[term] ?? 0) + 1;
    }
    return acc;
  }, {});

  return Object.fromEntries(
    Object.entries(df).map(([term, freq]) => [
      term,
      Math.log(1 + (chunks.length - freq + 0.5) / (freq + 0.5)),
    ]),
  );
}

export function buildIndex(): KbIndex {
  const files = listMarkdownFiles();
  const chunks = files.flatMap(fileToChunks);
  const avgDocLen = chunks.reduce((sum, c) => sum + c.doc_len, 0) / Math.max(chunks.length, 1);

  return {
    schema_version: INDEX_SCHEMA_VERSION,
    generated_at: new Date().toISOString(),
    root: ROOT,
    chunk_count: chunks.length,
    file_count: files.length,
    avg_doc_len: avgDocLen,
    idf: computeIdf(chunks),
    chunks,
  };
}

export function writeIndex(index: KbIndex): void {
  mkdirSync(OUTPUT_DIR, { recursive: true });
  writeFileSync(OUTPUT_FILE, JSON.stringify(index, null, 2));
}

export function loadIndex(): KbIndex {
  return JSON.parse(readFileSync(OUTPUT_FILE, "utf-8")) as KbIndex;
}

export function newestMarkdownMtime(): number {
  return listMarkdownFiles().reduce((latest, file) => Math.max(latest, statSync(file).mtimeMs), 0);
}
