import { Card, Typography } from "antd"

const { Paragraph, Text } = Typography

export default function MarkdownGuide() {
  return (
    <Card className="markdown-guide-card" bordered={false}>
      <div className="markdown-guide-heading">
        <div>
          <Text className="eyebrow">REFERENCE</Text>
          <h2>Markdown essentials</h2>
        </div>
        <Text type="secondary">
          The preview supports GitHub Flavored Markdown and sanitizes rendered HTML locally.
        </Text>
      </div>
      <div className="markdown-guide-grid">
        <div>
          <Text strong>Headings and emphasis</Text>
          <Paragraph type="secondary">
            Use <code># Heading</code>, <code>**bold**</code>, and <code>*italic*</code> to
            structure and emphasize content.
          </Paragraph>
        </div>
        <div>
          <Text strong>Lists and tables</Text>
          <Paragraph type="secondary">
            GFM adds task lists, tables, strikethrough, and automatic links without extra syntax
            configuration.
          </Paragraph>
        </div>
        <div>
          <Text strong>Safe preview</Text>
          <Paragraph type="secondary">
            Raw HTML is sanitized before rendering. Avoid treating the preview as a full HTML editor
            when you need custom embedded markup.
          </Paragraph>
        </div>
      </div>
    </Card>
  )
}
