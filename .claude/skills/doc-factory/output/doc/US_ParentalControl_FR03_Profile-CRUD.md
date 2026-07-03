# Parental Control — FR-03 Quản lý hồ sơ (Tạo / Sửa / Xóa) — Đặc tả User Story

**Version:** 1.0
**Ngày:** 2026-07-03
**Scope:**
- FR-03 — chỉ phần **quản lý hồ sơ trẻ**: Tạo hồ sơ · Chỉnh sửa hồ sơ · Xóa hồ sơ
- **Ngoài scope lần này** (thuộc FR-03 nhưng viết riêng): danh sách thiết bị, trạng thái online/offline, ghép/hủy ghép nối thiết bị, gửi/nhận lệnh quản lý

---

## 1. Executive Summary

Tài liệu đặc tả User Story cho nhóm chức năng **CRUD hồ sơ trẻ** trong **FR-03: Quản lý hồ sơ và thiết bị** của giải pháp **Parental Control**.

Hồ sơ trẻ là **đơn vị trung tâm** của toàn bộ hệ thống: mọi rule kiểm soát (FR-05 lọc web, FR-07 quản lý app/thời gian, FR-09 lịch), báo cáo (FR-06), và thiết bị con đều gắn vào một hồ sơ. Vì vậy CRUD hồ sơ vừa là bước khởi tạo, vừa là điểm chi phối vòng đời dữ liệu con.

**Liên kết chéo quan trọng:**
- **Tạo hồ sơ** đồng thời sinh mã/QR ghép nối riêng cho hồ sơ đó — chi tiết luồng ghép nối nằm ở **US-04-P (FR-01 Pairing)**. Tài liệu này chỉ đặc tả phần **hồ sơ**, tham chiếu tới US-04-P chỗ giao nhau.
- **Xóa hồ sơ** kéo theo **gỡ ghép nối toàn bộ thiết bị** của hồ sơ đó (quyết định sản phẩm — xem bên dưới) → giao với **US-07-P (FR-02 Hủy ghép nối)**.

**Actor:**
- **Phụ huynh** — người dùng App Parents (đã đăng nhập, có session hợp lệ).
- **Hệ thống** — backend server Parental Control.

**Quyết định sản phẩm đã chốt (theo trao đổi với PO):**

| Hạng mục | Quyết định |
|---|---|
| Giới hạn số hồ sơ | **Có giới hạn** số hồ sơ tối đa / tài khoản phụ huynh. Giá trị cụ thể: **TBD — cần PM chốt** (đề xuất mặc định: 10). |
| Xóa hồ sơ đang có thiết bị | **Cho xóa + tự gỡ ghép nối** toàn bộ thiết bị của hồ sơ (cascade unpair). Bắt buộc xác nhận mạnh trước khi xóa. |

⚠ **Sensitive data. Legal check required** — hồ sơ chứa dữ liệu cá nhân của **trẻ vị thành niên** (tên, ngày sinh, ảnh, SĐT). Cần pháp chế rà soát: cơ sở pháp lý xử lý dữ liệu trẻ em, sự đồng thuận của người giám hộ, và chính sách lưu trữ/xóa dữ liệu.

---

## 2. User Story List

### APP PARENTS — FR-03 (Profile CRUD)

| User Story ID | User Story | Actor | Điều kiện trước | Điều kiện sau |
|---|---|---|---|---|
| US-PRF-01 | Tạo hồ sơ trẻ | Phụ huynh | Đã đăng nhập (US-02-P/FR-01); chưa đạt giới hạn số hồ sơ | Hồ sơ mới được lưu + sinh sẵn mã/QR ghép nối (US-04-P) |
| US-PRF-02 | Chỉnh sửa hồ sơ trẻ | Phụ huynh | Có ít nhất 1 hồ sơ đã tạo | Thông tin hồ sơ được cập nhật |
| US-PRF-03 | Xóa hồ sơ trẻ | Phụ huynh | Có ít nhất 1 hồ sơ đã tạo | Hồ sơ bị xóa; thiết bị gắn kèm (nếu có) được gỡ ghép nối |

---

## 3. Chi tiết User Story

