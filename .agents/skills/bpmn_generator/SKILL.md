---
name: bpmn-generator
description: "Generate BPMN 2.0 XML diagrams from text descriptions, SRS documents, or process specifications. Use this skill whenever the user pastes process descriptions, workflow text, SRS content, or explicitly asks to 'vẽ diagram', 'tạo BPMN', 'generate workflow', 'vẽ quy trình', 'create process diagram', or uploads any document describing a business process with actors, steps, and decisions. Also trigger when user says 'BPMN', 'business process', 'workflow diagram', or describes a flow with if/else logic and multiple participants. Even if the user just pastes a wall of text describing who does what — trigger this skill."
---

# bpmn-generator SKILL

## Purpose

Parse process descriptions → generate valid BPMN 2.0 XML with embedded layout coordinates (DI section). Output opens directly in bpmn.io, Camunda Modeler, or any BPMN-compliant tool — no manual layout needed.

---

## Pipeline

```
Input (text / SRS / .md / .txt)
        │
        ▼
  Step 1: PARSE
  → Extract actors, tasks, decisions, cross-actor flows
        │
        ▼
  Step 2: MAP TO BPMN
  → Convert parsed elements to BPMN 2.0 element types
        │
        ▼
  Step 3: LAYOUT
  → Calculate x,y coordinates for every element
  → Read: references/layout-algorithm.md
        │
        ▼
  Step 4: GENERATE XML
  → Load: assets/xml-template.xml
  → Fill template with elements + DI coordinates
        │
        ▼
  Output: .bpmn file (valid BPMN 2.0 XML)
```

---

## Step 1: PARSE

Read the input text. Extract these 4 categories:

| Category | What to look for | Example |
|---|---|---|
| **Actors** | Who does something. Role names, department names, system names. | "Nhân viên", "Quản lý", "Hệ thống ERP" |
| **Tasks** | Actions/verbs tied to an actor. One verb phrase = one task. | "Gửi yêu cầu", "Phê duyệt đơn", "Ghi nhận vào hệ thống" |
| **Decisions** | If/else, conditions, approval/rejection branches. | "Nếu được duyệt → ..., Nếu từ chối → ..." |
| **Cross-actor flows** | When output of Actor A is input to Actor B. | "Nhân viên gửi đơn → Quản lý nhận đơn" |

**Parsing rules:**

- Each unique actor name → 1 Pool (with 1 Lane inside).
- Each action verb phrase → 1 Task element, assigned to the actor who performs it.
- Each condition → 1 Exclusive Gateway (XOR). If the text says "đồng thời" / "song song" / "parallel" → use Parallel Gateway.
- When a task in Pool A triggers a task in Pool B → create a Message Flow between them.
- Every pool must have exactly 1 Start Event and at least 1 End Event.
- If a decision branch leads to termination → End Event on that branch.

**Output of this step:** A structured list (internal, not shown to user):

```
actors: [Actor1, Actor2, ...]
flows:
  - actor: Actor1
    sequence: [StartEvent, Task1, Gateway1, Task2(yes), EndEvent1(no)]
  - actor: Actor2
    sequence: [StartEvent, Task3, EndEvent2]
message_flows:
  - from: Actor1.Task1 → to: Actor2.Task3
```

---

## Step 2: MAP TO BPMN ELEMENTS

Read `references/bpmn-elements.md` for the complete element catalogue and XML syntax.

**Core mapping table:**

| Parsed concept | BPMN Element | XML tag |
|---|---|---|
| Actor | Participant + Process | `<participant>` in `<collaboration>`, `<process>` |
| Task / Action | User Task | `<userTask>` |
| System action | Service Task | `<serviceTask>` |
| If/else condition | Exclusive Gateway | `<exclusiveGateway>` |
| Parallel split/join | Parallel Gateway | `<parallelGateway>` |
| Process start | Start Event | `<startEvent>` |
| Process end | End Event | `<endEvent>` |
| Cross-actor trigger | Message Flow | `<messageFlow>` |
| Sequential connection | Sequence Flow | `<sequenceFlow>` |

