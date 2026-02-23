// /assets/js/theme-manager.js
// Gestion du dark mode pour Ludus Mentis — version allégée
// Utilise DaisyUI natif (data-theme="dark") + quelques overrides ciblés

(function () {
  'use strict';

  const STORAGE_KEY = 'theme';
  const DARK = 'dark';
  const LIGHT = 'light';
  const BTN_ID = 'theme-toggle';

  // ── 1. Application immédiate (anti-FOUC) ──────────────────────────────────
  function getInitialTheme() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === DARK || saved === LIGHT) return saved;
    try {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? DARK : LIGHT;
    } catch (e) {
      return LIGHT;
    }
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }

  // Appliqué immédiatement au chargement du script (avant DOMContentLoaded)
  applyTheme(getInitialTheme());

  // ── 2. CSS ciblé pour les quelques classes Tailwind statiques ────────────
  // DaisyUI gère automatiquement ses propres composants (card, alert, badge…).
  // On override uniquement les classes Tailwind de couleur "figées" dans le HTML.
  function injectStyles() {
    if (document.getElementById('lm-dark-styles')) return;
    const s = document.createElement('style');
    s.id = 'lm-dark-styles';
    s.textContent = `
      /* ── Textes gris → lisibles en dark ── */
      [data-theme="dark"] .text-gray-800 { color: #f3f4f6 !important; }
      [data-theme="dark"] .text-gray-700 { color: #e5e7eb !important; }
      [data-theme="dark"] .text-gray-600 { color: #d1d5db !important; }
      [data-theme="dark"] .text-gray-500 { color: #9ca3af !important; }

      /* ── Couleurs Ludus sur fond sombre ── */
      [data-theme="dark"] .text-ludus-teal  { color: #5eead4 !important; }
      [data-theme="dark"] .text-ludus-orange { color: #fdba74 !important; }
      [data-theme="dark"] .text-ludus-purple { color: #d8b4fe !important; }

      /* ── Fonds colorés clairs → versions sombres équivalentes ── */
      [data-theme="dark"] .bg-orange-50  { background-color: rgba(251,146,60,.12) !important; }
      [data-theme="dark"] .bg-blue-50    { background-color: rgba(96,165,250,.12) !important; }
      [data-theme="dark"] .bg-teal-50    { background-color: rgba(45,212,191,.12) !important; }
      [data-theme="dark"] .bg-green-50   { background-color: rgba(74,222,128,.12) !important; }
      [data-theme="dark"] .bg-purple-50  { background-color: rgba(192,132,252,.12) !important; }
      [data-theme="dark"] .bg-cyan-50    { background-color: rgba(34,211,238,.12) !important; }
      [data-theme="dark"] .bg-pink-50    { background-color: rgba(244,114,182,.12) !important; }

      /* ── Bordures colorées ── */
      [data-theme="dark"] .border-orange-200 { border-color: rgba(251,146,60,.35) !important; }
      [data-theme="dark"] .border-teal-200   { border-color: rgba(45,212,191,.35) !important; }

      /* ── Textes dans les fonds colorés ── */
      [data-theme="dark"] .bg-orange-50 *:not([class*="badge"]):not(button) { color: #fdba74 !important; }
      [data-theme="dark"] .bg-blue-50   *:not([class*="badge"]):not(button) { color: #93c5fd !important; }
      [data-theme="dark"] .bg-teal-50   *:not([class*="badge"]):not(button) { color: #5eead4 !important; }
      [data-theme="dark"] .bg-green-50  *:not([class*="badge"]):not(button) { color: #86efac !important; }
      [data-theme="dark"] .bg-purple-50 *:not([class*="badge"]):not(button) { color: #d8b4fe !important; }

      /* ── Textes colorés spécifiques (inline) ── */
      [data-theme="dark"] .text-blue-700  { color: #93c5fd !important; }
      [data-theme="dark"] .text-green-700 { color: #86efac !important; }
      [data-theme="dark"] .text-orange-600 { color: #fdba74 !important; }
      [data-theme="dark"] .text-purple-700 { color: #d8b4fe !important; }
      [data-theme="dark"] .text-red-600   { color: #fca5a5 !important; }
      [data-theme="dark"] .text-teal-700  { color: #5eead4 !important; }

      /* ── Gradient signature (inchangé, reste lisible) ── */
      [data-theme="dark"] .gradient-ludus {
        background: linear-gradient(135deg, #0e9490 0%, #ea7c09 100%);
      }

      /* ── Bouton toggle ── */
      #${BTN_ID} { transition: background .2s, transform .2s; }
      [data-theme="light"] #${BTN_ID}:hover,
      [data-theme="dark"]  #${BTN_ID}:hover { transform: scale(1.08); }

      /* ── Dropdown mobile en dark ── */
      [data-theme="dark"] .dropdown-content {
        background-color: hsl(220 13% 18%);
        border-color: rgba(255,255,255,.1);
      }
      [data-theme="dark"] .dropdown-content a { color: #e5e7eb; }
      [data-theme="dark"] .dropdown-content a:hover {
        background-color: rgba(255,255,255,.08);
        color: #5eead4;
      }

      /* ── Journal de bord : retenir boxes ── */
      [data-theme="dark"] .retenir-teal   { background: rgba(45,212,191,.1);  color: #5eead4; border-color: #5eead4; }
      [data-theme="dark"] .retenir-orange { background: rgba(251,146,60,.1);  color: #fdba74; border-color: #fdba74; }
      [data-theme="dark"] .retenir-purple { background: rgba(192,132,252,.1); color: #d8b4fe; border-color: #d8b4fe; }

      /* ── Gradient subtle (analyse-approfondie, journal) ── */
      [data-theme="dark"] .gradient-subtle {
        background: linear-gradient(135deg, hsl(220 13% 20%) 0%, hsl(220 13% 17%) 100%);
      }
      [data-theme="dark"] .gradient-subtle h1,
      [data-theme="dark"] .gradient-subtle p { color: #e5e7eb !important; }
    `;
    document.head.appendChild(s);
  }

  // ── 3. Bouton toggle ───────────────────────────────────────────────────────
  function updateBtn(btn, theme) {
    btn.textContent = theme === DARK ? '☀️' : '🌙';
    btn.title = theme === DARK ? 'Passer en mode clair' : 'Passer en mode sombre';
    btn.setAttribute('aria-label', btn.title);
  }

  function createToggleBtn() {
    const btn = document.createElement('button');
    btn.id = BTN_ID;
    btn.className = 'btn btn-ghost btn-circle btn-sm';
    btn.type = 'button';
    updateBtn(btn, document.documentElement.getAttribute('data-theme') || LIGHT);

    btn.addEventListener('click', () => {
      const next = document.documentElement.getAttribute('data-theme') === DARK ? LIGHT : DARK;
      applyTheme(next);
      updateBtn(btn, next);
    });
    return btn;
  }

  // ── 4. Insertion du bouton dans le header ─────────────────────────────────
  // Le header est chargé dynamiquement par include.js.
  // On écoute un MutationObserver plutôt qu'un setInterval.
  function insertBtn() {
    const navbarEnd = document.querySelector('.navbar-end');
    if (!navbarEnd || document.getElementById(BTN_ID)) return false;

    const btn = createToggleBtn();
    const mobileDropdown = navbarEnd.querySelector('.dropdown-end');
    if (mobileDropdown) {
      navbarEnd.insertBefore(btn, mobileDropdown);
    } else {
      navbarEnd.appendChild(btn);
    }
    return true;
  }

  function waitForHeader() {
    if (insertBtn()) return;
    const observer = new MutationObserver(() => {
      if (insertBtn()) observer.disconnect();
    });
    observer.observe(document.body, { childList: true, subtree: true });
    // Sécurité : on débranche après 5s quoi qu'il arrive
    setTimeout(() => observer.disconnect(), 5000);
  }

  // ── 5. Écouter les changements de préférence système ─────────────────────
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem(STORAGE_KEY)) {
        applyTheme(e.matches ? DARK : LIGHT);
      }
    });
  }

  // ── 6. Init ───────────────────────────────────────────────────────────────
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => { injectStyles(); waitForHeader(); });
  } else {
    injectStyles();
    waitForHeader();
  }

  // ── 7. API publique ───────────────────────────────────────────────────────
  window.LudusTheme = {
    get: () => document.documentElement.getAttribute('data-theme') || LIGHT,
    set: applyTheme,
    toggle: () => {
      const next = (document.documentElement.getAttribute('data-theme') || LIGHT) === DARK ? LIGHT : DARK;
      applyTheme(next);
      const btn = document.getElementById(BTN_ID);
      if (btn) updateBtn(btn, next);
    }
  };
})();
