# Tammi — Screen Specification (UC5, UC6, UC7)

## Metadata
- **Project**: Tammi — Tính năng "Bảo vệ Gia đình"
- **Platform**: Mobile App
- **Source document**: Tammi_fixed.md
- **Analyzed date**: 2026-05-26
- **Scope**: UC-05 (Xem danh sách cảnh báo), UC-06 (Quản lý danh sách thành viên), UC-07 (Smart Suggestion)
- **Total screens**: 12 (screens: 1, modals: 0, popups: 3, toasts: 5, bottom sheets: 3)
- **Total modules**: 2
- **User roles**: Trưởng nhóm (A-01)

---

## Module Overview

| Module | Name | Screens | Description |
|--------|------|---------|-------------|
| 05 | Cảnh báo | S-0501 | Danh sách cảnh báo cuộc gọi lừa đảo của các thành viên |
| 06 | Quản lý thành viên | S-0601 | Danh sách thành viên nhóm bảo vệ + Smart Suggestion |

---

## Screen Inventory

---

### Module 05: Cảnh báo

#### S-0501: Danh sách cảnh báo
- **Type**: Screen
- **Source**: UC-05 — Happy Path, Alternative Flow AF-01
- **Access roles**: Trưởng nhóm (A-01)
- **Description**: Hiển thị toàn bộ lịch sử các cuộc gọi lừa đảo đã được Lá Chắn Số phát hiện cho tất cả thành viên trong nhóm bảo vệ. Mỗi item là 1 bản ghi cảnh báo, có thể tap để xem chi tiết. Entry point: tap push notification cảnh báo (deep link) hoặc vào tab "Bảo vệ Gia đình" → nhấn vào 1 thành viên.
- **Components**:
  | Component | Type | Behavior | Notes |
  |-----------|------|----------|-------|
  | Header | Navigation Bar | Hiển thị tiêu đề "Cảnh báo", nút Back trái | — |
  | Danh sách cảnh báo | List / FlatList | Scroll dọc; mỗi item tap → (reserved cho chi tiết, không triển khai trong scope này) | Sắp xếp mới nhất lên đầu |
  | Alert Item — Avatar | Image / Initials | Hiển thị avatar hoặc chữ cái đầu tên thành viên | — |
  | Alert Item — Tên thành viên | Text | Static display | Nếu không có tên → hiển thị SĐT |
  | Alert Item — SĐT lừa đảo | Text | Static display | Format: 0xxx xxx xxx |
  | Alert Item — Loại cảnh báo | Badge/Tag | Static display | 2 loại: "Viễn thông" (màu cam) / "AI detect" (màu tím) |
  | Alert Item — Thời gian | Text | Static display | Format: "HH:mm · dd/MM/yyyy" |
  | Alert Item — Chiều cuộc gọi | Icon + Text | Static display | Icon mũi tên vào / ra kèm "Gọi đến" / "Gọi đi" |
  | Alert Item — Thời lượng | Text | Static display | Format: "Xm Xs" |
  | Empty state | Illustration + Text | Hiển thị khi chưa có cảnh báo nào | — |
  | Error state | Text + Retry button | Hiển thị khi load lỗi | — |
  | Loading skeleton | Skeleton UI | Hiển thị trong khi đang fetch | — |

- **States**:
  | State | Trigger | Description |
  |-------|---------|-------------|
  | loading | Mở màn hình, đang fetch API | Hiển thị skeleton list 3 items |
  | default | Load thành công, có ít nhất 1 cảnh báo | Hiển thị danh sách đầy đủ |
  | empty | Load thành công, chưa có cảnh báo nào | Illustration + "Chưa có cảnh báo nào. Tất cả thành viên đang an toàn." |
  | error | API lỗi / mất mạng | "Không thể tải danh sách cảnh báo. Vui lòng thử lại." + nút "Thử lại" |

