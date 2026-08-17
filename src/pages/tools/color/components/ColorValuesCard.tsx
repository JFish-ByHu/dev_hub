import { Card, Divider, Tag, Typography } from "antd"
import CopyButton from "../../../../components/CopyButton"
import { formatHex, formatHsl, formatRgb, type RgbaColor } from "../utils/color"

const { Text } = Typography

interface ColorValuesCardProps {
  label: string
  color: RgbaColor | null
  input: string
}

export default function ColorValuesCard({ label, color, input }: ColorValuesCardProps) {
  const values = color
    ? [
        { label: "HEX", value: formatHex(color) },
        { label: "RGB", value: formatRgb(color) },
        { label: "HSL", value: formatHsl(color) }
      ]
    : []

  return (
    <Card
      title={`${label} conversion`}
      extra={
        color ? (
          <Tag color="green">Valid</Tag>
        ) : input.trim() ? (
          <Tag color="red">Invalid</Tag>
        ) : (
          <Tag>Waiting</Tag>
        )
      }
      className="color-card color-values-card"
      bordered={false}
    >
      {!color ? (
        <div className="color-invalid-message">
          <Text type="secondary">
            {input.trim()
              ? `“${input}” is not a supported color value.`
              : "Enter a HEX, RGB, or HSL color value to see its conversions."}
          </Text>
        </div>
      ) : (
        <>
          <div className="color-swatch-row">
            <span className="color-swatch" style={{ backgroundColor: formatRgb(color) }} />
            <div>
              <Text strong>{label} color</Text>
              <Text type="secondary">Parsed successfully and ready to copy.</Text>
            </div>
          </div>
          <Divider />
          <div className="color-value-list">
            {values.map((item) => (
              <div className="color-value-row" key={item.label}>
                <Text type="secondary">{item.label}</Text>
                <Text code className="color-code-value">
                  {item.value}
                </Text>
                <CopyButton value={item.value} type="link" size="small" iconOnly />
              </div>
            ))}
          </div>
        </>
      )}
    </Card>
  )
}
