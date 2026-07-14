# Parental Control — Đặc tả chi tiết Use Case

---

## FR-01: Pairing

---

### UC-01: Xác thực người dùng qua Tammi SSO

**1. Thông tin chung**

| Tiêu đề                     | Mô tả                                                                                                                                                                                            |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ID Use Case                    | UC-01 (FR-01)                                                                                                                                                                                      |
| Tên Use Case                  | Xác thực người dùng qua Tammi SSO (Login Mini App)                                                                                                                                            |
| Mô tả                        | Phụ huynh đăng nhập/đăng ký Mini bằng tài khoản Tammi đã đăng nhập sẵn, thông qua cơ chế SSO với hệ thống Viettel SSO — không cần nhập lại SĐT/OTP riêng cho Mini App |
| Actor                          | Phụ huynh (đã đăng nhập tài khoản Tammi)                                                                                                                                                   |
| Pre-condition                  | Phụ huynh đã đăng nhập thành công vào app Tammi; đang ở màn giới thiệu Mini App Parental Control                                                                                     |
| Trigger                        | Phụ huynh bấm "Tiếp tục" tại màn giới thiệu Mini App                                                                                                                                       |
| Post-condition – Thành công | Đăng nhập thành công vào Mini App, tạo session                                                                                                                                              |
| Post-condition – Thất bại   | Hiển thị lỗi tương ứng, không tạo session, giữ nguyên màn giới thiệu Mini App                                                                                                         |

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

### UC-02: Xin quyền notification máy bố mẹ

> **Ghi chú:** Không làm. Do đưa lên Tammi thì không gửi thông báo qua kênh Push noti

---

### UC-03: Ghép nối thiết bị con bằng quét QR (máy bố mẹ)

**1. Thông tin chung**

| Tiêu đề                     | Mô tả                                                                                                                                                      |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| ID Use Case                    | UC-03 (FR-01)                                                                                                                                                |
| Tên Use Case                  | Ghép nối thiết bị con bằng quét QR (máy bố mẹ)                                                                                                      |
| Mô tả                        | Bố mẹ chọn hồ sơ con, mở camera trên máy bố mẹ và quét mã QR đang hiển thị trên máy con để liên kết thiết bị con vào đúng hồ sơ |
| Actor                          | Phụ huynh                                                                                                                                                   |
| Pre-condition                  | Đã đăng nhập; đã có hồ sơ con (UC-01 FR-03); máy con đang hiển thị QR ghép nối (UC-05 FR-01)                                                 |
| Trigger                        | Phụ huynh chọn hồ sơ con → bấm "Ghép nối thiết bị" / "Quét QR"                                                                                    |
| Post-condition – Thành công | Server liên kết thiết bị con vào hồ sơ đã chọn; thiết bị xuất hiện trong danh sách (UC-04 FR-01)                                              |
| Post-condition – Thất bại   | Báo lỗi tương ứng, giữ nguyên màn quét cho thử lại                                                                                                |

**2. Luồng chính (Happy Path)**

| Bước | Actor      | Hành động / Phản hồi của Hệ thống                                                              |
| :----- | :--------- | :----------------------------------------------------------------------------------------------------- |
| 1      | Phụ huynh | Chọn hồ sơ con cần ghép nối → bấm "Ghép nối thiết bị"                                      |
| 2      | Hệ thống | Xin quyền Camera (nếu chưa cấp) → mở camera                                                      |
| 3      | Phụ huynh | Quét mã QR đang hiển thị trên máy con                                                           |
| 4      | Hệ thống | Gửi yêu cầu ghép nối kèm mã QR + hồ sơ đích tới server                                     |
| 5      | Hệ thống | Server xác thực QR hợp lệ & còn hạn → liên kết thiết bị con vào hồ sơ                    |
| 6      | Hệ thống | Cập nhật realtime; thiết bị xuất hiện trong danh sách của hồ sơ — Liên quan: UC-04 (FR-01) |

**3. Luồng thay thế (Alternative Flow)**

| ID Luồng | Bước   | Mô tả                                                                                                                                               |
| :-------- | :------- | :---------------------------------------------------------------------------------------------------------------------------------------------------- |
| AF-01     | Bước 2 | Quyền Camera bị từ chối → hiển thị hướng dẫn cấp quyền; không quét được cho tới khi cấp quyền                                     |
| AF-02     | Bước 3 | Quét nhằm mã QR đã hết hạn (máy con đã refresh mã mới sau 5 phút) → báo lỗi, yêu cầu quét lại mã đang hiển thị trên máy con |
| AF-03     | Bước 1 | Tài khoản đã đạt 5 thiết bị đã ghép nối → chặn, báo đã đạt giới hạn                                                              |

**4. Quy tắc Nghiệp vụ (Business Rules)**

