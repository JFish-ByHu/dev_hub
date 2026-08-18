import { downloadFile } from "../../../../utils/download"

export const MARKDOWN_EXAMPLE = `# DevHub Markdown Preview

Write **Markdown** on the left and see a safe, live preview on the right.

## What this editor supports

- GitHub Flavored Markdown tables
- Task lists and ~~strikethrough~~
- Links, blockquotes, and fenced code blocks

| Feature | Status |
| --- | --- |
| Live preview | Ready |
| GFM syntax | Ready |
| HTML sanitization | Enabled |

> Markdown is rendered locally in your browser.

\`\`\`ts
const message = "Hello, DevHub!"
console.log(message)
\`\`\`
`

export interface MarkdownStats {
  characters: number
  words: number
  lines: number
  bytes: number
}

export type MarkdownAssetMap = Record<string, string>

export const MARKDOWN_IMAGE_PREFIX = "devhub-image/"

export function getMarkdownStats(value: string): MarkdownStats {
  const trimmed = value.trim()
  return {
    characters: value.length,
    words: trimmed ? trimmed.split(/\s+/).length : 0,
    lines: value ? value.split(/\r?\n/).length : 0,
    bytes: new TextEncoder().encode(value).byteLength
  }
}

export function expandMarkdownAssets(value: string, assets: MarkdownAssetMap) {
  let expanded = value
  Object.entries(assets).forEach(([reference, dataUrl]) => {
    expanded = expanded.split(reference).join(dataUrl)
  })
  return expanded
}

export function downloadMarkdown(value: string, assets: MarkdownAssetMap = {}) {
  downloadFile(
    expandMarkdownAssets(value, assets),
    "devhub-document.md",
    "text/markdown;charset=utf-8"
  )
}
