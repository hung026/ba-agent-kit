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
| Quản lý thành viên | UC-02 | Thêm thành viên thủ công | Trưởng nhóm | Đã đăng nhập, đang ở tính năng "Bảo vệ Gia đình" | Lời mời được gửi đi. Thành viên được thêm vào nhóm bảo vệ, |
| Quản lý thành viên | UC-03 | Thành viên phản hồi lời mời | Thành viên (có cài app) | Thành viên nhận được lời mời từ trưởng nhóm, đã cài app Tammi | Thành viên gia nhập hoặc từ chối nhóm bảo vệ |
| Cảnh báo | UC-04 | Nhận cảnh báo cuộc gọi lừa đảo | Trưởng nhóm, Hệ thống Lá Chắn Số | Thành viên đang ở trong nhóm bảo vệ, Lá Chắn Số phát hiện cuộc gọi nghi vấn | Trưởng nhóm nhận được push notification cảnh báo |
| Cảnh báo | UC-05 | Xem chi tiết cảnh báo | Trưởng nhóm | Thành viên nhận cuộc gọi lừa đảo | Trưởng nhóm xem được đầy đủ thông tin cuộc gọi lừa đảo |
| Quản lý thành viên | UC-06 | Quản lý danh sách thành viên | Trưởng nhóm | Đã có nhóm với ít nhất 1 thành viên | Danh sách thành viên được xem hoặc cập nhật thành công |
| Quản lý thành viên | UC-07 | Smart Suggestion import thành viên | Trưởng nhóm, Hệ thống | Đã có nhóm bảo vệ, có thành viên từ Nhóm gia đình Tammi đủ điều kiện (nhà mạng Viettel) và chưa có trong nhóm bảo vệ | Thành viên được thêm vào hoặc bị bỏ qua trong gợi ý |

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
| Điều kiện sau – Thành công | Trưởng nhóm đã đồng ý điều khoản; hệ thống đánh dấu onboarding hoàn tất; chuyển sang màn tạo nhóm |
| Điều kiện sau – Thất bại | Trưởng nhóm từ chối điều khoản; hệ thống giữ nguyên tab "Nhóm gia đình" Tammi; onboarding chưa hoàn tất |

#### 2\. Luồng chính (Happy Path)

| Bước | Actor | Hành động / Phản hồi của Hệ thống | BR liên quan |
| :---- | :---- | :---- | :---- |
| 1 | Trưởng nhóm | Nhấn tab "Bảo vệ Gia đình" từ màn hình "Nhóm gia đình" | BR-01 |
| 2 | Hệ thống | Kiểm tra trạng thái onboarding của tài khoản → phát hiện chưa hoàn tất | BR-01 |
| 3 | Hệ thống | Hiển thị màn hình giới thiệu tính năng "Bảo vệ Gia đình" (tên tính năng, lợi ích, cách hoạt động) |  |
| 4 | Trưởng nhóm | Nhấn "Tiếp tục" |  |
| 5 | Hệ thống | Hiển thị màn hình Điều khoản & Chính sách riêng của Lá Chắn Số  | BR-02 |
| 6 | Trưởng nhóm | Đọc và nhấn "Đồng ý" | BR-03 |
| 7 | Hệ thống | Lưu trạng thái đã đồng ý điều khoản (version điều khoản \+ timestamp) → chuyển sang màn tạo nhóm |  |

#### 3\. Luồng thay thế (Alternative Flow)

| ID Luồng | Bước | Mô tả | BR liên quan |
| :---- | :---- | :---- | :---- |
| AF-01 | Bước 6 | Trưởng nhóm nhấn "Từ chối" hoặc đóng màn điều khoản → Hệ thống đóng flow, giữ nguyên tab "Nhóm gia đình" Tammi. Trạng thái onboarding vẫn là chưa hoàn tất. | BR-03 |
| AF-02 | Bước 1 | Trưởng nhóm đã từng hoàn thành onboarding → chuyển thẳng vào màn danh sách thành viên | BR-01 |

#### 4\. Quy tắc Nghiệp vụ (Business Rules)

| Business Rules | Mô tả |
| :---- | :---- |
| BR-01 | Hệ thống kiểm tra trạng thái onboarding theo tài khoản (không phải thiết bị) — đã đồng ý thì không hiện lại |
| BR-02 | Điều khoản Lá Chắn Số là tài liệu riêng biệt, độc lập với điều khoản Tammi |
| BR-03 | Nút "Đồng ý" chỉ được kích hoạt sau khi user select hết nội dung điều khoản bắt buộc |

#### 5\. Luồng Ngoại lệ / Lỗi (Exception / Error Flow)

| ID Luồng | Bước | Lỗi | Xử lý | Cơ chế fallback | BR liên quan |
| :---- | :---- | :---- | :---- | :---- | :---- |
| EF-01 | Bước 2 | Không lấy được trạng thái onboarding do lỗi mạng | Hiển thị màn onboarding bình thường (fail-open: coi như chưa onboard) | Sau khi đồng ý, retry lưu trạng thái | BR-01 |
| EF-02 | Bước 7 | Lỗi khi lưu trạng thái đồng ý | Hiển thị thông báo "Có lỗi xảy ra, vui lòng thử lại" | Không chuyển sang màn tạo nhóm cho đến khi lưu thành công |  |