### 3.1 FR-03 Quản lý hồ sơ — APP PARENTS

---

#### US-PRF-01: Tạo hồ sơ trẻ

1. **US statement**
**As a** phụ huynh
**I want** tạo hồ sơ cho từng đứa con với thông tin cơ bản
**So that** tôi có một đơn vị quản lý riêng để gắn thiết bị và áp các rule kiểm soát cho đúng đứa trẻ

2. **Dependencies**: US-02-P (đã đăng nhập); giao với US-04-P (sinh mã/QR ghép nối khi tạo hồ sơ)

3. **Acceptance Criteria**:
```
AC1: Tạo hồ sơ thành công
GIVEN tôi đã đăng nhập và chưa đạt giới hạn số hồ sơ
WHEN tôi nhập thông tin hồ sơ (Tên: bắt buộc; Giới tính, Ngày sinh, Ảnh đại diện, SĐT: tùy chọn) và bấm "Lưu"
THEN hệ thống tạo hồ sơ mới với trạng thái "Chưa gắn thiết bị"
AND hệ thống sinh kèm 1 mã/QR ghép nối DUY NHẤT cho hồ sơ (theo US-04-P)
AND hồ sơ mới xuất hiện trong danh sách hồ sơ

AC2: Thiếu trường bắt buộc
GIVEN tôi ở màn tạo hồ sơ
WHEN tôi để trống Tên và bấm "Lưu"
THEN hiển thị lỗi inline "Vui lòng nhập tên" và nút "Lưu" bị vô hiệu

AC3: Đạt giới hạn số hồ sơ
GIVEN tôi đã tạo đủ số hồ sơ tối đa cho phép   ← Hạn mức: TBD, cần PM chốt
WHEN tôi bấm "Thêm hồ sơ"
THEN hệ thống chặn tạo mới và hiển thị "Bạn đã đạt số hồ sơ tối đa"

AC4: Ảnh đại diện không hợp lệ
GIVEN tôi chọn ảnh đại diện
WHEN ảnh sai định dạng hoặc vượt kích thước cho phép   ← Định dạng/kích thước: TBD, cần PM/Tech Lead
THEN hiển thị lỗi "Ảnh không hợp lệ" và không đính kèm ảnh; hồ sơ vẫn tạo được với ảnh mặc định

AC5: SĐT sai định dạng (nếu nhập)
GIVEN tôi nhập SĐT cho hồ sơ
WHEN SĐT sai định dạng
THEN hiển thị lỗi inline "SĐT không hợp lệ"; SĐT là trường tùy chọn nên có thể bỏ trống để lưu
```

4. **Exception & Edge Cases**:

| Scenario | Cách xử lý | Cơ chế Fallback |
|:---|:---|:---|
| Mất mạng khi lưu hồ sơ | Không gọi được server → không sinh được mã ghép nối | Hiển thị lỗi + "Thử lại"; hồ sơ **chỉ lưu khi sinh mã thành công** (đồng bộ US-04-P) |
| Trùng tên hồ sơ | **Cho phép trùng tên** (2 con trùng tên là hợp lệ); phân biệt bằng ảnh/ngày sinh | Không chặn; có thể gợi ý "Đã có hồ sơ cùng tên" (tùy PM) |
| Bấm "Lưu" nhiều lần (double submit) | Vô hiệu nút sau lần bấm đầu + idempotency ở server | Chỉ tạo 1 hồ sơ, không nhân bản |
| Ngày sinh ở tương lai | Validate ngày sinh ≤ hôm nay | Lỗi inline "Ngày sinh không hợp lệ" |

5. **Mô tả giao diện**:

