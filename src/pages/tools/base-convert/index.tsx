import { Tag } from "antd"
import { CalculatorOutlined } from "@ant-design/icons"
import BaseConvertGuide from "./components/BaseConvertGuide"
import BaseConvertInputCard from "./components/BaseConvertInputCard"
import BaseConvertOptions from "./components/BaseConvertOptions"
import BaseConvertResultCard from "./components/BaseConvertResultCard"
import { useBaseConvert } from "./hooks/useBaseConvert"
import "./index.scss"

export default function BaseConvertTool() {
  const converter = useBaseConvert()

  return (
    <div className="base-convert-tool-page">
      <div className="tool-header">
        <div>
          <h1 className="tool-title">Base Converter</h1>
          <p className="tool-desc">
            Convert exact integer values between binary, octal, decimal, and hexadecimal
            representations.
          </p>
        </div>
        <Tag icon={<CalculatorOutlined />} color="blue">
          Arbitrary-precision integers
        </Tag>
      </div>

      <BaseConvertOptions
        sourceRadix={converter.sourceRadix}
        includePrefix={converter.includePrefix}
        uppercaseHex={converter.uppercaseHex}
        onSourceRadixChange={converter.setSourceRadix}
        onPrefixChange={converter.setIncludePrefix}
        onUppercaseChange={converter.setUppercaseHex}
      />

      <div className="base-convert-grid">
        <BaseConvertInputCard
          sourceRadix={converter.sourceRadix}
          input={converter.input}
          onInputChange={converter.setInput}
          onExample={converter.loadExample}
          onClear={converter.clear}
        />
        <BaseConvertResultCard conversion={converter.conversion} />
      </div>

      <BaseConvertGuide />
    </div>
  )
}
