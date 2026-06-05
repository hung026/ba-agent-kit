# Lá Chắn Số — Parental Control: Đặc tả User Story (FR-01 đến FR-04)

**Version:** 1.1  
**Ngày:** 2026-06-05  
**Scope:** FR-01 Pairing · FR-02 Anti-Tamper · FR-03 Quản lý hồ sơ & thiết bị · FR-04 Quản lý thông báo

---

## 1. Executive Summary

Tài liệu này đặc tả User Story cho tính năng **Bảo vệ con cái (Parental Control)** trong app **Lá Chắn Số** của Viettel — bao gồm 4 nhóm tính năng đầu tiên.

**Mô hình hoạt động đã chốt:**

| Hạng mục | Quyết định |
|---|---|
| Account model con | Không có TK riêng — App Kid là agent của TK phụ huynh |
| Pairing method | QR + mã 6 số, hiệu lực 10 phút, single-use |
| Kiểm soát iOS | MDM (Mobile Device Management) |
| Kiểm soát Android | CA Certificate + Device Admin |
| Con có SIM Viettel | Full feature: kiểm soát + alert lừa đảo |
| Con không có SIM Viettel | Chỉ kiểm soát web/app, không có alert |

**Actors:**
- **Phụ huynh** — người dùng App Lá Chắn Số (APP PARENTS)
- **App Kid** — Lá Chắn Số Kid, cài trên máy con, không login riêng (APP KID)
- **Hệ thống** — backend server Lá Chắn Số

---

## 2. User Story List

### APP PARENTS

| US ID | User Story | Actor | Điều kiện trước | Điều kiện sau |
|---|---|---|---|---|
| US-01-01 | [APP PARENTS] Xem giới thiệu tính năng Parental Control | Phụ huynh | Đăng nhập App cha mẹ, chưa kích hoạt | Phụ huynh hiểu tổng quan, sẵn sàng tiếp tục |
| US-01-02 | [APP PARENTS] Cấp quyền notification | Phụ huynh | US-01-01 hoàn tất | Quyền notification đã cấp hoặc bị từ chối |
| US-01-03 | [APP PARENTS] Tạo mã/QR ghép nối thiết bị con | Phụ huynh | US-01-02 hoàn tất, hồ sơ trẻ đã tạo | QR + mã 6 số đang hiệu lực 10 phút |
| US-03-01 | [APP PARENTS] Tạo hồ sơ trẻ | Phụ huynh | Đăng nhập App cha mẹ | Hồ sơ mới được tạo và lưu thành công |
| US-03-02 | [APP PARENTS] Chỉnh sửa hồ sơ trẻ | Phụ huynh | Hồ sơ trẻ đã tồn tại | Thông tin hồ sơ cập nhật thành công |
| US-03-03 | [APP PARENTS] Xóa hồ sơ trẻ | Phụ huynh | Hồ sơ trẻ đã tồn tại | Hồ sơ xóa, thiết bị liên kết bị hủy pair |
| US-03-04 | [APP PARENTS] Xem danh sách thiết bị theo hồ sơ | Phụ huynh | Ít nhất 1 thiết bị đã pair | Danh sách thiết bị hiển thị đầy đủ |
| US-03-05 | [APP PARENTS] Xem trạng thái online/offline thiết bị | Phụ huynh | Thiết bị đã pair và gắn vào hồ sơ | Trạng thái kết nối hiển thị realtime |
| US-03-06 | [APP PARENTS] Gắn thiết bị đã pair vào hồ sơ | Phụ huynh | Thiết bị đã pair, hồ sơ đã tạo | Thiết bị liên kết với hồ sơ, rule được áp dụng |
| US-03-07 | [APP PARENTS] Hủy ghép nối thiết bị | Phụ huynh | Thiết bị đang liên kết với hồ sơ | Thiết bị gỡ liên kết, App Kid mất quản lý |
| US-03-08 | [APP PARENTS] Gửi lệnh quản lý xuống thiết bị con | Phụ huynh | Thiết bị đã pair và gắn vào hồ sơ | Lệnh gửi thành công hoặc vào hàng đợi nếu offline |
| US-04-01 | [APP PARENTS] Nhận notification sự kiện | Phụ huynh | Quyền notification đã cấp, thiết bị đã pair | Phụ huynh nhận cảnh báo khi có sự kiện |
| US-04-02 | [APP PARENTS] Deep-link từ notification đến event detail | Phụ huynh | Phụ huynh nhận notification | Phụ huynh được dẫn đúng màn hình event detail |
| US-04-03 | [APP PARENTS] Đánh dấu đã xem / chưa xem thông báo | Phụ huynh | Có thông báo trong danh sách | Trạng thái đọc của thông báo được cập nhật |

### APP KID

| US ID | User Story | Actor | Điều kiện trước | Điều kiện sau |
|---|---|---|---|---|
| US-01-04 | [APP KID] Xem giới thiệu và cấp quyền | Phụ huynh (cài máy con) | App Kid đã cài | Người cài nắm được quyền cần thiết |
| US-01-05 | [APP KID] Cài đặt CA Certificate (Android) | Phụ huynh (cài máy con) | US-01-04 hoàn tất, thiết bị Android | CA Certificate đã cài, traffic HTTPS có thể bắt |
| US-01-06 | [APP KID] Cài đặt MDM Profile (iOS) | Phụ huynh (cài máy con) | US-01-04 hoàn tất, thiết bị iOS | MDM Profile đã cài và enrolled |
| US-01-07 | [APP KID] Quét QR / Nhập mã hoàn tất ghép nối | Phụ huynh (thao tác máy con) | US-01-05 hoặc US-01-06 hoàn tất | Thiết bị con liên kết với TK phụ huynh |
| US-01-08 | [APP KID] Xem màn hình giới thiệu sau ghép nối | Trẻ / Phụ huynh | US-01-07 hoàn tất | Trẻ thấy tên người quản lý và giới hạn đang áp dụng |
| US-02-01 | [APP KID] Chống gỡ bỏ App Kid | App Kid (System) | App Kid đã pair | Trẻ không thể xóa App Kid không có xác nhận phụ huynh |
| US-03-09 | [APP KID] Nhận và thực thi lệnh từ App cha mẹ | App Kid (System) | App Kid đang chạy, đã pair | Lệnh nhận và thực thi trên thiết bị con |

