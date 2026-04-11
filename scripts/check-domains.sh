#!/usr/bin/env bash
# SPDX-FileCopyrightText: 2026 SecPal Contributors
# SPDX-License-Identifier: MIT

set -euo pipefail

ROOT_DIR="$(git rev-parse --show-toplevel)"
cd "$ROOT_DIR"

matches=$(grep -RInE 'secpal\.[A-Za-z0-9.-]+' \
  --include='*.md' \
  --include='*.yaml' \
  --include='*.yml' \
  --include='*.json' \
  --include='*.sh' \
  --include='*.ts' \
  --include='*.tsx' \
  --include='*.js' \
  --include='*.mjs' \
  --include='*.css' \
  --exclude-dir='.git' \
  --exclude-dir='.next' \
  --exclude-dir='node_modules' \
  --exclude-dir='out' \
  . 2>/dev/null | grep -v 'scripts/check-domains.sh' || true)

violations=$(printf '%s\n' "$matches" | \
  grep -Ev '(^|[^A-Za-z0-9.-])secpal\.app($|[^A-Za-z0-9._-])|(^|[^A-Za-z0-9.-])www\.secpal\.app($|[^A-Za-z0-9._-])|(^|[^A-Za-z0-9.-])changelog\.secpal\.app($|[^A-Za-z0-9._-])|(^|[^A-Za-z0-9.-])apk\.secpal\.app($|[^A-Za-z0-9._-])|(^|[^A-Za-z0-9.-])([A-Za-z0-9-]+\.)*secpal\.dev($|[^A-Za-z0-9._-])|(^|[^A-Za-z0-9.-])api\.secpal\.app($|[^A-Za-z0-9._-])' | \
  grep -E 'secpal\.' || true)

if [[ -n "$violations" ]]; then
  echo 'Forbidden or unknown SecPal domains found:'
  echo "$violations"
  exit 1
fi

echo 'All domain usage matches the approved SecPal domain policy'