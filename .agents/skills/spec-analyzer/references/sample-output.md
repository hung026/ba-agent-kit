# FoodOrder App — Screen Specification

## Metadata
- **Project**: FoodOrder — Ứng dụng đặt đồ ăn
- **Platform**: Mobile App
- **Total screens**: 14 (screens: 8, modals: 2, popups: 2, toasts: 2)
- **Total modules**: 4
- **User roles**: Customer

---

## Module Overview

| Module | Tên | Screens | Mô tả |
|--------|-----|---------|--------|
| 01 | Authentication | S-0101 ~ S-0102 | Đăng nhập, đăng ký |
| 02 | Home & Browse | S-0201 ~ S-0203, M-0201 | Trang chủ, danh sách, tìm kiếm |
| 03 | Order | S-0301 ~ S-0303, P-0301, T-0301 | Chi tiết món, giỏ hàng, thanh toán |
| 04 | Account | S-0401, T-0401 | [inferred] Thông tin tài khoản |

---

## Screen Inventory

### Module 01: Authentication

#### S-0101: Login
- **Type**: Screen
- **Source**: SRS Section 3.1 — Authentication
- **Access roles**: Guest
- **Description**: Màn hình đăng nhập bằng số điện thoại + mật khẩu
- **Components**:
  | Component | Type | Behavior | Notes |
  |-----------|------|----------|-------|
  | App logo | image | display | Centered, top |
  | Phone input | input | text input | Format: 0xxx-xxx-xxxx, keyboard: phone |
  | Password input | input | text input, toggle show/hide | Secure text |
  | Login button | button | tap → validate → navigate | Disabled khi form chưa đủ |
  | Register link | text link | tap → navigate to S-0102 | "Chưa có tài khoản?" |
- **States**:
  | State | Trigger | Mô tả |
  |-------|---------|--------|
  | default | - | Form trống, nút Login disabled |
  | error | Login fail | Hiện error message dưới form: "Số điện thoại hoặc mật khẩu không đúng" |
  | loading | Tap Login | Nút Login hiện spinner, disable toàn bộ form |
- **Fake data**:
  ```json
  {
    "valid_credentials": {
      "phone": "0901234567",
      "password": "demo123"
    }
  }
  ```

#### S-0102: Register
- **Type**: Screen
- **Source**: SRS Section 3.1 — Authentication
- **Access roles**: Guest
- **Description**: Đăng ký tài khoản mới
- **Components**:
  | Component | Type | Behavior | Notes |
  |-----------|------|----------|-------|
  | Back button | button | tap → pop | Top left |
  | Full name input | input | text input | Required |
  | Phone input | input | text input | Format: 0xxx-xxx-xxxx |
  | Password input | input | text input, toggle show/hide | Min 6 ký tự |
  | Confirm password input | input | text input | Phải khớp password |
  | Register button | button | tap → validate → navigate to S-0201 | Disabled khi form chưa đủ |
  | Login link | text link | tap → pop to S-0101 | "Đã có tài khoản?" |
- **States**:
  | State | Trigger | Mô tả |
  |-------|---------|--------|
  | default | - | Form trống |
  | validation_error | Submit invalid | Hiện inline errors dưới mỗi field |
  | loading | Tap Register | Spinner trên nút |
- **Fake data**:
  ```json
  {
    "prefill_example": {
      "name": "Nguyễn Minh Anh",
      "phone": "0912345678",
      "password": "demo123"
    }
  }
  ```

---

### Module 02: Home & Browse

#### S-0201: Home
- **Type**: Screen
- **Source**: SRS Section 3.2 — Home
- **Access roles**: Customer
- **Description**: Trang chủ hiển thị banner, danh mục, và món ăn nổi bật
- **Components**:
  | Component | Type | Behavior | Notes |
  |-----------|------|----------|-------|
  | Search bar | input | tap → navigate to S-0203 | Placeholder: "Tìm món ăn..." |
  | Banner carousel | carousel | auto-scroll, tap → deep link | 3 banners |
  | Category list | horizontal scroll list | tap → navigate to S-0202 with filter | Icons + label |
  | Popular section | vertical list of cards | tap card → navigate to S-0301 | Card: image, name, price, rating |
  | Bottom tab bar | tab bar | tap → switch tab | Home (active), Orders, Account |
