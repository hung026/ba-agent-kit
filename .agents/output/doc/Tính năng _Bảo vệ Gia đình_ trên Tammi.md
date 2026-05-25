# Tính năng "Bảo vệ Gia đình" trên Tammi 

---

## 1\. Tóm tắt

Tính năng **"Bảo vệ Gia đình"** được tích hợp vào ứng dụng Tammi dưới dạng một module độc lập, đặt song song với tính năng "Nhóm gia đình" hiện có. Người dùng truy cập qua **2 tab segment control** tại màn hình "Nhóm gia đình": Tab 1 giữ nguyên flow Tammi, Tab 2 là module Lá Chắn Số.

Mục tiêu: Cho phép một thành viên trong gia đình (Trưởng nhóm) chủ động bảo vệ người thân trước các cuộc gọi lừa đảo, thông qua hệ thống phát hiện của Lá Chắn Số và thông báo đẩy real-time. Module chỉ hỗ trợ thuê bao nhà mạng Viettel. Data của 2 module hoàn toàn độc lập — không có đồng bộ giữa "Nhóm gia đình" Tammi và "Bảo vệ Gia đình" Lá Chắn Số.

---

## 2\. Danh sách Use Case

| Nhóm chức năng | ID Use Case | Tên Use Case | Actor | Điều kiện trước | Điều kiện sau |
| :---- | :---- | :---- | :---- | :---- | :---- |
| Onboarding | UC-01 | Onboarding "Bảo vệ Gia đình" | Trưởng nhóm | Đã đăng nhập Tammi, chưa từng vào tab "Bảo vệ Gia đình" | Trưởng nhóm đã xem giới thiệu và đồng ý điều khoản Lá Chắn Số |
| Tạo nhóm | UC-02 | Tạo nhóm bảo vệ | Trưởng nhóm | Đã hoàn thành UC-01, chưa có nhóm bảo vệ nào | Nhóm bảo vệ được tạo thành công, trưởng nhóm vào màn danh sách thành viên |
| Quản lý thành viên | UC-03 | Thêm thành viên thủ công | Trưởng nhóm | Đã có nhóm bảo vệ (UC-02 hoàn tất) | Thành viên được thêm vào nhóm bảo vệ, lời mời được gửi đi |
| Quản lý thành viên | UC-04 | Thành viên phản hồi lời mời | Thành viên (có cài app) | Thành viên nhận được lời mời từ trưởng nhóm, đã cài app Tammi | Thành viên gia nhập hoặc từ chối nhóm bảo vệ |
| Cảnh báo | UC-05 | Nhận cảnh báo cuộc gọi lừa đảo | Trưởng nhóm, Hệ thống Lá Chắn Số | Thành viên đang ở trong nhóm bảo vệ, Lá Chắn Số phát hiện cuộc gọi nghi vấn | Trưởng nhóm nhận được push notification cảnh báo |
| Cảnh báo | UC-06 | Xem chi tiết cảnh báo | Trưởng nhóm | Đã nhận push notification UC-05, đã đăng nhập Tammi | Trưởng nhóm xem được đầy đủ thông tin cuộc gọi lừa đảo |
| Quản lý thành viên | UC-07 | Quản lý danh sách thành viên | Trưởng nhóm | Đã có nhóm bảo vệ với ít nhất 1 thành viên | Danh sách thành viên được xem hoặc cập nhật (xóa thành công) |
| Cài đặt | UC-08 | Thành viên cài đặt quyền riêng tư | Thành viên (có cài app) | Thành viên đã gia nhập nhóm bảo vệ (UC-04 hoàn tất) | Trạng thái gửi noti cho trưởng nhóm được cập nhật theo lựa chọn |
| Quản lý thành viên | UC-09 | Smart Suggestion import thành viên | Trưởng nhóm, Hệ thống | Đã có nhóm bảo vệ, có thành viên từ Nhóm gia đình Tammi đủ điều kiện (nhà mạng Viettel) và chưa có trong nhóm bảo vệ | Thành viên được thêm vào hoặc bị bỏ qua trong gợi ý |

---

## 3\. Actors

| \# | Actor | Mô tả |
| :---- | :---- | :---- |
| A-01 | Trưởng nhóm | User Tammi tạo và quản lý nhóm "Bảo vệ Gia đình" |
| A-02 | Thành viên (có cài app) | Người thân đã cài Tammi, nhận lời mời và gia nhập nhóm |
| A-03 | Thành viên (không cài app) | Người thân chưa cài Tammi, được thêm vào nhóm, mặc định gửi noti khi có cảnh báo |
| A-04 | Hệ thống Lá Chắn Số | Backend xử lý detect cuộc gọi lừa đảo và gửi push notification |

---

## 4\. Đặc tả chi tiết Use Case

---

### 4.1 Onboarding

#### 1\. Use Case UC-01: Onboarding "Bảo vệ Gia đình"

| Tiêu đề | Mô tả |
| :---- | :---- |
| ID Use Case | UC-01 |
| Tên Use Case | Onboarding "Bảo vệ Gia đình" |
| Mô tả ngắn gọn | Trưởng nhóm lần đầu tiên truy cập tab "Bảo vệ Gia đình", xem màn hình giới thiệu tính năng và đồng ý điều khoản riêng của Lá Chắn Số trước khi tạo nhóm |
| Actor chính | Trưởng nhóm (A-01) |
| Điều kiện trước | Trưởng nhóm đã đăng nhập Tammi; chưa từng hoàn thành onboarding Lá Chắn Số trên thiết bị này |
| Kích hoạt (Trigger) | Trưởng nhóm nhấn vào tab "Bảo vệ Gia đình" lần đầu tiên |
| Điều kiện sau – Thành công | Trưởng nhóm đã đồng ý điều khoản; hệ thống đánh dấu onboarding hoàn tất; chuyển sang UC-02 |
| Điều kiện sau – Thất bại | Trưởng nhóm từ chối điều khoản; hệ thống giữ nguyên tab "Nhóm gia đình" Tammi; onboarding chưa hoàn tất |

