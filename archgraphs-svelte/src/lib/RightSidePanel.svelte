<script>
  import { activePage, setActivePage, hoveredDetails } from "../stores.js";
</script>

<div class="top-right-panel">
  <div class="company-name">FRANK LLOYD WRIGHT</div>
  <button class="nav-button" on:click={() => setActivePage("about")}
    >about</button
  >
  <button class="nav-button" on:click={() => setActivePage("projects")}
    >projects</button
  >
  <button class="nav-button" on:click={() => setActivePage("drawing board")}
    >drawing board</button
  >
</div>

<div class="bottom-right-panel">
  <p class="project-details">Project Name: {$hoveredDetails.name}</p>
  <p class="project-details">Project Address: {$hoveredDetails.address}</p>
  <p class="project-details">Client Name: {$hoveredDetails.client}</p>
  <p class="project-details">Drawing Title: {$hoveredDetails.title}</p>
</div>

<style>
  .top-right-panel {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  .company-name {
    border-bottom: 1px solid black;
    text-align: center;
    font-family: Josefin Sans;
    font-weight: 900;
    font-size: 18px;
    letter-spacing: 2px;
    padding: 6px;
    padding-bottom: 10px;
  }
  .nav-button {
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
  }
</style>
