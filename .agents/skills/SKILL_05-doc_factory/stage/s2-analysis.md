# Stage 2 — Analysis

**Goal:** Think deeply before writing. Surface edge cases, blindspots, and risks the input didn't mention.

**First:** Load `knowledge_base/{DOC_TYPE}_knowledge_base.md` for the confirmed doc type. Apply its criteria throughout this stage.

---

## 2.1 Multi-Lens Analysis

For each use case in confirmed scope, run through all three lenses:

| Lens | Questions to answer |
|---|---|
| **Dev** | What's ambiguous that a developer would get stuck on? What integration points are undefined? What data flows are missing? |
| **QA** | What's the acceptance criteria? What would fail in testing? What's untestable as written? |
| **User** | What would confuse the end user? What happens in the UI during errors or loading? What if the user does something unexpected? |

Document every gap found. These feed directly into the draft.

---

## 2.2 Edge Case Sweep

For each use case, systematically check:

**Business edge cases:**
- Empty / zero-data states — what shows when there's nothing?
- Boundary conditions — min/max values, limits
- Concurrent operations — two users acting on the same item simultaneously
- Permission changes — user loses access mid-flow
- State transitions — what happens if a step is skipped or retried?

**Technical edge cases:**
- Network failure / timeout
- Server errors (500, 503, rate limiting)
- Invalid or malformed input
- Session expiry mid-flow
- Device / browser edge cases (if applicable)

**For each edge case found, document:**
```
Scenario: [What happens]
Detection: [How system knows]
User Feedback: [What user sees]
System Action: [What system does]
Fallback: [If primary handling also fails]
```

---

## 2.3 Blindspot Check

Ask these questions explicitly — if you can't answer them, flag as open question:

- What happens if this feature is used at 10x expected volume?
- Are there regulatory or data privacy implications? (see sensitive data list below)
- What external systems does this touch — and what if they're down?
- Does this conflict with any existing feature or flow?
- What assumptions is this doc making that haven't been validated?

---

## 2.4 Number & Metric Sourcing

Every numeric threshold or KPI must be annotated:

```
Response time ≤ 200ms   ← Source: PRD section 3.2
Uptime ≥ 99.9%          ← Source: Industry standard
Max file size: TBD      ← Source: TBD — confirm with Tech Lead
```

Never invent numbers. If no source exists → mark as TBD.

---

## 2.5 Sensitive Data Flags

If any use case involves the following → add `⚠ Sensitive data. Legal check required.` in the doc:

| Category | Examples |
|---|---|
| Personal identifiers | Full name, national ID, passport, DOB |
| Contact data | Phone, email, address |
| Financial data | Bank account, card number, transactions |
| Auth data | Password, OTP, token, PIN |
| User content | Chat, private notes, uploaded files |
| Health / biometric | Medical records, face ID, fingerprint |
| Location | GPS, real-time location |

---

## 2.6 Analysis Output

Before moving to Stage 3, produce an internal analysis summary (not shown to user unless asked):

```
## Pre-Draft Analysis

### Gaps Found
- [gap 1]
- [gap 2]

### Edge Cases to Cover
- [list]

### Open Questions
- [questions that need stakeholder input]

### Assumptions Made
- [what I'm assuming to fill gaps]

### Sensitive Data
- [any flags]
```

This summary drives what gets written in the doc. → Proceed to Stage 3.