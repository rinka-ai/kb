---
id: article-2026-07-29-openai-arc-agi-3-retained-reasoning-compaction
type: source
title: "How enabling two settings tripled our scores on the ARC-AGI-3 benchmark"
path: raw/articles/openai/2026-07-29-how-enabling-two-settings-tripled-our-arc-agi-3-scores.md
author: OpenAI
publisher: OpenAI
url: https://openai.com/index/how-two-settings-tripled-our-arc-agi-3-scores/
date_published: 2026-07-29
date_added: 2026-07-30
tags: [agent-evals, context-engineering, reasoning, compaction, harnesses, arc-agi-3]
status: active
quality: high
summary: OpenAI reports that retained reasoning plus compaction raised GPT-5.6 Sol's ARC-AGI-3 public-set score from 13.3% to 38.3% while reducing output tokens by roughly sixfold, showing that benchmark results depend materially on harness state policy.
related: [ai-agent-evals, context-engineering, reasoning]
---

# How enabling two settings tripled our scores on the ARC-AGI-3 benchmark

## Source Metadata

- Path: raw/articles/openai/2026-07-29-how-enabling-two-settings-tripled-our-arc-agi-3-scores.md
- Author: OpenAI
- Published: 2026-07-29
- Publisher: OpenAI
- URL: https://openai.com/index/how-two-settings-tripled-our-arc-agi-3-scores/

## TL;DR

OpenAI reports that enabling retained reasoning and compaction in its Responses API harness raised GPT-5.6 Sol's ARC-AGI-3 public-set score from 13.3% to 38.3% while using roughly six times fewer output tokens. The result is direct quantitative evidence that agent benchmarks measure context and harness policy alongside model capability.

## Key Claims

- With the official generic harness, GPT-5.6 Sol scored 13.3% on the ARC-AGI-3 public set; with retained reasoning and compaction, it scored 38.3%.
- The improved harness used roughly six times fewer output tokens, because the model did less repeated reconstruction of prior discoveries.
- Discarding reasoning after each action made the model repeatedly infer game mechanics it had already learned.
- Rolling truncation removed early observations and actions; compaction preserved learned state in a compressed continuation.
- Benchmark reports should record API mode, context policy, reasoning-state policy, prompts, tools, and termination rules rather than attributing the final score solely to the model.

## Important Details

- ARC-AGI-3 evaluates agents exploring unfamiliar 2D games from textual frame representations without explicit instructions.
- Scores use Relative Human Action Efficiency; OpenAI estimates the average human tester scored 48% on the public set.
- The intervention combined two settings, so the article does not isolate the causal contribution of retained reasoning versus compaction independently.
- The result is reported by the model provider and should be reproduced independently before being treated as a universal benchmark correction.
- Canonical URL: https://openai.com/index/how-two-settings-tripled-our-arc-agi-3-scores/

## Entities

- Companies: OpenAI, ARC Prize Foundation
- Models: GPT-5.6 Sol
- Tools: OpenAI Responses API, ARC-AGI-3 harness
- Concepts: retained reasoning, compaction, rolling truncation, agent benchmarks, Relative Human Action Efficiency

## My Notes

- This is unusually high-value evidence for the KB's existing claim that agent evaluation is full-system evaluation.
- The practical experiment is to compare full history, rolling truncation, and structured compaction on the same long-running task while measuring success, repeated work, output tokens, and recovery after reset.

## Open Questions

- How much of the improvement comes from retained reasoning alone versus compaction alone?
- Does the effect reproduce across coding, browser, and production tool-use tasks rather than puzzle games?
- Which structured compaction fields preserve continuity best without laundering stale or false beliefs into later context?

## Related

- [[ai-agent-evals]]
- [[context-engineering]]
- [[reasoning]]

## Source Text

