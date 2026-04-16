import { describe, expect, test } from "bun:test";
import { buildQueryPlan, searchIndex, topTermsFromText } from "../../src/core/search";
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

const semanticIndex: KbIndex = {
  schema_version: 3,
  generated_at: "2026-04-16T00:00:00.000Z",
  root: "/repo",
  chunk_count: 4,
  file_count: 4,
  avg_doc_len: 12,
  idf: {
    subagent: 2.4,
    subagents: 2.4,
    "multi-agent": 2.3,
    "parallel-agents": 2.3,
    delegate: 1.9,
    delegation: 1.9,
    specialist: 1.8,
    synthetic: 2.4,
    "voice-cloning": 2.5,
    cloning: 2.1,
    impersonation: 2.2,
    disclosure: 2.1,
    governance: 2.1,
    voice: 1,
    rules: 0.9,
  },
  chunks: [
    {
      id: "multi-agent-doc",
      path: "wiki/concepts/multi-agent-systems.md",
      note_slug: "multi-agent-systems",
      kind: "document",
      title: "Multi-Agent Systems",
      section: "Summary",
      type: "concept",
      status: "current",
      superseded_by: "",
      summary: "Use subagents and parallel agents when delegation improves throughput.",
      tags: ["agents", "multi-agent", "parallel-agents", "orchestration"],
      related: [],
      canonical_for: ["multi-agent systems", "parallel agents", "subagents"],
      wiki_links: [],
      url: "",
      date_published: "",
      date_added: "",
      author: "",
      publisher: "",
      review_status: "reviewed",
      last_reviewed: "2026-04-16",
      review_due: "2026-05-16",
      confidence: "0.9",
      text: "Subagents let a main agent delegate bounded work to specialist helpers and parallel agents.",
      term_freq: {
        subagent: 1,
        subagents: 2,
        "multi-agent": 2,
        multi: 2,
        agent: 2,
        agents: 3,
        systems: 1,
        parallel: 2,
        "parallel-agents": 2,
        orchestration: 1,
        delegate: 1,
        specialist: 1,
      },
      doc_len: 14,
    },
    {
      id: "prompting-guide-doc",
      path: "raw/articles/voice-ai/prompting-guide.md",
      note_slug: "prompting-guide",
      kind: "document",
      title: "Prompting Guide",
      section: "TL;DR",
      type: "source",
      status: "current",
      superseded_by: "",
      summary: "Prompt structure and specialist-agent boundaries matter for voice reliability.",
      tags: ["voice-ai", "prompting"],
      related: [],
      canonical_for: [],
      wiki_links: [],
      url: "",
      date_published: "",
      date_added: "",
      author: "",
      publisher: "",
      review_status: "reviewed",
      last_reviewed: "2026-04-16",
      review_due: "2026-05-16",
      confidence: "0.9",
      text: "Specialist agent boundaries matter for production voice systems.",
      term_freq: {
        specialist: 1,
        agent: 1,
        boundaries: 1,
        voice: 1,
        systems: 1,
      },
      doc_len: 9,
    },
    {
      id: "synthetic-voices-doc",
      path: "wiki/concepts/synthetic-voices.md",
      note_slug: "synthetic-voices",
      kind: "document",
      title: "Synthetic Voices",
      section: "Summary",
      type: "concept",
      status: "current",
      superseded_by: "",
      summary: "Cloned voices require consent, disclosure, and anti-impersonation controls.",
      tags: ["synthetic-voices", "voice-cloning", "safety", "disclosure", "policy"],
      related: [],
      canonical_for: ["synthetic voices", "voice cloning", "ai voice governance"],
      wiki_links: [],
      url: "",
      date_published: "",
      date_added: "",
      author: "",
      publisher: "",
      review_status: "reviewed",
      last_reviewed: "2026-04-16",
      review_due: "2026-05-16",
      confidence: "0.9",
      text: "Synthetic voices and voice cloning need consent, disclosure, governance, and anti-impersonation rules.",
      term_freq: {
        synthetic: 2,
        voices: 2,
        voice: 2,
        "voice-cloning": 2,
        cloning: 2,
        consent: 1,
        disclosure: 2,
        governance: 1,
        impersonation: 1,
        rules: 1,
        policy: 1,
      },
      doc_len: 15,
    },
    {
      id: "tts-doc",
      path: "wiki/concepts/text-to-speech.md",
      note_slug: "text-to-speech",
      kind: "document",
      title: "Text To Speech",
      section: "Summary",
      type: "concept",
      status: "current",
      superseded_by: "",
      summary: "Voice output systems need design rules and markup control.",
      tags: ["text-to-speech", "voice-output", "audio"],
      related: [],
      canonical_for: ["text to speech", "voice output"],
      wiki_links: [],
      url: "",
      date_published: "",
      date_added: "",
      author: "",
      publisher: "",
      review_status: "reviewed",
      last_reviewed: "2026-04-16",
      review_due: "2026-05-16",
      confidence: "0.9",
      text: "Voice output is a design problem with rules for markup and streaming audio.",
      term_freq: {
        text: 1,
        speech: 1,
        voice: 2,
        output: 1,
        design: 1,
        rules: 1,
        audio: 1,
      },
      doc_len: 12,
    },
  ],
};

