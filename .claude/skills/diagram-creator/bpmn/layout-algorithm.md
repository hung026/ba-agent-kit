# Layout Algorithm — BPMN DI Coordinate Calculation (v2)

Exact formulas for x,y coordinates of every BPMN element in the DI section. Two bugs from v1 are fixed here:

1. **Branch overlap** — "No"-branch tasks used to sit only 50px below the main lane while being 80px tall, so they overlapped the main-lane task by 30px. The branch offset is now 120px.
2. **Pool stacking** — pools used to be stacked with a single fixed height (`index × 200`), which broke as soon as one pool was taller. Pool tops are now computed **cumulatively** from real per-pool heights.

---

## 1. Constants

```
POOL_LEFT            = 160       # x where every pool starts
POOL_HEADER_WIDTH    = 30        # left label strip of the pool
POOL_INTERNAL_LEFT   = 60        # left padding inside pool (after header)
POOL_TOP_PADDING     = 160       # top margin for the first pool
POOL_GAP             = 40        # vertical gap between pools

POOL_HEIGHT_SIMPLE   = 200       # pool with NO gateway split (single row of elements)
POOL_HEIGHT_BRANCH   = 320       # pool that contains >= 1 gateway split

MAIN_LANE_OFFSET     = 100       # main flow row sits this far below the pool's top
BRANCH_V_OFFSET      = 120       # distance from main lane to the dropped "No" branch
                                 # (>= TASK_H + 40 so the two 80px tasks keep a 40px gap)

ELEMENT_H_SPACING    = 170       # horizontal spacing between element columns
TASK_W, TASK_H       = 100, 80
GATEWAY_W, GATEWAY_H = 50, 50
EVENT_W, EVENT_H     = 36, 36

LABEL_W, LABEL_H     = 40, 14
```

---

## 2. Pool Height (NEW — per pool, not global)

A pool is "branching" if it contains at least one exclusive/parallel **split** gateway (1-in, 2+-out). Otherwise it is "simple".

```
height(pool) = POOL_HEIGHT_BRANCH  if pool has >= 1 split gateway
               POOL_HEIGHT_SIMPLE  otherwise
```

A branching pool is taller so the dropped "No" branch fits below the main lane without overlap.

---

## 3. Pool Top — Cumulative (NEW)

Because heights differ, never use `index × fixed_height`. Accumulate:

```
pool_top(0) = POOL_TOP_PADDING
pool_top(i) = pool_top(i-1) + height(i-1) + POOL_GAP      for i >= 1
```

**Worked example** (User simple=200, App branch=320, Dify simple=200, Backup simple=200, GPT simple=200):

```
pool_top(User)   = 160
pool_top(App)    = 160 + 200 + 40 = 400
pool_top(Dify)   = 400 + 320 + 40 = 760     # note: +320 because App is a branch pool
pool_top(Backup) = 760 + 200 + 40 = 1000
pool_top(GPT)    = 1000 + 200 + 40 = 1240
```

### Pool bounds (DI)

```xml
<dc:Bounds x="160" y="{pool_top(i)}" width="{pool_width}" height="{height(i)}" />
```

All pools share the same width (see §5). Heights vary.

---

## 4. The Main Lane and the Branch Lane

The **main lane** is the row where the normal (happy-path) sequence flows left to right. It sits at a fixed offset below the pool top, which works for both pool heights:

```
main_y(i) = pool_top(i) + MAIN_LANE_OFFSET        # = pool_top + 100
```

Element bounds on the main lane (offset by half the element height so the row is the vertical center of each shape):

```
task_y     = main_y - TASK_H/2     = main_y - 40
gateway_y  = main_y - GATEWAY_H/2  = main_y - 25
event_y    = main_y - EVENT_H/2    = main_y - 18
```

The **branch lane** (for the "No" side of a split gateway) drops below the main lane:

```
branch_y(i) = main_y(i) + BRANCH_V_OFFSET         # = main_y + 120
no_task_y   = branch_y - 40
no_event_y  = branch_y - 18
```

### Overlap check (the fix)

For a branch pool with `pool_top = P`:

```
main task   occupies y ∈ [P+60,  P+140]
no   task   occupies y ∈ [P+180, P+260]      # branch_y = P+220
gap between them            = 40px           ✓ no overlap
pool bottom                 = P+320
margin below no-branch task = 60px           ✓ fits inside pool
```

---

## 5. Column X and Pool Width

```
col_x(c) = POOL_LEFT + POOL_HEADER_WIDTH + POOL_INTERNAL_LEFT + c * ELEMENT_H_SPACING
         = 250 + c * 170
```

