import { Button, Input, Space, Tag, Typography } from "antd"
import ToolCard from "../../../../components/tool/ToolCard"
import { ClearOutlined, CodeOutlined } from "@ant-design/icons"
import type { Radix } from "../utils/baseConvert"

const { TextArea } = Input
const { Text } = Typography

interface BaseConvertInputCardProps {
  sourceRadix: Radix
  input: string
  onInputChange: (value: string) => void
  onExample: () => void
  onClear: () => void
}

export default function BaseConvertInputCard({
  sourceRadix,
  input,
  onInputChange,
  onExample,
  onClear
}: BaseConvertInputCardProps) {
  return (
    <ToolCard
      title="Number Input"
      extra={<Tag color="purple">Base {sourceRadix}</Tag>}
      className="base-convert-card"
      bordered={false}
    >
      <TextArea
        value={input}
        onChange={(event) => onInputChange(event.target.value)}
        placeholder="Enter a number, for example 255, 0xff, or 1111_1111..."
        autoSize={{ minRows: 4, maxRows: 8 }}
        spellCheck={false}
        className="base-convert-input"
      />
      <div className="base-convert-input-actions">
        <Space>
          <Button icon={<CodeOutlined />} onClick={onExample}>
            Example
          </Button>
          <Button danger icon={<ClearOutlined />} onClick={onClear} disabled={!input}>
            Clear
          </Button>
        </Space>
        <Text type="secondary">Spaces, underscores, and matching prefixes are accepted.</Text>
      </div>
    </ToolCard>
  )
}
