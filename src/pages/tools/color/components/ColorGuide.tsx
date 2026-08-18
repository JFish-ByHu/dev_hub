import { Typography } from "antd"
import ToolCard from "../../../../components/tool/ToolCard"

const { Paragraph, Text } = Typography

export default function ColorGuide() {
  return (
    <ToolCard className="color-guide-card" bordered={false}>
      <div className="color-guide-heading">
        <div>
          <Text className="eyebrow">REFERENCE</Text>
          <h2>Color formats and accessibility</h2>
        </div>
        <Text type="secondary">
          Use contrast scores as a starting point, then verify the final design in context.
        </Text>
      </div>
      <div className="color-guide-grid">
        <div>
          <Text strong>HEX</Text>
          <Paragraph type="secondary">
            Compact notation such as <code>#2F27CE</code>. Eight-digit HEX values include an alpha
            channel at the end.
          </Paragraph>
        </div>
        <div>
          <Text strong>RGB and HSL</Text>
          <Paragraph type="secondary">
            RGB describes red, green, and blue channels. HSL separates hue, saturation, and
            lightness, which is useful for creating color variants.
          </Paragraph>
        </div>
        <div>
          <Text strong>WCAG thresholds</Text>
          <Paragraph type="secondary">
            AA requires 4.5:1 for normal text and 3:1 for large text. AAA raises those thresholds to
            7:1 and 4.5:1.
          </Paragraph>
        </div>
      </div>
    </ToolCard>
  )
}
