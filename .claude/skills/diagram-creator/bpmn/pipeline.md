---
name: bpmn-generator
description: "Generate BPMN 2.0 XML diagrams from text descriptions, SRS documents, sequence/activity diagrams, or process specifications. Use this skill whenever the user pastes process descriptions, workflow text, SRS content, UML diagrams (PlantUML/Mermaid sequence or activity), or explicitly asks to 'vẽ diagram', 'tạo BPMN', 'generate workflow', 'vẽ quy trình', 'create process diagram', or uploads any document describing a business process with actors, steps, and decisions. Also trigger when user says 'BPMN', 'business process', 'workflow diagram', or describes a flow with if/else logic and multiple participants. Even if the user just pastes a wall of text describing who does what — trigger this skill."
---

# bpmn-generator SKILL

## Purpose

Parse process descriptions → generate valid BPMN 2.0 XML with embedded layout coordinates (DI section). Output opens directly in bpmn.io, Camunda Modeler, or any BPMN-compliant tool — no manual layout needed.

---

## Pipeline

```
Input (text / SRS / sequence diagram / activity diagram / .md / .txt)
        │
        ▼
  Step 1: PARSE
  → Extract actors, tasks, decisions, cross-actor flows
  → Identify the ONE initiating actor; mark all others reactive
        │
        ▼
  Step 2: MAP TO BPMN
  → Convert parsed elements to BPMN 2.0 element types
  → Initiating pool gets a plain Start; reactive pools get Message Start(s)
        │
        ▼
  Step 3: LAYOUT
  → Calculate x,y coordinates for every element
  → Read: layout-algorithm.md (variable pool heights + cumulative pool_y)
        │
        ▼
  Step 4: GENERATE XML
  → Load: xml-template.xml
  → Fill template with elements + DI coordinates
        │
        ▼
  Output: .bpmn file (valid BPMN 2.0 XML)
```

---

## Three Non-Negotiable Rules

These three rules override convenience, brevity, and aesthetics. They exist because the most common failure modes come from violating them. Apply them by default to every diagram — especially when the input is a sequence/activity diagram.

### Rule A — Only the initiating lane has a plain Start Event

A BPMN diagram describes ONE process instance. Exactly one actor kicks it off; every other actor only acts when it receives a message. Therefore:

- **The initiating pool** (the actor who performs the very first action with no inbound trigger) gets exactly **one plain Start Event** at column 0.
- **Every reactive pool** (an actor whose first activity is triggered by a message from another pool) gets a **Message Start Event** — a `<startEvent>` carrying a `<messageEventDefinition>` — placed at the column where the triggering message arrives, NOT at column 0.
- Never give a reactive pool a plain "blank" Start Event. A wall of identical Start circles across every lane is the signature of this bug.

### Rule B — Keep every cross-lane interaction. Never trim.

Every interaction `A → B` present in the source MUST produce exactly one Message Flow. Do not drop, merge, or "simplify for cleanliness" any cross-lane arrow.

- The message flow that the initiating actor uses to wake the next pool MUST exist — without it the lanes look disconnected and the diagram is wrong.
- Request and response are two separate interactions → two separate message flows (e.g. App→Dify "upload" and Dify→App "file IDs").

### Rule C — Do not connect a reactive service's fragments across a round-trip

A reactive service often "wakes up" more than once. If Actor B receives a message from A, responds, and then LATER receives another message from A — with A doing other work in between — the two handlers of B are **separate fragments**. They are NOT sequential.

- Never join two such handlers with a `<sequenceFlow>`. Doing so invents an internal pipeline that does not exist.
- Model each handler as an independent fragment: `[Message Start Event] → [task(s)] → [End Event]`. A reactive pool may legally contain several such disconnected fragments. Their relative order is implied by the message flows from the orchestrator, not by sequence flows inside the pool.

---

## Step 1: PARSE

Read the input. Extract these categories:

