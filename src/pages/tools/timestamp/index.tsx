import { Tag } from "antd"
import { ClockCircleOutlined } from "@ant-design/icons"
import ToolPageHeader from "../../../components/tool/ToolPageHeader"
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
      <ToolPageHeader
        title="Timestamp Converter"
        description="Convert Unix timestamps and human-readable dates with precise units, timezone control, ISO output, and relative-time context."
        extra={
          <Tag icon={<ClockCircleOutlined />} color="blue">
            Runs locally in your browser
          </Tag>
        }
      />

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
