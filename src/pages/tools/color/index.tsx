import { Tag } from "antd"
import { BgColorsOutlined } from "@ant-design/icons"
import ColorGuide from "./components/ColorGuide"
import ColorInputCard from "./components/ColorInputCard"
import ColorValuesCard from "./components/ColorValuesCard"
import ContrastCard from "./components/ContrastCard"
import { useColorContrast } from "./hooks/useColorContrast"
import "./index.scss"

export default function ColorTool() {
  const color = useColorContrast()

  return (
    <div className="color-tool-page">
      <div className="tool-header">
        <div>
          <h1 className="tool-title">Color Converter & Contrast Checker</h1>
          <p className="tool-desc">
            Convert HEX, RGB, and HSL colors, then verify foreground and background contrast against
            WCAG accessibility thresholds.
          </p>
        </div>
        <Tag icon={<BgColorsOutlined />} color="blue">
          WCAG 2.x contrast
        </Tag>
      </div>

      <ColorInputCard
        foreground={color.foreground}
        background={color.background}
        onForegroundChange={color.setForeground}
        onBackgroundChange={color.setBackground}
        onSwap={color.swap}
        onPreset={color.applyPreset}
        onClear={color.clear}
      />

      <div className="color-converter-grid">
        <ColorValuesCard
          label="Foreground"
          input={color.foreground}
          color={color.foregroundColor}
        />
        <ColorValuesCard
          label="Background"
          input={color.background}
          color={color.backgroundColor}
        />
      </div>

      <ContrastCard
        foreground={color.foregroundColor}
        background={color.backgroundColor}
        contrast={color.contrast}
      />

      <ColorGuide />
    </div>
  )
}
