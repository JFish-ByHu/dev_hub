import { Alert, Button, Card, Divider, Input, Select, Tag, Typography } from "antd"
import { CheckCircleOutlined, ThunderboltOutlined } from "@ant-design/icons"
import {
  TIMESTAMP_UNIT_OPTIONS,
  TIMEZONE_OPTIONS,
  type TimestampUnit,
  type TimezoneMode
} from "../utils/timestamp"
import type { DateResult } from "../hooks/useTimestampConversion"
import TimestampResultRow from "./TimestampResultRow"

const { Text } = Typography

interface DateToTimestampCardProps {
  input: string
  timezone: TimezoneMode
  outputUnit: TimestampUnit
  result: DateResult
  onInputChange: (value: string) => void
  onTimezoneChange: (timezone: TimezoneMode) => void
  onOutputUnitChange: (unit: TimestampUnit) => void
  onUseCurrent: () => void
}

export default function DateToTimestampCard({
  input,
  timezone,
  outputUnit,
  result,
  onInputChange,
  onTimezoneChange,
  onOutputUnitChange,
  onUseCurrent
}: DateToTimestampCardProps) {
  return (
    <Card
      title="Date & Time → Timestamp"
      extra={<Tag color="cyan">Calendar date</Tag>}
      className="timestamp-card"
      bordered={false}
    >
      <div className="field-group">
        <label htmlFor="date-input">Date and time</label>
        <Input
          id="date-input"
          type="datetime-local"
          step="0.001"
          value={input}
          onChange={(event) => onInputChange(event.target.value)}
          size="large"
        />
        <Text type="secondary" className="field-hint">
          Milliseconds are optional. The selected timezone determines how this value is interpreted.
        </Text>
      </div>
      <div className="field-row">
        <div className="field-group">
          <label htmlFor="date-timezone">Input timezone</label>
          <Select
            id="date-timezone"
            value={timezone}
            onChange={onTimezoneChange}
            options={TIMEZONE_OPTIONS}
            size="large"
            className="full-width"
          />
        </div>
        <div className="field-group">
          <label htmlFor="date-output-unit">Output unit</label>
          <Select
            id="date-output-unit"
            value={outputUnit}
            onChange={onOutputUnitChange}
            options={TIMESTAMP_UNIT_OPTIONS.map(({ value, label }) => ({ value, label }))}
            size="large"
            className="full-width"
          />
        </div>
      </div>
      <Button icon={<ThunderboltOutlined />} onClick={onUseCurrent}>
        Use current date and time
      </Button>

      <Divider />
      {result.ok ? (
        <div className="conversion-result">
          <div className="result-status success">
            <CheckCircleOutlined /> Valid date · {result.timezone}
          </div>
          <TimestampResultRow label={`Timestamp (${outputUnit})`} value={result.timestamp} />
          <TimestampResultRow label="Milliseconds (canonical)" value={result.milliseconds} />
          <TimestampResultRow label="ISO 8601" value={result.iso} />
          <TimestampResultRow label="Relative" value={result.relative} copyable={false} />
        </div>
      ) : (
        <Alert
          message="Waiting for a valid date"
          description={result.error}
          type="warning"
          showIcon
        />
      )}
    </Card>
  )
}
