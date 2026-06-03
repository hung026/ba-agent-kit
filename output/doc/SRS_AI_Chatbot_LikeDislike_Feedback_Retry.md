

### 4.1 Like/Dislike & Feedback

---

#### 1. Use Case UC-01: Like/Dislike tin nhắn AI

| Tiêu đề | Mô tả |
|---|---|
| ID Use Case | UC-01 |
| Tên Use Case | Like/Dislike tin nhắn AI |
| Mô tả | Người dùng đánh giá chất lượng câu trả lời của AI bằng cách nhấn icon Like hoặc Dislike. Hỗ trợ toggle: nhấn lại icon đang active để hủy reaction; nhấn icon ngược lại để đổi reaction. Reaction được ghi nhận trên Dify qua API có sẵn. |
| Actor chính | Người dùng |
| Điều kiện trước | (1) Người dùng đang trong màn hình chat; (2) AI đã trả về ít nhất 1 câu trả lời hoàn chỉnh; (3) AI không đang trong quá trình streaming câu trả lời mới |
| Kích hoạt (Trigger) | Người dùng nhấn icon Like hoặc Dislike dưới câu trả lời của AI |
| Điều kiện sau – Thành công | Reaction được ghi nhận trên Dify; icon tương ứng được highlight trên UI |
| Điều kiện sau – Thất bại | UI revert về trạng thái trước khi nhấn; hiển thị toast lỗi |

#### 2. Luồng chính (Happy Path)

| Bước | Actor | Hành động / Phản hồi của Hệ thống | BR liên quan |
|:---|:---|:---|:---|
| 1 | Người dùng | Nhấn icon Like hoặc Dislike dưới 1 câu trả lời AI | BR-01 |
| 2 | Hệ thống | Cập nhật UI ngay lập tức: highlight icon được chọn (optimistic update) | BR-02 |
| 3 | Hệ thống | Gọi API Dify Message Feedback với payload `{rating: "like"}` hoặc `{rating: "dislike"}` | BR-03 |
| 4 | Hệ thống | Nhận response thành công từ Dify | |
| 5 | Hệ thống | Nếu reaction là Dislike → tự động trigger UC-02 (mở màn hình feedback) | BR-04 |

#### 3. Luồng thay thế (Alternative Flow)

| ID Luồng | Bước | Mô tả | BR liên quan |
|:---|:---|:---|:---|
| AF-01 | Bước 1 | Người dùng nhấn vào icon đang được active (đã like → nhấn like lần 2, hoặc đã dislike → nhấn dislike lần 2) → hệ thống gọi API với `rating: null` → UI trở về trạng thái neutral (cả 2 icon không highlight) | BR-04 |
| AF-02 | Bước 1 | Người dùng nhấn icon ngược lại (đã like → nhấn dislike, hoặc đã dislike → nhấn like) → hệ thống gọi API với rating mới → UI cập nhật icon tương ứng. Nếu đổi sang dislike → trigger UC-02 | BR-04|

#### 4. Quy tắc Nghiệp vụ (Business Rules)

| Business Rules | Mô tả |
|:---|:---|
| BR-01 | Icon Like và Dislike chỉ hiển thị sau khi AI đã hoàn tất trả lời (không streaming). Trong quá trình streaming, hai icon này bị ẩn |
| BR-02 | UI thực hiện optimistic update ngay khi người dùng nhấn, không chờ API response. Nếu API thất bại, revert UI về trạng thái cũ |
| BR-03 | Khi người dùng thực hiện Dislike (bao gồm đổi từ like → dislike), hệ thống tự động mở màn hình feedback (UC-02) |
| BR-04 | Mỗi tin nhắn AI chỉ có 1 reaction tại 1 thời điểm. Nhấn cùng icon đang active = hủy. Nhấn icon kia = thay đổi reaction |

#### 5. Luồng Ngoại lệ / Lỗi (Exception / Error Flow)

| ID Luồng | Bước | Lỗi | Xử lý | Cơ chế fallback | BR liên quan |
|:---|:---|:---|:---|:---|:---|
| EF-01 | Bước 3–4 | API Dify trả về lỗi (4xx, 5xx, network error) | Revert UI về trạng thái trước khi nhấn; hiển thị toast: "Đã có lỗi xảy ra. Vui lòng thử lại sau." | Không retry tự động | BR-02 |