---

### 4.2 Quản lý thành viên

#### 1\. Use Case UC-02: Thêm thành viên thủ công

| Tiêu đề | Mô tả |
| :---- | :---- |
| ID Use Case | UC-02 |
| Tên Use Case | Thêm thành viên thủ công |
| Mô tả ngắn gọn | Trưởng nhóm thêm thành viên vào nhóm bảo vệ bằng cách nhập số điện thoại  . Chỉ chấp nhận thuê bao nhà mạng Viettel. |
| Actor chính | Trưởng nhóm (A-01) |
| Điều kiện trước | Nhóm bảo vệ đã được tạo; trưởng nhóm đang ở màn danh sách thành viên |
| Kích hoạt (Trigger) | Trưởng nhóm nhấn nút "Thêm thành viên" |
| Điều kiện sau – Thành công | Thành viên được thêm vào nhóm; lời mời được gửi đến thành viên |
| Điều kiện sau – Thất bại | Thành viên không được thêm; hệ thống hiển thị thông báo lỗi cụ thể |

#### 2\. Luồng chính (Happy Path) — Nhập số điện thoại

| Bước | Actor | Hành động / Phản hồi của Hệ thống | BR liên quan |
| :---- | :---- | :---- | :---- |
| 1 | Trưởng nhóm | Nhấn "Thêm thành viên" từ màn hình chính |  |
| 2 | Hệ thống | Hiển thị màn nhập SĐT |  |
| 3 | Trưởng nhóm | Nhập số điện thoại thành viên | BR-01 |
| 4 | Hệ thống | Validate định dạng SĐT | BR-01 |
| 5 | Hệ thống | Kiểm tra thuê bao có thuộc nhà mạng Viettel không | BR-02 |
| 6 | Hệ thống | Kiểm tra thành viên có cài app Tammi không | BR-03 |
| 7 | Hệ thống | Thêm thành viên vào nhóm bảo vệ; gửi lời mời qua push notification nếu có app, hoặc qua SMS nếu không có app | BR-03 |
| 8 | Hệ thống | Hiển thị trạng thái "Chờ xác nhận" ở thành viên đó |  |
| 9 | Hệ thống | Thành viên đồng ý \-\> Hiển thị icon “Protected” ở thành viên đó |  |

#### 3\. Luồng thay thế (Alternative Flow)

| ID Luồng | Bước | Mô tả | BR liên quan |
| :---- | :---- | :---- | :---- |
| AF-01 | Bước 3 | Thành viên đã có trong nhóm bảo vệ → Hệ thống thông báo: "Số điện thoại này đã có trong nhóm bảo vệ của bạn." | BR-04 |

#### 4\. Quy tắc Nghiệp vụ (Business Rules)

| Business Rules | Mô tả |
| :---- | :---- |
| BR-01 | SĐT phải đúng định dạng: 10 chữ số, bắt đầu bằng số 0 |
| BR-02 | Chỉ chấp nhận thuê bao nhà mạng Viettel. |
| BR-03 | Hệ thống tự phân loại thành viên (có app / không có app) — trưởng nhóm không cần chỉ định |
| BR-04 | Không cho phép thêm trùng SĐT đã có trong nhóm bảo vệ |
| BR-05 | Số lượng thành viên tối đa trong nhóm=10 (tính cả trưởng nhóm, tính cả thành viên đang Chờ Xác nhận. Chỉ trừ thành viên Từ Chối) |

#### 5\. Luồng Ngoại lệ / Lỗi (Exception / Error Flow)

| ID Luồng | Bước | Lỗi | Xử lý | Cơ chế fallback | BR liên quan |
| :---- | :---- | :---- | :---- | :---- | :---- |
| EF-01 | Bước 4 | SĐT sai định dạng | Hiển thị inline error: "Số điện thoại không đúng định dạng” | Không cho submit | BR-01 |
| EF-02 | Bước 5 | SĐT không thuộc nhà mạng Viettel | Hiển thị: "Số điện thoại này không thuộc nhà mạng Viettel, không thể thêm vào nhóm bảo vệ." | Không thêm thành viên | BR-02 |
| EF-03 | Bước 5 | API Lá Chắn Số timeout/không phản hồi | Hiển thị: "Không thể xác minh số điện thoại. Vui lòng thử lại." | Retry 1 lần, nếu vẫn lỗi → báo lỗi hệ thống | BR-02 |
| EF-04 | Bước 6-7 | Lỗi thêm thành viên phía server | Hiển thị: "Không thể thêm thành viên. Vui lòng thử lại." | Retry |  |
| EF-05 | Bước 1 | Nhóm đã đạt số lượng thành viên tối đa | Hiển thị: "Nhóm bảo vệ đã đạt giới hạn 10 thành viên." Ẩn nút "Thêm thành viên" | N/A | BR-05 |

---

#### 1\. Use Case UC-03: Thành viên phản hồi lời mời

