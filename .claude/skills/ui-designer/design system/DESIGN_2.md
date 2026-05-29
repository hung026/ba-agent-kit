# Design System Guidelines - [APP] NEW

Tài liệu này quy định chi tiết về hệ thống thiết kế (Design System) của ứng dụng. Mục tiêu của tài liệu là đảm bảo tính nhất quán về mặt thị giác (UI), trải nghiệm người dùng (UX) và tối ưu hóa quy trình làm việc giữa các nhóm thiết kế và phát triển. 

---

## 1. ❖ FOUNDATIONS (Nền tảng thiết kế)

Nền tảng bao gồm các quy tắc cơ bản cấu thành nên toàn bộ giao diện của ứng dụng. Cấm sử dụng các giá trị tùy chỉnh (hardcode) nằm ngoài hệ thống này.

### 1.1. Colors (Màu sắc)
Hệ thống màu được phân cấp rõ ràng theo mục đích sử dụng. Dưới đây là các token màu cơ bản đã được xác định:

* **Màu cơ sở (Base):**
    * White: `#FFFFFF`
    * Black: `#000000`
    * Transparent: `#FFFFFF 0%`
* **Gray (Màu trung tính):**
    * *Mục đích:* Dùng cho màu nền, viền (border), text phụ, và các trạng thái disabled. Giúp tạo sự phân cấp hiển thị rõ ràng.
    * Gray 25: `#FDFDFD`
    * Gray 50: `#F7F7F7`
    * Gray 100: `#F5F5F5`
* **Brand (Màu thương hiệu):**
    * *Mục đích:* Dùng cho các hành động quan trọng như Primary Button, highlight và các điểm nhấn chính của ứng dụng.
    * Brand 25: `#FFF4F5`
    * Brand 50: `#FDEBEA`
    * Brand 100: `#FBD2D5`
* **Error (Màu lỗi):**
    * *Mục đích:* Dùng để cảnh báo vấn đề, hiển thị trạng thái validation thất bại hoặc thông báo lỗi.
    * Error 25: `#FFFBFA`
    * Error 50: `#FEF3F2`
    * Error 100: `#FEE4E2`
* **Warning (Màu cảnh báo):** * *Mục đích:* Dùng cho các trạng thái cần sự chú ý của người dùng nhưng chưa ở mức độ lỗi nghiêm trọng.
* **Style đặc biệt:** Hệ thống có hỗ trợ `bg-glass` (hiệu ứng kính mờ/blur) để sử dụng cho các lớp phủ.

### 1.2. Typography, Icons & Grid
* **Typography:** Tuân thủ hệ thống font chữ được quy định trong `☑️ Typography`. 
* **Icons:** * Sử dụng bộ icon chuẩn từ `☑️ Icons`.
    * *Lưu ý kích thước:* Đối với size XS (như dùng trong Component Badge), kích thước icon phải được thiết lập là **14px** để đảm bảo không bị quá to so với chữ đi kèm.
* **Grid (Lưới) & Spacing:** Cần tuân thủ chặt chẽ các thông số về gap (khoảng cách giữa các phần tử) và padding (đệm) đã được căn chỉnh chuẩn hóa trong thư viện.

---

## 2. ❖ BASE COMPONENTS (Thành phần cơ bản)

Các component cơ bản cần được tái sử dụng xuyên suốt dự án. Dưới đây là các quy định và lưu ý UX đặc biệt cần tuân thủ khi thiết kế:

### 2.1. Input Fields & Dropdowns
* Yêu cầu xây dựng đủ các trạng thái (States): Default, Hover, Focus, Active, Disabled, Error.
* **Hành vi tương tác (UX):** Đối với các trường Input có tính năng mở rộng (Dropdown/Expand), khi người dùng **Focus**, biểu tượng mũi tên (arrow) mặc định phải chuyển sang trạng thái **arrow-up** để ám chỉ hành động thu/mở.
* **Search Input:** Trường tìm kiếm trên Header có một kích thước riêng biệt (custom size), cần đảm bảo thiết lập đầy đủ các states tương tự như Input Field tiêu chuẩn.

### 2.2. Calendar & Date Picker
* Hỗ trợ hiển thị lịch theo chuẩn ngày/tháng/năm.
* Tính năng: Hỗ trợ loại lịch có thể cuộn (scroll) chọn ngày/tháng/năm nhanh chóng.
* Hiển thị trạng thái đang chọn (ví dụ: January 2026) phải nổi bật và rõ ràng.

### 2.3. Badge
* Kiểm soát chặt chẽ gap và padding. 
* Như đã đề cập ở phần Icons, icon đặt trong Badge ở kích thước XS bắt buộc để 14px.

### 2.4. Các Components khác
Sử dụng chuẩn xác các thiết kế đã có sẵn đối với: Avatar, Buttons, Selection Chip, Tags, Tabs, Segmented Controls, Tooltip, Toast - Alert, Bottom Sheet, Grabber, Modals/Dialogs...

---

## 3. ❖ PATTERN LIBRARY (Thư viện mẫu)

Thư viện mẫu cung cấp các tổ hợp component phức tạp (patterns) thường gặp trong ứng dụng.

### 3.1. Chart (Biểu đồ)
* **Định dạng số liệu:** Bắt buộc sử dụng **dấu chấm (`.`)** cho phần thập phân, KHÔNG dùng dấu phẩy (`,`). (Ví dụ: `1.5` thay vì `1,5`).
* **Đơn vị:** Text hiển thị đơn vị trên biểu đồ **không được gạch chân**.
* **Pie Chart (Biểu đồ tròn):** Phải luôn luôn có một dòng ghi chú (note/legend) giải thích ý nghĩa các phần tử nằm bên dưới biểu đồ.

### 3.2. Cấu trúc trang (Page Structure)
* Sử dụng `☑️ Header` và `☑️ Bottom App Bar` cố định để định hình layout khung cho ứng dụng.
* Đối với các khu vực không có dữ liệu, luôn sử dụng `☑️ Empty State` để hướng dẫn người dùng.
* Sử dụng `☑️ Notice`, `☑️ Stepper`, `☑️ Carousel` cho các luồng hướng dẫn, điền form nhiều bước hoặc hiển thị thông báo hệ thống.

---

## 4. Best Practices (Thực hành thiết kế tốt nhất)

1.  **Không Detach Component:** Hạn chế tối đa việc detach (ngắt kết nối) các component khỏi Design System trên Figma/Stitch trừ khi thực sự cần thiết. Sử dụng `✅ Custom Slot/Module` nếu cần tuỳ biến nội dung bên trong.
2.  **Kiểm tra UX (Check UX):** Luôn review kỹ các luồng tương tác nhỏ lẻ như trạng thái Focus của Input, kích thước chạm (touch target) tối thiểu cho thao tác trên Mobile (OS), và phản hồi của hệ thống (Toast/Alert) sau mỗi thao tác.
3.  **Giao tiếp qua Annotations:** Đọc kỹ các `☑️ Design annotations` trong file để nắm bắt ý đồ của người tạo System trước khi áp dụng vào thiết kế màn hình (Screen Design) thực tế.