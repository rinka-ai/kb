import type { Frontmatter } from "./types";

const TOKEN_RE = /[a-z0-9]+(?:-[a-z0-9]+)*/g;
const HEADING_RE = /^(#{1,6})\s+(.+?)\s*$/;
const SEARCH_SUFFIX_RULES = [
  "izations",
  "ization",
  "ations",
  "ation",
  "tions",
  "tion",
  "sions",
  "sion",
  "ments",
  "ment",
  "ities",
  "ity",
  "nesses",
  "ness",
  "ingly",
  "edly",
  "ings",
  "ing",
  "eds",
  "ed",
  "izers",
  "izer",
  "isers",
  "iser",
  "ators",
  "ator",
  "ories",
  "ory",
  "ists",
  "ist",
  "ers",
  "er",
  "ors",
  "or",
  "ials",
  "ial",
  "ally",
  "able",
  "ible",
  "ives",
  "ive",
  "als",
  "al",
  "ies",
  "es",
  "s",
] as const;

function normalizeSearchCandidate(candidate: string): string {
  return candidate.replace(/[^a-z0-9-]/g, "");
}

function maybeAddVariant(variants: Set<string>, candidate: string): void {
  const normalized = normalizeSearchCandidate(candidate);
  if (normalized.length >= 3) {
    variants.add(normalized);
  }
}

export function tokenVariants(token: string): string[] {
  const normalized = normalizeSearchCandidate(token.toLowerCase());
  if (!normalized) {
    return [];
  }

  const variants = new Set<string>([normalized]);
  if (normalized.includes("-")) {
    return [...variants];
  }

  if (normalized.endsWith("ies") && normalized.length > 4) {
    maybeAddVariant(variants, `${normalized.slice(0, -3)}y`);
  }
  if (normalized.endsWith("es") && normalized.length > 4) {
    maybeAddVariant(variants, normalized.slice(0, -2));
  }
  if (normalized.endsWith("s") && normalized.length > 3 && !normalized.endsWith("ss")) {
    maybeAddVariant(variants, normalized.slice(0, -1));
  }

  for (const suffix of SEARCH_SUFFIX_RULES) {
    if (!normalized.endsWith(suffix)) {
      continue;
    }

    const stem = normalized.slice(0, -suffix.length);
    if (stem.length < 4) {
      continue;
    }

    maybeAddVariant(variants, stem);

    if ((suffix === "ed" || suffix === "ing") && !stem.endsWith("e")) {
      maybeAddVariant(variants, `${stem}e`);
    }

    if (suffix === "ation" || suffix === "ations") {
      maybeAddVariant(variants, `${stem}ate`);
    }

    if ((suffix === "ator" || suffix === "ators") && !stem.endsWith("e")) {
      maybeAddVariant(variants, `${stem}e`);
    }

    if (
      (suffix === "tion" || suffix === "tions" || suffix === "sion" || suffix === "sions") &&
      stem.length >= 5
    ) {
      maybeAddVariant(variants, stem);
      if (!stem.endsWith("e")) {
        maybeAddVariant(variants, `${stem}e`);
      }
    }
  }

  return [...variants];
}

export function tokenizeForSearch(text: string): string[] {
  return tokenize(text).flatMap((token) => tokenVariants(token));
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function tokenize(text: string): string[] {
  const base = text.toLowerCase().replaceAll("_", " ").replaceAll("/", " ");
  return (base.match(TOKEN_RE) ?? []).flatMap((token) =>
    token.includes("-") ? [token, ...token.split("-").filter(Boolean)] : [token],
  );
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
  if (typeof metadata.title === "string" && metadata.title.trim()) {
    return metadata.title.trim();
  }
  const heading = body.split("\n").find((line) => HEADING_RE.test(line) && line.startsWith("# "));
  return heading?.match(HEADING_RE)?.[2]?.trim() ?? fallbackName;
}

export function extractSections(body: string): Array<{ heading: string; content: string }> {
  const sections: Array<{ heading: string; content: string }> = [];
  let currentHeading = "Overview";
  let currentLines: string[] = [];
  let sawPrimaryTitle = false;

  const flush = () => {
    const content = currentLines.join("\n").trim();
    if (content) sections.push({ heading: currentHeading, content });
    currentLines = [];
  };

  for (const line of body.split("\n")) {
    const match = line.match(HEADING_RE);
    if (match?.[1] === "#") {
      sawPrimaryTitle = true;
      continue;
    }
    if (match) {
      flush();
      currentHeading = match[2].trim();
      continue;
    }
    if (sawPrimaryTitle || line.trim()) {
      currentLines.push(line);
    }
  }

  flush();
  return sections;
}
