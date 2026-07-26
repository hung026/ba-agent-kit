# Phân tích & Đề xuất — Chống gỡ bỏ App con + Quản lý sử dụng App

> Đầu vào: mở rộng SRS Parental Control (FR-01 Pairing, FR-03 Quản lý hồ sơ/thiết bị). Phạm vi phân tích này: **Android only** (iOS tạm hoãn theo quyết định của stakeholder).

---

## 0. Quyết định đã chốt (từ elicitation)

| #  | Câu hỏi                        | Quyết định                                                                                                                                                                                                                                               |
| -- | -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1  | Nền tảng                       | Bỏ qua iOS, làm sau                                                                                                                                                                                                                                       |
| 2  | Mức độ chống gỡ             | **Hard block**: muốn gỡ phải thao tác chủ động từ App Parents. Nếu con lách được (reset máy, gỡ cert...) → phải báo bố mẹ                                                                                                         |
| 3  | Phạm vi case xử lý            | Toàn bộ case có thể nghĩ ra (xem mục 2)                                                                                                                                                                                                               |
| 4  | Phạm vi quản lý sử dụng app | Chặn hẳn app (blacklist), Whitelist mode, Giới hạn thời lượng/app/ngày, Giới hạn tổng thời gian dùng máy/ngày, Lịch khoá theo khung giờ.**Không làm**: chặn theo danh mục, xin thêm giờ, Lock now, báo cáo thời gian dùng |
| 5  | Danh sách app                   | Máy con gửi list app đã cài lên server → bố mẹ chọn từ list                                                                                                                                                                                      |
| 5b | App mới cài sau khi set rule   | Vẫn cho cài, nhưng mặc định**Default-Deny**: cài về không dùng được cho tới khi bố mẹ duyệt/giới hạn giờ                                                                                                                          |
| 5c | Chặn cài app mới (CH Play)    | Khả thi — nhưng chỉ ở**Tier B** (xem mục 1)                                                                                                                                                                                                     |

---

## 1. Sự thật kỹ thuật Android — 2 tầng "chống gỡ"

|                                   | **Tier A — Device Admin** (SRS hiện tại)                                          | **Tier B — Device Owner** (Android Enterprise)                         |
| --------------------------------- | ------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------- |
| Cách kích hoạt                 | Dialog trong app, không mất dữ liệu                                                    | **Bắt buộc factory reset** máy con → quét QR ở Setup Wizard       |
| Chặn gỡ app                     | Nút Uninstall xám, nhưng Settings → Device admin → Deactivate →**gỡ được** | `setUninstallBlocked()` → không có đường gỡ, kể cả trong Settings  |
| Chặn Force stop / Clear data     | ❌                                                                                         | ✅`setUserControlDisabledPackages()`                                        |
| Chặn Safe Mode                   | ❌                                                                                         | ✅`DISALLOW_SAFE_BOOT`                                                      |
| Chặn Factory reset               | ❌                                                                                         | ✅`DISALLOW_FACTORY_RESET`                                                  |
| Chặn cài app mới (CH Play)     | ❌ (chỉ phát hiện sau khi cài)                                                         | ✅`DISALLOW_INSTALL_APPS`                                                   |
| Chặn đổi giờ hệ thống       | ❌                                                                                         | ✅`DISALLOW_CONFIG_DATE_TIME`                                               |
| Chặn tạo user phụ / Guest mode | ❌                                                                                         | ✅`DISALLOW_ADD_USER`                                                       |
| Chặn app                         | Cần Accessibility + Overlay (vẽ màn khoá đè)                                         | `setPackagesSuspended()` — hệ thống tự chặn, không cần Accessibility |
| Rủi ro Play Store                | Cao (Accessibility scrutiny)                                                               | Thấp                                                                         |

**Kết luận:** Yêu cầu "hard block" thật sự chỉ đạt được ở Tier B. Tier A là "chống gỡ đủ với trẻ tiểu học", không đủ với teen biết tra Google.

