(function () {
  const root = document.getElementById("three-principles-landing");
  const langButtons = root.querySelectorAll(".lang-btn");

  function setLang(l) {
    langButtons.forEach((b) => {
      const is = b.getAttribute("data-lang") === l;
      b.classList.toggle("active", is);
      b.setAttribute("aria-pressed", String(is));
    });

    const all = root.querySelectorAll("[data-lang]:not(.lang-btn)");
    all.forEach((el) => {
      const lang = el.getAttribute("data-lang");
      el.hidden = lang !== l;
    });

    try {
      localStorage.setItem("tpl_lang", l);
    } catch (e) {}
  }

  langButtons.forEach((b) =>
    b.addEventListener("click", () => setLang(b.dataset.lang))
  );

  const saved = (() => {
    try {
      return localStorage.getItem("tpl_lang");
    } catch (e) {
      return null;
    }
  })();
  setLang(saved === "en" ? "en" : "ua");

  document.querySelectorAll("[data-scroll]").forEach((a) => {
    a.addEventListener("click", function (ev) {
      ev.preventDefault();
      const href = this.getAttribute("href") || "#";
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  const reveals = root.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    reveals.forEach((r) => io.observe(r));
  } else {
    reveals.forEach((r) => r.classList.add("visible"));
  }

  const top = document.createElement("div");
  top.id = "top";
  document.body.prepend(top);
})();
