import { Typography } from "antd"
import ToolCard from "../../../../components/tool/ToolCard"

const { Paragraph, Text } = Typography

export default function Base64Guide() {
  return (
    <ToolCard className="base64-guide-card" bordered={false}>
      <div className="guide-heading">
        <div>
          <Text className="eyebrow">REFERENCE</Text>
          <h2>Standard Base64 vs Base64URL</h2>
        </div>
        <Text type="secondary">
          Base64 is an encoding format, not encryption. Do not use it to protect secrets.
        </Text>
      </div>
      <div className="base64-guide-grid">
        <div>
          <Text strong>Standard Base64</Text>
          <Paragraph type="secondary">
            Uses + and / and usually ends with one or two = padding characters. Common in email,
            JSON, and API payloads.
          </Paragraph>
        </div>
        <div>
          <Text strong>Base64URL</Text>
          <Paragraph type="secondary">
            Replaces + with - and / with _. It is safe to place in URLs, cookies, and JWT segments.
          </Paragraph>
        </div>
        <div>
          <Text strong>Text and binary data</Text>
          <Paragraph type="secondary">
            UTF-8 text is shown directly. Arbitrary binary results are preserved and can be
            downloaded as a file.
          </Paragraph>
        </div>
      </div>
    </ToolCard>
  )
}
