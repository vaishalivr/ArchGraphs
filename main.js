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

const shuffledImages =
  baseConfig.selectionImagesList?.slice().sort(() => Math.random() - 0.5) || [];

const gutter = baseConfig.cellSize * (baseConfig.gutterCells || 0);
const dimensions = computeGridDimensions(baseConfig.cellSize, gutter);
const gridConfig = {
  ...baseConfig,
  selectionImagesList: shuffledImages,
  ...dimensions,
  gutter,
};

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

const logContainer = document.querySelector(".log-container");
const addLogEntry = (href) => {
  if (!logContainer) return;
  const name = href ? href.split("/").pop() : "unknown";
  const entry = document.createElement("div");
  entry.className = "log-entry";
  entry.textContent = name;
  logContainer.appendChild(entry);
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
  onSelectionComplete: (href) => {
    showClearButton();
    addLogEntry(href);
  },
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
    if (logContainer) logContainer.innerHTML = "";
    clearButton.style.display = "none";
  });
}