---

## 3. Chi tiết User Story

---

### APP PARENTS

---

#### FR-01: Pairing — Ghép nối thiết bị con

---

##### US-01-01: [APP PARENTS] Xem giới thiệu tính năng Parental Control

**As a** phụ huynh  
**I want** xem màn hình giới thiệu tính năng Bảo vệ con cái trước khi kích hoạt  
**So that** tôi hiểu tính năng làm được gì và quyết định có muốn thiết lập hay không

**Dependencies**: Không có

**Acceptance Criteria**:

```
AC1: Hiển thị onboarding lần đầu
GIVEN tôi đăng nhập App cha mẹ và chọn "Bảo vệ con cái" lần đầu
WHEN chưa từng thiết lập Parental Control
THEN hệ thống hiển thị màn hình onboarding giới thiệu tính năng
AND màn hình có tối thiểu 3 điểm nổi bật: kiểm soát app, lọc web, theo dõi thời gian màn hình
AND có nút "Bắt đầu thiết lập" và "Bỏ qua"

AC2: Bỏ qua onboarding
GIVEN tôi đang ở màn hình onboarding
WHEN tôi bấm "Bỏ qua"
THEN hệ thống quay về màn hình chính, không kích hoạt Parental Control

AC3: Không hiển thị lại sau khi đã xem
GIVEN tôi đã xem onboarding ít nhất 1 lần (bấm "Bắt đầu" hoặc "Bỏ qua")
WHEN tôi quay lại mục "Bảo vệ con cái"
THEN hệ thống không hiển thị lại onboarding, dẫn thẳng vào màn hình quản lý
```

**Exception & Edge Cases**:

| Scenario | Cách xử lý | Cơ chế Fallback |
|---|---|---|
| Người dùng force-close app giữa chừng khi xem onboarding | Trạng thái "đã xem" chỉ được lưu khi bấm "Bắt đầu" hoặc "Bỏ qua" | Hiển thị lại onboarding lần tiếp theo |

---

##### US-01-02: [APP PARENTS] Cấp quyền notification

**As a** phụ huynh  
**I want** được yêu cầu cấp quyền nhận thông báo một cách có giải thích rõ ràng  
**So that** tôi hiểu vì sao cần quyền này và đồng ý một cách có nhận thức

**Dependencies**: US-01-01

**Acceptance Criteria**:

```
AC1: Hiển thị màn hình giải thích trước khi xin quyền
GIVEN tôi bấm "Bắt đầu thiết lập" ở US-01-01
WHEN hệ thống chưa có quyền notification
THEN hiển thị màn hình giải thích: vì sao cần quyền, loại thông báo nào sẽ gửi
AND sau đó mới kích hoạt popup xin quyền hệ thống (OS permission dialog)

AC2: Người dùng từ chối quyền notification
GIVEN popup xin quyền OS đang hiển thị
WHEN tôi bấm "Không cho phép"
THEN hệ thống hiện cảnh báo: "Bạn sẽ không nhận được cảnh báo kịp thời. Vẫn tiếp tục?"
AND có 2 nút: "Bật thông báo (Vào Cài đặt)" và "Tiếp tục không có thông báo"
AND flow vẫn tiếp tục bất kể lựa chọn (không block setup)

AC3: Quyền đã được cấp từ trước
GIVEN hệ thống đã có quyền notification
WHEN flow đến bước này
THEN bỏ qua bước xin quyền, chuyển thẳng sang US-01-03
```

**Exception & Edge Cases**:

| Scenario | Cách xử lý | Cơ chế Fallback |
|---|---|---|
| iOS: người dùng vào Settings revoke quyền sau khi đã cấp | App phát hiện khi mở lại, hiển thị banner "Quyền thông báo bị tắt. Bật lại?" | Deep-link vào trang Cài đặt của app |

---

##### US-01-03: [APP PARENTS] Tạo mã/QR ghép nối thiết bị con

**As a** phụ huynh  
**I want** tạo mã ghép nối (QR + mã 6 số) để liên kết máy con  
**So that** tôi có thể kết nối thiết bị con với tài khoản của mình một cách an toàn

**Dependencies**: US-01-02, US-03-01 (hồ sơ trẻ đã tạo)

**Acceptance Criteria**:

```
AC1: Sinh QR và mã 6 số thành công
GIVEN tôi ở màn hình thêm thiết bị con
WHEN tôi bấm "Tạo mã ghép nối"
THEN hệ thống sinh QR code và mã 6 chữ số
AND cả hai hiển thị trên cùng 1 màn hình
AND đồng hồ đếm ngược 10 phút hiển thị rõ ràng

AC2: Mã hết hạn
GIVEN mã ghép nối đã sinh ra
WHEN đồng hồ đếm ngược về 0
THEN mã và QR bị vô hiệu hóa tự động
AND hệ thống hiển thị thông báo "Mã đã hết hạn"
AND hiển thị nút "Tạo mã mới"

AC3: Regenerate mã
GIVEN mã đã hết hạn hoặc chưa hết hạn
WHEN tôi bấm "Tạo mã mới"
THEN mã cũ bị hủy ngay lập tức (server vô hiệu hóa token cũ)
AND mã mới được sinh với đồng hồ đếm ngược 10 phút mới

AC4: Phụ huynh nhận xác nhận sau khi ghép nối thành công
GIVEN máy con đã quét QR/nhập mã thành công (US-01-07)
WHEN hệ thống xác nhận ghép nối
THEN màn hình App cha mẹ chuyển sang "Đã ghép nối thành công"
AND hệ thống gửi push notification xác nhận: "[Tên thiết bị] đã được kết nối thành công"
```

**Exception & Edge Cases**:

| Scenario | Cách xử lý | Cơ chế Fallback |
|---|---|---|
| 2 thiết bị scan cùng 1 mã đồng thời | Chỉ thiết bị đầu tiên pair thành công, mã bị vô hiệu ngay | Thiết bị thứ 2 nhận lỗi "Mã đã được sử dụng. Yêu cầu phụ huynh tạo mã mới." |
| Network lỗi khi đang tạo mã | Hiển thị lỗi "Không thể tạo mã. Kiểm tra kết nối mạng." | Nút retry |
| Phụ huynh đóng app trước khi con pair xong | Mã vẫn còn hiệu lực đến hết 10 phút | Con vẫn có thể nhập mã và pair thành công |