- **States**:
  | State | Trigger | Mô tả |
  |-------|---------|--------|
  | default | - | Hiển thị đầy đủ data |
  | loading | First load | Skeleton placeholders |
- **Fake data**:
  ```json
  {
    "banners": [
      {"id": 1, "image": "banner_sale.png", "title": "Giảm 50% đơn đầu tiên"},
      {"id": 2, "image": "banner_new.png", "title": "Món mới mỗi tuần"},
      {"id": 3, "image": "banner_free.png", "title": "Freeship đơn từ 50K"}
    ],
    "categories": [
      {"id": 1, "name": "Cơm", "icon": "rice"},
      {"id": 2, "name": "Phở", "icon": "noodle"},
      {"id": 3, "name": "Trà sữa", "icon": "drink"},
      {"id": 4, "name": "Bánh mì", "icon": "bread"},
      {"id": 5, "name": "Pizza", "icon": "pizza"}
    ],
    "popular_items": [
      {"id": 1, "name": "Cơm tấm sườn bì chả", "price": 45000, "rating": 4.8, "image": "com_tam.png", "restaurant": "Cơm Tấm Bà Năm"},
      {"id": 2, "name": "Phở bò tái nạm", "price": 55000, "rating": 4.6, "image": "pho_bo.png", "restaurant": "Phở Hòa"},
      {"id": 3, "name": "Trà sữa trân châu", "price": 35000, "rating": 4.5, "image": "tra_sua.png", "restaurant": "Tiger Sugar"},
      {"id": 4, "name": "Bánh mì thịt nướng", "price": 25000, "rating": 4.7, "image": "banh_mi.png", "restaurant": "Bánh Mì Huỳnh Hoa"}
    ]
  }
  ```

#### S-0202: Restaurant / Category List
- **Type**: Screen
- **Source**: SRS Section 3.3 — Browse
- **Access roles**: Customer
- **Description**: Danh sách món ăn theo danh mục hoặc nhà hàng
- **Components**:
  | Component | Type | Behavior | Notes |
  |-----------|------|----------|-------|
  | Back button | button | tap → pop | Top left |
  | Screen title | text | display | Tên category hoặc nhà hàng |
  | Filter button | button | tap → open M-0201 | Top right |
  | Item list | vertical scroll list | tap → navigate to S-0301 | Card: image, name, price, rating |
  | Sort dropdown | dropdown | select → re-sort list | Options: Phổ biến, Giá thấp→cao, Đánh giá cao |
- **States**:
  | State | Trigger | Mô tả |
  |-------|---------|--------|
  | default | - | Hiển thị danh sách |
  | empty | Category không có món | Illustration + "Chưa có món ăn nào" |
  | loading | First load | Skeleton cards |
- **Fake data**:
  ```json
  {
    "screen_title": "Cơm",
    "items": [
      {"id": 1, "name": "Cơm tấm sườn bì chả", "price": 45000, "rating": 4.8, "image": "com_tam.png", "restaurant": "Cơm Tấm Bà Năm", "delivery_time": "25 phút"},
      {"id": 5, "name": "Cơm gà xối mỡ", "price": 40000, "rating": 4.3, "image": "com_ga.png", "restaurant": "Cơm Gà Xối Mỡ 79", "delivery_time": "30 phút"},
      {"id": 6, "name": "Cơm chiên dương châu", "price": 38000, "rating": 4.1, "image": "com_chien.png", "restaurant": "Quán Ăn 123", "delivery_time": "20 phút"}
    ]
  }
  ```

#### S-0203: Search
- **Type**: Screen
- **Source**: SRS Section 3.3 — Browse
- **Access roles**: Customer
- **Description**: Tìm kiếm món ăn theo tên
- **Components**:
  | Component | Type | Behavior | Notes |
  |-----------|------|----------|-------|
  | Search input | input | text input, auto-focus | Autofocus khi mở, có clear button |
  | Cancel button | text button | tap → pop | Bên phải search input |
  | Recent searches | list | tap → fill search + trigger | Hiện khi chưa gõ gì |
  | Search results | vertical list | tap → navigate to S-0301 | Hiện khi có keyword |
