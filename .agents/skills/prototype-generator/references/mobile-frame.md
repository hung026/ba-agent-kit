# Mobile Phone Frame

Code pattern cho phone frame wrapper. Đọc file này khi platform = "Mobile App".

---

## Mục đích

Wrap toàn bộ prototype trong 1 phone frame giả lập để:
- Stakeholder thấy app trông giống thật khi demo
- Giới hạn viewport đúng mobile size
- Có status bar và home indicator giống iOS/Android

---

## Phone Frame Component

```jsx
const PhoneFrame = ({ children }) => (
  <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
    {/* Phone body */}
    <div className="relative w-[375px] h-[812px] bg-black rounded-[3rem] shadow-2xl border-[6px] border-gray-800 overflow-hidden">
      {/* Notch */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[160px] h-[34px] bg-black rounded-b-3xl z-50" />

      {/* Status bar */}
      <div className="relative z-40 flex justify-between items-center px-8 pt-3 pb-1 bg-white">
        <span className="text-xs font-semibold">9:41</span>
        <div className="flex items-center gap-1.5">
          <svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor">
            <rect x="0" y="6" width="3" height="6" rx="0.5" opacity="0.3"/>
            <rect x="4.5" y="4" width="3" height="8" rx="0.5" opacity="0.5"/>
            <rect x="9" y="2" width="3" height="10" rx="0.5" opacity="0.7"/>
            <rect x="13" y="0" width="3" height="12" rx="0.5"/>
          </svg>
          <svg width="15" height="12" viewBox="0 0 15 12" fill="currentColor">
            <path d="M7.5 3.6a6 6 0 014.24 1.76l1.06-1.06A7.5 7.5 0 007.5 2a7.5 7.5 0 00-5.3 2.3L3.26 5.36A6 6 0 017.5 3.6z" opacity="0.7"/>
            <path d="M7.5 6.6a3 3 0 012.12.88l1.06-1.06A4.5 4.5 0 007.5 5.1a4.5 4.5 0 00-3.18 1.32l1.06 1.06A3 3 0 017.5 6.6z"/>
            <circle cx="7.5" cy="10" r="1.5"/>
          </svg>
          <svg width="25" height="12" viewBox="0 0 25 12" fill="currentColor">
            <rect x="0" y="1" width="21" height="10" rx="2" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.35"/>
            <rect x="22" y="4" width="2" height="4" rx="0.5" opacity="0.4"/>
            <rect x="1.5" y="2.5" width="14" height="7" rx="1" fill="currentColor"/>
          </svg>
        </div>
      </div>

      {/* App content */}
      <div className="h-[calc(100%-34px)] overflow-hidden bg-white">
        {children}
      </div>

      {/* Home indicator */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[134px] h-[5px] bg-black/20 rounded-full z-50" />
    </div>
  </div>
);
```

---

## Cách sử dụng trong App

```jsx
export default function App() {
  const nav = useNavigation();
  const [state, dispatch] = useReducer(appReducer, initialAppState);

  return (
    <PhoneFrame>
      <div className="relative h-full flex flex-col">
        {/* Screens */}
        <ScreenRouter nav={nav} state={state} dispatch={dispatch} />

        {/* Modal overlay */}
        <ModalRouter nav={nav} state={state} dispatch={dispatch} />

        {/* Toast */}
        <Toast toast={nav.toast} />
      </div>
    </PhoneFrame>
  );
}
```

---

## Tuỳ chỉnh

### Status bar color
Nếu screen có header màu tối → đổi status bar text sang trắng:
```jsx
<div className="... bg-blue-600 text-white"> {/* thay bg-white */}
```

### Không dùng phone frame
Nếu user muốn full-screen (không frame) → bỏ `PhoneFrame`, chỉ giữ content trong container max-width:
```jsx
<div className="max-w-[375px] mx-auto h-screen bg-white">
  {children}
</div>
```

### Web Portal mode
Nếu platform = "Web Portal" → KHÔNG dùng phone frame. Dùng:
```jsx
const WebShell = ({ children }) => (
  <div className="min-h-screen bg-gray-50">
    <div className="max-w-6xl mx-auto">
      {children}
    </div>
  </div>
);
```

---

## Safe Areas

Content phải tránh:
- **Top**: 34px (notch) + status bar height → content bắt đầu sau status bar
- **Bottom**: 34px cho home indicator → tab bar / bottom CTA cần `pb-8` hoặc `mb-8`

Pattern:
```jsx
{/* Screen wrapper */}
<div className="flex flex-col h-full">
  {/* Content — scrollable */}
  <div className="flex-1 overflow-y-auto">
    {/* ... */}
  </div>

  {/* Bottom fixed — tab bar hoặc CTA */}
  <div className="pb-6"> {/* padding cho home indicator */}
    <TabBar />
  </div>
</div>
```