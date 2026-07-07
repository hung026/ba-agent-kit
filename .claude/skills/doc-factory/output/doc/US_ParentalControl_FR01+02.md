# Parental Control — FR-01 Pairing & FR-02 Anti-Tamper — Đặc tả User Story

---

## 2. User Story List

### APP PARENTS

| User Story ID | User Story | Actor | Điều kiện trước | Điều kiện sau |
|---|---|---|---|---|
| US-01-P | Xem onboarding giới thiệu Parental Control | Phụ huynh | Mở App Parents lần đầu | Hiểu tổng quan, sẵn sàng thiết lập |
| US-02-P | Đăng nhập bằng SĐT + OTP | Phụ huynh | Có SĐT nhận được SMS | Đã đăng nhập, có session hợp lệ |
| US-03-P | Cấp quyền notification | Phụ huynh | US-02-P hoàn tất | Quyền notification đã cấp / từ chối |
| US-04-P | Tạo mã / QR ghép nối thiết bị con | Phụ huynh | US-03-P hoàn tất | Mỗi hồ sơ con có 1 QR + mã gắn sẵn (không hết hạn) |
| US-05-P | Xác nhận thiết bị con đã ghép nối | Phụ huynh | US-04-P, máy con đã quét/nhập mã | Thiết bị hiển thị "đã ghép nối" trong app |
| US-06-P | Xử lý thiết bị đã pair tài khoản khác (conflict) | Phụ huynh | Máy con đang được quản lý bởi account khác | Pair bị chặn hoặc chuyển quyền có kiểm soát |
| US-07-P | Hủy ghép nối để cho phép gỡ App Kid | Phụ huynh | Thiết bị đang được quản lý | Bỏ quản lý, App Kid uninstall được |
| US-08-P | Xem log hành vi gỡ ứng dụng | Phụ huynh | Có thiết bị đã pair | Xem được lịch sử hành vi gỡ/lách |
| US-09-P | Nhận cảnh báo khi phát hiện tamper | Phụ huynh | Quyền notification đã cấp, thiết bị pair | Nhận push khi con có dấu hiệu lách |

### APP KID

| User Story ID | User Story | Actor | Điều kiện trước | Điều kiện sau |
|---|---|---|---|---|
| US-01-K | Xem onboarding + tổng quan quyền cần cấp | Người cài máy con | App Kid đã cài | Nắm được các quyền sắp cấp |
| US-02-K | Cấp chuỗi quyền cốt lõi (Android) | Người cài máy con | US-01-K, thiết bị Android | Đủ quyền nền tảng để kiểm soát |
| US-03-K | Cài CA Certificate (Android) | Người cài máy con | US-02-K, thiết bị Android | CA đã cài, có thể lọc HTTPS |
| US-04-K | Cài & enroll MDM Profile (iOS) | Người cài máy con | US-01-K, thiết bị iOS | MDM enrolled |
| US-05-K | Permission gate — chặn hoàn tất nếu thiếu quyền | App Kid | US-02-K / US-03-K / US-04-K | Chỉ cho pair khi đủ điều kiện |
| US-06-K | Hoàn tất ghép nối (Quét QR ) | Người cài máy con | US-05-K pass, có mã từ US-04-P | Máy con liên kết tài khoản phụ huynh |
| US-07-K | Chống gỡ App Kid | App Kid (System) | Đã pair, Device Admin/MDM active | Ngăn/cảnh báo khi bị gỡ |
| US-08-K | Chống đổi giờ / múi giờ hệ thống | App Kid (System) | Đã pair | Rule thời gian không bị lách qua đổi giờ |
| US-09-K | Chống tắt/gỡ VPN - MDM - CA | App Kid (System) | Đã pair, lớp lọc đang chạy | Phát hiện/khôi phục khi lọc bị vô hiệu |
| US-10-K | Chống tắt Accessibility / force-stop | App Kid (System) | Đã pair, service đang chạy | Phát hiện/khởi động lại + cảnh báo |
| US-11-K | Phát hiện safe mode / factory reset | App Kid (System) | Đã pair | Phát hiện & cảnh báo nỗ lực bỏ quản lý |

---

## 3. Chi tiết User Story

### 3.1 FR-01 Pairing — APP PARENTS

---

#### US-01-P: Xem onboarding giới thiệu Parental Control

1. **US statement**
**As a** phụ huynh
**I want** xem màn hình giới thiệu tính năng Parental Control trước khi thiết lập
**So that** tôi hiểu sản phẩm làm được gì và quyết định có dùng hay không

2. **Dependencies**: Không có

3. **Acceptance Criteria**:
```
AC1: Hiển thị onboarding lần đầu
GIVEN tôi mở App Parents lần đầu (chưa từng thiết lập)
WHEN vào mục Parental Control
THEN hệ thống hiển thị onboarding tối thiểu 3 điểm nổi bật: kiểm soát app, lọc web, theo dõi thời gian màn hình
AND có nút "Bắt đầu" và "Bỏ qua"

AC2: Bỏ qua
GIVEN tôi đang ở onboarding
WHEN bấm "Bỏ qua"
THEN quay về màn hình chính, không kích hoạt Parental Control

AC3: Không lặp lại
GIVEN tôi đã xem onboarding ít nhất 1 lần (bấm "Bắt đầu" hoặc "Bỏ qua")
WHEN quay lại mục Parental Control
THEN dẫn thẳng vào màn hình quản lý, không hiển thị lại onboarding
```

4. **Exception & Edge Cases**:

| Scenario | Cách xử lý | Cơ chế Fallback |
|:---|:---|:---|
| Force-close giữa lúc xem onboarding | Trạng thái "đã xem" chỉ lưu khi bấm "Bắt đầu"/"Bỏ qua" | Hiển thị lại onboarding lần mở kế tiếp |

5. **Technical Context & NFR**:
- Trạng thái "đã xem onboarding" lưu ở client (local flag) + đồng bộ theo account.
- Initial state: nếu chưa từng thiết lập → onboarding; nếu đã có thiết bị pair → vào dashboard.

---

#### US-02-P: Đăng nhập bằng SĐT + OTP 

1. **US statement**
**As a** phụ huynh
**I want** đăng nhập bằng số điện thoại và mã OTP gửi qua SMS
**So that** tôi truy cập được tài khoản mà không cần nhớ mật khẩu (login = signup nếu SĐT chưa có tài khoản)

