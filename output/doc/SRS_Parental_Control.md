# Parental Control — Đặc tả chi tiết Use Case

---

## FR-01: Pairing

---

### UC-01: Xác thực người dùng qua Tammi SSO

**1. Thông tin chung**

| Tiêu đề                     | Mô tả                                                                                                                                                                                             |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ID Use Case                    | UC-01 (FR-01)                                                                                                                                                                                       |
| Tên Use Case                  | Xác thực người dùng qua Tammi SSO (Login Mini App)                                                                                                                                             |
| Mô tả                        | Phụ huynh đăng nhập/đăng ký Mini bằng tài khoản Tammi đã đăng nhập sẵn, thông qua cơ chế SSO với hệ thống Viettel SSO — không cần nhập lại SĐT/OTP riêng cho Mini App |
| Actor                          | Phụ huynh (đã đăng nhập tài khoản Tammi)                                                                                                                                                    |
| Pre-condition                  | Phụ huynh đã đăng nhập thành công vào app Tammi; đang ở màn giới thiệu Mini App Parental Control                                                                                      |
| Trigger                        | Phụ huynh bấm "Tiếp tục" tại màn giới thiệu Mini App                                                                                                                                        |
| Post-condition – Thành công | Đăng nhập thành công vào Mini App, tạo session                                                                                                                                               |
| Post-condition – Thất bại   | Hiển thị lỗi tương ứng, không tạo session, giữ nguyên màn giới thiệu Mini App                                                                                                          |

**2. Luồng chính (Happy Path)**

| Bước | Actor                    | Hành động / Phản hồi của Hệ thống                                                                             |
| :----- | :----------------------- | :-------------------------------------------------------------------------------------------------------------------- |
| 1      | Phụ huynh               | Mở app Tammi (đã đăng nhập từ trước)                                                                         |
| 2      | Phụ huynh               | Truy cập Mini App Parental Control, bấm "Tiếp tục" ở màn giới thiệu                                           |
| 3      | Hệ thống (Mini App)    | Gọi API`getAuthCode` đến Tammi để lấy mã xác thực (authCode)                                               |
| 4      | Hệ thống (Tammi)       | Lấy authCode từ hệ thống Viettel SSO, trả authCode lại cho Mini App                                             |
| 5      | Hệ thống (Mini App)    | Gửi`getUserInfo` kèm authCode đến Mini App Backend                                                              |
| 6      | Hệ thống (Mini App BE) | Gọi API`getAccessToken` kèm authCode đến Viettel SSO                                                            |
| 7      | Hệ thống (Viettel SSO) | Nếu authCode hợp lệ và còn hiệu lực → trả về accessToken                                                    |
| 8      | Hệ thống (Mini App BE) | Gọi API`getUserInfo` kèm accessToken đến Viettel SSO                                                            |
| 9      | Hệ thống (Viettel SSO) | Nếu accessToken hợp lệ → trả thông tin người dùng (SĐT, Họ tên) về Mini App Backend                      |
| 10     | Hệ thống (Mini App BE) | Kiểm tra SĐT: chưa có tài khoản Mini App → tạo tài khoản mới; đã có → dùng lại tài khoản hiện có |
| 11     | Hệ thống (Mini App BE) | Trả token đăng nhập cho Mini App → Mini App tự động đăng nhập                                              |

**3. Luồng thay thế (Alternative Flow)**

N/A

**4. Quy tắc Nghiệp vụ (Business Rules)**

N/A

**5. Luồng Ngoại lệ / Lỗi (Exception / Error Flow)**

[Theo định nghĩa lỗi của Tammi]

| ID Luồng | Bước      | Loại  | Title                    | Error message                                                    | Trigger                                                                        |
| :-------- | :---------- | :----- | :------------------------ | :---------------------------------------------------------------- | :-------------------------------------------------------------------------------- |
| EF-01     | Bước 3    | Toast |                          | "Không thể kết nối Tammi, vui lòng thử lại"                | Mini App gọi`getAuthCode` thất bại (Tammi lỗi/timeout)                      |
| EF-02     | Bước 4    | Toast |                          | "Hệ thống đang bận, vui lòng thử lại sau"                  | Tammi không lấy được authCode từ Viettel SSO (Viettel SSO down/timeout) |
| EF-03     | Bước 6, 7 | Popup | Phiên đăng nhập hết hạn | "Phiên đăng nhập đã hết hạn, vui lòng thử lại"           | authCode hết hạn hoặc không hợp lệ khi đổi accessToken                |
| EF-04     | Bước 8, 9 | Popup | Phiên đăng nhập hết hạn | "Phiên đăng nhập đã hết hạn, vui lòng thử lại"           | accessToken hết hạn hoặc không hợp lệ khi gọi`getUserInfo`           |
| EF-05     | Bước 9    | Popup | Đăng nhập thất bại     | "Không lấy được thông tin tài khoản, vui lòng liên hệ hỗ trợ" | Viettel SSO trả thiếu dữ liệu (không có SĐT)                           |
| EF-06     | Bước 10   | Popup | Đã xảy ra lỗi          | "Có lỗi xảy ra, vui lòng thử lại"                          | Tạo tài khoản Mini App mới thất bại (lỗi ghi DB)                       |
| EF-07     | Bước 11   | Toast |                          | Toast "Mất kết nối"                                             | Mất mạng khi Mini App Backend trả token về Mini App                       |

**6. Yêu cầu Phi chức năng (NFR)**

N/A

**7. Thiết kế giao diện**
N/A

**8. Event tracking (Mixpanel)**
N/A

**9. Thiết kế API**
N/A

**10. Thiết kế thuật toán**
N/A

---

### ~~UC-02: Xin quyền cần thiết (Cấp quyền notification)~~

**1. Thông tin chung**

