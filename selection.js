function getNextImageHref(state, config) {
  const list = config.selectionImagesList || [];
  if (!list.length) return null;
  const href = list[state.nextImageIndex % list.length];
  state.nextImageIndex += 1;
  return href;
}

export function createSelectionsLayer(svg) {
  return svg.append("g").attr("class", "selections");
}

export function createSelectionOverlay(svg, hoverStroke) {
  return svg
    .append("rect")
    .attr("class", "selection")
    .attr("fill", "none")
    .attr("stroke", hoverStroke)
    .attr("stroke-width", 2)
    .style("pointer-events", "none")
    .attr("width", 0)
    .attr("height", 0);
}

export function createSelectionImage(svg, href) {
  return svg
    .append("image")
    .attr("class", "selection-image")
    .attr("href", href || "")
    .attr("preserveAspectRatio", "xMidYMid meet")
    .style("pointer-events", "none")
    .attr("width", 0)
    .attr("height", 0);
}

export function renderSelections({ selectionsLayer, selections, hoverStroke }) {
  const sel = selectionsLayer
    .selectAll("g.saved-selection")
    .data(selections)
    .join((enter) => {
      const g = enter.append("g").attr("class", "saved-selection");
      g.append("image")
        .attr("class", "selection-image")
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
    .attr("href", (d) => d.href || "")
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

export function buildDragBehavior({
  svg,
  selection,
  selectionImage,
  selectionsLayer,
  state,
  config,
  clampToGrid,
  renderSelections: renderSelectionsFn,
  onSelectionComplete,
}) {
  const { cellSize, cols, rows, gutter = 0 } = config;

  return d3
    .drag()
    .on("start", (event) => {
      state.dragStart = clampToGrid(event.x, event.y, {
        cellSize,
        cols,
        rows,
        gutter,
      });
      state.selectedRange = null;
      state.currentHref = getNextImageHref(state, config);
      selection.raise();
      selectionImage
        .raise()
        .attr("href", state.currentHref || "")
        .attr("width", 0)
        .attr("height", 0);
    })
    .on("drag", (event) => {
      if (!state.dragStart) return;
      const dragEnd = clampToGrid(event.x, event.y, {
        cellSize,
        cols,
        rows,
        gutter,
      });
      const minCol = Math.min(state.dragStart.col, dragEnd.col);
      const maxCol = Math.max(state.dragStart.col, dragEnd.col);
      const minRow = Math.min(state.dragStart.row, dragEnd.row);
      const maxRow = Math.max(state.dragStart.row, dragEnd.row);

      const x = gutter + minCol * cellSize;
      const y = minRow * cellSize;
      const width = (maxCol - minCol + 1) * cellSize;
      const height = (maxRow - minRow + 1) * cellSize;

      selection
        .attr("x", x)
        .attr("y", y)
        .attr("width", width)
        .attr("height", height);

      selectionImage
        .attr("x", x)
        .attr("y", y)
        .attr("width", width)
        .attr("height", height);
    })
    .on("end", (event) => {
      if (state.dragStart) {
        const dragEnd = clampToGrid(event.x, event.y, {
          cellSize,
          cols,
          rows,
          gutter,
        });
        state.selectedRange = {
          minCol: Math.min(state.dragStart.col, dragEnd.col),
          maxCol: Math.max(state.dragStart.col, dragEnd.col),
          minRow: Math.min(state.dragStart.row, dragEnd.row),
          maxRow: Math.max(state.dragStart.row, dragEnd.row),
        };

        const x = gutter + state.selectedRange.minCol * cellSize;
        const y = state.selectedRange.minRow * cellSize;
        const width =
          (state.selectedRange.maxCol - state.selectedRange.minCol + 1) *
          cellSize;
        const height =
          (state.selectedRange.maxRow - state.selectedRange.minRow + 1) *
          cellSize;

        const href =
          state.currentHref ||
          (config.selectionImagesList && config.selectionImagesList[0]) ||
          "";

        state.selections.push({
          ...state.selectedRange,
          x,
          y,
          width,
          height,
          href,
        });

        renderSelectionsFn();

        selectionImage
          .raise()
          .attr("href", href)
          .attr("x", x)
          .attr("y", y)
          .attr("width", width)
          .attr("height", height);

        if (onSelectionComplete) onSelectionComplete(href);
        console.log("Selection image:", href);
      }
      state.dragStart = null;
      state.selectedRange = null;
      state.currentHref = null;
    });
}