**Nguồn:**

- [Google Play — Accessibility policy update](https://support.google.com/googleplay/android-developer/answer/16550159?hl=en) — 2025-10-30
- [Android Enterprise — Device control](https://developer.android.com/work/dpc/device-management)
- [Android Enterprise — Security](https://developer.android.com/work/dpc/security)
- [Device admin deprecation](https://developers.google.com/android/work/device-admin-deprecation)
- [Boomerang — Uninstall Protection](https://useboomerang.com/article/uninstall-protection-parental-control/)

---

## 2. Blind spots (chưa có trong yêu cầu ban đầu)

### 🔴 Critical

1. **Đổi giờ hệ thống phá sạch rule lịch + time limit.** Con chỉnh giờ lùi → thoát giờ ngủ, reset counter. → Mọi phép tính giờ dùng **server time**; device time chỉ dùng khi offline; lệch > 5 phút → alert nghi can thiệp.
2. **Offline là lỗ hổng lớn nhất.** Bật máy bay → mất heartbeat → nếu rule chỉ chạy ở server thì con dùng thoải mái. → Rule phải cache local + enforce offline, counter tích local rồi sync sau. Cần chốt fail-open/fail-closed khi offline kéo dài.
3. **Whitelist có thể "brick" máy con** nếu chặn nhầm Phone/Settings/Launcher/Emergency. → Bắt buộc danh sách app hệ thống miễn trừ, không cho bố mẹ chặn.
4. **Xung đột rule chưa định nghĩa** (whitelist + limit + giờ ngủ + default-deny cái nào thắng). → Cần precedence rõ ràng (mục 4).
5. **Chống gỡ càng chặt càng cần đường cứu hộ.** Bố mẹ mất máy/tài khoản, server chết → con kẹt máy vĩnh viễn. → Cần recovery code sinh lúc pairing + quy trình CSKH.

### 🟡 Important

6. Rule per-device hay per-profile? (SRS hiện tại per-device — con 2 máy sẽ ăn gian gấp đôi thời lượng).
7. Định nghĩa "thời gian dùng app": chỉ foreground? nhạc nền? PiP? split-screen?
8. Mốc reset counter hàng ngày: 00:00 theo timezone nào — chốt theo timezone hồ sơ, xử lý ở server.
9. Play Store policy risk: Accessibility + Device Admin + VPN + Usage Access + Overlay cùng lúc = red flag, phải khai báo rõ trong listing + Prominent Disclosure trên máy con, không stealth.
10. Pháp lý VN — Nghị định 13/2023: trẻ < 7 tuổi cần đồng ý cha mẹ; ≥ 7 tuổi cần đồng ý của chính trẻ. → Máy con cần màn thông báo minh bạch "đang được bố mẹ quản lý".
11. CA cert/VPN bị gỡ → app vẫn sống nhưng mất năng lực lọc → coi là 1 case tamper riêng.

### 🟢 Minor

12. Dual App / Parallel Space / Secure Folder (Samsung) → clone app né blacklist bằng package/user khác.
13. App tự update đổi package name; app cài từ APK ngoài (sideload).

---

## 3. Nghiệp vụ xử lý toàn bộ case chống gỡ

Nguyên tắc: **3 tầng phòng thủ** — Ngăn (Prevent) → Phát hiện (Detect) → Báo động (Alert). Case không ngăn được ở Tier A phải rơi xuống Detect + Alert.

| #  | Đường con lách                          | Tier A                                                                                           | Tier B                                             | Phát hiện                                                          | Nghiệp vụ khi xảy ra                                                                                                              |
| -- | ------------------------------------------- | ------------------------------------------------------------------------------------------------ | -------------------------------------------------- | -------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| 1  | Gỡ app từ Home/App info                   | Nút Uninstall xám (Device Admin)                                                               | Chặn tuyệt đối                                 | —                                                                   | Không cho gỡ                                                                                                                       |
| 2  | Vào Settings → Device admin → Deactivate | Accessibility Guard phát hiện mở màn này → overlay yêu cầu PIN bố mẹ                   | Không tồn tại đường này                     | Event`admin_deactivate_attempt`                                    | Alert: "Con thử tắt quyền quản trị lúc HH:mm"                                                                                  |
| 3  | Tắt Accessibility Service                  | Guard chặn màn này bằng PIN; nếu tắt được → mất khả năng chặn app                  | Miễn nhiễm (không phụ thuộc Accessibility)    | Heartbeat mang`perm_status` mỗi 60s                               | → trạng thái**"Mất bảo vệ"**. Alert ngay. App Kid hiện màn full-screen bắt cấp lại quyền                                 |
| 4  | Force stop app                              | ❌ không chặn được                                                                          | ✅`setUserControlDisabledPackages`               | Mất heartbeat > 3 phút                                             | → Mất kết nối + Alert. Auto-restart (JobScheduler/WorkManager + AlarmManager +`RECEIVE_BOOT_COMPLETED`)                        |
| 5  | Clear data/cache                            | ❌                                                                                               | ✅                                                 | Mất device_id local → app khởi động lại như "chưa pairing"   | Server nhận`device_fingerprint` cũ → tự khôi phục pairing, không bắt quét QR lại. Alert                                  |
| 6  | Vào Safe Mode                              | ❌                                                                                               | ✅`DISALLOW_SAFE_BOOT`                           | Mất heartbeat                                                       | Alert "Thiết bị khởi động ở chế độ an toàn"                                                                                |
| 7  | Factory reset                               | ❌                                                                                               | ✅`DISALLOW_FACTORY_RESET`                       | Mất heartbeat vĩnh viễn                                           | Sau X giờ offline liên tục → Alert cấp cao "Có thể đã bị khôi phục cài đặt gốc". Giữ hồ sơ + rule để ghép lại |
| 8  | Tạo User phụ/Guest mode                   | ❌                                                                                               | ✅`DISALLOW_ADD_USER` + `DISALLOW_USER_SWITCH` | Hạn chế qua Usage Access                                           | Alert, ghi log                                                                                                                       |
| 9  | Dual App/Parallel Space/Secure Folder       | Detect package clone → áp rule theo tên app                                                   | ✅ chặn tạo work profile phụ                    | Quét danh sách app định kỳ                                      | Auto áp rule của app gốc cho bản clone. Alert                                                                                    |
| 10 | Đổi giờ hệ thống                       | Guard chặn màn Date & time bằng PIN                                                           | ✅`DISALLOW_CONFIG_DATE_TIME`                    | So`device_time` vs `server_time` mỗi heartbeat, lệch > 5 phút | Bỏ qua device time, dùng server time. Alert nghi can thiệp                                                                        |
| 11 | Tắt VPN                                    | Guard chặn màn VPN settings; app tự reconnect (`ALWAYS_ON_VPN`)                             | ✅`setAlwaysOnVpnPackage(lockdown=true)`         | Heartbeat mang`vpn_state`                                          | → "Mất bảo vệ (một phần)". Alert. Nhắc bật lại                                                                              |
| 12 | Gỡ CA cert                                 | Guard chặn màn Security → Credentials                                                         | ✅ silent install CA, chặn gỡ                    | App tự check cert store khi lên foreground                         | Alert "Chứng chỉ lọc nội dung bị gỡ" + hướng dẫn cài lại                                                                  |
| 13 | Bật máy bay/tắt mạng                    | Không chặn được                                                                             | Không chặn được (airplane mode)               | Mất heartbeat                                                       | Rule vẫn chạy offline (cache local). Offline > ngưỡng → siết chặt (fail-closed)                                               |
| 14 | Tắt nguồn máy                            | Không chặn                                                                                     | Không chặn                                       | Mất heartbeat                                                       | → Mất kết nối. Rule tự apply lại khi boot                                                                                      |
| 15 | Gỡ qua ADB/máy tính                      | ❌                                                                                               | ✅`DISALLOW_DEBUGGING_FEATURES`                  | Mất heartbeat                                                       | Alert                                                                                                                                |
| 16 | Đổi máy/cài lại app trên máy khác   | —                                                                                               | —                                                 | —                                                                   | Không phải tamper — coi là ghép nối mới                                                                                       |
| 17 | Bố mẹ chủ động gỡ (đường hợp lệ) | App Parents → "Gỡ quản lý thiết bị" → server push lệnh → App Kid tự tháo Device Admin | Server push →`clearDeviceOwnerApp()`            | —                                                                   | Đường gỡ hợp pháp duy nhất                                                                                                    |
| 18 | Máy con offline khi bố mẹ ra lệnh gỡ   | Lệnh chờ ở queue, apply khi online lại                                                       | Như Tier A                                        | —                                                                   | Song song: sinh mã gỡ khẩn cấp 8 số ở App Parents → nhập trên máy con để tháo offline                                   |

---

## 4. Nghiệp vụ quản lý sử dụng app

**Thứ tự ưu tiên rule (precedence) — cao thắng thấp:**

```
1. App hệ thống miễn trừ (Phone, Emergency, Settings, Launcher, App Kid)  → LUÔN cho phép
2. Chặn hẳn (Blacklist)                                                   → LUÔN chặn
3. Lịch khoá (giờ ngủ/giờ học)                                            → chặn trong khung giờ
4. Hết hạn mức tổng thời gian dùng máy/ngày                               → chặn tất cả (trừ mục 1)
5. Hết hạn mức thời gian riêng của app                                    → chặn app đó
6. Chế độ Whitelist (nếu bật): app không có trong list                   → chặn
7. App mới cài + chính sách Default-Deny                                 → chặn, chờ duyệt
8. Mặc định                                                                → cho phép
```

**Xử lý app mới cài (Default-Deny):**

- Máy con quét danh sách app mỗi khi có `PACKAGE_ADDED` + quét full mỗi 6 tiếng → đẩy lên server
- Bố mẹ cấu hình chính sách 1 lần/hồ sơ: **Cho dùng ngay** (mặc định) hoặc **Chặn chờ duyệt**
- Nếu chặn chờ duyệt: app cài xong, bấm vào hiện màn "App này đang chờ bố mẹ cho phép"
- Alert cho bố mẹ: "Con vừa cài TikTok" → nút nhanh: Cho phép / Chặn / Đặt giới hạn giờ
- Tier B có thêm option cứng: chặn luôn cài app mới (`DISALLOW_INSTALL_APPS`) → CH Play không cài được

**Trạng thái thiết bị — bổ sung vào PL-02 hiện có:**

| Trạng thái                           | Điều kiện                                     | Ý nghĩa                                                                              |
| -------------------------------------- | ------------------------------------------------ | -------------------------------------------------------------------------------------- |
| Đang sử dụng / Không sử dụng     | (giữ nguyên SRS hiện tại)                    |                                                                                        |
| **Mất bảo vệ** ⚠️ (mới)    | Có heartbeat NHƯNG thiếu ≥1 quyền cốt lõi | App còn sống nhưng không kiểm soát được — case SRS hiện tại đang bỏ sót |
| Mất kết nối                         | > 3 phút không heartbeat                       | (giữ nguyên SRS)                                                                     |
| **Nghi bị gỡ bỏ** ⚠️ (mới) | Mất kết nối > X giờ (đề xuất 6h)          | Phân biệt "hết pin qua đêm" vs "đã bị gỡ"                                     |

---

## 5. Ba phương án triển khai

### Option 3: Hai tầng bảo vệ — mặc định Tier A, nâng cấp tùy chọn lên Tier B ⭐ (Đề xuất)

**Giải pháp:**

- Mặc định = Option 1, gọi là **"Bảo vệ Tiêu chuẩn"**. Ai cũng dùng được ngay, không mất data
- App Parents có mục **"Bảo vệ Tối đa"** → wizard giải thích rõ cần khôi phục cài đặt gốc, nhắc sao lưu trước → hướng dẫn từng bước → quét QR ở Setup Wizard → lên Tier B
- Toàn bộ nghiệp vụ, rule, UI, API dùng chung — chỉ khác cách thực thi ở tầng dưới (enforcement adapter)
- App Parents luôn hiển thị "Mức độ bảo vệ hiện tại" + liệt kê rõ giới hạn của mức đang chọn → set kỳ vọng đúng, tránh khiếu nại
- Mọi case ở Tier A không ngăn được đều có Detect + Alert bù lại

**Pros:**

- Không đánh đổi conversion để lấy security — bố mẹ tự chọn
- Cùng 1 bộ nghiệp vụ → không phải viết 2 SRS, không nhân đôi backend
- "Bảo vệ Tối đa" là điểm khác biệt so với Family Link + là hook upsell gói trả phí
- Minh bạch mức bảo vệ → giảm rủi ro pháp lý & khiếu nại

**Cons:**

- Effort dev lớn nhất (phải làm cả 2 enforcement engine)
- Test matrix nhân đôi
- Nguy cơ user confuse 2 mức nếu UX viết không rõ

**Rủi ro:**
🟡 Phase 2 (Tier B) dễ bị deprioritize → cuối cùng chỉ còn Option 1. Phải cam kết roadmap.
🔴 Các 🔴 chung (đổi giờ, offline, whitelist brick máy, recovery code) phải giải quyết ở cả 2 tier, không phụ thuộc option.

**Áp dụng khi:** Sản phẩm consumer đại chúng, tập khách hàng trải rộng từ tiểu học tới cấp 3 — đúng bối cảnh Tammi.

**Sources:** như Option 1 + 2.

---

## ⭐ Đề xuất: Option 3 — Hai tầng bảo vệ

**Lý do:**
Hard block thật trên Android bắt buộc phải factory reset — không có đường tắt. Ép mọi khách hàng factory reset sẽ giết conversion của Mini App; còn chỉ làm Tier A thì không đáp ứng đúng cam kết "muốn gỡ phải có thao tác từ máy bố mẹ". Option 3 để bố mẹ tự chọn điểm cân bằng, và quan trọng hơn: cùng một bộ nghiệp vụ, viết SRS 1 lần, chỉ khác lớp thực thi.

**Cân nhắc:** Quay lại Option 1 nếu deadline < 3 tháng hoặc chưa đăng ký được Android Enterprise. Nhảy thẳng Option 2 nếu định vị sản phẩm là B2B/bán kèm máy (đã reset sẵn, không rào cản).

**Vấn đề cần chốt trước khi viết SRS:**

- Fail-open hay fail-closed khi offline? (đề xuất: rule enforce local bình thường; offline > 24h → chặn toàn bộ trừ app miễn trừ)
- Rule per-device hay per-profile? (SRS hiện tại per-device — con 2 máy sẽ ăn gian gấp đôi)
- Recovery code: bắt buộc có, sinh lúc pairing, hiển thị ở App Parents
- Danh sách app hệ thống miễn trừ: định nghĩa cứng, không cho bố mẹ chặn (Phone, Emergency, Settings, Launcher, App Kid)
- Legal check: Nghị định 13/2023 — trẻ ≥ 7 tuổi cần đồng ý của chính trẻ. Máy con cần màn thông báo minh bạch, không stealth
- Nguồn thời gian: mọi tính toán theo server time; device time chỉ dùng offline + có cơ chế phát hiện lệch

---

**Next step:** Chốt Option + 6 vấn đề trên → chạy `doc-factory` viết SRS cho FR-02 (Chống gỡ bỏ) + FR-04 (Quản lý sử dụng app) theo đúng format 10 mục của tài liệu hiện tại.
