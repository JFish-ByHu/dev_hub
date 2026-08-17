import { Alert, Button, Card, Divider, Empty, Space, Tag, Typography } from "antd"
import { CheckCircleOutlined, ClearOutlined, DownloadOutlined } from "@ant-design/icons"
import CopyButton from "../../../../components/CopyButton"
import type { UuidVersion } from "../utils/uuid"

const { Text } = Typography

interface UuidResultCardProps {
  version: UuidVersion
  values: string[]
  onClear: () => void
}

function downloadValues(values: string[]) {
  const blob = new Blob([`${values.join("\n")}\n`], { type: "text/plain;charset=utf-8" })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement("a")
  anchor.href = url
  anchor.download = "devhub-uuids.txt"
  anchor.click()
  URL.revokeObjectURL(url)
}

export default function UuidResultCard({ version, values, onClear }: UuidResultCardProps) {
  const allValues = values.join("\n")

  return (
    <Card
      title="Generated IDs"
      extra={values.length ? <Tag color="green">Ready</Tag> : <Tag>Waiting</Tag>}
      className="uuid-card"
      bordered={false}
    >
      {!values.length && (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="Generate one or more UUIDs to see them here."
        />
      )}
      {values.length > 0 && (
        <>
          <Alert
            message={`${values.length} UUID${values.length === 1 ? "" : "s"} ${version} generated`}
            description="These identifiers are generated locally in your browser and are ready to copy or download."
            type="success"
            showIcon
            icon={<CheckCircleOutlined />}
          />
          <Divider />
          <div className="uuid-list" aria-label="Generated UUID values">
            {values.map((value, index) => (
              <div className="uuid-list-item" key={`${value}-${index}`}>
                <Text type="secondary" className="uuid-index">
                  {String(index + 1).padStart(2, "0")}
                </Text>
                <Text code className="uuid-value">
                  {value}
                </Text>
                <CopyButton value={value} type="link" size="small" iconOnly />
              </div>
            ))}
          </div>
          <div className="uuid-result-actions">
            <Space wrap>
              <CopyButton value={allValues} />
              <Button icon={<DownloadOutlined />} onClick={() => downloadValues(values)}>
                Download .txt
              </Button>
              <Button danger icon={<ClearOutlined />} onClick={onClear}>
                Clear
              </Button>
            </Space>
            <Text type="secondary">One ID per line</Text>
          </div>
        </>
      )}
    </Card>
  )
}