#### 2\. Luồng chính (Happy Path)

| Bước | Actor | Hành động / Phản hồi của Hệ thống | BR liên quan |
| :---- | :---- | :---- | :---- |
| 1 | Trưởng nhóm | Nhấn tab "Bảo vệ Gia đình" từ màn hình "Nhóm gia đình" | BR-01 |
| 2 | Hệ thống | Kiểm tra trạng thái onboarding của tài khoản → phát hiện chưa hoàn tất | BR-01 |
| 3 | Hệ thống | Hiển thị màn hình giới thiệu tính năng "Bảo vệ Gia đình" (tên tính năng, lợi ích, cách hoạt động) | BR-02 |
| 4 | Trưởng nhóm | Nhấn "Tiếp tục" |  |
| 5 | Hệ thống | Hiển thị màn hình Điều khoản & Chính sách riêng của Lá Chắn Số (toàn văn, có nút cuộn) | BR-03 |
| 6 | Trưởng nhóm | Đọc và nhấn "Đồng ý" | BR-04 |
| 7 | Hệ thống | Lưu trạng thái đã đồng ý điều khoản (version điều khoản \+ timestamp) → chuyển sang màn tạo nhóm (UC-02) | BR-05 |

#### 3\. Luồng thay thế (Alternative Flow)

| ID Luồng | Bước | Mô tả | BR liên quan |
| :---- | :---- | :---- | :---- |
| AF-01 | Bước 6 | Trưởng nhóm nhấn "Từ chối" hoặc đóng màn điều khoản → Hệ thống đóng flow, giữ nguyên tab "Nhóm gia đình" Tammi. Trạng thái onboarding vẫn là chưa hoàn tất. | BR-04 |
| AF-02 | Bước 1 | Trưởng nhóm đã từng hoàn thành onboarding → Hệ thống bỏ qua UC-01, chuyển thẳng vào UC-02 hoặc màn danh sách thành viên | BR-01 |

#### 4\. Quy tắc Nghiệp vụ (Business Rules)

| Business Rules | Mô tả |
| :---- | :---- |
| BR-01 | Hệ thống kiểm tra trạng thái onboarding theo tài khoản (không phải thiết bị) — đã đồng ý thì không hiện lại |
| BR-02 | Màn hình giới thiệu phải trình bày rõ: tính năng là gì, ai được bảo vệ, dữ liệu nào được thu thập |
| BR-03 | Điều khoản Lá Chắn Số là tài liệu riêng biệt, độc lập với điều khoản Tammi |
| BR-04 | Nút "Đồng ý" chỉ được kích hoạt sau khi user select hết nội dung điều khoản bắt buộc |

#### 5\. Luồng Ngoại lệ / Lỗi (Exception / Error Flow)

| ID Luồng | Bước | Lỗi | Xử lý | Cơ chế fallback | BR liên quan |
| :---- | :---- | :---- | :---- | :---- | :---- |
| EF-01 | Bước 2 | Không lấy được trạng thái onboarding do lỗi mạng | Hiển thị màn onboarding bình thường (fail-open: coi như chưa onboard) | Sau khi đồng ý, retry lưu trạng thái | BR-01 |
| EF-02 | Bước 7 | Lỗi khi lưu trạng thái đồng ý | Hiển thị thông báo "Có lỗi xảy ra, vui lòng thử lại" | Không chuyển sang UC-02 cho đến khi lưu thành công | BR-05 |

---

### 4.2 Tạo nhóm

#### 1\. Use Case UC-02: Tạo nhóm bảo vệ

| Tiêu đề | Mô tả |
| :---- | :---- |
| ID Use Case | UC-02 |
| Tên Use Case | Tạo nhóm bảo vệ |
| Mô tả ngắn gọn | Trưởng nhóm tạo một nhóm bảo vệ mới. Mỗi tài khoản chỉ được phép tạo 1 nhóm bảo vệ. |
| Actor chính | Trưởng nhóm (A-01) |
| Điều kiện trước | Trưởng nhóm đã hoàn thành UC-01; chưa có nhóm bảo vệ nào thuộc tài khoản này |
| Kích hoạt (Trigger) | Hệ thống chuyển hướng từ UC-01 hoặc trưởng nhóm nhấn "Tạo nhóm" từ màn onboarding |
| Điều kiện sau – Thành công | Nhóm bảo vệ được tạo; trưởng nhóm vào màn danh sách thành viên (trống) |
| Điều kiện sau – Thất bại | Nhóm không được tạo; hệ thống hiển thị lỗi tương ứng |

#### 2\. Luồng chính (Happy Path)

| Bước | Actor | Hành động / Phản hồi của Hệ thống | BR liên quan |
| :---- | :---- | :---- | :---- |
| 1 | Hệ thống | Hiển thị màn tạo nhóm bảo vệ | BR-01 |
| 2 | Trưởng nhóm | Nhấn "Tạo nhóm bảo vệ" |  |
| 3 | Hệ thống | Gọi API Lá Chắn Số tạo nhóm mới gắn với tài khoản trưởng nhóm | BR-01, BR-02 |
| 4 | Hệ thống | Tạo nhóm thành công → Chuyển sang màn danh sách thành viên (trống) | BR-02 |
| 5 | Hệ thống | Kiểm tra và hiển thị Smart Suggestion UC-09 (nếu có thành viên eligible) |  |

