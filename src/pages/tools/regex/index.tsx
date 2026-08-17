import { Tag } from "antd"
import { SearchOutlined } from "@ant-design/icons"
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
      <div className="tool-header">
        <div>
          <h1 className="tool-title">Regex Tester & Generator</h1>
          <p className="tool-desc">
            Test JavaScript regular expressions against sample text, inspect captures, preview
            replacements, and start from practical templates.
          </p>
        </div>
        <Tag icon={<SearchOutlined />} color="blue">
          JavaScript RegExp
        </Tag>
      </div>

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
        <RegexResultCard analysis={tester.analysis} />
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
