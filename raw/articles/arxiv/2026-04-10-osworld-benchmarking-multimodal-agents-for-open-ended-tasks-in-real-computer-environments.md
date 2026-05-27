---
id: article-2026-04-10-osworld-benchmarking-multimodal-agents-for-open-ended-tasks-in-real-computer-environments
type: source
title: "OSWorld: Benchmarking Multimodal Agents for Open-Ended Tasks in Real Computer Environments"
path: raw/articles/arxiv/2026-04-10-osworld-benchmarking-multimodal-agents-for-open-ended-tasks-in-real-computer-environments.md
author: "Tianbao Xie, Danyang Zhang, Jixuan Chen, Xiaochuan Li, Siheng Zhao, Ruisheng Cao, Toh Jing Hua, Zhoujun Cheng, Dongchan Shin, Fangyu Lei, Yitao Liu, Yiheng Xu, Shuyan Zhou, Silvio Savarese, Caiming Xiong, Victor Zhong, Tao Yu"
publisher: arXiv.org
url: https://arxiv.org/abs/2404.07972
date_published: 2024-04-11
date_added: 2026-04-10
tags: [computer-use, multimodal-agents, benchmarks, evals]
status: processed
quality: high
summary: OSWorld introduces a scalable real-computer benchmark for multimodal agents across Ubuntu, Windows, and macOS, covering open-ended workflows that span desktop apps, web apps, and file operations.
related: [computer-use, multimodal-agents, benchmarks, evals]
---

# OSWorld: Benchmarking Multimodal Agents for Open-Ended Tasks in Real Computer Environments

## Source Metadata

- Path: raw/articles/arxiv/2026-04-10-osworld-benchmarking-multimodal-agents-for-open-ended-tasks-in-real-computer-environments.md
- Author: Tianbao Xie, Danyang Zhang, Jixuan Chen, Xiaochuan Li, Siheng Zhao, Ruisheng Cao, Toh Jing Hua, Zhoujun Cheng, Dongchan Shin, Fangyu Lei, Yitao Liu, Yiheng Xu, Shuyan Zhou, Silvio Savarese, Caiming Xiong, Victor Zhong, Tao Yu
- Published: 2024-04-11
- Publisher: arXiv.org
- URL: https://arxiv.org/abs/2404.07972

## TL;DR

OSWorld extends realistic agent evaluation from the browser into full computer use: agents operate across real OS environments, arbitrary apps, GUI and CLI interfaces, and example-wise execution checks.

## Key Claims

- Existing benchmarks underrepresent the diversity and complexity of real computer use.
- OSWorld provides a unified benchmark environment for multimodal agents across multiple operating systems and application types.
- Example-wise execution-based evaluation is essential because real computer tasks permit many valid trajectories and often start from partially completed states.
- The benchmark shows that current agents are still far below human performance on realistic computer tasks.
- Multi-app workflows are substantially harder than single-app tasks, so general computer-use ability is not well captured by single-interface benchmarks.
- The paper highlights GUI grounding and operational knowledge as major failure areas for current agents.

## Important Details

- OSWorld includes 369 Ubuntu tasks plus 43 Windows adaptations involving real web apps, desktop apps, OS file I/O, and multi-application workflows.
- Each task comes with initial-state setup and an execution-based evaluation script for reproducibility.
- The benchmark required 134 unique evaluation functions, which the authors emphasize as a major jump over prior work.
- Reported model performance ranges from 0.99% to 12.24%, while workflow tasks involving multiple apps reach only 6.57% at best.
- The paper reports 72.36% human success versus 12.24% for the best model at the time of publication.
- The paper reports that accessibility trees and Set-of-Mark can help but also sometimes mislead models, and that higher screenshot resolution plus longer trajectory history can materially improve results.
- The error analysis highlights poor GUI grounding, repetitive actions, noise from unexpected windows, and weak operational knowledge of common apps.
- The arXiv page notes publicly available code, environment, baselines, and data.

## Entities

- Authors: Tianbao Xie, Danyang Zhang, Jixuan Chen, Xiaochuan Li, Siheng Zhao, Ruisheng Cao, Toh Jing Hua, Zhoujun Cheng, Dongchan Shin, Fangyu Lei, Yitao Liu, Yiheng Xu, Shuyan Zhou, Silvio Savarese, Caiming Xiong, Victor Zhong, Tao Yu
- Platforms: Ubuntu, Windows, macOS
- Concepts: computer-use agents, multimodal agents, execution-based evaluation, GUI grounding

## My Notes

- This is one of the strongest benchmark additions for understanding how far current agents remain from competent computer assistants.
- It is useful whenever this KB needs a realistic reference point for multimodal and desktop-task evaluation.
- The paper is also a design document for why computer-use agents need better grounding, memory, and recovery behavior rather than just stronger base models.

## Open Questions

- Which of OSWorld's design choices should be treated as essential for credible computer-use benchmarking?
- How should this repo compare web-only agent benchmarks against full computer-use benchmarks?

## Related

- [[computer-use]]
- [[benchmark-integrity]]
- [[ai-agent-evals]]

## Source Text

Authors:Tianbao Xie, Danyang Zhang, Jixuan Chen, Xiaochuan Li, Siheng Zhao, Ruisheng Cao, Toh Jing Hua, Zhoujun Cheng, Dongchan Shin, Fangyu Lei, Yitao Liu, Yiheng Xu, Shuyan Zhou, Silvio Savarese, Caiming Xiong, Victor Zhong, Tao Yu
    View PDF
            Abstract:Autonomous agents that accomplish complex computer tasks with minimal human interventions have the potential to transform human-computer interaction, significantly enhancing accessibility and productivity. However, existing benchmarks either lack an interactive environment or are limited to environments specific to certain applications or domains, failing to reflect the diverse and complex nature of real-world computer use, thereby limiting the scope of tasks and agent scalability. To address this issue, we introduce OSWorld, the first-of-its-kind scalable, real computer environment for multimodal agents, supporting task setup, execution-based evaluation, and interactive learning across various operating systems such as Ubuntu, Windows, and macOS. OSWorld can serve as a unified, integrated computer environment for assessing open-ended computer tasks that involve arbitrary applications. Building upon OSWorld, we create a benchmark of 369 computer tasks involving real web and desktop apps in open domains, OS file I/O, and workflows spanning multiple applications. Each task example is derived from real-world computer use cases and includes a detailed initial state setup configuration and a custom execution-based evaluation script for reliable, reproducible evaluation. Extensive evaluation of state-of-the-art LLM/VLM-based agents on OSWorld reveals significant deficiencies in their ability to serve as computer assistants. While humans can accomplish over 72.36% of the tasks, the best model achieves only 12.24% success, primarily struggling with GUI grounding and operational knowledge. Comprehensive analysis using OSWorld provides valuable insights for developing multimodal generalist agents that were not possible with previous benchmarks. Our code, environment, baseline models, and data are publicly available at this https URL.

Comments:
          51 pages, 21 figures

Artificial Intelligence (cs.AI); Computation and Language (cs.CL)

Cite as:
          arXiv:2404.07972 [cs.AI]

(or
              arXiv:2404.07972v2 [cs.AI] for this version)

https://doi.org/10.48550/arXiv.2404.07972

Submission history From: Tianbao Xie [view email]                  [v1]
        Thu, 11 Apr 2024 17:56:05 UTC (40,911 KB)
    [v2]
        Thu, 30 May 2024 08:55:12 UTC (40,913 KB)
