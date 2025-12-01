export function computeGridDimensions(cellSize, gutter = 0) {
  return {
    cols: Math.max(
      1,
      Math.floor(Math.max(0, window.innerWidth - gutter) / cellSize)
    ),
    rows: Math.max(1, Math.floor(window.innerHeight / cellSize)),
  };
}

export function clampToGrid(x, y, { cellSize, cols, rows, gutter = 0 }) {
  const gridX = x - gutter;
  const col = Math.max(0, Math.min(cols - 1, Math.floor(gridX / cellSize)));
  const row = Math.max(0, Math.min(rows - 1, Math.floor(y / cellSize)));
  return { col, row };
}