| Category | What to look for | Example |
|---|---|---|
| **Actors** | Who does something. Roles, departments, systems, participants. | "Người dùng", "Mobile App", "Dify API" |
| **Tasks** | Actions/verbs tied to an actor. One verb phrase = one task. | "Upload file lên Dify", "Phân tích ảnh" |
| **Decisions** | If/else, alt/opt, conditions, success/failure branches. | "Upload thành công? → ..., thất bại → ..." |
| **Cross-actor flows** | Output of Actor A is input to Actor B (every `->` / message). | "App POST /upload → Dify nhận file" |
| **Initiating actor** | The single actor performing the first action with no inbound trigger. | The first `actor`/lifeline that acts in a sequence diagram. |

**Parsing rules:**

- Each unique actor → 1 Pool (single lane).
- Identify the **initiating actor** explicitly. Everyone else is **reactive**.
- Each action verb phrase → 1 Task, assigned to the actor who performs it.
- Each condition → 1 Exclusive Gateway (XOR). "đồng thời"/"song song"/"parallel" → Parallel Gateway.
- Each `A → B` interaction → 1 Message Flow (Rule B). A request and its response are two interactions.
- A reactive actor that handles multiple separate requests → multiple fragments (Rule C).
- Apply Rule A for Start Events: 1 plain Start in the initiating pool; Message Start(s) in reactive pools.
- If a decision branch terminates → its own End Event on that branch.

**Reading a sequence diagram specifically:**

- The first lifeline that sends the first message is the initiating actor.
- A message `A -> B` means: a task in A sends; B catches it. If B has no prior activity, the catch is a **Message Start Event** in B.
- A reply `B --> A` is a separate message flow FROM B's task back TO A.
- `alt/else` → XOR split with the two branches; branches that end the interaction → End Events.
- `opt` → XOR split where the "no" branch skips ahead (rejoin via merge gateway) or is omitted if it only adds a side effect.
- When B is asked again later by A (with A working in between), start a NEW fragment in B (Rule C).

**Output of this step (internal):**

```
initiating_actor: User
actors: [User, App, Dify, ...]
flows:
  - actor: User           # initiating → plain Start
    start: plain
    sequence: [Start, Task1, Task2, ..., End]
  - actor: Dify           # reactive → message start(s), maybe several fragments
    start: message
    fragments:
      - [MsgStart(receive upload), Task_process, End]      # fragment 1
      - [MsgStart(receive chat), Task_forward, Task_return, End]  # fragment 2 (NOT linked to fragment 1)
message_flows:
  - User.Task1 → App.MsgStart        # wake-up arrow (Rule B: required)
  - App.Task_upload → Dify.MsgStart(upload)
  - Dify.Task_process → App.GW_upload   # response
  ...
```

---

## Step 2: MAP TO BPMN ELEMENTS

Read `bpmn-elements.md` for the complete catalogue and XML syntax (including Message Start Events and reactive-pool patterns).

**Core mapping table:**

| Parsed concept | BPMN Element | XML tag |
|---|---|---|
| Actor | Participant + Process | `<participant>` in `<collaboration>`, `<process>` |
| Human action | User Task | `<userTask>` |
| System/automated action | Service Task | `<serviceTask>` |
| If/else condition | Exclusive Gateway | `<exclusiveGateway>` |
| Parallel split/join | Parallel Gateway | `<parallelGateway>` |
| Initiating pool start | Start Event (plain) | `<startEvent>` |
| Reactive pool entry | Message Start Event | `<startEvent>` + `<messageEventDefinition>` |
| Process end | End Event | `<endEvent>` |
| Cross-actor message | Message Flow | `<messageFlow>` |
| Sequential connection (same pool, adjacent) | Sequence Flow | `<sequenceFlow>` |

**ID convention** (lowercase, underscores):
- Participants: `participant_[actor]`; Processes: `process_[actor]`
- Tasks: `task_[actor]_[short_desc]`; Gateways: `gw_[actor]_[short_desc]`
- Plain start: `start_[actor]`; Message start: `start_[actor]_[trigger]`
- End: `end_[actor]_[n]`
- Sequence flows: `sf_[source]_to_[target]`; Message flows: `mf_[source]_to_[target]`

---

## Step 3: LAYOUT

Read `layout-algorithm.md` before calculating coordinates. The most common rendering bugs are layout bugs, so follow the formulas exactly. Key points it now enforces:

