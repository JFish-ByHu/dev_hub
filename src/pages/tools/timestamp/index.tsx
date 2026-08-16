import { Tag } from "antd"
import { ClockCircleOutlined } from "@ant-design/icons"
import CurrentTimeCard from "./components/CurrentTimeCard"
import DateToTimestampCard from "./components/DateToTimestampCard"
import TimestampGuide from "./components/TimestampGuide"
import TimestampToDateCard from "./components/TimestampToDateCard"
import { useTimestampConversion } from "./hooks/useTimestampConversion"
import "./index.scss"

export default function TimestampTool() {
  const timestamp = useTimestampConversion()

  return (
    <div className="timestamp-tool-page">
      <div className="tool-header">
        <div>
          <h1 className="tool-title">Timestamp Converter</h1>
          <p className="tool-desc">
            Convert Unix timestamps and human-readable dates with precise units, timezone control,
            ISO output, and relative-time context.
          </p>
        </div>
        <Tag icon={<ClockCircleOutlined />} color="blue">
          Runs locally in your browser
        </Tag>
      </div>

      <CurrentTimeCard now={timestamp.now} onRefresh={() => timestamp.setNow(new Date())} />

      <div className="timestamp-converter-grid">
        <TimestampToDateCard
          input={timestamp.timestampInput}
          unit={timestamp.timestampUnit}
          timezone={timestamp.timestampTimezone}
          result={timestamp.timestampResult}
          onInputChange={timestamp.setTimestampInput}
          onUnitChange={timestamp.setTimestampUnit}
          onTimezoneChange={timestamp.setTimestampTimezone}
          onUseCurrent={timestamp.setCurrentTimestamp}
        />
        <DateToTimestampCard
          input={timestamp.dateInput}
          timezone={timestamp.dateTimezone}
          outputUnit={timestamp.dateOutputUnit}
          result={timestamp.dateResult}
          onInputChange={timestamp.setDateInput}
          onTimezoneChange={timestamp.setDateTimezone}
          onOutputUnitChange={timestamp.setDateOutputUnit}
          onUseCurrent={timestamp.setCurrentDate}
        />
      </div>

      <TimestampGuide />
    </div>
  )
}
