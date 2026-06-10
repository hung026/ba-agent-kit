# BPMN Spec JSON — Format

Đây là input cho `generate.js`. LLM chỉ viết file này; **không** tính tọa độ. Chạy:

```
node .claude/skills/diagram-creator/generate.js spec.json output/diagram/<ten>-bpmn.drawio
```

## Cấu trúc

```json
{
  "title": "Tên quy trình (hiển thị thành label trên cùng)",
  "lanes": ["Actor A", "Actor B", "Actor C"],
  "nodes": [ ... ],
  "edges": [ ... ]
}
```

| Trường | Bắt buộc | Ghi chú |
|---|---|---|
| `title` | nên có | Label tiêu đề trên cùng (không còn pool bọc) |
| `lanes` | có | Thứ tự lane **từ trên xuống**. Nếu bỏ → tự suy từ `node.lane` |
| `nodes` | có | Danh sách node |
| `edges` | có | Danh sách mũi tên |

## Node

```json
{ "id": "gw1", "type": "gateway", "label": "Hợp lệ?", "lane": "Hệ thống", "gwType": "exclusive" }
```

| Trường | Bắt buộc | Giá trị |
|---|---|---|
| `id` | có | Duy nhất, không dấu cách (vd `t1`, `gwCheck`, `endErr`) |
| `type` | có | `start` \| `task` \| `gateway` \| `end` |
| `label` | có (trừ merge gw) | Text hiển thị. Xuống dòng dùng `\n` |
| `lane` | có | Phải khớp 1 tên trong `lanes` |
| `gwType` | tuỳ | Chỉ cho gateway: `exclusive` (mặc định) \| `parallel` |

- Mỗi **đường kết thúc** = 1 node `end` riêng (vd `endOk`, `endErr`).
- Gateway **merge/join** (gộp nhánh): để `"label": ""`.

## Edge

```json
{ "from": "gw1", "to": "endErr", "label": "Sai" }
```

| Trường | Bắt buộc | Ghi chú |
|---|---|---|
| `from` | có | `id` node nguồn |
| `to` | có | `id` node đích |
| `label` | tuỳ | Nhãn nhánh (đặt trên edge ra từ gateway split) |

## Diễn đạt các cấu trúc

| Cấu trúc | Cách khai báo |
|---|---|
| **Tuyến tính** | Chuỗi edge nối tiếp |
| **Rẽ nhánh (exclusive)** | 1 gateway có ≥2 edge `from`, mỗi edge 1 `label` |
| **Cascade** (kiểm tra nối tiếp) | Nhiều gateway nối nhau bằng edge "tiếp tục"; mỗi gateway có thêm 1 edge thoát. **Không cần lo layout** — generator tự xếp |
| **Gộp nhánh (merge)** | Nhiều edge `to` cùng 1 gateway `label:""` |
| **Song song** | 1 gateway `gwType:"parallel"` split → các task → 1 gateway `gwType:"parallel"` join |
| **Loop / quay lui** | Edge `from` node lỗi `to` node trước đó. Generator **tự phát hiện chu trình** và vẽ vòng dưới |

## Ví dụ đầy đủ
→ Xem [`spec-example.json`](spec-example.json) (ca thật: 3 lane + cascade 3 gateway + merge, generate ra 0 overlap).

## Sau khi generate
1. `generate.js` in `overlap=0` → ok.
2. Luôn chạy `verify.js` trên file output → phải "✅ SẠCH".
3. Nếu verify đỏ → sửa **spec** (thường do logic), generate lại — không sửa .drawio bằng tay.
