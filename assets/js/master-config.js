<!-- /assets/includes/head-common.html -->
<!-- Configuration centralisée pour toutes les pages -->

<!-- Meta communes -->
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<!-- Favicon -->
<link rel="icon" type="image/png" href="/assets/images/Ludus-Mentis-transparent.png">

<!-- Configuration centralisée -->
<script src="/assets/js/master-config.js"></script>

<!-- DaisyUI + Tailwind CSS -->
<link href="https://cdn.jsdelivr.net/npm/daisyui@4.12.10/dist/full.min.css" rel="stylesheet" type="text/css" />
<script src="https://cdn.tailwindcss.com"></script>

<!-- Configuration Tailwind avec couleurs Ludus Mentis -->
<script>
  tailwind.config = {
    darkMode: 'class',
    daisyui: {
      themes: [
        {
          ludus: {
            "primary": "#17a2b8",        // Teal du logo
            "primary-content": "#ffffff",
            "secondary": "#ff9800",       // Orange du logo
            "secondary-content": "#000000",
            "accent": "#ffc107",         // Jaune complémentaire
            "accent-content": "#000000",
            "neutral": "#2a323c",
            "neutral-content": "#f9fafb",
            "base-100": "#ffffff",
            "base-200": "#f3f4f6",
            "base-300": "#e5e7eb",
            "base-content": "#1f2937",
            "info": "#3b82f6",
            "success": "#10b981",
            "warning": "#f59e0b",
            "error": "#ef4444",
            
            "--rounded-box": "0.5rem",
            "--rounded-btn": "0.375rem",
            "--rounded-badge": "9999px",
            "--animation-btn": "0.25s",
            "--animation-input": "0.2s",
            "--btn-focus-scale": "0.95",
            "--border-btn": "2px",
            "--tab-border": "2px",
            "--tab-radius": "0.5rem",
          },
          ludusDark: {
            "primary": "#17a2b8",
            "primary-content": "#ffffff",
            "secondary": "#ff9800",
            "secondary-content": "#000000",
            "accent": "#ffc107",
            "accent-content": "#000000",
            "neutral": "#1f2937",
            "neutral-content": "#f9fafb",
            "base-100": "#111827",
            "base-200": "#1f2937",
            "base-300": "#374151",
            "base-content": "#f9fafb",
            "info": "#60a5fa",
            "success": "#34d399",
            "warning": "#fbbf24",
            "error": "#f87171",
          }
        }
      ]
    }
  }
</script>

<!-- Fonts Google -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet">

<!-- Styles custom minimaux -->
<style>
  :root {
    --color-primary: #17a2b8;
    --color-secondary: #ff9800;
    --color-accent: #ffc107;
  }
  
  /* Focus states WCAG AAA */
  :focus-visible {
    outline: 3px solid var(--color-primary);
    outline-offset: 2px;
  }
  
  /* Typography */
  body {
    font-family: 'Inter', system-ui, -apple-system, sans-serif;
  }
  
  h1, h2, h3, h4, h5, h6 {
    font-family: 'Space Grotesk', system-ui, sans-serif;
  }
  
  /* Utility classes */
  .text-primary-ludus { color: #17a2b8; }
  .text-secondary-ludus { color: #ff9800; }
  .bg-primary-ludus { background-color: #17a2b8; }
  .bg-secondary-ludus { background-color: #ff9800; }
  .border-primary-ludus { border-color: #17a2b8; }
  .border-secondary-ludus { border-color: #ff9800; }
</style>

<!-- Accessibility -->
<link rel="stylesheet" href="/assets/css/a11y.css" />

<!-- CMP + Consent Mode v2 -->
<script src="/assets/js/consent-default.js"></script>
<script src="/tarteaucitron.js/tarteaucitron.js" defer></script>
<script src="/assets/js/cmp-tarteaucitron-init.js" defer></script>
