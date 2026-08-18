import JsonEditor from "./components/JsonEditor"
import JsonViewer from "./components/JsonViewer"
import ToolPageHeader from "../../../components/tool/ToolPageHeader"
import { useJsonTool } from "./hooks/useJsonTool"
import "./index.scss"

export default function JsonTool() {
  const json = useJsonTool()

  return (
    <div className="json-tool-page">
      <ToolPageHeader
        title="JSON Formatter & Validator"
        description="Easily format, compress, and validate your JSON data! Extract specific element paths instantly using the Interactive Tree."
      />

      <div className="json-layout">
        <JsonEditor
          inputVal={json.inputVal}
          isValid={json.isValid}
          stats={json.stats}
          onInputChange={json.setInput}
          onFormat={json.formatJson}
          onMinify={json.minifyJson}
          copyValue={json.formattedJson}
          onDownload={json.downloadJson}
          onLoadExample={json.loadExample}
          onClear={json.clearJson}
          onFile={json.processFile}
        />
        <JsonViewer analysis={json.analysis} isParsing={json.isParsing} />
      </div>
    </div>
  )
}