| Tiêu đề                     | Mô tả                                                                                                                                                                       |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ID Use Case                    | UC-02 (FR-01)                                                                                                                                                                 |
| Tên Use Case                  | Xin quyền cần thiết (cấp quyền notification)                                                                                                                             |
| Mô tả                        | Phụ huynh được giải thích rõ rồi cấp quyền nhận thông báo để nhận cảnh báo khi con bị chặn web/app, thiết bị offline, hoặc có hành vi lách (tamper) |
| Actor                          | Phụ huynh                                                                                                                                                                    |
| Pre-condition                  | Đã đăng nhập; đang trong luồng thiết lập                                                                                                                             |
| Trigger                        | Hệ thống hiển thị dialog quyền thông báo                                                                                                                               |
| Post-condition – Thành công | Quyền notification được cấp, tiếp tục luồng thiết lập                                                                                                               |
| Post-condition – Thất bại   | Từ chối quyền nhưng vẫn tiếp tục dùng được app                                                                                                                     |

**2. Luồng chính (Happy Path)**

| Bước | Actor      | Hành động / Phản hồi của Hệ thống                       |
| :----- | :--------- | :-------------------------------------------------------------- |
| 1      | Hệ thống | Hiển thị màn giải thích lý do cần quyền thông báo     |
| 2      | Hệ thống | Hiển thị dialog quyền của hệ điều hành                  |
| 3      | Phụ huynh | Bấm "Cho phép"                                                |
| 4      | Hệ thống | Quyền notification được cấp, tiếp tục luồng thiết lập |

**3. Luồng thay thế (Alternative Flow)**

| ID Luồng | Bước   | Mô tả                                                                                                                                                                                                   |
| :-------- | :------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| AF-01     | Bước 3 | Phụ huynh bấm "Không cho phép" → vẫn cho tiếp tục dùng app; lần mở app sau hiện popup hướng dẫn bật thủ công trong Settings (popup custom của app, không phải của hệ điều hành) |

**4. Quy tắc Nghiệp vụ (Business Rules)**

| Business Rules | Mô tả                                                                                                          |
| :------------- | :------------------------------------------------------------------------------------------------------------------------- |
| BR-01          | Từ chối quyền thông báo không được chặn việc sử dụng app                                            |
| BR-02          | Nếu đã từ chối, lần mở app sau hiển thị popup custom hướng dẫn bật quyền thủ công trong Settings |

**5. Luồng Ngoại lệ / Lỗi (Exception / Error Flow)**

| ID Luồng | Bước   | Loại  | Title                     | Error message        | Trigger                                                             |
| :-------- | :------- | :----- | :-------------------------- | :------------------- | :----------------------------------------------------------------------- |
| EF-01     | Bước 2 | Popup | Cần cấp quyền thông báo | (dùng popup custom) | Hệ điều hành đã chặn hiển thị dialog (từ chối trước đó) |

**6. Yêu cầu Phi chức năng (NFR)**
N/A

**7. Thiết kế giao diện**
N/A

**8. Event tracking (Mixpanel)**
N/A

**9. Thiết kế API**
N/A

**10. Thiết kế thuật toán**
N/A

---

### UC-03: Tạo mã QR ghép nối thiết bị con

**1. Thông tin chung**

| Tiêu đề                     | Mô tả                                                                                                                             |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------- |
| ID Use Case                    | UC-03 (FR-01)                                                                                                                       |
| Tên Use Case                  | Tạo mã / QR ghép nối thiết bị con                                                                                             |
| Mô tả                        | Mỗi hồ sơ con khi tạo ra được gắn sẵn 1 mã QR ghép nối riêng để liên kết đúng máy con vào hồ sơ tương ứng |
| Actor                          | Phụ huynh                                                                                                                          |
| Pre-condition                  | Đã đăng nhập; đang ở luồng tạo hồ sơ trẻ                                                                               |
| Trigger                        | Lưu hồ sơ trẻ thành công                                                                                                      |
| Post-condition – Thành công | Hệ thống sinh 1 mã QR có thời hạn, gắn với hồ sơ                                                                          |
| Post-condition – Thất bại   | Không sinh được mã; hồ sơ vẫn được xử lý theo kết quả lưu (xem EF)                                                  |

**2. Luồng chính (Happy Path)**

| Bước | Actor      | Hành động / Phản hồi của Hệ thống                                                           |
| :----- | :--------- | :-------------------------------------------------------------------------------------------------- |
| 1      | Phụ huynh | Tạo hồ sơ trẻ. Trong đó:<br />-Tên:bắt buộc<br />-Giới tính + tuổi + SĐT: tùy chọn) |
| 2      | Hệ thống | Lưu hồ sơ thành công                                                                           |
| 3      | Hệ thống | Sinh 1 mã QR ghép nối gắn với hồ sơ                                                          |
| 4      | Hệ thống | Hiển thị QR; tự refresh mã mỗi 5 phút                                                         |

**3. Luồng thay thế (Alternative Flow)**

| ID Luồng | Bước   | Mô tả                                                                                                                                                                                                    |
| :-------- | :------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| AF-01     | Bước 4 | Một máy con đã pair thành công bằng mã của hồ sơ này; thiết bị khác quét/nhập lại cùng mã → hệ thống từ chối, báo "Hồ sơ này đã có thiết bị" (1 hồ sơ ↔ 1 thiết bị) |

**4. Quy tắc Nghiệp vụ (Business Rules)**

| Business Rules | Mô tả                                                                  |
| :------------- | :----------------------------------------------------------------------- |
| BR-01          | Mỗi hồ sơ con gắn đúng 1 mã QR ghép nối riêng                  |
| BR-02          | QR có thời hạn, tự refresh mỗi 5 phút                              |
| BR-03          | QR single-use + ràng buộc 1 hồ sơ ↔ 1 thiết bị, enforce ở server |
| BR-04          | Server chỉ nhận 1 request ghép nối thành công cho mỗi hồ sơ     |
| BR-05          | Tối đa 1 tài khoản bố mẹ được ghép nối 5 thiết bị           |

**5. Luồng Ngoại lệ / Lỗi (Exception / Error Flow)**

