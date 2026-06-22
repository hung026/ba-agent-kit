# BPMN 2.0 Elements Catalogue (v2)

Reference for all elements used by the bpmn-generator skill. Each entry includes purpose, XML syntax, and DI notes. v2 adds **Message Start Events** and the **reactive-pool pattern** that fix the "Start in every lane" and "false internal pipeline" bugs.

---

## Contents

1. Collaboration Elements
2. Process Container
3. Events (plain Start, Message Start, End)
4. Tasks
5. Gateways
6. Flows
7. Initiating vs Reactive Pools (patterns)
8. DI Shape / Edge Reference
9. Common Mistakes

---

## 1. Collaboration Elements

```xml
<collaboration id="collaboration_1">
  <!-- participants (pools) -->
  <!-- messageFlows -->
</collaboration>
```

### Participant

```xml
<participant id="participant_app" name="Mobile App" processRef="process_app" />
```

- One per actor. `name` = pool header label. `processRef` = matching `<process>` id.

---

## 2. Process Container

```xml
<process id="process_app" isExecutable="false">
  <!-- events, tasks, gateways, sequence flows -->
</process>
```

- `id` matches the `processRef`. `isExecutable="false"` for documentation diagrams.
- Must contain at least one start (plain OR message) and at least one End Event.

---

## 3. Events

### Plain Start Event — initiating pool ONLY

```xml
<startEvent id="start_user" name="Start">
  <outgoing>sf_start_user_to_task1</outgoing>
</startEvent>
```

- Use in exactly one pool: the actor who initiates the whole flow.
- No incoming sequence flow; exactly one outgoing. DI: 36×36.

### Message Start Event — reactive pools

Use when a pool's activity only begins because another pool sends it a message. This is a `<startEvent>` carrying a `<messageEventDefinition>`.

```xml
<startEvent id="start_dify_upload" name="Nhận yêu cầu upload">
  <messageEventDefinition id="msgdef_dify_upload" />
  <outgoing>sf_start_dify_upload_to_task_dify_process</outgoing>
</startEvent>
```

- No incoming **sequence** flow. It IS the target of an incoming **message** flow.
- A reactive pool may contain **several** Message Start Events — one per independent request it handles (see §7, Rule C). Multiple start events in one process are valid for documentation BPMN.
- DI: 36×36 circle; bpmn.io draws the envelope marker automatically from the `messageEventDefinition`.

### End Event

```xml
<endEvent id="end_app_1" name="End">
  <incoming>sf_xxx_to_end_app_1</incoming>
</endEvent>
```

- At least one per process; multiple allowed (e.g. one per terminating branch/fragment).
- At least one incoming; no outgoing. DI: 36×36.

---

## 4. Tasks

### User Task — human action

```xml
<userTask id="task_user_send" name="Nhập text và nhấn Gửi">
  <incoming>sf_a_to_send</incoming>
  <outgoing>sf_send_to_b</outgoing>
</userTask>
```

### Service Task — system/automated action

```xml
<serviceTask id="task_app_upload" name="POST /upload lên Dify">
  <incoming>sf_a_to_upload</incoming>
  <outgoing>sf_upload_to_gw</outgoing>
</serviceTask>
```

- `<incoming>`/`<outgoing>` list connected sequence-flow IDs. DI: 100×80.
- A task may be the source/target of a message flow without listing it in incoming/outgoing (message flows are not sequence flows).

---

## 5. Gateways

### Exclusive Gateway (XOR)

Split (1-in, 2+-out):

```xml
<exclusiveGateway id="gw_app_upload" name="Upload thành công?">
  <incoming>sf_upload_to_gw</incoming>
  <outgoing>sf_gw_to_backup</outgoing>
  <outgoing>sf_gw_to_fail</outgoing>
</exclusiveGateway>
```

Merge (2+-in, 1-out):

```xml
<exclusiveGateway id="gw_app_merge" name="">
  <incoming>sf_branchA_to_merge</incoming>
  <incoming>sf_branchB_to_merge</incoming>
  <outgoing>sf_merge_to_next</outgoing>
</exclusiveGateway>
```

### Parallel Gateway (AND)

```xml
<parallelGateway id="gw_split" name="">
  <incoming>sf_in</incoming>
  <outgoing>sf_b1</outgoing>
  <outgoing>sf_b2</outgoing>
</parallelGateway>
```

- Split: 1-in, 2+-out. Merge: 2+-in, 1-out. DI: 50×50, `isMarkerVisible="true"` for XOR.
- Label XOR branch flows ("Có"/"Không" or a condition). Every split needs a merge OR each branch ends in an End Event.

---

## 6. Flows

### Sequence Flow — within ONE pool, between ADJACENT steps

```xml
<sequenceFlow id="sf_a_to_b" sourceRef="task_a" targetRef="task_b" />
<sequenceFlow id="sf_gw_to_yes" name="Có"   sourceRef="gw_x" targetRef="task_yes" />
<sequenceFlow id="sf_gw_to_no"  name="Không" sourceRef="gw_x" targetRef="task_no" />
```

