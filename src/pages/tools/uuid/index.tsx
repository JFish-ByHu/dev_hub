import { Tag } from "antd"
import { KeyOutlined } from "@ant-design/icons"
import ToolPageHeader from "../../../components/tool/ToolPageHeader"
import UuidGuide from "./components/UuidGuide"
import UuidOptions from "./components/UuidOptions"
import UuidResultCard from "./components/UuidResultCard"
import { useUuidGenerator } from "./hooks/useUuidGenerator"
import "./index.scss"

export default function UuidTool() {
  const generator = useUuidGenerator()

  return (
    <div className="uuid-tool-page">
      <ToolPageHeader
        title="UUID & ID Generator"
        description="Generate secure UUID v4 or time-ordered UUID v7 identifiers in batches, with flexible formatting options."
        extra={
          <Tag icon={<KeyOutlined />} color="blue">
            Local browser generation
          </Tag>
        }
      />

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
