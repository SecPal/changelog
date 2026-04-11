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

### Changed

- refreshed `package-lock.json` with `npm audit fix --package-lock-only`, clearing the remaining transitive `npm audit` findings and aligning the lockfile package name with `secpal-changelog`
- switched Next.js build output from `standalone` to `export` — static files in `out/`, no Node.js server process required
- replaced `src/app/feed.xml/route.ts` with `scripts/generate-feed.mjs` (post-build static feed generation)
- `build` script now runs `next build --webpack && node scripts/generate-feed.mjs`
- linting now uses ESLint 9 flat config with a dedicated TypeScript check in CI and local preflight
- feed and metadata generation now default safely to `https://changelog.secpal.app` when `NEXT_PUBLIC_SITE_URL` is unset