- **Fake data**:
  ```json
  {
    "alerts": [
      {
        "id": "a001",
        "member_name": "Nguyễn Thị Bố",
        "member_phone": "0912345678",
        "fraud_phone": "02412345678",
        "call_type": "incoming",
        "duration_seconds": 187,
        "detected_at": "2026-05-26T09:14:00+07:00",
        "alert_type": "telecom",
        "label": "Giả mạo cơ quan nhà nước"
      },
      {
        "id": "a002",
        "member_name": "Trần Văn Mẹ",
        "member_phone": "0987654321",
        "fraud_phone": "0366778899",
        "call_type": "outgoing",
        "duration_seconds": 43,
        "detected_at": "2026-05-25T16:30:00+07:00",
        "alert_type": "ai",
        "ai_label": "Lừa đảo đầu tư",
        "ai_signals": ["Yêu cầu chuyển tiền gấp", "Giả mạo sàn giao dịch"]
      },
      {
        "id": "a003",
        "member_name": "Lê Thị Mẹ",
        "member_phone": "0978111222",
        "fraud_phone": "02838123456",
        "call_type": "incoming",
        "duration_seconds": 320,
        "detected_at": "2026-05-24T11:05:00+07:00",
        "alert_type": "telecom",
        "label": "Lừa đảo tài chính"
      },
      {
        "id": "a004",
        "member_name": "Nguyễn Văn Bố",
        "member_phone": "0901234567",
        "fraud_phone": "0855667788",
        "call_type": "incoming",
        "duration_seconds": 91,
        "detected_at": "2026-05-23T08:22:00+07:00",
        "alert_type": "ai",
        "ai_label": "Lừa đảo việc làm online",
        "ai_signals": ["Hứa hẹn thu nhập cao bất thường"]
      }
    ]
  }
  ```

---

### Module 06: Quản lý thành viên

