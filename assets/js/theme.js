// assets/js/theme.js
// Gestion centralisée du thème dark/light
(function() {
  'use strict';
  
  // Configuration
  const THEME_KEY = 'ludus-mentis-theme';
  const THEMES = {
    LIGHT: 'light',
    DARK: 'dark',
    AUTO: 'auto'
  };
  
  // Détection du thème système
  function getSystemTheme() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches 
      ? THEMES.DARK 
      : THEMES.LIGHT;
  }
  
  // Récupération du thème sauvegardé
  function getSavedTheme() {
    try {
      return localStorage.getItem(THEME_KEY) || THEMES.AUTO;
    } catch (e) {
      console.warn('localStorage not available:', e);
      return THEMES.AUTO;
    }
  }
  
  // Sauvegarde du thème
  function saveTheme(theme) {
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch (e) {
      console.warn('Could not save theme preference:', e);
    }
  }
  
  // Application du thème
  function applyTheme(theme) {
    const effectiveTheme = theme === THEMES.AUTO ? getSystemTheme() : theme;
    
    // Mise à jour des attributs
    document.documentElement.setAttribute('data-theme', effectiveTheme);
    
    if (effectiveTheme === THEMES.DARK) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Mise à jour des icônes si elles existent
    updateThemeIcons(effectiveTheme);
    
    // Dispatch event pour les composants qui en ont besoin
    window.dispatchEvent(new CustomEvent('theme-changed', { detail: { theme: effectiveTheme } }));
  }
  
  // Mise à jour des icônes du toggle
  function updateThemeIcons(theme) {
    const sunIcon = document.getElementById('sun-icon');
    const moonIcon = document.getElementById('moon-icon');
    
    if (sunIcon && moonIcon) {
      if (theme === THEMES.DARK) {
        sunIcon.classList.add('hidden');
        moonIcon.classList.remove('hidden');
      } else {
        sunIcon.classList.remove('hidden');
        moonIcon.classList.add('hidden');
      }
    }
  }
  
  // Toggle du thème
  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK;
    
    saveTheme(newTheme);
    applyTheme(newTheme);
    
    // Annonce pour l'accessibilité
    announceThemeChange(newTheme);
  }
  
  // Annonce du changement pour les lecteurs d'écran
  function announceThemeChange(theme) {
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.className = 'sr-only';
    announcement.textContent = `Thème changé en mode ${theme === THEMES.DARK ? 'sombre' : 'clair'}`;
    
    document.body.appendChild(announcement);
    setTimeout(() => {
      if (announcement.parentNode) {
        announcement.parentNode.removeChild(announcement);
      }
    }, 1000);
  }
  
  // Setup des event listeners
  function setupEventListeners() {
    // Toggle button
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', toggleTheme);
      
      // Keyboard support
      themeToggle.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleTheme();
        }
      });
    }
    
    // System theme change listener
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', function(e) {
        const savedTheme = getSavedTheme();
        if (savedTheme === THEMES.AUTO) {
          applyTheme(THEMES.AUTO);
        }
      });
    }
  }
  
  // Initialisation
  function init() {
    // Application immédiate du thème pour éviter le flash
    const savedTheme = getSavedTheme();
    applyTheme(savedTheme === THEMES.AUTO ? getSystemTheme() : savedTheme);
    
    // Setup après le chargement du DOM
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', setupEventListeners);
    } else {
      setupEventListeners();
    }
  }
  
  // Export des fonctions publiques
  window.LudusTheme = {
    toggle: toggleTheme,
    set: function(theme) {
      if (Object.values(THEMES).includes(theme)) {
        saveTheme(theme);
        applyTheme(theme);
      }
    },
    get: function() {
      return document.documentElement.getAttribute('data-theme');
    },
    reset: function() {
      saveTheme(THEMES.AUTO);
      applyTheme(THEMES.AUTO);
    }
  };
  
  // Initialisation immédiate
  init();
})();
