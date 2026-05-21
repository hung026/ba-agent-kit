# Architecture Reference

Kiến trúc code cho prototype artifact. Đọc file này ở Step 4.

---

## File Structure (trong 1 file .jsx)

Thứ tự các section trong file, từ trên xuống:

```
1. FAKE DATA          — Constants, mock data
2. UTILS              — Helper functions
3. UI PRIMITIVES      — Button, Input, Badge, Avatar,...
4. LAYOUT COMPONENTS  — Toast system, Modal system, TabBar, Header
5. SCREEN COMPONENTS  — Từng màn hình
6. NAVIGATION ENGINE  — Router logic
7. APP SHELL          — Phone frame (mobile) hoặc page wrapper (web)
8. DEFAULT EXPORT     — export default App
```

---

## 1. Fake Data Layer

Tất cả mock data khai báo ở đầu file dưới dạng constants.

```jsx
// ═══════════════════════════════════════
// FAKE DATA
// ═══════════════════════════════════════

const USERS = {
  current: {
    id: 1,
    name: "Nguyễn Minh Anh",
    phone: "0901234567",
    email: "minhanh@email.com"
  }
};

const FOOD_ITEMS = [
  { id: 1, name: "Cơm tấm sườn bì chả", price: 45000, rating: 4.8, ... },
  { id: 2, name: "Phở bò tái nạm", price: 55000, rating: 4.6, ... },
];

// Copy chính xác từ screen spec JSON blocks
// Merge các fake data cùng entity thành 1 constant
```

**Quy tắc:**
- Merge tất cả fake data cùng entity (ví dụ: food items xuất hiện ở nhiều screens → 1 array FOOD_ITEMS)
- Giữ nguyên giá trị từ spec, không tự bịa thêm
- Dùng UPPER_SNAKE_CASE cho constants
- Nếu spec có nhiều variants (search results, filtered results) → tạo helper function filter thay vì duplicate data

---

## 2. Navigation Engine

Tự build navigation bằng React state. KHÔNG dùng React Router.

```jsx
// ═══════════════════════════════════════
// NAVIGATION
// ═══════════════════════════════════════

const useNavigation = () => {
  const [stack, setStack] = useState([{ screen: "S-0101", params: {} }]);
  const [modals, setModals] = useState([]);    // modal/bottom sheet stack
  const [toast, setToast] = useState(null);     // current toast

  const push = (screen, params = {}) => {
    setStack(prev => [...prev, { screen, params }]);
  };

  const pop = () => {
    setStack(prev => prev.length > 1 ? prev.slice(0, -1) : prev);
  };

  const replace = (screen, params = {}) => {
    setStack([{ screen, params }]);
  };

  const openModal = (modalId, params = {}) => {
    setModals(prev => [...prev, { id: modalId, params }]);
  };

  const closeModal = () => {
    setModals(prev => prev.slice(0, -1));
  };

  const showToast = (message, style = "success", duration = 2000) => {
    setToast({ message, style });
    setTimeout(() => setToast(null), duration);
  };

  const currentScreen = stack[stack.length - 1];
  const currentModal = modals[modals.length - 1];

  return {
    currentScreen, currentModal, toast,
    push, pop, replace,
    openModal, closeModal, showToast
  };
};
```

**Screen Router:**

```jsx
const ScreenRouter = ({ nav }) => {
  const { screen, params } = nav.currentScreen;

  const screens = {
    "S-0101": <LoginScreen nav={nav} />,
    "S-0102": <RegisterScreen nav={nav} />,
    "S-0201": <HomeScreen nav={nav} />,
    // ... tất cả screens
  };

  return screens[screen] || <div>Screen not found: {screen}</div>;
};
```

**Modal Router:**

```jsx
const ModalRouter = ({ nav }) => {
  if (!nav.currentModal) return null;
  const { id, params } = nav.currentModal;

  const modals = {
    "M-0201": <FilterModal nav={nav} params={params} />,
    "P-0301": <DeleteConfirmPopup nav={nav} params={params} />,
    // ... tất cả modals + popups
  };

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={() => nav.closeModal()}
      />
      {/* Modal content */}
      <div className="relative z-10">
        {modals[id]}
      </div>
    </div>
  );
};
```

---

## 3. App-Level State