| Tiêu đề | Mô tả |
| :---- | :---- |
| ID Use Case | UC-03 |
| Tên Use Case | Thành viên phản hồi lời mời |
| Mô tả ngắn gọn | Thành viên đã cài app Tammi nhận push notification hoặc SMS mời tham gia nhóm. Có thể chấp nhận hoặc từ chối gia nhập nhóm bảo vệ |
| Actor chính | Thành viên (có cài app) (A-02) |
| Điều kiện trước | Trưởng nhóm đã thêm SĐT của thành viên (UC-02 hoàn tất); thành viên đã cài app Tammi và đang đăng nhập |
| Kích hoạt (Trigger) | Thành viên nhận được push notification/SMS lời mời hoặc mở tab "Bảo vệ Gia đình" |
| Điều kiện sau – Thành công (Chấp nhận) | Thành viên gia nhập nhóm bảo vệ; hệ thống Lá Chắn Số bắt đầu monitor; thành viên thấy màn danh sách nhóm |
| Điều kiện sau – Thành công (Từ chối) | Thành viên không gia nhập; trưởng nhóm không nhận được cảnh báo về người này |

#### 2\. Luồng chính (Happy Path)

| Bước | Actor | Hành động / Phản hồi của Hệ thống | BR liên quan |
| :---- | :---- | :---- | :---- |
| 1 | Hệ thống | Gửi push notification đến thành viên: "\[Tên trưởng nhóm\] muốn thêm bạn vào nhóm Bảo vệ Gia đình" | BR-01 |
| 2 | Thành viên | Tap vào notification → App mở tại tab "Bảo vệ Gia đình" |  |
| 3 | Hệ thống | Hiển thị popup lời mời: tên trưởng nhóm, mô tả tính năng, 2 CTA: "Đồng ý" và "Từ chối" | BR-02 |
| 4 | Thành viên | Nhấn "Đồng ý" |  |
| 5 | Hệ thống | Xác nhận gia nhập nhóm; kích hoạt Lá Chắn Số monitor cho số điện thoại này; hiển thị màn xác nhận "Chào mừng bạn gia nhập nhóm Bảo vệ Gia đình" | BR-03 |

#### 3\. Luồng thay thế (Alternative Flow)

| ID Luồng | Bước | Mô tả | BR liên quan |
| :---- | :---- | :---- | :---- |
| AF-01 | Bước 4 | Thành viên nhấn "Từ chối" → Hệ thống đóng popup; thành viên không gia nhập nhóm; trưởng nhóm không nhận noti về người này.Màn hình trưởng nhóm sẽ hiện trạng thái thành viên đó là “từ chối | BR-04 |
| AF-02 | Bước 2 | Thành viên không tap notification mà tự mở app → Popup lời mời hiển thị tại tab "Bảo vệ Gia đình" | BR-02 |
| AF-03 | Bước 3 | Thành viên có lời mời từ nhiều nhóm bảo vệ khác nhau → Trong màn hình nhóm: Hiển thị lời mời mới nhấtTrong noti: Hiển thị tất cả lời mời | BR-05 |
| AF-04 | Bước 1 | Thành viên không có app, nhận SMS →  soạn cú pháp tin nhắn để tham gia hoặc từ chối |  |

#### 4\. Quy tắc Nghiệp vụ (Business Rules)

| Business Rules | Mô tả |
| :---- | :---- |
| BR-01 | Push notification và SMS lời mời được gửi ngay khi trưởng nhóm thêm SĐT thành công |
| BR-02 | Popup lời mời hiển thị mỗi lần thành viên vào tab "Bảo vệ Gia đình" cho đến khi phản hồi |
| BR-03 | Một thành viên không thể thuộc nhiều nhóm bảo vệ của các trưởng nhóm khác nhau |
| BR-04 | Thành viên từ chối: trưởng nhóm vẫn thấy tên thành viên trong danh sách nhưng ở trạng thái “Từ chối". Lần tiếp theo vào sẽ biến mất |
| BR-05 | Lời mời hết hạn sau X phút |

#### 5\. Luồng Ngoại lệ / Lỗi (Exception / Error Flow)

| ID Luồng | Bước | Lỗi | Xử lý | Cơ chế fallback | BR liên quan |
| :---- | :---- | :---- | :---- | :---- | :---- |
| EF-01 | Bước 1 | Push notification không đến (tắt quyền thông báo) | Popup lời mời vẫn hiển thị khi thành viên mở tab "Bảo vệ Gia đình" | N/A | BR-02 |
| EF-02 | Bước 5 | Lỗi server khi xác nhận gia nhập | Hiển thị: "Có lỗi xảy ra. Vui lòng thử lại." | Retry; trạng thái chưa gia nhập cho đến khi thành công |  |
| EF-03 |  |  |  |  |  |

---

### 4.3 Cảnh báo

#### 1\. Use Case UC-04: Nhận cảnh báo cuộc gọi lừa đảo

