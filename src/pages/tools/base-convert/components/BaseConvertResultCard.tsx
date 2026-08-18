import { Alert, Divider, Tag, Typography } from "antd"
import ToolCard from "../../../../components/tool/ToolCard"
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons"
import CopyButton from "../../../../components/CopyButton"
import type { BaseConvertResult } from "../hooks/useBaseConvert"

const { Text } = Typography

interface BaseConvertResultCardProps {
  conversion: BaseConvertResult
}

export default function BaseConvertResultCard({ conversion }: BaseConvertResultCardProps) {
  return (
    <ToolCard
      title="Converted Values"
      extra={conversion.kind === "success" ? <Tag color="green">Ready</Tag> : <Tag>Waiting</Tag>}
      className="base-convert-card"
      bordered={false}
    >
      {conversion.kind === "empty" && (
        <Alert message="Waiting for input" description={conversion.message} type="info" showIcon />
      )}
      {conversion.kind === "error" && (
        <Alert
          message="Conversion failed"
          description={conversion.message}
          type="error"
          showIcon
          icon={<CloseCircleOutlined />}
        />
      )}
      {conversion.kind === "success" && (
        <>
          <Alert
            message="Conversion successful"
            description="All four base representations are available."
            type="success"
            showIcon
            icon={<CheckCircleOutlined />}
          />
          <Divider />
          <div className="base-convert-output-grid">
            {conversion.outputs.map((output) => (
              <div className="base-convert-output-item" key={output.radix}>
                <Text type="secondary">{output.label}</Text>
                <div className="base-convert-output-value">
                  <Text code>{output.value}</Text>
                  <CopyButton type="link" size="small" value={output.value} iconOnly />
                </div>
              </div>
            ))}
          </div>
          <Divider />
          <div className="base-convert-details">
            <div>
              <Text type="secondary">Bit length</Text>
              <Text strong>{conversion.details.bitLength}</Text>
            </div>
            <div>
              <Text type="secondary">Byte length</Text>
              <Text strong>{conversion.details.byteLength}</Text>
            </div>
            <div>
              <Text type="secondary">Decimal digits</Text>
              <Text strong>{conversion.details.decimalDigits}</Text>
            </div>
            <div>
              <Text type="secondary">Sign</Text>
              <Text strong>{conversion.details.negative ? "Negative" : "Non-negative"}</Text>
            </div>
          </div>
        </>
      )}
    </ToolCard>
  )
}
