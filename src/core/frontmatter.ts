import matter from "gray-matter";
import type { Frontmatter, FrontmatterValue } from "./types";

const toFrontmatterValue = (v: unknown): FrontmatterValue | null =>
  typeof v === "string" || typeof v === "boolean"
    ? v
    : Array.isArray(v) && v.every((el) => typeof el === "string")
      ? v
      : v != null
        ? String(v)
        : null;

export function parseFrontmatter(text: string): { metadata: Frontmatter; body: string } {
  const { data, content } = matter(text);
  const metadata = Object.entries(data).reduce<Frontmatter>((acc, [key, value]) => {
    const coerced = toFrontmatterValue(value);
    if (coerced != null) acc[key] = coerced;
    return acc;
  }, {});
  return { metadata, body: content };
}
