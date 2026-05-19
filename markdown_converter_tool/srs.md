# AI Chatbot – Gửi Ảnh Trong Hội Thoại: Đặc tả Use Case

## 1. Tóm tắt Thực thi

Tính năng bổ sung khả năng gửi ảnh vào hội thoại với AI chatbot chuyên về phòng chống lừa đảo trực tuyến. Người dùng có thể đính kèm ảnh từ thư viện, chụp trực tiếp từ camera, hoặc paste ảnh từ clipboard. AI sẽ phân tích ảnh để nhận diện dấu hiệu lừa đảo, trích xuất và kiểm tra số điện thoại, link website trong ảnh. Tính năng tích hợp với Dify (lưu ảnh chính) và server nội bộ (backup), sử dụng model GPT-4.1 mini.

> ⚠️ **Sensitive Data Notice – Legal Check Required**
> Tính năng này cho phép user upload ảnh chứa thông tin cá nhân nhạy cảm (CCCD, sao kê ngân hàng, tin nhắn, số điện thoại, v.v.). Ảnh được lưu vĩnh viễn trên hệ thống. Cần đảm bảo user đã chấp thuận chính sách dữ liệu trước khi sử dụng tính năng này.

---

## 2. Danh sách Use Case

| Nhóm chức năng | ID Use Case | Tên Use Case | Actor | Điều kiện trước | Điều kiện sau |
|---|---|---|---|---|---|
| Gửi ảnh | UC-1 | Gửi ảnh từ thư viện | Người dùng | Đang trong màn hình chat; đã cấp quyền truy cập thư viện ảnh | Ảnh được gửi, AI trả kết quả phân tích |
| Gửi ảnh | UC-2 | Chụp ảnh từ camera | Người dùng | Đang trong màn hình chat; đã cấp quyền camera | Ảnh được chụp và gửi, AI trả kết quả phân tích |
| Gửi ảnh | UC-3 | Paste ảnh từ clipboard | Người dùng | Đang trong màn hình chat; clipboard đang chứa ảnh | Ảnh được paste và gửi, AI trả kết quả phân tích |
| Quản lý hội thoại | UC-4 | Xóa hội thoại | Người dùng | Tồn tại ít nhất 1 hội thoại | Hội thoại và toàn bộ ảnh đính kèm bị xóa khỏi hệ thống |

---

## 3. Đặc tả chi tiết Use Case

---

### 3.1 Gửi ảnh

#### Use Case UC-1: Gửi ảnh từ thư viện

| Tiêu đề | Mô tả |
|---|---|
| ID Use Case | UC-1 |
| Tên Use Case | Gửi ảnh từ thư viện |
| Mô tả ngắn gọn | Người dùng chọn 1–5 ảnh từ thư viện thiết bị, xem preview, và gửi vào hội thoại để AI phân tích|
| Actor chính | Người dùng |
| Điều kiện tiên quyết | Đang trong màn hình chat; thiết bị đã cấp quyền truy cập thư viện ảnh; có kết nối internet; người dùng đã chấp thuận chính sách lưu trữ dữ liệu |
| Kích hoạt (Trigger) | Người dùng nhấn icon đính kèm ảnh → chọn "Thư viện ảnh" |
| Điều kiện sau – Thành công | Ảnh được upload lên Dify, backup lên server nội bộ; AI trả kết quả phân tích; prompt suggestion được hiển thị |
| Điều kiện sau – Thất bại | Hệ thống hiển thị thông báo lỗi tương ứng; không có dữ liệu nào được lưu |
| Phụ thuộc | UC-4 (xóa hội thoại sẽ xóa ảnh liên quan) |

#### Luồng chính (Happy Path)

