# Gate — Complexity Check

Classify input before analysis. Prevents over-engineering simple requests.

## Criteria

**Simple** (all true → answer directly, skip pipeline):

- Single question, one clear answer, no ambiguity
- No hidden trade-offs or multi-stakeholder impact

**Medium** (any true → enter pipeline, may skip sub-steps):

- 2–3 possible interpretations, or scope has edge cases
- Trade-offs exist but solution direction is somewhat clear

**Complex** (any true → full pipeline, all stages mandatory):

- Multiple stakeholders with conflicting needs
- Vague/unbounded scope, or significant regulatory trade-offs
- Cross-system impact, or unstated assumptions that could change everything

## Decision Tree

```
Can it be answered in 1-2 paragraphs with no ambiguity?
├─ Yes → Hidden trade-off or multi-party impact? → No: SIMPLE / Yes: MEDIUM
└─ No  → Multiple stakeholders, unclear scope, or regulatory? → Yes: COMPLEX / No: MEDIUM
```

## Output Profile — set here, carried to Stage 3

The Gate's classification is also the **output depth decision**. Record it and hand it to Stage 3.

| Class   | Profile        | Stage 3 prints                                                |
| ------- | -------------- | ------------------------------------------------------------- |
| Simple  | — (no pipeline) | a direct answer, 1–2 paragraphs                               |
| Medium  | **LITE**       | Summary · Solution · Blind spot (≤3 dòng) · Open question      |
| Complex | **FULL**       | the above + Risk · Assumptions · Confirmed inputs             |

Default to LITE when the two classes feel equally arguable. An over-short output the user can ask
to expand costs one follow-up; an over-long one wastes the whole read.

Escalate LITE → FULL mid-run **only** if Stage 2 surfaces ≥3 surviving 🔴 findings. Say so in one
line when it happens; never escalate silently.

---

Simple / Medium / Complex are **internal** labels. What the user sees is one plain Vietnamese line:

`**Complexity: [Thấp / Trung bình / Cao]** — [một câu, nói vì sao, bằng lời thường]`

Say the reason in concrete terms, not category names:
"nhiều máy, nhiều hệ thống, nhiều edge case (mất mạng, dùng 2 máy cùng lúc) → phải phân tích kỹ" beats "cross-system, nhiều edge case, ảnh hưởng accuracy".

- Simple → answer directly. Do not enter pipeline.
- Medium/Complex → proceed to Stage 1.
