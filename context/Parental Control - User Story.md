# Parental Control

### FR-01 Pairing — APP PARENTS

---

#### US-01-P: Đăng nhập bằng SĐT \+ OTP

1. **US statement**:  
   **\- As a** phụ huynh  
   \- **I want** đăng nhập bằng số điện thoại và mã OTP gửi qua SMS  
   \- **So that** tôi truy cập được tài khoản mà không cần nhớ mật khẩu (login \= signup nếu SĐT chưa có tài khoản)  
     
2. **Dependencies**: Không có  
     
3. **Acceptance Criteria**:

**AC1: Nhập SĐT hợp lệ**

GIVEN tôi ở màn hình đăng nhập

WHEN nhập SĐT đúng định dạng (đầu số VN hợp lệ) và bấm "Tiếp tục"

THEN hệ thống gửi OTP qua SMS và chuyển sang màn nhập OTP

**AC2: OTP đúng**

GIVEN tôi đã nhận OTP

WHEN nhập đúng mã còn hiệu lực

THEN đăng nhập thành công (tạo session); nếu SĐT chưa có tài khoản thì tự tạo tài khoản mới rồi đăng nhập

**AC3: OTP sai**

GIVEN tôi ở màn nhập OTP

WHEN nhập sai mã

THEN hiển thị lỗi "Mã OTP không đúng" và cho nhập lại

AND sau 5 lần sai liên tiếp → khóa nhập OTP 30 phút   ← Theo rule LCS

**AC4: Gửi lại OTP**

GIVEN tôi chưa nhận được OTP

WHEN bấm "Gửi lại" sau khi hết đếm ngược 60 giây   ← Theo rule LCS

THEN hệ thống gửi OTP mới và reset hiệu lực

**AC5: OTP hết hạn**

GIVEN OTP đã quá thời gian hiệu lực 5 phút   ← Theo rule LCS

WHEN tôi nhập mã đó

THEN hiển thị "Mã đã hết hạn, vui lòng gửi lại"

4. **Exception & Edge Cases**:

| Scenario | Cách xử lý | Cơ chế Fallback |
| :---- | :---- | :---- |
| SMS không tới (nhà mạng trễ) | Cho gửi lại sau đếm ngược; thử kênh SMS dự phòng | Hiển thị "Chưa nhận được? Kiểm tra sóng / Gửi lại" |
| SĐT sai định dạng | Validate client \+ server (regex đầu số VN) | Lỗi inline "SĐT không hợp lệ", vô hiệu nút "Tiếp tục" |
| Spam gửi OTP | Rate limit: tối đa 5 SMS / SĐT / giờ   ← Theo rule LCS | Trả 429, hiển thị "Thử lại sau X phút" |
| Mất mạng khi xác thực | Retry 3 lần, hiển thị toast mất kết nối | Giữ SĐT đã nhập, không bắt nhập lại |

---

#### US-02-P: Cấp quyền notification

1. **US statement**:  
   **\-As a** phụ huynh  
   \-**I want** được giải thích rõ rồi cấp quyền nhận thông báo  
   \-**So that** tôi nhận được cảnh báo khi con bị chặn web/app, thiết bị offline, hành vi lách (tamper)  
     
2. **Dependencies**: Không  
     
3. **Acceptance Criteria**:

**AC1: Cấp quyền**

GIVEN tôi ở dialog quyền hệ thống

WHEN bấm "Cho phép"

THEN quyền notification được cấp, tiếp tục luồng thiết lập

**AC2: Từ chối quyền**

GIVEN tôi bấm "Không cho phép"

THEN vẫn cho tiếp tục dùng app

AND lần sau có popup Hướng dẫn bật thủ công Settings (app tự custom, ,không phải của hệ điều hành)

---

#### US-03-P: Tạo mã / QR ghép nối thiết bị con

1. **US statement**:  
   **\-As a** phụ huynh  
   \-**I want** mỗi hồ sơ con khi tạo ra được gắn sẵn 1 QR ghép nối riêng  
   \-**So that** tôi dùng đúng mã đó để liên kết máy con vào hồ sơ tương ứng  
     
2. **Dependencies**: gắn với luồng "Tạo hồ sơ trẻ" (FR-03)  
     
3. **Acceptance Criteria**:

**AC1: Gen mã khi tạo hồ sơ con**

