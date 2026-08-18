import { Typography } from "antd"
import ToolCard from "../../../../components/tool/ToolCard"

const { Paragraph, Text } = Typography

export default function TimestampGuide() {
  return (
    <ToolCard className="timestamp-guide-card" bordered={false}>
      <div className="guide-heading">
        <div>
          <Text className="eyebrow">REFERENCE</Text>
          <h2>Which timestamp unit should I use?</h2>
        </div>
        <Text type="secondary">
          Unix time is always based on UTC; timezone only changes how a date is displayed or
          interpreted.
        </Text>
      </div>
      <div className="unit-guide-grid">
        <div>
          <Text strong>Seconds (s)</Text>
          <Paragraph type="secondary">
            The classic 10-digit Unix timestamp used by many APIs and command-line tools.
          </Paragraph>
        </div>
        <div>
          <Text strong>Milliseconds (ms)</Text>
          <Paragraph type="secondary">
            The native JavaScript Date unit and the most common browser/API format.
          </Paragraph>
        </div>
        <div>
          <Text strong>Microseconds / nanoseconds</Text>
          <Paragraph type="secondary">
            Useful for high-resolution telemetry. Values are normalized to JavaScript millisecond
            precision for date display.
          </Paragraph>
        </div>
      </div>
    </ToolCard>
  )
}
