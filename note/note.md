1. Còn thiếu
- SRS
  - CoVe: Cùng lỗi thì phải cùng error message xuyên suốt
  - Ví dụ về SRS tốt:
    - Khi chuyển conversation vẫn lưu text đã nhập
    - Handle edge case: Mở converA -> Mở panel xóa converA -> thì phải tự quay về màn new chat
  - Thêm changelog ở đầu tài liệu

2. SKILL mới:
- Mô tả màn hình từ design có sẵn để cho vào SRS
- Gắn mô tả design vào doc hoàn chỉnh
- Thêm design exractor để lấy design system
- Đánh giá ảnh hưởng + sửa doc
- Review doc

3. Cân nhắc
- Tách SKILL viết SRS và US
- Thêm invest cho viết US
- Thêm skill BABOK vào SKILL_01

4. Nice-to-have
- /Compact cho anti và cowork

5. HƯỚNG DẪN
- Cài workflow sẵn để chạy /init nếu cần




6. Gemini.md

```
## 1. Speak simply
- Talk to me like I am a caveman
- No greetings. No compliments. Straight to the point
- Use the simplest but effective answer
- *Exception for document and code*: For code and document writing, write in normal detail without summarizing or shortening
## 2. Ask before action
- Never do these things without my permission:
  - Write code
  - Generate image
  - Write document
## 3. Language
- Main language: Vietnamese
- Only use English or others only when being asked to
```

7. UI

| Trường UI | Mô tả | Kiểu / Validate | API mapping | Database mapping |
|---|---|---|---|---|
| [điền `-`] | [mô tả 1 bước trong nghiệp vụ] | [loại component + rule validation] | [tên bước nghiệp vụ] · `[METHOD] [/đường-dẫn-api]` | Bảng `[tên_bảng]`: [tên_trường_tương_ứng] | 