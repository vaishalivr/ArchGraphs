<div class="page-border">
  <div class="page-split">
    <div class="side left">
      <div style="border: 1px solid red;">landing container</div>
    </div>
    <div class="side right">
      <div class="top-right-panel">
        <div class="company-name" style="cursor: pointer;">
          FRANK LLOYD WRIGHT
        </div>
        <div class="nav-button">about</div>
        <div>projects</div>
        <div>contact</div>
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
    inset: 0;
  }

  .page-border::after {
    inset: 30px;
    content: "";
    position: absolute;
    box-sizing: border-box;
    pointer-events: none; /* avoid blocking pointer styles/clicks below */
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
    border: 1px solid blue;
    text-align: center;
    font-family: Josefin Sans;
    font-weight: 700;
    font-size: 18px;
    letter-spacing: 2px;
    padding: 6px;
    padding-bottom: 10px;
  }
  .nav-button {
    cursor: pointer;
  }
</style>
