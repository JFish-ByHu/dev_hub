import { Tag } from "antd"
import { FileTextOutlined } from "@ant-design/icons"
import ToolPageHeader from "../../../components/tool/ToolPageHeader"
import Base64Guide from "./components/Base64Guide"
import Base64InputCard from "./components/Base64InputCard"
import Base64Options from "./components/Base64Options"
import Base64ResultCard from "./components/Base64ResultCard"
import { useBase64Conversion } from "./hooks/useBase64Conversion"
import "./index.scss"

export default function Base64Tool() {
  const base64 = useBase64Conversion()

  return (
    <div className="base64-tool-page">
      <ToolPageHeader
        title="Base64 Encoder & Decoder"
        description="Encode UTF-8 text and files, or decode Base64 values with standard and URL-safe alphabet support."
        extra={
          <Tag icon={<FileTextOutlined />} color="blue">
            Local processing only
          </Tag>
        }
      />

      <Base64Options
        mode={base64.mode}
        variant={base64.variant}
        includePadding={base64.includePadding}
        onModeChange={base64.changeMode}
        onVariantChange={base64.setVariant}
        onPaddingChange={base64.setIncludePadding}
      />

      <div className="base64-converter-grid">
        <Base64InputCard
          mode={base64.mode}
          input={base64.input}
          fileBytes={base64.fileBytes}
          fileName={base64.fileName}
          onTextChange={base64.setTextInput}
          onFile={base64.processFile}
          onClear={base64.clearInput}
          onModeChange={base64.changeMode}
        />
        <Base64ResultCard
          conversion={base64.conversion}
          outputValue={base64.outputValue}
          isBinaryDecode={base64.isBinaryDecode}
          sourceFileName={base64.fileName}
        />
      </div>

      <Base64Guide />
    </div>
  )
}
