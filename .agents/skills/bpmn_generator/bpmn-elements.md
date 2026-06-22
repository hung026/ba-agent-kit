# BPMN 2.0 Elements Catalogue

Complete reference for all BPMN elements used by the bpmn-generator skill. Each entry includes: purpose, XML syntax, and DI shape specification.

---

## Table of Contents

1. [Collaboration Elements](#1-collaboration-elements)
2. [Process Container](#2-process-container)
3. [Events](#3-events)
4. [Tasks](#4-tasks)
5. [Gateways](#5-gateways)
6. [Flows](#6-flows)
7. [DI Shape Reference](#7-di-shape-reference)
8. [DI Edge Reference](#8-di-edge-reference)
9. [Common Mistakes](#9-common-mistakes)

---

## 1. Collaboration Elements

### Collaboration Container

Wraps all participants and message flows. Required when there are 2+ pools.

```xml
<collaboration id="collaboration_1">
  <!-- participants go here -->
  <!-- messageFlows go here -->
</collaboration>
```

### Participant

Represents one actor/role/system. Links to a `<process>` via `processRef`.

```xml
<participant id="participant_manager" name="Quản lý" processRef="process_manager" />
```

**Rules:**
- One `<participant>` per actor.
- `name` = display label shown on the pool header.
- `processRef` must match the `id` of the corresponding `<process>`.

---

## 2. Process Container

One `<process>` per participant. Contains all flow elements for that actor.

```xml
<process id="process_manager" isExecutable="false">
  <!-- startEvent, tasks, gateways, endEvent, sequenceFlows -->
</process>
```

**Rules:**
- `id` must match the `processRef` in the corresponding `<participant>`.
- `isExecutable="false"` for documentation diagrams.
- Every process must contain at least: 1 startEvent + 1 task + 1 endEvent.

---

## 3. Events

### Start Event

```xml
<startEvent id="start_manager" name="Start" />
```

- Exactly 1 per process.
- No incoming sequence flows.
- Exactly 1 outgoing sequence flow.
- DI size: 36×36 px.

### End Event

```xml
<endEvent id="end_manager_1" name="End" />
```

- At least 1 per process. Can have multiple (e.g., one per gateway branch that terminates).
- At least 1 incoming sequence flow.
- No outgoing sequence flows.
- DI size: 36×36 px.

---

## 4. Tasks

### User Task

For actions performed by a human actor.

```xml
<userTask id="task_manager_review" name="Xem xét yêu cầu">
  <incoming>sf_start_to_review</incoming>
  <outgoing>sf_review_to_gw</outgoing>
</userTask>
```

### Service Task

For actions performed by a system/automated process.

```xml
<serviceTask id="task_system_notify" name="Gửi email thông báo">
  <incoming>sf_approve_to_notify</incoming>
  <outgoing>sf_notify_to_end</outgoing>
</serviceTask>
```

**Task rules:**
- `<incoming>` and `<outgoing>` list the IDs of connected sequence flows.
- A task can have multiple incoming (merge point) or multiple outgoing (not recommended — use gateway instead).
- DI size: 100×80 px.
- `name` = display label shown inside the task box.

---

## 5. Gateways

### Exclusive Gateway (XOR)

One incoming path, multiple outgoing paths — only ONE is taken based on condition.

```xml
<exclusiveGateway id="gw_manager_approve" name="Duyệt?">
  <incoming>sf_review_to_gw</incoming>
  <outgoing>sf_gw_to_yes</outgoing>
  <outgoing>sf_gw_to_no</outgoing>
</exclusiveGateway>
```

**Split pattern** (1 in → 2+ out): Place after a task. Each outgoing sequence flow gets a condition label.

**Merge pattern** (2+ in → 1 out): Place before a task to rejoin branches.

```xml
<exclusiveGateway id="gw_manager_merge" name="">
  <incoming>sf_branch1_to_merge</incoming>
  <incoming>sf_branch2_to_merge</incoming>
  <outgoing>sf_merge_to_next</outgoing>
</exclusiveGateway>
```

### Parallel Gateway (AND)

All outgoing paths are taken simultaneously. Used for "đồng thời" / "parallel" / "cùng lúc".

```xml
<parallelGateway id="gw_system_parallel_split" name="">
  <incoming>sf_task_to_split</incoming>
  <outgoing>sf_split_to_branch1</outgoing>
  <outgoing>sf_split_to_branch2</outgoing>
</parallelGateway>
```

**Gateway rules:**
- Split gateway: 1 incoming, 2+ outgoing.
- Merge/join gateway: 2+ incoming, 1 outgoing.
- Every split MUST have a corresponding merge downstream (except when branches terminate with End Events).
- DI size: 50×50 px (diamond shape).
- For XOR split: label outgoing flows with "Yes"/"No" or descriptive condition.

---

## 6. Flows

### Sequence Flow

Connects elements WITHIN the same process. Represents the order of execution.

```xml
<sequenceFlow id="sf_start_to_review" sourceRef="start_manager" targetRef="task_manager_review" />
```

With condition label (used after gateways):

```xml
<sequenceFlow id="sf_gw_to_yes" name="Yes" sourceRef="gw_manager_approve" targetRef="task_manager_sign" />
<sequenceFlow id="sf_gw_to_no" name="No" sourceRef="gw_manager_approve" targetRef="task_manager_reject" />
```

**Rules:**
- `sourceRef` and `targetRef` must be IDs of elements in the SAME process.
- Sequence flows cannot cross pool boundaries.
- The `name` attribute is optional. Use it for gateway branch labels only.

### Message Flow

Connects elements ACROSS different pools. Represents communication between actors.

```xml
<messageFlow id="mf_emp_submit_to_mgr_receive" name="Gửi yêu cầu" 
             sourceRef="task_employee_submit" targetRef="task_manager_receive" />
```

**Rules:**
- Defined inside `<collaboration>`, NOT inside `<process>`.
- `sourceRef` and `targetRef` MUST be in DIFFERENT processes/pools.
- Message flows cannot connect elements in the same pool.
- Can connect to: tasks, events, or the pool itself (participant ID).

---

## 7. DI Shape Reference

Every element needs a `<bpmndi:BPMNShape>` in the DI section.

### Pool Shape

```xml
<bpmndi:BPMNShape id="shape_participant_manager" bpmnElement="participant_manager" isHorizontal="true">
  <dc:Bounds x="160" y="0" width="1200" height="200" />
</bpmndi:BPMNShape>
```

- `isHorizontal="true"` always for horizontal pools.
- `width` = calculated from number of elements (see layout-algorithm.md).
- `height` = 200 (single lane).

### Task Shape

```xml
<bpmndi:BPMNShape id="shape_task_manager_review" bpmnElement="task_manager_review">
  <dc:Bounds x="380" y="60" width="100" height="80" />
</bpmndi:BPMNShape>
```

### Gateway Shape

```xml
<bpmndi:BPMNShape id="shape_gw_manager_approve" bpmnElement="gw_manager_approve" isMarkerVisible="true">
  <dc:Bounds x="555" y="75" width="50" height="50" />
</bpmndi:BPMNShape>
```

- `isMarkerVisible="true"` for exclusive gateways (shows the X marker).

### Event Shape

```xml
<bpmndi:BPMNShape id="shape_start_manager" bpmnElement="start_manager">
  <dc:Bounds x="242" y="82" width="36" height="36" />
</bpmndi:BPMNShape>
```

---

## 8. DI Edge Reference

Every flow (sequence + message) needs a `<bpmndi:BPMNEdge>` with waypoints.

### Sequence Flow Edge (horizontal)

```xml
<bpmndi:BPMNEdge id="edge_sf_start_to_review" bpmnElement="sf_start_to_review">
  <di:waypoint x="278" y="100" />
  <di:waypoint x="380" y="100" />
</bpmndi:BPMNEdge>
```

- For straight horizontal lines: 2 waypoints, same y, different x.
- Source waypoint x = source element's right edge (x + width).
- Target waypoint x = target element's left edge (x).

### Sequence Flow Edge (with bend — gateway branch)

For the "no" branch that goes down then right:

```xml
<bpmndi:BPMNEdge id="edge_sf_gw_to_no" bpmnElement="sf_gw_to_no">
  <di:waypoint x="580" y="125" />
  <di:waypoint x="580" y="170" />
  <di:waypoint x="650" y="170" />
</bpmndi:BPMNEdge>
```

- 3 waypoints: down from gateway bottom → horizontal to target.

### Message Flow Edge (vertical, cross-pool)

```xml
<bpmndi:BPMNEdge id="edge_mf_emp_to_mgr" bpmnElement="mf_emp_submit_to_mgr_receive">
  <di:waypoint x="430" y="200" />
  <di:waypoint x="430" y="300" />
</bpmndi:BPMNEdge>
```

- 2 waypoints: same x, different y (vertical line between pools).

### BPMNLabel (for named flows)

```xml
<bpmndi:BPMNEdge id="edge_sf_gw_to_yes" bpmnElement="sf_gw_to_yes">
  <di:waypoint x="605" y="100" />
  <di:waypoint x="700" y="100" />
  <bpmndi:BPMNLabel>
    <dc:Bounds x="630" y="82" width="30" height="14" />
  </bpmndi:BPMNLabel>
</bpmndi:BPMNEdge>
```

- Label positioned slightly above the edge midpoint.

---

## 9. Common Mistakes

| Mistake | Fix |
|---|---|
| Sequence flow crosses pool boundary | Use message flow instead |
| Missing DI shape for an element | Every element in `<process>` and `<collaboration>` needs a BPMNShape or BPMNEdge |
| Gateway with only 1 outgoing flow | Gateway needs 2+ outgoing. If only 1 path, remove gateway |
| Process has no start event | Always add exactly 1 start event per process |
| Message flow inside same pool | Message flows only between different pools |
| Element ID contains spaces | Use underscores, lowercase only |
| Waypoints don't connect to element edges | Calculate waypoints from element position + size |
| Missing incoming/outgoing references in tasks | Every task should declare its incoming/outgoing flow IDs |
| Pool width too small | Calculate: (max_elements_in_sequence × 170) + 200 padding |
