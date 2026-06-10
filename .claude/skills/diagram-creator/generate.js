#!/usr/bin/env node
/*
 * generate.js — Sinh BPMN .drawio TỪ SPEC JSON (tự động tính layout, KHÔNG tính pixel tay)
 *
 * Cách dùng:
 *   node generate.js <spec.json> <output.drawio>
 *
 * Triết lý: LLM chỉ mô tả GRAPH (lanes + nodes + edges). Script này tính tọa độ bằng
 * thuật toán layered (rank = cột theo thứ tự luồng, slot = tầng dọc trong lane).
 * → Node KHÔNG BAO GIỜ chồng (khác rank → khác x; cùng rank cùng lane → khác slot → khác y).
 * → Mọi cấu trúc (cascade / merge / parallel / loop / nhiều lane) tự ghép, không cần pattern tay.
 *
 * SPEC JSON:
 * {
 *   "title": "Tên quy trình",
 *   "lanes": ["Actor A", "Actor B"],          // thứ tự lane từ trên xuống
 *   "nodes": [
 *     { "id":"start", "type":"start", "label":"Bắt đầu", "lane":"Actor A" },
 *     { "id":"t1",    "type":"task",  "label":"Làm gì đó", "lane":"Actor A" },
 *     { "id":"gw1",   "type":"gateway","label":"Điều kiện?", "lane":"Actor B", "gwType":"exclusive" },
 *     { "id":"end1",  "type":"end",   "label":"Kết thúc", "lane":"Actor B" }
 *   ],
 *   "edges": [
 *     { "from":"start", "to":"t1" },
 *     { "from":"gw1",   "to":"end1", "label":"Đúng" }
 *   ]
 * }
 *
 * type: start | end | task | gateway
 * gwType (chỉ cho gateway): exclusive (mặc định) | parallel
 * Loop (edge quay lui) tự phát hiện qua chu trình → vẽ vòng dưới.
 */

const fs = require("fs");

// ---------- Kích thước & spacing ----------
const DIM = {
  start: { w: 50, h: 50 },
  end: { w: 50, h: 50 },
  gateway: { w: 60, h: 60 },
  task: { w: 140, h: 60 },
};
const COL_W = 200; // bề rộng 1 cột (rank)
const ROW_H = 100; // chiều cao 1 slot (tầng dọc trong lane)
const PAD = 20; // đệm trên/dưới trong lane
const LEFTPAD = 20; // đệm trái trong lane
const RIGHTPAD = 40;
const COL_CENTER0 = LEFTPAD + 70; // tâm cột 0 (căn theo nửa task width 70)
const DIAGRAM_X = 40; // mép trái toàn bộ diagram
const DIAGRAM_Y = 40; // mép trên toàn bộ diagram
const LANE_GAP = 40; // khoảng cách giữa 2 lane rời nhau
const TITLE_H = 30; // chiều cao label tiêu đề
const TITLE_GAP = 10; // khoảng cách title → lane đầu

// ---------- Đọc spec ----------
const specPath = process.argv[2];
const outPath = process.argv[3];
if (!specPath || !outPath) {
  console.error("Dùng: node generate.js <spec.json> <output.drawio>");
  process.exit(3);
}
const spec = JSON.parse(fs.readFileSync(specPath, "utf8"));
const nodes = spec.nodes;
const edges = spec.edges;
const lanes = spec.lanes && spec.lanes.length ? spec.lanes : [...new Set(nodes.map((n) => n.lane))];

const nodeById = {};
nodes.forEach((n) => (nodeById[n.id] = n));