**Technical Context & NFR**:
- Mã 6 số: random, không đoán được, single-use (bị vô hiệu sau lần dùng đầu tiên)
- QR encode: `{ token, expire_timestamp, parent_account_id }` — truyền qua HTTPS
- ⚠ Sensitive data: token ghép nối chứa thông tin tài khoản — không log token, không hiển thị trong error message

---

#### FR-03: Quản lý hồ sơ và thiết bị

---

##### US-03-01: [APP PARENTS] Tạo hồ sơ trẻ

**As a** phụ huynh  
**I want** tạo hồ sơ cho trẻ trong App cha mẹ  
**So that** tôi có thể gắn thiết bị và quản lý theo từng trẻ một cách độc lập

**Dependencies**: Đã đăng nhập App cha mẹ

**Acceptance Criteria**:

```
AC1: Tạo hồ sơ thành công
GIVEN tôi ở màn hình danh sách hồ sơ
WHEN tôi bấm "Thêm hồ sơ" → nhập tên trẻ (bắt buộc) + ảnh đại diện (tùy chọn) + ngày sinh (tùy chọn) → bấm "Lưu"
THEN hồ sơ mới được tạo và lưu trên server
AND hồ sơ hiển thị trong danh sách ngay lập tức
AND hệ thống điều hướng đến màn hình chi tiết hồ sơ vừa tạo

AC2: Bỏ trống tên trẻ
GIVEN tôi đang nhập thông tin hồ sơ
WHEN tôi bấm "Lưu" mà chưa nhập tên
THEN hệ thống hiển thị lỗi inline dưới ô tên: "Tên là bắt buộc"
AND không lưu hồ sơ, giữ nguyên màn hình

AC3: Đạt giới hạn số hồ sơ
GIVEN tài khoản đã có N hồ sơ (N = TBD — OQ-01)
WHEN tôi thử tạo hồ sơ thứ N+1
THEN hệ thống thông báo "Đã đạt giới hạn số hồ sơ"
AND giải thích cách nâng cấp nếu có gói trả phí
```

**Exception & Edge Cases**:

| Scenario | Cách xử lý | Cơ chế Fallback |
|---|---|---|
| Upload ảnh thất bại (network lỗi) | Lưu hồ sơ không có ảnh, toast "Không thể tải ảnh, thử lại sau" | Cho phép upload lại ở màn hình chỉnh sửa sau |
| Tên trẻ có ký tự đặc biệt / emoji | Cho phép Unicode, giới hạn tối đa 50 ký tự | — |
| Network lỗi khi lưu hồ sơ | Toast "Lưu thất bại. Thử lại?" | Nút retry |

**Technical Context & NFR**:
- ⚠ Sensitive data: Tên và ảnh trẻ em (dữ liệu cá nhân người dưới 18 tuổi) — lưu trữ và xử lý theo quy định bảo mật. **Legal check required.**

---

##### US-03-02: [APP PARENTS] Chỉnh sửa hồ sơ trẻ

**As a** phụ huynh  
**I want** chỉnh sửa tên, ảnh, thông tin của hồ sơ trẻ  
**So that** thông tin hồ sơ luôn chính xác và cập nhật

**Dependencies**: US-03-01 hoàn tất

**Acceptance Criteria**:

```
AC1: Chỉnh sửa và lưu thành công
GIVEN tôi ở màn hình chi tiết hồ sơ
WHEN tôi bấm "Chỉnh sửa" → thay đổi tên / ảnh / thông tin → bấm "Lưu"
THEN thay đổi được cập nhật ngay trên màn hình
AND hệ thống hiển thị toast "Đã lưu thay đổi"

AC2: Hủy chỉnh sửa khi đã có thay đổi
GIVEN tôi đã sửa một hoặc nhiều trường nhưng chưa lưu
WHEN tôi bấm "Hủy" hoặc back
THEN hệ thống hiển thị confirm dialog: "Bỏ thay đổi chưa lưu?"
AND nếu xác nhận hủy: không lưu, quay về màn hình chi tiết với dữ liệu cũ
AND nếu ở lại: tiếp tục chỉnh sửa
```

---

##### US-03-03: [APP PARENTS] Xóa hồ sơ trẻ

**As a** phụ huynh  
**I want** xóa hồ sơ trẻ khi không còn cần dùng  
**So that** danh sách hồ sơ gọn gàng và không có dữ liệu thừa

**Dependencies**: US-03-01 hoàn tất

**Acceptance Criteria**:

```
AC1: Hiển thị confirm dialog trước khi xóa
GIVEN tôi ở màn hình chi tiết hồ sơ
WHEN tôi bấm "Xóa hồ sơ"
THEN hệ thống hiển thị dialog xác nhận với đầy đủ thông tin:
  - "X thiết bị sẽ bị hủy liên kết"
  - "Tất cả dữ liệu của hồ sơ này sẽ bị xóa vĩnh viễn"
AND có nút "Xác nhận xóa" (màu đỏ) và "Hủy"

AC2: Xóa thành công với thiết bị online
GIVEN tôi xác nhận xóa
WHEN tất cả thiết bị liên kết đang online
THEN tất cả thiết bị bị hủy pair ngay lập tức
AND App Kid trên các thiết bị nhận lệnh "Đã bị hủy quản lý" và hiển thị cho người dùng
AND hồ sơ biến mất khỏi danh sách trên App cha mẹ
AND toast "Hồ sơ đã được xóa"

AC3: Xóa hồ sơ khi có thiết bị offline
GIVEN có thiết bị liên kết đang offline
WHEN tôi xác nhận xóa
THEN hồ sơ bị xóa trên server ngay lập tức
AND lệnh hủy pair cho thiết bị offline được đưa vào hàng đợi pending
AND khi thiết bị online lại: lệnh thực thi tự động
```

**Exception & Edge Cases**:

