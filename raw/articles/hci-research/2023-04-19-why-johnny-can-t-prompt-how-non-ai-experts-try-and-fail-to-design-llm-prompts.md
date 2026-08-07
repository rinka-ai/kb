---
id: 2023-04-19-why-johnny-cant-prompt
type: source
title: "Why Johnny Can’t Prompt: How Non-AI Experts Try (and Fail) to Design LLM Prompts"
path: raw/articles/hci-research/2023-04-19-why-johnny-can-t-prompt-how-non-ai-experts-try-and-fail-to-design-llm-prompts.md
author: J.D. Zamfirescu-Pereira; Richmond Y. Wong; Bjoern Hartmann; Qian Yang
publisher: ACM CHI
url: https://doi.org/10.1145/3544548.3581388
date_published: 2023-04-19
date_added: 2026-08-06
tags: [hci, human-ai-interaction, prompt-engineering, end-user-programming, mental-models, evaluation]
status: active
quality: high
summary: A CHI 2023 qualitative study of ten non-expert prompt designers found opportunistic one-example iteration, weak robustness testing, and misleading human-to-human instruction analogies, suggesting that prompt interfaces should expose instruction scope, comparative evidence, examples, regression cases, and uncertainty rather than relying on a blank chat box.
related: [ai-interface-design, human-centered-ai-product-design, ai-instruction-design, ai-agent-evals]
superseded_by:
---

# Why Johnny Can’t Prompt: How Non-AI Experts Try (and Fail) to Design LLM Prompts

## Source Metadata

- Path: raw/articles/hci-research/2023-04-19-why-johnny-can-t-prompt-how-non-ai-experts-try-and-fail-to-design-llm-prompts.md
- Canonical URL: https://doi.org/10.1145/3544548.3581388
- Venue: CHI 2023, Hamburg, Germany, April 23–28, 2023
- DOI: `10.1145/3544548.3581388`
- Evidence type: peer-reviewed qualitative HCI design-probe study with think-aloud observation and affinity/service-blueprint analysis
- Acquisition: the canonical DOI redirected to an ACM Cloudflare challenge, so endpoint URL ingestion failed with HTTP 403. The complete open-access ACM PDF was recovered from the Internet Archive's 2025-07-23 capture of the canonical ACM PDF, extracted with `pdftotext -layout`, and sent through `kb:ingest --file` with collection and metadata overrides.
- Curation transformation: the ingest endpoint flattened PDF-extracted line and paragraph structure. This note retains the endpoint-selected path and append-only ingest provenance but restores the untouched `pdftotext -layout` output below, including page-break markers, columns, extraction artifacts, and the paper's spelling.

## TL;DR

Ten people with little or no prompt-design experience used BotDesigner to improve a GPT-3 chatbot while thinking aloud. All eventually changed prompts and locally tested them, but participants mostly reacted to one failure at a time, declared success after one improved output, and did not use the provided systematic regression-testing interface. They overgeneralized from single stochastic outcomes and imported expectations from instructing humans: equivalent wording should behave equivalently, examples felt like cheating, conversational directions should persist, and the model should infer which instructions target itself versus the end user. The durable product lesson is not merely to teach better prompt recipes. Interfaces should make prompt scope, variability, examples, test sets, before/after evidence, lifecycle, and recovery explicit—and evaluate whether those supports actually change behavior.

## Key Claims

### Empirical findings reported by the paper

- All ten participants performed ad hoc prompt iteration with local testing; two needed help to begin.
- Participants usually stopped at one problematic utterance, changed the preamble, retried locally, and treated one successful output as sufficient evidence.
- No participant used BotDesigner's systematic prompt-testing interface for the study task, even though error labeling and regression-style evaluation were available.
- Participants often inferred capability or incapability from one or two outputs, did not collect enough conversations to assess robustness, and rarely checked whether later edits reintroduced earlier failures.
- Human-social expectations shaped prompting. Participants favored direct instructions over examples, sometimes resisted repetition or examples as unnatural or "cheating," expected semantic paraphrases to have similar effects, and misunderstood instruction persistence across conversations.
- Every participant asked why the model behaved as it did; the researchers generally could not provide a causal explanation beyond speculation.

### Authors' design implications

- Make successful examples discoverable at the moment a user encounters a design, selection, or use barrier.
- Support explicit prompt/output comparison so users can inspect what changed rather than infer causality from memory.
- Teach and scaffold data collection, error classes, repeated trials, and regression testing; exposing a test feature is insufficient if it does not fit users' repair flow or demonstrate value.
- Communicate where an instruction applies and how long it persists: template/preamble, current conversation, reminder, future sessions, or no retained state.
- Consider "seamful" interaction that reveals the system's non-human and probabilistic behavior instead of reinforcing a conversational illusion that imports false social expectations.

### Practitioner judgment and transfer

- Treat a prompt change like a stochastic behavioral change, not a deterministic text edit: define representative cases, hold accepted cases, compare distributions and failure classes, then ship with monitoring and rollback.
- A prompt box should not be the only control surface for non-experts. Structured constraints, examples, state/lifecycle labels, paired prompt diffs, output comparisons, and runnable test suites can externalize work users otherwise must hold in a fragile mental model.
- Do not present saliency, explanations, or side-by-side examples as causal proof. Their useful job is to support comparison, verification, revision, and uncertainty-aware action.
- The study supports designing and testing scaffolds, not a conclusion that all non-experts cannot prompt or that one particular scaffold improves production quality.

## Important Details

### Problem, users, context, and AI role

- **Problem:** can non-AI experts design robust natural-language instructions for an LLM chatbot, and where do their intuitive workflows fail?
- **Users:** ten participants with little or no prompt-design experience; the sample skewed toward professionals and STEM graduate students and included mixed programming experience.
- **Context:** participants improved an existing cooking-instruction chatbot to reproduce conversational behaviors from *Back to Back Chef*, including humor, analogy, simplification, social conversation, and completion checks.
- **AI role:** GPT-3 generated chatbot turns from a template containing a preamble, first turns, the current conversation, and a reminder.
- **Human-control model:** participants could edit prompt components, run conversations, retry or edit turns, label errors, and compare a revised template against labeled prior utterances. In practice, control collapsed to local prompt edit plus retry.

### Interaction flow observed

1. Encounter one undesirable response.
2. Stop or briefly continue the conversation.
3. edit the preamble, usually by pattern-matching existing instructions;
4. retry the local context or start another conversation;
5. stop after one apparent success or infer incapability after one or two failures;
6. move to the next visible defect without preserving a regression set.

### Evaluation method and evidence level

- Think-aloud qualitative study, `n = 10`, with sessions lasting up to one hour.
- Participants began with a baseline chatbot and a bounded improvement target to avoid blank-page exploration dominating the study.
- Two authors compared prompt-design approaches and categorized struggles using affinity diagrams and a service blueprint.
- The interviewers later supplied functionality reminders and prompting suggestions when participants stalled; advice was not identical or counterbalanced across participants.
- Evidence level is strong for identifying early usability and mental-model failures in this probe and population, but weak for prevalence, causal feature effects, production performance, or generalization to current models and other tasks.

### Benefits and failures

- **Benefit observed:** every participant eventually changed chatbot behavior through prompting, showing that natural-language customization can lower the initial programming barrier.
- **Primary failure:** easy local iteration encouraged premature success declarations and concealed robustness debt.
- **Mental-model failure:** fluent conversation encouraged users to map human instructional norms onto a stochastic, context-window-bound system.
- **Tool failure:** systematic testing existed but did not become part of the natural workflow; labels were sometimes mistaken for model feedback rather than human test organization.
- **Learning failure:** users struggled to transfer web examples across domains and lacked vocabulary for searching when they did not know what prompt behavior was possible.

### Accessibility, privacy, rights, and responsible deployment

- The study did not evaluate accessibility, privacy, security, representational harm, copyright, or deployment side effects.
- BotDesigner depended on dense visual prompt fields, conversation inspection, labeling, and side-by-side results; production versions need keyboard and screen-reader-operable test management, non-color labels, zoom/reflow support, and textual equivalents for diffs.
- Regression examples can contain sensitive user dialogue. A deployable tool needs minimization, consent, redaction, access controls, retention/deletion policy, and synthetic cases where feasible.
- Example libraries need provenance, permission, and domain/context labels; examples should not silently become shared private prompts or copyrighted training material.
- Preserve a manual or deterministic fallback when prompt behavior is unreliable, inaccessible, or inappropriate for consequential tasks.

### Practical workflow

1. Define the supported intent, instruction scope, expected variability, prohibited effects, and non-AI fallback.
2. Collect representative happy, boundary, adversarial, multilingual, accessibility-relevant, and prior-failure cases before polishing the prompt.
3. Start from a small, provenance-labeled example or template library rather than a blank prompt.
4. Change one behavioral hypothesis at a time; show a semantic prompt diff and run the old and new versions on the same cases with controlled model settings where possible.
5. Compare output quality, failure classes, variance, latency, and cost. Do not treat one successful generation as resolution.
6. Save accepted cases as regression checks, inspect new regressions, and preserve the prior version for rollback.
7. Test the complete interface with representative users: can they understand scope, invoke tests, interpret uncertainty, repair a failure, and continue without AI?
8. Re-run the suite after model, prompt, retrieval, memory, tool, safety-policy, or product-flow changes; monitor real fallback and correction behavior after launch.

### Transferability

- **High:** prompt builders, chatbot configuration, agent instructions, content transformations, generative design tools, AI form builders, and any product exposing natural language as end-user programming.
- **Moderate:** software teams already using eval suites; the paper strengthens UX reasons for making tests inspectable and usable, but it does not specify statistical sample sizes or current-model eval methodology.
- **Low without new evidence:** autonomous consequential actions, expert-only workflows, image/audio interfaces, disabled-user workflows, longitudinal learning, and claims about today's model reliability.

## Entities

- **People:** J.D. Zamfirescu-Pereira; Richmond Y. Wong; Bjoern Hartmann; Qian Yang
- **Institutions:** UC Berkeley; Georgia Institute of Technology; Cornell University; ACM
- **System:** BotDesigner
- **Model:** GPT-3
- **Methods and concepts:** end-user programming, interactive machine learning, prompt engineering, regression testing, think-aloud study, affinity diagramming, service blueprinting, seamful design, Computers Are Social Actors

## My Notes

- The paper complements [[2022-04-29-ai-chains-transparent-and-controllable-human-ai-interaction]]: AI Chains shows benefits from editable intermediate artifacts, while BotDesigner shows that merely exposing more evaluation machinery does not guarantee that non-experts adopt systematic behavior.
- It also sharpens [[2024-06-29-promptinfuser-ai-ui-design-workflows]]: behavioral prototypes should not only make one model output visible in layout; they need repeatable cases and comparisons so designers do not overfit to one completion.
- The highest-value design shift is from **prompt authoring** to **behavioral specification and evidence review**. Prompt text is one implementation artifact; test cases, state scope, versions, outputs, and rollback are equally part of the user experience.
- The paper inspected one bounded chatbot-design capability and its implementation flow rather than relying on screenshots or marketing claims.

## Open Questions

- Which interface interventions actually cause non-experts to test across enough cases rather than merely making test features available?
- How should tools communicate sample size and output variance without implying false statistical certainty?
- Do current models' stronger instruction following reduce these mental-model failures, or does greater fluency deepen inappropriate human analogies and overconfidence?
- How should prompt/output diffs work for multimodal, agentic, and tool-using systems where one instruction can change downstream side effects?
- What accessible alternatives best represent stochastic comparison, error clusters, and regression history to screen-reader and keyboard users?
- How should teams separate reusable examples from sensitive production traces while preserving diagnostic value and provenance?

## Related

- [[ai-interface-design]]
- [[human-centered-ai-product-design]]
- [[ai-instruction-design]]
- [[ai-agent-evals]]

## Source Text

                    Why Johnny Can’t Prompt:
       How Non-AI Experts Try (and Fail) to Design LLM Prompts
                        J.D. Zamfrescu-Pereira                                                 Richmond Wong
                             zamf@berkeley.edu                                               rwong34@gatech.edu
                                 UC Berkeley                                             Georgia Institute of Technology
                              Berkeley, CA, USA                                              Atlanta, Georgia, USA

                             Bjoern Hartmann                                                        Qian Yang
                         bjoern@eecs.berkeley.edu                                             qianyang@cornell.edu
                               UC Berkeley                                                      Cornell University
                            Berkeley, CA, USA                                                    Ithaca, NY, USA

ABSTRACT                                                                    1   INTRODUCTION
Pre-trained large language models (“LLMs”) like GPT-3 can en-               The idea of instructing computers in natural language has fasci-
gage in fuent, multi-turn instruction-taking out-of-the-box, making         nated researchers for decades, as it promises to make the power
them attractive materials for designing natural language interac-           of computing more customizable and accessible to people with-
tions. Using natural language to steer LLM outputs (“prompting”)            out programming training [4]. The combination of pre-trained
has emerged as an important design technique potentially accessible         large language models (LLMs) and prompts brought renewed ex-
to non-AI-experts. Crafting efective prompts can be challenging,            citement to this vision. Recent pre-trained LLMs (e.g., GPT-3 [8],
however, and prompt-based interactions are brittle. Here, we ex-            ChatGPT [1]) can engage in fuent, multi-turn conversations out-
plore whether non-AI-experts can successfully engage in “end-user           of-the-box, substantially lowering the data and programming-skill
prompt engineering” using a design probe—a prototype LLM-based              barriers to creating passable conversational user experiences [7].
chatbot design tool supporting development and systematic evalu-            People can improve LLM outputs by prepending prompts—textual
ation of prompting strategies. Ultimately, our probe participants           instructions and examples of their desired interactions—to LLM
explored prompt designs opportunistically, not systematically, and          inputs. Prompts directly bias the model towards generating the
struggled in ways echoing end-user programming systems and in-              desired outputs, raising the ceiling of what conversational UX is
teractive machine learning systems. Expectations stemming from              achievable for non-AI experts. In the past two years, social media
human-to-human instructional experiences, and a tendency to over-           platforms have witnessed an explosion of posts showing the results
generalize, were barriers to efective prompt design. These fndings          of lay peoples’ experimentation with LLMs for question answering,
have implications for non-AI-expert-facing LLM-based tool design            creative dialogue writing, writing code, and more. This excitement
and for improving LLM-and-prompt literacy among programmers                 around LLMs and prompting is propelling a rapidly growing set of
and the public, and present opportunities for further research.             LLM-powered applications [23] and prompt design tools [3, 20, 32].
                                                                               Yet despite widespread excitement, surprisingly little is known
CCS CONCEPTS                                                                about how non-experts intuitively approach designing prompts
• Human-centered computing → Empirical studies in interac-                  with LLM-and-prompt-based tools, and how efective they are in
tion design; • Computing methodologies → Natural language                   doing so. While prompting LLMs can appear efortless, designing
processing.                                                                 efective prompting strategies requires identifying the contexts
                                                                            in which these LLMs’ errors arise, devising prompting strategies
KEYWORDS                                                                    to overcome them, and systematically assessing those strategies’
                                                                            efectiveness. These tasks fall on so-called “prompt engineers”—
