const ranks = ["A", "K", "Q", "J", "T", "9", "8", "7", "6", "5", "4", "3", "2"];
const grid = document.getElementById("grid");
const comboCountEl = document.getElementById("comboCount");
const rangeBar = document.getElementById("rangeBar");
const rangePercentEl = document.getElementById("rangePercent");

const TOTAL_COMBOS = 1326;
const range = new Set();
let isDragging = false;
let dragMode = null;
let shiftStartCell = null;
const tempHighlight = new Set();
const lockedCells = new Set();
let lastIndex = null;
const gridCells = [];

let activeMode = null; // no button selected initially

// --- Combo calculation ---
function comboCount(hand) {
  if (hand.length === 2) return 6;
  if (hand.endsWith("s")) return 4;
  return 12;
}

// --- Update count ---
function updateCount() {
  let total = 0;
  range.forEach((h) => (total += comboCount(h)));
  comboCountEl.textContent = total;
  const percent = Math.min(100, (total / TOTAL_COMBOS) * 100);
  rangeBar.style.width = `${percent}%`;
  rangeBar.style.backgroundColor = `rgb(${Math.min(
    255,
    percent * 2.55
  )}, ${Math.max(0, 200 - percent * 2)}, 0)`;
  rangePercentEl.textContent = `${percent.toFixed(
    1
  )}% (${total} / ${TOTAL_COMBOS})`;
}

