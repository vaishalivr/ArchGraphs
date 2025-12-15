<script>
  import { activePage, setActivePage, hoveredDetails } from "../stores.js";
  import { onMount } from "svelte";
  const companyName = "FRANK LLOYD WRIGHT";
  const typingSpeed = 450; // milliseconds per character
  let i = 0;
  let companyEl;

  onMount(() => {
    const typeWriter = () => {
      if (i < companyName.length) {
        companyEl.innerHTML += companyName.charAt(i);
        i++;
        setTimeout(typeWriter, typingSpeed);
      }
    };
    typeWriter();
  });
</script>

<div class="top-right-panel">
  <div id="company-name" bind:this={companyEl}></div>
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
  #company-name {
    background-color: #cc3d33;
    min-height: 60px;
    display: flex;
    color: white;
    align-items: center;
    text-align: center;
    justify-content: center;
    font-family: Josefin Sans;
    font-weight: 900;
    font-size: 18px;
    letter-spacing: 0.1em;
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
