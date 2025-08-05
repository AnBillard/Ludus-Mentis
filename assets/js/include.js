
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById('menuToggle');
  const mainNav = document.getElementById('mainNav');
  const dropdownButtons = document.querySelectorAll('.dropbtn');

  // --- 1. Burger menu logic ---
  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
      mainNav.classList.toggle('nav-open');

      // Close all dropdowns when closing burger
      if (!mainNav.classList.contains('nav-open')) {
        document.querySelectorAll('.dropdown-content').forEach(dc => {
          dc.classList.remove('show');
        });
        dropdownButtons.forEach(btn => btn.setAttribute('aria-expanded', 'false'));
      }
    });
  }

  // --- 2. Dropdown logic (mobile: click, desktop: hover via CSS) ---
  dropdownButtons.forEach(btn => {
    const dropdownContent = btn.nextElementSibling;
    btn.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();

      const isExpanded = btn.getAttribute('aria-expanded') === 'true';
      // Close all dropdowns first
      document.querySelectorAll('.dropdown-content').forEach(dc => dc.classList.remove('show'));
      dropdownButtons.forEach(b => b.setAttribute('aria-expanded', 'false'));

      // Toggle current
      if (!isExpanded) {
        dropdownContent.classList.add('show');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // --- 3. Close dropdown if clicking outside ---
  document.addEventListener('click', (event) => {
    if (!event.target.closest('.dropdown')) {
      document.querySelectorAll('.dropdown-content').forEach(dc => dc.classList.remove('show'));
      dropdownButtons.forEach(btn => btn.setAttribute('aria-expanded', 'false'));
    }
  });
});