2. **Dependencies**: Không có

3. **Acceptance Criteria**:
```
AC1: Nhập SĐT hợp lệ
GIVEN tôi ở màn hình đăng nhập
WHEN nhập SĐT đúng định dạng (đầu số VN hợp lệ) và bấm "Tiếp tục"
THEN hệ thống gửi OTP qua SMS và chuyển sang màn nhập OTP

AC2: OTP đúng
GIVEN tôi đã nhận OTP
WHEN nhập đúng mã còn hiệu lực
THEN đăng nhập thành công (tạo session); nếu SĐT chưa có tài khoản thì tự tạo tài khoản mới rồi đăng nhập

AC3: OTP sai
GIVEN tôi ở màn nhập OTP
WHEN nhập sai mã
THEN hiển thị lỗi "Mã OTP không đúng" và cho nhập lại
AND sau 5 lần sai liên tiếp → khóa nhập OTP 30 phút   ← Theo rule LCS

AC4: Gửi lại OTP
GIVEN tôi chưa nhận được OTP
WHEN bấm "Gửi lại" sau khi hết đếm ngược 60 giây   ← Theo rule LCS
THEN hệ thống gửi OTP mới và reset hiệu lực

AC5: OTP hết hạn
GIVEN OTP đã quá thời gian hiệu lực 5 phút   ← Theo rule LCS
WHEN tôi nhập mã đó
THEN hiển thị "Mã đã hết hạn, vui lòng gửi lại"
```

4. **Exception & Edge Cases**:

| Scenario | Cách xử lý | Cơ chế Fallback |
|:---|:---|:---|
| SMS không tới (nhà mạng trễ) | Cho gửi lại sau đếm ngược; thử kênh SMS dự phòng | Hiển thị "Chưa nhận được? Kiểm tra sóng / Gửi lại" |
| SĐT sai định dạng | Validate client + server (regex đầu số VN) | Lỗi inline "SĐT không hợp lệ", vô hiệu nút "Tiếp tục" |
| Spam gửi OTP | Rate limit: tối đa 5 SMS / SĐT / giờ   ← Theo rule LCS | Trả 429, hiển thị "Thử lại sau X phút" |
| Mất mạng khi xác thực | Retry 3 lần, hiển thị toast mất kết nối | Giữ SĐT đã nhập, không bắt nhập lại |

5. **Technical Context & NFR**:
- ⚠ SĐT, OTP là dữ liệu nhạy cảm → mã hóa khi truyền, không log OTP dạng plaintext.
- OTP: 6 chữ số  
- Không có bước đăng ký riêng — backend tự tạo account nếu SĐT chưa tồn tại.

---

#### US-03-P: Cấp quyền notification

1. **US statement**
**As a** phụ huynh
**I want** được giải thích rõ rồi cấp quyền nhận thông báo
**So that** tôi nhận được cảnh báo khi con bị chặn web/app, thiết bị offline, hành vi lách (tamper)

2. **Dependencies**: US-02-P

3. **Acceptance Criteria**:
```
AC1: Hiển thị lý do trước khi xin quyền (priming)
GIVEN tôi vừa đăng nhập lần đầu
WHEN tới bước cấp quyền
THEN hiển thị màn giải thích "Vì sao cần thông báo" trước khi bật dialog hệ thống

AC2: Cấp quyền
GIVEN tôi ở dialog quyền hệ thống
WHEN bấm "Cho phép"
THEN quyền notification được cấp, tiếp tục luồng thiết lập

AC3: Từ chối quyền
GIVEN tôi bấm "Không cho phép"
THEN vẫn cho tiếp tục thiết lập
AND lần sau có popup Hướng dẫn bật thủ công Settings (app tự custom, ,không phải của hệ điều hành)
```

4. **Technical Context & NFR**:
- Android 13+ cần khai báo `POST_NOTIFICATIONS`; iOS dùng `UNUserNotificationCenter`.

---

#### US-04-P: Tạo mã / QR ghép nối thiết bị con

1. **US statement**
**As a** phụ huynh
**I want** mỗi hồ sơ con khi tạo ra được gắn sẵn 1 mã / QR ghép nối riêng
**So that** tôi dùng đúng mã đó để liên kết máy con vào hồ sơ tương ứng

2. **Dependencies**: US-03-P; gắn với luồng "Tạo hồ sơ trẻ" (FR-03)

3. **Acceptance Criteria**:
```
AC1: Gen mã khi tạo hồ sơ con
GIVEN tôi tạo hồ sơ trẻ (Tên + giới tính + sinh nhật + SĐT; tên bắt buộc)
WHEN lưu hồ sơ thành công
THEN hệ thống sinh kèm 1 mã ghép nối DUY NHẤT cho hồ sơ đó: QR code + mã 6 chữ số tương ứng
AND mã KHÔNG có thời hạn — hiển thị cố định tại màn hình hồ sơ cho tới khi được dùng

AC2: Mã gắn 1-1 với hồ sơ, dùng lại được tới khi pair
GIVEN hồ sơ con chưa pair thiết bị nào
WHEN tôi mở lại hồ sơ ở bất kỳ thời điểm nào
THEN vẫn thấy đúng mã/QR cũ (không đổi, không hết hạn), pair được bất cứ lúc nào

AC3: Single-use + ràng buộc 1 hồ sơ ↔ 1 thiết bị
GIVEN một máy con đã pair thành công bằng mã của hồ sơ này
WHEN có thiết bị khác quét/nhập lại cùng mã
THEN hệ thống từ chối, báo "Hồ sơ này đã có thiết bị" (1 hồ sơ chỉ gắn 1 máy con)

AC4: Tạo lại mã (đổi máy / pair lại)
GIVEN tôi cần pair máy con khác cho hồ sơ này (đổi máy, mất máy, pair nhầm)
WHEN tôi bấm "Tạo mã mới"
THEN mã cũ bị hủy; thiết bị đang gắn (nếu có) bị gỡ liên kết; sinh mã mới cho hồ sơ
```

4. **Exception & Edge Cases**:

