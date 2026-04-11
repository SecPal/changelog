<!--
SPDX-FileCopyrightText: 2026 SecPal
SPDX-License-Identifier: CC0-1.0
-->

# Changelog

All notable changes to this repository's code and configuration are documented in this file.
The public changelog of SecPal product releases lives in `src/app/page.mdx`.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- initial site setup based on Tailwind Plus Commit template (commit-ts) with SecPal branding
- REUSE/SPDX license compliance for all source files
- full SecPal governance: branch protections, Copilot instructions, CI/CD workflows, dependabot, CODEOWNERS
- `scripts/generate-feed.mjs`: post-build script that reads `out/index.html` and generates `out/feed.xml`
- local repository guardrails: `scripts/check-conflict-markers.sh`, `scripts/check-domains.sh`, and `scripts/preflight.sh`
- `scripts/generate-csp.mjs`: build-time CSP generator that derives the required `script-src` hashes from exported HTML and produces a deployable nginx snippet

### Changed

- narrowed the Tailwind Plus REUSE attribution so only genuinely Commit-template-derived changelog source files carry `LicenseRef-TailwindPlus`, while original SecPal source files now declare plain AGPL directly in their own SPDX headers
- replaced the generic changelog brand glyphs with the canonical SecPal logo in the header, reused the canonical `SecPal – A guard's best friend` tagline in the footer, kept the dark brand asset for the always-dark intro sidebar in light mode, switched the `secpal.app` link treatment to the canonical monochrome SecPal logo derived from the frontend brand assets, and added light/dark theme-aware browser icons
- refreshed `package-lock.json` with `npm audit fix --package-lock-only`, clearing the remaining transitive `npm audit` findings and aligning the lockfile package name with `secpal-changelog`
- switched Next.js build output from `standalone` to `export` — static files in `out/`, no Node.js server process required
- replaced `src/app/feed.xml/route.ts` with `scripts/generate-feed.mjs` (post-build static feed generation)
- `build` script now runs `next build --webpack && node scripts/generate-feed.mjs && node scripts/generate-csp.mjs`
- Next.js now uses a deterministic build ID derived from the tracked site inputs so CSP hash snapshots stay stable across identical builds
- linting now uses ESLint 9 flat config with a dedicated TypeScript check in CI and local preflight
- feed and metadata generation now default safely to `https://changelog.secpal.app` when `NEXT_PUBLIC_SITE_URL` is unset
- local preflight now fails when the tracked nginx CSP snippet no longer matches the current exported HTML