// ---------- Phát hiện back-edge (loop) bằng DFS ----------
const adj = {};
nodes.forEach((n) => (adj[n.id] = []));
edges.forEach((e, i) => {
  if (adj[e.from]) adj[e.from].push({ to: e.to, i });
});
const backEdges = new Set();
const state = {}; // undefined | 1 (in-stack) | 2 (done)
function dfs(u) {
  state[u] = 1;
  for (const { to, i } of adj[u]) {
    if (state[to] === 1) backEdges.add(i);
    else if (!state[to]) dfs(to);
  }
  state[u] = 2;
}
nodes.forEach((n) => {
  if (!state[n.id]) dfs(n.id);
});
const isLoop = (i) => backEdges.has(i);
const fwdEdges = edges.filter((_, i) => !isLoop(i));

// ---------- Rank = longest path (chỉ forward edges) ----------
const succ = {};
const indeg = {};
nodes.forEach((n) => {
  succ[n.id] = [];
  indeg[n.id] = 0;
});
fwdEdges.forEach((e) => {
  if (succ[e.from]) {
    succ[e.from].push(e.to);
    indeg[e.to]++;
  }
});
const rank = {};
let queue = nodes.filter((n) => indeg[n.id] === 0).map((n) => n.id);
queue.forEach((id) => (rank[id] = 0));
const indegC = { ...indeg };
while (queue.length) {
  const next = [];
  for (const u of queue) {
    for (const v of succ[u]) {
      rank[v] = Math.max(rank[v] ?? 0, (rank[u] ?? 0) + 1);
      if (--indegC[v] === 0) next.push(v);
    }
  }
  queue = next;
}
nodes.forEach((n) => {
  if (rank[n.id] === undefined) rank[n.id] = 0;
});
const maxRank = Math.max(...nodes.map((n) => rank[n.id]));

// ---------- Slot (tầng dọc) trong từng lane ----------
// Mỗi (lane, rank): k node → căn giữa quanh slot trung tâm → main flow thẳng hàng.
const slot = {};
const laneSlots = {}; // lane -> số slot
for (const lane of lanes) {
  const laneNodes = nodes.filter((n) => n.lane === lane);
  const byRank = {};
  laneNodes.forEach((n) => {
    (byRank[rank[n.id]] = byRank[rank[n.id]] || []).push(n.id);
  });
  let maxK = 1;
  for (const r in byRank) maxK = Math.max(maxK, byRank[r].length);
  laneSlots[lane] = maxK;
  for (const r in byRank) {
    const group = byRank[r];
    const k = group.length;
    const start = Math.floor((maxK - k) / 2);
    group.forEach((id, idx) => (slot[id] = start + idx));
  }
}

// ---------- Tọa độ ----------
// Mỗi lane là 1 container ĐỘC LẬP (parent="1"), xếp dọc, cách nhau LANE_GAP.
const laneH = {}; // chiều cao mỗi lane
const laneAbsY = {}; // y tuyệt đối của lane trên canvas
let cursorY = DIAGRAM_Y + (spec.title ? TITLE_H + TITLE_GAP : 0);
for (const lane of lanes) {
  laneH[lane] = laneSlots[lane] * ROW_H + 2 * PAD;
  laneAbsY[lane] = cursorY;
  cursorY += laneH[lane] + LANE_GAP;
}
const totalBottom = cursorY - LANE_GAP; // mép dưới lane cuối (bỏ gap thừa)
const laneW = LEFTPAD + maxRank * COL_W + 140 + RIGHTPAD;
const canvasW = DIAGRAM_X + laneW;

function nodePos(n) {
  const d = DIM[n.type];
  const colCenter = COL_CENTER0 + rank[n.id] * COL_W;
  const rowTop = PAD + slot[n.id] * ROW_H;
  return {
    x: Math.round(colCenter - d.w / 2), // relative to lane
    y: Math.round(rowTop + (ROW_H - d.h) / 2),
    w: d.w,
    h: d.h,
    // tuyệt đối (để self-check + tính hướng edge)
    absCenterY: laneAbsY[n.lane] + rowTop + ROW_H / 2,
    absCenterX: DIAGRAM_X + colCenter,
  };
}
const pos = {};
nodes.forEach((n) => (pos[n.id] = nodePos(n)));