| Tiêu đề | Mô tả |
| :---- | :---- |
| ID Use Case | UC-04 |
| Tên Use Case | Nhận cảnh báo cuộc gọi lừa đảo |
| Mô tả ngắn gọn | Khi Lá Chắn Số phát hiện thành viên trong nhóm có liên hệ với cuộc gọi lừa đảo, hệ thống tự động gửi push notification đến trưởng nhóm |
| Actor chính | Hệ thống Lá Chắn Số (A-04) |
| Actor phụ | Trưởng nhóm (A-01) |
| Điều kiện trước | Thành viên đang ở trong nhóm bảo vệ (với trạng thái active); Lá Chắn Số phát hiện cuộc gọi nghi vấn |
| Kích hoạt (Trigger) | Lá Chắn Số detect thành viên liên hệ với số điện thoại trong danh sách lừa đảo/ hoặc AI đánh giá là lừa đảo  |
| Điều kiện sau – Thành công | Trưởng nhóm nhận được push notification cảnh báo với thông tin cơ bản |
| Điều kiện sau – Thất bại | Push notification không đến được; cảnh báo vẫn được lưu để xem sau trong UC-05 |

#### 2\. Luồng chính (Happy Path)

| Bước | Actor | Hành động / Phản hồi của Hệ thống | BR liên quan |
| :---- | :---- | :---- | :---- |
| 1 | Hệ thống Lá Chắn Số | Phát hiện thành viên có cuộc gọi lừa đảo | BR-01 |
| 2 | Hệ thống Lá Chắn Số | Tạo bản ghi cảnh báo (thành viên, số lừa đảo, thời gian, thời lượng, chiều cuộc gọi) | BR-02 |
| 3 | Hệ thống | Gửi push notification đến trưởng nhóm: "\[Tên thành viên\] vừa nhận/thực hiện cuộc gọi từ số nghi ngờ lừa đảo" | BR-03 |
| 4 | Trưởng nhóm | Nhận push notification trên thiết bị |  |

#### 3\. Luồng thay thế (Alternative Flow)

| ID Luồng | Bước | Mô tả | BR liên quan |
| :---- | :---- | :---- | :---- |
| AF-01 | Bước 1 | Tính năng AI on-device trên app Lá Chắn Số detect được dấu hiệu lừa đảo từ 1 cuộc gọi → Gửi push notification đến trưởng nhóm: "\[Cảnh báo từ AI\] \[Tên thành viên\] vừa nhận cuộc gọi lừa đảo" |  |
| AF-02 | Bước 4 | Thành viên không có app (A-03) → Vẫn gửi noti cho trưởng nhóm |  |

#### 4\. Quy tắc Nghiệp vụ (Business Rules)

| Business Rules | Mô tả |
| :---- | :---- |
| BR-01 | Lá Chắn Số chỉ monitor các thành viên đang ở trạng thái Protected trong nhóm bảo vệ |
| BR-02 | Bản ghi cảnh báo bao gồm: tên thành viên, SĐT lừa đảo, thời gian bắt đầu, thời lượng cuộc gọi, chiều cuộc gọi (gọi đến / gọi đi) |
| BR-03 | Notification được gửi real-time. Latency từ khi nhận cuộc gọi tối đa 10s |
| BR-04 | Nếu không có tên thành viên, hiện số điện thoại |

#### 5\. Luồng Ngoại lệ / Lỗi (Exception / Error Flow)

| ID Luồng | Bước | Lỗi | Xử lý | Cơ chế fallback | BR liên quan |
| :---- | :---- | :---- | :---- | :---- | :---- |
| EF-01 | Bước 3 | Push notification thất bại (thiết bị trưởng nhóm offline / tắt noti) | Lưu bản ghi cảnh báo; hiển thị badge đỏ trên icon tab "Bảo vệ Gia đình" khi trưởng nhóm mở lại app | Trưởng nhóm xem lại qua UC-05 | BR-03 |
| EF-02 | Bước 2 | Lỗi lưu bản ghi cảnh báo phía Lá Chắn Số | Retry lưu; nếu thất bại → log lỗi phía backend, không gửi noti |  |  |

---

#### 1\. Use Case UC-05: Xem chi tiết cảnh báo

| Tiêu đề | Mô tả |
| :---- | :---- |
| ID Use Case | UC-05 |
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
| 4 | Trưởng nhóm | Xem thông tin chi tiết  |  |

#### 3\. Luồng thay thế (Alternative Flow)

| ID Luồng | Bước | Mô tả | BR liên quan |
| :---- | :---- | :---- | :---- |
| AF-01 | Bước 1 | Trưởng nhóm mở app thủ công → Vào tab "Bảo vệ Gia đình" → Hiện danh sách màn hình thành viên →  Nhấn vào 1 thành viên để xem danh sách lịch sử cảnh báo của thành viên đó → Chọn 1 item để xem chi tiết |  |
| AF-02 | Bước 2 | Trưởng nhóm chưa đăng nhập Tammi → App mở màn đăng nhập → Sau khi đăng nhập thành công → Navigate đến màn chi tiết cảnh báo | BR-01 |

#### 4\. Quy tắc Nghiệp vụ (Business Rules)