| Business Rules | Mô tả                                                                                                        |
| :------------- | :------------------------------------------------------------------------------------------------------------- |
| BR-01          | Máy con hiển thị QR ghép nối và**tự refresh mỗi 5 phút**; máy bố mẹ quét QR để ghép nối |
| BR-02          | **1 hồ sơ con có thể ghép nối nhiều thiết bị**                                                 |
| BR-03          | **Tối đa 5 thiết bị / tài khoản bố mẹ** (cộng dồn tất cả hồ sơ), enforce ở server         |
| BR-04          | Rule kiểm soát được áp dụng**độc lập cho từng thiết bị** đã ghép nối trong hồ sơ      |
| BR-05          | Máy bố mẹ**cần quyền Camera** để quét QR                                                         |
| BR-06          | Chỉ QR còn hạn (≤ 5 phút) mới ghép nối được; mã đã hết hạn bị server từ chối                |

**5. Luồng Ngoại lệ / Lỗi (Exception / Error Flow)**

| ID Luồng | Bước   | Loại  | Title                       | Error message                                                                  | Trigger                                      |
| :-------- | :------- | :----- | :-------------------------- | :----------------------------------------------------------------------------- | :------------------------------------------- |
| EF-01     | Bước 2 | Popup  | Cần quyền camera          | (dialog xin quyền camera)                                                     | Camera bị từ chối quyền khi quét QR     |
| EF-02     | Bước 5 | Inline |                             | "Mã không hợp lệ hoặc đã hết hạn. Quét lại mã mới trên máy con" | QR sai hoặc đã hết hạn                  |
| EF-03     | Bước 4 | Toast  |                             | "Kiểm tra kết nối mạng và thử lại"                                      | Mất mạng khi ghép nối                    |
| EF-04     | Bước 1 | Popup  | Đạt giới hạn thiết bị | "Đã đạt số thiết bị tối đa (5)"                                       | Vượt giới hạn 5 thiết bị / tài khoản |

**6. Yêu cầu Phi chức năng (NFR)**

| ID     | Loại     | Mô tả                                                                               |
| :----- | :-------- | :------------------------------------------------------------------------------------ |
| NFR-01 | Bảo mật | Giới hạn 5 thiết bị / tài khoản enforce ở server (không chỉ ẩn nút client) |
| NFR-02 | Bảo mật | QR có thời hạn (5 phút), xác thực ghép nối ở server                          |

**7. Thiết kế giao diện**
N/A

**8. Event tracking (Mixpanel)**
N/A

**9. Thiết kế API**
N/A

**10. Thiết kế thuật toán**
N/A

---

### UC-04: Hiển thị danh sách thiết bị + Trạng thái hoạt động

**1. Thông tin chung**

| Tiêu đề                     | Mô tả                                                                                                                                                                                                       |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ID Use Case                    | UC-04 (FR-01)                                                                                                                                                                                                 |
| Tên Use Case                  | Xác nhận thiết bị con đã ghép nối + trạng thái hoạt động                                                                                                                                         |
| Mô tả                        | Phụ huynh thấy xác nhận realtime khi máy con ghép nối xong, biết thiết bị đã được quản lý, rule bắt đầu áp dụng, và theo dõi được trạng thái hoạt động của từng thiết bị |
| Actor                          | Phụ huynh                                                                                                                                                                                                    |
| Pre-condition                  | Đã hoàn tất UC-01, UC-03 (FR-01) + UC-01 (FR-03); vừa quét QR máy con                                                                                                                                  |
| Trigger                        | Máy bố mẹ quét QR máy con và ghép nối thành công (server xác thực hợp lệ)                                                                                                                       |
| Post-condition – Thành công | App Parents cập nhật trạng thái thành công, chuyển Dashboard trong ≤ 3 giây; thiết bị xuất hiện trong danh sách hồ sơ trẻ                                                                    |
| Post-condition – Thất bại   | Ghép nối thất bại → App Parents giữ nguyên màn quét QR                                                                                                                                               |

**2. Luồng chính (Happy Path)**

| Bước | Actor      | Hành động / Phản hồi của Hệ thống                                                                |
| :----- | :--------- | :------------------------------------------------------------------------------------------------------- |
| 1      | Phụ huynh | Vừa quét QR máy con (UC-03 FR-01)                                                                     |
| 2      | Hệ thống | Server xác thực hợp lệ → liên kết thiết bị con vào hồ sơ                                     |
| 3      | Hệ thống | App Parents tự cập nhật trạng thái thành công và chuyển sang màn hình chính trong ≤ 3 giây |
| 4      | Hệ thống | Thiết bị xuất hiện trong danh sách của hồ sơ trẻ (có thể có nhiều thiết bị/hồ sơ)       |

**3. Luồng thay thế (Alternative Flow)**