#### 3\. Luồng thay thế (Alternative Flow)

| ID Luồng | Bước | Mô tả | BR liên quan |
| :---- | :---- | :---- | :---- |
| AF-01 | Bước 1 | Tài khoản đã có nhóm bảo vệ trước đó → Hệ thống bỏ qua UC-02, chuyển thẳng vào màn danh sách thành viên | BR-01 |

#### 4\. Quy tắc Nghiệp vụ (Business Rules)

| Business Rules | Mô tả |
| :---- | :---- |
| BR-01 | Mỗi tài khoản Tammi chỉ được tạo tối đa 1 nhóm bảo vệ |
| BR-02 | Nhóm bảo vệ sau khi tạo không thể đổi tên hoặc xóa toàn bộ — chỉ có thể xóa từng thành viên |

#### 5\. Luồng Ngoại lệ / Lỗi (Exception / Error Flow)

| ID Luồng | Bước | Lỗi | Xử lý | Cơ chế fallback | BR liên quan |
| :---- | :---- | :---- | :---- | :---- | :---- |
| EF-01 | Bước 3 | Lỗi mạng / timeout khi gọi API tạo nhóm | Hiển thị: "Không thể tạo nhóm. Vui lòng kiểm tra kết nối và thử lại." | Nút "Thử lại" — không tạo nhóm trùng lặp | BR-01 |
| EF-02 | Bước 3 | Server trả lỗi 500 | Hiển thị: "Có lỗi hệ thống. Vui lòng thử lại sau." | Retry tối đa 3 lần, mỗi lần cách 2 giây |  |

---

### 4.3 Quản lý thành viên

#### 1\. Use Case UC-03: Thêm thành viên thủ công

| Tiêu đề | Mô tả |
| :---- | :---- |
| ID Use Case | UC-03 |
| Tên Use Case | Thêm thành viên thủ công |
| Mô tả ngắn gọn | Trưởng nhóm thêm thành viên vào nhóm bảo vệ bằng cách nhập số điện thoại hoặc quét mã QR. Chỉ chấp nhận thuê bao nhà mạng Viettel. |
| Actor chính | Trưởng nhóm (A-01) |
| Điều kiện trước | Nhóm bảo vệ đã được tạo (UC-02 hoàn tất); trưởng nhóm đang ở màn danh sách thành viên |
| Kích hoạt (Trigger) | Trưởng nhóm nhấn nút "Thêm thành viên" |
| Điều kiện sau – Thành công | Thành viên được thêm vào nhóm; lời mời được gửi đến thành viên (nếu có app) hoặc nhóm được cập nhật (nếu không có app) |
| Điều kiện sau – Thất bại | Thành viên không được thêm; hệ thống hiển thị thông báo lỗi cụ thể |

#### 2\. Luồng chính (Happy Path) — Nhập số điện thoại

| Bước | Actor | Hành động / Phản hồi của Hệ thống | BR liên quan |
| :---- | :---- | :---- | :---- |
| 1 | Trưởng nhóm | Nhấn "Thêm thành viên" từ màn danh sách |  |
| 2 | Hệ thống | Hiển thị màn nhập SĐT hoặc chọn "Quét QR" |  |
| 3 | Trưởng nhóm | Nhập số điện thoại thành viên | BR-01 |
| 4 | Hệ thống | Validate định dạng SĐT (10 số, bắt đầu bằng 0\) | BR-01 |
| 5 | Hệ thống | Kiểm tra thuê bao có thuộc nhà mạng Viettel không (qua API Lá Chắn Số)   | BR-02 |
| 6 | Hệ thống | Kiểm tra thành viên có cài app Tammi không | BR-03 |
| 7 | Hệ thống | Thêm thành viên vào nhóm bảo vệ; gửi lời mời qua push notification nếu có app, hoặc ghi nhận im lặng nếu không có app | BR-03, BR-04 |
| 8 | Hệ thống | Hiển thị thông báo "Đã thêm thành công" và cập nhật danh sách thành viên |  |

#### 3\. Luồng thay thế (Alternative Flow)

| ID Luồng | Bước | Mô tả | BR liên quan |
| :---- | :---- | :---- | :---- |
| AF-01 | Bước 2 | Trưởng nhóm chọn "Quét QR" → Camera mở ra → Thành viên hiển thị QR từ profile Tammi → Hệ thống đọc SĐT từ QR rồi tiếp tục từ bước 5 | BR-01 |
| AF-02 | Bước 6 | Thành viên chưa cài app Tammi → Hệ thống thêm vào nhóm với trạng thái "Chưa có app" → Mặc định gửi noti cho trưởng nhóm khi phát hiện cảnh báo | BR-03, BR-04 |
| AF-03 | Bước 3 | Thành viên đã có trong nhóm bảo vệ → Hệ thống thông báo: "Số điện thoại này đã có trong nhóm bảo vệ của bạn." | BR-05 |

#### 4\. Quy tắc Nghiệp vụ (Business Rules)

| Business Rules | Mô tả |
| :---- | :---- |
| BR-01 | SĐT phải đúng định dạng: 10 chữ số, bắt đầu bằng số 0 |
| BR-02 | Chỉ chấp nhận thuê bao nhà mạng Viettel. Validation qua API Lá Chắn Số (không dùng prefix tĩnh).   |
| BR-03 | Hệ thống tự phân loại thành viên (có app / không có app) — trưởng nhóm không cần chỉ định |
| BR-04 | Thành viên không có app: mặc định gửi noti cho trưởng nhóm, không cần consent flow từ thành viên |
| BR-05 | Không cho phép thêm trùng SĐT đã có trong nhóm bảo vệ |
| BR-06 | Số lượng thành viên tối đa trong nhóm=10 |

