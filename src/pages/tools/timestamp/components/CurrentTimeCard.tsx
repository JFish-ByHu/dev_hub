import { Button, Divider, Typography } from "antd"
import ToolCard from "../../../../components/tool/ToolCard"
import { ReloadOutlined } from "@ant-design/icons"
import CopyButton from "../../../../components/CopyButton"
import {
  TIMESTAMP_UNIT_OPTIONS,
  type TimestampUnit,
  formatDateTime,
  formatTimestamp
} from "../utils/timestamp"

const { Text } = Typography

interface CurrentTimeCardProps {
  now: Date
  onRefresh: () => void
}

export default function CurrentTimeCard({ now, onRefresh }: CurrentTimeCardProps) {
  return (
    <ToolCard className="timestamp-now-card" bordered={false}>
      <div className="now-card-heading">
        <div>
          <Text className="eyebrow">CURRENT TIME</Text>
          <h2>Live Unix time</h2>
          <Text type="secondary">The values below refresh every second.</Text>
        </div>
        <Button icon={<ReloadOutlined />} onClick={onRefresh}>
          Refresh
        </Button>
      </div>
      <div className="current-time-grid">
        {TIMESTAMP_UNIT_OPTIONS.map((unit: { value: TimestampUnit; label: string }) => {
          const value = formatTimestamp(now, unit.value)
          return (
            <div className="current-time-item" key={unit.value}>
              <Text type="secondary">{unit.label}</Text>
              <div className="current-time-value">
                <Text code>{value}</Text>
                <CopyButton type="link" size="small" value={value} iconOnly />
              </div>
            </div>
          )
        })}
      </div>
      <Divider />
      <div className="now-footer">
        <Text type="secondary">ISO 8601</Text>
        <Text code>{now.toISOString()}</Text>
        <Text type="secondary">Local: {formatDateTime(now, "local")}</Text>
        <Text type="secondary">UTC: {formatDateTime(now, "utc")}</Text>
      </div>
    </ToolCard>
  )
}
