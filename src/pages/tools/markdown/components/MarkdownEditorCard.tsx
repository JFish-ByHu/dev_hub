import { Button, Card, Input, message, Space, Switch, Typography, Upload } from "antd"
import {
  BulbOutlined,
  ClearOutlined,
  DownloadOutlined,
  FileMarkdownOutlined,
  PictureOutlined,
  UploadOutlined
} from "@ant-design/icons"
import { useState } from "react"
import type { RefObject } from "react"
import type { TextAreaRef } from "antd/es/input/TextArea"
import CopyButton from "../../../../components/CopyButton"
import {
  downloadMarkdown,
  expandMarkdownAssets,
  type MarkdownAssetMap,
  type MarkdownStats
} from "../utils/markdown"

const { TextArea } = Input
const { Text } = Typography

interface MarkdownEditorCardProps {
  value: string
  stats: MarkdownStats
  assets: MarkdownAssetMap
  textareaRef: RefObject<TextAreaRef | null>
  syncScroll: boolean
  onChange: (value: string) => void
  onMarkdownFileLoad: (value: string) => void
  onAddAsset: (dataUrl: string) => string
  onExample: () => void
  onClear: () => void
  onSyncScrollChange: (value: boolean) => void
  onScroll: () => void
}

export default function MarkdownEditorCard({
  value,
  stats,
  assets,
  textareaRef,
  syncScroll,
  onChange,
  onMarkdownFileLoad,
  onAddAsset,
  onExample,
  onClear,
  onSyncScrollChange,
  onScroll
}: MarkdownEditorCardProps) {
  const [isReadingImage, setIsReadingImage] = useState(false)
  const [isDraggingMarkdown, setIsDraggingMarkdown] = useState(false)

  const readMarkdownFile = (file: File) => {
    const isMarkdownFile =
      /\.(md|markdown)$/i.test(file.name) ||
      file.type === "text/markdown" ||
      file.type === "text/plain"
    if (!isMarkdownFile) {
      message.warning("Please choose a Markdown file (.md or .markdown).")
      return
    }

    if (file.size > 10 * 1024 * 1024) {
      message.error("Markdown files must be smaller than 10 MB.")
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      const text = typeof reader.result === "string" ? reader.result : ""
      onMarkdownFileLoad(text)
      message.success(`${file.name} loaded successfully`)
    }
    reader.onerror = () => message.error("The Markdown file could not be read.")
    reader.readAsText(file)
  }

  const insertImage = (file: File) => {
    if (!/^image\/(png|jpe?g|gif|webp)$/i.test(file.type)) {
      message.warning("Please choose a PNG, JPG, GIF, or WebP image.")
      return
    }

    if (file.size > 10 * 1024 * 1024) {
      message.error("Images must be smaller than 10 MB.")
      return
    }

    setIsReadingImage(true)
    const reader = new FileReader()
    reader.onload = () => {
      const dataUrl = typeof reader.result === "string" ? reader.result : ""
      if (!dataUrl) {
        message.error("The image could not be read.")
        setIsReadingImage(false)
        return
      }

      const textarea = textareaRef.current?.nativeElement as HTMLTextAreaElement | null
      const start = textarea?.selectionStart ?? value.length
      const end = textarea?.selectionEnd ?? value.length
      const alt =
        file.name
          .replace(/\.[^.]+$/, "")
          .replace(/[\r\n]+/g, " ")
          .trim() || "pasted-image"
      const reference = onAddAsset(dataUrl)
      const imageMarkdown = `\n![${alt}](${reference})\n`
      onChange(`${value.slice(0, start)}${imageMarkdown}${value.slice(end)}`)
      setIsReadingImage(false)
      message.success("Image inserted into Markdown")

      requestAnimationFrame(() => {
        textarea?.focus()
        const cursor = start + imageMarkdown.length
        textarea?.setSelectionRange(cursor, cursor)
      })
    }
    reader.onerror = () => {
      setIsReadingImage(false)
      message.error("The image could not be read.")
    }
    reader.readAsDataURL(file)
  }

  const handlePaste = (event: React.ClipboardEvent<HTMLTextAreaElement>) => {
    const imageItem = Array.from(event.clipboardData.items).find((item) =>
      item.type.startsWith("image/")
    )
    const file = imageItem?.getAsFile()
    if (!file) return

    event.preventDefault()
    insertImage(file)
  }

  return (
    <Card title="Markdown input" className="markdown-card markdown-editor-card" bordered={false}>
      <div className="markdown-toolbar">
        <Space className="markdown-toolbar-group" wrap>
          <Button icon={<BulbOutlined />} onClick={onExample}>
            Example
          </Button>
          <CopyButton value={expandMarkdownAssets(value, assets)} disabled={!value} />
          <Button
            icon={<DownloadOutlined />}
            onClick={() => downloadMarkdown(value, assets)}
            disabled={!value}
          >
            Download .md
          </Button>
          <Button danger icon={<ClearOutlined />} onClick={onClear} disabled={!value}>
            Clear
          </Button>
        </Space>
        <Space className="markdown-toolbar-group markdown-toolbar-secondary" wrap>
          <Upload
            accept=".md,.markdown,text/markdown,text/plain"
            showUploadList={false}
            beforeUpload={(file) => {
              readMarkdownFile(file)
              return false
            }}
          >
            <Button icon={<FileMarkdownOutlined />}>Upload .md</Button>
          </Upload>
          <Upload
            accept="image/*"
            showUploadList={false}
            beforeUpload={(file) => {
              insertImage(file)
              return false
            }}
          >
            <Button icon={<PictureOutlined />} loading={isReadingImage}>
              Add image
            </Button>
          </Upload>
          <span className="markdown-sync-control">
            <Switch size="small" checked={syncScroll} onChange={onSyncScrollChange} />
            <Text type="secondary">Sync scroll</Text>
          </span>
        </Space>
      </div>
      <div
        className={`markdown-editor-dropzone ${isDraggingMarkdown ? "dragging" : ""}`}
        onDragOver={(event) => {
          event.preventDefault()
          event.dataTransfer.dropEffect = "copy"
          setIsDraggingMarkdown(true)
        }}
        onDragLeave={() => setIsDraggingMarkdown(false)}
        onDrop={(event) => {
          event.preventDefault()
          setIsDraggingMarkdown(false)
          const file = event.dataTransfer.files[0]
          if (file) readMarkdownFile(file)
        }}
      >
        <div className="markdown-drag-overlay">
          <UploadOutlined />
          <span>Drop a Markdown file here</span>
        </div>
        <TextArea
          ref={textareaRef}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onScroll={onScroll}
          onPaste={handlePaste}
          placeholder="Write Markdown here, or drop a .md file..."
          spellCheck={false}
          className="markdown-textarea"
        />
      </div>
      <Text type="secondary" className="markdown-image-hint">
        Paste an image directly into the editor or use “Add image”. Images use short local
        references while editing and are embedded when you copy or download the Markdown file. Each
        image is limited to 10 MB.
      </Text>
      <div className="markdown-stats">
        <Text type="secondary">{stats.characters.toLocaleString()} characters</Text>
        <Text type="secondary">{stats.words.toLocaleString()} words</Text>
        <Text type="secondary">{stats.lines.toLocaleString()} lines</Text>
        <Text type="secondary">{stats.bytes.toLocaleString()} bytes</Text>
      </div>
    </Card>
  )
}
