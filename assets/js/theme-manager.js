// /assets/js/theme-manager.js
// Gestion centralisée du dark mode pour Ludus Mentis
// Un seul fichier à maintenir pour tout le site

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
  // (Doit être exécuté le plus tôt possible)
  // ============================================
  function getInitialTheme() {
    // 1. Priorité : préférence sauvegardée de l'utilisateur
    const saved = localStorage.getItem(CONFIG.storageKey);
    if (saved && CONFIG.themes[saved]) {
      return saved;
    }
    
    // 2. Sinon : détecter la préférence système/device
    // Gère tous les cas : per-device, système, etc.
    try {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      // matches sera true si :
      // - Le système est en dark mode
      // - Le browser est en "per device" ET le device est en dark
      // - Le browser force le dark mode
      if (mediaQuery.matches) {
        return 'ludus-dark';
      }
    } catch (e) {
      // Fallback si matchMedia n'est pas supporté
      console.warn('matchMedia not supported:', e);
    }
    
    // 3. Fallback : thème par défaut
    return CONFIG.defaultTheme;
  }
  
  // ============================================
  // APPLICATION ULTRA-RAPIDE DU THÈME
  // Pour éviter le flash white->dark
  // ============================================
  (function applyInitialTheme() {
    // Cette partie s'exécute IMMÉDIATEMENT, pas d'attente
    const theme = getInitialTheme();
    document.documentElement.setAttribute('data-theme', theme);
    
    // Aussi définir une classe pour Tailwind si nécessaire
    if (theme === 'ludus-dark') {
      document.documentElement.classList.add('dark');
    }
  })();
  
  // ============================================
  // INJECTION DU CSS POUR LUDUS-DARK
  // ============================================
  function injectThemeStyles() {
    // Vérifier si les styles sont déjà injectés
    if (document.getElementById('ludus-theme-styles')) return;
    
    const styleSheet = document.createElement('style');
    styleSheet.id = 'ludus-theme-styles';
    styleSheet.textContent = `
      /* ====================================
         THÈME SOMBRE PERSONNALISÉ : ludus-dark
         Généré automatiquement par theme-manager.js
      ==================================== */
      [data-theme="ludus-dark"] {
        color-scheme: dark;
        
        /* Couleurs principales adaptées pour le dark */
        --p: 189 70% 60%;
        --pf: 189 70% 50%;
        --pc: 214 20% 10%;
        
        --s: 35 100% 65%;
        --sf: 35 100% 55%;
        --sc: 0 0% 10%;
        
        --a: 262 60% 70%;
        --af: 262 60% 60%;
        --ac: 0 0% 10%;
        
        /* Backgrounds sombres mais pas noirs purs */
        --b1: 220 13% 18%;  /* #262a33 - Plus clair que avant */
        --b2: 220 13% 15%;  /* #1f2329 */
        --b3: 220 13% 12%;  /* #191c21 */
        --bc: 210 20% 90%;  /* Texte de base clair */
        
        --n: 214 20% 70%;
        --nf: 214 20% 75%;
        --nc: 214 20% 10%;
      }
      
      /* ====================================
         FIXES CRITIQUES POUR LA LISIBILITÉ
      ==================================== */
      
      /* Couleur de texte par défaut PARTOUT en dark mode */
      [data-theme="ludus-dark"],
      [data-theme="ludus-dark"] body,
      [data-theme="ludus-dark"] main {
        color: #f3f4f6; /* Gris très clair par défaut */
        background-color: #1a1d23; /* Fond moins noir */
      }
      
      /* Tous les textes sans classe spécifique */
      [data-theme="ludus-dark"] p,
      [data-theme="ludus-dark"] span:not([class*="text-"]):not([class*="badge"]),
      [data-theme="ludus-dark"] li,
      [data-theme="ludus-dark"] div:not([class*="bg-"]) {
        color: #e5e7eb; /* Gris clair */
      }
      
      /* Headers très visibles */
      [data-theme="ludus-dark"] h1,
      [data-theme="ludus-dark"] h2,
      [data-theme="ludus-dark"] h3,
      [data-theme="ludus-dark"] h4,
      [data-theme="ludus-dark"] h5,
      [data-theme="ludus-dark"] h6 {
        color: #f9fafb !important; /* Presque blanc */
      }
      
      /* Classes de texte gris - PLUS CLAIRES */
      [data-theme="ludus-dark"] .text-gray-800 {
        color: #f3f4f6 !important; /* Très clair au lieu de sombre */
      }
      
      [data-theme="ludus-dark"] .text-gray-700 {
        color: #e5e7eb !important; /* Clair */
      }
      
      [data-theme="ludus-dark"] .text-gray-600 {
        color: #d1d5db !important; /* Assez clair */
      }
      
      [data-theme="ludus-dark"] .text-gray-500 {
        color: #9ca3af !important; /* Gris moyen mais lisible */
      }
      
      /* Gradient adapté pour le dark mode */
      [data-theme="ludus-dark"] .gradient-ludus {
        background: linear-gradient(135deg, #2dd4bf 0%, #fb923c 100%);
      }
      
      /* Cards avec meilleur contraste */
      [data-theme="ludus-dark"] .card {
        background: #242832; /* Fond légèrement plus clair que le body */
        border: 1px solid rgba(255, 255, 255, 0.1);
        color: #e5e7eb;
      }
      
      /* Cards avec gradients - les rendre plus sombres */
      [data-theme="ludus-dark"] .bg-gradient-to-br[class*="from-"][class*="to-"] {
        background: #242832 !important; /* Override les gradients */
        border: 1px solid rgba(255, 255, 255, 0.1);
      }
      
      /* Textes dans les cards */
      [data-theme="ludus-dark"] .card-body,
      [data-theme="ludus-dark"] .card-body p,
      [data-theme="ludus-dark"] .card-body span,
      [data-theme="ludus-dark"] .card-body li {
        color: #e5e7eb !important;
      }
      
      /* Card titles encore plus visibles */
      [data-theme="ludus-dark"] .card-title {
        color: #f9fafb !important;
      }
      
      /* Couleurs spécifiques PLUS LUMINEUSES */
      [data-theme="ludus-dark"] .text-ludus-teal {
        color: #5eead4 !important; /* Teal très clair */
      }
      
      [data-theme="ludus-dark"] .text-ludus-orange {
        color: #fed7aa !important; /* Orange très clair */
      }
      
      [data-theme="ludus-dark"] .text-ludus-purple {
        color: #d8b4fe !important; /* Purple très clair */
      }
      
      /* Flèches et indicateurs colorés - garder vifs */
      [data-theme="ludus-dark"] .text-green-500 {
        color: #10b981 !important; /* Vert vif */
      }
      
      [data-theme="ludus-dark"] .text-red-500 {
        color: #ef4444 !important; /* Rouge vif */
      }
      
      [data-theme="ludus-dark"] .text-blue-500 {
        color: #3b82f6 !important; /* Bleu vif */
      }
      
      [data-theme="ludus-dark"] .text-orange-500 {
        color: #f97316 !important; /* Orange vif */
      }
      
      /* Navbar en dark mode */
      [data-theme="ludus-dark"] .navbar {
        background: rgba(26, 32, 44, 0.95);
        backdrop-filter: blur(10px);
      }
      
      /* FIX: Liens de navigation en dark mode */
      [data-theme="ludus-dark"] .navbar a,
      [data-theme="ludus-dark"] .menu a {
        color: #e5e7eb;
      }
      
      [data-theme="ludus-dark"] .navbar a:hover,
      [data-theme="ludus-dark"] .menu a:hover {
        color: #4dd0e1; /* Teal clair au hover */
      }
      
      /* FIX: Couleurs spécifiques qui doivent rester visibles */
      [data-theme="ludus-dark"] .text-ludus-teal {
        color: #4dd0e1 !important; /* Version plus claire du teal */
      }
      
      [data-theme="ludus-dark"] .text-ludus-orange {
        color: #ffb74d !important; /* Version plus claire de l'orange */
      }
      
      [data-theme="ludus-dark"] .text-ludus-purple {
        color: #b794f4 !important; /* Version plus claire du purple */
      }
      
      /* Style du toggle button */
      #${CONFIG.toggleButtonId} {
        margin: 0 0.5rem;
        transition: all 0.3s ease;
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
        gap: 0.5rem;
      }
      
      /* ====================================
         FIXES SUPPLÉMENTAIRES POUR DARK MODE
      ==================================== */
      
      /* Texte par défaut pour tout le body en dark */
      [data-theme="ludus-dark"] body {
        color: #e5e7eb;
      }
      
      /* Forcer la couleur sur les éléments sans classe spécifique */
      [data-theme="ludus-dark"] main p:not([class*="text-"]),
      [data-theme="ludus-dark"] main span:not([class*="text-"]):not([class*="badge"]),
      [data-theme="ludus-dark"] main li:not([class*="text-"]),
      [data-theme="ludus-dark"] main div:not([class*="text-"]) {
        color: inherit;
      }
      
      /* Tables en dark mode */
      [data-theme="ludus-dark"] table {
        color: #e5e7eb;
      }
      
      [data-theme="ludus-dark"] th {
        color: #f3f4f6;
      }
      
      /* Alerts avec meilleur contraste */
      [data-theme="ludus-dark"] .alert {
        filter: brightness(1.2);
      }
      
      /* Badges avec meilleur contraste */
      [data-theme="ludus-dark"] .badge {
        filter: brightness(1.1);
      }
      
      /* Boutons outline en dark mode */
      [data-theme="ludus-dark"] .btn-outline {
        border-color: rgba(255, 255, 255, 0.3);
        color: #e5e7eb;
      }
      
      [data-theme="ludus-dark"] .btn-outline:hover {
        background: rgba(255, 255, 255, 0.1);
        border-color: rgba(255, 255, 255, 0.5);
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
    
    // Déclencher un événement custom pour d'autres scripts
    window.dispatchEvent(new CustomEvent('themeChanged', { 
      detail: { theme: themeName } 
    }));
  }
  
  // ============================================
  // CRÉATION DU BOUTON TOGGLE
  // ============================================
  function createThemeToggle() {
    // Vérifier si le bouton existe déjà
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
    
    // Stratégie 1: Chercher dans la navbar
    const navbarEnd = document.querySelector('.navbar-end');
    if (navbarEnd) {
      // Chercher le bouton CTA desktop
      const ctaDesktop = navbarEnd.querySelector('a[href="/contact.html"].hidden.lg\\:flex');
      
      if (ctaDesktop) {
        // Insérer juste avant le CTA
        navbarEnd.insertBefore(toggle, ctaDesktop);
      } else {
        // Sinon, l'insérer au début de navbar-end
        const firstChild = navbarEnd.firstChild;
        if (firstChild) {
          navbarEnd.insertBefore(toggle, firstChild);
        } else {
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
    
    // Attendre que le header soit chargé (car il est injecté dynamiquement)
    let attempts = 0;
    const maxAttempts = 50; // 5 secondes max
    
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
    // DOM déjà chargé
    init();
  }
  
  // ============================================
  // API PUBLIQUE (optionnelle)
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
