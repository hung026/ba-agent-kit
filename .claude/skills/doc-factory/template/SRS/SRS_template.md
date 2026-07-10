# SRS Template

## Rules

- Sections that contains "(Optional)" in section header can be skipped if there is no information, or is not required by user

## Document Structure

```markdown
# [Tên Dự án/Tính năng] - Đặc tả Use Case

## 1. Tổng quan

[Tổng quan ngắn gọn: chúng ta đang xây dựng cái gì và tại sao]

## 2. Danh sách Use Case

| Nhóm chức năng | ID Use Case | Tên Use Case | Actor | Pre-condition | Post-condition|
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
| Actor | |
| Pre-condition | |
| Trigger | |
| Post-condition – Thành công | |
| Post-condition – Thất bại | |

#### 2. Luồng chính (Happy Path)

| Bước | Actor | Hành động / Phản hồi của Hệ thống |
| :--- | :--- | :--- |
| 1 | User | |
| 2 | Hệ thống | |
| 3 | User | |
| 4 | Hệ thống | |

#### 3. Luồng thay thế (Alternative Flow)

| ID Luồng | Bước | Mô tả |
| :--- | :--- | :--- |
| AF-01 | Bước | |
| AF-02 | Bước | |

#### 4. Quy tắc Nghiệp vụ (Business Rules)

| Business Rules | Mô tả |
| :--- | :--- |
| BR-01 | |
| BR-02 | |

#### 5. Luồng Ngoại lệ / Lỗi (Exception / Error Flow)

| ID Luồng | Bước | Loại | Title | Error message | Trigger |
| :--- | :--- | :--- | :--- | :--- | :--- |
| EF-01 | Bước | | | | |
| EF-02 | Bước | | | | |

- **Loại**: Loại hiển thị lỗi — inline, toast, popup,...
- **Title**: Title hiển thị khi show lỗi (thường bỏ trống nếu Loại là inline hoặc toast)
- **Trigger**: Điều kiện/nguyên nhân gây ra lỗi

#### 6. Yêu cầu Phi chức năng (OPTIONAL)
[Chỉ viết nếu tính năng có yêu cầu về NFR]

| ID | Loại | Mô tả |
| :--- | :--- | :--- |
| NFR-01 | | |
| NFR-02 | | |

#### 7. Thiết kế giao diện

[LUÔN mặc định viết: `N/A`. Không cần mô tả thêm] 

#### 8. Event tracking (Mix panel)
[LUÔN mặc định viết: `N/A`. Không cần mô tả thêm] 

#### 9. Thiết kế API
[LUÔN mặc định viết: `N/A`. Không cần mô tả thêm]

#### 10. Thiết kế thuật toán
[LUÔN mặc định viết: `N/A`. Không cần mô tả thêm]

### 3.2. Câu hỏi mở & Giả định (Optional)
[Bất kỳ điểm không chắc chắn hoặc giả định nào còn lại]

### 3.3. Phụ lục (Optional)
[Chỉ viết khi có các thông tin bổ sung hoặc tham chiếu. Nếu không, viết `N/A`.]
```

---

# Example Outputs

## Ví dụ 1: Đặc tả chi tiết Use Case

### [Đăng nhập]

#### 1. UC-001: [Đăng nhập qua SSO]

| Tiêu đề                     | Mô tả                                                                                                           |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------- |
| ID Use Case                    | UC-001                                                                                                            |
| Tên Use Case                  | Đăng nhập qua SSO                                                                                              |
| Mô tả                        | User đăng nhập vào App bằng tài khoản SSO đã đăng nhập sẵn, không cần nhập lại mật khẩu riêng |
| Actor                          | User (đã đăng nhập tài khoản SSO)                                                                          |
| Pre-condition                  | User đã đăng nhập thành công vào tài khoản SSO                                                          |
| Trigger                        | User nhấn "Đăng nhập"                                                                                         |
| Post-condition – Thành công | Đăng nhập thành công, tạo session; nếu chưa có tài khoản App thì tự tạo mới                        |
| Post-condition – Thất bại   | Hiển thị lỗi tương ứng, không tạo session                                                                 |

#### 2. Luồng chính (Happy Path)

