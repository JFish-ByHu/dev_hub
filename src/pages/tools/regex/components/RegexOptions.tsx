import { Button, Checkbox, Input, Space, Typography } from "antd"
import { ClearOutlined, CodeOutlined, ExperimentOutlined } from "@ant-design/icons"
import { REGEX_FLAG_OPTIONS, type RegexFlagKey, type RegexFlags } from "../utils/regex"

const { Text } = Typography

interface RegexOptionsProps {
  pattern: string
  flags: RegexFlags
  onPatternChange: (value: string) => void
  onFlagChange: (key: RegexFlagKey, value: boolean) => void
  onExample: () => void
  onClear: () => void
}

export default function RegexOptions({
  pattern,
  flags,
  onPatternChange,
  onFlagChange,
  onExample,
  onClear
}: RegexOptionsProps) {
  const flagText = REGEX_FLAG_OPTIONS.filter((option) => flags[option.key])
    .map((option) => option.flag)
    .join("")

  return (
    <div className="regex-options-card">
      <div className="regex-pattern-control">
        <Text type="secondary">Regular expression</Text>
        <Input
          value={pattern}
          onChange={(event) => onPatternChange(event.target.value)}
          placeholder="Enter a pattern, for example \\b[A-Za-z]+\\b"
          addonBefore="/"
          addonAfter={`/${flagText}`}
          spellCheck={false}
          className="regex-pattern-input"
        />
      </div>
      <div className="regex-flags-control">
        <Text type="secondary">Flags</Text>
        <Space wrap size={[12, 8]}>
          {REGEX_FLAG_OPTIONS.map((option) => (
            <Checkbox
              key={option.key}
              checked={flags[option.key]}
              onChange={(event) => onFlagChange(option.key, event.target.checked)}
            >
              <span className="regex-flag-label">
                <strong>{option.flag}</strong> {option.label}
              </span>
            </Checkbox>
          ))}
        </Space>
      </div>
      <div className="regex-option-actions">
        <Button icon={<ExperimentOutlined />} onClick={onExample}>
          Example
        </Button>
        <Button
          danger
          icon={<ClearOutlined />}
          onClick={onClear}
          disabled={!pattern && !flags.global}
        >
          Clear
        </Button>
      </div>
      <Text className="regex-option-hint" type="secondary">
        <CodeOutlined /> Changes are analyzed locally as you type.
      </Text>
    </div>
  )
}
