const cellSize = 30;
const cols = Math.max(1, Math.floor(window.innerWidth / cellSize));
const rows = Math.max(1, Math.floor(window.innerHeight / cellSize));
const baseFill = "white";
const baseStroke = "#e9ecef";
const hoverStroke = "#adb5bd";
let dragStart = null;
let selectedRange = null;
const selections = [];

const svg = d3.select("svg.playing-graph");

const selectionsLayer = svg.append("g").attr("class", "selections");

const selection = svg
  .append("rect")
  .attr("class", "selection")
  .attr("fill", "none")
  .attr("stroke", hoverStroke)
  .attr("stroke-width", 2)
  .style("pointer-events", "none")
  .attr("width", 0)
  .attr("height", 0);

const selectionImage = svg
  .append("image")
  .attr("class", "selection-image")
  .attr("href", "sample-large.png")
  .attr("preserveAspectRatio", "xMidYMid meet")
  .style("pointer-events", "none")
  .attr("width", 0)
  .attr("height", 0);

function renderSelections() {
  const sel = selectionsLayer
    .selectAll("g.saved-selection")
    .data(selections)
    .join((enter) => {
      const g = enter.append("g").attr("class", "saved-selection");
      g.append("image")
        .attr("class", "selection-image")
        .attr("href", "sample-large.png")
        .attr("preserveAspectRatio", "xMidYMid meet")
        .style("pointer-events", "none");
      g.append("rect")
        .attr("class", "selection-outline")
        .attr("fill", "none")
        .attr("stroke", hoverStroke)
        .attr("stroke-width", 2)
        .style("pointer-events", "none");
      return g;
    });

  sel.select("image")
    .attr("x", (d) => d.x)
    .attr("y", (d) => d.y)
    .attr("width", (d) => d.width)
    .attr("height", (d) => d.height);

  sel.select("rect.selection-outline")
    .attr("x", (d) => d.x)
    .attr("y", (d) => d.y)
    .attr("width", (d) => d.width)
    .attr("height", (d) => d.height);

  selectionsLayer.raise();
}

function clampToGrid(x, y) {
  const col = Math.max(0, Math.min(cols - 1, Math.floor(x / cellSize)));
  const row = Math.max(0, Math.min(rows - 1, Math.floor(y / cellSize)));
  return { col, row };
}

const drag = d3
  .drag()
  .on("start", (event) => {
    dragStart = clampToGrid(event.x, event.y);
    selectedRange = null;
    selection.raise();
    selectionImage.raise();
  })
  .on("drag", (event) => {
    if (!dragStart) return;
    const dragEnd = clampToGrid(event.x, event.y);
    const minCol = Math.min(dragStart.col, dragEnd.col);
    const maxCol = Math.max(dragStart.col, dragEnd.col);
    const minRow = Math.min(dragStart.row, dragEnd.row);
    const maxRow = Math.max(dragStart.row, dragEnd.row);

    selection
      .attr("x", minCol * cellSize)
      .attr("y", minRow * cellSize)
      .attr("width", (maxCol - minCol + 1) * cellSize)
      .attr("height", (maxRow - minRow + 1) * cellSize);
  })
  .on("end", (event) => {
    if (dragStart) {
      const dragEnd = clampToGrid(event.x, event.y);
      selectedRange = {
        minCol: Math.min(dragStart.col, dragEnd.col),
        maxCol: Math.max(dragStart.col, dragEnd.col),
        minRow: Math.min(dragStart.row, dragEnd.row),
        maxRow: Math.max(dragStart.row, dragEnd.row),
      };
      console.log(selectedRange);

      const x = selectedRange.minCol * cellSize;
      const y = selectedRange.minRow * cellSize;
      const width =
        (selectedRange.maxCol - selectedRange.minCol + 1) * cellSize;
      const height =
        (selectedRange.maxRow - selectedRange.minRow + 1) * cellSize;

      selections.push({
        ...selectedRange,
        x,
        y,
        width,
        height,
      });

      renderSelections();

      selectionImage
        .raise()
        .attr("x", x)
        .attr("y", y)
        .attr("width", width)
        .attr("height", height);

      console.log("selecion image putted");
    }
    dragStart = null;
  });

svg
  .selectAll("rect.grid")
  .data(
    Array.from({ length: rows * cols }, (_, i) => ({
      col: i % cols,
      row: Math.floor(i / cols),
    }))
  )
  .join("rect")
  .attr("class", "grid")
  .attr("x", (d) => d.col * cellSize)
  .attr("y", (d) => d.row * cellSize)
  .attr("width", cellSize)
  .attr("height", cellSize)
  .attr("fill", baseFill)
  .attr("stroke", baseStroke)
  .attr("stroke-width", 2)
  .on("mouseenter", function (event, d) {
    const inAnySelection = selections.some(
      (s) =>
        d.col >= s.minCol &&
        d.col <= s.maxCol &&
        d.row >= s.minRow &&
        d.row <= s.maxRow
    );
    if (inAnySelection) return;
  })
  .on("mouseleave", function (event, d) {
    const inAnySelection = selections.some(
      (s) =>
        d.col >= s.minCol &&
        d.col <= s.maxCol &&
        d.row >= s.minRow &&
        d.row <= s.maxRow
    );
    if (inAnySelection) return;
    d3.select(this).attr("stroke", baseStroke);
  });

svg.call(drag);
