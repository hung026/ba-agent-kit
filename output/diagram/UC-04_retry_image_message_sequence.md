## Sequence Diagram — UC-04: Retry tin nhắn có ảnh

```plantuml
@startuml
actor "Người dùng" as U
participant "App (FE)" as FE
participant "Dify API" as DIFY

U -> FE: Nhấn "Gửi" (kèm ≥1 ảnh + text tùy chọn)
FE -> FE: Hiển thị bubble (optimistic UI)\nDisable thanh chat

loop Từng ảnh
  FE -> DIFY: POST /files/upload {file}
  alt Upload thành công
    DIFY --> FE: 200 OK {file_id}
    FE -> FE: Lưu file_id
  else Upload thất bại
    DIFY --> FE: 4xx / 5xx / network error
    FE -> FE: Đánh dấu ảnh này "chưa có file_id"\n(giữ ảnh local)
  end
end

alt Có ≥1 file_id thành công → Tiến hành gửi message
  FE -> DIFY: POST /chat-messages\n{query, conversation_id, files: [file_id...]}
  alt Send message thành công
    DIFY --> FE: 200 OK (streaming bắt đầu)
    loop Nhận streaming response
      DIFY ->> FE: stream chunk
    end
    alt Nhận đủ response (stream kết thúc bình thường)
      FE --> U: Hiển thị câu trả lời AI
    else Streaming bị ngắt giữa chừng
      FE -> FE: Xoá partial response bubble
      note right of FE
        Giữ lại file_id của ảnh đã upload
      end note
      FE -> FE: Xoá bubble tin nhắn người dùng\nXoá thinking indicator
      FE -> FE: Revert text + ảnh về thanh chat\n• Ảnh có file_id → giữ nguyên\n• Ảnh không có file_id → giữ local
      FE -> FE: Re-enable thanh chat
      FE --> U: Toast: "Đã có lỗi xảy ra. Vui lòng thử lại sau."
    end
  else Send message thất bại (4xx / 5xx / timeout)
    DIFY --> FE: Error response
    note right of FE
      Giữ lại file_id của ảnh đã upload
    end note
    FE -> FE: Xoá bubble tin nhắn người dùng\nXoá thinking indicator
    FE -> FE: Revert text + ảnh về thanh chat\n• Ảnh có file_id → giữ nguyên\n• Ảnh không có file_id → giữ local
    FE -> FE: Re-enable thanh chat
    FE --> U: Toast: "Đã có lỗi xảy ra. Vui lòng thử lại sau."
  end
else Toàn bộ ảnh upload thất bại
  FE -> FE: Xoá bubble tin nhắn người dùng
  FE -> FE: Revert text + tất cả ảnh local về thanh chat
  FE -> FE: Re-enable thanh chat
  FE --> U: Toast: "Đã có lỗi xảy ra. Vui lòng thử lại sau."
end

== Người dùng chọn Gửi lại ==

opt Người dùng nhấn "Gửi" lại
  U -> FE: Nhấn "Gửi" lại (nội dung đã revert)
  FE -> FE: Hiển thị bubble (optimistic UI)\nDisable thanh chat

  loop Từng ảnh cần upload lại (chưa có file_id)
    FE -> DIFY: POST /files/upload {file_local}
    DIFY --> FE: 200 OK {file_id}
    FE -> FE: Lưu file_id mới
  end

  note over FE
    Ảnh đã có file_id từ lần trước
    → không upload lại
  end note

  FE -> DIFY: POST /chat-messages\n{query, conversation_id, files: [file_id...]}
  DIFY --> FE: 200 OK (streaming)
  loop Nhận streaming response
    DIFY ->> FE: stream chunk
  end
  FE --> U: Hiển thị câu trả lời AI
end
@enduml
```

---

**API liên quan:**

| API | Mục đích | Method | Request | Response |
|---|---|---|---|---|
| `/files/upload` | Upload ảnh lên Dify, nhận file_id | POST | `multipart/form-data {file, type: "image"}` | `{id: file_id, name, size, ...}` |
| `/chat-messages` | Gửi tin nhắn kèm ảnh đến AI | POST | `{query, conversation_id, inputs, files: [{type:"image", transfer_method:"local_file", upload_file_id: file_id}]}` | Streaming response |
