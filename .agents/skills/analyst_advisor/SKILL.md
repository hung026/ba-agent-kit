---
name: analyst-advisor
description:
  The thinking engine for ambiguous or complex inputs. Use this skill whenever a user presents
  a vague idea, open-ended business question, or any request that requires deeper analysis before
  execution. This skill performs elicitation, critical thinking, blind spot detection, and
  solution proposals — but only for medium-to-high complexity problems. Simple questions are
  answered directly without activating the pipeline.
  Trigger on phrases like "Cho tôi biết...", "Hãy đề xuất...",
  " Hãy phân tích...", "Làm thế nào...", "Gợi ý cho tôi..."or any input where scope, actors, or outcomes are unclear.
---

# analyst_advisor SKILL

## Purpose

Transform vague or complex inputs into clear, critically-examined analysis with actionable
proposals — through structured elicitation, blind spot detection, and solution design.

**This skill does NOT:**
- Write formal documents (→ use DOC_FACTORY)
- Perform market/competitor research (→ hand off to RESEARCH_ANALYST)
- Generate diagrams (→ use DIAGRAM_CREATOR)

**This skill DOES:**
- Decide if the input needs deep analysis or a direct answer
- Ask sharp, prioritized questions to uncover hidden requirements
- Surface blind spots, risks, and unstated assumptions
- Propose solution directions with trade-off analysis
- Determine when external research is needed and hand off to research_analyst SKILL

---

## Pipeline Overview

```
Receive input
    │
    ▼
Gate: Complexity-Check
    │
    ▼
Is it simple? (factual, clear, no ambiguity) ──Yes──► Answer directly. Done.
    │ No
    ▼
Classify: Medium or Complex
    │
    ▼
Stage 1: Elicit (ask up to 5 critical questions)
    │
    ├─ Need external data? ──Yes──► Hand off to research_analyst SKILL, resume after
    │
    ▼
User confirm to continue? (MUST HAVE)
    │
    ├─ Confirm ──No──► End skill
    │
    ▼   
Stage 2: Critical Analysis (blind spots, risks, assumptions)
    │
    ├─ New critical gap found? ──Yes──► Loop back to Stage 1
    ├─ Need domain research? ──Yes──► Hand off to research_analyst SKILL, resume after
    │
    ▼
Stage 3: Solution Proposal (1-3 options + recommendation)
    │
    ▼
Output + Recommended Next SKILL
```

At any stage, if external data is needed → **hand off to research_analyst SKILL** and resume after results are available.

---

## Pipeline Decision Rules

- **Gate → Direct Answer** if: input is Simple (factual, zero ambiguity, well-defined)
- **Stage 1 → research_analyst SKILL** if: elicitation reveals a need for external data
- **Stage 2 → Stage 1** if: analysis surfaces a critical gap not yet asked about
- **Stage 2 → research_analyst SKILL** if: blind spot detection reveals an unknown domain/regulation
- **Never skip Stage 2** for Complex inputs — unexamined blind spots are the highest-risk failure mode

---

## Stage Reference Files

Read each file **only when entering that stage**. Do not preload.

| Stage | Reference File | Read When | Goal |
|-------|----------------|-----------|------|
| Gate  | `stage/gate/complexity-check.md` | Input received, before anything else | Determine if the input needs deep analysis or a direct answer |
| 1     | `stage/stage1/01-elicitation.md` | Gate classified input as Medium or Complex | Surface hidden requirements, challenge assumptions, fill critical knowledge gaps. |
| 2     | `stage/stage2/02-critical-analysis.md` | Elicitation is complete or sufficiently addressed | Analyze the problem from angles the stakeholder has not considered. |
| 3     | `stage/stage3/03-solution-proposal.md` | Analysis is complete, ready to propose | Synthesize elicitation and analysis into actionable proposals. |

---