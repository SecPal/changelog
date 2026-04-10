---
# SPDX-FileCopyrightText: 2026 SecPal
# SPDX-License-Identifier: AGPL-3.0-or-later
name: Next.js Changelog Rules
description: Applies Next.js and Tailwind CSS rules to source files in the changelog repo.
applyTo: "src/**/*.ts,src/**/*.tsx,next.config.mjs,postcss.config.js"
---

# Next.js Changelog Rules

- Preserve strict TypeScript and avoid `any` without a clear boundary.
- Keep client-side JavaScript minimal; the Commit template's animation layer is intentional but add no further runtime JS.
- Do not introduce server actions or database dependencies — the site is a standalone Next.js static-style app.
- Reuse existing component patterns from the Commit template before adding new abstractions.
- Run `npm run build` as the primary validation after Source changes.
