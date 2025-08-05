document.addEventListener("DOMContentLoaded", () => {
  // --- Load header and footer components dynamically ---
  const loadComponent = (id, file) => {
    fetch(file)
      .then(response => response.text())
      .then(data => {
        document.getElementById(id).innerHTML = data;
        if (id === "header") {
          initHeaderMenus(); // Initialize menus after header is loaded
        }
      })
      .catch(err => console.error("Erreur chargement composant:", file, err));
  };

  loadComponent("header", "components/header.html");
  loadComponent("footer", "components/footer.html");

  // --- Initialize header menu logic (burger + dropdowns) ---
  function initHeaderMenus() {
    const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.getElementById('mainNav');
    const dropdownButtons = document.querySelectorAll('.dropbtn');

    // Burger menu logic (mobile)
    if (menuToggle && mainNav) {
      menuToggle.addEventListener('click', () => {
        const isMenuOpen = mainNav.classList.toggle('nav-open');
        menuToggle.setAttribute('aria-expanded', isMenuOpen);
        // Change l'icône du bouton
        menuToggle.innerHTML = isMenuOpen ? '✕' : '☰'; 
      });
    }

    // Dropdown logic (desktop)
    dropdownButtons.forEach(btn => {
      const dropdownContent = btn.nextElementSibling;
      btn.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        const isExpanded = btn.getAttribute('aria-expanded') === 'true';
        document.querySelectorAll('.dropdown-content').forEach(dc => dc.classList.remove('show'));
        dropdownButtons.forEach(b => b.setAttribute('aria-expanded', 'false'));
        if (!isExpanded) {
          dropdownContent.classList.add('show');
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    });

    // Close dropdown if clicking outside
    document.addEventListener('click', (event) => {
      if (!event.target.closest('.dropdown')) {
        document.querySelectorAll('.dropdown-content').forEach(dc => dc.classList.remove('show'));
        dropdownButtons.forEach(btn => btn.setAttribute('aria-expanded', 'false'));
      }
    });
  }
});
