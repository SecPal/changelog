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

### Improved

- visual polish pass: h2 release titles enlarged to `text-2xl` with tight letter-spacing for clearer hierarchy; h2 top spacing increased to `margin.10`; list item gap tightened to `margin.3`; inter-article spacing reduced from `space-y-32` to `space-y-28` on desktop; article header bottom margin narrowed from `mb-10` to `mb-8`; `WhyItMatters` callout border opacity and left padding slightly increased for better presence

### Added

- `Label` and `Labels` components (`src/components/Label.tsx`): lightweight per-entry taxonomy badges with kinds `added | improved | fixed | changed | android | api | web | auth | security | breaking`; neutrals share one style, `security` gets an amber tint, `breaking` a red tint — registered globally in `mdx.tsx` so MDX files need no explicit import
- `WhyItMatters` component (`src/components/WhyItMatters.tsx`): optional callout line for significant entries; renders as a subtle left-border callout block with "Why it matters:" prefix — registered globally in `mdx.tsx`
- demonstrative usage of both components in `src/app/page.mdx`: scope labels on the hero entry, `WhyItMatters` closing the in-progress section
- initial site setup based on Tailwind Plus Commit template (commit-ts) with SecPal branding
- REUSE/SPDX license compliance for all source files
- full SecPal governance: branch protections, Copilot instructions, CI/CD workflows, dependabot, CODEOWNERS
- `scripts/generate-feed.mjs`: post-build script that reads `out/index.html` and generates `out/feed.xml`
- local repository guardrails: `scripts/check-conflict-markers.sh`, `scripts/check-domains.sh`, and `scripts/preflight.sh`
- `scripts/generate-csp.mjs`: build-time CSP generator that derives the required `script-src` hashes from exported HTML and produces a deployable nginx snippet

### Changed

- intro quick link in `src/components/Intro.tsx` now keeps the SecPal logo mark but points to `https://secpal.app/roadmap` with the label `Roadmap` instead of `secpal.app`
- sharpened hero entry copy in `src/app/page.mdx`: headline → "Building SecPal in public", intro split into two shorter paragraphs with "We build in the open.", list simplified to bare app identifiers, section title → "What's in progress", list items trimmed of trailing descriptors
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

### Fixed

- `mdx/rehype.mjs`: reset cached Shiki highlighter promise on initialization failure, validate `language-*` code block class names before highlighting, and guard article heading extraction when no `h2` is present
- `src/components/StarField.tsx`: replaced index-based React keys with stable coordinate-derived keys for constellation and star rendering
- `WhyItMatters` (`src/components/WhyItMatters.tsx`): replaced `<p>` wrapper with `<div>` to accept block-level children without producing invalid HTML
- `Label` (`src/components/Label.tsx`): extracted `NEUTRAL_KIND_CLASS` constant to eliminate eight identical class string repetitions
- `CHANGELOG.md`: removed blank-line artifacts within `### Added` and `### Changed` sections left by the duplicate-section merge in #28