| Business Rules | Mô tả |
| :---- | :---- |
| BR-01 | Deep link từ push notification phải hoạt động kể cả khi app đang đóng hoàn toàn (cold start) |
| BR-02 | 1.Với cuộc gọi viễn thông, hiển thị chi tiết: \-Người gọi, người nhận \-Loại cuộc gọi(gọi đến, gọi đi) \-thời lượng \-Nhãn của số điện thoại \-Nội dung nhận định, khuyến nghị 2.Với cuộc gọi do AI detect, hiển thị chi tiết: \-Người gọi, người nhận \-Loại cuộc gọi(gọi đến, gọi đi) \-thời lượng \-Nhãn của số điện thoại \-Nhãn của AI phát hiện \-Dấu hiệu trong cuộc gọi do AI phát hiện \-Khuyến nghị của AI  |

#### 5\. Luồng Ngoại lệ / Lỗi (Exception / Error Flow)

| ID Luồng | Bước | Lỗi | Xử lý | Cơ chế fallback | BR liên quan |
| :---- | :---- | :---- | :---- | :---- | :---- |
| EF-01 | Bước 3 | Không load được chi tiết cảnh báo (lỗi mạng / server) | Hiển thị: "Đã có lỗi xảy ra. Vui lòng thử lại” | Giữ nguyên màn hình, không auto-navigate |  |

---

#### 1\. Use Case UC-06: Quản lý danh sách thành viên

| Tiêu đề | Mô tả |
| :---- | :---- |
| ID Use Case | UC-06 |
| Tên Use Case | Quản lý danh sách thành viên |
| Mô tả ngắn gọn | Trưởng nhóm xem danh sách thành viên trong nhóm bảo vệ và xóa thành viên khi cần |
| Actor chính | Trưởng nhóm (A-01) |
| Điều kiện trước | Đã có nhóm bảo vệ |
| Kích hoạt (Trigger) | Trưởng nhóm vào tab "Bảo vệ Gia đình" (các lần sau lần đầu) |
| Điều kiện sau – Thành công (Xem) | Danh sách thành viên hiển thị đầy đủ và chính xác |
| Điều kiện sau – Thành công (Xóa) | Thành viên bị xóa khỏi nhóm; hệ thống ngừng gửi noti về người đó |

#### 2\. Luồng chính (Happy Path)

| Bước | Actor | Hành động / Phản hồi của Hệ thống | BR liên quan |
| :---- | :---- | :---- | :---- |
| 1 | Trưởng nhóm | Vào tab "Bảo vệ Gia đình" | BR-01 |
| 2 | Hệ thống | Load và hiển thị danh sách thành viên; mỗi thành viên hiển thị: tên, SĐT, trạng thái (Protected / Chờ xác nhận/ Từ chối) | BR-01, BR-02 |
| 3 | Trưởng nhóm | Nhấn giữ hoặc vuốt vào thành viên muốn xóa |  |
| 4 | Hệ thống | Hiển thị confirmation dialog: "Bạn có chắc muốn xóa \[Tên\] khỏi nhóm?" với 2 nút: "Xóa" và "Hủy" | BR-03 |
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
| BR-02 | SĐT hiển thị dạng đầy đủ. Đầu 0 |
| BR-03 | Luôn có bước xác nhận trước khi xóa thành viên — không cho phép xóa trực tiếp 1 chạm |
| BR-04 | Xóa khỏi nhóm bảo vệ không ảnh hưởng đến "Nhóm gia đình" Tammi (2 module độc lập) |
| BR-05 | Thành viên rời nhóm Tammi không tự động bị xóa khỏi nhóm bảo vệ |

#### 5\. Luồng Ngoại lệ / Lỗi (Exception / Error Flow)

| ID Luồng | Bước | Lỗi | Xử lý | Cơ chế fallback | BR liên quan |
| :---- | :---- | :---- | :---- | :---- | :---- |
| EF-01 | Bước 2 | Lỗi load danh sách (mạng / server) | Hiển thị: "Không thể tải danh sách. Vui lòng thử lại." \+ nút Retry | Hiển thị danh sách cache nếu có |  |
| EF-02 | Bước 6 | Lỗi xóa thành viên phía server | Hiển thị: "Không thể xóa thành viên. Vui lòng thử lại." | Giữ nguyên danh sách, không xóa local |  |

---

### 4.4 Smart Suggestion

#### 1\. Use Case UC-07: Smart Suggestion import thành viên

| Tiêu đề | Mô tả |
| :---- | :---- |
| ID Use Case | UC-07 |
| Tên Use Case | Smart Suggestion import thành viên |
| Mô tả ngắn gọn | Hệ thống chủ động gợi ý trưởng nhóm thêm các thành viên đủ điều kiện từ Nhóm gia đình Tammi vào nhóm bảo vệ, thay vì yêu cầu nhập tay |
| Actor chính | Trưởng nhóm (A-01) |
| Actor phụ | Hệ thống |
| Điều kiện trước | Nhóm bảo vệ đã tạo; có thành viên trong Nhóm gia đình Tammi thuộc nhà mạng Viettel và chưa có trong nhóm bảo vệ và chưa từng bị bỏ qua |
| Kích hoạt (Trigger) | (1) Ngay sau khi onboard xong ; hoặc (2) Thành viên mới được thêm vào Nhóm gia đình Tammi đủ điều kiện → hiển thị trong lần truy cập tiếp theo |
| Điều kiện sau – Thành công (Thêm) | Thành viên được thêm vào nhóm bảo vệ; lời mời gửi đi |
| Điều kiện sau – Thành công (Bỏ qua) | Card ẩn; thành viên đó không hiện lại trong suggestion |

