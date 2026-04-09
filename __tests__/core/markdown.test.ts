import { describe, expect, test } from "bun:test";
import {
  extractSections,
  extractTitle,
  slugify,
  stripMarkdown,
  tokenize,
} from "../../src/core/markdown";

describe("markdown", () => {
  test("extractSections ignores the primary title and collects sub-sections", () => {
    const body = `# Example

## TL;DR
Short summary.

## Key Claims
- Claim one
`;

    expect(extractSections(body)).toEqual([
      { heading: "TL;DR", content: "Short summary." },
      { heading: "Key Claims", content: "- Claim one" },
    ]);
  });

  test("extractTitle prefers frontmatter, then h1, then fallback", () => {
    expect(extractTitle({ title: "Frontmatter Title" }, "# Body Title", "fallback")).toBe(
      "Frontmatter Title",
    );
    expect(extractTitle({}, "# Body Title\n\nMore text", "fallback")).toBe("Body Title");
    expect(extractTitle({}, "No heading here", "fallback")).toBe("fallback");
  });

  test("tokenize expands underscores, slashes, and hyphenated terms", () => {
    expect(tokenize("context-engineering foo/bar baz_qux")).toEqual([
      "context-engineering",
      "context",
      "engineering",
      "foo",
      "bar",
      "baz",
      "qux",
    ]);
  });

  test("stripMarkdown removes formatting while preserving readable text", () => {
    const input = `# Title

Quoted text

> Important quote

Inline \`code\` and a [link](https://example.com).
![](https://example.com/image.png)
[[managed-agents]]

\`\`\`ts
const hidden = true;
\`\`\`
`;

    expect(stripMarkdown(input)).toBe(
      "Title Quoted text Important quote Inline code and a link. managed agents",
    );
  });

  test("slugify produces stable filesystem-safe slugs", () => {
    expect(slugify("Scaling Managed Agents: Brain / Hands")).toBe(
      "scaling-managed-agents-brain-hands",
    );
  });
});
