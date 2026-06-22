#!/bin/bash
# ============================================
# Deploy galería → lacasitademami.edu.pe/galeria  (ruta, NO subdominio)
# Uso: ./deploy-galeria.sh [--dry-run]
# El build ya usa base=/galeria/ (vite.galeria.config.js); no requiere subdominio.
# ============================================
set -euo pipefail

REMOTE="hostinger:~/domains/lacasitademami.edu.pe/public_html/galeria/"
PROJECT_DIR="$(cd "$(dirname "$0")" && pwd)"

DRY_RUN=""
if [[ "${1:-}" == "--dry-run" ]]; then
  DRY_RUN="--dry-run"
  echo "🧪 Dry-run (no se sube nada)"
fi

cd "$PROJECT_DIR"

echo "📦 Building galería (base=/) ..."
npm run build:galeria

echo "🚀 Sincronizando a $REMOTE ..."
# --delete limpia builds viejos PERO se excluyen los DATOS subidos por el admin
# (Fase 2) para no borrarlos nunca:
#   media/         → fotos subidas
#   manifest.json  → metadatos generados por el admin
rsync -avz --delete $DRY_RUN \
  --exclude='media/' \
  --exclude='manifest.json' \
  --exclude='.DS_Store' \
  dist-galeria/ "$REMOTE"

if [[ -z "$DRY_RUN" ]]; then
  echo "✅ Listo → https://lacasitademami.edu.pe/galeria"
else
  echo "✅ Dry-run terminado."
fi
