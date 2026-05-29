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
### Option [N]: [Tên]

**Giải pháp:**
[2-3 câu. Giải thích nó là gì. Cách hoạt động thế nào. Trình bày dạng bullet point]

**Pros:**
- [Ưu điểm 1]
- [Ưu điểm 2]

**Cons:**
- [Nhược điểm 1]
- [Nhược điểm 2]

**Rủi ro:**
[🔴 Critical / 🟡 Important] — [Mô tả ngắn gọn rủi ro, dựa trên kết quả từ Stage 2 ]

**Áp dụng khi:**
[Giải pháp này tốt nhất cho trường hợp nào]

**Sources:**
[URL or "Không sử dụng dữ liệu bên ngoài"] ← bắt buộc nếu dữ liệu đến từ `research-analyst` SKILL
```
---

## Step 3: Recommendation

Output exactly this block — keep it short:

```
## ⭐ ĐỀ XUẤT: Option [N] — [Tên]

**Lý do:**
[2-3 câu. Giải thích tại sao chọn option này, dựa trên kết quả từ Stage 2]

**Cân nhắc:**
[Khi nào nên quay lại cân nhắc các option khác]

**Vấn đề:**
[Các hạn chế. Trình bày gạch đầu dòng]
```

---

## Step 4: Next SKILL Routing

| Situation | Next |
|---|---|
| Ready for documentation | → `doc-factory` SKILL |
| Need impact assessment | → `impact-analyzer` SKILL |
| Need diagrams | → `diagram-creator` SKILL |
| Need more data | → `research-analyst` SKILL |
| Stakeholder must decide first | → Wait |

---

## Quality Check

- [ ] All Stage 1 questions addressed?
- [ ] All 🔴 Stage 2 findings reflected in at least one option's risks?
- [ ] Options are genuinely different?
- [ ] No fabricated data — sources cited if `research-analyst` SKILL was used?