#### S-0601: Danh sách thành viên
- **Type**: Screen
- **Source**: UC-06 Happy Path + UC-07 Happy Path + Alternative Flows; gộp với entry point của UC-05 AF-01
- **Access roles**: Trưởng nhóm (A-01)
- **Description**: Màn hình chính của tab "Bảo vệ Gia đình" (sau onboarding). Hiển thị danh sách thành viên trong nhóm bảo vệ với đầy đủ trạng thái.Mỗi thành viên có menu "⋮" để thực hiện hành động. Kèm theo Smart Suggestion card xuất hiện ở đầu danh sách nếu có thành viên eligible. 
- **Components**:

  **Header & Actions**
  | Component | Type | Behavior | Notes |
  |-----------|------|----------|-------|
  | Header | Navigation Bar | Tiêu đề "Bảo vệ Gia đình"; segment control 2 tab (Nhóm gia đình / Bảo vệ Gia đình) | Tab đang active: "Bảo vệ Gia đình" |
  | Nút "Thêm thành viên" | Button (text + icon +) | Tap → navigate đến màn nhập SĐT (UC-02) | Ẩn khi nhóm đạt 10 thành viên (BR-05 UC-02) |

  **Smart Suggestion Section (UC-07)**
  | Component | Type | Behavior | Notes |
  |-----------|------|----------|-------|
  | Suggestion Card (1 người) | Card | Hiển thị tên + SĐT + CTA "Thêm" và "Bỏ qua" | Xuất hiện ở đầu danh sách, phía trên thành viên hiện tại |
  | Suggestion List (nhiều người) | List + Checkbox | Mỗi người có checkbox; nút "Thêm tất cả" và "Bỏ qua tất cả" ở cuối section | Tối đa 2 người hiển thị cùng lúc (BR-07) |

  **Member List**
  | Component | Type | Behavior | Notes |
  |-----------|------|----------|-------|
  | Member Item — Avatar | Image / Initials | Static display | — |
  | Member Item — Tên | Text | Static display | — |
  | Member Item — SĐT | Text | Static display | Format đầy đủ, đầu 0 |
  | Member Item — Trạng thái "Protected" | Icon (khiên xanh) | Static display | Không dùng chữ "Protected"; dùng icon khiên màu xanh lá (#34C759 hoặc tương đương) |
  | Member Item — Trạng thái "Chờ xác nhận" | Badge text | Static display | Text "Chờ xác nhận" màu xám/vàng |
  | Member Item — Trạng thái "Từ chối" | Badge text | Static display | Text "Từ chối" màu đỏ nhạt |
  | Member Item — Trạng thái "Hết hạn" | Badge text | Static display | Text "Hết hạn" màu xám [inferred: trạng thái lời mời quá cũ hoặc bị thu hồi] |
  | Member Item — Nút "⋮" | Icon Button (vertical 3 dots) | Tap → mở Bottom Sheet options | Hiển thị ở TẤT CẢ thành viên |
  | Member Item — Tap vào item | List Item | Tap vào item → Navigate đến S-0501 (danh sách cảnh báo của thành viên đó) | Chỉ áp dụng với thành viên "Protected" |

  **Empty & Error**
  | Component | Type | Behavior | Notes |
  |-----------|------|----------|-------|
  | Empty state | Illustration + Text + CTA | Hiển thị khi chưa có thành viên nào | CTA "Thêm thành viên ngay" |
  | Error state | Text + Retry button | Hiển thị khi load lỗi | — |
  | Loading skeleton | Skeleton UI | Đang fetch | — |

- **States**:
  | State | Trigger | Description |
  |-------|---------|-------------|
  | loading | Mở tab, đang fetch | Skeleton list 3 items |
  | default | Có ít nhất 1 thành viên | Danh sách đầy đủ, kèm suggestion card nếu có |
  | empty | Chưa có thành viên nào | Illustration + "Chưa có thành viên nào. Thêm người thân để bảo vệ họ." + CTA |
  | error | Lỗi mạng / server | "Không thể tải danh sách. Vui lòng thử lại." + Retry |

- **Fake data**:
  ```json
  {
    "group_name": "Nhóm bảo vệ của Nguyễn Văn An",
    "members": [
      {
        "id": "m001",
        "name": "Nguyễn Thị Lan",
        "phone": "0912345678",
        "status": "protected",
        "has_app": true,
        "added_at": "2026-05-20T10:00:00+07:00"
      },
      {
        "id": "m002",
        "name": "Trần Văn Minh",
        "phone": "0987654321",
        "status": "pending",
        "has_app": true,
        "added_at": "2026-05-24T14:30:00+07:00"
      },
      {
        "id": "m003",
        "name": "Lê Thị Hoa",
        "phone": "0978111222",
        "status": "rejected",
        "has_app": false,
        "added_at": "2026-05-18T09:00:00+07:00"
      },
      {
        "id": "m004",
        "name": "Phạm Đức Long",
        "phone": "0901234567",
        "status": "expired",
        "has_app": true,
        "added_at": "2026-04-01T08:00:00+07:00"
      }
    ],
    "suggestions": [
      {
        "id": "s001",
        "name": "Nguyễn Văn Tùng",
        "phone": "0855667788",
        "source": "Nhóm gia đình Tammi"
      },
      {
        "id": "s002",
        "name": "Trần Thị Mai",
        "phone": "0933445566",
        "source": "Nhóm gia đình Tammi"
      }
    ]
  }
  ```

---

### Modals, Popups, Bottom Sheets

#### BS-0601: Bottom Sheet — Options cho thành viên "Protected" / "Chờ xác nhận"
- **Type**: Bottom Sheet
- **Triggered from**: S-0601 → Tap "⋮" trên thành viên có status = `protected` hoặc `pending`
- **Description**: Menu hành động cho thành viên đang active hoặc đang chờ
- **Components**:
  | Component | Type | Behavior | Notes |
  |-----------|------|----------|-------|
  | Tên thành viên + SĐT | Text header | Static display | Hiển thị ở đầu bottom sheet để confirm context |
  | Nút "Xóa khỏi nhóm" | List Item (destructive) | Tap → đóng bottom sheet → mở P-0601 | Màu đỏ |
  | Nút "Hủy" | List Item | Tap → đóng bottom sheet | — |

#### BS-0602: Bottom Sheet — Options cho thành viên "Từ chối" / "Hết hạn"
- **Type**: Bottom Sheet
- **Triggered from**: S-0601 → Tap "⋮" trên thành viên có status = `rejected` hoặc `expired`
- **Description**: Menu hành động cho thành viên đã từ chối hoặc hết hạn — có thêm option "Thử lại"
- **Components**:
  | Component | Type | Behavior | Notes |
  |-----------|------|----------|-------|
  | Tên thành viên + SĐT | Text header | Static display | — |
  | Nút "Thử lại" | List Item | Tap → Hệ thống gửi lại lời mời; đóng bottom sheet; hiện T-0601 | Gửi lại invitation (tương đương UC-02 bước 7) |
  | Nút "Xóa khỏi nhóm" | List Item (destructive) | Tap → đóng bottom sheet → mở P-0601 | Màu đỏ |
  | Nút "Hủy" | List Item | Tap → đóng bottom sheet | — |

#### P-0601: Popup — Xác nhận xóa thành viên
- **Type**: Popup / Dialog
- **Triggered from**: BS-0601 hoặc BS-0602 → Tap "Xóa khỏi nhóm"
- **Description**: Bước xác nhận bắt buộc trước khi xóa thành viên (BR-03 UC-06)
- **Actions**:
  | Button | Label | Result |
  |--------|-------|--------|
  | Primary (destructive) | "Xóa" | Gọi API xóa → cập nhật danh sách → hiện T-0602; nếu lỗi → hiện T-0603 |
  | Secondary | "Hủy" | Đóng popup, không thay đổi gì |

#### P-0602: Popup — Xác nhận "Bỏ qua" suggestion (chỉ khi bỏ qua tất cả)
- **Type**: Popup / Dialog
- **Triggered from**: S-0601 → Tap "Bỏ qua tất cả" trong suggestion list (AF-02)
- **Description**: Xác nhận bỏ qua toàn bộ suggestion hiện tại [inferred: tránh bỏ qua nhầm]
- **Actions**:
  | Button | Label | Result |
  |--------|-------|--------|
  | Primary | "Bỏ qua tất cả" | Đánh dấu tất cả là "đã bỏ qua"; ẩn suggestion section |
  | Secondary | "Hủy" | Đóng popup |

---

### Toasts / Snackbars

#### T-0601: Toast — Gửi lại lời mời thành công
- **Type**: Toast / Snackbar
- **Triggered from**: BS-0602 → Tap "Thử lại" → API thành công
- **Message**: "Đã gửi lại lời mời đến [Tên thành viên]."
- **Duration**: 3s
- **Style**: success

#### T-0602: Toast — Xóa thành viên thành công
- **Type**: Toast / Snackbar
- **Triggered from**: P-0601 → Tap "Xóa" → API thành công
- **Message**: "Đã xóa [Tên thành viên] khỏi nhóm bảo vệ."
- **Duration**: 3s
- **Style**: success

#### T-0603: Toast — Xóa thành viên thất bại
- **Type**: Toast / Snackbar
- **Triggered from**: P-0601 → Tap "Xóa" → API lỗi
- **Message**: "Không thể xóa thành viên. Vui lòng thử lại."
- **Duration**: 4s
- **Style**: error

#### T-0604: Toast — Thêm suggestion thành công
- **Type**: Toast / Snackbar
- **Triggered from**: S-0601 → Tap "Thêm" hoặc "Thêm tất cả" → API thành công
- **Message**: "Đã gửi lời mời đến [Tên / X thành viên]."
- **Duration**: 3s
- **Style**: success

#### T-0605: Toast — Thêm suggestion thất bại
- **Type**: Toast / Snackbar
- **Triggered from**: S-0601 → Tap "Thêm" → API lỗi
- **Message**: "Không thể thêm. Vui lòng thử lại."
- **Duration**: 4s
- **Style**: error

---

## Navigation Flow

### Global Navigation
- **Type**: Top Segment Control (2 tab) trong màn "Nhóm gia đình"
- **Items**:
  | Tab | Label | Target Screen |
  |-----|-------|---------------|
  | 1 | Nhóm gia đình | (màn hình hiện có của Tammi, ngoài scope) |
  | 2 | Bảo vệ Gia đình | S-0601 |

### Flow Map

| From | Trigger | To | Condition | Back behavior |
|------|---------|----|-----------|---------------|
| Tab "Bảo vệ Gia đình" | Tap tab | S-0601 | Đã hoàn thành onboarding | — |
| S-0601 | Tap item thành viên "Protected" | S-0501 | status = protected | Pop |
| S-0601 | Tap "⋮" — thành viên Protected/Pending | BS-0601 | status = protected/pending | Dismiss |
| S-0601 | Tap "⋮" — thành viên Rejected/Expired | BS-0602 | status = rejected/expired | Dismiss |
| BS-0601 | Tap "Xóa khỏi nhóm" | P-0601 | — | Dismiss |
| BS-0602 | Tap "Xóa khỏi nhóm" | P-0601 | — | Dismiss |
| BS-0602 | Tap "Thử lại" | — (API call) | Thành công → T-0601; Lỗi → Toast error | Dismiss BS |
| P-0601 | Tap "Xóa" | S-0601 (updated) + T-0602 | API thành công | Pop dialog |
| P-0601 | Tap "Hủy" | S-0601 (unchanged) | — | Dismiss |
| S-0601 | Tap "Thêm" (suggestion 1 người) | — (API call) | Thành công → T-0604, ẩn card | — |
| S-0601 | Tap "Bỏ qua" (suggestion 1 người) | — | Ẩn card, đánh dấu bỏ qua | — |
| S-0601 | Tap "Bỏ qua tất cả" (suggestion nhiều) | P-0602 | — | — |
| Push notification cảnh báo | Tap | S-0501 (deep link) | App đang mở hoặc cold start | Pop |

### Conditional Flows

| Condition | Flow |
|-----------|------|
| Thành viên status = protected | Tap item → S-0501 (danh sách cảnh báo) |
| Thành viên status = pending/rejected/expired | Tap item → không navigate (hoặc không phản ứng) [inferred] |
| Suggestion có 1 người | Hiển thị single card với "Thêm" + "Bỏ qua" |
| Suggestion có 2+ người | Hiển thị list với checkbox, "Thêm tất cả", "Bỏ qua tất cả" |
| Nhóm đã đủ 10 thành viên | Ẩn nút "Thêm thành viên"; ẩn suggestion section |

---

## Fake Data Summary

| Entity | Fields | Sample count | Used in screens |
|--------|--------|--------------|-----------------| 
| Member | id, name, phone, status (protected/pending/rejected/expired), has_app, added_at | 4 | S-0601, BS-0601, BS-0602, P-0601 |
| Alert | id, member_name, member_phone, fraud_phone, call_type, duration_seconds, detected_at, alert_type, label/ai_label/ai_signals | 4 | S-0501 |
| Suggestion | id, name, phone, source | 2 | S-0601 |

---

## Unresolved Items

| # | Screen | Issue | Impact |
|---|--------|-------|--------|
| 1 | S-0601 | Thành viên status "Hết hạn" — SRS không định nghĩa rõ điều kiện để lời mời chuyển sang "hết hạn" (timeout bao lâu?) | Ảnh hưởng logic hiển thị badge + điều kiện trigger |
| 2 | S-0601 | Tap vào item thành viên status = pending/rejected/expired → không rõ có navigate hay không, hay chỉ "chết" | Ảnh hưởng UX, cần designer xác nhận |
| 3 | S-0601 | Khi chọn 1 số người trong suggestion list (AF-03 UC-07), những người còn lại "vẫn hiện trong suggestion" — nhưng hiển thị ở đâu nếu đã đủ 2 card tối đa? | Cần confirm logic display |
| 4 | S-0501 | UC-05 chỉ định scope "danh sách cảnh báo" — nhưng AF-01 nói user đi vào từ "nhấn vào 1 thành viên". Entry point này cần confirm: S-0501 là danh sách cảnh báo của 1 thành viên, hay toàn bộ nhóm? | Ảnh hưởng header title và scope data |

---

## Inferred Items

| # | Item | Reasoning |
|---|------|-----------|
| 1 | Trạng thái "Hết hạn" (expired) | User request thêm trạng thái này; SRS gốc không đề cập — cần confirm điều kiện và business rule |
| 2 | BS-0601 / BS-0602 (Bottom Sheet phân loại theo status) | SRS UC-06 nói "nhấn giữ hoặc vuốt" nhưng user request thay bằng nút "⋮" cho tất cả thành viên |
| 3 | P-0602 (Confirm bỏ qua tất cả) | Thao tác "bỏ qua tất cả" không thể hoàn tác → cần confirm dialog để tránh nhầm |
| 4 | Tap item pending/rejected/expired không navigate | Chỉ thành viên Protected mới có dữ liệu cảnh báo để xem |
| 5 | Suggestion section ẩn khi nhóm đủ 10 thành viên | Logic nhất quán với việc ẩn nút "Thêm thành viên" (BR-05 UC-02) |
