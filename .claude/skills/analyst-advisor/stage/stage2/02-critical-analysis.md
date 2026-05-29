# Stage 2 — Critical Analysis

**Role:** Internal thinking engine. Not shown to user directly — but every finding here must surface in Stage 3.

**Goal:** Find what the stakeholder *didn't* consider. Surface blind spots, risks, bottlenecks, and hidden dependencies.

## Step 1: Blind Spot Scan

For each category, produce a finding or mark "No issue."

| # | Category | Check |
|---|----------|-------|
| 1 | **Failure Modes** | What breaks mid-flow? Missing rollback? Partial state? |
| 2 | **Hidden Stakeholders** | Who else is affected? Who must approve or adjust? |
| 3 | **Dependency Risks** | What existing behavior does this change break? |
| 4 | **Regulatory / Compliance** | Data privacy? Audit trail? Financial rules? |
| 5 | **Scalability** | Holds at 10x volume? Rate limits? Graceful degradation? |

## Step 2: Assumption Stress Test

For each assumption from Stage 1:
- **Invert** — what if the opposite is true?
- **Blast radius** — how bad if wrong at scale?
- **Validate** — fastest way to confirm?

## Step 3: Severity Rating

- 🔴 **Critical** — blocks solution, must address before Stage 3
- 🟡 **Important** — affects quality/scope, address in Stage 3 proposals
- 🟢 **Minor** — note for future

## Step 4: Loop-back trigger

Return to Stage 1 if: a 🔴 finding reveals an uncovered gap, an inverted assumption changes the problem, or a new required stakeholder appears.

## Exit condition

All 5 blind spots checked → assumptions stress-tested → findings rated → no unaddressed 🔴.