| Scenario | Cách xử lý | Cơ chế Fallback |
|---|---|---|
| Network lỗi khi xóa | Không xóa, toast "Xóa thất bại. Thử lại?" | Nút retry |
| Hồ sơ có rule đang active (chặn web/app) | Rule bị xóa cùng hồ sơ, thiết bị nhận lệnh "clear all rules" | — |

**Technical Context & NFR**:
- Retention policy dữ liệu sau khi xóa hồ sơ: **TBD — OQ-05, xác nhận với Legal/Product**
- ⚠ Sensitive data: Dữ liệu usage của trẻ em — phải xử lý theo đúng quy định bảo vệ dữ liệu cá nhân

---

##### US-03-04: [APP PARENTS] Xem danh sách thiết bị theo hồ sơ

**As a** phụ huynh  
**I want** xem tất cả thiết bị được liên kết với một hồ sơ trẻ  
**So that** tôi biết đang quản lý bao nhiêu và những thiết bị nào của trẻ đó

**Dependencies**: US-03-01, ít nhất 1 thiết bị đã pair và gắn vào hồ sơ

**Acceptance Criteria**:

```
AC1: Hiển thị danh sách thiết bị
GIVEN tôi ở màn hình chi tiết hồ sơ
WHEN hồ sơ có ít nhất 1 thiết bị liên kết
THEN hiển thị danh sách, mỗi thiết bị có: tên thiết bị, nền tảng (iOS/Android), trạng thái (online/offline), lần online gần nhất

AC2: Hồ sơ chưa có thiết bị nào
GIVEN hồ sơ mới tạo hoặc tất cả thiết bị đã bị hủy pair
WHEN tôi vào màn hình chi tiết hồ sơ
THEN hiển thị empty state: "Chưa có thiết bị nào. Thêm thiết bị để bắt đầu quản lý."
AND có nút "Thêm thiết bị" dẫn đến flow US-01-03
```

---

##### US-03-05: [APP PARENTS] Xem trạng thái online/offline thiết bị

**As a** phụ huynh  
**I want** xem trạng thái kết nối realtime của từng thiết bị con  
**So that** tôi biết máy con đang hoạt động hay không kết nối

**Dependencies**: US-03-04

**Acceptance Criteria**:

```
AC1: Thiết bị online
GIVEN thiết bị con đang kết nối internet và App Kid đang chạy
WHEN tôi xem danh sách thiết bị
THEN thiết bị hiển thị badge "Đang online" (màu xanh)

AC2: Thiết bị offline
GIVEN App Kid mất kết nối internet hoặc bị force-kill
WHEN trạng thái chuyển sang offline
THEN badge chuyển sang "Offline" (màu xám)
AND hiển thị thêm: "Lần cuối online: X phút/giờ trước"

AC3: Thiết bị offline quá ngưỡng — gửi notification phụ huynh
GIVEN thiết bị không liên lạc được trong hơn N phút (N = TBD — OQ-02)
WHEN hệ thống phát hiện
THEN gửi push notification đến phụ huynh: "[Tên thiết bị] đã offline trong X phút"
```

**Technical Context & NFR**:
- Heartbeat: App Kid gửi tín hiệu định kỳ — interval: TBD, xác nhận Tech Lead (đề xuất: 30–60 giây) — OQ-02
- Ngưỡng offline gửi notification: TBD — OQ-02

---

##### US-03-06: [APP PARENTS] Gắn thiết bị đã pair vào hồ sơ

**As a** phụ huynh  
**I want** gắn một thiết bị đã pair vào hồ sơ trẻ  
**So that** các rule và giới hạn của hồ sơ được áp dụng lên thiết bị đó

**Dependencies**: US-01-07 (thiết bị đã pair), US-03-01 (hồ sơ đã tạo)

**Acceptance Criteria**:

```
AC1: Gắn thiết bị vào hồ sơ thành công
GIVEN thiết bị đã pair nhưng chưa gắn vào hồ sơ nào
WHEN tôi vào hồ sơ → bấm "Thêm thiết bị" → chọn thiết bị từ danh sách → bấm "Xác nhận"
THEN thiết bị được liên kết với hồ sơ
AND tất cả rule hiện tại của hồ sơ được đẩy xuống thiết bị ngay lập tức (hoặc pending nếu offline)
 
AC2: 1 thiết bị chỉ thuộc 1 hồ sơ tại một thời điểm
GIVEN thiết bị A đang thuộc hồ sơ "Con trai"
WHEN tôi thử gắn thiết bị A vào hồ sơ "Con gái"
THEN hệ thống hiển thị cảnh báo: "Thiết bị này đang thuộc hồ sơ [Con trai]. Chuyển sang hồ sơ mới sẽ xóa liên kết cũ và xóa toàn bộ rule của hồ sơ cũ."
AND có nút "Xác nhận chuyển" và "Hủy"
AND nếu xác nhận: thiết bị được chuyển và nhận rule của hồ sơ mới
```

---

##### US-03-07: [APP PARENTS] Hủy ghép nối thiết bị

**As a** phụ huynh  
**I want** hủy liên kết một thiết bị khỏi hồ sơ trẻ  
**So that** thiết bị đó không còn bị quản lý và tất cả giới hạn bị gỡ

**Dependencies**: US-03-06

**Acceptance Criteria**:

```
AC1: Yêu cầu PIN xác nhận trước khi hủy
GIVEN tôi ở màn hình chi tiết thiết bị
WHEN tôi bấm "Hủy ghép nối"
THEN hệ thống hiển thị dialog xác nhận: "Sau khi hủy, thiết bị sẽ không còn bị quản lý"
AND yêu cầu nhập PIN phụ huynh để xác nhận

AC2: Hủy ghép nối thành công — thiết bị online
GIVEN phụ huynh nhập đúng PIN
WHEN thiết bị đang online
THEN hệ thống gửi lệnh "unpair" ngay lập tức
AND App Kid nhận lệnh, hiển thị: "Thiết bị này không còn được quản lý"
AND tất cả rule bị xóa khỏi thiết bị
AND iOS: MDM unenroll / Android: Device Admin bị revoke

AC3: Hủy ghép nối khi thiết bị offline
GIVEN phụ huynh nhập đúng PIN
WHEN thiết bị đang offline
THEN lệnh unpair được lưu vào hàng đợi pending
AND khi thiết bị online lại: lệnh thực thi tự động
AND phụ huynh nhận notification xác nhận khi lệnh thực thi xong

AC4: Nhập sai PIN
GIVEN màn hình yêu cầu PIN đang hiển thị
WHEN nhập sai PIN 3 lần liên tiếp
THEN tính năng hủy ghép nối bị khóa 30 phút
AND hiển thị thông báo lý do và thời gian mở khóa
```

