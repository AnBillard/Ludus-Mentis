document.addEventListener("DOMContentLoaded", () => {
  // --- Fonction pour initialiser les menus du header ---
  const setupHeaderMenus = () => {
    const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.getElementById('mainNav');
    const dropdownBtn = document.getElementById('dropdownBtn');
    const dropdownContent = document.getElementById('dropdownContent');

    // 1. Logique pour le menu Burger (mobile)
    if (menuToggle && mainNav) {
      menuToggle.addEventListener('click', () => {
        mainNav.classList.toggle('nav-open');
        // S'assurer que le dropdown se ferme si on ferme le menu principal
        if (!mainNav.classList.contains('nav-open') && dropdownContent && dropdownContent.classList.contains('show')) {
            dropdownContent.classList.remove('show');
            if (dropdownBtn) dropdownBtn.setAttribute('aria-expanded', 'false');
        }
      });
    }

    // 2. Logique pour le menu déroulant "Plus" au clic
    if (dropdownBtn && dropdownContent) {
      dropdownBtn.addEventListener('click', (event) => {
        event.stopPropagation(); // Empêche le clic de se propager au document
        const isExpanded = dropdownBtn.getAttribute('aria-expanded') === 'true';
        dropdownBtn.setAttribute('aria-expanded', String(!isExpanded));
        dropdownContent.classList.toggle('show');
      });
    }

    // 3. Fermer le menu déroulant si on clique n'importe où ailleurs
    document.addEventListener('click', (event) => {
      if (dropdownContent && dropdownContent.classList.contains('show')) {
          if (!event.target.closest('.dropdown')) {
              dropdownContent.classList.remove('show');
              if (dropdownBtn) dropdownBtn.setAttribute('aria-expanded', 'false');
          }
      }
    });
  };

  // --- Chargement du Header et initialisation des menus ---
  const headerDiv = document.getElementById("header");
  if (headerDiv) {
    fetch("components/header.html")
      .then(r => r.text())
      .then(d => {
        headerDiv.innerHTML = d;
        // !! IMPORTANT: On lance l'initialisation des menus APRÈS que le HTML soit inséré
        setupHeaderMenus();
      });
  }

  // --- Chargement du Footer ---
  const footerDiv = document.getElementById("footer");
  if (footerDiv) {
    fetch("components/footer.html")
      .then(r => r.text())
      .then(d => footerDiv.innerHTML = d);
  }
});