| Scenario | Cách xử lý | Cơ chế Fallback |
|:---|:---|:---|
| Mất mạng khi tạo hồ sơ/mã | Không sinh được mã | Hiển thị lỗi + "Thử lại"; hồ sơ chỉ lưu khi sinh mã thành công |
| Vượt giới hạn số thiết bị / hồ sơ | Chặn tạo hồ sơ mới | Thông báo "Đã đạt số thiết bị tối đa" — hạn mức: TBD, cần PM xác nhận |
| Mã bị lộ / quét nhầm trước khi máy con thật pair | **Rủi ro được chấp nhận** (quyết định sản phẩm — không dùng expiry) | Phụ huynh bấm "Tạo mã mới" → hủy bind sai, cấp lại mã |

5. **Technical Context & NFR**:
- QR chứa pairing-token gắn với `profile-id`; **không nhúng thời hạn**, không nhúng thông tin nhạy cảm thô.
- Mã 6 số là biểu diễn rút gọn của cùng pairing-token để nhập tay.
- Bảo vệ dựa trên **single-use + ràng buộc 1 hồ sơ ↔ 1 thiết bị**, enforce ở **server** (chỉ nhận 1 request ghép nối thành công cho mỗi hồ sơ).
- **Quyết định sản phẩm:** bỏ cơ chế hết hạn mã. Rủi ro lộ mã / pair nhầm trước lần pair đầu được chấp nhận; khắc phục bằng "Tạo mã mới" (hủy bind cũ, cấp mã mới).

---

#### US-05-P: Xác nhận thiết bị con đã ghép nối

1. **US statement**
**As a** phụ huynh
**I want** thấy xác nhận realtime khi máy con ghép nối xong
**So that** tôi biết thiết bị đã được quản lý và rule bắt đầu áp dụng

2. **Dependencies**: US-04-P; máy con thực hiện US-06-K

3. **Acceptance Criteria**:
```
AC1: Xác nhận thành công
GIVEN tôi đang ở màn hình hiển thị QR/mã
WHEN máy con quét/nhập mã và pair thành công
THEN App Parents tự cập nhật trạng thái và chuyển sang màn Dashboard trong vòng [3] giây
AND thiết bị xuất hiện trong danh sách của hồ sơ trẻ (gắn FR-03)

AC2: Hiển thị thông tin thiết bị
GIVEN thiết bị pair thành công
WHEN tôi xem chi tiết
THEN hiển thị: thông tin con, tên thiết bị, nền tảng (Android/iOS), thời điểm ghép nối, trạng thái online

AC3: Pair thất bại phía con
GIVEN máy con báo lỗi pair
WHEN tôi vẫn ở màn hình chờ
THEN App Parents vẫn giữ nguyên ở màn quét QR/mã
```

4. **Exception & Edge Cases**:

| Scenario | Cách xử lý | Cơ chế Fallback |
|:---|:---|:---|
| Máy con pair xong nhưng App Parents chưa nhận tín hiệu (mạng trễ) | Polling/đẩy realtime; cho phép kéo làm mới | User buộc kill app vào lại |
| Phụ huynh thoát màn hình trước khi con pair | Phiên vẫn chạy nền | User buộc mở lại app để xem |

5. **Technical Context & NFR**:
- Trạng thái online/offline thuộc FR-03 — ở đây chỉ hiển thị xác nhận pair ban đầu.

---

#### US-06-P: Xử lý thiết bị đã pair tài khoản khác (conflict)

1. **US statement**
**As a** phụ huynh
**I want** hệ thống phát hiện khi máy con đang được quản lý bởi tài khoản khác
**So that** tránh hai phụ huynh tranh quyền điều khiển cùng một thiết bị

2. **Dependencies**: US-04-P

3. **Acceptance Criteria**:
```
AC1: Phát hiện conflict
GIVEN máy con đang được pair với tài khoản phụ huynh khác
WHEN máy con cố pair với tài khoản của tôi
THEN hệ thống chặn pair và báo không thể kết nối
```

4. **Exception & Edge Cases**:

| Scenario | Cách xử lý | Cơ chế Fallback |
|:---|:---|:---|
| Tài khoản cũ không còn truy cập được (mất máy) | Cần kênh xác minh quyền sở hữu | Quy trình hỗ trợ/CSKH xác minh |
| Máy con factory reset rồi cài lại | Coi là thiết bị mới, cần pair lại từ đầu | Bản ghi cũ chuyển trạng thái "đã gỡ" |

5. **Technical Context & NFR**:
- Định danh thiết bị nên gắn device-id ổn định để phát hiện conflict / re-pair chính xác.

---

### 3.2 FR-01 Pairing — APP KID

---

#### US-01-K: Xem onboarding + tổng quan quyền cần cấp

1. **US statement**
**As a** người cài máy con
**I want** thấy onboarding giải thích App Kid làm gì và liệt kê các quyền sắp cấp
**So that** tôi hiểu vì sao cần cấp nhiều quyền hệ thống và chuẩn bị thao tác

2. **Dependencies**: Không có (App Kid vừa cài)

3. **Acceptance Criteria**:
```
AC1: Onboarding máy con
GIVEN App Kid mở lần đầu
WHEN tôi vào màn giới thiệu
THEN hiển thị: mục đích app + danh sách quyền sẽ cấp (Accessibility, VPN, Usage Access, Device Admin, Overlay, Pin/Battery, CA hoặc MDM tùy nền tảng)
AND mỗi quyền kèm 1 dòng giải thích ngắn vì sao cần

AC2: Nhận diện nền tảng
GIVEN thiết bị là Android hoặc iOS
WHEN onboarding hiển thị
THEN chỉ hiển thị các bước đúng nền tảng (Android → CA + chuỗi quyền; iOS → MDM)
```

4. **Exception & Edge Cases**:

| Scenario | Cách xử lý | Cơ chế Fallback |
|:---|:---|:---|
| Phiên bản OS quá thấp/không hỗ trợ | Kiểm tra version khi mở app | Chặn tiếp tục, báo "Thiết bị chưa được hỗ trợ" — ngưỡng version: TBD |

---

#### US-02-K: Cấp chuỗi quyền cốt lõi (Android)

1. **US statement**
**As a** người cài máy con
**I want** được dẫn từng bước cấp các quyền hệ thống mà Android yêu cầu
**So that** App Kid đủ khả năng phát hiện app, lọc traffic, khóa máy và chạy nền bền bỉ

2. **Dependencies**: US-01-K; thiết bị Android

