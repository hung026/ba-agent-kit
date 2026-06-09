# Lá Chắn Số — Parental Control (FR-05/06/08/09) — Đặc tả màn hình

**Platform**: Mobile App (App phụ huynh)
**Phạm vi**: APP PARENTS — FR-05 Lọc web · FR-06 Báo cáo hoạt động · FR-08 Nội dung an toàn · FR-09 Thời gian & ứng dụng
**Bối cảnh**: Mọi màn dưới đây đều thuộc ngữ cảnh **1 hồ sơ trẻ đã chọn**. Điểm vào (hub hồ sơ) đã đặc tả ở tài liệu FR-01→04, không lặp lại.
**Tổng**: 9 màn hình, 6 modal, 4 dialog, 5 toast

---

## Tổng quan module

| # | Module | Màn hình | Mô tả ngắn |
|---|--------|----------|-------------|
| 05 | Lọc web | S-0501, S-0502, S-0503, M-0501, M-0502, P-0501, P-0502, T-0501 | Chặn domain/URL/danh mục, ngoại lệ, nhật ký chặn, cài đặt cảnh báo |
| 06 | Báo cáo hoạt động | S-0601, M-0601 | Thời gian dùng, lịch sử web, lịch sử YouTube (3 tab) |
| 08 | Nội dung an toàn | S-0801, M-0801 | Safe Search + lọc YouTube (kênh, từ khóa, restricted mode) |
| 09 | Thời gian & ứng dụng | S-0901, S-0902, S-0903, M-0901, M-0902, M-0903, P-0901, P-0902, T-0901 | Tổng thời gian/khóa máy, whitelist/blacklist app, quota theo app/danh mục |

---

## Điều hướng chung

**Kiểu**: Không có tab bar riêng cho cụm này. Các màn được mở từ **hub hồ sơ** (đặc tả ở FR-01→04) dưới dạng danh sách menu. Mỗi màn có header với nút back về hub.

| Mục menu ở hub (gợi ý) | Đến màn |
|------------------------|---------|
| Lọc web | S-0501 |
| Nhật ký chặn web | S-0502 (hoặc vào từ S-0501) |
| Báo cáo hoạt động | S-0601 |
| Nội dung an toàn | S-0801 |
| Thời gian sử dụng | S-0901 |
| Quản lý ứng dụng | S-0902 |
| Giới hạn thời gian app | S-0903 |

> Mọi màn có dải trạng thái nhỏ dưới header hiển thị tình trạng đồng bộ thiết bị con: `Đã áp dụng ✓` / `Đang chờ đồng bộ ⏳ (thiết bị offline)`.

---

## Màn hình chi tiết

### S-0501: Lọc web

**Mục đích**: Quản lý toàn bộ rule chặn web của hồ sơ — chặn theo địa chỉ (domain/URL), theo danh mục, và danh sách ngoại lệ. Gom US-05-01, 05-02, 05-03, 05-04.

**Bố cục**:
- Trên cùng: Header — nút back + tiêu đề "Lọc web" + tên hồ sơ phụ ("Hồ sơ: Bé Bin")
- Dưới header: Thanh trạng thái đồng bộ
- Thanh tab ngang 3 mục: **Đã chặn** · **Theo danh mục** · **Ngoại lệ**
- Giữa (cuộn được): Nội dung theo tab đang chọn
- Dưới cùng (cố định, chỉ tab "Đã chặn" và "Ngoại lệ"): Nút "+ Thêm" nổi (FAB) hoặc nút lớn full width

**Thành phần — Tab "Đã chặn"** (US-05-01, 05-02):
| # | Tên | Loại | Nội dung / Mô tả | Tương tác |
|---|-----|------|-------------------|-----------|
| 1 | Tiêu đề phụ | text | "Domain và đường dẫn đang chặn" | chỉ hiển thị |
| 2 | Danh sách chặn | danh sách dọc | Mỗi dòng: địa chỉ + nhãn loại (chip "Domain"/"URL") + trạng thái áp dụng + nút "Bỏ chặn". Xem nội dung mẫu | vuốt trái hoặc bấm "Bỏ chặn" → mở P-0501 |
| 3 | Nút thêm | nút chính | "+ Thêm địa chỉ chặn" cố định dưới | bấm → mở M-0501 |

**Thành phần — Tab "Theo danh mục"** (US-05-03):
| # | Tên | Loại | Nội dung / Mô tả | Tương tác |
|---|-----|------|-------------------|-----------|
| 1 | Ghi chú nguồn | text nhỏ xám | "Danh mục có thể chưa cập nhật mới nhất" (chỉ hiện khi dùng cache) | chỉ hiển thị |
| 2 | Danh sách danh mục | danh sách + toggle | Mỗi dòng: tên danh mục + mô tả ngắn + toggle bật/tắt. VD: "Người lớn — nội dung 18+", "Cờ bạc — casino, cá độ", "Bạo lực", "Vũ khí", "Ma túy", "Mạng xã hội" | bật toggle → áp chặn danh mục |

