#!/bin/bash
# Deploy del admin/api PHP → lacasitademami.edu.pe  (no borra datos)
set -euo pipefail
PROJECT_DIR="$(cd "$(dirname "$0")" && pwd)"; cd "$PROJECT_DIR"
H="hostinger:~/domains/lacasitademami.edu.pe"
DRY="${1:-}"; [[ "$DRY" == "--dry-run" ]] && DRY="--dry-run" || DRY=""
echo "🚀 admin/ + api/ → public_html ..."
rsync -avz $DRY --delete server/public/admin/  "$H/public_html/admin/"
rsync -avz $DRY --delete server/public/api/    "$H/public_html/api/"
echo "🔒 lib/ + schema + seed → private/ (config.php NO se toca) ..."
rsync -avz $DRY server/private/lib/   "$H/private/lib/"
rsync -avz $DRY server/private/schema.sql server/private/seed.php "$H/private/"
echo "✅ Deploy admin listo."
