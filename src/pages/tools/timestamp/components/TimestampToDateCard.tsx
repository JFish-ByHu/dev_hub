import { Alert, Button, Card, Divider, Input, Select, Tag } from "antd"
import { CheckCircleOutlined, ThunderboltOutlined } from "@ant-design/icons"
import {
  TIMESTAMP_UNIT_OPTIONS,
  TIMEZONE_OPTIONS,
  type TimestampUnit,
  type TimezoneMode
} from "../utils/timestamp"
import type { TimestampResult } from "../hooks/useTimestampConversion"
import TimestampResultRow from "./TimestampResultRow"

interface TimestampToDateCardProps {
  input: string
  unit: TimestampUnit
  timezone: TimezoneMode
  result: TimestampResult
  onInputChange: (value: string) => void
  onUnitChange: (unit: TimestampUnit) => void
  onTimezoneChange: (timezone: TimezoneMode) => void
  onUseCurrent: () => void
}

export default function TimestampToDateCard({
  input,
  unit,
  timezone,
  result,
  onInputChange,
  onUnitChange,
  onTimezoneChange,
  onUseCurrent
}: TimestampToDateCardProps) {
  return (
    <Card
      title="Timestamp → Date & Time"
      extra={<Tag color="purple">Unix timestamp</Tag>}
      className="timestamp-card"
      bordered={false}
    >
      <div className="field-group">
        <label htmlFor="timestamp-input">Timestamp value</label>
        <Input
          id="timestamp-input"
          value={input}
          onChange={(event) => onInputChange(event.target.value)}
          placeholder="e.g. 1710000000"
          size="large"
          suffix={TIMESTAMP_UNIT_OPTIONS.find((item) => item.value === unit)?.shortLabel}
        />
      </div>
      <div className="field-row">
        <div className="field-group">
          <label htmlFor="timestamp-unit">Input unit</label>
          <Select
            id="timestamp-unit"
            value={unit}
            onChange={onUnitChange}
            options={TIMESTAMP_UNIT_OPTIONS.map(({ value, label }) => ({ value, label }))}
            size="large"
            className="full-width"
          />
        </div>
        <div className="field-group">
          <label htmlFor="timestamp-timezone">Display timezone</label>
          <Select
            id="timestamp-timezone"
            value={timezone}
            onChange={onTimezoneChange}
            options={TIMEZONE_OPTIONS}
            size="large"
            className="full-width"
          />
        </div>
      </div>
      <Button icon={<ThunderboltOutlined />} onClick={onUseCurrent}>
        Use current timestamp
      </Button>

      <Divider />
      {result.ok ? (
        <div className="conversion-result">
          <div className="result-status success">
            <CheckCircleOutlined /> Valid timestamp · {result.timezone}
          </div>
          <TimestampResultRow label="Date and time" value={result.formatted} />
          <TimestampResultRow label="ISO 8601" value={result.iso} />
          <TimestampResultRow label="Relative" value={result.relative} copyable={false} />
        </div>
      ) : (
        <Alert
          message="Waiting for a valid timestamp"
          description={result.error}
          type="warning"
          showIcon
        />
      )}
    </Card>
  )
}
