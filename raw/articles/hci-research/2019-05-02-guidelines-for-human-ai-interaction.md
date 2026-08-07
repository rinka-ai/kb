---
id: article-2019-05-02-guidelines-for-human-ai-interaction
type: source
title: "Guidelines for Human-AI Interaction"
path: raw/articles/hci-research/2019-05-02-guidelines-for-human-ai-interaction.md
author: Saleema Amershi et al.
publisher: ACM CHI / Microsoft Research
url: https://www.microsoft.com/en-us/research/publication/guidelines-for-human-ai-interaction/
date_published: 2019-05-02
date_added: 2026-07-31
tags: [human-ai-interaction, hci, interaction-design, ai-ui, mixed-initiative, usability, human-control, uncertainty, personalization, fairness]
status: active
quality: high
summary: "This CHI 2019 paper synthesizes more than 150 prior recommendations into 18 observable human-AI interaction guidelines, then iteratively validates their relevance and wording through heuristic evaluations of AI features across 20 products."
related: [ai-interface-design, fairness-and-ml, ai-agent-evals, context-engineering]
---

# Guidelines for Human-AI Interaction

## Source Metadata

- Path: raw/articles/hci-research/2019-05-02-guidelines-for-human-ai-interaction.md
- Authors: Saleema Amershi, Dan Weld, Mihaela Vorvoreanu, Adam Fourney, Besmira Nushi, Penny Collisson, Jina Suh, Shamsi Iqbal, Paul N. Bennett, Kori Inkpen, Jaime Teevan, Ruth Kikin-Gil, and Eric Horvitz
- Published: 2019-05-02 (Crossref publication record; the Microsoft page metadata reports 2019-05-01 and its extracted page date was 2019-01-10)
- Venue: CHI Conference on Human Factors in Computing Systems Proceedings (CHI 2019), pages 1–13
- Publisher: ACM; official open copy hosted by Microsoft Research
- Canonical URL: https://www.microsoft.com/en-us/research/publication/guidelines-for-human-ai-interaction/
- DOI: https://doi.org/10.1145/3290605.3300233
- Paper PDF: https://www.microsoft.com/en-us/research/wp-content/uploads/2019/01/Guidelines-for-Human-AI-Interaction-camera-ready.pdf
- Evidence type: peer-reviewed CHI paper; literature/industry synthesis followed by iterative heuristic-evaluation studies
- Verification: the official Microsoft landing page, camera-ready paper, embedded citation metadata, and Crossref record were inspected on 2026-07-31.
- Copyright note: this note preserves only the automatically captured public landing-page text below. The paper was read from Microsoft's lawful open copy, but its full text is not reproduced here.

## TL;DR

The paper turns a scattered body of human-AI interaction advice into 18 short, inspectable guidelines organized by when they matter: initially, during interaction, when the AI is wrong, and over time. Its durable contribution is not merely the checklist; it is a control model for uncertain systems. Set realistic capability expectations, time and scope automation to context and confidence, make invocation/dismissal/correction efficient, explain behavior when useful, and keep learning or adaptation legible and controllable. The authors derived the set from 168 candidate recommendations, refined it through an internal evaluation, tested it with 49 HCI practitioners across 20 popular AI-infused products, and checked wording revisions with 11 experts.

## Key Claims

- Human-facing AI violates assumptions behind conventional consistency and error-prevention heuristics because probabilistic outputs, environmental sensitivity, personalization, and model updates can produce variable behavior.
- Broad goals such as “build trust” are difficult to inspect. Actionable design guidance should name observable interface behavior that can be evaluated as applied, violated, or not applicable.
- The final 18 guidelines are grouped by interaction phase:
  - **Initially:** make clear what the system can do; make clear how well it can do it.
  - **During interaction:** time services based on context; show contextually relevant information; match relevant social norms; mitigate social biases.
  - **When wrong:** support efficient invocation; support efficient dismissal; support efficient correction; scope services when in doubt; make clear why the system did what it did.
  - **Over time:** remember recent interactions; learn from user behavior; update and adapt cautiously; encourage granular feedback; convey the consequences of user actions; provide global controls; notify users about changes.
- The 49-practitioner study produced 785 adjusted examples across the 20 evaluated products: 313 applications, 277 violations, 89 neutral observations, and 106 “does not apply” judgments.
- Every guideline had at least one application or violation in every tested product category, which supports broad relevance but does not establish that every guideline applies equally to every interface.
- Explanations were often relevant but absent or inadequate; usefulness depends on the user's purpose, stakes, and potential gaming or disclosure costs, so explanation should not become indiscriminate verbosity.
- Social norms and bias were among the least clear and hardest guidelines to evaluate. The authors argue that diverse evaluators and specialized methods may be necessary because harms can be invisible to majority-group reviewers.
- General interface heuristics are not enough for high-risk or specialized domains, non-graphical modalities, or broader ethical impact. Domain-specific guidance and model-layer risk decisions remain necessary.