---

#### 1. Use Case UC-02: Submit feedback khi dislike

| Tiêu đề | Mô tả |
|---|---|
| ID Use Case | UC-02 |
| Tên Use Case | Submit feedback khi dislike |
| Mô tả | Sau khi người dùng dislike 1 câu trả lời AI, hệ thống tự động mở màn hình feedback. Người dùng có thể gửi phản hồi hoặc bỏ qua. Việc submit là tùy chọn — reaction dislike vẫn được giữ nếu người dùng bỏ qua. |
| Actor chính | Người dùng |
| Điều kiện trước | Người dùng vừa thực hiện dislike thành công (UC-01, bước 4) |
| Kích hoạt (Trigger) | Hệ thống tự động mở màn hình feedback sau khi API dislike thành công |
| Điều kiện sau – Thành công | Feedback được gửi lên Dify ; màn hình feedback đóng lại |
| Điều kiện sau – Thất bại | Màn hình feedback đóng lại; reaction dislike vẫn giữ nguyên; feedback không được gửi |

#### 2. Luồng chính (Happy Path)

| Bước | Actor | Hành động / Phản hồi của Hệ thống | BR liên quan |
|:---|:---|:---|:---|
| 1 | Hệ thống | Sau khi UC-01 dislike thành công, tự động mở màn hình feedback | |
| 2 | Người dùng | Điền feedback nếu có | BR-01 |
| 3 | Người dùng | Nhấn "Gửi" để submit feedback | |
| 4 | Hệ thống | GỬi feedback lên DIfy | BR-01, BR-02 |
| 5 | Hệ thống | Nhận response thành công từ Dify | |
| 6 | Hệ thống | Đóng màn hình feedback; reaction dislike trên UC-01 giữ nguyên | |

#### 3. Luồng thay thế (Alternative Flow)

| ID Luồng | Bước | Mô tả | BR liên quan |
|:---|:---|:---|:---|
| AF-01 | Bước 2–3 | Người dùng nhấn "Bỏ qua" hoặc dismiss màn hình (swipe down / nhấn ngoài vùng) mà không submit → màn hình đóng lại; reaction dislike vẫn được giữ nguyên trên Dify và UI | BR-03 |

#### 4. Quy tắc Nghiệp vụ (Business Rules)

| Business Rules | Mô tả |
|:---|:---|
| BR-01 | Việc submit feedback là tùy chọn (optional). Người dùng có thể bỏ qua mà không ảnh hưởng đến reaction dislike đã được ghi nhận |
| BR-02 | Khi người dùng bỏ qua màn hình feedback hoặc gửi feedback mà không điền gì -> reaction dislike vẫn giữ nguyên trên Dify và UI |

#### 5. Luồng Ngoại lệ / Lỗi (Exception / Error Flow)

| ID Luồng | Bước | Lỗi | Xử lý | Cơ chế fallback | BR liên quan |
|:---|:---|:---|:---|:---|:---|
| EF-01 | Bước 4–5 | Dify thất bại (network error, timeout, 5xx) | Hiển thị lỗi "Đã có lỗi xảy ra. Vui lòng thử lại sau." | Không retry tự động | |

---

### 4.2 Retry

---

#### 1. Use Case UC-03: Retry tin nhắn thường

| Tiêu đề | Mô tả |
|---|---|
| ID Use Case | UC-03 |
| Tên Use Case | Retry tin nhắn thường (text) |
| Mô tả | Khi người dùng gửi tin nhắn text và gặp lỗi (network error, 4xx, 5xx, timeout), hệ thống tự động xóa  lỗi khỏi hội thoại và revert toàn bộ nội dung text về thanh chat để người dùng chỉnh sửa và gửi lại. Hệ thống không tự động gửi lại — người dùng chủ động nhấn Gửi. |
| Actor chính | Người dùng, Hệ thống |
| Điều kiện trước | Người dùng đã nhập text và nhấn "Gửi"; hệ thống đang xử lý gửi tin nhắn |
| Kích hoạt (Trigger) | Hệ thống nhận lỗi khi gửi tin nhắn (network error, HTTP 4xx, HTTP 5xx, timeout) |
| Điều kiện sau – Thành công | Nội dung text được revert chính xác về thanh chat;  lỗi bị xóa khỏi hội thoại; thanh chat được re-enable |
| Điều kiện sau – Thất bại | N/A |