#### 5\. Luồng Ngoại lệ / Lỗi (Exception / Error Flow)

| ID Luồng | Bước | Lỗi | Xử lý | Cơ chế fallback | BR liên quan |
| :---- | :---- | :---- | :---- | :---- | :---- |
| EF-01 | Bước 4 | SĐT sai định dạng | Hiển thị inline error: "Số điện thoại không hợp lệ. Vui lòng nhập đúng 10 chữ số." | Không cho submit | BR-01 |
| EF-02 | Bước 5 | SĐT không thuộc nhà mạng Viettel | Hiển thị: "Số điện thoại này không thuộc nhà mạng Viettel, không thể thêm vào nhóm bảo vệ." | Không thêm thành viên | BR-02 |
| EF-03 | Bước 5 | API Lá Chắn Số timeout/không phản hồi | Hiển thị: "Không thể xác minh số điện thoại. Vui lòng thử lại." | Retry 1 lần, nếu vẫn lỗi → báo lỗi hệ thống | BR-02 |
| EF-04 | Bước 6-7 | Lỗi thêm thành viên phía server | Hiển thị: "Không thể thêm thành viên. Vui lòng thử lại." | Retry |  |
| EF-05 | Bước 1 | Nhóm đã đạt số lượng thành viên tối đa | Hiển thị: "Nhóm bảo vệ đã đạt giới hạn \[TBD\] thành viên." Ẩn nút "Thêm thành viên" | N/A | BR-06 |

---

#### 1\. Use Case UC-04: Thành viên phản hồi lời mời

| Tiêu đề | Mô tả |
| :---- | :---- |
| ID Use Case | UC-04 |
| Tên Use Case | Thành viên phản hồi lời mời |
| Mô tả ngắn gọn | Thành viên đã cài app Tammi nhận push notification lời mời từ trưởng nhóm và chấp nhận hoặc từ chối gia nhập nhóm bảo vệ |
| Actor chính | Thành viên (có cài app) (A-02) |
| Điều kiện trước | Trưởng nhóm đã thêm SĐT của thành viên (UC-03 hoàn tất); thành viên đã cài app Tammi và đang đăng nhập |
| Kích hoạt (Trigger) | Thành viên nhận được push notification lời mời hoặc mở tab "Bảo vệ Gia đình" |
| Điều kiện sau – Thành công (Chấp nhận) | Thành viên gia nhập nhóm bảo vệ; hệ thống Lá Chắn Số bắt đầu monitor; thành viên thấy màn danh sách nhóm |
| Điều kiện sau – Thành công (Từ chối) | Thành viên không gia nhập; trưởng nhóm không nhận được noti về người này |

#### 2\. Luồng chính (Happy Path)

| Bước | Actor | Hành động / Phản hồi của Hệ thống | BR liên quan |
| :---- | :---- | :---- | :---- |
| 1 | Hệ thống | Gửi push notification đến thành viên: "\[Tên trưởng nhóm\] muốn thêm bạn vào nhóm Bảo vệ Gia đình" | BR-01 |
| 2 | Thành viên | Tap vào notification → App mở tại tab "Bảo vệ Gia đình" |  |
| 3 | Hệ thống | Hiển thị popup lời mời: tên trưởng nhóm, mô tả tính năng, 2 CTA: "Đồng ý" và "Từ chối" | BR-02 |
| 4 | Thành viên | Nhấn "Đồng ý" |  |
| 5 | Hệ thống | Xác nhận gia nhập nhóm; kích hoạt Lá Chắn Số monitor cho số điện thoại này; hiển thị màn xác nhận "Bạn đã gia nhập nhóm Bảo vệ Gia đình" | BR-03 |

#### 3\. Luồng thay thế (Alternative Flow)

| ID Luồng | Bước | Mô tả | BR liên quan |
| :---- | :---- | :---- | :---- |
| AF-01 | Bước 4 | Thành viên nhấn "Từ chối" → Hệ thống đóng popup; thành viên không gia nhập nhóm; trưởng nhóm không nhận noti về người này | BR-04 |
| AF-02 | Bước 2 | Thành viên không tap notification mà tự mở app → Popup lời mời hiển thị tại tab "Bảo vệ Gia đình" | BR-02 |
| AF-03 | Bước 3 | Thành viên có lời mời từ nhiều nhóm bảo vệ khác nhau → Hiển thị lần lượt từng lời mời | BR-05 |

#### 4\. Quy tắc Nghiệp vụ (Business Rules)

| Business Rules | Mô tả |
| :---- | :---- |
| BR-01 | Push notification lời mời được gửi ngay khi trưởng nhóm thêm SĐT thành công |
| BR-02 | Popup lời mời hiển thị mỗi lần thành viên vào tab "Bảo vệ Gia đình" cho đến khi phản hồi |
| BR-03 | Một thành viên có thể thuộc nhiều nhóm bảo vệ của các trưởng nhóm khác nhau |
| BR-04 | Thành viên từ chối: trưởng nhóm vẫn thấy tên thành viên trong danh sách nhưng ở trạng thái "Chờ xác nhận" — **TBD: cần confirm UX với designer** |
| BR-05 | Lời mời không có thời hạn hết hạn (Assumption — cần confirm với PM) |

#### 5\. Luồng Ngoại lệ / Lỗi (Exception / Error Flow)

| ID Luồng | Bước | Lỗi | Xử lý | Cơ chế fallback | BR liên quan |
| :---- | :---- | :---- | :---- | :---- | :---- |
| EF-01 | Bước 1 | Push notification không đến (tắt quyền thông báo) | Popup lời mời vẫn hiển thị khi thành viên mở tab "Bảo vệ Gia đình" | N/A | BR-02 |
| EF-02 | Bước 5 | Lỗi server khi xác nhận gia nhập | Hiển thị: "Có lỗi xảy ra. Vui lòng thử lại." | Retry; trạng thái chưa gia nhập cho đến khi thành công |  |

