import { Segmented, Select, Typography } from "antd"
import type { UrlEncodingMode, UrlOperation } from "../utils/url"
import { URL_ENCODING_OPTIONS } from "../utils/url"

const { Text } = Typography

interface UrlOptionsProps {
  operation: UrlOperation
  encodingMode: UrlEncodingMode
  onOperationChange: (operation: UrlOperation) => void
  onEncodingModeChange: (mode: UrlEncodingMode) => void
}

export default function UrlOptions({
  operation,
  encodingMode,
  onOperationChange,
  onEncodingModeChange
}: UrlOptionsProps) {
  const selectedMode = URL_ENCODING_OPTIONS.find((option) => option.value === encodingMode)

  return (
    <div className="url-options-card">
      <div className="mode-control">
        <Text type="secondary">Operation</Text>
        <Segmented
          value={operation}
          onChange={(value) => onOperationChange(value as UrlOperation)}
          options={[
            { label: "Encode", value: "encode" },
            { label: "Decode", value: "decode" }
          ]}
          block
        />
      </div>
      <div className="encoding-control">
        <Text type="secondary">Encoding strategy</Text>
        <Select
          value={encodingMode}
          onChange={onEncodingModeChange}
          options={URL_ENCODING_OPTIONS.map(({ value, label }) => ({ value, label }))}
          className="full-width"
        />
      </div>
      <Text type="secondary" className="encoding-description">
        {selectedMode?.description}
      </Text>
    </div>
  )
}