**Thành phần — Tab "Ngoại lệ"** (US-05-04):
| # | Tên | Loại | Nội dung / Mô tả | Tương tác |
|---|-----|------|-------------------|-----------|
| 1 | Giải thích | text nhỏ | "Trang trong danh sách này luôn được phép, kể cả khi bị chặn bởi danh mục." | chỉ hiển thị |
| 2 | Danh sách ngoại lệ | danh sách dọc | Mỗi dòng: domain/URL + nút "Xóa" | bấm "Xóa" → quay lại chịu rule chặn |
| 3 | Nút thêm | nút chính | "+ Thêm ngoại lệ" cố định dưới | bấm → mở M-0502 |

**Trạng thái hiển thị**:
| Trạng thái | Khác gì so với mặc định |
|------------|------------------------|
| Trống (tab Đã chặn) | Hình minh họa + "Chưa chặn trang nào. Bấm + để thêm." |
| Trống (tab Ngoại lệ) | "Chưa có ngoại lệ nào" |
| Đang chờ đồng bộ | Mỗi dòng vừa thêm có nhãn "Đang chờ đồng bộ ⏳" thay vì "Đã áp dụng ✓" |

**Nội dung mẫu** (tab Đã chặn):
- `pornhub.com` · chip "Domain" · Đã áp dụng ✓
- `facebook.com/groups/xyz` · chip "URL" · Đã áp dụng ✓
- `example.com/forum/adult` · chip "URL" · Đang chờ đồng bộ ⏳

---

### M-0501: Thêm địa chỉ chặn

**Mở từ**: S-0501 (tab Đã chặn) → bấm "+ Thêm địa chỉ chặn"
**Kiểu**: Bottom sheet
**Mục đích**: Nhập 1 domain hoặc URL đầy đủ để chặn. Gom US-05-01 (domain) + US-05-02 (URL/path).

**Thành phần**:
| # | Tên | Loại | Nội dung / Mô tả | Tương tác |
|---|-----|------|-------------------|-----------|
| 1 | Thanh kéo đóng | thanh ngang | Thanh xám nhỏ căn giữa | vuốt xuống → đóng |
| 2 | Tiêu đề | text đậm | "Thêm địa chỉ chặn" | chỉ hiển thị |
| 3 | Ô nhập | input | Placeholder "example.com hoặc example.com/forum/adult" | nhập text → validate realtime |
| 4 | Lỗi inline | text đỏ | "Domain không hợp lệ" / "Domain này đã có trong danh sách chặn" | hiện khi sai |
| 5 | Tùy chọn khớp URL | nhóm radio/checkbox | Chỉ hiện khi nhập URL có path/query: "Chặn đúng URL này" / "Chặn mọi URL bắt đầu bằng đường dẫn này (prefix)" | chọn ≥1 |
| 6 | Cảnh báo CA/MDM | banner vàng | "Chặn theo đường dẫn cần quyền giám sát HTTPS. Thiết bị [Bé Bin] chưa cài — rule có thể không hiệu lực với trang HTTPS." (chỉ hiện khi nhập URL path và thiết bị thiếu CA/MDM) | chỉ hiển thị |
| 7 | Nút Chặn | nút chính | "Chặn" — disabled khi input rỗng hoặc sai định dạng | bấm → lưu + đóng + T-0501 |
| 8 | Nút Hủy | nút phụ | "Hủy" | bấm → đóng |

> Ghi chú: input tự chuẩn hóa lowercase, bỏ `http(s)://`. Nếu nhập URL đầy đủ thì hiện tùy chọn (5) + cảnh báo (6).

---

### M-0502: Thêm ngoại lệ (whitelist)

**Mở từ**: S-0501 (tab Ngoại lệ) → bấm "+ Thêm ngoại lệ"
**Kiểu**: Bottom sheet
**Mục đích**: Cho phép 1 domain/URL dù đang bị chặn bởi rule chung. US-05-04.

**Thành phần**:
| # | Tên | Loại | Nội dung / Mô tả | Tương tác |
|---|-----|------|-------------------|-----------|
| 1 | Tiêu đề | text đậm | "Thêm ngoại lệ (cho phép)" | chỉ hiển thị |
| 2 | Ô nhập | input | Placeholder "facebook.com" | nhập text |
| 3 | Cảnh báo domain rộng | banner vàng | "Cho phép cả domain này sẽ mở mọi đường dẫn con. Gợi ý: thêm URL cụ thể thay vì cả domain." (khi nhập domain trống path) | chỉ hiển thị |
| 4 | Nút Thêm | nút chính | "Thêm ngoại lệ" | bấm → lưu + đóng + T-0501 |
| 5 | Nút Hủy | nút phụ | "Hủy" | bấm → đóng |

---

### P-0501: Xác nhận bỏ chặn / xung đột