| ID Luồng | Bước   | Loại  | Title                   | Error message                       | Trigger                                    |
| :-------- | :------- | :----- | :------------------------ | :------------------------------------ | :-------------------------------------------- |
| EF-01     | Bước 2 | Toast |                          | "Kiểm tra kết nối mạng và thử lại" | Mất mạng khi tạo hồ sơ                   |
| EF-02     | Bước 3 | Toast |                          | Lỗi + "Thử lại"                     | Mất mạng khi tạo mã                       |
| EF-03     | Bước 1 | Popup | Đạt giới hạn thiết bị | "Đã đạt số thiết bị tối đa"      | Vượt giới hạn số thiết bị (tối đa 5) |

**6. Yêu cầu Phi chức năng (NFR)**

| ID     | Loại     | Mô tả                                                                                                                                                   |
| :----- | :-------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------- |
| NFR-01 | Bảo mật | Bảo vệ dựa trên single-use + ràng buộc 1 hồ sơ ↔ 1 thiết bị, enforce ở server (chỉ nhận 1 request ghép nối thành công cho mỗi hồ sơ) |

**7. Thiết kế giao diện**
N/A

**8. Event tracking (Mixpanel)**
N/A

**9. Thiết kế API**
N/A

**10. Thiết kế thuật toán**
N/A

---

### UC-04: Hiển thị danh sách thiết bị + Trạng thái online/offline

**1. Thông tin chung**

| Tiêu đề                     | Mô tả                                                                                                                                    |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ |
| ID Use Case                    | UC-04 (FR-01)                                                                                                                              |
| Tên Use Case                  | Xác nhận thiết bị con đã ghép nối                                                                                                  |
| Mô tả                        | Phụ huynh thấy xác nhận realtime khi máy con ghép nối xong, biết thiết bị đã được quản lý và rule bắt đầu áp dụng   |
| Actor                          | Phụ huynh                                                                                                                                 |
| Pre-condition                  | Đã hoàn tất UC-01, UC-02, UC-03 (FR-01); đang ở màn hiển thị QR                                                                   |
| Trigger                        | Máy con quét QR và pair thành công                                                                                                    |
| Post-condition – Thành công | App Parents cập nhật trạng thái thành công, chuyển Dashboard trong ≤ 3 giây; thiết bị xuất hiện trong danh sách hồ sơ trẻ |
| Post-condition – Thất bại   | Pair thất bại phía con → App Parents giữ nguyên màn quét QR                                                                        |

**2. Luồng chính (Happy Path)**

| Bước | Actor                 | Hành động / Phản hồi của Hệ thống                                                        | BR liên quan |
| :----- | :-------------------- | :----------------------------------------------------------------------------------------------- | :------------ |
| 1      | Phụ huynh            | Đang ở màn hình hiển thị QR                                                                |               |
| 2      | Hệ thống (máy con) | Máy con quét mã và pair thành công (server xác thực hợp lệ)                            |               |
| 3      | Hệ thống            | App Parents tự cập nhật trạng thái thành công và chuyển sang Dashboard trong ≤ 3 giây | BR-01         |
| 4      | Hệ thống            | Thiết bị xuất hiện trong danh sách của hồ sơ trẻ — Liên quan: UC-01 (FR-03)           | BR-02         |

**3. Luồng thay thế (Alternative Flow)**

| ID Luồng | Bước   | Mô tả                                                                                                                                                  | BR liên quan |
| :-------- | :------- | :------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------ |
| AF-01     | Bước 2 | Pair thất bại phía con (mất mạng, lỗi thiết bị...) → App Parents giữ nguyên ở màn quét QR/mã                                              |               |
| AF-02     | Bước 4 | Xem chi tiết profile con → hiển thị: thông tin con, tên thiết bị, nền tảng (Android/iOS), thời điểm ghép nối, trạng thái online/offline | BR-02         |
| AF-03     | Bước 4 | Máy con đang hoạt động → hiện "online"; máy con không hoạt động → hiện "offline"                                                           | BR-03         |

**4. Quy tắc Nghiệp vụ (Business Rules)**

| Business Rules | Mô tả                                                                                                                                   |
| :------------- | :---------------------------------------------------------------------------------------------------------------------------------------- |
| BR-01          | App Parents cập nhật trạng thái pair realtime và chuyển Dashboard trong ≤ 3 giây ← Source: US-04-P AC1                           |
| BR-02          | Sau pair, chi tiết profile hiển thị: thông tin con, tên thiết bị, nền tảng, thời điểm ghép nối, trạng thái online/offline |
| BR-03          | Trạng thái online/offline phản ánh máy con đang hoạt động / không hoạt động                                                  |

**5. Luồng Ngoại lệ / Lỗi (Exception / Error Flow)**

| ID Luồng | Bước   | Loại              | Title | Error message | Trigger                                                              |
| :-------- | :------- | :------------------ | :----- | :--------------- | :------------------------------------------------------------------------ |
| EF-01     | Bước 3 | (Không hiển thị) |       | (không có)      | Máy con pair xong nhưng App Parents chưa nhận tín hiệu (mạng trễ) |
| EF-02     | Bước 1 | (Không hiển thị) |       | (không có)      | Phụ huynh thoát màn hình trước khi con pair                         |

**6. Yêu cầu Phi chức năng (NFR)**

| ID     | Loại       | Mô tả                                                                                                |
| :----- | :---------- | :----------------------------------------------------------------------------------------------------- |
| NFR-01 | Hiệu năng | App Parents cập nhật trạng thái pair và chuyển Dashboard trong ≤ 3 giây ← Source: US-04-P AC1 |
| NFR-02 | Tin cậy    | Đồng bộ trạng thái realtime giữa máy con và App Parents (server push/polling)                  |

**7. Thiết kế giao diện**
N/A

**8. Event tracking (Mixpanel)**
N/A

**9. Thiết kế API**
N/A

**10. Thiết kế thuật toán**
N/A

---

### UC-05: Xác thực thiết bị con (Ghép nối bằng quét QR)

**1. Thông tin chung**

