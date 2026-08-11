/* MANOGI · KL — product catalog (demo data) */

const STORE = {
  name: "MANOGI · KL",
  currency: "RM",
  whatsappNumber: "60123456789", // demo number — replace with the real business line
  email: "hello@manogi.kl",
};

const PRODUCTS = [
  {
    id: "crave",
    name: "Crave",
    tagline: "Rose-gold and restless.",
    concentration: "Eau de Parfum",
    price: 189,
    liquid: "linear-gradient(180deg, #dba9bd, #a8688c)",
    tileBg: "radial-gradient(circle at 50% 24%, rgba(227,174,196,0.22), transparent 62%), linear-gradient(165deg, #2a1c22, #0a080a)",
    gallery: ["assets/img/crave-slate.jpg", "assets/img/crave-white.jpg"],
    notes: {
      top: "Pink pepper, bergamot",
      heart: "Osmanthus, suede",
      base: "Amber, warm musk",
    },
    description:
      "A close, skin-warm scent built around osmanthus and suede — the one you reach for when you want to be remembered.",
  },
  {
    id: "noir",
    name: "Noir",
    tagline: "Smoke behind glass.",
    concentration: "Extrait Extreme",
    price: 199,
    liquid: "linear-gradient(180deg, #5a4048, #241419)",
    tileBg: "radial-gradient(circle at 50% 22%, rgba(196,131,160,0.14), transparent 60%), linear-gradient(165deg, #201519, #060505)",
    notes: {
      top: "Black cardamom, smoked tea",
      heart: "Leather, dark rose",
      base: "Oud, vetiver",
    },
    description:
      "Cold smoke and dark leather, held together by a single thread of rose. Wears low, lasts long, says little.",
  },
  {
    id: "hush",
    name: "Hush",
    tagline: "Quiet on the skin.",
    concentration: "Eau de Parfum",
    price: 179,
    liquid: "linear-gradient(180deg, #f0dbe4, #d8b3c4)",
    tileBg: "radial-gradient(circle at 50% 24%, rgba(227,174,196,0.26), transparent 62%), linear-gradient(165deg, #241a20, #0a080a)",
    notes: {
      top: "Iris, pink grapefruit",
      heart: "Powdery musk, violet",
      base: "Soft cedar, ambrette",
    },
    description:
      "Powdery iris and soft cedar, worn close. A fragrance for the quiet hours — barely-there, impossible to forget.",
  },
];

function getProduct(id) {
  return PRODUCTS.find((p) => p.id === id) || null;
}

function tileHTML(product, opts) {
  opts = opts || {};
  const sizeClass = opts.size ? " tile--" + opts.size : "";
  const media = product.gallery && product.gallery[0]
    ? '<img class="tile__img" src="' + product.gallery[0] + '" alt="' + product.name + ' eau de parfum" loading="lazy" />'
    : '<div class="tile__illustration" style="background:' + product.tileBg + '">' + bottleHTML(product, "bottle--lg") + "</div>";
  return (
    '<a class="tile' + sizeClass + '" href="#product-' + product.id + '" data-tile>' +
    (opts.quickAdd ? '<button type="button" class="tile__quickadd" data-quick-add="' + product.id + '">Add to Bag</button>' : "") +
    '<div class="tile__media">' + media + "</div>" +
    '<div class="tile__scrim"></div>' +
    '<div class="tile__content">' +
    '<span class="tile__eyebrow">' + (product.concentration || "Eau de Parfum") + "</span>" +
    '<h3 class="tile__name">' + product.name + "</h3>" +
    '<span class="tile__price">' + formatPrice(product.price) + "</span>" +
    '<span class="tile__cta">Shop Now <span class="tile__arrow" aria-hidden="true">&rarr;</span></span>' +
    "</div>" +
    "</a>"
  );
}

function bottleHTML(product, sizeClass) {
  sizeClass = sizeClass || "";
  return (
    '<div class="bottle-stage"><div class="bottle ' +
    sizeClass +
    '"><div class="bottle__cap"></div><div class="bottle__neck"></div>' +
    '<div class="bottle__body" style="--liquid:' +
    product.liquid +
    '"><div class="bottle__liquid"></div><div class="bottle__shine"></div>' +
    '<div class="bottle__label"><span class="bottle__brand">MANOGI&middot;KL</span>' +
    '<span class="bottle__name">' +
    product.name +
    '</span><span class="bottle__type">Eau de Parfum</span></div>' +
    "</div></div></div>"
  );
}