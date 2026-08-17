import { Card, Typography } from "antd"

const { Paragraph, Text } = Typography

export default function RegexGuide() {
  return (
    <Card className="regex-guide-card" bordered={false}>
      <div className="regex-guide-heading">
        <div>
          <Text className="eyebrow">REFERENCE</Text>
          <h2>JavaScript regular expression notes</h2>
        </div>
        <Text type="secondary">
          This tester uses the native JavaScript RegExp engine in your browser.
        </Text>
      </div>
      <div className="regex-guide-grid">
        <div>
          <Text strong>Character classes</Text>
          <Paragraph type="secondary">
            Use <code>\d</code> for digits, <code>\w</code> for word characters, <code>\s</code> for
            whitespace, and brackets such as <code>[a-z]</code> for a custom range.
          </Paragraph>
        </div>
        <div>
          <Text strong>Groups and captures</Text>
          <Paragraph type="secondary">
            Parentheses capture values as <code>$1</code>, while <code>(?&lt;name&gt;...)</code>{" "}
            creates a named group that appears in the match details.
          </Paragraph>
        </div>
        <div>
          <Text strong>Performance and safety</Text>
          <Paragraph type="secondary">
            Avoid nested repeating groups such as <code>(a+)+</code> on untrusted text. This page
            runs locally, but catastrophic backtracking can still freeze a browser tab.
          </Paragraph>
        </div>
      </div>
    </Card>
  )
}
