# Layout Algorithm — Tính tọa độ DI

## Constants

```
POOL_X          = 150     # x bắt đầu của tất cả pools
POOL_LABEL_W    = 30      # chiều rộng label pool (phần tên bên trái)
POOL_HEIGHT     = 160     # chiều cao pool (không có lane)
POOL_GAP        = 40      # khoảng trống giữa 2 pool liền kề

TASK_W          = 120     # chiều rộng task
TASK_H          = 80      # chiều cao task
EVENT_SIZE      = 36      # width = height của start/end/intermediate event
GW_SIZE         = 50      # width = height của gateway (hình thoi)

X_START         = 222     # x-center của start event (element đầu tiên)
X_STEP          = 170     # bước nhảy x giữa các elements liên tiếp
```

---

## Pool y-coordinates

```
pool[0].y = 80
pool[1].y = pool[0].y + POOL_HEIGHT + POOL_GAP  = 280
pool[2].y = pool[1].y + POOL_HEIGHT + POOL_GAP  = 480
pool[3].y = ...                                  = 680
```

Center y của element trong pool (dùng cho waypoints):
```
center_y = pool.y + POOL_HEIGHT / 2   →  pool.y + 80
```

---

## Element x-coordinates (theo thứ tự trong flow)

Mỗi element trong flow có một `step_x` (tâm element):

```
step[0] = X_START = 222          ← start event
step[1] = 222 + 170 = 392        ← task/gateway đầu tiên
step[2] = 392 + 170 = 562
step[3] = 562 + 170 = 732
step[4] = 732 + 170 = 902
...
```

**Lưu ý:** Khi có gateway XOR split ra 2 nhánh, mỗi nhánh vẫn dùng step_x tiếp theo, chỉ khác `y` nếu nhánh nằm ở lane khác. Với diagram 1 pool, 2 nhánh của XOR sẽ cần điều chỉnh y (1 nhánh lên trên, 1 nhánh xuống dưới tâm pool).

---

## Tính x, y cho từng loại element

### Task (w=120, h=80):
```
x = step_x - TASK_W/2    = step_x - 60
y = pool_center_y - 40   = pool.y + 40
```

### StartEvent / EndEvent (w=h=36):
```
x = step_x - 18
y = pool_center_y - 18   = pool.y + 62
```

### IntermediateCatchEvent (w=h=36):
```
x = step_x - 18
y = pool_center_y - 18
```

### Gateway (w=h=50):
```
x = step_x - 25
y = pool_center_y - 25   = pool.y + 55
```

---

## Pool total width

Tính dựa trên số elements tối đa trong 1 pool:

```
N = số elements (start + tasks + gateways + end) trong pool dài nhất
POOL_WIDTH = X_START + (N - 1) * X_STEP + EVENT_SIZE/2 + 50
```

Áp dụng **cùng 1 width** cho tất cả pools.

Ví dụ: Pool có 5 elements (start + 3 tasks + end):
```
POOL_WIDTH = 222 + 4 * 170 + 18 + 50 = 970
```

---

## Sequence Flow Waypoints

### Task → Task (ngang):
```
source: (task.x + TASK_W,  pool_center_y)   → right edge, center y
target: (next_task.x,       pool_center_y)   → left edge, center y
```

### Task / Event → Gateway:
```
source: (task.x + TASK_W, pool_center_y)
target: (gw.x,             pool_center_y)
```

### Gateway → Task (cùng pool, cùng y):
```
source: (gw.x + GW_SIZE,  pool_center_y)
target: (task.x,           pool_center_y)
```

### Gateway → Task (nhánh xuống, y lớn hơn):
```
source: (gw.center_x, gw.y + GW_SIZE)   → bottom của gateway
target: (task.center_x, task.y)          → top của task
```

### Event → Task (right to left):
```
source: (event.x + EVENT_SIZE, pool_center_y)
target: (task.x,               pool_center_y)
```

---

## Message Flow Waypoints (giữa 2 pools)

Message flows là đường thẳng đứng giữa 2 pools.

### Pool trên gửi xuống Pool dưới:
```
source: (element_A.center_x,  pool_A.y + POOL_HEIGHT)   ← bottom edge của pool A
target: (element_B.center_x,  pool_B.y)                  ← top edge của pool B
```

Để vẽ đẹp: `element_B.center_x ≈ element_A.center_x` (căn thẳng đứng).

### Pool dưới gửi lên Pool trên:
```
source: (element_B.center_x,  pool_B.y)                  ← top edge của pool B
target: (element_A.center_x,  pool_A.y + POOL_HEIGHT)    ← bottom edge của pool A
```

---

## Ví dụ đầy đủ: 2 pools, mỗi pool 3 elements

**Pool User** (`pool.y=80`, `pool_center_y=160`):

| Element      | step_x | x   | y   | w   | h  |
|---|---|---|---|---|---|
| StartEvent   | 222    | 204 | 142 | 36  | 36 |
| Task_NhapTin | 392    | 332 | 120 | 120 | 80 |
| Task_GuiTin  | 562    | 502 | 120 | 120 | 80 |
| ICE_DocPH    | 732    | 714 | 142 | 36  | 36 |
| EndEvent     | 902    | 884 | 142 | 36  | 36 |

**Pool Bot** (`pool.y=280`, `pool_center_y=360`):

| Element      | step_x | x   | y   | w   | h  |
|---|---|---|---|---|---|
| StartBot     | 562    | 544 | 342 | 36  | 36 |
| Task_XuLy    | 732    | 672 | 320 | 120 | 80 |
| Task_TraLoi  | 902    | 842 | 320 | 120 | 80 |
| EndBot       | 1072   | 1054| 342 | 36  | 36 |

**Message Flows:**
```
MF_1 (GuiTin → StartBot):
  waypoint: (562, 200) → (562, 342)    [x=center of GuiTin, y: bottom Pool_User → top Pool_Bot]

MF_2 (TraLoi → ICE_DocPH):
  waypoint: (902, 320) → (732, 178)    [Task_TraLoi top → ICE_DocPH bottom]
  (cần 2 waypoints nếu x khác nhau: elbow routing)
```

---

## Lane (sub-department) height

Khi pool có lanes:
```
POOL_HEIGHT = số_lanes * LANE_HEIGHT   (thường LANE_HEIGHT = 120-160)
LANE_LABEL_W = 30   (label lane ở bên trái, bên trong pool)
```

Element trong lane: `center_y = lane.y + LANE_HEIGHT/2`
