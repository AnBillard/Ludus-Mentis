document.addEventListener("DOMContentLoaded", () => {
  const loadComponent = (id, file, callback) => {
    fetch(file)
      .then(res => res.text())
      .then(html => {
        document.getElementById(id).innerHTML = html;
        if (callback) callback();
      })
      .catch(err => console.error("Erreur chargement composant:", file, err));
  };

  loadComponent("header", "components/header.html", initThemeToggle);
  loadComponent("footer", "components/footer.html");

  function initThemeToggle() {
    const html = document.documentElement;
    const toggle = document.getElementById('theme-toggle');
    if (!toggle) return;
    const saved = localStorage.getItem('lm-theme');
    if (saved) html.setAttribute('data-theme', saved);
    toggle.checked = html.getAttribute('data-theme') === 'dark';
    toggle.addEventListener('change', () => {
      const next = toggle.checked ? 'dark' : 'retro';
      html.setAttribute('data-theme', next);
      localStorage.setItem('lm-theme', next);
    });
  }
});