#### 2. Luồng chính (Happy Path)

| Bước | Actor | Hành động / Phản hồi của Hệ thống | BR liên quan |
|:---|:---|:---|:---|
| 1 | Người dùng | Nhập text vào thanh chat và nhấn "Gửi" | |
| 2 | Hệ thống | Hiển thị  tin nhắn của người dùng trong hội thoại (optimistic UI); disable thanh chat; hiển thị thinking indicator của AI | |
| 3 | Hệ thống | Gọi API gửi tin nhắn đến Dify | |
| 4 | Hệ thống | Nhận response lỗi từ API (network error / 4xx / 5xx / timeout) | BR-01 |
| 5 | Hệ thống | Xóa  tin nhắn của người dùng khỏi hội thoại; xóa thinking indicator | BR-02 |
| 6 | Hệ thống | Revert toàn bộ nội dung text vào thanh chat; re-enable thanh chat | BR-03 |
| 7 | Hệ thống | Hiển thị toast: "Đã có lỗi xảy ra. Vui lòng thử lại sau." | BR-04 |
| 8 | Người dùng | (Tùy chọn) Chỉnh sửa nội dung và nhấn "Gửi" lại | |

#### 3. Luồng thay thế (Alternative Flow)

| ID Luồng | Bước | Mô tả | BR liên quan |
|:---|:---|:---|:---|
| AF-01 | Bước 6–8 | Người dùng không muốn gửi lại → tự xóa text trong thanh chat → UC kết thúc | |

#### 4. Quy tắc Nghiệp vụ (Business Rules)

| Business Rules | Mô tả |
|:---|:---|
| BR-01 | Retry được kích hoạt với tất cả loại lỗi: network error, HTTP 4xx, HTTP 5xx, và timeout. Source: xử lý lỗi chuẩn của toàn app |
| BR-02 | Sau khi lỗi xảy ra:  tin nhắn người dùng và thinking indicator của AI phải bị xóa hoàn toàn khỏi hội thoại. Không để lại  broken state |
| BR-03 | Toàn bộ nội dung text (bao gồm ký tự đặc biệt, xuống dòng) phải được revert chính xác về thanh chat — không cắt bớt, không mất ký tự. Cursor đặt ở cuối nội dung |
| BR-04 | Toast thông báo lỗi: "Đã có lỗi xảy ra. Vui lòng thử lại sau." — dùng chung component toast chuẩn của app. Source: UI Design System |

#### 5. Luồng Ngoại lệ / Lỗi (Exception / Error Flow)

| ID Luồng | Bước | Lỗi | Xử lý | Cơ chế fallback | BR liên quan |
|:---|:---|:---|:---|:---|:---|
| EF-01 | Bước 3–4 | AI streaming đã bắt đầu nhưng bị ngắt giữa chừng (partial response) | Xóa partial response  của AI; xóa  tin nhắn người dùng; revert text về thanh chat; hiển thị toast lỗi | | BR-02, BR-03 |

---

#### 1. Use Case UC-04: Retry tin nhắn có ảnh

| Tiêu đề | Mô tả |
|---|---|
| ID Use Case | UC-04 |
| Tên Use Case | Retry tin nhắn có ảnh |
| Mô tả | Khi người dùng gửi tin nhắn có đính kèm ảnh và gặp lỗi, hệ thống tự động revert toàn bộ nội dung (text + ảnh) về thanh chat. |
| Actor chính | Người dùng, Hệ thống |
| Điều kiện trước | Người dùng đã đính kèm ≥1 ảnh (và tùy chọn text) và nhấn "Gửi" |
| Kích hoạt (Trigger) | Hệ thống nhận lỗi khi upload ảnh hoặc gửi tin nhắn (network error, 4xx, 5xx, timeout) |
| Điều kiện sau – Thành công | Text + ảnh được revert về thanh chat;  lỗi bị xóa; thanh chat được re-enable |
| Điều kiện sau – Thất bại | N/A |

#### 2. Luồng chính (Happy Path)

