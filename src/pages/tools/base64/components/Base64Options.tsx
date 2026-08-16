import { Segmented, Select, Switch, Typography } from "antd"
import type { Base64Variant } from "../utils/base64"
import type { ConversionMode } from "../hooks/useBase64Conversion"

const { Text } = Typography

interface Base64OptionsProps {
  mode: ConversionMode
  variant: Base64Variant
  includePadding: boolean
  onModeChange: (mode: ConversionMode) => void
  onVariantChange: (variant: Base64Variant) => void
  onPaddingChange: (includePadding: boolean) => void
}

export default function Base64Options({
  mode,
  variant,
  includePadding,
  onModeChange,
  onVariantChange,
  onPaddingChange
}: Base64OptionsProps) {
  return (
    <div className="base64-options-card">
      <div className="mode-control">
        <Text type="secondary">Operation</Text>
        <Segmented
          value={mode}
          onChange={(value) => onModeChange(value as ConversionMode)}
          options={[
            { label: "Encode", value: "encode" },
            { label: "Decode", value: "decode" }
          ]}
          block
        />
      </div>
      <div className="option-control">
        <Text type="secondary">Alphabet</Text>
        <Select
          value={variant}
          onChange={onVariantChange}
          options={[
            { label: "Standard Base64", value: "standard" },
            { label: "Base64URL (- and _)", value: "url" }
          ]}
          className="full-width"
        />
      </div>
      <div className="padding-control">
        <Text type="secondary">Keep padding</Text>
        <Switch checked={includePadding} onChange={onPaddingChange} disabled={mode === "decode"} />
        <Text type="secondary" className="option-hint">
          {mode === "decode"
            ? "Decoder accepts padded or unpadded input"
            : "Keep trailing = characters"}
        </Text>
      </div>
    </div>
  )
}