| Tiêu đề                     | Mô tả                                                                                                                                                                       |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ID Use Case                    | UC-05 (FR-01)                                                                                                                                                                 |
| Tên Use Case                  | Xác thực thiết bị con (Login bằng quét QR)                                                                                                                              |
| Mô tả                        | Người cài máy con ghép nối thiết bị con với tài khoản phụ huynh bằng quét QR (ưu tiên), để thiết bị con được liên kết và bắt đầu nhận quản lý |
| Actor                          | Người cài máy con (App Kid)                                                                                                                                               |
| Pre-condition                  | App Parents đã hiển thị QR ghép nối (UC-03 FR-01)                                                                                                                       |
| Trigger                        | Mở App Kid lần đầu và quét QR                                                                                                                                           |
| Post-condition – Thành công | Máy con liên kết tài khoản phụ huynh thành công; server sync realtime để App Parents cập nhật                                                                     |
| Post-condition – Thất bại   | Báo lỗi tương ứng và giữ nguyên màn ghép nối cho thử lại                                                                                                         |

**2. Luồng chính (Happy Path)**

| Bước | Actor                 | Hành động / Phản hồi của Hệ thống                                                                             | BR liên quan |
| :----- | :-------------------- | :-------------------------------------------------------------------------------------------------------------------- | :------------ |
| 1      | Người cài máy con | Mở App Kid lần đầu                                                                                                |               |
| 2      | Người cài máy con | Quét QR đang hiển thị trên App Parents                                                                           | BR-01         |
| 3      | Hệ thống            | App Kid gửi yêu cầu đăng nhập; server xác thực hợp lệ                                                       | BR-02         |
| 4      | Hệ thống            | Máy con liên kết tài khoản phụ huynh thành công (WRITE`device`: device_id, profile_id, platform, paired_at) | BR-02, BR-03  |
| 5      | Hệ thống            | Server sync realtime để App Parents cập nhật — Liên quan: UC-04 (FR-01)                                         |               |

**3. Luồng thay thế (Alternative Flow)**

| ID Luồng | Bước   | Mô tả                                                            | BR liên quan |
| :-------- | :------- | :----------------------------------------------------------------- | :------------ |
| AF-01     | Bước 3 | QR sai hoặc hết hạn → báo lỗi tương ứng và cho thử lại | BR-02         |

**4. Quy tắc Nghiệp vụ (Business Rules)**

| Business Rules | Mô tả                                                                                        |
| :------------- | :--------------------------------------------------------------------------------------------- |
| BR-01          | Ưu tiên ghép nối bằng quét QR                                                            |
| BR-02          | Single-use + ràng buộc 1 hồ sơ ↔ 1 thiết bị, enforce ở server (đồng bộ UC-04 FR-01) |
| BR-03          | First-write-win: nhiều thiết bị cùng quét thì chỉ ghi nhận thiết bị đầu tiên      |

**5. Luồng Ngoại lệ / Lỗi (Exception / Error Flow)**

| ID Luồng | Bước   | Loại  | Title                    | Error message              | Trigger                                                          |
| :-------- | :------- | :----- | :-------------------------- | :---------------------------- | :------------------------------------------------------------------ |
| EF-01     | Bước 3 | Inline |                           | "Mã không đúng"             | QR sai                                                              |
| EF-02     | Bước 3 | Inline |                           | "OTP đã hết hạn, gửi lại" | QR/OTP hết hạn                                                    |
| EF-03     | Bước 2 | Popup | Cần quyền camera         | (dialog xin quyền)           | Camera bị từ chối quyền khi quét QR                            |
| EF-04     | Bước 3 | Toast |                           | (toast mất kết nối)        | Mất mạng khi pair                                                 |
| EF-05     | Bước 3 | Popup | Cần cấp lại quyền       | (thông báo cấp lại quyền)  | Pass gate nhưng quyền bị thu hồi ngay trước pair               |
| EF-06     | Bước 3 | Popup | Ghép nối thất bại       | "Ghép nối thất bại"         | Nhiều thiết bị cùng quét                                        |

**6. Yêu cầu Phi chức năng (NFR)**

| ID     | Loại     | Mô tả                                                                                       |
| :----- | :-------- | :-------------------------------------------------------------------------------------------- |
| NFR-01 | Bảo mật | Single-use + ràng buộc 1 hồ sơ ↔ 1 thiết bị enforce ở server (đồng bộ UC-04 FR-01) |

**7. Thiết kế giao diện**
N/A

**8. Event tracking (Mixpanel)**
N/A

**9. Thiết kế API**
N/A

**10. Thiết kế thuật toán**
N/A

---

### UC-06: Giới thiệu và xin quyền (App con) — Cấp chuỗi quyền cốt lõi (Android)

**1. Thông tin chung**

| Tiêu đề                     | Mô tả                                                                                                                                                                                           |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ID Use Case                    | UC-06 (FR-01)                                                                                                                                                                                     |
| Tên Use Case                  | Giới thiệu và xin quyền (App con) — cấp chuỗi quyền cốt lõi Android                                                                                                                     |
| Mô tả                        | Người cài máy con được dẫn từng bước cấp các quyền hệ thống mà Android yêu cầu, để App Kid đủ khả năng phát hiện app, lọc traffic, khóa máy và chạy nền bền bỉ |
| Actor                          | Người cài máy con (App Kid — Android)                                                                                                                                                        |
| Pre-condition                  | Đã ghép nối thành công với App Parents — Liên quan: UC-05 (FR-01)                                                                                                                        |
| Trigger                        | Người cài máy con bắt đầu vào phần xin quyền                                                                                                                                            |
| Post-condition – Thành công | Toàn bộ quyền bắt buộc được cấp; App Kid vận hành đầy đủ                                                                                                                           |
| Post-condition – Thất bại   | Từ chối quyền bắt buộc → không cho qua bước                                                                                                                                              |

**2. Luồng chính (Happy Path)**

| Bước | Actor                 | Hành động / Phản hồi của Hệ thống                                                                        | BR liên quan |
| :----- | :-------------------- | :--------------------------------------------------------------------------------------------------------------- | :------------ |
| 1      | Người cài máy con | Đã ghép nối thành công với App Parents                                                                    |               |
| 2      | Người cài máy con | Bắt đầu vào phần xin quyền                                                                                 |               |
| 3      | Hệ thống            | Với mỗi quyền, mở đúng trang Cài đặt hệ thống theo checklist tuần tự (chi tiết ở Phụ lục PL-01) | BR-01, BR-02  |
| 4      | Hệ thống            | Re-check quyền mỗi khi App Kid quay lại foreground                                                            | BR-03         |

