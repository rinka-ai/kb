import { existsSync } from "node:fs";
import { join } from "node:path";
import { slugify } from "../markdown";
import type { ExtractedSource, IngestArgs } from "./types";

function yamlList(values: string[]): string {
  return `[${values.join(", ")}]`;
}

export function chooseOutputPath(baseDirectory: string, filenameBase: string): string {
  let candidate = join(baseDirectory, `${filenameBase}.md`);
  let counter = 2;
  while (existsSync(candidate)) {
    candidate = join(baseDirectory, `${filenameBase}-${counter}.md`);
    counter += 1;
  }
  return candidate;
}

export function makeMarkdown(source: ExtractedSource, args: IngestArgs, notePath: string): string {
  const dateAdded = new Date().toISOString().slice(0, 10);
  const noteId = `article-${dateAdded}-${slugify(source.title)}`;
  const tags = [...new Set([...args.tags, ...source.tags].filter(Boolean))];
  const related = [...new Set([...tags, ...source.related].filter(Boolean))];
  const tlDr = source.summary || "Imported automatically. Review and refine.";
  const keyClaims =
    source.keyClaims.length > 0
      ? source.keyClaims.map((claim) => `- ${claim}`).join("\n")
      : "- Imported automatically. Review and refine key claims.";
  const details =
    source.details.length > 0
      ? source.details.map((detail) => `- ${detail}`).join("\n")
      : "- Imported automatically. Review and refine important details.";
  const relatedBlock =
    related.length > 0 ? related.map((item) => `- [[${item}]]`).join("\n") : "- None yet.";

  return `---
id: ${noteId}
type: source
title: ${JSON.stringify(source.title)}
path: ${notePath}
author: ${source.author || "Unknown"}
publisher: ${source.publisher || "Unknown"}
url: ${source.url}
date_published: ${source.datePublished}
date_added: ${dateAdded}
tags: ${yamlList(tags)}
status: ingested
quality: medium
summary: ${source.summary || tlDr}
related: ${yamlList(related)}
---

# ${source.title}

## Source Metadata

- Path: ${notePath}
- Author: ${source.author || "Unknown"}
- Published: ${source.datePublished || "Unknown"}
- Publisher: ${source.publisher || "Unknown"}
- URL: ${source.url || "Local file"}

## TL;DR

${tlDr}

## Key Claims

${keyClaims}

## Important Details

${details}

## Entities

- People: Unknown
- Companies: Unknown
- Tools: Unknown
- Concepts: Unknown

## My Notes

- Imported automatically by \`bun run kb:ingest\`.
- Review and refine the structured sections before relying on this note heavily.

## Open Questions

- What claims in this source matter most for the current knowledge base?
- Which concept pages should link back to this note?

## Related

${relatedBlock}

## Source Text

${source.sourceText || "No source text extracted."}
`;
}
