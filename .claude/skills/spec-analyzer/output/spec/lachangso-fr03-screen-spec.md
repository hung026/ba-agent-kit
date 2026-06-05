# Lá Chắn Số — Đặc tả màn hình: FR-03 Quản lý hồ sơ & thiết bị (APP PARENTS)

**Platform**: Mobile App  
**Scope**: US-03-01 · US-03-02 · US-03-03 · US-03-04 · US-03-06 · US-03-07  
**Tổng**: 6 màn hình · 1 modal · 3 dialog · 4 toast

---

## Tổng quan module

| # | Module | Màn hình | Mô tả ngắn |
|---|--------|----------|-------------|
| 03 | Quản lý hồ sơ & thiết bị | S-0301 ~ S-0306 | Tạo/sửa/xóa hồ sơ trẻ, xem và quản lý thiết bị liên kết |
| — | Overlay | M-0301, P-0301 ~ P-0303, T-0301 ~ T-0304 | Modal PIN, dialog xác nhận, toast phản hồi |

---

## Màn hình chi tiết

---

### S-0301: Danh sách hồ sơ

Đã có sẵn. Bỏ qua

---

### S-0302: Tạo hồ sơ trẻ

**Mục đích**: Nhập thông tin để tạo một hồ sơ trẻ mới.

**Bố cục**:
- Trên: Header "Thêm hồ sơ" + nút "Hủy" góc trái + nút "Lưu" góc phải (text, disabled khi tên trống)
- Giữa (cuộn): Khu vực ảnh đại diện + form nhập thông tin

**Thành phần**:
| # | Tên | Loại | Nội dung / Mô tả | Tương tác |
|---|-----|------|-------------------|-----------|
| 1 | Ảnh đại diện | ảnh tròn + nút | Ảnh placeholder (người xám mặc định), đường kính ~96px, căn giữa trên form. | chỉ hiển thị |
| 2 | Label tên | text nhỏ xám | "Tên trẻ" + dấu hoa thị đỏ (*) | chỉ hiển thị |
| 3 | Input tên | input text | Placeholder "Nhập tên trẻ", bàn phím mặc định, tối đa 50 ký tự | nhập text |
| 4 | Lỗi tên | text đỏ nhỏ | "Tên là bắt buộc" — xuất hiện dưới input khi bấm Lưu mà tên trống | chỉ hiển thị (ẩn mặc định) |
| 5 | Label ngày sinh | text nhỏ xám | "Ngày sinh (tùy chọn)" | chỉ hiển thị |
| 6 | Input ngày sinh | input date | Placeholder "DD/MM/YYYY", icon lịch nhỏ bên phải trong field | bấm → mở date picker hệ thống |

**Trạng thái hiển thị**:
| Trạng thái | Khác gì so với mặc định |
|------------|------------------------|
| Đang upload ảnh | Spinner trắng overlay trên vùng ảnh đại diện, nút Lưu disabled |
| Lỗi validation | Text đỏ "Tên là bắt buộc" hiện ngay dưới input tên, viền input chuyển đỏ |
| Đang lưu | Nút Lưu hiện spinner nhỏ, không bấm được, form mờ đi |

**Nội dung mẫu**:
- Tên: "Con hàng xóm"
- Ngày sinh: "15/03/2018"

---

### S-0303: Chi tiết hồ sơ

**Mục đích**: Xem thông tin hồ sơ và danh sách thiết bị liên kết; điểm vào để chỉnh sửa, xóa hồ sơ, thêm hoặc xem thiết bị.

**Bố cục**:
- Trên: Header tên trẻ + nút back góc trái + icon 3 chấm (⋯) góc phải
- Giữa (cuộn): Khu vực thông tin hồ sơ → Divider → Section danh sách thiết bị

