---
id: 2024-05-11-promptcharm-multimodal-prompting-and-refinement
type: source
title: "PromptCharm: Text-to-Image Generation through Multi-modal Prompting and Refinement"
path: raw/articles/hci-research/2024-05-11-promptcharm-multimodal-prompting-and-refinement.md
author: Zhijie Wang; Yuheng Huang; Da Song; Lei Ma; Tianyi Zhang
publisher: ACM CHI
url: https://arxiv.org/abs/2403.04014
date_published: 2024-05-11
date_added: 2026-08-03
tags: [hci, human-ai-collaboration, mixed-initiative, text-to-image, generative-ai, prompt-engineering, direct-manipulation, explainability, versioning, evaluation]
status: active
quality: high
summary: A CHI 2024 mixed-initiative text-to-image system study found that prompt exploration, attention-based steering, localized inpainting, and version comparison helped 24 novices align Stable Diffusion outputs better than plain prompting or automatic prompt rewriting alone, within small short-task studies.
related: [ai-interface-design, ai-assisted-creative-ideation, ai-agent-evals, 2019-05-02-guidelines-for-human-ai-interaction]
superseded_by:
---

# PromptCharm: Text-to-Image Generation through Multi-modal Prompting and Refinement

## Source Metadata

- Path: raw/articles/hci-research/2024-05-11-promptcharm-multimodal-prompting-and-refinement.md
- Authors: Zhijie Wang, Yuheng Huang, Da Song, Lei Ma, and Tianyi Zhang
- Venue: Proceedings of the CHI Conference on Human Factors in Computing Systems (CHI 2024)
- Publication date: 2024-05-11 (conference opening date; arXiv v1 submitted 2024-03-06)
- Canonical DOI: https://doi.org/10.1145/3613904.3642803
- Open-access version: https://arxiv.org/abs/2403.04014
- Paper inspected: 21-page arXiv v1 PDF, SHA-256 `9b90afaea126128a3795758446058324db979b6e91248581c269a396d433790c`
- System repository named by the paper: https://github.com/ma-labo/PromptCharm
- Acquisition note: `bun run kb:ingest --url https://arxiv.org/abs/2403.04014` selected the original root path, captured the abstract page below, and then failed during index rebuild because its generated unquoted summary contained a colon. Curation retained that acquired `## Source Text` unchanged while relocating the note to the established HCI collection.

## TL;DR

PromptCharm replaces the single prompt box with a mixed-initiative refinement loop for novice Stable Diffusion users: automatic prompt rewriting, explorable style modifiers, token-to-image attention visualizations, bounded token-attention controls, masked inpainting, and side-by-side version history. Two counterbalanced within-subjects studies with 12 participants each favored the full system over a plain editor and an automatic-rewrite-only condition, but the evidence is limited to short remote tasks, novice university participants, one model family, and largely self-reported open-ended quality.

## Key Claims

### Empirical findings reported by the paper

- In three 15-minute target-replication tasks, the full PromptCharm condition achieved mean structural similarity (SSIM) `0.648 ± 0.100`, versus `0.479 ± 0.115` for the plain baseline and `0.574 ± 0.111` for the Promptist automatic-refinement condition.
- The full system was not significantly better than Promptist on the simplest one-subject replication task (`p = 0.49`), but it was significantly better than both baselines on the two more complex multi-object tasks according to the paper's per-task tests.
- In three open-ended image tasks, participants rated PromptCharm outputs as more aesthetically pleasing than Baseline and Promptist (mean `5.8` versus `4.9` and `4.9`) and as matching expectations better (`5.9` versus `4.4` and `4.8`) on seven-point scales; these are participant judgments, not blinded expert quality ratings.
- The authors found no statistically significant increase in mental demand for the richer interface in either study. Participants reported lower frustration in the close-ended study and better perceived performance in both studies, while several workload differences against Promptist were not significant.
- Version comparison, modifier exploration, and attention adjustment were consistently valued. Inpainting was less reliable: participants reported that larger edited regions sometimes failed to blend with the surrounding image.

### Source claims and design rationale

- Prompt text alone is an impoverished control surface for iterative generation because it forces users to express model-specific vocabulary and can change unrelated parts of an output when rewritten.
- A richer feedback loop should let people inspect an approximation of model behavior, select meaningful dimensions, steer strength, alter a localized region, compare versions, and return to an earlier state.
- Creative tools should support both exploration, when intent is still forming, and exploitation, when the user has a clear target and needs precise correction.
- Explanations become more actionable when coupled to a control: PromptCharm connects token attention visualization to token-level adjustment rather than presenting a heat map only as passive information.