| ID Luồng | Bước   | Mô tả                                                                                                                                                                                                                                                        |
| :-------- | :------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| AF-01     | Bước 2 | Ghép nối thất bại (mất mạng, lỗi thiết bị, QR hết hạn...) → App Parents giữ nguyên ở màn quét QR                                                                                                                                              |
| AF-02     | Bước 4 | Xem chi tiết profile con → hiển thị danh sách thiết bị, mỗi thiết bị: tên thiết bị, nền tảng (Android/iOS), thời điểm ghép nối, trạng thái hoạt động (*Đang sử dụng / Không sử dụng/ Mất kết nối*)                         |
| AF-03     | Bước 4 | Thiết bị có màn hình bật và có ứng dụng chạy → hiện "Đang sử dụng"<br /><br />Thiết bị bật nhưng màn hình tắt → hiện "Không sử dụng"<br /><br />Thiết bị ngưng hoạt động → hiện "Mất kết nối" (xem định nghĩa PL-02) |

**4. Quy tắc Nghiệp vụ (Business Rules)**

| Business Rules | Mô tả                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| :------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| BR-01          | App Parents cập nhật trạng thái ghép nối realtime và chuyển vào màn hình chính trong ≤ 3 giây                                                                                                                                                                                                                                                                                                                                                                         |
| BR-02          | Sau ghép nối, chi tiết profile hiển thị**danh sách thiết bị** (1 hồ sơ có thể nhiều thiết bị); mỗi thiết bị: tên, nền tảng, thời điểm ghép nối, trạng thái hoạt động                                                                                                                                                                                                                                                                           |
| BR-03          | Trạng thái hoạt động được xác định bằng**heartbeat kèm trạng thái màn hình và ứng dụng** máy con gửi về server (chi tiết định nghĩa ở Phụ lục PL-02):<br />• **Đang sử dụng (Active):** có kết nối, màn hình bật và có app đang chạy.<br />• **Không sử dụng (Idle):** có kết nối nhưng màn hình tắt.<br />• **Mất kết nối (Disconnected):** > **3 phút** không nhận được heartbeat |
| BR-04          | Trạng thái được theo dõi**độc lập cho từng thiết bị** trong hồ sơ                                                                                                                                                                                                                                                                                                                                                                                               |

**5. Luồng Ngoại lệ / Lỗi (Exception / Error Flow)**

| ID Luồng | Bước   | Loại               | Title | Error message | Trigger                                                                         |
| :-------- | :------- | :------------------ | :---- | :------------ | :------------------------------------------------------------------------------ |
| EF-01     | Bước 3 | (Không hiển thị) |       | (không có)  | Máy con ghép nối xong nhưng App Parents chưa nhận tín hiệu (mạng trễ) |
| EF-02     | Bước 1 | (Không hiển thị) |       | (không có)  | Phụ huynh thoát màn quét trước khi server xác nhận                      |

**6. Yêu cầu Phi chức năng (NFR)**

| ID     | Loại       | Mô tả                                                                                                                                                                                                                                     |
| :----- | :---------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| NFR-01 | Hiệu năng | App Parents cập thái ghép nối và chuyển Dashboard trong ≤ 3 giây                                                                                                                                                                    |
| NFR-02 | Tin cậy    | Đồng bộ trạng thái realtime giữa máy con và App Parents (server push/polling)                                                                                                                                                       |
| NFR-03 | Tin cậy    | Máy con gửi heartbeat định kỳ**mỗi 60 giây** (kèm screen state và foreground app) và gửi sự kiện tức thời khi màn hình bật/tắt; server đánh dấu ngoại tuyến khi quá **3 phút** không nhận heartbeat |

**7. Thiết kế giao diện**
N/A

**8. Event tracking (Mixpanel)**
N/A

**9. Thiết kế API**
N/A

**10. Thiết kế thuật toán**
N/A

---

### UC-05: Máy con hiển thị QR ghép nối (App Kid)

**1. Thông tin chung**

| Tiêu đề                     | Mô tả                                                                                                                                                                                      |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ID Use Case                    | UC-05 (FR-01)                                                                                                                                                                                |
| Tên Use Case                  | Máy con hiển thị QR ghép nối (App Kid)                                                                                                                                                  |
| Mô tả                        | App Kid khi mở lần đầu sẽ sinh và hiển thị mã QR ghép nối, tự refresh mỗi 5 phút, chờ máy bố mẹ quét để liên kết thiết bị con vào tài khoản/hồ sơ của bố mẹ |
| Actor                          | Người cài máy con (App Kid)                                                                                                                                                              |
| Pre-condition                  | Mở App Kid lần đầu; thiết bị chưa được ghép nối                                                                                                                                  |
| Trigger                        | Mở App Kid lần đầu                                                                                                                                                                       |
| Post-condition – Thành công | Sau khi bố mẹ quét QR, máy con liên kết vào hồ sơ của bố mẹ thành công; server sync realtime để App Parents cập nhật                                                       |
| Post-condition – Thất bại   | Không sinh được QR / ghép nối lỗi → báo lỗi tương ứng, giữ màn hiển thị QR                                                                                                  |

