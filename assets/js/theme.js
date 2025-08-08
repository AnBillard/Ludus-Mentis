(function(){
  const KEY = "lm_theme";
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const saved = localStorage.getItem(KEY);
  const theme = saved || (prefersDark ? "ludus-dark" : "ludus");
  document.documentElement.setAttribute("data-theme", theme);

  document.addEventListener("click", (e)=>{
    const btn = e.target.closest("[data-theme-toggle]");
    if (!btn) return;
    const current = document.documentElement.getAttribute("data-theme") || "ludus";
    const next = current === "ludus" ? "ludus-dark" : "ludus";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem(KEY, next);
  });
})();