## Important Details

### Method and evidence

- Phase 1 collected 168 candidate recommendations from internal and external industry guidance, scholarly literature, product audits, customer feedback, and public practitioner writing.
- Three team members affinity-clustered candidates into 35 concepts, then filtered vague, scenario-specific, or non-AI-specific concepts to 20 initial guidelines.
- Phase 2 used 11 team members in a modified heuristic evaluation of 13 AI-infused products/features. It split compound guidance, clarified instance-level versus global controls, merged overlaps, and removed model-layer principles that were not observable in an interface.
- Phase 3 recruited 49 practitioners with HCI/UX experience. They evaluated one familiar feature among 20 products spanning e-commerce, navigation, music recommendations, activity tracking, autocomplete, social networks, email, voice assistants, photo organization, and web search.
- The study used maximum-variance product-category sampling, but recruitment was primarily through a large software company's internal lists; 11 participants were external.
- Phase 4 asked 11 experienced UX/HCI experts to compare wording revisions. The revisions were generally preferred, though capability versus capability quality remained somewhat difficult to distinguish.

### Reusable design pattern

- **Design problem:** probabilistic systems can be useful while also being inconsistent, wrong, intrusive, or changed by learning in ways users cannot predict.
- **Users/context:** people interacting with user-facing AI recommendations, assistants, adaptive interfaces, filters, predictions, or proactive services; the paper sampled familiar consumer products rather than high-risk professional workflows.
- **AI role:** infer, recommend, filter, recognize, predict, personalize, remember, or act proactively under uncertainty.
- **Human-control model:** mixed initiative with efficient user invocation and dismissal, instance-level correction and feedback, uncertainty-triggered scoping or disambiguation, plus persistent global controls.
- **Interaction flow:** establish capability and quality expectations → offer context-appropriate assistance → let the user invoke, ignore, correct, or ask why → remember only useful recent context → learn cautiously from behavior and explicit feedback → show consequences, controls, and material system changes.
- **Evidence level:** moderate-to-high for relevance and inspectability of the guideline set; not evidence that applying the checklist causes improved task outcomes. The work validates heuristic clarity and occurrence across products, not longitudinal usability, trust calibration, accessibility, safety, or business impact.
- **Observed benefits:** practitioners could identify concrete applications and violations across varied product categories; the four-phase organization makes failure and control requirements reviewable before and after implementation.
- **Failure modes:** vague capability promises; hidden uncertainty; untimely interruption; stale context; stereotype reinforcement; automation that cannot be dismissed or corrected; explanations that do not answer the user's question; personalization without visible consequences; disruptive adaptation; and absent global controls.
- **Accessibility implications:** the paper includes disability assumptions as a bias example, but it did not conduct accessibility testing or establish keyboard, screen-reader, cognitive-load, or reduced-motion behavior. Teams must add WCAG- and modality-specific evaluation rather than treating “mitigate social biases” as sufficient.
- **Privacy implications:** remembering interactions and learning from behavior create data and inference risks. Global controls should cover what is monitored and how it influences behavior, but the paper does not specify minimization, retention, consent, security, or deletion mechanisms.
- **What transfers:** the phase model; distinction between capability, quality, and post-hoc explanation; local correction versus global control; bounded automation under uncertainty; cautious adaptation; and immediate disclosure of feedback consequences.
- **What is context-dependent:** when to interrupt, which explanations are useful, acceptable automation scope, social norms, confidence presentation, retention, and whether adaptation should be automatic at all.
- **How to evaluate in practice:** run a cross-functional heuristic review across all 18 guidelines and critical states; capture one concrete application or violation per applicable guideline; include disabled and culturally diverse evaluators; then test representative tasks and failures with users while measuring task success, recovery time, correction rate, inappropriate automation, dismissal success, trust calibration, accessibility, and downstream harm.

### Operational checklist for AI-native interfaces

1. State both the capability boundary and expected error profile before users rely on the feature.
2. Define the initiative policy: what requires explicit invocation, what may be suggested, and what may happen automatically.
3. Bind automation scope to uncertainty and consequence; prefer options, previews, or clarification when confidence or intent is ambiguous.
4. Design wrong-state recovery alongside the happy path: dismiss, edit, refine, retry, undo, escalate, and inspect why.
5. Separate a one-off correction from feedback that changes future behavior, and show that future consequence immediately.
6. Expose global controls for monitoring, memory, personalization, and proactive behavior; do not hide them behind repeated instance-level corrections.
7. Treat model or behavior changes as product changes that may require notice, renewed expectation-setting, and regression evaluation.

