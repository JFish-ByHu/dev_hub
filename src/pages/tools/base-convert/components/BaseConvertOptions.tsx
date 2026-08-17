import { Select, Switch, Typography } from "antd"
import { RADIX_OPTIONS, type Radix } from "../utils/baseConvert"

const { Text } = Typography

interface BaseConvertOptionsProps {
  sourceRadix: Radix
  includePrefix: boolean
  uppercaseHex: boolean
  onSourceRadixChange: (radix: Radix) => void
  onPrefixChange: (includePrefix: boolean) => void
  onUppercaseChange: (uppercase: boolean) => void
}

export default function BaseConvertOptions({
  sourceRadix,
  includePrefix,
  uppercaseHex,
  onSourceRadixChange,
  onPrefixChange,
  onUppercaseChange
}: BaseConvertOptionsProps) {
  return (
    <div className="base-convert-options-card">
      <div className="source-radix-control">
        <Text type="secondary">Input base</Text>
        <Select
          value={sourceRadix}
          onChange={onSourceRadixChange}
          options={RADIX_OPTIONS.map(({ value, label }) => ({ value, label }))}
          className="full-width"
        />
      </div>
      <div className="switch-control">
        <Text type="secondary">Show prefixes</Text>
        <Switch checked={includePrefix} onChange={onPrefixChange} />
        <Text type="secondary" className="switch-hint">
          0b · 0o · 0x
        </Text>
      </div>
      <div className="switch-control">
        <Text type="secondary">Uppercase hexadecimal</Text>
        <Switch checked={uppercaseHex} onChange={onUppercaseChange} />
        <Text type="secondary" className="switch-hint">
          A-F instead of a-f
        </Text>
      </div>
    </div>
  )
}
