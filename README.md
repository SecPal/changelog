<!--
SPDX-FileCopyrightText: 2026 SecPal
SPDX-License-Identifier: CC0-1.0
-->

# SecPal Changelog

Public changelog for SecPal — operations software for German private security services.

Live at [changelog.secpal.app](https://changelog.secpal.app).

## Stack

- [Next.js](https://nextjs.org/) 16 (standalone output)
- [Tailwind CSS](https://tailwindcss.com/) v4
- [MDX](https://mdxjs.com/) — single `src/app/page.mdx` file drives all entries
- Based on the [Tailwind Plus Commit](https://tailwindcss.com/plus/templates/commit) template

## Adding a changelog entry

Open `src/app/page.mdx` and add a new entry at the **top** of the file (after the imports and before the first `---`):

```mdx
---

## Your Update Title {{ date: '2026-MM-DDTHH:MMZ' }}

Description of the update.

### <SparkleIcon /> Improvements

- Item one
- Item two
```

## Local development

```bash
cp .env.example .env.local
npm install
npm run dev
```

The site is available at <http://localhost:3000>.

## Building for production

```bash
npm run build
# Static output is in out/
# feed.xml is generated automatically as part of the build
# CSP snippet is generated at out/nginx/changelog-csp.conf
```

To override the canonical site URL for preview or staging builds:

```bash
NEXT_PUBLIC_SITE_URL=https://preview.secpal.dev npm run build
```

## Deployment

nginx serves `out/` as static files — no Node.js server process is needed.
Run `npm run build` and, if the exported HTML changed, update the tracked nginx snippet with `npm run csp:update` before deploying.
Deploy `nginx/changelog-csp.conf` into the live vhost in place of the inline `set $secpal_csp ...` definition, then reload nginx.

## Local validation

```bash
npm run preflight
```

## License

- Original SecPal source code: [AGPL-3.0-or-later](LICENSES/AGPL-3.0-or-later.txt)
- Files adapted from the Tailwind Plus Commit template: [AGPL-3.0-or-later](LICENSES/AGPL-3.0-or-later.txt) and [LicenseRef-TailwindPlus](LICENSES/LicenseRef-TailwindPlus.txt)
- Mona Sans webfont asset: [OFL-1.1](LICENSES/OFL-1.1.txt)
- Configuration and governance files: [CC0-1.0](LICENSES/CC0-1.0.txt)

See [REUSE.toml](REUSE.toml) for the full license mapping per file.