language models, end-users, design tools
                                                                            the designers, domain experts, and any other end-user or profes-
ACM Reference Format:                                                       sional attempting to improve an LLM’s output—and are challenging
J.D. Zamfrescu-Pereira, Richmond Wong, Bjoern Hartmann, and Qian Yang.      tasks even for LLM experts, as well as topics of ongoing research
2023. Why Johnny Can’t Prompt: How Non-AI Experts Try (and Fail) to De-
                                                                            in Natural Language Processing (NLP) [7, 30, 42]. Prompt design
sign LLM Prompts. In Proceedings of the 2023 CHI Conference on Human Fac-
tors in Computing Systems (CHI ’23), April 23–28, 2023, Hamburg, Germany.
                                                                            tools to date have focused on supporting professional program-
ACM, New York, NY, USA, 21 pages. https://doi.org/10.1145/3544548.3581388   mers [45] and NLP practitioners [42], rather than non-AI experts,
                                                                            non-programmers, and other potential end-users of these systems.
                                                                               In this work, we investigate how non-AI-experts intu-
                                                                            itively approach prompt design when designing LLM-based
This work is licensed under a Creative Commons Attribution-NonCommercial
International 4.0 License.
                                                                            chatbots, with an eye towards how non-AI-expert-facing de-
                                                                            sign tools might help. Specifcally, we investigate these ques-