- **States**:
  | State | Trigger | Mô tả |
  |-------|---------|--------|
  | default | - | Hiện recent searches |
  | results | Gõ keyword | Hiện kết quả |
  | empty_results | Keyword không match | "Không tìm thấy món nào" |
- **Fake data**:
  ```json
  {
    "recent_searches": ["Phở", "Cơm tấm", "Trà sữa"],
    "search_results_for_pho": [
      {"id": 2, "name": "Phở bò tái nạm", "price": 55000, "restaurant": "Phở Hòa"},
      {"id": 7, "name": "Phở gà", "price": 50000, "restaurant": "Phở Gà Nguyên"}
    ]
  }
  ```

#### M-0201: Filter Modal
- **Type**: Bottom Sheet
- **Triggered from**: S-0202 → Tap filter button
- **Description**: Bộ lọc kết quả tìm kiếm / danh sách
- **Components**:
  | Component | Type | Behavior | Notes |
  |-----------|------|----------|-------|
  | Price range | range slider | drag | Min 0 - Max 200K |
  | Rating filter | chip group | tap to select | 4★ trở lên, 3★ trở lên |
  | Delivery time | chip group | tap to select | <15 phút, <30 phút, <60 phút |
  | Apply button | button | tap → close modal, apply filter | Primary |
  | Reset link | text link | tap → clear all filters | "Xóa bộ lọc" |
- **Actions**:
  | Action | Result |
  |--------|--------|
  | Apply | Đóng modal, S-0202 reload với filter |
  | Reset | Xóa filter, giữ modal mở |
  | Tap backdrop | Đóng modal, không apply |

---

### Module 03: Order

#### S-0301: Food Detail
- **Type**: Screen
- **Source**: SRS Section 3.4 — Order
- **Access roles**: Customer
- **Description**: Chi tiết món ăn, chọn topping, số lượng
- **Components**:
  | Component | Type | Behavior | Notes |
  |-----------|------|----------|-------|
  | Food image | image | display | Full width, top |
  | Back button | button | tap → pop | Overlay trên image |
  | Food name | text | display | - |
  | Price | text | display | Format: xx.xxxđ |
  | Rating | text + icon | display | ★ 4.8 (120 đánh giá) |
  | Description | text | display | Mô tả món |
  | Toppings section | checkbox group | tap to toggle | Mỗi topping có tên + giá thêm |
  | Quantity selector | stepper | tap +/- | Min 1, max 20 |
  | Add to cart button | button | tap → add & show T-0301 | Hiện tổng giá: "Thêm vào giỏ — 45.000đ" |
- **States**:
  | State | Trigger | Mô tả |
  |-------|---------|--------|
  | default | - | Hiển thị đầy đủ |
- **Fake data**:
  ```json
  {
    "food": {
      "id": 1,
      "name": "Cơm tấm sườn bì chả",
      "price": 45000,
      "rating": 4.8,
      "review_count": 120,
      "description": "Cơm tấm sườn nướng thơm, bì, chả trứng, kèm đồ chua và nước mắm pha.",
      "image": "com_tam_detail.png",
      "restaurant": "Cơm Tấm Bà Năm",
      "toppings": [
        {"id": 1, "name": "Thêm sườn", "price": 15000},
        {"id": 2, "name": "Thêm trứng ốp la", "price": 8000},
        {"id": 3, "name": "Thêm chả", "price": 10000}
      ]
    }
  }
  ```

