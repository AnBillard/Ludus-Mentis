document.addEventListener("DOMContentLoaded", () => {
  // --- Load header and footer components dynamically ---
  const loadComponent = (id, file) => {
    fetch(file)
      .then(response => response.text())
      .then(data => {
        const element = document.getElementById(id);
        if (element) {
          element.innerHTML = data;
          if (id === "header") {
            initHeaderMenus();
            initThemeToggle();
          }
        }
      })
      .catch(err => console.error("Erreur chargement composant:", file, err));
  };

  loadComponent("header", "components/header.html");
  loadComponent("footer", "components/footer.html");

  // --- Initialize header menu logic ---
  function initHeaderMenus() {
    // DaisyUI dropdowns work automatically with hover
    // Add keyboard navigation support
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
      const trigger = dropdown.querySelector('[tabindex="0"]');
      const menu = dropdown.querySelector('.dropdown-content');
      
      if (trigger && menu) {
        // Keyboard support
        trigger.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            menu.classList.toggle('show');
          }
        });
        
        // Close on Escape
        document.addEventListener('keydown', (e) => {
          if (e.key === 'Escape') {
            menu.classList.remove('show');
          }
        });
      }
    });

    // Mobile menu close on link click
    const mobileLinks = document.querySelectorAll('.dropdown-end .menu a');
    const mobileDropdown = document.querySelector('.dropdown-end input[type="checkbox"]');
    
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (mobileDropdown) {
          mobileDropdown.checked = false;
        }
      });
    });
  }

  // --- Theme toggle functionality (optional) ---
  
  function updateThemeToggleUI(mode) {
    const btn = document.getElementById('theme-toggle');
    if (!btn) return;
    const sun = document.getElementById('sun-icon');
    const moon = document.getElementById('moon-icon');
    const auto = document.getElementById('auto-icon');
    // Hide all, show current
    ;[sun, moon, auto].forEach(el => { if (el) el.classList.add('hidden'); });
    if (mode === 'light' && sun) sun.classList.remove('hidden');
    else if (mode === 'dark' && moon) moon.classList.remove('hidden');
    else if (auto) auto.classList.remove('hidden');
    // Update title / aria-label
    const titles = {
      light: 'Thème : clair (cliquer pour passer en sombre)',
      dark:  'Thème : sombre (cliquer pour passer en auto)',
      auto:  'Thème : auto (suivre le système, cliquer pour passer en clair)'
    };
    btn.title = titles[mode] || 'Basculer le thème';
    btn.setAttribute('aria-label', btn.title);
    btn.setAttribute('data-theme-mode', mode);
  }
  // a11y state for tri-state: true(dark), false(light), mixed(auto)
  if (mode === 'dark') btn.setAttribute('aria-pressed', 'true');
  else if (mode === 'light') btn.setAttribute('aria-pressed', 'false');
  else btn.setAttribute('aria-pressed', 'mixed');


function initThemeToggle() {
    // Check for saved theme preference or default to 'auto'
    const savedTheme = localStorage.getItem('theme') || 'auto';
    
    if (savedTheme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      document.documentElement.classList.add('dark');
    } else if (savedTheme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
      document.documentElement.classList.remove('dark');
    } else {
      // Auto mode - follow system preference
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');
      if (prefersDark && prefersDark.matches) {
        document.documentElement.setAttribute('data-theme', 'dark');
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.setAttribute('data-theme', 'light');
        document.documentElement.classList.remove('dark');
      
    // After initial application, reflect UI
    const current = (localStorage.getItem('theme') || 'auto');
    updateThemeToggleUI(current);

    // Click handler: cycle light -> dark -> auto
    const toggleBtn = document.getElementById('theme-toggle');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        const saved = localStorage.getItem('theme') || 'auto';
        let next = 'light';
        if (saved === 'light') next = 'dark';
        else if (saved === 'dark') next = 'auto';
        else next = 'light';

        localStorage.setItem('theme', next);

        // Apply immediately
        if (next === 'dark') {
          document.documentElement.setAttribute('data-theme', 'dark');
          document.documentElement.classList.add('dark');
        } else if (next === 'light') {
          document.documentElement.setAttribute('data-theme', 'light');
          document.documentElement.classList.remove('dark');
        } else {
          // Auto -> mirror system
          const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');
          if (prefersDark && prefersDark.matches) {
            document.documentElement.setAttribute('data-theme', 'dark');
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.setAttribute('data-theme', 'light');
            document.documentElement.classList.remove('dark');
          }
        }
        updateThemeToggleUI(next);
      });
    }
}
      // Keep in sync if the OS theme changes while on auto
      if (prefersDark) {
        prefersDark.addEventListener('change', (e) => {
          if ((localStorage.getItem('theme') || 'auto') === 'auto') {
            if (e.matches) {
              document.documentElement.setAttribute('data-theme', 'dark');
              document.documentElement.classList.add('dark');
            } else {
              document.documentElement.setAttribute('data-theme', 'light');
              document.documentElement.classList.remove('dark');
            }
          }
        });
      }
    }
  }

  // --- Smooth scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // --- Add loading states to forms ---
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      const submitBtn = form.querySelector('button[type="submit"], input[type="submit"]');
      if (submitBtn) {
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
      }
    });
  });

  // --- Intersection Observer for animations ---
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all cards and sections
  const animatedElements = document.querySelectorAll('.card, .section');
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
  });

  // --- Add parallax effect to hero sections ---
  const heroSections = document.querySelectorAll('.hero');
  if (heroSections.length > 0) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      heroSections.forEach(hero => {
        const rate = scrolled * -0.5;
        if (hero.getBoundingClientRect().bottom > 0) {
          hero.style.transform = `translateY(${rate}px)`;
        }
      });
    });
  }

  // --- Active navigation highlighting ---
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.main-nav a, .menu a');
  
  navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPath) {
      link.classList.add('active');
      link.style.color = 'rgb(251, 146, 60)';
      link.style.fontWeight = '600';
    }
  });

  // --- Progressive image loading ---
  const images = document.querySelectorAll('img[data-src]');
  const imageOptions = {
    threshold: 0,
    rootMargin: '0px 0px 300px 0px'
  };

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.add('fade-in');
        imageObserver.unobserve(img);
      }
    });
  }, imageOptions);

  images.forEach(img => imageObserver.observe(img));
});
