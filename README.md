# THẦN CHÚ CLAUDE

## Cách sử dụng
1. Hỏi đáp ngoài -> Dùng `New chat` hoặc ChatGPT, Gemini free
2. Hỏi đáp trong phạm vi dự án -> Sử dụng `Project`
3. Dùng command `/skill_name` để bắt model dùng đúng SKILL

## Tối ưu token
1. **Sửa tin nhắn** thay vì chat tiếp để yêu cầu sửa
2. **Hỏi 1 câu đầy đủ** thay vì nhiều câu
3. **Hạn chế nhắn tin** vào [12h-1h] trưa & [1h-6h] sáng
4. **Gửi tối đa 10 tin nhắn** cho 1 conversation

## Prompt structure

1. Prompt mở đầu:

```
# Context:

# Task:

# Note:

# Reference:

```

2. Ví dụ:

```
# Context: Tôi đang phát triển tính năng AI on-device trên mobile app. 
Tính năng này dùng để ........

# Task: Tôi muốn thêm tính năng "thông báo khi phát hiện cuộc gọi an toàn". Hãy phân tích và đề xuất giải pháp cho tính năng này. Dùng /analyst_advisor

# Note:
-Hiện chỉ tập trung hỗ trợ cho dòng samsung flagship
-Tận dụng & liên kết với các tính năng khác trên app(nếu có thể) để tạo trải nghiệm liền mạch

# Reference:
- Tham chiếu và tận dụng thông tin từ các file sau: 
  - file AI-ondevice.docx: tài liệu mô tả tính năng AI on-device hiện tại
  - file ABC.docx: tài liệu tính năng ABC...
```

## Bảo mật
1. Mask thông tin khi chat