**2. Luồng chính (Happy Path)**

| Bước | Actor                 | Hành động / Phản hồi của Hệ thống                                     |
| :----- | :-------------------- | :---------------------------------------------------------------------------- |
| 1      | Người cài máy con | Mở App Kid lần đầu → app sinh và hiển thị mã QR ghép nối           |
| 2      | Hệ thống            | Tự refresh mã QR mỗi 5 phút (mã cũ hết hạn khi refresh)               |
| 3      | Máy bố mẹ          | Máy bố mẹ quét QR — Liên quan: UC-03 (FR-01)                            |
| 4      | Hệ thống            | Server xác thực hợp lệ → liên kết máy con vào hồ sơ của bố mẹ   |
| 5      | Hệ thống            | Server sync realtime để App Parents cập nhật — Liên quan: UC-04 (FR-01) |

**3. Luồng thay thế (Alternative Flow)**

| ID Luồng | Bước   | Mô tả                                                                             |
| :-------- | :------- | :---------------------------------------------------------------------------------- |
| AF-01     | Bước 2 | QR hết hạn sau 5 phút → app tự sinh mã mới, tiếp tục hiển thị chờ quét |
| AF-02     | Bước 1 | Mất mạng khi mở App Kid → không sinh được QR, báo lỗi và cho thử lại   |

**4. Quy tắc Nghiệp vụ (Business Rules)**

| Business Rules | Mô tả                                                                                                                |
| :------------- | :--------------------------------------------------------------------------------------------------------------------- |
| BR-01          | **1 hồ sơ con có thể liên kết nhiều thiết bị** (bỏ single-use / ràng buộc 1 hồ sơ ↔ 1 thiết bị) |
| BR-02          | QR**tự refresh mỗi 5 phút**; mã cũ hết hạn khi refresh                                                    |
| BR-03          | Tối đa**5 thiết bị / tài khoản bố mẹ**, enforce ở server (đồng bộ UC-03 FR-01)                       |

**5. Luồng Ngoại lệ / Lỗi (Exception / Error Flow)**

| ID Luồng | Bước   | Loại  | Title                       | Error message                                            | Trigger                                         |
| :-------- | :------- | :----- | :-------------------------- | :------------------------------------------------------- | :---------------------------------------------- |
| EF-01     | Bước 1 | Inline |                             | "Không tạo được mã. Kiểm tra mạng và thử lại" | Mất mạng khi sinh QR                          |
| EF-02     | Bước 4 | Inline |                             | "Ghép nối thất bại, vui lòng thử lại"             | Server từ chối ghép nối (QR hết hạn/lỗi) |
| EF-03     | Bước 4 | Popup  | Đạt giới hạn thiết bị | "Tài khoản đã đạt số thiết bị tối đa (5)"     | Vượt giới hạn 5 thiết bị / tài khoản    |

**6. Yêu cầu Phi chức năng (NFR)**

| ID     | Loại     | Mô tả                                                      |
| :----- | :-------- | :----------------------------------------------------------- |
| NFR-01 | Bảo mật | QR có thời hạn (5 phút); ghép nối xác thực ở server |

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

| Bước | Actor                 | Hành động / Phản hồi của Hệ thống                                                                        |
| :----- | :-------------------- | :--------------------------------------------------------------------------------------------------------------- |
| 1      | Người cài máy con | Đã ghép nối thành công với App Parents                                                                    |
| 2      | Người cài máy con | Bắt đầu vào phần xin quyền                                                                                 |
| 3      | Hệ thống            | Với mỗi quyền, mở đúng trang Cài đặt hệ thống theo checklist tuần tự (chi tiết ở Phụ lục PL-01) |
| 4      | Hệ thống            | Re-check quyền mỗi khi App Kid quay lại foreground                                                            |

**3. Luồng thay thế (Alternative Flow)**

| ID Luồng | Bước   | Mô tả                                                                                                                                          |
| :-------- | :------- | :----------------------------------------------------------------------------------------------------------------------------------------------- |
| AF-01     | Bước 3 | Không mở được đích danh trang setting (khác nhau giữa các bản Android) → dùng intent chuẩn, kèm hướng dẫn thao tác thủ công |

**4. Quy tắc Nghiệp vụ (Business Rules)**

