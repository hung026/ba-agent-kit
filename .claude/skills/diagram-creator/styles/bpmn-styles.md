# BPMN Style Library (.drawio)

> **Lưu ý đường đi chính:** BPMN giờ sinh bằng `generate.js` từ spec JSON (xem SKILL STEP 3–5) — generator đã nhúng sẵn các style + tự tính layout. File này chỉ dùng khi **vẽ tay fallback** (cấu trúc generator chưa hỗ trợ), hoặc để tra cứu style.

Dùng **nguyên văn** các style dưới đây. Không tự chế shape khác.
Mặc định **đen trắng** — không thêm màu trừ khi user yêu cầu. Để chắc B/W, thêm vào cuối style: `strokeColor=#000000;fillColor=#ffffff;fontColor=#000000;`

## Start event (vòng tròn mảnh)
```
points=[[0.145,0.145,0],[0.5,0,0],[0.855,0.145,0],[1,0.5,0],[0.855,0.855,0],[0.5,1,0],[0.145,0.855,0],[0,0.5,0]];shape=mxgraph.bpmn.event;html=1;verticalLabelPosition=bottom;labelBackgroundColor=#ffffff;verticalAlign=top;align=center;perimeter=ellipsePerimeter;outlineConnect=0;aspect=fixed;outline=standard;symbol=general;
```

## End event (vòng tròn đậm)
```
points=[[0.145,0.145,0],[0.5,0,0],[0.855,0.145,0],[1,0.5,0],[0.855,0.855,0],[0.5,1,0],[0.145,0.855,0],[0,0.5,0]];shape=mxgraph.bpmn.event;html=1;verticalLabelPosition=bottom;labelBackgroundColor=#ffffff;verticalAlign=top;align=center;perimeter=ellipsePerimeter;outlineConnect=0;aspect=fixed;outline=end;symbol=terminate;
```

## Exclusive gateway (hình thoi X — rẽ 1 nhánh)
```
points=[[0.25,0.25,0],[0.5,0,0],[0.75,0.25,0],[1,0.5,0],[0.75,0.75,0],[0.5,1,0],[0.25,0.75,0],[0,0.5,0]];shape=mxgraph.bpmn.gateway2;html=1;verticalLabelPosition=bottom;labelBackgroundColor=#ffffff;verticalAlign=top;align=center;perimeter=rhombusPerimeter;outlineConnect=0;outline=none;symbol=none;gwType=exclusive;
```

## Parallel gateway (hình thoi + — chạy song song)
```
points=[[0.25,0.25,0],[0.5,0,0],[0.75,0.25,0],[1,0.5,0],[0.75,0.75,0],[0.5,1,0],[0.25,0.75,0],[0,0.5,0]];shape=mxgraph.bpmn.gateway2;html=1;verticalLabelPosition=bottom;labelBackgroundColor=#ffffff;verticalAlign=top;align=center;perimeter=rhombusPerimeter;outlineConnect=0;outline=none;symbol=none;gwType=parallel;
```

## Task (hộp bo góc)
```
points=[[0.25,0,0],[0.5,0,0],[0.75,0,0],[1,0.25,0],[1,0.5,0],[1,0.75,0],[0.75,1,0],[0.5,1,0],[0.25,1,0],[0,0.75,0],[0,0.5,0],[0,0.25,0]];shape=mxgraph.bpmn.task;whiteSpace=wrap;rectStyle=rounded;size=10;html=1;
```
> **KHÔNG** thêm `container=1;expand=0;collapsible=0;taskMarker=abstract` vào task. `container=1` biến task thành khung chứa → node khác có thể rơi vào trong; `taskMarker=abstract` hiện icon mờ thừa. Task thường chỉ cần style trên.

## Title (label tiêu đề nổi trên cùng — KHÔNG bọc lane)
```
text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;fontStyle=1;fontSize=14;fontColor=#000000;
```

## Lane (mỗi actor 1 lane RỜI, là con của `1`, KHÔNG nằm trong pool)
```
swimlane;html=1;horizontal=0;startSize=30;fontStyle=1;fontSize=12;fillColor=none;strokeColor=#000000;swimlaneFillColor=#ffffff;fontColor=#000000;
```
> **Không dùng pool bọc chung.** Mỗi lane là 1 swimlane độc lập (`parent="1"`), xếp dọc và **cách nhau 1 khoảng** (gap ~40px). Tiêu đề quy trình để riêng thành 1 label `text` ở trên cùng, không bọc lane vào pool.

- Base edge (B/W + mũi tên): `edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;endArrow=block;endFill=1;strokeColor=#000000;`
- Mũi tên có nhãn (nhánh gateway) thêm: `fontSize=11;fontColor=#000000;labelBackgroundColor=#ffffff;`

