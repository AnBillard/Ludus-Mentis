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
  
  function initThemeToggle() {
    const root = document.documentElement;
    const toggleBtn = document.getElementById('theme-toggle');
    const sun = document.getElementById('sun-icon');
    const moon = document.getElementById('moon-icon');
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    
    function setMetaTheme(color) {
      document.querySelectorAll('meta[name="theme-color"]').forEach(m => m.setAttribute('content', color));
    }
    function apply(theme) {
      if (theme === 'dark') {
        root.classList.add('dark');
        root.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        if (sun) sun.classList.add('hidden');
        if (moon) moon.classList.remove('hidden');
        setMetaTheme('#0a0a0a');
      } else if (theme === 'light') {
        root.classList.remove('dark');
        root.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        if (sun) sun.classList.remove('hidden');
        if (moon) moon.classList.add('hidden');
        setMetaTheme('#ffffff');
      } else {
        localStorage.setItem('theme', 'auto');
        apply(mql.matches ? 'dark' : 'light');
      }
    }
    const saved = localStorage.getItem('theme') || 'auto';
    apply(saved);
    mql.addEventListener('change', () => {
      if ((localStorage.getItem('theme') || 'auto') === 'auto') apply('auto');
    });
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        const isDark = root.classList.contains('dark');
        apply(isDark ? 'light' : 'dark');
      });
    }
  }
     else if (savedTheme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      // Auto mode - follow system preference
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.setAttribute('data-theme', 'dark');
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