**Thành phần**:
| # | Tên | Loại | Nội dung / Mô tả | Tương tác |
|---|-----|------|-------------------|-----------|
| 1 | Ảnh đại diện | ảnh tròn | Đường kính ~80px, căn giữa | chỉ hiển thị |
| 2 | Tên trẻ | text đậm lớn | "Con hàng xóm" — căn giữa | chỉ hiển thị |
| 3 | Ngày sinh / tuổi | text xám nhỏ | "15/03/2018 · 8 tuổi" — căn giữa. Ẩn nếu chưa nhập ngày sinh | chỉ hiển thị |
| 4 | Nút Chỉnh sửa | nút phụ outline | "Chỉnh sửa hồ sơ" — căn giữa, dưới thông tin | bấm → đi S-0304 |
| 5 | Divider | đường kẻ ngang | Ngăn vùng info và vùng thiết bị | chỉ hiển thị |
| 6 | Tiêu đề section thiết bị | text đậm | "Thiết bị liên kết (2)" — số thiết bị trong ngoặc, cập nhật tự động | chỉ hiển thị |
| 7 | Card thiết bị | list item | Icon nền tảng trái (Android/iOS) + Tên thiết bị (đậm) + Badge "Đang online" xanh lá hoặc "Offline" xám + dòng phụ "Lần cuối: X phút trước" (chỉ hiện khi offline) + mũi tên phải | bấm → đi S-0305 |
| 8 | Nút Thêm thiết bị | nút outline nhỏ | "＋ Thêm thiết bị" — ở cuối danh sách thiết bị | bấm → đi S-0306 |
| 9 | Menu ⋯ (action sheet) | icon nút header | Icon 3 chấm dọc, góc phải header | bấm → hiện action sheet bên dưới: "Chỉnh sửa hồ sơ" / "Xóa hồ sơ" (đỏ) / "Hủy" |
| 10 | Action "Xóa hồ sơ" | menu item đỏ | Text đỏ trong action sheet | bấm → mở P-0302 |

**Trạng thái hiển thị**:
| Trạng thái | Khác gì so với mặc định |
|------------|------------------------|
| Chưa có thiết bị | Thay danh sách bằng: hình minh họa nhỏ + "Chưa có thiết bị nào." + "Thêm thiết bị để bắt đầu quản lý." + nút "＋ Thêm thiết bị" |

**Nội dung mẫu**:
- Thiết bị 1: Android · "Samsung Galaxy A54" · Badge "Đang online" xanh
- Thiết bị 2: iOS · "iPhone 13" · Badge "Offline" xám · "Lần cuối: 3 phút trước"

---

### S-0304: Chỉnh sửa hồ sơ

**Mục đích**: Sửa tên, ảnh đại diện, ngày sinh của hồ sơ trẻ.

**Bố cục**:
- Trên: Header "Chỉnh sửa hồ sơ" + nút "Hủy" góc trái + nút "Lưu" góc phải
- Giữa (cuộn): Form tương tự S-0302, nhưng tất cả field điền sẵn dữ liệu hiện tại

**Thành phần**:
| # | Tên | Loại | Nội dung / Mô tả | Tương tác |
|---|-----|------|-------------------|-----------|
| 1 | Ảnh đại diện | ảnh tròn + nút | Hiển thị ảnh đang có, icon camera nhỏ góc dưới phải | bấm → action sheet: "Chụp ảnh" / "Chọn từ thư viện" / "Xóa ảnh" |
| 2 | Input tên | input text | Điền sẵn tên hiện tại, vd "Con hàng xóm" | chỉnh sửa text |
| 3 | Input ngày sinh | input date | Điền sẵn ngày sinh, vd "15/03/2018" | bấm → date picker |
| 4 | Hủy | text nút header | "Hủy" — góc trái header | Nếu không có thay đổi: quay về S-0303 ngay · Nếu đã thay đổi: mở P-0301 |
| 5 | Lưu | text nút header | "Lưu" — góc phải header, disabled khi tên trống | bấm → lưu, hiện T-0301, quay về S-0303 |

**Nội dung mẫu**:
- Tên đang sửa: "Con hàng xóm" → đổi thành "Minh Khôi"
- Ngày sinh: "15/03/2018"

---

### S-0305: Chi tiết thiết bị

**Mục đích**: Xem thông tin và trạng thái thiết bị con; thực hiện hủy ghép nối.

**Bố cục**:
- Trên: Header tên thiết bị + nút back
- Giữa (cuộn): Khu vực trạng thái → Nhóm thông tin → Nút nguy hiểm