#### S-0302: Cart
- **Type**: Screen
- **Source**: SRS Section 3.4 — Order
- **Access roles**: Customer
- **Description**: Giỏ hàng, review đơn trước khi thanh toán
- **Components**:
  | Component | Type | Behavior | Notes |
  |-----------|------|----------|-------|
  | Back button | button | tap → pop | Top left |
  | Cart items list | list | display | Card: image, name, toppings, qty, price |
  | Quantity editor | stepper per item | tap +/- | Inline trong mỗi item |
  | Delete item | swipe left / icon | tap → open P-0301 | Swipe to reveal delete |
  | Promo code input | input + apply button | tap apply → validate | Optional |
  | Order summary | display group | display | Subtotal, delivery fee, discount, total |
  | Checkout button | button | tap → navigate to S-0303 | "Đặt hàng — 95.000đ" |
- **States**:
  | State | Trigger | Mô tả |
  |-------|---------|--------|
  | default | - | Có items trong giỏ |
  | empty | Xóa hết items | Illustration + "Giỏ hàng trống" + "Đặt món ngay" button |
- **Fake data**:
  ```json
  {
    "cart_items": [
      {"id": 1, "name": "Cơm tấm sườn bì chả", "toppings": ["Thêm trứng ốp la"], "quantity": 1, "unit_price": 53000, "total": 53000},
      {"id": 2, "name": "Phở bò tái nạm", "toppings": [], "quantity": 1, "unit_price": 55000, "total": 55000}
    ],
    "subtotal": 108000,
    "delivery_fee": 15000,
    "discount": 0,
    "total": 123000,
    "promo_applied": null
  }
  ```

#### S-0303: Order Success
- **Type**: Screen
- **Source**: SRS Section 3.4 — Order
- **Access roles**: Customer
- **Description**: Xác nhận đặt hàng thành công
- **Components**:
  | Component | Type | Behavior | Notes |
  |-----------|------|----------|-------|
  | Success illustration | image | display | Checkmark animation |
  | Title | text | display | "Đặt hàng thành công!" |
  | Order ID | text | display | "#FO-20260520-001" |
  | Estimated time | text | display | "Dự kiến giao trong 30 phút" |
  | Back to home button | button | tap → navigate to S-0201 | Replace stack |
- **States**:
  | State | Trigger | Mô tả |
  |-------|---------|--------|
  | default | - | Hiện thông tin đơn hàng thành công |
- **Fake data**:
  ```json
  {
    "order_id": "FO-20260520-001",
    "estimated_delivery": "30 phút",
    "total": 123000
  }
  ```

#### P-0301: Delete Cart Item Confirmation
- **Type**: Popup / Dialog
- **Triggered from**: S-0302 → Swipe delete item
- **Description**: Xác nhận xóa món khỏi giỏ hàng
- **Actions**:
  | Button | Label | Result |
  |--------|-------|--------|
  | Primary | Xóa | Xóa item, đóng dialog, update cart |
  | Secondary | Hủy | Đóng dialog |

#### T-0301: Added to Cart Toast
- **Type**: Toast
- **Triggered from**: S-0301 → Tap "Thêm vào giỏ"
- **Message**: "Đã thêm vào giỏ hàng"
- **Duration**: short (2s)
- **Style**: success

---

### Module 04: Account [inferred]

#### S-0401: Account / Profile
- **Type**: Screen
- **Source**: [inferred] — SRS đề cập user có thông tin cá nhân
- **Access roles**: Customer
- **Description**: Trang thông tin tài khoản
- **Components**:
  | Component | Type | Behavior | Notes |
  |-----------|------|----------|-------|
  | Avatar | image | display | Circle, top center |
  | User name | text | display | - |
  | Phone | text | display | - |
  | Menu list | list | tap → navigate | Đơn hàng, Địa chỉ, Cài đặt, Đăng xuất |
  | Logout item | list item | tap → open P-0401 | Cuối list, màu đỏ |
  | Bottom tab bar | tab bar | tap → switch tab | Home, Orders, Account (active) |
- **States**:
  | State | Trigger | Mô tả |
  |-------|---------|--------|
  | default | - | Hiện thông tin user |
- **Fake data**:
  ```json
  {
    "user": {
      "name": "Nguyễn Minh Anh",
      "phone": "0901234567",
      "avatar": "avatar_default.png",
      "email": "minhanh@email.com"
    }
  }
  ```

