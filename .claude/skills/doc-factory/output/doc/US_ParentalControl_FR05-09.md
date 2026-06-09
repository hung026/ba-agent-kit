# Lá Chắn Số — Parental Control: Đặc tả User Story (FR-05 đến FR-09)

**Version:** 1.0 (Draft — phần APP PARENTS)
**Ngày:** 2026-06-08
**Scope:** FR-05 Smart Web Filtering · FR-06 Activity Dashboard · FR-08 Safe Search Enforce · FR-09 Phone Usage Management

> **Trạng thái:** Tài liệu này hiện chỉ đặc tả phân hệ **APP PARENTS**. Phân hệ **APP KID** (thực thi trên máy con) sẽ được bổ sung ở bản tiếp theo — xem mục [Phần còn lại](#phần-còn-lại-app-kid).

---

## 1. Executive Summary

Tài liệu đặc tả User Story cho 4 nhóm tính năng kiểm soát nội dung và thời gian của **Bảo vệ con cái (Parental Control)** trong app **Lá Chắn Số**:

- **FR-05 Smart Web Filtering** — chặn/lọc web theo domain, URL, danh mục; ghi log và cảnh báo.
- **FR-06 Activity Dashboard** — báo cáo thời gian dùng thiết bị/app, lịch sử web, lịch sử YouTube.
- **FR-08 Safe Search Enforce** — bật tìm kiếm an toàn, lọc nội dung YouTube. *(Tách ra từ FR-06 bị trùng ID — xem OQ-07 đã xử lý.)*
- **FR-09 Phone Usage Management** — quản lý thời gian sử dụng thiết bị và app, whitelist/blacklist, giới hạn theo app và danh mục. *(Đã gộp toàn bộ FR-07 vào FR-09.)*

**Phân chia phân hệ (theo yêu cầu):**

| Phân hệ | Vai trò | Tiền tố US |
|---|---|---|
| App phụ huynh | Cấu hình rule, xem báo cáo, nhận cảnh báo | `[APP PARENTS]` |
| App Kid | Thực thi rule trên máy con (sẽ viết sau) | `[APP KID]` |

Các use case "chạy ở cả 2 app" được tách đôi: vế **cấu hình** thuộc APP PARENTS, vế **thực thi** thuộc APP KID.

**Actors (phần này):**
- **Phụ huynh** — người dùng App Lá Chắn Số.
- **Hệ thống** — backend Lá Chắn Số (lưu rule, đẩy lệnh, tổng hợp báo cáo).

**Phụ thuộc nền tảng (đã đặc tả ở tài liệu FR-01→04):** mọi US cấu hình bên dưới chỉ áp dụng khi thiết bị con **đã pair** (US-01-07) và **đã gắn vào hồ sơ trẻ** (US-03-06). Mọi thay đổi rule được đẩy xuống máy con qua cơ chế **gửi lệnh quản lý** (US-03-08): online → áp dụng ngay; offline → pending FIFO.

---

## 2. User Story List

### APP PARENTS

| US ID | User Story | Actor | Điều kiện trước | Điều kiện sau |
|---|---|---|---|---|
| US-05-01 | [APP PARENTS] Chặn web theo domain/subdomain | Phụ huynh | Thiết bị đã gắn hồ sơ | Domain bị chặn, rule đẩy xuống máy con |
| US-05-02 | [APP PARENTS] Chặn web theo path/URL đầy đủ | Phụ huynh | Thiết bị đã gắn hồ sơ, CA/MDM đã cài | URL cụ thể bị chặn |
| US-05-03 | [APP PARENTS] Chặn web theo danh mục nội dung | Phụ huynh | Thiết bị đã gắn hồ sơ | Danh mục được bật chặn, áp lên máy con |
| US-05-04 | [APP PARENTS] Whitelist URL/domain ngoại lệ | Phụ huynh | Có rule chặn đang áp dụng | URL ngoại lệ được phép truy cập |
| US-05-05 | [APP PARENTS] Nhận cảnh báo khi trẻ truy cập web bị chặn | Phụ huynh | Đã cấp quyền notification | Phụ huynh nhận cảnh báo realtime |
| US-05-06 | [APP PARENTS] Xem nhật ký chặn web | Phụ huynh | Có ít nhất 1 sự kiện chặn | Danh sách log hiển thị đầy đủ |
| US-06-01 | [APP PARENTS] Xem báo cáo thời gian dùng thiết bị/app | Phụ huynh | Máy con đã đồng bộ usage | Báo cáo usage hiển thị theo mốc thời gian |
| US-06-02 | [APP PARENTS] Xem lịch sử truy cập web | Phụ huynh | Máy con đã đồng bộ lịch sử web | Lịch sử web hiển thị theo thiết bị |
| US-06-03 | [APP PARENTS] Xem lịch sử xem YouTube | Phụ huynh | Máy con đã đồng bộ lịch sử YouTube | Lịch sử YouTube hiển thị |
| US-08-01 | [APP PARENTS] Bật Google/Bing Safe Search | Phụ huynh | Thiết bị đã gắn hồ sơ | Safe Search được enforce trên máy con |
| US-08-02 | [APP PARENTS] Quản lý lọc nội dung YouTube | Phụ huynh | Thiết bị đã gắn hồ sơ | Rule lọc YouTube được áp dụng |
| US-09-01 | [APP PARENTS] Thiết lập tổng thời gian dùng thiết bị/ngày | Phụ huynh | Thiết bị đã gắn hồ sơ | Giới hạn tổng thời gian + chế độ khóa máy được lưu |
| US-09-02 | [APP PARENTS] Whitelist app được phép chạy | Phụ huynh | Thiết bị đã gắn hồ sơ | Danh sách app cho phép được áp dụng |
| US-09-03 | [APP PARENTS] Blacklist app bị chặn | Phụ huynh | Thiết bị đã gắn hồ sơ | App bị chặn trên máy con |
| US-09-04 | [APP PARENTS] Chặn app theo danh mục | Phụ huynh | Thiết bị đã gắn hồ sơ | Danh mục app bị chặn |
| US-09-05 | [APP PARENTS] Đặt giới hạn thời gian theo từng app/ngày | Phụ huynh | Thiết bị đã gắn hồ sơ | Quota thời gian theo app được lưu |
| US-09-06 | [APP PARENTS] Đặt giới hạn thời gian theo nhóm danh mục/ngày | Phụ huynh | Thiết bị đã gắn hồ sơ | Quota thời gian theo danh mục được lưu |

---

## 3. Chi tiết User Story

### APP PARENTS

---

#### FR-05: Smart Web Filtering — Lọc web thông minh

---

##### US-05-01: [APP PARENTS] Chặn web theo domain/subdomain

1. **US statement**
**As a** phụ huynh
**I want** chặn một domain hoặc subdomain cụ thể
**So that** trẻ không truy cập được các trang web tôi cho là không phù hợp

2. **Dependencies**: US-03-06 (thiết bị đã gắn hồ sơ), US-03-08 (đẩy lệnh)

3. **Acceptance Criteria**:

```
AC1: Thêm domain vào danh sách chặn
GIVEN tôi ở màn hình "Lọc web" của hồ sơ
WHEN tôi nhập một domain hợp lệ (VD: example.com) và bấm "Chặn"
THEN domain được thêm vào danh sách chặn của hồ sơ
AND rule được đẩy xuống thiết bị con (ngay nếu online, pending nếu offline)
AND App cha mẹ hiển thị trạng thái "Đã áp dụng ✓" 

AC2: Chặn cả subdomain
GIVEN tôi chặn domain example.com
WHEN rule được áp dụng
THEN mọi subdomain (a.example.com, b.example.com) cũng bị chặn theo mặc định

AC3: Nhập domain không hợp lệ
GIVEN tôi đang nhập domain
WHEN chuỗi nhập sai định dạng (VD: "abc", có khoảng trắng, ký tự lạ)
THEN hiển thị lỗi inline: "Domain không hợp lệ"
AND nút "Chặn" bị vô hiệu hóa

AC4: Domain đã có trong danh sách
GIVEN domain example.com đã bị chặn
WHEN tôi nhập lại example.com
THEN hiển thị thông báo "Domain này đã có trong danh sách chặn"
AND không tạo bản ghi trùng

AC5: Bỏ chặn domain
GIVEN domain đang bị chặn
WHEN tôi bấm "Bỏ chặn" trên domain đó
THEN domain bị xóa khỏi danh sách, rule cập nhật xuống máy con
```

4. **Exception & Edge Cases**:

| Scenario | Cách xử lý | Cơ chế Fallback |
|---|---|---|
| Domain xung đột với whitelist (US-05-04) | Whitelist được ưu tiên — cảnh báo "Domain này đang nằm trong danh sách ngoại lệ. Xóa khỏi ngoại lệ trước?" | Không áp rule, giữ nguyên |
| Network lỗi khi lưu rule | Toast "Lưu thất bại. Thử lại?" | Nút retry; rule chưa được lưu cho tới khi server xác nhận |
| Thiết bị offline | Lưu rule trên server, trạng thái "Đang chờ đồng bộ" | Áp dụng tự động khi máy con online (US-03-08) |

5. **Technical Context & NFR**:
- Nhập domain: chuẩn hóa về lowercase, bỏ `http(s)://` và path nếu user dán nguyên URL.
- Chặn ở mức domain hoạt động kể cả khi chưa có CA Certificate (dựa trên DNS/SNI) — khác US-05-02.

---

##### US-05-02: [APP PARENTS] Chặn web theo path/URL đầy đủ

1. **US statement**
**As a** phụ huynh
**I want** chặn một đường dẫn/URL cụ thể thay vì cả domain
**So that** tôi chặn được nội dung xấu mà vẫn cho phép phần còn lại của trang

2. **Dependencies**: US-03-06, US-03-08, US-01-05/US-01-06 (CA Certificate Android / MDM iOS đã cài)

3. **Acceptance Criteria**:

```
AC1: Chặn URL cụ thể
GIVEN tôi ở màn hình "Lọc web"
WHEN tôi nhập URL đầy đủ (VD: example.com/forum/adult) và bấm "Chặn"
THEN chỉ đường dẫn đó bị chặn, các trang khác của example.com vẫn truy cập được
AND rule được đẩy xuống máy con

AC2: Cảnh báo phụ thuộc CA/MDM
GIVEN thiết bị con chưa cài CA Certificate (Android) hoặc MDM (iOS)
WHEN tôi tạo rule chặn theo path/URL
THEN hệ thống hiển thị cảnh báo: "Chặn theo đường dẫn cần quyền giám sát HTTPS. Thiết bị [Tên] chưa cài — rule có thể không hiệu lực với trang HTTPS."
AND vẫn cho lưu rule (không block)

AC3: URL có query string
GIVEN tôi nhập URL kèm tham số (VD: example.com/search?q=x)
WHEN lưu rule
THEN phụ huynh chọn: "Chặn đúng URL này" hoặc "Chặn mọi URL bắt đầu bằng đường dẫn này (prefix)" (cho phép tối thiểu chọn 1. tối đa chọn 2)
```

4. **Exception & Edge Cases**:

| Scenario | Cách xử lý | Cơ chế Fallback |
|---|---|---|
| Trang dùng HTTPS nhưng máy con thiếu CA | Path-level filtering không bóc tách được URL → chỉ chặn được ở mức domain | Ghi nhận "rule áp dụng một phần", thông báo phụ huynh |
| URL quá dài / chứa ký tự encode | Chuẩn hóa URL-decode trước khi lưu, giới hạn độ dài hợp lý | Báo lỗi nếu vượt giới hạn |

5. **Technical Context & NFR**:
- Path/URL filtering yêu cầu giải mã HTTPS → bắt buộc CA Certificate (Android) hoặc proxy qua MDM (iOS).
- Cơ chế khớp: exact match hoặc prefix match (theo lựa chọn ở AC3).

---

##### US-05-03: [APP PARENTS] Chặn web theo danh mục nội dung

1. **US statement**
**As a** phụ huynh
**I want** chặn theo nhóm nội dung (Adult, Gambling, Violence…) thay vì từng trang
**So that** tôi chặn được hàng loạt trang xấu mà không phải liệt kê thủ công

2. **Dependencies**: US-03-06, US-03-08

3. **Acceptance Criteria**:

```
AC1: Hiển thị danh sách danh mục
GIVEN tôi ở màn hình "Lọc web" → tab "Theo danh mục"
WHEN màn hình tải xong
THEN hiển thị danh sách các danh mục với toggle bật/tắt (VD: Người lớn, Cờ bạc, Bạo lực, Vũ khí, Ma túy…)
AND mỗi danh mục có mô tả ngắn về loại nội dung

AC2: Bật chặn một danh mục
GIVEN tôi xem danh sách danh mục
WHEN tôi bật toggle danh mục "Người lớn"
THEN toàn bộ trang thuộc danh mục đó bị chặn
AND rule được đẩy xuống máy con

AC3: Một trang thuộc danh mục bị chặn nhưng phụ huynh muốn cho phép
GIVEN danh mục "Mạng xã hội" đang bị chặn và trang facebook.com thuộc danh mục đó
WHEN phụ huynh thêm facebook.com vào whitelist (US-05-04)
THEN facebook.com được phép dù danh mục vẫn đang bật chặn (whitelist ưu tiên)
```

4. **Exception & Edge Cases**:

| Scenario | Cách xử lý | Cơ chế Fallback |
|---|---|---|
| Trang chưa được phân loại | Mặc định **cho phép** (không chặn nhầm) — đồng bộ với cơ chế tự gán danh mục ở App Kid | Phụ huynh có thể chặn thủ công qua US-05-01 |
| Một trang thuộc nhiều danh mục, có cái bật cái tắt | Chỉ cần thuộc 1 danh mục đang bật chặn → bị chặn (trừ khi có trong whitelist) | — |
| Nguồn phân loại danh mục không phản hồi | Dùng cache phân loại gần nhất | Thông báo "Danh mục có thể chưa cập nhật mới nhất" |

5. **Technical Context & NFR**:
- Danh sách danh mục và nguồn phân loại web: **TBD — OQ-09** (dùng bộ phân loại bên thứ 3 hay tự xây?).
- ⚠ Sensitive data: việc đối chiếu URL với danh mục liên quan dữ liệu duyệt web của trẻ — xử lý theo quy định. **Legal check required.**

---

##### US-05-04: [APP PARENTS] Whitelist URL/domain ngoại lệ

1. **US statement**
**As a** phụ huynh
**I want** cho phép một URL/domain dù nó đang bị chặn bởi rule chung
**So that** tôi linh hoạt mở ngoại lệ cho trang trẻ cần dùng

2. **Dependencies**: US-05-01 hoặc US-05-03 (có rule chặn đang áp dụng)

3. **Acceptance Criteria**:

```
AC1: Thêm ngoại lệ
GIVEN có rule chặn theo domain hoặc danh mục đang áp dụng
WHEN tôi thêm một domain/URL vào danh sách "Ngoại lệ (cho phép)"
THEN trang đó được phép truy cập, ghi đè mọi rule chặn liên quan
AND rule cập nhật xuống máy con

AC2: Thứ tự ưu tiên rule
GIVEN một URL vừa khớp danh sách chặn vừa khớp whitelist
WHEN máy con đánh giá rule
THEN whitelist được ưu tiên cao nhất → trang được phép

AC3: Xóa ngoại lệ
GIVEN domain đang trong whitelist
WHEN tôi xóa khỏi whitelist
THEN domain quay lại chịu các rule chặn hiện hành
```

4. **Exception & Edge Cases**:

| Scenario | Cách xử lý | Cơ chế Fallback |
|---|---|---|
| Whitelist một domain rộng (VD: google.com) vô tình mở quá nhiều | Cảnh báo "Cho phép cả domain này sẽ mở mọi đường dẫn con. Tiếp tục?" | Gợi ý whitelist theo URL cụ thể thay vì cả domain |
| Network lỗi khi lưu | Toast retry | Rule chưa lưu cho tới khi server xác nhận |

5. **Technical Context & NFR**:
- Quy tắc ưu tiên thống nhất toàn hệ thống: **Whitelist > Blacklist/URL > Danh mục**.

---

##### US-05-05: [APP PARENTS] Nhận cảnh báo khi trẻ truy cập web bị chặn

1. **US statement**
**As a** phụ huynh
**I want** nhận thông báo khi trẻ cố truy cập một trang đang bị chặn
**So that** tôi biết hành vi và mối quan tâm của trẻ kịp thời

2. **Dependencies**: US-01-02 (đã cấp quyền notification), US-05-01/03 (có rule chặn)

3. **Acceptance Criteria**:

```
AC1: Bắn cảnh báo khi có lượt truy cập bị chặn
GIVEN trẻ cố mở một trang đang bị chặn
WHEN máy con chặn và báo sự kiện về server
THEN phụ huynh nhận push notification: "[Tên thiết bị]: Truy cập [domain] bị chặn lúc HH:mm"
AND bấm vào notification dẫn tới nhật ký chặn web (US-05-06) — deep-link theo US-04-02

AC2: Throttle khi cùng một trang bị truy cập nhiều lần
GIVEN trẻ bấm vào trang bị chặn nhiều lần liên tiếp
WHEN số lượt vượt ngưỡng N lần/phút (N = TBD — OQ-10)
THEN gom thành 1 notification: "[Tên thiết bị]: [domain] bị chặn X lần trong Y phút"

AC3: Bật/tắt cảnh báo loại này
GIVEN tôi ở cài đặt thông báo
WHEN tôi tắt "Cảnh báo chặn web"
THEN sự kiện vẫn được ghi log (US-05-06) nhưng không gửi push notification
```

4. **Exception & Edge Cases**:

| Scenario | Cách xử lý | Cơ chế Fallback |
|---|---|---|
| Phụ huynh chưa cấp quyền notification | Không gửi push, vẫn ghi log | Hiển thị banner nhắc bật thông báo trong app |
| Máy con offline khi xảy ra sự kiện | Sự kiện được buffer trên máy con, đẩy về khi online | Notification gửi trễ kèm timestamp gốc của sự kiện |

---

##### US-05-06: [APP PARENTS] Xem nhật ký chặn web

1. **US statement**
**As a** phụ huynh
**I want** xem danh sách các lượt truy cập web bị chặn
**So that** tôi nắm được trẻ đã cố vào những trang nào và khi nào

2. **Dependencies**: US-05-01/03 (có rule chặn để phát sinh log)

3. **Acceptance Criteria**:

```
AC1: Hiển thị nhật ký chặn
GIVEN có ít nhất 1 sự kiện chặn web
WHEN tôi mở "Nhật ký chặn web" của thiết bị/hồ sơ
THEN hiển thị danh sách, mỗi dòng gồm: domain/URL, thời gian, trạng thái (đã chặn), lý do chặn (domain/URL/danh mục)
AND sắp xếp mới nhất lên đầu

AC2: Lọc và tìm kiếm
GIVEN danh sách có nhiều bản ghi
WHEN tôi lọc theo khoảng thời gian hoặc tìm theo domain
THEN danh sách cập nhật đúng kết quả lọc

AC3: Empty state
GIVEN chưa có lượt truy cập bị chặn nào
WHEN tôi mở nhật ký
THEN hiển thị: "Chưa có lượt truy cập bị chặn nào được ghi nhận"

AC4: Hành động nhanh từ một bản ghi
GIVEN tôi xem một dòng log của domain bị chặn
WHEN tôi bấm "Cho phép trang này"
THEN domain/URL được thêm vào whitelist (US-05-04)
```

4. **Exception & Edge Cases**:

| Scenario | Cách xử lý | Cơ chế Fallback |
|---|---|---|
| Dữ liệu log lớn (nhiều nghìn bản ghi) | Phân trang / lazy-load theo trang | Giới hạn hiển thị mặc định 30 ngày gần nhất |

5. **Technical Context & NFR**:
- ⚠ Sensitive data: lịch sử truy cập web của trẻ — dữ liệu cá nhân người dưới 18 tuổi. Retention: **TBD — OQ-08**. **Legal check required.**

---

#### FR-08: Safe Search Enforce — Tìm kiếm an toàn

---

##### US-08-01: [APP PARENTS] Bật Google/Bing Safe Search

1. **US statement**
**As a** phụ huynh
**I want** bắt buộc chế độ tìm kiếm an toàn trên các công cụ tìm kiếm
**So that** kết quả tìm kiếm của trẻ được lọc nội dung người lớn ngay từ nguồn

2. **Dependencies**: US-03-06, US-03-08

3. **Acceptance Criteria**:

```
AC1: Bật Safe Search
GIVEN tôi ở màn hình "Tìm kiếm an toàn" của hồ sơ
WHEN tôi bật toggle "Bắt buộc Safe Search"
THEN hệ thống enforce Safe Search trên Google và Bing trên máy con
AND rule được đẩy xuống thiết bị

AC2: Trẻ không thể tự tắt
GIVEN Safe Search đang được enforce
WHEN trẻ vào cài đặt công cụ tìm kiếm và cố tắt Safe Search
THEN cài đặt bị giữ ở trạng thái bật (enforce ở tầng mạng/thiết bị)

AC3: Tắt Safe Search
GIVEN Safe Search đang bật
WHEN phụ huynh tắt toggle
THEN enforce được gỡ, máy con trở lại bình thường
```

4. **Exception & Edge Cases**:

| Scenario | Cách xử lý | Cơ chế Fallback |
|---|---|---|
| Công cụ tìm kiếm khác (DuckDuckGo, Yandex…) không hỗ trợ enforce | Thông báo phạm vi: "Tìm kiếm an toàn áp dụng cho Google, Bing" | Gợi ý chặn các công cụ không hỗ trợ qua US-05-01 |
| Máy con dùng VPN/DNS riêng né enforce | Ghi nhận giới hạn kỹ thuật | **TBD — OQ-11**: cơ chế enforce (DNS rewrite / MDM / header) cần chốt với Tech Lead |

5. **Technical Context & NFR**:
- Cơ chế enforce Safe Search: **TBD — OQ-11** (DNS-based forced safe search vs cấu hình qua MDM).

---

##### US-08-02: [APP PARENTS] Quản lý lọc nội dung YouTube

1. **US statement**
**As a** phụ huynh
**I want** giới hạn nội dung YouTube theo kênh và từ khóa
**So that** trẻ không xem được kênh/nội dung tôi cho là không phù hợp

2. **Dependencies**: US-03-06, US-03-08

3. **Acceptance Criteria**:

```
AC1: Chặn kênh YouTube cụ thể
GIVEN tôi ở màn hình "Lọc YouTube"
WHEN tôi thêm một kênh (qua link hoặc tên kênh) vào danh sách chặn
THEN nội dung kênh đó bị chặn trên máy con
AND rule được đẩy xuống thiết bị

AC2: Chặn theo từ khóa
GIVEN tôi thêm từ khóa (VD: "bạo lực")
WHEN trẻ tìm/xem video có tiêu đề chứa từ khóa
THEN video bị chặn / không hiển thị

AC3: Bật chế độ hạn chế (Restricted Mode)
GIVEN tôi bật "Chế độ hạn chế YouTube"
WHEN rule áp dụng
THEN YouTube Restricted Mode được enforce trên máy con
```

4. **Exception & Edge Cases**:

| Scenario | Cách xử lý | Cơ chế Fallback |
|---|---|---|
| Trẻ xem YouTube trong app khác / nhúng web | Lọc dựa trên domain/traffic YouTube, có thể không bắt được nội dung nhúng | Ghi nhận giới hạn; chặn cả app YouTube qua FR-09 nếu cần |
| Kênh đổi tên/ID | Lưu theo channel ID thay vì tên hiển thị | Cảnh báo nếu không phân giải được kênh |

5. **Technical Context & NFR**:
- Cơ chế lọc YouTube (YouTube API vs enforce Restricted Mode qua header/DNS): **TBD — OQ-12**.
- ⚠ Sensitive data: liên quan lịch sử/hành vi xem của trẻ — **Legal check required.**

---

#### FR-06: Activity Dashboard — Báo cáo hoạt động

---

##### US-06-01: [APP PARENTS] Xem báo cáo thời gian dùng thiết bị/app

1. **US statement**
**As a** phụ huynh
**I want** xem thống kê thời gian sử dụng thiết bị và từng app
**So that** tôi hiểu trẻ dùng máy vào việc gì và bao lâu

2. **Dependencies**: máy con đã đồng bộ usage (US-06-03 phân hệ APP KID — sẽ viết sau)

3. **Acceptance Criteria**:

```
AC1: Báo cáo theo mốc thời gian
GIVEN máy con đã đồng bộ dữ liệu usage
WHEN tôi mở "Báo cáo hoạt động" của hồ sơ/thiết bị
THEN hiển thị tổng thời gian dùng màn hình theo: hôm nay, 7 ngày, 30 ngày
AND có biểu đồ theo ngày/giờ

AC2: Top app và nhóm danh mục
GIVEN có dữ liệu usage theo app
WHEN tôi xem báo cáo
THEN hiển thị top app dùng nhiều nhất kèm thời lượng
AND thống kê theo nhóm danh mục (Games, Social, Education…)

AC3: Chọn khoảng thời gian tùy chỉnh
GIVEN tôi ở màn hình báo cáo
WHEN tôi chọn khoảng ngày tùy chỉnh
THEN số liệu được tính lại đúng khoảng đã chọn

AC4: Empty / chưa có dữ liệu
GIVEN máy con chưa đồng bộ hoặc mới pair
WHEN tôi mở báo cáo
THEN hiển thị: "Chưa có dữ liệu hoạt động. Dữ liệu sẽ xuất hiện sau khi thiết bị đồng bộ."
```

4. **Exception & Edge Cases**:

| Scenario | Cách xử lý | Cơ chế Fallback |
|---|---|---|
| Dữ liệu đồng bộ trễ (máy con offline lâu) | Hiển thị mốc "Cập nhật lần cuối: HH:mm" | Báo cáo dựa trên dữ liệu gần nhất |
| Lệch múi giờ giữa máy con và phụ huynh | Quy đổi theo múi giờ thiết bị con | **TBD — OQ-13**: chốt timezone hiển thị báo cáo |

5. **Technical Context & NFR**:
- Mốc reset "ngày": theo timezone thiết bị con — **TBD — OQ-13**.
- ⚠ Sensitive data: dữ liệu usage của trẻ — **Legal check required.**

---

##### US-06-02: [APP PARENTS] Xem lịch sử truy cập web

1. **US statement**
**As a** phụ huynh
**I want** xem các trang web trẻ đã truy cập theo thiết bị
**So that** tôi nắm được thói quen duyệt web của trẻ

2. **Dependencies**: máy con đã đồng bộ lịch sử web

3. **Acceptance Criteria**:

```
AC1: Hiển thị lịch sử web
GIVEN máy con đã đồng bộ lịch sử web
WHEN tôi mở "Lịch sử web" của thiết bị
THEN hiển thị danh sách trang đã truy cập: domain/URL, thời gian, số lần
AND sắp xếp mới nhất lên đầu

AC2: Lọc theo thời gian / tìm kiếm
GIVEN danh sách nhiều bản ghi
WHEN tôi lọc theo ngày hoặc tìm theo domain
THEN danh sách cập nhật đúng

AC3: Hành động nhanh
GIVEN tôi xem một domain trong lịch sử
WHEN tôi bấm "Chặn trang này"
THEN domain được thêm vào danh sách chặn (US-05-01)
```

4. **Exception & Edge Cases**:

| Scenario | Cách xử lý | Cơ chế Fallback |
|---|---|---|
| Trang HTTPS không bóc tách được URL (thiếu CA) | Chỉ ghi nhận ở mức domain | Hiển thị "(chỉ ghi nhận domain)" |
| Lịch sử rất lớn | Phân trang, giới hạn mặc định 30 ngày | — |

5. **Technical Context & NFR**:
- ⚠ Sensitive data: lịch sử web của trẻ — Retention **TBD — OQ-08**. **Legal check required.**

---

##### US-06-03: [APP PARENTS] Xem lịch sử xem YouTube

1. **US statement**
**As a** phụ huynh
**I want** xem lịch sử video YouTube trẻ đã xem
**So that** tôi biết trẻ tiêu thụ nội dung gì trên YouTube

2. **Dependencies**: máy con đã đồng bộ lịch sử YouTube, US-08-02 (cơ chế giám sát YouTube)

3. **Acceptance Criteria**:

```
AC1: Hiển thị lịch sử YouTube
GIVEN máy con đã đồng bộ lịch sử xem
WHEN tôi mở "Lịch sử YouTube"
THEN hiển thị danh sách video: tiêu đề/kênh (nếu lấy được), thời gian xem, thời lượng
AND sắp xếp mới nhất lên đầu

AC2: Hành động nhanh
GIVEN tôi xem một video/kênh trong lịch sử
WHEN tôi bấm "Chặn kênh này"
THEN kênh được thêm vào danh sách chặn YouTube (US-08-02)

AC3: Empty state
GIVEN chưa có dữ liệu
WHEN tôi mở lịch sử
THEN hiển thị "Chưa có lịch sử xem YouTube"
```

4. **Exception & Edge Cases**:

| Scenario | Cách xử lý | Cơ chế Fallback |
|---|---|---|
| Không phân giải được tiêu đề/kênh từ traffic | Hiển thị video ID hoặc URL thô | Ghi nhận giới hạn dữ liệu |
| Xem YouTube qua app gốc (không qua web) | Phụ thuộc cơ chế giám sát ở OQ-12 | Có thể chỉ ghi nhận một phần |

5. **Technical Context & NFR**:
- Khả năng lấy lịch sử phụ thuộc cơ chế giám sát YouTube — **TBD — OQ-12**.
- ⚠ Sensitive data: hành vi xem của trẻ — **Legal check required.**

---

#### FR-09: Phone Usage Management — Quản lý thời gian & ứng dụng

> **Lưu ý gộp:** FR-09 đã bao gồm toàn bộ nội dung của FR-07 cũ (whitelist/blacklist app, giới hạn theo app/danh mục) và FR-09 cũ (tổng thời gian thiết bị, khóa máy).

---

##### US-09-01: [APP PARENTS] Thiết lập tổng thời gian dùng thiết bị/ngày

1. **US statement**
**As a** phụ huynh
**I want** giới hạn tổng thời gian dùng màn hình mỗi ngày và bật khóa máy khi hết giờ
**So that** trẻ không dùng thiết bị quá mức

2. **Dependencies**: US-03-06, US-03-08

3. **Acceptance Criteria**:

```
AC1: Đặt tổng thời gian/ngày
GIVEN tôi ở màn hình "Thời gian sử dụng" của hồ sơ
WHEN tôi đặt hạn mức tổng (VD: 3 giờ/ngày) và lưu
THEN hạn mức được lưu và đẩy xuống máy con
AND áp dụng từ chu kỳ ngày kế tiếp (hoặc ngay hôm nay — theo lựa chọn)

AC2: Bật chế độ khóa máy khi hết giờ
GIVEN tôi đã đặt hạn mức
WHEN tôi bật "Khóa thiết bị khi hết thời gian"
THEN khi máy con dùng hết hạn mức, thiết bị sẽ bị khóa (vế thực thi ở APP KID)
AND phụ huynh chọn phạm vi khóa: "Khóa toàn bộ" hoặc "Chỉ khóa app giải trí, cho phép gọi/nhắn khẩn cấp"

AC3: Thiết lập theo ngày trong tuần
GIVEN tôi muốn hạn mức khác nhau giữa ngày học và cuối tuần
WHEN tôi đặt hạn mức riêng cho từng ngày/nhóm ngày
THEN hệ thống áp dụng đúng hạn mức theo ngày

AC4: Cho thêm giờ tạm thời (bonus time)
GIVEN trẻ đã hết hạn mức hôm nay
WHEN tôi cấp thêm thời gian (VD: +30 phút)
THEN máy con mở khóa và cộng thêm đúng thời lượng cho hôm nay
```

4. **Exception & Edge Cases**:

| Scenario | Cách xử lý | Cơ chế Fallback |
|---|---|---|
| Đổi hạn mức khi trẻ đang dùng vượt mức mới | Áp dụng từ thời điểm lưu; nếu đã vượt → khóa ngay (nếu bật khóa) | Cảnh báo phụ huynh trước khi áp dụng |
| Múi giờ / mốc reset 00:00 | Reset theo timezone máy con — **TBD — OQ-13** | — |
| Đặt 0 phút | Cảnh báo "Hạn mức 0 sẽ khóa thiết bị cả ngày. Tiếp tục?" | Yêu cầu xác nhận |

5. **Technical Context & NFR**:
- Vế **thực thi khóa máy** thuộc phân hệ APP KID (sẽ đặc tả: US-09-xx [APP KID]).
- Mốc reset hạn mức ngày: **TBD — OQ-13**.

---

##### US-09-02: [APP PARENTS] Whitelist app được phép chạy

1. **US statement**
**As a** phụ huynh
**I want** thiết lập danh sách app được phép chạy
**So that** trẻ chỉ dùng được những app tôi cho phép

2. **Dependencies**: US-03-06, US-03-08

3. **Acceptance Criteria**:

```
AC1: Bật chế độ whitelist
GIVEN tôi ở màn hình "Quản lý ứng dụng" → chế độ "Chỉ cho phép app được chọn"
WHEN tôi chọn các app cho phép và lưu
THEN mọi app KHÔNG nằm trong danh sách bị chặn trên máy con
AND rule được đẩy xuống thiết bị

AC2: Danh sách app trên máy con
GIVEN máy con đã đồng bộ danh sách app đã cài
WHEN tôi mở màn hình chọn app
THEN hiển thị các app đã cài (tên + icon) để tích chọn

AC3: App hệ thống thiết yếu
GIVEN chế độ whitelist đang bật
WHEN rule áp dụng
THEN các app hệ thống thiết yếu (gọi điện, cài đặt, App Kid) luôn được phép, không thể chặn nhầm
```

4. **Exception & Edge Cases**:

| Scenario | Cách xử lý | Cơ chế Fallback |
|---|---|---|
| Mâu thuẫn whitelist app vs blacklist app (US-09-03) | Hai chế độ loại trừ nhau — chọn 1 chế độ tại 1 thời điểm | Cảnh báo khi chuyển chế độ |
| Máy con chưa đồng bộ danh sách app | Hiển thị "Đang chờ đồng bộ danh sách ứng dụng" | Cho phép thêm theo package name thủ công (nâng cao) |

5. **Technical Context & NFR**:
- Whitelist và Blacklist (US-09-03) là 2 chế độ loại trừ — **TBD — OQ-14**: xác nhận có cho phép dùng đồng thời không.

---

##### US-09-03: [APP PARENTS] Blacklist app bị chặn

1. **US statement**
**As a** phụ huynh
**I want** chặn các app cụ thể
**So that** trẻ không mở được những app tôi không cho phép trong khi vẫn dùng được phần còn lại

2. **Dependencies**: US-03-06, US-03-08

3. **Acceptance Criteria**:

```
AC1: Thêm app vào blacklist
GIVEN tôi ở chế độ "Chặn app được chọn"
WHEN tôi chọn các app cần chặn và lưu
THEN các app đó bị chặn trên máy con, các app khác vẫn chạy
AND rule được đẩy xuống thiết bị

AC2: Bỏ chặn app
GIVEN một app đang bị chặn
WHEN tôi bỏ chọn app đó
THEN app được phép chạy lại sau khi rule cập nhật
```

4. **Exception & Edge Cases**:

| Scenario | Cách xử lý | Cơ chế Fallback |
|---|---|---|
| App bị chặn đang chạy nền | Khi áp rule, máy con đưa app về màn khóa nếu được mở (vế thực thi APP KID) | — |
| App vừa được cài mới sau khi set rule | Đồng bộ danh sách app định kỳ; app mới mặc định theo chế độ hiện hành | Thông báo phụ huynh "Có app mới được cài trên [Tên thiết bị]" |

---

##### US-09-04: [APP PARENTS] Chặn app theo danh mục

1. **US statement**
**As a** phụ huynh
**I want** chặn cả một nhóm danh mục app (Games, Social…)
**So that** tôi chặn hàng loạt mà không phải chọn từng app

2. **Dependencies**: US-03-06, US-03-08

3. **Acceptance Criteria**:

```
AC1: Chặn theo danh mục
GIVEN tôi ở màn hình "Quản lý ứng dụng" → tab "Theo danh mục"
WHEN tôi bật chặn danh mục "Games"
THEN mọi app thuộc danh mục Games bị chặn trên máy con
AND rule được đẩy xuống thiết bị

AC2: Ngoại lệ trong danh mục
GIVEN danh mục Games đang bị chặn
WHEN tôi cho phép một game cụ thể (ngoại lệ)
THEN game đó vẫn chạy được dù danh mục đang bị chặn
```

4. **Exception & Edge Cases**:

| Scenario | Cách xử lý | Cơ chế Fallback |
|---|---|---|
| App chưa được phân loại danh mục | Mặc định không chặn | Phụ huynh chặn thủ công qua US-09-03 |
| App thuộc nhiều danh mục | Thuộc 1 danh mục đang chặn → bị chặn (trừ khi có ngoại lệ) | — |

5. **Technical Context & NFR**:
- Nguồn phân loại danh mục app: **TBD — OQ-09**.

---

##### US-09-05: [APP PARENTS] Đặt giới hạn thời gian theo từng app/ngày

1. **US statement**
**As a** phụ huynh
**I want** đặt thời lượng tối đa cho từng app mỗi ngày
**So that** trẻ dùng được app nhưng không quá thời gian cho phép

2. **Dependencies**: US-03-06, US-03-08

3. **Acceptance Criteria**:

```
AC1: Đặt quota cho một app
GIVEN tôi chọn một app (VD: YouTube)
WHEN tôi đặt giới hạn (VD: 1 giờ/ngày) và lưu
THEN quota được lưu và đẩy xuống máy con
AND khi trẻ dùng hết → app bị khóa (vế thực thi APP KID)

AC2: Cảnh báo trước khi hết giờ
GIVEN một app có quota
WHEN trẻ gần dùng hết (còn ngưỡng cảnh báo — TBD OQ-15)
THEN máy con hiển thị cảnh báo trước cho trẻ (vế thực thi APP KID)

AC3: Reset hàng ngày
GIVEN quota đã dùng hết hôm nay
WHEN sang ngày mới (theo mốc reset)
THEN quota của app được reset lại đầy đủ
```

4. **Exception & Edge Cases**:

| Scenario | Cách xử lý | Cơ chế Fallback |
|---|---|---|
| App vừa bị chặn (blacklist) vừa có quota | Blacklist ưu tiên — app bị chặn hoàn toàn, quota không có ý nghĩa | Cảnh báo cấu hình thừa |
| Tổng quota các app > tổng thời gian thiết bị (US-09-01) | Tổng thời gian thiết bị là trần — khi chạm trần thì khóa dù quota app còn | Hiển thị ghi chú quan hệ giữa 2 mức |

5. **Technical Context & NFR**:
- Ngưỡng cảnh báo trước khi khóa: **TBD — OQ-15**.

---

##### US-09-06: [APP PARENTS] Đặt giới hạn thời gian theo nhóm danh mục/ngày

1. **US statement**
**As a** phụ huynh
**I want** đặt thời lượng tối đa cho cả một nhóm danh mục app mỗi ngày
**So that** tôi kiểm soát tổng thời gian cho ví dụ "Mạng xã hội" mà không phải đặt từng app

2. **Dependencies**: US-03-06, US-03-08

3. **Acceptance Criteria**:

```
AC1: Đặt quota theo danh mục
GIVEN tôi chọn danh mục "Mạng xã hội"
WHEN tôi đặt giới hạn (VD: 2 giờ/ngày) và lưu
THEN tổng thời gian dùng mọi app trong danh mục đó bị giới hạn theo quota
AND rule được đẩy xuống máy con

AC2: Quan hệ quota app và quota danh mục
GIVEN một app vừa có quota riêng (US-09-05) vừa thuộc danh mục có quota
WHEN trẻ dùng app
THEN áp dụng mức nào chạm trước → mức đó kích hoạt khóa
AND mức chặt hơn luôn được tôn trọng

AC3: Reset hàng ngày
GIVEN quota danh mục đã hết
WHEN sang ngày mới
THEN quota danh mục được reset
```

4. **Exception & Edge Cases**:

| Scenario | Cách xử lý | Cơ chế Fallback |
|---|---|---|
| App thuộc nhiều danh mục có quota khác nhau | Áp mức chặt nhất | Hiển thị ghi chú cách tính |
| Phân loại danh mục thay đổi giữa ngày | Áp theo phân loại tại thời điểm tính usage | — |

5. **Technical Context & NFR**:
- Quy tắc ưu tiên thời gian: **mức chặt hơn thắng**; **tổng thời gian thiết bị (US-09-01) là trần cao nhất**.

---

## 4. Câu hỏi mở và giả định

### Câu hỏi mở (Open Questions)

> Tiếp nối numbering từ tài liệu FR-01→04 (OQ-01 đến OQ-07).

| ID | Nội dung | Cần từ ai | Ảnh hưởng đến |
|---|---|---|---|
| OQ-07 | *(Đã xử lý)* FR-06 trùng ID — đã tách Safe Search Enforce thành **FR-08**, giữ FR-06 = Activity Dashboard | Product Owner | Toàn bộ FR-06/FR-08 |
| OQ-08 | Retention policy: lịch sử web / YouTube / log chặn lưu bao lâu? Xóa khi xóa hồ sơ? | Legal / Product | US-05-06, US-06-02, US-06-03 |
| OQ-09 | Nguồn phân loại danh mục web và app: dùng dịch vụ bên thứ 3 hay tự xây? Danh sách danh mục cụ thể? | Product / Tech Lead | US-05-03, US-09-04 |
| OQ-10 | Throttle cảnh báo chặn web: ngưỡng N lần/phút và window time? | Tech Lead | US-05-05 AC2 |
| OQ-11 | Cơ chế enforce Safe Search (DNS forced / MDM / header rewrite)? Xử lý khi máy con né bằng VPN/DNS riêng? | Tech Lead | US-08-01 |
| OQ-12 | Cơ chế giám sát & lọc YouTube (YouTube API / Restricted Mode / traffic-based)? Phạm vi bắt được app gốc vs web? | Tech Lead | US-08-02, US-06-03 |
| OQ-13 | Mốc reset "ngày" và timezone hiển thị báo cáo: theo máy con hay tài khoản phụ huynh? | Product / Tech Lead | US-06-01, US-09-01, US-09-05/06 |
| OQ-14 | Whitelist app (US-09-02) và Blacklist app (US-09-03) có cho phép dùng đồng thời không, hay loại trừ? | Product Owner | US-09-02, US-09-03 |
| OQ-15 | Ngưỡng cảnh báo trước khi khóa app/thiết bị là bao nhiêu phút? | Product Owner | US-09-05, US-05-05 |

### Giả định đã đưa ra

| ID | Giả định | Cơ sở | Rủi ro nếu sai |
|---|---|---|---|
| A-06 | Quy tắc ưu tiên web: **Whitelist > Blacklist/URL > Danh mục** | Logic lọc thông thường | Nếu khác → phải thiết kế lại bộ rule engine |
| A-07 | Quy tắc ưu tiên thời gian: mức chặt hơn thắng, tổng thời gian thiết bị là trần | Logic quản lý quota thông thường | Conflict resolution phức tạp nếu khác |
| A-08 | Trang/app chưa phân loại → **mặc định cho phép** (không chặn nhầm) | Tránh false-positive gây khó chịu | Nếu yêu cầu "default deny" → đảo logic |
| A-09 | Whitelist/Blacklist app là 2 chế độ **loại trừ** | Mô hình phổ biến (allowlist vs denylist) | Cần OQ-14 xác nhận |
| A-10 | Mọi rule cấu hình áp dụng qua cơ chế gửi lệnh US-03-08 (real-time online / pending offline) | Kế thừa thiết kế FR-01→04 | Nếu cần enforce tức thì cả khi offline → cần cache rule cục bộ trên App Kid |

---

## Phần còn lại (APP KID)

Phân hệ thực thi trên máy con — **chưa viết trong bản này**, dự kiến gồm:

| US ID (dự kiến) | Nội dung | FR |
|---|---|---|
| US-05-07 | [APP KID] Phát hiện & chặn website theo rule | FR-05 |
| US-05-08 | [APP KID] Tự gán danh mục cho domain mới truy cập | FR-05 |
| US-06-04 | [APP KID] Đồng bộ lịch sử hoạt động (usage/web/YouTube) lên server | FR-06 |
| US-09-07 | [APP KID] Phát hiện & chặn app theo rule (đưa về màn khóa) | FR-09 |
| US-09-08 | [APP KID] Khóa thiết bị khi hết tổng thời gian | FR-09 |
| US-09-09 | [APP KID] Cảnh báo trẻ trước khi hết thời gian sử dụng | FR-09 |
| US-09-10 | [APP KID] Khóa app khi hết quota | FR-09 |
</content>
</invoke>
