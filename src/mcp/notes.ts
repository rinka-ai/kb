import { existsSync, readFileSync, realpathSync } from "node:fs";
import { isAbsolute, relative, resolve } from "node:path";
import { parseFrontmatter } from "../core/frontmatter";
import { listMarkdownFiles } from "../core/indexer";
import { extractTitle } from "../core/markdown";
import { ROOT } from "../core/paths";

function stripMdExt(path: string): string {
  return path.replace(/\.md$/, "");
}

export function resolveKbNotePath(inputPath: string): string {
  const trimmed = inputPath.trim();
  const directPath = isAbsolute(trimmed) ? resolve(trimmed) : resolve(ROOT, trimmed);
  if (existsSync(directPath)) {
    const realPath = realpathSync(directPath);
    if (realPath.startsWith(ROOT)) return realPath;
  }

  const normalized = trimmed.replace(/^\.\//, "");
  const withoutExt = stripMdExt(normalized);
  const matches = listMarkdownFiles().filter((file) => {
    const rel = relative(ROOT, file);
    return (
      rel === normalized ||
      rel === `${withoutExt}.md` ||
      stripMdExt(rel) === withoutExt ||
      stripMdExt(rel.split("/").pop() ?? "") === withoutExt
    );
  });

  if (matches.length === 1) return matches[0];
  if (matches.length > 1) {
    const candidates = matches.map((m) => relative(ROOT, m)).join(", ");
    throw new Error(`Multiple KB notes matched "${trimmed}": ${candidates}`);
  }
  throw new Error(`KB note not found: ${trimmed}`);
}

export function readKbNote(inputPath: string, maxChars = 24000) {
  const absolutePath = resolveKbNotePath(inputPath);
  const relPath = relative(ROOT, absolutePath);
  const raw = readFileSync(absolutePath, "utf-8");
  const { metadata, body } = parseFrontmatter(raw);
  const truncated = raw.length > maxChars;

  return {
    path: relPath,
    title: extractTitle(metadata, body, stripMdExt(relPath)),
    metadata,
    text: truncated ? `${raw.slice(0, maxChars)}\n\n[truncated]` : raw,
    truncated,
  };
}
