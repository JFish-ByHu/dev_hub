import { Typography } from "antd"
import ToolCard from "../../../../components/tool/ToolCard"

const { Paragraph, Text } = Typography

export default function BaseConvertGuide() {
  return (
    <ToolCard className="base-convert-guide-card" bordered={false}>
      <div className="base-convert-guide-heading">
        <div>
          <Text className="eyebrow">REFERENCE</Text>
          <h2>Common number bases</h2>
        </div>
        <Text type="secondary">
          The converter uses arbitrary-precision integers, so very large values remain exact.
        </Text>
      </div>
      <div className="base-convert-guide-grid">
        <div>
          <Text strong>Binary · base 2</Text>
          <Paragraph type="secondary">
            Uses only 0 and 1. Common in bit flags, masks, and low-level protocols.
          </Paragraph>
        </div>
        <div>
          <Text strong>Octal · base 8</Text>
          <Paragraph type="secondary">
            Uses digits 0–7. Still appears in Unix permissions and legacy systems.
          </Paragraph>
        </div>
        <div>
          <Text strong>Hexadecimal · base 16</Text>
          <Paragraph type="secondary">
            Uses 0–9 and A–F. Compact and common for colors, memory addresses, and bytes.
          </Paragraph>
        </div>
      </div>
    </ToolCard>
  )
}
