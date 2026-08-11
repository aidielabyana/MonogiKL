/* MANOGI · KL — cart, toast and WhatsApp helpers (demo, localStorage-backed) */

const CART_KEY = "manogi_cart";

function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch (e) {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  renderCartBadge();
  renderCartBar();
}

function addToCart(id, qty) {
  qty = Math.max(1, qty || 1);
  const cart = getCart();
  const line = cart.find((l) => l.id === id);
  if (line) {
    line.qty += qty;
  } else {
    cart.push({ id, qty });
  }
  saveCart(cart);
}

function setQty(id, qty) {
  qty = Math.max(1, qty || 1);
  const cart = getCart();
  const line = cart.find((l) => l.id === id);
  if (line) line.qty = qty;
  saveCart(cart);
}

function removeFromCart(id) {
  saveCart(getCart().filter((l) => l.id !== id));
}

function clearCart() {
  saveCart([]);
}

function cartLines() {
  return getCart()
    .map((l) => ({ ...l, product: getProduct(l.id) }))
    .filter((l) => l.product);
}

function cartCount() {
  return getCart().reduce((sum, l) => sum + l.qty, 0);
}

function cartSubtotal() {
  return cartLines().reduce((sum, l) => sum + l.product.price * l.qty, 0);
}

function formatPrice(amount) {
  return STORE.currency + " " + amount.toFixed(2);
}

let _lastCartCount = null;

function renderCartBadge() {
  const n = cartCount();
  const grew = _lastCartCount !== null && n > _lastCartCount;
  document.querySelectorAll("[data-cart-count]").forEach((el) => {
    el.textContent = n;
    el.style.display = n > 0 ? "flex" : "none";
    if (grew) {
      const link = el.closest(".icon-link") || el;
      el.classList.remove("is-bumping");
      link.classList.remove("is-bumping");
      void el.offsetWidth;
      el.classList.add("is-bumping");
      link.classList.add("is-bumping");
      setTimeout(() => {
        el.classList.remove("is-bumping");
        link.classList.remove("is-bumping");
      }, 500);
    }
  });
  _lastCartCount = n;
}

function renderCartBar() {
  const page = document.body.dataset.page;
  const eligible = !page || page === "index.html";
  const n = cartCount();
  let bar = document.querySelector(".cart-bar");

  if (!eligible || n === 0) {
    if (bar) bar.classList.remove("is-visible");
    document.documentElement.style.setProperty("--cart-bar-offset", "0px");
    return;
  }

  if (!bar) {
    bar = document.createElement("div");
    bar.className = "cart-bar";
    document.body.appendChild(bar);
  }

  bar.innerHTML =
    '<div class="cart-bar__info">' +
    '<span class="cart-bar__count">' + n + (n === 1 ? " item in bag" : " items in bag") + "</span>" +
    '<span class="cart-bar__subtotal">' + formatPrice(cartSubtotal()) + "</span>" +
    "</div>" +
    '<div class="cart-bar__actions">' +
    '<a href="cart.html" class="btn btn--ghost">View Bag</a>' +
    '<a href="checkout.html" class="btn btn--primary">Checkout</a>' +
    "</div>";

  requestAnimationFrame(() => bar.classList.add("is-visible"));
  document.documentElement.style.setProperty("--cart-bar-offset", "5.4rem");
}

function showToast(message) {
  let toast = document.querySelector(".toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add("is-visible");
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove("is-visible"), 2400);
}

function waLink(message) {
  return "https://wa.me/" + STORE.whatsappNumber + "?text=" + encodeURIComponent(message);
}

function waOrderMessage() {
  const lines = cartLines();
  if (!lines.length) {
    return "Hi MANOGI·KL, I'd like to ask about your fragrances.";
  }
  let msg = "Hi MANOGI·KL, I'd like to order:\n";
  lines.forEach((l) => {
    msg += "• " + l.product.name + " × " + l.qty + " (" + formatPrice(l.product.price * l.qty) + ")\n";
  });
  msg += "Subtotal: " + formatPrice(cartSubtotal());
  return msg;
}

document.addEventListener("DOMContentLoaded", () => {
  renderCartBadge();
  renderCartBar();
});