import { Typography } from "antd"
import ToolCard from "../../../../components/tool/ToolCard"

const { Paragraph, Text } = Typography

export default function UrlGuide() {
  return (
    <ToolCard className="url-guide-card" bordered={false}>
      <div className="url-guide-heading">
        <div>
          <Text className="eyebrow">REFERENCE</Text>
          <h2>Choose the right URL encoding strategy</h2>
        </div>
        <Text type="secondary">
          Encoding protects URL syntax from being misinterpreted; it does not encrypt data.
        </Text>
      </div>
      <div className="url-guide-grid">
        <div>
          <Text strong>Full URI</Text>
          <Paragraph type="secondary">
            Use for a complete URL when separators such as /, ?, &, and = should remain readable.
          </Paragraph>
        </div>
        <div>
          <Text strong>URI component</Text>
          <Paragraph type="secondary">
            Use for one query value, path segment, or fragment where reserved characters must be
            escaped.
          </Paragraph>
        </div>
        <div>
          <Text strong>Form value</Text>
          <Paragraph type="secondary">
            Use with form submissions and query values that follow the +-for-space convention.
          </Paragraph>
        </div>
      </div>
    </ToolCard>
  )
}