| Business Rules | Mô tả                                                                                                    |
| :------------- | :--------------------------------------------------------------------------------------------------------- |
| BR-01          | Accessibility + Usage Access + Overlay + VPN + Device Admin là**bắt buộc**                        |
| BR-02          | Bỏ tối ưu pin + auto-start là**khuyến nghị** (auto-start bắt buộc trên máy OEM tùy biến) |
| BR-03          | App phải re-check quyền mỗi lần quay lại foreground                                                   |
| BR-04          | Không cho qua bước nếu chưa cấp đủ quyền bắt buộc                                               |

**5. Luồng Ngoại lệ / Lỗi (Exception / Error Flow)**

| ID Luồng | Bước   | Loại             | Title            | Error message       | Trigger                          |
| :-------- | :------- | :---------------- | :--------------- | :------------------ | :------------------------------- |
| EF-01     | Bước 3 | Màn hướng dẫn | Cần cấp quyền | (màn hướng dẫn) | User từ chối quyền bắt buộc |

**6. Yêu cầu Phi chức năng (NFR)**

| ID     | Loại          | Mô tả                                                                                                                                               |
| :----- | :------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------- |
| NFR-01 | Tương thích | Trang Cài đặt khác nhau giữa các bản Android → dùng intent chuẩn; nếu không mở được đích danh thì fallback hướng dẫn thủ công |
| NFR-02 | Tin cậy       | Re-check toàn bộ quyền mỗi lần app quay lại foreground                                                                                          |

**7. Thiết kế giao diện**
N/A

**8. Event tracking (Mixpanel)**
N/A

**9. Thiết kế API**
N/A

**10. Thiết kế thuật toán**
N/A

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
| Pre-condition                  | Đã đăng nhập                                                                                                                                                          |
| Trigger                        | Phụ huynh nhập thông tin hồ sơ và bấm "Lưu"                                                                                                                        |
| Post-condition – Thành công | Tạo hồ sơ mới; hồ sơ xuất hiện trong danh sách; server lưu dữ liệu                                                                                             |
| Post-condition – Thất bại   | Không tạo được hồ sơ; hiển thị lỗi tương ứng                                                                                                                  |

**2. Luồng chính (Happy Path)**

| Bước | Actor      | Hành động / Phản hồi của Hệ thống                                                            |
| :----- | :--------- | :--------------------------------------------------------------------------------------------------- |
| 1      | Phụ huynh | Nhập thông tin hồ sơ (Tên + tuổi: Bắt buộc; Giới tính, Ảnh đại diện, SĐT: tùy chọn) |
| 2      | Phụ huynh | Bấm "Lưu"                                                                                          |
| 3      | Hệ thống | Validate: Tên + tuổi bắt buộc; SĐT đúng định dạng nếu có nhập                           |
| 4      | Hệ thống | Tạo hồ sơ mới ; áp idempotency chống double submit                                             |
| 5      | Hệ thống | Hồ sơ mới xuất hiện trong danh sách; server lưu dữ liệu hồ sơ                             |

**3. Luồng thay thế (Alternative Flow)**

| ID Luồng | Bước   | Mô tả                                                                                               |
| :-------- | :------- | :---------------------------------------------------------------------------------------------------- |
| AF-01     | Bước 3 | Để trống trường bắt buộc → hiển thị lỗi inline và nút "Lưu" bị vô hiệu               |
| AF-02     | Bước 3 | SĐT sai định dạng → lỗi inline; SĐT là trường tùy chọn nên có thể bỏ trống để lưu |

**4. Quy tắc Nghiệp vụ (Business Rules)**

| Business Rules | Mô tả                                                                                                     |
| :------------- | :---------------------------------------------------------------------------------------------------------- |
| BR-01          | Tên + Tuổi là bắt buộc; Giới tính, Ảnh, SĐT là tùy chọn                                         |
| BR-02          | 1 hồ sơ con có thể gắn nhiều thiết bị                                                               |
| BR-03          | **Tối đa 5 thiết bị / tài khoản bố mẹ** (cộng dồn tất cả hồ sơ)                         |
| BR-04          | Cho phép trùng tên hồ sơ                                                                               |
| BR-05          | Vô hiệu nút "Lưu" sau lần bấm đầu + idempotency ở server → chỉ tạo 1 hồ sơ, không nhân bản |
| BR-07          | Giới hạn số thiết bị enforce ở server (không chỉ ẩn nút phía client)                             |
| BR-08          | Số tuổi của con tự động`+1` khi tới ngày `1/1/năm kế tiếp`                                   |

**5. Luồng Ngoại lệ / Lỗi (Exception / Error Flow)**

| ID Luồng | Bước   | Loại | Title | Error message                             | Trigger                     |
| :-------- | :------- | :---- | :---- | :---------------------------------------- | :-------------------------- |
| EF-01     | Bước 4 | Toast |       | "Kiểm tra kết nối mạng và thử lại" | Mất mạng khi lưu hồ sơ |

