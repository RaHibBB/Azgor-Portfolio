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
  const hrefFor = {
    whatsapp: (v) => v && `https://wa.me/${v.replace(/\D/g, "")}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`,
    email: (v) => v && `mailto:${v}?subject=${encodeURIComponent("Shopify store help")}`,
    fiverr: (v) => v,
    upwork: (v) => v,
  };

  document.querySelectorAll("[data-link]").forEach((a) => {
    const key = a.dataset.link;
    const href = hrefFor[key] && hrefFor[key](CONTACT[key]);
    if (!href) return; // stays on #contact until a real link is set
    a.href = href;
    if (key === "fiverr" || key === "upwork" || key === "whatsapp") {
      a.target = "_blank";
      a.rel = "noopener";
    }
  });

  // Show the real email / number on the contact stubs once set
  document.querySelectorAll("[data-show]").forEach((el) => {
    const key = el.dataset.show;
    if (key === "email" && CONTACT.email) el.textContent = CONTACT.email;
    if (key === "whatsapp" && CONTACT.whatsapp) el.textContent = "+" + CONTACT.whatsapp.replace(/\D/g, "");
  });

  // Receipt date + footer year
  const now = new Date();
  const today = document.querySelector("[data-today]");
  if (today) {
    const months = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
    today.textContent = `${String(now.getDate()).padStart(2, "0")} ${months[now.getMonth()]} ${now.getFullYear()}`;
  }
  const year = document.querySelector("[data-year]");
  if (year) year.textContent = now.getFullYear();

  // Print-line stagger index
  document.querySelectorAll(".seg--first .print-line").forEach((el, i) => el.style.setProperty("--i", i));

  // Barcodes: deterministic bars from the label text
  document.querySelectorAll("[data-barcode]").forEach((el) => {
    const text = el.dataset.barcode;
    let seed = 0;
    for (const ch of text) seed = (seed * 31 + ch.charCodeAt(0)) >>> 0;
    const rand = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296);

    const bars = [];
    let x = 0;
    const guard = [2, 1, 2];
    const push = (w, fill) => { if (fill) bars.push(`<rect x="${x}" width="${w}" height="100"/>`); x += w; };
    guard.forEach((w, i) => push(w, i % 2 === 0));
    push(2, false);
    for (let i = 0; i < 46; i++) push(1 + Math.floor(rand() * 3), i % 2 === 0);
    push(2, false);
    guard.forEach((w, i) => push(w, i % 2 === 0));

    el.innerHTML = `<svg viewBox="0 0 ${x} 100" preserveAspectRatio="none" fill="#16161a">${bars.join("")}</svg>`;
  });
})();
