import { describe, expect, test } from "bun:test";
import type { SearchResponse } from "../../src/core/search";
import {
  buildSearchObservationReport,
  createSearchObservation,
  isLowConfidenceObservation,
  type SearchObservation,
} from "../../src/core/search-observations";

const baseResponse: SearchResponse = {
  query: "delegate specialist copilots",
  queryTerms: ["delegate", "specialist", "copilots"],
  exactTerms: ["delegate", "specialist", "copilots"],
  expandedTerms: ["subagent", "subagents", "multi-agent", "parallel-agents"],
  includeSuperseded: false,
  results: [
    {
      score: 34.8,
      path: "raw/articles/claude-blog/2026-04-06-how-and-when-to-use-subagents-in-claude-code.md",
      title: "How and when to use subagents in Claude Code",
      type: "source",
      section: "Important Details",
      matched_sections: ["Important Details"],
      status: "current",
      superseded_by: "",
      tags: ["claude-code", "subagents"],
      summary: "When to delegate with subagents.",
      snippet: "When to delegate with subagents.",
      url: "https://claude.com/blog/how-and-when-to-use-subagents-in-claude-code",
      kind: "document",
      exact_match_count: 2,
      expanded_match_count: 2,
      exact_title_match_count: 0,
      exact_canonical_match_count: 0,
      exact_tag_match_count: 0,
      fuzzy_only: false,
    },
    {
      score: 25.0,
      path: "wiki/concepts/multi-agent-systems.md",
      title: "Multi-Agent Systems",
      type: "concept",
      section: "Summary",
      matched_sections: ["Summary"],
      status: "current",
      superseded_by: "",
      tags: ["agents", "multi-agent"],
      summary: "Multiple coordinated model contexts.",
      snippet: "Multiple coordinated model contexts.",
      url: "",
      kind: "document",
      exact_match_count: 1,
      expanded_match_count: 3,
      exact_title_match_count: 0,
      exact_canonical_match_count: 0,
      exact_tag_match_count: 0,
      fuzzy_only: false,
    },
  ],
};

function makeObservation(overrides: Partial<SearchObservation> = {}): SearchObservation {
  return {
    ...createSearchObservation({
      request: {
        transport: "http",
        requestId: "req-1",
        clientHash: "client-a",
        receivedAt: "2026-04-16T10:00:00.000Z",
      },
      tool: "kb_search",
      response: baseResponse,
      rawQuery: "delegate specialist copilots",
      top: 8,
      rebuildIfStale: true,
      includeSuperseded: false,
    }),
    ...overrides,
  };
}

describe("search observations", () => {
  test("createSearchObservation records privacy-safe summary fields", () => {
    const observation = createSearchObservation({
      request: {
        transport: "http",
        requestId: "req-2",
        clientHash: "client-b",
        receivedAt: "2026-04-16T10:00:00.000Z",
      },
      tool: "kb_search_file",
      response: {
        ...baseResponse,
        query: "auth flow token refresh session",
        queryTerms: ["auth", "flow", "token"],
        exactTerms: ["auth", "flow", "token"],
        expandedTerms: ["session"],
      },
      contextLabel: "auth.ts",
      filePathProvided: false,
      textBytes: 4280,
      top: 5,
      rebuildIfStale: true,
      includeSuperseded: false,
    });

    expect(observation.tool).toBe("kb_search_file");
    expect(observation.contextLabel).toBe("auth.ts");
    expect(observation.textBytes).toBe(4280);
    expect(observation.results).toHaveLength(2);
    expect(observation.top12ScoreGap).toBe(9.8);
  });

  test("isLowConfidenceObservation flags fuzzy-only or low-gap top results", () => {
    expect(
      isLowConfidenceObservation(
        makeObservation({
          top1FuzzyOnly: true,
          top12ScoreGap: 3,
          observedAt: "2026-04-16T10:00:00.000Z",
        }),
      ),
    ).toBe(true);

    expect(
      isLowConfidenceObservation(
        makeObservation({
          top1FuzzyOnly: false,
          top12ScoreGap: 0.8,
          observedAt: "2026-04-16T10:00:00.000Z",
        }),
      ),
    ).toBe(true);

    expect(
      isLowConfidenceObservation(
        makeObservation({
          top1FuzzyOnly: false,
          top12ScoreGap: 4.2,
          observedAt: "2026-04-16T10:00:00.000Z",
        }),
      ),
    ).toBe(false);
  });

  test("buildSearchObservationReport surfaces repeated low-confidence and ambiguous queries", () => {
    const observations: SearchObservation[] = [
      makeObservation({
        rawQuery: "delegate specialist copilots",
        observedAt: "2026-04-16T10:00:00.000Z",
      }),
      makeObservation({
        rawQuery: "delegate specialist copilots",
        observedAt: "2026-04-16T10:05:00.000Z",
        top1FuzzyOnly: true,
      }),
      makeObservation({
        rawQuery: "cloned voice impersonation rules",
        queryText: "cloned voice impersonation rules",
        observedAt: "2026-04-16T11:00:00.000Z",
        top1Path: "wiki/concepts/synthetic-voices.md",
        results: [
          {
            rank: 1,
            path: "wiki/concepts/synthetic-voices.md",
            score: 82.5,
            type: "concept",
            section: "Summary",
            exactMatchCount: 3,
            expandedMatchCount: 2,
            exactTitleMatchCount: 1,
            exactCanonicalMatchCount: 1,
            exactTagMatchCount: 0,
            fuzzyOnly: false,
          },
        ],
        top12ScoreGap: null,
      }),
      makeObservation({
        rawQuery: "cloned voice impersonation rules",
        queryText: "cloned voice impersonation rules",
        observedAt: "2026-04-16T11:10:00.000Z",
        top1Path: "raw/articles/voice-ai/2026-04-09-safety-at-elevenlabs.md",
        results: [
          {
            rank: 1,
            path: "raw/articles/voice-ai/2026-04-09-safety-at-elevenlabs.md",
            score: 79,
            type: "source",
            section: "Key Claims",
            exactMatchCount: 2,
            expandedMatchCount: 1,
            exactTitleMatchCount: 0,
            exactCanonicalMatchCount: 0,
            exactTagMatchCount: 0,
            fuzzyOnly: false,
          },
        ],
        top12ScoreGap: 0.6,
      }),
      {
        ...makeObservation({
          tool: "kb_search_file",
          rawQuery: undefined,
          observedAt: "2026-04-16T12:00:00.000Z",
        }),
        contextLabel: "auth.ts",
      },
    ];

    const report = buildSearchObservationReport(observations, {
      limit: 10,
      minCount: 2,
      maxTopScoreGap: 1.5,
    });

    expect(report.totalObservations).toBe(5);
    expect(report.kbSearchCount).toBe(4);
    expect(report.kbSearchFileCount).toBe(1);
    expect(report.frequentQueries.map((entry) => entry.query)).toEqual([
      "cloned voice impersonation rules",
      "delegate specialist copilots",
    ]);
    expect(report.fuzzyTop1Queries.map((entry) => entry.query)).toEqual([
      "delegate specialist copilots",
    ]);
    expect(report.lowConfidenceQueries.map((entry) => entry.query)).toEqual([
      "cloned voice impersonation rules",
      "delegate specialist copilots",
    ]);
    expect(report.ambiguousQueries.map((entry) => entry.query)).toEqual([
      "cloned voice impersonation rules",
    ]);
    expect(report.fileContextLabels).toEqual([
      {
        label: "auth.ts",
        count: 1,
        lastSeen: "2026-04-16T12:00:00.000Z",
      },
    ]);
  });
});
