---
name: spec-analyzer
description: >
  Đọc tài liệu đặc tả (SRS, user story, PRD) và trích xuất ra bản đặc tả màn hình có cấu trúc —
  bao gồm danh sách screen, component, navigation flow, fake data spec, và state definitions.
  Output dùng làm input cho cả prototype coding lẫn UI design.
  Sử dụng skill này khi user muốn chuyển đổi tài liệu yêu cầu phần mềm thành danh sách màn hình và luồng tương tác.
  Trigger khi user nói "mô tả màn hình", "liệt kê màn hình", "screen map", "chuẩn bị cho prototype"
---

# SPEC ANALYZER

## Purpose

Chuyển đổi tài liệu đặc tả phần mềm (SRS, user story, PRD) thành bản đặc tả màn hình có cấu trúc.
Output phục vụ 2 mục đích:
1. **Input cho prototype coding** — đủ chi tiết để code ra interactive prototype với fake data
2. **Input cho UI/UX design** — đủ thông tin để designer dựng wireframe/mockup

**DON'T:**
- Tự code prototype (→ dùng skill prototype-generator)
- Tạo design/wireframe (→ dùng Figma hoặc design tool)
- Viết lại SRS hoặc chỉnh sửa yêu cầu

**DO:**
- Đọc và hiểu tài liệu đặc tả
- Trích xuất tất cả màn hình (screens, modals, popups, toasts, bottom sheets, error states)
- Map navigation flow giữa các màn hình
- Xác định components cần thiết cho từng màn
- Định nghĩa fake data cần thiết cho demo
- Liệt kê các trạng thái UI (loading, empty, error, success)

---

## Input Handling

### Text hoặc chat history
Nếu user paste text trực tiếp trong chat hoặc có sẵn trong lịch sử chat → dùng ngay, không cần đọc file.

### Upload file
Nếu user upload 1 hay nhiều file → đọc tất cả, tổng hợp thành 1 bản phân tích duy nhất.

---

## Pipeline

```
Step 1: Đọc & Hiểu tài liệu
    │
    ▼
Step 2: Trích xuất Screen Inventory
    │
    ▼
Step 3: Phân tích Components & Interactions
    │
    ▼
Step 4: Map Navigation Flow
    │
    ▼
Step 5: Định nghĩa Fake Data & States
    │
    ▼
Step 6: Tổng hợp Output → Trình bày cho user review
```

---

## Step 1: Đọc & Hiểu tài liệu

Mục tiêu: Nắm được toàn bộ scope của sản phẩm trước khi trích xuất chi tiết.

Đọc toàn bộ tài liệu và xác định:
- Sản phẩm là gì? (mobile app, web portal, landing page)
- Đối tượng người dùng (user roles/actors)
- Các module/feature chính
- Business flow tổng quan

Nếu tài liệu thiếu thông tin quan trọng (không rõ platform, không rõ user roles) → hỏi user trước khi tiếp tục.

---

## Step 2: Trích xuất Screen Inventory

Đọc `references/extraction-rules.md` để nắm quy tắc trích xuất chi tiết.

Nguyên tắc cốt lõi:
- Mỗi "view" mà user nhìn thấy = 1 screen entry (kể cả modal, popup, toast, bottom sheet)
- Đặt ID theo format: `S-XXX` (screen), `M-XXX` (modal/bottom sheet), `T-XXX` (toast/snackbar), `P-XXX` (popup/dialog)
- Nhóm screens theo feature/module
- Nếu tài liệu mô tả 1 tính năng nhưng không nêu rõ các màn → suy luận ra các màn hình cần thiết và đánh dấu `[inferred]`

---

## Step 3: Phân tích Components & Interactions

Với mỗi screen, xác định:
- UI components (button, input, list, card, image, icon, tab, toggle,...)
- Interaction behavior (tap → navigate, long press → show options, swipe → delete,...)
- Form validation rules (nếu có form)
- Conditional display logic (hiện/ẩn element dựa trên điều kiện gì)

---

## Step 4: Map Navigation Flow

Tạo navigation map:
- Screen A → (trigger gì) → Screen B
- Back navigation
- Deep link entries (nếu có)
- Tab bar / bottom navigation structure
- Conditional navigation (login → home vs login → onboarding)

---

## Step 5: Định nghĩa Fake Data & States

Với mỗi screen:
- **Fake data**: Dữ liệu mẫu cần hardcode để demo (tên user, danh sách items, số liệu,...)
- **States**: Các trạng thái UI cần thể hiện
  - `default` — trạng thái bình thường, có data
  - `loading` — đang tải (nếu áp dụng)
  - `empty` — không có data
  - `error` — lỗi xảy ra
  - `success` — thao tác thành công

Chỉ liệt kê states thực sự cần thiết cho demo. Không cần liệt kê hết mọi state lý thuyết.

---

## Step 6: Tổng hợp Output

Đọc `references/output-schema.md` để sử dụng đúng format output.

Sau khi hoàn thành bản phân tích:
1. Tạo file output theo đúng schema
2. Trình bày cho user:
   - Tóm tắt: bao nhiêu screens, bao nhiêu modules, bao nhiêu user roles
   - Highlight các điểm đã suy luận thêm `[inferred]` — để user verify
   - Highlight các điểm chưa rõ trong SRS — để user bổ sung
3. Hỏi user confirm hoặc chỉnh sửa trước khi finalize

---

## Output Format

Output là 1 file Markdown (.md) lưu tại `/mnt/user-data/outputs/`.

Tên file: `[tên-project]-screen-spec.md`

Cấu trúc output chi tiết: xem `references/output-schema.md`
Ví dụ output hoàn chỉnh: xem `examples/sample-output.md`

---

## Lưu ý quan trọng

1. **Không bỏ sót màn hình ẩn**: Modal confirm delete, toast success, error state, empty state — đều là screen entries
2. **Suy luận hợp lý**: SRS thường không liệt kê hết mọi màn. Hãy suy luận thêm các màn cần thiết và đánh dấu `[inferred]`
3. **Giữ ID nhất quán**: ID một khi đã assign thì không đổi. Nếu cần thêm screen sau, dùng ID tiếp theo
4. **Mobile-first**: Mặc định phân tích theo mobile app. Nếu là web → ghi rõ trong metadata
5. **Luôn hỏi confirm**: Không tự ý finalize. Luôn trình bày draft và hỏi user review