import type { Frontmatter } from "./types";

const TOKEN_RE = /[a-z0-9]+(?:-[a-z0-9]+)*/g;
const HEADING_RE = /^(#{1,6})\s+(.+?)\s*$/;

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
