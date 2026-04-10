// SPDX-FileCopyrightText: 2026 SecPal
// SPDX-FileCopyrightText: Tailwind Labs Inc.
// SPDX-License-Identifier: AGPL-3.0-or-later AND LicenseRef-TailwindPlus
import assert from 'assert'
import * as fs from 'fs'
import * as path from 'path'
import * as cheerio from 'cheerio'
import { Feed } from 'feed'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL

if (!siteUrl) {
    console.error('Error: NEXT_PUBLIC_SITE_URL environment variable is not set.')
    process.exit(1)
}

const outDir = path.join(process.cwd(), 'out')
const indexHtml = path.join(outDir, 'index.html')

if (!fs.existsSync(indexHtml)) {
    console.error(`Error: ${indexHtml} not found. Run 'next build' first.`)
    process.exit(1)
}

const html = fs.readFileSync(indexHtml, 'utf-8')
const $ = cheerio.load(html)

const author = {
    name: 'SecPal',
    email: 'team@secpal.app',
}

const feed = new Feed({
    title: 'SecPal Changelog',
    description:
        'Stay up to date with every new feature, improvement, and Android release from SecPal.',
    author,
    id: siteUrl,
    link: siteUrl,
    image: `${siteUrl}/favicon.ico`,
    favicon: `${siteUrl}/favicon.ico`,
    copyright: `Copyright ${new Date().getFullYear()} SecPal`,
    feedLinks: {
        rss2: `${siteUrl}/feed.xml`,
    },
})

let entryCount = 0

$('article').each(function () {
    const id = $(this).attr('id')
    assert(typeof id === 'string', 'Article missing id attribute')

    const url = `${siteUrl}/#${id}`
    const heading = $(this).find('h2').first()
    const title = heading.text()
    const date = $(this).find('time').first().attr('datetime')

    heading.remove()
    $(this).find('h3 svg').remove()

    const content = $(this).find('[data-mdx-content]').first().html()

    assert(typeof title === 'string', 'Article missing title')
    assert(typeof date === 'string', 'Article missing date')
    assert(typeof content === 'string', 'Article missing content')

    feed.addItem({
        title,
        id: url,
        link: url,
        content,
        author: [author],
        contributor: [author],
        date: new Date(date),
    })

    entryCount++
})

fs.writeFileSync(path.join(outDir, 'feed.xml'), feed.rss2())
console.log(`feed.xml generated with ${entryCount} entries → out/feed.xml`)
