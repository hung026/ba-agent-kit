# User story template

## Rules:**
- Sections that contains "(Optional)" in section header can be skipped if there is no information, or is not required by user
- In article `7. Thiết kế giao diện`,  `API mapping` and `Database mapping` is optional. Only add if really necessary.

## Document Structure

```markdown
# [Tên Dự án/Tính năng] - Đặc tả User Story

## 1. Executive Summary
[Tóm tắt ngắn gọn: chúng ta đang xây dựng cái gì và tại sao]

## 2. User Story List

| User Story ID | User Story | Actor | Pre-condition | Post-condition |
|---------------|----------------|---------------|----------------|-----------------|
| US-001 | ... | ... | ... | ... |

## 3. Chi tiết User Story

### 3.1 [Tên Feature/Epic]

#### US-001: [Tiêu đề Story]
1. **US statement:**

**As a** [loại người dùng/persona]  
**I want** [chức năng]  
**So that** [giá trị kinh doanh/kết quả]

2. **Acceptance Criteria**:
- AC1: GIVEN [điều kiện] WHEN [hành động] THEN [kết quả mong đợi]
- AC2: GIVEN [điều kiện] WHEN [hành động] THEN [kết quả mong đợi — trường hợp lỗi/tiêu cực]

3. **Exception & Edge Cases**:

| Scenario | Cách xử lý | Cơ chế Fallback |
| :--- | :--- | :--- |
| [tên exception] | [cách xử lý exception] | [nếu xử lý exception vẫn lỗi thì làm gì] |

4. **Mô tả giao diện**:

| Trường UI | Mô tả | Kiểu / Validate | API mapping | Database mapping |
|---|---|---|---|---|
| [điền `-`] | [mô tả 1 bước trong nghiệp vụ] | [loại component + rule validation] | [tên bước nghiệp vụ] · `[METHOD] [/đường-dẫn-api]` | Bảng `[tên_bảng]`: [tên_trường_tương_ứng] | 

5. **Technical Context & NFR** (nếu cần):
[Bất kỳ chi tiết kỹ thuật/business rules nào giúp developer hiểu cách triển khai, hoặc yêu cầu phi chức năng (NFR)]

**
---

## 4. Câu hỏi mở và giả định (OPTIONAL)
[Bất kỳ điều gì chưa chắc chắn hoặc các giả định đã đưa ra]

```

## Ví dụ

### Ví dụ 1: Danh sách user story

| User Story ID | User Story | Actor | Pre-conditions | Post-conditions |
|-------------|---------------|---------------|----------------|-----------------|
| US-001 | Đăng ký người dùng | Người dùng mới | Có email hợp lệ, chưa đăng ký | Tài khoản đã tạo, đã gửi email xác thực |
| US-002 | Xác thực email | Người dùng mới | US-001 hoàn tất, link xác thực hợp lệ | Tài khoản được kích hoạt, có thể login |
| US-003 | Đăng nhập | Người dùng đã đăng ký | US-002 hoàn tất, thông tin đăng nhập đúng | Session đã tạo, chuyển hướng đến dashboard |

### Ví dụ 2: Chi tiết User Story

#### User Story US-001: Đăng ký người dùng
1. **US statement**
**As a** khách truy cập mới  
**I want** tạo tài khoản bằng email của mình  
**So that** tôi có thể truy cập các tính năng cá nhân hóa và lưu dữ liệu

2. **Acceptance Criteria**:
```
AC1: Đăng ký thành công
Given tôi đang ở trang đăng ký
When tôi nhập email hợp lệ, mật khẩu (8+ ký tự gồm 1 số), và tên
And tôi nhấn "Sign Up"
Then tài khoản được tạo với trạng thái "pending"
And tôi nhận được email xác thực trong vòng 2 phút
And tôi thấy thông báo thành công "Kiểm tra email để xác thực tài khoản"

AC2: Mật khẩu quá yếu
Given tôi đang ở trang đăng ký
When tôi nhập mật khẩu ít hơn 8 ký tự
Then tôi thấy lỗi nội dòng "Mật khẩu phải có ít nhất 8 ký tự"
And nút "Sign Up" bị vô hiệu hóa

AC3: Email đã tồn tại
Given một tài khoản với email "user@example.com" đã tồn tại
When tôi thử đăng ký với "user@example.com"
Then tôi thấy lỗi "Email này đã được đăng ký. Thử đăng nhập?"
And tôi thấy một liên kết đến trang login
```

3. **Exception & Edge Cases**:

| Scenario | Cách xử lý | Cơ chế Fallback |
| :--- | :--- | :--- |
| Email service lỗi | Đưa email vào hàng đợi background job, thử lại mỗi 5 phút trong 1 giờ | Hiện cảnh báo "Email bị chậm, kiểm tra thư rác. Không nhận được? Nhấn gửi lại" |
| Đăng ký trùng lặp khi đang xử lý | Database unique constraint ngăn chặn trùng lặp, trả về 409 Conflict | Hiện "Email này vừa mới được đăng ký. Vui lòng đăng nhập" |
| Định dạng email không hợp lệ | Validation phía client chặn submit, kiểm tra regex trên server | Hiện lỗi nội dòng "Vui lòng nhập địa chỉ email hợp lệ" |
| Tấn công SQL injection | Parameterized queries ngăn chặn injection, log hoạt động nghi vấn | Trả về lỗi chung 400 Bad Request, kích hoạt security alert |
| Vượt quá Rate limit | Trả về 429 Too Many Requests với header retry-after | Hiện "Quá nhiều lần thử. Vui lòng thử lại sau [X] phút" |
| Network timeout | Hiện toast Mất kết nối, thử lại 3 lần | Cache dữ liệu cục bộ, cho phép chế độ offline |
| Định dạng email không hợp lệ | Hiện lỗi nội dòng Vui lòng nhập email hợp lệ | Bôi đỏ trường nhập, vô hiệu hóa submit |

4. **Technical Context & NFR**:
- Mật khẩu phải được hashed bằng bcrypt (tối thiểu 10 salt rounds)
- Token xác thực email hết hạn sau 24 giờ
- Rate limit: 5 lần thử đăng ký mỗi IP mỗi giờ
- Chỉ hỗ trợ dòng Samsung Galaxy S24 trở lên
- Không hỗ trợ icon, chỉ text

### Ví dụ 3: Thiết kế giao diện
Ví dụ cách viết 1 bảng mô tả giao diện

| Trường UI | Mô tả | Kiểu / Validate | API mapping | Database mapping |
|---|---|---|---|---|
| - | Tên đầy đủ của khách hàng | Text input, bắt buộc, max 100 ký tự | | |
| - | SĐT liên hệ chính, dùng định danh | Text input, bắt buộc, 10 số, unique | Check trùng · `POST /api/customer/check-phone`| Bảng `customer`: `phone` | 
| - | Nơi cư trú của khách hàng | Dropdown, bắt buộc | Load form · `GET /api/customer/init` | Bảng `province`: `id`, `name` |
| - | Lưu thông tin khách hàng | Button, mặc định disable. Enable khi tên và số điện thoại hợp lệ | Lưu KH · `POST /api/customer/create`  | Bảng `province`: `id`, `name` |

---

