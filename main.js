import { config as baseConfig } from "./config.js";
import { computeGridDimensions, clampToGrid } from "./gridMath.js";
import { buildGrid } from "./grid.js";
import {
  createSelectionOverlay,
  createSelectionImage,
  createSelectionsLayer,
  renderSelections,
  buildDragBehavior,
} from "./selection.js";

const dimensions = computeGridDimensions(baseConfig.cellSize);
const gridConfig = { ...baseConfig, ...dimensions };

const svg = d3.select("svg.playing-graph");
const selectionsLayer = createSelectionsLayer(svg);
const selection = createSelectionOverlay(svg, gridConfig.hoverStroke);
const selectionImage = createSelectionImage(
  svg,
  gridConfig.selectionImagesList?.[0] || ""
);

const state = {
  dragStart: null,
  selectedRange: null,
  selections: [],
  nextImageIndex: 0,
  currentHref: null,
};

const renderSelectionsBound = () =>
  renderSelections({
    selectionsLayer,
    selections: state.selections,
    hoverStroke: gridConfig.hoverStroke,
  });

const clearButton = document.querySelector(".clear-button");
const showClearButton = () => {
  if (clearButton) clearButton.style.display = "inline-block";
};

const drag = buildDragBehavior({
  svg,
  selection,
  selectionImage,
  selectionsLayer,
  state,
  config: gridConfig,
  clampToGrid,
  renderSelections: renderSelectionsBound,
  onSelectionComplete: showClearButton,
});

svg.call(drag);
buildGrid({ svg, config: gridConfig, state });

if (clearButton) {
  clearButton.style.display = "none";
  clearButton.addEventListener("click", () => {
    state.selections.length = 0;
    renderSelectionsBound();
    state.selectedRange = null;
    selection.attr("width", 0).attr("height", 0);
    selectionImage.attr("width", 0).attr("height", 0);
    svg.selectAll("rect.grid").attr("stroke", gridConfig.baseStroke);
    clearButton.style.display = "none";
  });
}