**6. Yêu cầu Phi chức năng (NFR)**

| ID     | Loại                 | Mô tả                                                                                                                                                                        |
| :----- | :-------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| NFR-01 | Bảo mật / Pháp lý | ⚠ Dữ liệu trẻ vị thành niên (Tên, Tuổi, SĐT, Ảnh). Sensitive data. Legal check required — mã hóa khi truyền, tuân thủ chính sách bảo vệ dữ liệu trẻ em |
| NFR-02 | Bảo mật             | Giới hạn số thiết bị / tài khoản enforce ở server                                                                                                                      |

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

| Tiêu đề                     | Mô tả                                                                                                                                                        |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ID Use Case                    | UC-02 (FR-03)                                                                                                                                                  |
| Tên Use Case                  | Chỉnh sửa hồ sơ                                                                                                                                            |
| Mô tả                        | Phụ huynh chỉnh sửa thông tin hồ sơ con (tên, ảnh, giới tính, tuổi, SĐT) để thông tin luôn đúng khi con thay đổi hoặc nhập sai lúc tạo |
| Actor                          | Phụ huynh                                                                                                                                                     |
| Pre-condition                  | Hồ sơ đã tồn tại — Liên quan: UC-01 (FR-03)                                                                                                            |
| Trigger                        | Phụ huynh sửa 1 hoặc nhiều trường và bấm "Lưu"                                                                                                        |
| Post-condition – Thành công | Cập nhật thông tin hồ sơ; danh sách và các màn liên quan hiển thị thông tin mới                                                                  |
| Post-condition – Thất bại   | Không cập nhật được; hiển thị lỗi tương ứng, không mất thay đổi đang nhập                                                                    |

**2. Luồng chính (Happy Path)**

| Bước | Actor      | Hành động / Phản hồi của Hệ thống                                               |
| :----- | :--------- | :-------------------------------------------------------------------------------------- |
| 1      | Phụ huynh | Mở màn chi tiết một hồ sơ đã tạo                                               |
| 2      | Phụ huynh | Thay đổi 1 hoặc nhiều trường (tên/ảnh/giới tính/ngày sinh/SĐT), bấm "Lưu" |
| 3      | Hệ thống | Validate trường bắt buộc (Tên + tuổi)                                             |
| 4      | Hệ thống | Cập nhật thông tin hồ sơ                                                           |
| 5      | Hệ thống | Danh sách hồ sơ + các màn liên quan hiển thị thông tin mới                    |

**3. Luồng thay thế (Alternative Flow)**

| ID Luồng | Bước   | Mô tả                                                                                                                    |
| :-------- | :------- | :------------------------------------------------------------------------------------------------------------------------- |
| AF-01     | Bước 2 | Đã sửa vài trường chưa lưu, bấm "Quay lại" → hỏi xác nhận "Hủy thay đổi chưa lưu?" trước khi rời đi |
| AF-02     | Bước 2 | Close/kill app khi chưa lưu → hệ thống không lưu thay đổi                                                         |

**4. Quy tắc Nghiệp vụ (Business Rules)**

| Business Rules | Mô tả                                                                                                                      |
| :------------- | :--------------------------------------------------------------------------------------------------------------------------- |
| BR-01          | Tên+tuổi vẫn là trường bắt buộc khi sửa                                                                             |
| BR-02          | Sửa hồ sơ KHÔNG ảnh hưởng liên kết / trạng thái các thiết bị đã ghép nối (sửa hồ sơ ≠ ghép nối lại) |
| BR-03          | Sửa đồng thời trên 2 thiết bị phụ huynh → ghi theo nguyên tắc last-write-wins                                     |
| BR-04          | Sửa hồ sơ không đụng tới liên kết thiết bị đã ghép nối                                                        |
| BR-05          | Khi close/kill app giữa chừng thì không lưu thay đổi                                                                  |

**5. Luồng Ngoại lệ / Lỗi (Exception / Error Flow)**

| ID Luồng | Bước   | Loại  | Title                     | Error message                             | Trigger                                                    |
| :-------- | :------- | :----- | :------------------------ | :---------------------------------------- | :--------------------------------------------------------- |
| EF-01     | Bước 3 | Inline |                           | "Vui lòng nhập tên"                    | Xóa Tên và bấm "Lưu"                                  |
| EF-02     | Bước 3 | Inline |                           | "Vui lòng nhập số tuổi"               | Xóa tuổi và bấm "Lưu"                                 |
| EF-03     | Bước 4 | Toast  |                           | "Kiểm tra kết nối mạng và thử lại" | Mất mạng khi lưu chỉnh sửa                            |
| EF-04     | Bước 4 | Popup  | Không tìm thấy hồ sơ | "Hồ sơ không còn tồn tại"           | Hồ sơ bị xóa ở thiết bị/phiên khác khi đang sửa |

