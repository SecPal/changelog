#!/usr/bin/env bash
# SPDX-FileCopyrightText: 2026 SecPal Contributors
# SPDX-License-Identifier: MIT

set -euo pipefail

ROOT_DIR="$(git rev-parse --show-toplevel)"
cd "$ROOT_DIR"

MARKERS=(
  '<<<<<<<'
  '======='
  '>>>>>>>'
  '|||||||'
)

conflicts_found=0
checked_files=0

while IFS= read -r -d '' file; do
  if ! file "$file" | grep -q 'text'; then
    continue
  fi

  checked_files=$((checked_files + 1))

  for marker in "${MARKERS[@]}"; do
    if grep -n "^${marker}" "$file" >/dev/null 2>&1; then
      if [ "$conflicts_found" -eq 0 ]; then
        echo 'Conflict markers detected:'
      fi

      conflicts_found=$((conflicts_found + 1))
      echo "File: $file"
      grep -n "^${marker}" "$file"
      break
    fi
  done
done < <(git ls-files -z)

echo "Checked files: $checked_files"

if [ "$conflicts_found" -gt 0 ]; then
  exit 1
fi

echo 'No conflict markers found'