`c` is 0-based. For the initiating pool the Start Event is column 0. For a reactive pool the Message Start Event is at the column where its triggering message arrives (see §7), so a reactive pool may have nothing in columns 0..k-1.

```
max_cols   = (highest column index used by any element across all pools) + 1
pool_width = POOL_HEADER_WIDTH + POOL_INTERNAL_LEFT + max_cols * ELEMENT_H_SPACING + 100
```

All pools use this same width.

---

## 6. Gateway Branch Layout

When a gateway splits into "Có" (continue straight) and "Không" (drop down):

- **"Có" branch** stays on the main lane; following elements take the next columns at `main_y`.
- **"Không" branch** uses `branch_y` for its elements. A branch that terminates ends in its own End Event on the branch lane (no merge needed). A branch that rejoins the main flow uses a **merge gateway** placed one column after the longer branch, back on the main lane.

Column allocation when merging:

```
col:    ... | GW_SPLIT | CONT (Có) | DROP (Không) | GW_MERGE | NEXT | ...
index:  ... |    N     |    N+1     |     N+1      |   N+2    | N+3  | ...
```

If the "Không" branch just terminates, omit the merge and place its End Event at `N+1` or `N+2` on the branch lane.

---

## 7. Reactive Pool Entry (Message Start Events) and Fragments

A reactive pool's entry is a Message Start Event, positioned at the column of the element that sends it the triggering message, so the message flow is a clean vertical line.

```
entry_col(reactive_pool, fragment) = col index of the sending element in the source pool
start_x = col_x(entry_col)
start_y = main_y(reactive_pool) - EVENT_H/2
```

If the pool has **multiple fragments** (Rule C), lay each fragment out starting at its own entry column, all on the same main lane, left to right, with no sequence flow between fragments. Ensure fragments do not horizontally overlap; if two fragments would collide, push the later one to start at least one column past the previous fragment's last element.

---

## 8. Waypoints

### Sequence flow — straight (same lane)

```
wp1 = (source.x + source.w,  source.mid_y)     # right edge of source
wp2 = (target.x,             target.mid_y)     # left edge of target
```
(`mid_y` = element.y + element.h/2.)

### Sequence flow — gateway "Không" branch (down then right), 3 waypoints

```
wp1 = (gw.x + GATEWAY_W/2, gw.y + GATEWAY_H)   # center-bottom of gateway
wp2 = (gw.x + GATEWAY_W/2, branch_mid_y)       # straight down to branch lane
wp3 = (target.x,           branch_mid_y)       # right into the branch element
```

### Sequence flow — "Không" branch rejoins a merge gateway, 3 waypoints

```
wp1 = (source.x + source.w, branch_mid_y)      # right edge of last branch element
wp2 = (merge.x + GW_W/2,    branch_mid_y)       # align under merge gateway
wp3 = (merge.x + GW_W/2,    merge.y + GW_H)     # up into merge gateway bottom
```

### Message flow — cross-pool (vertical), 2 waypoints

Connect element edges, choosing top/bottom by which pool is higher:

```
if source pool is ABOVE target pool:
    wp1 = (source.center_x, source.y + source.h)   # bottom edge of source
    wp2 = (target.center_x, target.y)              # top edge of target
else:
    wp1 = (source.center_x, source.y)              # top edge of source
    wp2 = (target.center_x, target.y + target.h)   # bottom edge of target
```

When `source.center_x` and `target.center_x` differ by more than ~30px the line is slightly diagonal — acceptable. Aligning the columns (§7) keeps most message flows vertical.

### Branch label

Place a `<bpmndi:BPMNLabel>` near the flow:
- Straight branch ("Có"): `(midpoint_x - 15, main_y - 20)`.
- Drop branch ("Không"): `(gw.x + GW_W/2 + 5, gw.y + GW_H + 5)`.

---

## 9. Checklist Before Emitting DI

- [ ] Pool tops computed cumulatively from real per-pool heights (not index × fixed).
- [ ] Branch pools use height 320; linear pools use 200.
- [ ] Branch tasks sit 120px below the main lane (no overlap).
- [ ] Only the initiating pool has a plain Start at column 0.
- [ ] Each reactive pool's Message Start Event is at the arriving message's column.
- [ ] Reactive fragments are not connected by sequence flows and don't overlap horizontally.
- [ ] Every element has a BPMNShape; every flow has a BPMNEdge.
- [ ] Every cross-lane interaction from the source has a message flow (none trimmed).
- [ ] All pools share the same width; pool bounds enclose all child elements.
- [ ] Gateway branch flows are labelled; waypoints connect to element edges.