---

##### US-03-08: [APP PARENTS] Gửi lệnh quản lý xuống thiết bị con

**As a** phụ huynh  
**I want** gửi lệnh điều khiển từ App cha mẹ xuống App Kid  
**So that** các thay đổi cài đặt được áp dụng kịp thời trên thiết bị con

**Dependencies**: Thiết bị đã pair và gắn vào hồ sơ

**Acceptance Criteria**:

```
AC1: Gửi lệnh thành công khi thiết bị online
GIVEN thiết bị con đang online
WHEN tôi thực hiện bất kỳ thay đổi nào (VD: bật chặn web, cập nhật whitelist app)
THEN lệnh được gửi xuống thiết bị trong vòng 5 giây
AND App cha mẹ hiển thị trạng thái "Đã áp dụng ✓" sau khi thiết bị gửi acknowledgment về

AC2: Gửi lệnh khi thiết bị offline — lệnh pending
GIVEN thiết bị con đang offline
WHEN tôi thực hiện thay đổi
THEN lệnh được lưu vào hàng đợi trên server
AND App cha mẹ hiển thị: "Đang chờ đồng bộ (thiết bị offline)"
AND khi thiết bị online lại: lệnh được đẩy và thực thi tự động

AC3: Nhiều lệnh pending — thực thi đúng thứ tự
GIVEN thiết bị offline và có nhiều lệnh pending
WHEN thiết bị online lại
THEN các lệnh được thực thi theo đúng thứ tự timestamp (FIFO)
```

**Technical Context & NFR**:
- Command queue: FIFO, TTL của lệnh pending: TBD (đề xuất 24h) — OQ-04
- Nếu lệnh hết TTL mà thiết bị vẫn offline: lệnh bị hủy, phụ huynh thấy trạng thái "Hết hạn - cần áp dụng lại"

---

#### FR-04: Quản lý thông báo

---

##### US-04-01: [APP PARENTS] Nhận notification sự kiện

**As a** phụ huynh  
**I want** nhận push notification khi có sự kiện quan trọng trên thiết bị con  
**So that** tôi được cảnh báo kịp thời mà không cần liên tục mở app

**Dependencies**: US-01-02 (đã cấp quyền notification), thiết bị con đã pair

**Acceptance Criteria**:

```
AC1: Nhận push notification khi app ở background
GIVEN thiết bị con có sự kiện mới (app bị chặn / web bị chặn / thiết bị offline)
WHEN App cha mẹ đang ở background hoặc bị đóng
THEN phụ huynh nhận push notification
AND notification hiển thị: loại sự kiện + tên thiết bị + thời gian

AC2: Nội dung notification theo loại event

  - App bị chặn     → "[Tên thiết bị]: [Tên app] bị chặn lúc HH:mm"
  - Web bị chặn     → "[Tên thiết bị]: Truy cập [domain] bị chặn lúc HH:mm"
  - Thiết bị offline → "[Tên thiết bị] đã offline lúc HH:mm"
  - MDM/CA bị gỡ    → "[Tên thiết bị]: Quyền quản lý bị thu hồi"

AC3: Throttle — gom notification khi cùng loại event liên tục
GIVEN cùng loại event xảy ra nhiều lần liên tiếp (VD: trẻ bấm vào app bị chặn nhiều lần)
WHEN số lượng vượt quá N lần/phút (N = TBD — OQ-03)
THEN hệ thống gom thành 1 notification tổng hợp: "[Tên thiết bị]: [app/web] bị chặn X lần trong Y phút"
AND không gửi notification riêng lẻ thêm trong khoảng thời gian throttle

AC4: In-app notification khi app đang foreground
GIVEN phụ huynh đang mở App cha mẹ ở foreground
WHEN có event mới
THEN hiển thị in-app notification (banner trên cùng màn hình) thay vì push notification hệ thống
```

---

##### US-04-02: [APP PARENTS] Deep-link từ notification đến event detail

**As a** phụ huynh  
**I want** bấm vào notification và được dẫn thẳng đến màn hình chi tiết sự kiện  
**So that** tôi không mất thời gian tìm kiếm trong app

**Dependencies**: US-04-01

**Acceptance Criteria**:

```
AC1: Deep-link đúng màn hình theo loại event
GIVEN phụ huynh nhận notification sự kiện
WHEN bấm vào notification
THEN App cha mẹ mở ra (nếu đang đóng) hoặc foreground (nếu đang chạy background)
AND điều hướng thẳng đến màn hình chi tiết tương ứng:
  - App bị chặn     → Lịch sử app của thiết bị đó, filter theo app liên quan
  - Web bị chặn     → Lịch sử web của thiết bị đó, filter theo domain liên quan
  - Thiết bị offline → Màn hình chi tiết thiết bị — tab trạng thái kết nối
  - MDM/CA bị gỡ    → Màn hình "Sức khỏe kết nối" của thiết bị
AND event được đánh dấu "đã xem" tự động

AC2: Event không còn tồn tại (đã bị xóa hoặc hồ sơ đã bị xóa)
GIVEN sự kiện hoặc hồ sơ liên quan đã bị xóa khỏi server
WHEN phụ huynh bấm vào notification cũ
THEN app điều hướng về trang chủ của Parental Control
AND hiển thị toast: "Sự kiện không còn tồn tại"
```

---

##### US-04-03: [APP PARENTS] Đánh dấu đã xem / chưa xem thông báo

**As a** phụ huynh  
**I want** quản lý trạng thái đọc của các thông báo  
**So that** tôi biết thông báo nào đã xử lý và thông báo nào chưa

**Dependencies**: US-04-01

**Acceptance Criteria**:

