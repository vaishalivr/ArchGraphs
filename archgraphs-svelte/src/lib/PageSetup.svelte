<script>
  import About from "./About.svelte";
  import Projects from "./Projects.svelte";
  import DrawingBoard from "./DrawingBoard.svelte";
  import RightSidePanel from "./RightSidePanel.svelte";
  import { activePage, setActivePage } from "../stores.js";

  const cursorSVG =
    "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='50' height='60'><circle cx='25' cy='25' r='24' fill='none' stroke='black' stroke-width='1'/><text x='25' y='30' font-size='15' text-anchor='middle'>+</text><text x='25' y='60' font-family='Montserrat, sans-serif' font-size='9' text-anchor='middle'>DRAG</text></svg>";
</script>

<div class="page-border">
  <div class="page-split">
    <div
      class="side left"
      class:drawing-cursor={activePage === "drawing board"}
      style:cursor={$activePage === "drawing board"
        ? `url("${cursorSVG}") 25 25, auto`
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
    width: 99.9vw;
    height: 99.9vh;
    border: 1px solid #000;
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
    border: 1px solid red;
  }
  .left {
    flex: 5;
  }
  .right {
    flex: 1;
    justify-content: space-between; /* spread top/bottom panels to edges */
    flex-direction: column;
  }
  /* .top-right-panel {
    display: flex;
    flex-direction: column;
    width: 100%;
  } */
  /* .company-name {
    border-bottom: 1px solid black;
    text-align: center;
    font-family: Josefin Sans;
    font-weight: 900;
    font-size: 18px;
    letter-spacing: 2px;
    padding: 6px;
    padding-bottom: 10px;
  } */
  /* .nav-button {
    cursor: pointer;
    font-size: 16px;
    font-family: Josefin Sans;
    text-align: left;
    padding: 10px;
    background-color: transparent;
    border: none;
  }
  .project-details {
    border-top: 1px solid black;
    font-family: Josefin Sans;
    padding: 12px;
  } */
</style>
