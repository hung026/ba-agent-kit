# Extraction Rules

Quy tắc trích xuất màn hình từ tài liệu đặc tả. Đọc file này khi bắt đầu Step 2.

---

## 1. Phân loại Screen Entry

Mỗi "view" mà user nhìn thấy trên thiết bị = 1 screen entry.

| Type | Prefix | Mô tả | Ví dụ |
|------|--------|--------|-------|
| Screen | `S-` | Màn hình full, chiếm toàn bộ viewport | Login, Home, Profile, Settings |
| Modal / Bottom Sheet | `M-` | Overlay chiếm 1 phần viewport, có backdrop | Filter modal, Date picker, Confirm dialog |
| Popup / Dialog | `P-` | Dialog nhỏ, thường có 2 nút (confirm/cancel) | Delete confirmation, Logout confirmation |
| Toast / Snackbar | `T-` | Thông báo tạm thời, tự biến mất | "Saved successfully", "Network error" |

### Quy tắc đánh số
- Format: `{Prefix}{Module number}{Screen number}` — ví dụ: `S-0101`, `M-0201`
- Module number: 2 chữ số (01, 02, 03,...)
- Screen number: 2 chữ số trong module (01, 02, 03,...)
- Ví dụ: Module 01 (Auth) có 3 screens → `S-0101`, `S-0102`, `S-0103`

---

## 2. Nguồn trích xuất

Screens được trích xuất từ các nguồn sau trong SRS:

### Nguồn trực tiếp (explicit)
- **Use case descriptions**: Mỗi bước trong use case flow thường tương ứng 1 screen hoặc interaction
- **User story**: "As a user, I want to see a list of..." → list screen
- **UI requirements section**: Nếu SRS có section mô tả UI
- **Wireframe/mockup references**: Nếu SRS đề cập đến tên màn hình cụ thể
- **Screen flow diagrams**: Nếu có sẵn

### Nguồn suy luận (inferred)
- **Authentication flow**: Nếu SRS đề cập đến login → suy luận: Login screen, Register screen, Forgot password screen, OTP verification screen
- **CRUD operations**: Nếu SRS nói "quản lý X" → suy luận: List X, Detail X, Create/Edit X, Delete confirmation
- **Search/Filter**: Nếu SRS đề cập tìm kiếm → suy luận: Search screen hoặc search bar + filter modal
- **Settings**: Nếu SRS đề cập cài đặt → suy luận: Settings list, các sub-settings screens
- **Notifications**: Nếu đề cập → suy luận: Notification list, notification detail
- **Error handling**: Mọi form đều cần error states, mọi API call đều có thể fail
- **Empty states**: Mọi list screen đều cần empty state
- **Onboarding**: Nếu có tính năng phức tạp → xem xét thêm onboarding flow

Mọi screen suy luận phải được đánh dấu `[inferred]` để user biết và verify.

---

## 3. Quy tắc nhóm Module

Nhóm screens theo feature/module. Thứ tự ưu tiên:

1. **Theo SRS structure**: Nếu SRS đã chia module rõ ràng → theo SRS
2. **Theo user flow**: Nếu SRS không chia rõ → nhóm theo luồng sử dụng
3. **Mặc định phổ biến** (nếu không có gì rõ ràng):
   - Module 01: Authentication (login, register, forgot password)
   - Module 02: Onboarding (nếu có)
   - Module 03: Home / Dashboard
   - Module 04-N: Feature modules (theo thứ tự ưu tiên business)
   - Module cuối-1: Settings / Profile
   - Module cuối: Common (shared modals, toasts, errors)

---

## 4. Xử lý trường hợp đặc biệt

### SRS quá ngắn / thiếu chi tiết
- Trích xuất những gì có
- Suy luận phần còn lại dựa trên context
- Đánh dấu rõ `[inferred]` và ghi note giải thích lý do suy luận
- Hỏi user confirm trước khi tiến hành

### SRS quá dài / nhiều module
- Liệt kê tất cả modules tìm được
- Hỏi user muốn phân tích tất cả hay chọn modules cụ thể
- Nếu > 30 screens: khuyến nghị chia thành nhiều phiên phân tích

### SRS có mâu thuẫn
- Ghi nhận cả 2 phiên bản
- Đánh dấu `[conflict]` và mô tả mâu thuẫn
- Hỏi user quyết định

### Nhiều user roles
- Tạo screen entries riêng cho mỗi role nếu UI khác nhau
- Nếu cùng screen nhưng khác quyền → 1 entry, ghi rõ conditional display logic
- Ghi rõ role nào thấy screen nào trong navigation flow

---

## 5. Checklist trước khi hoàn thành

Trước khi chuyển sang Step 3, verify:

- [ ] Mọi use case / user story trong SRS đều đã có ít nhất 1 screen tương ứng
- [ ] Mọi CRUD operation đều có đủ: List, Detail, Create/Edit, Delete confirm
- [ ] Authentication flow đầy đủ (nếu có)
- [ ] Error states và empty states đã được tính
- [ ] Toast/snackbar cho các action chính đã có (save, delete, error)
- [ ] Navigation entry points rõ ràng (tab bar, drawer, deep links)
- [ ] Screens `[inferred]` đã được đánh dấu rõ ràng