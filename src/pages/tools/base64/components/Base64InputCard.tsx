import { useState } from "react"
import { Button, Card, Input, Tag, Typography, Upload } from "antd"
import { ClearOutlined, FileTextOutlined, SwapOutlined, UploadOutlined } from "@ant-design/icons"
import type { ConversionMode } from "../hooks/useBase64Conversion"

const { TextArea } = Input
const { Text } = Typography

interface Base64InputCardProps {
  mode: ConversionMode
  input: string
  fileBytes: Uint8Array | null
  fileName: string | null
  onTextChange: (value: string) => void
  onFile: (file: File) => Promise<void>
  onClear: () => void
  onModeChange: (mode: ConversionMode) => void
}

export default function Base64InputCard({
  mode,
  input,
  fileBytes,
  fileName,
  onTextChange,
  onFile,
  onClear,
  onModeChange
}: Base64InputCardProps) {
  const [isDragging, setIsDragging] = useState(false)

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setIsDragging(false)
    const file = event.dataTransfer.files[0]
    if (file) void onFile(file)
  }

  return (
    <Card
      title={mode === "encode" ? "Text or File Input" : "Base64 Input"}
      extra={
        <Tag color={mode === "encode" ? "purple" : "cyan"}>
          {mode === "encode" ? "UTF-8" : "Whitespace tolerant"}
        </Tag>
      }
      className="base64-card"
      bordered={false}
    >
      {fileName && (
        <div className="loaded-file">
          <FileTextOutlined />
          <Text ellipsis={{ tooltip: fileName }}>{fileName}</Text>
          <Button type="link" size="small" onClick={onClear}>
            Remove
          </Button>
        </div>
      )}
      <div
        className={`base64-textarea-wrapper ${isDragging ? "dragging" : ""}`}
        onDragOver={(event) => {
          event.preventDefault()
          setIsDragging(true)
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
      >
        <div className="drag-overlay">
          <UploadOutlined style={{ fontSize: 48 }} />
          Drop a file here
        </div>
        <TextArea
          value={input}
          onChange={(event) => onTextChange(event.target.value)}
          disabled={Boolean(fileBytes)}
          spellCheck={false}
          placeholder={
            mode === "encode"
              ? "Type or paste UTF-8 text here, or upload a file..."
              : "Paste a Base64 value here. Spaces and line breaks are ignored..."
          }
          className="base64-textarea"
        />
      </div>
      <div className="input-actions">
        <Upload
          beforeUpload={(file) => {
            void onFile(file)
            return false
          }}
          showUploadList={false}
        >
          <Button icon={<UploadOutlined />}>Upload file</Button>
        </Upload>
        <Button
          icon={<SwapOutlined />}
          onClick={() => onModeChange(mode === "encode" ? "decode" : "encode")}
        >
          Switch to {mode === "encode" ? "decode" : "encode"}
        </Button>
        <Button danger icon={<ClearOutlined />} onClick={onClear} disabled={!input && !fileBytes}>
          Clear
        </Button>
      </div>
      <Text type="secondary" className="input-hint">
        {mode === "encode"
          ? "Text is encoded as UTF-8. Files are read locally and never uploaded."
          : "Both standard Base64 and Base64URL values are accepted, with or without padding."}
      </Text>
    </Card>
  )
}
