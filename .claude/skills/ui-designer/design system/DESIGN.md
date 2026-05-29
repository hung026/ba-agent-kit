

# 🎨 Design System: Tammi App (Overall Style)

## 1. Core Principles (Nguyên tắc thiết kế)

* **Phong cách:** Hiện đại, tối giản (Clean & Modern UI), thân thiện và trẻ trung.
* **Cảm giác:** Mềm mại (Soft UI), tạo sự thoải mái cho người dùng, sử dụng nhiều khoảng trắng (White space) để giao diện thoáng đãng.

## 2. Color Palette (Bảng màu)

Tông màu chủ đạo thiên về sự ấm áp, nổi bật trên nền sáng.

* **🎨 Primary Colors (Màu nhấn chính):**
* **Brand Red/Coral:** `~ #EF4444` đến `#F43F5E` (Sử dụng cho các icon active, button chính, text highlight quan trọng).
* **Gradient Alert/Badge:** Đỏ/Cam gradient (Dùng cho thông báo, avatar mặc định).


* **Neutral Colors (Màu trung tính):**
* **Background (Nền app):** Trắng `#FFFFFF` hoặc Xám rất nhạt `~ #FAFAFA`.
* **Surface (Nền Card/Panel):** Trắng `#FFFFFF` (Kèm shadow nhẹ).


* **Text Colors (Màu chữ):**
* **Primary Text:** Đen than / Xám đậm `~ #111827` (Cho Tiêu đề, tên người dùng).
* **Secondary Text:** Xám nhạt `~ #6B7280` (Cho phụ đề, placeholder, mô tả ngắn).



## 3. Typography (Nghệ thuật chữ)

* **Font Family:** Các font Sans-serif hiện đại, gọn gàng, bo nét tốt (Khuyến nghị: **Inter**, **SF Pro Display** hoặc **Be Vietnam Pro**).
* **Hierarchy:**
* **Headings (H1/H2):** Font-weight `Bold` hoặc `Semi-bold`. Kích thước lớn, rõ ràng.
* **Body Text:** Font-weight `Regular`.
* **Highlight Text:** Text quan trọng trong câu được bôi đậm và đổi màu sang Primary Color (Ví dụ: "dễ dàng", "đồng hành").



## 4. UI Elements & Geometry (Hình khối & Giao diện)

* **Border Radius (Độ bo góc):** Đặc trưng nổi bật nhất là sự bo tròn mềm mại.
* **Buttons/Tabs:** Dạng hạt thuốc (Pill-shape, `border-radius: 999px`) hoặc bo góc lớn (Ví dụ: Thanh chuyển đổi Bạn bè/Nhóm/Thiết bị).
* **Cards/Containers:** Bo góc mềm `~ 16px - 24px`.


* **Shadows (Đổ bóng):**
* Sử dụng **Soft Shadows** (Bóng mờ, lan rộng, opacity thấp `~ 5-10%`) cho các khối nổi (như sidebar, card, thanh điều hướng). Không dùng bóng gắt.


* **States (Trạng thái):**
* **Active (Đang chọn):** Nền tối (`#1F2937`) chữ trắng, HOẶC nền màu Primary chữ trắng.
* **Inactive (Không chọn):** Nền xám nhạt (`#F3F4F6`), chữ xám.



## 5. Iconography & Illustrations (Icon & Hình ảnh minh họa)

* **Icons:** * Sử dụng bộ icon nét mảnh (Line/Stroke icons), góc cạnh của icon cũng được bo tròn (Rounded cap/join).
* Icon khi Active được đặt trong một box nền vuông bo góc (Squircle) màu Primary.