**3. Luồng thay thế (Alternative Flow)**

| ID Luồng | Bước   | Mô tả                                                                                                                                          | BR liên quan |
| :-------- | :------- | :----------------------------------------------------------------------------------------------------------------------------------------------- | :------------ |
| AF-01     | Bước 3 | Máy OEM tùy biến (Xiaomi/Oppo/Vivo) → phát hiện hãng máy, thêm bước cấp quyền tự khởi động (auto-start) tương ứng            | BR-02         |
| AF-02     | Bước 3 | Không mở được đích danh trang setting (khác nhau giữa các bản Android) → dùng intent chuẩn, kèm hướng dẫn thao tác thủ công |               |

**4. Quy tắc Nghiệp vụ (Business Rules)**

| Business Rules | Mô tả                                                                                                    |
| :------------- | :--------------------------------------------------------------------------------------------------------- |
| BR-01          | Accessibility + Usage Access + Overlay + VPN + Device Admin là**bắt buộc**                        |
| BR-02          | Bỏ tối ưu pin + auto-start là**khuyến nghị** (auto-start bắt buộc trên máy OEM tùy biến) |
| BR-03          | App phải re-check quyền mỗi lần quay lại foreground                                                   |
| BR-04          | Không cho qua bước nếu chưa cấp đủ quyền bắt buộc                                               |

**5. Luồng Ngoại lệ / Lỗi (Exception / Error Flow)**

| ID Luồng | Bước   | Loại           | Title              | Error message      | Trigger                          |
| :-------- | :------- | :--------------- | :------------------- | :------------------ | :---------------------------------- |
| EF-01     | Bước 3 | Màn hướng dẫn | Cần cấp quyền     | (màn hướng dẫn) | User từ chối quyền bắt buộc |

**6. Yêu cầu Phi chức năng (NFR)**

| ID     | Loại          | Mô tả                                                                                                                                               |
| :----- | :------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------- |
| NFR-01 | Tương thích | Trang Cài đặt khác nhau giữa các bản Android → dùng intent chuẩn; nếu không mở được đích danh thì fallback hướng dẫn thủ công |
| NFR-02 | Tương thích | Phát hiện hãng máy OEM (Xiaomi/Oppo/Vivo) để thêm bước cấp quyền auto-start tương ứng                                                   |
| NFR-03 | Tin cậy       | Re-check toàn bộ quyền mỗi lần app quay lại foreground                                                                                          |

**7. Thiết kế giao diện**
N/A

**8. Event tracking (Mixpanel)**
N/A

**9. Thiết kế API**
N/A

**10. Thiết kế thuật toán**
N/A

---

## FR-03: Quản lý hồ sơ và thiết bị

---

### UC-01: Tạo hồ sơ

**1. Thông tin chung**

| Tiêu đề                     | Mô tả                                                                                                                                                                    |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ID Use Case                    | UC-01 (FR-03)                                                                                                                                                              |
| Tên Use Case                  | Tạo hồ sơ                                                                                                                                                               |
| Mô tả                        | Phụ huynh tạo hồ sơ cho từng đứa con với thông tin cơ bản, làm đơn vị quản lý riêng để gắn thiết bị và áp các rule kiểm soát đúng đứa trẻ |
| Actor                          | Phụ huynh                                                                                                                                                                 |
| Pre-condition                  | Đã đăng nhập và chưa đạt giới hạn số hồ sơ                                                                                                                   |
| Trigger                        | Phụ huynh nhập thông tin hồ sơ và bấm "Lưu"                                                                                                                        |
| Post-condition – Thành công | Tạo hồ sơ mới; sinh kèm 1 mã QR ghép nối; hồ sơ xuất hiện trong danh sách; server lưu dữ liệu                                                              |
| Post-condition – Thất bại   | Không tạo được hồ sơ; hiển thị lỗi tương ứng                                                                                                                  |

**2. Luồng chính (Happy Path)**

| Bước | Actor      | Hành động / Phản hồi của Hệ thống                                                               | BR liên quan |
| :----- | :--------- | :------------------------------------------------------------------------------------------------------ | :------------ |
| 1      | Phụ huynh | Nhập thông tin hồ sơ (Tên + Ngày sinh bắt buộc; Giới tính, Ảnh đại diện, SĐT tùy chọn) | BR-01         |
| 2      | Phụ huynh | Bấm "Lưu"                                                                                             | BR-05         |
| 3      | Hệ thống | Validate: Tên + ngày sinh bắt buộc; ngày sinh ≤ hôm nay; SĐT đúng định dạng nếu có nhập | BR-01, BR-02  |
| 4      | Hệ thống | Tạo hồ sơ mới ; áp idempotency chống double submit                                                | BR-05, BR-07  |
| 5      | Hệ thống | Sinh kèm 1 mã QR ghép nối cho hồ sơ — Liên quan: UC-03 (FR-01)                                  | BR-06         |
| 6      | Hệ thống | Hồ sơ mới xuất hiện trong danh sách; server lưu dữ liệu hồ sơ                                |               |

**3. Luồng thay thế (Alternative Flow)**

| ID Luồng | Bước   | Mô tả                                                                                                   | BR liên quan |
| :-------- | :------- | :-------------------------------------------------------------------------------------------------------- | :------------ |
| AF-01     | Bước 3 | Để trống trường bắt buộc → hiển thị lỗi inline và nút "Lưu" bị vô hiệu                   | BR-01         |
| AF-02     | Bước 3 | SĐT sai định dạng → lỗi inline; SĐT là trường tùy chọn nên có thể bỏ trống để lưu     | BR-01         |
| AF-03     | Bước 2 | Đã đạt số hồ sơ tối đa (5) → chặn tạo mới, hiển thị "Bạn đã đạt số hồ sơ tối đa" | BR-03, BR-07  |

**4. Quy tắc Nghiệp vụ (Business Rules)**

