import { Alert, Button, Card, Divider, Input, Space, Tag, Typography } from "antd"
import { CheckCircleOutlined, CloseCircleOutlined, DownloadOutlined } from "@ant-design/icons"
import type { ConversionResult } from "../hooks/useBase64Conversion"
import { formatByteSize } from "../utils/base64"
import CopyButton from "../../../../components/CopyButton"

const { TextArea } = Input
const { Text } = Typography

interface Base64ResultCardProps {
  conversion: ConversionResult
  outputValue: string
  isBinaryDecode: boolean
  sourceFileName: string | null
}

function downloadValue(value: string | Uint8Array, filename: string, type: string) {
  const blob =
    typeof value === "string"
      ? new Blob([value], { type })
      : new Blob([value.buffer as ArrayBuffer], { type })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement("a")
  anchor.href = url
  anchor.download = filename
  anchor.click()
  URL.revokeObjectURL(url)
}

export default function Base64ResultCard({
  conversion,
  outputValue,
  isBinaryDecode,
  sourceFileName
}: Base64ResultCardProps) {
  return (
    <Card
      title="Conversion Result"
      extra={
        conversion.kind === "encode" || conversion.kind === "decode" ? (
          <Tag color="green">Ready</Tag>
        ) : (
          <Tag>Waiting</Tag>
        )
      }
      className="base64-card"
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
      {(conversion.kind === "encode" || conversion.kind === "decode") && (
        <>
          <Alert
            message={
              isBinaryDecode ? "Valid Base64 · binary data detected" : "Conversion successful"
            }
            description={
              isBinaryDecode
                ? "The decoded bytes are not valid UTF-8 text. Download the binary result instead."
                : "The result is ready to copy or download."
            }
            type="success"
            showIcon
            icon={<CheckCircleOutlined />}
          />
          <Divider />
          <TextArea
            value={outputValue}
            readOnly
            spellCheck={false}
            placeholder={
              isBinaryDecode
                ? "Binary output cannot be displayed as text."
                : "Result will appear here..."
            }
            className="base64-textarea result-textarea"
          />
          <div className="result-actions">
            <Space>
              <CopyButton value={outputValue} disabled={!outputValue} />
              <Button
                icon={<DownloadOutlined />}
                onClick={() => {
                  if (conversion.kind === "encode") {
                    downloadValue(
                      conversion.output,
                      `${sourceFileName ?? "encoded"}.base64.txt`,
                      "text/plain"
                    )
                  } else {
                    downloadValue(conversion.bytes, "decoded.bin", "application/octet-stream")
                  }
                }}
              >
                Download
              </Button>
            </Space>
            <Text type="secondary">
              {conversion.kind === "encode"
                ? `${formatByteSize(conversion.inputBytes)} → ${formatByteSize(conversion.outputBytes)}`
                : `${formatByteSize(conversion.inputBytes)} Base64 → ${formatByteSize(conversion.bytes.byteLength)} decoded`}
            </Text>
          </div>
        </>
      )}
    </Card>
  )
}
