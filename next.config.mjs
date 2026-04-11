import crypto from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import nextMDX from '@next/mdx'

import { recmaPlugins } from './mdx/recma.mjs'
import { rehypePlugins } from './mdx/rehype.mjs'
import { remarkPlugins } from './mdx/remark.mjs'

const buildIdInputs = [
  'src',
  'mdx',
  'public',
  'mdx-components.tsx',
  'next.config.mjs',
  'package.json',
]

function collectBuildIdFiles(entryPath) {
  const stats = fs.statSync(entryPath)

  if (stats.isDirectory()) {
    return fs
      .readdirSync(entryPath)
      .flatMap((child) => collectBuildIdFiles(path.join(entryPath, child)))
      .sort()
  }

  return [entryPath]
}

function generateDeterministicBuildId() {
  const hash = crypto.createHash('sha256')

  for (const input of buildIdInputs) {
    const resolvedPath = path.join(process.cwd(), input)

    if (!fs.existsSync(resolvedPath)) {
      continue
    }

    for (const filePath of collectBuildIdFiles(resolvedPath)) {
      const relativePath = path.relative(process.cwd(), filePath)
      hash.update(relativePath)
      hash.update('\0')
      hash.update(fs.readFileSync(filePath))
      hash.update('\0')
    }
  }

  return hash.digest('hex').slice(0, 20)
}

const withMDX = nextMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins,
    rehypePlugins,
    recmaPlugins,
  },
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
  output: 'export',
  generateBuildId: async () => generateDeterministicBuildId(),
  images: {
    unoptimized: true,
  },
}

export default withMDX(nextConfig)