| Business Rules | Mô tả                                                                                                     |
| :------------- | :---------------------------------------------------------------------------------------------------------- |
| BR-01          | Tên + Ngày sinh là bắt buộc; Giới tính, Ảnh, SĐT là tùy chọn                                    |
| BR-02          | Ngày sinh phải ≤ hôm nay                                                                                |
| BR-03          | Tối đa 5 hồ sơ ← Source: US-05-P AC3                                                                   |
| BR-04          | Cho phép trùng tên hồ sơ (phân biệt bằng ảnh/ngày sinh)                                           |
| BR-05          | Vô hiệu nút "Lưu" sau lần bấm đầu + idempotency ở server → chỉ tạo 1 hồ sơ, không nhân bản |
| BR-06          | Tạo hồ sơ thành công thì sinh kèm 1 mã QR ghép nối (UC-03 FR-01)                                  |
| BR-07          | Giới hạn số hồ sơ enforce ở server (không chỉ ẩn nút phía client)                                |

**5. Luồng Ngoại lệ / Lỗi (Exception / Error Flow)**

| ID Luồng | Bước   | Loại              | Title | Error message                             | Trigger                                    |
| :-------- | :------- | :------------------ | :----- | :---------------------------------------- | :--------------------------------------------- |
| EF-01     | Bước 4 | Toast              |       | "Kiểm tra kết nối mạng và thử lại" | Mất mạng khi lưu hồ sơ                   |
| EF-02     | Bước 3 | Inline             |       | "Ngày sinh không hợp lệ"              | Ngày sinh ở tương lai                     |
| EF-03     | Bước 4 | (Không hiển thị) |       | (không có)                              | Bấm "Lưu" nhiều lần (double submit) |

**6. Yêu cầu Phi chức năng (NFR)**

| ID     | Loại                 | Mô tả                                                                                                                                                                             |
| :----- | :-------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| NFR-01 | Bảo mật / Pháp lý | ⚠ Dữ liệu trẻ vị thành niên (Tên, Ngày sinh, SĐT, Ảnh). Sensitive data. Legal check required — mã hóa khi truyền, tuân thủ chính sách bảo vệ dữ liệu trẻ em |
| NFR-02 | Bảo mật             | Giới hạn số hồ sơ enforce ở server                                                                                                                                            |

**7. Thiết kế giao diện**
N/A

**8. Event tracking (Mixpanel)**
N/A

**9. Thiết kế API**
N/A

**10. Thiết kế thuật toán**
N/A

---

### UC-02: Chỉnh sửa hồ sơ

**1. Thông tin chung**

| Tiêu đề                     | Mô tả                                                                                                                                                             |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ID Use Case                    | UC-02 (FR-03)                                                                                                                                                       |
| Tên Use Case                  | Chỉnh sửa hồ sơ                                                                                                                                                 |
| Mô tả                        | Phụ huynh chỉnh sửa thông tin hồ sơ con (tên, ảnh, giới tính, ngày sinh, SĐT) để thông tin luôn đúng khi con thay đổi hoặc nhập sai lúc tạo |
| Actor                          | Phụ huynh                                                                                                                                                          |
| Pre-condition                  | Hồ sơ đã tồn tại — Liên quan: UC-01 (FR-03)                                                                                                                 |
| Trigger                        | Phụ huynh sửa 1 hoặc nhiều trường và bấm "Lưu"                                                                                                             |
| Post-condition – Thành công | Cập nhật thông tin hồ sơ; danh sách và các màn liên quan hiển thị thông tin mới                                                                       |
| Post-condition – Thất bại   | Không cập nhật được; hiển thị lỗi tương ứng, không mất thay đổi đang nhập                                                                         |

**2. Luồng chính (Happy Path)**

| Bước | Actor      | Hành động / Phản hồi của Hệ thống                                               | BR liên quan |
| :----- | :--------- | :-------------------------------------------------------------------------------------- | :------------ |
| 1      | Phụ huynh | Mở màn chi tiết một hồ sơ đã tạo                                               |               |
| 2      | Phụ huynh | Thay đổi 1 hoặc nhiều trường (tên/ảnh/giới tính/ngày sinh/SĐT), bấm "Lưu" | BR-01         |
| 3      | Hệ thống | Validate trường bắt buộc (Tên)                                                     | BR-01         |
| 4      | Hệ thống | Cập nhật thông tin hồ sơ (WRITE`profiles`, last-write-wins)                      | BR-03         |
| 5      | Hệ thống | Danh sách hồ sơ + các màn liên quan hiển thị thông tin mới                    |               |

**3. Luồng thay thế (Alternative Flow)**

| ID Luồng | Bước   | Mô tả                                                                                                                    | BR liên quan |
| :-------- | :------- | :------------------------------------------------------------------------------------------------------------------------- | :------------ |
| AF-01     | Bước 2 | Đã sửa vài trường chưa lưu, bấm "Quay lại" → hỏi xác nhận "Hủy thay đổi chưa lưu?" trước khi rời đi |               |
| AF-02     | Bước 2 | Close/kill app khi chưa lưu → hệ thống không lưu thay đổi                                                         | BR-05         |

**4. Quy tắc Nghiệp vụ (Business Rules)**

| Business Rules | Mô tả                                                                                                                |
| :------------- | :--------------------------------------------------------------------------------------------------------------------- |
| BR-01          | Tên vẫn là trường bắt buộc khi sửa                                                                             |
| BR-02          | Sửa hồ sơ KHÔNG làm đổi mã QR ghép nối và trạng thái thiết bị đã gắn (sửa hồ sơ ≠ tạo lại mã) |
| BR-03          | Sửa đồng thời trên 2 thiết bị phụ huynh → ghi theo nguyên tắc last-write-wins                               |
| BR-04          | Sửa hồ sơ không đụng tới pairing-token / liên kết thiết bị                                                  |
| BR-05          | Thay đổi chưa lưu bị bỏ khi close/kill app                                                                       |

**5. Luồng Ngoại lệ / Lỗi (Exception / Error Flow)**