// ---------- Style strings (lấy từ styles/bpmn-styles.md) ----------
const S = {
  title:
    "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;fontStyle=1;fontSize=14;fontColor=#000000;",
  lane:
    "swimlane;html=1;horizontal=0;startSize=30;fontStyle=1;fontSize=12;fillColor=none;strokeColor=#000000;swimlaneFillColor=#ffffff;fontColor=#000000;",
  start:
    "points=[[0.145,0.145,0],[0.5,0,0],[0.855,0.145,0],[1,0.5,0],[0.855,0.855,0],[0.5,1,0],[0.145,0.855,0],[0,0.5,0]];shape=mxgraph.bpmn.event;html=1;verticalLabelPosition=bottom;labelBackgroundColor=#ffffff;verticalAlign=top;align=center;perimeter=ellipsePerimeter;outlineConnect=0;aspect=fixed;outline=standard;symbol=general;strokeColor=#000000;fillColor=#ffffff;fontColor=#000000;",
  end:
    "points=[[0.145,0.145,0],[0.5,0,0],[0.855,0.145,0],[1,0.5,0],[0.855,0.855,0],[0.5,1,0],[0.145,0.855,0],[0,0.5,0]];shape=mxgraph.bpmn.event;html=1;verticalLabelPosition=bottom;labelBackgroundColor=#ffffff;verticalAlign=top;align=center;perimeter=ellipsePerimeter;outlineConnect=0;aspect=fixed;outline=end;symbol=terminate;strokeColor=#000000;fillColor=#ffffff;fontColor=#000000;",
  task:
    "points=[[0.25,0,0],[0.5,0,0],[0.75,0,0],[1,0.25,0],[1,0.5,0],[1,0.75,0],[0.75,1,0],[0.5,1,0],[0.25,1,0],[0,0.75,0],[0,0.5,0],[0,0.25,0]];shape=mxgraph.bpmn.task;whiteSpace=wrap;rectStyle=rounded;size=10;html=1;fontSize=12;strokeColor=#000000;fillColor=#ffffff;fontColor=#000000;",
  gwBase:
    "points=[[0.25,0.25,0],[0.5,0,0],[0.75,0.25,0],[1,0.5,0],[0.75,0.75,0],[0.5,1,0],[0.25,0.75,0],[0,0.5,0]];shape=mxgraph.bpmn.gateway2;html=1;verticalLabelPosition=bottom;labelBackgroundColor=#ffffff;verticalAlign=top;align=center;perimeter=rhombusPerimeter;outlineConnect=0;outline=none;symbol=none;strokeColor=#000000;fillColor=#ffffff;fontColor=#000000;",
  edge:
    "edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;endArrow=block;endFill=1;strokeColor=#000000;",
  edgeLabel: "fontSize=11;fontColor=#000000;labelBackgroundColor=#ffffff;",
};
function nodeStyle(n) {
  if (n.type === "gateway") return S.gwBase + "gwType=" + (n.gwType || "exclusive") + ";";
  return S[n.type];
}

// ---------- Hướng edge (exit/entry) tự tính ----------
function edgeAnchors(e, i) {
  const a = pos[e.from];
  const b = pos[e.to];
  const dRank = rank[e.to] - rank[e.from];
  const dy = b.absCenterY - a.absCenterY;
  if (isLoop(i) || dRank < 0) {
    // quay lui: ra cạnh trái, vòng dưới, vào cạnh dưới đích
    return "exitX=0;exitY=0.5;entryX=0.5;entryY=1;";
  }
  if (dRank === 0) {
    // cùng cột, khác lane → nối DỌC
    return dy > 0
      ? "exitX=0.5;exitY=1;entryX=0.5;entryY=0;"
      : "exitX=0.5;exitY=0;entryX=0.5;entryY=1;";
  }
  // tiến sang phải: ra cạnh phải, vào cạnh trái (orthogonal tự bẻ nếu lệch dọc)
  return "exitX=1;exitY=0.5;entryX=0;entryY=0.5;";
}