### Bảng quy tắc exit/entry (BẮT BUỘC ép điểm nối theo hướng)

`exitX/exitY` = điểm RA trên node nguồn; `entryX/entryY` = điểm VÀO trên node đích (toạ độ 0..1 trên cạnh node). Ép đúng theo bảng → edge không cắt qua node, không gấp khúc xấu.

| Hướng nối | Tình huống | Ép vào style edge |
|---|---|---|
| → (ngang phải) | main path trái→phải, cùng dải y | `exitX=1;exitY=0.5;entryX=0;entryY=0.5;` |
| ↓ nhánh xuống | GW rẽ nhánh xuống dưới (cùng lane) | `exitX=0.5;exitY=1;entryX=0.5;entryY=0;` |
| ↑ nhánh lên | GW rẽ nhánh lên trên (cùng lane) | `exitX=0.5;exitY=0;entryX=0.5;entryY=1;` |
| ↓ xuyên lane | task lane trên → task lane dưới | `exitX=0.5;exitY=1;entryX=0.5;entryY=0;` |
| ↑ xuyên lane | task lane dưới → task lane trên | `exitX=0.5;exitY=0;entryX=0.5;entryY=1;` |
| ↩ quay lui (loop) | task lỗi quay về bước trước (bên trái) | `exitX=0.5;exitY=1;entryX=0.5;entryY=1;` (vòng xuống dưới rồi sang trái) |
| → merge/join | nhánh gộp vào GW merge bên phải | `exitX=1;exitY=0.5;entryX=0;entryY=0.5;` |

- **Quy tắc:** nối DỌC (xuống/lên, xuyên lane) → dùng cạnh trên/dưới (`exitY=0/1`). Nối NGANG → dùng cạnh trái/phải (`exitX=0/1`). Tuyệt đối **không** để mặc định "phải→phải" cho edge dọc.
- Node nguồn nằm **bên phải** node đích (loop về trái) → cho edge ra cạnh dưới, vòng xuống, vào cạnh dưới đích.

---

## Mapping template → shape
| Template | Shape |
|---|---|
| `START` | Start event |
| `END` (mỗi đường kết thúc 1 cái) | End event |
| `DECISION` / `?` | Exclusive gateway **split** (1 vào, nhiều ra; nhãn nhánh ghi lên mũi tên) |
| Nhiều nhánh **gộp lại** chạy chung tiếp | Exclusive gateway **merge** (nhiều vào, 1 ra) — xem `patterns/p-merge.drawio` |
| `SONG SONG` / "đồng thời" | Parallel gateway: 1 cái **split** (1 vào, nhiều ra) + 1 cái **join** (nhiều vào, 1 ra) — xem `patterns/p-parallel.drawio` |
| Lỗi xong **làm lại** bước trước (loop) | Edge quay lui — xem `patterns/p-loop.drawio` |
| Hành động thường | Task |

### Gateway split vs merge/join
- **Style giống hệt nhau** (cùng `gwType=exclusive` hoặc `gwType=parallel`). Khác nhau ở **số edge vào/ra**, không phải shape.
  - **split**: 1 edge vào, ≥2 edge ra (mỗi edge 1 nhãn điều kiện).
  - **merge / join**: ≥2 edge vào, 1 edge ra (edge vào **không** cần nhãn).
- Merge gateway thường để **value rỗng** (`value=""`) — không cần câu hỏi.
- Parallel: split không nhãn nhánh, join chờ tất cả nhánh xong mới chạy tiếp.

## Layout BPMN
- **Lane rời nhau**, xếp chồng dọc (`horizontal=0`), cách nhau gap ~40px. KHÔNG bọc trong pool.
- Mỗi lane là con của `1` (`parent="1"`), toạ độ **tuyệt đối** trên canvas; các lane cùng `x` và cùng `width` để thẳng cột.
- Mỗi node là con của lane chứa nó (`parent=<laneId>`), toạ độ tương đối so với lane.
- Edge để `parent="1"` để nối xuyên lane.
- Luồng chạy **trái → phải**. Nhánh rẽ lệch lên/xuống trong cùng lane.
- Gán node vào lane đúng theo actor trong template.

---

## Layout Grid Formula

Dùng công thức này thay vì tính pixel thủ công. Gán mỗi node 1 số cột N → plug vào công thức.

### Kích thước chuẩn

| Shape | Width | Height |
|---|---|---|
| Task | 140 | 60 |
| Gateway | 60 | 60 |
| Start / End event | 50 | 50 |

### Công thức tọa độ

```
x_node  = 50 + (N - 1) × 200          -- N = số cột, đếm từ 1
y_main  = (lane_h / 2) - 30           -- main path (center task vertically)
y_upper = 15                           -- nhánh rẽ lên trên
y_lower = lane_h - 75                  -- nhánh rẽ xuống dưới
```

