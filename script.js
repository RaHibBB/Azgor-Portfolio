/* ===================================================================
   CONTACT LINKS — replace these four values, nothing else needs editing.
   whatsapp: number in international format, digits only (e.g. 8801712345678)
   =================================================================== */
const CONTACT = {
  whatsapp: "",   // e.g. "8801712345678"
  email: "",      // e.g. "azgor@example.com"
  fiverr: "",     // full profile URL, e.g. "https://www.fiverr.com/yourname"
  upwork: "",     // full profile URL, e.g. "https://www.upwork.com/freelancers/~0123..."
};

const WHATSAPP_MESSAGE = "Hi Azgor, I found your website and I'd like help with my Shopify store.";

(function () {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- contact links ---------- */
  const hrefFor = {
    whatsapp: (v) => v && `https://wa.me/${v.replace(/\D/g, "")}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`,
    email: (v) => v && `mailto:${v}?subject=${encodeURIComponent("Shopify store help")}`,
    fiverr: (v) => v,
    upwork: (v) => v,
  };
  document.querySelectorAll("[data-link]").forEach((a) => {
    const key = a.dataset.link;
    const href = hrefFor[key] && hrefFor[key](CONTACT[key]);
    if (!href) return; // stays pointed at /contact until a real link is set
    a.href = href;
    if (key !== "email") { a.target = "_blank"; a.rel = "noopener"; }
  });
  document.querySelectorAll("[data-show]").forEach((el) => {
    const key = el.dataset.show;
    if (key === "email" && CONTACT.email) el.textContent = CONTACT.email;
    if (key === "whatsapp" && CONTACT.whatsapp) el.textContent = "+" + CONTACT.whatsapp.replace(/\D/g, "");
  });

  const year = document.querySelector("[data-year]");
  if (year) year.textContent = new Date().getFullYear();

  /* ---------- nav: solid on scroll, services dropdown, mobile menu ---------- */
  const nav = document.getElementById("nav");
  const onScroll = () => nav && nav.classList.toggle("is-solid", window.scrollY > 40);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  const drop = document.querySelector(".nav__drop");
  if (drop) {
    const btn = drop.querySelector("button");
    const set = (open) => { drop.toggleAttribute("data-open", open); btn.setAttribute("aria-expanded", String(open)); };
    btn.addEventListener("click", (e) => { e.stopPropagation(); set(!drop.hasAttribute("data-open")); });
    drop.addEventListener("mouseenter", () => window.matchMedia("(hover: hover)").matches && set(true));
    drop.addEventListener("mouseleave", () => window.matchMedia("(hover: hover)").matches && set(false));
    document.addEventListener("click", (e) => { if (!drop.contains(e.target)) set(false); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") set(false); });
  }

  const menu = document.getElementById("menu");
  const burger = document.querySelector(".nav__burger");
  if (menu && burger) {
    const open = (on) => {
      menu.toggleAttribute("data-open", on);
      burger.setAttribute("aria-expanded", String(on));
      document.body.style.overflow = on ? "hidden" : "";
      if (on) menu.querySelector(".menu__close").focus(); else burger.focus();
    };
    burger.addEventListener("click", () => open(true));
    menu.querySelector(".menu__close").addEventListener("click", () => open(false));
    menu.addEventListener("keydown", (e) => { if (e.key === "Escape") open(false); });
    menu.querySelectorAll("nav a").forEach((a) => a.addEventListener("click", () => open(false)));
  }

  /* ---------- fit the giant name to the full width ---------- */
  const fit = () => {
    document.querySelectorAll("[data-fit]").forEach((el) => {
      el.style.fontSize = "100px";
      const cs = getComputedStyle(el.parentElement);
      const box = el.parentElement.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
      const w = el.getBoundingClientRect().width;
      if (!w) return;
      el.style.fontSize = Math.min(100 * (box / w) * 0.995, 260) + "px";
    });
  };
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit);
  fit();
  window.addEventListener("resize", fit);

  /* ---------- scroll statement: fill the words, draw the brush ---------- */
  const st = document.querySelector(".statement");
  if (st) {
    const txt = st.querySelector(".statement__txt");
    const tick = () => {
      const r = st.getBoundingClientRect();
      const span = r.height - window.innerHeight;
      const p = reduce ? 1 : Math.min(1, Math.max(0, -r.top / (span * 0.85)));
      txt.style.setProperty("--p", p.toFixed(3));
    };
    tick();
    window.addEventListener("scroll", tick, { passive: true });
    window.addEventListener("resize", tick);
  }

  /* ---------- portfolio cards: scroll the page inside the frame on hover ---------- */
  const travel = () => {
    document.querySelectorAll(".card__frame").forEach((f) => {
      const img = f.querySelector("img");
      const extra = img.getBoundingClientRect().height - f.getBoundingClientRect().height;
      f.classList.toggle("is-short", extra < 0);
      if (extra > 4 && !reduce) {
        f.style.setProperty("--travel", `-${extra}px`);
        f.style.setProperty("--dur", `${Math.min(14, Math.max(1.6, extra / 420)).toFixed(2)}s`);
      } else {
        f.style.setProperty("--travel", "0px");
      }
    });
  };
  window.addEventListener("load", travel);
  window.addEventListener("resize", travel);
  document.querySelectorAll(".card__frame img").forEach((img) => img.addEventListener("load", travel, { once: true }));

  /* ---------- portfolio filters ---------- */
  const filters = document.querySelectorAll(".filter");
  const cards = document.querySelectorAll(".card[data-cat]");
  const applyFilter = (cat) => {
    filters.forEach((b) => {
      const on = b.dataset.filter === cat;
      b.classList.toggle("is-on", on);
      b.setAttribute("aria-pressed", String(on));
    });
    cards.forEach((c) => { c.hidden = !(cat === "all" || c.dataset.cat === cat); });
    requestAnimationFrame(travel);
  };
  filters.forEach((b) => b.addEventListener("click", () => {
    applyFilter(b.dataset.filter);
    try { history.replaceState(null, "", b.dataset.filter === "all" ? location.pathname : `?type=${b.dataset.filter}`); } catch (e) {}
  }));
  if (filters.length) {
    const want = new URLSearchParams(location.search).get("type");
    if (want && [...filters].some((b) => b.dataset.filter === want)) applyFilter(want);
  }

  /* ---------- full-page viewer ---------- */
  const viewer = document.getElementById("viewer");
  if (viewer && typeof viewer.showModal === "function") {
    const scroll = document.getElementById("viewer-scroll");
    const cap = document.getElementById("viewer-cap");
    let list = [], idx = 0, opener = null;

    const show = (i) => {
      idx = (i + list.length) % list.length;
      const t = list[idx];
      scroll.innerHTML = "";
      const img = new Image();
      img.src = t.dataset.full;
      img.alt = t.querySelector("img") ? t.querySelector("img").alt : "";
      img.decoding = "async";
      scroll.appendChild(img);
      scroll.scrollTop = 0;
      cap.textContent = `${t.dataset.caption || ""}  ·  ${idx + 1} / ${list.length}`;
    };

    document.addEventListener("click", (e) => {
      const t = e.target.closest("[data-full]");
      if (!t) return;
      e.preventDefault();
      const group = t.closest(".wall, .thumbs") || document;
      list = [...group.querySelectorAll("[data-full]")].filter((el) => !el.closest("[hidden]"));
      if (!list.includes(t)) list = [t];
      opener = t;
      show(list.indexOf(t));
      viewer.showModal();
      document.body.classList.add("is-viewing");
    });

    viewer.addEventListener("click", (e) => {
      const step = e.target.closest("[data-step]");
      if (step) return show(idx + Number(step.dataset.step));
      if (e.target.closest("[data-close]") || e.target === viewer) viewer.close();
    });
    viewer.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") show(idx + 1);
      if (e.key === "ArrowLeft") show(idx - 1);
    });
    viewer.addEventListener("close", () => {
      document.body.classList.remove("is-viewing");
      if (opener) opener.focus();
    });
  }
})();
