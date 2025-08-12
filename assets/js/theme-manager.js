// /assets/js/theme-manager.js
// Gestion centralisée du dark mode pour Ludus Mentis
// Version améliorée avec meilleur support des éléments colorés

(function() {
  'use strict';
  
  // ============================================
  // CONFIGURATION
  // ============================================
  const CONFIG = {
    themes: {
      'light': { 
        name: 'light', 
        icon: '🌙', 
        next: 'ludus-dark',
        label: 'Activer le mode sombre'
      },
      'ludus-dark': { 
        name: 'ludus-dark', 
        icon: '☀️', 
        next: 'light',
        label: 'Activer le mode clair'
      }
    },
    storageKey: 'theme',
    defaultTheme: 'light',
    toggleButtonId: 'theme-toggle'
  };
  
  // ============================================
  // DÉTECTION ET APPLICATION IMMÉDIATE
  // ============================================
  function getInitialTheme() {
    const saved = localStorage.getItem(CONFIG.storageKey);
    if (saved && CONFIG.themes[saved]) {
      return saved;
    }
    
    try {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      if (mediaQuery.matches) {
        return 'ludus-dark';
      }
    } catch (e) {
      console.warn('matchMedia not supported:', e);
    }
    
    return CONFIG.defaultTheme;
  }
  
  // ============================================
  // APPLICATION ULTRA-RAPIDE DU THÈME
  // ============================================
  (function applyInitialTheme() {
    const theme = getInitialTheme();
    document.documentElement.setAttribute('data-theme', theme);
    
    if (theme === 'ludus-dark') {
      document.documentElement.classList.add('dark');
    }
  })();
  
  // ============================================
  // INJECTION DU CSS POUR LUDUS-DARK
  // ============================================
  function injectThemeStyles() {
    if (document.getElementById('ludus-theme-styles')) return;
    
    const styleSheet = document.createElement('style');
    styleSheet.id = 'ludus-theme-styles';
    styleSheet.textContent = `
      /* ====================================
         THÈME SOMBRE PERSONNALISÉ : ludus-dark
      ==================================== */
      [data-theme="ludus-dark"] {
        color-scheme: dark;
        
        --p: 189 70% 60%;
        --pf: 189 70% 50%;
        --pc: 214 20% 10%;
        
        --s: 35 100% 65%;
        --sf: 35 100% 55%;
        --sc: 0 0% 10%;
        
        --a: 262 60% 70%;
        --af: 262 60% 60%;
        --ac: 0 0% 10%;
        
        --b1: 220 13% 18%;
        --b2: 220 13% 15%;
        --b3: 220 13% 12%;
        --bc: 210 20% 90%;
        
        --n: 214 20% 70%;
        --nf: 214 20% 75%;
        --nc: 214 20% 10%;
      }
      
      /* Couleur de texte par défaut en dark mode */
      [data-theme="ludus-dark"],
      [data-theme="ludus-dark"] body,
      [data-theme="ludus-dark"] main {
        color: #f3f4f6;
        background-color: #1a1d23;
      }
      
      [data-theme="ludus-dark"] p,
      [data-theme="ludus-dark"] span:not([class*="text-"]):not([class*="badge"]),
      [data-theme="ludus-dark"] li,
      [data-theme="ludus-dark"] div:not([class*="bg-"]) {
        color: #e5e7eb;
      }
      
      [data-theme="ludus-dark"] h1,
      [data-theme="ludus-dark"] h2,
      [data-theme="ludus-dark"] h3,
      [data-theme="ludus-dark"] h4,
      [data-theme="ludus-dark"] h5,
      [data-theme="ludus-dark"] h6 {
        color: #f9fafb !important;
      }
      
      /* ============================================
         ADAPTATION DES ÉLÉMENTS COLORÉS EN DARK MODE
      ============================================ */
      
      /* Backgrounds colorés - transformation en versions sombres */
      [data-theme="ludus-dark"] .bg-orange-50 {
        background-color: rgba(255, 152, 0, 0.15) !important;
        color: #fed7aa !important;
      }
      
      [data-theme="ludus-dark"] .bg-orange-50 span,
      [data-theme="ludus-dark"] .bg-orange-50 p {
        color: #fed7aa !important;
      }
      
      [data-theme="ludus-dark"] .bg-blue-50 {
        background-color: rgba(59, 130, 246, 0.15) !important;
        color: #bfdbfe !important;
      }
      
      [data-theme="ludus-dark"] .bg-blue-50 span,
      [data-theme="ludus-dark"] .bg-blue-50 p {
        color: #bfdbfe !important;
      }
      
      [data-theme="ludus-dark"] .bg-teal-50 {
        background-color: rgba(23, 162, 184, 0.15) !important;
        color: #5eead4 !important;
      }
      
      [data-theme="ludus-dark"] .bg-teal-50 span,
      [data-theme="ludus-dark"] .bg-teal-50 p,
      [data-theme="ludus-dark"] .bg-teal-50 strong {
        color: #5eead4 !important;
      }
      
      [data-theme="ludus-dark"] .bg-green-50 {
        background-color: rgba(34, 197, 94, 0.15) !important;
        color: #86efac !important;
      }
      
      [data-theme="ludus-dark"] .bg-green-50 span,
      [data-theme="ludus-dark"] .bg-green-50 p {
        color: #86efac !important;
      }
      
      [data-theme="ludus-dark"] .bg-purple-50 {
        background-color: rgba(107, 70, 193, 0.15) !important;
        color: #d8b4fe !important;
      }
      
      [data-theme="ludus-dark"] .bg-purple-50 span,
      [data-theme="ludus-dark"] .bg-purple-50 p {
        color: #d8b4fe !important;
      }
      
      /* Alerts avec bordures colorées en dark mode */
      [data-theme="ludus-dark"] .alert.border-ludus-teal.bg-teal-50 {
        background-color: rgba(23, 162, 184, 0.15) !important;
        border-color: #17a2b8 !important;
        color: #5eead4 !important;
      }
      
      [data-theme="ludus-dark"] .alert.border-ludus-teal.bg-teal-50 svg {
        color: #5eead4 !important;
      }
      
      [data-theme="ludus-dark"] .alert.border-ludus-orange.bg-orange-50 {
        background-color: rgba(255, 152, 0, 0.15) !important;
        border-color: #ff9800 !important;
        color: #fed7aa !important;
      }
      
      [data-theme="ludus-dark"] .alert.border-ludus-orange.bg-orange-50 svg {
        color: #fed7aa !important;
      }
      
      /* Textes colorés spécifiques */
      [data-theme="ludus-dark"] .text-ludus-teal {
        color: #5eead4 !important;
      }
      
      [data-theme="ludus-dark"] .text-ludus-orange {
        color: #fed7aa !important;
      }
      
      [data-theme="ludus-dark"] .text-ludus-purple {
        color: #d8b4fe !important;
      }
      
      [data-theme="ludus-dark"] .text-gray-800 {
        color: #f3f4f6 !important;
      }
      
      [data-theme="ludus-dark"] .text-gray-700 {
        color: #e5e7eb !important;
      }
      
      [data-theme="ludus-dark"] .text-gray-600 {
        color: #d1d5db !important;
      }
      
      [data-theme="ludus-dark"] .text-gray-500 {
        color: #9ca3af !important;
      }
      
      /* Gradient signature */
      [data-theme="ludus-dark"] .gradient-ludus {
        background: linear-gradient(135deg, #2dd4bf 0%, #fb923c 100%);
      }
      
      /* Cards génériques */
      [data-theme="ludus-dark"] .card {
        background: #242832;
        border: 1px solid rgba(255, 255, 255, 0.1);
        color: #e5e7eb;
      }
      
      [data-theme="ludus-dark"] .bg-gradient-to-br[class*="from-"][class*="to-"] {
        background: #242832 !important;
        border: 1px solid rgba(255, 255, 255, 0.1);
      }
      
      /* Spécifique pour les cards avec gradients de couleur */
      [data-theme="ludus-dark"] .bg-gradient-to-br.from-teal-50.to-orange-50 {
        background: linear-gradient(135deg, rgba(23, 162, 184, 0.1) 0%, rgba(255, 152, 0, 0.1) 100%) !important;
        border: 1px solid rgba(255, 255, 255, 0.1);
      }
      
      [data-theme="ludus-dark"] .card-body,
      [data-theme="ludus-dark"] .card-body p,
      [data-theme="ludus-dark"] .card-body span,
      [data-theme="ludus-dark"] .card-body li {
        color: #e5e7eb !important;
      }
      
      [data-theme="ludus-dark"] .card-title {
        color: #f9fafb !important;
      }
      
      /* Navbar */
      [data-theme="ludus-dark"] .navbar {
        background: rgba(26, 32, 44, 0.95);
        backdrop-filter: blur(10px);
      }
      
      [data-theme="ludus-dark"] .navbar a,
      [data-theme="ludus-dark"] .menu a {
        color: #e5e7eb;
      }
      
      [data-theme="ludus-dark"] .navbar a:hover,
      [data-theme="ludus-dark"] .menu a:hover {
        color: #4dd0e1;
      }
      
      /* Style du toggle button amélioré */
      #${CONFIG.toggleButtonId} {
        margin: 0 0.25rem;
        transition: all 0.3s ease;
        flex-shrink: 0;
        min-width: 2.5rem;
      }
      
      @media (max-width: 640px) {
        #${CONFIG.toggleButtonId} {
          margin: 0 0.125rem;
        }
      }
      
      [data-theme="light"] #${CONFIG.toggleButtonId} {
        background: rgba(23, 162, 184, 0.1);
        color: #17a2b8;
      }
      
      [data-theme="light"] #${CONFIG.toggleButtonId}:hover {
        background: rgba(23, 162, 184, 0.2);
        transform: scale(1.05);
      }
      
      [data-theme="ludus-dark"] #${CONFIG.toggleButtonId} {
        background: rgba(77, 208, 225, 0.15);
        color: #4dd0e1;
      }
      
      [data-theme="ludus-dark"] #${CONFIG.toggleButtonId}:hover {
        background: rgba(77, 208, 225, 0.25);
        transform: scale(1.05);
      }
      
      /* Amélioration du positionnement dans la navbar */
      .navbar-end {
        display: flex;
        align-items: center;
        gap: 0.25rem;
      }
      
      /* Fix pour le menu mobile en dark mode */
      [data-theme="ludus-dark"] .dropdown-content {
        background-color: hsl(220 13% 18%);
        border-color: rgba(255, 255, 255, 0.1);
      }
      
      /* Autres fixes dark mode */
      [data-theme="ludus-dark"] body {
        color: #e5e7eb;
      }
      
      [data-theme="ludus-dark"] main p:not([class*="text-"]),
      [data-theme="ludus-dark"] main span:not([class*="text-"]):not([class*="badge"]),
      [data-theme="ludus-dark"] main li:not([class*="text-"]),
      [data-theme="ludus-dark"] main div:not([class*="text-"]) {
        color: inherit;
      }
      
      [data-theme="ludus-dark"] table {
        color: #e5e7eb;
      }
      
      [data-theme="ludus-dark"] th {
        color: #f3f4f6;
      }
      
      [data-theme="ludus-dark"] .alert {
        filter: brightness(1.2);
      }
      
      [data-theme="ludus-dark"] .badge {
        filter: brightness(1.1);
      }
      
      [data-theme="ludus-dark"] .btn-outline {
        border-color: rgba(255, 255, 255, 0.3);
        color: #e5e7eb;
      }
      
      [data-theme="ludus-dark"] .btn-outline:hover {
        background: rgba(255, 255, 255, 0.1);
        border-color: rgba(255, 255, 255, 0.5);
      }
      
      /* ============================================
         FIX SPÉCIFIQUE POUR INFOS-PRATIQUES.HTML
      ============================================ */
      
      /* Cartes de réductions */
      [data-theme="ludus-dark"] .bg-orange-50 .font-bold {
        color: #fbbf24 !important;
      }
      
      [data-theme="ludus-dark"] .bg-blue-50 .font-bold {
        color: #60a5fa !important;
      }
      
      [data-theme="ludus-dark"] .bg-green-50 .font-bold {
        color: #4ade80 !important;
      }
      
      [data-theme="ludus-dark"] .bg-purple-50 .font-bold {
        color: #c084fc !important;
      }
      
      /* Badges dans les cartes colorées */
      [data-theme="ludus-dark"] .bg-orange-50 .badge,
      [data-theme="ludus-dark"] .bg-blue-50 .badge,
      [data-theme="ludus-dark"] .bg-green-50 .badge,
      [data-theme="ludus-dark"] .bg-purple-50 .badge {
        filter: brightness(1.3);
      }
      
      /* Stats avec gradients - amélioration du contraste */
      [data-theme="ludus-dark"] .stat.bg-gradient-to-br {
        background: #242832 !important;
        border: 1px solid rgba(255, 255, 255, 0.2);
      }
      
      /* Fix spécifique pour les stats santé avec gradients colorés */
      [data-theme="ludus-dark"] .stat.bg-gradient-to-br[class*="from-teal"] {
        background: linear-gradient(135deg, rgba(23, 162, 184, 0.2) 0%, rgba(23, 162, 184, 0.1) 100%) !important;
        border: 2px solid #17a2b8 !important;
      }
      
      [data-theme="ludus-dark"] .stat.bg-gradient-to-br[class*="from-orange"] {
        background: linear-gradient(135deg, rgba(255, 152, 0, 0.2) 0%, rgba(255, 152, 0, 0.1) 100%) !important;
        border: 2px solid #ff9800 !important;
      }
      
      [data-theme="ludus-dark"] .stat.bg-gradient-to-br[class*="from-purple"] {
        background: linear-gradient(135deg, rgba(107, 70, 193, 0.2) 0%, rgba(107, 70, 193, 0.1) 100%) !important;
        border: 2px solid #6b46c1 !important;
      }
      
      /* Amélioration du texte dans les stats en dark mode */
      [data-theme="ludus-dark"] .stat .stat-title {
        color: #f9fafb !important;
        font-weight: 600;
      }
      
      [data-theme="ludus-dark"] .stat .stat-desc {
        color: #d1d5db !important;
        opacity: 0.9;
      }
      
      [data-theme="ludus-dark"] .stat .stat-figure {
        opacity: 1 !important;
      }
      
      [data-theme="ludus-dark"] .stat.border-ludus-teal .stat-figure {
        color: #5eead4 !important;
      }
      
      [data-theme="ludus-dark"] .stat.border-ludus-orange .stat-figure {
        color: #fed7aa !important;
      }
      
      [data-theme="ludus-dark"] .stat.border-ludus-purple .stat-figure {
        color: #d8b4fe !important;
      }
      
      /* Alert info spéciale */
      [data-theme="ludus-dark"] .alert.alert-info {
        background-color: rgba(59, 130, 246, 0.15) !important;
        color: #93c5fd !important;
        border-color: rgba(59, 130, 246, 0.3);
      }
      
      /* Text colors in alerts */
      [data-theme="ludus-dark"] .text-ludus-teal {
        color: #5eead4 !important;
      }
      
      [data-theme="ludus-dark"] .text-ludus-orange {
        color: #fed7aa !important;
      }
      
      /* Opacity adjustment for better readability */
      [data-theme="ludus-dark"] .opacity-75 {
        opacity: 0.85;
      }
      
      [data-theme="ludus-dark"] .opacity-50 {
        opacity: 0.65;
      }
    `;
    
    document.head.appendChild(styleSheet);
  }
  
  // ============================================
  // GESTION DU THÈME
  // ============================================
  function setTheme(themeName) {
    if (!CONFIG.themes[themeName]) {
      console.warn(`Theme "${themeName}" not found`);
      themeName = CONFIG.defaultTheme;
    }
    
    document.documentElement.setAttribute('data-theme', themeName);
    localStorage.setItem(CONFIG.storageKey, themeName);
    
    if (themeName === 'ludus-dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    window.dispatchEvent(new CustomEvent('themeChanged', { 
      detail: { theme: themeName } 
    }));
  }
  
  // ============================================
  // CRÉATION DU BOUTON TOGGLE
  // ============================================
  function createThemeToggle() {
    if (document.getElementById(CONFIG.toggleButtonId)) {
      return document.getElementById(CONFIG.toggleButtonId);
    }
    
    const button = document.createElement('button');
    button.id = CONFIG.toggleButtonId;
    button.className = 'btn btn-ghost btn-circle btn-sm';
    button.type = 'button';
    
    const updateButton = () => {
      const current = document.documentElement.getAttribute('data-theme') || CONFIG.defaultTheme;
      const theme = CONFIG.themes[current] || CONFIG.themes[CONFIG.defaultTheme];
      button.innerHTML = `<span style="font-size: 1.2rem;">${theme.icon}</span>`;
      button.setAttribute('aria-label', theme.label);
      button.title = theme.label;
    };
    
    button.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || CONFIG.defaultTheme;
      const theme = CONFIG.themes[current] || CONFIG.themes[CONFIG.defaultTheme];
      setTheme(theme.next);
      updateButton();
    });
    
    updateButton();
    return button;
  }
  
  // ============================================
  // INSERTION DU BOUTON DANS LE DOM
  // ============================================
  function insertToggleButton() {
    const toggle = createThemeToggle();
    
    // Chercher dans la navbar-end
    const navbarEnd = document.querySelector('.navbar-end');
    if (navbarEnd) {
      // Chercher le bouton CTA desktop
      const ctaDesktop = navbarEnd.querySelector('a[href="/contact.html"].hidden.lg\\:flex');
      
      if (ctaDesktop) {
        // Insérer APRÈS le CTA (avant le dropdown mobile)
        if (ctaDesktop.nextSibling) {
          navbarEnd.insertBefore(toggle, ctaDesktop.nextSibling);
        } else {
          navbarEnd.appendChild(toggle);
        }
      } else {
        // Si pas de CTA, chercher le dropdown mobile
        const mobileDropdown = navbarEnd.querySelector('.dropdown-end');
        if (mobileDropdown) {
          navbarEnd.insertBefore(toggle, mobileDropdown);
        } else {
          // Sinon l'ajouter à la fin
          navbarEnd.appendChild(toggle);
        }
      }
      return true;
    }
    
    return false;
  }
  
  // ============================================
  // INITIALISATION AU CHARGEMENT DU DOM
  // ============================================
  function init() {
    // Injecter les styles
    injectThemeStyles();
    
    // Attendre que le header soit chargé
    let attempts = 0;
    const maxAttempts = 50;
    
    const checkInterval = setInterval(() => {
      attempts++;
      
      if (insertToggleButton() || attempts >= maxAttempts) {
        clearInterval(checkInterval);
        
        if (attempts >= maxAttempts) {
          console.warn('Could not find navbar to insert theme toggle');
        }
      }
    }, 100);
  }
  
  // ============================================
  // ÉCOUTER LES CHANGEMENTS SYSTÈME
  // ============================================
  if (window.matchMedia) {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    mediaQuery.addEventListener('change', (e) => {
      // Seulement si l'utilisateur n'a pas de préférence sauvegardée
      if (!localStorage.getItem(CONFIG.storageKey)) {
        setTheme(e.matches ? 'ludus-dark' : CONFIG.defaultTheme);
      }
    });
  }
  
  // ============================================
  // LANCEMENT
  // ============================================
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  
  // ============================================
  // API PUBLIQUE
  // ============================================
  window.LudusTheme = {
    set: setTheme,
    get: () => document.documentElement.getAttribute('data-theme') || CONFIG.defaultTheme,
    toggle: () => {
      const current = document.documentElement.getAttribute('data-theme') || CONFIG.defaultTheme;
      const theme = CONFIG.themes[current];
      if (theme) {
        setTheme(theme.next);
      }
    }
  };
})();
