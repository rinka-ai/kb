import { mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

export type FrontmatterValue = string | string[] | boolean;
export type Frontmatter = Record<string, FrontmatterValue>;

export interface KbChunk {
  id: string;
  path: string;
  kind: "document" | "section";
  title: string;
  section: string;
  type: string;
  status: string;
  superseded_by: string;
  summary: string;
  tags: string[];
  related: string[];
  url: string;
  date_published: string;
  date_added: string;
  author: string;
  publisher: string;
  text: string;
  term_freq: Record<string, number>;
  doc_len: number;
}

export interface KbIndex {
  schema_version: number;
  generated_at: string;
  root: string;
  chunk_count: number;
  file_count: number;
  avg_doc_len: number;
  idf: Record<string, number>;
  chunks: KbChunk[];
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = resolve(__filename, "..");

export const ROOT = resolve(__dirname, "..");
export const SOURCE_DIRS = [join(ROOT, "raw", "articles"), join(ROOT, "wiki")];
export const OUTPUT_DIR = join(ROOT, ".kb");
export const OUTPUT_FILE = join(OUTPUT_DIR, "index.json");

const TOKEN_RE = /[a-z0-9]+(?:-[a-z0-9]+)*/g;
const HEADING_RE = /^(#{1,6})\s+(.+?)\s*$/;
const LOW_SIGNAL_SECTIONS = new Set(["Source Metadata", "Source Text", "Related"]);

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function splitInlineList(value: string): string[] {
  const inner = value.trim().slice(1, -1).trim();
  if (!inner) {
    return [];
  }
  const parts: string[] = [];
  let current = "";
  let quote: "'" | '"' | null = null;
  for (const char of inner) {
    if (quote) {
      if (char === quote) {
        quote = null;
      } else {
        current += char;
      }
      continue;
    }
    if (char === "'" || char === '"') {
      quote = char;
      continue;
    }
    if (char === ",") {
      const part = current.trim();
      if (part) {
        parts.push(part.replace(/^['"]|['"]$/g, ""));
      }
      current = "";
      continue;
    }
    current += char;
  }
  const part = current.trim();
  if (part) {
    parts.push(part.replace(/^['"]|['"]$/g, ""));
  }
  return parts;
}

export function parseScalar(value: string): FrontmatterValue {
  const trimmed = value.trim();
  if (!trimmed) {
    return "";
  }
  if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
    return splitInlineList(trimmed);
  }
  if (
    trimmed.length >= 2 &&
    ((trimmed.startsWith('"') && trimmed.endsWith('"')) ||
      (trimmed.startsWith("'") && trimmed.endsWith("'")))
  ) {
    return trimmed.slice(1, -1);
  }
  if (trimmed === "true") {
    return true;
  }
  if (trimmed === "false") {
    return false;
  }
  return trimmed;
}

export function parseFrontmatter(text: string): { metadata: Frontmatter; body: string } {
  if (!text.startsWith("---\n")) {
    return { metadata: {}, body: text };
  }
  const parts = text.split("\n---\n");
  if (parts.length < 2) {
    return { metadata: {}, body: text };
  }
  const rawFrontmatter = parts[0];
  const body = parts.slice(1).join("\n---\n");
  const metadata: Frontmatter = {};
  let currentKey: string | null = null;
  let listMode = false;

  for (const line of rawFrontmatter.split("\n").slice(1)) {
    if (!line.trim()) {
      continue;
    }
    if ((line.startsWith("  - ") || line.startsWith("- ")) && currentKey && listMode) {
      const existing = metadata[currentKey];
      const values = Array.isArray(existing) ? existing : [];
      values.push(
        line
          .split("-", 2)[1]
          .trim()
          .replace(/^['"]|['"]$/g, ""),
      );
      metadata[currentKey] = values;
      continue;
    }
    const index = line.indexOf(":");
    if (index < 0) {
      continue;
    }
    const key = line.slice(0, index).trim();
    const value = line.slice(index + 1).trim();
    currentKey = key;
    listMode = value === "";
    metadata[key] = listMode ? [] : parseScalar(value);
  }

  return { metadata, body };
}

export function tokenize(text: string): string[] {
  const base = text.toLowerCase().replaceAll("_", " ").replaceAll("/", " ");
  const matches = base.match(TOKEN_RE) ?? [];
  const tokens: string[] = [];
  for (const token of matches) {
    tokens.push(token);
    if (token.includes("-")) {
      for (const piece of token.split("-")) {
        if (piece) {
          tokens.push(piece);
        }
      }
    }
  }
  return tokens;
}

export function stripMarkdown(text: string): string {
  return text
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/!\[[^\]]*\]\([^)]+\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\[\[([^\]]+)\]\]/g, "$1")
    .replace(/^>\s?/gm, "")
    .replace(/[*_#>-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function extractTitle(metadata: Frontmatter, body: string, fallbackName: string): string {
  const title = metadata.title;
  if (typeof title === "string" && title.trim()) {
    return title.trim();
  }
  for (const line of body.split("\n")) {
    const match = line.match(HEADING_RE);
    if (match && match[1] === "#") {
      return match[2].trim();
    }
  }
  return fallbackName;
}

export function extractSections(body: string): Array<{ heading: string; content: string }> {
  const sections: Array<{ heading: string; content: string }> = [];
  let currentHeading = "Overview";
  let currentLines: string[] = [];
  let sawPrimaryTitle = false;

  for (const line of body.split("\n")) {
    const match = line.match(HEADING_RE);
    if (match) {
      const [, level, heading] = match;
      if (level === "#") {
        sawPrimaryTitle = true;
        continue;
      }
      const content = currentLines.join("\n").trim();
      if (content) {
        sections.push({ heading: currentHeading, content });
      }
      currentHeading = heading.trim();
      currentLines = [];
      continue;
    }
    if (sawPrimaryTitle || line.trim()) {
      currentLines.push(line);
    }
  }

  const content = currentLines.join("\n").trim();
  if (content) {
    sections.push({ heading: currentHeading, content });
  }
  return sections;
}

export function listMarkdownFiles(): string[] {
  const results: string[] = [];

  const walk = (directory: string) => {
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
      const fullPath = join(directory, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath);
      } else if (entry.isFile() && entry.name.endsWith(".md")) {
        results.push(fullPath);
      }
    }
  };

  for (const directory of SOURCE_DIRS) {
    walk(directory);
  }

  return results.sort();
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
  const summary = typeof params.metadata.summary === "string" ? params.metadata.summary : "";
  const tags = Array.isArray(params.metadata.tags) ? params.metadata.tags : [];
  const related = Array.isArray(params.metadata.related) ? params.metadata.related : [];
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
  const termFreq: Record<string, number> = {};
  for (const token of tokens) {
    termFreq[token] = (termFreq[token] ?? 0) + 1;
  }

  return {
    id: params.chunkId,
    path: params.relPath,
    kind: params.kind,
    title: params.title,
    section: params.section,
    type: typeof params.metadata.type === "string" ? params.metadata.type : "",
    status: typeof params.metadata.status === "string" ? params.metadata.status : "",
    superseded_by:
      typeof params.metadata.superseded_by === "string" ? params.metadata.superseded_by : "",
    summary,
    tags,
    related,
    url: typeof params.metadata.url === "string" ? params.metadata.url : "",
    date_published:
      typeof params.metadata.date_published === "string" ? params.metadata.date_published : "",
    date_added: typeof params.metadata.date_added === "string" ? params.metadata.date_added : "",
    author: typeof params.metadata.author === "string" ? params.metadata.author : "",
    publisher: typeof params.metadata.publisher === "string" ? params.metadata.publisher : "",
    text,
    term_freq: termFreq,
    doc_len: tokens.length,
  };
}

export function buildIndex(): KbIndex {
  const files = listMarkdownFiles();
  const chunks: KbChunk[] = [];

  for (const file of files) {
    const relPath = relative(ROOT, file);
    const raw = readFileSync(file, "utf-8");
    const { metadata, body } = parseFrontmatter(raw);
    const title = extractTitle(metadata, body, relPath.replace(/\.md$/, ""));
    const sections = extractSections(body);

    const preview = sections
      .slice(0, 3)
      .map((section) => section.content)
      .join("\n\n")
      .slice(0, 2000);

    chunks.push(
      buildChunk({
        chunkId: `${relPath}::document`,
        relPath,
        kind: "document",
        title,
        section: "Document",
        metadata,
        content: preview,
      }),
    );

    for (const section of sections) {
      const clean = stripMarkdown(section.content);
      if (clean.length < 40 || LOW_SIGNAL_SECTIONS.has(section.heading)) {
        continue;
      }
      chunks.push(
        buildChunk({
          chunkId: `${relPath}::${slugify(section.heading) || "section"}`,
          relPath,
          kind: "section",
          title,
          section: section.heading,
          metadata,
          content: section.content,
        }),
      );
    }
  }

  const df: Record<string, number> = {};
  for (const chunk of chunks) {
    for (const term of Object.keys(chunk.term_freq)) {
      df[term] = (df[term] ?? 0) + 1;
    }
  }

  const avgDocLen =
    chunks.reduce((sum, chunk) => sum + chunk.doc_len, 0) / Math.max(chunks.length, 1);

  const idf: Record<string, number> = {};
  for (const [term, freq] of Object.entries(df)) {
    idf[term] = Math.log(1 + (chunks.length - freq + 0.5) / (freq + 0.5));
  }

  return {
    schema_version: 2,
    generated_at: new Date().toISOString(),
    root: ROOT,
    chunk_count: chunks.length,
    file_count: files.length,
    avg_doc_len: avgDocLen,
    idf,
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