**Mở từ**: S-0501 → bấm "Bỏ chặn" 1 dòng, hoặc khi thêm domain đang nằm trong whitelist
**Tiêu đề**: "Bỏ chặn trang này?" *(hoặc)* "Domain đang là ngoại lệ"
**Nội dung**: "`pornhub.com` sẽ được truy cập trở lại trên thiết bị của trẻ." *(hoặc)* "Domain này đang nằm trong danh sách ngoại lệ. Xóa khỏi ngoại lệ trước?"
**Nút**: Bỏ chặn (đỏ) / Hủy *(hoặc)* Xóa khỏi ngoại lệ / Hủy

---

### S-0502: Nhật ký chặn web

**Mục đích**: Xem danh sách các lượt truy cập web bị chặn. US-05-06.

**Bố cục**:
- Trên cùng: Header — nút back + tiêu đề "Nhật ký chặn web"
- Dưới header: Thanh lọc (chip khoảng thời gian + ô tìm kiếm)
- Giữa (cuộn được): Danh sách log, mới nhất lên đầu

**Thành phần**:
| # | Tên | Loại | Nội dung / Mô tả | Tương tác |
|---|-----|------|-------------------|-----------|
| 1 | Bộ lọc thời gian | nhóm chip | "Hôm nay", "7 ngày", "30 ngày" (mặc định 30 ngày) | bấm → lọc |
| 2 | Ô tìm kiếm | input | "Tìm theo domain..." có icon kính lúp | nhập → lọc |
| 3 | Danh sách log | danh sách dọc | Mỗi dòng: domain/URL (đậm) + thời gian (HH:mm dd/MM) + chip lý do ("Domain"/"URL"/"Danh mục: Người lớn") + nút "Cho phép trang này" | bấm "Cho phép" → thêm vào whitelist (M-0502 prefill) + T-0501 |

**Trạng thái hiển thị**:
| Trạng thái | Khác gì so với mặc định |
|------------|------------------------|
| Trống | Hình minh họa + "Chưa có lượt truy cập bị chặn nào được ghi nhận" |
| Đang tải / lazy-load | Skeleton 3-4 dòng; cuộn cuối → spinner tải thêm |
| Kết quả lọc rỗng | "Không có bản ghi phù hợp" |

**Nội dung mẫu**:
- `pornhub.com` · 14:32 08/06 · Danh mục: Người lớn
- `bet365.com` · 13:05 08/06 · Danh mục: Cờ bạc
- `example.com/forum/adult` · 21:47 07/06 · URL

---

### S-0503: Cài đặt thông báo

**Mục đích**: Bật/tắt loại cảnh báo gửi cho phụ huynh, gồm cảnh báo chặn web. US-05-05 (vế cấu hình). Push notification thực tế là T-0502 (xem mục Toast/Notification).

**Bố cục**:
- Trên cùng: Header — nút back + "Cài đặt thông báo"
- Giữa: Danh sách toggle theo nhóm

**Thành phần**:
| # | Tên | Loại | Nội dung / Mô tả | Tương tác |
|---|-----|------|-------------------|-----------|
| 1 | Banner nhắc cấp quyền | banner | "Bạn chưa bật quyền thông báo. Bật để nhận cảnh báo." + nút "Bật" (chỉ hiện khi chưa cấp quyền OS) | bấm → mở cài đặt OS |
| 2 | Cảnh báo chặn web | dòng + toggle | "Cảnh báo khi trẻ truy cập web bị chặn" + mô tả nhỏ "Sự kiện vẫn được ghi vào Nhật ký dù tắt." | bật/tắt |
| 3 | (Các loại cảnh báo khác) | dòng + toggle | VD: "Có app mới được cài", "Vượt thời gian sử dụng" | bật/tắt |

**Trạng thái hiển thị**:
| Trạng thái | Khác gì so với mặc định |
|------------|------------------------|
| Chưa cấp quyền OS | Banner (1) hiện trên cùng, các toggle vẫn bấm được nhưng có ghi chú "Cần bật quyền để nhận push" |

---

### S-0601: Báo cáo hoạt động

**Mục đích**: Báo cáo thời gian dùng thiết bị/app, lịch sử web, lịch sử YouTube. Gom US-06-01, 06-02, 06-03 thành 3 tab.

**Bố cục**:
- Trên cùng: Header — nút back + "Báo cáo hoạt động" + nhãn "Cập nhật lần cuối: 14:30 08/06"
- Thanh tab ngang: **Thời gian dùng** · **Lịch sử web** · **YouTube**
- Giữa (cuộn được): Nội dung theo tab

**Thành phần — Tab "Thời gian dùng"** (US-06-01):
| # | Tên | Loại | Nội dung / Mô tả | Tương tác |
|---|-----|------|-------------------|-----------|
| 1 | Bộ chọn khoảng | nhóm chip + nút | "Hôm nay", "7 ngày", "30 ngày", "Tùy chỉnh ▾" | bấm "Tùy chỉnh" → mở M-0601 |
| 2 | Tổng thời gian | thẻ số lớn | "Tổng thời gian màn hình: 3 giờ 45 phút" | chỉ hiển thị |
| 3 | Biểu đồ | biểu đồ cột | Cột theo ngày (view 7/30 ngày) hoặc theo giờ (view hôm nay) | chỉ hiển thị |
| 4 | Top ứng dụng | danh sách | Mỗi dòng: icon app + tên + thanh tỉ lệ + thời lượng. Xem nội dung mẫu | chỉ hiển thị |
| 5 | Theo nhóm danh mục | biểu đồ tròn/list | "Games 1h20, Mạng xã hội 50p, Học tập 35p, Khác 1h" | chỉ hiển thị |

