export function buildGrid({ svg, config, state }) {
  const { cols, rows, cellSize, baseFill, baseStroke, gutter = 0 } = config;

  const gridLayer = svg.append("g").attr("class", "grid-layer");
  //.attr("transform", `translate(${gutter},0)`);

  gridLayer
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
      const inAnySelection = state.selections.some(
        (s) =>
          d.col >= s.minCol &&
          d.col <= s.maxCol &&
          d.row >= s.minRow &&
          d.row <= s.maxRow
      );
      if (inAnySelection) return;
    })
    .on("mouseleave", function (event, d) {
      const inAnySelection = state.selections.some(
        (s) =>
          d.col >= s.minCol &&
          d.col <= s.maxCol &&
          d.row >= s.minRow &&
          d.row <= s.maxRow
      );
      if (inAnySelection) return;
      d3.select(this).attr("stroke", baseStroke);
    });
}
