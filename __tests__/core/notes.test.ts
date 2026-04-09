import { describe, expect, test } from "bun:test";
import {
  createKbNoteLookup,
  extractBulletItems,
  extractWikiLinks,
  findSection,
  parseKbNote,
} from "../../src/core/notes";

const SAMPLE_NOTE = `---
id: concept-managed-agents
type: concept
title: Managed Agents
path: wiki/concepts/managed-agents.md
summary: Durable interfaces for agent systems.
tags: [agents, architecture]
related: [sessions]
---

# Managed Agents

## Summary

Managed agents separate the brain from the hands.

## Tensions

- general interfaces vs task-specific optimization
- recoverability vs overhead

## Source Notes

- [[managed-agents-source]]
- [[context-engineering]]
`;

describe("notes", () => {
  test("parseKbNote extracts sections, wiki links, and metadata-driven fields", () => {
    const note = parseKbNote(SAMPLE_NOTE, "wiki/concepts/managed-agents.md");

    expect(note.title).toBe("Managed Agents");
    expect(note.type).toBe("concept");
    expect(note.tags).toEqual(["agents", "architecture"]);
    expect(note.wikiLinks).toEqual(["managed-agents-source", "context-engineering"]);
    expect(findSection(note, ["Tensions"])?.wikiLinks).toEqual([]);
  });

  test("extract helpers return stable bullets and note lookup matches by path or slug", () => {
    const note = parseKbNote(SAMPLE_NOTE, "wiki/concepts/managed-agents.md");
    const lookup = createKbNoteLookup([note]);

    expect(extractWikiLinks(SAMPLE_NOTE)).toEqual(["managed-agents-source", "context-engineering"]);
    expect(extractBulletItems(findSection(note, ["Source Notes"])?.content ?? "")).toEqual([
      "[[managed-agents-source]]",
      "[[context-engineering]]",
    ]);
    expect(lookup.get("wiki/concepts/managed-agents.md")?.path).toBe(
      "wiki/concepts/managed-agents.md",
    );
    expect(lookup.get("managed-agents")?.title).toBe("Managed Agents");
  });
});
