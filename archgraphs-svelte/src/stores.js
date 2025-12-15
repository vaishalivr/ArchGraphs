import { readable, writable } from "svelte/store";

export const activePage = writable("drawing board"); //about | projects | drawing board
export const setActivePage = (page) => {
  activePage.set(page);
};

export const hoveredDetails = writable({
  name: "",
  address: "",
  client: "",
  title: "",
});
export const setHoveredDetails = (details) => {
  hoveredDetails.set(details);
};

export const imageRectangles = writable([]);
export const clearRectangles = () => {
  imageRectangles.set([]);
};

export const uiConfig = readable({
  cellSize: 30,
  hoverStroke: "#adb5bd",
  baseStroke: "#e9ecef",
  baseFill: "#ffffff",
  images: [
    "image-1.png",
    "image-2.png",
    "image-3.png",
    "image-4.png",
    "image-5.png",
  ],
});
