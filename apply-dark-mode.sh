#!/bin/bash
# apply-dark-mode.sh
# À lancer depuis la racine du projet Ludus Mentis
# Usage : bash apply-dark-mode.sh

set -e
echo "🎨 Migration Dark Mode Ludus Mentis"
echo "===================================="

# Vérifie qu'on est bien à la racine du projet
if [ ! -f "index.html" ]; then
  echo "❌ Lancer ce script depuis la racine du projet (là où index.html se trouve)"
  exit 1
fi

# Backup
echo "📦 Backup → ./backup-before-dark-migration/"
mkdir -p backup-before-dark-migration
cp -r *.html assets/js/theme-manager.js backup-before-dark-migration/ 2>/dev/null || true
echo "   ✓ Backup créé"

# ─────────────────────────────────────────────
# 1. Copier le nouveau theme-manager.js
# ─────────────────────────────────────────────
echo ""
echo "1️⃣  Mise à jour theme-manager.js..."
# (copier le fichier livré ici)
echo "   ⚠️  Copier manuellement theme-manager.js → assets/js/theme-manager.js"

# ─────────────────────────────────────────────
# 2. Snippet anti-FOUC dans tous les HTML
# ─────────────────────────────────────────────
echo ""
echo "2️⃣  Remplacement snippet anti-FOUC dans tous les HTML..."

NEW_FOUC='<script>(function(){var t=localStorage.getItem('\''theme'\'');document.documentElement.setAttribute('\''data-theme'\'',t==='\''dark'\''||t==='\''light'\''?t:(window.matchMedia\&\&window.matchMedia('\''(prefers-color-scheme: dark)'\'').matches?'\''dark'\'':'\''light'\''));})();<\/script>'

for f in *.html; do
  # Remplace le long snippet multi-lignes par la version courte
  # On utilise perl pour le multi-ligne
  perl -i -0pe '
    s|<script>\s*\(function\(\)\{[^}]*var saved[^}]*ludus-dark[^}]*\}\)\(\);\s*</script>|<script>(function(){var t=localStorage.getItem('\''theme'\'');document.documentElement.setAttribute('\''data-theme'\'',t==='\''dark'\''||t==='\''light'\''?t:(window.matchMedia\&\&window.matchMedia('\''(prefers-color-scheme: dark)'\'').matches?'\''dark'\'':'\''light'\''));})();</script>|sg
  ' "$f"
  echo "   ✓ $f"
done

# ─────────────────────────────────────────────
# 3. Remplacements de classes HTML
# ─────────────────────────────────────────────
echo ""
echo "3️⃣  Remplacement des classes de fonds colorés..."

do_replace() {
  local file="$1"
  local old="$2"
  local new="$3"
  if grep -q "$old" "$file" 2>/dev/null; then
    sed -i "s|$old|$new|g" "$file"
    echo "   ✓ $file : $old → $new"
  fi
}

# ── infos-pratiques.html ──
do_replace "infos-pratiques.html" \
  'bg-teal-50 rounded-lg border border-teal-200' \
  'bg-success\/10 rounded-lg border border-success\/30'

do_replace "infos-pratiques.html" \
  'bg-orange-50 rounded-lg border border-orange-200' \
  'bg-warning\/10 rounded-lg border border-warning\/30'

do_replace "infos-pratiques.html" \
  'p-4 bg-purple-50 rounded-lg' \
  'p-4 bg-secondary\/10 rounded-lg'

do_replace "infos-pratiques.html" \
  'p-4 bg-teal-50 rounded-lg' \
  'p-4 bg-primary\/10 rounded-lg'

do_replace "infos-pratiques.html" \
  'p-4 bg-orange-50 rounded-lg' \
  'p-4 bg-warning\/10 rounded-lg'

# ── a-propos.html ──
do_replace "a-propos.html" \
  'card bg-blue-50 text-center' \
  'card bg-info\/10 text-center'

do_replace "a-propos.html" \
  'card bg-green-50 text-center' \
  'card bg-success\/10 text-center'

do_replace "a-propos.html" \
  'card bg-orange-50 text-center' \
  'card bg-warning\/10 text-center'

# ── recherche.html ──
do_replace "recherche.html" \
  'alert border-2 border-ludus-orange bg-orange-50' \
  'alert border-2 border-ludus-orange bg-warning\/10'

# ── notre-approche.html ──
do_replace "notre-approche.html" \
  'alert border-2 border-ludus-teal bg-teal-50 text-ludus-teal' \
  'alert border-2 border-ludus-teal bg-primary\/10'

# ── programmes.html ──
do_replace "programmes.html" \
  'alert border-2 border-ludus-teal bg-teal-50 text-ludus-teal' \
  'alert border-2 border-ludus-teal bg-primary\/10'

# ── analyse-approfondie.html ──
do_replace "analyse-approfondie.html" \
  'card bg-gradient-to-r from-purple-50 to-pink-50' \
  'card bg-base-200'

do_replace "analyse-approfondie.html" \
  'card bg-gradient-to-r from-blue-50 to-cyan-50' \
  'card bg-base-200'

do_replace "analyse-approfondie.html" \
  'card bg-gradient-to-r from-green-50 to-emerald-50' \
  'card bg-base-200'

# ── Tous les HTML : ludus-dark → dark dans les data-theme résiduels ──
echo ""
echo "4️⃣  Nettoyage références ludus-dark résiduelles..."
for f in *.html; do
  sed -i "s/data-theme=\"ludus-dark\"/data-theme=\"dark\"/g" "$f"
  sed -i "s/theme === 'ludus-dark'/theme === 'dark'/g" "$f"
  sed -i "s/'ludus-dark'/'dark'/g" "$f"
done
echo "   ✓ Fait"

# ─────────────────────────────────────────────
echo ""
echo "✅ Migration terminée !"
echo ""
echo "📋 Actions manuelles restantes :"
echo "   1. Copier theme-manager.js → assets/js/theme-manager.js"
echo "   2. Tester en dark mode sur chaque page"
echo "   3. Vérifier le localStorage (effacer 'theme' dans DevTools pour tester)"
echo ""
echo "🔍 Pour vérifier les bg-*-50 résiduels :"
echo "   grep -n 'bg-orange-50\|bg-blue-50\|bg-teal-50\|bg-green-50\|bg-purple-50' *.html"