| Trường UI | Mô tả | Kiểu / Validate | API mapping | Database mapping |
|---|---|---|---|---|
| - | Tên trẻ | Text input, **bắt buộc**, max 50 ký tự | Tạo hồ sơ · `POST /api/profiles` | Bảng `child_profile`: `name` |
| - | Giới tính | Dropdown/Radio (Nam/Nữ/Khác), tùy chọn | Tạo hồ sơ · `POST /api/profiles` | Bảng `child_profile`: `gender` |
| - | Ngày sinh | Date picker, tùy chọn, ≤ hôm nay | Tạo hồ sơ · `POST /api/profiles` | Bảng `child_profile`: `birthday` |
| - | Ảnh đại diện | Image upload, tùy chọn, định dạng/size: TBD | Upload ảnh · `POST /api/profiles/avatar` | Bảng `child_profile`: `avatar_url` |
| - | SĐT của trẻ | Text input, tùy chọn, regex đầu số VN | Tạo hồ sơ · `POST /api/profiles` | Bảng `child_profile`: `phone` |
| - | Lưu hồ sơ | Button, mặc định disable. Enable khi Tên hợp lệ | Tạo hồ sơ · `POST /api/profiles` | Bảng `child_profile` |

6. **Technical Context & NFR**:
- ⚠ Dữ liệu trẻ vị thành niên → mã hóa khi truyền, tuân thủ chính sách bảo vệ dữ liệu trẻ em (legal).
- Tạo hồ sơ và sinh mã ghép nối là **1 giao dịch (atomic)** — thất bại 1 trong 2 thì rollback, không để lại hồ sơ "mồ côi" không có mã.
- Giới hạn số hồ sơ enforce ở **server** (không chỉ ẩn nút phía client).
- Initial state: nếu tài khoản **chưa có hồ sơ nào** → hiển thị empty state "Chưa có hồ sơ nào. Tạo hồ sơ đầu tiên cho con".

---

#### US-PRF-02: Chỉnh sửa hồ sơ trẻ

1. **US statement**
**As a** phụ huynh
**I want** chỉnh sửa thông tin hồ sơ con (tên, ảnh, giới tính, ngày sinh, SĐT)
**So that** thông tin luôn đúng khi con thay đổi hoặc tôi nhập sai lúc tạo

2. **Dependencies**: US-PRF-01 (hồ sơ đã tồn tại)

3. **Acceptance Criteria**:
```
AC1: Sửa và lưu thành công
GIVEN tôi mở màn chi tiết một hồ sơ đã tạo
WHEN tôi thay đổi một hoặc nhiều trường (tên/ảnh/giới tính/ngày sinh/SĐT) và bấm "Lưu"
THEN hệ thống cập nhật thông tin hồ sơ
AND danh sách hồ sơ + các màn liên quan hiển thị thông tin mới

AC2: Bỏ trống trường bắt buộc
GIVEN tôi đang sửa hồ sơ
WHEN tôi xóa Tên và bấm "Lưu"
THEN hiển thị lỗi inline "Vui lòng nhập tên" và không cho lưu

AC3: Thoát mà không lưu
GIVEN tôi đã sửa vài trường nhưng chưa lưu
WHEN tôi bấm "Quay lại" / thoát màn hình
THEN hệ thống hỏi xác nhận "Hủy thay đổi chưa lưu?" trước khi rời đi

AC4: Không đổi mã ghép nối
GIVEN tôi sửa thông tin hồ sơ
WHEN tôi lưu
THEN mã/QR ghép nối và trạng thái thiết bị đã gắn KHÔNG bị ảnh hưởng (sửa hồ sơ ≠ tạo lại mã)
```

4. **Exception & Edge Cases**:

| Scenario | Cách xử lý | Cơ chế Fallback |
|:---|:---|:---|
| Mất mạng khi lưu chỉnh sửa | Không gọi được server | Giữ nguyên dữ liệu đang nhập, hiển thị "Thử lại", không mất thay đổi |
| Hồ sơ bị xóa ở thiết bị/phiên khác khi đang sửa | Server trả lỗi "không tồn tại" | Thông báo "Hồ sơ không còn tồn tại" + quay về danh sách |
| Ảnh mới upload lỗi giữa chừng | Không cập nhật ảnh | Giữ ảnh cũ, báo "Cập nhật ảnh thất bại, thử lại" |
| Sửa đồng thời trên 2 thiết bị phụ huynh | Ghi theo nguyên tắc last-write-wins (hoặc version check) | Cảnh báo "Hồ sơ vừa được cập nhật ở nơi khác" nếu dùng version check |

5. **Mô tả giao diện**:

