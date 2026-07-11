import { useState } from "react"
import JsonEditor from "./components/JsonEditor"
import JsonViewer from "./components/JsonViewer"
import "./index.scss"

export default function JsonTool() {
  const [inputVal, setInputVal] = useState("")
  const [parsedData, setParsedData] = useState<unknown>(null)
  const [error, setError] = useState<string | null>(null)

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
          inputVal={inputVal}
          setInputVal={setInputVal}
          parsedData={parsedData}
          setParsedData={setParsedData}
          setError={setError}
        />
        <JsonViewer inputVal={inputVal} parsedData={parsedData} error={error} />
      </div>
    </div>
  )
}
