# Tammi Bảo vệ Gia đình — Screen Specification

## Metadata
- **Project**: Tính năng "Bảo vệ Gia đình" trên Tammi
- **Platform**: Mobile App
- **Source document**: Tính năng _Bảo vệ Gia đình_ trên Tammi.md
- **Analyzed date**: 2026-05-25
- **Total screens**: 6 (screens: 5, modals: 1, popups: 0, toasts: 2)
- **Total modules**: 1
- **User roles**: Trưởng nhóm

---

## Module Overview

| Module | Name | Screens | Description |
|--------|------|---------|-------------|
| 01 | Onboarding & Quản lý | S-0101 ~ S-0105, M-0101, T-0101, T-0102 | Onboarding, tạo nhóm bảo vệ và thêm thành viên |

---

## Screen Inventory

### Module 01: Onboarding & Quản lý

#### S-0101: Màn hình Giới thiệu tính năng
- **Type**: Screen
- **Source**: UC-01
- **Access roles**: Trưởng nhóm (A-01)
- **Description**: Màn hình giới thiệu lợi ích, tính năng và cách hoạt động của Bảo vệ Gia đình.
- **Components**:
  | Component | Type | Behavior | Notes |
  |-----------|------|----------|-------|
  | Illustration | image | display | Hình minh họa tính năng |
  | Title | text | display | Tiêu đề giới thiệu |
  | Description | text | display | Mô tả lợi ích, cách hoạt động |
  | Nút "Trải nghiệm ngay" | button | tap | Chuyển sang S-0102 |
- **States**:
  | State | Trigger | Description |
  |-------|---------|-------------|
  | default | - | Hiển thị thông tin giới thiệu |
- **Fake data**:
  ```json
  {
    "title": "Bảo vệ Gia đình cùng Lá Chắn Số",
    "description": "Chủ động bảo vệ người thân trước các cuộc gọi lừa đảo..."
  }
  ```

#### S-0102: Màn hình Điều khoản & Chính sách
- **Type**: Screen
- **Source**: UC-01
- **Access roles**: Trưởng nhóm (A-01)
- **Description**: Hiển thị toàn văn điều khoản Lá Chắn Số, yêu cầu người dùng đọc và đồng ý để tiếp tục.
- **Components**:
  | Component | Type | Behavior | Notes |
  |-----------|------|----------|-------|
  | Term Content | list/text | scroll | Dạng checkbox. Cho phép chọn nhiều |
  | Nút "Đồng ý" | button | tap | Mặc định disabled. Không cần design màn hình có button này khi enable |
  | Nút "Từ chối" | button | tap | Đóng flow onboarding |
- **States**:
  | State | Trigger | Description |
  |-------|---------|-------------|
  | default | - | Nút Đồng ý disabled |
- **Fake data**:
  ```json
  {
    "terms_content": "1. Thu thập dữ liệu...\n2. Quyền riêng tư...\n3. Điều khoản sử dụng Lá Chắn Số..."
  }
  ```

#### S-0104: Màn hình Danh sách thành viên (Trống / Có dữ liệu)
- **Type**: Screen
- **Source**: UC-02, UC-03
- **Access roles**: Trưởng nhóm (A-01)
- **Description**: Quản lý danh sách các thành viên trong nhóm bảo vệ.
- **Components**:
  | Component | Type | Behavior | Notes |
  |-----------|------|----------|-------|
  | Header | text | display | Tiêu đề "Bảo vệ gia đình" |
  | Nút "Thêm thành viên" | button | tap | Mở M-0101 |
  | Empty State Image | image | display | Hiển thị khi chưa có thành viên |
  | Member List | list | display | Danh sách thành viên trong nhóm |
- **States**:
  | State | Trigger | Description |
  |-------|---------|-------------|
  | empty | Nhóm chưa có thành viên | Hiển thị empty state image và CTA "Thêm thành viên" |
  | default | Nhóm có >= 1 thành viên | Hiển thị danh sách thành viên |
- **Fake data**:
  ```json
  {
    "members": []
  }
  ```