#### P-0401: Logout Confirmation [inferred]
- **Type**: Popup / Dialog
- **Triggered from**: S-0401 → Tap "Đăng xuất"
- **Description**: Xác nhận đăng xuất
- **Actions**:
  | Button | Label | Result |
  |--------|-------|--------|
  | Primary | Đăng xuất | Clear session, navigate to S-0101 (replace stack) |
  | Secondary | Hủy | Đóng dialog |

#### T-0401: Logout Success Toast [inferred]
- **Type**: Toast
- **Triggered from**: P-0401 → Tap "Đăng xuất"
- **Message**: "Đã đăng xuất"
- **Duration**: short (2s)
- **Style**: info

---

## Navigation Flow

### Global Navigation
- **Type**: Bottom Tab Bar
- **Items**:
  | Tab | Label | Icon hint | Target Screen |
  |-----|-------|-----------|---------------|
  | 1 | Trang chủ | home | S-0201 |
  | 2 | Đơn hàng | receipt | (future) |
  | 3 | Tài khoản | person | S-0401 |

### Flow Map

| From | Trigger | To | Condition | Back behavior |
|------|---------|-----|-----------|---------------|
| S-0101 | Tap Login | S-0201 | Credentials valid | Replace stack |
| S-0101 | Tap Login | S-0101 | Credentials invalid | Stay, show error |
| S-0101 | Tap Register link | S-0102 | - | Pop |
| S-0102 | Tap Register | S-0201 | Form valid | Replace stack |
| S-0201 | Tap search bar | S-0203 | - | Pop |
| S-0201 | Tap category | S-0202 | - | Pop |
| S-0201 | Tap food card | S-0301 | - | Pop |
| S-0202 | Tap filter button | M-0201 | - | Dismiss |
| S-0202 | Tap food card | S-0301 | - | Pop |
| S-0203 | Tap search result | S-0301 | - | Pop |
| S-0301 | Tap Add to cart | T-0301 | - | Stay |
| S-0301 | Tap Cart icon | S-0302 | - | Pop |
| S-0302 | Swipe delete item | P-0301 | - | Dismiss |
| S-0302 | Tap Checkout | S-0303 | Cart not empty | Pop |
| S-0303 | Tap Back to home | S-0201 | - | Replace stack |
| S-0401 | Tap Đăng xuất | P-0401 | - | Dismiss |
| P-0401 | Confirm logout | S-0101 | - | Replace stack |

### Conditional Flows

| Condition | Flow |
|-----------|------|
| Guest (chưa login) | S-0101 (Login) |
| Logged in | S-0201 (Home) |

---

## Fake Data Summary

| Entity | Fields | Sample count | Used in screens |
|--------|--------|-------------|-----------------|
| User | id, name, phone, email, avatar | 1 | S-0101, S-0102, S-0401 |
| Food Item | id, name, price, rating, image, restaurant, description, toppings | 7 | S-0201, S-0202, S-0203, S-0301 |
| Category | id, name, icon | 5 | S-0201 |
| Banner | id, image, title | 3 | S-0201 |
| Cart Item | id, name, toppings, quantity, unit_price, total | 2 | S-0302 |
| Order | order_id, estimated_delivery, total | 1 | S-0303 |

---

## Unresolved Items

| # | Screen | Vấn đề | Ảnh hưởng |
|---|--------|--------|-----------|
| 1 | S-0302 | SRS không nêu rõ phương thức thanh toán (COD? Online?) | Chưa có screen chọn payment method |
| 2 | S-0201 | SRS không nêu có delivery address không | Chưa có screen chọn/thêm địa chỉ |

---

## Inferred Items

| # | Item | Lý do suy luận |
|---|------|----------------|
| 1 | S-0401 (Account) | SRS có user info nhưng không mô tả màn Account. Bottom tab cần tab Account |
| 2 | P-0301 (Delete cart item) | Best practice: confirm trước khi xóa |
| 3 | P-0401 (Logout confirm) | Best practice: confirm trước khi logout |
| 4 | T-0301, T-0401 (Toasts) | Feedback cho user sau action |