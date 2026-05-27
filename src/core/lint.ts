import { existsSync, readFileSync } from "node:fs";
import { join, relative } from "node:path";
import { STATUS_SUPERSEDED } from "./constants";
import { parseFrontmatter } from "./frontmatter";
import { listMarkdownFiles } from "./indexer";
import { ROOT } from "./paths";

const WIKI_INDEX_PATH = join(ROOT, "wiki", "index.md");

const WIKI_LINK_RE = /\[\[([^\]]+)\]\]/g;
const REQUIRED_FRONTMATTER_KEYS = ["id", "type", "title", "path", "summary"];
const REQUIRED_SOURCE_HEADINGS = [
  "Source Metadata",
  "TL;DR",
  "Key Claims",
  "Important Details",
  "Entities",
  "My Notes",
  "Open Questions",
  "Related",
  "Source Text",
];

type LintRule = (ctx: FileContext) => string[];

interface FileContext {
  relPath: string;
  text: string;
  metadata: Record<string, unknown>;
}

const checkFrontmatterPresent: LintRule = ({ relPath, metadata }) =>
  Object.keys(metadata).length === 0 ? [`${relPath}: missing frontmatter`] : [];

const checkRequiredKeys: LintRule = ({ relPath, metadata }) =>
  REQUIRED_FRONTMATTER_KEYS.filter(
    (key) => metadata[key] === undefined || metadata[key] === "",
  ).map((key) => `${relPath}: missing or empty frontmatter key \`${key}\``);

const checkPathMatch: LintRule = ({ relPath, metadata }) =>
  typeof metadata.path === "string" && metadata.path !== relPath
    ? [`${relPath}: frontmatter \`path\` should match repo-relative path \`${relPath}\``]
    : [];

const checkSourceMetadataPath: LintRule = ({ relPath, text }) => {
  const path = text.match(/^- Path:\s+(.+)$/m)?.[1]?.trim();
  if (!path) return [`${relPath}: \`Source Metadata\` should include a \`Path\` bullet`];
  if (path !== relPath) return [`${relPath}: \`Source Metadata\` path should match \`${relPath}\``];
  return [];
};

const checkSuperseded: LintRule = ({ relPath, metadata }) =>
  metadata.status === STATUS_SUPERSEDED &&
  (!metadata.superseded_by || metadata.superseded_by === "")
    ? [`${relPath}: \`status: superseded\` should include \`superseded_by\``]
    : [];

const checkTitleHeading: LintRule = ({ relPath, text }) =>
  !/^#\s+.+/m.test(text) ? [`${relPath}: missing top-level title heading`] : [];

const checkRequiredHeadings: LintRule = ({ relPath, text }) =>
  REQUIRED_SOURCE_HEADINGS.filter((h) => !text.includes(`## ${h}`)).map(
    (h) => `${relPath}: missing heading \`${h}\``,
  );

const SOURCE_RULES: LintRule[] = [
  checkFrontmatterPresent,
  checkRequiredKeys,
  checkPathMatch,
  checkSourceMetadataPath,
  checkSuperseded,
  checkTitleHeading,
  checkRequiredHeadings,
];

function checkDanglingWikiLinks(ctx: FileContext, slugs: Set<string>): string[] {
  return [...ctx.text.matchAll(WIKI_LINK_RE)]
    .map((m) => m[1]?.split("|", 1)[0]?.trim())
    .filter((target): target is string => !!target && !slugs.has(target))
    .map((target) => `${ctx.relPath}: dangling wiki link \`[[${target}]]\``);
}

function checkCaseCollisionWikiLinks(
  ctx: FileContext,
  slugs: Set<string>,
  lowerToCanonical: Map<string, string>,
): string[] {
  return [...ctx.text.matchAll(WIKI_LINK_RE)]
    .map((m) => m[1]?.split("|", 1)[0]?.trim())
    .filter((target): target is string => !!target)
    .filter((target) => !slugs.has(target))
    .filter((target) => lowerToCanonical.has(target.toLowerCase()))
    .map((target) => {
      const canonical = lowerToCanonical.get(target.toLowerCase());
      return `${ctx.relPath}: case-collision wiki link \`[[${target}]]\` near-matches \`${canonical}.md\``;
    });
}

const CATALOG_EXEMPT_PATHS = new Set(["wiki/index.md", "wiki/log.md"]);

function checkWikiIndexCoverage(files: string[]): string[] {
  if (!existsSync(WIKI_INDEX_PATH)) return [];

  const indexText = readFileSync(WIKI_INDEX_PATH, "utf-8");
  const indexedSlugs = new Set(
    [...indexText.matchAll(WIKI_LINK_RE)]
      .map((m) => m[1]?.split("|", 1)[0]?.trim())
      .filter((slug): slug is string => !!slug),
  );

  return files
    .map((file) => ({ file, rel: relative(ROOT, file) }))
    .filter(({ rel }) => rel.startsWith("wiki/") && !CATALOG_EXEMPT_PATHS.has(rel))
    .filter(({ rel }) => {
      const slug = rel.split("/").at(-1)?.replace(/\.md$/, "") ?? "";
      return !indexedSlugs.has(slug);
    })
    .map(({ rel }) => `${rel}: not listed in wiki/index.md`);
}

export function collectKbWarnings(): string[] {
  const files = listMarkdownFiles().concat(
    ["AGENTS.md", "CLAUDE.md"].map((f) => `${ROOT}/${f}`).filter(existsSync),
  );
  const slugs = new Set(files.map((f) => f.split("/").at(-1)?.replace(/\.md$/, "") ?? ""));
  const lowerToCanonical = new Map<string, string>();
  for (const slug of slugs) {
    const lower = slug.toLowerCase();
    if (!lowerToCanonical.has(lower)) lowerToCanonical.set(lower, slug);
  }

  const perFileWarnings = files.flatMap((file) => {
    const relPath = relative(ROOT, file);
    const text = readFileSync(file, "utf-8");
    const { metadata } = parseFrontmatter(text);
    const ctx: FileContext = { relPath, text, metadata };

    const isSource = relPath.startsWith("raw/articles/");
    return [
      ...(isSource ? SOURCE_RULES.flatMap((rule) => rule(ctx)) : []),
      ...(!isSource ? checkDanglingWikiLinks(ctx, slugs) : []),
      ...checkCaseCollisionWikiLinks(ctx, slugs, lowerToCanonical),
    ];
  });

  return [...perFileWarnings, ...checkWikiIndexCoverage(files)];
}

export function main(): number {
  const warnings = collectKbWarnings();
  if (warnings.length > 0) {
    console.log("KB lint warnings:");
    for (const warning of warnings) {
      console.log(`- ${warning}`);
    }
    console.log(`\nTotal warnings: ${warnings.length}`);
    return 1;
  }

  console.log("KB lint passed with no warnings.");
  return 0;
}