- **Variable pool heights**: a pool containing a gateway split is taller (320) than a linear pool (200), so branch tasks never overlap the main lane.
- **Cumulative pool_y**: because heights differ, each pool's top = previous pool's top + previous pool's height + gap. Do NOT use `index × fixed_height`.
- **Branch vertical offset = 120** (≥ task height + 40), guaranteeing a clear gap between the main-lane task and the dropped "No"-branch task.
- **Reactive pool entry column**: a Message Start Event sits at the column where its triggering message arrives (aligns the message flow into a clean vertical line), not at column 0.
- Element spacing: 170px horizontal. Sizes: Task 100×80, Gateway 50×50, Event 36×36.
- All pools share the same width = max needed across pools.

---

## Step 4: GENERATE XML

Load `xml-template.xml` as the skeleton. Fill 3 sections:

1. **`<collaboration>`** — all `<participant>` and ALL `<messageFlow>` elements (Rule B).
2. **`<process>`** blocks — one per actor. Initiating pool: 1 plain start. Reactive pool: Message Start Event(s); fragments NOT linked by sequence flow (Rule C).
3. **`<bpmndi:BPMNDiagram>`** — a `<bpmndi:BPMNShape>` for every element and a `<bpmndi:BPMNEdge>` for every flow, with calculated coordinates.

**XML generation rules:**

- Namespace `http://www.omg.org/spec/BPMN/20100524/MODEL`.
- Every process element has a matching `<bpmndi:BPMNShape>`; every flow has a matching `<bpmndi:BPMNEdge>`.
- Sequence flow waypoints: horizontal (same y) within a lane; "No" branch drops down then right.
- Message flow waypoints: vertical (same/near x) between the relevant element edges across pools.
- Gateway branch flows carry condition labels (e.g. `name="Có"` / `name="Không"`).
- A Message Start Event still gets a normal 36×36 circle shape; bpmn.io renders the envelope marker from the `messageEventDefinition`.

---

## Output Rules

1. Output the complete `.bpmn` file to `/mnt/user-data/outputs/[descriptive_name].bpmn`.
2. Then a brief summary: number of pools, tasks, gateways, message flows, and which actor is the initiator.
3. No filler ("Here is your BPMN file."). Just the file + summary.
4. If the input is ambiguous about the initiating actor or branch logic → ask ONE clarifying question before generating. Do not guess critical structure.

---

## Complexity Scope

**Supported (v2):**
- Pools with single lanes; variable pool heights
- User Tasks, Service Tasks
- Exclusive Gateways (XOR), Parallel Gateways (AND)
- Plain Start Events, **Message Start Events**, End Events (multiple per pool allowed)
- Reactive pools with **multiple disconnected fragments**
- Sequence Flows, Message Flows

**Not yet supported:**
- Sub-processes; Data Objects / Data Stores
- Intermediate Catch/Throw Events (timer/signal); Event-based Gateways
- Multiple lanes per pool; Loop / Multi-instance markers
- Text Annotations

If the user requests an unsupported element → note what was skipped and why, then generate with supported elements.

---

## Error Handling

| Situation | Action |
|---|---|
| No actors found | Ask: "Tôi không xác định được ai thực hiện quy trình. Bạn liệt kê các actor/vai trò?" |
| Cannot tell who initiates | Ask which actor starts the flow before generating (needed for Rule A). |
| Single actor only | One pool, plain Start, no message flows. Valid. |
| Reactive pool with a plain Start | Convert to Message Start Event (Rule A). |
| Two handlers of one service joined by sequence flow | Split into separate fragments (Rule C). |
| A cross-lane interaction has no message flow | Add the missing message flow (Rule B). |
| Branch tasks overlap in DI | Use the taller pool height + 120 branch offset from layout-algorithm.md. |
| Pool_y computed as index × fixed height | Recompute cumulatively (heights now vary). |
| Gateway with only 1 outgoing flow | Remove the gateway (needs 2+ out) or add the missing branch. |
| Gateway split with no merge and no End on a branch | Add a merge gateway or an End Event to the dangling branch. |
