import { toString } from 'mdast-util-to-string'
import { mdxAnnotations } from 'mdx-annotations'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeSlug from 'rehype-slug'
import rehypeUnwrapImages from 'rehype-unwrap-images'
import { remarkRehypeWrap } from 'remark-rehype-wrap'
import * as shiki from 'shiki'
import { visit } from 'unist-util-visit'

let highlighterPromise

function unwrapCodeBlock(html) {
  return html
    .replace(/^<pre[^>]*><code[^>]*>/, '')
    .replace(/<\/code><\/pre>$/, '')
}

async function highlightCode(code, language) {
  if (typeof shiki.codeToHtml === 'function') {
    return unwrapCodeBlock(
      await shiki.codeToHtml(code, {
        lang: language,
        theme: 'css-variables',
      }),
    )
  }

  highlighterPromise ??= shiki.getHighlighter({ theme: 'css-variables' })

  let highlighter = await highlighterPromise
  let tokens = highlighter.codeToThemedTokens(code, language)

  return shiki.renderToHtml(tokens, {
    elements: {
      pre: ({ children }) => children,
      code: ({ children }) => children,
      line: ({ children }) => `<span>${children}</span>`,
    },
  })
}

function rehypeShiki() {
  return async (tree) => {
    let highlightedNodes = []

    visit(tree, 'element', (node, _nodeIndex, parentNode) => {
      if (node.tagName === 'code' && parentNode?.tagName === 'pre') {
        let language = node.properties.className?.[0]?.replace(/^language-/, '')
        let code = node.children[0]?.value

        if (!language || typeof code !== 'string') {
          return
        }

        node.children = []
        highlightedNodes.push({
          code,
          language,
          node,
        })
      }
    })

    await Promise.all(
      highlightedNodes.map(async ({ code, language, node }) => {
        node.properties.highlightedCode = await highlightCode(code, language)
      }),
    )
  }
}

export const rehypePlugins = [
  mdxAnnotations.rehype,
  rehypeSlug,
  rehypeUnwrapImages,
  [rehypeAutolinkHeadings, { behavior: 'wrap', test: ['h2'] }],
  rehypeShiki,
  [
    remarkRehypeWrap,
    {
      node: { type: 'element', tagName: 'article' },
      start: 'element[tagName=hr]',
      transform: (article) => {
        article.children.splice(0, 1)
        let heading = article.children.find((n) => n.tagName === 'h2')
        article.properties = { ...heading.properties, title: toString(heading) }
        heading.properties = {}
        return article
      },
    },
  ],
]
