import { Readability } from "@mozilla/readability";
import * as cheerio from "cheerio";
import { parseHTML } from "linkedom";

export function normalizeWhitespace(text: string): string {
  return text
    .replace(/\r/g, "")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export function extractMetaTags(html: string): Record<string, string> {
  const $ = cheerio.load(html);
  return [...$("meta")]
    .map((el) => ({
      key: $(el).attr("name") ?? $(el).attr("property") ?? $(el).attr("itemprop"),
      content: $(el).attr("content"),
    }))
    .filter((m): m is { key: string; content: string } => !!m.key && !!m.content)
    .reduce<Record<string, string>>((acc, { key, content }) => {
      acc[key] ??= content;
      return acc;
    }, {});
}

export function extractJsonLdObjects(html: string): Record<string, unknown>[] {
  const $ = cheerio.load(html);
  return [...$('script[type="application/ld+json"]')].flatMap((el) => {
    const raw = $(el).text().trim();
    if (!raw) return [];
    try {
      return flattenJsonLd(JSON.parse(raw));
    } catch {
      return [];
    }
  });
}

function flattenJsonLd(value: unknown): Record<string, unknown>[] {
  if (Array.isArray(value)) return value.flatMap(flattenJsonLd);
  if (!value || typeof value !== "object") return [];
  const record = value as Record<string, unknown>;
  const graph = Array.isArray(record["@graph"]) ? record["@graph"] : [];
  return [record, ...graph.flatMap(flattenJsonLd)];
}

export function asString(value: unknown): string {
  if (typeof value === "string") return value.trim();
  if (Array.isArray(value)) return value.map(asString).find(Boolean) ?? "";
  if (value && typeof value === "object") {
    const record = value as Record<string, unknown>;
    return asString(record.name ?? record.headline ?? record.text ?? "");
  }
  return "";
}

export function extractArticleContent(html: string): { text: string; title: string } {
  const { document } = parseHTML(html);
  const article = new Readability(document).parse();
  if (article?.textContent) {
    return { text: normalizeWhitespace(article.textContent), title: article.title ?? "" };
  }
  const $ = cheerio.load(html);
  $("script, style, nav, footer, header, aside").remove();
  return { text: normalizeWhitespace($("body").text()), title: $("title").text() };
}

export function extractParagraphsFromHtml(html: string): string[] {
  return extractArticleContent(html)
    .text.split("\n\n")
    .map((p) => p.trim())
    .filter((p) => p.length >= 40);
}

export function extractHeadingsFromHtml(html: string): string[] {
  const $ = cheerio.load(html);
  return [...$("h2, h3")]
    .map((el) => $(el).text().trim())
    .filter(Boolean)
    .slice(0, 6);
}

export function extractHtmlTitle(html: string): string {
  const $ = cheerio.load(html);
  return $("title")
    .text()
    .replace(/\s+\|\s+.+$/, "")
    .trim();
}
