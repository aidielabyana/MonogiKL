/* MANOGI · KL — shared header, footer, WhatsApp float (injected so every page stays in sync) */

const ICON_BAG =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M6 8h12l-1 12H7L6 8Z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>';

const ICON_WHATSAPP =
  '<svg viewBox="0 0 32 32" fill="#fff"><path d="M16 3C9.1 3 3.5 8.6 3.5 15.5c0 2.4.7 4.7 1.9 6.6L3 29l7.1-2.3a12.4 12.4 0 0 0 5.9 1.5c6.9 0 12.5-5.6 12.5-12.5S22.9 3 16 3Zm0 22.6c-2 0-3.9-.5-5.6-1.5l-.4-.2-4.2 1.4 1.4-4.1-.3-.4a10.3 10.3 0 0 1-1.6-5.5C5.3 9.7 10.1 5 16 5s10.7 4.7 10.7 10.5S21.9 25.6 16 25.6Zm5.9-7.9c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.3-.2-1.4-.5-2.6-1.6-1-.9-1.6-2-1.8-2.3-.2-.3 0-.5.1-.6.1-.1.3-.4.5-.5.2-.2.2-.3.3-.5.1-.2 0-.4 0-.6 0-.2-.7-1.8-1-2.4-.3-.6-.5-.5-.7-.6h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.3 5.2 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.9-.8 2.1-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.2-.6-.4Z"/></svg>';

function homeHref(hash) {
  const onIndex = !document.body.dataset.page || document.body.dataset.page === "index.html";
  return onIndex ? hash : "index.html" + hash;
}

function renderHeader(active) {
  const host = document.getElementById("site-header");
  if (!host) return;
  const onIndex = !active || active === "index.html";
  const links = [
    { href: homeHref("#shop"), label: "Shop" },
    { href: homeHref("#contact"), label: "Contact" },
  ];
  host.innerHTML =
    '<div class="wrap site-header__row">' +
    '<a href="' + homeHref("#top") + '" class="wordmark">MANOGI<span>·</span>KL</a>' +
    '<nav class="site-nav">' +
    links.map((l) => '<a href="' + l.href + '">' + l.label + "</a>").join("") +
    "</nav>" +
    '<div class="header-actions">' +
    '<a href="cart.html" class="icon-link"' + (active === "cart.html" ? ' aria-current="page"' : "") + ' aria-label="View cart">' +
    ICON_BAG +
    '<span class="cart-badge" data-cart-count>0</span>' +
    "</a>" +
    "</div>" +
    "</div>";
  renderCartBadge();
}

function renderFooter() {
  const host = document.getElementById("site-footer");
  if (!host) return;
  host.innerHTML =
    '<div class="wrap">' +
    '<div class="footer-grid reveal-stagger">' +
    "<div>" +
    '<div class="wordmark" style="margin-bottom:0.9rem;">MANOGI<span>·</span>KL</div>' +
    '<p class="muted" style="max-width:34ch; font-size:0.9rem; line-height:1.7;">Niche fragrance out of Kuala Lumpur. Small batches, worn close, kept quiet.</p>' +
    "</div>" +
    "<div><h4>Shop</h4><ul>" +
    PRODUCTS.map((p) => '<li><a href="' + homeHref("#product-" + p.id) + '">' + p.name + "</a></li>").join("") +
    '<li><a href="' + homeHref("#shop") + '">All fragrances</a></li>' +
    "</ul></div>" +
    "<div><h4>Support</h4><ul>" +
    '<li><a href="' + homeHref("#contact") + '">Contact us</a></li>' +
    '<li><a href="' + waLink("Hi MANOGI·KL, I have a question.") + '" target="_blank" rel="noopener">WhatsApp us</a></li>' +
    '<li><a href="mailto:' + STORE.email + '">' + STORE.email + "</a></li>" +
    "</ul></div>" +
    "</div>" +
    '<hr class="hairline" style="margin-bottom:1.4rem;" />' +
    '<div class="footer-bottom">' +
    "<span>&copy; " + new Date().getFullYear() + " MANOGI · KL — demo store, Kuala Lumpur.</span>" +
    "<span>Prices in MYR. For demonstration only.</span>" +
    "</div>" +
    "</div>";
}

function renderWaFloat() {
  if (document.querySelector(".wa-float")) return;
  const a = document.createElement("a");
  a.className = "wa-float";
  a.href = waLink("Hi MANOGI·KL, I'd like to ask about your fragrances.");
  a.target = "_blank";
  a.rel = "noopener";
  a.setAttribute("aria-label", "Chat with us on WhatsApp");
  a.innerHTML = '<span class="wa-float__icon">' + ICON_WHATSAPP + "</span><span class=\"wa-float__label\">Chat on WhatsApp</span>";
  document.body.appendChild(a);
}

function initScrollReveal() {
  if (!("IntersectionObserver" in window)) {
    document.querySelectorAll(".reveal, .reveal-stagger").forEach((el) => el.classList.add("is-revealed"));
    return;
  }

  const breathing = document.querySelectorAll(".tile, .hero-photo");
  if (breathing.length) {
    const ioBreathing = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.target.classList.toggle("is-revealed", entry.isIntersecting)),
      { threshold: 0.35 }
    );
    breathing.forEach((t) => ioBreathing.observe(t));
  }

  const once = document.querySelectorAll(".reveal, .reveal-stagger");
  if (once.length) {
    const ioOnce = new IntersectionObserver(
      (entries, observer) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.15 }
    );
    once.forEach((t) => ioOnce.observe(t));
  }
}

function initHeaderScroll() {
  const header = document.getElementById("site-header");
  if (!header) return;
  let ticking = false;
  const update = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 8);
    ticking = false;
  };
  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    },
    { passive: true }
  );
  update();
}

document.addEventListener("DOMContentLoaded", () => {
  renderHeader(document.body.dataset.page);
  renderFooter();
  renderWaFloat();
  initScrollReveal();
  initHeaderScroll();
});