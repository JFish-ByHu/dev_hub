import React, { useState } from "react"
import { Input, Button, Space, message, Card, Upload } from "antd"
import { UploadOutlined } from "@ant-design/icons"

const { TextArea } = Input

interface JsonEditorProps {
  inputVal: string
  setInputVal: (val: string) => void
  parsedData: unknown
  setParsedData: (data: unknown) => void
  setError: (err: string | null) => void
}

export default function JsonEditor({
  inputVal,
  setInputVal,
  parsedData,
  setParsedData,
  setError
}: JsonEditorProps) {
  const [isDragging, setIsDragging] = useState(false)

  // 1. 处理输入和校验
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value
    setInputVal(val)

    if (!val.trim()) {
      setParsedData(null)
      setError(null)
      return
    }

    try {
      const data = JSON.parse(val)
      setParsedData(data)
      setError(null)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Invalid JSON format")
      setParsedData(null)
    }
  }

  // 2. 格式化 & 压缩
  const formatJson = () => {
    if (parsedData !== null) {
      setInputVal(JSON.stringify(parsedData, null, 2))
      message.success("JSON formatted successfully")
    }
  }

  const minifyJson = () => {
    if (parsedData !== null) {
      setInputVal(JSON.stringify(parsedData))
      message.success("JSON minified successfully")
    }
  }

  const clearJson = () => {
    setInputVal("")
    setParsedData(null)
    setError(null)
  }

  // 3. 处理文件上传与拖拽
  const processFile = (file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const val = e.target?.result as string
      setInputVal(val)

      if (!val.trim()) {
        setParsedData(null)
        setError(null)
        return
      }

      try {
        const data = JSON.parse(val)
        setParsedData(data)
        setError(null)
        message.success("File parsed successfully")
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Invalid JSON format")
        setParsedData(null)
        message.error("Failed to parse file: Invalid JSON")
      }
    }
    reader.readAsText(file)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) {
      processFile(file)
    }
  }

  return (
    <Card title="Raw JSON Input" className="json-card" bordered={false}>
      <Space className="toolbar" style={{ marginBottom: 16 }}>
        <Button type="primary" onClick={formatJson} disabled={!parsedData}>
          Format
        </Button>
        <Button onClick={minifyJson} disabled={!parsedData}>
          Minify
        </Button>
        <Upload
          beforeUpload={(file) => {
            processFile(file)
            return false // 阻止默认上传动作
          }}
          showUploadList={false}
          accept=".json"
        >
          <Button icon={<UploadOutlined />}>Upload</Button>
        </Upload>
        <Button danger onClick={clearJson} disabled={!inputVal}>
          Clear
        </Button>
      </Space>

      <div
        className={`textarea-wrapper ${isDragging ? "dragging" : ""}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
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
          onChange={handleInputChange}
          spellCheck={false}
        />
      </div>
    </Card>
  )
}