| Trường UI | Mô tả | Kiểu / Validate | API mapping | Database mapping |
|---|---|---|---|---|
| - | Load thông tin hồ sơ hiện tại | Prefill toàn bộ trường | Xem chi tiết · `GET /api/profiles/{id}` | Bảng `child_profile`: tất cả trường |
| - | Tên trẻ | Text input, **bắt buộc**, max 50 ký tự | Cập nhật · `PUT /api/profiles/{id}` | Bảng `child_profile`: `name` |
| - | Ảnh / Giới tính / Ngày sinh / SĐT | Như US-PRF-01, tùy chọn | Cập nhật · `PUT /api/profiles/{id}` | Bảng `child_profile`: `avatar_url`, `gender`, `birthday`, `phone` |
| - | Lưu thay đổi | Button, enable khi có thay đổi + Tên hợp lệ | Cập nhật · `PUT /api/profiles/{id}` | Bảng `child_profile` |

6. **Technical Context & NFR**:
- Sửa hồ sơ **không** đụng tới pairing-token / liên kết thiết bị.
- ⚠ Dữ liệu trẻ vị thành niên (như US-PRF-01).

---

#### US-PRF-03: Xóa hồ sơ trẻ

1. **US statement**
**As a** phụ huynh
**I want** xóa hồ sơ khi không còn dùng (con lớn, đổi máy, tạo nhầm)
**So that** danh sách gọn gàng và dữ liệu con không cần thiết được dọn đi

2. **Dependencies**: US-PRF-01 (hồ sơ tồn tại); giao với US-07-P (hủy ghép nối) khi hồ sơ đang có thiết bị

3. **Acceptance Criteria**:
```
AC1: Xóa hồ sơ không có thiết bị
GIVEN tôi chọn một hồ sơ chưa gắn thiết bị nào
WHEN tôi bấm "Xóa hồ sơ" và xác nhận
THEN hệ thống xóa hồ sơ và mã ghép nối kèm theo
AND hồ sơ biến mất khỏi danh sách

AC2: Xóa hồ sơ ĐANG có thiết bị (cascade unpair)
GIVEN hồ sơ đang gắn 1 (hoặc nhiều) thiết bị con đang được quản lý
WHEN tôi bấm "Xóa hồ sơ"
THEN hệ thống hiển thị cảnh báo mạnh: "Xóa hồ sơ sẽ GỠ QUẢN LÝ toàn bộ thiết bị của con và xóa dữ liệu liên quan. Hành động không thể hoàn tác."
AND yêu cầu bước xác nhận mạnh (gõ lại tên hồ sơ HOẶC xác thực lại — theo PM chốt)
WHEN tôi xác nhận
THEN hệ thống gỡ ghép nối toàn bộ thiết bị (gửi lệnh gỡ quản lý xuống App Kid — theo US-07-P)
AND xóa hồ sơ + mã ghép nối + các rule gắn với hồ sơ
AND hồ sơ biến mất khỏi danh sách

AC3: Hủy thao tác xóa
GIVEN tôi đang ở dialog xác nhận xóa
WHEN tôi bấm "Hủy"
THEN không có gì thay đổi, đóng dialog

AC4: Thiết bị offline khi xóa
GIVEN hồ sơ có thiết bị đang offline
WHEN tôi xóa hồ sơ
THEN lệnh gỡ quản lý vào hàng đợi, tự áp dụng khi thiết bị online lại (đồng bộ US-07-P);
     hồ sơ vẫn được xóa khỏi tài khoản phụ huynh ngay
```

4. **Exception & Edge Cases**:

| Scenario | Cách xử lý | Cơ chế Fallback |
|:---|:---|:---|
| Mất mạng khi xóa | Không gọi được server → không xóa | Báo "Xóa thất bại, thử lại"; không xóa nửa vời phía client |
| Lệnh gỡ quản lý không tới máy con (offline kéo dài) | Giữ hàng đợi + retry (như US-07-P) | Máy con tự bỏ quản lý ở lần online kế; nếu con factory reset trước đó → coi như đã gỡ |
| Xóa nhầm hồ sơ | Không có undo (hard delete) → chặn bằng xác nhận mạnh ở AC2 | (Tùy PM) cân nhắc soft-delete + thời gian khôi phục — xem Open Question |
| Xóa hồ sơ cuối cùng | Cho phép; quay về empty state | Hiển thị "Chưa có hồ sơ nào. Tạo hồ sơ đầu tiên cho con" |
| Con đang cố lách lúc bị xóa | Việc gỡ quản lý là chủ đích của phụ huynh | Ghi log sự kiện gỡ quản lý (đồng bộ FR-02) |

