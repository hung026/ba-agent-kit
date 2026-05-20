---
description: # Workflow: Convert Document to Markdown using MarkItDown CLI
---

## Mục tiêu
Chuyển đổi file (PDF, Docx,...) mà người dùng đang mở hoặc kéo thả vào thành định dạng Markdown (.md).

## ⚠️ QUY TẮC BẮT BUỘC (CRITICAL INSTRUCTIONS) ⚠️
1. **NGHIÊM CẤM** việc LLM tự ý dùng tool đọc file (view_file, read_url...) để lấy nội dung rồi tự viết lại thành Markdown bằng năng lực sinh văn bản của LLM.
2. BẠN BẮT BUỘC phải dùng tool `run_command` để gọi thư viện `markitdown` đã được cài đặt sẵn trên máy tính.

## Các bước thực hiện (Workflow Steps)
1. **Lấy đường dẫn file gốc:** Tìm đường dẫn tuyệt đối của file cần convert từ biến `Active Document` trong MetaData (nếu người dùng đang mở file), hoặc từ đường dẫn người dùng trực tiếp cung cấp.
2. **Tạo tên file đích:** Đổi đuôi của file gốc thành `.md`.
3. **Thực thi lệnh Terminal:** Dùng tool `run_command` để chạy chính xác câu lệnh sau (cần tự động thay biến):
   ```powershell
   C:\Users\PC\AppData\Local\Programs\Python\Python312\python.exe -m markitdown "<Đường_dẫn_file_gốc>" -o "<Đường_dẫn_file_đích.md>"
   ```
4. **Báo cáo:** Thông báo cho người dùng lệnh đã chạy thành công và vị trí file output. KHÔNG in lại toàn bộ nội dung file Markdown ra khung chat.
