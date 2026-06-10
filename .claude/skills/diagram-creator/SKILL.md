---
name: diagram-creator
description: Vẽ diagram BPMN hoặc Sequence, output ra file .drawio. Trigger khi user nói "vẽ diagram", "tạo diagram", "vẽ quy trình", "vẽ luồng", "vẽ BPMN", "vẽ sequence", "create diagram", "draw workflow", "process diagram", hoặc paste/upload nội dung mô tả 1 quy trình, luồng nghiệp vụ, tương tác giữa actor/hệ thống, có các bước, điều kiện if/else, rẽ nhánh. Nếu user không nói rõ loại diagram → mặc định vẽ BPMN.
---

# diagram-creator SKILL

## 1. Mục đích
- Vẽ 2 loại diagram:
  - **BPMN** (quy trình nghiệp vụ, có lane/actor, gateway rẽ nhánh) — **MẶC ĐỊNH**
  - **Sequence** (tương tác theo thời gian giữa các đối tượng)
- Quy tắc chọn loại:
  - User nói rõ "sequence" / "sequence diagram" → vẽ Sequence
  - Mọi trường hợp còn lại (kể cả "workflow", "quy trình", "luồng" ) → vẽ **BPMN**

## 2. Pipeline bắt buộc (chạy đúng thứ tự)

```
INPUT → [STEP 1: Normalize] → [STEP 2: Validate] → [STEP 3: Build spec JSON] → [STEP 4: Generate] → [STEP 5: Verify]
```
> BPMN dùng generator: STEP 3 mô tả graph (spec JSON) → STEP 4 `generate.js` tự tính layout → STEP 5 `verify.js`. **Không tính tọa độ pixel bằng tay.**

### STEP 1 — Normalize input thành TEMPLATE (CHẠY NGẦM, KHÔNG in ra output)
Input thường là: tin nhắn mô tả sơ bộ, đoạn trong SRS / user story / PRD.
Trước khi vẽ, **luôn** viết lại input thành template chuẩn dưới đây trong thinking process (không hiển thị cho user, trừ khi user yêu cầu xem):

```
# TÊN QUY TRÌNH: <tên>
## ACTORS (mỗi actor = 1 lane):
- <Actor 1>
- <Actor 2>
## LUỒNG:
START: <sự kiện bắt đầu> | actor: <ai>
1. [<actor>] <hành động>
2. [<actor>] DECISION: <điều kiện>?
   - Nếu <A> → <đi tới bước / END nào>
   - Nếu <B> → <đi tới bước / END nào>
3. [<actor>] <hành động>
...
## KẾT THÚC:
- END 1: <khi nào>
- END 2: <khi nào>
```

Mục đích: ép xác định rõ luồng trước khi vẽ → tránh vẽ sai. **Không được bỏ qua bước này.**

### STEP 2 — Validate (kiểm tra đủ thông tin)
Tự check 6 yếu tố. Thiếu cái nào → **HỎI LẠI USER**, không tự đoán:

| # | Yếu tố | Câu hỏi tự check |
|---|---|---|
| 1 | Actor mỗi bước | Bước này ai thực hiện? |
| 2 | Điều kiện rẽ nhánh | Gateway rẽ dựa trên điều kiện gì? |
| 3 | Đích mỗi nhánh | Mỗi nhánh chạy tiếp đi đâu? |
| 4 | Điểm kết thúc | Có mấy đường END? |
| 5 | Quay lui (loop) | Lỗi xong có cho làm lại không? |
| 6 | Song song | Có việc chạy đồng thời không? (→ parallel gateway) |

**Nếu input không đủ rõ để điền template ở STEP 1 → dừng lại, hỏi user. Tuyệt đối không vẽ luồng tự bịa.**

### STEP 2.5 — Giới hạn số lượng diagram
- Đếm số use case/luồng trong input.
- **> 3 use case → HỎI user muốn vẽ cái nào** (liệt kê cho user chọn).
- **1 lần chạy vẽ 1 diagram là tốt nhất, tối đa 3** để tránh sai sót. Không vẽ hơn 3.
- Mỗi use case/luồng là 1 diagram

### STEP 3 — Build spec JSON (KHÔNG vẽ pixel tay)

> **Triết lý:** LLM chỉ mô tả **graph** (lanes + nodes + edges). Việc tính tọa độ là của máy → `generate.js`. Tuyệt đối **không** ngồi tính x/y từng node nữa.

Từ normalized template (STEP 1), viết file spec JSON theo đúng format trong [`template/spec-example.json`](template/spec-example.json) và tài liệu [`template/spec-format.md`](template/spec-format.md):

