// year stamp
document.getElementById("year").textContent = new Date().getFullYear();

// open to work date (updates daily)
function fmtDate(lang) {
  const locale = lang === "it" ? "it-IT" : "en-GB";
  return new Date().toLocaleDateString(locale, { day: "numeric", month: "short", year: "numeric" });
}
const otwDate = document.getElementById("otwDate");
if (otwDate) otwDate.textContent = "· " + fmtDate(localStorage.getItem("lang") || "en");

// language toggle
function setLang(lang) {
  localStorage.setItem("lang", lang);
  document.documentElement.lang = lang === "it" ? "it" : "en";

  // simple text swaps
  document.querySelectorAll("[data-en]").forEach(el => {
    el.textContent = lang === "it" ? (el.dataset.it || el.dataset.en) : el.dataset.en;
  });

  // show/hide lang blocks (for paragraphs with HTML inside)
  document.querySelectorAll("[data-lang]").forEach(el => {
    el.hidden = el.dataset.lang !== lang;
  });

  // OTW date locale
  if (otwDate) otwDate.textContent = "· " + fmtDate(lang);

  const enBtn = document.getElementById("langEn");
  const itBtn = document.getElementById("langIt");
  if (enBtn) enBtn.classList.toggle("active", lang === "en");
  if (itBtn) itBtn.classList.toggle("active", lang === "it");
}

const savedLang = localStorage.getItem("lang") || "en";
setLang(savedLang);

// reveal on scroll
const io = new IntersectionObserver(
  (entries) => {
    for (const e of entries) {
      if (e.isIntersecting) {
        e.target.classList.add("is-visible");
        io.unobserve(e.target);
      }
    }
  },
  { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
);

document.querySelectorAll("[data-reveal]").forEach((el) => io.observe(el));