| ID Luồng | Bước   | Loại  | Title                    | Error message                   | Trigger                                                       |
| :-------- | :------- | :----- | :-------------------------- | :------------------------------ | :--------------------------------------------------------------- |
| EF-01     | Bước 3 | Inline |                           | "Vui lòng nhập tên"          | Xóa Tên và bấm "Lưu"                                        |
| EF-02     | Bước 4 | Toast |                           | "Thử lại"                     | Mất mạng khi lưu chỉnh sửa                                  |
| EF-03     | Bước 4 | Popup | Không tìm thấy hồ sơ | "Hồ sơ không còn tồn tại" | Hồ sơ bị xóa ở thiết bị/phiên khác khi đang sửa         |

**6. Yêu cầu Phi chức năng (NFR)**

| ID     | Loại                 | Mô tả                                                                  |
| :----- | :-------------------- | :----------------------------------------------------------------------- |
| NFR-01 | Bảo mật / Pháp lý | ⚠ Dữ liệu trẻ vị thành niên. Sensitive data. Legal check required |
| NFR-02 | Ràng buộc           | Sửa hồ sơ không đụng tới pairing-token / liên kết thiết bị    |

**7. Thiết kế giao diện**
N/A

**8. Event tracking (Mixpanel)**
N/A

**9. Thiết kế API**
N/A

**10. Thiết kế thuật toán**
N/A

---

### UC-03: Xóa hồ sơ

**1. Thông tin chung**

| Tiêu đề                     | Mô tả                                                                                                                                                                                                   |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ID Use Case                    | UC-03 (FR-03)                                                                                                                                                                                             |
| Tên Use Case                  | Xóa hồ sơ (bao gồm xóa tài khoản phụ huynh)                                                                                                                                                       |
| Mô tả                        | Phụ huynh xóa hồ sơ khi không còn dùng (con lớn, đổi máy, tạo nhầm) để danh sách gọn gàng và dọn dữ liệu không cần thiết; bao gồm cả trường hợp xóa tài khoản phụ huynh |
| Actor                          | Phụ huynh                                                                                                                                                                                                |
| Pre-condition                  | Đã đăng nhập; có ít nhất 1 hồ sơ (với luồng xóa hồ sơ)                                                                                                                                     |
| Trigger                        | Phụ huynh bấm "Xóa hồ sơ" (hoặc "Xóa tài khoản") và xác nhận                                                                                                                                  |
| Post-condition – Thành công | Hồ sơ (và mã ghép nối) bị xóa, biến mất khỏi danh sách; nếu có thiết bị thì gỡ quản lý máy con                                                                                       |
| Post-condition – Thất bại   | Không xóa được; hiển thị lỗi, không xóa nửa vời phía client                                                                                                                                  |

**2. Luồng chính (Happy Path) — Xóa hồ sơ không có thiết bị**

| Bước | Actor      | Hành động / Phản hồi của Hệ thống     | BR liên quan |
| :----- | :--------- | :-------------------------------------------- | :------------ |
| 1      | Phụ huynh | Chọn một hồ sơ chưa gắn thiết bị nào |               |
| 2      | Phụ huynh | Bấm "Xóa hồ sơ" và xác nhận            |               |
| 3      | Hệ thống | Xóa hồ sơ + mã ghép nối kèm theo       | BR-01         |
| 4      | Hệ thống | Hồ sơ biến mất khỏi danh sách           |               |

**3. Luồng thay thế (Alternative Flow)**

| ID Luồng | Bước   | Mô tả                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | BR liên quan              |
| :-------- | :------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------- |
| AF-01     | Bước 2 | Xóa hồ sơ ĐANG có thiết bị → hiển thị cảnh báo mạnh "Xóa hồ sơ sẽ GỠ QUẢN LÝ toàn bộ thiết bị của con và xóa dữ liệu liên quan. Hành động không thể hoàn tác." → yêu cầu xác nhận mạnh lần nữa → khi xác nhận: gửi lệnh gỡ quản lý tới máy con; xóa hồ sơ + mã ghép nối + rule gắn với hồ sơ; hồ sơ biến mất khỏi danh sách; app con vào lại tự quay về màn ghép nối; giữ nguyên bộ cài CA/MDM đã tải; log hành vi của con vẫn được lưu ở database | BR-02, BR-03, BR-04, BR-05 |
| AF-02     | Bước 2 | Bấm "Hủy" ở dialog xác nhận → không thay đổi gì, đóng dialog                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |                            |
| AF-03     | Bước 1 | Xóa tài khoản phụ huynh → xóa tài khoản của chính mình; gửi lệnh gỡ quản lý tới máy con; xóa hồ sơ + mã ghép nối + rule; hồ sơ biến mất khỏi danh sách; app con vào lại tự quay về màn ghép nối; giữ nguyên CA/MDM; log hành vi vẫn lưu ở database                                                                                                                                                                                                                                                   | BR-03, BR-04, BR-05, BR-06 |
| AF-04     | Bước 4 | Xóa hồ sơ cuối cùng → quay về empty state "Chưa có hồ sơ nào. Tạo hồ sơ đầu tiên cho con"                                                                                                                                                                                                                                                                                                                                                                                                                                     |                            |

**4. Quy tắc Nghiệp vụ (Business Rules)**

| Business Rules | Mô tả                                                                                                                                        |
| :------------- | :--------------------------------------------------------------------------------------------------------------------------------------------- |
| BR-01          | Xóa hồ sơ không có thiết bị → xóa hồ sơ + mã ghép nối kèm theo                                                                  |
| BR-02          | Xóa hồ sơ đang có thiết bị → yêu cầu xác nhận mạnh 2 lần                                                                         |
| BR-03          | Xóa hồ sơ có thiết bị (hoặc xóa tài khoản) → gửi lệnh gỡ quản lý tới máy con; app con vào lại tự quay về màn ghép nối |
| BR-04          | Giữ nguyên bộ cài CA / MDM đã tải về máy con trước đó                                                                             |
| BR-05          | Log hành vi của con (nếu có) vẫn được lưu ở database sau khi xóa                                                                    |
| BR-06          | Xóa tài khoản phụ huynh = xóa toàn bộ hồ sơ + mã ghép nối + rule + gỡ quản lý (theo BR-03, BR-04, BR-05)                        |