3. **Acceptance Criteria**:
```
AC1: Dẫn cấp quyền theo checklist tuần tự
GIVEN tôi ở màn cấp quyền Android
WHEN tôi cấp từng quyền
THEN với mỗi quyền, app mở đúng trang Cài đặt hệ thống và đánh dấu ✔ khi cấp xong:
  - Accessibility: Cài đặt → Trợ năng (Accessibility) → [App Kid] → Bật  (để phát hiện app đang chạy)
  - Usage Access: Cài đặt → Ứng dụng → Quyền truy cập đặc biệt → Quyền sử dụng (Usage access) → [App Kid] → Bật  (để báo cáo thời gian dùng)
  - Hiển thị trên ứng dụng khác (Overlay): Cài đặt → Quyền truy cập đặc biệt → Hiển thị trên ứng dụng khác → [App Kid] → Bật  (để hiển thị màn khóa)
  - Device Admin: dialog "Kích hoạt quản trị thiết bị" → Kích hoạt  (để khóa máy, chống gỡ)
  - VPN: dialog hệ thống "[App Kid] muốn thiết lập kết nối VPN" → Đồng ý  (để định tuyến và lọc traffic)
  - Bỏ tối ưu pin: Cài đặt → Pin → Bỏ tối ưu pin cho [App Kid]  (để không bị kill nền)
  - Notification (Android 13+): cấp quyền thông báo

AC2: Bỏ qua quyền không bắt buộc
GIVEN một quyền là khuyến nghị (vd bỏ tối ưu pin)
WHEN tôi tạm bỏ qua
THEN cho tiếp tục nhưng đánh dấu cảnh báo "App có thể bị tắt nền"

AC3: Quay lại app sau mỗi lần cấp
GIVEN tôi vừa bật một quyền trong Cài đặt
WHEN quay lại App Kid
THEN checklist tự cập nhật trạng thái quyền đó thành ✔
```

4. **Exception & Edge Cases**:

| Scenario | Cách xử lý | Cơ chế Fallback |
|:---|:---|:---|
| OEM tùy biến (Xiaomi/Oppo/Vivo) cần quyền tự khởi động (auto-start) | Phát hiện hãng máy, thêm bước auto-start tương ứng | Hướng dẫn ảnh/đường dẫn riêng theo hãng |
| User từ chối quyền bắt buộc | Không cho qua bước (xem US-05-K) | Nút "Mở Cài đặt" để cấp lại |
| Trang Cài đặt khác nhau giữa các bản Android | Dùng intent chuẩn; nếu không mở được trang đúng | Mở trang Cài đặt app + hướng dẫn thủ công |

5. **Technical Context & NFR**:
- Accessibility + Usage Access + Overlay + VPN + Device Admin là **bắt buộc**; bỏ tối ưu pin + auto-start là **khuyến nghị**.
- App phải re-check quyền mỗi lần quay lại foreground.

---

#### US-03-K: Cài CA Certificate (Android)

1. **US statement**
**As a** người cài máy con
**I want** được hướng dẫn từng bước cài chứng chỉ CA của giải pháp
**So that** App Kid có thể giải mã và lọc nội dung HTTPS phục vụ lọc web (FR-05)

2. **Dependencies**: US-02-K (đã có VPN); thiết bị Android

3. **Acceptance Criteria**:
```
AC1: Cài CA theo từng bước
GIVEN tôi ở màn "Cài chứng chỉ bảo mật"
WHEN tôi bấm "Cài đặt"
THEN App Kid khởi tạo cài đặt CA và hệ thống dẫn qua các bước:
  B1: App phát hành file chứng chỉ và gọi màn cài đặt CA của hệ thống
  B2: Hệ thống yêu cầu đặt tên chứng chỉ + chọn mục đích "VPN và ứng dụng (VPN and apps)"
  B3: Nếu thiết bị chưa có khóa màn hình (PIN/vân tay) → bắt buộc thiết lập trước rồi quay lại
  B4: Xác nhận → chứng chỉ vào "Thông tin xác thực người dùng (User credentials)"
  B5: Quay lại App Kid → app kiểm tra chứng chỉ đã cài → đánh dấu ✔

AC2: Xác minh đã cài
GIVEN chứng chỉ đã cài
WHEN App Kid kiểm tra
THEN hiển thị "Chứng chỉ đã sẵn sàng"; nếu chưa thấy → giữ trạng thái "Chưa cài" và nút "Thử lại"
```

4. **Exception & Edge Cases**:

| Scenario | Cách xử lý | Cơ chế Fallback |
|:---|:---|:---|
| User hủy ở màn đặt tên chứng chỉ | Chứng chỉ không được cài | App giữ "Chưa cài", cho cài lại |
| Thiết bị chưa đặt khóa màn hình | Android bắt buộc thiết lập trước khi cài CA | Dẫn user qua bước tạo PIN rồi tự quay lại |
| App đích bỏ qua user-CA (Android 7+ không tin CA do user cài) | Nội dung của các app đó không lọc được qua MITM | Ghi nhận giới hạn; với app này dùng chặn theo domain/DNS thay vì lọc sâu — xem Open Question |

5. **Technical Context & NFR**:
- ⚠ Cài CA can thiệp traffic → cần thông báo & đồng thuận rõ ràng (legal).
- **Giới hạn kỹ thuật quan trọng:** từ Android 7.0, ứng dụng không tự động tin chứng chỉ do người dùng cài; nhiều app (đặc biệt dùng certificate pinning) sẽ không bị lọc → cần làm rõ phạm vi lọc thực tế.

---

#### US-04-K: Cài & enroll MDM Profile (iOS)

1. **US statement**
**As a** người cài máy con
**I want** được dẫn từng bước tải và cài MDM profile trên iOS
**So that** App Kid áp được các giới hạn quản lý thiết bị của con

2. **Dependencies**: US-01-K; thiết bị iOS

