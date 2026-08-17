import { Card, Input, Typography } from "antd"

const { TextArea } = Input
const { Text } = Typography

interface RegexTesterCardProps {
  testText: string
  replacement: string
  onTestTextChange: (value: string) => void
  onReplacementChange: (value: string) => void
}

export default function RegexTesterCard({
  testText,
  replacement,
  onTestTextChange,
  onReplacementChange
}: RegexTesterCardProps) {
  return (
    <Card title="Test input" className="regex-card regex-tester-card" bordered={false}>
      <div className="regex-field-group">
        <Text type="secondary">Sample text</Text>
        <TextArea
          value={testText}
          onChange={(event) => onTestTextChange(event.target.value)}
          placeholder="Paste text to test against the expression..."
          autoSize={{ minRows: 9, maxRows: 18 }}
          spellCheck={false}
          className="regex-textarea"
        />
      </div>
      <div className="regex-field-group regex-replacement-field">
        <Text type="secondary">Replacement preview</Text>
        <Input
          value={replacement}
          onChange={(event) => onReplacementChange(event.target.value)}
          placeholder="Optional replacement, e.g. [$&] or $1"
          spellCheck={false}
          className="regex-replacement-input"
        />
        <Text type="secondary" className="regex-field-hint">
          Supports JavaScript replacement tokens such as <code>$&</code>, <code>$1</code>, and
          <code>$&lt;name&gt;</code>.
        </Text>
      </div>
    </Card>
  )
}