## Important Details

### Problem, users, and context

- Target users were novice or lightly experienced text-to-image users who knew desired content or style but lacked the model-specific modifier vocabulary and debugging knowledge needed to express it.
- All 24 study participants came through electrical/computer engineering or computer-science mailing lists at one research university. Twenty-one were students; none had used a prompt-engineering tool, and only six reported one year of text-to-image experience.
- Sessions ran remotely over Zoom on participants' own computers. Each condition included a tutorial, five minutes of practice, and 15 minutes of task work.

### AI role and human-control model

- **AI initiative:** Promptist automatically expands the initial prompt; Stable Diffusion 2.1 generates and inpaints images; mined DiffusionDB examples suggest style modifiers; DAAM-derived cross-attention values supply the explanation view.
- **Human initiative:** users can retain or edit rewritten text, delete or replace modifiers, explore similar or dissimilar styles before generation, change a token's attention multiplier, mask a local area for regeneration, provide an inpainting prompt, and compare prior versions.
- **Control scope:** attention adjustment was bounded to multipliers from `0.5×` to `2×` during the studies. Inpainting confines regeneration to a user-painted mask. Version history shows two versions side by side and permits return to earlier output.
- **Interaction flow:** describe intent → inspect/refine the automatic prompt → explore style examples → generate → inspect token/image attention → steer a token or mask a region → regenerate → compare versions → repeat.

### Implementation and capability evidence

- The web client used Material UI; the backend used Python Flask, PyTorch, Transformers, Stable Diffusion 2.1, and two NVIDIA A5000 GPUs.
- Prompt modifiers were mined as one- to three-token n-grams from DiffusionDB, ranked by frequency, and related using cosine distance in the diffusion text encoder's embedding space.
- Token saliency and token-linked image regions came from DAAM aggregation of Stable Diffusion cross-attention. Runtime hooks multiplied selected cross-attention outputs by the user's factor at every cross-attention layer.
- The paper reports roughly 30 seconds per image on the study hardware, which motivated previewing style examples instead of generating a large option grid.

### Evaluation method

- Study 1 was a counterbalanced within-subjects comparison across a plain prompt editor, that editor plus Promptist, and full PromptCharm. Each participant completed three target-replication tasks. Measures included SSIM, perceived similarity, NASA-TLX factors, surveys, recordings, feature use, and preference.
- Study 2 repeated the within-subjects comparison with a different group and three constrained but open-ended scenes. Outcomes were participant-rated aesthetics and expectation match, NASA-TLX factors, observed behavior, surveys, and preference; there was no objective or expert artifact-quality measure.
- The paper uses Welch's t-tests and Wilcoxon signed-rank tests across multiple outcomes. It does not report a correction for multiple comparisons or effect sizes, and the sample per study is small.

### Accessibility, privacy, copyright, and responsible assets

- The studies did not evaluate keyboard-only use, screen readers, low vision, motor access, cognitive accessibility, reduced motion, or disabled participants. Hover-dependent attention inspection, dense token color encoding, painting a mask, and slider precision all require accessibility alternatives before transfer to production.
- The paper does not evaluate prompt/image privacy, retention, consent for sensitive uploads, output provenance, artist consent, copyright risk, or representational harms. Promptist and the examples prominently use living-artist names and a DiffusionDB corpus derived from Stable Diffusion prompts; popularity-ranked modifiers may reproduce dominant styles and biases.
- Cross-attention is an internal model signal, not a causal or complete explanation of generation. Labeling it as "why" without qualification can create false confidence.
- Production asset workflows still need content safety, source and generation provenance, rights review, disclosure, secure deletion, and a non-generative fallback.

## Entities

- People: Zhijie Wang; Yuheng Huang; Da Song; Lei Ma; Tianyi Zhang
- Institutions: University of Alberta; University of Tokyo; Purdue University; ACM CHI
- Systems and datasets: PromptCharm; Promptist; Stable Diffusion 2.1; DAAM; DiffusionDB
- Technologies: Material UI; Python Flask; PyTorch; Hugging Face Transformers; NVIDIA A5000
- Concepts: mixed initiative; direct manipulation; prompt refinement; attention visualization; local steering; inpainting; version control; exploration versus exploitation