GIVEN tôi tạo hồ sơ trẻ (Tên \+ giới tính \+ sinh nhật \+ SĐT; tên bắt buộc)  
WHEN lưu hồ sơ thành công  
THEN hệ thống sinh kèm 1 mã QR code   
AND Mã QR có thời hạn, 5p refresh 1 lần. 

**AC2: Single-use \+ ràng buộc 1 hồ sơ ↔ 1 thiết bị**

GIVEN một máy con đã pair thành công bằng mã của hồ sơ này

WHEN có thiết bị khác quét/nhập lại cùng mã

THEN hệ thống từ chối, báo "Hồ sơ này đã có thiết bị" (1 hồ sơ chỉ gắn 1 máy con)

4. **Exception & Edge Cases**:

| Scenario | Cách xử lý | Cơ chế Fallback |
| :---- | :---- | :---- |
| Mất mạng khi tạo hồ sơ | Không lưu được hồ sơ | Hiển thị lỗi \+ "Thử lại" Hồ sơ vẫn được lưu |
| Mất mạng khi tạo mã | Không sinh được mã | Hiển thị lỗi \+ "Thử lại" Hồ sơ vẫn được lưu |
| Vượt giới hạn số thiết bị / hồ sơ (maximum 5 thiết bị) | Chặn tạo hồ sơ mới | Thông báo "Đã đạt số thiết bị tối đa" |

5. **Technical Context & NFR**:  
- Bảo vệ dựa trên **single-use \+ ràng buộc 1 hồ sơ ↔ 1 thiết bị**, enforce ở **server** (chỉ nhận 1 request ghép nối thành công cho mỗi hồ sơ).

---

#### US-04-P: Xác nhận thiết bị con đã ghép nối

1. **US statement**  
   \-**As a** phụ huynh  
   \-**I want** thấy xác nhận realtime khi máy con ghép nối xong  
   \-**So that** tôi biết thiết bị đã được quản lý và rule bắt đầu áp dụng  
     
2. **Dependencies**: US-01 & 02 & 03 done  
     
3. **Acceptance Criteria**:

**AC1: Xác nhận thành công**

GIVEN tôi đang ở màn hình hiển thị QR

WHEN máy con quét mã và pair thành công

THEN App Parents tự cập nhật trạng thái thành công và chuyển sang màn Dashboard trong vòng \[3\] giây

AND thiết bị xuất hiện trong danh sách của hồ sơ trẻ (gắn FR-03)

**AC2: Hiển thị thông tin thiết bị**

GIVEN thiết bị pair thành công

WHEN tôi xem chi tiết profile của con

THEN profile hiển thị: thông tin con, tên thiết bị, nền tảng (Android/iOS), thời điểm ghép nối, trạng thái online/offline

**AC3: Pair thất bại phía con**

GIVEN thực hiện quét QR bằng máy con   
WHEN máy con báo lỗi pair (mất mạng, lỗi thiết bị,...)  
THEN App Parents vẫn giữ nguyên ở màn quét QR/mã

**AC4: Xem trạng thái online /offline của con**  
GIVEN đã ghép nối thành công   
WHEN máy con đang ở trạng thái hoạt động  
THEN trên App Parents hiện trạng thái online  
WHEN máy con đang ở trạng thái không hoạt động  
THEN trên App Parents hiện trạng thái offline

4. **Exception & Edge Cases**:

| Scenario | Cách xử lý | Cơ chế Fallback |
| :---- | :---- | :---- |
| Máy con pair xong nhưng App Parents chưa nhận tín hiệu (mạng trễ) | Polling/đẩy realtime; cho phép kéo làm mới | User buộc kill app vào lại |
| Phụ huynh thoát màn hình trước khi con pair | Phiên vẫn chạy nền | User buộc mở lại app để xem |

---

### FR-01 Pairing — APP KID (Android)

---

#### US-01-K: Hoàn tất ghép nối (Quét QR / SĐT \+ OTP)

1. **US statement** **As a** người cài máy con **I want** ghép nối máy con với tài khoản phụ huynh bằng quét QR (ưu tiên) **So that** thiết bị con được liên kết và bắt đầu nhận quản lý  
     
2. **Dependencies**: N/A  
     
3. **Acceptance Criteria**:

AC1: Ghép nối bằng QR

GIVEN tôi mở app lần đầu

WHEN tôi quét QR đang hiển thị trên App Parents

THEN App Kid gửi yêu cầu đăng nhập, server xác thực hợp lệ

AND máy con liên kết tài khoản phụ huynh thành công