3. **Acceptance Criteria**:
```
AC1: Tải & cài profile theo từng bước
GIVEN tôi ở màn "Cài hồ sơ quản lý"
WHEN tôi bấm "Tải hồ sơ"
THEN hệ thống dẫn qua các bước:
  B1: Tải file cấu hình (.mobileconfig) — iOS hiện "Đã tải hồ sơ (Profile Downloaded)"
  B2: Mở Cài đặt (Settings) → Cài đặt chung (General) → VPN & Quản lý thiết bị (VPN & Device Management)
  B3: Bấm vào hồ sơ vừa tải → "Cài đặt (Install)" → nhập mật mã thiết bị
  B4: Đọc cảnh báo quản lý từ xa → "Cài đặt" lần nữa → "Tin cậy (Trust)"
  B5: Quay lại App Kid → app kiểm tra trạng thái enrolled → đánh dấu ✔

AC2: Xác minh enrolled
GIVEN profile đã cài
WHEN App Kid kiểm tra
THEN hiển thị "Đã đăng ký quản lý"; nếu chưa → giữ "Chưa cài" + nút "Mở Cài đặt"
```

4. **Exception & Edge Cases**:

| Scenario | Cách xử lý | Cơ chế Fallback |
|:---|:---|:---|
| User tải profile nhưng quên vào Settings cài | App nhắc + nút deep-link mở thẳng VPN & Device Management | Hiển thị hướng dẫn ảnh từng bước |
| Profile đã tồn tại / cài trùng | Phát hiện profile cũ | Yêu cầu gỡ profile cũ trước khi cài mới |
| Thiết bị **không supervised** | Một số giới hạn MDM không áp được | Chỉ bật được tập tính năng giới hạn; cảnh báo phạm vi — xem Open Question |

5. **Technical Context & NFR**:
- ⚠ MDM quản lý thiết bị từ xa → cần đồng thuận & thông báo (legal).
- **Giới hạn kỹ thuật quan trọng:** nhiều restriction mạnh của iOS chỉ áp dụng trên **supervised device** (qua Apple Configurator 2 / Apple Business Manager). Thiết bị tiêu dùng thường unsupervised → cần chốt phạm vi tính năng iOS khả thi.

---

#### US-05-K: Permission gate — chặn hoàn tất nếu thiếu quyền

1. **US statement**
**As a** App Kid
**I want** kiểm tra đủ tất cả quyền/chứng chỉ bắt buộc trước khi cho hoàn tất pairing
**So that** không tạo ra thiết bị đã pair nhưng không kiểm soát được (false-managed)

2. **Dependencies**: US-02-K / US-03-K (Android) hoặc US-04-K (iOS)

3. **Acceptance Criteria**:
```
AC1: Chặn khi thiếu quyền
GIVEN còn ít nhất một quyền bắt buộc chưa cấp
WHEN tôi bấm "Hoàn tất / Ghép nối"
THEN nút bị vô hiệu (hoặc chặn) và hiển thị danh sách quyền còn thiếu kèm nút "Cấp ngay"

AC2: Cho phép khi đủ
GIVEN tất cả quyền bắt buộc đã ✔
WHEN tôi bấm "Hoàn tất"
THEN cho chuyển sang bước ghép nối (US-06-K)

AC3: Xin lại quyền
GIVEN một quyền bị thu hồi giữa chừng
WHEN tôi quay lại app
THEN checklist cập nhật quyền đó về "Chưa cấp" và mở lại nút "Cấp ngay"
```

4. **Exception & Edge Cases**:

| Scenario | Cách xử lý | Cơ chế Fallback |
|:---|:---|:---|
| Quyền hiển thị ✔ nhưng thực tế OS đã thu hồi | Re-check runtime trước khi pair, không chỉ tin cache | Nếu mismatch → ép cấp lại trước khi qua |
| User cấp quyền nhưng không mở được trang Cài đặt đúng | Fallback mở trang Cài đặt app | Hướng dẫn thủ công kèm ảnh |

5. **Technical Context & NFR**:
- Định nghĩa "quyền bắt buộc" theo nền tảng (mục Technical Context của US-02-K / US-04-K).
- Gate phải chạy lại mỗi lần vào foreground và ngay trước khi gọi API pair.

---

#### US-06-K: Hoàn tất ghép nối (Quét QR / SĐT + OTP)

1. **US statement**
**As a** người cài máy con
**I want** ghép nối máy con với tài khoản phụ huynh bằng quét QR (ưu tiên) hoặc nhập SĐT phụ huynh + OTP
**So that** thiết bị con được liên kết và bắt đầu nhận quản lý

2. **Dependencies**: US-05-K pass; mã/QR từ US-04-P

3. **Acceptance Criteria**:
```
AC1: Ghép nối bằng QR (ưu tiên)
GIVEN tôi mở app lần đầu
WHEN tôi quét QR đang hiển thị trên App Parents
THEN App Kid gửi pairing-token lên server, server xác thực hợp lệ
AND máy con liên kết tài khoản phụ huynh thành công

AC2: Ghép nối bằng SĐT + OTP (dự phòng)
GIVEN không quét được QR
WHEN tôi chọn "Nhập bằng SĐT", nhập SĐT phụ huynh
THEN hệ thống gửi OTP về **máy phụ huynh** (qua SMS), phụ huynh đọc và đọc cho người cài nhập
AND nhập đúng OTP còn hiệu lực → ghép nối thành công

AC3: Mã pair sai / OTP sai hoặc hết hạn
GIVEN tôi nhập mã pair sai, hoặc OTP sai/hết hạn (OTP có thời hạn; mã pair thì không)
WHEN xác thực
THEN báo lỗi tương ứng ("Mã không đúng" / "OTP đã hết hạn, gửi lại") và cho thử lại

AC4: Sync về phụ huynh
GIVEN ghép nối thành công
WHEN xem lại trên app Parents
THEN server sync realtime để App Parents cập nhật (US-05-P)
```

4. **Exception & Edge Cases**:

| Scenario | Cách xử lý | Cơ chế Fallback |
|:---|:---|:---|
| Camera bị từ chối quyền khi quét QR | Xin quyền camera | Tự chuyển sang phương thức nhập mã thủ công|
| QR mờ/không quét được | Cho nhập tay mã 6 số | Nút "Nhập mã thủ công" |
| Mất mạng khi pair | Không gọi được server | Retry; giữ nguyên màn ghép nối, không reset bước quyền |
| Pass gate nhưng quyền bị thu hồi ngay trước pair | Server/app re-check, từ chối pair | Quay lại US-05-K ép cấp lại |

