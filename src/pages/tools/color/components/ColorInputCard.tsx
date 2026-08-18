import { Button, Input, Select, Space, Typography } from "antd"
import ToolCard from "../../../../components/tool/ToolCard"
import { ClearOutlined, SwapOutlined } from "@ant-design/icons"
import { COLOR_PRESETS } from "../utils/color"

const { Text } = Typography

interface ColorInputCardProps {
  foreground: string
  background: string
  onForegroundChange: (value: string) => void
  onBackgroundChange: (value: string) => void
  onSwap: () => void
  onPreset: (preset: (typeof COLOR_PRESETS)[number]) => void
  onClear: () => void
}

function ColorField({
  label,
  value,
  onChange,
  color,
  onColorChange
}: {
  label: string
  value: string
  onChange: (value: string) => void
  color: string
  onColorChange: (value: string) => void
}) {
  return (
    <div className="color-field">
      <Text type="secondary">{label}</Text>
      <div className="color-field-controls">
        <Input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="#2F27CE or rgb(47, 39, 206)"
          spellCheck={false}
          className="color-value-input"
        />
        <input
          type="color"
          value={color}
          onChange={(event) => onColorChange(event.target.value)}
          className="native-color-picker"
          aria-label={`${label} color picker`}
        />
      </div>
      <Text type="secondary" className="color-field-hint">
        HEX, RGB(A), and HSL(A) are supported.
      </Text>
    </div>
  )
}

export default function ColorInputCard({
  foreground,
  background,
  onForegroundChange,
  onBackgroundChange,
  onSwap,
  onPreset,
  onClear
}: ColorInputCardProps) {
  const foregroundPicker = /^#[\da-f]{6}$/i.test(foreground) ? foreground : "#2f27ce"
  const backgroundPicker = /^#[\da-f]{6}$/i.test(background) ? background : "#ffffff"

  return (
    <ToolCard title="Color inputs" className="color-card color-input-card" bordered={false}>
      <div className="color-input-grid">
        <ColorField
          label="Foreground color"
          value={foreground}
          color={foregroundPicker}
          onChange={onForegroundChange}
          onColorChange={onForegroundChange}
        />
        <ColorField
          label="Background color"
          value={background}
          color={backgroundPicker}
          onChange={onBackgroundChange}
          onColorChange={onBackgroundChange}
        />
      </div>
      <div className="color-input-actions">
        <Space wrap>
          <Select
            placeholder="Load a preset"
            options={COLOR_PRESETS.map((preset) => ({ label: preset.label, value: preset.label }))}
            onChange={(value) => {
              const preset = COLOR_PRESETS.find((item) => item.label === value)
              if (preset) onPreset(preset)
            }}
            className="color-preset-select"
          />
          <Button icon={<SwapOutlined />} onClick={onSwap}>
            Swap colors
          </Button>
          <Button
            danger
            icon={<ClearOutlined />}
            onClick={onClear}
            disabled={!foreground && !background}
          >
            Clear
          </Button>
        </Space>
        <Text type="secondary">Contrast is calculated using WCAG 2.x relative luminance.</Text>
      </div>
    </ToolCard>
  )
}