- `sourceRef`/`targetRef` are in the SAME process. Cannot cross pools.
- **Do not** connect two steps that are not actually consecutive. In particular, if a reactive service handles request 1, replies, and only later handles request 2 (with the orchestrator working in between), the two handlers are separate fragments — no sequence flow between them.

### Message Flow — ACROSS pools

```xml
<messageFlow id="mf_app_to_dify_upload" name="Upload file"
             sourceRef="task_app_upload" targetRef="start_dify_upload" />
```

- Defined inside `<collaboration>`, not inside a process.
- `sourceRef`/`targetRef` are in DIFFERENT pools.
- Can target a Message Start Event, an intermediate event, a task, or a participant.
- **Every** cross-lane interaction in the source produces one message flow; request and response are two flows. Never omit the initiating actor's wake-up message to the next pool.

---

## 7. Initiating vs Reactive Pools (patterns)

### Initiating pool

```
[plain Start] → task → ... → [End]
```
The only pool with a plain Start. It owns the trigger of the whole process.

### Reactive pool — single handler

```
[Message Start Event]  → task(s) →  [End]
        ▲
   message flow from the orchestrator's sending task
```

### Reactive pool — multiple independent handlers (Rule C)

A service called more than once, with the orchestrator doing work between calls, becomes multiple disconnected fragments in the same pool:

```
fragment 1:  [MsgStart: receive /upload]    → task: xử lý upload   → [End]
fragment 2:  [MsgStart: receive /chat-msgs] → task: forward to GPT → task: return result → [End]
```

- No sequence flow links fragment 1 to fragment 2.
- Each fragment's entry is the target of its own message flow.
- Relative order is conveyed by the orchestrator's message flows, not by internal sequencing.

This is exactly how a request/response service from a sequence diagram should be modelled — it prevents inventing a pipeline like `receive_upload → receive_chat` that does not exist.

---

## 8. DI Shape / Edge Reference

### Shapes

```xml
<bpmndi:BPMNShape id="shape_participant_app" bpmnElement="participant_app" isHorizontal="true">
  <dc:Bounds x="160" y="400" width="2570" height="320" />   <!-- branch pool: taller -->
</bpmndi:BPMNShape>

<bpmndi:BPMNShape id="shape_start_user" bpmnElement="start_user">
  <dc:Bounds x="250" y="242" width="36" height="36" />
</bpmndi:BPMNShape>

<bpmndi:BPMNShape id="shape_task_app_upload" bpmnElement="task_app_upload">
  <dc:Bounds x="1440" y="460" width="100" height="80" />
</bpmndi:BPMNShape>

<bpmndi:BPMNShape id="shape_gw_app_upload" bpmnElement="gw_app_upload" isMarkerVisible="true">
  <dc:Bounds x="1610" y="475" width="50" height="50" />
</bpmndi:BPMNShape>
```

A Message Start Event uses the same 36×36 circle shape as a plain Start; the envelope marker is drawn from its `messageEventDefinition`.

### Edges

```xml
<!-- sequence flow, straight -->
<bpmndi:BPMNEdge id="edge_sf_a_to_b" bpmnElement="sf_a_to_b">
  <di:waypoint x="520" y="500" />
  <di:waypoint x="590" y="500" />
</bpmndi:BPMNEdge>

<!-- gateway "Không" branch, down then right -->
<bpmndi:BPMNEdge id="edge_sf_gw_to_no" bpmnElement="sf_gw_to_no">
  <di:waypoint x="1635" y="525" />
  <di:waypoint x="1635" y="620" />
  <di:waypoint x="1780" y="620" />
</bpmndi:BPMNEdge>

<!-- message flow, vertical across pools -->
<bpmndi:BPMNEdge id="edge_mf_app_to_dify_upload" bpmnElement="mf_app_to_dify_upload">
  <di:waypoint x="1490" y="540" />   <!-- bottom edge of source task -->
  <di:waypoint x="1490" y="760" />   <!-- top of target pool / element -->
</bpmndi:BPMNEdge>
```

---

## 9. Common Mistakes

| Mistake | Fix |
|---|---|
| Plain Start Event in a reactive pool | Use a Message Start Event; only the initiating pool gets a plain Start |
| Every lane has an identical Start circle | Symptom of the above — re-check which actor truly initiates |
| Dropped/merged a cross-lane interaction "for cleanliness" | Keep every interaction as a message flow; request+response = 2 flows |
| No arrow from initiating lane into the next lane | Add the wake-up message flow |
| Two non-adjacent service handlers joined by a sequence flow | Split into separate fragments (no sequence flow between them) |
| Branch tasks overlap the main lane | Branch pool height 320, branch offset 120 (layout-algorithm.md) |
| Pool tops via index × fixed height | Compute cumulatively from real per-pool heights |
| Sequence flow crosses a pool boundary | Use a message flow instead |
| Gateway with a single outgoing flow | Remove it or add the missing branch |
| Element ID with spaces/uppercase | lowercase + underscores |
| Missing BPMNShape/BPMNEdge for an element/flow | Every element and flow needs its DI entry |