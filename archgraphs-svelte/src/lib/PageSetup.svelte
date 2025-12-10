<script>
  let activePage = "drawing board"; //about | projects | drawing board
</script>

<div class="page-border">
  <div class="page-split">
    <div class="side left">
      {#if activePage === "about"}
        <div>about page</div>
      {:else if activePage === "projects"}
        <div>projects page</div>
      {:else if activePage === "drawing board"}
        <div>default + drawing board page</div>
      {/if}
    </div>
    <div class="side right">
      <div class="top-right-panel">
        <div class="company-name">FRANK LLOYD WRIGHT</div>
        <button class="nav-button" on:click={() => (activePage = "about")}
          >about</button
        >
        <button class="nav-button" on:click={() => (activePage = "projects")}
          >projects</button
        >

        <button
          class="nav-button"
          on:click={() => (activePage = "drawing board")}>drawing board</button
        >
      </div>
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
  }
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
</style>