**Thành phần**:
| # | Tên | Loại | Nội dung / Mô tả | Tương tác |
|---|-----|------|-------------------|-----------|
| 1 | Icon nền tảng | icon lớn | Icon Android hoặc iOS, kích thước ~64px, căn giữa trên cùng vùng content | chỉ hiển thị |
| 2 | Tên thiết bị | text đậm lớn | "Samsung Galaxy A54" — căn giữa | chỉ hiển thị |
| 3 | Badge trạng thái | badge pill | "Đang online" (nền xanh, chữ trắng) hoặc "Offline" (nền xám, chữ trắng) — căn giữa | chỉ hiển thị |
| 4 | Thời gian offline | text xám nhỏ | "Lần cuối online: 3 phút trước" — chỉ hiện khi offline | chỉ hiển thị |
| 5 | Nhóm thông tin | grouped list | Các dòng thông tin: "Hệ điều hành" · "Android 13" / "Hồ sơ" · "Con hàng xóm" / "Trạng thái quản lý" · "CA Certificate: Đã cài ✓" hoặc "MDM Profile: Đã cài ✓" | chỉ hiển thị |
| 6 | Hủy ghép nối | nút nguy hiểm | "Hủy ghép nối" — full width, text đỏ, viền đỏ, nằm cuối màn hình sau một khoảng trống | bấm → mở M-0301 |

**Trạng thái hiển thị**:
| Trạng thái | Khác gì so với mặc định |
|------------|------------------------|
| Thiếu quyền (CA/MDM bị gỡ) | Dòng "Trạng thái quản lý" hiện icon cảnh báo vàng + "CA Certificate: Chưa cài ⚠" — nền row màu vàng nhạt |

---

### S-0306: Chọn thiết bị để gắn [suy luận]

**Mục đích**: Cho phụ huynh chọn một thiết bị đã pair để gắn vào hồ sơ trẻ đang xem.

**Bố cục**:
- Trên: Header "Chọn thiết bị" + nút "Hủy" góc trái
- Giữa (cuộn): Danh sách tất cả thiết bị đã pair
- Dưới (cố định): Nút "Xác nhận"

**Thành phần**:
| # | Tên | Loại | Nội dung / Mô tả | Tương tác |
|---|-----|------|-------------------|-----------|
| 1 | Card thiết bị — chưa gắn hồ sơ | list item selectable | Icon nền tảng + Tên thiết bị + Badge online/offline · Radio button bên phải | bấm → chọn (radio) |
| 2 | Card thiết bị — đang thuộc hồ sơ khác | list item selectable | Tương tự, thêm dòng xám nhỏ bên dưới tên: "Đang thuộc: Nguyễn Bảo Anh" · Radio button bên phải | bấm → chọn → mở P-0303 trước khi confirm |
| 3 | Xác nhận | nút chính | "Xác nhận" — full width, disabled khi chưa chọn thiết bị | bấm → gắn thiết bị vào hồ sơ, quay lại S-0303 |

**Trạng thái hiển thị**:
| Trạng thái | Khác gì so với mặc định |
|------------|------------------------|
| Không có thiết bị nào đã pair | Empty state: "Chưa có thiết bị nào được ghép nối." + nút "Ghép nối thiết bị mới" (→ flow US-01-03) |

**Nội dung mẫu**:
- "iPhone 13" · iOS · Offline · "Đang thuộc: Nguyễn Bảo Anh"
- "OPPO Reno 8" · Android · Online

---

## Modal

---

### M-0301: Nhập PIN xác nhận

**Mở từ**: S-0305 → bấm "Hủy ghép nối"  
**Kiểu**: Bottom sheet (kéo lên từ dưới)  
**Mục đích**: Xác minh PIN phụ huynh trước khi hủy ghép nối thiết bị.

**Thành phần**:
| # | Tên | Loại | Nội dung / Mô tả | Tương tác |
|---|-----|------|-------------------|-----------|
| 1 | Thanh kéo | thanh ngang xám | Căn giữa trên cùng bottom sheet | vuốt xuống → đóng |
| 2 | Tiêu đề | text đậm | "Nhập PIN xác nhận" | chỉ hiển thị |
| 3 | Mô tả | text xám | "Nhập PIN phụ huynh để hủy ghép nối [Tên thiết bị]" | chỉ hiển thị |
| 4 | PIN input | 6 ô tròn | Mỗi ô hiện dấu chấm (●) khi nhập. Tự động mở bàn phím số | nhập số |
| 5 | Thông báo lỗi | text đỏ | "PIN không đúng. Còn X lần thử." — ẩn mặc định, hiện sau mỗi lần sai | chỉ hiển thị |
| 6 | Hủy | text nút | "Hủy" — căn giữa, dưới PIN input | bấm → đóng bottom sheet |

