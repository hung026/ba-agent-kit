# Layout Algorithm — BPMN DI Coordinate Calculation

This document defines the exact formulas for calculating x,y coordinates of every BPMN element in the DI (Diagram Interchange) section. Follow these formulas precisely to produce clean, non-overlapping layouts.

---

## Table of Contents

1. [Constants](#1-constants)
2. [Pool Layout](#2-pool-layout)
3. [Element Positioning Within Pools](#3-element-positioning-within-pools)
4. [Gateway Branch Layout](#4-gateway-branch-layout)
5. [Message Flow Layout](#5-message-flow-layout)
6. [Waypoint Calculation](#6-waypoint-calculation)
7. [Worked Example](#7-worked-example)

---

## 1. Constants

```
POOL_HEADER_WIDTH    = 30        # Width of the left label strip of the pool
POOL_INTERNAL_LEFT   = 60        # Left padding inside pool (after header)
POOL_HEIGHT          = 200       # Height of one pool (single lane)
POOL_GAP             = 40        # Vertical gap between pools
POOL_TOP_PADDING     = 160       # Top margin for the first pool

ELEMENT_H_SPACING    = 170       # Horizontal spacing between element centers
BRANCH_V_OFFSET      = 100       # Vertical offset for "no" branch of gateway

TASK_W               = 100       # Task box width
TASK_H               = 80        # Task box height
GATEWAY_W            = 50        # Gateway diamond width
GATEWAY_H            = 50        # Gateway diamond height
EVENT_W              = 36        # Start/End event circle diameter
EVENT_H              = 36        # Start/End event circle diameter

LABEL_H              = 14        # Height of a BPMNLabel
LABEL_W              = 30        # Width of a BPMNLabel (approximation)
```

---

## 2. Pool Layout

Pools are stacked vertically. Each pool is a horizontal band.

### Pool Y position

```
pool_y(pool_index) = POOL_TOP_PADDING + pool_index × (POOL_HEIGHT + POOL_GAP)
```

Where `pool_index` is 0-based (first pool = 0, second = 1, ...).

**Example:**
- Pool 0 (Employee): y = 160
- Pool 1 (Manager):  y = 160 + 1 × (200 + 40) = 400
- Pool 2 (System):   y = 160 + 2 × (200 + 40) = 640

### Pool Width

```
pool_width = POOL_HEADER_WIDTH + POOL_INTERNAL_LEFT + (max_elements_in_sequence × ELEMENT_H_SPACING) + 100
```

Where `max_elements_in_sequence` = the longest chain of elements in that pool (counting gateway branches as 1 column each, but including the extra columns for split/merge patterns).

**All pools should use the same width** = the maximum pool_width across all pools. This ensures visual alignment.

### Pool Bounds (DI)

```xml
<dc:Bounds x="160" y="{pool_y}" width="{pool_width}" height="200" />
```

The x=160 is a left margin constant. All pools start at the same x.

---

## 3. Element Positioning Within Pools

Elements flow left-to-right within their pool. Each element occupies a "column."

### Column X position

```
col_x(col_index) = 160 + POOL_HEADER_WIDTH + POOL_INTERNAL_LEFT + col_index × ELEMENT_H_SPACING
```

Where `col_index` is 0-based. The start event is always column 0.

**Example (pool starting at x=160):**
- Column 0 (Start Event): x = 160 + 30 + 60 + 0 × 170 = 250
- Column 1 (Task 1):      x = 250 + 170 = 420
- Column 2 (Gateway):     x = 250 + 340 = 590
- Column 3 (Task 2):      x = 250 + 510 = 760

### Element Y position (main lane — center of pool)

The "main lane" y positions center elements vertically within the pool.

```
center_y(pool_index) = pool_y(pool_index) + (POOL_HEIGHT / 2)
```

For each element type, offset from center:

```
task_y      = center_y - (TASK_H / 2)        = center_y - 40
gateway_y   = center_y - (GATEWAY_H / 2)     = center_y - 25
event_y     = center_y - (EVENT_H / 2)       = center_y - 18
```

**Example for Pool 0 (y=160):**
- center_y = 160 + 100 = 260
- Task y = 260 - 40 = 220
- Gateway y = 260 - 25 = 235
- Event y = 260 - 18 = 242

---

## 4. Gateway Branch Layout

When a gateway splits into 2 branches (e.g., Yes/No):

### "Yes" branch (continues straight)

The "Yes" branch continues at the same y as the main lane. Elements after the gateway on the "Yes" path occupy the next columns at the same y.

### "No" branch (drops down)

The "No" branch drops below the main lane.

```
no_branch_y = center_y + BRANCH_V_OFFSET / 2
```

Elements on the "No" branch use `no_branch_y` as their new center for vertical positioning:

```
no_task_y    = no_branch_y - (TASK_H / 2)
no_event_y   = no_branch_y - (EVENT_H / 2)
```

### Column allocation for branches

```
col:    ... | GW_SPLIT | YES_TASK | NO_TASK | GW_MERGE | NEXT_TASK | ...
index:  ... |    N     |   N+1   |   N+1   |   N+2    |    N+3    | ...
```

If Yes and No branches have DIFFERENT lengths:
- The shorter branch pads its last element to the same column as the merge gateway.
- Merge gateway column = max(yes_last_col, no_last_col) + 1.

### Merge gateway

Place at the column after the longest branch. Y position = same as split gateway (main lane).

---

## 5. Message Flow Layout

Message flows connect elements across different pools. They render as vertical dashed arrows.

### Alignment rule

When Actor A's task triggers Actor B's task, both tasks should be in the **same column** (same col_index). This makes the message flow a clean vertical line.

If alignment isn't possible (because sequences have different lengths), use the closest column and add a slight horizontal offset (20px) to the waypoint to avoid overlapping with other elements.

### Message flow waypoints

```
source_x = col_x(source_col) + element_width/2     # horizontal center of source
source_y = pool_y(source_pool) + POOL_HEIGHT        # bottom edge of source pool

target_x = source_x                                  # same x for vertical line
target_y = pool_y(target_pool)                       # top edge of target pool
```

This creates a clean vertical line from the bottom of one pool to the top of the next.

---

## 6. Waypoint Calculation

### Sequence Flow (horizontal, same lane)

```
waypoint_1_x = source_element_x + source_element_width
waypoint_1_y = center_y(pool)

waypoint_2_x = target_element_x
waypoint_2_y = center_y(pool)
```

Adjust for element type:
- Event: right edge = event_x + EVENT_W, center_y = event_y + EVENT_H/2
- Task: right edge = task_x + TASK_W, center_y = task_y + TASK_H/2
- Gateway: right edge = gateway_x + GATEWAY_W, center_y = gateway_y + GATEWAY_H/2

### Sequence Flow (gateway → "No" branch, goes down then right)

3 waypoints:

```
wp1_x = gateway_x + GATEWAY_W / 2    # center bottom of gateway
wp1_y = gateway_y + GATEWAY_H         # bottom of gateway

wp2_x = wp1_x                         # straight down
wp2_y = no_branch_center_y            # target row

wp3_x = target_element_x              # right to target
wp3_y = wp2_y                         # same y as target
```

### Sequence Flow (merge gateway, "No" branch rejoins)

3 waypoints:

```
wp1_x = no_branch_element_x + element_width    # right edge of last "No" element
wp1_y = no_branch_center_y                      # No branch row

wp2_x = merge_gateway_x                         # align to merge gw
wp2_y = wp1_y                                    # horizontal

wp3_x = merge_gateway_x                         # same x
wp3_y = merge_gateway_y + GATEWAY_H / 2          # center of merge gw
```

Actually simpler: use 2 waypoints going right then up:

```
wp1_x = source_right_edge
wp1_y = no_branch_center_y

wp2_x = merge_gw_x + GATEWAY_W / 2
wp2_y = no_branch_center_y

wp3_x = merge_gw_x + GATEWAY_W / 2
wp3_y = merge_gw_y + GATEWAY_H     # bottom of merge gateway
```

Or even simpler — connect to left edge of merge gateway:

```
wp1_x = source_right_edge
wp1_y = no_branch_center_y

wp2_x = merge_gw_x
wp2_y = merge_gw_center_y
```

Use whichever produces a cleaner-looking path (fewer bends = better).

---

## 7. Worked Example

**Scenario:** Employee submits request → Manager reviews → Approves (sign) or Rejects (notify employee). System sends email.

### Pools
- Pool 0: Employee (y=160)
- Pool 1: Manager (y=400)
- Pool 2: System (y=640)

### Element positions (Pool 1 — Manager)

| Col | Element | Type | x | y (bounds) | Size |
|-----|---------|------|---|------------|------|
| 0 | start_manager | StartEvent | 250 | 482 | 36×36 |
| 1 | task_manager_receive | UserTask | 420 | 460 | 100×80 |
| 2 | gw_manager_approve | ExclusiveGW | 590 | 475 | 50×50 |
| 3 (yes) | task_manager_sign | UserTask | 760 | 460 | 100×80 |
| 3 (no) | task_manager_reject | UserTask | 760 | 530 | 100×80 |
| 4 | gw_manager_merge | ExclusiveGW | 930 | 475 | 50×50 |
| 5 | end_manager | EndEvent | 1100 | 482 | 36×36 |

**center_y for Pool 1** = 400 + 100 = 500

### Calculation verification:
- start_manager y = 500 - 18 = 482 ✓
- task y = 500 - 40 = 460 ✓
- gateway y = 500 - 25 = 475 ✓
- no_branch center = 500 + 50 = 550 → task_reject y = 550 - 40 = 510

### Pool width calculation:
- Longest sequence: 6 columns (start → receive → gw_split → task → gw_merge → end)
- pool_width = 30 + 60 + (6 × 170) + 100 = 1210

All pools use width = max(1210, other_pool_widths).

---

## Quick Checklist Before Generating DI

- [ ] Every element has a BPMNShape with correct bounds
- [ ] Every flow has a BPMNEdge with 2-3 waypoints
- [ ] Waypoints connect to element edges, not centers (except for events)
- [ ] Pool bounds encompass all child elements
- [ ] All pools have the same width
- [ ] No element bounds overlap within the same pool
- [ ] Gateway branches don't overlap with main lane elements
- [ ] Message flow waypoints are vertical (same x)
- [ ] Labels on gateway branches are positioned above/below the edge
