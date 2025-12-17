<script>
  import { imageRectangles } from "../stores.js";

  let start = null;
  let end = null;
  let circlePadding = 15;

  const dragStart = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    start = { x: event.clientX - rect.left, y: event.clientY - rect.top };
  };

  const dragMove = (event) => {
    if (!start || event.buttons === 0) return;
    const rect = event.currentTarget.getBoundingClientRect();
    end = { x: event.clientX - rect.left, y: event.clientY - rect.top };
  };

  const dragEnd = () => {
    if (rect) {
      imageRectangles.update((recs) => [...recs, rect]);
    }
    start = null;
    end = null;
  };

  const removeRectangle = (rect) => {
    imageRectangles.update((recs) => recs.filter((rec) => rec !== rect));
  };

  const handleDeleteKey = (event, rect) => {
    if (
      event.key === "Enter" ||
      event.key === " " ||
      event.key === "Spacebar"
    ) {
      event.preventDefault();
      removeRectangle(rect);
    }
  };

  $: rect =
    start && end
      ? {
          x: Math.min(start.x, end.x),
          y: Math.min(start.y, end.y),
          width: Math.abs(end.x - start.x),
          height: Math.abs(end.y - start.y),
        }
      : null;
</script>

<div style="width: 100%; height: 100%;">
  <svg
    width="100%"
    height="100%"
    on:mousedown={dragStart}
    on:mousemove={dragMove}
    on:mouseup={dragEnd}
    role="button"
    tabindex="0"
  >
    {#each $imageRectangles as r}
      <g>
        <rect
          x={r.x}
          y={r.y}
          width={r.width}
          height={r.height}
          stroke="black"
          stroke-width="2"
          fill="transparent"
        />
        <circle
          cx={r.x + r.width - circlePadding}
          cy={r.y + circlePadding}
          r="9"
          fill="red"
          cursor="pointer"
          role="button"
          tabindex="0"
          on:click={() => removeRectangle(r)}
          on:keydown={(event) => handleDeleteKey(event, r)}
        />
      </g>
    {/each}

    {#if rect}<rect
        x={rect.x}
        y={rect.y}
        width={rect.width}
        height={rect.height}
        stroke="black"
        stroke-width="2"
        fill="transparent"
      />
    {/if}
  </svg>
</div>

<style>
  *:focus {
    outline: none;
  }
</style>