---

### 4.4 Cảnh báo

#### 1\. Use Case UC-05: Nhận cảnh báo cuộc gọi lừa đảo

| Tiêu đề | Mô tả |
| :---- | :---- |
| ID Use Case | UC-05 |
| Tên Use Case | Nhận cảnh báo cuộc gọi lừa đảo |
| Mô tả ngắn gọn | Khi Lá Chắn Số phát hiện thành viên trong nhóm có liên hệ với số điện thoại lừa đảo, hệ thống tự động gửi push notification đến trưởng nhóm |
| Actor chính | Hệ thống Lá Chắn Số (A-04) |
| Actor phụ | Trưởng nhóm (A-01) |
| Điều kiện trước | Thành viên đang ở trong nhóm bảo vệ (với trạng thái active); Lá Chắn Số phát hiện cuộc gọi nghi vấn |
| Kích hoạt (Trigger) | Lá Chắn Số detect thành viên liên hệ với số điện thoại trong danh sách lừa đảo |
| Điều kiện sau – Thành công | Trưởng nhóm nhận được push notification cảnh báo với thông tin cơ bản |
| Điều kiện sau – Thất bại | Push notification không đến được; cảnh báo vẫn được lưu để xem sau trong UC-06 |

#### 2\. Luồng chính (Happy Path)

| Bước | Actor | Hành động / Phản hồi của Hệ thống | BR liên quan |
| :---- | :---- | :---- | :---- |
| 1 | Hệ thống Lá Chắn Số | Phát hiện thành viên liên hệ với số lừa đảo   | BR-01 |
| 2 | Hệ thống Lá Chắn Số | Tạo bản ghi cảnh báo (thành viên, số lừa đảo, thời gian, thời lượng, chiều cuộc gọi) | BR-02 |
| 3 | Hệ thống | Gửi push notification đến trưởng nhóm: "\[Tên thành viên\] vừa nhận/thực hiện cuộc gọi từ số nghi ngờ lừa đảo" | BR-03, BR-04 |
| 4 | Trưởng nhóm | Nhận push notification trên thiết bị |  |

#### 3\. Luồng thay thế (Alternative Flow)

| ID Luồng | Bước | Mô tả | BR liên quan |
| :---- | :---- | :---- | :---- |
| AF-01 | Bước 4 | Thành viên đã bật privacy setting OFF (UC-08) → Hệ thống không gửi noti cho trưởng nhóm; vẫn lưu bản ghi cảnh báo | BR-05 |
| AF-02 | Bước 4 | Thành viên không có app (A-03) → Luôn gửi noti cho trưởng nhóm, không phụ thuộc setting | BR-06 |

#### 4\. Quy tắc Nghiệp vụ (Business Rules)

| Business Rules | Mô tả |
| :---- | :---- |
| BR-01 | Lá Chắn Số chỉ monitor các thành viên đang ở trạng thái active trong nhóm bảo vệ |
| BR-02 | Bản ghi cảnh báo bao gồm: tên thành viên, SĐT lừa đảo, thời gian bắt đầu, thời lượng cuộc gọi, chiều cuộc gọi (gọi đến / gọi đi)   |
| BR-03 | Notification được gửi real-time (không batch) |
| BR-04 | Nội dung push notification không hiển thị số điện thoại lừa đảo đầy đủ (che bớt để bảo mật) — **TBD: confirm với Security team** |
| BR-05 | Thành viên có app đã tắt noti (UC-08): hệ thống không gửi cảnh báo cho trưởng nhóm, nhưng vẫn lưu log |
| BR-06 | Thành viên không có app: luôn gửi cảnh báo cho trưởng nhóm — không cần consent |

#### 5\. Luồng Ngoại lệ / Lỗi (Exception / Error Flow)

| ID Luồng | Bước | Lỗi | Xử lý | Cơ chế fallback | BR liên quan |
| :---- | :---- | :---- | :---- | :---- | :---- |
| EF-01 | Bước 3 | Push notification thất bại (thiết bị trưởng nhóm offline / tắt noti) | Lưu bản ghi cảnh báo; hiển thị badge đỏ trên icon tab "Bảo vệ Gia đình" khi trưởng nhóm mở lại app | Trưởng nhóm xem lại qua UC-06 | BR-03 |
| EF-02 | Bước 2 | Lỗi lưu bản ghi cảnh báo phía Lá Chắn Số | Retry lưu; nếu thất bại → log lỗi phía backend, không gửi noti |  |  |

---

#### 1\. Use Case UC-06: Xem chi tiết cảnh báo

| Tiêu đề | Mô tả |
| :---- | :---- |
| ID Use Case | UC-06 |
| Tên Use Case | Xem chi tiết cảnh báo |
| Mô tả ngắn gọn | Trưởng nhóm tap vào push notification hoặc mở app để xem đầy đủ thông tin về cuộc gọi lừa đảo của thành viên |
| Actor chính | Trưởng nhóm (A-01) |
| Điều kiện trước | Tồn tại ít nhất 1 bản ghi cảnh báo trong nhóm bảo vệ |
| Kích hoạt (Trigger) | Trưởng nhóm tap push notification cảnh báo, hoặc nhấn vào item cảnh báo trong danh sách thành viên |
| Điều kiện sau – Thành công | Trưởng nhóm xem được đầy đủ thông tin chi tiết cuộc gọi lừa đảo |
| Điều kiện sau – Thất bại | Hiển thị thông báo lỗi; không load được chi tiết cảnh báo |

#### 2\. Luồng chính (Happy Path)

