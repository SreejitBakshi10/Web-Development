class NavigationBar extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `
    <section class="nav-bar">
    <div class="logo">
      <a href="index.html"><img src="gallery/logo.png" alt="Utopia Tours & Travels Logo"></a>
      Utopia Tours & Travels
    </div>
    <ul class="menu">
      <li><a href="index.html">home</a></li>
      <li><a href="locations.html">locations</a></li>
      <li><a href="packages.html">packages</a></li>
      <li><a href="about.html">about us</a></li>
      <li><a href="contact.html">contact us</a></li>
    </ul>
  </section>
    `;
  }
}
customElements.define('navigation-bar', NavigationBar);

class Footer extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `
      <div class="footer">
        <div class="links">
          <h3>Quick Links</h3>
            <ul>
              <li><a href="offers-discounts.html">Offers & Discounts</a></li>
              <li><a href="contact.html">Contact Us</a></li>
              <li><a href="about.html">About Us</a></li>
            </ul>
        </div>
        <div class="links">
            <h3>Support</h3>
            <ul>
              <li><a href="payment-issue.html">Report a Payment Issue</a></li>
              <li><a href="terms-and-conditions.html">Terms & Conditions</a></li>
              <li><a href="privacy-policy.html">Privacy Policy</a></li>
              <li><a href="faq.html">FAQ</a></li>
            </ul>
        </div>
      </div>
    `;
  }
}
customElements.define('footer-component', Footer);

class Top extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `
    <div class="back-to-top-btn">
        <a href="#top">
            <div class="circle">
                <div class="arrow"></div>
            </div>
        </a>
    </div>
    `;
  }
}
customElements.define('top-button', Top);