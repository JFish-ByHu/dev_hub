import { Alert, Card, Divider, Input, Tag, Typography } from "antd"
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons"
import CopyButton from "../../../../components/CopyButton"
import type { UrlConversionResult } from "../hooks/useUrlCodec"
import type { UrlStats } from "../utils/url"

const { TextArea } = Input
const { Text } = Typography

interface UrlResultCardProps {
  operation: "encode" | "decode"
  conversion: UrlConversionResult
  outputStats: UrlStats
}

export default function UrlResultCard({ operation, conversion, outputStats }: UrlResultCardProps) {
  return (
    <Card
      title={operation === "encode" ? "Encoded Result" : "Decoded Result"}
      extra={conversion.kind === "success" ? <Tag color="green">Ready</Tag> : <Tag>Waiting</Tag>}
      className="url-card"
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
            description="The result is ready to copy or use in another tool."
            type="success"
            showIcon
            icon={<CheckCircleOutlined />}
          />
          <Divider />
          <TextArea
            value={conversion.output}
            readOnly
            spellCheck={false}
            className="url-textarea result-textarea"
          />
          <div className="url-result-actions">
            <CopyButton value={conversion.output} />
            <Text type="secondary">
              {outputStats.characters.toLocaleString()} characters ·{" "}
              {outputStats.bytes.toLocaleString()} bytes
            </Text>
          </div>
        </>
      )}
    </Card>
  )
}
