import { describe, expect, test } from "bun:test";
import { formatKbAuditReport } from "../../src/core/audit";

describe("kb audit", () => {
  test("formatKbAuditReport summarizes refresh, telemetry, and eval status", () => {
    const text = formatKbAuditReport({
      generatedAt: "2026-06-05T00:00:00.000Z",
      passed: true,
      refresh: {
        index: {
          fileCount: 12,
          chunkCount: 120,
          generatedAt: "2026-06-05T00:00:00.000Z",
        },
        warnings: [],
        artifacts: {
          jsonPath: "/repo/.kb/health.json",
          markdownPath: "/repo/.kb/health.md",
        },
        health: {
          generatedAt: "2026-06-05T00:00:00.000Z",
          index: {
            fileCount: 12,
            chunkCount: 120,
            generatedAt: "2026-06-05T00:00:00.000Z",
          },
          corpus: {
            sourceNoteCount: 8,
            conceptNoteCount: 3,
            summaryNoteCount: 1,
            indexNoteCount: 0,
            conceptCoverageRatio: 0.375,
          },
          review: {
            reviewBacklogCount: 0,
            staleWikiCount: 1,
          },
          maintenance: {
            ingestedSourceCount: 0,
            thinConceptCount: 0,
            uncoveredTagCount: 0,
          },
          gapReport: {
            generatedAt: "2026-06-05T00:00:00.000Z",
            totalNotes: 12,
            sourceNoteCount: 8,
            conceptNoteCount: 3,
            indexNoteCount: 0,
            orphanSourceNoteCount: 0,
            ingestedSourceNoteCount: 0,
            thinConceptCount: 0,
            sourceCountMismatchCount: 0,
            reviewBacklogCount: 0,
            staleWikiNoteCount: 1,
            uncoveredTagCount: 0,
            orphanSourceNotes: [],
            ingestedSourceNotes: [],
            thinConcepts: [],
            sourceCountMismatches: [],
            reviewBacklog: [],
            staleWikiNotes: [],
            uncoveredTags: [],
            suggestedActions: ["Review stale wiki pages."],
          },
        },
      },
      searchObservations: {
        totalObservations: 0,
        kbSearchCount: 0,
        kbSearchFileCount: 0,
        uniqueQueryCount: 0,
        frequentQueries: [],
        zeroResultQueries: [],
        fuzzyTop1Queries: [],
        lowConfidenceQueries: [],
        ambiguousQueries: [],
        fileContextLabels: [],
      },
      eval: {
        generatedAt: "2026-06-05T00:00:00.000Z",
        datasetPath: "/repo/evals/search-gold.json",
        totalCases: 1,
        metrics: {
          preferredHitAt1: 1,
          relevantHitAt3: 1,
          relevantHitAt5: 1,
          mrrPreferred: 1,
          precisionAt3: 1,
        },
        cases: [],
        failures: [],
      },
      recommendedActions: ["Review stale wiki pages."],
    });

    expect(text).toContain("KB audit report");
    expect(text).toContain("passed=true");
    expect(text).toContain("index_files=12 index_chunks=120");
    expect(text).toContain("eval cases=1 failures=0");
    expect(text).toContain("- Review stale wiki pages.");
  });
});
