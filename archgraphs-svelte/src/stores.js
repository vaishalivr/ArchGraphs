import { readable } from "svelte/store";

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
