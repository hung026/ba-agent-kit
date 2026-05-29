# FoodOrder — Đặc tả màn hình

**Platform**: Mobile App
**Tổng**: 8 màn hình, 1 modal, 2 dialog, 2 toast

---

## Tổng quan module

| # | Module | Màn hình | Mô tả ngắn |
|---|--------|----------|-------------|
| 01 | Đăng nhập | S-0101, S-0102 | Đăng nhập, đăng ký |
| 02 | Trang chủ | S-0201, S-0202, S-0203, M-0201 | Home, danh sách, tìm kiếm, bộ lọc |
| 03 | Đặt hàng | S-0301, S-0302, S-0303, P-0301, T-0301 | Chi tiết món, giỏ hàng, đặt thành công |
| 04 | Tài khoản | S-0401, P-0401, T-0401 | Thông tin cá nhân, đăng xuất |

---

## Điều hướng chung

**Kiểu**: Tab bar dưới, 3 tab

| Tab | Nhãn | Icon gợi ý | Đến màn |
|-----|------|------------|---------|
| 1 | Trang chủ | nhà | S-0201 |
| 2 | Đơn hàng | hóa đơn | (chưa có trong SRS) |
| 3 | Tài khoản | người | S-0401 |

---

## Màn hình chi tiết

### S-0101: Đăng nhập

**Mục đích**: Đăng nhập bằng số điện thoại và mật khẩu.

**Bố cục**:
- Giữa: Logo + form đăng nhập, căn giữa dọc

**Thành phần**:
| # | Tên | Loại | Nội dung / Mô tả | Tương tác |
|---|-----|------|-------------------|-----------|
| 1 | Logo app | ảnh | Icon app + chữ "FoodOrder" + tagline "Đặt món ngon, giao tận nơi" | chỉ hiển thị |
| 2 | Số điện thoại | input | Placeholder "0901234567", bàn phím số | nhập text |
| 3 | Mật khẩu | input | Placeholder "••••••", có icon toggle hiện/ẩn bên phải | nhập text |
| 4 | Đăng nhập | nút chính | "Đăng nhập" — disabled khi chưa điền đủ 2 field | bấm → đi S-0201 |
| 5 | Link đăng ký | text link | "Chưa có tài khoản? Đăng ký" | bấm → đi S-0102 |

**Trạng thái hiển thị**:
| Trạng thái | Khác gì so với mặc định |
|------------|------------------------|
| Sai thông tin | Text đỏ dưới form: "Số điện thoại hoặc mật khẩu không đúng" |
| Đang xử lý | Nút "Đăng nhập" hiện spinner, toàn bộ form không bấm được |

---

### S-0102: Đăng ký

**Mục đích**: Tạo tài khoản mới.

**Bố cục**:
- Trên: Header có nút back + tiêu đề "Đăng ký"
- Giữa: Form đăng ký

**Thành phần**:
| # | Tên | Loại | Nội dung / Mô tả | Tương tác |
|---|-----|------|-------------------|-----------|
| 1 | Họ tên | input | Placeholder "Nguyễn Minh Anh" | nhập text |
| 2 | Số điện thoại | input | Placeholder "0901234567", bàn phím số | nhập text |
| 3 | Mật khẩu | input | Placeholder "Tối thiểu 6 ký tự", toggle hiện/ẩn | nhập text |
| 4 | Xác nhận mật khẩu | input | Placeholder "Nhập lại mật khẩu" | nhập text |
| 5 | Đăng ký | nút chính | "Đăng ký" | bấm → đi S-0201 |
| 6 | Link đăng nhập | text link | "Đã có tài khoản? Đăng nhập" | bấm → quay lại S-0101 |

**Trạng thái hiển thị**:
| Trạng thái | Khác gì so với mặc định |
|------------|------------------------|
| Lỗi validation | Text đỏ dưới field lỗi: "Số điện thoại đã tồn tại", "Mật khẩu không khớp" |

---

### S-0201: Trang chủ

**Mục đích**: Hiển thị banner, danh mục, món nổi bật.

**Bố cục**:
- Trên: Lời chào + thanh tìm kiếm
- Giữa (cuộn): Banner → danh mục → danh sách món
- Dưới (cố định): Tab bar

