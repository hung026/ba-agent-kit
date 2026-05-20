1. Còn thiếu
- Vẽ mock (html css)
- Connect với Stich vẽ mockup (design figma)
- SRS
  - Thêm temp mixpanel
  - BR phải đánh 1-2-3 theo UC, không tăng dần
  - CoVe: Cùng lỗi thì phải cùng error message xuyên suốt
  - Ví dụ về SRS tốt:
    - Khi chuyển conversation vẫn lưu text đã nhập
    - Handle edge case: Mở converA -> Mở panel xóa converA -> thì phải tự quay về màn new chat
  - Ví dụ về mô tả design tốt:
    - nút like: unselect nút còn lại, hoặc unlike thì hiện thế nào
  - Thêm changelog ở đầu tài liệu

2. SKILL mới:
- Mô tả từ design có sẵn
- Thêm design exractor để lấy design system
- Đánh giá ảnh hưởng + sửa doc
- Review doc

3. Cân nhắc
- Tách SKILL viết SRS và US
- Thêm invest cho viết US
- Thêm skill BABOK vào SKILL_01

4. Nice-to-have
- Connect sẵn figma, gg doc, plantUML
- /Compact cho anti và cowork

5. HƯỚNG DẪN
- Thêm HDSD cho team
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