```
AC1: Thông báo mới hiển thị trạng thái chưa xem
GIVEN có thông báo mới trong danh sách
WHEN tôi vào màn hình Thông báo
THEN thông báo chưa đọc được phân biệt rõ ràng (VD: chấm xanh, nền đậm hơn)
AND badge số lượng chưa đọc hiển thị trên icon tab/bottom bar

AC2: Tự động đánh dấu đã xem khi bấm vào
GIVEN thông báo đang ở trạng thái chưa xem
WHEN tôi bấm vào thông báo đó
THEN trạng thái chuyển sang "đã xem" ngay lập tức
AND badge giảm đi 1

AC3: Đánh dấu tất cả đã xem
GIVEN có nhiều thông báo chưa đọc
WHEN tôi bấm "Đánh dấu tất cả đã xem"
THEN tất cả thông báo chuyển sang "đã xem"
AND badge về 0

AC4: Đánh dấu lại chưa xem (thủ công)
GIVEN thông báo đang ở trạng thái đã xem
WHEN tôi swipe hoặc long-press và chọn "Đánh dấu chưa xem"
THEN trạng thái chuyển lại về "chưa xem"
AND badge tăng lên 1
```

---

### APP KID

---

#### FR-01: Pairing — Ghép nối thiết bị con

---

##### US-01-04: [APP KID] Xem giới thiệu và cấp quyền

**As a** phụ huynh (người cài App Kid trên máy con)  
**I want** App Kid hiển thị giải thích rõ ràng trước khi xin các quyền hệ thống  
**So that** tôi hiểu app cần quyền gì và cài đúng theo hướng dẫn

**Dependencies**: App Kid đã cài trên máy con

**Acceptance Criteria**:

```
AC1: Hiển thị màn hình giới thiệu khi mở lần đầu
GIVEN tôi mở App Kid lần đầu trên máy con
WHEN chưa có bất kỳ quyền nào được cấp
THEN App Kid hiển thị màn hình giới thiệu:
  - Mục đích của app
  - Tên người quản lý (TBD: hiển thị hay không khi chưa pair?)
  - Danh sách quyền cần thiết và lý do từng quyền
AND có nút "Tiếp tục cài đặt"

AC2: Thứ tự flow — ghép nối TRƯỚC, xin quyền SAU
GIVEN tôi bấm "Tiếp tục cài đặt"
WHEN flow bắt đầu
THEN app dẫn đến màn hình nhập mã/quét QR (US-01-07) TRƯỚC
AND chỉ sau khi pair thành công mới bắt đầu xin quyền hệ thống
```

---

##### US-01-05: [APP KID] Cài đặt CA Certificate (Android)

**As a** phụ huynh (người cài App Kid trên thiết bị Android)  
**I want** được hướng dẫn từng bước cài CA Certificate  
**So that** App Kid có thể giám sát và lọc traffic HTTPS trên thiết bị con

**Dependencies**: US-01-04 hoàn tất, US-01-07 hoàn tất (đã pair), thiết bị Android

**Acceptance Criteria**:

```
AC1: Hướng dẫn cài CA Certificate step-by-step
GIVEN thiết bị là Android, chưa cài CA Certificate
WHEN đến bước cài CA trong flow
THEN App Kid hiển thị hướng dẫn với các bước đánh số rõ ràng:
  Bước 1: Bấm "Tải CA Certificate" (có nút ngay trong app)
  Bước 2: Vào Settings → Security → Install Certificate → CA Certificate
  Bước 3: Chọn file vừa tải → đặt tên → xác nhận
AND mỗi bước có hình minh họa hoặc mô tả cụ thể

AC2: Kiểm tra CA đã cài thành công
GIVEN người dùng đã cài CA Certificate và quay lại App Kid
WHEN App Kid kiểm tra trạng thái
THEN App Kid hiển thị "CA Certificate: Đã cài ✓"
AND tự động chuyển sang bước tiếp theo trong flow

AC3: Người dùng bỏ qua hoặc cài thất bại
GIVEN CA Certificate chưa được cài sau khi người dùng quay lại
WHEN kiểm tra trạng thái
THEN App Kid hiển thị cảnh báo: "Không có CA Certificate — tính năng lọc web HTTPS sẽ không hoạt động. Vẫn tiếp tục?"
AND flow tiếp tục (không block)
```

**Exception & Edge Cases**:

| Scenario | Cách xử lý | Cơ chế Fallback |
|---|---|---|
| Android version không hỗ trợ user-installed CA | Hiển thị cảnh báo tương thích và hướng dẫn thay thế | Ghi chú giới hạn tính năng, không block flow |
| Tải file Certificate thất bại (network) | Thông báo lỗi + nút retry | Cung cấp link tải thủ công ngoài app |

---

##### US-01-06: [APP KID] Cài đặt MDM Profile (iOS)

**As a** phụ huynh (người cài App Kid trên thiết bị iOS)  
**I want** được hướng dẫn cài MDM Profile  
**So that** App Kid có quyền quản lý thiết bị qua MDM

**Dependencies**: US-01-04 hoàn tất, US-01-07 hoàn tất (đã pair), thiết bị iOS

**Acceptance Criteria**:

```
AC1: Hướng dẫn cài MDM Profile step-by-step
GIVEN thiết bị là iOS, chưa cài MDM Profile
WHEN đến bước cài MDM trong flow
THEN App Kid hiển thị hướng dẫn:
  Bước 1: Bấm "Tải MDM Profile" (có nút ngay trong app)
  Bước 2: iOS hiện thông báo "Profile đã tải về"
  Bước 3: Vào Settings → General → VPN & Device Management
  Bước 4: Chọn profile → Install → nhập passcode → xác nhận

AC2: Kiểm tra MDM đã enroll thành công
GIVEN người dùng đã cài MDM Profile và quay lại App Kid
WHEN App Kid kiểm tra trạng thái MDM enrollment
THEN App Kid hiển thị "MDM Profile: Đã cài ✓"
AND tự động chuyển sang bước tiếp theo

AC3: Người dùng hủy giữa chừng khi cài MDM
GIVEN đang trong flow cài MDM Profile
WHEN người dùng bấm Cancel ở màn hình iOS Settings
THEN App Kid phát hiện MDM chưa enrolled khi kiểm tra lại
AND hiển thị: "Bạn chưa hoàn tất cài MDM. Tính năng kiểm soát sẽ không hoạt động. Thử lại?"
AND có 2 nút: "Thử lại" và "Bỏ qua"
AND nếu bỏ qua: tiếp tục flow nhưng ghi nhận trạng thái thiếu quyền
```

