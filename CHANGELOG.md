# Changelog – Refonte DaisyUI & conformité RGPD (date: 2025-08-08)

## Inventaire
- Pages HTML: 15 (a-propos.html, academie.html, components/footer.html, components/header.html, concept.html, contact.html, educateurs.html, enjeux.html, faq.html, index.html, infos-tarifs.html, kit-pedagogique.html, mentions.html, methodologie.html, politique-de-confidentialite.html)
- CSS: assets/css/kit-pedagogique.css, assets/css/styles.css
- JS: assets/js/cookie-consent.js, assets/js/i18n.js, assets/js/include.js
- Assets: assets/images/Ludus-Mentis-transparent.png, assets/images/logo_besf.png, assets/images/logo_walhain.png, assets/kit-pedagogique.pdf
- Autres: netlify.toml, robots.txt, sitemap.xml

## Intégration UI (DaisyUI via CDN)
- Ajout Tailwind CDN + DaisyUI CDN dans `<head>` de toutes les pages.
- Thème par défaut : `autumn` (chaud, naturel, sérieux).
- Conversion du header en composant **navbar DaisyUI** avec menu responsive + sélecteur FR/EN.
- Conversion du footer en composant **footer DaisyUI** avec liens légaux.
- Boutons : ajout des classes `btn` / `btn-primary` sur les liens d’action existants (sans supprimer les classes d’origine).
- Typographie : application de styles `prose` sur le contenu principal pour une meilleure lisibilité.
- Micro-interactions : transitions par défaut (issues de DaisyUI/Tailwind).

## UX & Navigation
- Ajout d’un **lien d’évitement** “Aller au contenu” pour l’accessibilité clavier.
- Amélioration des liens externes : `rel="noopener noreferrer"`.
- Ajout d’un **sélecteur de langue** (FR par défaut, EN prêt) + infrastructure i18n (`assets/js/i18n.js`, `assets/i18n/*.json`).

## Performance
- `loading="lazy"` et `decoding="async"` sur toutes les images.
- Netlify caching fort sur `/assets/*` via `netlify.toml`.
- Scripts différés lorsque pertinent (`defer`).

## Accessibilité (WCAG 2.1 AA)
- Définition `lang` sur `<html>` ; hiérarchie sémantique conservée.
- Navigation clavier facilitée (skip-link, navbar dropdown accessible DaisyUI).
- Contrastes et composants basés sur DaisyUI (thème `autumn`).

## RGPD
- Ajout d’un **bandeau de consentement** avec choix granularité (essentiels, analytics, marketing) : `assets/js/cookie-consent.js`.
- **Blocage par défaut** des scripts non essentiels (`type="text/plain" data-cookie-category="..."`). 
- Remplacement des injecteurs **Google Tag Manager** par des balises différées gérées par le consentement (pages: a-propos.html, academie.html, concept.html, contact.html, educateurs.html, enjeux.html, faq.html, index.html, infos-tarifs.html, kit-pedagogique.html, methodologie.html).
- Création / mise à jour des pages légales : `mentions.html`, `politique-de-confidentialite.html`.

## Responsive & Compatibilité
- Approche **mobile-first**; navbar responsive; composants DaisyUI adaptatifs.
- Aucune suppression de contenu clé, structure respectée.

## Fichiers ajoutés
- `assets/js/cookie-consent.js`
- `assets/js/i18n.js`
- `assets/i18n/fr.json`, `assets/i18n/en.json`
- `netlify.toml`
- `mentions.html`, `politique-de-confidentialite.html`

## Considérations
- Les styles CSS d’origine sont conservés et peuvent coexister avec DaisyUI.
- Pour personnaliser le thème (couleurs du logo Ludus Mentis), prévoir une config Tailwind dédiée si on sort du CDN.
