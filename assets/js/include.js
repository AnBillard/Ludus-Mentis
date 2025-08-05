
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

    // Burger menu
          document.querySelectorAll('.dropdown-content').forEach(dc => dc.classList.remove('show'));
        }
      });
    }

    // Dropdown logic
      btn.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        document.querySelectorAll('.dropdown-content').forEach(dc => dc.classList.remove('show'));
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    });

    // Close dropdown if clicking outside
    document.addEventListener('click', (event) => {
      if (!event.target.closest('.dropdown')) {
        document.querySelectorAll('.dropdown-content').forEach(dc => dc.classList.remove('show'));
      }
    });
  }
});