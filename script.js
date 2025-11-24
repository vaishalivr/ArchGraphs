const cellSize = 30;
const cols = Math.max(1, Math.floor(window.innerWidth / cellSize));
const rows = Math.max(1, Math.floor(window.innerHeight / cellSize));
const baseFill = "white";
const baseStroke = "#e9ecef";
const hoverStroke = "#adb5bd";
let dragStart = null;
let selectedRange = null;

const svg = d3.select("svg.playing-graph");

const selection = svg
  .append("rect")
  .attr("class", "selection")
  .attr("fill", "none")
  .attr("stroke", hoverStroke)
  .attr("stroke-width", 2)
  .style("pointer-events", "none")
  .attr("width", 0)
  .attr("height", 0);

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
    const inSelectedRange =
      selectedRange &&
      d.col >= selectedRange.minCol &&
      d.col <= selectedRange.maxCol &&
      d.row >= selectedRange.minRow &&
      d.row <= selectedRange.maxRow;
    if (inSelectedRange) return;
  })
  .on("mouseleave", function (event, d) {
    const inSelectedRange =
      selectedRange &&
      d.col >= selectedRange.minCol &&
      d.col <= selectedRange.maxCol &&
      d.row >= selectedRange.minRow &&
      d.row <= selectedRange.maxRow;
    if (inSelectedRange) return;
    d3.select(this).attr("stroke", baseStroke);
  });

svg.call(drag);
