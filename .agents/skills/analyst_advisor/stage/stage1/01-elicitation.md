# Stage 1 — Elicitation

**Goal:** Surface hidden requirements, challenge assumptions, fill knowledge gaps.

## Mindset

Not form-filling — **challenge the framing of the problem itself.**
Before any question, consider: What are they assuming? What impact haven't they considered? What happens at the edges? Who's affected but not mentioned? What does success mean — measurably?

## Step 1: Prioritize Gaps

**P1 — Blocking** (must resolve): Actor undefined, outcome undefined, intent ambiguous
**P2 — Scoping** (needed before analysis): Scope unclear, constraints unknown, trigger undefined
**P3 — Refinement** (can assume if unanswered): Edge cases, NFRs, secondary actors

> Resolve P1 before P2. Never ask P3 in the first round.

## Step 2: Question Strategy by Ambiguity Type

- **Terminology** → "When you say [term], give me a concrete example?"
- **Product type** → "Is it mobile or web version? Is it intergrated with any existing system?
- **Entry point** → "How user access this feature? Does it linked to any existing feature"
- **Scope** → "Does this include [adjacent thing]? What happens if [unaddressed condition]?"
- **Intent** → "What problem does this solve? If we couldn't build [stated solution], what instead?"
- **Assumption** → "Is [assumed fact] based on data or expectation? What if it's wrong?"

> Only ask if there are no information about these in the input.
> The questions vary based on input, not fixed

## Step 3: Execution Rules

- Around 5 questions per round. Group related ones. State reasoning. Don't lead the witness.

**Format:**
```
1. [Question1]
2. [Question2]
```
* Can add 2-3 options for each question, but not required. Prefer answer from user.


## Step 4: Non-Answers
- P1 unanswered → rephrase and ask again. Still nothing → escalate.
- P2/P3 unanswered → document as assumption:
  `Assumption [ID]: [statement] | Basis: [why reasonable] | Risk if wrong: [what breaks] | Owner: [who validates]`

## Step 5: Research Hand-off

If gaps need market data, regulations, or unfamiliar domain context → hand off to `skills\research_analyst\SKILL.md`

## Exit

Complete when: All P1 resolved or assumed. All P2 resolved, assumed, or flagged for research_analyst SKILL. Assumptions documented.