| Bước | Actor | Hành động / Phản hồi của Hệ thống | BR liên quan |
|:---|:---|:---|:---|
| 1 | Người dùng | Nhấn icon đính kèm ảnh trên thanh input | BR-01 |
| 2 | Hệ thống | Hiển thị bottom sheet chọn nguồn ảnh: "Thư viện ảnh" / "Camera" | |
| 3 | Người dùng | Chọn "Thư viện ảnh" | |
| 4 | Hệ thống | Mở native image picker của thiết bị | BR-02 |
| 5 | Người dùng | Chọn 1–5 ảnh | BR-03, BR-04 |
| 6 | Hệ thống | Hiển thị preview các ảnh đã chọn trong vùng compose; cho phép xóa từng ảnh trước khi gửi | BR-05 |
| 7 | Người dùng | (Tùy chọn) Nhập thêm text kèm ảnh, sau đó nhấn "Gửi" | |
| 8 | Hệ thống | Validate từng ảnh (kích thước, định dạng); convert HEIC sang JPEG nếu cần | BR-04, BR-06 |
| 9 | Hệ thống | Hiển thị trạng thái "Đang gửi…"; upload ảnh lên Dify; lưu bản sao backup lên server nội bộ | BR-07 |
| 10 | Hệ thống | Gửi message kèm ảnh đến GPT-4.1 mini qua Dify để phân tích | BR-08 |
| 11 | Hệ thống | Nhận kết quả phân tích, hiển thị phản hồi AI trong hội thoại | |
| 12 | Hệ thống | Hiển thị prompt suggestion context-aware phía dưới câu trả lời | BR-09 |

#### Luồng thay thế (Alternative Flow)

| ID Luồng | Bước | Mô tả | BR liên quan |
|:---|:---|:---|:---|
| AF-01 | Bước 5 | Người dùng chọn quá 5 ảnh → hệ thống báo giới hạn, chỉ giữ 5 ảnh đầu tiên được chọn | BR-03 |
| AF-02 | Bước 6 | Người dùng xóa bớt ảnh trong preview → cập nhật lại danh sách, vẫn cho phép gửi nếu còn ≥ 1 ảnh | BR-05 |
| AF-03 | Bước 7 | Người dùng gửi ảnh không kèm text → hệ thống vẫn xử lý bình thường, AI tự phân tích nội dung ảnh | BR-08 |

#### Luồng Ngoại lệ / Lỗi (Exception / Error Flow)

| ID Luồng | Bước | Lỗi | Cơ chế fallback | BR liên quan |
|:---|:---|:---|:---|:---|
| EF-01 | Bước 4 | Người dùng chưa cấp quyền thư viện ảnh | Hiển thị dialog giải thích lý do cần quyền + nút "Mở cài đặt" để cấp quyền | BR-02 |
| EF-02 | Bước 8 | Ảnh vượt quá 10MB | Hiển thị thông báo lỗi cho từng ảnh vi phạm; loại bỏ ảnh đó khỏi danh sách gửi; vẫn cho phép gửi các ảnh hợp lệ còn lại | BR-04 |
| EF-03 | Bước 8 | Convert HEIC thất bại | Thông báo "Không thể xử lý ảnh định dạng này"; loại bỏ ảnh lỗi; vẫn gửi ảnh hợp lệ còn lại | BR-06 |
| EF-04 | Bước 9 | Upload Dify thất bại (network lỗi / timeout) | Hiển thị thông báo "Gửi thất bại"; cho phép thử lại; không lưu bất kỳ dữ liệu nào nếu upload chưa thành công | BR-07 |
| EF-05 | Bước 9 | Upload Dify thành công nhưng backup server thất bại | Ghi log lỗi, đưa vào hàng đợi retry ngầm; không thông báo lỗi cho người dùng | BR-07 |
| EF-06 | Bước 10–11 | GPT-4.1 mini không phản hồi / timeout | Hiển thị "AI đang bận, vui lòng thử lại"; giữ nguyên tin nhắn đã gửi trong hội thoại | BR-08 |
| EF-07 | Bước 11 | AI không nhận diện được nội dung lừa đảo rõ ràng (ảnh mờ, text nhỏ) | AI trả lời kèm disclaimer "Không thể xác định chắc chắn, hãy mô tả thêm thông tin" | BR-08 |

#### Quy tắc Nghiệp vụ (Business Rules)

