# Sample Prototype Snippet

Ví dụ code structure cho FoodOrder app (rút gọn 4 screens).
Đây là pattern mẫu, không phải output hoàn chỉnh.

---

```jsx
import { useState, useReducer, useEffect } from "react";
import { ShoppingCart, ArrowLeft, Search, Home, User, Star, Plus, Minus, X } from "lucide-react";

// ═══════════════════════════════════════
// FAKE DATA
// ═══════════════════════════════════════

const USERS = {
  current: { id: 1, name: "Nguyễn Minh Anh", phone: "0901234567", email: "minhanh@email.com" },
  credentials: { phone: "0901234567", password: "demo123" }
};

const CATEGORIES = [
  { id: 1, name: "Cơm", icon: "🍚" },
  { id: 2, name: "Phở", icon: "🍜" },
  { id: 3, name: "Trà sữa", icon: "🧋" },
  { id: 4, name: "Bánh mì", icon: "🥖" },
  { id: 5, name: "Pizza", icon: "🍕" },
];

const FOOD_ITEMS = [
  { id: 1, name: "Cơm tấm sườn bì chả", price: 45000, rating: 4.8, reviewCount: 120, image: "🍱", restaurant: "Cơm Tấm Bà Năm", deliveryTime: "25 phút", category: 1, description: "Cơm tấm sườn nướng thơm, bì, chả trứng.", toppings: [{ id: 1, name: "Thêm sườn", price: 15000 }, { id: 2, name: "Thêm trứng ốp la", price: 8000 }] },
  { id: 2, name: "Phở bò tái nạm", price: 55000, rating: 4.6, reviewCount: 89, image: "🍜", restaurant: "Phở Hòa", deliveryTime: "30 phút", category: 2, description: "Phở bò tái nạm truyền thống.", toppings: [{ id: 3, name: "Thêm tái", price: 20000 }] },
  { id: 3, name: "Trà sữa trân châu", price: 35000, rating: 4.5, reviewCount: 200, image: "🧋", restaurant: "Tiger Sugar", deliveryTime: "15 phút", category: 3, description: "Trà sữa đường đen trân châu.", toppings: [{ id: 4, name: "Thêm trân châu", price: 5000 }] },
  { id: 4, name: "Bánh mì thịt nướng", price: 25000, rating: 4.7, reviewCount: 150, image: "🥖", restaurant: "Bánh Mì Huỳnh Hoa", deliveryTime: "20 phút", category: 4, description: "Bánh mì thịt nướng giòn rụm.", toppings: [] },
];

const BANNERS = [
  { id: 1, title: "Giảm 50% đơn đầu tiên", color: "from-orange-400 to-red-500" },
  { id: 2, title: "Món mới mỗi tuần", color: "from-blue-400 to-purple-500" },
  { id: 3, title: "Freeship đơn từ 50K", color: "from-emerald-400 to-teal-500" },
];

const formatPrice = (p) => new Intl.NumberFormat("vi-VN").format(p) + "đ";

// ═══════════════════════════════════════
// APP STATE
// ═══════════════════════════════════════

const initialState = { isLoggedIn: false, cart: [] };

function reducer(state, action) {
  switch (action.type) {
    case "LOGIN": return { ...state, isLoggedIn: true };
    case "LOGOUT": return { ...state, isLoggedIn: false, cart: [] };
    case "ADD_TO_CART": return { ...state, cart: [...state.cart, { ...action.payload, cartId: Date.now() }] };
    case "REMOVE_FROM_CART": return { ...state, cart: state.cart.filter(i => i.cartId !== action.payload) };
    case "CLEAR_CART": return { ...state, cart: [] };
    default: return state;
  }
}

// ═══════════════════════════════════════
// NAVIGATION
// ═══════════════════════════════════════

const useNavigation = (initialScreen = "S-0101") => {
  const [stack, setStack] = useState([{ screen: initialScreen, params: {} }]);
  const [modal, setModal] = useState(null);
  const [toast, setToast] = useState(null);

  return {
    current: stack[stack.length - 1],
    modal,
    toast,
    push: (screen, params = {}) => setStack(prev => [...prev, { screen, params }]),
    pop: () => setStack(prev => prev.length > 1 ? prev.slice(0, -1) : prev),
    replace: (screen, params = {}) => setStack([{ screen, params }]),
    openModal: (id, params = {}) => setModal({ id, params }),
    closeModal: () => setModal(null),
    showToast: (message, style = "success") => {
      setToast({ message, style });
      setTimeout(() => setToast(null), 2000);
    },
  };
};

// ═══════════════════════════════════════
// UI PRIMITIVES
// ═══════════════════════════════════════

const Button = ({ children, onClick, variant = "primary", disabled, loading, full = true }) => {
  const v = { primary: "bg-orange-500 text-white", secondary: "bg-gray-100 text-gray-700", danger: "bg-red-500 text-white" };
  return (
    <button onClick={onClick} disabled={disabled || loading}
      className={`py-3.5 rounded-2xl font-semibold text-sm transition-all active:scale-[0.97] disabled:opacity-50 ${v[variant]} ${full ? "w-full" : "px-6"}`}>
      {loading ? "⏳ Đang xử lý..." : children}
    </button>
  );
};

const Input = ({ label, error, ...props }) => (
  <div className="mb-3">
    {label && <label className="block text-sm font-medium text-gray-600 mb-1.5">{label}</label>}
    <input className={`w-full px-4 py-3 rounded-xl border text-sm outline-none ${error ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50 focus:border-orange-400"}`} {...props} />
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

const Header = ({ title, onBack, right }) => (
  <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
    <div className="w-10">{onBack && <button onClick={onBack}><ArrowLeft size={22} /></button>}</div>
    <span className="font-semibold">{title}</span>
    <div className="w-10 flex justify-end">{right}</div>
  </div>
);

const ToastUI = ({ toast }) => {
  if (!toast) return null;
  const colors = { success: "bg-emerald-500", error: "bg-red-500", info: "bg-sky-500" };
  return <div className={`absolute top-2 left-4 right-4 z-[100] ${colors[toast.style]} text-white px-4 py-3 rounded-xl text-center text-sm font-medium shadow-lg animate-bounce`}>{toast.message}</div>;
};

// ═══════════════════════════════════════
// SCREENS
// ═══════════════════════════════════════

// S-0101: Login
const LoginScreen = ({ nav, dispatch }) => {
  const [phone, setPhone] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    setError("");
    setTimeout(() => {
      if (phone === USERS.credentials.phone && pass === USERS.credentials.password) {
        dispatch({ type: "LOGIN" });
        nav.replace("S-0201");
      } else {
        setError("Số điện thoại hoặc mật khẩu không đúng");
      }
      setLoading(false);
    }, 800);
  };

  return (
    <div className="flex flex-col h-full px-6 justify-center">
      <div className="text-center mb-10">
        <span className="text-6xl">🍽️</span>
        <h1 className="text-2xl font-bold mt-3">FoodOrder</h1>
        <p className="text-gray-400 text-sm mt-1">Đặt món ngon, giao tận nơi</p>
      </div>
      <Input label="Số điện thoại" value={phone} onChange={e => setPhone(e.target.value)} placeholder="0901234567" type="tel" />
      <Input label="Mật khẩu" value={pass} onChange={e => setPass(e.target.value)} placeholder="••••••" type="password" error={error} />
      <Button onClick={handleLogin} loading={loading} disabled={!phone || !pass}>Đăng nhập</Button>
      <p className="text-center text-sm text-gray-400 mt-4">
        Chưa có tài khoản? <button onClick={() => nav.push("S-0102")} className="text-orange-500 font-medium">Đăng ký</button>
      </p>
    </div>
  );
};

