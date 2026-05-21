# Stage 3 — Solution Proposal

**Goal:** Synthesize findings into concrete proposals with trade-offs and a recommendation.

---

## Mindset

- 1–3 options (not scope variations)
- One conservative, one ambitious minimum
- No straw man options
- Lead with the recommendation — don't bury it

---

## Step 1: Build Each Option

For each option, output this block:

```
### Option [N]: [Name]

**Approach:** [2–3 sentences. What it is, how it works.]

**Pros:**
- [concrete benefit]
- [concrete benefit]

**Cons:**
- [concrete limitation]
- [concrete limitation]

**Risks:** [🔴 Critical / 🟡 Important] — [1-line description per risk, drawn from Stage 2 findings]

**Effort / Time-to-value / Risk Level:** [Low|Med|High] / [weeks/months] / [Low|Med|High]

**Best for:** [the context or constraint where this option wins]

**Sources:** [URL or "No external data used"] ← required if data came from research_analyst SKILL
```
---

## Step 3: Recommendation

Output exactly this block — keep it short:

```
## ⭐ Recommendation: Option [N] — [Name]

**Why:** [2–3 sentences. Reference constraints + key Stage 2 findings.]

**Condition to reconsider:** [What would make a different option better]

**What this doesn't solve:** [Honest gaps — 1–3 bullet points]
```

---

## Step 4: Next SKILL Routing

| Situation | Next |
|---|---|
| Ready for documentation | → doc_factory SKILL |
| Need impact assessment | → impact_analyzer SKILL |
| Need diagrams | → diagram_creator SKILL |
| Need more data | → research_analyst SKILL |
| Stakeholder must decide first | → Wait |

---

## Quality Check

- [ ] All Stage 1 questions addressed?
- [ ] All 🔴 Stage 2 findings reflected in at least one option's risks?
- [ ] Options are genuinely different?
- [ ] No fabricated data — sources cited if research_analyst SKILL was used?