**5. Luồng Ngoại lệ / Lỗi (Exception / Error Flow)**

| ID Luồng | Bước   | Loại              | Title | Error message              | Trigger                                                         |
| :-------- | :------- | :------------------ | :----- | :---------------------------- | :------------------------------------------------------------------ |
| EF-01     | Bước 3 | Toast              |       | "Xóa thất bại, thử lại" | Mất mạng khi xóa                                               |
| EF-02     | Bước 3 | (Không hiển thị) |       | (không có)                   | Lệnh gỡ quản lý không tới máy con (offline kéo dài) |

**6. Yêu cầu Phi chức năng (NFR)**

| ID     | Loại                 | Mô tả                                                                                     |
| :----- | :-------------------- | :------------------------------------------------------------------------------------------ |
| NFR-01 | Bảo mật / Pháp lý | ⚠ Dữ liệu trẻ vị thành niên. Sensitive data. Legal check required                    |
| NFR-02 | Tin cậy              | Lệnh gỡ quản lý dùng hàng đợi + retry để đảm bảo tới máy con khi online lại |
| NFR-03 | Lưu trữ             | Log hành vi của con được giữ lại ở database dù hồ sơ/tài khoản đã xóa       |

**7. Thiết kế giao diện**
N/A

**8. Event tracking (Mixpanel)**
N/A

**9. Thiết kế API**
N/A

**10. Thiết kế thuật toán**
N/A

---

## Câu hỏi mở & Giả định

**Câu hỏi mở (cần stakeholder xác nhận):**

| ID    | Câu hỏi                                                                                                                                                                                                                                                                                                                                                            | Owner |
| :---- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---- |
| OQ-01 | UC-03 (FR-01) & UC-01 (FR-03): edge case "Mất mạng khi tạo hồ sơ" trong source mâu thuẫn — cột "Cách xử lý" ghi*"Không lưu được hồ sơ"* nhưng cột "Fallback" ghi*"Hồ sơ vẫn được lưu"*. Cần chốt: hồ sơ chỉ lưu khi server ghi thành công, hay lưu local rồi sync sau? (Tài liệu đang giả định: chỉ lưu khi server OK) | PM    |
| OQ-02 | Giới hạn "5" là 5 hồ sơ hay 5 thiết bị? Source dùng lẫn lộn ("maximum 5 thiết bị" ở US-03-P vs "5 hồ sơ" ở US-05-P). Vì ràng buộc 1 hồ sơ ↔ 1 thiết bị nên giả định 5 hồ sơ = 5 thiết bị                                                                                                                                             | PM    |
| OQ-03 | US-01-K AC3 tham chiếu "(US-05-P)" nhưng ngữ cảnh là xác nhận phía phụ huynh → tài liệu map sang UC-04 (FR-01). Cần confirm                                                                                                                                                                                                                             | PM    |
| OQ-04 | Định dạng tham chiếu chéo: tài liệu dùng`UC-xx (FR-yy)` thay cho `US-xx` (vì đây là UC spec). Cần user xác nhận đúng ý                                                                                                                                                                                                                         | User  |
| OQ-06 | UC-01 (FR-01) BR-02, BR-04: chưa có giá trị TTL cụ thể cho authCode và accessToken trong luồng SSO Tammi ↔ Viettel SSO. Cần xác nhận với team Tammi/Viettel SSO để chốt số cụ thể                                                                                                                                                                 | PM    |
| OQ-07 | UC-01 (FR-01) EF-05: khi Viettel SSO trả về thiếu SĐT/Họ tên, tài liệu đang giả định chặn hoàn toàn việc đăng nhập. Cần confirm có cho phụ huynh nhập bổ sung thủ công hay không                                                                                                                                                          | PM    |

**Dữ liệu nhạy cảm (⚠ Legal check required):** SĐT, Họ tên, authCode, accessToken (Tammi/Viettel SSO), OTP, session token, ngày sinh, ảnh đại diện, và log hành vi của trẻ vị thành niên → cần mã hóa khi truyền và tuân thủ chính sách bảo vệ dữ liệu trẻ em.

---

## Phụ lục

**PL-01 — Checklist chuỗi quyền cốt lõi Android (UC-06 FR-01)**

| # | Quyền                                      | Đường dẫn cấp                                                                                               | Mục đích                        | Mức độ                                       |
| :- | :------------------------------------------ | :--------------------------------------------------------------------------------------------------------------- | :--------------------------------- | :---------------------------------------------- |
| 1 | Accessibility                               | Cài đặt → Trợ năng (Accessibility) → [App Kid] → Bật                                                    | Phát hiện app đang chạy        | Bắt buộc                                      |
| 2 | Usage Access                                | Cài đặt → Ứng dụng → Quyền truy cập đặc biệt → Quyền sử dụng (Usage access) → [App Kid] → Bật | Báo cáo thời gian dùng         | Bắt buộc                                      |
| 3 | Hiển thị trên ứng dụng khác (Overlay) | Cài đặt → Quyền truy cập đặc biệt → Hiển thị trên ứng dụng khác → [App Kid] → Bật             | Hiển thị màn khóa              | Bắt buộc                                      |
| 4 | Device Admin                                | Dialog "Kích hoạt quản trị thiết bị" → Kích hoạt                                                        | Khóa máy, chống gỡ             | Bắt buộc                                      |
| 5 | VPN                                         | Dialog hệ thống "[App Kid] muốn thiết lập kết nối VPN" → Đồng ý                                       | Định tuyến và lọc traffic     | Bắt buộc                                      |
| 6 | Bỏ tối ưu pin                            | Cài đặt → Pin → Bỏ tối ưu pin cho [App Kid]                                                              | Không bị kill nền               | Khuyến nghị                                   |
| 7 | Auto-start (OEM)                            | Trang tự khởi động theo hãng (Xiaomi/Oppo/Vivo)                                                             | Chạy nền bền bỉ trên máy OEM | Khuyến nghị (bắt buộc trên OEM tùy biến) |
| 8 | Notification (Android 13+)                  | Dialog quyền thông báo                                                                                        | Nhận thông báo                  | Bắt buộc trên Android 13+                    |
