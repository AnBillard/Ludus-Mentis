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

    // 2. Logique pour le menu déroulant "Plus" au clic (desktop)
    if (dropdownBtn && dropdownContent) {
      dropdownBtn.addEventListener('click', (event) => {
        event.stopPropagation();
        const isExpanded = dropdownBtn.getAttribute('aria-expanded') === 'true';
        dropdownBtn.setAttribute('aria-expanded', String(!isExpanded));
        dropdownContent.classList.toggle('show');
      });
    }

    // 3. Fermer le menu déroulant si on clique ailleurs
    document.addEventListener('click', (event) => {
      if (dropdownContent && dropdownContent.classList.contains('show')) {
        if (!event.target.closest('.dropdown')) {
          dropdownContent.classList.remove('show');
          if (dropdownBtn) dropdownBtn.setAttribute('aria-expanded', 'false');
        }
      }
    });
  };

  // --- Fonction pour injecter les liens du "Plus" dans le menu mobile ---
  const injectDropdownLinksIntoMobile = () => {
    const mainNav = document.getElementById('mainNav');
    const dropdownContent = document.getElementById('dropdownContent');

    if (mainNav && dropdownContent) {
      const clonedLinks = dropdownContent.querySelectorAll('a');
      clonedLinks.forEach(link => {
        const cloned = link.cloneNode(true);
        cloned.classList.add('mobile-extra'); // Classe spécifique pour cibler si besoin
        mainNav.appendChild(cloned);
      });
    }
  };

  // --- Chargement du Header et initialisation des menus ---
  const headerDiv = document.getElementById("header");
  if (headerDiv) {
    fetch("components/header.html")
      .then(r => r.text())
      .then(d => {
        headerDiv.innerHTML = d;
        setupHeaderMenus();
        injectDropdownLinksIntoMobile(); // Intégration des liens "Plus" dans mobile
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
