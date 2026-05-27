---
id: article-2026-04-12-knowledge-base
type: source
title: "Knowledge base"
path: raw/articles/voice-ai/2026-04-12-knowledge-base.md
author: ElevenLabs
publisher: ElevenLabs Docs
url: https://elevenlabs.io/docs/eleven-agents/customization/knowledge-base
date_published: 
date_added: 2026-04-12
tags: [voice-ai, elevenlabs, voice-agents, knowledge-base, rag]
status: processed
quality: medium
summary: Enhance your conversational agent with custom knowledge.
related: [voice-ai, elevenlabs, voice-agents, knowledge-base, rag]
---

# Knowledge base

## Source Metadata

- Path: raw/articles/voice-ai/2026-04-12-knowledge-base.md
- Author: ElevenLabs
- Published: Unknown
- Publisher: ElevenLabs Docs
- URL: https://elevenlabs.io/docs/eleven-agents/customization/knowledge-base

## TL;DR

Enhance your conversational agent with custom knowledge.

## Key Claims

- Enhance your conversational agent with custom knowledge.

## Important Details

- Source captured from elevenlabs.io.
- Section heading: Overview
- Section heading: Usage
- Section heading: Best practices
- Section heading: Enterprise features

## Entities

- People: Unknown
- Companies: Unknown
- Tools: Unknown
- Concepts: Unknown

## My Notes

- Imported automatically by `bun run kb:ingest`.
- Review and refine the structured sections before relying on this note heavily.

## Open Questions

- What claims in this source matter most for the current knowledge base?
- Which concept pages should link back to this note?

## Related

- [[voice-ai]]
- [[rag]]

## Source Text

1# First create the document from text2knowledge_base_document_text = elevenlabs.conversational_ai.knowledge_base.documents.create_from_text(3    text="The airspeed velocity of an unladen swallow (European) is 24 miles per hour or roughly 11 meters per second.",4    name="Unladen Swallow facts",5)67# Alternatively, you can create a document from a URL8knowledge_base_document_url = elevenlabs.conversational_ai.knowledge_base.documents.create_from_url(9    url="https://en.wikipedia.org/wiki/Unladen_swallow",10    name="Unladen Swallow Wikipedia page",11)1213# Or create a document from a file14knowledge_base_document_file = elevenlabs.conversational_ai.knowledge_base.documents.create_from_file(15    file=open("/path/to/unladen-swallow-facts.txt", "rb"),16    name="Unladen Swallow Facts",17)1819# Then add the document to the agent20agent = elevenlabs.conversational_ai.agents.update(21    agent_id="agent-id",22    conversation_config={23        "agent": {24            "prompt": {25                "knowledge_base": [26                    {27                        "type": "text",28                        "name": knowledge_base_document_text.name,29                        "id": knowledge_base_document_text.id,30                    },31                    {32                        "type": "url",33                        "name": knowledge_base_document_url.name,34                        "id": knowledge_base_document_url.id,35                    },36                    {37                        "type": "file",38                        "name": knowledge_base_document_file.name,39                        "id": knowledge_base_document_file.id,40                    }41                ]42            }43        }44    },45)4647print("Agent updated:", agent)
