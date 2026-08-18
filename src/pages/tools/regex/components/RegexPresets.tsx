import { Button, Select, Space, Tag, Typography } from "antd"
import ToolCard from "../../../../components/tool/ToolCard"
import { ThunderboltOutlined } from "@ant-design/icons"
import CopyButton from "../../../../components/CopyButton"
import { flagsToString, REGEX_PRESETS, type RegexPreset } from "../utils/regex"

const { Text } = Typography

interface RegexPresetsProps {
  selectedPreset: RegexPreset
  onPresetChange: (preset: RegexPreset) => void
  onUsePreset: (preset: RegexPreset) => void
}

export default function RegexPresets({
  selectedPreset,
  onPresetChange,
  onUsePreset
}: RegexPresetsProps) {
  return (
    <ToolCard className="regex-presets-card" bordered={false}>
      <div className="regex-presets-heading">
        <div>
          <Text className="eyebrow">STARTER TEMPLATES</Text>
          <h2>Common regular expressions</h2>
        </div>
        <Text type="secondary">
          Use a template as a starting point, then adjust it for your data.
        </Text>
      </div>
      <div className="regex-presets-content">
        <Select
          value={selectedPreset.id}
          onChange={(value) => {
            const preset = REGEX_PRESETS.find((item) => item.id === value)
            if (preset) onPresetChange(preset)
          }}
          options={REGEX_PRESETS.map((preset) => ({ label: preset.label, value: preset.id }))}
          className="regex-preset-select"
        />
        <div className="regex-preset-preview">
          <div className="regex-preset-preview-heading">
            <Tag color="purple">/{flagsToString(selectedPreset.flags) || "none"}</Tag>
            <Text type="secondary">{selectedPreset.description}</Text>
          </div>
          <Text code className="regex-preset-value">
            /{selectedPreset.pattern}/
          </Text>
        </div>
        <Space wrap>
          <CopyButton value={`/${selectedPreset.pattern}/${flagsToString(selectedPreset.flags)}`}>
            Copy pattern
          </CopyButton>
          <Button
            type="primary"
            icon={<ThunderboltOutlined />}
            onClick={() => onUsePreset(selectedPreset)}
          >
            Use in tester
          </Button>
        </Space>
      </div>
    </ToolCard>
  )
}
