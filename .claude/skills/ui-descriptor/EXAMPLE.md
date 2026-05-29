# Ví dụ output — Màn hình Đăng nhập

### Màn hình: Đăng nhập (Login)

| ID | Thành phần | Loại | Trạng thái | Mô tả giao diện | Validation | API Mapping |
|----|-----------|------|------------|-----------------|------------|-------------|
| 1 | Logo ứng dụng | Image | Default | Logo thương hiệu ở đầu màn hình | — | — |
| 2 | Ô nhập Email | Text Input | Default / Focused / Error | Ô nhập email để đăng nhập. → Tương tác: tap vào hiện bàn phím, type email. → Điều kiện: hiển thị icon error khi validate fail | Bắt buộc. Đúng format email. Max 255 ký tự | `POST /api/auth/login → email` |
| 3 | Ô nhập Mật khẩu | Text Input | Default / Focused / Error | Ô nhập mật khẩu, mặc định ẩn ký tự. → Tương tác: tap icon mắt để hiện/ẩn mật khẩu | Bắt buộc. Tối thiểu 8 ký tự | `POST /api/auth/login → password` |
| 3.1 | Icon hiện/ẩn mật khẩu | Icon Button | Default / Active | Toggle hiện/ẩn text trong ô mật khẩu. → Tương tác: tap để chuyển đổi giữa 2 trạng thái | — | — |
| 4 | Nút Đăng nhập | Button | Default / Loading / Disabled | Nút chính gửi form đăng nhập. → Tương tác: tap → gọi API login, hiện loading. → Điều kiện: Disabled khi email hoặc password rỗng | — | `POST /api/auth/login` |
| 5 | Link Quên mật khẩu | Link | Default | Chuyển đến màn hình khôi phục mật khẩu. → Tương tác: tap → navigate đến màn Forgot Password | — | — |
| 6 | Nút Đăng nhập Google | Button | Default / Loading | Đăng nhập bằng tài khoản Google. → Tương tác: tap → mở OAuth Google flow | — | `POST /api/auth/social → provider: "google"` |
| 7 | Link Đăng ký | Link | Default | Chuyển đến màn hình tạo tài khoản mới. → Tương tác: tap → navigate đến màn Register | — | — |

**Ghi chú:**
- Thứ tự tab: Email → Mật khẩu → Nút Đăng nhập
- Chưa rõ: có giới hạn số lần đăng nhập sai không? Cần xác nhận
- Nút Đăng nhập Google: cần xác nhận có hỗ trợ thêm Apple/Facebook không

---

# Ví dụ output — Màn hình Danh sách sản phẩm

### Màn hình: Danh sách sản phẩm (Product List)

| ID | Thành phần | Loại | Trạng thái | Mô tả giao diện | Validation | API Mapping |
|----|-----------|------|------------|-----------------|------------|-------------|
| 1 | Header | Navigation Bar | Default | Thanh header chứa nút back, tiêu đề "Sản phẩm", icon giỏ hàng | — | — |
| 1.1 | Nút Back | Icon Button | Default | Quay lại màn hình trước. → Tương tác: tap → navigate back | — | — |
| 1.2 | Badge giỏ hàng | Badge | Default / Hidden | Hiển thị số lượng sản phẩm trong giỏ. → Điều kiện: ẩn khi giỏ hàng trống | — | `GET /api/cart/count → total_items` |
| 2 | Thanh tìm kiếm | Search Bar | Default / Focused | Tìm kiếm sản phẩm theo tên hoặc mã. → Tương tác: tap → focus, nhập text → gọi search API sau 300ms debounce | — | `GET /api/products?search={keyword}` |
| 3 | Bộ lọc danh mục | Chip Group | Default / Selected | Lọc sản phẩm theo danh mục. Cho phép chọn 1 chip tại 1 thời điểm. → Tương tác: tap chip → filter list, chip được chọn đổi style active | — | `GET /api/products?category={id}` |
| 4 | Card sản phẩm | Card | Default | Card hiển thị 1 sản phẩm gồm ảnh, tên, giá. Lặp lại theo data. → Tương tác: tap → navigate đến màn Chi tiết sản phẩm | — | `GET /api/products → items[]` |
| 4.1 | Ảnh sản phẩm | Image | Default / Loading | Ảnh thumbnail sản phẩm. Hiện skeleton khi đang load | — | `→ items[].thumbnail_url` |
| 4.2 | Tên sản phẩm | Label | Default | Tên sản phẩm, tối đa 2 dòng, cắt ellipsis nếu dài hơn | — | `→ items[].name` |
| 4.3 | Giá sản phẩm | Label | Default | Giá hiển thị format tiền VND. Nếu có giá gốc, hiển thị gạch ngang bên cạnh | — | `→ items[].price, items[].original_price` |
| 4.4 | Nút Thêm giỏ hàng | Icon Button | Default / Loading | Thêm nhanh sản phẩm vào giỏ. → Tương tác: tap → gọi API thêm giỏ, hiện loading, thành công thì cập nhật badge giỏ hàng (1.2) | — | `POST /api/cart/add → product_id, quantity: 1` |
| 5 | Empty state | Illustration + Label | Empty | Hiển thị khi không có sản phẩm nào. → Điều kiện: show khi API trả về list rỗng | — | — |
| 6 | Infinite scroll loader | Progress Bar | Loading | Hiện khi đang load thêm sản phẩm. → Điều kiện: show khi scroll gần cuối list và còn data | — | `GET /api/products?page={next_page}` |

**Ghi chú:**
- Card sản phẩm (ID 4): chỉ mô tả 1 card mẫu, lặp lại theo data từ API
- Cần xác nhận: pagination dùng infinite scroll hay nút "Xem thêm"?
- Cần xác nhận: có hỗ trợ chế độ xem grid/list toggle không?
