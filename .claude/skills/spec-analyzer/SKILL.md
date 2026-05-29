---
name: spec-analyzer
description: >
  Đọc tài liệu đặc tả (SRS, user story, PRD) và xuất ra mô tả chi tiết từng màn hình,
  phục vụ vẽ UI Design. Chỉ tập trung vào giao diện: bố cục, thành phần, nội dung hiển thị,
  trạng thái hiển thị, và luồng chuyển màn.
  Trigger: "phân tích spec", "liệt kê màn hình", "screen spec", "chuẩn bị cho design",
  hoặc upload file SRS/PRD/user story.
---

# SPEC ANALYZER

Đọc tài liệu đặc tả → Xuất mô tả màn hình cho designer vẽ UI.

Chỉ quan tâm đến **giao diện**: cái gì hiển thị, ở đâu, trông như thế nào, chuyển đi đâu.
Không quan tâm: API, database, logic backend, xử lý lỗi kỹ thuật.

---

## Đọc input

- `.docx` → `extract-text <file>`
- `.md`, `.txt` → `cat <file>`

- Paste text → dùng trực tiếp

---

## Quy trình

### Bước 1: Đọc tài liệu

Đọc toàn bộ, xác định:
- Platform (mobile app / web)
- User roles
- Các feature chính

Nếu thiếu thông tin quan trọng → hỏi user.

### Bước 2: Liệt kê màn hình

Trích xuất tất cả "view" mà user nhìn thấy:

| Loại | Prefix | Ví dụ |
|------|--------|-------|
| Màn hình full | `S-` | Login, Home, Profile |
| Modal / Bottom sheet | `M-` | Filter, Date picker |
| Dialog | `P-` | Xác nhận xóa |
| Toast | `T-` | "Lưu thành công" |

**Đánh số:** `{Prefix}{module 2 chữ số}{màn 2 chữ số}` — vd: `S-0101`, `M-0201`

**Suy luận thêm:** SRS thường không liệt kê hết. Nếu SRS nói "quản lý sản phẩm" → suy luận cần có: danh sách, chi tiết, tạo/sửa, xác nhận xóa. Đánh dấu `[suy luận]` để user verify.

### Bước 3: Mô tả từng màn hình

Với mỗi màn, mô tả:

**a) Bố cục tổng quan** — Vùng nào ở đâu: header, content (scroll được), bottom cố định.

**b) Thành phần UI** — Liệt kê từng element nhìn thấy được:
- Tên + loại (nút, input, danh sách, ảnh, icon, toggle,...)
- Nội dung hiển thị (text cụ thể, không để chung chung)
- Vị trí tương đối (trên, dưới, trái, phải, trong nhóm nào)
- Hành vi khi tương tác (bấm → đi đâu, vuốt → hiện gì)

**c) Trạng thái hiển thị** — Chỉ các trạng thái **nhìn thấy khác nhau trên UI**:
- Mặc định (có dữ liệu)
- Trống (danh sách chưa có item)
- Đang tải (skeleton / spinner)
- Chỉ liệt kê khi UI thực sự khác biệt. Không liệt kê trạng thái kỹ thuật.

**d) Nội dung mẫu** — Dữ liệu giả để designer biết độ dài, format hiển thị:
- Tên người: "Nguyễn Minh Anh" (không dùng "Lorem ipsum")
- Giá: "45.000đ"
- Danh sách: 3-4 item mẫu

### Bước 4: Vẽ luồng chuyển màn

Liệt kê: Từ màn nào → bấm gì → đến màn nào.
Bao gồm cả điều kiện (lần đầu dùng app → onboarding, đã login → home).

### Bước 5: Trình bày & xin confirm

- Tóm tắt: bao nhiêu màn, bao nhiêu module
- Highlight mục `[suy luận]`
- Highlight điểm chưa rõ
- Hỏi user confirm trước khi finalize

---

## Format output

Đọc `template.md` để dùng đúng format.
Xem `example.md` để thấy ví dụ hoàn chỉnh.

Output: file `.md` lưu tại `\output\spec\[tên-project]-screen-spec.md`

---

## Lưu ý

- **Mô tả bằng mắt**: Viết như đang mô tả cho 1 designer chưa đọc SRS. Designer đọc xong phải hình dung được màn hình trông ra sao.
- **Nội dung mẫu phải thật**: Designer cần biết text dài bao nhiêu, số có mấy chữ số, tên dài hay ngắn — để bố trí layout.
- **Không bỏ sót view ẩn**: Modal, dialog, toast, empty state — đều là thứ designer phải vẽ.
- **Mobile-first**: Mặc định mô tả theo mobile. Nếu web → ghi rõ.