| Bước | Actor       | Hành động / Phản hồi của Hệ thống                                                                             |
| :----- | :---------- | :-------------------------------------------------------------------------------------------------------------------- |
| 1      | User        | Mở app Tammi (đã đăng nhập từ trước)                                                                         |
| 2      | User        | Truy cập 1 Mini App, bấm "Tiếp tục" ở màn giới thiệu                                                         |
| 3      | Mini App    | Gọi API`getAuthCode` đến Tammi để lấy mã xác thực (authCode)                                               |
| 4      | Tammi       | Lấy authCode từ hệ thống Viettel SSO, trả authCode lại cho Mini App                                             |
| 5      | Mini App    | Gửi`getUserInfo` kèm authCode đến Mini App Backend                                                              |
| 6      | Mini App BE | Gọi API`getAccessToken` kèm authCode đến Viettel SSO                                                            |
| 7      | Viettel SSO | Nếu authCode hợp lệ và còn hiệu lực → trả về accessToken                                                    |
| 8      | Mini App BE | Gọi API`getUserInfo` kèm accessToken đến Viettel SSO                                                            |
| 9      | Viettel SSO | Nếu accessToken hợp lệ → trả thông tin người dùng (SĐT, Họ tên) về Mini App Backend                      |
| 10     | Mini App BE | Kiểm tra SĐT: chưa có tài khoản Mini App → tạo tài khoản mới; đã có → dùng lại tài khoản hiện có |
| 11     | Mini App BE | Trả token đăng nhập cho Mini App → Mini App tự động đăng nhập                                              |

#### 3. Luồng thay thế (Alternative Flow)

| ID Luồng | Bước   | Mô tả                                                                                 |
| :-------- | :------- | :-------------------------------------------------------------------------------------- |
| AF-01     | Bước 5 | User chưa có tài khoản App → hệ thống tự tạo tài khoản mới (login = signup) |

#### 4. Quy tắc Nghiệp vụ (Business Rules)

| Business Rules | Mô tả                                                                                    |
| :------------- | :----------------------------------------------------------------------------------------- |
| BR-01          | `authCode` do SSO Provider cấp, single-use, có thời hạn ngắn                        |
| BR-02          | `accessToken` chỉ trao đổi nội bộ giữa App ↔ Backend ↔ SSO Provider              |
| BR-03          | Login = signup: chưa có tài khoản thì tự tạo mới từ thông tin nhận từ SSO      |
| BR-04          | Toàn bộ bước xác thực enforce ở server, không tin dữ liệu định danh từ client |

#### 5. Luồng Ngoại lệ / Lỗi (Exception / Error Flow)

| ID Luồng | Bước   | Loại  | Title                    | Error message                                | Trigger                                        |
| :-------- | :------- | :----- | :-------------------------- | :------------------------------------------- | :------------------------------------------------ |
| EF-01     | Bước 2 | Toast |                           | "Không thể kết nối, vui lòng thử lại" | Gọi SSO Provider thất bại (timeout)              |
| EF-02     | Bước 3 | Popup | Phiên đăng nhập hết hạn | "Phiên đăng nhập đã hết hạn"         | `authCode` hết hạn hoặc không hợp lệ        |
| EF-03     | Bước 4 | Popup | Đăng nhập thất bại     | "Không lấy được thông tin tài khoản" | SSO Provider trả thiếu dữ liệu định danh User |

---

## Ví dụ 2: Yêu cầu Phi chức năng (Non-functional Requirements)

| ID     | Loại            | Mô tả                                                                             |
| :----- | :--------------- | :---------------------------------------------------------------------------------- |
| NFR-01 | Bảo mật        | Mật khẩu phải được mã hóa bằng bcrypt với ít nhất 10 salt rounds        |
| NFR-02 | Hiệu năng      | Thời gian phản hồi API đăng ký không quá 3 giây                            |
| NFR-03 | Tính khả dụng | Hệ thống hỗ trợ tốt nhất trên Samsung Galaxy S24 và các dòng Android mới |
| NFR-04 | Tin cậy         | Tỷ lệ gửi email thành công (Service level) đạt 99.9%                         |

---

## Ví dụ 3: Phụ lục

Ví dụ trường hợp có nội dung tham chiếu, thì cần viết phụ lục:

#### 2. Luồng chính (Happy Path)

| Bước | Actor      | Hành động / Phản hồi của Hệ thống                                                                             |
| :----- | :--------- | :-------------------------------------------------------------------------------------------------------------------- |
| 1      | Hệ thống | Gửi push notification. Nội dung noti tương ứng với từng trường hợp được định nghĩa ở Phụ lục PL-01 |

#### 10. Phụ lục:

**PL-01**

| ID | Trường hợp                | Nội dung noti            |
| :- | :--------------------------- | :------------------------ |
| 1  | Với user chưa đăng nhập | Title: "ABC". Body: "XYZ" |
| 2  | Với user đã đăng nhập  | Title: "DEF". Body: "HIK" |
