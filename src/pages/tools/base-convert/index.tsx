import { Tag } from "antd"
import { CalculatorOutlined } from "@ant-design/icons"
import ToolPageHeader from "../../../components/tool/ToolPageHeader"
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
      <ToolPageHeader
        title="Base Converter"
        description="Convert exact integer values between binary, octal, decimal, and hexadecimal representations."
        extra={
          <Tag icon={<CalculatorOutlined />} color="blue">
            Arbitrary-precision integers
          </Tag>
        }
      />

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
