#!/usr/bin/env bun

import { existsSync, readFileSync } from "node:fs";
import { relative } from "node:path";
import { ROOT, listMarkdownFiles, parseFrontmatter } from "./kb-lib";

const WIKI_LINK_RE = /\[\[([^\]]+)\]\]/g;

const REQUIRED_SOURCE_HEADINGS = [
  "## Source Metadata",
  "## TL;DR",
  "## Key Claims",
  "## Important Details",
  "## Entities",
  "## My Notes",
  "## Open Questions",
  "## Related",
  "## Source Text",
];

export function collectKbWarnings(): string[] {
  const files = listMarkdownFiles().concat(
    ["AGENTS.md", "READ.md", "CLAUDE.md"]
      .map((file) => `${ROOT}/${file}`)
      .filter((file) => existsSync(file)),
  );
  const slugs = new Set(files.map((file) => file.split("/").at(-1)?.replace(/\.md$/, "") ?? ""));
  const warnings: string[] = [];

  for (const file of files) {
    const relPath = relative(ROOT, file);
    const text = readFileSync(file, "utf-8");
    const { metadata } = parseFrontmatter(text);

    if (relPath.startsWith("raw/articles/")) {
      if (Object.keys(metadata).length === 0) {
        warnings.push(`${relPath}: missing frontmatter`);
      }
      for (const key of ["id", "type", "title", "summary"]) {
        const value = metadata[key];
        if (value === undefined || value === "") {
          warnings.push(`${relPath}: missing or empty frontmatter key \`${key}\``);
        }
      }
      if (metadata.status === "superseded" && metadata.superseded_by !== undefined) {
        const supersededBy = metadata.superseded_by;
        if (supersededBy === "") {
          warnings.push(`${relPath}: \`status: superseded\` should include \`superseded_by\``);
        }
      } else if (metadata.status === "superseded") {
        warnings.push(`${relPath}: \`status: superseded\` should include \`superseded_by\``);
      }
      if (!/^#\s+.+/m.test(text)) {
        warnings.push(`${relPath}: missing top-level title heading`);
      }
      for (const heading of REQUIRED_SOURCE_HEADINGS) {
        if (!text.includes(heading)) {
          warnings.push(`${relPath}: missing heading \`${heading.replace(/^##\s+/, "")}\``);
        }
      }
    }

    if (!relPath.startsWith("raw/articles/")) {
      const matches = text.matchAll(WIKI_LINK_RE);
      for (const match of matches) {
        const target = match[1]?.split("|", 1)[0]?.trim();
        if (target && !slugs.has(target)) {
          warnings.push(`${relPath}: dangling wiki link \`[[${target}]]\``);
        }
      }
    }
  }

  return warnings;
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

if (import.meta.main) {
  process.exit(main());
}