**Thành phần — Tab "Lịch sử web"** (US-06-02):
| # | Tên | Loại | Nội dung / Mô tả | Tương tác |
|---|-----|------|-------------------|-----------|
| 1 | Lọc + tìm | chip + input | Khoảng thời gian + "Tìm theo domain..." | lọc |
| 2 | Danh sách | danh sách dọc | Mỗi dòng: domain/URL + thời gian + số lần truy cập + nhãn "(chỉ ghi nhận domain)" nếu thiếu CA + nút "Chặn trang này" | bấm "Chặn" → thêm vào danh sách chặn (M-0501 prefill) |

**Thành phần — Tab "YouTube"** (US-06-03):
| # | Tên | Loại | Nội dung / Mô tả | Tương tác |
|---|-----|------|-------------------|-----------|
| 1 | Danh sách video | danh sách dọc | Mỗi dòng: thumbnail + tiêu đề/kênh (hoặc video ID nếu không phân giải) + thời gian xem + thời lượng + nút "Chặn kênh này" | bấm "Chặn kênh" → thêm vào lọc YouTube (S-0801) |

**Trạng thái hiển thị**:
| Trạng thái | Khác gì so với mặc định |
|------------|------------------------|
| Chưa có dữ liệu | "Chưa có dữ liệu hoạt động. Dữ liệu sẽ xuất hiện sau khi thiết bị đồng bộ." |
| Lịch sử web — không phân giải URL | Dòng hiển thị domain + nhãn xám "(chỉ ghi nhận domain)" |
| YouTube — không phân giải kênh | Hiển thị video ID/URL thô thay tiêu đề |
| Đồng bộ trễ | Nhãn "Cập nhật lần cuối: HH:mm" nổi bật ở header |

**Nội dung mẫu** (Top ứng dụng):
- YouTube · 1 giờ 20 phút
- Liên Quân Mobile · 45 phút
- TikTok · 35 phút
- Zalo · 20 phút

---

### M-0601: Chọn khoảng thời gian tùy chỉnh

**Mở từ**: S-0601 (tab Thời gian dùng) → bấm "Tùy chỉnh ▾"
**Kiểu**: Bottom sheet (lịch chọn ngày)
**Mục đích**: Chọn khoảng ngày bắt đầu — kết thúc để tính lại số liệu. US-06-01 AC3.

**Thành phần**:
| # | Tên | Loại | Nội dung / Mô tả | Tương tác |
|---|-----|------|-------------------|-----------|
| 1 | Lịch | date range picker | Chọn ngày bắt đầu + ngày kết thúc | chọn |
| 2 | Khoảng đã chọn | text | "01/06 — 08/06 (8 ngày)" | chỉ hiển thị |
| 3 | Áp dụng | nút chính | "Áp dụng" | bấm → đóng + tính lại báo cáo |
| 4 | Hủy | nút phụ | "Hủy" | bấm → đóng |

---

### S-0801: Nội dung an toàn

**Mục đích**: Bật Safe Search + quản lý lọc YouTube (kênh chặn, từ khóa, restricted mode). Gom US-08-01 + US-08-02.

**Bố cục**:
- Trên cùng: Header — nút back + "Nội dung an toàn"
- Giữa (cuộn được): Section "Tìm kiếm an toàn" → Section "YouTube"

**Thành phần — Section "Tìm kiếm an toàn"** (US-08-01):
| # | Tên | Loại | Nội dung / Mô tả | Tương tác |
|---|-----|------|-------------------|-----------|
| 1 | Toggle Safe Search | dòng + toggle | "Bắt buộc Safe Search" + mô tả "Lọc kết quả người lớn trên Google, Bing." | bật/tắt → enforce |
| 2 | Ghi chú phạm vi | text nhỏ xám | "Áp dụng cho Google, Bing. Các công cụ khác (DuckDuckGo, Yandex…) không hỗ trợ — chặn qua Lọc web nếu cần." | chỉ hiển thị |

**Thành phần — Section "YouTube"** (US-08-02):
| # | Tên | Loại | Nội dung / Mô tả | Tương tác |
|---|-----|------|-------------------|-----------|
| 3 | Toggle Restricted Mode | dòng + toggle | "Chế độ hạn chế YouTube" | bật/tắt |
| 4 | Tiêu đề kênh chặn | text đậm | "Kênh bị chặn" | chỉ hiển thị |
| 5 | Danh sách kênh chặn | danh sách | Mỗi dòng: tên kênh + ảnh kênh + nút xóa. VD "Kênh ABC Gaming" | bấm xóa → bỏ chặn |
| 6 | Tiêu đề từ khóa | text đậm | "Từ khóa bị chặn" | chỉ hiển thị |
| 7 | Danh sách từ khóa | nhóm chip | VD: "bạo lực ✕", "kinh dị ✕", "18+ ✕" | bấm ✕ → xóa |
| 8 | Nút thêm | nút chính | "+ Thêm kênh / từ khóa" | bấm → mở M-0801 |

