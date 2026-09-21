# Stage 2 — Critical Analysis

**Role:** Internal thinking engine. The reasoning stays hidden — only its **conclusions** reach Stage 3.

**Goal:** Find what the stakeholder *didn't* consider. Blind spots, risks, bottlenecks, hidden dependencies.

## Step 1: Blind Spot Scan

Run every lens. Produce a finding or mark "No issue."

| #  | Lens                               | Check                                                                                  |
| -- | ---------------------------------- | -------------------------------------------------------------------------------------- |
| 1  | **Failure Modes**            | What breaks mid-flow? Missing rollback? Partial state?                                 |
| 2  | **Hidden Stakeholders**      | Who else is affected? Who must approve or adjust?                                      |
| 3  | **Dependency Risks**         | What existing behavior does this break?                                                |
| 4  | **Regulatory / Compliance**  | Data privacy? Audit trail? Financial rules?                                            |
| 5  | **Scalability**              | Holds at 10x? Rate limits? Graceful degradation?                                       |
| 6  | **Timing**                   | Wrong order of rollout? Depends on something not ready? Seasonal or deadline pressure? |
| 7  | **Legacy Data**              | Existing records that don't fit the new model? Migration or backfill needed?           |
| 8  | **Real Behavior vs Assumed** | Will users actually do this? What do they do today instead, and why?                   |
| 9  | **Run Cost After Launch**    | Who operates it daily? Support load? Manual steps that don't scale?                    |
| 10 | **Habit Change**             | Whose workflow must change? Will they resist? Training or migration period?            |

## Step 2: Non-Obviousness Test

Filter every finding:

> Would the stakeholder almost certainly have thought of this already?

Yes → drop it. It is not a blind spot, it is a checklist item. Restating the obvious buries the real findings.

Keep it if any is true: it contradicts something stated, it involves a party never mentioned,
it only appears after a condition the stakeholder hasn't imagined, or it costs more later than it looks now.

## Step 3: Assumption Stress Test

For each assumption from Stage 1:

- **Invert** — what if the opposite is true?
- **Blast radius** — how bad if wrong at scale?
- **Validate** — fastest way to confirm?

## Step 4: Severity Rating

- 🔴 **Critical** — blocks the solution, must be addressed before Stage 3
- 🟡 **Important** — affects quality/scope, address in the Stage 3 proposal
- 🟢 **Minor** — drop; do not carry to Stage 3

## Step 5: Loop-back trigger

Return to Stage 1 if: a 🔴 finding reveals an uncovered gap, an inverted assumption changes the problem,
or a newly required stakeholder appears.

## Step 6: Rank and cap the hand-off

10 lenses can produce 10 findings. Stage 3 cannot print 10 findings and stay readable, so the cut
happens **here** — not by Stage 3 improvising.

Score every survivor on two axes, then sort:

| Axis        | Question                                                          |
| ----------- | ----------------------------------------------------------------- |
| Severity    | 🔴 blocks the solution · 🟡 affects quality or scope              |
| Surprise    | How far is this from what the user already wrote or clearly knows? |

**Carry at most 5 findings forward.** Rules for the cut:

- Every 🔴 goes forward, always. If there are more than 5 🔴, that is the signal to escalate
  LITE → FULL, not to drop one.
- 🟡 fills the remaining slots, highest surprise first.
- 🟡 that didn't make the cut is not lost and not printed as its own row — fold it into the
  Solution steps or into the Risk table as a clause. If it survives neither, it was 🟢 in disguise.
- Two findings with the same root cause = **one** finding. Merge before counting.

## Step 7: Hand-off format

For each of the ≤5 carried findings, hand over exactly four fields — nothing else, no reasoning trail:

`[finding] | [consequence if ignored] | [severity] | [how the proposal handles it: resolved / still open / pending question]`

Any 🔴 with no handling must become a question in Stage 3, not disappear.

Write both `[finding]` and `[consequence]` the way the user will read them — plain Vietnamese, per *Language & Wording* in `SKILL.md`. State the consequence as something that visibly happens to a real person ("con hết giờ máy này, chạy sang máy khác chơi tiếp"), not as a category label ("enforcement không đồng bộ giữa các device"). Anything you name here that the user never said enters the term ledger and needs its gloss at first print.

## Exit condition

All 10 lenses run → non-obviousness filter applied → assumptions stress-tested → severities rated →
duplicates merged → **at most 5 findings carried** → every 🔴 has a handling or a question.
