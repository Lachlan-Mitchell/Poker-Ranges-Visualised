const ranks = ["A", "K", "Q", "J", "T", "9", "8", "7", "6", "5", "4", "3", "2"];
const grid = document.getElementById("grid");
const comboCountEl = document.getElementById("comboCount");
const rangeBar = document.getElementById("rangeBar");
const rangePercentEl = document.getElementById("rangePercent");

const TOTAL_COMBOS = 1326;
const range = new Set();
const GRID_BUFFER_PX = 8;

let isDragging = false;
let dragMode = null;
let shiftStartCell = null;
let activeMode = null;
let lastTouchedCell = null;

const tempHighlight = new Set();
const lockedCells = new Set();
let lastIndex = null;
const gridCells = [];

/* =======================
   Utility
======================= */

function comboCount(hand) {
  if (hand.length === 2) return 6;
  if (hand.endsWith("s")) return 4;
  return 12;
}

function updateCount() {
  let total = 0;
  range.forEach((h) => (total += comboCount(h)));
  comboCountEl.textContent = total;
  const percent = Math.min(100, (total / TOTAL_COMBOS) * 100);
  rangeBar.style.width = `${percent}%`;
  rangePercentEl.textContent = `${percent.toFixed(
    1
  )}% (${total} / ${TOTAL_COMBOS})`;
}

function applyCell(cell, mode) {
  const hand = cell.dataset.hand;
  if (mode === "add") {
    if (!range.has(hand)) {
      range.add(hand);
      cell.classList.add("active");
    }
  } else if (mode === "remove") {
    if (range.has(hand)) {
      range.delete(hand);
      cell.classList.remove("active");
    }
  }
}

function clearTempHighlight() {
  tempHighlight.forEach((c) =>
    c.classList.remove("temp-highlight", "temp-erase")
  );
  tempHighlight.clear();
}

/* =======================
   Grid helpers
======================= */

function findCellIndex(cell) {
  for (let r = 0; r < gridCells.length; r++)
    for (let c = 0; c < gridCells[r].length; c++)
      if (gridCells[r][c] === cell) return { row: r, col: c };
  return null;
}

/* =======================
   Shift Fill
======================= */

function shiftHighlight(cell) {
  const { row, col } = findCellIndex(cell);
  const hand = cell.dataset.hand;
  const type = hand.endsWith("o") ? "col" : hand.endsWith("s") ? "row" : "pair";

  if (
    !lastIndex ||
    lastIndex.type !== type ||
    (type === "col" && lastIndex.col !== col) ||
    (type === "row" && lastIndex.row !== row)
  ) {
    lockedCells.forEach((c) => applyCell(c, "add"));
    lockedCells.clear();
    lastIndex = { row, col, type };
  }

  clearTempHighlight();

  if (type === "col") {
    for (let r = 0; r <= row; r++) {
      const c = gridCells[r][col];
      tempHighlight.add(c);
      lockedCells.add(c);
      c.classList.add("temp-highlight");
    }
  } else if (type === "row") {
    for (let c = 0; c <= col; c++) {
      const cell2 = gridCells[row][c];
      tempHighlight.add(cell2);
      lockedCells.add(cell2);
      cell2.classList.add("temp-highlight");
    }
  } else {
    tempHighlight.add(cell);
    lockedCells.add(cell);
    cell.classList.add("temp-highlight");
  }
}

/* =======================
   Rectangle Erase
======================= */

function rectEraseHighlight(start, end) {
  clearTempHighlight();
  const a = findCellIndex(start);
  const b = findCellIndex(end);

  for (let r = Math.min(a.row, b.row); r <= Math.max(a.row, b.row); r++) {
    for (let c = Math.min(a.col, b.col); c <= Math.max(a.col, b.col); c++) {
      const cell = gridCells[r][c];
      if (cell.classList.contains("active")) {
        tempHighlight.add(cell);
        cell.classList.add("temp-erase");
      }
    }
  }
}

/* =======================
   Commit
======================= */

function commit() {
  if (dragMode === "shiftFill") {
    tempHighlight.forEach((c) => applyCell(c, "add"));
    lockedCells.forEach((c) => applyCell(c, "add"));
  }
  if (dragMode === "rectErase") {
    tempHighlight.forEach((c) => applyCell(c, "remove"));
  }
  updateCount();
  clearTempHighlight();
  lockedCells.clear();
  lastIndex = null;
}

/* =======================
   Shared Drag Handlers
======================= */