Ngoài navigation, prototype cần state cho:
- **Cart / selections**: Items user đã chọn
- **Form data**: Data user đã nhập (để hiển thị ở screen khác)
- **Flags**: isLoggedIn, hasCompletedOnboarding,...

Dùng 1 useReducer ở App level:

```jsx
const initialAppState = {
  isLoggedIn: false,
  cart: [],
  // ... theo business logic từ spec
};

function appReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return { ...state, isLoggedIn: true };
    case "ADD_TO_CART":
      return { ...state, cart: [...state.cart, action.payload] };
    case "REMOVE_FROM_CART":
      return { ...state, cart: state.cart.filter(i => i.id !== action.payload) };
    // ...
    default:
      return state;
  }
}
```

Truyền `state` và `dispatch` xuống tất cả screens qua props (không dùng Context — giữ đơn giản).

---

## 4. Screen Component Pattern

Mỗi screen là 1 functional component:

```jsx
const HomeScreen = ({ nav, state, dispatch }) => {
  // Local state cho screen-specific interactions
  const [searchText, setSearchText] = useState("");

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="px-4 pt-4 pb-2">
        <h1 className="text-xl font-bold">Trang chủ</h1>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto">
        {/* Screen content here */}
      </div>

      {/* Fixed bottom (tab bar, CTA button,...) */}
      <TabBar nav={nav} active="home" />
    </div>
  );
};
```

**Layout rule cho mobile:**
- Mỗi screen là `flex flex-col h-full`
- Content area là `flex-1 overflow-y-auto` (scrollable)
- Header và bottom bar là fixed
- Padding: `px-4` horizontal, `py-2` hoặc `py-4` vertical

---

## 5. Conditional Flows

Implement conditional navigation theo spec:

```jsx
// Trong App component
const handleAppStart = () => {
  if (state.isLoggedIn) {
    nav.replace("S-0201"); // Home
  } else {
    nav.replace("S-0101"); // Login
  }
};

// Trong LoginScreen
const handleLogin = () => {
  dispatch({ type: "LOGIN" });
  nav.replace("S-0201"); // Replace stack — không cho back về login
};
```

---

## 6. Handling Screen States

Implement tất cả states từ spec:

```jsx
const ListScreen = ({ nav, state }) => {
  const [isLoading, setIsLoading] = useState(true);
  const items = FOOD_ITEMS; // fake data

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <SkeletonList count={3} />;
  }

  if (items.length === 0) {
    return <EmptyState message="Chưa có món ăn nào" />;
  }

  return (
    <div>
      {items.map(item => (
        <FoodCard key={item.id} item={item} onTap={() => nav.push("S-0301", { id: item.id })} />
      ))}
    </div>
  );
};
```

**Loading state**: Dùng `setTimeout` 500-1000ms để simulate. Hiện skeleton hoặc spinner.
**Empty state**: Check array length. Hiện illustration (emoji) + message.
**Error state**: Dùng button "Thử lại" để toggle.

---

## 7. Interaction Patterns

### Form submit
```jsx
const [formData, setFormData] = useState({ phone: "", password: "" });
const [error, setError] = useState("");

const handleSubmit = () => {
  // Validate against fake data
  if (formData.phone === USERS.current.phone && formData.password === "demo123") {
    dispatch({ type: "LOGIN" });
    nav.replace("S-0201");
  } else {
    setError("Số điện thoại hoặc mật khẩu không đúng");
  }
};
```

### Add to cart
```jsx
const handleAddToCart = (item, quantity, toppings) => {
  dispatch({
    type: "ADD_TO_CART",
    payload: { ...item, quantity, selectedToppings: toppings, cartId: Date.now() }
  });
  nav.showToast("Đã thêm vào giỏ hàng", "success");
};
```

### Delete with confirmation
```jsx
// Trigger popup
const handleDeleteTap = (itemId) => {
  nav.openModal("P-0301", { itemId });
};

// In popup component
const handleConfirmDelete = () => {
  dispatch({ type: "REMOVE_FROM_CART", payload: params.itemId });
  nav.closeModal();
  nav.showToast("Đã xóa", "info");
};
```

### Search / Filter
```jsx
const [keyword, setKeyword] = useState("");
const filtered = FOOD_ITEMS.filter(item =>
  item.name.toLowerCase().includes(keyword.toLowerCase())
);
```