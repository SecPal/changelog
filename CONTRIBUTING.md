<!--
SPDX-FileCopyrightText: 2026 SecPal
SPDX-License-Identifier: CC0-1.0
-->

# Contributing to SecPal Changelog

We welcome contributions to the SecPal Changelog site. Please read the [Code of Conduct](CODE_OF_CONDUCT.md) before contributing.

## Repository Scope

This repository contains the source code for `changelog.secpal.app` — a public changelog for SecPal product releases. The primary content lives in `src/app/page.mdx`.

## Adding a Release Entry

Open `src/app/page.mdx` and prepend a new entry at the top (after the MDX imports, before the first `---`). Follow the existing format.

## Development Workflow

1. Start from a clean, up-to-date `main` branch.
2. Create a topic branch for your change.
3. Run `npm run build` to verify your change builds cleanly.
4. Open a draft PR with a clear description.
5. Mark it ready only after a clean self-review.

## Code Quality

Run these before pushing:

```bash
npm run format:check
npm run lint
npm run build
```

## License

By contributing, you agree that your contributions will be licensed under the same terms as the file you contribute to. See [REUSE.toml](REUSE.toml) for the license mapping.