// --- Apply / Remove cell ---
function applyCell(cell, mode = "add") {
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

// --- Temporary highlights ---
function clearTempHighlight() {
  tempHighlight.forEach((c) =>
    c.classList.remove("temp-highlight", "temp-erase", "fade-in")
  );
  tempHighlight.clear();
}

function applyTempHighlight(c, type) {
  c.classList.add(type);
  c.classList.add("fade-in");
}

// --- Shift Column/Row fill ---
function shiftHighlight(cell) {
  const { row, col } = findCellIndex(cell);
  const hand = cell.dataset.hand;

  if (!lastIndex)
    lastIndex = {
      row,
      col,
      type: hand.endsWith("o") ? "col" : hand.endsWith("s") ? "row" : "pair",
    };

  let type = hand.endsWith("o") ? "col" : hand.endsWith("s") ? "row" : "pair";

  if (
    type !== lastIndex.type ||
    (type === "col" && col !== lastIndex.col) ||
    (type === "row" && row !== lastIndex.row)
  ) {
    lockedCells.forEach((c) => applyCell(c, "add"));
    lockedCells.clear();
    lastIndex = { row, col, type };
  }

  clearTempHighlight();

  if (type === "col") {
    for (let r = 0; r <= row; r++) {
      const targetCell = gridCells[r][col];
      tempHighlight.add(targetCell);
      lockedCells.add(targetCell);
      applyTempHighlight(targetCell, "temp-highlight");
    }
  } else if (type === "row") {
    for (let c = 0; c <= col; c++) {
      const targetCell = gridCells[row][c];
      tempHighlight.add(targetCell);
      lockedCells.add(targetCell);
      applyTempHighlight(targetCell, "temp-highlight");
    }
  } else {
    tempHighlight.add(cell);
    lockedCells.add(cell);
    applyTempHighlight(cell, "temp-highlight");
  }
}

// --- Rectangle erase ---
function rectEraseHighlight(startCell, endCell) {
  clearTempHighlight();
  const startIndex = findCellIndex(startCell);
  const endIndex = findCellIndex(endCell);

  const rowMin = Math.min(startIndex.row, endIndex.row);
  const rowMax = Math.max(startIndex.row, endIndex.row);
  const colMin = Math.min(startIndex.col, endIndex.col);
  const colMax = Math.max(startIndex.col, endIndex.col);

  for (let r = rowMin; r <= rowMax; r++) {
    for (let c = colMin; c <= colMax; c++) {
      const cell = gridCells[r][c];
      if (cell.classList.contains("active")) {
        tempHighlight.add(cell);
        applyTempHighlight(cell, "temp-erase");
      }
    }
  }
}

// --- Commit temp highlight ---
function commitTempHighlight(mode) {
  if (mode === "remove") tempHighlight.forEach((c) => applyCell(c, "remove"));
  else if (mode === "add") {
    tempHighlight.forEach((c) => applyCell(c, "add"));
    lockedCells.forEach((c) => applyCell(c, "add"));
  }
  clearTempHighlight();
  lockedCells.clear();
  lastIndex = null;
  updateCount();
}

// --- Find row/col ---
function findCellIndex(cell) {
  for (let r = 0; r < gridCells.length; r++)
    for (let c = 0; c < gridCells[r].length; c++)
      if (gridCells[r][c] === cell) return { row: r, col: c };
  return null;
}

// --- Build grid ---
ranks.forEach((r1, i) => {
  const rowArr = [];
  ranks.forEach((r2, j) => {
    let hand = "",
      type = "";
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

    // === Mouse down ===
    cell.addEventListener("mousedown", (e) => {
      e.preventDefault();
      isDragging = true;
      shiftStartCell = cell;

      if (e.shiftKey && e.button === 0) dragMode = "shiftFill";
      else if (e.shiftKey && e.button === 2) dragMode = "rectErase";
      else if (e.button === 2)
        dragMode = "remove"; // Right click always removes
      else if (e.button === 0 && activeMode)
        dragMode = activeMode; // Left click uses button
      else dragMode = "add"; // Default left click

      if (dragMode === "add") applyCell(cell, "add");
      else if (dragMode === "remove") applyCell(cell, "remove");
      else if (dragMode === "shiftFill") shiftHighlight(cell);
      else if (dragMode === "rectErase") rectEraseHighlight(cell, cell);
    });

    // === Mouse enter ===
    cell.addEventListener("mouseenter", (event) => {
      if (!isDragging || !shiftStartCell) return;

      if (event.shiftKey && dragMode === "shiftFill") shiftHighlight(cell);
      else if (event.shiftKey && dragMode === "rectErase")
        rectEraseHighlight(shiftStartCell, cell);
      else if (dragMode === "add") applyCell(cell, "add");
      else if (dragMode === "remove") applyCell(cell, "remove");
    });

    rowArr.push(cell);
    grid.appendChild(cell);
  });
  gridCells.push(rowArr);
});

// --- Mouse up ---
document.addEventListener("mouseup", () => {
  if (!isDragging) return;

  // Commit any shift/temp highlights
  if (dragMode === "shiftFill") commitTempHighlight("add");
  else if (dragMode === "rectErase") commitTempHighlight("remove");

  // Always update count for standard left/right click or drag
  if (dragMode === "add" || dragMode === "remove") {
    updateCount();
  }

  // Reset drag state
  isDragging = false;
  dragMode = null;
  shiftStartCell = null;
  clearTempHighlight();
  lockedCells.clear();
  lastIndex = null;
});

// === Touch start ===
cell.addEventListener("touchstart", (e) => {
  e.preventDefault();
  const touch = e.touches[0];
  handleStart(cell, touch);
});

// === Touch move ===
cell.addEventListener("touchmove", (e) => {
  e.preventDefault();
  const touch = e.touches[0];
  const target = document.elementFromPoint(touch.clientX, touch.clientY);
  if (target && target.classList.contains("cell")) handleEnter(target);
});

// === Touch end ===
cell.addEventListener("touchend", (e) => {
  e.preventDefault();
  handleEnd();
});

// --- Buttons ---
const btnAdd = document.getElementById("btnAdd");
const btnRemove = document.getElementById("btnRemove");
const btnShiftFill = document.getElementById("btnShiftFill");
const btnRectErase = document.getElementById("btnRectErase");

const buttons = [btnAdd, btnRemove, btnShiftFill, btnRectErase];

// Toggleable buttons
function toggleActiveMode(mode) {
  if (activeMode === mode) {
    activeMode = null;
    buttons.forEach((btn) => btn.classList.remove("active"));
  } else {
    activeMode = mode;
    buttons.forEach((btn) => btn.classList.remove("active"));
    if (mode === "add") btnAdd.classList.add("active");
    else if (mode === "remove") btnRemove.classList.add("active");
    else if (mode === "shiftFill") btnShiftFill.classList.add("active");
    else if (mode === "rectErase") btnRectErase.classList.add("active");
  }
}

btnAdd.addEventListener("click", () => toggleActiveMode("add"));
btnRemove.addEventListener("click", () => toggleActiveMode("remove"));
btnShiftFill.addEventListener("click", () => toggleActiveMode("shiftFill"));
btnRectErase.addEventListener("click", () => toggleActiveMode("rectErase"));

// --- Prevent native drag & context menu ---
document.addEventListener("dragstart", (e) => e.preventDefault());
document.addEventListener("contextmenu", (e) => e.preventDefault());