| Bước | Actor | Hành động / Phản hồi của Hệ thống | BR liên quan |
|:---|:---|:---|:---|
| 1 | Người dùng | Đính kèm ≥1 ảnh (và tùy chọn text), nhấn "Gửi" | |
| 2 | Hệ thống | Hiển thị  tin nhắn (optimistic UI); disable thanh chat; bắt đầu upload ảnh lên Dify | |
| 3 | Hệ thống | Upload ảnh thành công → nhận `file_id`; gọi API gửi tin nhắn kèm `file_id` đến Dify | BR-01 |
| 4 | Hệ thống | Nhận response lỗi từ API gửi tin nhắn (4xx / 5xx / timeout) | BR-02 |
| 5 | Hệ thống | Xóa  tin nhắn của người dùng; xóa thinking indicator | BR-03 |
| 6 | Hệ thống | Revert text (nếu có) vào thanh chat; revert ảnh vào vùng preview của thanh chat, giữ nguyên `file_id` đã có | BR-04 |
| 7 | Hệ thống | Hiển thị toast: "Đã có lỗi xảy ra. Vui lòng thử lại sau." | |
| 8 | Người dùng | (Tùy chọn) Chỉnh sửa và nhấn "Gửi" lại | |
| 9 | Hệ thống | Dùng lại `file_id` đã có — không upload lại ảnh; gọi thẳng API gửi tin nhắn | BR-04 |

#### 3. Luồng thay thế (Alternative Flow)

| ID Luồng | Bước | Mô tả | BR liên quan |
|:---|:---|:---|:---|
| AF-01 | Bước 2–3 | Lỗi xảy ra tại giai đoạn upload ảnh (upload thất bại, chưa có `file_id`) → revert text + ảnh local về thanh chat. Khi gửi lại, upload lại ảnh từ đầu | BR-05 |
| AF-02 | Bước 2–3 | Lỗi xảy ra sau khi 1 số ảnh upload thành công, số còn lại thất bại → revert toàn bộ về thanh chat; ảnh đã upload giữ `file_id`, ảnh chưa upload giữ local | BR-04, BR-05 |
| AF-03 | Bước 6–9 | Người dùng không muốn gửi lại → tự xóa ảnh và/hoặc text trong thanh chat → UC kết thúc | |

#### 4. Quy tắc Nghiệp vụ (Business Rules)

| Business Rules | Mô tả |
|:---|:---|
| BR-01 | Quy trình gửi tin nhắn có ảnh gồm 2 bước tuần tự: (1) Upload từng ảnh lên Dify → nhận `file_id`; (2) Gọi API send message với danh sách `file_id`. Source: Dify image message API |
| BR-02 | Retry được kích hoạt khi lỗi xảy ra tại bất kỳ bước nào: upload ảnh hoặc send message (network error, 4xx, 5xx, timeout) |
| BR-03 | Sau khi lỗi xảy ra:  tin nhắn người dùng và thinking indicator của AI phải bị xóa hoàn toàn khỏi hội thoại. Không để lại  broken state |
| BR-04 | Ảnh đã upload thành công lên Dify (có `file_id`): khi revert về thanh chat, giữ nguyên `file_id`. Khi gửi lại, dùng lại `file_id` này — không upload lại ảnh. Lý do: tránh lãng phí bandwidth và duplicate file trên Dify server |
| BR-05 | Ảnh chưa upload thành công (chưa có `file_id`): revert về thanh chat với ảnh local. Khi gửi lại, upload lại từ đầu |

#### 5. Luồng Ngoại lệ / Lỗi (Exception / Error Flow)

| ID Luồng | Bước | Lỗi | Xử lý | Cơ chế fallback | BR liên quan |
|:---|:---|:---|:---|:---|:---|
| EF-01 | Bước 2–3 | Upload ảnh thất bại toàn bộ (tất cả ảnh đều lỗi) | Xóa  (optimistic UI); revert tất cả ảnh local + text về thanh chat; hiển thị toast lỗi | | BR-02, BR-05 |
| EF-02 | Bước 3–4 | Send message thất bại sau khi đã upload ảnh thành công | Xóa ; revert ảnh (giữ `file_id`) + text về thanh chat; hiển thị toast lỗi | | BR-03, BR-04 |
| EF-03 | Bước 3–4 | AI streaming bắt đầu nhưng bị ngắt giữa chừng (partial response) | Xóa partial response  của AI; xóa  tin nhắn người dùng; revert text + ảnh về thanh chat (theo BR-04/BR-05) | | BR-03, BR-04 |

---
