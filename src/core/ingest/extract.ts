import { readFileSync } from "node:fs";
import { isIP } from "node:net";
import { basename, extname, resolve } from "node:path";
import { URL } from "node:url";
import { parseFrontmatter } from "../frontmatter";
import { slugify, stripMarkdown } from "../markdown";
import {
  asString,
  extractCanonicalUrl,
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
const FETCH_MAX_BYTES = 8 * 1024 * 1024;
const FETCH_MAX_REDIRECTS = 5;
const FETCH_ATTEMPTS = 3;
const RETRYABLE_STATUS_CODES = new Set([408, 425, 429, 500, 502, 503, 504]);
const BLOCKED_HOSTNAMES = new Set([
  "localhost",
  "127.0.0.1",
  "0.0.0.0",
  "[::1]",
  "169.254.169.254",
]);

interface RemoteFetchResult {
  text: string;
  finalUrl: string;
  contentType: string;
}

function isBlockedIpv4(hostname: string): boolean {
  const [a, b] = hostname.split(".").map((part) => Number(part));
  if (![a, b].every((part) => Number.isInteger(part))) {
    return false;
  }

  return (
    a === 0 ||
    a === 10 ||
    a === 127 ||
    (a === 100 && b >= 64 && b <= 127) ||
    (a === 169 && b === 254) ||
    (a === 172 && b >= 16 && b <= 31) ||
    (a === 192 && b === 168) ||
    a >= 224
  );
}

function isBlockedIpv6(hostname: string): boolean {
  const normalized = hostname.toLowerCase().replace(/^\[|\]$/g, "");
  if (normalized.startsWith("::ffff:")) {
    return true;
  }

  return (
    normalized === "::1" ||
    normalized === "::" ||
    normalized.startsWith("fe80:") ||
    normalized.startsWith("fc") ||
    normalized.startsWith("fd")
  );
}

export function isBlockedFetchUrl(url: string): boolean {
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return true;
  }

  const hostname = parsed.hostname.toLowerCase();
  if (!["http:", "https:"].includes(parsed.protocol)) {
    return true;
  }
  if (BLOCKED_HOSTNAMES.has(hostname) || hostname.endsWith(".local")) {
    return true;
  }
  if (isIP(hostname) === 4) {
    return isBlockedIpv4(hostname);
  }
  if (isIP(hostname.replace(/^\[|\]$/g, "")) === 6) {
    return isBlockedIpv6(hostname);
  }

  return false;
}

function assertFetchableUrl(url: string): void {
  if (isBlockedFetchUrl(url)) {
    throw new Error(`Blocked URL: ${url} (local/metadata/non-http addresses are not allowed)`);
  }
}

function isSupportedTextResponse(contentType: string, url: string): boolean {
  const type = contentType.toLowerCase();
  const path = new URL(url).pathname.toLowerCase();
  return (
    !type ||
    type.startsWith("text/") ||
    type.includes("html") ||
    type.includes("xml") ||
    type.includes("json") ||
    type.includes("markdown") ||
    path.endsWith(".txt") ||
    path.endsWith(".md") ||
    path.endsWith(".markdown")
  );
}

async function pauseBeforeRetry(attempt: number): Promise<void> {
  await new Promise((resolveDelay) => setTimeout(resolveDelay, 150 * 2 ** attempt));
}

async function responseTextWithinLimit(response: Response, url: string): Promise<string> {
  const lengthHeader = response.headers.get("content-length");
  const declaredLength = lengthHeader ? Number(lengthHeader) : 0;
  if (Number.isFinite(declaredLength) && declaredLength > FETCH_MAX_BYTES) {
    throw new Error(`Refusing to ingest ${url}: response is larger than ${FETCH_MAX_BYTES} bytes`);
  }

  const buffer = await response.arrayBuffer();
  if (buffer.byteLength > FETCH_MAX_BYTES) {
    throw new Error(`Refusing to ingest ${url}: response is larger than ${FETCH_MAX_BYTES} bytes`);
  }

  return new TextDecoder().decode(buffer);
}

