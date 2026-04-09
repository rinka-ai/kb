import { mkdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { relative } from "node:path";
import { globSync } from "glob";
import { parseFrontmatter } from "./frontmatter";
import { extractSections, extractTitle, slugify, stripMarkdown, tokenize } from "./markdown";
import { OUTPUT_DIR, OUTPUT_FILE, ROOT, SOURCE_DIRS } from "./paths";
import type { Frontmatter, KbChunk, KbIndex } from "./types";

const LOW_SIGNAL_SECTIONS = new Set(["Source Metadata", "Source Text", "Related"]);

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
  kind: "document" | "section";
  title: string;
  section: string;
  metadata: Frontmatter;
  content: string;
}): KbChunk {
  const summary = stringValue(params.metadata, "summary");
  const tags = listValue(params.metadata, "tags");
  const related = listValue(params.metadata, "related");
  const text = stripMarkdown(params.content);
  const searchable = [
    params.title,
    params.section,
    summary,
    tags.join(" "),
    related.join(" "),
    text,
  ]
    .filter(Boolean)
    .join(" ");
  const tokens = tokenize(searchable);

  return {
    id: params.chunkId,
    path: params.relPath,
    kind: params.kind,
    title: params.title,
    section: params.section,
    type: stringValue(params.metadata, "type"),
    status: stringValue(params.metadata, "status"),
    superseded_by: stringValue(params.metadata, "superseded_by"),
    summary,
    tags,
    related,
    url: stringValue(params.metadata, "url"),
    date_published: stringValue(params.metadata, "date_published"),
    date_added: stringValue(params.metadata, "date_added"),
    author: stringValue(params.metadata, "author"),
    publisher: stringValue(params.metadata, "publisher"),
    text,
    term_freq: buildTermFreq(tokens),
    doc_len: tokens.length,
  };
}

export function listMarkdownFiles(): string[] {
  return SOURCE_DIRS.flatMap((dir) => globSync("**/*.md", { cwd: dir, absolute: true })).sort();
}

function fileToChunks(file: string): KbChunk[] {
  const relPath = relative(ROOT, file);
  const raw = readFileSync(file, "utf-8");
  const { metadata, body } = parseFrontmatter(raw);
  const title = extractTitle(metadata, body, relPath.replace(/\.md$/, ""));
  const sections = extractSections(body);

  const preview = sections
    .slice(0, 3)
    .map((s) => s.content)
    .join("\n\n")
    .slice(0, 2000);

  const docChunk = buildChunk({
    chunkId: `${relPath}::document`,
    relPath,
    kind: "document",
    title,
    section: "Document",
    metadata,
    content: preview,
  });

  const sectionChunks = sections
    .filter((s) => stripMarkdown(s.content).length >= 40 && !LOW_SIGNAL_SECTIONS.has(s.heading))
    .map((s) =>
      buildChunk({
        chunkId: `${relPath}::${slugify(s.heading) || "section"}`,
        relPath,
        kind: "section",
        title,
        section: s.heading,
        metadata,
        content: s.content,
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
    schema_version: 2,
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
