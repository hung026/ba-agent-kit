# Stage 3 — Draft Document

**Goal:** Write the complete document using the correct template, informed by Stage 2 analysis.

---

## 3.1 Load Template

From the template registry in SKILL.md, load the file for the confirmed doc type.

**Follow the template structure exactly.** Do not invent sections. Do not skip sections. Do not reorder.

If a section has no content from the input → write "TBD" or "N/A — [reason]". Never leave blank.

---

## 3.2 Writing Rules

**Completeness over brevity.**
Every use case needs: actor, preconditions, main flow, alternate flows, postconditions, edge cases.
Every functional requirement needs: description, acceptance criteria, priority.

**No ambiguous language.**
Replace: "quickly", "easily", "appropriately", "as needed", "etc."
With: specific values, measurable criteria, explicit conditions.

**Carry forward everything from Stage 2.**
- Gaps found → write as open questions or TBD with owner
- Edge cases → document in the appropriate section of each use case
- Assumptions → list in the Assumptions section of the doc
- Sensitive data flags → place inline next to the relevant field/data

**Numbers must have sources.**
- Use the annotation format from Stage 2. Never invent.

**ID Numbering Rule:** 
- For each new Use Case, **MUST** reset the numbering of all internal IDs (such as AF-01, BR-01, EF-01) back to 01. Do not continue the numbering sequence from previous Use Cases.

---

## 3.3 Section-by-Section Mindset

As you write each section, hold this in mind:

- **Dev reading this:** Will they know exactly what to build? Or will they have to guess?
- **QA reading this:** Can they write test cases directly from this? Or is it too vague?
- **Stakeholder reading this:** Is the business value of each item clear?

If any answer is "no" or "maybe" → rewrite that section before moving on.

---

## 3.4 Cross-Reference Completeness

Before finishing the draft, verify:
- Every UC from the confirmed scope in Stage 1 is documented
- Every gap from Stage 2 is either addressed or explicitly marked as open question
- Every edge case from Stage 2 appears in at least one section

→ Proceed to Stage 4.