## My Notes

### Durable practitioner interpretation

- The transferable pattern is not "add attention sliders." It is **match the control surface to the user's correction locus**. Use semantic controls for intent or style, direct manipulation for spatial defects, history for nondeterministic regressions, and automatic assistance only where the result remains inspectable and rejectable.
- Pair every explanation with an available action and an honest epistemic label. A token influence visualization is useful because the user can test a bounded intervention, but it should be presented as a diagnostic signal rather than ground-truth causality.
- Preserve accepted regions while changing one thing. Locality reduces change amplification and lets users form a workable mental model despite stochastic generation.
- Separate exploration from exploitation in the UI. Early exploration benefits from browsable examples and divergent dimensions; later correction benefits from precise controls, frozen decisions, side-by-side diffs, and rollback.
- Previewing a cheap representation before expensive generation is a general progressive-disclosure pattern for generative UI: inspect style references, planned changes, affected regions, or structured deltas before paying latency and losing a good state.
- Transfer to text, UI, code, motion, and service design should be tested rather than assumed. The analogous controls are editable intent/constraint objects, element-level regeneration, component locks, semantic diffs, branches, previews, and reversible application.

## Open Questions

- Would the benefits survive with current multimodal models whose editing and instruction-following differ substantially from Stable Diffusion 2.1?
- Does attention visualization improve calibrated understanding, or merely provide a compelling but incomplete story that users can manipulate?
- Which parts of the gain come from modifier examples, local controls, explanation, version history, or their interaction? The bundled comparison does not isolate them.
- How should mixed-initiative image tools support keyboard, screen-reader, switch, voice, and low-vision workflows without relying on hover, color, precise sliders, or freehand masks?
- Do popularity-ranked style suggestions increase fixation or cross-user homogenization, particularly when they foreground named artists and dominant training-corpus aesthetics?
- How should provenance, rights, privacy, and model/data disclosure appear in the same iterative history without overwhelming the creative flow?
- What objective and independent measures can evaluate open-ended creative quality, user ownership, diversity, accessibility, and rights compliance together?

## Related

- [[ai-interface-design]]
- [[ai-assisted-creative-ideation]]
- [[ai-agent-evals]]
- [[2019-05-02-guidelines-for-human-ai-interaction]]
- [[2024-06-22-homogenization-effects-of-large-language-models-on-human-creative-ideation]]
- [[2022-04-29-ai-chains-transparent-and-controllable-human-ai-interaction]]

## Source Text

View PDF
    HTML (experimental)
            Abstract:The recent advancements in Generative AI have significantly advanced the field of text-to-image generation. The state-of-the-art text-to-image model, Stable Diffusion, is now capable of synthesizing high-quality images with a strong sense of aesthetics. Crafting text prompts that align with the model's interpretation and the user's intent thus becomes crucial. However, prompting remains challenging for novice users due to the complexity of the stable diffusion model and the non-trivial efforts required for iteratively editing and refining the text prompts. To address these challenges, we propose PromptCharm, a mixed-initiative system that facilitates text-to-image creation through multi-modal prompt engineering and refinement. To assist novice users in prompting, PromptCharm first automatically refines and optimizes the user's initial prompt. Furthermore, PromptCharm supports the user in exploring and selecting different image styles within a large database. To assist users in effectively refining their prompts and images, PromptCharm renders model explanations by visualizing the model's attention values. If the user notices any unsatisfactory areas in the generated images, they can further refine the images through model attention adjustment or image inpainting within the rich feedback loop of PromptCharm. To evaluate the effectiveness and usability of PromptCharm, we conducted a controlled user study with 12 participants and an exploratory user study with another 12 participants. These two studies show that participants using PromptCharm were able to create images with higher quality and better aligned with the user's expectations compared with using two variants of PromptCharm that lacked interaction or visualization support.

Comments:
          To appear in the 2024 CHI Conference on Human Factors in Computing Systems (CHI '24), May 11--16, 2024, Honolulu, HI, USA

Human-Computer Interaction (cs.HC); Artificial Intelligence (cs.AI)

Cite as:
          arXiv:2403.04014 [cs.HC]

(or
              arXiv:2403.04014v1 [cs.HC] for this version)

https://doi.org/10.48550/arXiv.2403.04014

Submission history From: Zhijie Wang [view email]          [v1]
        Wed, 6 Mar 2024 19:55:01 UTC (23,510 KB)
