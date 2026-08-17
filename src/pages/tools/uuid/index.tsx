import { Tag } from "antd"
import { KeyOutlined } from "@ant-design/icons"
import UuidGuide from "./components/UuidGuide"
import UuidOptions from "./components/UuidOptions"
import UuidResultCard from "./components/UuidResultCard"
import { useUuidGenerator } from "./hooks/useUuidGenerator"
import "./index.scss"

export default function UuidTool() {
  const generator = useUuidGenerator()

  return (
    <div className="uuid-tool-page">
      <div className="tool-header">
        <div>
          <h1 className="tool-title">UUID & ID Generator</h1>
          <p className="tool-desc">
            Generate secure UUID v4 or time-ordered UUID v7 identifiers in batches, with flexible
            formatting options.
          </p>
        </div>
        <Tag icon={<KeyOutlined />} color="blue">
          Local browser generation
        </Tag>
      </div>

      <UuidOptions
        version={generator.version}
        count={generator.count}
        uppercase={generator.uppercase}
        hyphens={generator.hyphens}
        onVersionChange={generator.setVersion}
        onCountChange={generator.setCount}
        onUppercaseChange={generator.setUppercase}
        onHyphensChange={generator.setHyphens}
        onGenerate={generator.regenerate}
      />

      <UuidResultCard
        version={generator.version}
        values={generator.values}
        onClear={generator.clear}
      />

      <UuidGuide />
    </div>
  )
}