AC2: QR sai hoặc hết hạn

GIVEN tôi nhập quét QR hết hạn/sai

WHEN server xác thực

THEN báo lỗi tương ứng ("Mã không đúng" / "OTP đã hết hạn, gửi lại") và cho thử lại

AC3: Sync về phụ huynh

GIVEN ghép nối thành công

WHEN xem lại trên app Parents

THEN server sync realtime để App Parents cập nhật (US-05-P)

4. **Exception & Edge Cases**:

| Scenario | Cách xử lý | Cơ chế Fallback |
| :---- | :---- | :---- |
| Camera bị từ chối quyền khi quét QR | Xin quyền camera | Nếu vẫn từ chối, hỏi xin quyền lại vào lần sau |
| Mất mạng khi pair | Không gọi được server | Retry; giữ nguyên màn ghép nối, không reset bước quyền |
| Pass gate nhưng quyền bị thu hồi ngay trước pair | Server/app re-check, từ chối pair | Quay lại US-05-K ép cấp lại |
| Nhiều thiết bị cùng quét | First write win Chỉ ghi nhận thiết bị đầu tiên Các thiết bị khác báo lỗi | N/A |

5. **Technical Context & NFR**:  
- Single-use & ràng buộc 1 hồ sơ ↔ 1 thiết bị enforce ở server (đồng bộ US-04-P).

#### 

#### US-02-K: Cấp chuỗi quyền cốt lõi (Android)

1. **US statement** **As a** người cài máy con **I want** được dẫn từng bước cấp các quyền hệ thống mà Android yêu cầu **So that** App Kid đủ khả năng phát hiện app, lọc traffic, khóa máy và chạy nền bền bỉ  
     
2. **Dependencies**: Không  
     
3. **Acceptance Criteria**:

AC1: Dẫn cấp quyền theo checklist tuần tự

GIVEN tôi ghép nối thành công với app Parents

WHEN tôi bắt đầu vào phần xin quyền

THEN với mỗi quyền, app mở đúng trang Cài đặt hệ thống:

  \- Accessibility: Cài đặt → Trợ năng (Accessibility) → \[App Kid\] → Bật  (để phát hiện app đang chạy)

  \- Usage Access: Cài đặt → Ứng dụng → Quyền truy cập đặc biệt → Quyền sử dụng (Usage access) → \[App Kid\] → Bật  (để báo cáo thời gian dùng)

  \- Hiển thị trên ứng dụng khác (Overlay): Cài đặt → Quyền truy cập đặc biệt → Hiển thị trên ứng dụng khác → \[App Kid\] → Bật  (để hiển thị màn khóa)

  \- Device Admin: dialog "Kích hoạt quản trị thiết bị" → Kích hoạt  (để khóa máy, chống gỡ)

  \- VPN: dialog hệ thống "\[App Kid\] muốn thiết lập kết nối VPN" → Đồng ý  (để định tuyến và lọc traffic)

  \- Bỏ tối ưu pin: Cài đặt → Pin → Bỏ tối ưu pin cho \[App Kid\]  (để không bị kill nền)

  \- Notification (Android 13+): cấp quyền thông báo

4. **Exception & Edge Cases**:

| Scenario | Cách xử lý | Cơ chế Fallback |
| :---- | :---- | :---- |
| User từ chối quyền bắt buộc | Không cho qua bước | Lần sau hiện màn hình hướng dẫn mở lại quyền |

5. **Technical Context & NFR**:  
- Accessibility \+ Usage Access \+ Overlay \+ VPN \+ Device Admin là **bắt buộc**; bỏ tối ưu pin \+ auto-start là **khuyến nghị**.  
- App phải re-check quyền mỗi lần quay lại foreground.  
- OEM tùy biến (Xiaomi/Oppo/Vivo) cần quyền tự khởi động (auto-start) \-\> cần có cơ chế Phát hiện hãng máy, thêm bước auto-start tương ứng  
- Trang Cài đặt khác nhau giữa các bản Android \-\> Dùng intent chuẩn; nếu không mở được đích danh trang setting đó

---

### FR-03 Quản lý hồ sơ — APP PARENTS

---

#### US-05-P: Tạo hồ sơ trẻ

1. **US statement** **As a** phụ huynh **I want** tạo hồ sơ cho từng đứa con với thông tin cơ bản **So that** tôi có một đơn vị quản lý riêng để gắn thiết bị và áp các rule kiểm soát cho đúng đứa trẻ  
     