#### 2\. Luồng chính (Happy Path) — Một thành viên eligible

| Bước | Actor | Hành động / Phản hồi của Hệ thống | BR liên quan |
| :---- | :---- | :---- | :---- |
| 1 | Hệ thống | Kiểm tra danh sách Nhóm gia đình Tammi → Lọc thành viên đủ điều kiện | BR-01, BR-02, BR-03 |
| 2 | Hệ thống | Hiển thị suggestion card ở đầu danh sách: "\[Tên\] (\[SĐT\]) đang trong Nhóm gia đình của bạn. Bạn có muốn thêm người này?" với 2 nút: "Thêm" và "Bỏ qua" | BR-04 |
| 3 | Trưởng nhóm | Nhấn "Thêm" |  |
| 4 | Hệ thống | Thêm thành viên vào nhóm bảo vệ (tương đương UC-02 từ bước 6); ẩn suggestion card | BR-05 |

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
| BR-03 | Không gợi ý thành viên đã từng bị bỏ qua  |
| BR-04 | Suggestion card luôn xuất hiện ở đầu danh sách thành viên, phía trên các thành viên hiện tại |
| BR-05 | "Thêm" qua suggestion tương đương thêm thủ công |
| BR-06 | Bỏ qua: dữ liệu "đã bỏ qua" lưu theo cặp \[trưởng nhóm \+ SĐT thành viên\] |
| BR-07 | Giới hạn số suggestion card hiển thị cùng lúc: **2** |

#### 5\. Luồng Ngoại lệ / Lỗi (Exception / Error Flow)

| ID Luồng | Bước | Lỗi | Xử lý | Cơ chế fallback | BR liên quan |
| :---- | :---- | :---- | :---- | :---- | :---- |
| EF-01 | Bước 1 | Không đọc được danh sách Nhóm gia đình Tammi | Không hiển thị suggestion card, không show lỗi | Retry lần sau khi trưởng nhóm mở app |  |
| EF-02 | Bước 4 | Lỗi thêm thành viên từ suggestion | Hiển thị: "Không thể thêm. Vui lòng thử lại." | Card vẫn giữ nguyên để trưởng nhóm thử lại |  |

---

### Use Case UC-08: Xóa nhóm bảo vệ

#### 1. Tổng quan

| Tiêu đề | Mô tả |
| :---- | :---- |
| ID Use Case | UC-08 |
| Tên Use Case | Xóa nhóm bảo vệ |
| Mô tả ngắn gọn | Trưởng nhóm giải tán toàn bộ nhóm "Bảo vệ Gia đình", xóa tất cả thành viên khỏi nhóm và yêu cầu Lá Chắn Số ngừng monitor cho toàn bộ thành viên trong nhóm |
| Actor chính | Trưởng nhóm (A-01) |
| Điều kiện trước | Trưởng nhóm đã đăng nhập Tammi; đã có nhóm bảo vệ (onboarding đã hoàn tất) |
| Kích hoạt (Trigger) | Trưởng nhóm nhấn chức năng "Xóa nhóm" từ màn hình quản lý nhóm |
| Điều kiện sau – Thành công | Nhóm bị giải tán; toàn bộ thành viên bị xóa khỏi nhóm; Lá Chắn Số ngừng monitor tất cả thành viên; trưởng nhóm quay về màn empty state của tab "Bảo vệ Gia đình" |
| Điều kiện sau – Thất bại | Nhóm không bị xóa; hệ thống hiển thị thông báo lỗi; mọi thứ giữ nguyên |

#### 2. Luồng chính (Happy Path)

| Bước | Actor | Hành động / Phản hồi của Hệ thống | BR liên quan |
| :---- | :---- | :---- | :---- |
| 1 | Trưởng nhóm | Nhấn vào menu/option "Xóa nhóm" từ màn hình quản lý nhóm | BR-01 |
| 2 | Hệ thống | Hiển thị confirmation dialog cấp 1: "Bạn có chắc muốn xóa nhóm Bảo vệ Gia đình? Toàn bộ thành viên sẽ bị xóa khỏi nhóm và hệ thống sẽ ngừng bảo vệ họ." với 2 nút: "Xóa nhóm" và "Hủy" | BR-02 |
| 3 | Trưởng nhóm | Nhấn "Xóa nhóm" | |
| 4 | Hệ thống | Hiển thị confirmation dialog cấp 2: "Hành động này không thể hoàn tác. Xác nhận xóa nhóm?" với 2 nút: "Xác nhận xóa" và "Hủy" | BR-02 |
| 5 | Trưởng nhóm | Nhấn "Xác nhận xóa" | |
| 6 | Hệ thống | Gọi API Lá Chắn Số ngừng monitor toàn bộ thành viên trong nhóm | BR-03 |
| 7 | Hệ thống | Xóa toàn bộ dữ liệu nhóm (danh sách thành viên, trạng thái lời mời) | BR-04 |
| 8 | Hệ thống | Gửi push notification đến tất cả thành viên có cài app (trạng thái Protected): "[Tên trưởng nhóm] đã xóa nhóm Bảo vệ Gia đình. Bạn không còn được bảo vệ bởi nhóm này." | BR-05 |
| 9 | Hệ thống | Huỷ tất cả lời mời đang ở trạng thái "Chờ xác nhận" | BR-06 |
| 10 | Hệ thống | Chuyển trưởng nhóm về màn empty state tab "Bảo vệ Gia đình" với CTA "Tạo nhóm mới" | BR-07 |