| Bước | Actor | Hành động / Phản hồi của Hệ thống | BR liên quan |
| :---- | :---- | :---- | :---- |
| 1 | Trưởng nhóm | Tap push notification cảnh báo | BR-01 |
| 2 | Hệ thống | Kiểm tra trạng thái đăng nhập: đã đăng nhập → navigate deep link đến màn chi tiết cảnh báo | BR-01 |
| 3 | Hệ thống | Load và hiển thị màn chi tiết cảnh báo với đầy đủ thông tin | BR-02 |
| 4 | Trưởng nhóm | Xem thông tin |  |

#### 3\. Luồng thay thế (Alternative Flow)

| ID Luồng | Bước | Mô tả | BR liên quan |
| :---- | :---- | :---- | :---- |
| AF-01 | Bước 2 | Trưởng nhóm chưa đăng nhập Tammi → App mở màn đăng nhập → Sau khi đăng nhập thành công → Navigate đến màn chi tiết cảnh báo | BR-01 |
| AF-02 | Bước 1 | Trưởng nhóm mở app thủ công → Vào tab "Bảo vệ Gia đình" → Nhấn vào item cảnh báo trong danh sách → Màn chi tiết cảnh báo | BR-02 |

#### 4\. Quy tắc Nghiệp vụ (Business Rules)

| Business Rules | Mô tả |
| :---- | :---- |
| BR-01 | Deep link từ push notification phải hoạt động kể cả khi app đang đóng hoàn toàn (cold start) |
| BR-02 | Màn chi tiết cảnh báo hiển thị: Tên thành viên, SĐT lừa đảo (che bớt 3 số giữa), thời gian cuộc gọi, thời lượng cuộc gọi (giây), chiều cuộc gọi (Gọi đến / Gọi đi)   |

#### 5\. Luồng Ngoại lệ / Lỗi (Exception / Error Flow)

| ID Luồng | Bước | Lỗi | Xử lý | Cơ chế fallback | BR liên quan |
| :---- | :---- | :---- | :---- | :---- | :---- |
| EF-01 | Bước 3 | Không load được chi tiết cảnh báo (lỗi mạng / server) | Hiển thị: "Không thể tải thông tin. Vui lòng thử lại." \+ nút Retry | Giữ nguyên màn hình, không auto-navigate |  |
| EF-02 | Bước 3 | ID cảnh báo không tồn tại (đã bị xóa hoặc link cũ) | Hiển thị: "Cảnh báo này không còn tồn tại." → Redirect về màn danh sách thành viên | N/A |  |

---

#### 1\. Use Case UC-07: Quản lý danh sách thành viên

| Tiêu đề | Mô tả |
| :---- | :---- |
| ID Use Case | UC-07 |
| Tên Use Case | Quản lý danh sách thành viên |
| Mô tả ngắn gọn | Trưởng nhóm xem danh sách thành viên trong nhóm bảo vệ và xóa thành viên khi cần |
| Actor chính | Trưởng nhóm (A-01) |
| Điều kiện trước | Đã có nhóm bảo vệ (UC-02 hoàn tất) |
| Kích hoạt (Trigger) | Trưởng nhóm vào tab "Bảo vệ Gia đình" (các lần sau lần đầu) |
| Điều kiện sau – Thành công (Xem) | Danh sách thành viên hiển thị đầy đủ và chính xác |
| Điều kiện sau – Thành công (Xóa) | Thành viên bị xóa khỏi nhóm; hệ thống ngừng gửi noti về người đó |

#### 2\. Luồng chính (Happy Path)

| Bước | Actor | Hành động / Phản hồi của Hệ thống | BR liên quan |
| :---- | :---- | :---- | :---- |
| 1 | Trưởng nhóm | Vào tab "Bảo vệ Gia đình" | BR-01 |
| 2 | Hệ thống | Load và hiển thị danh sách thành viên; mỗi thành viên hiển thị: tên, SĐT (ẩn bớt), trạng thái (Active / Chưa đồng ý / Chưa có app) | BR-01, BR-02 |
| 3 | Trưởng nhóm | Nhấn giữ hoặc vuốt vào thành viên muốn xóa |  |
| 4 | Hệ thống | Hiển thị confirmation dialog: "Bạn có chắc muốn xóa \[Tên\] khỏi nhóm bảo vệ?" với 2 nút: "Xóa" và "Hủy" | BR-03 |
| 5 | Trưởng nhóm | Nhấn "Xóa" |  |
| 6 | Hệ thống | Xóa thành viên khỏi nhóm; ngừng Lá Chắn Số monitor người đó; cập nhật danh sách | BR-04 |

#### 3\. Luồng thay thế (Alternative Flow)

| ID Luồng | Bước | Mô tả | BR liên quan |
| :---- | :---- | :---- | :---- |
| AF-01 | Bước 2 | Danh sách trống (chưa có thành viên nào) → Hiển thị empty state với CTA "Thêm thành viên ngay" |  |
| AF-02 | Bước 5 | Trưởng nhóm nhấn "Hủy" ở dialog → Không có thay đổi |  |

#### 4\. Quy tắc Nghiệp vụ (Business Rules)

| Business Rules | Mô tả |
| :---- | :---- |
| BR-01 | Danh sách thành viên sắp xếp theo thứ tự: thành viên mới thêm gần nhất ở trên cùng |
| BR-02 | SĐT hiển thị dạng che bớt: 09xx\*\*\*xxx   |
| BR-03 | Luôn có bước xác nhận trước khi xóa thành viên — không cho phép xóa trực tiếp 1 chạm |
| BR-04 | Xóa khỏi nhóm bảo vệ không ảnh hưởng đến "Nhóm gia đình" Tammi (2 module độc lập) |
| BR-05 | Thành viên rời nhóm Tammi không tự động bị xóa khỏi nhóm bảo vệ |