**Thành phần**:
| # | Tên | Loại | Nội dung / Mô tả | Tương tác |
|---|-----|------|-------------------|-----------|
| 1 | Lời chào | text | "Xin chào," dòng nhỏ + "Nguyễn Minh Anh 👋" dòng to đậm | chỉ hiển thị |
| 2 | Thanh tìm kiếm | input giả | "Tìm món ăn..." có icon kính lúp bên trái | bấm → đi S-0203 |
| 3 | Banner | carousel | Slide tự chuyển, nền gradient, chữ trắng đậm. VD slide 1: "Giảm 50% đơn đầu tiên" | bấm → không xác định |
| 4 | Danh mục | danh sách ngang cuộn | Mỗi item: icon + tên. VD: 🍚 Cơm, 🍜 Phở, 🧋 Trà sữa, 🥖 Bánh mì, 🍕 Pizza | bấm → đi S-0202 |
| 5 | Tiêu đề section | text | "🔥 Món nổi bật" — đậm | chỉ hiển thị |
| 6 | Danh sách món | danh sách dọc | Mỗi item: ảnh trái + tên + nhà hàng + giá (cam) + rating (sao vàng). Xem nội dung mẫu | bấm → đi S-0301 |
| 7 | Tab bar | tab bar | 3 tab: Trang chủ (active), Đơn hàng, Tài khoản | bấm → chuyển tab |

**Nội dung mẫu** (danh sách món):
- Cơm tấm sườn bì chả · Cơm Tấm Bà Năm · 45.000đ · ★ 4.8
- Phở bò tái nạm · Phở Hòa · 55.000đ · ★ 4.6
- Trà sữa trân châu · Tiger Sugar · 35.000đ · ★ 4.5
- Bánh mì thịt nướng · Bánh Mì Huỳnh Hoa · 25.000đ · ★ 4.7

---

### S-0202: Danh sách theo danh mục

**Mục đích**: Xem danh sách món ăn trong 1 danh mục, có lọc.

**Bố cục**:
- Trên: Header (nút back + tên danh mục + icon bộ lọc)
- Giữa (cuộn): Dropdown sắp xếp + danh sách món

**Thành phần**:
| # | Tên | Loại | Nội dung / Mô tả | Tương tác |
|---|-----|------|-------------------|-----------|
| 1 | Tên danh mục | text header | VD: "Cơm" | chỉ hiển thị |
| 2 | Icon bộ lọc | icon nút | Icon filter, góc phải header | bấm → mở M-0201 |
| 3 | Sắp xếp | dropdown | "Phổ biến ▾" — Options: Phổ biến, Giá thấp→cao, Đánh giá cao | chọn → sắp xếp lại |
| 4 | Danh sách món | danh sách dọc | Tương tự S-0201, thêm thời gian giao hàng. VD: "25 phút" | bấm → đi S-0301 |

**Trạng thái hiển thị**:
| Trạng thái | Khác gì so với mặc định |
|------------|------------------------|
| Trống | Hình minh họa + "Chưa có món ăn nào" căn giữa |
| Đang tải | 3 khung skeleton (hình chữ nhật xám nhấp nháy) |

---

### S-0203: Tìm kiếm

**Mục đích**: Tìm món ăn theo tên.

**Bố cục**:
- Trên: Input tìm kiếm (auto focus) + nút "Hủy"
- Giữa: Lịch sử tìm kiếm hoặc kết quả

**Thành phần**:
| # | Tên | Loại | Nội dung / Mô tả | Tương tác |
|---|-----|------|-------------------|-----------|
| 1 | Input tìm kiếm | input | Auto focus, có nút xóa (✕) bên phải khi đang có text | nhập text → hiện kết quả |
| 2 | Nút hủy | text nút | "Hủy" bên phải input | bấm → quay lại |
| 3 | Lịch sử | danh sách | Hiện khi chưa gõ. VD: "Phở", "Cơm tấm", "Trà sữa" | bấm → điền vào input |
| 4 | Kết quả | danh sách dọc | Hiện khi đang gõ. Tương tự card món ăn | bấm → đi S-0301 |

**Trạng thái hiển thị**:
| Trạng thái | Khác gì so với mặc định |
|------------|------------------------|
| Không tìm thấy | "Không tìm thấy món nào" căn giữa |

---

### M-0201: Bộ lọc
**Mở từ**: S-0202 → bấm icon bộ lọc
**Kiểu**: Bottom sheet

**Mục đích**: Lọc danh sách theo giá, rating, thời gian giao.

**Thành phần**:
| # | Tên | Loại | Nội dung / Mô tả | Tương tác |
|---|-----|------|-------------------|-----------|
| 1 | Thanh kéo đóng | thanh ngang | Thanh xám nhỏ căn giữa trên cùng | vuốt xuống → đóng |
| 2 | Khoảng giá | range slider | 0đ — 200.000đ | kéo |
| 3 | Đánh giá | nhóm chip | "4★ trở lên", "3★ trở lên" | bấm chọn 1 |
| 4 | Thời gian giao | nhóm chip | "<15 phút", "<30 phút", "<60 phút" | bấm chọn 1 |
| 5 | Áp dụng | nút chính | "Áp dụng" | bấm → đóng modal, lọc danh sách |
| 6 | Xóa bộ lọc | text link | "Xóa bộ lọc" | bấm → reset tất cả filter |

