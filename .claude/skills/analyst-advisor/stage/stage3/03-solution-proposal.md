# Stage 3 — Solution Proposal & Output

**Goal:** Synthesize findings into ONE recommended solution the user can act on — printed short
enough to actually be read and reviewed.

Read `example-output.md` alongside this file, every time. The template below defines the *shape*;
the example shows the *density*. Most failures are density failures, not shape failures.

---

## Mindset

- Build 2–3 genuinely different directions internally. No straw man.
- **Output only one.** Losing directions stay internal — never printed, not even as a row.
- The user must know what to do from the two-line Summary, before any detail.
- Every 🔴/🟡 from Stage 2 surfaces as a **conclusion**. Never narrate the analysis.
- Long is not thorough. An output the user skims and abandons delivered nothing.

---

## Step 1: Weigh directions (internal — never printed)

Sketch each direction: how it works, pros, cons, risks, when it fits. Score to pick the winner:

| Criterion           | Question                              |
| ------------------- | ------------------------------------- |
| Blind spot coverage | How many 🔴 findings does it resolve? |
| Cost                | Effort, time, people required         |
| Residual risk       | What remains after mitigation?        |
| Reversibility       | If wrong, how hard to back out?       |

Only the winner gets written out. Losers leave no trace in the output.

---

## Step 2: Pick the profile

The Gate handed you LITE or FULL. Print only that profile's sections.

| Profile | Sections                                                                                      |
| ------- | --------------------------------------------------------------------------------------------- |
| LITE    | Summary · Solution · Blind spot (≤3 dòng) · Open question                                |
| FULL    | Summary · Solution · Blind spot · Risk · Open question · Assumptions · Confirmed inputs |

- A section with nothing to say is **omitted entirely** — never print a bare heading, never print
  "không có".
- Numbered sections renumber to run consecutively over what's actually printed — no gaps.
- Escalating LITE → FULL requires ≥3 surviving 🔴 and one line saying you escalated.

---

## Step 3: Length budget — hard caps

Count before printing. A cap is not a target to reach — most outputs land well under. Exceeding
one is a defect, not a judgment call.

| Section                        | Cap                          | On overflow                                    |
| ------------------------------ | ---------------------------- | ---------------------------------------------- |
| Summary                        | exactly 2 lines              | — (never more, never fewer)                   |
| Solution → Ý chính          | 1 sentence                   | cut clauses until it is one                    |
| Solution → Cách hoạt động | 7 steps                      | split into operating modes, ≤3 steps each     |
| Solution → Trade-off          | 3 bullets                    | keep the ones the user would not predict       |
| Blind spot                     | 5 rows ·**LITE: 3**   | keep 🔴; merge 🟡 sharing a root cause         |
| Risk                           | 3 rows                       | keep only what genuinely survives the solution |
| Open question                  | 3 questions                  | the 4th becomes an Assumption instead          |
| Assumptions                    | 5 rows                       | merge related ones                             |
| Any table cell                 | ≤12 words, no full sentence | move the detail into a Solution step           |
| Any bullet                     | ≤2 printed lines            | split into two bullets or promote to a step    |

**Whole-output test:** `Summary` + `Solution` must fit one screen (~40 lines) — past that, it's
narrating, not stating.

---

## Step 4: Output template

Print these sections, this order, this markup. No extra sections, no reordering.

`[FULL]` marks a section LITE omits.

````
## Summary

🎯 **Vấn đề thật:** [1 câu. Vấn đề gốc, nêu cả khi nó khác mô tả ban đầu]
✅ **Đề xuất:** [1 câu. Tên giải pháp + nguyên tắc gốc]

---

## 1. Solution — [Tên giải pháp, đặt bằng lời thường, người không rành kỹ thuật đọc là hiểu]

**Ý chính:** [1 câu. Nguyên tắc gốc, bỏ hết chi tiết]

**Cách hoạt động**

1. [bước — cụm động từ, không phải câu]
2. [bước]

[Nhiều chế độ vận hành → tách sub-heading, mỗi cụm ≤3 bước:]