#### 5\. Luồng Ngoại lệ / Lỗi (Exception / Error Flow)

| ID Luồng | Bước | Lỗi | Xử lý | Cơ chế fallback | BR liên quan |
| :---- | :---- | :---- | :---- | :---- | :---- |
| EF-01 | Bước 2 | Lỗi load danh sách (mạng / server) | Hiển thị: "Không thể tải danh sách. Vui lòng thử lại." \+ nút Retry | Hiển thị danh sách cache nếu có |  |
| EF-02 | Bước 6 | Lỗi xóa thành viên phía server | Hiển thị: "Không thể xóa thành viên. Vui lòng thử lại." | Giữ nguyên danh sách, không xóa local |  |

---

### 4.5 Cài đặt

#### 1\. Use Case UC-08: Thành viên cài đặt quyền riêng tư

| Tiêu đề | Mô tả |
| :---- | :---- |
| ID Use Case | UC-08 |
| Tên Use Case | Thành viên cài đặt quyền riêng tư |
| Mô tả ngắn gọn | Thành viên đã cài app Tammi tự chọn bật/tắt việc Lá Chắn Số gửi thông báo cảnh báo đến trưởng nhóm khi phát hiện cuộc gọi lừa đảo |
| Actor chính | Thành viên (có cài app) (A-02) |
| Điều kiện trước | Thành viên đã gia nhập nhóm bảo vệ (UC-04 hoàn tất) |
| Kích hoạt (Trigger) | Thành viên truy cập màn hình Setting trong tab "Bảo vệ Gia đình" |
| Điều kiện sau – Thành công | Trạng thái gửi noti được lưu và áp dụng ngay lập tức |
| Điều kiện sau – Thất bại | Hệ thống hiển thị lỗi; trạng thái giữ nguyên giá trị trước đó |

#### 2\. Luồng chính (Happy Path)

| Bước | Actor | Hành động / Phản hồi của Hệ thống | BR liên quan |
| :---- | :---- | :---- | :---- |
| 1 | Thành viên | Vào Setting trong tab "Bảo vệ Gia đình" |  |
| 2 | Hệ thống | Hiển thị toggle: "Cho phép gửi cảnh báo đến trưởng nhóm" (mặc định: ON) | BR-01 |
| 3 | Thành viên | Tắt toggle | BR-02 |
| 4 | Hệ thống | Lưu trạng thái OFF; áp dụng ngay → Lá Chắn Số không gửi noti cho trưởng nhóm về thành viên này | BR-02, BR-03 |

#### 3\. Luồng thay thế (Alternative Flow)

| ID Luồng | Bước | Mô tả | BR liên quan |
| :---- | :---- | :---- | :---- |
| AF-01 | Bước 3 | Thành viên bật lại toggle từ OFF → ON → Hệ thống lưu trạng thái ON; Lá Chắn Số tiếp tục gửi noti cho trưởng nhóm | BR-02 |

#### 4\. Quy tắc Nghiệp vụ (Business Rules)

| Business Rules | Mô tả |
| :---- | :---- |
| BR-01 | Mặc định khi gia nhập nhóm: toggle ở trạng thái ON |
| BR-02 | Thay đổi setting có hiệu lực ngay lập tức, không cần nút Save |
| BR-03 | Khi OFF: Lá Chắn Số vẫn monitor nhưng không push noti cho trưởng nhóm; log vẫn được lưu |
| BR-04 | Chỉ áp dụng cho thành viên có cài app. Thành viên không có app: luôn ON, không có setting này |

#### 5\. Luồng Ngoại lệ / Lỗi (Exception / Error Flow)

| ID Luồng | Bước | Lỗi | Xử lý | Cơ chế fallback | BR liên quan |
| :---- | :---- | :---- | :---- | :---- | :---- |
| EF-01 | Bước 4 | Lỗi lưu setting phía server | Hiển thị: "Không thể lưu cài đặt. Vui lòng thử lại." | Revert toggle về trạng thái cũ | BR-02 |

---

### 4.6 Smart Suggestion

#### 1\. Use Case UC-09: Smart Suggestion import thành viên

| Tiêu đề | Mô tả |
| :---- | :---- |
| ID Use Case | UC-09 |
| Tên Use Case | Smart Suggestion import thành viên |
| Mô tả ngắn gọn | Hệ thống chủ động gợi ý trưởng nhóm thêm các thành viên đủ điều kiện từ Nhóm gia đình Tammi vào nhóm bảo vệ, thay vì yêu cầu nhập tay |
| Actor chính | Trưởng nhóm (A-01) |
| Actor phụ | Hệ thống |
| Điều kiện trước | Nhóm bảo vệ đã tạo (UC-02); có thành viên trong Nhóm gia đình Tammi thuộc nhà mạng Viettel và chưa có trong nhóm bảo vệ và chưa từng bị bỏ qua |
| Kích hoạt (Trigger) | (1) Ngay sau khi tạo nhóm bảo vệ xong; hoặc (2) Thành viên mới được thêm vào Nhóm gia đình Tammi đủ điều kiện → hiển thị trong lần truy cập tiếp theo |
| Điều kiện sau – Thành công (Thêm) | Thành viên được thêm vào nhóm bảo vệ; lời mời gửi đi |
| Điều kiện sau – Thành công (Bỏ qua) | Card ẩn; thành viên đó không hiện lại trong suggestion |

#### 2\. Luồng chính (Happy Path) — Một thành viên eligible

