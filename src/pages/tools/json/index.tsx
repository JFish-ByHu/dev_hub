import JsonEditor from "./components/JsonEditor"
import JsonViewer from "./components/JsonViewer"
import { useJsonTool } from "./hooks/useJsonTool"
import "./index.scss"

export default function JsonTool() {
  const json = useJsonTool()

  return (
    <div className="json-tool-page">
      <div className="tool-header">
        <h1 className="tool-title">JSON Formatter & Validator</h1>
        <p className="tool-desc">
          Easily format, compress, and validate your JSON data! Extract specific element paths
          instantly using the Interactive Tree.
        </p>
      </div>

      <div className="json-layout">
        <JsonEditor
          inputVal={json.inputVal}
          isValid={json.isValid}
          stats={json.stats}
          onInputChange={json.parseAndSet}
          onFormat={json.formatJson}
          onMinify={json.minifyJson}
          copyValue={json.formattedJson}
          onDownload={json.downloadJson}
          onLoadExample={json.loadExample}
          onClear={json.clearJson}
          onFile={json.processFile}
        />
        <JsonViewer inputVal={json.inputVal} parsedData={json.parsedData} error={json.error} />
      </div>
    </div>
  )
}