## Entities

- People: Saleema Amershi, Dan Weld, Mihaela Vorvoreanu, Adam Fourney, Besmira Nushi, Penny Collisson, Jina Suh, Shamsi Iqbal, Paul N. Bennett, Kori Inkpen, Jaime Teevan, Ruth Kikin-Gil, Eric Horvitz
- Organizations: Microsoft Research, Microsoft, University of Washington, ACM SIGCHI
- Venue: CHI 2019
- Artifact: Guidelines for Human-AI Interaction; later connected by Microsoft to the Human-AI eXperience (HAX) Toolkit
- Concepts: human-AI interaction, mixed initiative, uncertainty, explanation, correction, dismissal, cautious adaptation, personalization, global controls, feedback, social norms, bias, heuristic evaluation

## My Notes

- This source fills a real KB gap. [[ai-interface-design]] already advocated explicit state, trust, correction, and reversibility, but lacked a peer-reviewed, method-backed lifecycle for specifying them.
- The strongest design distinction is three-way: **what can it do**, **how well can it do it**, and **why did this particular behavior occur**. Combining these into one “AI transparency” panel obscures different user questions.
- “Scope services when in doubt” is the core bounded-automation pattern for generative and agentic UI: reduce blast radius through clarification, options, preview, or graceful degradation rather than presenting uncertain intent as confident action.
- Granular feedback and global controls are different control planes. A thumbs-down should repair or label one outcome; persistent settings should govern what the system watches, remembers, learns, and does across outcomes.
- The checklist should be used as a design/evaluation scaffold, not a compliance badge. It does not replace outcome testing, accessibility audits, privacy engineering, threat modeling, or domain-specific safety review.

## Open Questions

- How should these guidelines change for generative systems that create editable artifacts rather than make classifications or recommendations?
- Which guidelines require stronger forms for autonomous agents that can execute costly or irreversible actions?
- How should capability quality be communicated when performance varies sharply by task, user, language, or context and a single confidence number would mislead?
- What longitudinal measures best detect disruptive adaptation, trust miscalibration, and learned helplessness?
- How should global memory and personalization controls express retention, deletion, provenance, and cross-surface effects?

## Related

- [[ai-interface-design]]
- [[fairness-and-ml]]
- [[ai-agent-evals]]
- [[context-engineering]]
- [[agent-security]]
- [[workflows]]
- [[2026-06-17-carbon-design-system]]

## Source Text

Create human-centered AI with the Human-AI eXperience (HAX) Toolkit webinar

The tech industry is being called upon to develop and deploy AI technologies more responsibly. Yet many organizations that create AI technologies report being unprepared to address AI risks and failures.
To meet these challenges, Microsoft is striving to take a human-centered approach to AI, designing and building technologies that benefit people and society while also mitigating potential harms. This includes understanding human needs and using that insight to drive development decisions from beginning to end.
To assist AI practitioners in building human-centered AI, we are introducing the Human-AI eXperience (HAX) Toolkit, launching on July 19. This suite of tools spans the end-to-end product development lifecycle, providing support where AI practitioners have requested it.
In this webinar, join Saleema Amershi, Senior Principal Research Manager, and Mihaela Vorvoreanu, Aether Director of UX Research and RAI education, to learn how and when to use each tool in the HAX Toolkit to create human-centered AI.
Together, you’ll explore:

Guidelines for Human-AI Interaction – best practices for how AI systems should behave during user interactions that synthesize more than 20 years of guidance on this topic
The HAX Workbook – a tool to guide teams through planning and implementing human-AI interaction best practices
The HAX Design Patterns – a set of flexible solutions to recurring human-AI interaction problems
The HAX Playbook – an interactive tool for generating scenarios to test based on likely human-AI interaction failures

The Human-AI eXperience (HAX) Toolkit (opens in new tab)
The Human-AI eXperience (HAX) Team (project page)
Guidelines for Human-AI Interaction (publication)
Planning for Natural Language Failures with the AI Playbook (publication)
Mihaela Vorvoreanu (researcher profile)
Saleema Amershi (researcher profile)

*This on-demand webinar features a previously recorded Q&A session and open captioning.
Explore more Microsoft Research webinars: https://aka.ms/msrwebinars (opens in new tab)
