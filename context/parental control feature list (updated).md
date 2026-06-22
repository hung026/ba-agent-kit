| Phân hệ | Tính năng / Use case | Mô tả | Functional Requirement ID |
|:---------|:---------|:---------|:---------|
| App cha mẹ | Giới thiệu sản phẩm trên App bố mẹ | Màn hình onboarding giới thiệu tính năng Parental Control trước khi vào app | FR-01: Pairing |
| App cha mẹ | Xin quyền cần thiết | Yêu cầu các quyền cần để vận hành tính năng (notification, v.v.) | FR-01: Pairing |
| App cha mẹ | Xác thực thiết bị bố mẹ | Login bằng SĐT + OTP | FR-01: Pairing |
| App con | Giới thiệu và xin quyền | Onboard + xin các quyền cần thiết | FR-01: Pairing |
| App con — Android | Cài đặt CA Certificate | Hỗ trợ user cài CA certificate để bắt traffic HTTPS | FR-01: Pairing |
| App con — iOS | Tải MDM profile | Điều hướng user tới trang cài MDM profile trên iOS (Settings → Downloaded Profile) | FR-01: Pairing |
| App con | Xác thực thiết bị con | Login bằng SĐT bố mẹ / hoặc Quét QR | FR-01: Pairing |
| App cha mẹ | Tạo hồ sơ | Nhập thông tin trẻ và lưu hồ sơ mới | FR-03: Quản lý hồ sơ và thiết bị |
| App cha mẹ | Chỉnh sửa hồ sơ | Đổi tên, ảnh, thông tin bổ sung của trẻ | FR-03: Quản lý hồ sơ và thiết bị |
| App cha mẹ | Xóa hồ sơ | Xoá hồ sơ khi không còn dùng | FR-03: Quản lý hồ sơ và thiết bị |
| App cha mẹ | Hiển thị danh sách thiết bị | Liệt kê các thiết bị của trẻ theo hồ sơ | FR-03: Quản lý hồ sơ và thiết bị |
| App cha mẹ | Hiển thị trạng thái online/offline | Hiển thị trạng thái kết nối của từng thiết bị con | FR-03: Quản lý hồ sơ và thiết bị |
| App cha mẹ | Tạo ghép nối thiết bị | Liên kết thiết bị con đã pair vào hồ sơ trẻ | FR-03: Quản lý hồ sơ và thiết bị |
| App cha mẹ | Hủy ghép nối thiết bị | Gỡ liên kết giữa thiết bị và hồ sơ | FR-03: Quản lý hồ sơ và thiết bị |
| App cha mẹ | Gửi lệnh quản lý | Gửi lệnh điều khiển từ App cha mẹ xuống App con | FR-03: Quản lý hồ sơ và thiết bị |
| App con | Nhận lệnh quản lý | Nhận và thực thi lệnh từ App cha mẹ | FR-03: Quản lý hồ sơ và thiết bị |
| App con | Hiển thị thông tin quản lý cho con | Hiển thị thông tin người quản lý + giới hạn thời gian được thiết lập cho con xem | FR-06: Activity Dashboard |
| App cha mẹ | Nhận notification sự kiện | Nhận cảnh báo khi có chặn app/web/cuộc gọi/thiết bị offline | FR-04: Quản lý thông báo |
| App cha mẹ | Mở từ notification vào màn hình chi tiết | Người dùng bấm notification được dẫn tới đúng event detail (deep-link) | FR-04: Quản lý thông báo |
| App cha mẹ | Đánh dấu đã xem/chưa xem | Quản lý trạng thái đọc của thông báo | FR-04: Quản lý thông báo |
| App con | Đồng bộ lịch sử hoạt động | Đẩy dữ liệu thời gian sử dụng app về server để hiển thị trên dashboard phụ huynh | FR-06: Activity Dashboard |
| App cha mẹ | Báo cáo thời gian dùng thiết bị/app | Hiển thị thống kê usage theo mốc thời gian, top app, nhóm app, category | FR-06: Activity Dashboard |
| App cha mẹ | Thiết lập thời gian sử dụng thiết bị | Giới hạn tổng thời gian dùng màn hình mỗi ngày theo từng hồ sơ trẻ / từng thiết bị | FR-07: Phone Usage Management |
| App con | Khoá thiết bị khi hết thời gian truy cập | Khi hết hạn mức thì chặn toàn bộ hoặc phần lớn chức năng trên thiết bị con | FR-07: Phone Usage Management |
| App cha mẹ | Cho phép truy cập App | Thiết lập whitelist app được phép chạy | FR-07: Phone Usage Management |
| App cha mẹ | Chặn truy cập app | Thiết lập blacklist app bị chặn | FR-07: Phone Usage Management |
| App cha mẹ | Đặt giới hạn thời gian sử dụng theo app | Cấu hình thời lượng dùng tối đa cho từng app mỗi ngày | FR-07: Phone Usage Management |
| App con | Cảnh báo sắp hết thời gian | Cảnh báo trước khi app bị khóa | FR-07: Phone Usage Management |
| App con | Khóa app khi hết thời gian | Tự chặn app sau khi vượt quota | FR-07: Phone Usage Management |
| App con | Giới hạn truy cập ứng dụng | Phát hiện ứng dụng đang chạy, so sánh blacklist/rule và đưa về màn hình khoá nếu bị cấm | FR-07: Phone Usage Management |
| App cha mẹ | Chặn truy cập theo danh mục app | Chặn toàn bộ danh mục app (VD: Games, Social, v.v.) trên thiết bị con | FR-07: Phone Usage Management |
| App cha mẹ | Đặt giới hạn thời gian sử dụng theo danh mục | Cấu hình thời lượng dùng tối đa theo nhóm danh mục mỗi ngày | FR-07: Phone Usage Management |
| App cha mẹ | Duyệt cài đặt app mới | Khi con cài app mới từ store, gửi yêu cầu để cha mẹ duyệt/từ chối trước khi cho dùng | FR-07: Phone Usage Management |
| App cha mẹ | Lọc app theo độ tuổi (age rating) | Tự chặn/ẩn app vượt ngưỡng độ tuổi cho phép theo phân loại của store | FR-07: Phone Usage Management |
| App con | Phát hiện app mới cài | Phát hiện khi có app mới được cài, báo về server và áp rule duyệt/độ tuổi | FR-07: Phone Usage Management |
| App cha mẹ | Chặn theo domain | Chặn truy cập theo domain/subdomain | FR-05: Smart Web Filtering |
| App cha mẹ | Chặn theo path/URL đầy đủ | Chặn sâu theo đường dẫn hoặc URL cụ thể | FR-05: Smart Web Filtering |
| App cha mẹ | Chặn theo danh mục website | Chặn theo nhóm nội dung website (Adult, Gambling, Violence, v.v.) | FR-05: Smart Web Filtering |
| App cha mẹ | Whitelist URL ngoại lệ | Cho phép URL/domain dù đang bị chặn chung | FR-05: Smart Web Filtering |
| App cha mẹ | Cảnh báo khi truy cập web bị chặn | Bắn thông báo cho cha mẹ khi trẻ cố truy cập web bị chặn | FR-05: Smart Web Filtering |
| App cha mẹ | Ghi log truy cập web bị chặn | Ghi lại domain/URL, thời gian, trạng thái của lần truy cập bị chặn | FR-05: Smart Web Filtering |
| App con | Giới hạn truy cập web | Phát hiện website đang truy cập, so sánh blacklist/rule và thực hiện chặn | FR-05: Smart Web Filtering |
| App con | Tự cập nhật domain mới vào danh mục | Khi truy cập domain mới thì tự gán danh mục để áp rule tương ứng | FR-05: Smart Web Filtering |
| App cha mẹ | Bật Google Safe Search | Bật chế độ tìm kiếm an toàn trên công cụ hỗ trợ (Google, Bing) | FR-08: Safe Search Enforce |
| App cha mẹ | Quản lý chặn lọc kênh Youtube | Giới hạn nội dung YouTube theo kênh, từ khoá | FR-08: Safe Search Enforce |
| App cha mẹ | Lập lịch giờ đi ngủ (Bedtime/Downtime) | Thiết lập khung giờ ngủ, hết giờ thì tự khóa thiết bị | FR-09: Schedule |
| App cha mẹ | Lập lịch giờ học | Thiết lập khung giờ học, chặn app/danh mục giải trí trong khung giờ này | FR-09: Schedule |
| App cha mẹ | Lập lịch theo thứ trong tuần | Cấu hình lịch giới hạn khác nhau theo từng ngày (ngày thường vs cuối tuần) | FR-09: Schedule |
| App con | Áp dụng lịch và khóa theo khung giờ | Đọc lịch được thiết lập, tự khóa thiết bị/app khi tới khung giờ tương ứng | FR-09: Schedule |
| App con | Cảnh báo trước khi vào khung giờ khóa | Cảnh báo cho con trước khi thiết bị bị khóa theo lịch | FR-09: Schedule |
| App con | Chống gỡ bỏ ứng dụng | Ngăn trẻ xóa App con khỏi thiết bị mà không có xác nhận phụ huynh | FR-02: Anti-Tamper |
| App cha mẹ | Hủy ghép nối để cho phép gỡ | Tạo cơ chế hủy ghép nối từ app bố mẹ để bỏ quyền quản lý, từ đó có thể uninstall app con | FR-02: Anti-Tamper |
| App cha mẹ | Ghi log hành vi gỡ ứng dụng | Ghi log hành vi uninstall của con | FR-02: Anti-Tamper |
| App con | Chống đổi giờ hệ thống | Ngăn/phát hiện việc đổi giờ - múi giờ thiết bị để lách giới hạn thời gian | FR-02: Anti-Tamper |
| App con | Chống tắt/gỡ VPN - MDM - CA Certificate | Ngăn/phát hiện việc tắt VPN, gỡ MDM profile (iOS) hoặc xóa CA certificate (Android) làm vô hiệu hóa lọc traffic | FR-02: Anti-Tamper |
| App con | Chống tắt Accessibility / force-stop app | Ngăn/phát hiện việc tắt quyền Accessibility hoặc force-stop App con | FR-02: Anti-Tamper |
| App con | Chống safe mode / factory reset | Phát hiện và cảnh báo khi thiết bị vào safe mode hoặc bị khôi phục cài đặt gốc nhằm bỏ quản lý | FR-02: Anti-Tamper |
| App cha mẹ | Cảnh báo khi phát hiện hành vi lách (tamper) | Nhận thông báo khi thiết bị con có dấu hiệu lách kiểm soát (đổi giờ, gỡ profile, tắt VPN, v.v.) | FR-02: Anti-Tamper |
| App cha mẹ | Lịch sử truy cập web | Hiển thị các trang web đã truy cập theo thiết bị | FR-06: Activity Dashboard |
| App cha mẹ | Lịch sử xem Youtube | Xem lịch sử xem Youtube của trẻ | FR-06: Activity Dashboard |
