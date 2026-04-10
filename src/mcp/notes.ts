import { readFileSync } from "node:fs";
import { relative } from "node:path";
import { parseFrontmatter } from "../core/frontmatter";
import { extractTitle } from "../core/markdown";
import { resolveKbNotePath } from "../core/notes";
import { ROOT } from "../core/paths";

export { resolveKbNotePath } from "../core/notes";

function stripMdExt(path: string): string {
  return path.replace(/\.md$/, "");
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
