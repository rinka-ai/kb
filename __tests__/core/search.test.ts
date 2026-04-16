import { describe, expect, test } from "bun:test";
import { searchIndex, topTermsFromText } from "../../src/core/search";
import type { KbIndex } from "../../src/core/types";

const baseIndex: KbIndex = {
  schema_version: 3,
  generated_at: "2026-04-09T00:00:00.000Z",
  root: "/repo",
  chunk_count: 3,
  file_count: 2,
  avg_doc_len: 10,
  idf: {
    managed: 2,
    agents: 2,
  },
  chunks: [
    {
      id: "current-doc",
      path: "raw/articles/current.md",
      note_slug: "current",
      kind: "document",
      title: "Managed Agents",
      section: "Summary",
      type: "source",
      status: "current",
      superseded_by: "",
      summary: "Current note",
      tags: ["agents"],
      related: [],
      canonical_for: [],
      wiki_links: [],
      url: "https://example.com/current",
      date_published: "",
      date_added: "",
      author: "",
      publisher: "",
      review_status: "reviewed",
      last_reviewed: "2026-04-10",
      review_due: "2026-05-10",
      confidence: "0.9",
      text: "managed agents are current",
      term_freq: { managed: 2, agents: 2 },
      doc_len: 8,
    },
    {
      id: "current-section",
      path: "raw/articles/current.md",
      note_slug: "current",
      kind: "section",
      title: "Managed Agents",
      section: "Key Claims",
      type: "source",
      status: "current",
      superseded_by: "",
      summary: "",
      tags: ["agents"],
      related: [],
      canonical_for: [],
      wiki_links: [],
      url: "",
      date_published: "",
      date_added: "",
      author: "",
      publisher: "",
      review_status: "reviewed",
      last_reviewed: "2026-04-10",
      review_due: "2026-05-10",
      confidence: "0.9",
      text: "managed agents section details",
      term_freq: { managed: 1, agents: 1 },
      doc_len: 6,
    },
    {
      id: "old-doc",
      path: "raw/articles/old.md",
      note_slug: "old",
      kind: "document",
      title: "Managed Agents Old",
      section: "Summary",
      type: "source",
      status: "superseded",
      superseded_by: "raw/articles/current.md",
      summary: "Old note",
      tags: ["agents"],
      related: [],
      canonical_for: [],
      wiki_links: [],
      url: "https://example.com/old",
      date_published: "",
      date_added: "",
      author: "",
      publisher: "",
      review_status: "",
      last_reviewed: "",
      review_due: "",
      confidence: "",
      text: "managed agents are old",
      term_freq: { managed: 2, agents: 2 },
      doc_len: 8,
    },
  ],
};

describe("searchIndex", () => {
  test("excludes superseded notes by default", () => {
    const results = searchIndex(baseIndex, ["managed", "agents"], 10);
    expect(results.map((result) => result.path)).toEqual(["raw/articles/current.md"]);
  });

  test("includes superseded notes when requested", () => {
    const results = searchIndex(baseIndex, ["managed", "agents"], 10, {
      includeSuperseded: true,
    });
    expect(results.map((result) => result.path)).toEqual([
      "raw/articles/current.md",
      "raw/articles/old.md",
    ]);
  });

  test("topTermsFromText supports remote-safe text context", () => {
    expect(
      topTermsFromText("managed agents durable sessions sandbox context engineering", 5),
    ).toEqual(["managed", "agents", "durable", "sessions", "sandbox"]);
  });
});
