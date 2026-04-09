import { readFileSync } from "node:fs";
import { basename, extname, resolve } from "node:path";
import { URL } from "node:url";
import { parseFrontmatter } from "../frontmatter";
import { slugify, stripMarkdown } from "../markdown";
import {
  asString,
  extractHeadingsFromHtml,
  extractHtmlTitle,
  extractJsonLdObjects,
  extractMetaTags,
  extractParagraphsFromHtml,
  normalizeWhitespace,
} from "./html";
import type { ExtractedSource, IngestArgs } from "./types";

const ARTICLE_TYPES = new Set(["article", "blogposting", "newsarticle", "techarticle", "webpage"]);

export function normalizeDate(value: string): string {
  const trimmed = value?.trim();
  if (!trimmed) return "";
  if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) return trimmed;
  const parsed = new Date(trimmed);
  return Number.isNaN(parsed.getTime()) ? "" : parsed.toISOString().slice(0, 10);
}

function firstMeaningfulSentence(paragraph: string): string {
  return (
    paragraph
      .split(/(?<=[.!?])\s+/)
      .map((s) => s.trim())
      .find((s) => s.length >= 40) ?? paragraph
  );
}

function uniqueByKey<T>(items: T[], keyFn: (item: T) => string, limit: number): T[] {
  const seen = new Set<string>();
  const result: T[] = [];
  for (const item of items) {
    const key = keyFn(item);
    if (seen.has(key)) continue;
    seen.add(key);
    result.push(item);
    if (result.length >= limit) break;
  }
  return result;
}

function deriveKeyClaims(summary: string, paragraphs: string[]): string[] {
  const candidates = [summary, ...paragraphs.slice(0, 5).map(firstMeaningfulSentence)]
    .map(normalizeWhitespace)
    .filter((text) => text.length >= 40 && text.length <= 260);

  return uniqueByKey(candidates, (c) => c.toLowerCase(), 4);
}

function deriveImportantDetails(
  headings: string[],
  sourceLabel: string,
  published: string,
): string[] {
  return [
    `Source captured from ${sourceLabel}.`,
    ...(published ? [`Published date detected as ${published}.`] : []),
    ...headings.slice(0, 5).map((h) => `Section heading: ${h}`),
  ];
}

function findArticleJsonLd(objects: Record<string, unknown>[]): Record<string, unknown> | null {
  return (
    objects.find((obj) => {
      const type = obj["@type"];
      const values = Array.isArray(type) ? type : [type];
      return values.some((v) => ARTICLE_TYPES.has(String(v).toLowerCase()));
    }) ?? null
  );
}

function extractTitleFromMarkdown(text: string, fallback: string): string {
  const { metadata, body } = parseFrontmatter(text);
  if (typeof metadata.title === "string" && metadata.title.trim()) {
    return metadata.title.trim();
  }
  return (
    body
      .split("\n")
      .find((line) => /^#\s+.+$/.test(line))
      ?.match(/^#\s+(.+)$/)?.[1]
      ?.trim() ?? fallback
  );
}

function extractParagraphsFromMarkdown(text: string): string[] {
  return normalizeWhitespace(stripMarkdown(text))
    .split("\n\n")
    .map((p) => p.trim())
    .filter((p) => p.length >= 40);
}

const FETCH_TIMEOUT_MS = 30_000;
const BLOCKED_HOSTNAMES = new Set([
  "localhost",
  "127.0.0.1",
  "0.0.0.0",
  "[::1]",
  "169.254.169.254",
]);

async function fetchRemoteText(url: string): Promise<string> {
  const parsed = new URL(url);
  if (BLOCKED_HOSTNAMES.has(parsed.hostname)) {
    throw new Error(`Blocked URL: ${url} (local/metadata addresses are not allowed)`);
  }
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const response = await fetch(url, {
      headers: { "user-agent": "ai-research-kb-ingest/1.0" },
      signal: controller.signal,
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
    }
    return await response.text();
  } finally {
    clearTimeout(timeout);
  }
}

export async function extractFromUrl(url: string): Promise<ExtractedSource> {
  const html = await fetchRemoteText(url);
  const meta = extractMetaTags(html);
  const article = findArticleJsonLd(extractJsonLdObjects(html));
  const paragraphs = extractParagraphsFromHtml(html);
  const headings = extractHeadingsFromHtml(html);
  const parsedUrl = new URL(url);

  const title =
    asString(article?.headline) ||
    meta["og:title"] ||
    meta["twitter:title"] ||
    extractHtmlTitle(html) ||
    slugify(parsedUrl.pathname.split("/").filter(Boolean).at(-1) ?? "untitled");

  const author = asString(article?.author) || meta.author || "Unknown";

  const publisher =
    asString(article?.publisher) ||
    meta["og:site_name"] ||
    parsedUrl.hostname.replace(/^www\./, "");

  const published =
    normalizeDate(asString(article?.datePublished)) ||
    normalizeDate(meta["article:published_time"] ?? "") ||
    normalizeDate(meta.datepublished ?? "");

  const summary =
    meta.description ||
    meta["og:description"] ||
    meta["twitter:description"] ||
    firstMeaningfulSentence(paragraphs[0] ?? "Imported article.");

  return {
    title,
    author,
    publisher,
    url,
    datePublished: published,
    summary: normalizeWhitespace(summary),
    keyClaims: deriveKeyClaims(summary, paragraphs),
    details: deriveImportantDetails(headings, parsedUrl.hostname, published),
    sourceText: paragraphs.join("\n\n"),
    tags: [],
    related: [],
  };
}

export function extractFromLocalFile(filePath: string): ExtractedSource {
  const absolutePath = resolve(filePath);
  const raw = readFileSync(absolutePath, "utf-8");
  const extension = extname(absolutePath).toLowerCase();
  const title = extractTitleFromMarkdown(raw, basename(absolutePath, extension));
  const paragraphs =
    extension === ".html" || extension === ".htm"
      ? extractParagraphsFromHtml(raw)
      : extractParagraphsFromMarkdown(raw);
  const summary = firstMeaningfulSentence(
    paragraphs[0] ?? `Imported from local file ${absolutePath}.`,
  );

  return {
    title,
    author: "Unknown",
    publisher: "local file",
    url: "",
    datePublished: "",
    summary,
    keyClaims: deriveKeyClaims(summary, paragraphs),
    details: [`Imported from local file ${absolutePath}.`],
    sourceText: paragraphs.join("\n\n"),
    tags: [],
    related: [],
  };
}

export function applyOverrides(source: ExtractedSource, args: IngestArgs): ExtractedSource {
  return {
    ...source,
    title: args.title || source.title,
    author: args.author || source.author,
    publisher: args.publisher || source.publisher,
    datePublished: normalizeDate(args.published || source.datePublished),
    tags: [...new Set([...source.tags, ...args.tags])],
    related: [...new Set([...source.related, ...args.tags])],
  };
}