---

### S-0301: Chi tiết món ăn

**Mục đích**: Xem thông tin món, chọn topping, chọn số lượng, thêm vào giỏ.

**Bố cục**:
- Trên: Ảnh món lớn (chiếm ngang, ~40% màn hình), nút back overlay góc trái
- Giữa (cuộn): Thông tin + topping + số lượng
- Dưới (cố định): Nút thêm vào giỏ

**Thành phần**:
| # | Tên | Loại | Nội dung / Mô tả | Tương tác |
|---|-----|------|-------------------|-----------|
| 1 | Ảnh món | ảnh lớn | Chiếm full ngang, nền màu nhạt | chỉ hiển thị |
| 2 | Nút back | icon nút | Hình tròn trắng, icon mũi tên, nổi trên ảnh góc trái | bấm → quay lại |
| 3 | Tên món | text đậm lớn | "Cơm tấm sườn bì chả" | chỉ hiển thị |
| 4 | Nhà hàng + giao hàng | text nhỏ xám | "Cơm Tấm Bà Năm · 25 phút" | chỉ hiển thị |
| 5 | Giá + rating | text | "45.000đ" cam đậm + "★ 4.8 (120 đánh giá)" xám | chỉ hiển thị |
| 6 | Mô tả | text nhỏ | "Cơm tấm sườn nướng thơm, bì, chả trứng, kèm đồ chua và nước mắm pha." | chỉ hiển thị |
| 7 | Tiêu đề topping | text đậm | "Thêm topping" | chỉ hiển thị |
| 8 | Danh sách topping | danh sách chọn | Mỗi item: tên + giá thêm. Viền cam khi đã chọn. VD: "Thêm sườn +15.000đ", "Thêm trứng ốp la +8.000đ" | bấm → toggle chọn/bỏ |
| 9 | Chọn số lượng | stepper | Nút (−) · số ở giữa · nút (+). Tối thiểu 1 | bấm +/− |
| 10 | Thêm vào giỏ | nút chính | "Thêm vào giỏ — 45.000đ" (cập nhật theo topping + số lượng) | bấm → hiện T-0301, quay lại |

---

### S-0302: Giỏ hàng

**Mục đích**: Xem lại đơn, chỉnh số lượng, đặt hàng.

**Bố cục**:
- Trên: Header "Giỏ hàng" + nút back
- Giữa (cuộn): Danh sách item + mã giảm giá + tóm tắt giá
- Dưới (cố định): Nút đặt hàng

**Thành phần**:
| # | Tên | Loại | Nội dung / Mô tả | Tương tác |
|---|-----|------|-------------------|-----------|
| 1 | Danh sách item | danh sách | Mỗi item: ảnh + tên + topping đã chọn + stepper số lượng + giá | vuốt trái → hiện nút xóa đỏ |
| 2 | Nút xóa | nút ẩn | "Xóa" nền đỏ, hiện khi vuốt trái | bấm → mở P-0301 |
| 3 | Mã giảm giá | input + nút | Input "Nhập mã giảm giá" + nút "Áp dụng" | nhập + bấm |
| 4 | Tóm tắt giá | nhóm text | Tạm tính: 108.000đ / Phí giao: 15.000đ / Giảm giá: 0đ / **Tổng: 123.000đ** (đậm, lớn hơn) | chỉ hiển thị |
| 5 | Đặt hàng | nút chính | "Đặt hàng — 123.000đ" | bấm → đi S-0303 |

**Trạng thái hiển thị**:
| Trạng thái | Khác gì so với mặc định |
|------------|------------------------|
| Giỏ trống | Hình minh họa + "Giỏ hàng trống" + nút "Đặt món ngay" (→ S-0201) |

**Nội dung mẫu**:
- Cơm tấm sườn bì chả · Thêm trứng ốp la · x1 · 53.000đ
- Phở bò tái nạm · x1 · 55.000đ

---

### S-0303: Đặt hàng thành công

**Mục đích**: Xác nhận đơn đã đặt.

**Bố cục**:
- Giữa: Nội dung căn giữa dọc

**Thành phần**:
| # | Tên | Loại | Nội dung / Mô tả | Tương tác |
|---|-----|------|-------------------|-----------|
| 1 | Icon thành công | hình minh họa | Checkmark lớn, có animation | chỉ hiển thị |
| 2 | Tiêu đề | text đậm lớn | "Đặt hàng thành công!" | chỉ hiển thị |
| 3 | Mã đơn | text | "#FO-20260520-001" | chỉ hiển thị |
| 4 | Thời gian dự kiến | text | "Dự kiến giao trong 30 phút" | chỉ hiển thị |
| 5 | Về trang chủ | nút chính | "Về trang chủ" | bấm → đi S-0201 |

