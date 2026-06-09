<context>
    -App Lá chắn số đang có sẵn tính năng bảo vệ gia đình
    -Tính năng "Bảo vệ gia đình" của tôi cho phép user add bạn bè/người thân vào cùng nhóm (bằng số điện thoại, và chỉ cho phép nhà mạng V, mạng khác không thể vào nhóm), để từ đó, user có thể nhận được cảnh báo(qua push noti) khi người thân/bạn bè gặp các cuộc gọi lừa đảo. Đồng thời có thể vào app để xem chi tiết về cuộc gọi đó (gọi cho ai, thời lượng bao lâu, gọi lúc mấy giờ,...)
    -Các cuộc gọi lừa đảo ở đây có 2 trường hợp:
    1 là xuất phát từ các Số điện thoại được gán nhãn Lừa đảo/làm phiền (app của tôi có sẵn blaclist database để check)
    2 là các cuộc gọi do AI phát hiện (AI engine này cũng đã là tính năng có sẵn trên app)
    -Lúc này, user được coi là Trưởng nhóm, còn người thân được coi là Thành Viên
    -TÍnh năng này là 1 module đặt ngay ở homepage
    -Để sử dụng tính năng Bảo vệ gia đình này, user bắt buộc phải login bằng số điện thoại và bật 1 tính năng phụ, gọi là "Antiscam" (bắt buộc phải biết số điện thoại của user, thì chúng tôi mới track được các cuộc gọi của họ)
</context>

<new_features>
    -Tôi mong muốn đưa thêm 1 tính năng Bảo vệ con cái (thường được biết đến với cái tên parental control - giải pháp khá phổ biến trên thế giới) vào trong cùng tính năng "Bảo vệ gia đình" đã nói ở trên
    -Giai đoạn hiện tại, tôi chỉ cần các tính năng parental control như sau:
    0-Onboarding: Giới thiệu và xin các quyền cần thiết
    1-Pairing: Tính năng ghép nối thiết bị bố mẹ và con cái
    2-Dashboard: xem tổng quan thông tin và tình trạng của con cái và người thân
    3-Chặn web
    4-Chặn/giới hạn thời gian dùng app
    5-tính năng nhận cảnh báo đã có sẵn ở Bảo vệ gia đình
    -Cần đảm bảo trải nghiệm user không bị phân mảnh, không cho user cảm giác đây là 2 tính năng rời rác
</new_features>

<additional_info>
    -Con cái cần cài 1 app Lá Chắn Số Kid. Đây là 1 dạng remote agent giúp bố mẹ control thiết bị
    -Cả 2 OS đều hỗ trợ. iOS chúng tôi dùng MDM, android dùng CA
    -"con cái" là 1 dạng Thành viên đặc biệt (vừa gửi alert lừa đảo đến máy bố mẹ, vừa bị kiểm soát app/web)
    -Để gửi được alert tới máy bố mẹ, con cái bắt buộc phải bật Antiscam giống như người lớn.
    -việc chặn app web tôi đã có giải pháp về tech. Chỉ cần đề xuất phương án tích hợp UX sao cho hợp lý
<additional_info>