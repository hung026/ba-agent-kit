---
name: prototype-generator
description: >
  Sinh prototype React chạy được từ bản đặc tả màn hình (screen spec) — output của skill spec-analyzer.
  Prototype chạy trực tiếp trong Claude artifact, giả lập mobile app hoặc web portal, có đầy đủ navigation,
  fake data, modal/toast/popup, và tương tác UI.
  Sử dụng skill này khi user muốn tạo prototype, tạo demo app, code prototype từ spec, sinh giao diện demo,
  build interactive mockup, hoặc bất kỳ yêu cầu nào biến bản đặc tả màn hình thành ứng dụng chạy được.
  Trigger khi user nói "tạo prototype", "code prototype", "build demo", "generate app from spec",
  "sinh giao diện", hoặc upload/paste file screen spec (có chứa Screen Inventory, Navigation Flow, Fake Data).
---

# PROTOTYPE GENERATOR

## Purpose

Biến bản đặc tả màn hình (screen spec markdown) thành React artifact chạy được.
Output là prototype interactive dùng cho demo, không cần database hay API thật.

**Skill này LÀM:**
- Đọc screen spec (output của spec-analyzer) và sinh React code
- Tạo đầy đủ screens, modals, popups, toasts theo spec
- Implement navigation flow giữa các màn hình
- Hardcode fake data từ spec vào source
- Giả lập tương tác: form submit, add to cart, delete confirm, search filter,...
- Wrap trong mobile phone frame (cho mobile app) hoặc responsive layout (cho web)

**Skill này KHÔNG:**
- Phân tích SRS (→ dùng spec-analyzer)
- Kết nối API thật hoặc database
- Tạo production-ready code
- Xử lý authentication thật

---

## Input

### Bắt buộc
- **Screen spec markdown**: File `.md` hoặc pasted text có format từ spec-analyzer (chứa Screen Inventory, Navigation Flow, Fake Data)

### Tùy chọn
- **Design system**: Nếu user có file design system trong `design-system/` folder → đọc và áp dụng
- **Chỉ định modules**: User có thể chọn chỉ build 1 vài modules thay vì toàn bộ

---

## Pipeline

```
Step 1: Đọc & Parse screen spec
    │
    ▼
Step 2: Lên kế hoạch build (split strategy)
    │
    ▼
Step 3: Trình bày kế hoạch → User confirm
    │
    ▼
Step 4: Generate React artifact(s)
    │
    ▼
Step 5: Review & iterate
```

---

## Step 1: Đọc & Parse screen spec

1. Đọc toàn bộ screen spec
2. Extract:
   - Metadata (platform, total screens, user roles)
   - Screen inventory (tất cả screens + components + states)
   - Navigation flow (flow map + global navigation + conditional flows)
   - Fake data (tất cả JSON data blocks)
   - Unresolved items (ghi nhận, có thể hỏi user)

Nếu input không đúng format spec-analyzer → thông báo user và gợi ý chạy spec-analyzer trước.

---

## Step 2: Lên kế hoạch build (Split Strategy)

Đọc `references/architecture.md` để nắm kiến trúc code.

Quy tắc split:

| Tổng screens | Strategy |
|-------------|----------|
| ≤ 10 | 1 artifact duy nhất — all-in-one |
| 11-20 | Chia theo module — mỗi artifact 1-2 modules liên quan. Artifact đầu tiên luôn là core (auth + home + navigation shell) |
| > 20 | Chia theo module, mỗi artifact tối đa 8-10 screens. Hỏi user muốn build modules nào trước |

Mỗi artifact phải chạy độc lập. Nếu chia nhiều artifact:
- Artifact core chứa: navigation shell, shared components, auth screens, home
- Các artifact sau chứa: feature modules, link về home khi cần

---

## Step 3: Trình bày kế hoạch → User confirm

Trình bày cho user:
- Sẽ tạo bao nhiêu artifact
- Mỗi artifact chứa screens nào
- Screens nào bỏ qua / để sau (nếu có)
- Estimated complexity

Hỏi confirm trước khi generate.

---

## Step 4: Generate React artifact

Đọc `references/architecture.md` cho code structure.
Đọc `references/component-patterns.md` cho reusable patterns.

### Quy tắc generate

**Platform check:**
- Nếu Metadata.Platform = "Mobile App" → wrap trong mobile phone frame, xem `references/mobile-frame.md`
- Nếu Metadata.Platform = "Web Portal" hoặc "Landing Page" → dùng responsive layout, không cần phone frame

**Design system check:**
- Kiểm tra `design-system/` folder có file không
- Nếu có → đọc và áp dụng colors, typography, spacing, component styles
- Nếu không → dùng clean default style (neutral colors, system font stack, 8px spacing grid)

**Code generation order:**
1. Fake data constants (top of file)
2. Utility functions (formatPrice, formatDate,...)  
3. Shared UI components (Button, Input, Card, Toast, Modal,...)
4. Screen components (theo thứ tự module)
5. Navigation system (router + stack management)
6. App shell (phone frame + status bar nếu mobile)
7. Main export

**Mỗi screen component phải:**
- Render đúng components từ spec
- Handle tất cả states từ spec (default, loading, empty, error)
- Implement interactions (tap → navigate, form submit, toggle,...)
- Dùng fake data đúng từ spec

**Navigation phải:**
- Implement đúng flow map từ spec
- Support: push (new screen), pop (back), replace (replace stack)
- Global navigation (tab bar / drawer) nếu có
- Modal/popup overlay system
- Toast notification system

---

## Step 5: Review & Iterate

Sau khi generate:
- Cho user thấy artifact chạy
- Hỏi user review: thiếu gì, sai gì, muốn thêm gì
- Iterate: sửa trực tiếp hoặc regenerate

---

## Quy tắc code quan trọng

1. **Single file**: Mỗi artifact = 1 file `.jsx`, tất cả trong đó (styles, components, data, logic)
2. **Inline styles hoặc Tailwind**: Dùng Tailwind utility classes. Fallback sang inline styles nếu cần custom
3. **State management**: Dùng React useState/useReducer. Không dùng external state library
4. **Không dùng localStorage/sessionStorage**: Artifact trong Claude không support. Dùng React state
5. **Không dùng React Router**: Tự build simple navigation bằng state. Xem `references/architecture.md`
6. **Không import external images**: Dùng emoji, SVG inline, hoặc Lucide icons thay thế
7. **Fake data phải match spec**: Copy chính xác JSON từ screen spec, không tự bịa thêm
8. **Vietnamese UI**: Tất cả text hiển thị bằng tiếng Việt (trừ khi spec ghi khác)

---

## Output

File `.jsx` lưu tại `/mnt/user-data/outputs/`:
- Nếu 1 artifact: `[tên-project]-prototype.jsx`
- Nếu nhiều artifact: `[tên-project]-prototype-core.jsx`, `[tên-project]-prototype-[module].jsx`

---

## Lưu ý

1. **Prototype, không phải production**: Code không cần clean, không cần tách file, không cần optimize. Mục tiêu duy nhất là DEMO ĐƯỢC
2. **Mọi tương tác phải work**: Tap button phải có phản hồi. Form submit phải show kết quả. Delete phải thấy item biến mất. Đây là điểm khác biệt giữa prototype và static mockup
3. **Fake data phải realistic**: User demo cho stakeholder, data phải trông thật
4. **Mobile frame quan trọng**: Stakeholder thấy app trong phone frame → tin tưởng hơn. Xem `references/mobile-frame.md`