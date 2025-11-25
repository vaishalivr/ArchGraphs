export function computeGridDimensions(cellSize) {
  return {
    cols: Math.max(1, Math.floor(window.innerWidth / cellSize)),
    rows: Math.max(1, Math.floor(window.innerHeight / cellSize)),
  };
}

export function clampToGrid(x, y, { cellSize, cols, rows }) {
  const col = Math.max(0, Math.min(cols - 1, Math.floor(x / cellSize)));
  const row = Math.max(0, Math.min(rows - 1, Math.floor(y / cellSize)));
  return { col, row };
}