5. **Technical Context & NFR**:
- ⚠ OTP nhạy cảm — gửi về máy phụ huynh, không hiển thị trên máy con.
- Ưu tiên QR vì nhanh và ít sai sót; SĐT + OTP là dự phòng khi không quét được.
- Single-use & ràng buộc 1 hồ sơ ↔ 1 thiết bị enforce ở server (đồng bộ US-04-P).

---

### 3.3 FR-02 Anti-Tamper — APP PARENTS

---

#### US-07-P: Hủy ghép nối để cho phép gỡ App Kid

1. **US statement**
**As a** phụ huynh
**I want** hủy ghép nối thiết bị con từ App Parents
**So that** bỏ quyền quản lý để gỡ App Kid hợp lệ (đổi máy, ngừng dùng) — phân biệt với gỡ lén

2. **Dependencies**: US-05-P (thiết bị đã pair)

3. **Acceptance Criteria**:
```
AC1: Hủy ghép nối thành công (thiết bị online)
GIVEN tôi chọn 1 thiết bị con đang được quản lý
WHEN tôi bấm "Hủy ghép nối" và xác nhận
THEN server gửi lệnh gỡ quản lý xuống App Kid
AND App Kid tự vô hiệu Device Admin (Android) / gỡ self-protection → máy con uninstall được bình thường
AND thiết bị chuyển trạng thái "Đã hủy ghép nối" trong App Parents

AC2: Thiết bị offline
GIVEN thiết bị con đang offline
WHEN tôi hủy ghép nối
THEN lệnh vào hàng đợi, đánh dấu "Chờ áp dụng"; tự áp dụng khi máy con online

AC3: Hướng dẫn gỡ phần còn lại
GIVEN đã hủy ghép nối
WHEN người dùng muốn gỡ sạch
THEN App Parents hiển thị hướng dẫn gỡ CA (Android) / MDM profile (iOS) thủ công kèm App Kid
```

4. **Exception & Edge Cases**:

| Scenario | Cách xử lý | Cơ chế Fallback |
|:---|:---|:---|
| Lệnh hủy không tới máy con (mất mạng kéo dài) | Giữ hàng đợi + retry; hiển thị "Chờ áp dụng" | Cho "hủy phía server" (force): bỏ khỏi tài khoản, máy con tự bỏ quản lý lần online kế |
| Con đã factory reset trước khi nhận lệnh | Bản ghi chuyển "đã gỡ" | Không cần gửi lệnh nữa |

5. **Technical Context & NFR**:
- Hủy ghép nối là hành động nhạy cảm → yêu cầu xác nhận (có thể xác thực lại — PM quyết định).
- Đây là **đường thoát hợp lệ** để uninstall, phân biệt rõ với gỡ lén (US-07-K).

---

#### US-08-P: Xem log hành vi gỡ ứng dụng

1. **US statement**
**As a** phụ huynh
**I want** xem lịch sử các lần con cố gỡ App Kid
**So that** biết con có ý định lách và xử lý kịp thời

2. **Dependencies**: US-09-P (nguồn sự kiện); có thiết bị pair

3. **Acceptance Criteria**:
```
AC1: Hiển thị log
GIVEN có ít nhất 1 sự kiện gỡ/cố gỡ được ghi
WHEN tôi mở mục "Lịch sử hành vi" của thiết bị
THEN hiển thị danh sách: loại hành vi (cố gỡ app / vô hiệu Device Admin...), thời điểm, thiết bị
AND sắp xếp mới nhất lên đầu

AC2: Không có dữ liệu
GIVEN chưa ghi nhận sự kiện nào
WHEN tôi mở mục này
THEN hiển thị empty state "Chưa ghi nhận hành vi gỡ ứng dụng"
```

4. **Exception & Edge Cases**:

| Scenario | Cách xử lý | Cơ chế Fallback |
|:---|:---|:---|
| Sự kiện xảy ra lúc offline | Máy con buffer local, đẩy lên server khi online | Hiển thị nhãn "ghi nhận trễ" + thời điểm thực tế |

5. **Technical Context & NFR**:
- Log lưu server, gắn thời điểm theo trusted time (chống đổi giờ — US-08-K).
- Sort mặc định: thời điểm giảm dần (mới nhất trên cùng).

---

#### US-09-P: Nhận cảnh báo khi phát hiện hành vi lách (tamper)

1. **US statement**
**As a** phụ huynh
**I want** nhận thông báo realtime khi máy con có dấu hiệu lách
**So that** can thiệp kịp thời

2. **Dependencies**: US-03-P (notification); các US phát hiện phía Kid (US-07-K → US-11-K)

3. **Acceptance Criteria**:
```
AC1: Bắn cảnh báo khi có tamper
GIVEN máy con phát hiện 1 hành vi lách (đổi giờ, tắt VPN, gỡ CA/MDM, tắt Accessibility, cố gỡ app, safe mode, factory reset)
WHEN sự kiện đẩy về server
THEN phụ huynh nhận push nêu rõ loại hành vi + thiết bị + thời điểm

AC2: Deep-link vào chi tiết
GIVEN tôi nhận push tamper
WHEN bấm vào
THEN mở thẳng màn chi tiết sự kiện/thiết bị (gắn FR-04)

AC3: Mất kết nối nghi do tamper
GIVEN máy con mất heartbeat đột ngột (nghi factory reset / force-stop / tắt nguồn)
WHEN quá [ngưỡng] không có tín hiệu   ← TBD, cần PM/Tech Lead
THEN gửi cảnh báo "Thiết bị mất kết nối"
```

4. **Exception & Edge Cases**:

| Scenario | Cách xử lý | Cơ chế Fallback |
|:---|:---|:---|
| Bão sự kiện (con bật/tắt liên tục) | Gom nhóm (debounce) cảnh báo cùng loại trong khoảng ngắn | Hiển thị "x lần trong y phút" thay vì spam |
| Cảnh báo lúc phụ huynh offline | Lưu server, đẩy lại khi online + hiện trong danh sách thông báo | — |

5. **Technical Context & NFR**:
- Ngưỡng mất heartbeat coi là "nghi tamper": TBD.
- Phân loại mức độ nghiêm trọng từng loại tamper: TBD (PM).

---

### 3.4 FR-02 Anti-Tamper — APP KID

> Mỗi US dưới đây ghi rõ: phần **ngăn cứng** (chỉ đạt khi có Device Owner/Supervised+ABM) vs phần **phát hiện + cảnh báo + phục hồi** (luôn làm được). Xem OQ-08.

