// Generates every page of the site from shared parts.
// Run from the project root:  node src/build.mjs
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { site, services, work, catLabel } from "./data.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

/* ---------- icons ---------- */
const icon = {
  wa: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20l1.3-3.9A8 8 0 1 1 8 19z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.5-2-1-1 1c-1-.5-1.5-1-2-2l1-1-1-2z" fill="currentColor"/></svg>`,
  mail: `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><path d="M3.5 6.5l8.5 6.5 8.5-6.5" fill="none" stroke="currentColor" stroke-width="2"/></svg>`,
  arrow: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2"/></svg>`,
  down: `<svg viewBox="0 0 12 12" aria-hidden="true"><path d="M2 4l4 4 4-4" fill="none" stroke="currentColor" stroke-width="2"/></svg>`,
  globe: `<svg viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="16" r="13" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M3 16h26M16 3c4 4 5.5 8.5 5.5 13S20 25 16 29c-4-4-5.5-8.5-5.5-13S12 7 16 3z" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>`,
  burger: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 7h18M3 12h18M3 17h18" stroke="currentColor" stroke-width="2.2"/></svg>`,
  close: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2.5"/></svg>`,
  prev: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" stroke-width="2.5"/></svg>`,
  next: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" stroke-width="2.5"/></svg>`,
  clock: `<svg viewBox="0 0 34 34" aria-hidden="true"><circle cx="17" cy="17" r="14" fill="none" stroke="currentColor" stroke-width="2"/><path d="M17 9v8l6 4" fill="none" stroke="currentColor" stroke-width="2"/></svg>`,
  loop: `<svg viewBox="0 0 34 34" aria-hidden="true"><path d="M27 13a11 11 0 0 0-20-2M7 21a11 11 0 0 0 20 2" fill="none" stroke="currentColor" stroke-width="2"/><path d="M6 5v6h6M28 29v-6h-6" fill="none" stroke="currentColor" stroke-width="2"/></svg>`,
  check: `<svg viewBox="0 0 34 34" aria-hidden="true"><rect x="5" y="4" width="24" height="26" rx="3" fill="none" stroke="currentColor" stroke-width="2"/><path d="M11 17l4 4 8-9" fill="none" stroke="currentColor" stroke-width="2"/></svg>`,
  sun: `<svg viewBox="0 0 34 34" aria-hidden="true"><circle cx="17" cy="17" r="6" fill="none" stroke="currentColor" stroke-width="2"/><path d="M17 3v4M17 27v4M3 17h4M27 17h4M7 7l3 3M24 24l3 3M27 7l-3 3M10 24l-3 3" stroke="currentColor" stroke-width="2"/></svg>`,
};

const go = `<span class="row__go" aria-hidden="true">${icon.arrow}</span>`;

/* ---------- shared parts ---------- */
const svcMenu = services.map((s) => `<a href="/services/${s.slug}">${s.menu}</a>`).join("");

function nav(current, always) {
  const cur = (k) => (current === k ? ' aria-current="page"' : "");
  return `<a class="skip" href="#main">Skip to content</a>
<header class="nav${always ? " nav--always" : ""}" id="nav">
  <div class="nav__in">
    <a class="nav__brand" href="/" aria-label="Azgor Hossin, home">Azgor [Hossin]</a>
    <nav class="nav__links" aria-label="Main">
      <div class="nav__drop">
        <button type="button" aria-expanded="false" aria-controls="svc-menu">Services ${icon.down}</button>
        <div class="nav__menu" id="svc-menu"><a href="/services">All services</a>${svcMenu}</div>
      </div>
      <a href="/portfolio"${cur("portfolio")}>Portfolio</a>
      <a href="/about"${cur("about")}>About</a>
      <a href="/contact"${cur("contact")}>Contact</a>
    </nav>
    <div class="nav__cta">
      <a class="pill pill--black pill--sm" data-link="whatsapp" href="/contact">WhatsApp</a>
      <a class="pill pill--acid pill--sm" href="/contact">Get a quote</a>
    </div>
    <button class="nav__burger" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="menu">${icon.burger}</button>
  </div>
</header>
<div class="menu dark" id="menu" role="dialog" aria-modal="true" aria-label="Menu">
  <div class="menu__top"><a class="nav__brand" style="opacity:1;transform:none" href="/">Azgor [Hossin]</a><button class="menu__close" type="button" aria-label="Close menu">${icon.close}</button></div>
  <nav aria-label="Mobile">
    <a href="/">Home</a>
    <a href="/services">Services</a>
    ${services.map((s) => `<a class="sub" href="/services/${s.slug}">${s.menu}</a>`).join("\n    ")}
    <a href="/portfolio">Portfolio</a>
    <a href="/about">About</a>
    <a href="/contact">Contact</a>
  </nav>
  <div class="menu__cta">
    <a class="pill pill--acid" data-link="whatsapp" href="/contact">${icon.wa} Message on WhatsApp</a>
    <a class="pill pill--line" data-link="email" href="/contact">${icon.mail} Email me</a>
  </div>
</div>`;
}

function closer() {
  return `<section class="dark" aria-labelledby="closer-title">
  <div class="wrap closer">
    <h2 id="closer-title" class="closer__big">Let’s build <em>your store.</em></h2>
    <div class="closer__row">
      <p class="lead">Tell me about your store and what you need, and I’ll get back to you with a plan.</p>
      <div class="cta">
        <a class="pill pill--acid" data-link="whatsapp" href="/contact">${icon.wa} Message on WhatsApp</a>
        <a class="pill pill--line" data-link="email" href="/contact">${icon.mail} Email me</a>
      </div>
    </div>
  </div>
  <footer class="wrap foot">
    <div class="foot__grid">
      <div class="stack">
        <a class="nav__brand" style="opacity:1;transform:none" href="/">Azgor [Hossin]</a>
        <p class="muted" style="margin:0;color:var(--on-black-2)">Shopify dropshipping &amp; e-commerce specialist. Remote, working worldwide.</p>
      </div>
      <div><h3>Services</h3><ul>${services.slice(0, 4).map((s) => `<li><a href="/services/${s.slug}">${s.name}</a></li>`).join("")}</ul></div>
      <div><h3>More</h3><ul>${services.slice(4).map((s) => `<li><a href="/services/${s.slug}">${s.name}</a></li>`).join("")}<li><a href="/portfolio">Portfolio</a></li></ul></div>
      <div><h3>Contact</h3><ul><li><a data-link="whatsapp" href="/contact">WhatsApp</a></li><li><a data-link="email" href="/contact">Email</a></li><li><a data-link="fiverr" href="/contact">Fiverr</a></li><li><a data-link="upwork" href="/contact">Upwork</a></li></ul></div>
    </div>
    <div class="foot__small">
      <p>© <span data-year>2026</span> Azgor Hossin. Independent freelancer. Shopify, WooCommerce and other names are trademarks of their owners; no affiliation is implied. Portfolio screenshots show stores he worked on for clients.</p>
      <a href="#main">Back to top</a>
    </div>
  </footer>
</section>`;
}