**6. Yêu cầu Phi chức năng (NFR)**

| ID     | Loại                 | Mô tả                                                                  |
| :----- | :-------------------- | :----------------------------------------------------------------------- |
| NFR-01 | Bảo mật / Pháp lý | ⚠ Dữ liệu trẻ vị thành niên. Sensitive data. Legal check required |
| NFR-02 | Ràng buộc           | Sửa hồ sơ không đụng tới liên kết thiết bị đã ghép nối    |

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
| Post-condition – Thành công | Hồ sơ, liên kết thiết bị và**toàn bộ log/lịch sử hành vi của con trên server** bị xóa, biến mất khỏi danh sách; nếu có thiết bị thì gỡ quản lý máy con                 |
| Post-condition – Thất bại   | Không xóa được; hiển thị lỗi, không xóa nửa vời phía client                                                                                                                                  |

**2. Luồng chính (Happy Path) — Xóa hồ sơ không có thiết bị**

| Bước | Actor      | Hành động / Phản hồi của Hệ thống      |
| :----- | :--------- | :--------------------------------------------- |
| 1      | Phụ huynh | Chọn một hồ sơ chưa gắn thiết bị nào  |
| 2      | Phụ huynh | Bấm "Xóa hồ sơ" và xác nhận             |
| 3      | Hệ thống | Xóa hồ sơ + log/lịch sử hành vi của con |
| 4      | Hệ thống | Hồ sơ biến mất khỏi danh sách            |

**3. Luồng thay thế (Alternative Flow)**

| ID Luồng | Bước   | Mô tả                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| :-------- | :------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| AF-01     | Bước 2 | Xóa hồ sơ ĐANG có thiết bị<br />→ hiển thị cảnh báo "Xóa hồ sơ sẽ GỠ QUẢN LÝ toàn bộ thiết bị của con và XÓA toàn bộ dữ liệu, lịch sử hành vi liên quan. Hành động không thể hoàn tác."<br />→ khi xác nhận: gửi lệnh gỡ quản lý tới tất cả thiết bị đã ghép nối; xóa hồ sơ + liên kết thiết bị + rule gắn với hồ sơ + **log hành vi của con trên server**; hồ sơ biến mất khỏi danh sách; app con vào lại tự quay về màn hiển thị QR ghép nối; giữ nguyên bộ cài CA/MDM đã tải |
| AF-02     | Bước 2 | Bấm "Hủy" ở dialog xác nhận → không thay đổi gì, đóng dialog                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| AF-03     | Bước 4 | Xóa hồ sơ cuối cùng → quay về empty state "Chưa có hồ sơ nào. Tạo hồ sơ đầu tiên cho con"                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |

**4. Quy tắc Nghiệp vụ (Business Rules)**

| Business Rules | Mô tả                                                                                                                                                                                                                                                                                                                    |
| :------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| BR-01          | Xóa hồ sơ không có thiết bị → xóa thông tin hồ sơ + log/lịch sử hành vi của con                                                                                                                                                                                                                            |
| BR-02          | Xóa hồ sơ đang có thiết bị → yêu cầu xác nhận                                                                                                                                                                                                                                                                  |
| BR-03          | Xóa hồ sơ có thiết bị →<br />gửi lệnh gỡ quản lý tới tất cả thiết bị đã ghép nối;<br />xóa hồ sơ + liên kết thiết bị + rule;<br />**xóa toàn bộ log/lịch sử hành vi của con trên server**;<br />hồ sơ biến mất khỏi danh sách;<br />giữ nguyên CA/MDM;<br />xóa app con |
| BR-04          | Giữ nguyên bộ cài CA / MDM đã tải về máy con trước đó                                                                                                                                                                                                                                                         |
| BR-05          | **Xóa hồ sơ → xóa toàn bộ log/lịch sử hành vi của con lưu trên server** (không giữ lại)                                                                                                                                                                                                              |

**5. Luồng Ngoại lệ / Lỗi (Exception / Error Flow)**

| ID Luồng | Bước   | Loại               | Title | Error message                | Trigger                                                      |
| :-------- | :------- | :------------------ | :---- | :--------------------------- | :----------------------------------------------------------- |
| EF-01     | Bước 3 | Toast               |       | "Xóa thất bại, thử lại" | Mất mạng khi xóa                                          |
| EF-02     | Bước 3 | (Không hiển thị) |       | (không có)                 | Lệnh gỡ quản lý không tới máy con (offline kéo dài) |

**6. Yêu cầu Phi chức năng (NFR)**

