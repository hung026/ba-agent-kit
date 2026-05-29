Hiểu vấn đề + ràng buộc đã chốt
Con có 2 loại: con nhỏ (không SĐT riêng) + teen (có SĐT riêng) → pairing phải linh hoạt.
SIM quyết định tính năng:
SIM Viettel → con vừa bị control (web/app) vừa dùng được Antiscam → gửi/nhận alert lừa đảo (full Bảo vệ gia đình).
Không Viettel → chỉ control web/app, không có alert lừa đảo.
TK con + cơ chế pairing: chưa quyết → tôi đề xuất bên dưới.
Best practice từ sản phẩm khác
Sản phẩm	Pairing	TK con	Onboarding quyền
Google Family Link	Bố mẹ tạo mã 9 số → máy con nhập mã	Con có Google account riêng do bố mẹ tạo & quản lý	Tạo account → cài app con → cấp quyền từng bước
Apple Screen Time	Mời vào Family Sharing bằng Apple ID	Apple ID con (managed)	Bật trong hệ điều hành, ít ma sát
Microsoft Family Safety	Mời thành viên vào family group	Account riêng, cần consent bố mẹ	Add member → chọn vai trò
Qustodio / Bark	Cài management profile (MDM) trên máy con	Gắn vào account bố mẹ	Cài profile + hướng dẫn chi tiết, template hỗ trợ
Rút ra: cơ chế phổ biến & thuận tiện nhất = bố mẹ khởi tạo → máy con quét QR / nhập mã ngắn (Family Link model). Con nhỏ thì gắn agent vào tài khoản bố mẹ, không bắt login riêng.

⚠️ Rủi ro/điểm mù quan trọng (cần lưu ý trước khi chọn)
🔴 Phân mảnh "member" vs "con": nếu con join bằng SĐT (luồng member cũ) nhưng lại cần cài app Kid + cấp MDM, user dễ thấy đây là 2 thứ rời rạc. Phải gộp vào 1 luồng "Thêm thành viên" có chọn vai trò.
🔴 Con nhỏ không có SĐT → không qua được luồng "add member bằng SĐT mạng V" hiện tại → bắt buộc cần cơ chế pairing không phụ thuộc SĐT (QR/mã).
🟡 Rớt quyền giữa chừng: onboarding máy con cần nhiều quyền nhạy cảm (MDM/Device Admin/Accessibility + Antiscam). Mất quyền giữa chừng = control chết âm thầm → cần màn "kiểm tra sức khỏe kết nối".
🟡 iOS MDM vs Android CA khác nhau → onboarding máy con phải tách nhánh theo OS.
ĐỀ XUẤT
A. PAIRING
Option 1 (⭐ Khuyến nghị): Bố mẹ khởi tạo — máy con quét QR / nhập mã
Giải pháp:

Trong module Bảo vệ gia đình, bố mẹ bấm "Thêm thành viên" → chọn vai trò "Con".
App sinh QR code + mã 6 số (hết hạn sau ~10 phút).
Máy con cài Lá Chắn Số Kid → màn đầu tiên quét QR (hoặc nhập mã) → tự liên kết vào nhóm dưới role "Con", gắn vào tài khoản bố mẹ.
Nếu máy con có SIM Viettel → thêm 1 bước xác thực SĐT (OTP) để bật Antiscam → kích hoạt luôn alert lừa đảo.
Pros:

Không phụ thuộc SĐT → chạy được cho cả con nhỏ lẫn teen.
Cùng entry "Thêm thành viên" với member cũ → không phân mảnh.
Đúng chuẩn quen thuộc (Family Link) → user dễ hiểu.
Cons:

Cần 2 máy ở cạnh nhau lúc ghép (chấp nhận được, vì cài app con bố mẹ thường làm trực tiếp).
Rủi ro: 🟡 — mã lộ thì người lạ có thể ghép; xử lý bằng hết hạn ngắn + xác nhận lại trên máy bố mẹ.

Option 2: Mời bằng SĐT (tái dùng luồng member)
Giải pháp:

Bố mẹ nhập SĐT con (mạng V) → con nhận noti/SMS → cài app Kid → xác nhận tham gia với vai trò "Con".
Pros:

