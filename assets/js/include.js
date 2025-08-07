document.addEventListener("DOMContentLoaded", () => {
  const loadComponent = (id, file) => {
    fetch(file)
      .then(response => response.text())
      .then(html => {
        document.getElementById(id).innerHTML = html;
        if (id === "header") {
          initThemeToggle();
        }
      })
      .catch(err => console.error("Erreur chargement composant:", file, err));
  };

  loadComponent("header", "components/header.html");
  loadComponent("footer", "components/footer.html");

  function initThemeToggle() {
    const toggle = document.getElementById("themeToggle");
    if (!toggle) return;

    const storedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const theme = storedTheme || (prefersDark ? "synthwave" : "retro");
    document.documentElement.setAttribute("data-theme", theme);
    toggle.checked = theme === "synthwave";

    toggle.addEventListener("change", (e) => {
      const newTheme = e.target.checked ? "synthwave" : "retro";
      document.documentElement.setAttribute("data-theme", newTheme);
      localStorage.setItem("theme", newTheme);
    });
  }
});