| ID     | Loại                 | Mô tả                                                                                                                       |
| :----- | :-------------------- | :---------------------------------------------------------------------------------------------------------------------------- |
| NFR-01 | Bảo mật / Pháp lý | ⚠ Dữ liệu trẻ vị thành niên. Sensitive data. Legal check required                                                      |
| NFR-02 | Pháp lý             | Xóa log/lịch sử hành vi khi xóa hồ sơ phù hợp quyền được lãng quên (data erasure) đối với dữ liệu trẻ em |

**7. Thiết kế giao diện**
N/A

**8. Event tracking (Mixpanel)**
N/A

**9. Thiết kế API**
N/A

**10. Thiết kế thuật toán**
N/A

---

## Phụ lục

**PL-01 — Checklist chuỗi quyền cốt lõi Android (UC-06 FR-01)**

| #     | Quyền                                      | Đường dẫn cấp                                                                                               | Mục đích                            | Mức độ                                           |
| :---- | :------------------------------------------ | :--------------------------------------------------------------------------------------------------------------- | :------------------------------------- | :-------------------------------------------------- |
| 1     | Accessibility                               | Cài đặt → Trợ năng (Accessibility) → [App Kid] → Bật                                                    | Phát hiện app đang chạy            | Bắt buộc                                          |
| 2     | Usage Access                                | Cài đặt → Ứng dụng → Quyền truy cập đặc biệt → Quyền sử dụng (Usage access) → [App Kid] → Bật | Báo cáo thời gian dùng             | Bắt buộc                                          |
| 3     | Hiển thị trên ứng dụng khác (Overlay) | Cài đặt → Quyền truy cập đặc biệt → Hiển thị trên ứng dụng khác → [App Kid] → Bật             | Hiển thị màn khóa                  | Bắt buộc                                          |
| 4     | Device Admin                                | Dialog "Kích hoạt quản trị thiết bị" → Kích hoạt                                                        | Khóa máy, chống gỡ                 | Bắt buộc                                          |
| 5     | VPN                                         | Dialog hệ thống "[App Kid] muốn thiết lập kết nối VPN" → Đồng ý                                       | Định tuyến và lọc traffic         | Bắt buộc                                          |
| 6     | Bỏ tối ưu pin                            | Cài đặt → Pin → Bỏ tối ưu pin cho [App Kid]                                                              | Không bị kill nền                   | Khuyến nghị                                       |
| *7* | *Auto-start (OEM)*                        | *Trang tự khởi động theo hãng (Xiaomi/Oppo/Vivo)*                                                         | *Chạy nền bền bỉ trên máy OEM* | *Khuyến nghị (bắt buộc trên OEM tùy biến)* |
| 8     | Notification (Android 13+)                  | Dialog quyền thông báo                                                                                        | Nhận thông báo                      | Bắt buộc trên Android 13+                        |
| 9     | CA                                          | Tải về thiết bị                                                                                              | Chặn lọc nội dung                   | Bắt buộc                                          |

---

**PL-02 — Định nghĩa trạng thái hoạt động của máy con (UC-04 FR-01)**

> **Cơ chế:** Máy con (App Kid) gửi **heartbeat** định kỳ kèm trạng thái màn hình (screen_state) và ứng dụng hoạt động ở trước (foreground_app) về server. Đồng thời, gửi sự kiện tức thời khi màn hình thay đổi bật/tắt (Screen ON <-> OFF) để server cập nhật trạng thái ngay lập tức.
> (*Đang sử dụng / Không sử dụng/ Mất kết nối*)

| Trạng thái                             | Điều kiện                                                                                                                                        | Ý nghĩa                                                                                    |
| :--------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------- |
| **Đang sử dụng** (Active)       | Heartbeat gần nhất **≤ 3 phút** VÀ trạng thái màn hình là**ON** (đang bật) VÀ có ứng dụng đang hoạt động ở trước | Trẻ đang tương tác trực tiếp với thiết bị                                          |
| **Không sử dụng** (Idle)       | Heartbeat gần nhất**≤ 3 phút** VÀ trạng thái màn hình là**OFF** (đang tắt)                                                  | Thiết bị bật nguồn, kết nối tốt, kiểm soát còn hiệu lực nhưng trẻ không dùng |
| **Mất kết nối** (Disconnected) | **> 3 phút** không nhận được heartbeat                                                                                                  | Máy tắt / mất mạng / app bị kill / bị gỡ / quyền cốt lõi bị thu hồi              |

**Tham số:**

| Tham số           | Giá trị          | Ghi chú                                                                |
| :----------------- | :----------------- | :---------------------------------------------------------------------- |
| Chu kỳ heartbeat  | **60 giây** | Máy con gửi heartbeat về server mỗi 60s                             |
| Ngưỡng offline   | **3 phút**  | Không có heartbeat quá 3 phút → đánh dấu ngoại tuyến          |
| Phạm vi theo dõi | Từng thiết bị   | Trạng thái được tính độc lập cho mỗi thiết bị trong hồ sơ |
