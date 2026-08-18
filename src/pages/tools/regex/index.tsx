import { Tag } from "antd"
import { SearchOutlined } from "@ant-design/icons"
import ToolPageHeader from "../../../components/tool/ToolPageHeader"
import RegexGuide from "./components/RegexGuide"
import RegexOptions from "./components/RegexOptions"
import RegexPresets from "./components/RegexPresets"
import RegexResultCard from "./components/RegexResultCard"
import RegexTesterCard from "./components/RegexTesterCard"
import { useRegexTester } from "./hooks/useRegexTester"
import "./index.scss"

export default function RegexTool() {
  const tester = useRegexTester()

  return (
    <div className="regex-tool-page">
      <ToolPageHeader
        title="Regex Tester & Generator"
        description="Test JavaScript regular expressions against sample text, inspect captures, preview replacements, and start from practical templates."
        extra={
          <Tag icon={<SearchOutlined />} color="blue">
            JavaScript RegExp
          </Tag>
        }
      />

      <RegexOptions
        pattern={tester.pattern}
        flags={tester.flags}
        onPatternChange={tester.setPattern}
        onFlagChange={tester.setFlag}
        onExample={tester.loadExample}
        onClear={tester.clear}
      />

      <div className="regex-tool-grid">
        <RegexTesterCard
          testText={tester.testText}
          replacement={tester.replacement}
          onTestTextChange={tester.setTestText}
          onReplacementChange={tester.setReplacement}
        />
        <RegexResultCard analysis={tester.analysis} isAnalyzing={tester.isAnalyzing} />
      </div>

      <RegexPresets
        selectedPreset={tester.selectedPreset}
        onPresetChange={tester.setSelectedPreset}
        onUsePreset={tester.usePreset}
      />

      <RegexGuide />
    </div>
  )
}
