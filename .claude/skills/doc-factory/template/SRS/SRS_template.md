# SRS Template

## Rules:**
- Sections that contains "(Optional)" in section header can be skipped if there is no information, or is not required by user

## Document Structure

```markdown
# [Tên Dự án/Tính năng] - Đặc tả Use Case

## 1. Tổng quan

[Tổng quan ngắn gọn: chúng ta đang xây dựng cái gì và tại sao]

## 2. Danh sách Use Case

| Nhóm chức năng | ID Use Case | Tên Use Case | Actor | Điều kiện trước | Điều kiện sau|
|-------------|-------------|---------------|---------------|----------------|-----------------|
| ... | UC-001 | ... | ... | ... | ... |

## 3. Đặc tả chi tiết Use Case

### 3.1 [Tên chức năng]

#### 1. UC-001: [Tên UC]

| Tiêu đề | Mô tả |
| ------------------------ | -------- |
| ID Use Case | |
| Tên Use Case | |
| Mô tả | |
| Actor chính | |
| Điều kiện trước | |
| Kích hoạt (Trigger) | |
| Điều kiện sau – Thành công | |
| Điều kiện sau – Thất bại | |

#### 2. Luồng chính (Happy Path)

| Bước | Actor | Hành động / Phản hồi của Hệ thống | BR liên quan(nếu có) |
| :--- | :--- | :--- | :--- |
| 1 | User | | BR |
| 2 | Hệ thống | | BR |
| 3 | User | | BR |
| 4 | Hệ thống | | BR |

#### 3. Luồng thay thế (Alternative Flow)

| ID Luồng | Bước | Mô tả | BR liên quan(nếu có) |
| :--- | :--- | :--- | :--- |
| AF-01 | Bước | | BR |
| AF-02 | Bước | | BR |

#### 4. Quy tắc Nghiệp vụ (Business Rules)

| Business Rules | Mô tả |
| :--- | :--- |
| BR-01 | |
| BR-02 | |

#### 5. Luồng Ngoại lệ / Lỗi (Exception / Error Flow)

| ID Luồng | Bước | Lỗi | Xử lý | Cơ chế fallback | BR liên quan(nếu có) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| EF-01 | Bước | | |  | |
| EF-02 | Bước | | |  | |

---

## 4. Yêu cầu Phi chức năng (OPTIONAL)
[Chỉ viết nếu tính năng có yêu cầu về NFR]

| ID | Loại | Mô tả |
| :--- | :--- | :--- |
| NFR-01 | | |
| NFR-02 | | |

## 5. Event tracking (Mix panel)
[LUÔN mặc định viết: `Đừng quên em nhé`. Không cần mô tả thêm]

## 6. Thiết kế API
[LUÔN mặc định viết: `N/A`. Không cần mô tả thêm]

## 7. Thiết kế thuật toán
[LUÔN mặc định viết: `N/A`. Không cần mô tả thêm]

## 8. Câu hỏi mở & Giả định (Optional)
[Bất kỳ điểm không chắc chắn hoặc giả định nào còn lại]

## 9. Phụ lục (Optional)
[Chỉ viết khi có các thông tin bổ sung hoặc tham chiếu. Nếu không, viết `N/A`.]

```
---
# Example Outputs

## Ví dụ 1: Đặc tả chi tiết Use Case
### [Đăng nhập]

#### 1. UC-001: [Đăng ký User]
| Tiêu đề | Mô tả |
| --- | -------------- |
| ID Use Case | UC-001 |
| Tên Use Case | Đăng ký User |
| Mô tả | User đăng ký tài khoản mới |
| Actor chính | User |
| Điều kiện tiên quyết | Thiết bị của User có kết nối internet |
| Kích hoạt (Trigger) | User nhấn "Tạo tài khoản mới" |
| Điều kiện sau – Thành công | User tạo tài khoản mới thành công |
| Điều kiện sau – Thất bại | Hệ thống hiển thị thông báo lỗi tương ứng |

#### 2. Luồng chính (Happy Path)