### Bình thường
1. […]

### Khi [điều kiện lỗi]
1. […]

[Luồng đi qua ≥3 thành phần → 1 sơ đồ ASCII, ≤10 dòng, thay cho việc kể bằng chữ:]

```
Kids app
    ↓ [HTTPS]
Proxy/Filter
    ↓ ✗ cert khác
Bank server (cert pinning) → từ chối
```

**Trade-off**

- ❌ [cái bị mất / bị hoãn / phải trả giá]
- ✅ [cái được — chỉ ghi khi nó không hiển nhiên từ Ý chính]

---

## 2. Blind spot

Chưa xuất hiện trong mô tả ban đầu.

| # | Vấn đề | Mức độ | Giải pháp |
|---|--------|--------|-----------|
| 1 | [cụm danh từ] | 🔴 | bước 2 |
| 2 | […] | 🟡 | chưa có / câu hỏi #1 |

---

## 3. Risk `[FULL]`

Còn lại **sau khi** đã áp giải pháp.

| Rủi ro | Mức | 
|--------|-----|
| | 🔴 / 🟡 |

---

## 4. Open question

1. ❓ **[Câu hỏi]**
   → *Nếu khác: [cái gì trong đề xuất phải đổi]*

---

## 5. Assumptions `[FULL]`

| # | Giả định | 
|---|-----------------------|
| 1 | |

---

## Confirmed inputs `[FULL, và chỉ khi có điều kiện ở Step 5]`

1. [Câu hỏi rút gọn]? → **[user chọn gì]**

[1 dòng nhận xét, chỉ khi các lựa chọn đá nhau]
````

---

## Step 5: Section-specific rules

**Summary** — the only section allowed to stand alone. Exactly two icon-led lines, nothing else —
no table, no bullets, no sub-heading. Blocking questions belong in `Open question`, not here —
don't duplicate one as a third Summary line.

**Solution** — steps are numbered so every other section can reference them (`bước 2`). Name the
solution in the heading — never make the reader hunt for it.

**Blind spot** — the `Giải pháp` column is the **single** place the blind-spot → solution mapping
lives. Do not also tag steps with `gỡ blind spot #N`, and do not write a "Vì sao chọn" section
restating it in prose. One mapping, one location.

**Risk vs Blind spot** — these are not the same table:

|            | Definition                                                            |
| ---------- | --------------------------------------------------------------------- |
| Blind spot | What user might not be aware of (about technical or business aspect) |
| Risk       | The remaining problem if this solution is applied                     |

An item that fits both goes in Blind spot only. If Risk ends up restating Blind spot rows, Risk is
empty — omit it.

**Confirmed inputs** — reprinting what the user just typed is redundant. Print only if the answers
contradict each other or there were more than 3. Otherwise omit — and it sits last, never first.

---

## Step 6: Presentation rules

### Allowed markup — this is the complete list

| Element         | Use                                                            |
| --------------- | -------------------------------------------------------------- |
| `##` numbered | top-level sections                                             |
| `###`         | operating modes / branches inside Solution                     |
| `---`         | between top-level sections only                                |
| table           | 3+ items sharing a shape                                       |
| numbered list   | steps in a sequence                                            |
| bullet, 1 level | items with no order                                            |
| **bold**  | label at the start of a line, or the first cell of a table row |
| `backtick`    | original technical terms                                       |
| code fence      | ASCII flow diagram, ≤10 lines, max 1 per output               |

### Semantic icons — fixed meanings, no others

| Icon  | Means                           | Allowed where                                                                         |
| ----- | ------------------------------- | ------------------------------------------------------------------------------------- |
| 🎯    | vấn đề thật                 | Summary line 1                                                                        |
| ✅    | nên làm / cái được        | Summary line 2, Trade-off, contrast blocks                                            |
| ❌    | không làm được / cái mất | Trade-off, contrast blocks                                                            |
| ❓    | câu hỏi chưa có đáp án   | Open question                                                                         |
| 🔴 🟡 | mức độ                       | severity column only (`Mức` / `Mức độ`) — never in prose, never in a heading |

