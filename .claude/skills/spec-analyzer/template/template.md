# Output Template

Sao chép cấu trúc này và điền nội dung.

---

```markdown
# [Tên Project] — Đặc tả màn hình

**Platform**: [Mobile App / Web]
**Tổng**: [X] màn hình, [X] modal, [X] dialog, [X] toast

---

## Tổng quan module

| # | Module | Màn hình | Mô tả ngắn |
|---|--------|----------|-------------|
| 01 | [tên] | S-0101 ~ S-01XX | [1 dòng] |
| 02 | [tên] | S-0201 ~ S-02XX | [1 dòng] |

---

## Điều hướng chung

**Kiểu**: [Tab bar dưới / Drawer trái / Không có]

| Tab | Nhãn | Icon gợi ý | Đến màn |
|-----|------|------------|---------|
| 1 | [nhãn] | [mô tả icon] | S-XXXX |

---

## Màn hình chi tiết

### S-0101: [Tên màn]
[suy luận] ← nếu không có trong SRS gốc

**Mục đích**: [1 câu: màn này để làm gì]

**Bố cục**:
- Trên cùng: [mô tả vùng header]
- Giữa (cuộn được): [mô tả vùng nội dung]
- Dưới cùng (cố định): [mô tả vùng bottom nếu có]

**Thành phần**:
| # | Tên | Loại | Nội dung / Mô tả | Tương tác |
|---|-----|------|-------------------|-----------|
| 1 | [tên] | [nút / input / danh sách / ảnh / icon / text / toggle / ...] | [nội dung cụ thể hiển thị] | [bấm → đi S-XXXX / nhập text / vuốt → hiện X / chỉ hiển thị] |

**Trạng thái hiển thị**:
| Trạng thái | Khác gì so với mặc định |
|------------|------------------------|
| Trống | [mô tả giao diện khi không có dữ liệu] |
| Đang tải | [mô tả: skeleton / spinner / ...] |

Chỉ liệt kê trạng thái khi UI thực sự trông khác. Màn tĩnh không cần bảng này.

**Nội dung mẫu**:
[Liệt kê dữ liệu giả để designer biết format hiển thị]
- Tên: "Nguyễn Minh Anh"
- Giá: "45.000đ"
- Danh sách: 3-4 item mẫu với đủ field

---

### M-XXXX: [Tên modal]

**Mở từ**: [S-XXXX] → [bấm gì]
**Kiểu**: [Bottom sheet / Modal giữa]
**Mục đích**: [1 câu]

**Thành phần**: [bảng tương tự screen]

**Hành động**:
| Nút | Nhãn | Kết quả |
|-----|------|---------|
| Chính | [text nút] | [đóng modal + thay đổi gì] |
| Phụ | [text nút] | [đóng modal] |

---

### P-XXXX: [Tên dialog]

**Mở từ**: [S-XXXX] → [bấm gì]
**Tiêu đề**: "[text]"
**Nội dung**: "[text]"
**Nút**: [Tên nút chính] / [Tên nút phụ]

---

### T-XXXX: [Tên toast]

**Hiện khi**: [S-XXXX] → [action gì]
**Nội dung**: "[text hiển thị]"
**Kiểu**: [thành công / lỗi / thông tin]

---

## Luồng chuyển màn

| Từ | Bấm | Đến | Điều kiện |
|----|-----|-----|-----------|
| S-0101 | Nút "Đăng nhập" | S-0201 | Form hợp lệ |
| S-0101 | Link "Đăng ký" | S-0102 | - |

---

## Luồng có điều kiện

| Điều kiện | Luồng |
|-----------|-------|
| Lần đầu dùng app | S-0101 → S-0201 (Onboarding) → S-0301 |
| Đã đăng nhập | → S-0301 (Home) |

---

## Chưa rõ

| # | Màn | Vấn đề |
|---|-----|--------|
| 1 | [S-XXXX] | [điều gì chưa rõ trong SRS] |

## Suy luận thêm

| # | Mục | Lý do |
|---|-----|-------|
| 1 | [ID + tên] | [tại sao cần thêm] |
```
