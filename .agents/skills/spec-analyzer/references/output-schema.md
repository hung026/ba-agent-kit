# Output Schema

Template chuẩn cho output của spec-analyzer. Đọc file này khi bắt đầu Step 6.

Output là 1 file Markdown. Sao chép cấu trúc bên dưới và điền nội dung.

---

## Template

```markdown
# [Tên Project] — Screen Specification

## Metadata
- **Project**: [tên]
- **Platform**: [Mobile App / Web Portal / Landing Page]
- **Source document**: [tên file SRS hoặc "pasted text"]
- **Analyzed date**: [ngày]
- **Total screens**: [số] (screens: [số], modals: [số], popups: [số], toasts: [số])
- **Total modules**: [số]
- **User roles**: [liệt kê]

---

## Module Overview

| Module | Tên | Screens | Mô tả |
|--------|-----|---------|--------|
| 01 | [tên module] | S-0101 ~ S-01XX | [mô tả ngắn] |
| 02 | [tên module] | S-0201 ~ S-02XX | [mô tả ngắn] |
| ... | ... | ... | ... |

---

## Screen Inventory

### Module 01: [Tên Module]

#### S-0101: [Tên Screen]
- **Type**: Screen
- **Source**: [SRS section/user story reference] hoặc [inferred]
- **Access roles**: [roles nào thấy screen này]
- **Description**: [Mô tả ngắn gọn mục đích của screen]
- **Components**:
  | Component | Type | Behavior | Notes |
  |-----------|------|----------|-------|
  | [tên] | [button/input/list/card/image/toggle/tab/...] | [tap/swipe/input/display] | [ghi chú nếu có] |
- **States**:
  | State | Trigger | Mô tả |
  |-------|---------|--------|
  | default | - | [mô tả trạng thái mặc định] |
  | loading | [khi nào] | [mô tả] |
  | empty | [khi nào] | [mô tả] |
  | error | [khi nào] | [mô tả] |
- **Fake data**:
  ```json
  {
    "field_name": "giá trị mẫu",
    "list_items": [
      {"id": 1, "name": "Item 1", "...": "..."},
      {"id": 2, "name": "Item 2", "...": "..."}
    ]
  }
  ```

#### M-0101: [Tên Modal]
- **Type**: Modal / Bottom Sheet
- **Triggered from**: [Screen ID + trigger action]
- **Description**: [mô tả]
- **Components**: [tương tự screen]
- **Actions**:
  | Action | Result |
  |--------|--------|
  | [tên action] | [navigate đến đâu / thay đổi gì] |

#### T-0101: [Tên Toast]
- **Type**: Toast / Snackbar
- **Triggered from**: [Screen ID + trigger action]
- **Message**: "[nội dung thông báo]"
- **Duration**: [short: 2s / long: 4s]
- **Style**: [success / error / warning / info]

#### P-0101: [Tên Popup]
- **Type**: Popup / Dialog
- **Triggered from**: [Screen ID + trigger action]
- **Description**: [mô tả]
- **Actions**:
  | Button | Label | Result |
  |--------|-------|--------|
  | Primary | [text] | [hành động] |
  | Secondary | [text] | [hành động — thường là dismiss] |

---

## Navigation Flow

### Global Navigation
- **Type**: [Bottom Tab Bar / Drawer / Top Tab / None]
- **Items**:
  | Tab | Label | Icon hint | Target Screen |
  |-----|-------|-----------|---------------|
  | 1 | [label] | [mô tả icon] | [Screen ID] |
  | 2 | [label] | [mô tả icon] | [Screen ID] |

### Flow Map

Liệt kê tất cả navigation paths:

| From | Trigger | To | Condition | Back behavior |
|------|---------|-----|-----------|---------------|
| S-0101 | Tap "Login" button | S-0102 | Form valid | Pop |
| S-0101 | Tap "Register" link | S-0103 | - | Pop |
| S-0102 | Login success | S-0301 | - | Replace stack |
| ... | ... | ... | ... | ... |

**Back behavior options**: Pop (quay lại màn trước), Replace stack (xóa stack cũ, thay bằng màn mới), None (không cho back)

### Conditional Flows

| Condition | Flow |
|-----------|------|
| First time user | S-0101 → S-0201 (Onboarding) → S-0301 (Home) |
| Returning user | S-0101 → S-0301 (Home) |
| [condition khác] | [flow] |

---

## Fake Data Summary

Tổng hợp tất cả fake data entities cần tạo:

| Entity | Fields | Sample count | Used in screens |
|--------|--------|-------------|-----------------|
| User | id, name, email, avatar, role | 3 | S-0301, S-0501 |
| [entity] | [fields] | [số lượng] | [screen IDs] |

---

## Unresolved Items

Các điểm chưa rõ trong SRS, cần user bổ sung:

| # | Screen | Vấn đề | Ảnh hưởng |
|---|--------|--------|-----------|
| 1 | [Screen ID] | [mô tả vấn đề] | [ảnh hưởng gì nếu không giải quyết] |

---

## Inferred Items

Các màn hình / components được suy luận thêm (không có trong SRS gốc):

| # | Item | Lý do suy luận |
|---|------|----------------|
| 1 | [Screen/Component ID + tên] | [tại sao cần thêm] |
```

---

## Quy tắc khi điền template

1. **Fake data phải realistic**: Dùng tên người thật (Nguyễn Văn A), số điện thoại format đúng, email hợp lệ. Không dùng "test123" hay "lorem ipsum"
2. **Components phải đủ chi tiết để code**: Developer đọc vào phải biết cần dùng component gì, behavior ra sao
3. **Navigation flow phải cover mọi path**: Bao gồm cả happy path và error path
4. **States chỉ liệt kê khi cần thiết**: Không phải screen nào cũng cần loading state. Static screen thì chỉ cần default state
5. **Fake data sample count**: List screens cần ít nhất 3-5 items. Detail screens cần 1 item đầy đủ fields
6. **JSON trong fake data**: Phải là valid JSON, đủ fields để demo mọi trường hợp hiển thị trên screen đó