### Banned

- Decorative emoji, or any icon outside the table above
- Nested bullets (level 2+)
- Blockquotes — except the single `> Bước tiếp theo` routing line
- Full sentences inside table cells
- Filler and transitions: "Như đã phân tích ở trên", "Có thể thấy rằng", "Về cơ bản"
- The same content in two sections — reference `blind spot #2` or `bước 3` instead
- A wall of prose anywhere; if a paragraph exceeds 3 lines it should have been a table or steps

### The ❌ / ✅ contrast block

When the answer is "cách này không được, làm cách kia", print the pair — it reads faster than a
paragraph explaining the substitution:

```
❌ **Không làm được**
- [cách bị chặn] — [1 vế lý do]

✅ **Thay bằng**
- [cách thay thế] — [1 vế vì sao nó thoát được vấn đề trên]
```

Use it inside a Solution step or a Trade-off. Max once per output.

---

## Step 7: Language

Enforce *Language & Wording* from `SKILL.md` — this is where it breaks most.

- Headings: English, exact contract names. Body: Vietnamese.
- User's own terms: verbatim, always.
- Your terms: Vietnamese gloss + `original` in backticks on first use, bare after. Gloss >12 words
  → its own line below the term.
- In tables, introduce the term in a Solution step first — use it bare in the table, or it blows
  the 12-word cell cap.
- Mechanism before name:
  - ✅ `client cứ 15-20 giây gửi 1 tín hiệu "tôi còn đang dùng" (heartbeat) lên server`
  - ❌ `client gửi heartbeat định kỳ để server duy trì active session state`
- Top miss: jargon left bare and unglossed (*dedupe, single source of truth, race condition,
  idempotent, reconcile, degrade, atomic, ledger, poll, push*) — each needs its Vietnamese half.
- Mirror miss: a Vietnamese paraphrase with no original attached ("sổ cái giờ theo hồ sơ") — the
  user can't look it up or say it to an engineer.

---

## Step 8: Next SKILL routing

Append exactly one line:

`> Làm gì tiếp: (1) Viết tài liệu SRS ; (2) Phân tích tiếp`

Blocked on a decision instead:

`> Đang chờ trả lời câu hỏi #N trước khi đi tiếp.`

---

## Quality Check

Run the three passes separately. Do not merge them into one glance.

**Pass 1 — Length** (count, don't estimate)

- [ ] Every section within its Step 3 cap?
- [ ] `Summary` + `Solution` fit one screen (~40 lines)?
- [ ] `Summary` is exactly 2 lines?
- [ ] Any table cell holding a full sentence?
- [ ] Any paragraph longer than 3 lines that should have been a table or numbered steps?

**Pass 2 — Substance**

- [ ] Correct profile printed — no FULL-only section leaking into a LITE output?
- [ ] Summary alone tells the user what to do?
- [ ] Exactly ONE solution written in full?
- [ ] Every 🔴 from Stage 2 appears in Solution, Blind spot, Risk, or Open question?
- [ ] `Giải pháp` filled for every blind spot row?
- [ ] Blind spot ↔ solution mapping in exactly one place — not repeated as step tags or prose?
- [ ] Risk rows genuinely residual, not Blind spot restated?
- [ ] Every question has its *Nếu khác* impact line?
- [ ] Anywhere narrating the analysis instead of stating conclusions?
- [ ] Did shortening cost any mechanism, number, trade-off, or 🔴 finding? (must be no)

**Pass 3 — Language**

- [ ] Section headings the exact English contract names, untranslated?
- [ ] Every term the user typed still verbatim — none quietly Vietnamized?
- [ ] Every term *you* introduced: glossed once with the original in backticks, bare after?
- [ ] Zero exceptions to the line above — including the small, common-looking ones?
- [ ] Any Vietnamese paraphrase of a technical concept left with no original term attached?
- [ ] Only the 5 approved icons, each in its approved position?
