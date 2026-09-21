# Stage 1 — Elicitation

**Goal:** Surface hidden requirements, challenge assumptions, fill knowledge gaps.

## Mindset

Not form-filling — **challenge the framing of the problem itself.**
Before any question: What are they assuming? What impact haven't they considered? What happens at the edges? Who's affected but not mentioned? What does success mean — measurably?

## Step 1: Prioritize Gaps

**P1 — Blocking** (must resolve): Actor undefined, outcome undefined, intent ambiguous
**P2 — Scoping** (needed before analysis): Scope unclear, constraints unknown, trigger undefined
**P3 — Refinement** (assume if unanswered): Edge cases, NFRs, secondary actors

> Resolve P1 before P2. Never ask P3 in the first round.

## Step 2: Ask or Assume

Before asking, check: can this be assumed reasonably from context or convention?

- Yes → assume it, record it, move on. Don't spend a question on it.
- No → ask.

Ask as many as genuinely unclear — no cap. But every question must earn its place: a question whose
answer wouldn't change the analysis is noise.

## Step 3: Question Strategy by Ambiguity Type

- **Terminology** → "Khi bạn nói [term], cho một ví dụ cụ thể?"
- **Product type** → "Mobile hay web? Có tích hợp hệ thống nào đang chạy không?"
- **Entry point** → "User vào tính năng này từ đâu? Có liên kết với tính năng nào sẵn có?"
- **Scope** → "Có bao gồm [adjacent thing]? Nếu [unaddressed condition] thì sao?"
- **Intent** → "Cái này giải quyết vấn đề gì? Nếu không làm được [stated solution] thì thay bằng gì?"
- **Assumption** → "[assumed fact] dựa trên dữ liệu hay kỳ vọng? Nếu sai thì sao?"

> Only ask what the input doesn't already answer. Questions vary by input — not a fixed list.

## Step 4: Question Format

Every question carries its stake. Without it the user can't tell which ones matter.

```
1. ❓ **[Câu hỏi]**
   → *Ảnh hưởng: [phân tích thay đổi thế nào tùy câu trả lời]*
```

- Group related questions. Terse phrasing — one line per question.
- ❓ is the only icon allowed in this stage. Same icon vocabulary as Stage 3 — see its
  *Semantic icons* table.
- Offer 2–3 options only when it speeds the answer. Prefer the user's own words.
- Don't lead the witness.
- Ask in plain Vietnamese, per *Language & Wording* in `SKILL.md`. A question the user must
  decode before answering wastes the round: "dùng 2 máy cùng lúc thì tính 1 lần hay cộng 2 lần?"
  beats "chính sách dedupe khi concurrent multi-device usage?".

## Step 4b: Term Ledger (internal — carry to Stage 3)

While reading the input, record two lists. They govern wording for the entire run.

- **User's terms** — every domain/technical word the user typed themselves, verbatim.
  These are locked: never translated, never paraphrased, in any later stage.
- **My terms** — every concept *you* introduce that the user did not. Each needs a plain
  Vietnamese gloss the first time it is printed (rule 4 of *Language & Wording*).

Keep the ledger updated as Stage 2 and Stage 3 introduce new concepts.

## Step 5: Confirm Gate (mandatory)

After the questions, stop and wait. Do not enter Stage 2 unconfirmed.
Two valid confirmations:

- User answers the questions → proceed with the answers.
- User says to assume / skip → proceed, record every unanswered item as an assumption.

## Step 6: Non-Answers

- P1 unanswered → rephrase, ask again. Still nothing → escalate.
- P2/P3 unanswered → document as assumption:
  `Assumption [ID]: [statement] | Basis: [why reasonable] | Risk if wrong: [what breaks] | Owner: [who validates]`

## Step 7: Research Hand-off

Gaps needing market data, regulations, or unfamiliar domain context → hand off to `research-analyst` SKILL.

## Exit

All P1 resolved or assumed. All P2 resolved, assumed, or flagged for `research-analyst`. Assumptions documented. Confirm gate passed.
