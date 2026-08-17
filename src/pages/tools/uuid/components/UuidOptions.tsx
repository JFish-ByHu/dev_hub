import { Button, InputNumber, Select, Switch, Typography } from "antd"
import { ReloadOutlined } from "@ant-design/icons"
import type { UuidVersion } from "../utils/uuid"

const { Text } = Typography

interface UuidOptionsProps {
  version: UuidVersion
  count: number
  uppercase: boolean
  hyphens: boolean
  onVersionChange: (version: UuidVersion) => void
  onCountChange: (count: number) => void
  onUppercaseChange: (value: boolean) => void
  onHyphensChange: (value: boolean) => void
  onGenerate: () => void
}

export default function UuidOptions({
  version,
  count,
  uppercase,
  hyphens,
  onVersionChange,
  onCountChange,
  onUppercaseChange,
  onHyphensChange,
  onGenerate
}: UuidOptionsProps) {
  return (
    <div className="uuid-options-card">
      <div className="uuid-option-control uuid-version-control">
        <Text type="secondary">UUID version</Text>
        <Select
          value={version}
          onChange={onVersionChange}
          options={[
            { label: "UUID v4 · Random", value: "v4" },
            { label: "UUID v7 · Time-ordered", value: "v7" }
          ]}
          className="full-width"
        />
      </div>
      <div className="uuid-option-control uuid-count-control">
        <Text type="secondary">Quantity</Text>
        <InputNumber
          min={1}
          max={100}
          value={count}
          onChange={(value) => onCountChange(value ?? 1)}
          className="full-width"
        />
      </div>
      <div className="uuid-switch-control">
        <Text type="secondary">Uppercase</Text>
        <Switch checked={uppercase} onChange={onUppercaseChange} />
        <Text type="secondary" className="uuid-option-hint">
          Use A–F instead of a–f
        </Text>
      </div>
      <div className="uuid-switch-control">
        <Text type="secondary">Hyphens</Text>
        <Switch checked={hyphens} onChange={onHyphensChange} />
        <Text type="secondary" className="uuid-option-hint">
          Keep the canonical 8-4-4-4-12 layout
        </Text>
      </div>
      <Button type="primary" icon={<ReloadOutlined />} onClick={onGenerate}>
        Generate IDs
      </Button>
    </div>
  )
}