#### M-0101: Bottom Sheet Thêm thành viên thủ công
- **Type**: Modal / Bottom Sheet
- **Triggered from**: S-0104 + Tap "Thêm thành viên"
- **Description**: Nhập số điện thoại hoặc quét QR để thêm thành viên (chỉ thuê bao Viettel).
- **Components**:
  | Component | Type | Behavior | Notes |
  |-----------|------|----------|-------|
  | SĐT Input | input | text input | Chỉ nhập số (tối đa 10 số) |
  | Nút "Thêm" | button | tap | Gọi API thêm thành viên |
  | Error Text | text | display | Thông báo lỗi định dạng SĐT (inline error) |

- **Actions**:
  | Action | Result |
  |--------|--------|
  | Nhập SĐT hợp lệ và bấm Thêm | Đóng bottom sheet, quay lại S-0104 và gọi T-0101 (Success) |
  | Quét QR | Mở S-0105 |

#### T-0101: Toast Thêm thành viên thành công
- **Type**: Toast / Snackbar
- **Triggered from**: M-0101 + Nhấn "Thêm" (API thành công)
- **Message**: "Đã thêm thành công"
- **Duration**: short: 2s
- **Style**: success

#### T-0102: Toast Lỗi hệ thống/mạng
- **Type**: Toast / Snackbar
- **Triggered from**: M-0101 + Lỗi API / SĐT không phải Viettel
- **Message**: "Số điện thoại không thuộc nhà mạng Viettel..." hoặc "Không thể thêm thành viên. Vui lòng thử lại."
- **Duration**: long: 4s
- **Style**: error

---

## Navigation Flow

### Global Navigation
- **Type**: Top Tab (2 tabs segment control ở màn "Nhóm gia đình")
- **Items**:
  | Tab | Label | Target Screen |
  |-----|-------|---------------|
  | 1 | Nhóm gia đình | (Flow Tammi cũ) |
  | 2 | Bảo vệ Gia đình | S-0101 (lần đầu) / S-0104 (các lần sau) |

### Flow Map

| From | Trigger | To | Condition | Back behavior |
|------|---------|----|-----------|---------------|
| S-0101 | Tap "Tiếp tục" | S-0102 | - | Pop |
| S-0102 | Tap "Đồng ý" | S-0103 | Cuộn hết nội dung | None (Không quay lại) |
| S-0102 | Tap "Từ chối" | (Thoát flow) | - | Pop |
| S-0103 | Tap "Tạo nhóm bảo vệ" | S-0104 | API Success | None |
| S-0104 | Tap "Thêm thành viên" | M-0101 | - | Pop |
| M-0101 | Tap Icon "Quét QR" | S-0105 | - | Pop |
| S-0105 | Quét QR thành công | M-0101 | - | Pop (Fill data vào input) |
| M-0101 | Tap "Thêm" (Success) | S-0104 | Data hợp lệ | Pop (Kèm T-0101) |

### Conditional Flows

| Condition | Flow |
|-----------|------|
| First time user (Chưa onboard) | Tab "Bảo vệ Gia đình" → S-0101 → S-0102 → S-0103 → S-0104 |
| Returning user (Đã tạo nhóm) | Tab "Bảo vệ Gia đình" → S-0104 |

---

## Fake Data Summary

| Entity | Fields | Sample count | Used in screens |
|--------|--------|--------------|-----------------|
| Screen Text | title, description, terms_content | 1 | S-0101, S-0102 |

---

## Unresolved Items

| # | Screen | Issue | Impact |
|---|--------|-------|--------|
| 1 | M-0101 | Thông báo lỗi khi SĐT không phải Viettel hiển thị dạng inline error hay Toast popup? | UX consistency, đang giả định dùng Toast (T-0102) |

---

## Inferred Items

| # | Item | Reasoning |
|---|------|-----------|
| 1 | S-0105: Màn hình Quét QR | Cần có màn hình riêng biệt hiển thị camera khi người dùng chọn quét QR ở UC-03 AF-01 |
| 2 | T-0102: Toast Lỗi hệ thống/mạng | Cần hiển thị lỗi một cách rõ ràng khi API thất bại hoặc số điện thoại không thỏa mãn điều kiện nhà mạng Viettel |
