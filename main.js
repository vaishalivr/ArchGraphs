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

//const gutter = baseConfig.cellSize * (baseConfig.gutterCells || 0);
const gutter = (1 / 6) * window.innerWidth;
document.documentElement.style.setProperty("--drawer-width", `${gutter}px`);
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
  onPointerMove: (x, y) => {
    if (customCursor) {
      customCursor.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
    }
  },
});

svg.call(drag);
buildGrid({ svg, config: gridConfig, state });

const customCursor = document.querySelector(".custom-cursor");
if (customCursor) {
  customCursor.style.display = "none";
  const svgEl = document.querySelector("svg.playing-graph");
  if (svgEl) {
    svgEl.addEventListener("mouseenter", () => {
      console.log("mouse entered");
      customCursor.style.display = "flex";
    });
    svgEl.addEventListener("mouseleave", () => {
      console.log("mouse left");
      customCursor.style.display = "none";
    });
    svgEl.addEventListener("mousemove", (e) => {
      console.log("mouse moved");
      customCursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
    });
  }
}

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
