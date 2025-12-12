import { readable, writable } from "svelte/store";

export const activePage = readable("drawing board");

export const hoveredDetails = writable({
  name: "",
  address: "",
  client: "",
  title: "",
});

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