Tái dùng tối đa luồng add member có sẵn, ít code mới.
Cons:

Không chạy cho con nhỏ (không có SĐT).
Chỉ giới hạn mạng Viettel ngay từ đầu → mất nhóm con không-Viettel chỉ cần control web/app.
Rủi ro: 🔴 — loại trừ một phần lớn use case (con nhỏ, con không Viettel).

Áp dụng khi: chỉ nhắm teen có SIM Viettel.

Option 3: Hybrid — chọn loại con rồi route
Giải pháp: Bố mẹ chọn "Con nhỏ" (→ QR/mã, Option 1) hoặc "Con đã có SĐT" (→ mời SĐT, Option 2).

Pros: phủ mọi trường hợp.
Cons: thêm 1 bước phân nhánh, UX phức tạp hơn, dễ rối.
Rủi ro: 🟡 — bắt user tự phân loại, dễ chọn sai.

Chốt cho Pairing: Option 1. QR/mã phủ hết mọi loại con; bước xác thực SĐT chỉ là add-on khi máy con có Viettel để mở khóa Antiscam. Không cần bắt user tự phân loại như Option 3.

B. TÁI DÙNG TÍNH NĂNG NHẬN CẢNH BÁO
Nguyên tắc: con = member đặc biệt, không tạo kênh cảnh báo mới.

Khi máy con có SIM Viettel + bật Antiscam → con tự động là member → dùng nguyên cơ chế alert có sẵn (push noti + màn chi tiết cuộc gọi). Không build lại gì.
Khác biệt duy nhất: gắn nhãn nguồn alert là "Con – [Tên]" thay vì "Thành viên".
Gộp về 1 nơi thống nhất (chống phân mảnh): Dashboard mới của con hiển thị cùng chỗ:
🔴 Cảnh báo lừa đảo (từ Antiscam — tính năng cũ)
🚫 Web bị chặn / 📱 App vượt giới hạn (tính năng parental mới) → tất cả trong một feed thời gian + push noti chung một luồng.
Con không Viettel: Dashboard vẫn có, nhưng khu vực "Cảnh báo lừa đảo" hiển thị trạng thái "Bật SIM Viettel + Antiscam để nhận cảnh báo lừa đảo" → vừa không phân mảnh, vừa là điểm upsell.
C. ONBOARDING
Tách 2 phía, vì 2 máy khác vai trò:

C1. Phía bố mẹ (trong app chính — nhẹ)
Vào Bảo vệ gia đình → thẻ "Bảo vệ con cái" (giới thiệu giá trị 1 màn).
Bấm "Thêm con" → hiện QR/mã (Option 1 pairing).
Hướng dẫn cầm máy con quét.
C2. Phía con (trong app Lá Chắn Số Kid — nặng về quyền)
Thứ tự: Ghép nối trước → xin quyền sau (đã liên kết rồi user mới chịu cấp quyền).

Quét QR / nhập mã → ghép thành công.
Xin quyền theo từng bước, mỗi quyền 1 màn giải thích lợi ích (best practice tăng tỷ lệ cấp):
iOS: cài MDM profile (có màn hướng dẫn "Cài đặt > Hồ sơ").
Android: Device Admin / CA + Accessibility + Usage Access.
Nếu có SIM Viettel: bật Antiscam (xin quyền cuộc gọi).
Màn cuối: "Kiểm tra kết nối" — checklist xanh/đỏ từng quyền, cảnh báo nếu thiếu.
Chống rớt quyền: thêm mục "Sức khỏe kết nối" trên Dashboard bố mẹ → đỏ khi máy con mất quyền/offline.

Bước tiếp theo (cần bạn quyết)
Chốt Pairing → tôi đề xuất Option 1. Bạn đồng ý?
TK con: tôi đề xuất agent gắn TK bố mẹ (con không login riêng) cho con nhỏ + xác thực SĐT add-on cho teen Viettel. Bạn duyệt hướng này?
Sau khi chốt, tôi có thể: viết User Story / đặc tả (doc-factory) hoặc vẽ luồng pairing + onboarding (diagram-creator).
Muốn tôi đi tiếp hướng nào?