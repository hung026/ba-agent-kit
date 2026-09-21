# Stage 3 — Reference Outputs

Two compliant outputs. Read for **density and markup**, not for domain content.
The template in `03-solution-proposal.md` defines the shape; these define how much text belongs
inside that shape.

Both examples are near the top of their caps. Real outputs are often shorter — that is fine.

---

## Example A — LITE (Gate = Medium)

Input: *"App parents muốn xem con đang dùng app gì. Làm sao?"*

````
**Complexity: Trung bình** — chỉ 1 luồng chính, nhưng iOS và Android cho phép đọc khác nhau nên phải chọn cách.

## Summary

🎯 **Vấn đề thật:** Không phải "xem app nào" mà là "biết con có đang dùng app không nên dùng".
✅ **Đề xuất:** App con tự báo lên server (`push`), thay vì app bố mẹ đi hỏi máy con.

---

## 1. Solution — App con tự báo, app bố mẹ chỉ đọc

**Ý chính:** Máy con là nơi duy nhất biết sự thật, nên nó chủ động báo lên; server lưu, app bố mẹ đọc từ server.

**Cách hoạt động**

1. App con đọc app đang mở bằng API hệ thống, mỗi 60 giây
2. Gộp thành từng đoạn dùng liên tục, không gửi từng lần chuyển app
3. Gửi lên server kèm `mã chống gửi trùng (idempotency key)`
4. Mất mạng → xếp hàng chờ trên máy, có mạng thì gửi bù
5. App bố mẹ đọc từ server, không kết nối trực tiếp tới máy con

**Trade-off**

- ❌ Chậm 1-2 phút so với thực tế — không có "đang mở ngay lúc này"
- ✅ Bố mẹ mở app lúc nào cũng thấy dữ liệu, kể cả khi máy con đang tắt

---

## 2. Blind spot

Chưa xuất hiện trong mô tả ban đầu.

| # | Vấn đề | Mức độ | Giải pháp |
|---|--------|--------|-----------|
| 1 | iOS không cho đọc tên app đang mở | 🔴 | câu hỏi #1 |
| 2 | Con tắt app con | 🔴 | bước 4 |

---

## 3. Open question

1. ❓ **Cần tên app cụ thể, hay chỉ cần nhóm app?**
   → *Nếu chỉ cần nhóm: iOS làm được, blind spot #1 hết. Nếu cần tên: iOS phải bỏ tính năng này.*

> Bước tiếp theo: doc-factory — chốt xong câu hỏi #1 thì viết được user story.
````

Line count: ~40. Note what is **absent**: no Risk, no Assumptions, no Confirmed inputs, no ASCII
diagram, no contrast block. LITE earns its brevity by leaving those out entirely, not by writing
all of them briefly.

---

## Example B — FULL (Gate = Complex)

Input: *"App con vào web có certificate pinning thì lọc web kiểu gì?"*

````
**Complexity: Cao** — chạm 3 hệ thống (app con, bộ lọc, server ngân hàng), và cách lọc phổ biến nhất lại bị chặn.

## Summary

🎯 **Vấn đề thật:** Cách lọc web bằng `proxy` xung đột với `certificate pinning`, không phải thiếu tính năng lọc.
✅ **Đề xuất:** Lọc ở tầng tên miền (`DNS filtering`), không chạm vào nội dung kết nối.

---

## 1. Solution — Chặn theo tên miền, không mở gói tin

**Ý chính:** Quyết định chặn hay cho qua **trước khi** kết nối được tạo, nên không cần giả mạo giấy chứng nhận.

**Cách hoạt động**

1. App con trỏ toàn bộ tra cứu tên miền về `DNS` của hệ thống
2. Tên miền trong danh sách chặn → trả về lỗi, kết nối không bao giờ mở
3. Tên miền ngân hàng / ví điện tử → cho qua thẳng, không ghi log nội dung
4. Ghi lại tên miền con đã vào + thời điểm, không ghi nội dung
5. Bố mẹ đọc danh sách tên miền từ server

```
App con
    ↓ hỏi tên miền
DNS filter ──► trong danh sách chặn? ──Có──► trả lỗi, dừng ở đây
    │ Không
    ▼ [HTTPS trực tiếp]
Server ngân hàng (certificate pinning) → chấp nhận
```

❌ **Không làm được**
- Dựng `proxy` đọc nội dung — server ngân hàng thấy giấy chứng nhận lạ thì cắt kết nối

✅ **Thay bằng**
- Chặn ở tầng tên miền — kết nối vẫn đi thẳng, `certificate pinning` không có gì để phản ứng

**Trade-off**

- ❌ Không chặn được từng đường dẫn con, chỉ chặn được cả tên miền
- ❌ Không thấy được con làm gì bên trong một trang đã cho qua

---

## 2. Blind spot

Chưa xuất hiện trong mô tả ban đầu.

| # | Vấn đề | Mức độ | Giải pháp |
|---|--------|--------|-----------|
| 1 | Chặn cả tên miền là chặn quá rộng | 🔴 | câu hỏi #1 |
| 2 | Con đổi `DNS` trong cài đặt máy | 🔴 | bước 1 |
| 3 | Log tên miền ngân hàng là dữ liệu nhạy cảm | 🟡 | bước 3 |

---

## 3. Risk

Còn lại **sau khi** đã áp giải pháp.

| Rủi ro | Mức |
|--------|-----|
| Con vào bằng địa chỉ IP, không qua tên miền | 🟡 |
| Danh sách chặn lỗi thời | 🟡 |

---

## 4. Open question

1. ❓ **Cần chặn theo từng đường dẫn, hay chặn cả tên miền là đủ?**
   → *Nếu cần từng đường dẫn: `DNS filtering` không đủ, phải giới hạn app con vào một trình duyệt riêng.*

---

## 5. Assumptions

| # | Đang mặc định là đúng | Sai thì vỡ cái gì |
|---|-----------------------|-------------------|
| 1 | App con cấu hình được `DNS` toàn máy | Toàn bộ giải pháp, phải quay lại phương án trình duyệt riêng |
| 2 | Bố mẹ chấp nhận chặn theo tên miền | Blind spot #1 thành lỗi sản phẩm, không phải trade-off |

> Bước tiếp theo: impact-analyzer — kiểm tra phần "Lọc web" trong SRS có đang mô tả proxy không.
````

Line count: ~75 — for a problem touching 3 systems, with 2 🔴, a diagram, and a contrast block.
This is roughly the ceiling. An output materially longer than this is not more thorough; it is
narrating.

---

## What these examples demonstrate

| Technique | Where | Why it beats prose |
|---|---|---|
| 2-line icon Summary | top of both | Reader decides in 10 seconds whether to read on |
| Numbered sections | both | `bước 2`, `blind spot #1` become referenceable, so nothing repeats |
| ASCII diagram | B, step block | Replaces a paragraph describing a 3-hop flow |
| ❌ / ✅ contrast | B, once | "Cách này chết, dùng cách kia" in 4 lines |
| `Giải pháp` column | both | The whole blind-spot→solution mapping, one column, zero repetition |
| Omitting sections wholesale | A | LITE is short because sections are absent, not compressed |