**Exception & Edge Cases**:

| Scenario | Cách xử lý | Cơ chế Fallback |
|---|---|---|
| iOS không cho phép tải profile trực tiếp từ app | Mở Safari để tải profile thay vì từ trong app | Hướng dẫn tải bằng URL trên Safari |
| MDM Profile bị xóa sau khi cài (trẻ vào Settings xóa) | App Kid phát hiện mất MDM khi check định kỳ, gửi notification cho phụ huynh | Phụ huynh nhận: "MDM Profile bị gỡ trên [Tên thiết bị]" |

**Technical Context & NFR**:
- iOS MDM: App Kid gọi MDM enrollment endpoint sau khi profile được approve bởi iOS
- ⚠ MDM Profile chứa thông tin tổ chức của Viettel — xử lý theo chính sách bảo mật MDM

---

##### US-01-07: [APP KID] Quét QR / Nhập mã hoàn tất ghép nối

**As a** phụ huynh (thao tác trên máy con)  
**I want** quét QR hoặc nhập mã 6 số để liên kết thiết bị con với tài khoản phụ huynh  
**So that** thiết bị con được quản lý bởi App cha mẹ

**Dependencies**: US-01-03 (mã đã sinh, còn hiệu lực), US-01-04 (App Kid đã hiển thị giới thiệu)

**Acceptance Criteria**:

```
AC1: Ghép nối bằng QR thành công
GIVEN mã ghép nối còn hiệu lực
WHEN tôi mở camera trong App Kid và quét QR từ màn hình App cha mẹ
THEN App Kid gửi token lên server
AND server xác nhận token hợp lệ, chưa sử dụng, chưa hết hạn
AND thiết bị con được liên kết với TK phụ huynh
AND App Kid hiển thị màn hình "Ghép nối thành công!"
AND chuyển sang flow xin quyền (US-01-05 hoặc US-01-06)

AC2: Ghép nối bằng mã 6 số thành công
GIVEN mã ghép nối còn hiệu lực
WHEN tôi nhập đúng mã 6 số trong ô nhập liệu của App Kid và bấm "Xác nhận"
THEN kết quả giống AC1

AC3: Nhập mã sai
GIVEN mã ghép nối hợp lệ đang tồn tại
WHEN tôi nhập sai mã 6 số
THEN App Kid hiển thị lỗi inline: "Mã không đúng. Kiểm tra lại."
AND cho phép nhập lại ngay
AND sau 5 lần nhập sai liên tiếp: hiển thị "Quá nhiều lần thử sai. Phụ huynh cần tạo mã mới." và block nhập thêm

AC4: Mã đã hết hạn
GIVEN mã đã quá 10 phút
WHEN tôi nhập mã hoặc quét QR
THEN App Kid hiển thị: "Mã đã hết hạn. Yêu cầu phụ huynh tạo mã mới."
```

**Exception & Edge Cases**:

| Scenario | Cách xử lý | Cơ chế Fallback |
|---|---|---|
| Network lỗi khi xác thực token | Retry tự động 3 lần, mỗi lần cách 5 giây | Sau 3 lần: "Mất kết nối. Thử lại?" |
| Camera không hoạt động | Ẩn tùy chọn QR, chỉ hiển thị ô nhập mã 6 số | — |

---

##### US-01-08: [APP KID] Xem màn hình giới thiệu sau ghép nối

**As a** trẻ (người dùng thiết bị con)  
**I want** xem thông tin ai đang quản lý thiết bị của tôi và những giới hạn đang áp dụng  
**So that** tôi biết thiết bị đang được giám sát và các quy tắc hiện hành

**Dependencies**: US-01-07 hoàn tất, US-01-05 hoặc US-01-06 hoàn tất

**Acceptance Criteria**:

```
AC1: Hiển thị thông tin người quản lý và giới hạn
GIVEN ghép nối và cài quyền đã hoàn tất
WHEN App Kid hiển thị màn hình giới thiệu cuối cùng
THEN màn hình hiển thị:
  - Tên người quản lý (tên phụ huynh từ TK Lá Chắn Số)
  - Danh sách giới hạn đang áp dụng (nếu có), VD: "Thời gian màn hình: 3h/ngày"
  - Nếu chưa có giới hạn nào: "Phụ huynh chưa thiết lập giới hạn"

AC2: Trẻ có SIM Viettel và Antiscam đang bật
GIVEN thiết bị con có SIM Viettel và Antiscam đã kích hoạt
WHEN hiển thị màn hình giới thiệu
THEN thêm mục: "Cảnh báo lừa đảo: Đang hoạt động ✓"
```

---

#### FR-02: Anti-Tamper — Chống gỡ bỏ App Kid

---

##### US-02-01: [APP KID] Chống gỡ bỏ App Kid

**As a** hệ thống (App Kid)  
**I want** ngăn trẻ xóa App Kid mà không có xác nhận phụ huynh  
**So that** khả năng kiểm soát thiết bị con không bị vô hiệu hóa bởi trẻ

**Dependencies**: US-01-05 hoặc US-01-06 hoàn tất (MDM/Device Admin đã cài)

**Acceptance Criteria**:

*iOS — MDM:*

```
AC1: MDM ngăn uninstall trực tiếp
GIVEN App Kid được quản lý bởi MDM Profile đang active
WHEN trẻ cố xóa App Kid từ màn hình home (hold icon → Remove App)
THEN iOS MDM block xóa: tùy chọn "Remove App" bị ẩn hoặc disabled
AND không cần xác nhận thêm vì MDM tự enforce

AC2: Phụ huynh nhận cảnh báo nếu MDM bị gỡ
GIVEN MDM Profile đang active
WHEN trẻ xóa MDM Profile từ Settings → VPN & Device Management
THEN hệ thống gửi notification đến phụ huynh: "MDM Profile đã bị gỡ trên [Tên thiết bị]. App Kid có thể bị xóa."
AND App Kid mất khả năng kiểm soát MDM-based sau khi thiết bị restart
```

*Android — Device Admin:*