const viewer = `<dialog class="viewer" id="viewer" aria-label="Full page view">
  <div class="viewer__bar">
    <p class="viewer__cap meta" id="viewer-cap"></p>
    <div class="viewer__ctl">
      <button type="button" class="viewer__btn" data-step="-1" aria-label="Previous">${icon.prev}</button>
      <button type="button" class="viewer__btn" data-step="1" aria-label="Next">${icon.next}</button>
      <button type="button" class="viewer__btn viewer__btn--close" data-close aria-label="Close">${icon.close}</button>
    </div>
  </div>
  <div class="viewer__scroll" id="viewer-scroll"></div>
</dialog>`;

function page({ file, title, desc, body, current, darkTop = false, navAlways = true }) {
  const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${title}</title>
  <meta name="description" content="${desc}">
  <meta name="theme-color" content="#f2ede4">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${desc}">
  <meta property="og:type" content="website">
  <meta property="og:image" content="${site.url}/img/work/store-mojo-beauty.webp">
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Anybody:wdth,wght@50..150,100..900&family=Hanken+Grotesk:wght@400;500;600;700&family=Martian+Mono:wdth,wght@75..112.5,400..700&display=swap">
  <link rel="stylesheet" href="/styles.css">
  <script>document.documentElement.classList.add('js')</script>
</head>
<body${darkTop ? ' class="dark-top"' : ""}>
<!--
THESIS: A Shopify specialist's site where his real store pages are the portrait; refuses the category's gradient hero and icon-card grid.
OWN-WORLD: Layout after alejandroha.com: giant thin-wide name, [bracket] headings, pill buttons, generous air, one scroll-driven statement. Palette after silviamalavasi.com: warm white #f2ede4, black #0a0907, acid green #b8ff00, hot pink #ff006e, yellow #f3cf00. Anybody (wide, 100–900) for display, Hanken Grotesk for text, Martian Mono for data.
STORY: A store owner sees what he does, sees 36 real pages and a real research sheet, and messages him on WhatsApp.
FIRST VIEWPORT: Full-width name AZGOR [HOSSIN]; below it, left: headline, lead and WhatsApp/quote pills; right: four columns of his store pages drifting upward.
FORM: User-pinned direction (alejandroha.com layout + silviamalavasi.com palette); seed key 5c66db7f superseded.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
-->
${nav(current, navAlways)}
<main id="main">
${body}
</main>
${closer()}
${viewer}
<script src="/script.js" defer></script>
</body>
</html>
`;
  const out = path.join(root, file);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, html);
  console.log("wrote", file);
}

/* ---------- building blocks ---------- */
function card([cat, file, title, sub, w, h], i) {
  const src = `/img/work/${file}.webp`;
  return `<li class="card" data-cat="${cat}">
      <button class="card__frame" type="button" data-full="${src}" data-caption="${title} · ${sub}" aria-label="Open full page: ${title}">
        <img src="${src}" width="${w}" height="${h}" alt="${title}: ${sub.toLowerCase()}, built by Azgor" loading="lazy" decoding="async">
      </button>
      <p class="card__meta meta"><span>No. ${String(i + 1).padStart(2, "0")}</span><span class="card__cat">${catLabel[cat]}</span></p>
      <p class="card__t">${title}</p>
      <p class="card__s">${sub}</p>
    </li>`;
}
const wall = (items, cls = "") => `<ul class="wall ${cls}">\n    ${items.map((it) => card(it, work.indexOf(it))).join("\n    ")}\n  </ul>`;
const byCat = (...cats) => work.filter((w) => cats.includes(w[0]));

function thumb(src, w, h, alt, caption) {
  return `<button class="thumb" type="button" data-full="${src}" data-caption="${caption}"><img src="${src}" width="${w}" height="${h}" alt="${alt}" loading="lazy" decoding="async"></button>`;
}

function phero({ crumb, title, lead, chips = [] }) {
  return `<section class="wrap phero">
  <p class="phero__crumbs meta"><a href="/">Home</a><span aria-hidden="true">/</span>${crumb}</p>
  <h1 class="h-xl">${title}</h1>
  <div class="phero__grid">
    <div class="stack">
      <p class="lead">${lead}</p>
      <div class="cta">
        <a class="pill pill--black" data-link="whatsapp" href="/contact">${icon.wa} Message on WhatsApp</a>
        <a class="pill pill--line" href="/portfolio">See the portfolio</a>
      </div>
    </div>
    ${chips.length ? `<ul class="chips" aria-label="At a glance">${chips.map((c) => `<li>${c}</li>`).join("")}</ul>` : ""}
  </div>
</section>`;
}

function nextSvc(slug) {
  const i = services.findIndex((s) => s.slug === slug);
  const n = services[(i + 1) % services.length];
  return `<section class="wrap sec--tight">
  <a class="next" href="/services/${n.slug}"><span class="stack" style="gap:10px"><span class="meta muted">Next service</span><b>${n.name}</b></span>${go}</a>
</section>`;
}

function related(title, items, cls = "wall--3") {
  return `<section class="dark sec">
  <div class="wrap">
    <div class="split" style="align-items:end">
      <h2 class="bracket">${title}</h2>
      <p class="lead">Hover a page to scroll through it, or open it to see the full length.</p>
    </div>
    ${wall(items, cls)}
  </div>
</section>`;
}

const servicesRows = `<ul class="rows">
      ${services.map((s) => `<li class="row"><a href="/services/${s.slug}"><span class="row__t">${s.name}</span><span class="row__desc">${s.short}</span>${go}</a><span class="row__peek" aria-hidden="true"><img src="${s.peek}" alt="" loading="lazy" decoding="async"></span></li>`).join("\n      ")}
    </ul>`;

const whyList = `<ul class="why">
      <li>${icon.clock}<b>On time</b><p>I keep track of time and finish every job by the deadline.</p></li>
      <li>${icon.loop}<b>Free revisions</b><p>Unlimited revisions, and they are totally free.</p></li>
      <li>${icon.check}<b>Proofread</b><p>Every description and listing is carefully proofread before delivery.</p></li>
      <li>${icon.sun}<b>24 hours</b><p>Reach me any time of day, whenever you need me.</p></li>
    </ul>`;

const numsHome = `<dl class="nums">
      <div><dd>200+</dd><dt class="meta">Stores worked on</dt></div>
      <div><dd>2+</dd><dt class="meta">Years on Shopify</dt></div>
      <div><dd>36</dd><dt class="meta">Pages in the portfolio</dt></div>
      <div><dd>7</dd><dt class="meta">Services, one person</dt></div>
    </dl>`;

/* ---------- HOME ---------- */
const reelCols = [
  ["store-mojo-beauty", "pdp-led-mask", "lp-mini-printer", "store-valentine-roses"],
  ["pdp-cookware-set", "lp-belly-pro", "store-tactical-outdoor", "pdp-ems-massager"],
  ["store-halibuy-fashion", "lp-headlamp", "pdp-skindion", "store-fairy-wings"],
  ["lp-nut-milk-maker", "store-home-living", "pdp-montessori-puzzle", "lp-valari-pillow"],
];
const dims = Object.fromEntries(work.map((w) => [w[1], [w[4], w[5]]]));
const reel = reelCols.map((col, ci) => {
  const imgs = (lazy) => col.map((f) => `<img src="/img/work/${f}.webp" width="${dims[f][0]}" height="${dims[f][1]}" alt="" ${lazy ? 'loading="lazy" ' : ""}decoding="async">`).join("");
  return `<div class="reel__col" style="--t:${[90, 110, 100, 120][ci]}s">${imgs(false)}${imgs(true)}</div>`;
}).join("\n        ");

page({
  file: "index.html",
  title: "Azgor Hossin — Shopify Dropshipping Specialist",
  desc: "Azgor Hossin is a freelance Shopify dropshipping specialist: product research, SEO listings and descriptions, product page design, theme customization, order fulfillment and full-time store VA work. 200+ stores over 2+ years.",
  navAlways: false,
  body: `<section class="hero" aria-labelledby="hero-title">
  <div class="hero__name"><p class="name" data-fit aria-hidden="true">Azgor <span class="br">[</span>Hossin<span class="br">]</span></p></div>
  <div class="hero__stage">
    <div class="hero__copy">
      <h1 id="hero-title">Your Shopify store, <span class="mark">handled end to end.</span></h1>
      <p class="lead">I’m Azgor Hossin. I find the products, list them, design the pages they sell on, automate the orders and run the store day to day, so you can spend your time on marketing.</p>
      <div class="cta">
        <a class="pill pill--black" data-link="whatsapp" href="/contact">${icon.wa} Message on WhatsApp</a>
        <a class="pill pill--acid" href="/contact">Get a quote</a>
      </div>
    </div>
    <div class="reel" aria-hidden="true">
        ${reel}
    </div>
  </div>
  <div class="hero__foot">
    <p class="chip meta" style="margin:0">Shopify expert <i></i> 200+ stores <i></i> 2+ years</p>
    <p class="hero__place meta" style="margin:0">Remote,<br>working worldwide ${icon.globe}</p>
  </div>
</section>

<section class="wrap sec" aria-labelledby="about-title">
  <div class="about-home">
    <h2 id="about-title" class="bracket">About me</h2>
    <div class="stack">
      <p>I’m a hardworking, committed freelancer: a product researcher, a product description writer and a Shopify dropshipping specialist. I also customize themes and list products, so you get one person who can launch, manage and scale your store.</p>
      <p>I’ve been working in the Shopify world for over 2 years, on more than 200 stores. I’m patient, I keep track of time, and I finish the work on time.</p>
      <p><a class="pill pill--line" href="/about">More about me</a></p>
    </div>
  </div>
</section>

<section class="statement" aria-label="Small details. Big sales.">
  <div class="statement__pin">
    <p class="statement__txt">
      <svg class="statement__brush" viewBox="0 0 1200 600" preserveAspectRatio="none" aria-hidden="true"><path pathLength="1" d="M60 470 C 260 380, 420 540, 640 420 S 1000 300, 1150 160"/></svg>
      <span class="statement__l1">Small details.</span>
      <span class="statement__l2">Big sales.</span>
    </p>
    <p class="statement__sub meta">Every product · every page · every order</p>
  </div>
</section>

<section class="dark sec" aria-labelledby="svc-title">
  <div class="wrap">
    <div class="split" style="align-items:end">
      <h2 id="svc-title" class="bracket">Services</h2>
      <p class="lead">Hire me for one job or for the whole store. Each service has its own page with real examples.</p>
    </div>
    ${servicesRows}
  </div>
</section>

<section class="wrap sec" aria-labelledby="work-title">
  <div class="split" style="align-items:end">
    <h2 id="work-title" class="bracket">Portfolio</h2>
    <div class="stack">
      <p class="lead">36 real store pages: whole stores, product pages, landing pages and WooCommerce funnels. Hover one to scroll through it.</p>
      <p><a class="pill pill--black" href="/portfolio">See all 36 pages</a></p>
    </div>
  </div>
  ${wall([work[0], work[11], work[23], work[1], work[12], work[26], work[33], work[4]])}
</section>

<section class="acid sec" aria-labelledby="res-title">
  <div class="wrap">
    <div class="split" style="align-items:end">
      <h2 id="res-title" class="bracket">Results</h2>
      <p class="lead" style="color:var(--ink-2)">One week of a client store, straight from its Shopify analytics, against the week before.</p>
    </div>
    <dl class="nums">
      <div><dd>£209.95</dd><dt class="meta">Total sales</dt><span class="d">+162%</span></div>
      <div><dd>5</dd><dt class="meta">Orders</dt><span class="d">+400%</span></div>
      <div><dd>2.99%</dd><dt class="meta">Conversion rate</dt><span class="d">+596%</span></div>
      <div><dd>12.69%</dd><dt class="meta">Reached checkout</dt><span class="d">+639%</span></div>
    </dl>
    <p class="note" style="color:var(--ink-2)"><span class="tag" style="background:var(--ink);color:var(--acid)">Real data</span> 14–20 Oct 2023. Sessions fell 42% in the same week: fewer visitors, far more buyers. <a href="/services/product-page-design#results">See the dashboard</a></p>
  </div>
</section>

<section class="wrap sec" aria-labelledby="why-title">
  <div class="split" style="align-items:end">
    <h2 id="why-title" class="bracket">Why hire me</h2>
    <p class="lead">What every client gets, whatever the job.</p>
  </div>
  ${whyList}
  ${numsHome}
</section>`,
});

/* ---------- SERVICES INDEX ---------- */
page({
  file: "services.html",
  title: "Services — Azgor Hossin, Shopify Specialist",
  desc: "Seven Shopify and e-commerce services: product research, listings and SEO descriptions, product page design, store setup and theme customization, order fulfillment, full-time Shopify VA and WooCommerce funnels.",
  current: "services",
  body: `${phero({ crumb: "Services", title: `Seven services. <span class="mark">One person.</span>`, lead: "Hire me for one job, or for the whole store from the first product to the daily running. Every service has its own page with real examples.", chips: services.map((s) => s.name) })}
<section class="dark sec" aria-label="All services">
  <div class="wrap">${servicesRows}</div>
</section>
<section class="wrap sec">
  <div class="split" style="align-items:end"><h2 class="bracket">Why hire me</h2><p class="lead">What every client gets, whatever the job.</p></div>
  ${whyList}
</section>`,
});

/* ---------- SERVICE: RESEARCH ---------- */
page({
  file: "services/product-research.html",
  title: "Shopify Product Research — Azgor Hossin",
  desc: "Winning, untapped, in-trend and upcoming-trend product research for Shopify dropshipping stores, delivered as a sheet with AliExpress price, competitor price, margin, orders and Facebook ad links.",
  current: "services",
  body: `${phero({ crumb: `<a href="/services">Services</a><span aria-hidden="true">/</span>Product research`, title: `Products worth selling, <span class="mark">before you spend on ads.</span>`, lead: "Research decides everything after it. A good product finds its own customers and saves you promotion money. I’ve researched products for 200+ stores, from AliExpress, Alibaba, Taobao and 1688.", chips: ["Winning products", "Untapped products", "In-trend", "Upcoming trend", "Delivered as a sheet"] })}

<section class="wrap sec--tight" aria-labelledby="kinds">
  <div class="split">
    <h2 id="kinds" class="bracket">Four kinds</h2>
    <ul class="list-lines">
      <li><b>Current winning products</b><span>Products customers already want, picked from Facebook ads that are getting strong responses.</span></li>
      <li><b>New untapped products</b><span>Unique products your competitors haven’t found yet, each with its selling point.</span></li>
      <li><b>In-trend products</b><span>How popular a product is right now on Google Trends, with its ranking and monthly search volume.</span></li>
      <li><b>Upcoming-trend products</b><span>Products that should trend in the coming months, judged from their ranking chart over past months.</span></li>
    </ul>
  </div>
</section>

<section class="wrap sec" aria-labelledby="sheet">
  <div class="split" style="align-items:end">
    <h2 id="sheet" class="bracket">A real sheet</h2>
    <p class="lead">Rows from one of his delivered research sheets. Each row also carries the Facebook ad, competitor store and AliExpress links, reviews and comment counts.</p>
  </div>
  <div class="table-wrap" style="margin-top:40px" tabindex="0" role="region" aria-label="Rows from a real research sheet, scrolls sideways">
    <table>
      <thead><tr><th scope="col">Product</th><th scope="col">Competitor price</th><th scope="col">Ali price</th><th scope="col">Profit</th><th scope="col">Markup</th><th scope="col">Ali orders</th><th scope="col">Ad likes</th><th scope="col">Ad comments</th></tr></thead>
      <tbody>
        <tr><th scope="row">Rechargeable steamy pet brush</th><td>$29.99</td><td>$6.99</td><td>$23.00</td><td><span class="hot">429%</span></td><td>4,000+</td><td>9.5k</td><td>2.2k</td></tr>
        <tr><th scope="row">Ear wax removal camera</th><td>$19.79</td><td>$0.99</td><td>$18.80</td><td><span class="hot">1,999%</span></td><td>10,000+</td><td>15k</td><td>1.6k</td></tr>
        <tr><th scope="row">Pickleball trainer</th><td>$34.99</td><td>$2.68</td><td>$32.31</td><td><span class="hot">1,306%</span></td><td>40</td><td>8.7k</td><td>1.1k</td></tr>
        <tr><th scope="row">Mini toy gun</th><td>$34.99</td><td>$1.94</td><td>$33.05</td><td><span class="hot">1,804%</span></td><td>—</td><td>5.5k</td><td>2.4k</td></tr>
        <tr><th scope="row">Solar system galaxy lamp</th><td>$45.99</td><td>$9.13</td><td>$36.86</td><td><span class="hot">504%</span></td><td>98</td><td>126.9k</td><td>788</td></tr>
        <tr><th scope="row">Root cover-up</th><td>$34.50</td><td>$0.99</td><td>$33.51</td><td><span class="hot">3,485%</span></td><td>18</td><td>10k</td><td>1.4k</td></tr>
        <tr><th scope="row">Multifunctional car seat hook</th><td>$11.99</td><td>$2.60</td><td>$9.39</td><td><span class="hot">461%</span></td><td>76</td><td>6k</td><td>497</td></tr>
      </tbody>
    </table>
  </div>
  <p class="note"><span class="tag">Real rows</span> From his “Product Research” sheet. Links removed.</p>
  <h3 class="h-md" style="margin:64px 0 18px">Every sheet includes</h3>
  <ul class="chips">
    <li>Product name</li><li>AliExpress link</li><li>AliExpress price</li><li>Ali orders</li><li>Ali rating</li><li>Profit margin</li><li>Profit markup</li><li>Facebook ad link</li><li>Competitor link</li><li>Competitor price</li><li>Google Trends</li><li>Monthly search volume</li><li>Category</li>
  </ul>
</section>

<section class="dark sec" aria-labelledby="track">
  <div class="wrap">
    <div class="split" style="align-items:end">
      <h2 id="track" class="bracket">Competitors, tracked</h2>
      <p class="lead">Before you copy a product, I check what competing stores actually sell and earn, with sales trackers like Dropship.io.</p>
    </div>
    <div class="thumbs" style="margin-top:48px">
      ${thumb("/img/proof/tracker-1.webp", 900, 1136, "Dropship.io sales tracker for a competitor store: revenue graph and best-selling products", "Competitor store sales, tracked with Dropship.io")}
      ${thumb("/img/proof/tracker-2.webp", 900, 1098, "Dropship.io sales tracker for a second competitor store", "Competitor store sales, tracked with Dropship.io")}
      ${thumb("/img/proof/tracker-3.webp", 900, 1132, "Dropship.io sales tracker for a third competitor store", "Competitor store sales, tracked with Dropship.io")}
    </div>
  </div>
</section>

<section class="wrap sec" aria-labelledby="tools">
  <h2 id="tools" class="bracket">Sources &amp; tools</h2>
  <div class="groups" style="margin-top:44px">
    <div class="group"><h3>Where products come from</h3><ul><li>AliExpress</li><li>Alibaba</li><li>Taobao</li><li>1688</li></ul></div>
    <div class="group"><h3>Ad spy tools</h3><ul><li>AdSpy, Dropispy, BigSpy</li><li>Drop Point, Ecomhunt, AdHunter, AliShark</li><li>Facebook Ad Library</li></ul></div>
    <div class="group"><h3>Demand and trend</h3><ul><li>Google Trends ranking over past months</li><li>Monthly search volume</li><li>Ali orders and ratings</li></ul></div>
    <div class="group"><h3>Competition</h3><ul><li>Competitor store links and prices</li><li>Sales trackers like Dropship.io</li><li>Profit margin and markup per product</li></ul></div>
  </div>
</section>
${nextSvc("product-research")}`,
});

/* ---------- SERVICE: LISTING ---------- */
page({
  file: "services/product-listing.html",
  title: "Shopify Product Listing & SEO Descriptions — Azgor Hossin",
  desc: "Unique, SEO-optimized Shopify product descriptions, titles, page titles, image alt text and tags, plus product uploads, variants, image editing and review import.",
  current: "services",
  body: `${phero({ crumb: `<a href="/services">Services</a><span aria-hidden="true">/</span>Listings & descriptions`, title: `Descriptions that <span class="mark">sell and rank.</span>`, lead: "The most important part of a new or old store is an attractive product description. I write a unique one for every product, with an SEO title, tags, page title and image alt text built on hot-selling keywords.", chips: ["SEO titles", "Unique descriptions", "Tags & alt text", "Bulk upload", "Image editing", "Review import"] })}

<section class="wrap sec--tight" aria-labelledby="sample">
  <div class="split">
    <div class="stack">
      <h2 id="sample" class="bracket">A real sample</h2>
      <p class="lead">One of his description documents, field by field.</p>
      <p class="note" style="margin:0"><span class="tag">From his samples</span> Every description is checked for plagiarism before delivery.</p>
    </div>
    <dl class="seo">
      <div><dt>Title</dt><dd class="t">Baby Electric Nail Polisher</dd></div>
      <div><dt>Page title</dt><dd>Baby Electric Nail Polisher | Nail Clipper | Baby Care Manicure Set</dd></div>
      <div><dt>Image alt text</dt><dd>Baby Electric Nail Polisher | Nail Clipper | Baby Care Manicure Set | Nail Grinder | Newborn Baby Care | Baby Care Tools | Nail Cutter</dd></div>
      <div><dt>Tags</dt><dd><ul class="chips"><li>baby nail clipper</li><li>nail polisher</li><li>nail grinder</li><li>manicure set</li><li>electric nail polisher</li><li>newborn baby care</li><li>baby care tools</li><li>nail cutter</li></ul></dd></div>
      <div><dt>Headline</dt><dd class="h">No more trouble or pain cutting your baby’s nails!</dd></div>
      <div><dt>Main benefits</dt><dd><ul><li>Power saving and durable</li><li>Rounds nails to protect your baby’s face</li><li>Baby can get a manicure while sleeping</li><li>360° one-button forward and reverse</li><li>Easy to use at night with the LED light</li></ul></dd></div>
      <div><dt>Features</dt><dd><ul><li><b>LED light and silent working:</b> trim nails without waking the baby.</li><li><b>Adjustable settings:</b> six heads, for babies, children and adults.</li><li><b>Safe and effective:</b> pain-free, won’t damage cuticles or soft nail beds.</li></ul></dd></div>
    </dl>
  </div>
</section>

<section class="wrap sec--tight" aria-labelledby="more-samples">
  <h2 id="more-samples" class="h-md" style="margin-bottom:24px">More from his description work</h2>
  <div class="thumbs thumbs--5">
    ${thumb("/img/proof/desc-plagiarism.webp", 900, 618, "Plagiarism checker result: 0% plagiarism, 100% unique", "Plagiarism check: 100% unique")}
    ${thumb("/img/proof/desc-baby-nest.webp", 602, 562, "Description sample for a portable baby nest travel bed with title, tags, page title and alt text", "SEO fields for a baby travel bed")}
    ${thumb("/img/proof/desc-chiffon-shirt.webp", 704, 596, "Description sample for a cat print chiffon shirt", "Description for a cat print chiffon shirt")}
    ${thumb("/img/proof/desc-features.webp", 685, 486, "Feature bullets sample for a baby cot", "Feature bullets for a baby cot")}
    ${thumb("/img/proof/desc-bracelet.webp", 900, 1094, "Braided leather bracelet product page with the new description highlighted", "Description placed on a live product page")}
  </div>
</section>

<section class="dark sec" aria-labelledby="incl">
  <div class="wrap">
    <h2 id="incl" class="bracket">What’s included</h2>
    <div class="groups" style="margin-top:44px">
      <div class="group"><h3>Uploads</h3><ul><li>Single or bulk uploads by CSV</li><li>Through DSers, Oberlo, Dropified, Spocket, Importify, CJdropshipping, AutoDS or Zendrop</li><li>Color, size, material and bundle variants mapped to the right image</li><li>Collections and tags for easy navigation</li></ul></div>
      <div class="group"><h3>SEO</h3><ul><li>Unique titles, page titles, image alt text, tags and URLs</li><li>Keyword research with Keyword Planner, Keyword Surfer and Keywords Everywhere</li><li>Your prices compared with competitors for better sales</li></ul></div>
      <div class="group"><h3>Images</h3><ul><li>Supplier logos, Chinese text and watermarks removed</li><li>Product pages built with GIFs and images</li><li>Cropped, resized and compressed so pages stay fast</li></ul></div>
      <div class="group"><h3>Price, stock &amp; reviews</h3><ul><li>Margins, compare-at prices and currency settings</li><li>SKUs and inventory tracking, so you never oversell</li><li>Product reviews imported</li></ul></div>
    </div>
  </div>
</section>
${nextSvc("product-listing")}`,
});

/* ---------- SERVICE: PAGE DESIGN ---------- */
page({
  file: "services/product-page-design.html",
  title: "Shopify Product & Landing Page Design — Azgor Hossin",
  desc: "High-converting Shopify product pages and landing pages built with the theme editor, GemPages, PageFly, Shogun and Zipify: galleries, trust badges, reviews, upsells and mobile-first layouts.",
  current: "services",
  body: `${phero({ crumb: `<a href="/services">Services</a><span aria-hidden="true">/</span>Product page design`, title: `The page where <span class="mark">they decide to buy.</span>`, lead: "A weak product page wastes your ad budget. I design product and landing pages that build trust, work on mobile first and turn visitors into customers.", chips: ["Product pages", "Landing pages", "GemPages", "PageFly", "Shogun", "Zipify", "Mobile first"] })}

<section class="wrap sec--tight" aria-labelledby="anat">
  <div class="split split--even" style="align-items:center">
    <button class="anatomy" type="button" data-full="/img/work/pdp-cookware-set.webp" data-caption="Product page · 10-piece cookware set">
      <img src="/img/work/pdp-cookware-set.webp" width="640" height="2942" alt="A product page Azgor built for a 10-piece ceramic cookware set" decoding="async">
      <span class="pin" style="top:13%;left:13%">A</span>
      <span class="pin" style="top:12.5%;left:50%">B</span>
      <span class="pin" style="top:37%;left:50%">C</span>
      <span class="pin" style="top:53%;left:50%">D</span>
      <span class="pin" style="top:70%;left:3%">E</span>
    </button>
    <div class="stack stack--lg">
      <h2 id="anat" class="bracket">Anatomy</h2>
      <ol class="key">
        <li><span class="pin">A</span><p><strong>Gallery.</strong> A big product image with thumbnails, zoom and video, showing the product from every angle.</p></li>
        <li><span class="pin">B</span><p><strong>Trust and social proof.</strong> Star ratings and review counts from Loox, Judge.me or Okendo, plus payment, secure-checkout, free shipping and guarantee badges.</p></li>
        <li><span class="pin">C</span><p><strong>Pricing that sells.</strong> Color swatches, a compare-at price against your price, pay-later instalments, and quantity breaks or bundles to raise order value.</p></li>
        <li><span class="pin">D</span><p><strong>Clear buttons.</strong> Add to cart and Buy it now, sticky on mobile, with a “people recently added this” nudge above them.</p></li>
        <li><span class="pin">E</span><p><strong>Content blocks.</strong> Tabs for highlights, specs, care and FAQs, comparison tables, benefit icons and video, with lazy-loaded images for speed.</p></li>
      </ol>
      <p class="note" style="margin:0"><span class="tag">His work</span> Tap the page to see it at full length.</p>
    </div>
  </div>
</section>

<section class="wrap sec" id="results" aria-labelledby="res">
  <div class="split">
    <div class="stack">
      <h2 id="res" class="bracket">Results</h2>
      <p class="lead">One week of a client store, straight from its Shopify analytics, against the week before. Fewer visitors, far more buyers.</p>
      <div class="dark" style="border-radius:24px;padding:14px">
        <dl class="kpi">
          <div><dt>Total sales</dt><dd>£209.95</dd><span class="d">+162%</span></div>
          <div><dt>Orders</dt><dd>5</dd><span class="d">+400%</span></div>
          <div><dt>Conversion</dt><dd>2.99%</dd><span class="d">+596%</span></div>
          <div><dt>Checkout</dt><dd>12.69%</dd><span class="d">+639%</span></div>
          <div><dt>Sessions</dt><dd>134</dd><span class="d d--down">−42%</span></div>
          <div><dt>Avg. order</dt><dd>£40.40</dd><span class="d d--down">−50%</span></div>
        </dl>
      </div>
      <p class="note" style="margin:0"><span class="tag">Real data</span> 14–20 Oct 2023. Store name hidden.</p>
    </div>
    <button class="shot" type="button" data-full="/img/proof/shopify-analytics.webp" data-caption="Shopify analytics, last 7 days vs previous period (store name hidden)"><img src="/img/proof/shopify-analytics.webp" width="1000" height="952" alt="Shopify analytics dashboard: total sales £209.95 up 162%, 134 sessions, 2.99% conversion rate, 5 orders, average order value £40.40" loading="lazy" decoding="async"></button>
  </div>
</section>
${related("Product pages", byCat("pdp"), "")}
${related("Landing pages", byCat("lp"), "")}
${nextSvc("product-page-design")}`,
});

/* ---------- SERVICE: STORE SETUP ---------- */
page({
  file: "services/store-setup.html",
  title: "Shopify Store Setup & Theme Customization — Azgor Hossin",
  desc: "Shopify store setup, one product stores and theme customization: layouts, headers, brand styling, homepages, cart drawers, policy pages, payments and shipping.",
  current: "services",
  body: `${phero({ crumb: `<a href="/services">Services</a><span aria-hidden="true">/</span>Store setup & theme`, title: `A store built around your brand, <span class="mark">not a default theme.</span>`, lead: "From an empty Shopify account to a store that’s ready to take orders, a one product store, or a redesign of the store you already have.", chips: ["Full store", "One product store", "Redesign", "Liquid", "GemPages", "PageFly"] })}

<section class="wrap sec--tight" aria-labelledby="setup">
  <div class="split">
    <h2 id="setup" class="bracket">Store setup</h2>
    <ul class="list-lines">
      <li><b>Store creation or redesign</b><span>Layout, navigation and mobile optimization.</span></li>
      <li><b>One product store</b><span>A whole store built around a single winning product.</span></li>
      <li><b>Product catalog</b><span>Products imported, collections organized, variants and inventory mapped.</span></li>
      <li><b>Policy pages</b><span>Privacy policy, terms of service, refund policy and shipping FAQs.</span></li>
      <li><b>Payments</b><span>Shopify Payments, PayPal and Stripe.</span></li>
      <li><b>Shipping</b><span>Shipping zones and automatic rules.</span></li>
      <li><b>Logo and branding</b><span>Logo, banners, color scheme and store branding guidelines.</span></li>
      <li><b>Packaging</b><span>Custom inserts, stickers, boxes and clothing tags through print-on-demand or suppliers.</span></li>
    </ul>
  </div>
</section>

<section class="dark sec" aria-labelledby="theme">
  <div class="wrap">
    <h2 id="theme" class="bracket">Theme customization</h2>
    <div class="groups" style="margin-top:44px">
      <div class="group"><h3>Layout</h3><ul><li>Homepage sections, product grids, collection and landing pages</li><li>Built in the theme editor and Liquid, or with GemPages, PageFly, Shogun and Zipify</li></ul></div>
      <div class="group"><h3>Header &amp; footer</h3><ul><li>Mega menus and sticky headers</li><li>Multi-currency selectors</li><li>Clear footer link blocks</li></ul></div>
      <div class="group"><h3>Homepage</h3><ul><li>Hero banners, sliders and video backgrounds with strong calls to action</li><li>Featured collection carousels and sale banners</li><li>Brand story, press and testimonial sections</li></ul></div>
      <div class="group"><h3>Apps &amp; cart</h3><ul><li>Reviews, search, wishlist and popups styled to match</li><li>Slide-out cart drawer with a free-shipping progress bar and upsells</li><li>Tested on Chrome, Safari, Firefox, Edge, iOS and Android</li></ul></div>
    </div>
  </div>
</section>
${related("Stores", byCat("store"), "")}
${nextSvc("store-setup")}`,
});

/* ---------- SERVICE: FULFILLMENT ---------- */
page({
  file: "services/order-fulfillment.html",
  title: "Shopify Order Fulfillment Automation — Azgor Hossin",
  desc: "Automated Shopify order fulfillment with DSers, AutoDS, CJdropshipping, Zendrop and Spocket: tracking sync, customer notifications, stock and price sync, returns and refunds.",
  current: "services",
  body: `${phero({ crumb: `<a href="/services">Services</a><span aria-hidden="true">/</span>Order fulfillment`, title: `Orders that <span class="mark">ship themselves.</span>`, lead: "Fast, accurate fulfillment keeps customers happy, cuts refund requests and keeps your payment gateways healthy. I connect your store, your suppliers and your customers.", chips: ["DSers", "AutoDS", "CJdropshipping", "Zendrop", "Spocket", "17TRACK", "ParcelPanel", "AfterShip"] })}

<section class="dark sec" aria-labelledby="journey">
  <div class="wrap split">
    <h2 id="journey" class="bracket">One order’s journey</h2>
    <ol class="track">
      <li class="done"><b>Order placed</b><span>A customer checks out on your store.</span></li>
      <li class="done"><b>Sent to supplier</b><span>The order forwards automatically through DSers, AutoDS, CJdropshipping, Zendrop, Spocket or AliExpress.</span></li>
      <li class="now"><b>Shipped</b><span>The tracking number syncs back to Shopify as soon as it ships.</span></li>
      <li><b>Customer updated</b><span>Automatic email and SMS updates, plus a tracking page in your menu with 17TRACK, ParcelPanel or AfterShip.</span></li>
      <li><b>Delivered</b><span>And if something goes wrong along the way, I handle it.</span></li>
    </ol>
  </div>
</section>

<section class="wrap sec" aria-labelledby="orders">
  <div class="split" style="align-items:end">
    <h2 id="orders" class="bracket">A real week</h2>
    <p class="lead">Orders from a client store’s Shopify order list: every one paid, fulfilled or in progress, with tracking added.</p>
  </div>
  <div class="table-wrap" style="margin-top:40px" tabindex="0" role="region" aria-label="Orders from a client store, scrolls sideways">
    <table>
      <thead><tr><th scope="col">Order</th><th scope="col">Total</th><th scope="col">Items</th><th scope="col">Payment</th><th scope="col">Fulfillment</th><th scope="col">Delivery</th><th scope="col">Method</th></tr></thead>
      <tbody>
        <tr><th scope="row">#1007</th><td>$72.28</td><td>2</td><td>Paid</td><td><span class="st st--now">In progress</span></td><td>—</td><td>Free shipping</td></tr>
        <tr><th scope="row">#1006</th><td>$72.28</td><td>2</td><td>Paid</td><td><span class="st st--now">In progress</span></td><td>—</td><td>Free shipping</td></tr>
        <tr><th scope="row">#1005</th><td>$27.39</td><td>1</td><td>Paid</td><td><span class="st">Fulfilled</span></td><td>—</td><td>Free shipping</td></tr>
        <tr><th scope="row">#1004</th><td>$49.95</td><td>1</td><td>Paid</td><td><span class="st">Fulfilled</span></td><td>Tracking added</td><td>Free shipping</td></tr>
        <tr><th scope="row">#1003</th><td>$122.50</td><td>2</td><td>Paid</td><td><span class="st">Fulfilled</span></td><td>Tracking added</td><td>Free shipping</td></tr>
        <tr><th scope="row">#1002</th><td>$39.95</td><td>1</td><td>Paid</td><td><span class="st">Fulfilled</span></td><td>Tracking added</td><td>Free shipping</td></tr>
        <tr><th scope="row">#1001</th><td>$29.95</td><td>1</td><td>Paid</td><td><span class="st">Fulfilled</span></td><td>Tracking added</td><td>Free shipping</td></tr>
      </tbody>
    </table>
  </div>
  <p class="note"><span class="tag">Real orders</span> Customer names removed.</p>
</section>

<section class="wrap sec--tight" aria-labelledby="also">
  <div class="split">
    <h2 id="also" class="bracket">Also handled</h2>
    <ul class="list-lines">
      <li><b>Bulk and special orders</b><span>Custom orders, custom packaging and customer notes, with private agents or fulfillment centers.</span></li>
      <li><b>Stock sync</b><span>Out-of-stock items update instantly, so you never oversell.</span></li>
      <li><b>Price monitoring</b><span>Supplier price changes watched to protect your margins.</span></li>
      <li><b>Failed orders</b><span>Address errors, unfulfilled items and payment flags fixed before orders go out.</span></li>
      <li><b>Returns and refunds</b><span>Returns, replacements and refunds for lost or damaged parcels, sorted with suppliers.</span></li>
      <li><b>Private agent sourcing</b><span>Factory-direct prices, sample testing, custom packaging and thank-you notes.</span></li>
    </ul>
  </div>
</section>
${nextSvc("order-fulfillment")}`,
});

/* ---------- SERVICE: VA ---------- */
page({
  file: "services/shopify-va.html",
  title: "Full-Time Shopify Virtual Assistant — Azgor Hossin",
  desc: "A dedicated full-time Shopify VA: daily order processing, inventory and price checks, customer support, store updates, review moderation, social posting and daily reports.",
  current: "services",
  body: `${phero({ crumb: `<a href="/services">Services</a><span aria-hidden="true">/</span>Full-time Shopify VA`, title: `A full-time VA <span class="mark">for your store.</span>`, lead: "Running a growing store needs constant attention. I handle the day-to-day: orders, stock, customers and updates, so you can focus on marketing and scaling. You get a report every day.", chips: ["100% dedicated", "Hands-off operations", "Daily reports", "Weekly reports"] })}

<section class="sec" style="background:var(--yellow)" aria-labelledby="log">
  <div class="wrap split">
    <div class="stack">
      <h2 id="log" class="bracket">A sample day</h2>
      <p class="lead" style="color:#2e2800">What a normal shift looks like.</p>
      <p class="note" style="margin:0;color:#2e2800"><span class="tag" style="background:var(--ink);color:var(--yellow)">Example schedule</span></p>
    </div>
    <ol class="log">
      <li><time>09:00</time><span>Process overnight orders and check every tracking number synced.</span></li>
      <li><time>10:30</time><span>Answer customer emails, live chat and “Where is my order?” tickets.</span></li>
      <li><time>12:00</time><span>Check supplier stock and prices, update anything out of stock.</span></li>
      <li><time>14:00</time><span>Upload new products, update collections and fix formatting.</span></li>
      <li><time>15:30</time><span>Approve new customer reviews in Loox or Judge.me.</span></li>
      <li><time>16:30</time><span>Schedule posts and reels for Facebook, Instagram and TikTok.</span></li>
      <li><time>17:30</time><span>Send you the daily report.</span></li>
    </ol>
  </div>
</section>

<section class="wrap sec" aria-labelledby="daily">
  <h2 id="daily" class="bracket">Every day includes</h2>
  <div class="groups" style="margin-top:44px">
    <div class="group"><h3>Store operations</h3><ul><li>Order fulfillment through DSers, CJdropshipping, AutoDS or private suppliers</li><li>Inventory and price monitoring</li><li>Catalog maintenance: new products, collections, prices, tags</li></ul></div>
    <div class="group"><h3>Customer support</h3><ul><li>Emails, live chat and contact form messages</li><li>“Where is my order?” requests, address updates, tracking</li><li>Returns, exchanges, refunds and disputes under your store policy</li></ul></div>
    <div class="group"><h3>Store updates</h3><ul><li>Homepage banners, sale graphics and seasonal announcements</li><li>Product description edits and SEO bullet points</li><li>App clean-up so popups, reviews and upsells keep working</li></ul></div>
    <div class="group"><h3>Marketing support</h3><ul><li>Review moderation in Loox and Judge.me</li><li>Posts, reels and comments on Facebook, Instagram and TikTok</li><li>A watch on ad campaigns and abandoned-cart emails</li></ul></div>
  </div>
</section>
${nextSvc("shopify-va")}`,
});

/* ---------- SERVICE: WOO ---------- */
page({
  file: "services/woocommerce-funnels.html",
  title: "WooCommerce Funnels with Elementor, CartFlows & FunnelKit — Azgor Hossin",
  desc: "Custom WooCommerce product pages and sales funnels with Elementor, CartFlows and FunnelKit: frictionless checkout, order bumps, one-click upsells and thank-you pages.",
  current: "services",
  body: `${phero({ crumb: `<a href="/services">Services</a><span aria-hidden="true">/</span>WooCommerce funnels`, title: `On WooCommerce? <span class="mark">I build funnels there too.</span>`, lead: "Custom product pages and sales funnels with Elementor, paired with CartFlows or FunnelKit, instead of a generic store layout.", chips: ["Elementor", "CartFlows", "FunnelKit", "Order bumps", "One-click upsells", "A/B tests"] })}

<section class="wrap sec--tight" aria-labelledby="cmp">
  <div class="split">
    <h2 id="cmp" class="bracket">CartFlows or FunnelKit?</h2>
    <div class="table-wrap table-wrap--text" tabindex="0" role="region" aria-label="CartFlows and FunnelKit comparison">
      <table>
        <thead><tr><th scope="col"><span class="sr">Feature</span></th><th scope="col">CartFlows</th><th scope="col">FunnelKit</th></tr></thead>
        <tbody>
          <tr><th scope="row">Best for</th><td>Visual funnels and checkout</td><td>Funnels plus automation and CRM</td></tr>
          <tr><th scope="row">Elementor</th><td>Widgets for each step</td><td>Native widgets and templates</td></tr>
          <tr><th scope="row">Bumps &amp; upsells</th><td>One-click upsells</td><td>Rule-based dynamic upsells</td></tr>
          <tr><th scope="row">Cart</th><td>Embedded checkout</td><td>Slide-out cart drawer</td></tr>
          <tr><th scope="row">Automation</th><td>Basic follow-ups</td><td>Abandoned cart, post-purchase flows</td></tr>
        </tbody>
      </table>
    </div>
  </div>
</section>

<section class="wrap sec--tight" aria-labelledby="get">
  <div class="split">
    <h2 id="get" class="bracket">What you get</h2>
    <ul class="list-lines">
      <li><b>Landing pages</b><span>Custom Elementor product templates in your brand, with galleries, video, feature lists and a sticky Buy Now button.</span></li>
      <li><b>Checkout</b><span>1-step or 2-step checkout with Stripe, PayPal, Apple Pay and Google Pay.</span></li>
      <li><b>Order bumps</b><span>Add-ons offered on the checkout page before payment.</span></li>
      <li><b>One-click upsells</b><span>Post-purchase offers without re-entering payment details.</span></li>
      <li><b>Thank-you pages</b><span>Clear order confirmation with cross-sells.</span></li>
      <li><b>A/B tests</b><span>Headlines, button designs, layouts and prices.</span></li>
    </ul>
  </div>
</section>
${related("WooCommerce builds", byCat("woo"))}
${nextSvc("woocommerce-funnels")}`,
});

/* ---------- PORTFOLIO ---------- */
const count = (c) => work.filter((w) => w[0] === c).length;
page({
  file: "portfolio.html",
  title: "Portfolio — 36 Shopify Store Pages by Azgor Hossin",
  desc: "36 real Shopify and WooCommerce pages Azgor Hossin built: whole stores, product pages, landing pages and WooCommerce funnels.",
  current: "portfolio",
  body: `${phero({ crumb: "Portfolio", title: `36 store pages. <span class="mark">All real.</span>`, lead: "Whole stores, product pages, landing pages and WooCommerce funnels he built for clients. Hover a page to scroll through it, or open it to see the full length." })}
<section class="wrap" style="padding-bottom:clamp(80px,10vw,140px)" aria-label="Portfolio">
  <div class="filters" role="group" aria-label="Filter portfolio">
    <button type="button" class="filter is-on" data-filter="all" aria-pressed="true">All <span>${work.length}</span></button>
    <button type="button" class="filter" data-filter="store" aria-pressed="false">Stores <span>${count("store")}</span></button>
    <button type="button" class="filter" data-filter="pdp" aria-pressed="false">Product pages <span>${count("pdp")}</span></button>
    <button type="button" class="filter" data-filter="lp" aria-pressed="false">Landing pages <span>${count("lp")}</span></button>
    <button type="button" class="filter" data-filter="woo" aria-pressed="false">WooCommerce <span>${count("woo")}</span></button>
  </div>
  ${wall(work)}
</section>`,
});

/* ---------- ABOUT ---------- */
page({
  file: "about.html",
  title: "About Azgor Hossin — Shopify Dropshipping Specialist",
  desc: "Azgor Hossin is a hardworking Shopify dropshipping specialist, product researcher and product description writer with 2+ years and 200+ stores behind him.",
  current: "about",
  body: `${phero({ crumb: "About", title: `Patient, hardworking, <span class="mark">on time.</span>`, lead: "I’m Azgor Hossin, a freelance product researcher, product description writer and Shopify dropshipping specialist. I also customize themes and list products, so you get end-to-end help to launch, manage and scale a profitable store." })}

<section class="wrap sec--tight" aria-labelledby="story">
  <div class="about-home">
    <h2 id="story" class="bracket">My story</h2>
    <div class="stack">
      <p>I’ve been working in the Shopify world for over 2 years. In that time I’ve worked on more than 200 stores and with many clients, from people launching their first store to owners who needed someone to run the daily work.</p>
      <p>I’m a very patient and hardworking person. I’m always aware of the time and I finish the work on time. Revisions are unlimited and free, and I proofread everything carefully before it reaches you.</p>
      <p>You can reach me 24 hours a day, whenever you need me.</p>
    </div>
  </div>
  ${numsHome}
</section>

<section class="dark sec" aria-labelledby="skills">
  <div class="wrap">
    <div class="split" style="align-items:end">
      <h2 id="skills" class="bracket">Main skills</h2>
      <p class="lead">Straight from my service list.</p>
    </div>
    <ul class="chips" style="margin-top:44px">
      <li>Shopify theme customization</li><li>Shopify product page design</li><li>Store set-up &amp; design</li><li>One product store set-up</li><li>Product collections</li><li>Inventory management</li><li>Order fulfillment</li><li>Home &amp; product page design</li><li>SEO product descriptions</li><li>Unique SEO titles</li><li>Titles, page titles, alt text, tags, URLs</li><li>Product pages with GIFs &amp; images</li><li>Hot-selling keywords</li><li>Image optimization &amp; editing</li><li>Product review import</li><li>Product research: AliExpress, Alibaba, Taobao, 1688</li><li>Product upload: Oberlo, Dropified, Spocket, DSers, Importify</li><li>Keyword research: Keyword Planner, Keyword Surfer, Keywords Everywhere</li>
    </ul>
  </div>
</section>

<section class="wrap sec" aria-labelledby="why-title">
  <div class="split" style="align-items:end">
    <h2 id="why-title" class="bracket">Why hire me</h2>
    <p class="lead">What every client gets, whatever the job.</p>
  </div>
  ${whyList}
</section>`,
});

/* ---------- CONTACT ---------- */
page({
  file: "contact.html",
  title: "Contact Azgor Hossin — Hire a Shopify Specialist",
  desc: "Message Azgor Hossin on WhatsApp or email, or hire him on Fiverr or Upwork, for Shopify product research, listings, page design, fulfillment or a full-time VA.",
  current: "contact",
  body: `${phero({ crumb: "Contact", title: `Let’s talk about <span class="mark">your store.</span>`, lead: "Pick the way that suits you. I’m reachable 24 hours a day." })}
<section class="wrap" style="padding-bottom:clamp(80px,10vw,140px)" aria-label="Ways to reach me">
  <div class="contacts">
    <a class="contact contact--acid" data-link="whatsapp" href="#">
      <span class="contact__k meta">WhatsApp</span>
      <span class="contact__v" data-show="whatsapp">Message me</span>
      <span class="contact__go"><span class="meta">Open chat</span>${go}</span>
    </a>
    <a class="contact contact--black" data-link="email" href="#">
      <span class="contact__k meta">Email</span>
      <span class="contact__v" data-show="email">Send an email</span>
      <span class="contact__go"><span class="meta">Write email</span>${go}</span>
    </a>
    <a class="contact contact--pink" data-link="fiverr" href="#">
      <span class="contact__k meta">Fiverr</span>
      <span class="contact__v">Order a gig</span>
      <span class="contact__go"><span class="meta">View profile</span>${go}</span>
    </a>
    <a class="contact" data-link="upwork" href="#">
      <span class="contact__k meta">Upwork</span>
      <span class="contact__v">Hire on contract</span>
      <span class="contact__go"><span class="meta">View profile</span>${go}</span>
    </a>
  </div>

  <div class="split" style="margin-top:clamp(80px,9vw,130px)">
    <h2 class="bracket">What to send</h2>
    <ul class="list-lines">
      <li><b>Your store link</b><span>Or tell me you don’t have one yet.</span></li>
      <li><b>What you need</b><span>One service, several, or the whole store.</span></li>
      <li><b>Your deadline</b><span>When you need it done.</span></li>
      <li><b>Examples you like</b><span>Stores or pages you’d like yours to feel like.</span></li>
    </ul>
  </div>
</section>`,
});

console.log("done");