const phraseIndex: KbIndex = {
  schema_version: 3,
  generated_at: "2026-04-16T00:00:00.000Z",
  root: "/repo",
  chunk_count: 2,
  file_count: 2,
  avg_doc_len: 14,
  idf: {
    realistic: 1.6,
    web: 1.1,
    agents: 1.3,
    browser: 1.5,
    benchmark: 1.6,
    long: 1.2,
    horizon: 1.7,
    tasks: 1.4,
    autonomous: 1.5,
    environment: 1.4,
  },
  chunks: [
    {
      id: "web-agents-doc",
      path: "wiki/concepts/web-agents.md",
      note_slug: "web-agents",
      kind: "document",
      title: "Web Agents",
      section: "Summary",
      type: "concept",
      status: "current",
      superseded_by: "",
      summary: "Web agents operate in realistic browser environments across long-horizon tasks.",
      tags: ["web-agents", "browser", "long-horizon", "evaluation"],
      related: [],
      canonical_for: ["realistic web agents", "browser benchmark tasks"],
      wiki_links: [],
      url: "",
      date_published: "",
      date_added: "",
      author: "",
      publisher: "",
      review_status: "reviewed",
      last_reviewed: "2026-04-16",
      review_due: "2026-05-16",
      confidence: "0.9",
      text: "Web agents operate in realistic browser environments where long horizon tasks matter.",
      term_freq: {
        web: 2,
        agents: 2,
        agent: 2,
        browser: 2,
        realistic: 1,
        long: 1,
        horizon: 1,
        tasks: 1,
        task: 1,
        benchmark: 1,
      },
      doc_len: 14,
    },
    {
      id: "webarena-doc",
      path: "raw/articles/arxiv/webarena.md",
      note_slug: "webarena",
      kind: "document",
      title: "WebArena: A Realistic Web Environment for Building Autonomous Agents",
      section: "TL;DR",
      type: "source",
      status: "current",
      superseded_by: "",
      summary: "A realistic browser benchmark for long-horizon tasks.",
      tags: ["web-agents", "browser", "benchmarks"],
      related: [],
      canonical_for: [],
      wiki_links: [],
      url: "",
      date_published: "",
      date_added: "",
      author: "",
      publisher: "",
      review_status: "reviewed",
      last_reviewed: "2026-04-16",
      review_due: "2026-05-16",
      confidence: "0.9",
      text: "A realistic web benchmark where autonomous agents complete long horizon tasks in browser environments.",
      term_freq: {
        realistic: 2,
        web: 2,
        environment: 2,
        autonomous: 1,
        agents: 2,
        agent: 2,
        browser: 2,
        benchmark: 2,
        long: 1,
        horizon: 1,
        tasks: 1,
        task: 1,
      },
      doc_len: 16,
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

  test("buildQueryPlan expands copilot phrasing toward subagents and multi-agent systems", () => {
    const plan = buildQueryPlan(semanticIndex, {
      query: "delegate specialist copilots",
      top: 5,
      json: false,
      rebuildIfStale: false,
      includeSuperseded: false,
    });

    expect(plan.scoringTerms).toContain("subagents");
    expect(plan.scoringTerms).toContain("multi-agent");
    expect(plan.termWeights.subagents).toBeLessThan(1);
    expect(plan.termWeights.delegate).toBe(1);

    const results = searchIndex(semanticIndex, plan.scoringTerms, 5, {
      exactTerms: plan.exactTerms,
      expandedTerms: plan.expandedTerms,
      termWeights: plan.termWeights,
    });
    expect(results[0]?.path).toBe("wiki/concepts/multi-agent-systems.md");
  });

  test("buildQueryPlan downweights stem variants relative to literal query terms", () => {
    const plan = buildQueryPlan(semanticIndex, {
      query: "workflow agents retries",
      top: 5,
      json: false,
      rebuildIfStale: false,
      includeSuperseded: false,
    });

    expect(plan.termWeights.agents).toBe(1);
    expect(plan.termWeights.agent).toBeLessThan(plan.termWeights.agents);
    expect(plan.termWeights.retry).toBeLessThan(plan.termWeights.retries);
  });

  test("buildQueryPlan expands cloned-voice phrasing toward synthetic voices", () => {
    const plan = buildQueryPlan(semanticIndex, {
      query: "cloned voice impersonation rules",
      top: 5,
      json: false,
      rebuildIfStale: false,
      includeSuperseded: false,
    });

    expect(plan.scoringTerms).toContain("voice-cloning");
    expect(plan.scoringTerms).toContain("synthetic");

    const results = searchIndex(semanticIndex, plan.scoringTerms, 5, {
      exactTerms: plan.exactTerms,
      expandedTerms: plan.expandedTerms,
      termWeights: plan.termWeights,
    });
    expect(results[0]?.path).toBe("wiki/concepts/synthetic-voices.md");
  });

  test("weighted expansions keep exact-match concepts above fuzzy-only noise", () => {
    const plan = buildQueryPlan(semanticIndex, {
      query: "cloned voice impersonation rules",
      top: 5,
      json: false,
      rebuildIfStale: false,
      includeSuperseded: false,
    });

    const results = searchIndex(semanticIndex, plan.scoringTerms, 5, {
      exactTerms: plan.exactTerms,
      expandedTerms: plan.expandedTerms,
      termWeights: plan.termWeights,
    });

    expect(results[0]?.path).toBe("wiki/concepts/synthetic-voices.md");
    expect(plan.termWeights.synthetic).toBeLessThan(plan.termWeights.cloned ?? 1);
  });

  test("phrase matches help canonical concept pages outrank adjacent source notes", () => {
    const plan = buildQueryPlan(phraseIndex, {
      query: "realistic web agents browser benchmark long horizon tasks",
      top: 5,
      json: false,
      rebuildIfStale: false,
      includeSuperseded: false,
    });

    expect(plan.queryPhrases).toContain("web agents");
    expect(plan.queryPhrases).toContain("long horizon");

    const results = searchIndex(phraseIndex, plan.scoringTerms, 5, {
      exactTerms: plan.exactTerms,
      expandedTerms: plan.expandedTerms,
      termWeights: plan.termWeights,
      queryPhrases: plan.queryPhrases,
    });

    expect(results[0]?.path).toBe("wiki/concepts/web-agents.md");
  });
});
