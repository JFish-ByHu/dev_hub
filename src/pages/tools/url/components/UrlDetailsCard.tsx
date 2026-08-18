import { Empty, Tag, Typography } from "antd"
import ToolCard from "../../../../components/tool/ToolCard"
import type { UrlDetails } from "../utils/url"

const { Text } = Typography

interface UrlDetailsCardProps {
  details: UrlDetails | null
}

export default function UrlDetailsCard({ details }: UrlDetailsCardProps) {
  return (
    <ToolCard
      title="URL Inspector"
      extra={<Tag color="blue">Absolute URLs</Tag>}
      className="url-details-card"
      bordered={false}
    >
      {details ? (
        <div className="url-details-grid">
          <div>
            <Text type="secondary">Protocol</Text>
            <Text code>{details.protocol}</Text>
          </div>
          <div>
            <Text type="secondary">Host</Text>
            <Text code>{details.host}</Text>
          </div>
          <div>
            <Text type="secondary">Path</Text>
            <Text code>{details.pathname}</Text>
          </div>
          <div>
            <Text type="secondary">Query</Text>
            <Text code>{details.query || "—"}</Text>
          </div>
          <div>
            <Text type="secondary">Hash</Text>
            <Text code>{details.hash || "—"}</Text>
          </div>
          <div>
            <Text type="secondary">Query parameters</Text>
            <Text strong>{details.parameterCount}</Text>
          </div>
        </div>
      ) : (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="Enter an absolute URL to inspect its parts"
        />
      )}
    </ToolCard>
  )
}
