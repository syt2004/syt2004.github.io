---
title: "BRIDGE: Boosting Representation Fidelity via Shape-Informed Distance-field Geometric Encoding for Multimodal Object Detection"
date: 2027-01-01 00:00:00 +0800
submitted_at: 2026-11-07
updated_at: 2026-11-10
selected: false
pinned: true
pub: "Under Review"
pub_date: "2027"
submission_venue: "CVPR 2027 Conference Submission"
keywords: "Multimodal Object Detection; Oriented Object Detection; Geometric Encoding; Signed Distance Fields; Cross-Modal Fusion"
abstract: >-
  Multimodal object detection seeks to exploit complementary information across heterogeneous sensing modalities for robust object perception. Different modalities reveal distinct structural and geometric cues of the same object through different imaging principles. However, heterogeneous imaging mechanisms complicate cross-modal geometric interaction, while complex object geometries remain difficult to capture with shapes parameterized by only a few parameters. In this paper, we introduce BRIDGE, a novel geometric representation framework for object detection that moves beyond predefined shapes toward continuous geometry modeling. Specifically, we observe that Signed Distance Fields (SDF) map heterogeneous modalities into a shared continuous space while preserving fine-grained geometry. We therefore introduce Continuous Geometry Encoding (CGE) to represent objects beyond predefined parametric shapes. We further propose Fourier-Conditioned Geometry Fusion (FCGF) to preserve informative geometric cues while exploiting cross-modal complementarity through frequency-conditioned residual refinement. Finally, we dive into SDF optimization during training and introduce Gradient-Modulated Loss (GML). GML suppresses gradients from well-fit regions while strengthening corrections for severe geometric deviations. Mathematical analysis and experiments show that SDF provides bounded and spatially distributed optimization signals for stable multimodal geometric learning. BRIDGE achieves 85.0% mAP on DroneVehicle, outperforming existing multimodal detectors and demonstrating the effectiveness of continuous geometry modeling.
cover: /assets/images/covers/bridge.jpg
authors:
  - Qi Ming
  - Haoyang Su
  - Liuqian Wang
  - Wei Lu
  - Ruidong Xing
  - Yutong Shen
  - Xudong Zhao
  - Yufei Guo
  - Aleksandra Pizurica
links:
  OpenReview: https://openreview.net/forum?id=k4DnxalKZz
---
