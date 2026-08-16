import { Typography } from "antd"
import CopyButton from "../../../../components/CopyButton"

const { Text } = Typography

interface TimestampResultRowProps {
  label: string
  value: string
  copyable?: boolean
}

export default function TimestampResultRow({
  label,
  value,
  copyable = true
}: TimestampResultRowProps) {
  return (
    <div className="result-row">
      <Text type="secondary" className="result-label">
        {label}
      </Text>
      <div className="result-value-wrap">
        <Text className="result-value" code>
          {value}
        </Text>
        {copyable && <CopyButton type="link" size="small" value={value} />}
      </div>
    </div>
  )
}
