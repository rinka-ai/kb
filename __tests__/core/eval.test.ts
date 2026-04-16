import { describe, expect, test } from "bun:test";
import { evaluateRetrievedPaths, summarizeEvalResults } from "../../src/core/eval";

describe("search evals", () => {
  test("evaluateRetrievedPaths computes ranks and precision", () => {
    const result = evaluateRetrievedPaths(
      [
        "wiki/concepts/rag.md",
        "raw/articles/arxiv/2026-04-13-retrieval-augmented-generation-for-knowledge-intensive-nlp-tasks.md",
        "raw/articles/anthropic-engineering/2024-09-19-introducing-contextual-retrieval.md",
      ],
      {
        id: "rag",
        query: "retrieval augmented generation",
        preferredPaths: ["wiki/concepts/rag.md"],
        relevantPaths: [
          "wiki/concepts/rag.md",
          "raw/articles/arxiv/2026-04-13-retrieval-augmented-generation-for-knowledge-intensive-nlp-tasks.md",
        ],
      },
    );

    expect(result.preferredRank).toBe(1);
    expect(result.firstRelevantRank).toBe(1);
    expect(result.precisionAt3).toBeCloseTo(0.667, 2);
    expect(result.minPrecisionAt3).toBe(0.333);
    expect(result.maxPreferredRank).toBeNull();
    expect(result.forbiddenHits).toEqual([]);
    expect(result.passed).toBe(true);
  });

  test("evaluateRetrievedPaths honors stricter rank and forbidden-path constraints", () => {
    const result = evaluateRetrievedPaths(
      [
        "raw/articles/arxiv/2026-04-10-react-synergizing-reasoning-and-acting-in-language-models.md",
        "wiki/concepts/llm-agents.md",
        "wiki/concepts/web-agents.md",
      ],
      {
        id: "reasoning",
        query: "reasoning and acting",
        preferredPaths: ["wiki/concepts/reasoning.md"],
        relevantPaths: [
          "wiki/concepts/reasoning.md",
          "raw/articles/arxiv/2026-04-10-react-synergizing-reasoning-and-acting-in-language-models.md",
        ],
        forbiddenPaths: ["wiki/concepts/web-agents.md"],
        maxPreferredRank: 1,
        minPrecisionAt3: 0.667,
      },
    );

    expect(result.preferredRank).toBeNull();
    expect(result.forbiddenHits).toEqual(["wiki/concepts/web-agents.md"]);
    expect(result.passed).toBe(false);
  });

  test("summarizeEvalResults aggregates retrieval metrics", () => {
    const metrics = summarizeEvalResults([
      {
        id: "one",
        query: "query one",
        preferredRank: 1,
        firstRelevantRank: 1,
        precisionAt3: 1,
        minPrecisionAt3: 0.333,
        maxPreferredRank: null,
        forbiddenHits: [],
        topPaths: ["a"],
        passed: true,
      },
      {
        id: "two",
        query: "query two",
        preferredRank: null,
        firstRelevantRank: 4,
        precisionAt3: 0.333,
        minPrecisionAt3: 0.333,
        maxPreferredRank: null,
        forbiddenHits: [],
        topPaths: ["b", "c", "d"],
        passed: false,
      },
    ]);

    expect(metrics.preferredHitAt1).toBe(0.5);
    expect(metrics.relevantHitAt3).toBe(0.5);
    expect(metrics.relevantHitAt5).toBe(1);
    expect(metrics.mrrPreferred).toBe(0.5);
    expect(metrics.precisionAt3).toBeCloseTo(0.666, 3);
  });
});
