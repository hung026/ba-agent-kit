# Common Error/Warning — Parental Control

Tổng hợp các mã lỗi/cảnh báo dùng chung, tái sử dụng ở nhiều Use Case. Các UC khi cần các case lỗi dưới đây thì tham chiếu mã tương ứng, không định nghĩa lại.

| Mã | Loại | Title | Nội dung hiển thị | Trigger |
| :--- | :--- | :--- | :--- | :--- |
| E-000 | Popup | Đã xảy ra lỗi | Hệ thống gặp sự cố. Vui lòng thử lại sau. (Mã: {code}) | Lỗi không xác định (fallback) |
| E-001 | Toast | Mất kết nối | Mất kết nối mạng. Vui lòng kiểm tra kết nối và thử lại. | Client mất mạng khi gọi API (lưu/sửa/xóa hồ sơ, tạo mã QR, ghép nối thiết bị, đăng nhập SSO...) |
| E-002 | Toast | Hệ thống đang bận | Hệ thống đang bận, vui lòng thử lại sau. | Backend hoặc dịch vụ bên thứ ba (SSO Provider...) timeout / không phản hồi |
| E-003 | Popup | Phiên đã hết hạn | Phiên đăng nhập đã hết hạn, vui lòng thử lại. | Mã xác thực (authCode/accessToken/OTP) hết hạn hoặc không còn hợp lệ khi xác thực |
| E-004 | Popup | Cần cấp quyền | Ứng dụng cần được cấp quyền {tên quyền} để tiếp tục. Vui lòng cấp quyền trong Cài đặt. | User từ chối hoặc thu hồi quyền bắt buộc (camera, notification, accessibility, overlay...) |
| E-005 | Inline | Thiếu thông tin bắt buộc | Vui lòng nhập {tên trường}. | Trường bắt buộc bị bỏ trống khi submit form |

---

## Nguồn tham chiếu (mapping)

| Mã | Xuất hiện tại |
| :--- | :--- |
| E-001 | UC-01(FR-01).EF-07; UC-03(FR-01).EF-01, EF-02; UC-01(FR-03).EF-01; UC-02(FR-03).EF-02; UC-03(FR-03).EF-01; UC-05(FR-01).EF-04 |
| E-002 | UC-01(FR-01).EF-01, EF-02 |
| E-003 | UC-01(FR-01).EF-03, EF-04; UC-05(FR-01).EF-02 |
| E-004 | UC-05(FR-01).EF-03, EF-05; UC-06(FR-01).EF-01 |
| E-005 | UC-01(FR-03).AF-01; UC-02(FR-03).EF-01 |

## Case đã loại (specific, không gộp common)

Các lỗi sau chỉ xuất hiện ở đúng 1 UC, gắn với business rule riêng nên giữ nguyên tại UC đó, không đưa vào bảng common:

- SĐT sai định dạng (UC-01 FR-03)
- Ngày sinh ở tương lai (UC-01 FR-03)
- Vượt giới hạn số hồ sơ/thiết bị (UC-03 FR-01)
- QR sai / "Hồ sơ này đã có thiết bị" (UC-03, UC-05 FR-01)
- Nhiều thiết bị cùng quét — first-write-win (UC-05 FR-01)
- Hồ sơ bị xóa ở thiết bị/phiên khác khi đang sửa (UC-02 FR-03)
- Lệnh gỡ quản lý không tới máy con do offline kéo dài (UC-03 FR-03)

*Ghi chú: UC-02 (FR-01) "Xin quyền notification" đang bị gạch (~~...~~ = đã loại khỏi scope) nên lỗi của UC này không được tính vào bảng mapping trên.*