**Hành động**:
| Kết quả | Hành vi UI |
|---------|------------|
| PIN đúng | Đóng modal → hủy ghép nối → quay về S-0303 (thiết bị biến khỏi danh sách) |
| PIN sai 1–2 lần | Ô PIN rung nhẹ (shake animation), xóa PIN, hiện text lỗi đỏ |
| PIN sai lần 3 | Đóng modal, hiện T-0304, tính năng hủy ghép nối bị khóa 30 phút (nút "Hủy ghép nối" ở S-0305 bị disabled) |

---

## Dialog

---

### P-0301: Xác nhận bỏ thay đổi

**Mở từ**: S-0304 → bấm "Hủy" khi đã có thay đổi chưa lưu  
**Tiêu đề**: "Bỏ thay đổi chưa lưu?"  
**Nội dung**: "Mọi thay đổi bạn đã nhập sẽ không được lưu."  
**Nút**: "Bỏ thay đổi" (màu đỏ / destructive) · "Tiếp tục chỉnh sửa"

---

### P-0302: Xác nhận xóa hồ sơ

**Mở từ**: S-0303 → icon ⋯ → "Xóa hồ sơ"  
**Tiêu đề**: "Xóa hồ sơ [Tên trẻ]?"  
**Nội dung**:
```
• 2 thiết bị sẽ bị hủy liên kết
• Tất cả dữ liệu của hồ sơ này sẽ bị xóa vĩnh viễn
```
**Nút**: "Xác nhận xóa" (đỏ) · "Hủy"

---

### P-0303: Cảnh báo chuyển thiết bị sang hồ sơ khác

**Mở từ**: S-0306 → chọn thiết bị đang thuộc hồ sơ khác → bấm "Xác nhận"  
**Tiêu đề**: "Chuyển thiết bị?"  
**Nội dung**: "Thiết bị này đang thuộc hồ sơ [Con trai]. Chuyển sang hồ sơ mới sẽ xóa liên kết cũ và xóa toàn bộ rule của hồ sơ cũ."  
**Nút**: "Xác nhận chuyển" · "Hủy"

---

## Toast

---

### T-0301: Lưu chỉnh sửa thành công

**Hiện khi**: S-0304 → bấm "Lưu" thành công  
**Nội dung**: "Đã lưu thay đổi"  
**Kiểu**: thành công (xanh lá)

---

### T-0302: Xóa hồ sơ thành công

**Hiện khi**: P-0302 → bấm "Xác nhận xóa" thành công  
**Nội dung**: "Hồ sơ đã được xóa"  
**Kiểu**: thành công (xanh lá)

---

### T-0303: Upload ảnh thất bại

**Hiện khi**: S-0302 hoặc S-0304 → chọn ảnh → mạng lỗi, upload thất bại  
**Nội dung**: "Không thể tải ảnh, thử lại sau"  
**Kiểu**: lỗi (đỏ)

---

### T-0304: Khóa PIN nhập sai quá nhiều

**Hiện khi**: M-0301 → nhập sai PIN 3 lần liên tiếp  
**Nội dung**: "Nhập sai quá nhiều lần. Thử lại sau 30 phút."  
**Kiểu**: lỗi (đỏ)

---

## Luồng chuyển màn

