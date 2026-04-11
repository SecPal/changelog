#!/usr/bin/env bash
# SPDX-FileCopyrightText: 2026 SecPal Contributors
# SPDX-License-Identifier: MIT

set -euo pipefail

ROOT_DIR="$(git rev-parse --show-toplevel)"
cd "$ROOT_DIR"

current_branch=$(git symbolic-ref --short HEAD 2>/dev/null || echo 'detached')
for protected_branch in main master production; do
  if [ "$current_branch" = "$protected_branch" ]; then
    echo "Direct work on protected branch '$protected_branch' is blocked. Use a topic branch."
    exit 1
  fi
done

echo 'Running format checks...'
npx --yes prettier --check --cache '**/*.{md,yml,yaml,json,ts,tsx,js,jsx,mjs}'

if command -v reuse >/dev/null 2>&1; then
  echo 'Running REUSE validation...'
  reuse lint
fi

echo 'Running domain policy check...'
bash scripts/check-domains.sh

echo 'Running conflict marker check...'
bash scripts/check-conflict-markers.sh

echo 'Installing dependencies...'
npm ci --silent

echo 'Running TypeScript check...'
npm run check

echo 'Running ESLint...'
npm run lint

echo 'Running production build...'
npm run build

echo 'All preflight checks passed'