**Trạng thái hiển thị**:
| Trạng thái | Khác gì so với mặc định |
|------------|------------------------|
| Chưa có kênh/từ khóa | "Chưa chặn kênh hoặc từ khóa nào" |
| Không phân giải được kênh | Dòng kênh hiển thị "Không xác định được kênh — kiểm tra lại link" |

---

### M-0801: Thêm kênh / từ khóa YouTube

**Mở từ**: S-0801 → bấm "+ Thêm kênh / từ khóa"
**Kiểu**: Bottom sheet với 2 tab nhỏ: **Kênh** · **Từ khóa**
**Mục đích**: Thêm 1 kênh (qua link/tên) hoặc từ khóa vào danh sách chặn. US-08-02 AC1, AC2.

**Thành phần**:
| # | Tên | Loại | Nội dung / Mô tả | Tương tác |
|---|-----|------|-------------------|-----------|
| 1 | Tab Kênh — ô nhập | input | "Dán link kênh hoặc nhập tên kênh" | nhập |
| 2 | Tab Kênh — kết quả phân giải | thẻ | Ảnh + tên kênh tìm được; báo "Không phân giải được kênh" nếu fail | chỉ hiển thị |
| 3 | Tab Từ khóa — ô nhập | input | "Nhập từ khóa (VD: bạo lực)" | nhập |
| 4 | Nút Thêm | nút chính | "Thêm" | bấm → lưu + đóng + T-0501 |
| 5 | Nút Hủy | nút phụ | "Hủy" | bấm → đóng |

---

### S-0901: Thời gian sử dụng

**Mục đích**: Đặt tổng thời gian dùng thiết bị/ngày, hạn mức theo ngày trong tuần, chế độ khóa máy, cấp bonus time. US-09-01.

**Bố cục**:
- Trên cùng: Header — nút back + "Thời gian sử dụng"
- Giữa (cuộn được): Thẻ hạn mức + ngày trong tuần + chế độ khóa + bonus time
- Dưới cùng (cố định): Nút "Lưu"

**Thành phần**:
| # | Tên | Loại | Nội dung / Mô tả | Tương tác |
|---|-----|------|-------------------|-----------|
| 1 | Thẻ hạn mức tổng | thẻ + giá trị | "Tổng thời gian/ngày: 3 giờ" + nút "Sửa" | bấm "Sửa" → mở M-0901 |
| 2 | Trạng thái dùng hôm nay | thanh tiến trình | "Đã dùng 2h10 / 3h00" | chỉ hiển thị |
| 3 | Hạn mức theo ngày | danh sách | Mỗi dòng: thứ + hạn mức riêng. VD "T2–T6: 2h", "T7, CN: 4h" + nút sửa | bấm → mở M-0901 cho ngày đó |
| 4 | Toggle khóa máy | dòng + toggle | "Khóa thiết bị khi hết thời gian" | bật/tắt |
| 5 | Phạm vi khóa | nhóm radio | Chỉ hiện khi (4) bật: "Khóa toàn bộ" / "Chỉ khóa app giải trí, cho phép gọi/nhắn khẩn cấp" | chọn 1 |
| 6 | Cấp thêm giờ | nút phụ | "+ Cấp thêm thời gian hôm nay" | bấm → mở M-0902 (bonus) |
| 7 | Nút Lưu | nút chính | "Lưu" cố định dưới | bấm → đẩy rule + T-0901 |

**Trạng thái hiển thị**:
| Trạng thái | Khác gì so với mặc định |
|------------|------------------------|
| Đặt 0 phút | Khi nhập 0 ở M-0901 → mở P-0901 xác nhận khóa cả ngày |
| Đang vượt hạn mức mới | Banner "Trẻ đang dùng vượt hạn mức mới. Lưu sẽ khóa ngay (nếu bật khóa)." |

---

### M-0901: Đặt hạn mức

**Mở từ**: S-0901 → bấm "Sửa" thẻ hạn mức (hoặc 1 ngày trong tuần)
**Kiểu**: Bottom sheet
**Mục đích**: Nhập số giờ/phút hạn mức. US-09-01 AC1, AC3.

**Thành phần**:
| # | Tên | Loại | Nội dung / Mô tả | Tương tác |
|---|-----|------|-------------------|-----------|
| 1 | Tiêu đề | text đậm | "Hạn mức cho T2–T6" (theo ngữ cảnh) | chỉ hiển thị |
| 2 | Chọn giờ/phút | time picker (wheel) | Giờ 0–12, phút 0–55 (bước 5) | cuộn chọn |
| 3 | Áp dụng từ | nhóm radio | "Ngay hôm nay" / "Từ ngày mai" | chọn 1 |
| 4 | Nút Lưu | nút chính | "Lưu" | bấm → đóng, cập nhật S-0901 |