#### 3. Luồng thay thế (Alternative Flow)

| ID Luồng | Bước | Mô tả | BR liên quan |
| :---- | :---- | :---- | :---- |
| AF-01 | Bước 3 | Trưởng nhóm nhấn "Hủy" ở dialog cấp 1 → Đóng dialog, không có thay đổi | |
| AF-02 | Bước 5 | Trưởng nhóm nhấn "Hủy" ở dialog cấp 2 → Đóng dialog, không có thay đổi | |
| AF-03 | Bước 10 | Trưởng nhóm nhấn "Tạo nhóm mới" → Hệ thống chuyển sang flow tạo nhóm (không cần onboarding lại vì đã đồng ý điều khoản, tham chiếu UC-01 BR-01) | BR-07 |

#### 4. Quy tắc Nghiệp vụ (Business Rules)

| Business Rules | Mô tả |
| :---- | :---- |
| BR-01 | Chỉ trưởng nhóm (A-01) mới thấy và sử dụng được chức năng "Xóa nhóm". Thành viên không thấy option này |
| BR-02 | Xóa nhóm yêu cầu xác nhận 2 bước (double confirmation) vì là hành động không thể hoàn tác |
| BR-03 | Hệ thống gọi API Lá Chắn Số ngừng monitor **trước** khi xóa dữ liệu nhóm phía Tammi — đảm bảo không còn monitor "mồ côi" |
| BR-04 | Xóa nhóm bảo vệ không ảnh hưởng đến "Nhóm gia đình" Tammi (2 module độc lập — tham chiếu NFR-04 tài liệu gốc) |
| BR-05 | Chỉ gửi push notification cho thành viên có cài app và ở trạng thái "Protected". Thành viên không có app (A-03) và thành viên ở trạng thái "Từ chối" không nhận notification |
| BR-06 | Tất cả lời mời ở trạng thái "Chờ xác nhận" bị huỷ ngay khi nhóm bị xóa. Nếu thành viên mở app sau đó, popup lời mời không còn hiển thị |
| BR-07 | Sau khi xóa nhóm, trưởng nhóm có thể tạo nhóm mới mà không cần onboarding lại (trạng thái đã đồng ý điều khoản Lá Chắn Số vẫn được giữ) |
| BR-08 | Lịch sử cảnh báo (bản ghi từ UC-04, UC-05) bị xóa cùng nhóm — trưởng nhóm không thể xem lại sau khi nhóm đã bị giải tán |

#### 5. Luồng Ngoại lệ / Lỗi (Exception / Error Flow)

| ID Luồng | Bước | Lỗi | Xử lý | Cơ chế fallback | BR liên quan |
| :---- | :---- | :---- | :---- | :---- | :---- |
| EF-01 | Bước 6 | API Lá Chắn Số timeout / không phản hồi khi ngừng monitor | Hiển thị: "Không thể xóa nhóm lúc này. Vui lòng thử lại." | Retry 1 lần tự động; nếu vẫn lỗi → báo lỗi, giữ nguyên nhóm | BR-03 |
| EF-02 | Bước 7 | Lỗi xóa dữ liệu nhóm phía server Tammi | Hiển thị: "Có lỗi xảy ra. Vui lòng thử lại." | Rollback: gọi API Lá Chắn Số bật lại monitor cho các thành viên đã bị ngừng ở bước 6 | BR-03 |
| EF-03 | Bước 8 | Push notification gửi thất bại (1 hoặc nhiều thành viên) | Không block flow xóa nhóm. Log lỗi gửi notification phía backend | Thành viên sẽ thấy trạng thái nhóm đã bị xóa khi mở app | BR-05 |

---

### Use Case UC-09: Rời nhóm bảo vệ

#### 1. Tổng quan

| Tiêu đề | Mô tả |
| :---- | :---- |
| ID Use Case | UC-09 |
| Tên Use Case | Rời nhóm bảo vệ |
| Mô tả ngắn gọn | Thành viên đã gia nhập nhóm bảo vệ (trạng thái "Protected") tự rời khỏi nhóm mà không cần trưởng nhóm thao tác. Hệ thống ngừng Lá Chắn Số monitor cho thành viên đó |
| Actor chính | Thành viên có cài app (A-02) |
| Điều kiện trước | Thành viên đã gia nhập nhóm bảo vệ và đang ở trạng thái "Protected" |
| Kích hoạt (Trigger) | Thành viên nhấn chức năng "Rời nhóm" từ màn hình nhóm bảo vệ |
| Điều kiện sau – Thành công | Thành viên rời khỏi nhóm; Lá Chắn Số ngừng monitor cho thành viên đó; trưởng nhóm được thông báo |
| Điều kiện sau – Thất bại | Thành viên vẫn ở trong nhóm; hệ thống hiển thị thông báo lỗi |

