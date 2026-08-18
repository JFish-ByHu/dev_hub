import { useState } from "react"
import type { DragEvent } from "react"
import { Button, Space, Typography, Upload, Input } from "antd"
import ToolCard from "../../../../components/tool/ToolCard"
import {
  BulbOutlined,
  ClearOutlined,
  DownloadOutlined,
  FormatPainterOutlined,
  UploadOutlined
} from "@ant-design/icons"
import CopyButton from "../../../../components/CopyButton"
import { MAX_JSON_INPUT_CHARACTERS } from "../utils/json"

const { TextArea } = Input
const { Text } = Typography

interface JsonStats {
  characters: number
  bytes: number
  lines: number
}

interface JsonEditorProps {
  inputVal: string
  isValid: boolean
  stats: JsonStats
  onInputChange: (value: string) => void
  onFormat: () => void
  onMinify: () => void
  copyValue: string
  onDownload: () => void
  onLoadExample: () => void
  onClear: () => void
  onFile: (file: File) => Promise<void>
}

export default function JsonEditor({
  inputVal,
  isValid,
  stats,
  onInputChange,
  onFormat,
  onMinify,
  copyValue,
  onDownload,
  onLoadExample,
  onClear,
  onFile
}: JsonEditorProps) {
  const [isDragging, setIsDragging] = useState(false)

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setIsDragging(false)
    const file = event.dataTransfer.files[0]
    if (file) void onFile(file)
  }

  return (
    <ToolCard title="Raw JSON Input" className="json-card" bordered={false}>
      <Space className="toolbar" wrap style={{ marginBottom: 16 }}>
        <Button
          type="primary"
          icon={<FormatPainterOutlined />}
          onClick={onFormat}
          disabled={!isValid}
        >
          Format
        </Button>
        <Button onClick={onMinify} disabled={!isValid}>
          Minify
        </Button>
        <CopyButton value={copyValue} disabled={!isValid} />
        <Button icon={<DownloadOutlined />} onClick={onDownload} disabled={!isValid}>
          Download
        </Button>
        <Upload
          beforeUpload={(file) => {
            void onFile(file)
            return false
          }}
          showUploadList={false}
          accept=".json,application/json"
        >
          <Button icon={<UploadOutlined />}>Upload</Button>
        </Upload>
        <Button icon={<BulbOutlined />} onClick={onLoadExample}>
          Example
        </Button>
        <Button danger icon={<ClearOutlined />} onClick={onClear} disabled={!inputVal}>
          Clear
        </Button>
      </Space>

      <div
        className={`textarea-wrapper ${isDragging ? "dragging" : ""}`}
        onDragOver={(event) => {
          event.preventDefault()
          setIsDragging(true)
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
      >
        <div className="drag-overlay">
          <UploadOutlined style={{ color: "var(--primary)", marginRight: 8, fontSize: 64 }} />
          Drop JSON file here to parse
        </div>
        <TextArea
          className="json-textarea"
          placeholder="Paste your JSON string here, or drag and drop a .json file..."
          value={inputVal}
          onChange={(event) => onInputChange(event.target.value)}
          spellCheck={false}
        />
      </div>
      <div className="json-input-stats">
        <Text type="secondary">{stats.characters.toLocaleString()} characters</Text>
        <Text type="secondary">{stats.bytes.toLocaleString()} bytes</Text>
        <Text type="secondary">{stats.lines.toLocaleString()} lines</Text>
        {!isValid && inputVal.trim() && <Text type="warning">Invalid JSON</Text>}
        {isValid && <Text type="success">Valid JSON</Text>}
      </div>
      <Text type="secondary">
        Live validation waits briefly after typing. Input is limited to{" "}
        {MAX_JSON_INPUT_CHARACTERS.toLocaleString()} characters.
      </Text>
    </ToolCard>
  )
}
