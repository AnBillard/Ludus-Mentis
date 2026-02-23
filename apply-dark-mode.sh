#!/bin/bash
# apply-dark-mode.sh — VERSION FINALE
# Usage : bash apply-dark-mode.sh depuis la racine du projet

set -e
echo "🎨 Migration Dark Mode Ludus Mentis"
echo "===================================="

if [ ! -f "index.html" ]; then
  echo "❌ Lancer depuis la racine du projet"
  exit 1
fi

echo "📦 Backup..."
mkdir -p backup-before-dark-migration/assets/js
cp *.html backup-before-dark-migration/ 2>/dev/null || true
cp assets/js/theme-manager.js backup-before-dark-migration/assets/js/ 2>/dev/null || true
echo "   ✓ Backup créé"

# ── 1. Anti-FOUC + nettoyage ludus-dark ──────────────────────────────────────
echo ""
echo "2️⃣  Remplacement anti-FOUC et nettoyage ludus-dark..."

python3 - << 'EOF'
import glob, re

NEW_FOUC = (
    "<script>"
    "(function(){"
    "var t=localStorage.getItem('theme');"
    "document.documentElement.setAttribute('data-theme',"
    "t==='dark'||t==='light'?t:"
    "(window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'));"
    "})();"
    "</script>"
)

PATTERN = re.compile(
    r'<script>\s*\(function\(\)\{.*?localStorage.*?theme.*?\}\)\(\);\s*</script>',
    re.DOTALL
)

cleanups = [
    ("'ludus-dark'", "'dark'"),
    ('"ludus-dark"', '"dark"'),
    ("document.documentElement.classList.add('dark');", ""),
]

for path in sorted(glob.glob('*.html')):
    text = open(path, encoding='utf-8').read()
    orig = text
    text, n = PATTERN.subn(NEW_FOUC, text)
    for old, new in cleanups:
        text = text.replace(old, new)
    if text != orig:
        open(path, 'w', encoding='utf-8').write(text)
        print(f"   ✓ {path} ({n} snippet remplacé)")
    else:
        print(f"   - {path}")
EOF

# ── 2. Classes de fonds colorés ───────────────────────────────────────────────
echo ""
echo "3️⃣  Remplacement des classes de fonds colorés..."

python3 - << 'EOF'
import glob

replacements = [
    ('bg-teal-50 rounded-lg border border-teal-200',   'bg-success/10 rounded-lg border border-success/30'),
    ('bg-orange-50 rounded-lg border border-orange-200','bg-warning/10 rounded-lg border border-warning/30'),
    ('bg-blue-50 rounded-lg border border-blue-200',   'bg-info/10 rounded-lg border border-info/30'),
    ('p-4 bg-purple-50 rounded-lg',                    'p-4 bg-secondary/10 rounded-lg'),
    ('p-4 bg-teal-50 rounded-lg',                      'p-4 bg-primary/10 rounded-lg'),
    ('p-4 bg-orange-50 rounded-lg',                    'p-4 bg-warning/10 rounded-lg'),
    ('card bg-blue-50 text-center',                    'card bg-info/10 text-center'),
    ('card bg-green-50 text-center',                   'card bg-success/10 text-center'),
    ('card bg-orange-50 text-center',                  'card bg-warning/10 text-center'),
    ('alert border-2 border-ludus-orange bg-orange-50','alert border-2 border-ludus-orange bg-warning/10'),
    ('alert border-2 border-ludus-teal bg-teal-50 text-ludus-teal', 'alert border-2 border-ludus-teal bg-primary/10'),
    ('card bg-gradient-to-r from-purple-50 to-pink-50','card bg-base-200'),
    ('card bg-gradient-to-r from-blue-50 to-cyan-50',  'card bg-base-200'),
    ('card bg-gradient-to-r from-green-50 to-emerald-50','card bg-base-200'),
]

for path in sorted(glob.glob('*.html')):
    text = open(path, encoding='utf-8').read()
    orig = text
    for old, new in replacements:
        text = text.replace(old, new)
    if text != orig:
        open(path, 'w', encoding='utf-8').write(text)
        print(f"   ✓ {path}")
    else:
        print(f"   - {path}")
EOF

# ── Rapport ───────────────────────────────────────────────────────────────────
echo ""
echo "🔍 Résidus bg-*-50 éventuels :"
grep -rn "bg-orange-50\|bg-blue-50\|bg-teal-50\|bg-green-50\|bg-purple-50" *.html 2>/dev/null || echo "   ✓ Aucun"

echo ""
echo "🔍 Résidus ludus-dark :"
grep -rn "ludus-dark" *.html 2>/dev/null || echo "   ✓ Aucun"

echo ""
echo "✅ Terminé !"
echo ""
echo "📋 Action manuelle :"
echo "   → Glisser theme-manager.js dans assets/js/"
echo ""
echo "🚀 Puis :"
echo "   git add ."
echo '   git commit -m "Dark mode : migration vers DaisyUI natif"'
echo "   git push"
