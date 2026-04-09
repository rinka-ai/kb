import { describe, expect, test } from "bun:test";
import {
  getCatalogOverview,
  getCatalogPage,
  listDocumentCatalog,
} from "../../src/mcp/resources/catalog";

describe("mcp catalog", () => {
  test("includes a known KB source note with summary metadata", () => {
    const catalog = listDocumentCatalog();
    const note = catalog.find(
      (entry) => entry.path === "raw/articles/2026-04-08-llm-knowledge-bases.md",
    );

    expect(note).toBeDefined();
    expect(note?.title).toBe("LLM Knowledge Bases");
    expect(note?.summary).toContain("A practical workflow");
    expect(catalog.some((entry) => entry.path.endsWith("::document"))).toBe(false);
  });

  test("catalog overview returns counts and a bounded sample instead of the full corpus dump", () => {
    const overview = getCatalogOverview();

    expect(overview.totalDocuments).toBeGreaterThan(0);
    expect(overview.activeDocuments).toBeGreaterThan(0);
    expect(overview.sample.length).toBeLessThanOrEqual(12);
    expect(overview.resources.pageTemplate).toBe("kb://catalog/page/{page}");
    expect(overview.tools.browse).toBe("kb_list_catalog");
  });

  test("catalog paging filters and paginates deterministically", () => {
    const page = getCatalogPage({
      page: 1,
      pageSize: 5,
      pathPrefix: "raw/articles/anthropic-engineering",
    });

    expect(page.page).toBe(1);
    expect(page.pageSize).toBe(5);
    expect(page.items.length).toBeLessThanOrEqual(5);
    expect(
      page.items.every((entry) => entry.path.startsWith("raw/articles/anthropic-engineering")),
    ).toBe(true);
    expect(page.totalPages).toBeGreaterThanOrEqual(1);
  });
});
