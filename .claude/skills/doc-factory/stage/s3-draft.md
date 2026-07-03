# Stage 3 — Draft Document

**Goal:** Write the complete document using the correct template, informed by Stage 2 analysis.

---

## 3.1 Load Template

From the template registry in SKILL.md, load the file for the confirmed doc type.

**Follow the template structure exactly.** Do not invent sections. Do not skip sections. Do not reorder.

If a section has no content from the input → write "N/A". Never leave blank.

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

## 3.4 API & Database mapping

The `API mapping` and `Database mapping` columns are filled **directly from the Data & Backend Analysis of Stage 2 (section 2.3)** — not guessed at draft time.

For each row of the table:

- **Trường UI / Mô tả**: the UI field or one step of the business flow.
- **Kiểu / Validate**: component type + validation rule.
- **API mapping**: `[purpose in short] · `[METHOD] [/path]`` — taken from the "API (method + path)" of the Stage 2 table for that step.
- **Database mapping**: ``Bảng `[table]`: [field], [field]`` — taken from the "Entity · key fields" of the Stage 2 table, with the READ/WRITE direction reflected by which step the row belongs to (load = READ, submit = WRITE, check = READ-validate).

**Rules:**

- **Every row that touches data must show BOTH its API and its DB mapping.** If a step reads a dropdown, name the table it reads from. If a step submits, name the table + fields it writes.
- **Pure client-side steps → leave the mapping cells empty** (per the template rule "only add if really necessary"). Do not invent an endpoint for navigation or static screens.
- **Mark proposals.** Table/field/endpoint names are analyst proposals, not a confirmed schema. Add one line under the table: `> API & Database mapping là đề xuất, cần Tech Lead / BE xác nhận.` — write it once per feature that has a mapping table.
- **Consistency check while writing.** The same entity keeps the same table name and field names across every UC/US. The same action keeps the same endpoint. If UC-01 saves to `customer.phone`, UC-05 must not rename it to `user.phone_number`.

**Doc-type routing:**

- **SRS / User Story** → fill the `Mô tả giao diện` table (section 7 / section 5) as above.
- **BRD** → BRD has no UI table. Route the Stage 2 Data & Backend findings into `2.4 Yêu cầu kỹ thuật` under the **Backend/Cloud/Sync** bullet: state what core data is stored and what is read, at a business-requirement level (proposed entities + key data, marked as proposal). Do not force a UI mapping table into a BRD.

---

## 3.5 Cross-Reference Completeness

Before finishing the draft, verify:
- Every UC from the confirmed scope in Stage 1 is documented
- Every gap from Stage 2 is either addressed or explicitly marked as open question
- Every edge case from Stage 2 appears in at least one section

→ Proceed to Stage 4.