5. **Mô tả giao diện**:

| Trường UI | Mô tả | Kiểu / Validate | API mapping | Database mapping |
|---|---|---|---|---|
| - | Nút "Xóa hồ sơ" | Button (kiểu cảnh báo/đỏ) | - | - |
| - | Dialog xác nhận | Hiển thị hệ quả (gỡ thiết bị + xóa dữ liệu) | Kiểm tra thiết bị gắn · `GET /api/profiles/{id}/devices` | Bảng `paired_device`: `profile_id` |
| - | Xác nhận mạnh | Gõ lại tên hồ sơ hoặc xác thực lại | - | - |
| - | Thực thi xóa | Xóa hồ sơ + cascade gỡ ghép nối | Xóa hồ sơ · `DELETE /api/profiles/{id}` | Bảng `child_profile` (xóa), `paired_device` (gỡ liên kết), rule liên quan |

6. **Technical Context & NFR**:
- ⚠ Xóa là hành động **không hồi phục** + gỡ quản lý thiết bị → bắt buộc xác nhận mạnh.
- Xóa hồ sơ = giao dịch cascade ở server: gỡ ghép nối thiết bị (US-07-P) → xóa rule (FR-05/07/09 gắn hồ sơ) → xóa hồ sơ + mã.
- **Chính sách lưu trữ dữ liệu sau xóa** (log/lịch sử của con) cần theo quy định pháp lý — xem Open Question + legal.

---

## 4. Câu hỏi mở và giả định

### 4.1 Câu hỏi mở (cần stakeholder chốt)

| # | Câu hỏi | Owner |
|---|---|---|
| OQ-01 | Giới hạn số hồ sơ tối đa / tài khoản phụ huynh = bao nhiêu? (đề xuất mặc định 10) | PM |
| OQ-02 | Ảnh đại diện: định dạng & kích thước tối đa cho phép? | PM / Tech Lead |
| OQ-03 | Xác nhận mạnh khi xóa: gõ lại tên hồ sơ hay xác thực lại (OTP/PIN)? | PM |
| OQ-04 | Xóa hồ sơ là **hard delete** hay **soft delete** (có thời gian khôi phục)? | PM |
| OQ-05 | Sau khi xóa hồ sơ, dữ liệu lịch sử của con (log web/app, báo cáo) giữ lại hay xóa hẳn? Theo quy định pháp lý nào? | PM / Legal |
| OQ-06 | Chỉnh sửa đồng thời trên nhiều thiết bị phụ huynh: last-write-wins hay version check + cảnh báo? | Tech Lead |
| OQ-07 | Có cho phép nhiều tài khoản phụ huynh cùng quản lý 1 hồ sơ không? (ảnh hưởng quyền sửa/xóa) | PM |

### 4.2 Giả định đã đưa ra

- **Tên** là trường bắt buộc duy nhất; các trường còn lại (giới tính, ngày sinh, ảnh, SĐT) tùy chọn — suy từ mô tả "Nhập thông tin trẻ".
- **Cho phép trùng tên** giữa các hồ sơ (2 con trùng tên là hợp lệ).
- Mỗi hồ sơ gắn tối đa **1 thiết bị** ở giai đoạn hiện tại (đồng bộ ràng buộc 1 hồ sơ ↔ 1 thiết bị của US-04-P) — nhưng AC xóa vẫn viết theo hướng "nhiều thiết bị" để an toàn nếu ràng buộc thay đổi.
- Sửa hồ sơ không ảnh hưởng mã ghép nối / liên kết thiết bị.
- Toàn bộ giá trị số (hạn mức hồ sơ, size ảnh) đang để **TBD** — chưa có nguồn trong feature list, cần PM cấp số chính thức.
