document.addEventListener("DOMContentLoaded", () => {

  const loadComponent = (id, file) => {
    fetch(file)
      .then(response => response.text())
      .then(data => {
        const element = document.getElementById(id);
        if (element) {
          element.innerHTML = data;
          // Exécuter les scripts inline du fragment injecté
          element.querySelectorAll('script').forEach(oldScript => {
            const newScript = document.createElement('script');
            newScript.textContent = oldScript.textContent;
            document.body.appendChild(newScript);
          });
          if (id === "header") {
            initHeaderMenus();
            // NE PAS appeler initThemeToggle() — le script dans header.html s'en charge
          }
        }
      })
      .catch(err => console.error("Erreur chargement composant:", file, err));
  };

  loadComponent("header", "/components/header.html");
  loadComponent("footer", "/components/footer.html");

  function initHeaderMenus() {
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
      const trigger = dropdown.querySelector('[tabindex="0"]');
      const menu = dropdown.querySelector('.dropdown-content');
      if (trigger && menu) {
        trigger.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            menu.classList.toggle('show');
          }
        });
        document.addEventListener('keydown', (e) => {
          if (e.key === 'Escape') menu.classList.remove('show');
        });
      }
    });
  }

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // Intersection Observer for animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.card, .section').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
  });

  // Active nav highlighting
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.main-nav a, .menu a').forEach(link => {
    if (link.getAttribute('href') === currentPath) {
      link.classList.add('active');
      link.style.color = 'rgb(251, 146, 60)';
      link.style.fontWeight = '600';
    }
  });

  // Progressive image loading
  const imageObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.add('fade-in');
        obs.unobserve(img);
      }
    });
  }, { rootMargin: '0px 0px 300px 0px' });

  document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
});
