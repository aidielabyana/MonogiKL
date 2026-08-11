/* MANOGI · KL — one-page shop: teaser tiles + full product detail sections */

function productStageHTML(product) {
  const photos = product.gallery;
  if (!photos) {
    return '<div class="pd-stage">' + bottleHTML(product, "bottle--lg") + "</div>";
  }
  return (
    '<div class="pd-stage pd-stage--photo">' +
    '<div class="pd-photo"><img data-role="photo-main" src="' + photos[0] + '" alt="' + product.name + ' eau de parfum" /></div>' +
    '<div class="pd-thumbs">' +
    photos
      .map(
        (src, i) =>
          '<button type="button" class="pd-thumb' + (i === 0 ? " is-active" : "") + '" data-img="' + src + '"><img src="' + src + '" alt="" /></button>'
      )
      .join("") +
    "</div></div>"
  );
}

function productSectionHTML(product, index) {
  const reverseClass = index % 2 === 1 ? " pd-grid--reverse" : "";
  return (
    '<div class="pd-grid reveal' + reverseClass + '" id="product-' + product.id + '" data-product="' + product.id + '">' +
    productStageHTML(product) +
    '<div class="pd-info">' +
    '<span class="eyebrow">' + product.tagline + "</span>" +
    '<h3 style="font-family:var(--serif); font-weight:500; font-style:italic; font-size:clamp(1.9rem,3.4vw,2.6rem); margin:0.5rem 0 0.6rem;">' + product.name + "</h3>" +
    '<p class="pd-price price">' + formatPrice(product.price) + " &middot; 50ml</p>" +
    '<p class="pd-desc">' + product.description + "</p>" +
    '<div class="notes-table">' +
    '<div class="notes-row"><span class="label">Top</span><span>' + product.notes.top + "</span></div>" +
    '<div class="notes-row"><span class="label">Heart</span><span>' + product.notes.heart + "</span></div>" +
    '<div class="notes-row"><span class="label">Base</span><span>' + product.notes.base + "</span></div>" +
    "</div>" +
    '<div class="pd-actions">' +
    '<div class="qty-stepper">' +
    '<button type="button" data-qty-minus aria-label="Decrease quantity">&minus;</button>' +
    '<input type="text" inputmode="numeric" data-role="qty" value="1" readonly />' +
    '<button type="button" data-qty-plus aria-label="Increase quantity">+</button>' +
    "</div>" +
    '<button type="button" class="btn btn--primary" data-role="add">Add to Bag</button>' +
    "</div>" +
    '<a class="btn btn--whatsapp" href="' + waLink("Hi MANOGI·KL, I'd like to ask about " + product.name + " (" + formatPrice(product.price) + ").") + '" target="_blank" rel="noopener" style="width:fit-content; margin-bottom:2rem;">Ask about ' + product.name + " on WhatsApp</a>" +
    '<div class="accordion">' +
    '<details><summary>Composition &amp; wear</summary><div class="accordion-body">Eau de Parfum, 15% concentration. Expect 6&ndash;8 hours on skin. Apply to pulse points; avoid rubbing.</div></details>' +
    '<details><summary>Shipping &amp; returns</summary><div class="accordion-body">Dispatched within 2 business days from Kuala Lumpur. West Malaysia 2&ndash;3 days, East Malaysia 4&ndash;6 days. Unopened bottles may be returned within 14 days.</div></details>' +
    '<details><summary>Payment</summary><div class="accordion-body">Card, FPX online banking, cash on delivery, or order directly over WhatsApp.</div></details>' +
    "</div>" +
    "</div></div>"
  );
}

function initShopSection() {
  const teaser = document.getElementById("shop-teaser");
  if (teaser) {
    teaser.innerHTML = PRODUCTS.map((p) => tileHTML(p, { quickAdd: true })).join("");
  }

  const detail = document.getElementById("shop-detail");
  if (!detail) return;
  detail.innerHTML = PRODUCTS.map((p, i) => productSectionHTML(p, i)).join('<hr class="hairline" style="margin: clamp(2rem, 6vw, 4rem) 0;" />');

  document.getElementById("shop").addEventListener("click", (e) => {
    const quickAdd = e.target.closest("[data-quick-add]");
    if (quickAdd) {
      e.preventDefault();
      e.stopPropagation();
      const product = getProduct(quickAdd.dataset.quickAdd);
      addToCart(product.id, 1);
      showToast(product.name + " added to bag");
      return;
    }

    const productEl = e.target.closest("[data-product]");
    if (!productEl) return;
    const product = getProduct(productEl.dataset.product);
    const qtyInput = productEl.querySelector('[data-role="qty"]');

    if (e.target.closest("[data-qty-plus]")) {
      qtyInput.value = parseInt(qtyInput.value, 10) + 1;
      return;
    }
    if (e.target.closest("[data-qty-minus]")) {
      qtyInput.value = Math.max(1, parseInt(qtyInput.value, 10) - 1);
      return;
    }
    if (e.target.closest('[data-role="add"]')) {
      addToCart(product.id, parseInt(qtyInput.value, 10));
      showToast(product.name + " added to bag");
      return;
    }
    const thumb = e.target.closest("[data-img]");
    if (thumb) {
      productEl.querySelector('[data-role="photo-main"]').src = thumb.dataset.img;
      productEl.querySelectorAll(".pd-thumb").forEach((t) => t.classList.toggle("is-active", t === thumb));
    }
  });
}

initShopSection();