| Bước | Actor | Hành động / Phản hồi của Hệ thống | BR liên quan(nếu có) |
| :--- | :--- | :--- | :--- |
| 1 | User | Điều hướng đến trang đăng nhập | BR-01 |
| 2 | User | Nhập email/tên đăng nhập và mật khẩu | BR-02 |
| 3 | User | Nhấn nút "Đăng nhập" | BR-03 |
| 4 | Hệ thống | Xác định định dạng đầu vào | BR-04 |
| 5 | Hệ thống | Xác thực thông tin đăng nhập | BR-05 |
| 6 | Hệ thống | Tạo phiên làm việc (session) và chuyển hướng User | BR-06 |

#### 3. Luồng thay thế (Alternative Flow)

| ID Luồng | Bước | Mô tả | BR liên quan(nếu có)|
| :--- | :--- | :--- | :--- |
| AF-01 | Bước 2 | User chỉnh sửa thông tin trước khi gửi | BR-02 |
| AF-02 | Bước 6 | User được chuyển hướng đến trang bảo mật truy cập cuối cùng | BR-07 |

#### 4. Quy tắc Nghiệp vụ (Business Rules)

| Business Rules | Mô tả |
| :--- | :--- |
| BR-01 | Trang đăng nhập phải có thể truy cập được bởi User chưa xác thực |
| BR-02 | Các trường email/tên đăng nhập và mật khẩu là bắt buộc |
| BR-03 | Nút đăng nhập chỉ được bật khi các trường bắt buộc đã được điền |
| BR-04 | Email phải theo định dạng hợp lệ |
| BR-05 | Thông tin đăng nhập phải khớp với dữ liệu tài khoản đã lưu |
| BR-06 | Đăng nhập thành công tạo ra một phiên làm việc an toàn cho User |
| BR-07 | User được chuyển hướng đến trang bảo mật được yêu cầu cuối cùng nếu có |
| BR-08 | Tài khoản bị khóa sau 5 lần thử đăng nhập thất bại liên tiếp |
| BR-09 | Cho phép thử lại nếu dịch vụ xác thực bị lỗi |

#### 5. Luồng Ngoại lệ / Lỗi (Exception / Error Flow)

| ID Luồng | Bước | Lỗi | Cơ chế fallback | BR liên quan(nếu có) |
| :--- | :--- | :--- | :--- | :--- |
| EF-01 | Bước 4 | Định dạng email/tên đăng nhập không hợp lệ | Hiển thị thông báo lỗi định dạng | BR-04 |
| EF-02 | Bước 5 | Sai tên đăng nhập hoặc mật khẩu | Hiển thị thông báo lỗi xác thực | BR-05 |
| EF-03 | Bước 5 | Tài khoản bị khóa hoặc không hoạt động | Hiển thị thông báo trạng thái tài khoản | BR-08 |
| EF-04 | Bước 5 | Dịch vụ xác thực không khả dụng | Hiển thị lỗi hệ thống và cho phép thử lại | BR-09 |

---

## Ví dụ 2: Yêu cầu Phi chức năng (Non-functional Requirements)

| ID | Loại | Mô tả |
| :--- | :--- | :--- |
| NFR-01 | Bảo mật | Mật khẩu phải được mã hóa bằng bcrypt với ít nhất 10 salt rounds |
| NFR-02 | Hiệu năng | Thời gian phản hồi API đăng ký không quá 3 giây |
| NFR-03 | Tính khả dụng | Hệ thống hỗ trợ tốt nhất trên Samsung Galaxy S24 và các dòng Android mới |
| NFR-04 | Tin cậy | Tỷ lệ gửi email thành công (Service level) đạt 99.9% |

---

## Ví dụ 3: Phụ lục
Ví dụ trường hợp có nội dung tham chiếu, thì cần viết phụ lục:

#### 2. Luồng chính (Happy Path)
| Bước | Actor | Hành động / Phản hồi của Hệ thống | BR liên quan(nếu có) | 
| :--- | :--- | :--- | :--- |
| 1 | Hệ thống | Gửi push notification. Nội dung noti tương ứng với từng trường hợp được định nghĩa ở Phụ lục PL-01|  |


#### 10. Phụ lục:
**PL-01**
| ID | Trường hợp | Nội dung noti |
| :--- | :--- | :--- |
| 1 | Với user chưa đăng nhập | Title: "ABC". Body: "XYZ" |
| 2 | Với user đã đăng nhập | Title: "DEF". Body: "HIK" |

