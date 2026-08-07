---
id: 2024-06-22-homogenization-effects-of-large-language-models-on-human-creative-ideation
type: source
title: "Homogenization Effects of Large Language Models on Human Creative Ideation"
path: raw/articles/hci-research/2024-06-22-homogenization-effects-of-large-language-models-on-human-creative-ideation.md
author: Barrett R. Anderson, Jash Hemant Shah, and Max Kreminski
publisher: ACM Creativity & Cognition
url: https://doi.org/10.1145/3635636.3656204
date_published: 2024-06-22
date_added: 2026-08-01
tags: [human-ai-collaboration, creativity-support, creative-ideation, generative-ai, homogenization, design-fixation, hci, evaluation]
status: active
quality: high
summary: "A peer-reviewed within-subjects study found that ChatGPT helped participants produce more and broader ideas than Oblique Strategies but made different participants' idea sets more semantically similar and reduced felt ownership, exposing group-level homogenization as a distinct AI-design risk."
related: [ai-assisted-creative-ideation, ai-interface-design, ai-agent-evals]
---

# Homogenization Effects of Large Language Models on Human Creative Ideation

## Source Metadata

- Path: raw/articles/hci-research/2024-06-22-homogenization-effects-of-large-language-models-on-human-creative-ideation.md
- Authors: Barrett R. Anderson, Jash Hemant Shah, and Max Kreminski
- Published: 2024-06-22 (OpenAlex publication record; conference held 2024-06-23 through 2024-06-26)
- Venue: Creativity and Cognition 2024 (C&C '24), pages 24–36
- Publisher: Association for Computing Machinery (ACM)
- Canonical URL: https://doi.org/10.1145/3635636.3656204
- Open preprint: https://arxiv.org/abs/2402.01536 (v2, 2024-05-10)
- Evidence type: peer-reviewed comparative HCI user study; randomized, balanced, within-subjects experiment with process observation, product measures, and self-report
- Verification: the ACM citation record, OpenAlex metadata, arXiv abstract, and complete 13-page open preprint were inspected on 2026-08-01.
- Copyright note: the endpoint-captured arXiv abstract-page text is preserved verbatim in `## Source Text`. The complete lawful preprint was read for curation but is not reproduced here.

## TL;DR

In a moderated divergent-ideation study, 33 analyzed participants used both ChatGPT and the non-AI Oblique Strategies card deck across balanced product-improvement and improbable-consequence tasks. ChatGPT increased idea count, category coverage, and detail, but different users' outputs were more semantically similar and users assigned themselves less responsibility for the ideas. Diversity within each person's own idea set did not differ detectably, so the observed risk was not straightforward individual fixation; it was cross-user convergence around similar model suggestions. The practical design implication is to use AI to elicit intent and open conceptual space—not only to emit finished-looking answers—and to evaluate portfolio-level diversity and ownership alongside speed and output volume.

## Key Claims

### Empirical findings

- The study recruited 36 participants and excluded three who did not follow directions, leaving 33 in the reported analyses; participants produced 1,271 ideas across four divergent-thinking prompts.
- At the group level, ideas produced with ChatGPT were more homogenized: mean semantic dissimilarity from the group centroid was `.24` with ChatGPT versus `.28` with Oblique Strategies, `t(32)=2.154`, `p=.038`, `d=.47`, 95% CI `[.00,.07]`.
- Within each participant's own set, the study did not detect a diversity difference: `.65` with ChatGPT versus `.66` with Oblique Strategies, `p=.352`, `d=.12`. The authors therefore interpret convergence as similar suggestions reaching different users, not increased individual-level fixation.
- Participants assigned less responsibility to themselves for ChatGPT-assisted ideas: `48.17%` versus `63.63%`, `p=.003`, `d=.67`.
- ChatGPT increased fluency by about 15% (`8.39` versus `7.32` ideas, `p=.044`, `d=.32`) and category flexibility by about 27% (`8.58` versus `6.77` categories, `p=.001`, `d=.54`).
- The paper reports greater elaboration (`8.25` versus `6.46` stoplisted words), but the printed statistics are internally inconsistent: `t(32)=2.32` and a confidence interval excluding zero appear alongside `p=.237`. This note does not resolve or silently correct that publication-level discrepancy.
- No detectable condition difference appeared in total Creativity Support Index scores. Several interviewees nevertheless described ChatGPT as easier or faster but less engaging, repetitive, or too specific too early.
- The observed prompting variations—including role prompts, creative constraints, iteration, and starting with one's own ideas—did not reliably predict lower group-level homogenization in this small sample.

### Source interpretation and proposals

- The authors argue that **inferential distance** matters. Finished-looking, task-specific model answers leave fewer creative decisions to the person than oblique prompts that require interpretation.
- They propose intent elicitation as a better co-creative role: progressively draw out a user's detailed and idiosyncratic intent instead of letting a brief generic prompt trigger many model-made creative decisions.
- Potential mitigations include showing output typicality or clichés, introducing deliberately oblique stimuli, supporting movement among plural creativity tools, adding tested randomness or diverse decoding, and evaluating semantic diversity across users.
- These mitigations are design proposals and research directions, not interventions validated by this experiment.

## Important Details

### Problem, users, context, and AI role

- **Problem:** a creativity tool can improve one user's apparent productivity while quietly reducing novelty across a team, market, or creative population.
- **Users/context:** adults performing short, timed divergent-ideation tasks; the sample included students, creative professionals, and other professionals, with varied prior LLM experience.
- **AI role:** ChatGPT 3.5 acted as a general-purpose idea generator and conversational creativity support tool, not as an autonomous decision-maker or a purpose-built design application.
- **Comparator:** the Oblique Strategies deck supplied short, ambiguous prompts such as “Turn it upside down” that users had to reinterpret for the current problem.
- **Human-control model:** participants chose prompts, iterated, curated, copied, modified, paraphrased, or ignored suggestions. Only one participant copied an entire model response without curation, yet lower ownership and group convergence still appeared.

### Interaction flow studied

1. Each participant completed two eight-minute prompts with ChatGPT and two with Oblique Strategies.
2. One prompt under each tool concerned product improvement; the other concerned consequences of an improbable situation.
3. Tool and prompt order were randomized per participant and balanced across the experiment.
4. Participants thought aloud where practical; the researchers captured sessions, idea artifacts, post-tool Creativity Support Index scores, responsibility ratings, and interviews.
5. Researchers compared group-level and individual-level semantic distance, idea count, manually coded category coverage, stoplisted word count, uniqueness variants, process behavior, and self-report.

### Evidence and evaluation quality

- **Evidence level:** moderate. This is a peer-reviewed, within-subjects comparative study with a plausible non-AI baseline, balanced order, blinded category coding, process observations, effect sizes, and multiple product/process measures.
- **Primary evaluation method:** sentence-embedding cosine similarity relative to group and individual centroids, supplemented by a small human-agreement validation described in the appendix.
- **Secondary measures:** TTCT-inspired fluency, flexibility, originality, and elaboration proxies; Creativity Support Index; ownership/responsibility rating; think-aloud observation; interviews.
- **Strength:** separating group-level convergence from within-person diversity prevents “fixation” from becoming an unsupported catch-all explanation.
- **Measurement caution:** semantic similarity is not the same as usefulness, taste, quality, feasibility, or historical originality. The selected sentence embeddings had not previously been validated specifically for creativity assessment, and the paper did not evaluate artifact quality.

### Benefits, failures, and transferability

- **Benefits observed:** faster enumeration, more ideas, wider category coverage, and more detailed responses.
- **Failures observed:** cross-user convergence, reduced felt ownership, lower engagement for some users, repeated suggestions, premature specificity, and the impression that the model supplied “right answers” in an open-ended task.
- **What transfers:** do not evaluate creative AI only per user; preserve productive ambiguity early; make human creative decisions visible; inspect ownership; and compare portfolio-level diversity across repeated similar briefs.
- **What does not automatically transfer:** the exact effect size to current frontier models, multimodal design tools, longitudinal professional projects, team collaboration, or purpose-built divergent-ideation interfaces.
- **Practitioner judgment:** in product and design workflows, use LLMs first as interviewers, critics, contrast generators, constraint explorers, and provenance-aware option organizers. Delay polished synthesis until the team has recorded distinctive user evidence, constraints, and independent hypotheses.

### Accessibility, privacy, rights, and responsible use

- The study did not test keyboard access, screen readers, cognitive accessibility, reduced motion, multimodal access, or disability-related differences. Accessibility effects are unknown.
- Remote participation required a stable connection, screen sharing, and a quiet place, which narrows who could participate and may exclude relevant contexts.
- The study did not evaluate production privacy, retention, training-data use, confidential briefs, or leakage between organizations. Creative tools should minimize submitted data and make provenance, retention, deletion, and model-training policies explicit.
- It did not examine copyright, attribution, or generated-asset rights. Lower felt ownership makes provenance and contribution tracking more—not less—important in professional creative work.
- The demographic sample was racially diverse but small, limited to ages 22–44, and not analyzed for subgroup effects; the evidence does not establish cross-cultural or accessibility generality.

### Practical workflow for AI-assisted design ideation

1. **Frame from evidence:** record the users, unmet need, context, constraints, and unresolved tensions before asking for solutions.
2. **Elicit intent:** have the AI ask contrastive questions and surface missing decisions; do not jump from a generic brief to polished concepts.
3. **Preserve independent signal:** collect team members' observations and hypotheses separately before pooled AI synthesis. This is a risk-control judgment, not a causal result established by the study.
4. **Diverge by mechanism:** request alternatives across user goals, interaction models, constraints, modalities, failure states, and non-AI options—not repeated stylistic variants.
5. **Increase inferential distance early:** prefer provocations, partial structures, counterexamples, and oblique constraints that require human interpretation; defer finished-looking copy or screens.
6. **Expose typicality:** flag repeated motifs and compare candidate embeddings, categories, or mechanism labels across the team's portfolio; “many ideas” is not evidence of collective diversity.
7. **Curate with ownership:** require a human rationale, source/provenance note, rejected alternatives, and explicit record of what the person changed or decided.
8. **Evaluate both levels:** measure per-person fluency and coverage, then group-level semantic/category diversity, quality with domain raters, ownership, engagement, task success, and accessibility.
9. **Re-test over time:** repeat after model, prompt, retrieval, sampling, or interface changes because convergence is a property of the whole creativity-support system.

## Entities

- People: Barrett R. Anderson, Jash Hemant Shah, Max Kreminski
- Organizations: Santa Clara University, ACM SIGCHI, Markkula Center for Applied Ethics
- Venue: Creativity and Cognition 2024 (C&C '24)
- Tools/models: ChatGPT 3.5, Oblique Strategies, Sentence-BERT-style semantic embeddings, Creativity Support Index, Torrance Tests of Creative Thinking
- Concepts: creativity support tools, divergent ideation, homogenization, creative fixation, inferential distance, underdetermination, algorithmic monoculture, intent elicitation, ownership, fluency, flexibility, originality, elaboration

## My Notes

- The durable distinction is **individual productivity versus collective originality**. A tool can improve fluency and category coverage for every person while moving the population toward the same region of solution space.
- “AI causes fixation” is too broad for this evidence. The study detected group-level convergence without detectable within-person narrowing; similar model priors across users are the more direct explanation here.
- Prompt sophistication should not become the product's only defense. The study did not find reliable diversity gains from participants' observed prompting strategies, and users cannot see what other users were shown.
- This source gives [[ai-interface-design]] a concrete reason to preserve ambiguity, intent, and authorship before polish, and gives [[ai-agent-evals]] a portfolio-level outcome measure beyond task success.
- Confidence is moderate because the study is small, uses 2023 ChatGPT 3.5, and tests short laboratory tasks, but its mechanism and measurement distinction are highly transferable as design hypotheses.

## Open Questions

- Can purpose-built intent-elicitation interfaces preserve ChatGPT's fluency gains while increasing group-level diversity and ownership?
- Which typicality signals help creators without anchoring them further or exposing other users' confidential work?
- Do image, interface, motion, and code generators show the same split between within-user variety and cross-user convergence?
- How should teams combine semantic distance, mechanism/category diversity, expert quality ratings, accessibility, and real user outcomes without optimizing for novelty alone?
- Does repeated use change skill, confidence, engagement, or convergence over months rather than eight-minute tasks?
- Which intervention matters most: plural models, diverse decoding, oblique stimuli, independent human ideation, retrieval from user research, or explicit cliché detection?

## Related

- [[ai-assisted-creative-ideation]]
- [[ai-interface-design]]
- [[ai-agent-evals]]

## Source Text

View PDF
    HTML (experimental)
            Abstract:Large language models (LLMs) are now being used in a wide variety of contexts, including as creativity support tools (CSTs) intended to help their users come up with new ideas. But do LLMs actually support user creativity? We hypothesized that the use of an LLM as a CST might make the LLM's users feel more creative, and even broaden the range of ideas suggested by each individual user, but also homogenize the ideas suggested by different users. We conducted a 36-participant comparative user study and found, in accordance with the homogenization hypothesis, that different users tended to produce less semantically distinct ideas with ChatGPT than with an alternative CST. Additionally, ChatGPT users generated a greater number of more detailed ideas, but felt less responsible for the ideas they generated. We discuss potential implications of these findings for users, designers, and developers of LLM-based CSTs.

Comments:
          Accepted to C&C 2024

Human-Computer Interaction (cs.HC); Artificial Intelligence (cs.AI)

Cite as:
          arXiv:2402.01536 [cs.HC]

(or
              arXiv:2402.01536v2 [cs.HC] for this version)

https://doi.org/10.48550/arXiv.2402.01536

Submission history From: Max Kreminski [view email]                  [v1]
        Fri, 2 Feb 2024 16:27:11 UTC (454 KB)
    [v2]
        Fri, 10 May 2024 20:10:22 UTC (469 KB)
