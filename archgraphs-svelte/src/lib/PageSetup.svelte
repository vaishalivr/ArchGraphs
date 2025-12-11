<script>
  let activePage = "drawing board"; //about | projects | drawing board
</script>

<div class="page-border">
  <div class="page-split">
    <div class="side left">
      {#if activePage === "about"}
        <div>
          Frank Lloyd Wright (1867–1959) was an American architect known for
          “organic architecture,” designing buildings that harmonize with their
          surroundings. Over a 70-year career, he created more than 1,000
          structures, including Fallingwater, the Guggenheim Museum, and the
          Prairie-style homes that emphasized open plans and horizontal lines.
        </div>
      {:else if activePage === "projects"}
        <div>
          <p>Fallingwater (Mill Run, PA)</p>
          <p>Solomon R. Guggenheim Museum (New York, NY)</p>
          <p>Robie House (Chicago, IL)</p>
          <p>Taliesin (Spring Green, WI)</p>
          <p>Taliesin West (Scottsdale, AZ)</p>
          <p>Unity Temple (Oak Park, IL)</p>
          <p>Hollyhock House (Los Angeles, CA)</p>
          <p>Johnson Wax Headquarters &amp; Research Tower (Racine, WI)</p>
          <p>Imperial Hotel (Tokyo, Japan – demolished)</p>
          <p>Marin County Civic Center (San Rafael, CA)</p>
        </div>
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
      <div class="bottom-right-panel">
        <p class="project-details">Project Name:</p>
        <p class="project-details">Project Address:</p>
        <p class="project-details">Client Name:</p>
        <p class="project-details">Drawing Title:</p>
        <p class="project-details">Scale:</p>
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
    justify-content: space-between; /* spread top/bottom panels to edges */
    flex-direction: column;
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
  .project-details {
    border-top: 1px solid black;
    font-family: Josefin Sans;
    padding: 12px;
  }
</style>