#### 2. Luồng chính (Happy Path)

| Bước | Actor | Hành động / Phản hồi của Hệ thống | BR liên quan |
| :---- | :---- | :---- | :---- |
| 1 | Thành viên | Nhấn vào menu/option "Rời nhóm" từ màn hình nhóm bảo vệ | BR-01 |
| 2 | Hệ thống | Hiển thị confirmation dialog: "Bạn có chắc muốn rời nhóm Bảo vệ Gia đình của [Tên trưởng nhóm]? Bạn sẽ không còn được bảo vệ trước cuộc gọi lừa đảo." với 2 nút: "Rời nhóm" và "Hủy" | BR-02 |
| 3 | Thành viên | Nhấn "Rời nhóm" | |
| 4 | Hệ thống | Gọi API Lá Chắn Số ngừng monitor cho số điện thoại thành viên | BR-03 |
| 5 | Hệ thống | Xóa thành viên khỏi danh sách nhóm bảo vệ | BR-04 |
| 6 | Hệ thống | Gửi push notification đến trưởng nhóm: "[Tên thành viên] đã rời khỏi nhóm Bảo vệ Gia đình" | BR-05 |
| 7 | Hệ thống | Hiển thị màn xác nhận cho thành viên: "Bạn đã rời nhóm thành công." → Chuyển thành viên về màn empty state tab "Bảo vệ Gia đình" | BR-06 |

#### 3. Luồng thay thế (Alternative Flow)

| ID Luồng | Bước | Mô tả | BR liên quan |
| :---- | :---- | :---- | :---- |
| AF-01 | Bước 3 | Thành viên nhấn "Hủy" → Đóng dialog, không có thay đổi | |
| AF-02 | Bước 7 | Thành viên rời nhóm và đang có lời mời từ nhóm bảo vệ khác → Hiển thị popup lời mời của nhóm khác (tham chiếu UC-03 AF-03) | |
| AF-03 | Bước 6 | Thành viên cuối cùng rời nhóm → Nhóm vẫn tồn tại, chỉ còn trưởng nhóm. Trưởng nhóm nhận notification và thấy danh sách trống với CTA "Thêm thành viên ngay" (tham chiếu UC-06 AF-01) | BR-07 |

#### 4. Quy tắc Nghiệp vụ (Business Rules)

| Business Rules | Mô tả |
| :---- | :---- |
| BR-01 | Chỉ thành viên có cài app (A-02) với trạng thái "Protected" mới thấy và sử dụng được chức năng "Rời nhóm". Trưởng nhóm (A-01) không có option "Rời nhóm" — trưởng nhóm chỉ có thể "Xóa nhóm" (UC-08) |
| BR-02 | Rời nhóm yêu cầu xác nhận 1 bước. Dialog phải nêu rõ hậu quả: ngừng bảo vệ trước cuộc gọi lừa đảo |
| BR-03 | Hệ thống gọi API Lá Chắn Số ngừng monitor **trước** khi xóa thành viên khỏi danh sách nhóm |
| BR-04 | Rời nhóm bảo vệ không ảnh hưởng đến "Nhóm gia đình" Tammi (2 module độc lập — tham chiếu NFR-04 tài liệu gốc) |
| BR-05 | Trưởng nhóm nhận push notification ngay khi thành viên rời nhóm. Nếu trưởng nhóm đang mở app → cập nhật danh sách real-time (xóa thành viên khỏi danh sách) |
| BR-06 | Sau khi rời nhóm, thành viên quay về empty state tab "Bảo vệ Gia đình". Nếu được trưởng nhóm thêm lại (UC-02), thành viên sẽ nhận lời mời mới như lần đầu (UC-03) |
| BR-07 | Khi thành viên cuối cùng rời nhóm, nhóm không tự động bị giải tán — nhóm vẫn tồn tại chỉ với trưởng nhóm |
| BR-08 | Lịch sử cảnh báo liên quan đến thành viên đã rời nhóm vẫn được giữ lại cho trưởng nhóm xem (bản ghi từ UC-04, UC-05 không bị xóa) |

#### 5. Luồng Ngoại lệ / Lỗi (Exception / Error Flow)

| ID Luồng | Bước | Lỗi | Xử lý | Cơ chế fallback | BR liên quan |
| :---- | :---- | :---- | :---- | :---- | :---- |
| EF-01 | Bước 4 | API Lá Chắn Số timeout / không phản hồi | Hiển thị: "Không thể rời nhóm lúc này. Vui lòng thử lại." | Retry 1 lần tự động; nếu vẫn lỗi → báo lỗi, giữ nguyên trạng thái thành viên | BR-03 |
| EF-02 | Bước 5 | Lỗi xóa thành viên phía server Tammi | Hiển thị: "Có lỗi xảy ra. Vui lòng thử lại." | Rollback: gọi API Lá Chắn Số bật lại monitor | BR-03 |
| EF-03 | Bước 6 | Push notification gửi đến trưởng nhóm thất bại | Không block flow rời nhóm. Log lỗi phía backend | Trưởng nhóm thấy danh sách đã cập nhật khi mở app | BR-05 |

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