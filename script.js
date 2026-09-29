// year stamp
document.getElementById("year").textContent = new Date().getFullYear();

// open to work date (updates daily)
const otwDate = document.getElementById("otwDate");
if (otwDate) {
  otwDate.textContent = "· " + new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

// language toggle
function setLang(lang) {
  localStorage.setItem("lang", lang);
  document.querySelectorAll("[data-en]").forEach(el => {
    el.textContent = lang === "it" ? el.dataset.it : el.dataset.en;
  });
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