Ví dụ lane_h = 200:
- y_main  = 70   → task: y=70, spans 70–130, center 100
- y_upper = 15   → task: y=15, spans 15–75
- y_lower = 125  → task: y=125, spans 125–185
- Gap upper↔main = 70 − 75 = −5 → **KHÔNG đủ**! Tăng lane_h.

### Lane height chuẩn

| Loại lane | Height | y_main | y_upper | y_lower |
|---|---|---|---|---|
| Simple (chỉ main path) | 150 | 45 | — | — |
| Có 1 nhánh (branch up/down) | 240 | 90 | 15 | 165 |
| **Cascade dọc** (≥2 GW nối tiếp, mỗi GW có nhánh thoát) | 300 | 30 (GW row) | — | exit=130, end=230 |

### ⚠️ Chọn kiểu nhánh theo SỐ gateway nối tiếp (quan trọng nhất)

| Số GW có nhánh thoát | Kiểu bố cục | Lý do |
|---|---|---|
| **1 GW** | Nhánh đi **NGANG** (lên y_upper / xuống y_lower), exit task + end nằm các cột bên phải GW | Đủ chỗ ngang, nhìn quen |
| **≥2 GW nối tiếp** | Nhánh đi **DỌC XUỐNG**: exit task ngay **dưới** GW, end ngay **dưới** exit task. Mỗi GW chiếm **1 cột** | Nhánh ngang sẽ chen nhau theo trục x → **CHỒNG** (đây là lỗi kinh điển). Đi dọc thì mỗi GW chỉ tốn 1 cột |

> Output cũ bị chồng vì để 3 GW cascade rẽ nhánh NGANG cùng dải y trên, khoảng cách GW chỉ ~200px < chỗ cần (exit 140 + end 50 + gap). **Cascade ≥2 GW → BẮT BUỘC nhánh dọc.**

### Layout cascade dọc (lane_h = 300)

```
Tầng GW   (main path):  y = 30   → GW/task spans 30–90, event y=35 (center 60)
Tầng exit (nhánh thoát): y = 130  → exit task spans 130–190  (gap main 40px ✓)
Tầng end  (kết nhánh):   y = 230  → end event spans 230–280  (gap exit 40px ✓)
```

Toạ độ x (GW_i ở cột i, i đếm từ 1):
```
gw_x       = 50 + (i − 1) × 200          -- gateway cột i
exit_x     = gw_x − 40                    -- exit task căn giữa dưới GW (spans gw_x−40 … gw_x+100)
end_x      = gw_x + 5                      -- end event căn giữa dưới exit (spans gw_x+5 … gw_x+55)
```
Kiểm tra tự động: exit_i và exit_{i+1} cách nhau 60px ✓, end_i và end_{i+1} cách 150px ✓.
→ Xem ví dụ verified: `patterns/p-cascade.drawio`.

> Nếu giữa 2 GW có task trung gian → task đó là **1 cột riêng** trên main path (đẩy GW kế tiếp sang phải thêm 1 cột). Nếu 1 nhánh thoát có **nhiều task** → nhánh đó xử lý như case "1 GV ngang", dành riêng chiều ngang cho nó.

### Quy tắc anti-overlap bắt buộc

1. **Không 2 node nào cùng chiếm 1 vùng pixel** — kiểm tra cả x-range VÀ y-range (cùng lane).
2. **Vertical gap tối thiểu** giữa 2 tầng (upper↔main, main↔exit, exit↔end): ≥ 30px.
3. **Horizontal gap tối thiểu** giữa 2 node liền kề cùng tầng: ≥ 60px (cột cách 200px, task 140 → gap 60 ✓).
4. **Branch task KHÔNG đặt cùng x-range với gateway** nếu cùng tầng y — phải lệch tầng hoặc lệch cột.
5. **BẮT BUỘC chạy `verify.js` sau khi vẽ** (xem SKILL STEP 4) — đây là lưới an toàn cuối, lời nhắc trên không thay thế được kiểm tra thật.

### Cách dùng nhanh

```
1. Gán cột cho từng node MAIN PATH (GW + task nối tiếp): cột 1, 2, 3...
2. Đếm số GW có nhánh thoát:
   - 1 GW  → nhánh NGANG: exit task cột N+1 (y_upper/y_lower), end cột N+2 cùng dải.
   - ≥2 GW → nhánh DỌC: exit task dưới GW (exit_x=gw_x−40, y=130), end dưới exit (end_x=gw_x+5, y=230).
3. Plug công thức → điền x,y vào XML.
4. CHẠY verify.js → sửa hết overlap/cảnh báo → mới báo "xong".
```
