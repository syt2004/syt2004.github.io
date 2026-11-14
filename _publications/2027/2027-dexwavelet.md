---
title: "DexWavelet: Wavelet-Domain Action Refinement for Dexterous Embodied Policies"
date: 2026-11-05 12:00:00 +0800
submitted_at: 2026-11-05
updated_at: 2026-11-13
selected: false
pinned: true
pin_order: 0
pub: "Under Review"
pub_date: "2027"
submission_venue: "CVPR 2027 Conference Submission"
keywords: "Dexterous Manipulation, Vision-Language-Action Models, Flow Matching"
abstract: >-
  Embodied foundation models with flow-matching action heads achieve high success rates with parallel-jaw grippers, but their success rates drop markedly on dexterous hands. Existing methods narrow this gap with more data, hand-specific designs or post-training, all of which are costly. We analyze the failures of a strong flow-matching policy and find that most failures occur when the hand closes before the arm reaches a suitable pose. These arm errors differ across frequency bands. The coarse trajectory in the low-frequency band is slightly attenuated, while the fine motion in the high-frequency band is misaligned with the demonstrations. Based on this analysis, we propose DexWavelet, a lightweight module that refines the output of a flow-matching action head in the wavelet domain. A low-band adapter restores the coarse trajectory. A high-band corrector removes the misaligned fine motion with a learnable undecimated wavelet and per-band temporal self-attention. DexWavelet requires no additional data or pretraining. On the RoboCasa GR1 tabletop benchmark, it achieves the highest average success rate among the compared methods, including methods that rely on large-scale pretraining or human videos. On six real-world tasks with two 7-DoF arms and two 20-DoF dexterous hands, DexWavelet achieves the highest success rate on every task and surpasses GR00T-N1.7, which is pretrained on about 20K hours of human video, by 6.7 points on average.
cover: /assets/images/covers/dexwavelet.png
authors:
  - Changchuan Yang
  - Haoxuan Xu
  - Tianfu Li
  - Ziyu Jian
  - Yunfan Lou
  - Yutong Shen
  - Yaoyu Yang
  - Wenbo Chen
  - Guanzhong Tian
links:
  OpenReview: https://openreview.net/forum?id=fKUxd789PJ
  PDF: https://openreview.net/pdf?id=fKUxd789PJ
---
