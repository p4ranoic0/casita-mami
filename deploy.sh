#!/bin/bash
# ============================================
# Deploy La Casita de Mami → lacasitademami.edu.pe
# Uso: ./deploy.sh [--dry-run]
# Requiere: ssh alias "hostinger" configurado en ~/.ssh/config
# ============================================
set -euo pipefail

REMOTE="hostinger:~/domains/lacasitademami.edu.pe/public_html/"
PROJECT_DIR="$(cd "$(dirname "$0")" && pwd)"

DRY_RUN=""
if [[ "${1:-}" == "--dry-run" ]]; then
  DRY_RUN="--dry-run"
  echo "🧪 Dry-run mode (no se sube nada)"
fi

cd "$PROJECT_DIR"

echo "📦 Building con --base=/ ..."
npm run build -- --base=/

echo "🚀 Sincronizando a $REMOTE ..."
# --delete limpia builds anteriores. .htaccess viene del build.
# Las exclusiones preservan archivos que viven en el servidor pero no en el repo:
#   sitemap.xml/robots.txt → SEO
#   og-image.jpg, logo.webp → meta assets
#   (los íconos del favicon ahora vienen del repo, en public/)
#   fonts/           → fuentes self-hosted
rsync -avz --delete $DRY_RUN \
  --exclude='sitemap.xml' \
  --exclude='robots.txt' \
  --exclude='og-image.jpg' \
  --exclude='logo.webp' \
  --exclude='fonts/' \
  --exclude='.DS_Store' \
  --exclude='galeria/' \
  --exclude='admin/' \
  --exclude='api/' \
  dist/ "$REMOTE"

if [[ -z "$DRY_RUN" ]]; then
  echo "✅ Listo → https://lacasitademami.edu.pe"
else
  echo "✅ Dry-run terminado. Corre sin --dry-run para deployar."
fi