```json
{
  "title": "Tên quy trình",
  "lanes": ["Actor A", "Actor B"],
  "nodes": [
    { "id": "start", "type": "start",   "label": "Bắt đầu",     "lane": "Actor A" },
    { "id": "t1",    "type": "task",    "label": "Làm gì đó",   "lane": "Actor A" },
    { "id": "gw1",   "type": "gateway", "label": "Điều kiện?",  "lane": "Actor B" },
    { "id": "end1",  "type": "end",     "label": "Kết thúc",    "lane": "Actor B" }
  ],
  "edges": [
    { "from": "start", "to": "t1" },
    { "from": "gw1",   "to": "end1", "label": "Đúng" }
  ]
}
```

Quy tắc spec:
- `type`: `start` | `end` | `task` | `gateway`. Mỗi đường END = 1 node `end` riêng.
- Gateway **split**: nhiều edge `from` cùng 1 gateway, mỗi edge có `label` điều kiện.
- Gateway **merge/join**: nhiều edge `to` cùng 1 gateway, `label` của gateway để rỗng `""`. Song song → thêm `"gwType": "parallel"`.
- **Loop** (quay lui): cứ nối edge `from` node lỗi `to` node trước đó — generator tự nhận diện chu trình và vẽ vòng. KHÔNG cần khai báo gì thêm.
- `lane` phải khớp 1 tên trong `lanes`.

> Mọi cấu trúc (cascade nhiều gateway, merge, song song, loop, nhiều lane) **ghép tự do** trong cùng 1 spec — generator xử lý layout toàn cục, không bao giờ chồng. Không cần chọn "pattern" nữa.

### STEP 4 — Generate (chạy script, KHÔNG tự ghi XML)

```
node .claude/skills/diagram-creator/generate.js <spec.json> output/diagram/<ten>-bpmn.drawio
```

- Script tự tính rank (cột) + slot (tầng dọc trong lane) → xuất .drawio đen trắng, style chuẩn.
- In ra: `nodes/edges/lanes/cols/loop-edges/overlap`. `overlap` PHẢI = 0.
- Tên file kebab-case + hậu tố `-bpmn` (tránh trùng với `-sequence` của cùng use case).

### STEP 5 — Verify (BẮT BUỘC, không được bỏ)

```
node .claude/skills/diagram-creator/verify.js output/diagram/<ten>-bpmn.drawio
```

- Exit 0 / "✅ SẠCH" → xong.
- Exit 1 / "❌ CHỒNG" hoặc "TRÀN LANE" → spec có vấn đề logic (vd 2 node cùng lane buộc cùng chỗ). Sửa spec → generate lại. (Generator đúng thì gần như không xảy ra.)
- Exit 2 / "⚠️ SÁT NHAU" → thường do nhãn dài; chấp nhận được.

> Không báo "đã vẽ xong" khi verify chưa "✅ SẠCH".

### (Fallback) Vẽ tay khi generator không diễn đạt được

Generator phủ ~hết ca thường. Chỉ khi cần cấu trúc đặc biệt nó chưa hỗ trợ (vd sub-process lồng, annotation, bố cục tuỳ biến) mới vẽ tay:
- Đọc `styles/bpmn-styles.md` (style string + grid formula + quy tắc cascade dọc + bảng exit/entry).
- Tham chiếu tọa độ verified: `patterns/p-linear`, `p-branch-1`, `p-cascade`, `p-merge`, `p-parallel`, `p-loop`.
- Vẽ xong **vẫn phải** chạy `verify.js` đến khi "✅ SẠCH".

#### Sequence diagram
→ Đọc `styles/sequence-styles.md` + `template/sequence-template.md`.

## 3. Checklist trước khi xuất file
- [ ] Đã chạy STEP 1 (normalize ngầm) chưa?
- [ ] Đủ 6 yếu tố validate chưa? Thiếu thì đã hỏi user chưa?
- [ ] Số diagram ≤ 3 chưa? > 3 use case đã hỏi user chọn chưa?
- [ ] Đã viết spec JSON đúng format (`template/spec-format.md`) chưa? `lane` mỗi node khớp `lanes`?
- [ ] Mỗi đường END là 1 node `end` riêng? Merge/join gateway để `label` rỗng?
- [ ] Đã chạy `generate.js` và `overlap=0` chưa?
- [ ] **Đã chạy `verify.js` và ra "✅ SẠCH" chưa?** (chưa sạch = chưa xong)
- [ ] Lưu đúng `output/diagram/<ten>-bpmn.drawio` (không trùng tên loại khác) chưa?
