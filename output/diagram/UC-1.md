

```plantuml
@startuml
actor "Người dùng" as User
participant "Mobile App" as App
participant "Dify API" as Dify
participant "Backup Server" as Backup
participant "GPT-4.1 mini" as GPT

User -> App: Nhấn icon đính kèm ảnh
App --> User: Hiển thị bottom sheet chọn nguồn ảnh
User -> App: Chọn "Thư viện ảnh"

alt Chưa cấp quyền thư viện ảnh (EF-01)
  App --> User: Hiển thị dialog yêu cầu quyền / Mở cài đặt
else Đã cấp quyền
  App -> User: Mở native image picker
  User -> App: Chọn 1-5 ảnh
  
  opt Chọn quá 5 ảnh (AF-01)
    App --> User: Báo giới hạn, chỉ giữ 5 ảnh đầu tiên
  end
  
  App --> User: Hiển thị preview các ảnh đã chọn
  
  opt Xóa bớt ảnh trong preview (AF-02)
    User -> App: Xóa ảnh
    App --> User: Cập nhật lại danh sách ảnh
  end
  
  User -> App: Nhập text (tùy chọn) và nhấn "Gửi"
  App -> App: Validate ảnh (<10MB) và Convert HEIC sang JPEG
  
  alt Lỗi validate hoặc convert thất bại (EF-02, EF-03)
    App --> User: Thông báo lỗi, loại bỏ ảnh lỗi (Giữ ảnh hợp lệ)
  end
  
  App --> User: Hiển thị trạng thái "Đang gửi..."
  
  App -> Dify: POST /upload (Upload file lên Dify)
  alt Upload Dify thất bại (EF-04)
    Dify --> App: 4xx/5xx Error
    App --> User: Hiển thị "Gửi thất bại", cho phép thử lại
  else Upload thành công
    Dify --> App: 200 OK (File IDs)
    
    App ->> Backup: POST /backup (Upload ngầm lên Server nội bộ)
    alt Backup thất bại (EF-05)
      Backup --> App: 4xx/5xx Error
      App -> App: Ghi log lỗi, đưa vào hàng đợi retry ngầm
    end
    
    App -> Dify: POST /chat-messages {message, file_ids}
    Dify -> GPT: Gửi message, system prompt & file
    
    alt Không phản hồi / Timeout (EF-06)
      GPT --> Dify: Error / Timeout
      Dify --> App: 5xx Error
      App --> User: Hiển thị "AI đang bận, vui lòng thử lại"
    else Thành công
      GPT --> Dify: Kết quả phân tích (kèm disclaimer nếu ảnh mờ EF-07)
      Dify --> App: 200 OK (Kết quả AI)
      App --> User: Hiển thị phản hồi AI & prompt suggestion
    end
  end
end
@enduml
```

**Description:**
- Người dùng chọn "Thư viện ảnh" để tải lên từ 1 đến 5 bức ảnh. App sẽ kiểm tra quyền truy cập, hiển thị giao diện chọn ảnh và tiến hành validate kích thước (tối đa 10MB) cũng như chuyển đổi định dạng HEIC sang JPEG. Sau khi người dùng nhấn gửi, ứng dụng ưu tiên upload ảnh lên hệ thống Dify. Nếu thành công, một bản sao backup sẽ được đồng bộ ngầm về Server nội bộ, đồng thời tin nhắn chứa ảnh sẽ được gửi qua Dify đến GPT-4.1 mini để phân tích lừa đảo. Kết quả phân tích cuối cùng sẽ được trả về và hiển thị trên màn hình chat kèm theo các gợi ý (prompt suggestion) tiếp theo cho người dùng. Các luồng ngoại lệ như lỗi đường truyền, vượt dung lượng hay quá giờ đều được mô tả bằng khối rẽ nhánh.

**API table:**
| API Name | Purpose | Method | Request Format | Response Format | Authentication | Related Use case |
|----------|---------|--------|----------------|-----------------|----------------|----------------|
| /upload | Upload ảnh lên Dify | POST | `multipart/form-data` (file) | `{ id: string, name: string, size: number, ... }` | Bearer Token | UC-1 |
| /backup | Upload ảnh lên Server nội bộ | POST | `multipart/form-data` (file) | `{ success: boolean }` | Bearer Token | UC-1 |
| /chat-messages | Gửi hội thoại AI qua Dify | POST | `{ query: string, inputs: object, response_mode: string, files: array }` | `{ event: string, message_id: string, answer: string, ... }` | Bearer Token | UC-1 |