| Business Rules | Mô tả |
|:---|:---|
| BR-01 | Icon đính kèm ảnh chỉ hiển thị khi người dùng đang trong màn hình chat active |
| BR-02 | Ứng dụng phải yêu cầu quyền truy cập thư viện ảnh trước khi mở picker; nếu bị từ chối, hướng dẫn vào Settings |
| BR-03 | Tối đa 5 ảnh trên 1 lần gửi *(Source: yêu cầu sản phẩm)* |
| BR-04 | Mỗi ảnh tối đa 10MB sau khi convert *(Source: yêu cầu sản phẩm)*; mọi định dạng được chấp nhận; ảnh HEIC phải được convert sang JPEG trước khi upload vì GPT-4.1 mini không hỗ trợ HEIC natively |
| BR-05 | Người dùng có thể xóa từng ảnh trong preview trước khi gửi |
| BR-06 | Việc convert HEIC → JPEG được thực hiện phía client trước khi upload để tránh lỗi tại API |
| BR-07 | Dify là storage chính; server nội bộ là backup. Upload phải thành công lên Dify trước; backup thực hiện ngầm và không block luồng chính |
| BR-08 | Ảnh được gửi kèm system prompt chuyên biệt về phân tích lừa đảo; AI cần trích xuất và kiểm tra số điện thoại, link website có trong ảnh |
| BR-09 | Sau mỗi phản hồi của AI (kể cả khi phân tích ảnh), hiển thị prompt suggestion context-aware |

---

#### Use Case UC-2: Chụp ảnh từ camera

| Tiêu đề | Mô tả |
|---|---|
| ID Use Case | UC-2 |
| Tên Use Case | Chụp ảnh từ camera |
| Mô tả ngắn gọn | Người dùng mở camera ngay trong app, chụp ảnh và gửi vào hội thoại để AI phân tích |
| Actor chính | Người dùng |
| Điều kiện tiên quyết | Đang trong màn hình chat; đã cấp quyền camera; có kết nối internet; người dùng đã chấp thuận chính sách lưu trữ dữ liệu |
| Kích hoạt (Trigger) | Người dùng nhấn icon đính kèm ảnh → chọn "Chụp ảnh" |
| Điều kiện sau – Thành công | Ảnh được upload lên Dify, backup server; AI trả kết quả phân tích; prompt suggestion được hiển thị |
| Điều kiện sau – Thất bại | Hệ thống hiển thị thông báo lỗi; không có dữ liệu nào được lưu |
| Phụ thuộc | UC-4 |

#### Luồng chính (Happy Path)

| Bước | Actor | Hành động / Phản hồi của Hệ thống | BR liên quan |
|:---|:---|:---|:---|
| 1 | Người dùng | Nhấn icon đính kèm ảnh → chọn "Chụp ảnh" | BR-01 |
| 2 | Hệ thống | Mở native camera của thiết bị | BR-10 |
| 3 | Người dùng | Chụp ảnh | |
| 4 | Hệ thống | Hiển thị preview ảnh vừa chụp với lựa chọn "Dùng ảnh này" / "Chụp lại" | |
| 5 | Người dùng | Chọn "Dùng ảnh này" | |
| 6 | Hệ thống | Hiển thị preview ảnh trong vùng compose | BR-05 |
| 7 | Người dùng | (Tùy chọn) Nhập thêm text, sau đó nhấn "Gửi" | |
| 8 | Hệ thống | Validate ảnh; convert HEIC sang JPEG nếu cần | BR-04, BR-06 |
| 9 | Hệ thống | Upload lên Dify; backup lên server nội bộ | BR-07 |
| 10 | Hệ thống | Gửi đến GPT-4.1 mini để phân tích | BR-08 |
| 11 | Hệ thống | Hiển thị kết quả phân tích trong hội thoại | |
| 12 | Hệ thống | Hiển thị prompt suggestion context-aware | BR-09 |

#### Luồng thay thế (Alternative Flow)

| ID Luồng | Bước | Mô tả | BR liên quan |
|:---|:---|:---|:---|
| AF-01 | Bước 4 | Người dùng chọn "Chụp lại" → quay lại camera | |
| AF-02 | Bước 6 | Người dùng nhấn nút xóa ảnh trong preview → ảnh bị hủy; trở về màn hình chat bình thường | BR-05 |

#### Luồng Ngoại lệ / Lỗi (Exception / Error Flow)