---

### S-0401: Tài khoản [suy luận]

**Mục đích**: Xem thông tin cá nhân, truy cập cài đặt.

**Bố cục**:
- Trên: Avatar + tên + số điện thoại
- Giữa: Danh sách menu
- Dưới (cố định): Tab bar

**Thành phần**:
| # | Tên | Loại | Nội dung / Mô tả | Tương tác |
|---|-----|------|-------------------|-----------|
| 1 | Avatar | ảnh tròn | Ảnh đại diện mặc định, căn giữa | chỉ hiển thị |
| 2 | Tên | text đậm | "Nguyễn Minh Anh" | chỉ hiển thị |
| 3 | Số điện thoại | text xám | "0901234567" | chỉ hiển thị |
| 4 | Menu | danh sách | Đơn hàng / Địa chỉ / Cài đặt — mỗi dòng có icon trái + mũi tên phải | bấm → (chưa xác định) |
| 5 | Đăng xuất | dòng menu đỏ | "Đăng xuất" — text đỏ, cuối danh sách | bấm → mở P-0401 |
| 6 | Tab bar | tab bar | Tài khoản (active) | bấm → chuyển tab |

---

### P-0301: Xác nhận xóa món

**Mở từ**: S-0302 → vuốt trái + bấm xóa
**Tiêu đề**: "Xóa món này?"
**Nội dung**: "Bạn có chắc muốn xóa món này khỏi giỏ hàng?"
**Nút**: Xóa (đỏ) / Hủy

---

### P-0401: Xác nhận đăng xuất [suy luận]

**Mở từ**: S-0401 → bấm "Đăng xuất"
**Tiêu đề**: "Đăng xuất?"
**Nội dung**: "Bạn có chắc muốn đăng xuất?"
**Nút**: Đăng xuất / Hủy

---

### T-0301: Đã thêm vào giỏ

**Hiện khi**: S-0301 → bấm "Thêm vào giỏ"
**Nội dung**: "Đã thêm vào giỏ hàng"
**Kiểu**: thành công

### T-0401: Đã đăng xuất [suy luận]

**Hiện khi**: P-0401 → bấm "Đăng xuất"
**Nội dung**: "Đã đăng xuất"
**Kiểu**: thông tin

---

## Luồng chuyển màn

| Từ | Bấm | Đến | Điều kiện |
|----|-----|-----|-----------|
| S-0101 | Nút "Đăng nhập" | S-0201 | Form hợp lệ |
| S-0101 | Link "Đăng ký" | S-0102 | - |
| S-0102 | Nút "Đăng ký" | S-0201 | Form hợp lệ |
| S-0201 | Thanh tìm kiếm | S-0203 | - |
| S-0201 | Item danh mục | S-0202 | - |
| S-0201 | Card món ăn | S-0301 | - |
| S-0202 | Icon bộ lọc | M-0201 | - |
| S-0202 | Card món ăn | S-0301 | - |
| S-0203 | Card kết quả | S-0301 | - |
| S-0301 | Nút "Thêm vào giỏ" | Quay lại + T-0301 | - |
| S-0302 | Vuốt xóa item | P-0301 | - |
| S-0302 | Nút "Đặt hàng" | S-0303 | Giỏ không trống |
| S-0303 | Nút "Về trang chủ" | S-0201 | - |
| S-0401 | "Đăng xuất" | P-0401 | - |
| P-0401 | "Đăng xuất" | S-0101 | - |

---

## Luồng có điều kiện

| Điều kiện | Luồng |
|-----------|-------|
| Chưa đăng nhập | → S-0101 |
| Đã đăng nhập | → S-0201 |

---

## Chưa rõ

| # | Màn | Vấn đề |
|---|-----|--------|
| 1 | S-0302 | SRS không nêu phương thức thanh toán → chưa có màn chọn payment |
| 2 | S-0201 | SRS không nêu có chọn địa chỉ giao không → chưa có màn địa chỉ |
| 3 | Tab "Đơn hàng" | SRS đề cập nhưng không mô tả chi tiết → chưa có màn |

## Suy luận thêm

| # | Mục | Lý do |
|---|-----|-------|
| 1 | S-0401 (Tài khoản) | Tab bar cần tab Tài khoản nhưng SRS không mô tả |
| 2 | P-0301 (Xóa món) | Cần confirm trước khi xóa |
| 3 | P-0401 (Đăng xuất) | Cần confirm trước khi đăng xuất |
| 4 | T-0301, T-0401 | Feedback sau action |
