# Template mô tả giao diện

## Format output

### Màn hình: [Tên màn hình]

| ID | Thành phần | Loại | Trạng thái | Mô tả giao diện | Validation | API Mapping |
|----|-----------|------|------------|-----------------|------------|-------------|
| 1 | [Tên] | [Loại] | [States] | [Mô tả] | [Rule] | [API info] |
| 1.1 | [Tên con] | [Loại] | [States] | [Mô tả] | [Rule] | [API info] |
| 2 | [Tên] | [Loại] | [States] | [Mô tả] | [Rule] | [API info] |

**Ghi chú:**
- [Điều gì chưa rõ cần user xác nhận]

---

## Quy ước

- ID: component cha = số nguyên (1, 2, 3). Component con = cha.thứ_tự (1.1, 1.2).
- Trạng thái: phân tách bằng dấu `/`. VD: `Default / Hover / Disabled`
- Mô tả giao diện: dùng `→` để tách phần tương tác và điều kiện.
- Validation: ghi "—" nếu không có.
- API Mapping: format `[METHOD] /endpoint → field_name`. Ghi "—" nếu không xác định.