---

### M-0902: Cấp thêm thời gian (bonus)

**Mở từ**: S-0901 → bấm "+ Cấp thêm thời gian hôm nay"
**Kiểu**: Bottom sheet
**Mục đích**: Cấp thêm thời lượng cho hôm nay, mở khóa máy nếu đang khóa. US-09-01 AC4.

**Thành phần**:
| # | Tên | Loại | Nội dung / Mô tả | Tương tác |
|---|-----|------|-------------------|-----------|
| 1 | Tiêu đề | text đậm | "Cấp thêm thời gian hôm nay" | chỉ hiển thị |
| 2 | Chọn nhanh | nhóm chip | "+15 phút", "+30 phút", "+1 giờ" | bấm chọn |
| 3 | Tùy chỉnh | stepper | "+ ___ phút" | +/− |
| 4 | Nút Cấp | nút chính | "Cấp thêm" | bấm → đẩy lệnh + T-0902 |

---

### P-0901: Xác nhận hạn mức 0 phút

**Mở từ**: M-0901 → lưu với giá trị 0
**Tiêu đề**: "Khóa thiết bị cả ngày?"
**Nội dung**: "Hạn mức 0 sẽ khóa thiết bị cả ngày. Tiếp tục?"
**Nút**: Tiếp tục (đỏ) / Hủy

---

### S-0902: Quản lý ứng dụng

**Mục đích**: Chọn chế độ Whitelist (chỉ cho phép app được chọn) hoặc Blacklist (chặn app được chọn), và chặn theo danh mục app. Gom US-09-02, 09-03, 09-04.

**Bố cục**:
- Trên cùng: Header — nút back + "Quản lý ứng dụng"
- Dưới header: Bộ chọn chế độ (segmented control 2 mục: **Whitelist** / **Blacklist**) + tab "Theo danh mục"
- Giữa (cuộn được): Danh sách app theo chế độ
- Dưới cùng (cố định): Nút "Lưu"

**Thành phần**:
| # | Tên | Loại | Nội dung / Mô tả | Tương tác |
|---|-----|------|-------------------|-----------|
| 1 | Bộ chọn chế độ | segmented control | "Chỉ cho phép app được chọn" (whitelist) / "Chặn app được chọn" (blacklist) — loại trừ nhau | chuyển → mở P-0902 nếu đã có cấu hình |
| 2 | Mô tả chế độ | text nhỏ xám | Whitelist: "Mọi app không được chọn sẽ bị chặn." / Blacklist: "Chỉ app được chọn bị chặn, còn lại chạy bình thường." | chỉ hiển thị |
| 3 | Nút mở chọn app | nút | "Chọn ứng dụng" → hiển thị số đã chọn "(8 app)" | bấm → mở M-0903 (danh sách app) — *xem ghi chú* |
| 4 | Tag app đã chọn | nhóm chip | icon + tên app đã chọn. VD: "YouTube ✕", "TikTok ✕" | bấm ✕ → bỏ chọn |
| 5 | Ghi chú app hệ thống | text nhỏ | "App hệ thống thiết yếu (gọi điện, cài đặt, Lá Chắn Số) luôn được phép." | chỉ hiển thị |
| 6 | Tab Theo danh mục | danh sách + toggle | Mỗi dòng: danh mục app + toggle. VD "Games", "Mạng xã hội", "Giải trí" + link "Ngoại lệ" để cho phép app cụ thể trong danh mục | bật toggle → chặn danh mục; bấm "Ngoại lệ" → chọn app cho phép |
| 7 | Nút Lưu | nút chính | "Lưu" cố định dưới | bấm → đẩy rule + T-0901 |

> Ghi chú: M-0903 ở đây dùng cho cả "chọn app" của module 09-02/03. Để tránh trùng số, **M-0902 = bonus time**, nên màn chọn app dùng **M-0903** (xem dưới). Quota app (US-09-05/06) nằm ở màn riêng S-0903.

**Trạng thái hiển thị**:
| Trạng thái | Khác gì so với mặc định |
|------------|------------------------|
| Chưa đồng bộ danh sách app | Thay danh sách bằng "Đang chờ đồng bộ danh sách ứng dụng" + link "Thêm theo package name (nâng cao)" |
| App chưa phân loại (tab danh mục) | Không bị chặn; ghi chú "App chưa phân loại không bị chặn theo danh mục." |

---

### M-0903: Chọn ứng dụng

**Mở từ**: S-0902 → bấm "Chọn ứng dụng"; hoặc S-0903 → bấm "+ Thêm app"
**Kiểu**: Bottom sheet (toàn màn, có thanh tìm)
**Mục đích**: Hiển thị danh sách app đã cài trên máy con để tích chọn. US-09-02 AC2, 09-03.

**Thành phần**:
| # | Tên | Loại | Nội dung / Mô tả | Tương tác |
|---|-----|------|-------------------|-----------|
| 1 | Ô tìm | input | "Tìm ứng dụng..." | lọc |
| 2 | Danh sách app | danh sách + checkbox | Mỗi dòng: icon app + tên + checkbox/tích | tích chọn |
| 3 | Nút Xong | nút chính | "Xong (8)" — đếm số đã chọn | bấm → đóng, cập nhật màn gọi |

