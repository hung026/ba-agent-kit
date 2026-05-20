# Component Patterns

Các UI component tái sử dụng. Đọc file này ở Step 4.

Đây là patterns mẫu. Khi generate, điều chỉnh styles theo design system nếu có.

---

## Toast System

```jsx
const Toast = ({ toast }) => {
  if (!toast) return null;

  const styles = {
    success: "bg-emerald-500",
    error: "bg-red-500",
    warning: "bg-amber-500",
    info: "bg-sky-500"
  };

  return (
    <div className="fixed top-12 left-4 right-4 z-[100] animate-slide-down">
      <div className={`${styles[toast.style] || styles.info} text-white px-4 py-3 rounded-xl shadow-lg text-center text-sm font-medium`}>
        {toast.message}
      </div>
    </div>
  );
};
```

Cần thêm keyframes trong style tag hoặc inline:
```jsx
<style>{`
  @keyframes slideDown {
    from { transform: translateY(-100%); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  .animate-slide-down { animation: slideDown 0.3s ease-out; }
`}</style>
```

---

## Modal / Bottom Sheet

```jsx
const BottomSheet = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl max-h-[80vh] overflow-y-auto animate-slide-up">
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 bg-gray-300 rounded-full" />
        </div>
        {title && (
          <div className="px-4 py-2 border-b border-gray-100">
            <h3 className="text-lg font-semibold">{title}</h3>
          </div>
        )}
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};
```

---

## Popup / Dialog

```jsx
const Dialog = ({ isOpen, onClose, title, message, actions }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded-2xl w-full max-w-sm shadow-xl p-6">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        {message && <p className="text-gray-500 text-sm mb-6">{message}</p>}
        <div className="flex gap-3">
          {actions.map((action, i) => (
            <button
              key={i}
              onClick={action.onPress}
              className={`flex-1 py-3 rounded-xl font-medium text-sm ${
                action.primary
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {action.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
```

---

## Header / AppBar

```jsx
const Header = ({ title, onBack, rightAction }) => (
  <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-100">
    <div className="w-10">
      {onBack && (
        <button onClick={onBack} className="p-1 -ml-1">
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
      )}
    </div>
    <h2 className="text-base font-semibold">{title}</h2>
    <div className="w-10 flex justify-end">{rightAction}</div>
  </div>
);
```

---

## Bottom Tab Bar

```jsx
const TabBar = ({ nav, active }) => {
  // Tabs config lấy từ spec Navigation Flow → Global Navigation
  const tabs = [
    { key: "home", label: "Trang chủ", screen: "S-0201", icon: "🏠" },
    { key: "orders", label: "Đơn hàng", screen: "S-0401", icon: "📋" },
    { key: "account", label: "Tài khoản", screen: "S-0501", icon: "👤" },
  ];

  return (
    <div className="flex border-t border-gray-100 bg-white pb-safe">
      {tabs.map(tab => (
        <button
          key={tab.key}
          onClick={() => nav.replace(tab.screen)}
          className={`flex-1 flex flex-col items-center py-2 text-xs
            ${active === tab.key ? "text-blue-500" : "text-gray-400"}`}
        >
          <span className="text-xl mb-0.5">{tab.icon}</span>
          {tab.label}
        </button>
      ))}
    </div>
  );
};
```

**Lưu ý**: Thay emoji bằng Lucide icons nếu muốn polished hơn:
```jsx
import { Home, ClipboardList, User } from "lucide-react";
```

---

## Form Input

```jsx
const FormInput = ({ label, value, onChange, type = "text", placeholder, error, ...props }) => (
  <div className="mb-4">
    {label && <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>}
    <input
      type={type}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-colors
        ${error ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50 focus:border-blue-400 focus:bg-white"}`}
      {...props}
    />
    {error && <p className="text-red-500 text-xs mt-1.5">{error}</p>}
  </div>
);
```

---

## Button

```jsx
const Button = ({ children, onClick, variant = "primary", disabled, loading, fullWidth = true }) => {
  const base = "py-3.5 px-6 rounded-xl font-medium text-sm transition-all";
  const variants = {
    primary: "bg-blue-500 text-white active:bg-blue-600 disabled:bg-blue-300",
    secondary: "bg-gray-100 text-gray-700 active:bg-gray-200",
    danger: "bg-red-500 text-white active:bg-red-600",
    ghost: "text-blue-500 active:bg-blue-50",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`${base} ${variants[variant]} ${fullWidth ? "w-full" : ""}`}
    >
      {loading ? (
        <span className="inline-flex items-center gap-2">
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          Đang xử lý...
        </span>
      ) : children}
    </button>
  );
};
```

---

## Card

```jsx
const Card = ({ children, onClick, className = "" }) => (
  <div
    onClick={onClick}
    className={`bg-white rounded-2xl p-3 shadow-sm border border-gray-50
      ${onClick ? "active:scale-[0.98] transition-transform cursor-pointer" : ""}
      ${className}`}
  >
    {children}
  </div>
);
```

---

## Skeleton Loading

```jsx
const Skeleton = ({ className = "" }) => (
  <div className={`bg-gray-200 rounded-lg animate-pulse ${className}`} />
);

const SkeletonCard = () => (
  <div className="flex gap-3 p-3">
    <Skeleton className="w-20 h-20 rounded-xl" />
    <div className="flex-1 space-y-2 py-1">
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-3 w-1/2" />
      <Skeleton className="h-3 w-1/4" />
    </div>
  </div>
);

const SkeletonList = ({ count = 3 }) => (
  <div className="space-y-2 p-4">
    {Array.from({ length: count }).map((_, i) => <SkeletonCard key={i} />)}
  </div>
);
```

---

## Empty State

```jsx
const EmptyState = ({ icon = "📭", message, actionLabel, onAction }) => (
  <div className="flex flex-col items-center justify-center py-16 px-6">
    <span className="text-5xl mb-4">{icon}</span>
    <p className="text-gray-400 text-sm mb-4">{message}</p>
    {actionLabel && (
      <Button variant="secondary" fullWidth={false} onClick={onAction}>
        {actionLabel}
      </Button>
    )}
  </div>
);
```

---

## Search Bar

```jsx
const SearchBar = ({ value, onChange, placeholder = "Tìm kiếm...", onFocus, autoFocus }) => (
  <div className="relative">
    <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="8" cy="8" r="6" /><path d="M16 16l-3.5-3.5" />
    </svg>
    <input
      type="text"
      value={value}
      onChange={e => onChange(e.target.value)}
      onFocus={onFocus}
      autoFocus={autoFocus}
      placeholder={placeholder}
      className="w-full pl-10 pr-4 py-2.5 bg-gray-100 rounded-xl text-sm outline-none focus:bg-white focus:ring-2 focus:ring-blue-100"
    />
    {value && (
      <button onClick={() => onChange("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">✕</button>
    )}
  </div>
);
```

---

## Badge / Chip

```jsx
const Badge = ({ children, active, onClick }) => (
  <button
    onClick={onClick}
    className={`px-4 py-1.5 rounded-full text-xs font-medium transition-colors
      ${active ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-600"}`}
  >
    {children}
  </button>
);
```

---

## Quantity Stepper

```jsx
const Stepper = ({ value, onChange, min = 1, max = 99 }) => (
  <div className="flex items-center gap-3">
    <button
      onClick={() => onChange(Math.max(min, value - 1))}
      disabled={value <= min}
      className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-lg font-medium disabled:opacity-30"
    >
      −
    </button>
    <span className="w-8 text-center font-semibold">{value}</span>
    <button
      onClick={() => onChange(Math.min(max, value + 1))}
      disabled={value >= max}
      className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-lg font-medium disabled:opacity-30"
    >
      +
    </button>
  </div>
);
```

---

## Price Formatter

```jsx
const formatPrice = (price) => {
  return new Intl.NumberFormat("vi-VN").format(price) + "đ";
};

// Usage: formatPrice(45000) → "45.000đ"
```

---

## Notes

- Tất cả components trên là PATTERNS MẪU — điều chỉnh colors, border-radius, spacing theo design system
- Nếu design system dùng color scheme khác → thay `blue-500` bằng primary color tương ứng
- Ưu tiên Tailwind classes. Chỉ dùng inline styles cho dynamic values (ví dụ: width percentage)
- Lucide React icons có sẵn: `import { Home, Search, ArrowLeft, X, Plus, Minus, ... } from "lucide-react"`