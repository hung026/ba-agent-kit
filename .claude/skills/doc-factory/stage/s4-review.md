# Stage 4 — Self-Review

**Goal:** Catch issues before output. Answer each question — don't just tick boxes.

---

## Structure

- Does the doc follow the template exactly? Any sections missing or reordered?
- Are there any blank sections that should have content?

## Completeness

- Does every use case have: actor, preconditions, main flow, alternate flows, postconditions?
- Does every functional requirement have acceptance criteria?
- Is every UC from the Stage 1 confirmed scope present in the doc?

## Edge Cases

- Are all edge cases from Stage 2 documented in the relevant sections?
- Are error states and fallbacks written out — not just implied?

## Clarity

- Is there any ambiguous language remaining? ("quickly", "easily", "as needed", etc.)
- Would a developer be able to build this without asking clarifying questions?
- Would QA be able to write test cases directly from this?

## Assumptions & Open Questions

- Are all Stage 2 assumptions listed in the doc's Assumptions section?
- Are all open questions explicitly flagged with an owner or "TBD"?

## Data & Numbers

- Do all numeric values have source annotations or formula?
- Are all sensitive data fields flagged with the legal check note?
- For the steps related to save/create/delete/..., is there any details saying where the data to be saved, or how it to be deleted?

## ID Numbering
- Do all internal IDs (e.g., AF-01, BR-01, EF-01) correctly restart from 01 at the beginning of each new Use Case?
- Are there any IDs that incorrectly continue the numbering sequence from a previous Use Case?

---

## Fix Before Output

If any question above has a "no" → fix it now. Do not output a doc with known gaps.

---

## Output

Deliver the final document only.
No intro. No explanation. No "here is your BRD".
Add notes only if there are critical open questions the user must resolve.