A sped-up video of GPT‑5.6 Sol attempting to solve puzzles in the ARC-AGI-3 benchmark, with the official harness (left) and our Responses API harness (right), which retains reasoning and enables compaction. On the leaderboard for this game⁠(opens in a new window), no frontier model solves any level beyond the first. With our harness, GPT‑5.6 Sol solves all six.GPT‑5.6 Sol has solved longstanding open problems in mathematics like the cycle double cover conjecture⁠(opens in a new window) and beaten games like Pokémon FireRed. But on ARC-AGI-3, a benchmark of 2D puzzle games, GPT‑5.6 Sol scored just 7.8%, and GPT‑5.5 could barely play the games at all, scoring a paltry 0.4%.Were 2D puzzle games unusually difficult for our models? Or was something else going on?Benchmarks rarely measure AI models in isolation. They also measure less visible choices about API settings, harness design, and prompting. In the case of ARC-AGI-3, we discovered that turning on two API settings we use in ChatGPT and Codex—retained reasoning and compaction—tripled scores and cut output tokens by 6x on the public task set.With the official harness, GPT‑5.6 Sol scored 13.3% on the ARC-AGI-3 public set. With retained reasoning and compaction, it scored 38.3%. Scores measure Relative Human Action Efficiency (RHAE⁠(opens in a new window))—a metric comparing model performance to a human baseline. Based on official gameplay logs⁠(opens in a new window), we estimate the average human tester scored 48%. Models are not told how they will be scored, and cannot see their score throughout—actions only return a text representation of each frame and what level they are on.ARC-AGI-3ARC-AGI-3 is a benchmark designed to measure how well AI agents learn and reason. Agents explore unfamiliar 2D games and infer how they work without explicit instructions. You can play 25 demo games at arcprize.org/tasks⁠(opens in a new window).ARC-AGI-3 uses an intentionally generic harness, without tools or special features. ARC’s reasoning was that a simple harness makes model shortcomings more visible and makes model comparisons more fair. Commercial developers, by contrast, optimize harnesses for each model’s features and quirks.Ethan Mollick shows⁠(opens in a new window) GPT‑5.6 Sol in Codex beating a randomized daily challenge in Slay the Spire 2, a game released after GPT‑5.6 Sol’s knowledge cutoff.But as we looked deeper, we discovered much of the model’s confusion was not inherent to the model itself, but due to settings in the harness.First, we noticed that after each game action, all private reasoning was discarded. This meant that with each action, GPT‑5.6 Sol was asked to figure out the game anew, unable to remember its past thinking. The model could still see a record of past moves and brief accompanying notes, but it could not see the plans, insights, or thoughts that led to them.Second, we saw that the harness used a rolling truncation window, causing older actions to become invisible as the history grew. So not only was GPT‑5.6 Sol unable to remember its past thinking, it was losing memory of its past actions too.Together, these two features of the harness—discarding reasoning and rolling truncation—helped explain why GPT‑5.6 Sol was struggling to learn over time.Agents do best when they remember what they’ve doneOur models are trained to think with private reasoning messages before they output replies or tool calls. These private thinking messages are retained as part of the conversation history. If a conversation grows too long, we summarize it and continue.This is how our models are trained, and also how they are deployed in ChatGPT and Codex. To better match our production setup, we implemented the ARC-AGI-3 harness with our Responses API⁠(opens in a new window). Our API makes it easy to manage context: for GPT‑5.6, passing the previous response ID automatically retains reasoning across tool calls and turns.With reasoning retained, we noticed two big changes. First, GPT‑5.6 Sol spent less time thinking before each action, because it no longer had to interpret the game from scratch every turn. Second, when it was able to remember its past thoughts, GPT‑5.6 Sol was much better at learning over time and employing coherent strategies.The next improvement came from replacing rolling truncation with compaction⁠(opens in a new window), another setting in the Responses API.The ARC-AGI-3 harness addresses context limits with rolling truncation. When the conversation context exceeds 175,000 characters, the oldest messages are discarded.Rolling truncation has two drawbacks. First, the model loses earlier observations and actions. Second, it spends much of the tasks operating with a fuller context window, which can slightly impair performance.When we enabled compaction on ARC-AGI-3, GPT‑5.6 Sol was better able to preserve what it had learned about each game across longer runs, and achieved a higher score with fewer output tokens.To illustrate the effect of retaining reasoning and enabling compaction, here’s an animation showing GPT‑5.6 Sol’s 175K context window as it solves a series of ARC-AGI-3 puzzles with each harness.The two central columns depict how the model context window is used differently by each harness. With better memory of its past, GPT‑5.6 Sol thinks less per action and proceeds much faster. Note: our implementation uses a limit of 175,000 tokens instead of characters, but this ends up being quite similar, as the vast majority of text is action grids which are tokenized at a 1:1 ratio by our tokenizer.Together, retaining reasoning and compaction allow GPT‑5.6 Sol (max) to achieve roughly 3x the score with 6x fewer output tokens.Conclusion and recommendationsWe hope these experiments serve as a reminder that evals rarely measure models in isolation—they also measure a bundle of less visible choices about API settings, harness design, and prompting. This isn’t the first time we’ve been surprised by low scores on a public benchmark and then discovered that the eval runner was using a generic harness that dropped reasoning messages.If you’re an API developer trying to maximize performance, we recommend using the same settings that we deploy in our own products:Use our Responses API, not our legacy Chat Completions APIRetain reasoningUse compactionAnd if you’re comparing models, we recommend relying on evals that use the settings above, which best match real-world use in ChatGPT and Codex.We are grateful to ARC for their years of creative work on AGI evaluation, and for their analysis that inspired us to take a closer look here.
