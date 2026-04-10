<!--
SPDX-FileCopyrightText: 2026 SecPal
SPDX-License-Identifier: CC0-1.0
-->

# SecPal Changelog

Public changelog for SecPal — security-focused mobile device management.

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
# Standalone output is in .next/standalone/
```

## License

- SecPal source code: [AGPL-3.0-or-later](LICENSES/AGPL-3.0-or-later.txt)
- Tailwind Plus Commit template: [LicenseRef-TailwindPlus](LICENSES/LicenseRef-TailwindPlus.txt)
- Configuration and governance files: [CC0-1.0](LICENSES/CC0-1.0.txt)

See [REUSE.toml](REUSE.toml) for the full license mapping per file.