**Nội dung mẫu**:
- YouTube ☑ · TikTok ☑ · Liên Quân Mobile ☑ · Zalo ☐ · Messenger ☐ · Google Lớp học ☐

---

### P-0902: Xác nhận chuyển chế độ

**Mở từ**: S-0902 → đổi Whitelist ↔ Blacklist khi đã có cấu hình
**Tiêu đề**: "Chuyển chế độ quản lý app?"
**Nội dung**: "Whitelist và Blacklist không dùng đồng thời. Cấu hình hiện tại sẽ được thay thế. Tiếp tục?"
**Nút**: Chuyển / Hủy

---

### S-0903: Giới hạn thời gian app

**Mục đích**: Đặt quota thời lượng/ngày cho từng app hoặc cho nhóm danh mục. Gom US-09-05 + US-09-06 thành 2 tab.

**Bố cục**:
- Trên cùng: Header — nút back + "Giới hạn thời gian"
- Thanh tab ngang: **Theo app** · **Theo danh mục**
- Giữa (cuộn được): Danh sách quota
- Dưới cùng (cố định): Nút "+ Thêm giới hạn"

**Thành phần — Tab "Theo app"** (US-09-05):
| # | Tên | Loại | Nội dung / Mô tả | Tương tác |
|---|-----|------|-------------------|-----------|
| 1 | Ghi chú trần | text nhỏ | "Tổng thời gian thiết bị (Thời gian sử dụng) là trần cao nhất." | chỉ hiển thị |
| 2 | Danh sách quota app | danh sách | Mỗi dòng: icon + tên app + quota ("1 giờ/ngày") + thanh đã dùng + nút sửa/xóa | bấm sửa → mở M-0903b (đặt quota) |
| 3 | Nút thêm | nút chính | "+ Thêm giới hạn" | bấm → chọn app (M-0903) rồi đặt quota |

**Thành phần — Tab "Theo danh mục"** (US-09-06):
| # | Tên | Loại | Nội dung / Mô tả | Tương tác |
|---|-----|------|-------------------|-----------|
| 4 | Danh sách quota danh mục | danh sách | Mỗi dòng: danh mục + quota. VD "Mạng xã hội: 2 giờ/ngày" + nút sửa | bấm → đặt quota |
| 5 | Ghi chú quy tắc | text nhỏ | "Khi app vừa có quota riêng vừa thuộc danh mục có quota → mức chặt hơn được áp dụng." | chỉ hiển thị |

**Trạng thái hiển thị**:
| Trạng thái | Khác gì so với mặc định |
|------------|------------------------|
| Trống | "Chưa đặt giới hạn nào" |
| App vừa bị blacklist vừa có quota | Dòng đó hiện cảnh báo xám "App đang bị chặn — quota không có hiệu lực" |

**Nội dung mẫu** (Theo app):
- YouTube · 1 giờ/ngày · đã dùng 40p
- Liên Quân Mobile · 30 phút/ngày · đã dùng 30p (hết)
- TikTok · 45 phút/ngày · đã dùng 10p

> **M-0903b: Đặt quota** (bottom sheet) — time picker giờ/phút + nút Lưu. Mở từ S-0903 khi thêm/sửa 1 mục. (Cùng dạng M-0901, gắn vào app/danh mục đã chọn.)

---

## Toast & Notification

| ID | Tên | Hiện khi | Nội dung | Kiểu |
|----|-----|----------|----------|------|
| T-0501 | Áp dụng / lỗi lưu | Lưu rule web/YouTube (M-0501, M-0502, M-0801, S-0501 toggle) | "Đã áp dụng ✓" / "Lưu thất bại. Thử lại?" (có nút Thử lại) | thành công / lỗi |
| T-0502 | Push cảnh báo chặn web | Trẻ truy cập trang bị chặn (US-05-05) | "[Bé Bin]: Truy cập pornhub.com bị chặn lúc 14:32" · gộp: "[Bé Bin]: pornhub.com bị chặn 5 lần trong 2 phút" | push notification → bấm vào dẫn tới S-0502 |
| T-0901 | Lưu cấu hình | Lưu ở S-0901 / S-0902 / S-0903 | "Đã lưu và áp dụng cho thiết bị" / "Đang chờ đồng bộ (thiết bị offline)" | thành công / thông tin |
| T-0902 | Cấp bonus time | M-0902 → bấm "Cấp thêm" | "Đã cấp thêm 30 phút cho hôm nay" | thành công |
| T-0801 | Toggle Safe Search | S-0801 bật/tắt | "Đã bật Tìm kiếm an toàn" / "Đã tắt" | thành công |

---

## Luồng chuyển màn