**ID convention:** Use descriptive, lowercase IDs with underscores.
- Participants: `participant_[actor_name]`
- Processes: `process_[actor_name]`
- Tasks: `task_[actor_name]_[short_desc]`
- Gateways: `gw_[actor_name]_[short_desc]`
- Events: `start_[actor_name]`, `end_[actor_name]_[n]`
- Sequence flows: `sf_[source]_to_[target]`
- Message flows: `mf_[source]_to_[target]`

---

## Step 3: LAYOUT

Read `references/layout-algorithm.md` before calculating coordinates.

This is the most critical step. Every BPMN element needs x,y coordinates in the DI (Diagram Interchange) section, otherwise the diagram renders as a pile of overlapping boxes.

**Quick reference (details in layout-algorithm.md):**

- Pool height: 200px per pool. Vertical gap between pools: 40px.
- Element spacing: 170px horizontal between elements in a sequence.
- Element sizes: Task = 100×80, Gateway = 50×50, Event = 36×36.
- Gateway branches: "yes" branch continues right, "no" branch drops down 100px then continues right, both merge back at a join gateway.
- Message flows: vertical lines connecting elements across pools at the same x-position.
- Pool width: auto-calculated from the number of elements in the longest sequence × 170 + padding.

---

## Step 4: GENERATE XML

Load `assets/xml-template.xml` as the skeleton.

Fill in 3 sections:

1. **`<collaboration>`** — All `<participant>` and `<messageFlow>` elements.
2. **`<process>`** blocks — One per actor. Contains all tasks, gateways, events, and sequence flows for that actor.
3. **`<bpmndi:BPMNDiagram>`** — All `<bpmndi:BPMNShape>` and `<bpmndi:BPMNEdge>` elements with calculated coordinates.

**XML generation rules:**

- Namespace must be `http://www.omg.org/spec/BPMN/20100524/MODEL`.
- Every element in `<process>` must have a corresponding `<bpmndi:BPMNShape>` in the DI section.
- Every flow (sequence + message) must have a corresponding `<bpmndi:BPMNEdge>` with waypoints.
- Sequence flow waypoints: horizontal lines (same y) between consecutive elements.
- Message flow waypoints: vertical lines (same x) between elements in different pools.
- Gateway conditions: the sequence flow leaving a gateway toward the "yes" branch should have `name="Yes"`, the "no" branch `name="No"`.

---

## Output Rules

1. Output the complete `.bpmn` file. Save to `/mnt/user-data/outputs/[descriptive_name].bpmn`.
2. Also output a brief summary listing: number of pools, number of tasks, number of gateways, and message flows.
3. No intro sentences. No "Here is your BPMN file." Just the file + summary.
4. If the input is ambiguous about actors or flow logic → ask ONE clarifying question before generating. Don't guess on critical structure.

---

## Complexity Scope

**Currently supported (v1):**
- Pools with single lanes
- User Tasks, Service Tasks
- Exclusive Gateways (XOR), Parallel Gateways (AND)
- Start Events, End Events
- Sequence Flows, Message Flows

**NOT yet supported (future expansion):**
- Sub-processes
- Data Objects / Data Stores
- Intermediate Events (Timer, Message, Signal)
- Event-based Gateways
- Annotations / Text Annotations
- Multiple lanes per pool
- Loop / Multi-instance markers

If user requests unsupported elements → note what was skipped and why, then generate with supported elements only.

---

## Error Handling

| Situation | Action |
|---|---|
| No actors found in text | Ask: "Tôi không xác định được ai thực hiện quy trình. Bạn liệt kê các actor/vai trò?" |
| Single actor only | Generate with 1 pool, no message flows. This is valid. |
| Circular flow detected | Break the cycle at the most logical point, add a note. |
| Text too vague (< 2 tasks) | Ask for more detail before generating. |
| Gateway with no merge | Add End Event to the dangling branch. |
