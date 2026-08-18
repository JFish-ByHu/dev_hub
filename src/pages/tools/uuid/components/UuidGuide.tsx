import { Typography } from "antd"
import ToolCard from "../../../../components/tool/ToolCard"

const { Paragraph, Text } = Typography

export default function UuidGuide() {
  return (
    <ToolCard className="uuid-guide-card" bordered={false}>
      <div className="uuid-guide-heading">
        <div>
          <Text className="eyebrow">REFERENCE</Text>
          <h2>Choose the right UUID version</h2>
        </div>
        <Text type="secondary">
          All values are created locally with the browser crypto API and are never uploaded.
        </Text>
      </div>
      <div className="uuid-guide-grid">
        <div>
          <Text strong>UUID v4 · Random</Text>
          <Paragraph type="secondary">
            The familiar random UUID. Use it for client-generated IDs, database keys, and values
            where sort order does not matter.
          </Paragraph>
        </div>
        <div>
          <Text strong>UUID v7 · Time-ordered</Text>
          <Paragraph type="secondary">
            Starts with a millisecond timestamp, so newly created IDs sort by time while retaining
            random uniqueness. It is useful for logs and database indexes.
          </Paragraph>
        </div>
        <div>
          <Text strong>Formatting options</Text>
          <Paragraph type="secondary">
            Toggle uppercase letters or remove hyphens when an API expects a compact identifier.
            Formatting changes the display only, not the UUID version.
          </Paragraph>
        </div>
      </div>
    </ToolCard>
  )
}
