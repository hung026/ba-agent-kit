---
name: ui-descriptor
description: >
  Mô tả giao diện từ ảnh chụp hoặc Figma link thành bảng chi tiết component.
  Dùng skill này khi user paste ảnh màn hình, screenshot, mockup, wireframe,
  gửi link Figma, hoặc yêu cầu "mô tả giao diện", "mô tả UI", "liệt kê component",
  "phân tích màn hình", "describe UI", "UI spec".
  Kể cả khi user chỉ paste ảnh không nói gì thêm mà ảnh đó rõ ràng là giao diện app/web,
  hãy kích hoạt skill này.
---

# UI Descriptor

Mô tả giao diện từ ảnh hoặc Figma thành bảng component chi tiết.

## Quy trình

### Bước 1 — Nhận input

**Ảnh chụp:**
- Phân tích trực tiếp bằng vision.
- Nếu ảnh mờ/không rõ, yêu cầu user gửi lại ảnh chất lượng cao hơn.

**Figma link:**
- Dùng Figma MCP để đọc data thiết kế (layer name, component, spacing, color token...).
- Nếu MCP không khả dụng, yêu cầu user chụp ảnh thay thế.

**Nhiều màn hình:**
- Mỗi màn hình = 1 bảng riêng biệt.
- Đánh header rõ ràng: `### Màn hình: [Tên màn hình]`

### Bước 2 — Phân tích & tách component

Quét giao diện theo thứ tự **trên → dưới, trái → phải**. Tách component theo nguyên tắc:

1. **Header/Navigation** — thanh trên cùng, logo, menu, nút back
2. **Content chính** — banner, card, list, form, bảng dữ liệu
3. **Sidebar** — menu bên, filter panel
4. **Action** — nút CTA, FAB, bottom bar
5. **Overlay/Modal** — popup, toast, bottom sheet
6. **Footer** — thanh dưới cùng

Mỗi component là 1 dòng trong bảng. Nếu component có nhiều phần tử con quan trọng (VD: 1 card chứa ảnh + title + button), tách thành nhiều dòng với indent rõ ràng.

### Bước 3 — Điền bảng

Đọc file `TEMPLATE.md` cùng thư mục để lấy format bảng output.
Đọc file `EXAMPLE.md` cùng thư mục để tham khảo ví dụ output chuẩn.

**Quy tắc điền từng cột:**

| Cột | Quy tắc |
|-----|---------|
| ID | Số thứ tự từ 1. Component con dùng dạng 1.1, 1.2 |
| Thành phần | Tên component, ngắn gọn, dễ hiểu. VD: "Nút Đăng nhập", "Banner khuyến mãi" |
| Loại | Dùng tên chuẩn UI: Button, Text Input, Dropdown, Label, Icon, Image, Card, Toggle, Checkbox, Radio, Tab, Modal, Toast, Badge, Avatar, Divider, Carousel, Bottom Sheet, FAB, Chip, Search Bar, Date Picker, Slider, Progress Bar, Skeleton, Tooltip |
| Trạng thái | Liệt kê TẤT CẢ state: Default, Hover, Active, Focused, Disabled, Error, Loading, Empty, Selected. Chỉ ghi state có thể xảy ra |
| Mô tả giao diện | Xem quy tắc bên dưới |
| Validation | Rule validate nếu là input/form. Ghi "—" nếu không có |
| API Mapping | Endpoint + method + field tương ứng. Ghi "—" nếu không xác định được từ UI |

**Quy tắc cột "Mô tả giao diện":**

Cấu trúc mô tả theo 3 phần, dùng xuống dòng phân tách:
```
[Mô tả sơ bộ 1 câu]
→ Tương tác: [hành vi khi user tương tác]
→ Điều kiện: [khi nào show/hide, enable/disable]
```

- **Mô tả sơ bộ**: 1 câu ngắn nói component này là gì, dùng để làm gì. KHÔNG mô tả chi tiết visual (font, color, padding...).
- **Tương tác**: Ghi rõ click/tap/swipe/long press → chuyện gì xảy ra. Nếu không có tương tác, bỏ dòng này.
- **Điều kiện**: Ghi điều kiện hiển thị, ẩn, hoặc thay đổi trạng thái. Nếu luôn hiển thị, bỏ dòng này.

### Bước 4 — Output

- Output bằng **Markdown** trong chat.
- Nếu user gửi nhiều màn hình, mỗi màn hình 1 bảng có header riêng.
- Cuối bảng, thêm phần **"Ghi chú"** nếu có điều gì cần user xác nhận hoặc không rõ từ design.

## Lưu ý

- KHÔNG bịa component không có trên design.
- KHÔNG đoán API mapping nếu không có đủ context. Ghi "—" và note trong phần ghi chú.
- Nếu user đã cung cấp API docs hoặc context bổ sung, dùng để fill cột API Mapping.
- Nếu design có text placeholder (lorem ipsum), ghi rõ đó là placeholder.
- Component lặp lại (VD: list item) chỉ mô tả 1 lần, ghi note "lặp lại theo data".
