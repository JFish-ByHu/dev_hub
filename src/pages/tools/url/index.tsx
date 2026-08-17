import { Tag } from "antd"
import { LinkOutlined } from "@ant-design/icons"
import UrlDetailsCard from "./components/UrlDetailsCard"
import UrlGuide from "./components/UrlGuide"
import UrlInputCard from "./components/UrlInputCard"
import UrlOptions from "./components/UrlOptions"
import UrlResultCard from "./components/UrlResultCard"
import { useUrlCodec } from "./hooks/useUrlCodec"
import "./index.scss"

export default function UrlTool() {
  const url = useUrlCodec()

  return (
    <div className="url-tool-page">
      <div className="tool-header">
        <div>
          <h1 className="tool-title">URL Encoder & Decoder</h1>
          <p className="tool-desc">
            Encode complete URLs or individual components, decode percent-encoded values, and
            inspect absolute URL parts.
          </p>
        </div>
        <Tag icon={<LinkOutlined />} color="blue">
          Runs locally in your browser
        </Tag>
      </div>

      <UrlOptions
        operation={url.operation}
        encodingMode={url.encodingMode}
        onOperationChange={url.setOperation}
        onEncodingModeChange={url.setEncodingMode}
      />

      <div className="url-converter-grid">
        <UrlInputCard
          operation={url.operation}
          input={url.input}
          stats={url.inputStats}
          onInputChange={url.setInput}
          onSwap={url.swapValues}
          onExample={url.loadExample}
          onClear={url.clear}
          canSwap={url.conversion.kind === "success"}
        />
        <UrlResultCard
          operation={url.operation}
          conversion={url.conversion}
          outputStats={url.outputStats}
        />
      </div>

      <UrlDetailsCard details={url.details} />
      <UrlGuide />
    </div>
  )
}