| ID Luồng | Bước | Lỗi | Cơ chế fallback | BR liên quan |
|:---|:---|:---|:---|:---|
| EF-01 | Bước 2 | Người dùng chưa cấp quyền camera | Hiển thị dialog giải thích + nút "Mở cài đặt" | BR-10 |
| EF-02 | Bước 8 | Ảnh vượt quá 10MB (ảnh RAW từ camera chất lượng cao) | Thông báo lỗi; đề xuất chụp lại hoặc giảm chất lượng | BR-04 |
| EF-03 | Bước 8 | Convert HEIC thất bại | Thông báo không thể xử lý định dạng; đề xuất chụp lại | BR-06 |
| EF-04 | Bước 9 | Upload Dify thất bại | Thông báo "Gửi thất bại"; cho phép thử lại | BR-07 |
| EF-05 | Bước 10–11 | GPT-4.1 mini timeout | Thông báo "AI đang bận"; giữ tin nhắn đã gửi | BR-08 |

#### Quy tắc Nghiệp vụ (Business Rules)

| Business Rules | Mô tả |
|:---|:---|
| BR-01 | Như UC-1 BR-01 |
| BR-04 | Như UC-1 BR-04 |
| BR-05 | Như UC-1 BR-05 |
| BR-06 | Như UC-1 BR-06 |
| BR-07 | Như UC-1 BR-07 |
| BR-08 | Như UC-1 BR-08 |
| BR-09 | Như UC-1 BR-09 |
| BR-10 | Ứng dụng phải yêu cầu quyền camera trước khi mở; nếu bị từ chối, hướng dẫn vào Settings. UC-2 chỉ cho phép chụp 1 ảnh mỗi lần (không multi-capture) |

---

#### Use Case UC-3: Paste ảnh từ clipboard

| Tiêu đề | Mô tả |
|---|---|
| ID Use Case | UC-3 |
| Tên Use Case | Paste ảnh từ clipboard |
| Mô tả ngắn gọn | Người dùng paste ảnh (screenshot hoặc copy từ app khác) trực tiếp vào ô nhập liệu của hội thoại |
| Actor chính | Người dùng |
| Điều kiện tiên quyết | Đang trong màn hình chat; clipboard đang chứa dữ liệu ảnh hợp lệ; có kết nối internet; người dùng đã chấp thuận chính sách lưu trữ dữ liệu |
| Kích hoạt (Trigger) | Người dùng giữ lâu vào ô input → chọn "Paste", hoặc hệ thống detect clipboard có ảnh và hiển thị banner gợi ý paste |
| Điều kiện sau – Thành công | Ảnh được paste, upload Dify, backup server; AI trả kết quả phân tích |
| Điều kiện sau – Thất bại | Hệ thống thông báo lỗi; không lưu dữ liệu |
| Phụ thuộc | UC-4 |

#### Luồng chính (Happy Path)

| Bước | Actor | Hành động / Phản hồi của Hệ thống | BR liên quan |
|:---|:---|:---|:---|
| 1 | Người dùng | Copy ảnh từ ứng dụng khác (screenshot, Zalo, Gallery…) | |
| 2 | Người dùng | Mở màn hình chat; giữ lâu vào ô input → chọn "Paste" | BR-11 |
| 3 | Hệ thống | Đọc dữ liệu ảnh từ clipboard; hiển thị preview trong vùng compose | BR-11, BR-05 |
| 4 | Người dùng | (Tùy chọn) Nhập thêm text, sau đó nhấn "Gửi" | |
| 5 | Hệ thống | Validate ảnh (kích thước, định dạng); convert HEIC nếu cần | BR-04, BR-06 |
| 6 | Hệ thống | Upload lên Dify; backup lên server nội bộ | BR-07 |
| 7 | Hệ thống | Gửi đến GPT-4.1 mini để phân tích | BR-08 |
| 8 | Hệ thống | Hiển thị kết quả phân tích trong hội thoại | |
| 9 | Hệ thống | Hiển thị prompt suggestion context-aware | BR-09 |

#### Luồng thay thế (Alternative Flow)

| ID Luồng | Bước | Mô tả | BR liên quan |
|:---|:---|:---|:---|
| AF-01 | Bước 2 | Hệ thống detect clipboard có ảnh → hiển thị banner "Paste ảnh vào chat?" → người dùng nhấn đồng ý | BR-11 |
| AF-02 | Bước 3 | Người dùng xóa ảnh trong preview → ảnh bị hủy; trở về input trống | BR-05 |