// ---------- Escape XML ----------
function esc(s) {
  return String(s == null ? "" : s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/\n/g, "&#xa;");
}

// ---------- Build XML ----------
const out = [];
out.push('<mxfile host="app.diagrams.net" agent="Claude-generate.js" version="24.0.0">');
out.push(`  <diagram id="gen" name="${esc(spec.title || "BPMN")}">`);
out.push(
  `    <mxGraphModel dx="1400" dy="800" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="${
    canvasW + 60
  }" pageHeight="${totalBottom + 60}" math="0" shadow="0">`
);
out.push("      <root>");
out.push('        <mxCell id="0" />');
out.push('        <mxCell id="1" parent="0" />');

// Title (label nổi trên cùng, không bọc lane)
if (spec.title) {
  out.push(
    `        <mxCell id="title" value="${esc(spec.title)}" style="${S.title}" parent="1" vertex="1"><mxGeometry x="${DIAGRAM_X}" y="${DIAGRAM_Y}" width="${laneW}" height="${TITLE_H}" as="geometry" /></mxCell>`
  );
}
// Lanes — mỗi lane là container ĐỘC LẬP (parent="1"), tọa độ tuyệt đối
const laneId = {};
lanes.forEach((lane, idx) => {
  const id = "lane" + idx;
  laneId[lane] = id;
  out.push(
    `        <mxCell id="${id}" value="${esc(lane)}" style="${S.lane}" parent="1" vertex="1"><mxGeometry x="${DIAGRAM_X}" y="${laneAbsY[lane]}" width="${laneW}" height="${laneH[lane]}" as="geometry" /></mxCell>`
  );
});
// Nodes
nodes.forEach((n) => {
  const p = pos[n.id];
  out.push(
    `        <mxCell id="${esc(n.id)}" value="${esc(n.label)}" style="${nodeStyle(n)}" parent="${laneId[n.lane]}" vertex="1"><mxGeometry x="${p.x}" y="${p.y}" width="${p.w}" height="${p.h}" as="geometry" /></mxCell>`
  );
});
// Edges
edges.forEach((e, i) => {
  const anchors = edgeAnchors(e, i);
  const st = S.edge + anchors + (e.label ? S.edgeLabel : "");
  const val = e.label ? ` value="${esc(e.label)}"` : "";
  out.push(
    `        <mxCell id="e${i}"${val} style="${st}" parent="1" source="${esc(e.from)}" target="${esc(e.to)}" edge="1"><mxGeometry relative="1" as="geometry" /></mxCell>`
  );
});
out.push("      </root>");
out.push("    </mxGraphModel>");
out.push("  </diagram>");
out.push("</mxfile>");

fs.writeFileSync(outPath, out.join("\n"), "utf8");

// ---------- Self-check overlap (cùng lane) ----------
let overlap = 0;
for (let i = 0; i < nodes.length; i++) {
  for (let j = i + 1; j < nodes.length; j++) {
    const a = nodes[i],
      b = nodes[j];
    if (a.lane !== b.lane) continue;
    const pa = pos[a.id],
      pb = pos[b.id];
    if (pa.x < pb.x + pb.w && pb.x < pa.x + pa.w && pa.y < pb.y + pb.h && pb.y < pa.y + pa.h) {
      overlap++;
      console.error(`  ⚠ overlap: ${a.id} ✕ ${b.id}`);
    }
  }
}
console.log(
  `✔ Đã sinh ${outPath}\n  nodes=${nodes.length} edges=${edges.length} lanes=${lanes.length} cols=${
    maxRank + 1
  } loop-edges=${backEdges.size} overlap=${overlap}`
);
process.exit(overlap ? 1 : 0);