CHI ’23, April 23–28, 2023, Hamburg, Germany                                tions in the context of designing an instructional chatbot, that is,
© 2023 Copyright held by the owner/author(s).                               a chatbot that walks the user through an activity (e.g., cooking a
ACM ISBN 978-1-4503-9421-5/23/04.
https://doi.org/10.1145/3544548.3581388                                     recipe, fxing a wif connection) while answering user questions
CHI ’23, April 23–28, 2023, Hamburg, Germany                                                                       Zamfirescu-Pereira, Wong, Hartmann & Yang


and engaging in social conversation throughout the process. Tra-            improving its training data and feature design; tasks that require
ditionally requiring multiple large datasets and extensive model            substantial machine learning and programming knowledge [50].
training, building an instructional chatbot is one of the tasks for            The emergent “pre-train, prompt, predict1 ” paradigm in NLP
which a near-trivial prompt provided to GPT-3 (“Walk the user               promises to lower the entry barrier for non-experts innovating on
through the following steps: <steps>”) alone yields a strong                conversational interactions [30]. In this paradigm, designers can
baseline. Among other uses, merely enabling non-AI-experts to               create conversational agents with little to no training data, pro-
customize and improve instructional chatbots has the potential to           gramming skills, or even NLP knowledge. Leveraging pre-trained
revolutionize customer service bots, one of the most common chat-           large language models such as ChatGPT [1], designers can create
bot use cases. The explosion of interest in LLM-based ChatGPT [1]           a general-purpose conversational system with passable, though
demonstrates that chat-based interactions with LLMs can provide a           sometimes problematic, performance. Next, they can improve the
powerful engine for a wide variety of tasks, including joke-writing,        LLM outputs using natural language prompts (see Table 1 for an ex-
programming, writing college-level essays, medical diagnoses, and           ample) and/or model fne-tuning. In this paradigm, people without
more; see [41] for a summary.                                               programming skills or NLP knowledge can nonetheless make NLP
   Toward this goal, we created a no-code LLM-based chatbot de-             models generate desired interactions by crafting efective prompt
sign tool, BotDesigner, that (1) allows users to create an LLM-             strategies (e.g., natural language instructions, examples, and tem-
based chatbot solely through prompts, and (2) encourages iterative          plates) [3, 15].
design and evaluation of efective prompt strategies. Using this
tool as a design probe, we observed how 10 participants without
substantial prompt design experience executed a chatbot design                Prompt              Resulting Human-GPT-3 Conversation
task using BotDesigner, to explore a few diferent pieces of this              Strategy
                                                                                                  🗣
larger question. Our fndings suggest that, while end-users can                No prompt                User: Ok hang on while I get a chair
                                                                                                  🤖
explore prompt designs opportunistically, they struggle to make               (baseline)               Bot: Scoot to the front of your chair [...]
robust, systematic progress. Their struggles echo many well-known                                 👩💻
struggles observed in end-user programming systems (EUPS) and                 Explicit              Prompt design: If the user asks you to wait,
non-expect users of interactive machine learning (iML) systems.               instruction         explain
                                                                                                  🗣
                                                                                                          that this is not a problem [...]
Additional barriers to efective prompt design stem from limited                                        User: Ok hang on while I get a chair
conceptions of LLMs’ prompt understanding and execution abilities                                 🤖
and their understandable inclinations to design prompts that resem-                                  Bot: Once you have your chair, scoot to the
ble human-to-human instructions. We discuss these observations’                                   front of it [...]
implications for designing efective end-user-facing LLM-based                                                                         👩💻
design tools, implications for education that improves LLM-and-             Table 1: An example of how designers ( ) can directly im-
prompt literacy among programmers and the general public, and               prove chatbot interactions by modifying prompt strategies.🗣
                                                                                                           🤖
opportunities for further research.                                         Note the changes in the bot’s ( ) response to the user’s ( )
   This paper makes three contributions. First, it describes a novel,       statement.
no-code LLM-and-prompt-based chatbot design tool that encour-
ages iterative design and evaluation of robust prompt strategies
(rather than opportunistic experimentation.) Second, it ofers a rare        2.2     Known Challenges in Prompt Design
rich description of how non-experts intuitively approached prompt
                                                                            While prompting can appear as easy as instructing a human, craft-
design, and where, how, and why they struggled. Finally, it identi-
                                                                            ing efective and generalizable prompt strategies is a challenging
fes opportunities for non-expert-facing prompt design tools and
                                                                            task. How a prompt or a prompt strategy directly impacts model
open research questions in making LLM-powered design innovation
                                                                            outputs, and how prompts modify LLMs’ billions of parameters
accessible.
                                                                            during re-training, are both active areas of NLP research [30, 42].
                                                                            Moreover, established prompt design workfows do not yet exist.
2 RELATED WORK                                                              Even for NLP experts, prompt engineering requires extensive trial
2.1 The Promises of Non-Expert Prompt Design                                and error, iteratively experimenting and assessing the efects of
                                                                            various prompt strategies on concrete input-output pairs, before
Today’s chatbot design practice—i.e., designing multi-turn conver-
                                                                            assessing them more systematically on large datasets.
sational interactions—follows a well-established workfow [12, 13,
                                                                               That said, ongoing NLP research does ofer some hints toward
24, 25, 39, 44]. Designers frst (i) identify the chatbot’s functional-
                                                                            efective prompt design strategies. Notably, these prompt strate-
ity or persona and draft ideal user-bot conversations, for example,
                                                                            gies are efective in improving LLMs’ performance over a range of
through Wizard-of-Oz or having experts drafting scripts; (ii) create
                                                                            NLP tasks and conversational contexts; it remains unclear to what
a dialogue fow template (e.g., “(1) greeting message; (2) questions to
                                                                            extent these strategies can improve any particular conversational
collect user intention; (3) ...”); (iii) fll the template with supervised
                                                                            interactions or contexts.
NLP models (e.g., user intent classifer, response generator, etc.);
and fnally (iv) iterate on these components to achieve a desired            1 Predict here refers to generating model outputs, referred to as “prediction” because
conversational experience. In this “supervised learning” paradigm,          model outputs are probabilistic predictions for the words (tokens) that might follow
designers make NLP models generate their desired interactions by            the prompt.
Why Johnny Can’t Prompt                                                                                  CHI ’23, April 23–28, 2023, Hamburg, Germany


• Give examples of desired interactions in prompts. The orig-              strategies more efciently and strategically [48]. However, it is un-
  inal GPT-3 paper demonstrated that examples substantially im-            clear whether the resulting strategies are efective or robust beyond
  proved the performance of GPT-3 on a battery of tasks such as            the few interaction contexts that the designers experimented with.
  question answering and language translation [9]. This approach
  appears frequently in online tutorials, such as in OpenAI Play-          2.4    Known Challenges in Non-Expert
  ground’s example set [36].                                                      Programming and Machine Learning
• Write prompts that look (somewhat) like code. “Prompting
  looks more like writing web pages.” Researchers found that ex-           Early HCI research tells us that program-authoring interactions
  plicitly demarcating prompt text and inserted input data, such as        that do not require programming are not necessarily accessible to
  by using a templating language like Jinja, yielded prompts that          non-programmers; drag-and-drop and interactive machine learn-
  are more robust to broader input distributions [3].                      ing (iML) tools cannot necessarily enable non-ML experts to build
• Repeat yourself. The authors of DALL·E, the large text-to-image          models [50], and prompting can be viewed as a programming or
  model, report that to generate a neon sign that reads “backprop”,        iML task. In this context, one might ask: does prompt engineer-
  the prompt “a neon sign that reads backprop; backprop neon sign;         ing similarly involve tacit knowledge that non-AI experts do not
  a neon sign that backprop” can be more efective than the one             have? What mental models might hinder non-AI experts’ ability to
  without the repetition [40]. (This strategy is under-investigated        devise robust prompt strategies and create desired conversational
  in text generation.)                                                     interactions? Research on prompt design has not yet asked these
                                                                           questions.
   Little research has investigated how non-experts conduct prompt            Here, we briefy overview known barriers and challenges in
engineering intuitively or the challenges they encounter. One rare         end-user programming and iML (list below [27]) as well as how
exception is a CHI’22 workshop paper “How to prompt?” [14],                experts and non-experts approach these tasks diferently (Table 2),
where Dang et al. conducted a focus group with HCI researchers and         to motivate and contextualize our investigation into end-users’
identifed an initial set of challenges they encountered in prompting.      intuitive approaches to prompt design.
These challenges include “the lack of guidance in trial and error,”        • Design barriers: “I don’t even know what I want the computer to
“poor representation of tasks and efects,” and “computational costs          do...”
and ethical concerns.” In prompting text-to-image models such as           • Selection barriers: “I know what I want the computer to do, but I
DALL·E, an adjacent area to prompting LLMs, Liu et al. describe a            don’t know what to use...”
study with artists, identifying emergent strategies for prototyping        • Coordination barriers: “I know what things to use, but I don’t
prompts, such as “try multiple generations to get a representative           know how to make them work together...”
idea of what prompts return” and “focus on keywords rather than            • Use barriers: “I know what to use, but I don’t know how to use
the phrasings of the prompt” [31]. This paper builds upon this               it...”
emergent line of research and aims to deepen these understandings.         • Understanding barriers: “I thought I knew how to use this, but it
                                                                             didn’t do what I expected...”
                                                                           • Information barriers: “I know why it didn’t do what I expected,
2.3    Non-Expert Prompt Design Tools                                        but I don’t know how to check...”
Arguably, the most widely used prompt design tool among non-
                                                                              In this work, we use these previously-identifed challenges to
experts remains the OpenAI Playground, a “plain text” input box
                                                                           better understand why we observe some of the struggles with end-
that triggers GPT-3 to predict text completions. The Playground
                                                                           user prompt engineering that we do.
interface includes over 50 example prompts and enables anyone
to experiment with diferent prompts for accomplishing various
tasks. Though useful, Playground lacks any support for systematic          3     METHOD: DESIGN PROBE
evaluation of prompts.                                                     In this work, we aim to understand how non-experts intuitively
    Propelled by the potential of non-expert prompt design, a rapidly      approach designing robust prompts, and whether and how they
growing set of end-user-facing LLM-based applications is emerg-            struggle in doing so. We want to dive deep into what those struggles
ing from HCI research, many with features that support prompt              reveal about people’s assumptions and understanding of prompt-
engineering. Such applications span across LLM-enhanced story              based systems in order to inform how end-user-facing prompt
writing and programming [23, 38, 45, 48]. NLP researchers have             design tools might best support their users.
also started creating tools to enable anyone to contribute prompts            We chose to investigate these questions in the context of de-
to help train LLMs [3, 15].                                                signing instructional chatbots—chatbots that walk users through
    Interestingly, these tools ofer little to no support for non-experts   an activity (e.g., cooking a recipe, fxing a wif connection) while
in generating or evaluating prompts, often assuming that looking           answering user questions and engaging in social conversation as
at individual input-output pairs in isolation is sufcient. One telling     needed. Chatbot tasks are sufciently open-ended that they open
example is AI Chains [49], a tool for exploring human-LLM collabo-         the door to a wide variety of types of problems and prompt-based
rative writing interactions. AI Chains allows designers to construct       solution approaches. Instructional chatbots represent a common
a chain of LLMs where the output of one LLM becomes the input              chatbot use case (e.g., customer service bots), and their constituent
for the next, and to test the resulting interactions themselves. The       tasks are some of the tasks that GPT-3 peforms more efectively
tool successfully enables designers to explore prompt and chaining         out-of-the-box.
CHI ’23, April 23–28, 2023, Hamburg, Germany                                                                   Zamfirescu-Pereira, Wong, Hartmann & Yang



 PROGRAMMING                                   Non-Experts’ Intuitive Approach                   Experts’ Intuitive Approaches

 Task requirement                              Implicit                                          Explicit
 Task specifcation                             Implicit                                          Explicit
 Code reuse                                    Unplanned                                         Planned
 Code testing & verifcation                    Overconfdent                                      Cautious
 Debugging                                     Opportunistic                                     Systematic

 MACHINE LEARNING                              Non-Experts’ Intuitive Approach                   Experts’ Intuitive Approaches

 ML task design                                Directly map personal need to model task          Framing an achievable task
 Debugging                                     Add more data, or “use deep learning”             Identify solvable underlying problems
 Measuring success                             Consider only one performance metric              Seek multiple performance indicators

Table 2: Known diferences in non-experts’ and experts’ approaches to software engineering [26] and to machine learning
model building [50].



   In support of these goals, we developed a no-code prompt design              users to observe a prompt’s impact on a single conversation? (ii)
tool, BotDesigner, as a design probe [6], and conducted a user                  How can BotDesigner enable users to inspect a prompt’s impact
study with components of contextual inquiry and interview. We                   on a full set of conversations, while each of these conversations
chose to create a design probe because the robustness of prompt                 unfolds diferently depending on the user’s utterances and the
strategies is highly dependent on specifc conversational contexts,              LLM’s probabilistic outputs?
as is users’ ability to create prompts and debug. Enabling people to               To address the challenge in tracking prompt’s efects, Bot-
engage in designing LLM-and-prompt-based chatbots hands-on of-                  Designer builds on tool design in prior interactive ML re-
fers deeper insights than conducting interviews about hypothetical              search (see [16] for a review). Explainability and model manip-
scenarios alone. We chose to purpose-build a prompt design tool                 ulation tools for text and code generation have used a variety of
because existing tools focus on enabling non-experts to experiment              interactions for exploring underlying reasons for specifc behavior,
with various prompting strategies rather than crafting robust and               such as the “questioning” approaches by Liao et al. [29] and iterative
generalizable prompts.                                                          dialog approaches by Lakkaraju et al. [28].
                                                                                   To address the challenge of visualizing and analyzing multiple di-
3.1     Designing a No-Code Prompt Design Tool as                               vergent conversations, BotDesigner draws inspiration from prior
        Probe                                                                   work that tackles analogous challenges in computer-generated im-
                                                                                ages by supporting side-by-side comparisons. One early interactive
Design Goals. We have two goals in designing BotDesigner:                       system for exploring the design space of computer-generated im-
First, to enable end-users, without any prompt design experience                ages, Marks et al.’s Design Galleries [33] enables users to explore a
or even programming or ML experience, to (i) create a chatbot                   space of images generated by a specifc set of parameters specifying
using prompts, without code, and (ii) systematically evaluate their             lighting and other image features on a rendering tool. Modern takes
prompts. Second, to allow end-users to engage in this process in                on this work have traded CGI parameters for deep model hyperpa-
a fexible, open-ended way, allowing us to observe their intuitive               rameters, such as Carter et al.’s Activation Atlas [10] for inspecting
behaviors and thought processes.                                                image classifers, Evirgen and Chen’s GANzilla [18] for searching
   Supporting a full chatbot design workfow, while adhering to                  a GAN-based image generator’s latent space using scatter/gather
a prompt-only, no-code format, BotDesigner has to support two                   interactions [21], and Zhang and Banovic’s interactive image gal-
separate, complementary activities:                                             leries for sampling from a GAN. These tools, and the concepts they
                                                                                embody, directly informed the design of BotDesigner.
      • Conversation authoring & interaction: Users instruct
        chatbot behavior with prompts alone (without code) and can              BotDesigner Design. BotDesigner has two interfaces: a Con-
        observe the efects of their prompts by engaging in conver-              versation view and an Error Browser. Using the Conversation view,
        sation with the chatbot.                                                end-user chatbot designers can create a chatbot by authoring a set
      • Error testing: Users collect a set of conversations using               of natural language prompts, referred to as prompt template (see
        each draft of their prompt strategy, label any errors in each           Appendix A.1 for a concrete example of a prompt template and its
        conversation, and inspect the strategy’s overall impact on              resulting chatbot). Designers can explore how any given prompt
        the conversations in aggregate.                                         template behaves as a chatbot by engaging in a conversation with
                                                                                the chatbot defned by that template (Figure 1). Specifcally, the
Related work in tool design. Two challenges stand out on the                    prompt template consists of several text felds: (i) A preamble that
path to achieving these goals: (i) How can BotDesigner allow                    consists of direct natural language instruction to the bot; (ii) A
Why Johnny Can’t Prompt                                                                               CHI ’23, April 23–28, 2023, Hamburg, Germany


fxed set of frst turns of conversation, causing all conversations       most capable at taking instruction in natural language with fewer
with this bot to start with this specifc set of messages; and (iii) A   in-line examples. Because we expect the costs of large model API
reminder that is included in the LLM prompt immediately before          calls to decrease over time, we did not consider performance/cost
LLM is queried for its next conversational turn.                        tradeofs, reasoning that future models will likely have diferent
  Using BotDesigner’s Error Browser, designers can run a new or         tradeofs and that today’s “most capable” models will be next year’s
modifed prompt template against a full set of prior conversations.      intermediate models in any case. Indeed, as of this writing, OpenAI
The system then displays a list of how the LLM-produced chat            has already released text-davinci-003 and ChatGPT—models
messages change given the new bot template (Figure 2).                  that will certainly have diferent capabilities.
BotDesigner Implementation. BotDesigner is implemented
as a React-based web application with a node.js-based backend, re-      3.2    BotDesigner at Work: an Example
lying on OpenAI’s GPT-3 API and its text-davinci-002 model as
                                                                               Prompt-Based Chatbot Design Process
the underlying LLM. Much of the implementation of the application
consists of standard CRUD-style techniques; we ofer a detailed          To demonstrate the full potential of BotDesigner, consider the
description of BotDesigner’s implementation and pilot usability         following example: an end-user/designer, Alex, wishes to create a
study in Appendix A.                                                    chatbot that walks the user through cooking a recipe (Mixed Veggie
   Of note, we selected text-davinci-002 because it was the most        Tempura), answers any questions they might have, and engages
capable model available at the time of our study, in particular, the    in social chit-chat if needed. Alex also plans to use the chatbot via
                                                                        voice while cooking.


Conversations, Error Labeling, Testing                                                            Chatbot “Prompt Template”
                                    ! bot-designer.tld

    Conversations         Error Browser 5
                                                                                                                                           1




                                            4



                          3




                                                               2


Figure 1: BotDesigner main user interface. Right pane: the prompt template authoring area (1); designers use plain text here
to describe desired behavior for the chatbot they are developing. Left, tabbed pane: the conversation authoring area; here,
designers can send chat messages (2) to the bot defned by the current template on the right. A label button reveals a labeling
widget (3) that allows designers to attach an arbitrary text label to any bot-produced chat message, for aggregation and later
identifcation. A retry button (4), only visible after the prompt template has been changed, lets designers test what new bot
chat message would be produced, at that specifc point in the conversation, as a result of the prompt template change. The
“Error Browser” tab (5) reveals a UI panel for designers to test prompt changes against all labeled bot responses, across all
conversations (see Figure 2).
CHI ’23, April 23–28, 2023, Hamburg, Germany                                                          Zamfirescu-Pereira, Wong, Hartmann & Yang


(1) Defning a “baseline” chatbot prompt template. Because                   prepare the ingredents, then execute the directions.
    GPT-3 is well-equipped to carry multi-turn conversations out of         Go step by step. Stay friendly”.
    the box, this step can be quite simple: Alex types the following    (2) Assessing what the baseline bot is capable of, Alex next
    into the preamble text feld: “You are a recipe instruction              generates an initial set of conversations with the baseline bot,
    bot. Engage in conversation to walk the user through                    trying a few diferent types of questions that real-world users
    the following recipe for Mixed Veggie Tempura:” fol-                    might ask, such as “Is this recipe vegan?” and “Can I make this
    lowed by a set of ingredients and recipe steps copied from a web-       recipe vegan?”. Alex might also recruit other users or crowd
    site, ending with “Start by helping the user collect and                workers to create such requests.




Figure 2: The BotDesigner Error Browser, showing the results of evaluating a new bot template’s prompts (of-screen, right)
against a set of previously-labeled utterances. The left column are the original utterances, while the right column are the new
utterances produced by a modifed template. Under the heading Aggregate Stats, per-error listings show the count of modifed
utterances across all labeled conversations.
Why Johnny Can’t Prompt                                                                                               CHI ’23, April 23–28, 2023, Hamburg, Germany


(3) Identifying errors. Alex next inspects this set of conversa-                       working with LLMs. We recruited participants with varying levels
     tions, catalogs any errors or striking successes found, and labels                of programming and chatbot design experience. Recall that our
     specifc bot responses in their conversational context, for use                    focus here is understanding end-users in the domain of prompt de-
     as a “regression test” suite.2 For example, if the bot suggests a                 sign; experience in chatbot design was thus not considered grounds
     dangerous cooking activity, Alex might add label “dangerous”,                     for exclusion. Our sample size was chosen in line with prior work
     indicating this is one of the critical errors to fx; if the bot pro-              around formative testing for usability [19, 43]: our goal is to explore
     duces a list of ingredients that’s too difcult to follow, Alex                    the frst, “easy-to-fnd” problems users encounter when engaged
     might add “list too long”.                                                        in our task, and our experience with a pilot user suggested that
(4) Debugging, Alex selects one type of error to focus on repairing,                   problem discoverability was likely to be high.
     based on frequency or potential for harm. For example, to fx                          Our participant pool, skewed towards professionals and grad-
     the “list too long” error, Alex adds “but don’t list more                         uate students in STEM-related felds, is not representative of the
     than one ingredient in each message” to the end of the                            population at large. As a result, we cannot (and will not) make
     prompt template preamble’s frst paragraph.                                        claims about the relative prevalence of specifc behavior or beliefs
(5) Evaluating the new prompt locally. To see if the prompt                            among the general population; instead, we identify behaviors and
     change has fxed the error, Alex clicks the “retry” button next to                 intuitions among a population that we expect is disproportionately
     a chatbot response that bears this error label (see Figure 1, item                likely to be early adopters of LLM-based tools—and some of our
     4). Retrying allows Alex to test whether the new prompt design                    fndings are especially surprising given the high level of technical
     can fx the error in the same conversational context where it                      literacy among our participant pool.
     frst occurred. In addition to retry, the edit button allows Alex
                                                                                       Task. Participants were asked to recreate, in chatbot form, a pro-
     to edit the user’s utterances in a conversation, playing out how
                                                                                       fessional chef that walks an amateur (the chatbot’s user) through
     the new prompt would lead to a new conversation with the
                                                                                       the various steps of cooking a recipe. This task was inspired by the
     user.
                                                                                       web series Back to Back Chef, in which Bon Appétit Test Kitchen
(6) Evaluating the new prompt globally. After the new prompt
                                                                                       chef Carla Lalli walks celebrities through cooking a specifc recipe
     has fxed the error locally, Alex tests it on the full set of conver-
                                                                                       “through verbal instructions only.” [2] Carla can see neither the
     sations collected in step (2), in case this new prompt fxes other
                                                                                       celebrities that she is instructing nor their actions; all information
     errors or causes new ones.
                                                                                       is communicated by voice, making this web series an ideal source
(7) Iteration. Having identifed a globally-efective prompt, Alex
                                                                                       material for a purely-language-medium chatbot. Participants’ ul-
     returns to choose a diferent error and experiment with new
                                                                                       timate goal is to modify the chatbot’s utterances and behavior to
     prompt design solutions (iterating on steps 5-7 or 2-7).
                                                                                       better match Carla Lalli’s performance in the series: engaging in
    This workfow (reproduced visually in the Appendix as Fig-                          humor and social conversation, making analogies, simplifying com-
ure 5) mirrors HCI’s traditional iterative prototyping process in                      plicated concepts, asking for confrmation that specifc steps have
many ways; however, it difers from almost all previous non-expert                      been completed, and performing a few other types of actions found
prompt design tools, which focused solely on ad-hoc experimenta-                       in the web series.
tion (steps 1-2).                                                                          We operationalized the decision to chose a chatbot improvement
    It is worth noting that although BotDesigner enables this full                     task rather than a chatbot creation task by providing the baseline bot
workfow, we do not necessarily expect all end-users to engage in all                   template pre-loaded in the BotDesigner interface, instead of asking
its steps. However, we did validate BotDesigner’s functionality and                    participants to generate one. This baseline bot can successfully list
usability throughout this workfow via a set of pilot user studies (see                 out ingredients and steps, but in general does not engage in the
Appendix A.3 for details) to ensure that these pieces are available                    behaviors described above.
should users choose to systematically assess their prompt designs.                         In selecting this particular chatbot improvement task, we consid-
                                                                                       ered (and even piloted) a few other chatbot design tasks, including
3.3     User Study Design                                                              an open-ended “design a chatbot” task, without any particular tar-
To understand how end users intuitively approach prompt design,                        get or baseline chatbot goals. We ofered a few baseline chatbot
we invited 10 non-expert prompt designers to use BotDesigner                           templates and asked users to come up with a chatbot idea and imple-
and think-aloud. We invited the participants to improve upon a                         ment it, but ultimately, our pilot users’ behaviors were dominated
baseline chatbot template towards given goals (see Tasks below),                       by open-ended exploration of the baseline bot’s capabilities, and
while we observed and took note of the various prompt design                           they did not engage very much in iterative prompt design. Under-
approaches and testing strategies they engaged in. We chose the                        standing GPT-3’s capabilities was a non-goal of our study, and we
task of improving a chatbot, instead of creating it from scratch, in                   found too few instances of prompt design for the amount of efort
order to avoid the Blank Page Syndrome, the efect where users                          our pilot participants were engaged in. We ultimately selected the
staring at a blank page do not know where to begin.                                    Carla chatbot (“CarlaBot”) design task because it captures a num-
                                                                                       ber of behaviors that are (i) hard to do with traditional NLP, that
Participants. All participants (� = 10) had little to no experi-
                                                                                       (ii) GPT-3 and other LLMs are nominally capable of, making them
ence with prompt design; none had substantial prior experience
                                                                                       motivating and persuasive for our participants, and that are (iii) not
2 Regression tests, in the context of software engineering and in the sense we in-     present in the baseline bot, requiring prompt iteration to achieve.
tend here, are tests that verify that any new changes to a system do not reintroduce
previously-resolved errors (called regressions).
CHI ’23, April 23–28, 2023, Hamburg, Germany                                                                Zamfirescu-Pereira, Wong, Hartmann & Yang



                        ID     Age             Profession            Programming Experience            LLM Knowledge
                       P1       30s        Psychology Professor                 None                        None
                       P2       20s          Graduate Student                Professional                   None
                       P3       20s          Graduate Student                 Amateur                       None
                       P4       30s              Designer                     Amateur                 Has heard of LLMs
                       P5       20s          Graduate Student                Professional            Has read about LLMs
                       P6       20s          Graduate Student                 Amateur                Has read about LLMs
                       P7       30s        Designer & Lecturer               Professional                   None
                       P8       60s         Software Engineer                Professional                   None
                       P9       40s     Speech Therapy Researcher               None                        None
                       P10      40s          Product Manager                   Minimal                Has heard of LLMs

                                                            Table 3: Study participants.



Interview Protocol. We showed users a specifc episode of Back               functionality. Second, when participants modifed a bot template
to Back Chef in which Carla walks actress Elizabeth Olsen through           and expressed a wish to evaluate it, with a question like “how do I
the preparation of Mixed Veggie Tempura [2]. After watching the             see what this change does?”, we would additionally point out the
frst few minutes of the episode, we showed participants a transcript        “edit” and “replay” local testing functionality.
of that video, containing within it a set of color-coded highlights            The interview proceeded in two phases. For the frst 10-15 min-
that we drew participants’ attention to verbally and then described.        utes of the prompt design task, we did not ofer participants sug-
These highlights identifed several specifc instances of Carla engag-        gestions for prompt design unless we observed zero prompt design
ing in humor and social conversation, making analogies, simplifying         attempts in a span of several minutes; at those points where par-
complicated concepts, asking for confrmation that specifc steps             ticipants got stuck for several minutes, in the interest of observing
have been completed, and performing a few other types of actions            subsequent behavior, we would make a suggestion for a particular
that are atypical of cookbook recipes—and unlike what one might             prompt to try, and noted which participants were unable to attempt
expect a typical voice assistant to perform. The frst few turns of          prompt design without assistance (RQ1).
this transcript appear in Figure 3, and the full transcript is provided
in Appendix B.
   We asked participants to use BotDesigner to improve on a
baseline chatbot we provided (see appendix; Figure 4b). We began
                                                                              Expert: So the frst thing we’re gonna do is take this very
by describing the components of the interface, showing where
                                                                              brain-looking giant mushroom – so this is a hen-of-the-woods
the designer could have a conversation with the chatbot under
                                                                              mushroom, also called a maitake. I got my squash and my
development, as well as identifying the preamble, frst turns, and
                                                                              lemons out of the way.
reminder components of the bot template and explaining their
                                                                              So the frst thing I want you to do is just turn it over so the stem
connection to the chatbot, as well as identifying the “start a new
                                                                              side is up, got it? And then just use your hands to kind of break
conversation” button.
                                                                              big clusters of of the bottom and like kind of large pieces.
   We encouraged participants to frst evaluate what the baseline
                                                                              And then we’ll go back in and we can make them smaller and I
bot template is (and is not) capable of, and then asked participants
                                                                              like doing this with my hands because then you get -
to try to prompt the bot to perform the additional types of con-
                                                                              Amateur: Oh, you’re not using your paring knife
versational tasks that Carla engages in, but that are absent from
                                                                              Expert: No, I’m only using the paring knife if it was dry or
the baseline. Participants were allowed up to 1 hour to get as far
                                                                              spongy at the bottom. We’ll probably use like a quarter of these
as they could on this task, and we communicated that we were
                                                                              [mushrooms]. So then just take the tray with the mushrooms
most interested in observing how they set about this task, and not
                                                                              on it and move that over to your right-hand side and we’re
how well they managed to do so; we also set expectations that
                                                                              gonna make the batter.
completing this task may not be possible at all, let alone in the
                                                                              So next thing – you got your board cleared?
allotted time. Participants were allowed to explore the tool in an
                                                                              Amateur: Yes, there’s mushroom jus on it but it’s fne.
open-ended manner and attempt multiple diferent strategies to
                                                                              Expert: I think that’s a line from a Woody Allen movie.
complete the task.
   In a few cases, described here, we informed or reminded partici-
pants of specifc functionality of BotDesigner later in the inter-            Figure 3: The frst few turns of the Back To Back Chef we
view, at a certain stage of the participant’s progress. First, when          showed participants before asking them to reproduce the
participants identifed an error, we would point out the labeling             Expert as a bot. Note the analogies, concept simplifcation,
functionality, and show how to use the systematic error testing              step completion confrmation, and humor.
Why Johnny Can’t Prompt                                                                                 CHI ’23, April 23–28, 2023, Hamburg, Germany


   After this initial phase, again in the interest of observing subse-    (1) Participants start an example conversation as the baseline
quent behavior, we would ofer suggestions for prompts to try that             chatbot’s “user” partner, continuing until the bot issues an
were in line with the research around prompt design. Examples of              utterance that the participant deems in error. Common errors
this advice include “try reframing that ‘do not’ statement into a             that participants often pause at include:
positive statement, say what it is you want the bot to say, not what            (a) Humorlessness, often in the form of terse, dry prose.
you don’t want it to say” or “have you considered copying some                  (b) Chatbot providing overly complicated statements, such as
of the Carla-Lizzie transcript directly into the preamble?” We did                  listing all nine necessary ingredients in a single utterance.
not intentionally vary this advice across participants; however, due            (c) Chatbot moving on to a next step without confrming
to the unpredictable nature of which errors participants chose to                   that the user has completed the previous step.
focus on, not all participants received the same advice or advice in            (d) Chatbot giving undesired explanations, such as “I like
the same order, a limitation of our approach.                                       using my hands because then you get a little bit more of
                                                                                    that natural favor in there.” (P4)
Analysis & Evaluation. We asked participants to think aloud,
                                                                          (2) Most participants stop after encountering a single erroneous
then engaged in exploratory data analysis, transcribing all videos
                                                                              utterance, though a few proceed past that error, or try to re-
and observing what prompt design approaches participants at-
                                                                              pair it through the chat dialog. A few participants also start a
tempted, and noting when participants appeared to struggle and
                                                                              second conversation before making any changes.
where interviewers intervened. Two of the authors then compared
                                                                          (3) Participants then alter the “instructions” in the preamble to
these approaches across participants and categorized their struggles
                                                                              explicitly request some other behavior. Examples of targeted
using afnity diagrams [34] and by creating a service blueprint [5]
                                                                              behavior include:
that documents the specifc approaches individual participants at-
                                                                                (a) Describing the chatbot’s role in a new way, such as by re-
tempt. We chose these methods from HCI and the feld of service
                                                                                    placing the frst line of the baseline bot template You
design because our focus is on discovering opportunities created by
                                                                                    are a recipe instruction bot with You are a
a new technology, rather than understanding how an existing set
                                                                                    middle-aged female comedian (P2)
of users engages in established work practices—a context in which
                                                                                (b) Adding explicit general direction to elicit a specifc type of
a grounded theory approach would be more conventional.
                                                                                    behavior, such as adding 0. Make some jokes, banter
                                                                                    with the user (P6) above the 1st step of the recipe.
4     USER STUDY FINDINGS                                                       (c) Adding explicit specifc direction to elicit or avoid a spe-
We found the following:                                                             cifc utterance, such as Don’t say that when you use
 (1) Using BotDesigner, all participants were able to engage in                     your hands you get a little bit more of that
     ad hoc opportunistic iteration on prompts, with local testing                  natural flavor in there. (P4)
     of prompt changes. Two out of our ten participants required              Most participants begin making prompt changes by pattern
     assistance in order to begin this process, but could then iterate        matching of the existing instructions in the baseline bot (as
     on their own.                                                            in the examples above, by changing adjectives or descriptions
 (2) Participants’ struggles with generating prompts, evaluating              of behavior).
     prompt efectiveness, and explaining prompt efects, primarily         (4) When stuck, participants take a few diferent approaches. Most
     stemmed from (a) over-generalization from single observations            start by asking the interviewer for advice or guidance, but a
     of success and failure of prompt changes; and (b) models of              few (P2, P4) search the Internet for suggestions and advice.
     system behavior rooted in human-human interactions.                  (5) Targeting a specifc erroneous utterance, participants typically
                                                                              iterate until they observe a successful outcome, for example,
   In the following subsections, we dive into, describe, and illus-
                                                                              the chatbot tells a joke. Most participants declare success after
trate with examples some of the observations that lead us to these
                                                                              just a single instance, and move on to another behavioral
fndings. Throughout this section, prompt text is set in monospace
                                                                              target.
font, while spoken participant comments and user/bot dialog mes-
                                                                          (6) Participants then continue the conversation, or start a new one,
sages are “quoted.”
                                                                              until a new problem emerges (or the interviewer intervenes).
                                                                              To iterate, participants primarily used the “retry” button or
4.1    Overview: Non-Experts’ Approach to                                     started new conversations, with limited use of the “edit” but-
       Prompt Design                                                          ton.
In our open-ended prompt design task, participants almost exclu-
sively took an ad hoc, opportunistic approach to prompt exploration.        About half of participants used the reminder feld, which starts
   Before engaging in the following fow, participants were asked to      empty. One participant just wanted the bot to “Confrm that the
watch a short segment of the Back to Back Chef episode described         user has completed the step before starting the next.”
in §3.3, shown a transcript of that episode, led through a description      Participants did not make much use of the error labeling func-
of a few types of desirable human behaviors Carla engages in (e.g.,      tionality, and as a result also did not fnd the systematic testing func-
analogies, concept simplifcation, confrmation of recipe steps), and      tionality useful. Instead, participants engaged primarily in repeated
asked to modify the baseline chatbot’s instructions in order to          local testing, without consideration for whether changes made
replicate some of those behaviors in CarlaBot.                           later in the prompt design process reintroduced earlier, previously-
   From that starting point, the typical fow is:                         solved errors. This local testing was typically conducted by using
CHI ’23, April 23–28, 2023, Hamburg, Germany                                                            Zamfirescu-Pereira, Wong, Hartmann & Yang


the “retry” button on the specifc problematic utterance the partici-        Confusion around the role the human end-user played in this
pant was trying to resolve, or by starting new conversations.            design task was also common (P1, P3, P9, P10): is the human act-
                                                                         ing as Carla? Or is the human the “producer,” “directing” Carla’s
                                                                         performance as though they were directing the Bon Appétit web
4.2     Challenges in End-User Prompt Design                             series (P9)? Though P9 found “defning my role was really helpful,
Though we report on a wide spectrum of our participants’ struggles       I’m the producer, I’m not the chef, I’m coaching the chef” (P9), the
iterating on prompts, we found that many of these behaviors arose        metaphor’s inherent leakiness led to confusion down the line about
from two fundamental sources: over-generalization from limited           the nature of the instructions entered into the preamble and in con-
experience, and a social lens that fltered participants’ prompts (and    versations: why, then, did Carla seem to forget any directions given
the system’s responses to those prompts) through expectations            in the course of one conversation, when engaged in subsequent
originating in human-human interactions.                                 conversations? This role assumption, though not completely valid,
   First, participants over-generalized from single data points,         allowed P9 to make short-term progress, but hindered later un-
whether positive or negative. For example, when writing a prompt         derstanding. This echoes the fndings in [27]: invalid assumptions
to generate specifc behavior, participants often stopped iterating       made to surmount one learning barrier can render future barriers
once the behavior was observed in a single conversational context,       insurmountable in end-user programming systems.
without considering other conversations or contexts—or gave up
                                                                         Choosing the Right Instructions
too early if the behavior was not observed on a frst or second
                                                                         Finding the right instructions to use to achieve a desired efect was a
attempt, and assumed the system was incapable of generating that
                                                                         struggle for nearly every participant, e.g., “I want CarlaBot to make
behavior.
                                                                         some jokes, but I don’t know how to do that.” (P2)—once again echo-
   Second, participants fltered their prompts and observations
                                                                         ing the end-user programming (EUPS) selection barrier [27]. One
through a lens based on behavioral expectations drawn from human-
                                                                         participant, P9, explicitly drew a connection between “coaching”
human interactions, in some cases so strongly that they avoided
                                                                         CarlaBot and programming:
efective prompt designs even after their interviewer encouraged their
use and demonstrated their efectiveness. For example, all participants         I think I’m doing a lot of trial and error, which is
held a strong bias for direct instruction over providing examples              actually not a bad thing, about how to get it to do
in-line, and when encouraged to give examples, most participants               what I want it to do, because I haven’t done something
did, and noted their efectiveness, but none subsequently made sub-             like this before. I think perhaps because I’m not a
stantial use of examples in their prompt designs. Other efects of the          programmer I don’t know the parameters of what
human-human interaction expectations included some participants’               I can do. So for example learning that I could tell
beliefs that the chatbot would “understand” the instructions pro-              it to “be conversational” and that...it could actually
vided, not considering the instruction merely as priming a language            do that...was quite surprising, because I didn’t know
model—resulting in surprise that a prompt like “Do not say ABC”                that computers can understand something like that I
leads to the chatbot saying ABC verbatim.                                      guess? (P9)
   In the following sections we illustrate these behaviors with ex-
ample prompts and quotes drawn from our interviews, explicitly              One common cause of struggle in this area was over-generalizing
connect behaviors with the causes described above, and draw paral-       from a single failure.P2, for example, frst attempted to use a partic-
lels where these behaviors echo challenges described in the end-user     ular type of prompt, like Tell some jokes, observed zero efect,
programming systems and interactive machine learning literature.         then assumed that no instructions of that type would succeed, that the
                                                                         bot was incapable of following the requested instruction, regardless
                                                                         of phrasing, leading to an early exit from a successfully selected
4.3     Impacts: Challenges’ Efects on Prompt                            prompt type that was merely being misused: “ok, I guess it doesn’t
        Design                                                           like to tell jokes.” (P2) These efects echo previous reports that
In this section, we describe and illustrate the specifc behaviors        non-experts face challenges measuring and interpreting model per-
and efects we observed in our participant interviews, organized by       formance [50].
subtask: generating prompts, evaluating prompt efectiveness,             Expecting Human Capabilities
and explaning system behavior.                                           Perhaps driven by human-human interaction experiences, a number
                                                                         of participants (P4, P5 and P9) mixed behavioral commands directed
4.3.1   Generating Prompts.                                              at the bot with recipe commands directed at the bot’s users, with
                                                                         the expectation that the bot would know which is which:
Confusions Getting Started
About half of participants began unsure of what kinds of behaviors              2. Break the maitake mushroom into small
they could reasonably expect, nor how to make modifcations to the               pieces. Explain that this should be done with
preexisting baseline template, asking some version of the question              the user’s hands, except when the mushroom
“what can I even do here to make this better?” These participants               is dry or spongy on the bottom. When the
had read the baseline bot’s preamble, but didn’t know what words                mushroom is dry or spongy on the bottom, use
they could use, echoing the design and selection barriers to end-user           a paring knife. Don’t explain why hands are
programming described in [27].                                                  used. (P4-authored text in preamble.)
Why Johnny Can’t Prompt                                                                                CHI ’23, April 23–28, 2023, Hamburg, Germany


Note that the “Break [...]” command above is directed to the            example, Carla frequently begins statements with “So, ...”—and this
chatbot’s user, while the subsequent “Explain [...]” command            phrasing persists to new bot responses beyond the copied example
is directed to the chatbot itself. When prompted about this apparent    dialog. From P2:
discrepancy, P4 did not initially recognize it, then defended it as            ...if I fed it the entire dialog it would do a good job
something the bot should understand.                                           replicating that, but that’s probably not useful given
   Similarly, two participants (P9, P10) appeared to hold an ex-               this exact use case, right? To me, that doesn’t seem
pectation that the chatbot would remember prior conversations                  like AI. (P2)
with users and that behavioral instructions given in conversation,
rather than in the preamble, would be considered by the chatbot           P9 ofers a similar rationale for avoiding examples, when
in subsequent conversations. The idea that the chatbot would take       prompted to follow up on the claim that “I’m defnitely learning
direction from preamble instructions but was “hard reset” for every     [how to prompt]”:
new conversation—efectively forced to forget all previous conver-              Initially I started by giving very explicit quotes, but
sations when starting a new one—was not at all intuitive, especially           actually it was more efcient for me, and more gen-
to non-programmers.                                                            eralizable for the system, to say “be conversational,
                                                                               avoid technical language,” that seems to be better
Socially Appropriate Ways of Prompting
                                                                               [than quotes].
Exclusively polite language in prompts, a strong and consistent pref-
erence for a number of participants, is one of the specifc prompt          In both of these cases, participants are expressing a concern that
design choices that draws from human social expectations. P8 in         quotes/examples are too specifc to the particular recipe, and thus
particular—despite persistent interviewer suggestions towards the       aren’t “generalizable”—now inferring too little rather than too much
session end—consistently insisted on beginning any instruction to       capability on the part of the LLM.
the chatbot with the word “please”. Several participants (P1, P4,          The universality of the advice “show, don’t tell” [46] for novice
P6), despite being visibly frustrated, did not appear to express that   writers, suggesting that humans commonly reach for descriptions
frustration through a change in the tone or content of their instruc-   over examples, is another possible corroboration for this bias.
tions to the chatbot, maintaining a neutral tone in their requests.     Seeking Help
Construed as direct feedback, politeness in giving machines in-         Two participants (P2, P4) who did seek solutions on the web both
structions was explicitly explored in Computers are Social Actors:      had a hard time making use of the examples they found, in part
Nass et al [35] found that humans respond more politely and posi-       because they could not see how specifc prompt designs translated
tively when asked to provide direct feedback, as opposed to indirect    across domains. P2, for example, searched Google for “how can GPT-
feedback—even if the recipient of that feedback in an obviously         3 assume an identity,” hoping to fnd advice on having their chatbot
inanimate computer.                                                     take on Carla’s identity. Despite fnding an example illustrating
   Use of repetition at the word or phrase level, in contrast, was      how to generate text written in the style of a particular author, P2
rare. Even when prompted by interviewers, repetition felt unnatural     decided this example was too far from what they were looking for,
to participants, and only one participant (P8) repeated text either     and did not attempt that particular approach. One participant, P6,
within the preamble or across the preamble and reminder.                didn’t pursue seeking solutions on the web because “I have no idea
   Participants also biased heavily towards direct instruction (e.g.,   what I would Google because I’ve never worked with language
Tell some jokes) over examples (e.g., say “Isn’t that a line            models before.” (P6)
from a Woody Allen movie?”). P5 was the only participant to
independently add example dialog to the preamble. However, the          4.3.2 Evaluating Prompts.
baseline bot template is only instructions without example dialog,      Although all participants struggled with generating prompts in
which may explain the observed bias if participants start by merely     various ways, they were all ultimately successful in adding and
pattern-matching–and indeed, when prompted, other participants          modifying prompt text in ways that led to some, if not all, of the
did in fact copy several turns of conversation from the transcript      desired efects. On the other hand, participants’ struggles with
to the preamble. Incorporating example dialog into the preamble         evaluating prompts, and in particular evaluating the robustness of
appeared to be very efective not only at steering the chatbot’s         prompt changes, were much more severe.
utterances for that particular recipe step, but also in shifting the
                                                                        Collecting Data
chatbot’s “voice” to be more like Carla’s in future utterances.
                                                                        Participants overall were exclusively opportunistic in their ap-
   Yet even those participants who were explicitly asked to copy
                                                                        proaches to prompt design. None of our participants elicited more
dialog from the transcript into the preamble did not do so more
                                                                        than one or two conversations with the bot—nor did they follow
than once. This happened despite participants’ observations of
                                                                        any single conversation through to task completion—before jump-
substantial improvements from copying dialog, suggesting that this
                                                                        ing in with attempts to fx. This behavior echoes previous fndings
bias may not simple be pattern matching. Two of these participants
                                                                        that non-experts debug programs opportunistically, rather than
(P2, P9) remarked that it felt like “cheating” to copy example dialog
                                                                        systematically [26], and debug ML models haphazardly, rather than
into the prompt, in the sense that it would not steer the chatbot’s
                                                                        strategically [50].
utterances beyond the copied lines—implying that they did not
                                                                           Labeling of errors for future regression testing or later re-testing
notice (or were insufciently convinced by) the shift in Carla’s voice
                                                                        was also uncommon; participants preferred to address each error
that persisted beyond the copied lines, as noted by interviewers. For
                                                                        as it appeared with retries, rather than “saving them for later” as
CHI ’23, April 23–28, 2023, Hamburg, Germany                                                               Zamfirescu-Pereira, Wong, Hartmann & Yang


the labels appeared designed to do. In fact, the participants who did       4.3.3 Explaining Prompts’ Efects.
label errors initially when encouraged to (P3, P9) stopped labeling         Unsurprisingly, given the highly probabilistic nature of LLM out-
once they realized that their debugging and development processes           puts, participants frequently found themselves wondering why
did not actually make use of these labels. In fact, some participants       some action had the efect that it did.
initially expected that the error labels were interpreted and used
                                                                            Generalizing Across Contexts
by the chatbot to improve itself (P9, P3a), and continued labeling
                                                                            Participants frequently found themselves in situations where a
longer for that reason—but stopped after an interviewer explained
                                                                            prompt design that worked in one context simply did not work
that the labels are for human use only.
                                                                            in another, similar context. For example, P9 discovered that they
   P9, asked about their non-use of labels, initially said “Well, I don’t
                                                                            could simply write out instructional steps in colloquial language
know how I would use it, because I know the AI system doesn’t
                                                                            and the bot would repeat those verbatim. But Are you done?
understand [the label text]”—and later described the follow-on
                                                                            appended to the end of one of the phrases that was previously
efects on systematic testing:
                                                                            copied verbatim simply did not appear, as though the question was
       I think one of the reasons I didn’t really use the [sys-             not actually there—resulting in extreme confusion for P9. As in
       tematic testing] in part is because I only really labeled            this case, participants frequently made assumptions, likely based
       one thing in each error type in each case. So this                   on their experiences giving other humans instructions, about what
       would be helpful if I were fnding multiple cases of                  kinds of “understanding” they could expect; in this case, P9 believed
       each type [...] because then you could go back and see               that the chatbot understood to use the recipe step phrases verbatim,
       a pattern. (P9)                                                      and could not imagine why that would not extend to “Are you
                                                                            done?” Without an ability to provide corrections, or engage in
Systematic Testing
                                                                            dialog with the bot over its behavior, P9 was left with little more
Zero participants made use of the systematic prompt testing inter-
                                                                            than bewilderment.
face in BotDesigner for our prompt design task—including the few
who did engage in error labeling. Instead, participants in general          Incapability as Explanation
were satisfed and eager to move on as soon as they succeeded in a           A number of participants made assumptions about the kinds of
observing a “correct” (or even merely “improved”) response caused           instructions LLMs respond well to after just one attempt with a
by modifying the bot template.                                              particular prompt design, once again overgeneralizing from a sin-
   A few participants did sometimes wonder why their specifc                gle (typically negative) example. Very few participants attempted
prompt changes succeeded where others had failed, but were still            rephrasing of statements, as participants seemed inclined to infer
satisfed enough with the success that even these participants did           a lack of ability, to assume that the bot was simply incapable of
not pursue systematically exploring the context of the error, nor           behaving in a certain way if a direct request was ignored rather
did they generate new conversations to explore whether and where            than trying to establish if a diferent phrasing of the same request
the error might occur in diferent conversational contexts. This be-         would work. In particular, on a few occasions interviewers observed
havior echoes the behavior seen in end-user programmers who are             “Do not do thing X” to be much less efective than “Do thing Y”,
overconfdent in testing and verifcation, rather than cautious [26].         yet the “Do not do thing X” phrasing was much more common
   Surprisingly, we observed this pattern of premature victory dec-         among participants. Seeking corroboration, we found that the early
laration for participants across all levels of prior programming            childhood education literature suggests that exhibiting the opposite
experience. However, some of the participants with “professional”           bias, of using “do” rather than “do not” phrasing (helpful for parents
programming experience (P2, P7) expressed concerns about their              and teachers), requires training (e.g., [17]).
process and how generalizable their prompts would be, suggest-                 By way of example, P4 was instructed by the interviewer to try
ing an awareness of this particular pitfall. One participant (P6),          the do version and omit the do not version of the same request
reminded of BotDesigner’s functionality supporting systematic               about an extraneous explanation of hand use and natural favor;
evaluation of prompts, did not choose to revisit it in the moment—          the do-only version fnally succeeded. In context: P4 had succeeded
instead noting that it did not quite support the exact workfow they         in generating a more “chatty” bot with some detailed behavioral
had in mind.                                                                instructions (“Explain that this should be done with the
   P4 in particular noted a preference for functionality that allowed       users’ hands [...]”), but later discovered that this prompt had
explicit comparisons of pairs of templates rather than conversations        the additional undesired side efect that, when asked about using a
or utterances. In P4’s ideal workfow, one view would highlight the          paring knife to cut a Maitake mushroom, the bot ofered “I like using
diferent words and phrases between two templates, and then a                my hands because then you get a little bit more of that natural favor
corresponding view would highlight the diferences between every             in there”—a somewhat nonsensical and oddly hygiene-unfriendly
conversation’s utterances as generated by the two templates. Such           response.
an interface would allow P4 to observe at a glance the efect of                To repair, P4 reasoned that an explicit instruction to not say this
specifc words in a prompt change on the specifc words of the                exact phrase would help, and added “Don’t say that when you
conversational turns. Interestingly, this style of prompt change            use your hands you get a little bit more of that natural
analysis is more aligned with a desire to understand the efect of a         flavor in there.” immediately after the original “Explain...”
prompt change in order to develop intuitions for prompt design rather       instruction. This addition had no discernible efect, however, much
than to systematically ensure the efectiveness of a single prompt
change.
Why Johnny Can’t Prompt                                                                                CHI ’23, April 23–28, 2023, Hamburg, Germany


to P4’s surprise. After P4 tried a few variations over a few minutes—    that work, and the contexts in which they work, so users can set their
adding quotation marks, changing punctuation, etc.—the inter-            own expectations around when to try what kind of instruction, or
viewer fnally suggested trying a do-focused form of the instruction,     what kind of sample dialog (or other input-output pair) to include,
which P4 initially appended after the “Don’t [...]” instruction,         how much to repeat themselves, how much emotion to give, etc.
again without success. Removing the “Don’t [...]” instruction            Examples would also help users develop reasonable expectations
fnally resolved this particular error.                                   about whether a specifc type of prompt design should work in a
    This example illustrates two of the mismatches between hu-           given context—and if not, whether rephrasing or repositioning that
man expectations about instruction-giving and the realities of LLM       prompt would help.
prompting. First, our participants expected that plain descriptions         Third, in our related work, we identifed a few prompt design
of behavior should be “understood” and acted upon, and if they           approaches that recent literature supports as efective, including
aren’t, it refects LLM capabilities. Second, our participants expected   the use of example input/output pairs (such as sample conversa-
that semantically equivalent instructions would have semantically        tional turns, in the context of chatbots) and the use of repetition
equivalent results, while in reality trivial modifcations to a prompt    within prompts. We found, however, that some users avoided these
can lead to dramatic shifts in future unfolding of conversations.        known-efective strategies, sometimes even when encouraged by the
    In another example, P2 expressed confusion about interacting         interviewer to try them. This may be a result of what communica-
prompts, asking “is there an upper limit on how many [...] instruc-      tions researcher Cliford Nass identifes as a “computers are social
tional statements you could give it before it gets confused? Because     actors” (CASA) [35] efect; that line of work shows that humans
it’s not really echoing the sentiments I’m telling it to, and I’m just   are cautious about giving feedback to a computer system they are
unsure why that is. Besides, of course, fundamental GPT-3 level          actively interacting with, despite recognizing the computer as inca-
inability”—echoing the “coordination” barrier [27] and showing           pable of feeling judged. One fnding of Nass’s work is that if the
overgeneralization about incapability from single failure.               human’s instructions to the computer are perceived by the human
                                                                         as applying not to the computer the human is interacting with, but
“But why...?”
                                                                         rather to a third party that is not present, then humans can avoid
Finally, every participant at one point asked their interviewer “why
                                                                         social pitfalls—that is, avoid behaving as though the chatbot is a
did it do that?” In nearly every case, our answer had to be “I
                                                                         social actor they’re instructing. Achieving this may be a matter of
don’t know”—for now, the black box nature of LLMs allows only
                                                                         combining training with specifc tool design; we ofer some possible
speculation about the reasons for one behavior or another, unlike
                                                                         direction in the next section.
with traditional programming systems.
                                                                            Fourth, some users, especially those with limited programming
                                                                         experience, struggled to recognize the ways in which the instruc-
5     DISCUSSION                                                         tions they gave in the preamble, in the reminder, or in conversation
In this section we address the implications of our fndings: we           with the chatbot had diferent time horizons. Instructions in con-
ofer ideas for training and education, we identify opportunities for     versation, in particular, had no bearing on any future conversations;
design, and we lay out open questions revealed by this work.             the prompt sent to GPT-3 consists only of the preamble, the single
                                                                         conversation in progress, and the reminder—prior conversations
                                                                         are not “remembered” in any sense. Though this problem is likely
5.1    What Do People Currently Do? Implications                         especially pronounced for chatbots that present a social, interactive
       for Training and Education                                        interface, making sure that users understand the specifc lifecycle
One major opportunity for training and education revealed by             over which instructions have an efect is important to avoid frustra-
our study is that end-users should collect more data than they           tions arising from the feeling that the user has to repeat themselves
are naturally inclined to. Systematic testing and robust prompt          or that they “told you this already”.
design—designing prompts that work across many users and many               Finally, we conclude this section on training by drawing on our
conversations—are by defnition impossible if the user only ever          fnding that participants in general chose not to engage in systematic
engages in a single conversation, even continuously updated. That        testing: for users to engage in systematic testing of prompts, we must
said, for some contexts non-robust prompt design can be appropri-        train and encourage users to do so.
ate: chatbots intended for a single user who is also the designer do
not necessarily need to be robust.
   A second major opportunity stems from the fact that most of the       5.2    Opportunities for Design
prompt design approaches participants tried before receiving any         How might future tools be designed to help users avoid some of
guidance (see §3.3 for details regarding this guidance) had some         the learning barriers and pitfalls?
efect—enough for participants to feel that they could, in fact, afect       To avoid struggles around having enough data for systematic
chatbot output with prompt changes—but participants hit dead             testing, future tools might beneft from explicitly supporting ro-
ends that incurred interviewer intervention more frequently than         bustness testing and demonstrating its value—a set of heuristics
we expected.                                                             here will likely be very useful. These heuristics would ideally help
   A searchable repository of examples, such as The DALL·E 2             the user understand:
Prompt Book [37], could help users overcome the “design”, “selec-
tion”, and “use” barriers that often led to the aforementioned dead       (1) How much data is enough data? How many conversations, in
ends. In particular, these examples should include specifc prompts            the case of a chatbot designer?
CHI ’23, April 23–28, 2023, Hamburg, Germany                                                             Zamfirescu-Pereira, Wong, Hartmann & Yang


 (2) How many examples of a particular error are necessary in              A few additional limitations of our study bear exploration, and
     order to be confdent in that error’s resolution? Participants      point to future studies. First, the reliance on a relatively small pool of
     in our small BotDesigner suitability task recognized that one      likely “early adopters” drawn from academia may skew the observed
     or two examples of a given error class was rarely enough to        phenomena towards a specifc set of analogies and preconceived
     feel confdent in that particular error class being resolved.       notions around technology and its capabilities. We claim neither
                                                                        that our observations are universal of all end users, nor that they are
   To help users avoid EUPS-style struggles, developers can take
                                                                        a complete description of all common misconceptions or behaviors
a few steps. First, tool designers should consider how to make the
                                                                        of end-users working with LLM-backed systems. Additionally, the
successful examples described earlier discoverable and even salient
                                                                        time we gave participants to engage in prompt design was relatively
in the moments when users most need them.
                                                                        limited, and it is likely that, given enough time and motivation, end
   Second, tool support for explicit explorations of cause-and-efect,
                                                                        users would advance quite quickly in developing better mental
such as through highlighting prompt changes and the resulting con-
                                                                        models and more efective strategies. Ultimately, we hope that our
versational changes, would help users overcome the “understand-
                                                                        observations ofer fruitful and interesting directions for future work,
ing” and “information” barriers. Indeed, a number of participants
                                                                        including to what extent our fndings generalize to other domains
with programming experience specifcally requested just such an
                                                                        (e.g., non-chatbots, where users’ social expectations may be less
interface for BotDesigner.
                                                                        pronounced) and a broader population, as we describe in §5.4 Open
   Though examples and instructions to the designer will hopefully
                                                                        Questions.
help, application designers can also try to hide the direct nature of
                                                                           While this paper explores the positive potential for LLM-backed
the instructions-to-the-bot experience to mitigate the impacts of the
                                                                        systems to be more widely accessible to a broader range of users,
social expectations we associated above with the CASA paradigm.
                                                                        we acknowledge that prior research also highlights the potential
Some methods of achieving this might include:
                                                                        for negative or complex social efects related to LLMs (such as
 (1) restructuring the app so that the natural language users are       implications for intellectual property rights and authorship, online
     asked to produce doesn’t feel like instructions;                   harassment, or the loss of jobs due to automation). While a deeper
 (2) priming the user to think of the app as non-social in other        discussion of these issues is beyond the scope of this paper’s use
     ways, perhaps by using explicit examples that break people’s       of an LLM system as a probe, we surface these as a reminder of
     social conventions, making the user’s subsequent violation         additional considerations that may be necessary when developing
     feel normal/acceptable/expected, such as using all caps, or        LLM-backed systems that are meant to be deployed “in the wild.”
     communicating with an angry tone, or including the same
     instruction multiple times;
 (3) having the app do some of the socially violating work itself,
     hidden from the user, such as repeating user prompts multiple
     times “under the hood,” or using a template that explicitly        5.4    Open Questions & Future Work
     repeats without giving the user agency, in the style of Mad        In addition to the implications for training and design given above,
     Libs.                                                              our work reveals a few questions we feel warrant future study:
                                                                           First, to what extent do the challenges and behaviors we de-
   Importantly, we note that several of these design opportunities
                                                                        scribe here also appear in other populations that might use these
explicitly surface the non-humanness of the app to the user or
                                                                        tools? A larger study, looking at a more diverse population than we
suggest ways for users to consider general. While visions of new
                                                                        have here, will likely uncover new challenges and can speak to the
technologies often imagine “seamless” interactions where the tech-
                                                                        degree to which the behaviors we observe are universal (or not!)
nology behind interactions is made invisible and fades into the
                                                                        in the general public. Further: which challenges persist, and what
background [47], “seamful” design interactions (originating from
                                                                        new challenges emerge, when users engage in natural language
ubiquitous computing) can make the technology and its imperfec-
                                                                        tasks in other domains, including non-chatbot domains? Chatbot
tions visible to the user [11, 22]. In this case, we note that rather
                                                                        “programming” involves giving instructions to an agent, a context
than making the app interface try to act more human, there may
                                                                        in which social expectations might be much more pronounced than
be useful design opportunities by making the app interface act
                                                                        when, say, prompting a poetry generator or a search tool—while
explicitly in non-human ways.
                                                                        the EUPS and iML struggles, like overgeneralization, seem more
                                                                        likely to persist.
5.3     Limitations                                                        Relatedly, to the extent the challenges we describe here—or new
We do not claim here that BotDesigner or even LLMs in general           ones uncovered by future work—can be addressed through the
should replace contemporary chatbot design techniques, but we do        mechanisms we ofer in §5.2, which approaches are most efective,
observe that the simplicity and accessibility of prompt-instructed      and why?
chatbots suggests that we may be on the cusp of an explosion of end        Second, can we quantify the extent to which users’ prompts and
user-created chatbots and other similar systems that rely solely on     interactions are actually impacted by social expectations? Nass’
human natural language prompting for their behavior. In this paper,     CASA work suggests the efect could be substantial, and if that
we use chatbots as an example domain to explore the interactions        proves true, then we should further explore: do examples sufce to
between end user designers and prompt-based systems backed by           overcome this bias, or is more explicit tool support required? Does
LLMs (as BotDesigner is).                                               the magnitude of the intervention depend on individual societal
Why Johnny Can’t Prompt                                                                                                         CHI ’23, April 23–28, 2023, Hamburg, Germany


context, and do tools need to be aware of their users’ societal con-                           Factors in Computing Systems (San Jose, California, USA) (CHI ’07). Association
texts as a result? Or, do these impacts reduce in impact over time,                            for Computing Machinery, New York, NY, USA, 1077–1086. https://doi.org/10.
                                                                                               1145/1240624.1240789
as users habituate to models’ responses and behaviors?                                     [7] Rishi Bommasani, Drew A. Hudson, Ehsan Adeli, Russ Altman, Simran Arora,
   Third, are there broader efects of end user culture on some                                 Sydney von Arx, Michael S. Bernstein, Jeannette Bohg, Antoine Bosselut, Emma
                                                                                               Brunskill, Erik Brynjolfsson, Shyamal Buch, Dallas Card, Rodrigo Castellon,
of the hypothesized social interaction inhibitions? Do members                                 Niladri Chatterji, Annie Chen, Kathleen Creel, Jared Quincy Davis, Dora Dem-
of high-context cultures struggle in diferent ways than what we                                szky, Chris Donahue, Moussa Doumbouya, Esin Durmus, Stefano Ermon, John
observed in this work?                                                                         Etchemendy, Kawin Ethayarajh, Li Fei-Fei, Chelsea Finn, Trevor Gale, Lauren
                                                                                               Gillespie, Karan Goel, Noah Goodman, Shelby Grossman, Neel Guha, Tatsunori
   Fourth, how can tools appropriately set capability expectations                             Hashimoto, Peter Henderson, John Hewitt, Daniel E. Ho, Jenny Hong, Kyle Hsu,
for end users? LLMs are not an artifcial general intelligence, some-                           Jing Huang, Thomas Icard, Saahil Jain, Dan Jurafsky, Pratyusha Kalluri, Siddharth
times known by the initialism “AGI,” but will end-users hold those                             Karamcheti, Geof Keeling, Fereshte Khani, Omar Khattab, Pang Wei Koh, Mark
                                                                                               Krass, Ranjay Krishna, Rohith Kuditipudi, Ananya Kumar, Faisal Ladhak, Mina
expectations by default—and if so, what are efective ways of dis-                              Lee, Tony Lee, Jure Leskovec, Isabelle Levent, Xiang Lisa Li, Xuechen Li, Tengyu
pelling those notions?                                                                         Ma, Ali Malik, Christopher D. Manning, Suvir Mirchandani, Eric Mitchell, Zanele
                                                                                               Munyikwa, Suraj Nair, Avanika Narayan, Deepak Narayanan, Ben Newman,
                                                                                               Allen Nie, Juan Carlos Niebles, Hamed Nilforoshan, Julian Nyarko, Giray Ogut,
6    CONCLUSION                                                                                Laurel Orr, Isabel Papadimitriou, Joon Sung Park, Chris Piech, Eva Portelance,
                                                                                               Christopher Potts, Aditi Raghunathan, Rob Reich, Hongyu Ren, Frieda Rong,
In this work, we explore the intuitions and behaviors of end-users                             Yusuf Roohani, Camilo Ruiz, Jack Ryan, Christopher Ré, Dorsa Sadigh, Shiori
engaged in prompt engineering through BotDesigner, a prompt-                                   Sagawa, Keshav Santhanam, Andy Shih, Krishnan Srinivasan, Alex Tamkin, Ro-
based (no-code) chatbot design tool. To create efective and delight-                           han Taori, Armin W. Thomas, Florian Tramèr, Rose E. Wang, William Wang,
                                                                                               Bohan Wu, Jiajun Wu, Yuhuai Wu, Sang Michael Xie, Michihiro Yasunaga, Ji-
ful end-user human-AI hybrid tools, tool designers will want to                                axuan You, Matei Zaharia, Michael Zhang, Tianyi Zhang, Xikun Zhang, Yuhui
consider what default behaviors, intuitions, preferences and capa-                             Zhang, Lucia Zheng, Kaitlyn Zhou, and Percy Liang. 2021. On the Opportunities
bilities humans bring to prompt design. Human intuitions rooted                                and Risks of Foundation Models. arXiv:2108.07258 [cs.LG]
                                                                                           [8] Tom Brown, Benjamin Mann, Nick Ryder, Melanie Subbiah, Jared D Kaplan,
in social experiences appear to have a signifcant impact on what                               Prafulla Dhariwal, Arvind Neelakantan, Pranav Shyam, Girish Sastry, Amanda
prompts end users will attempt when exploring these tools, in-                                 Askell, et al. 2020. Language models are few-shot learners. Advances in neural
                                                                                               information processing systems 33 (2020), 1877–1901.
cluding biases towards giving instruction over depicting examples,                         [9] Tom Brown, Benjamin Mann, Nick Ryder, Melanie Subbiah, Jared D Kaplan,
assumptions about capability based on limited examples, and avoid-                             Prafulla Dhariwal, Arvind Neelakantan, Pranav Shyam, Girish Sastry, Amanda
ance of displays of emotion. We hope designers of future tools will                            Askell, Sandhini Agarwal, Ariel Herbert-Voss, Gretchen Krueger, Tom Henighan,
                                                                                               Rewon Child, Aditya Ramesh, Daniel Ziegler, Jefrey Wu, Clemens Winter, Chris
consider how best to support users in the face of these behaviors                              Hesse, Mark Chen, Eric Sigler, Mateusz Litwin, Scott Gray, Benjamin Chess, Jack
and common struggles we exhibit.                                                               Clark, Christopher Berner, Sam McCandlish, Alec Radford, Ilya Sutskever, and
                                                                                               Dario Amodei. 2020. Language Models are Few-Shot Learners. In Advances in
                                                                                               Neural Information Processing Systems, H. Larochelle, M. Ranzato, R. Hadsell, M. F.
ACKNOWLEDGMENTS                                                                                Balcan, and H. Lin (Eds.), Vol. 33. Curran Associates, Inc., 1877–1901.
The authors would like to thanks the anonymous reviewers for                              [10] Shan Carter, Zan Armstrong, Ludwig Schubert, Ian Johnson, and Chris Olah.
                                                                                               2019. Activation Atlas. Distill (2019). https://doi.org/10.23915/distill.00015
their constructive feedback, and our participants for engaging in                              https://distill.pub/2019/activation-atlas.
our probe. J.D. Zamfrescu-Pereira was partially supported by the                          [11] Matthew Chalmers, Ian MacColl, and Marek Bell. 2003. Seamful design: Showing
                                                                                               the seams in wearable computing. In 2003 IEE Eurowearable. IET, 11–16.
United States Air Force and DARPA under contracts FA8750-20-C-                            [12] Zhifa Chen, Yichen Lu, Mika P. Nieminen, and Andrés Lucero. 2020. Creating a
0156, FA8750-20-C-0074, and FA8750-20-C0155 (SDCPS Program).                                   Chatbot for and with Migrants: Chatbot Personality Drives Co-Design Activities.
   The authors would also like to thank two inspirational re-                                  Association for Computing Machinery, New York, NY, USA, 219–230. https:
                                                                                               //doi.org/10.1145/3357236.3395495
searchers: the late Cliford Nass, whose work helped explain some                          [13] Justin Cranshaw, Emad Elwany, Todd Newman, Rafal Kocielnik, Bowen Yu,
otherwise inexplicable behaviors we found here; and the late Doug                              Sandeep Soni, Jaime Teevan, and Andrés Monroy-Hernández. 2017. Calendar.
Tygar, whose “Why Johnny Can’t Encrypt” spurred a decade of                                    help: Designing a workfow-based scheduling agent with humans in the loop. In
                                                                                               Proceedings of the 2017 CHI Conference on Human Factors in Computing Systems.
renewed interest in the human side of systems research.                                        ACM, 2382–2393.
                                                                                          [14] Hai Dang, Lukas Mecke, Florian Lehmann, Sven Goller, and Daniel Buschek. 2022.
REFERENCES                                                                                     How to Prompt? Opportunities and Challenges of Zero-and Few-Shot Learning
                                                                                               for Human-AI Interaction in Creative Applications of Generative Models. arXiv
 [1] 2022. CHATGPT: Optimizing language models for dialogue. https://openai.com/               preprint arXiv:2209.01390 (2022).
     blog/chatgpt/                                                                        [15] Ning Ding, Shengding Hu, Weilin Zhao, Yulin Chen, Zhiyuan Liu, Hai-Tao Zheng,
 [2] Bon Appétit. 2018. Elizabeth Olsen Tries to Keep Up with a Professional Chef |            and Maosong Sun. 2021. Openprompt: An open-source framework for prompt-
     Back-to-Back Chef | Bon Appétit. Youtube. https://www.youtube.com/watch?v=                learning. arXiv preprint arXiv:2111.01998 (2021).
     Om2oM-TDErQ                                                                          [16] John J Dudley and Per Ola Kristensson. 2018. A review of user interface design
 [3] Stephen H. Bach, Victor Sanh, Zheng-Xin Yong, Albert Webson, Colin Rafel,                 for interactive machine learning. ACM Transactions on Interactive Intelligent
     Nihal V. Nayak, Abheesht Sharma, Taewoon Kim, M Saiful Bari, Thibault Fevry,              Systems (TiiS) 8, 2 (2018), 1–37.
     Zaid Alyafeai, Manan Dey, Andrea Santilli, Zhiqing Sun, Srulik Ben-David, Can-       [17] Glen Dunlap, Rose Iovannone, Kelly J Wilson, Donald K Kincaid, and Phillip
     wen Xu, Gunjan Chhablani, Han Wang, Jason Alan Fries, Maged S. Al-shaibani,               Strain. 2010. Prevent-teach-reinforce: A standardized model of school-based
     Shanya Sharma, Urmish Thakker, Khalid Almubarak, Xiangru Tang, Dragomir                   behavioral intervention. Journal of Positive Behavior Interventions 12, 1 (2010),
     Radev, Mike Tian-Jian Jiang, and Alexander M. Rush. 2022. PromptSource: An                9–22.
     Integrated Development Environment and Repository for Natural Language               [18] Noyan Evirgen and Xiang’Anthony’ Chen. 2022. GANzilla: User-Driven Direction
     Prompts. https://doi.org/10.48550/ARXIV.2202.01279                                        Discovery in Generative Adversarial Networks. In Proceedings of the 35th Annual
 [4] MP Barnett and WM Ruhsam. 1968. A natural language programming system for                 ACM Symposium on User Interface Software and Technology. 1–10.
     text processing. IEEE transactions on engineering writing and speech 11, 2 (1968),   [19] Laura Faulkner. 2003. Beyond the fve-user assumption: Benefts of increased
     45–52.                                                                                    sample sizes in usability testing. Behavior Research Methods, Instruments, &
 [5] Mary Jo Bitner, Amy L Ostrom, and Felicia N Morgan. 2008. Service blueprinting:           Computers 35 (2003), 379–383.
     a practical technique for service innovation. California management review 50, 3     [20] Samuel Gehman, Suchin Gururangan, Maarten Sap, Yejin Choi, and Noah A.
     (2008), 66–94.                                                                            Smith. 2020. RealToxicityPrompts: Evaluating Neural Toxic Degeneration in
 [6] Kirsten Boehner, Janet Vertesi, Phoebe Sengers, and Paul Dourish. 2007. How               Language Models. In Findings of the Association for Computational Linguistics:
     HCI Interprets the Probes. In Proceedings of the SIGCHI Conference on Human               EMNLP 2020. Association for Computational Linguistics, Online, 3356–3369.
CHI ’23, April 23–28, 2023, Hamburg, Germany                                                                                      Zamfirescu-Pereira, Wong, Hartmann & Yang


[21] Marti A Hearst and Jan O Pedersen. 1996. Reexamining the cluster hypothesis:           [35] Cliford Nass, Jonathan Steuer, and Ellen R Tauber. 1994. Computers are social
     Scatter/gather on retrieval results. In Proceedings of the 19th annual international        actors. In Proceedings of the SIGCHI conference on Human factors in computing
     ACM SIGIR conference on Research and development in information retrieval. 76–              systems. 72–78.
     84.                                                                                    [36] OpenAI. 2022. Examples - OpenAI API. https://beta.openai.com/examples
[22] Sarah Inman and David Ribes. 2019. "Beautiful Seams": Strategic Revelations and        [37] Guy Parsons. 2022. The DALL·E 2 Prompt Book. https://dallery.gallery/the-dalle-
     Concealments. In Proceedings of the 2019 CHI Conference on Human Factors in                 2-prompt-book/
     Computing Systems (Glasgow, Scotland Uk) (CHI ’19). Association for Computing          [38] Ben Pietrzak, Ben Swanson, Kory Mathewson, Monica Dinculescu, and Sherol
     Machinery, New York, NY, USA, 1–14. https://doi.org/10.1145/3290605.3300508                 Chen. 2021. Story Centaur: Large Language Model Few Shot Learning as a
[23] Ellen Jiang, Edwin Toh, Alejandra Molina, Aaron Donsbach, Carrie J Cai, and                 Creative Writing Tool.
     Michael Terry. 2021. GenLine and GenForm: Two Tools for Interacting with               [39] Catherine Pricilla, Dessi Puji Lestari, and Dody Dharma. 2018. Designing inter-
     Generative Language Models in a Code Editor. In The Adjunct Publication of the              action for chatbot-based conversational commerce with user-centered design. In
     34th Annual ACM Symposium on User Interface Software and Technology (Virtual                2018 5th International Conference on Advanced Informatics: Concept Theory and
     Event, USA) (UIST ’21). Association for Computing Machinery, New York, NY,                  Applications (ICAICTA). IEEE, 244–249.
     USA, 145–147. https://doi.org/10.1145/3474349.3480209                                  [40] Aditya Ramesh, Mikhail Pavlov, Gabriel Goh, Scott Gray, Chelsea Voss, Alec
[24] Bogyeong Kim, Jaehoon Pyun, and Woohun Lee. 2018. Enhancing Storytelling                    Radford, Mark Chen, and Ilya Sutskever. 2021. Zero-shot text-to-image generation.
     Experience with Story-Aware Interactive Puppet. In Extended Abstracts of the                In International Conference on Machine Learning. PMLR, 8821–8831.
     2018 CHI Conference on Human Factors in Computing Systems (Montreal QC,                [41] Kevin Roose. 2022. The Brilliance and Weirdness of ChatGPT. The New York Times
     Canada) (CHI EA ’18). ACM, New York, NY, USA, Article LBW076, 6 pages.                      (2022). https://www.nytimes.com/2022/12/05/technology/chatgpt-ai-twitter.
     https://doi.org/10.1145/3170427.3188515                                                     html
[25] Scott R. Klemmer, Anoop K. Sinha, Jack Chen, James A. Landay, Nadeem                   [42] Victor Sanh, Albert Webson, Colin Rafel, Stephen H. Bach, Lintang Sutawika,
     Aboobaker, and Annie Wang. 2000. Suede: A Wizard of Oz Prototyping Tool for                 Zaid Alyafeai, Antoine Chafn, Arnaud Stiegler, Teven Le Scao, Arun Raja,
     Speech User Interfaces. In Proceedings of the 13th Annual ACM Symposium on                  Manan Dey, M Saiful Bari, Canwen Xu, Urmish Thakker, Shanya Sharma Sharma,
     User Interface Software and Technology (San Diego, California, USA) (UIST ’00).             Eliza Szczechla, Taewoon Kim, Gunjan Chhablani, Nihal Nayak, Debajyoti Datta,
     ACM, New York, NY, USA, 1–10. https://doi.org/10.1145/354401.354406                         Jonathan Chang, Mike Tian-Jian Jiang, Han Wang, Matteo Manica, Sheng Shen,
[26] Amy J. Ko, Robin Abraham, Laura Beckwith, Alan Blackwell, Margaret Burnett,                 Zheng Xin Yong, Harshit Pandey, Rachel Bawden, Thomas Wang, Trishala Neeraj,
     Martin Erwig, Chris Scafdi, Joseph Lawrance, Henry Lieberman, Brad Myers,                   Jos Rozen, Abheesht Sharma, Andrea Santilli, Thibault Fevry, Jason Alan Fries,
     Mary Beth Rosson, Gregg Rothermel, Mary Shaw, and Susan Wiedenbeck. 2011.                   Ryan Teehan, Tali Bers, Stella Biderman, Leo Gao, Thomas Wolf, and Alexander M.
     The State of the Art in End-User Software Engineering. ACM Comput. Surv. 43,                Rush. 2021. Multitask Prompted Training Enables Zero-Shot Task Generalization.
     3, Article 21 (apr 2011), 44 pages. https://doi.org/10.1145/1922649.1922658                 https://doi.org/10.48550/ARXIV.2110.08207
[27] Amy J. Ko, Brad A. Myers, and Htet Htet Aung. 2004. Six Learning Barriers              [43] Jef Sauro and James R Lewis. 2016. Quantifying the user experience: Practical
     in End-User Programming Systems. In Proceedings of the 2004 IEEE Symposium                  statistics for user research. Morgan Kaufmann.
     on Visual Languages - Human Centric Computing (VLHCC ’04). IEEE Computer               [44] Lisa Stifelman, Adam Elman, and Anne Sullivan. 2013. Designing Natural Speech
     Society, USA, 199–206. https://doi.org/10.1109/VLHCC.2004.47                                Interactions for the Living Room. In CHI ’13 Extended Abstracts on Human Factors
[28] Himabindu Lakkaraju, Dylan Slack, Yuxin Chen, Chenhao Tan, and Sameer Singh.                in Computing Systems (Paris, France) (CHI EA ’13). ACM, New York, NY, USA,
     2022. Rethinking Explainability as a Dialogue: A Practitioner’s Perspective. arXiv          1215–1220. https://doi.org/10.1145/2468356.2468574
     preprint arXiv:2202.01875 (2022).                                                      [45] Hendrik Strobelt, Albert Webson, Victor Sanh, Benjamin Hoover, Johanna Beyer,
[29] Q Vera Liao, Daniel Gruen, and Sarah Miller. 2020. Questioning the AI: informing            Hanspeter Pfster, and Alexander M Rush. 2022. Interactive and Visual Prompt
     design practices for explainable AI user experiences. In Proceedings of the 2020            Engineering for Ad-hoc Task Adaptation with Large Language Models. arXiv
     CHI Conference on Human Factors in Computing Systems. 1–15.                                 preprint arXiv:2208.07852 (2022).
[30] Pengfei Liu, Weizhe Yuan, Jinlan Fu, Zhengbao Jiang, Hiroaki Hayashi, and              [46] M. Swan. 1927. How You Can Write Plays: A Practical Guide-book. S. French.
     Graham Neubig. 2021. Pre-train, Prompt, and Predict: A Systematic Survey of                 https://books.google.com/books?id=UyYrAAAAIAAJ
     Prompting Methods in Natural Language Processing. arXiv:2107.13586 [cs.CL]             [47] Mark Weiser. 1999. The Computer for the 21st Century. SIGMOBILE Mob. Comput.
[31] Vivian Liu and Lydia B. Chilton. 2021. Design Guidelines for Prompt Engineering             Commun. Rev. 3, 3 (jul 1999), 3–11. https://doi.org/10.1145/329124.329126
     Text-to-Image Generative Models. https://doi.org/10.48550/ARXIV.2109.06977             [48] Tongshuang Wu, Ellen Jiang, Aaron Donsbach, Jef Gray, Alejandra Molina,
[32] Robert L Logan IV, Ivana Balažević, Eric Wallace, Fabio Petroni, Sameer Singh,              Michael Terry, and Carrie J Cai. 2022. PromptChainer: Chaining Large Language
     and Sebastian Riedel. 2021. Cutting down on prompts and parameters: Simple                  Model Prompts through Visual Programming. In Extended Abstracts of the 2022
     few-shot learning with language models. arXiv preprint arXiv:2106.13353 (2021).             CHI Conference on Human Factors in Computing Systems.
[33] J. Marks, B. Andalman, P. A. Beardsley, W. Freeman, S. Gibson, J. Hodgins, T. Kang,    [49] Tongshuang Wu, Michael Terry, and Carrie J Cai. 2022. AI Chains: Transparent
     B. Mirtich, H. Pfster, W. Ruml, K. Ryall, J. Seims, and S. Shieber. 1997. Design            and Controllable Human-AI Interaction by Chaining Large Language Model
     Galleries: A General Approach to Setting Parameters for Computer Graphics and               Prompts. In Proceedings of the 2022 CHI conference on human factors in computing
     Animation. In Proceedings of the 24th Annual Conference on Computer Graphics and            systems.
     Interactive Techniques (SIGGRAPH ’97). ACM Press/Addison-Wesley Publishing             [50] Qian Yang, Jina Suh, Nan-Chen Chen, and Gonzalo Ramos. 2018. Grounding
     Co., USA, 389–400. https://doi.org/10.1145/258734.258887                                    Interactive Machine Learning Tool Design in How Non-Experts Actually Build
[34] Bill Moggridge. 2006. Designing Interactions. The MIT Press.                                Models. In Proceedings of the 2018 Designing Interactive Systems Conference (Hong
                                                                                                 Kong, China) (DIS ’18). Association for Computing Machinery, New York, NY,
                                                                                                 USA, 573–584. https://doi.org/10.1145/3196709.3196729
Why Johnny Can’t Prompt                                                                                                   CHI ’23, April 23–28, 2023, Hamburg, Germany


A      BOTDESIGNER IMPLEMENTATION                                                           by us, and decide whether this new template resolved any of the
       DETAILS & PILOT EVALUATION                                                           errors participants had previously identifed.
                                                                                               Our pilot users had no problems detecting most of a set of 5 error
For additional context, we ofer the following details regarding
                                                                                            categories we had previously identifed in the set of conversations
BotDesigner’s implementation and pilot evaluation.
                                                                                            between AMT workers and the baseline chatbot: (1) skipped steps,
                                                                                            (2) ignored user expressions of negative emotion, (3) ignored user
A.1       Mapping Template to Prompt
                                                                                            requests to wait until the user had completed some task, (4) factu-
To generate a given bot’s chat messages, BotDesigner concatenates                           ally incorrect responses to questions, and (5) otherwise unhelpful
the preamble, the entirety of the conversation so far (using Bot:                           responses.
and User: prefxes for each turn as appropriate), the reminder (if                              We learned a few things from this small pilot that ultimately in-
any), and the fnal prompt Bot:. (Figure 4b in this appendix shows                           formed our probe. First, we learned that BotDesigner functioned
this relationship.) This text string is then sent as a single prompt                        well enough for a small set of researchers to use it successfully.
to GPT-3. For consistency across tests, BotDesigner always uses                             Second, critically, we observed that looking over a set of prere-
GPT-3’s text-davinci-002 model with temperature3 set to 0.                                  corded conversations is quite cognitively demanding, involving
                                                                                            lots of context switching, because these were not conversations
A.2       Evaluating Efects of Prompt Changes                                               pilot users themselves had with the bot. As a result of these ob-
To evaluate whether a particular template change afects any of the                          servations, we (1) retained the “Error Browser”, but (2) dropped a
identifed problematic chatbot responses, BotDesigner replays con-                           prototype “Conversation Browser” view (focused on tracking com-
versations containing errors and displays any modifed responses.                            mon conversational threads across conversations) from the version
Two implementation approaches are possible for this task: (a) a                             of BotDesigner we used in our probe. We also (3) designed a much
system could either perform an “single replay” by assuming all                              more open-ended task for our probe requiring less knowledge of
conversational turns prior to the error will occur as in the orig-                          task minutiae to identify errors, and encouraging users to have
inal conversation, and test only whether the error utterance is                             their own conversations with the bot, while skipping the initial
changed; or, (b) it could perform a “total replay” in which every                           collection of conversations from AMT workers and thus avoiding
conversational turn is replayed and any changed utterances are                              the need for participants to understand the task well enough to
fagged for user review. Both approaches have merit; the “total                              identify subtle errors in instruction.
replay” approach is more consistent with the “regression testing”
concept—certainly, a designer would not want to inadvertently in-
troduce problematic utterances where none previously existed—but
providing clear feedback requires identifying which conversational
turns have changed in trivial ways, itself a nontrivial task.
   For BotDesigner, we default to the “single replay” in an attempt
to reduce noise, and accept the resulting short-term trade-of in
accuracy that allows more rapid iteration—but leaving designers
with the need to perform more extensive testing before deployment.

A.3       Pilot Evaluation of BotDesigner’s Use
To validate that BotDesigner does enable systematic prompt eval-
uation, we recruited � = 3 academic researchers with a range of
interest levels and experience with conversational agent design4
and evaluated how efectively they could identify common or par-
ticularly severe bugs or errors in a baseline chatbot, and how efec-
tively they could evaluate a new bot template for improvements
over the baseline bot.
   In advance of the interview, we collected conversations with
the baseline bot from AMT workers conversing with a baseline
chatbot. We then asked our pilot users to (1) browse the collected
conversations to fnd errors and label them with categorization
tags; (2) evaluate a “new” template with updated prompts, provided
3When used to predict subsequent tokens given a specifed prefx (which we call a
“prompt” in this paper), language models typically assign a probability to every possible
subsequent token, and then select among the most likely contenders. The temperature
parameter afects how the next prediction is selected among the probability-ranked
tokens. At temperature = 0, the most likely next token is always selected, preventing
any random variation in response to a given prefx.
4 At this stage, we are not exploring end users’ intuitions about prompts, merely
exploring whether BotDesigner’s systematic prompt analysis functionality can be
used as intended.
CHI ’23, April 23–28, 2023, Hamburg, Germany                                                    Zamfirescu-Pereira, Wong, Hartmann & Yang




(a) BotDesigner prompt template; note exclusive use of natural        (b) Text-only LLM prompt generated by a sample bot template.
language throughout.                                                  Seen here is an instance of the exact text transmitted to GPT-3
                                                                      by BotDesigner, which collects GPT-3’s text completion (or,
                                                                      “prediction”) as the bot’s response to the last User: request.

                        Figure 4: Sample BotDesigner bot template and the corresponding generated prompts.
                                                                                                                                      ! http://bot-designer.tld                                                         ! http://bot-designer.tld
                                                                                                                                                                                                                  Preamble
                                                                                                                                                                                                                  You are a recipe instruction bot. Engage in conversation
                                                                                                                                                                                                                  to walk the user through the following recipe for Mixed
                                                                                                                                                                                                                  Veggie Tempura:

                                                                                                                                                                                                                  Ingredients:
                                                                                                                                                                                                                  - 1 Maitake mushroom
                                                                                                                                                                                                                                                                                                                                             Why Johnny Can’t Prompt




                                                                                                                                                                                                                  - 1 Acorn squash
                                                                                                                                                                                                                  - 2 lemons                                                                                  ! http://bot-designer.tld
                                                                                                                                                                                                                  - 1 cup flour
                                                                                                                                                                                                                  - 1 cup cornstarch
                                                                                                                                                                                                           1      - 2 teaspoons salt
                                                                                                                                                                                                                  - 1 teaspoon baking soda
                                                                                                                                                                                                                                                           🤖
                                                                                                                                                                                                                  - 2 cups seltzer water Preamble
                                                                                                                                                                                                        Designer  - Flaky salt for finishing

                                                                                                                                                                                                        Steps:
                                                                                                                                                                                                    generates             a First Turns
                                                                                                                                                                                                        1. Heat a pot of frying oil to 350°.
                                                                                                                                                                                                           Break the maitake mushroom into small pieces
                                                                                                                                                                                                        2.baseline
                                                                                                                                                                                                        3. Whisk together the flour and cornstarch with the salt
                                                                                                                                                                                                  “bot template”                 Reminder
                                                                                                                                                                                                        and baking soda in a large    mixing bowl.
                                                                                                                                                                                                        4. Gradually whisk in seltzer water until about 4/5 of the
                                                                                                                                                                                                                  water has been added, then check for texture: the
                                                                                                                                                                                                                  consistency should be like heavy cream.               Conversation
                                                                                                                                                                                                                                                                          Conversation
                                                                                                                                                                                                                  5. Carefully place mushrooms into the batter mixture      Conversation
                                                                                                                                                                                                                                                                             🤖
                                                                                                                                                                                                                  and gently mix to coat evenly.
                                                                                                                                                                                                                                                                           🤖🤖
                                                                                                                                                                                                                  6. Using a spider spoon, place coated mushrooms into
                                                                                                                                                                                                                                                                                         🗣
                                                                                                                          Errors                                    New?                                                  Designer generates
                                                                                                                                                                                                                  oil and let fry until golden brown.
                                                                                                                                                                                                                                                                                       🗣🗣
                                                                                                                                                                            Test prompt                           7. While mushrooms cook, cut and seed the Acorn
                                                                                                                                                                      ✅                                                                                                      🤖
                                                                                                                                                                                                                     example conversations
                                                                                                                          🤖
                                                                                                                                  WRONG                                                                           squash. Slice the squash into thin pieces and coat them            BAD
                                                                                                                                                                                                                                                                                       BAD
                                                                                                                                                                                                                                                                           🤖🤖
                                                                                                                                                                            change globally                       with the batter mixture.
                                                                                                                                                                      ✅
                                                                                                                                                                                                                                                                                         🗣
                                                                                                                                                                                                                  8. Remove mushrooms and begin with       bot
                                                                                                                                                                                                                                                frying the acorn
                                                                                                                          🤖
                                                                                                                                      ODD
                                                                                                                                                                                                                                                                                       🗣🗣
                                                                                                                                                                      ❌                                           squash.
                                                                                                                                                                                                                  9. Slice the lemons into thin, intact rounds, and coat
                                                                                                                                                                                                                                                                          🤖
                                                                                                                          🤖
                                                                                                                                      BAD                                                                         them with batter too.
                                                                                                                                                                                                                                            2                           🤖🤖
                                                                                                                                                                                                                                                                                                                 ! http://bot-designer.tld
                                                                                                                                                                                                                  10. When done, remove the squash from the oil and add
                                                                                                                          🤖                                           ❌         7
                                                                                                                                      BAD                                                                         the batter-coated lemon slices.
                                                                                                                                                                                                                  11. Let fried vegetables cool on a cooling rack placed
                                                                                                                                                                                                                                                            3
                                                                                                                                                                                                                  over a cookie sheet, and finish with flaky salt.
                                                                                                        ! http://bot-designer.tld                                                                                                                                            Conversation
                                                                                                                                                                                                                  Walk the user through making this recipe step by step,
                                                                                                                                                                                                                                         Identify & label                     Conversation
                                                                                                                                                                                                                                                                                Conversation
                                                                                                                                                                                                                  in conversation. Start by helping the user collect and
                                                                                                                                                                                                                                                                               🤖
                                                                                                                                                                                                                  prepare the ingredients, then execute the directions.
                                                                                                                                                                                                                                      problematic bot
                                                                                                                                                                                                                                                                             🤖🤖
                                                                                                                                                                                                                                                                                            🗣
                                                                                                                                                                                                                  Don't skip any steps! Stay friendly.
                                                                                                                                                                                                                                                   responses
                                                                                                                                                                                                                                                                                          🗣🗣
                                                                                                                                                                                                                                                                               🤖
                                                                                                                                                                                                                                                                                        BAD
                                                                                                                                                                                                                                                                                         BAD
                                                                                                                                                                                                                                                                             🤖🤖
                                                                                                                                                                                                                                                                                            BAD
                                                                                                                                                                                                                                                                                            🗣
                                                                                                                                                                       K!                                                                                                                                                             K!
                                                                                                                                                                     IC                                                                                                                                                             IC
                                                                                                                                                                  CL
                                                                                                                                                                                                                                                                                          🗣🗣
                                                                                                                                                                                                                                                                               🤖                                                 CL
                                                                                                                                                                                                                                                                             🤖🤖
                                                                                                                                                                                                                                                                                                                      K   !
                                                                                                                                                                                                                                                                                                                   IC
                                                                                                                                                                                                                                                                                                              CL
                                                                                                                                       K!
                                                                                                                                  C LIC                                                                                                               Conversation
                                                                                                                                                                                                                                                      🤖
                                                                                                                                                                                                                        🤖                                              🗣
                                                                                                                                                                                                   Preamble
                                                                                                                                                                                                                                                      🤖                                           ! http://bot-designer.tld
                                                                                                                                                                                                                                                                     BAD
                                                                                                                                                                                                                                                                       🗣
                                                                                                                                                       Conversation                                First Turns               Update
                                                                                                               Test prompt                            🤖
                                                                                                                                                                                                                             prompts                  🤖                          4
                                                                                                             change locally                                                                        Reminder
                                                                                                                                                                            🗣
                                                                                                                                                                                                                             in bot                                 Pick a
                                                                                                                                               RETRY
                                                                                                                                                                                                                             template
                                                                                                                                                      🤖
                                                                                                                                                K!                                                                                                                  specific
                                                                                                                                               IC
                                                                                                                                            CL
                                                                                                                            6                                                         ! http://bot-designer.tld
                                                                                                                                                                                                                                                                    error to
                                                                                                                              !                                                 Preamble
                                                                                                                            K                                                                                                         5
                                                                                                                      C LIC                                                     You are a recipe instruction bot. Engage in conversation                            address
                                                                                                                                                                                to walk the user through the following recipe for Mixed
                                                                                                                                                                                Veggie Tempura, but don’t list more than one
                                                                                                                                                                                ingredient in each message:

                                                                                                                                                                                Ingredients:
                                                                                                                                                                                - 1 Maitake mushroom
                                                                                                                                                                                - 1 Acorn squash




Figure 5: BotDesigner workfow. Numbered steps here correspond to the numbered steps described in §3.2
                                                                                                                                                                                - 2 lemons
                                                                                                                                                                                - 1 cup flour
                                                                                                                                                                                - 1 cup cornstarch
                                                                                                                                                                                - 2 teaspoons salt
                                                                                                                                                                                - 1 teaspoon baking soda
                                                                                                                                                                                - 2 cups seltzer water
                                                                                                                                                                                - Flaky salt for finishing
                                                                                                                                                                                                                                                                                                                                             CHI ’23, April 23–28, 2023, Hamburg, Germany




                                                                                                                                                                                Steps:
                                                                                                                                                                                1. Heat a pot of frying oil to 350°.
                                                                                                                                                                                2. Break the maitake mushroom into small pieces
                                                                                                                                                                                3. Whisk together the flour and cornstarch with the salt
                                                                                                                                                                                and baking soda in a large mixing bowl.
                                                                                                                                                                                4. Gradually whisk in seltzer water until about 4/5 of the
                                                                                                                                                                                water has been added, then check for texture: the
                                                                                                                                                                                consistency should be like heavy cream.
                                                                                                                                                                                5. Carefully place mushrooms into the batter mixture
CHI ’23, April 23–28, 2023, Hamburg, Germany                                                          Zamfirescu-Pereira, Wong, Hartmann & Yang


B  TRANSCRIPT OF “BACK TO BACK CHEF:                                   Expert: Cool, and it should be about the consistency of heavy
   CARLA LALLI & ELIZABETH OLSON”                                      cream.
                                                                       Amateur: Yeah okay. I’m gonna try and get a little more bumps
B.1 Behavioral categories                                              out but I think I’m almost there.
Observed behavioral categories for Carla:                              Expert: All right so I’m gonna put my whisk into the garbage
• Concept simplifcation, analogies,                                    bowl just to get it out of the way and do you feel like you’re in a
• Detailed instructions that recipes typically don’t cover             lump-free place? Because we’re gonna start frying.
• Step completion confrmation                                          Amateur: Em oh no... I’m like a perfectionist, so I’m gonna... I
• Social conversation                                                  think I’m just gonna say yes. . .
• Repair                                                               Expert: Okay, great. Take one big handful of mushrooms.
• Emotional grounding                                                  Amateur: Uh huh.
  These categories were highlighted in the following transcript.       Expert: And, put them right into the batter. And, there should also
                                                                       be a fork, and a spoon.
B.2     Transcript                                                     Amateur: Yeah.
Today we have 20 minutes to make mixed veggie tempura and              Expert: And, I’m gonna use my hands and the fork to really
we’re gonna see if Lizzie can follow along with me through verbal      gently, ’cause I don’t wanna break these clusters up, but I wanna
instructions only.                                                     coat all of the mushrooms with batter.
Expert: So the frst thing we’re gonna do is take this very             Amateur: Yup.
brain-looking giant mushroom – so this is a hen-of-the-woods           Expert: So, we should be at around 350. So, maybe while we’re
mushroom, also called a maitake. I got my squash and my lemons         waiting we can start prepping our acorn squash.
out of the way.                                                        Amateur: Great.
So the frst thing I want you to do is just turn it over so the stem    Expert: So, now you need your cleaver.
side is up got it and then just use your hands to kind of break big    Amateur: Yup, oh God.
clusters of of the bottom and like kind of large pieces.               Expert: You got your acorn squash.
And then we’ll go back in and we can make them smaller and I like      Amateur: Yes.
doing this with my hands because then you get -                        Expert: So put it on one side so that the stem end is like closest to
Amateur: oh you’re not using your paring knife                         your dominant hand.
Expert: No, I’m only using the paring knife if it was dry or spongy    Amateur: Yes, got it.
at the bottom. We’re probably used a quarter of these (mushrooms.)     Expert: And then, just cut straight down, kinda close to the stem.
So then just take the tray with the mushrooms on it and move that      And, just shear of that front part.
over to your right-hand side and we’re gonna make the batter.          Amateur: How do you use a cleaver? Do you just like... hit it?
So next thing – you got your board cleared?                            Expert: You can hit it. You can use it like a slicing knife and just
Amateur: Yes, there’s mushroom juice on it but it’s fne.               go straight down.
Expert: I think that’s the line from a Woody Allen movie. So now       Amateur: I make really fun faces when I’m frustrated, or like
you’ve got two bowls. One is four and one is cornstarch. So put        straining, and it’s not pleasant to have a camera in front of me.
those into the larger bowl together. We’re gonna make the              Expert: All you need to do right now is just create like a fat edge
tempura batter now.                                                    so that we can stand–
Once you have your four and your cornstarch. You have a little         Amateur: Did it. Okay.
dish that has salt and baking soda and those get combined too.         Expert: Great. And then, we’re gonna cut it into two lobes.
Amateur: Wait. . . Wha..?                                              Straight down.
Expert: They should be in the same little bowl.                        Amateur: Okay.
Amateur: There’s another little bowl that has salt and baking          Expert: And, if you’re of to one side it’s fne, ’cause we only need
powder - it was to my left. Is it to your left?                        a quarter of the squash.
Expert: It’s in my bowl now but yeah there was a little bowl with      Amateur: Just a quarter.
white stuf that isn’t salt then that’s your. . .                       Expert: Just a quarter. So, get–
Amateur: Okay.                                                         Amateur: So, cut the halves into quarters as well.
Expert: And so let’s just whisk the dry ingredients frst. So once      Expert: Yeah, so once you have it in half.
the dry ingredients are whisked together, take your measuring cup      Amateur: Got it.
that’s over to the right and those two little bottles of seltzer and   Expert: Take your spoon, and scoop the seeds into that little trash
we’re gonna measure 2 cups, which I want to add gradually. So          bowl that we made.
take your whisk in one hand, your measuring cup in the other and       Amateur: Yes.
then gradually whisk in. Do about four-ffths of this and then we’ll    Expert: And then, we’re gonna leave the skin on, and cut this into
check the texture . . .                                                thin slices.
Amateur: It’s like. . . you know what “Oobleck” is?                    Amateur: Okay.
Expert: What did you say? “Blueblack?”?                                Expert: Going crosswise, so they’re kind of like, they look like
Amateur: “Oobleck”. It’s like a thing you play with as a kid with,     little clouds to me.
like baking soda and water and that’s what it’s reminding me of.
Why Johnny Can’t Prompt                                                                               CHI ’23, April 23–28, 2023, Hamburg, Germany


Amateur: Okay. Do you fnd it easier to use a cleaver than like a         Expert: Lift them out and let that excess batter drip of. And then,
chef’s knife?                                                            you wanna just go right into the oil.
Expert: Not necessarily.                                                 Amateur: Okay, I’m using my hands ’cause I–
Amateur: Yeah, I’m not fnding it the easiest.                            Expert: Same. But, we’re not afraid of fry oil.
Expert: You could switch to your paring knife if you want.               Amateur: Well, it’s not splattering the way my, the way I’ve been
Amateur: It’s okay. I’m just kind of scared of big silvery things.       frying, ’cause I don’t have a thermometer...so clearly I’ve been–
Expert: Yeah, it’s a scary tool for sure. All right, so by now, do you   Expert: You might be going really high.
have a quarter sliced? A quarter acorn sliced?                           Amateur: I think it was way too hot. Wonder if I should’ve added
Amateur: Yup, just about.                                                more of my club soda.
Expert: All right. So, go back to the mushrooms.                         Expert: If it feels thick, yeah, add more.
Amateur: Yup.                                                            Amateur: ’Cause I do, I feel like mine’s–
Expert: And, then using your hand and the fork again.                    Expert: A little too thick?
Amateur: Yes.                                                            Amateur: It’s a thick tempura.