async function fetchWithRedirects(url: string): Promise<RemoteFetchResult> {
  let currentUrl = new URL(url).toString();

  for (let redirectCount = 0; redirectCount <= FETCH_MAX_REDIRECTS; redirectCount += 1) {
    assertFetchableUrl(currentUrl);

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
    try {
      const response = await fetch(currentUrl, {
        headers: {
          accept: "text/html, text/markdown, text/plain, application/xhtml+xml;q=0.9, */*;q=0.2",
          "user-agent": "ai-research-kb-ingest/1.0",
        },
        redirect: "manual",
        signal: controller.signal,
      });

      if (response.status >= 300 && response.status < 400) {
        const location = response.headers.get("location");
        if (!location) {
          throw new Error(`Failed to fetch ${currentUrl}: redirect missing Location header`);
        }
        if (redirectCount === FETCH_MAX_REDIRECTS) {
          throw new Error(`Failed to fetch ${url}: too many redirects`);
        }
        currentUrl = new URL(location, currentUrl).toString();
        continue;
      }

      const contentType = response.headers.get("content-type") ?? "";
      if (!response.ok) {
        throw new Error(`Failed to fetch ${currentUrl}: ${response.status} ${response.statusText}`);
      }
      if (!isSupportedTextResponse(contentType, currentUrl)) {
        throw new Error(
          `Refusing to ingest ${currentUrl}: unsupported content type ${contentType || "unknown"}`,
        );
      }

      return {
        text: await responseTextWithinLimit(response, currentUrl),
        finalUrl: currentUrl,
        contentType,
      };
    } finally {
      clearTimeout(timeout);
    }
  }

  throw new Error(`Failed to fetch ${url}: too many redirects`);
}

async function fetchRemoteText(url: string): Promise<RemoteFetchResult> {
  let lastError: unknown;
  for (let attempt = 0; attempt < FETCH_ATTEMPTS; attempt += 1) {
    try {
      return await fetchWithRedirects(url);
    } catch (error) {
      lastError = error;
      const message = error instanceof Error ? error.message : String(error);
      const retryableStatus = [...RETRYABLE_STATUS_CODES].some((status) =>
        message.includes(`: ${status} `),
      );
      const retryableNetworkError =
        error instanceof TypeError ||
        (error instanceof DOMException &&
          error.name !== "AbortError" &&
          !message.startsWith("Blocked URL"));
      if (attempt === FETCH_ATTEMPTS - 1 || !(retryableStatus || retryableNetworkError)) {
        break;
      }
      await pauseBeforeRetry(attempt);
    }
  }

  throw lastError instanceof Error ? lastError : new Error(String(lastError));
}

export async function extractFromUrl(url: string): Promise<ExtractedSource> {
  const fetched = await fetchRemoteText(url);
  const html = fetched.text;
  const meta = extractMetaTags(html);
  const article = findArticleJsonLd(extractJsonLdObjects(html));
  const parsedUrl = new URL(fetched.finalUrl);
  const contentType = fetched.contentType.toLowerCase();
  const isPlainText =
    contentType.startsWith("text/plain") ||
    contentType.includes("markdown") ||
    contentType.includes("json") ||
    parsedUrl.pathname.toLowerCase().endsWith(".txt") ||
    parsedUrl.pathname.toLowerCase().endsWith(".md") ||
    parsedUrl.pathname.toLowerCase().endsWith(".markdown");
  const paragraphs = isPlainText
    ? extractParagraphsFromMarkdown(html)
    : extractParagraphsFromHtml(html);
  const headings = isPlainText ? [] : extractHeadingsFromHtml(html);
  const canonicalUrl = isPlainText
    ? ""
    : extractCanonicalUrl(html, fetched.finalUrl) || meta["og:url"] || "";
  const sourceUrl =
    canonicalUrl && !isBlockedFetchUrl(canonicalUrl) ? canonicalUrl : fetched.finalUrl;
  const fallbackTitle = slugify(parsedUrl.pathname.split("/").filter(Boolean).at(-1) ?? "untitled");

  const title =
    (isPlainText ? extractTitleFromMarkdown(html, fallbackTitle) : "") ||
    asString(article?.headline) ||
    meta["og:title"] ||
    meta["twitter:title"] ||
    extractHtmlTitle(html) ||
    fallbackTitle;

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
    url: sourceUrl,
    datePublished: published,
    summary: normalizeWhitespace(summary),
    keyClaims: deriveKeyClaims(summary, paragraphs),
    details: [
      ...deriveImportantDetails(headings, parsedUrl.hostname, published),
      ...(fetched.finalUrl !== sourceUrl ? [`Canonical URL detected as ${sourceUrl}.`] : []),
      ...(new URL(url).toString() !== fetched.finalUrl
        ? [`Final fetched URL after redirects: ${fetched.finalUrl}.`]
        : []),
    ],
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
