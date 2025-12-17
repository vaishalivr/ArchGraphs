<script>
  import About from "./About.svelte";
  import Projects from "./Projects.svelte";
  import DrawingBoard from "./DrawingBoard.svelte";
  import RightSidePanel from "./RightSidePanel.svelte";
  import { activePage, setActivePage } from "../stores.js";
  import { drawCursorSVG } from "./cursorConfig.js";

  //const drawCursorSVG =
  //"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='50' height='60'><circle cx='25' cy='25' r='24' fill='none' stroke='black' stroke-width='1'/><text x='25' y='30' font-size='15' text-anchor='middle'>+</text><text x='25' y='60' font-family='Montserrat, sans-serif' font-size='9' text-anchor='middle'>DRAW</text></svg>";
  // const dragCursorSVG =
  //   "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='50' height='60'><circle cx='25' cy='25' r='24' fill='none' stroke='black' stroke-width='1'/><text x='25' y='30' font-size='15' text-anchor='middle'>+</text><text x='25' y='60' font-family='Montserrat, sans-serif' font-size='9' text-anchor='middle'>DRAG</text></svg>";
</script>

<div class="page-border">
  <div class="page-split">
    <div
      class="side left"
      class:drawing-cursor={$activePage === "drawing board"}
      style:cursor={$activePage === "drawing board"
        ? `url("${drawCursorSVG}") 25 25, auto`
        : "auto"}
    >
      {#if $activePage === "about"}
        <About />
      {:else if $activePage === "projects"}
        <Projects />
      {:else if $activePage === "drawing board"}
        <DrawingBoard />
      {/if}
    </div>

    <div class="side right">
      <RightSidePanel />
    </div>
  </div>
</div>

<style>
  .page-border {
    width: 100vw;
    height: 100vh;
    /* border: 1px solid red; */
    box-sizing: border-box;
    position: fixed;
    outline-offset: -30px;
  }

  .page-split {
    inset: 30px;
    position: absolute;
    display: flex;
    gap: 20px;
  }
  .side {
    display: flex;
    width: 50%;
    border: 1px solid black;
  }
  .left {
    flex: 5;
  }
  .right {
    flex: 1;
    justify-content: space-between; /* spread top/bottom panels to edges */
    flex-direction: column;
  }
</style>
