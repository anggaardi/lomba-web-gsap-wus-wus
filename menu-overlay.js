class MenuOverlay extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="menu-overlay">
        <button id="close-menu">×</button>
        <div class="menu-content">
          <div class="menu-items">
            <div class="col-lg">
              <div class="menu-preview-img">
                <img src="./image/latte.png" alt="">
              </div>
            </div>
            <div class="col-sm">
              <div class="menu-links">
                <div class="link"><a href="index.html" data-img="./image/cappucino.png">Home</a></div>
                <div class="link"><a href="work.html" data-img="./image/cortado.png">Works</a></div>
                <div class="link"><a href="#" data-img="./image/latte.png">About</a></div>
                <div class="link"><a href="#" data-img="./image/cappucino.png">Contact</a></div>
              </div>
              <div class="menu-socials">
                <div class="social"><a href="#">Behance</a></div>
                <div class="social"><a href="#">Dribbble</a></div>
                <div class="social"><a href="#">LinkedIn</a></div>
                <div class="social"><a href="#">Instagram</a></div>
              </div>
            </div>
          </div>
          <div class="menu-footer">
            <div class="col-lg"><a href="#">Run sequence</a></div>
            <div class="col-sm">
              <a href="#">Origin</a>
              <a href="#">Join signal</a>
              <a href="#">Join signal</a>

            </div>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define("menu-overlay", MenuOverlay);