#### Luồng Ngoại lệ / Lỗi (Exception / Error Flow)

| ID Luồng | Bước | Lỗi | Cơ chế fallback | BR liên quan |
|:---|:---|:---|:---|:---|
| EF-01 | Bước 3 | Clipboard không chứa ảnh (chứa text hoặc trống) | Không hiển thị banner paste; nếu người dùng paste thủ công, chỉ paste text bình thường | BR-11 |
| EF-02 | Bước 5 | Ảnh vượt quá 10MB | Thông báo lỗi kích thước; không cho gửi ảnh đó | BR-04 |
| EF-03 | Bước 5 | Định dạng clipboard không phải ảnh hợp lệ | Thông báo "Không thể đọc ảnh từ clipboard" | BR-11 |
| EF-04 | Bước 6 | Upload Dify thất bại | Thông báo "Gửi thất bại"; cho phép thử lại | BR-07 |
| EF-05 | Bước 7–8 | GPT-4.1 mini timeout | Thông báo "AI đang bận"; giữ tin nhắn đã gửi | BR-08 |

#### Quy tắc Nghiệp vụ (Business Rules)

| Business Rules | Mô tả |
|:---|:---|
| BR-04 | Như UC-1 BR-04 |
| BR-05 | Như UC-1 BR-05 |
| BR-06 | Như UC-1 BR-06 |
| BR-07 | Như UC-1 BR-07 |
| BR-08 | Như UC-1 BR-08 |
| BR-09 | Như UC-1 BR-09 |
| BR-11 | Clipboard paste chỉ hỗ trợ 1 ảnh mỗi lần. Hệ thống đọc clipboard khi người dùng focus vào ô input và detect có ảnh thì hiện banner gợi ý. Chỉ xử lý nếu dữ liệu clipboard là image binary/base64 hợp lệ |

---

### 3.2 Quản lý hội thoại

#### Use Case UC-4: Xóa hội thoại

| Tiêu đề | Mô tả |
|---|---|
| ID Use Case | UC-4 |
| Tên Use Case | Xóa hội thoại |
| Mô tả ngắn gọn | Người dùng xóa toàn bộ một hội thoại, bao gồm tất cả tin nhắn và ảnh đính kèm. Ảnh phải được xóa đồng thời trên Dify và server backup |
| Actor chính | Người dùng |
| Điều kiện tiên quyết | Tồn tại ít nhất 1 hội thoại; có kết nối internet |
| Kích hoạt (Trigger) | Người dùng thực hiện hành động xóa hội thoại (swipe, long-press, menu) |
| Điều kiện sau – Thành công | Hội thoại bị xóa khỏi danh sách; toàn bộ tin nhắn và ảnh bị xóa khỏi Dify và server backup |
| Điều kiện sau – Thất bại | Hội thoại vẫn còn nguyên; không có dữ liệu nào bị mất |
| Phụ thuộc | UC-1, UC-2, UC-3 (hội thoại có thể chứa ảnh từ các UC này) |

#### Luồng chính (Happy Path)

| Bước | Actor | Hành động / Phản hồi của Hệ thống | BR liên quan |
|:---|:---|:---|:---|
| 1 | Người dùng | Thực hiện thao tác xóa hội thoại | |
| 2 | Hệ thống | Hiển thị dialog xác nhận: "Xóa hội thoại này? Hành động không thể hoàn tác." | BR-12 |
| 3 | Người dùng | Xác nhận xóa | |
| 4 | Hệ thống | Lấy danh sách tất cả file ảnh đính kèm trong hội thoại (file ID trên Dify + đường dẫn backup) | BR-13 |
| 5 | Hệ thống | Xóa toàn bộ tin nhắn và record hội thoại khỏi database | BR-14 |
| 6 | Hệ thống | Gọi Dify API để xóa từng file ảnh | BR-14 |
| 7 | Hệ thống | Xóa file ảnh backup trên server nội bộ | BR-14 |
| 8 | Hệ thống | Cập nhật UI: hội thoại biến mất khỏi danh sách | |

#### Luồng thay thế (Alternative Flow)

