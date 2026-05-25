# Business Requirement Document (BRD)

## Rules
- Follow the structure as following **Output format**.
- Sections that contains "(Optional)" in section header can be skipped if there is no information, or is not required by user.


## Output format
```markdown
# BUSINESS REQUIREMENT DOCUMENT (BRD)
**Dự án:** [Tên Dự án]
**Module:** [Tên Module/Tập Tính năng]
**Ngày:** [Ngày hiện tại]
**Người đề xuất:** [Tên Người đề xuất, mặc định là `Business Analyst`]

---

## 1. TỔNG QUAN
### 1.1. Mục tiêu 
[Mô tả mục đích của tài liệu và những gì MVP hoặc module hướng tới].

### 1.2. Phạm vi 
*   **In-Scope:** [Liệt kê các tính năng hoặc yêu cầu bao gồm].
*   **Out-of-Scope:** `Tất cả các tính năng không được đề cập trong phần In-Scope.` theo mặc định.

### 1.3. Pain Points
| Pain Point | Giải pháp | Mức độ quan trọng |
| :--- | :--- | :--- |
| [Mô tả vấn đề] | [ID Tính năng] | [Critical/High/Medium] |

---

## 2. MÔ TẢ YÊU CẦU CHỨC NĂNG
*Note: Lặp lại phần này cho mỗi tính năng (FR-01, FR-02, v.v.).*

### [FR-ID]: [Tên Tính năng]
#### 2.1. Mục tiêu
[Mô tả mục tiêu của tính năng và vấn đề nó giải quyết].

#### 2.2. Luồng hoạt động (Happy path)
1. [Bước 1]
2. [Bước 2]
3. [Phản hồi của hệ thống]
4. [Kết quả/Ghi log].

#### 2.3. User Stories
*   **As a [Primary User Persona]:** Tôi muốn [hành động] để [lợi ích].
*   **As a [Secondary User Persona]:** Tôi muốn [hành động] để [lợi ích].

#### 2.4. Yêu cầu kỹ thuật
*   **[Platform A (vd: Android)]:** [Các API, dịch vụ, hoặc quyền truy cập cụ thể cần thiết].
*   **[Platform B (vd: iOS)]:** [Framework, giới hạn, hoặc cấu hình cụ thể].
*   **[Backend/Cloud/Sync]:** [Yêu cầu cơ sở dữ liệu, phương thức đồng bộ, hoặc hạ tầng].

#### 2.5. Acceptance Criteria
*   [ ] [Performance metric (vd: độ trễ < X ms)]
*   [ ] [Độ chính xác hoặc tỷ lệ thành công (vd: > 95%)]
*   [ ] [Yêu cầu trải nghiệm người dùng]
*   [ ] [Quy tắc xác thực (vd: xác thực đầu vào, định dạng dữ liệu)]
*   [ ] [Giới hạn sử dụng tài nguyên (vd: < 3% pin)].

#### 2.6. Các trường hợp ngoại lệ & xử lý lỗi (Edge Cases & Error Handling)
*   [Scenario 1 (vd: Chế độ ngoại tuyến)]: [Phản hồi của hệ thống]
*   [Scenario 2 (vd: Người dùng cố gắng vượt qua quy định)]: [Phản hồi của hệ thống]
*   [Scenario 3 (vd: Hỏng cơ sở dữ liệu)]: [Cơ chế dự phòng].

---

## 3. YÊU CẦU PHI CHỨC NĂNG (OPTIONAL)
### 3.1. Performance
*   **Tiêu hao pin/tài nguyên:** [Mức sử dụng tối đa cho phép].
*   **Network/Memory:** [Giới hạn sử dụng].
*   **Độ trễ:** [Mục tiêu thời gian phản hồi].
*   [các yêu cầu khác ...]

### 3.2. Security (OPTIONAL)
*   [Tiêu chuẩn mã hóa, băm mật khẩu, quản lý phiên, và bảo mật API].

### 3.3. Khả năng mở rộng (OPTIONAL)
*   [Hỗ trợ đồng thời và kiến trúc cơ sở dữ liệu (vd: sharding)].

### 3.4. Khả năng tương thích (OPTIONAL)
| Platform | Minimum Version | Optimal Version | Ghi chú |
| :--- | :--- | :--- | :--- |
| [Tên OS] | [Phiên bản] | [Phiên bản] | [Ghi chú tương thích] |

### 3.5. Tuân thủ (OPTIONAL)
*   [Tiêu chuẩn pháp lý và quy định (vd: GDPR, COPPA, luật địa phương)].

---

## 4. Rủi ro & Phương án xử lý (OPTIONAL)
### 4.1. Rủi ro kỹ thuật/UX/Business
| Rủi ro | Mức độ | Cách xử lý |
| :--- | :--- | :--- |
| [Mô tả rủi ro] | [High/Medium/Low] | [Cách phòng ngừa hoặc xử lý] |

---

## 5. PHỤ LỤC (OPTIONAL)
### 5.1. Thuật ngữ
*   **[Thuật ngữ]:** [Định nghĩa].

### 5.2. Tài liệu tham khảo
*   [Liên kết đến tài liệu API hoặc tài nguyên bên ngoài].

### 5.3. Câu hỏi mở
*   [Danh sách các truy vấn thiết kế hoặc kỹ thuật chưa được giải quyết cho team].


---
```