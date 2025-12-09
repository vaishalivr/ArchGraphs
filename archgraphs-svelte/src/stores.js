import { readable } from "svelte/store";

// Centralized UI/config values you can expand as you wire features.
export const uiConfig = readable({
  cellSize: 30,
  drawerWidth: 180,
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