| ID Luồng | Bước | Mô tả | BR liên quan |
|:---|:---|:---|:---|
| AF-01 | Bước 3 | Người dùng hủy xác nhận → đóng dialog; hội thoại không thay đổi | BR-12 |
| AF-02 | Bước 4 | Hội thoại không chứa ảnh nào → bỏ qua bước 6 và 7; chỉ xóa record database | BR-13 |

#### Luồng Ngoại lệ / Lỗi (Exception / Error Flow)

| ID Luồng | Bước | Lỗi | Cơ chế fallback | BR liên quan |
|:---|:---|:---|:---|:---|
| EF-01 | Bước 5 | Xóa database thất bại | Rollback toàn bộ; thông báo "Xóa thất bại, vui lòng thử lại"; không xóa file ảnh | BR-14 |
| EF-02 | Bước 6 | Xóa file trên Dify thất bại (một phần hoặc toàn bộ) | Ghi log các file chưa xóa được; đưa vào hàng đợi retry ngầm; không thông báo lỗi kỹ thuật cho user; UI vẫn coi hội thoại là đã xóa | BR-14, BR-15 |
| EF-03 | Bước 7 | Xóa file backup thất bại | Ghi log; đưa vào hàng đợi retry ngầm; không ảnh hưởng UX | BR-15 |
| EF-04 | Bước 5–7 | Mất kết nối giữa chừng | Hệ thống retry khi có kết nối lại; trạng thái hội thoại trở về như chưa xóa nếu chưa commit | BR-14 |

#### Quy tắc Nghiệp vụ (Business Rules)

| Business Rules | Mô tả |
|:---|:---|
| BR-12 | Luôn hiển thị dialog xác nhận trước khi xóa; hành động xóa không thể hoàn tác |
| BR-13 | Trước khi xóa, hệ thống phải truy vấn và lưu tạm danh sách tất cả file ID ảnh liên quan đến hội thoại |
| BR-14 | Xóa database phải thực hiện trước; chỉ xóa file ảnh sau khi database commit thành công. Nếu database xóa thất bại → không xóa file |
| BR-15 | Lỗi xóa file trên Dify hoặc backup không được expose ra UI; xử lý ngầm qua retry queue. Định nghĩa retry policy: tối đa 3 lần, interval tăng dần *(retry policy cụ thể: cần confirm với Tech Lead)* |

---

## 4. Data Model (Tóm tắt)

| Entity | Thuộc tính chính | Ghi chú |
|---|---|---|
| Conversation | id, user_id, created_at, deleted_at | Soft delete hoặc hard delete tùy chính sách |
| Message | id, conversation_id, type (text/image/mixed), content, created_at | |
| MessageAttachment | id, message_id, dify_file_id, backup_url, file_size, original_format, converted_format, created_at | Lưu cả file_id Dify và URL backup; ghi nhận nếu ảnh là HEIC đã convert |

> ⚠️ **Sensitive Data Notice**: `MessageAttachment` lưu ảnh vĩnh viễn và có thể chứa thông tin cá nhân nhạy cảm (CCCD, sao kê, tin nhắn riêng tư). **Legal check required** trước khi triển khai.

---

## 5. Câu hỏi mở & Giả định

| # | Loại | Nội dung | Owner |
|---|---|---|---|
| A-01 | Giả định | Chỉ có 1 ảnh được phép paste từ clipboard mỗi lần | Confirm với Product |
| A-02 | Giả định | Camera chỉ cho phép chụp 1 ảnh mỗi lần (không hỗ trợ burst/multi-capture) | Confirm với Product |
| A-03 | Giả định | Ảnh từ UC-1/2/3 không được tự động lưu vào thư viện thiết bị | Confirm với Product |
| Q-01 | Câu hỏi mở | Retry policy cho xóa file: tối đa bao nhiêu lần? Sau bao lâu thì purge queue? | Tech Lead |
| Q-02 | Câu hỏi mở | Soft delete hay hard delete cho Conversation? Nếu soft delete, ảnh có được giữ lại không? | Tech Lead + Legal |
| Q-03 | Câu hỏi mở | Khi AI không nhận diện được nội dung (ảnh mờ, text nhỏ), có cần OCR fallback riêng không? | Product |