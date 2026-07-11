import { useState, useMemo } from "react"
import { Tree, Typography, Alert, Card, Divider } from "antd"
import type { TreeProps } from "antd/es/tree"
import { CopyOutlined, CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons"
import { buildTree } from "../utils/treeBuilder"

const { Text, Paragraph } = Typography

interface JsonViewerProps {
  inputVal: string
  parsedData: unknown
  error: string | null
}

export default function JsonViewer({ inputVal, parsedData, error }: JsonViewerProps) {
  const [selectedPath, setSelectedPath] = useState<string>("")

  const treeData = useMemo(() => {
    if (parsedData !== null) {
      // 如果是最外层的对象或数组
      if (typeof parsedData === "object") {
        return [buildTree(parsedData)]
      }
      // 对于纯字面量（极少但在合法 JSON 中允许），直接展示
      return [
        {
          key: "root",
          title: String(parsedData), // fallback
          isLeaf: true
        }
      ]
    }
    return []
  }, [parsedData])

  // 选择节点，提取路径
  const handleSelect: TreeProps["onSelect"] = (selectedKeys) => {
    if (selectedKeys.length > 0) {
      const path = String(selectedKeys[0]).replace(/^root\.?/, "") // 剔除根节点前缀
      setSelectedPath(path || "root")
    }
  }

  return (
    <Card title="Interactive Tree View" className="json-card" bordered={false}>
      {/* 状态检测栏 */}
      <div className="status-bar" style={{ marginBottom: 16 }}>
        {inputVal.trim() === "" ? (
          <Alert message="Awaiting Input" type="info" showIcon />
        ) : error ? (
          <Alert
            message="Validation Failed"
            description={error}
            type="error"
            showIcon
            icon={<CloseCircleOutlined />}
          />
        ) : (
          <Alert message="Valid JSON" type="success" showIcon icon={<CheckCircleOutlined />} />
        )}
      </div>

      {/* 路径提取工具栏 */}
      {parsedData !== null && (
        <div className="path-extractor" style={{ marginBottom: 16 }}>
          <Text type="secondary">Selected Node Path:</Text>
          {selectedPath ? (
            <Paragraph
              copyable={{
                text: selectedPath,
                icon: [<CopyOutlined key="copy" />, <CheckCircleOutlined key="check" />]
              }}
              className="path-code"
            >
              {selectedPath}
            </Paragraph>
          ) : (
            <div className="path-code empty">Click a node to extract its path...</div>
          )}
        </div>
      )}

      <Divider style={{ margin: "16px 0" }} />

      {/* 树视图区域 */}
      <div className="json-tree-container">
        {parsedData !== null ? (
          <Tree
            showLine
            treeData={treeData}
            defaultExpandedKeys={["root"]}
            onSelect={handleSelect}
            className="custom-json-tree"
          />
        ) : (
          <div className="empty-placeholder">Tree view will appear here upon valid entry.</div>
        )}
      </div>
    </Card>
  )
}
