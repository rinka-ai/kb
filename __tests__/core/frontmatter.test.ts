import { describe, expect, test } from "bun:test";
import { parseFrontmatter } from "../../src/core/frontmatter";

describe("frontmatter", () => {
  test("parses scalar and list metadata", () => {
    const input = `---
title: Test Note
path: raw/articles/test-note.md
status: superseded
published: true
quoted: "hello"
tags:
  - agents
  - evals
---
# Test Note

Hello world.
`;

    const { metadata, body } = parseFrontmatter(input);
    expect(metadata.title).toBe("Test Note");
    expect(metadata.path).toBe("raw/articles/test-note.md");
    expect(metadata.status).toBe("superseded");
    expect(metadata.published).toBe(true);
    expect(metadata.quoted).toBe("hello");
    expect(metadata.tags).toEqual(["agents", "evals"]);
    expect(body).toContain("# Test Note");
  });

  test("returns empty metadata when no frontmatter present", () => {
    const input = "# Just a heading\n\nSome body text.";
    const { metadata, body } = parseFrontmatter(input);
    expect(metadata).toEqual({});
    expect(body).toBe(input);
  });

  test("handles inline YAML lists", () => {
    const input = `---
tags: [agents, context-engineering]
---
Body.
`;
    const { metadata } = parseFrontmatter(input);
    expect(metadata.tags).toEqual(["agents", "context-engineering"]);
  });

  test("coerces non-string non-boolean scalars to strings", () => {
    const input = `---
count: 42
---
Body.
`;
    const { metadata } = parseFrontmatter(input);
    expect(metadata.count).toBe("42");
  });

  test("preserves --- separators in body content", () => {
    const input = `---
title: Test
---
Before separator.

---

After separator.
`;
    const { metadata, body } = parseFrontmatter(input);
    expect(metadata.title).toBe("Test");
    expect(body).toContain("---");
    expect(body).toContain("Before separator.");
    expect(body).toContain("After separator.");
  });
});