| Từ | Bấm | Đến | Điều kiện |
|----|-----|-----|-----------|
| Hub hồ sơ | "Lọc web" | S-0501 | - |
| S-0501 (Đã chặn) | "+ Thêm địa chỉ chặn" | M-0501 | - |
| S-0501 (Ngoại lệ) | "+ Thêm ngoại lệ" | M-0502 | - |
| S-0501 | "Bỏ chặn" / thêm domain trùng whitelist | P-0501 | - |
| S-0501 / S-0502 / S-0601(web) | "Cho phép trang này" / "Chặn trang này" | M-0502 / M-0501 (prefill) | - |
| Hub hồ sơ | "Nhật ký chặn web" | S-0502 | có ≥1 sự kiện chặn |
| T-0502 (push) | bấm vào notification | S-0502 | deep-link |
| Hub hồ sơ | "Báo cáo hoạt động" | S-0601 | - |
| S-0601 (Thời gian) | "Tùy chỉnh ▾" | M-0601 | - |
| S-0601 (YouTube) | "Chặn kênh này" | S-0801 (thêm kênh) | - |
| Hub hồ sơ | "Nội dung an toàn" | S-0801 | - |
| S-0801 | "+ Thêm kênh / từ khóa" | M-0801 | - |
| Hub hồ sơ | "Thời gian sử dụng" | S-0901 | - |
| S-0901 | "Sửa" hạn mức | M-0901 | - |
| M-0901 | Lưu giá trị 0 | P-0901 | hạn mức = 0 |
| S-0901 | "+ Cấp thêm thời gian" | M-0902 | - |
| Hub hồ sơ | "Quản lý ứng dụng" | S-0902 | - |
| S-0902 | "Chọn ứng dụng" | M-0903 | danh sách app đã đồng bộ |
| S-0902 | đổi Whitelist↔Blacklist | P-0902 | đã có cấu hình |
| Hub hồ sơ | "Giới hạn thời gian app" | S-0903 | - |
| S-0903 | "+ Thêm giới hạn" | M-0903 → M-0903b | - |

---

## Luồng có điều kiện

| Điều kiện | Luồng / hành vi |
|-----------|-----------------|
| Thiết bị con offline | Lưu rule trên server, mọi màn hiện "Đang chờ đồng bộ ⏳"; tự áp dụng khi online (US-03-08) |
| Chưa cài CA/MDM (Android/iOS) | M-0501 hiện cảnh báo khi nhập URL path; S-0601 lịch sử web chỉ ghi domain |
| Chưa cấp quyền notification | S-0503 hiện banner nhắc bật; sự kiện vẫn ghi vào S-0502 nhưng không gửi T-0502 |
| Whitelist & Blacklist | Loại trừ nhau — chuyển chế độ qua P-0902 |
| Quota app vs quota danh mục vs tổng thời gian | Mức chặt hơn thắng; tổng thời gian thiết bị (S-0901) là trần |

---

## Chưa rõ

| # | Màn | Vấn đề |
|---|-----|--------|
| 1 | S-0501 (Theo danh mục) | Danh sách danh mục cụ thể chưa chốt (OQ-09) — danh mục mẫu là tạm |
| 2 | S-0601 | Timezone hiển thị báo cáo theo máy con hay phụ huynh (OQ-13) — ảnh hưởng nhãn ngày |
| 3 | T-0502 | Ngưỡng gộp cảnh báo N lần/phút (OQ-10) — chưa rõ con số hiển thị |
| 4 | S-0801 | Cơ chế enforce Safe Search / lọc YouTube (OQ-11, OQ-12) — có thể đổi phạm vi mô tả |
| 5 | S-0903 | Ngưỡng cảnh báo trước khi khóa (OQ-15) — phần này là vế thực thi APP KID, app phụ huynh có hiển thị cấu hình ngưỡng không? |
| 6 | S-0502 / S-0601 | Retention dữ liệu (OQ-08) — có cần hiển thị "dữ liệu chỉ lưu X ngày" trên UI không? |

## Suy luận thêm

| # | Mục | Lý do |
|---|-----|-------|
| 1 | Gom S-0501 (chặn domain US-05-01 + URL US-05-02 chung 1 list "Đã chặn") | Cùng thao tác "thêm địa chỉ", phân biệt bằng chip loại → 1 màn gọn hơn 2 màn |
| 2 | Gom S-0601 3 tab (US-06-01/02/03) | Cùng là "báo cáo/lịch sử" của 1 hồ sơ |
| 3 | Gom S-0801 (Safe Search US-08-01 + YouTube US-08-02) | Cùng nhóm "nội dung an toàn", màn ngắn |
| 4 | S-0503 Cài đặt thông báo | US-05-05 AC3 nhắc "ở cài đặt thông báo" nhưng không mô tả màn |
| 5 | M-0903b Đặt quota | US-09-05/06 cần 1 sheet nhập số giờ — tài liệu không tả UI |
| 6 | P-0501, P-0901, P-0902 (dialog xác nhận) | Các thao tác phá hủy/đổi chế độ cần confirm |
| 7 | T-0501, T-0801, T-0901, T-0902 (toast) | Feedback sau khi lưu rule (suy ra từ AC "hiển thị Đã áp dụng ✓") |