---

#### US-07-K: Chống gỡ App Kid

1. **US statement**
**As a** App Kid (System)
**I want** ngăn / cảnh báo khi trẻ cố gỡ App Kid mà không có xác nhận phụ huynh
**So that** kiểm soát không bị vô hiệu bằng cách xóa app

2. **Dependencies**: US-06-K (đã pair); Device Admin (Android) / MDM (iOS) đã cấp

3. **Acceptance Criteria**:
```
AC1: Ngăn gỡ (Android — Device Admin)
GIVEN App Kid là Device Admin đang active
WHEN trẻ vào Cài đặt cố gỡ App Kid
THEN Android chặn gỡ trực tiếp (buộc phải vô hiệu Device Admin trước)

AC2: Phát hiện nỗ lực vô hiệu Device Admin
GIVEN trẻ mở màn vô hiệu Device Admin
WHEN phát hiện sự kiện này
THEN App Kid ghi log + cảnh báo phụ huynh (US-09-P); (tùy chính sách) hiển thị màn yêu cầu xác nhận phụ huynh

AC3: Non-removable (iOS — MDM supervised)
GIVEN App Kid được đánh dấu non-removable qua MDM (supervised)
WHEN trẻ giữ icon để xóa
THEN iOS không cho xóa

AC4: Ghi log mọi nỗ lực gỡ
GIVEN có nỗ lực gỡ / vô hiệu bảo vệ
WHEN xảy ra
THEN ghi log đẩy về server cho US-08-P
```

4. **Exception & Edge Cases**:

| Scenario | Cách xử lý | Cơ chế Fallback |
|:---|:---|:---|
| Android không/đã rút Device Admin | Không chặn cứng được | Detect + alert + nhắc bật lại; áp fail-safe theo OQ-09 |
| iOS unsupervised (không non-removable) | Không chặn xóa được | Detect (app mất heartbeat) + cảnh báo phụ huynh |

5. **Technical Context & NFR**:
- ⚠ **Ngăn cứng** chỉ đạt khi Device Admin/Device Owner (Android) còn active, hoặc app non-removable (iOS supervised). Ngoài ra = **phát hiện + cảnh báo** (xem OQ-08).
- Phân biệt gỡ hợp lệ (sau US-07-P) vs gỡ lén.

---

#### US-08-K: Chống đổi giờ / múi giờ hệ thống

1. **US statement**
**As a** App Kid (System)
**I want** rule thời gian không bị lách khi trẻ đổi giờ / múi giờ
**So that** giới hạn thời gian (FR-07/FR-09) vẫn enforce đúng

2. **Dependencies**: US-06-K (đã pair)

3. **Acceptance Criteria**:
```
AC1: Dùng giờ máy chủ làm chuẩn
GIVEN App Kid áp rule theo thời gian
WHEN tính hạn mức / lịch
THEN dùng trusted server time (không tin giờ thiết bị) → đổi giờ thiết bị KHÔNG thay đổi việc enforce

AC2: Phát hiện lệch giờ
GIVEN giờ thiết bị lệch đáng kể so với server (> [ngưỡng])   ← TBD
WHEN App Kid kiểm tra
THEN ghi nhận "nghi đổi giờ" + cảnh báo phụ huynh (US-09-P)

AC3: Mất mạng (không lấy được giờ server)
GIVEN thiết bị offline
WHEN cần enforce rule thời gian
THEN dùng đồng hồ monotonic nội bộ (elapsedRealtime — không bị ảnh hưởng khi user chỉnh giờ) làm chuẩn dự phòng
```

4. **Exception & Edge Cases**:

| Scenario | Cách xử lý | Cơ chế Fallback |
|:---|:---|:---|
| User bật/tắt giờ tự động liên tục | Theo dõi delta giờ; chỉ alert khi vượt ngưỡng | Debounce, gom cảnh báo |
| Đổi múi giờ hợp lệ (đi du lịch) | Phân biệt theo ngữ cảnh nếu được | Ngưỡng + tránh báo động giả — TBD |

5. **Technical Context & NFR**:
- Ngưỡng lệch giờ coi là "nghi lách": TBD.
- Android Device Owner có thể ép giờ tự động (ngăn cứng) — xem OQ-08.
- Đo thời lượng dùng app bằng monotonic clock, không dùng wall-clock của hệ thống.

---

#### US-09-K: Chống tắt / gỡ VPN - MDM - CA Certificate

1. **US statement**
**As a** App Kid (System)
**I want** phát hiện và khôi phục khi lớp lọc traffic (VPN / CA / MDM) bị vô hiệu
**So that** lọc web (FR-05) không bị tắt bằng cách gỡ chứng chỉ / VPN

2. **Dependencies**: US-03-K (CA, Android) / US-04-K (MDM, iOS); VPN

3. **Acceptance Criteria**:
```
AC1: Phát hiện VPN bị tắt
GIVEN VPN nội bộ đang chạy
WHEN trẻ tắt VPN
THEN App Kid phát hiện ngay, thử bật lại (always-on nếu được), ghi log + cảnh báo phụ huynh

AC2: Phát hiện CA / MDM bị gỡ
GIVEN CA (Android) / MDM profile (iOS) đang có
WHEN bị xóa
THEN App Kid phát hiện (kiểm tra định kỳ + lắng nghe sự kiện), nhắc cài lại + cảnh báo phụ huynh

AC3: Fail-safe khi lọc bị vô hiệu
GIVEN lớp lọc đang tắt và chưa khôi phục
WHEN trẻ tiếp tục dùng máy
THEN áp chính sách fail-safe (chặn traffic / màn yêu cầu bật lại / khóa) — theo OQ-09
```

4. **Exception & Edge Cases**:

| Scenario | Cách xử lý | Cơ chế Fallback |
|:---|:---|:---|
| Không bật lại được VPN (user từ chối always-on) | Lặp nhắc + cảnh báo; áp fail-safe | Báo phụ huynh "lọc đang tắt" |
| CA gỡ giữa 2 lần check (chưa kịp phát hiện) | Giảm chu kỳ check + lắng nghe sự kiện hệ thống | Server đối chiếu: traffic không qua proxy → nghi tamper |