2. **Acceptance Criteria**:

**AC1: Tạo hồ sơ thành công**

GIVEN tôi đã đăng nhập và chưa đạt giới hạn số hồ sơ

WHEN tôi nhập thông tin hồ sơ (Tên; Giới tính, Ngày sinh, Ảnh đại diện, SĐT. Trong đó chỉ có tên \+ ngày sinh là bắt buộc) và bấm "Lưu"

THEN hệ thống tạo hồ sơ mớ

AND hệ thống sinh kèm 1 mã QR ghép nối cho hồ sơ (theo US-03-P)

AND hồ sơ mới xuất hiện trong danh sách hồ sơ

AND server lưu dữ liệu hồ sơ

**AC2: Thiếu trường bắt buộc**

GIVEN tôi ở màn tạo hồ sơ

WHEN tôi để trống trường bắt buộc

THEN hiển thị lỗi inline và nút "Lưu" bị vô hiệu

**AC3: Đạt giới hạn số hồ sơ**

GIVEN tôi đã tạo đủ số hồ sơ tối đa cho phép  (5 hồ sơ)

WHEN tôi bấm "Thêm hồ sơ"

THEN hệ thống chặn tạo mới và hiển thị "Bạn đã đạt số hồ sơ tối đa"

**AC4: SĐT sai định dạng (nếu nhập)**

GIVEN tôi nhập SĐT cho hồ sơ

WHEN SĐT sai định dạng

THEN hiển thị lỗi inline "SĐT không hợp lệ"; SĐT là trường tùy chọn nên có thể bỏ trống để lưu

3. **Exception & Edge Cases**:

| Scenario | Cách xử lý | Cơ chế Fallback |
| :---- | :---- | :---- |
| Mất mạng khi lưu hồ sơ | Không gọi được server → không sinh được mã ghép nối | Hiển thị lỗi “Kiểm tra kết nối mạng và thử lại” |
| Trùng tên hồ sơ | **Cho phép trùng tên** (2 con trùng tên là hợp lệ); phân biệt bằng ảnh/ngày sinh | Không chặn; có thể gợi ý "Đã có hồ sơ cùng tên" (tùy PM) |
| Bấm "Lưu" nhiều lần (double submit) | Vô hiệu nút sau lần bấm đầu \+ idempotency ở server | Chỉ tạo 1 hồ sơ, không nhân bản |
| Ngày sinh ở tương lai | Validate ngày sinh ≤ hôm nay | Lỗi inline "Ngày sinh không hợp lệ" |

4. **Technical Context & NFR**:  
- ⚠ Dữ liệu trẻ vị thành niên → Nếu có , cần mã hóa khi truyền, tuân thủ chính sách bảo vệ dữ liệu trẻ em (legal).  
- Giới hạn số hồ sơ enforce ở **server** (không chỉ ẩn nút phía client).

---

#### US-06-P: Chỉnh sửa hồ sơ trẻ

1. **US statement** **As a** phụ huynh **I want** chỉnh sửa thông tin hồ sơ con (tên, ảnh, giới tính, ngày sinh, SĐT) **So that** thông tin luôn đúng khi con thay đổi hoặc tôi nhập sai lúc tạo  
     
2. **Dependencies**: US-05-P (hồ sơ đã tồn tại)  
     
3. **Acceptance Criteria**:

**AC1: Sửa và lưu thành công**

GIVEN tôi mở màn chi tiết một hồ sơ đã tạo

WHEN tôi thay đổi một hoặc nhiều trường (tên/ảnh/giới tính/ngày sinh/SĐT) và bấm "Lưu"

THEN hệ thống cập nhật thông tin hồ sơ

AND danh sách hồ sơ \+ các màn liên quan hiển thị thông tin mới

**AC2: Bỏ trống trường bắt buộc**

GIVEN tôi đang sửa hồ sơ

WHEN tôi xóa Tên và bấm "Lưu"

THEN hiển thị lỗi inline "Vui lòng nhập tên" và không cho lưu

**AC3: Thoát mà không lưu**

GIVEN tôi đã sửa vài trường nhưng chưa lưu

WHEN tôi bấm "Quay lại" 

THEN hệ thống hỏi xác nhận "Hủy thay đổi chưa lưu?" trước khi rời đi

WHEN tôi close app / kill app

THEN hệ thống không lưu thay đổi 

**AC4: Không đổi mã ghép nối**

