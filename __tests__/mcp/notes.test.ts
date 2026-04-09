import { describe, expect, test } from "bun:test";
import { readKbNote, resolveKbNotePath } from "../../src/mcp/notes";

describe("mcp notes", () => {
  test("resolves notes by exact repo-relative path", () => {
    const absolutePath = resolveKbNotePath("raw/articles/2026-04-08-llm-knowledge-bases.md");
    expect(absolutePath.endsWith("/raw/articles/2026-04-08-llm-knowledge-bases.md")).toBe(true);
  });

  test("resolves notes by basename slug", () => {
    const absolutePath = resolveKbNotePath("2026-04-08-llm-knowledge-bases");
    expect(absolutePath.endsWith("/raw/articles/2026-04-08-llm-knowledge-bases.md")).toBe(true);
  });

  test("readKbNote returns metadata and truncates long reads when requested", () => {
    const note = readKbNote("2026-04-08-llm-knowledge-bases", 120);
    expect(note.path).toBe("raw/articles/2026-04-08-llm-knowledge-bases.md");
    expect(note.title).toBe("LLM Knowledge Bases");
    expect(note.truncated).toBe(true);
    expect(note.text.endsWith("[truncated]")).toBe(true);
  });

  test("throws when a note cannot be found", () => {
    expect(() => resolveKbNotePath("definitely-not-a-real-note")).toThrow(
      "KB note not found: definitely-not-a-real-note",
    );
  });
});
