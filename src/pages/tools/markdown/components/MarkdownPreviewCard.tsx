import { Card, Empty, Typography } from "antd"
import { defaultSchema } from "hast-util-sanitize"
import type { RefObject } from "react"
import ReactMarkdown, { defaultUrlTransform } from "react-markdown"
import rehypeSanitize from "rehype-sanitize"
import remarkGfm from "remark-gfm"
import { MARKDOWN_IMAGE_PREFIX, type MarkdownAssetMap } from "../utils/markdown"

const { Text } = Typography

const markdownSanitizeSchema = {
  ...defaultSchema,
  protocols: {
    ...defaultSchema.protocols,
    src: [...(defaultSchema.protocols?.src ?? []), "data"]
  }
}

function transformMarkdownUrl(url: string, key: string, assets: MarkdownAssetMap) {
  if (key === "src" && url.startsWith(MARKDOWN_IMAGE_PREFIX)) {
    return assets[url] ?? ""
  }
  if (key === "src" && /^data:image\/(png|jpe?g|gif|webp);base64,/i.test(url)) return url
  return defaultUrlTransform(url)
}

interface MarkdownPreviewCardProps {
  value: string
  assets: MarkdownAssetMap
  contentRef: RefObject<HTMLElement | null>
  onScroll: () => void
}

export default function MarkdownPreviewCard({
  value,
  assets,
  contentRef,
  onScroll
}: MarkdownPreviewCardProps) {
  return (
    <Card
      title="Live preview"
      extra={<Text type="secondary">GFM · Sanitized</Text>}
      className="markdown-card markdown-preview-card"
      bordered={false}
    >
      {value.trim() ? (
        <article ref={contentRef} onScroll={onScroll} className="markdown-preview-content">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[[rehypeSanitize, markdownSanitizeSchema]]}
            urlTransform={(url, key) => transformMarkdownUrl(url, key, assets)}
          >
            {value}
          </ReactMarkdown>
        </article>
      ) : (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="Start writing Markdown to see a preview."
        />
      )}
    </Card>
  )
}