| Bước | Actor | Hành động / Phản hồi của Hệ thống | BR liên quan |
| :---- | :---- | :---- | :---- |
| 1 | Hệ thống | Kiểm tra danh sách Nhóm gia đình Tammi → Lọc thành viên đủ điều kiện | BR-01, BR-02, BR-03 |
| 2 | Hệ thống | Hiển thị suggestion card ở đầu danh sách: "\[Tên\] (\[SĐT\]) đang trong Nhóm gia đình của bạn. Bạn có muốn thêm người này?" với 2 nút: "Thêm" và "Bỏ qua" | BR-04 |
| 3 | Trưởng nhóm | Nhấn "Thêm" |  |
| 4 | Hệ thống | Thêm thành viên vào nhóm bảo vệ (tương đương UC-03 từ bước 6); ẩn suggestion card | BR-05 |

#### 3\. Luồng thay thế (Alternative Flow)

| ID Luồng | Bước | Mô tả | BR liên quan |
| :---- | :---- | :---- | :---- |
| AF-01 | Bước 3 | Trưởng nhóm nhấn "Bỏ qua" → Hệ thống ẩn card; đánh dấu thành viên này là "đã bỏ qua" → không hiện lại trong suggestion | BR-06 |
| AF-02 | Bước 2 | Có nhiều thành viên eligible → Hiển thị dạng danh sách gợi ý với checkbox cho từng người, kèm nút "Thêm tất cả" và "Bỏ qua tất cả" | BR-07 |
| AF-03 | Bước 2 (AF-02) | Trưởng nhóm chọn checkbox 1 số người và nhấn "Thêm" → Chỉ thêm những người được chọn; những người còn lại vẫn hiện trong suggestion | BR-07 |

#### 4\. Quy tắc Nghiệp vụ (Business Rules)

| Business Rules | Mô tả |
| :---- | :---- |
| BR-01 | Chỉ gợi ý thành viên thuộc nhà mạng Viettel (validate qua API Lá Chắn Số) |
| BR-02 | Không gợi ý thành viên đã có trong nhóm bảo vệ |
| BR-03 | Không gợi ý thành viên đã từng bị bỏ qua — trừ khi trưởng nhóm vào Setting và nhấn "Reset gợi ý" |
| BR-04 | Suggestion card luôn xuất hiện ở đầu danh sách thành viên, phía trên các thành viên hiện tại |
| BR-05 | "Thêm" qua suggestion tương đương thêm thủ công: lời mời được gửi nếu thành viên có app |
| BR-06 | Bỏ qua: dữ liệu "đã bỏ qua" lưu theo cặp \[trưởng nhóm \+ SĐT thành viên\] |
| BR-07 | Giới hạn số suggestion card hiển thị cùng lúc: **TBD** — confirm với Tech Lead |

#### 5\. Luồng Ngoại lệ / Lỗi (Exception / Error Flow)

| ID Luồng | Bước | Lỗi | Xử lý | Cơ chế fallback | BR liên quan |
| :---- | :---- | :---- | :---- | :---- | :---- |
| EF-01 | Bước 1 | Không đọc được danh sách Nhóm gia đình Tammi | Không hiển thị suggestion card; log lỗi | Retry lần sau khi trưởng nhóm mở app |  |
| EF-02 | Bước 4 | Lỗi thêm thành viên từ suggestion | Hiển thị: "Không thể thêm. Vui lòng thử lại." | Card vẫn giữ nguyên để trưởng nhóm thử lại |  |

---

## 5\. Yêu cầu Phi chức năng

| ID | Loại | Mô tả |
| :---- | :---- | :---- |
| NFR-01 | Ràng buộc nhà mạng | Toàn bộ tính năng "Bảo vệ Gia đình" chỉ chấp nhận thuê bao nhà mạng Viettel. Validation thực hiện phía server qua API Lá Chắn Số |
| NFR-02 | Hiệu năng | Push notification cảnh báo phải được gửi trong vòng **5 giây** kể từ khi Lá Chắn Số detect |
| NFR-03 | Độ tin cậy | Bản ghi cảnh báo phải được lưu ngay cả khi push notification thất bại (log trước, push sau) |
| NFR-04 | Phân tách dữ liệu | Data của module "Bảo vệ Gia đình" và "Nhóm gia đình" Tammi hoàn toàn độc lập — không có đồng bộ, không có shared state |
|  |  |  |

---

## 6\. Event Tracking (Mixpanel)

TBD

---

## 7\. Thiết kế API

N/A

---

## 8\. Thiết kế thuật toán

N/A

---

## 9\. Câu hỏi mở & Giả định

### Câu hỏi mở cần confirm

| \# | Câu hỏi | Owner | Áp dụng tại |
| :---- | :---- | :---- | :---- |
| Q-01 | Số lượng thành viên tối đa trong 1 nhóm bảo vệ là bao nhiêu? | Tech Lead | UC-03 BR-06, UC-09 BR-07 |
| Q-02 | Timeout của push notification cảnh báo cần đạt dưới bao nhiêu giây? | Tech Lead | NFR-03 |
| Q-03 | Trưởng nhóm từ chối: thành viên hiển thị trong danh sách ở trạng thái gì? ("Chờ xác nhận" hay ẩn hẳn?) | PM \+ Designer | UC-04 BR-04 |
| Q-04 | Nội dung push notification cảnh báo có hiển thị SĐT lừa đảo không (dù đã che bớt)? | Security Team | UC-05 BR-04 |
| Q-05 | Số suggestion card tối đa hiển thị cùng lúc trong danh sách là bao nhiêu? | Tech Lead \+ Designer | UC-09 BR-07 |
| Q-06 | Thành viên xóa app Tammi sau khi đã gia nhập nhóm bảo vệ → trạng thái trong nhóm thay đổi như thế nào? | Tech Lead | UC-07 |

