---
name: bpmn-generator
description: Chuyển mô tả quy trình (text, SRS, user story) thành BPMN 2.0 XML — output paste thẳng vào bpmn.io là visualize được ngay. Dùng skill này khi user nói "vẽ BPMN", "tạo BPMN diagram", "generate workflow BPMN", "luồng nghiệp vụ", hoặc khi mô tả quy trình có nhiều bên tham gia (người dùng, hệ thống, admin, backend...) cần biểu diễn dạng swimlane. Khác với diagram-creator (PlantUML), skill này sinh ra BPMN XML chuẩn với tọa độ DI đầy đủ.
---

# BPMN Generator

Sinh BPMN 2.0 XML từ mô tả quy trình. Output paste vào [bpmn.io](https://bpmn.io) là chạy ngay.

## Quy trình 4 bước

---

### Bước 1 — PARSE: Đọc và trích xuất cấu trúc

Đọc kỹ input, liệt kê kết quả ra trước khi sang bước 2.

**Participants (Actors) → Pools**
- Tìm danh từ chỉ vai trò: "Khách hàng", "Hệ thống", "Admin", "AI Chatbot", "Backend"
- Mỗi actor độc lập = 1 Pool riêng
- Nếu 1 actor có nhiều bộ phận (vd: Dienstleister có Fachabteilung + Buchhaltung) → dùng Lane bên trong Pool

**Tasks → Việc cụ thể**
- Công thức: Động từ + Tân ngữ ("Gửi tin nhắn", "Xử lý yêu cầu", "Tạo báo cáo")
- Mỗi task chỉ thuộc đúng 1 actor

**Gateways → Điểm rẽ nhánh**
- "Nếu... thì..." / "Trường hợp..." → ExclusiveGateway (XOR)
- "Đồng thời" / "Song song" → ParallelGateway (AND)

**Events**
- Bắt đầu quy trình → StartEvent (thường; hoặc MessageStartEvent nếu được trigger bởi tin nhắn từ pool khác)
- Kết thúc → EndEvent
- Chờ nhận tin từ pool khác → IntermediateCatchEvent (Message)

**Message Flows → Giao tiếp giữa các pool**
- Khi actor A gửi thứ gì đó cho actor B → MessageFlow (đường đứt nét)
- Source có thể là Task hoặc EndEvent; Target có thể là StartEvent hoặc IntermediateCatchEvent

**Kết quả parse** (liệt kê dạng này trước khi tiếp tục):
```
Pools: [A, B, C]
Tasks A: [task1, task2, ...]
Tasks B: [task3, task4, ...]
Gateways: [gw1: type XOR, ...]
MessageFlows: [A.task2 → B.start, B.task4 → A.catch1]
```

---

### Bước 2 — MAP: Ánh xạ sang BPMN XML elements

Xem `references/bpmn-elements.md` để lấy đúng XML snippet.

| Concept | BPMN Element |
|---|---|
| Actor / Role | `<participant>` + `<process>` |
| Làm một việc | `<task>` |
| Quyết định if/else | `<exclusiveGateway>` |
| Làm song song | `<parallelGateway>` |
| Bắt đầu | `<startEvent>` |
| Bắt đầu do nhận tin | `<startEvent>` + `<messageEventDefinition>` |
| Chờ nhận tin | `<intermediateCatchEvent>` + `<messageEventDefinition>` |
| Kết thúc | `<endEvent>` |
| Gửi tin giữa actors | `<messageFlow>` trong `<collaboration>` |
| Sub-department trong actor | `<lane>` trong `<laneSet>` |

---

### Bước 3 — LAYOUT: Tính tọa độ DI

Xem `references/layout-algorithm.md` để tính x,y chính xác.

**Tóm tắt nhanh:**
- Pool đầu: `y=80`, các pool sau: `y += 200` (160 height + 40 gap)
- Task: `width=120, height=80`, xếp từ trái sang phải, `x_step=170`
- Task đầu tiên trong pool: `x=310` (sau start event)
- Start/End/IntermediateCatch event: `width=height=36`
- Gateway: `width=height=50`
- Element center trong pool: `center_y = pool_y + 80` (pool_height/2)

---

### Bước 4 — GENERATE: Viết BPMN XML hoàn chỉnh

Dùng cấu trúc từ `assets/xml-template.xml`.

**Thứ tự viết XML:**
1. `<collaboration>` — khai báo participants + messageFlows (chỉ khi có >1 pool)
2. Từng `<process>` — elements + sequenceFlows của pool đó
3. `<bpmndi:BPMNDiagram>` — Shapes (pool, task, event, gateway) + Edges (sequence + message flows)

**Output:**
- In toàn bộ XML ra (không cắt ngắn, không tóm tắt)
- Kèm 1 dòng hướng dẫn: *"Paste vào bpmn.io → Open Diagram → paste XML → OK"*
- Save vào `output/diagram/[tên_quy_trình].bpmn.xml`

---

## Edge cases

| Tình huống | Xử lý |
|---|---|
| Chỉ 1 actor | Dùng 1 `<process>` đơn, không cần `<collaboration>` hay messageFlow |
| >8 tasks trong 1 pool | Cảnh báo user, đề xuất tách diagram, tăng `pool_width` |
| Input mơ hồ (không rõ actor, không rõ flow) | Hỏi rõ trước khi generate |
| Có sub-department | Dùng `<lane>` — xem `references/bpmn-elements.md` phần Lane |