// S-0201: Home
const HomeScreen = ({ nav, state }) => {
  const [bannerIdx, setBannerIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setBannerIdx(i => (i + 1) % BANNERS.length), 3000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 pt-4 pb-2">
        <p className="text-gray-400 text-sm">Xin chào,</p>
        <p className="font-bold text-lg">{USERS.current.name} 👋</p>
      </div>

      <div className="px-4 mb-3">
        <button onClick={() => nav.push("S-0203")} className="flex items-center gap-2 w-full px-4 py-2.5 bg-gray-100 rounded-xl text-gray-400 text-sm">
          <Search size={16} /> Tìm món ăn...
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Banner */}
        <div className={`mx-4 p-5 rounded-2xl bg-gradient-to-r ${BANNERS[bannerIdx].color} text-white mb-4`}>
          <p className="font-bold text-lg">{BANNERS[bannerIdx].title}</p>
          <p className="text-white/80 text-xs mt-1">Chỉ hôm nay</p>
        </div>

        {/* Categories */}
        <div className="flex gap-4 px-4 mb-5 overflow-x-auto">
          {CATEGORIES.map(c => (
            <button key={c.id} onClick={() => nav.push("S-0202", { categoryId: c.id, title: c.name })} className="flex flex-col items-center min-w-[56px]">
              <span className="text-3xl mb-1">{c.icon}</span>
              <span className="text-xs text-gray-600">{c.name}</span>
            </button>
          ))}
        </div>

        {/* Popular */}
        <div className="px-4 mb-4">
          <h3 className="font-bold mb-3">🔥 Món nổi bật</h3>
          {FOOD_ITEMS.map(item => (
            <button key={item.id} onClick={() => nav.push("S-0301", { foodId: item.id })} className="flex gap-3 w-full text-left mb-3 p-2 rounded-xl active:bg-gray-50">
              <span className="text-4xl">{item.image}</span>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{item.name}</p>
                <p className="text-xs text-gray-400">{item.restaurant}</p>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-orange-500 font-bold text-sm">{formatPrice(item.price)}</span>
                  <span className="flex items-center gap-0.5 text-xs text-gray-400"><Star size={12} fill="#f59e0b" stroke="#f59e0b" /> {item.rating}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Tab bar */}
      <div className="flex border-t border-gray-100 pb-6">
        {[{ icon: <Home size={20} />, label: "Trang chủ", active: true },
          { icon: <ShoppingCart size={20} />, label: "Giỏ hàng", screen: "S-0302", badge: state.cart.length },
          { icon: <User size={20} />, label: "Tài khoản", screen: "S-0401" }
        ].map((tab, i) => (
          <button key={i} onClick={() => tab.screen && nav.push(tab.screen)} className={`flex-1 flex flex-col items-center py-2 text-xs relative ${tab.active ? "text-orange-500" : "text-gray-400"}`}>
            {tab.icon}
            {tab.badge > 0 && <span className="absolute top-1 right-1/4 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center">{tab.badge}</span>}
            <span className="mt-0.5">{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

// S-0301: Food Detail
const FoodDetailScreen = ({ nav, state, dispatch }) => {
  const food = FOOD_ITEMS.find(f => f.id === nav.current.params.foodId) || FOOD_ITEMS[0];
  const [qty, setQty] = useState(1);
  const [selectedToppings, setSelectedToppings] = useState([]);

  const toggleTopping = (t) => {
    setSelectedToppings(prev => prev.find(x => x.id === t.id) ? prev.filter(x => x.id !== t.id) : [...prev, t]);
  };

  const total = (food.price + selectedToppings.reduce((s, t) => s + t.price, 0)) * qty;

  const handleAdd = () => {
    dispatch({ type: "ADD_TO_CART", payload: { ...food, quantity: qty, selectedToppings, total } });
    nav.showToast("Đã thêm vào giỏ hàng", "success");
    nav.pop();
  };

  return (
    <div className="flex flex-col h-full">
      <div className="relative bg-orange-50 h-48 flex items-center justify-center">
        <span className="text-8xl">{food.image}</span>
        <button onClick={() => nav.pop()} className="absolute top-3 left-3 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow"><ArrowLeft size={18} /></button>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        <h2 className="text-xl font-bold">{food.name}</h2>
        <p className="text-gray-400 text-sm mt-1">{food.restaurant} · {food.deliveryTime}</p>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-orange-500 font-bold text-lg">{formatPrice(food.price)}</span>
          <span className="flex items-center gap-0.5 text-sm text-gray-400"><Star size={14} fill="#f59e0b" stroke="#f59e0b" /> {food.rating} ({food.reviewCount})</span>
        </div>
        <p className="text-gray-500 text-sm mt-3">{food.description}</p>

        {food.toppings.length > 0 && (
          <div className="mt-5">
            <h4 className="font-semibold mb-2">Thêm topping</h4>
            {food.toppings.map(t => (
              <button key={t.id} onClick={() => toggleTopping(t)} className={`flex items-center justify-between w-full p-3 mb-2 rounded-xl border ${selectedToppings.find(x => x.id === t.id) ? "border-orange-400 bg-orange-50" : "border-gray-100"}`}>
                <span className="text-sm">{t.name}</span>
                <span className="text-sm text-orange-500">+{formatPrice(t.price)}</span>
              </button>
            ))}
          </div>
        )}

        <div className="flex items-center justify-center gap-5 mt-5">
          <button onClick={() => setQty(q => Math.max(1, q - 1))} className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center"><Minus size={18} /></button>
          <span className="text-xl font-bold w-8 text-center">{qty}</span>
          <button onClick={() => setQty(q => q + 1)} className="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center"><Plus size={18} /></button>
        </div>
      </div>

      <div className="p-4 pb-8 border-t border-gray-100">
        <Button onClick={handleAdd}>Thêm vào giỏ — {formatPrice(total)}</Button>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════
// PHONE FRAME + APP
// ═══════════════════════════════════════

const PhoneFrame = ({ children }) => (
  <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
    <div className="relative w-[375px] h-[812px] bg-black rounded-[3rem] shadow-2xl border-[6px] border-gray-800 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[160px] h-[34px] bg-black rounded-b-3xl z-50" />
      <div className="relative z-40 flex justify-between items-center px-8 pt-3 pb-1 bg-white text-xs font-semibold">
        <span>9:41</span>
        <span>●●● ᯤ 🔋</span>
      </div>
      <div className="h-[calc(100%-34px)] overflow-hidden bg-white relative">{children}</div>
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[134px] h-[5px] bg-white/20 rounded-full z-50" />
    </div>
  </div>
);

export default function App() {
  const nav = useNavigation("S-0101");
  const [state, dispatch] = useReducer(reducer, initialState);

  const screens = {
    "S-0101": <LoginScreen nav={nav} dispatch={dispatch} />,
    "S-0201": <HomeScreen nav={nav} state={state} />,
    "S-0301": <FoodDetailScreen nav={nav} state={state} dispatch={dispatch} />,
    // ... thêm các screens khác
  };

  return (
    <PhoneFrame>
      <div className="h-full relative">
        {screens[nav.current.screen] || <div className="p-8 text-center text-gray-400">Screen chưa implement</div>}
        <ToastUI toast={nav.toast} />
      </div>
    </PhoneFrame>
  );
}
```