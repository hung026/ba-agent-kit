#!/usr/bin/env node
/*
 * verify.js — Kiểm tra overlap trong file .drawio (BPMN)
 *
 * Cách dùng:
 *   node verify.js <duong-dan-file.drawio>
 *
 * Làm gì:
 *   - Parse mọi node (mxCell vertex="1") trong file.
 *   - Tính tọa độ TUYỆT ĐỐI bằng cách cộng offset của lane/pool cha.
 *   - Bỏ qua container (swimlane = pool/lane) khi so chồng.
 *   - Báo MỌI cặp node chồng nhau (overlap cả trục x lẫn y).
 *   - Báo node nằm sát nhau dưới ngưỡng gap tối thiểu (cảnh báo).
 *   - Báo node tràn ra ngoài lane chứa nó.
 *
 * Exit code: 0 = sạch, 1 = có overlap (lỗi), 2 = chỉ có cảnh báo gap.
 */

const fs = require("fs");

const MIN_GAP = 20; // px — gap tối thiểu giữa 2 node liền kề; dưới mức này → cảnh báo

const file = process.argv[2];
if (!file) {
  console.error("Thiếu đường dẫn. Dùng: node verify.js <file.drawio>");
  process.exit(3);
}

const xml = fs.readFileSync(file, "utf8");

// --- Parse tất cả mxCell ---
// Mỗi mxCell có thể tự đóng hoặc bọc mxGeometry. Ta tách theo từng thẻ mxCell mở.
const cells = {}; // id -> { id, parent, vertex, isContainer, value, x, y, w, h }
const cellRegex = /<mxCell\b([^>]*?)(\/>|>([\s\S]*?)<\/mxCell>)/g;
let m;
while ((m = cellRegex.exec(xml)) !== null) {
  const attrs = m[1];
  const inner = m[3] || "";
  const get = (name) => {
    const r = new RegExp(name + '="([^"]*)"').exec(attrs);
    return r ? r[1] : null;
  };
  const id = get("id");
  if (!id) continue;
  const style = get("style") || "";
  const cell = {
    id,
    parent: get("parent"),
    vertex: get("vertex") === "1",
    edge: get("edge") === "1",
    isContainer: /swimlane/.test(style),
    value: (get("value") || "").replace(/&#xa;/g, " ").replace(/&amp;/g, "&"),
  };
  // Lấy mxGeometry (ưu tiên geometry bên trong cell)
  const g = /<mxGeometry\b([^>]*?)(\/>|>[\s\S]*?<\/mxGeometry>)/.exec(inner);
  if (g) {
    const ga = g[1];
    const gn = (name) => {
      const r = new RegExp(name + '="([^"]*)"').exec(ga);
      return r ? parseFloat(r[1]) : null;
    };
    cell.x = gn("x");
    cell.y = gn("y");
    cell.w = gn("width");
    cell.h = gn("height");
  }
  cells[id] = cell;
}

// --- Tính tọa độ tuyệt đối (cộng offset cha) ---
function absPos(cell) {
  let x = cell.x || 0;
  let y = cell.y || 0;
  let p = cell.parent;
  const guard = new Set();
  while (p && cells[p] && !guard.has(p)) {
    guard.add(p);
    const par = cells[p];
    x += par.x || 0;
    y += par.y || 0;
    p = par.parent;
  }
  return { x, y };
}

// --- Lọc node thật (vertex, không phải container, có hình học đầy đủ) ---
const nodes = [];
for (const id in cells) {
  const c = cells[id];
  if (!c.vertex || c.isContainer || c.edge) continue;
  if (c.x == null || c.y == null || c.w == null || c.h == null) continue;
  const { x, y } = absPos(c);
  nodes.push({
    id,
    label: c.value || "(no label)",
    parent: c.parent,
    x1: x,
    y1: y,
    x2: x + c.w,
    y2: y + c.h,
  });
}

// --- Tính overlap / gap giữa 2 box ---
function gapInfo(a, b) {
  // khoảng hở theo từng trục: >0 = rời nhau, <=0 = giao nhau trên trục đó
  const gapX = Math.max(a.x1 - b.x2, b.x1 - a.x2);
  const gapY = Math.max(a.y1 - b.y2, b.y1 - a.y2);
  return { gapX, gapY };
}

const overlaps = [];
const warnings = [];
for (let i = 0; i < nodes.length; i++) {
  for (let j = i + 1; j < nodes.length; j++) {
    const a = nodes[i];
    const b = nodes[j];
    const { gapX, gapY } = gapInfo(a, b);
    if (gapX < 0 && gapY < 0) {
      // giao nhau cả 2 trục → CHỒNG
      overlaps.push({ a, b, ox: -gapX, oy: -gapY });
    } else {
      // rời nhau ít nhất 1 trục → check gap tối thiểu
      const sep = Math.max(gapX, gapY); // trục tách chúng ra
      if (sep >= 0 && sep < MIN_GAP) {
        warnings.push({ a, b, sep });
      }
    }
  }
}

// --- Check node tràn khỏi lane cha ---
const outOfLane = [];
for (const id in cells) {
  const c = cells[id];
  if (!c.vertex || c.isContainer || c.edge) continue;
  if (c.x == null) continue;
  const lane = cells[c.parent];
  if (!lane || !lane.isContainer || lane.w == null) continue;
  // tọa độ node tương đối so với lane (chính là c.x/c.y vì lane là cha trực tiếp)
  if (c.x < 0 || c.y < 0 || c.x + c.w > lane.w || c.y + c.h > lane.h) {
    outOfLane.push({ id, label: c.value, laneVal: lane.value });
  }
}

// --- In kết quả ---
const F = (n) => Math.round(n);
console.log(`\n=== VERIFY: ${file} ===`);
console.log(`Node thật: ${nodes.length}`);

if (overlaps.length) {
  console.log(`\n❌ CHỒNG NHAU (${overlaps.length} cặp) — PHẢI sửa:`);
  for (const o of overlaps) {
    console.log(
      `   • "${o.a.label}" [${F(o.a.x1)},${F(o.a.y1)}–${F(o.a.x2)},${F(o.a.y2)}]` +
        `  ✕  "${o.b.label}" [${F(o.b.x1)},${F(o.b.y1)}–${F(o.b.x2)},${F(o.b.y2)}]` +
        `  (đè x=${F(o.ox)}px, y=${F(o.oy)}px)`
    );
  }
}

if (outOfLane.length) {
  console.log(`\n❌ TRÀN KHỎI LANE (${outOfLane.length}):`);
  for (const o of outOfLane) {
    console.log(`   • "${o.label}" vượt khỏi lane "${o.laneVal}"`);
  }
}

if (warnings.length) {
  console.log(`\n⚠️  SÁT NHAU < ${MIN_GAP}px (${warnings.length} cặp) — nên giãn ra:`);
  for (const w of warnings) {
    console.log(`   • "${w.a.label}"  ↔  "${w.b.label}"  (gap ${F(w.sep)}px)`);
  }
}

if (!overlaps.length && !outOfLane.length && !warnings.length) {
  console.log("\n✅ SẠCH — không chồng, không tràn lane, gap đạt chuẩn.");
}

const hardErr = overlaps.length || outOfLane.length;
process.exit(hardErr ? 1 : warnings.length ? 2 : 0);