5. **Technical Context & NFR**:
- ⚠ **Ngăn cứng** (không cho tắt VPN / gỡ profile) cần Always-on VPN lockdown + Device Owner (Android) / lock profile (iOS supervised) — xem OQ-08.
- Không có các quyền đó → chỉ **phát hiện + khôi phục + cảnh báo + fail-safe**.
- Liên quan giới hạn user-CA Android 7+ (xem US-03-K, OQ-02).

---

#### US-10-K: Chống tắt Accessibility / force-stop App Kid

1. **US statement**
**As a** App Kid (System)
**I want** phát hiện khi Accessibility bị tắt hoặc app bị force-stop
**So that** cơ chế phát hiện app đang chạy (FR-07) không bị vô hiệu

2. **Dependencies**: US-02-K (Accessibility); US-06-K (đã pair)

3. **Acceptance Criteria**:
```
AC1: Phát hiện Accessibility bị tắt
GIVEN Accessibility service của App Kid đang bật
WHEN trẻ tắt trong Cài đặt
THEN App Kid phát hiện (callback / kiểm tra định kỳ), nhắc bật lại + cảnh báo phụ huynh

AC2: Chạy nền bền + tự khởi động lại
GIVEN service / process bị hệ thống hoặc user kill
WHEN bị dừng
THEN dùng foreground service + cơ chế restart (WorkManager/JobScheduler) để bật lại sớm nhất

AC3: Phát hiện force-stop qua heartbeat
GIVEN App Kid gửi heartbeat định kỳ về server
WHEN heartbeat ngừng quá [ngưỡng]   ← TBD
THEN server coi là nghi force-stop/offline → cảnh báo phụ huynh (US-09-P)
```

4. **Exception & Edge Cases**:

| Scenario | Cách xử lý | Cơ chế Fallback |
|:---|:---|:---|
| Sau force-stop, Android không cho app tự chạy lại tới khi user mở | Không thể tự bật trên 1 số OEM | Dựa heartbeat server để cảnh báo; nhắc khi user mở lại |
| OEM kill nền mạnh (Xiaomi/Oppo...) | Cần auto-start + bỏ tối ưu pin (US-02-K) | Hướng dẫn whitelist; cảnh báo nếu thường xuyên offline |

5. **Technical Context & NFR**:
- Không ngăn cứng được việc tắt Accessibility / force-stop trên máy tiêu dùng → **phát hiện + restart + cảnh báo**.
- Ngưỡng heartbeat: TBD.

---

#### US-11-K: Phát hiện safe mode / factory reset

1. **US statement**
**As a** App Kid (System)
**I want** phát hiện khi thiết bị vào safe mode hoặc bị factory reset
**So that** phụ huynh biết con đang tìm cách bỏ quản lý

2. **Dependencies**: US-06-K (đã pair)

3. **Acceptance Criteria**:
```
AC1: Phát hiện safe mode
GIVEN thiết bị khởi động vào safe mode (app bên thứ 3 bị vô hiệu)
WHEN thiết bị quay lại chế độ thường và App Kid chạy lại
THEN App Kid ghi nhận "đã vào safe mode" + thời điểm, đẩy cảnh báo phụ huynh

AC2: Phát hiện factory reset (gián tiếp)
GIVEN thiết bị bị factory reset
WHEN máy con ngừng heartbeat và không pair lại
THEN server phát hiện mất kết nối kéo dài → cảnh báo "thiết bị có thể đã bị reset / bỏ quản lý"

AC3: Re-enroll sau reset (nếu hạ tầng hỗ trợ)
GIVEN thiết bị thuộc Supervised/ABM (iOS) hoặc Device Owner (Android)
WHEN bị reset
THEN thiết bị tự enroll lại MDM / khôi phục quản lý
```

4. **Exception & Edge Cases**:

| Scenario | Cách xử lý | Cơ chế Fallback |
|:---|:---|:---|
| Reset xong bán / cho người khác | Server không phân biệt được | Cảnh báo offline; cần phụ huynh xác nhận / hủy ghép nối |
| Safe mode dùng mục đích hợp lệ | Vẫn ghi nhận nhưng mức cảnh báo thấp | Phân loại mức độ — TBD |

5. **Technical Context & NFR**:
- ⚠ **KHÔNG ngăn được** factory reset / safe mode trên máy tiêu dùng → chỉ **phát hiện + cảnh báo**.
- Re-enroll sau reset chỉ khả thi với Supervised+ABM (iOS) / Device Owner (Android) — xem OQ-03, OQ-08.
- Ngưỡng mất kết nối coi là "nghi reset": TBD.

---

## 4. Câu hỏi mở và giả định

### 4.1 Câu hỏi mở (cần stakeholder chốt)

| # | Câu hỏi | Owner |
|---|---|---|
| OQ-02 | Android 7+ không tin user-CA → phạm vi lọc HTTPS thực tế tới đâu? App pinning xử lý sao (DNS/domain-block thay thế)? | Tech Lead |
| OQ-03 | iOS cần supervised mới full MDM. Thiết bị con tiêu dùng có enroll supervised được không? Nếu không, tập tính năng iOS khả thi là gì? | Tech Lead / PM |
| OQ-05 | Quy trình chuyển quản lý khi tài khoản cũ không truy cập được (mất máy)? Có cần CSKH xác minh sở hữu? | PM / CS |
| OQ-06 | Danh sách OEM Android cần xử lý auto-start riêng (Xiaomi/Oppo/Vivo/Samsung…)? | Tech Lead |
| OQ-07 | Ngưỡng phiên bản OS tối thiểu được hỗ trợ (Android/iOS)? | Tech Lead |
| OQ-08 | **Mô hình enforce Anti-Tamper:** chấp nhận "phát hiện + cảnh báo", hay đầu tư **Device Owner (Android) + Supervised/ABM (iOS)** để ngăn cứng? Quyết định này chi phối toàn bộ FR-02. | PM / Tech Lead |
| OQ-09 | **Chính sách fail-safe** khi lớp bảo vệ bị vô hiệu (VPN tắt / CA-MDM bị gỡ / Accessibility tắt): khóa thiết bị, chặn toàn bộ traffic, hay chỉ cảnh báo? | PM |
| OQ-10 | Các ngưỡng phát hiện tamper: mất heartbeat bao lâu = nghi force-stop/reset? Lệch giờ bao nhiêu = nghi đổi giờ? | PM / Tech Lead |