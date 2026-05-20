---
name: doc-factory
description: "The document generation engine. Use this skill when the user requests any formal BA document — BRD, Use Case Specification, or User Story. Triggers on: 'Viết tài liệu', 'viết BRD', 'Viết user stories', 'Viết đặc tả', or any request to produce BA/product documentation even without naming the doc type. Always use this skill before writing any structured requirements document — do not freehand it."
---

# SKILL_05 — DOC_FACTORY

## Purpose

Transform requirements into professional BA documents — by defining scope, deep analysis, then writing from the correct template.

---

## Pipeline

```
Input (chat / text / file)
        │
        ▼
[Gate] Assess Input Readiness
        │
        ├─ Too vague       → Handoff to SKILL_01
        ├─ Missing data    → Handoff to SKILL_02
        └─ Sufficient ─────────────────────────┐
                                               │
                                               ▼
                                     Stage 1: Define Scope
                                     → List use cases, edge cases, NFRs
                                     → Ask user to confirm + choose doc type
                                               │
                                               ▼ (user confirms)
                                     Stage 2: Analysis
                                     → Deep thinking before writing
                                     → Edge cases, blindspots, risks
                                     → Load knowledge_base for more guidance
                                               │
                                               ▼
                                     Stage 3: Draft Document
                                     → Load template
                                     → Write following template + analysis
                                               │
                                               ▼
                                     Stage 4: Self-Review
                                               │
                                               ▼
                                            Output
```

---

## Input Gate: Assess Readiness

| Input State | Action |
|---|---|
| Vague, no clear requirements | "Recommend **SKILL_01** to analyze first." |
| Requirements exist but need research | "Recommend **SKILL_02** to gather data first." |
| Input from SKILL_01 / SKILL_02 | Skip gate → Stage 1 |
| Clear enough | → Stage 1 |

Minimum bar: actors identified + core functionality described + rough scope exists.

---

## Stage Files

| Stage | File | What it does |
|---|---|---|
| Stage 1 | `stage/s1-scope.md` | Define scope → confirm with user |
| Stage 2 | `stage/s2-analysis.md` | Deep analysis, edge cases, blindspots |
| Stage 3 | `stage/s3-draft.md` | Load template + write document |
| Stage 4 | `stage/s4-review.md` | Self-review before output |

**Read each stage file before executing that stage.**

---

## Knowledge Base

Each doc type has its own knowledge base file. Load it at the start of **Stage 2**:

| Doc Type | Knowledge Base |
|---|---|
| BRD | `knowledge_base/BRD_knowledge_base.md` |
| Use Case Spec | `knowledge_base/UC_knowledge_base.md` |
| User Story | `knowledge_base/US_knowledge_base.md` |

These files contain: key quality criteria, common mistakes, and lesson learnt from past docs. **Treat them as primary guidance — they override generic intuition.**

---

## Template Registry

Load the correct template at **Stage 3**:

| Doc Type | Template |
|---|---|
| BRD | `template/BRD/BRD_template.md` |
| Use Case Spec | `template/Use Case/Usecase_template.md` |
| User Story | `template/User Story/User_story_template.md` |

If user requests a doc type with no template → ask them to provide a format.

---

## Output Rule

Only output the final document + notes if needed.
No intro sentences. No explanation. No "here is your document".
Save them into the `.agents\output\document\` folder.