```
AC3: Device Admin yêu cầu xác nhận phụ huynh trước khi uninstall
GIVEN App Kid có quyền Device Admin
WHEN trẻ cố uninstall App Kid từ Settings → Ứng dụng
THEN Android yêu cầu revoke Device Admin trước
AND App Kid interceptor hiển thị màn hình: "Cần xác nhận của phụ huynh để gỡ ứng dụng này"
AND yêu cầu nhập PIN do phụ huynh thiết lập

AC4: Phụ huynh xác nhận uninstall qua PIN
GIVEN màn hình yêu cầu PIN đang hiển thị trên máy con
WHEN nhập đúng PIN phụ huynh
THEN App Kid cho phép tiến trình uninstall tiếp tục bình thường

AC5: Nhập sai PIN liên tiếp
GIVEN màn hình yêu cầu PIN đang hiển thị
WHEN nhập sai PIN 3 lần liên tiếp
THEN tính năng gỡ bị khóa 30 phút
AND gửi notification đến phụ huynh: "Có người cố gỡ App Kid trên [Tên thiết bị]"
AND hiển thị thông báo lý do khóa cho người dùng trên máy con
```

**Exception & Edge Cases**:

| Scenario | Cách xử lý | Cơ chế Fallback |
|---|---|---|
| Android: trẻ factory reset máy | App Kid bị xóa cùng máy, không thể ngăn | Phụ huynh nhận notification "Thiết bị offline đột ngột / mất liên lạc" |
| iOS: phụ huynh muốn chủ động gỡ App Kid | Phụ huynh vào App cha mẹ → Hủy ghép nối → hệ thống gửi lệnh unenroll MDM → iOS cho phép xóa | — |

**Technical Context & NFR**:
- iOS: Anti-Tamper dựa trên MDM restriction `allowAppRemoval: false` tại scope App Kid
- Android: Sử dụng `DevicePolicyManager` + intercept uninstall intent
- PIN xác nhận: 4–6 số, do phụ huynh thiết lập (⚠ TBD — OQ-06: xác nhận thời điểm setup PIN trong flow)
- ⚠ Sensitive data: PIN phụ huynh — lưu hashed, không truyền plaintext

---

#### FR-03: Quản lý hồ sơ và thiết bị

---

##### US-03-09: [APP KID] Nhận và thực thi lệnh từ App cha mẹ

**As a** hệ thống (App Kid)  
**I want** nhận và thực thi lệnh từ server do App cha mẹ gửi  
**So that** các thiết lập kiểm soát được cập nhật kịp thời trên thiết bị con

**Dependencies**: US-03-08

**Acceptance Criteria**:

```
AC1: Nhận và thực thi lệnh khi online
GIVEN App Kid đang chạy và có kết nối internet
WHEN server có lệnh mới cho thiết bị này
THEN App Kid nhận lệnh (qua push hoặc polling)
AND thực thi lệnh trong vòng 5 giây
AND gửi acknowledgment về server

AC2: Xử lý lệnh pending khi online lại sau offline
GIVEN thiết bị vừa kết nối internet sau khoảng offline
WHEN có lệnh pending trong queue
THEN App Kid lấy tất cả lệnh pending và thực thi theo thứ tự FIFO

AC3: Lệnh không thể thực thi do thiếu quyền
GIVEN App Kid nhận lệnh nhưng thiếu quyền cần thiết (VD: CA bị gỡ, MDM unenrolled)
WHEN cố thực thi lệnh
THEN gửi error report về server kèm lý do
AND phụ huynh nhận notification: "Không thể áp dụng lệnh trên [Tên thiết bị] — thiếu quyền. Kiểm tra trạng thái thiết bị."
```

---

## 4. Câu hỏi mở và giả định

### Câu hỏi mở (Open Questions)

| ID | Nội dung | Cần từ ai | Ảnh hưởng đến |
|---|---|---|---|
| OQ-01 | Giới hạn số hồ sơ tối đa trên 1 tài khoản là bao nhiêu? Có theo gói dịch vụ không? | Product Owner | US-03-01 AC3 |
| OQ-02 | Heartbeat interval của App Kid là bao nhiêu giây? Ngưỡng offline bao lâu thì gửi notification? | Tech Lead | US-03-05 AC3 |
| OQ-03 | Notification throttle: giới hạn N lần/phút là bao nhiêu? Window time là bao lâu? | Tech Lead | US-04-01 AC3 |
| OQ-04 | TTL của lệnh pending trong command queue là bao lâu? | Tech Lead | US-03-08 |
| OQ-05 | Retention policy: dữ liệu usage/lịch sử hoạt động có bị xóa khi xóa hồ sơ không? Lưu bao lâu? | Legal / Product | US-03-03 |
| OQ-06 | PIN xác nhận uninstall/hủy ghép nối: phụ huynh thiết lập ở bước nào trong flow onboarding? | Product Owner | US-02-01, US-03-07 |
| OQ-07 | FR-06 bị trùng ID: cả Activity Dashboard và Safe Search Enforce đều đang dùng FR-06 — cần xác nhận ID chính xác | Product Owner | Toàn bộ FR-06 |

### Giả định đã đưa ra

| ID | Giả định | Cơ sở | Rủi ro nếu sai |
|---|---|---|---|
| A-01 | App Kid không có màn hình login — hoạt động như agent của TK phụ huynh | User đã confirm | Phải thêm US cho đăng ký/đăng nhập của con |
| A-02 | 1 thiết bị chỉ được pair với 1 hồ sơ tại 1 thời điểm | Logic quản lý thông thường | Conflict rule handling phức tạp nếu cho phép nhiều hồ sơ |
| A-03 | Pairing luôn được khởi tạo từ App cha mẹ (phụ huynh generate mã trước) | User đã confirm Option A | — |
| A-04 | Con không có SIM Viettel vẫn sử dụng được tính năng kiểm soát (FR-03 đến FR-09) | Từ context Lá Chắn Số đã xác nhận | — |
| A-05 | Lệnh quản lý áp dụng real-time khi thiết bị online; pending khi offline | Standard mobile MDM behavior | Nếu cần instant enforcement ngay cả offline: cần cơ chế cache rule cục bộ trên App Kid |