GIVEN tôi sửa thông tin hồ sơ

WHEN tôi lưu

THEN mã QR ghép nối và trạng thái thiết bị đã gắn KHÔNG bị ảnh hưởng (sửa hồ sơ ≠ tạo lại mã)

4. **Exception & Edge Cases**:

| Scenario | Cách xử lý | Cơ chế Fallback |
| :---- | :---- | :---- |
| Mất mạng khi lưu chỉnh sửa | Không gọi được server | Giữ nguyên dữ liệu đang nhập, hiển thị "Thử lại", không mất thay đổi |
| Hồ sơ bị xóa ở thiết bị/phiên khác khi đang sửa | Server trả lỗi "không tồn tại" | Thông báo "Hồ sơ không còn tồn tại" \+ quay về danh sách |
| Sửa đồng thời trên 2 thiết bị phụ huynh | Ghi theo nguyên tắc last-write-wins  |  |

5. **Technical Context & NFR**:  
- Sửa hồ sơ **không** đụng tới pairing-token / liên kết thiết bị.  
- ⚠ Dữ liệu trẻ vị thành niên (như US-PRF-01).

---

#### US-07-P: Xóa hồ sơ trẻ

1. **US statement** **As a** phụ huynh **I want** xóa hồ sơ khi không còn dùng (con lớn, đổi máy, tạo nhầm) **So that** danh sách gọn gàng và dữ liệu con không cần thiết được dọn đi

   

2. **Acceptance Criteria**:

**AC1: Xóa hồ sơ không có thiết bị**

GIVEN tôi chọn một hồ sơ chưa gắn thiết bị nào

WHEN tôi bấm "Xóa hồ sơ" và xác nhận

THEN hệ thống xóa hồ sơ và mã ghép nối kèm theo

AND hồ sơ biến mất khỏi danh sách

**AC2: Xóa hồ sơ ĐANG có thiết bị**

GIVEN hồ sơ đang gắn 1 thiết bị con đang được quản lý

WHEN tôi bấm "Xóa hồ sơ"

THEN hệ thống hiển thị cảnh báo mạnh: "Xóa hồ sơ sẽ GỠ QUẢN LÝ toàn bộ thiết bị của con và xóa dữ liệu liên quan. Hành động không thể hoàn tác."

AND yêu cầu bước xác nhận mạnh (confirm lần nữa để chắc chắn)

WHEN tôi xác nhận

THEN hệ thống gửi lệnh gỡ quản lý tới máy con

AND xóa hồ sơ \+ mã ghép nối \+ các rule gắn với hồ sơ

AND hồ sơ biến mất khỏi danh sách  
AND khi vào lại app con, tự động quay lại màn hình ghép nối  
AND giữ nguyên bộ cài CA , MDM đã tải về máy trước đó  
AND các log hành vi của con (nếu có) vẫn được lưu ở database

**AC3: Hủy thao tác xóa**

GIVEN tôi đang ở dialog xác nhận xóa

WHEN tôi bấm "Hủy"

THEN không có gì thay đổi, đóng dialog

**AC4: Bố mẹ xóa tài khoản**

GIVEN tôi đã đăng nhập của chính mình

WHEN tôi chọn “Xóa tài khoản”

THEN tài khoản của tôi bị xóa  
AND hệ thống gửi lệnh gỡ quản lý tới máy con  
AND xóa hồ sơ \+ mã ghép nối \+ các rule gắn với hồ sơ  
AND hồ sơ biến mất khỏi danh sách  
AND khi vào lại app con, tự động quay lại màn hình ghép nối  
AND giữ nguyên bộ cài CA , MDM đã tải về máy trước đó  
AND các log hành vi của con (nếu có) vẫn được lưu ở database

3. **Exception & Edge Cases**:

| Scenario | Cách xử lý | Cơ chế Fallback |
| :---- | :---- | :---- |
| Mất mạng khi xóa | Không gọi được server → không xóa | Báo "Xóa thất bại, thử lại"; không xóa nửa vời phía client |
| Lệnh gỡ quản lý không tới máy con (offline kéo dài) | Giữ hàng đợi \+ retry  | Máy con tự bỏ quản lý ở lần online kế; nếu con factory reset trước đó → coi như đã gỡ |
| Xóa hồ sơ cuối cùng | Cho phép; quay về empty state | Hiển thị "Chưa có hồ sơ nào. Tạo hồ sơ đầu tiên cho con" |

