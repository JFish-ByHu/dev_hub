import { Button, Input, Space, Tag, Typography } from "antd"
import ToolCard from "../../../../components/tool/ToolCard"
import { ClearOutlined, CodeOutlined, SwapOutlined } from "@ant-design/icons"
import type { UrlOperation } from "../utils/url"
import type { UrlStats } from "../utils/url"

const { TextArea } = Input
const { Text } = Typography

interface UrlInputCardProps {
  operation: UrlOperation
  input: string
  stats: UrlStats
  onInputChange: (value: string) => void
  onSwap: () => void
  onExample: () => void
  onClear: () => void
  canSwap: boolean
}

export default function UrlInputCard({
  operation,
  input,
  stats,
  onInputChange,
  onSwap,
  onExample,
  onClear,
  canSwap
}: UrlInputCardProps) {
  return (
    <ToolCard
      title={operation === "encode" ? "Raw URL or Text" : "Encoded URL"}
      extra={
        <Tag color={operation === "encode" ? "purple" : "cyan"}>
          {operation === "encode" ? "Input" : "Percent encoded"}
        </Tag>
      }
      className="url-card"
      bordered={false}
    >
      <TextArea
        value={input}
        onChange={(event) => onInputChange(event.target.value)}
        placeholder={
          operation === "encode"
            ? "Paste a URL or text here, for example https://example.com/search?q=hello world"
            : "Paste an encoded URL here, for example https%3A%2F%2Fexample.com"
        }
        spellCheck={false}
        className="url-textarea"
      />
      <div className="url-input-actions">
        <Space wrap>
          <Button icon={<SwapOutlined />} onClick={onSwap} disabled={!canSwap}>
            Swap to {operation === "encode" ? "decode" : "encode"}
          </Button>
          <Button icon={<CodeOutlined />} onClick={onExample}>
            Example
          </Button>
          <Button danger icon={<ClearOutlined />} onClick={onClear} disabled={!input}>
            Clear
          </Button>
        </Space>
        <div className="url-stats">
          <Text type="secondary">{stats.characters.toLocaleString()} characters</Text>
          <Text type="secondary">{stats.bytes.toLocaleString()} bytes</Text>
        </div>
      </div>
    </ToolCard>
  )
}