function startDrag(cell, button, shift) {
  isDragging = true;
  shiftStartCell = cell;

  // BUTTON MODE TAKES PRIORITY (desktop & mobile)
  if (activeMode) {
    dragMode = activeMode;
  }

  // NO BUTTON SELECTED → DESKTOP SHORTCUTS
  else if (shift && button === 0) {
    dragMode = "shiftFill";
  } else if (shift && button === 2) {
    dragMode = "rectErase";
  } else if (button === 2) {
    dragMode = "remove";
  } else {
    dragMode = "add";
  }

  // Apply initial cell
  if (dragMode === "add" || dragMode === "remove") {
    applyCell(cell, dragMode);
  }
  if (dragMode === "shiftFill") shiftHighlight(cell);
  if (dragMode === "rectErase") rectEraseHighlight(cell, cell);
}

function moveDrag(cell, shift) {
  if (!isDragging) return;
  if (dragMode === "add" || dragMode === "remove") applyCell(cell, dragMode);
  if (dragMode === "shiftFill") shiftHighlight(cell);
  if (dragMode === "rectErase")
    rectEraseHighlight(shiftStartCell, cell);
}

function endDrag() {
  if (!isDragging) return;
  commit();
  isDragging = false;
  dragMode = null;
  shiftStartCell = null;
}

/* =======================
   Build Grid
======================= */

ranks.forEach((r1, i) => {
  const row = [];
  ranks.forEach((r2, j) => {
    let hand, type;
    if (i === j) {
      hand = r1 + r2;
      type = "pair";
    } else if (i < j) {
      hand = r1 + r2 + "s";
      type = "suited";
    } else {
      hand = r2 + r1 + "o";
      type = "offsuit";
    }

    const cell = document.createElement("div");
    cell.className = `cell ${type}`;
    cell.textContent = hand;
    cell.dataset.hand = hand;

    cell.addEventListener("mousedown", (e) => {
      e.preventDefault();
      startDrag(cell, e.button, e.shiftKey);
    });

    cell.addEventListener("mouseenter", (e) => {
      if (isDragging) moveDrag(cell, e.shiftKey);
    });

    row.push(cell);
    grid.appendChild(cell);
  });
  gridCells.push(row);
});

grid.addEventListener("contextmenu", (e) => {
  if (isDragging) {
    e.preventDefault(); // block menu only during drag
  }
});

/* =======================
   BUTTON CONTROLS
======================= */

const controlButtons = document.querySelectorAll("#controls button");

controlButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const mode = btn.dataset.mode;

    // Toggle off if same button clicked
    if (activeMode === mode) {
      activeMode = null;
      btn.classList.remove("active");
    } else {
      activeMode = mode;
      controlButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
    }
  });
});

controlButtons.forEach((btn) => {
  btn.addEventListener("touchend", () => {
    const mode = btn.dataset.mode;

    // Toggle off if same button clicked
    if (activeMode === mode) {
      activeMode = null;
      btn.classList.remove("active");
    } else {
      activeMode = mode;
      controlButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
    }
  });
  
});

/* =======================
   TOUCH SUPPORT Driven the same as mouse
======================= */

grid.addEventListener(
  "touchstart",
  (e) => {
    if (e.touches.length !== 1) return;

    const t = e.touches[0];
    const el = document.elementFromPoint(t.clientX, t.clientY);
    const cell = el?.closest(".cell");
    if (!cell) return;

    e.preventDefault();

    // Touch behaves like LEFT CLICK
    startDrag(cell, 0, false);
    lastTouchedCell = cell;
  },
  { passive: false }
);

grid.addEventListener(
  "touchmove",
  (e) => {
    if (!isDragging) return;

    const t = e.touches[0];
    const el = document.elementFromPoint(t.clientX, t.clientY);
    const cell = el?.closest(".cell");

    if (!cell || cell === lastTouchedCell) return;

    e.preventDefault();
    moveDrag(cell, false);
    lastTouchedCell = cell;
  },
  { passive: false }
);

grid.addEventListener(
  "touchend",
  (e) => {
    e.preventDefault();
    endDrag();
    lastTouchedCell = null;
  },
  { passive: false }
);

document.addEventListener(
  "touchend",
  (e) => {
    e.preventDefault();
    endDrag();
  },
  { passive: false }
);

document.addEventListener("mouseup", endDrag);

document.addEventListener("contextmenu", (e) => {
  const rect = grid.getBoundingClientRect();
  const insideBufferedGrid =
    e.clientX >= rect.left - GRID_BUFFER_PX &&
    e.clientX <= rect.right + GRID_BUFFER_PX &&
    e.clientY >= rect.top - GRID_BUFFER_PX &&
    e.clientY <= rect.bottom + GRID_BUFFER_PX;

  if (insideBufferedGrid) e.preventDefault();
});
