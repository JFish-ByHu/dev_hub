import { Tag } from "antd"
import { FileMarkdownOutlined } from "@ant-design/icons"
import { useRef, useState } from "react"
import type { TextAreaRef } from "antd/es/input/TextArea"
import MarkdownEditorCard from "./components/MarkdownEditorCard"
import MarkdownGuide from "./components/MarkdownGuide"
import MarkdownPreviewCard from "./components/MarkdownPreviewCard"
import { useMarkdownEditor } from "./hooks/useMarkdownEditor"
import "./index.scss"

export default function MarkdownTool() {
  const editor = useMarkdownEditor()
  const editorRef = useRef<TextAreaRef>(null)
  const previewRef = useRef<HTMLElement>(null)
  const syncingRef = useRef(false)
  const [syncScroll, setSyncScroll] = useState(true)

  const syncScrollPosition = (source: HTMLElement | null, target: HTMLElement | null) => {
    if (!syncScroll || syncingRef.current || !source || !target) return

    const sourceMax = source.scrollHeight - source.clientHeight
    const targetMax = target.scrollHeight - target.clientHeight
    const progress = sourceMax > 0 ? source.scrollTop / sourceMax : 0

    syncingRef.current = true
    target.scrollTop = progress * Math.max(targetMax, 0)
    requestAnimationFrame(() => {
      syncingRef.current = false
    })
  }

  const handleEditorScroll = () => {
    syncScrollPosition(editorRef.current?.nativeElement ?? null, previewRef.current)
  }

  const handlePreviewScroll = () => {
    syncScrollPosition(previewRef.current, editorRef.current?.nativeElement ?? null)
  }

  return (
    <div className="markdown-tool-page">
      <div className="tool-header">
        <div>
          <h1 className="tool-title">Markdown Editor & Preview</h1>
          <p className="tool-desc">
            Write GitHub Flavored Markdown, preview the result live, and download a clean Markdown
            document locally.
          </p>
        </div>
        <Tag icon={<FileMarkdownOutlined />} color="blue">
          GFM · Sanitized preview
        </Tag>
      </div>

      <div className="markdown-editor-grid">
        <MarkdownEditorCard
          value={editor.value}
          stats={editor.stats}
          assets={editor.assets}
          textareaRef={editorRef}
          syncScroll={syncScroll}
          onChange={editor.setValue}
          onMarkdownFileLoad={editor.loadMarkdown}
          onAddAsset={editor.addAsset}
          onExample={editor.loadExample}
          onClear={editor.clear}
          onSyncScrollChange={setSyncScroll}
          onScroll={handleEditorScroll}
        />
        <MarkdownPreviewCard
          value={editor.value}
          assets={editor.assets}
          contentRef={previewRef}
          onScroll={handlePreviewScroll}
        />
      </div>

      <MarkdownGuide />
    </div>
  )
}