| Từ | Bấm | Đến | Điều kiện |
|----|-----|-----|-----------|
| S-0301 | Card hồ sơ | S-0303 | — |
| S-0301 | "＋ Thêm hồ sơ" | S-0302 | Chưa đạt giới hạn hồ sơ |
| S-0302 | "Lưu" | S-0303 | Form hợp lệ (có tên) |
| S-0302 | "Hủy" | S-0301 | — |
| S-0303 | "Chỉnh sửa hồ sơ" | S-0304 | — |
| S-0303 | Card thiết bị | S-0305 | — |
| S-0303 | "＋ Thêm thiết bị" | S-0306 | — |
| S-0303 | ⋯ → "Xóa hồ sơ" | P-0302 | — |
| S-0304 | "Lưu" | S-0303 + T-0301 | Form hợp lệ |
| S-0304 | "Hủy" (không thay đổi) | S-0303 | Không có thay đổi |
| S-0304 | "Hủy" (có thay đổi) | P-0301 | Đã chỉnh sửa ≥ 1 field |
| S-0305 | "Hủy ghép nối" | M-0301 | — |
| S-0306 | Chọn thiết bị chưa gắn → "Xác nhận" | S-0303 | Thiết bị chưa thuộc hồ sơ nào |
| S-0306 | Chọn thiết bị thuộc hồ sơ khác → "Xác nhận" | P-0303 | Thiết bị đang thuộc hồ sơ khác |
| M-0301 | PIN đúng | S-0303 (thiết bị bị xóa khỏi danh sách) | — |
| M-0301 | PIN sai × 3 | S-0305 + T-0304 (nút Hủy ghép nối bị khóa) | — |
| P-0301 | "Bỏ thay đổi" | S-0303 | — |
| P-0301 | "Tiếp tục chỉnh sửa" | S-0304 | — |
| P-0302 | "Xác nhận xóa" | S-0301 + T-0302 | — |
| P-0302 | "Hủy" | S-0303 | — |
| P-0303 | "Xác nhận chuyển" | S-0303 (thiết bị được gắn) | — |
| P-0303 | "Hủy" | S-0306 | — |

---

## Luồng có điều kiện

| Điều kiện | Luồng |
|-----------|-------|
| Chưa có hồ sơ nào | S-0301 (empty state) → "Thêm hồ sơ" → S-0302 |
| Tạo hồ sơ, upload ảnh lỗi | Hồ sơ vẫn được tạo (không có ảnh) + T-0303 |
| Hủy ghép nối thiết bị đang online | M-0301 PIN đúng → lệnh gửi ngay → thiết bị mất quản lý tức thì |
| Hủy ghép nối thiết bị đang offline | M-0301 PIN đúng → lệnh vào hàng đợi pending → thực thi khi thiết bị online lại |
| Xóa hồ sơ có thiết bị offline | P-0302 xác nhận → hồ sơ xóa ngay, lệnh unpair pending đến thiết bị offline |

---

## Chưa rõ

| # | Màn | Vấn đề |
|---|-----|--------|
| 1 | S-0305 | SRS không liệt kê các field trong nhóm thông tin thiết bị — cần xác nhận hiển thị những gì (model, OS version, IMEI, ngày pair...) |
| 2 | M-0301 | PIN 4 hay 6 số? SRS ghi "4–6 số" nhưng cần confirm con số cố định để design ô nhập |
| 3 | S-0301 | Khi đạt giới hạn hồ sơ — có hiển thị thông tin gói nâng cấp không? Giao diện nâng cấp trông như thế nào? |
| 4 | S-0303 | Action sheet từ ⋯ — ngoài "Chỉnh sửa" và "Xóa hồ sơ" có thêm action nào không? |

---

## Suy luận thêm

| # | Mục | Lý do |
|---|-----|-------|
| 1 | S-0301 (Danh sách hồ sơ) | SRS đề cập "màn hình danh sách hồ sơ" nhưng không mô tả giao diện — cần để người dùng điều hướng vào từng hồ sơ |
| 2 | S-0306 (Chọn thiết bị để gắn) | US-03-06 AC1 nói "chọn thiết bị từ danh sách" nhưng không đặc tả màn riêng — cần một màn để hiển thị danh sách thiết bị khả dụng |
| 3 | P-0301 (Confirm bỏ thay đổi) | UX pattern chuẩn khi có unsaved changes, SRS đề cập hành vi này ở US-03-02 AC2 |
| 4 | T-0303 (Upload ảnh thất bại) | US-03-01 exception case có mô tả toast nhưng không nêu nội dung cụ thể |
| 5 | T-0304 (Khóa PIN) | US-03-07 AC4 đề cập khóa 30 phút nhưng không mô tả thông báo hiển thị |
