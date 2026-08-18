import { useMemo, useState } from "react"
import type { Key } from "react"
import { Alert, Button, Divider, Space, Tree, Typography } from "antd"
import ToolCard from "../../../../components/tool/ToolCard"
import type { DataNode, TreeProps } from "antd/es/tree"
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  CompressOutlined,
  CopyOutlined,
  ExpandOutlined
} from "@ant-design/icons"
import type { JsonAnalysis } from "../utils/json"
import { collectExpandableKeys, toJsonPath } from "../utils/json"
import { MAX_JSON_TREE_DEPTH } from "../utils/jsonTree"
import { buildTree } from "../utils/treeBuilder"

const { Text, Paragraph } = Typography

interface JsonViewerProps {
  analysis: JsonAnalysis
  isParsing: boolean
}

function containsTreeKey(nodes: DataNode[], key: Key): boolean {
  return nodes.some(
    (node) => node.key === key || (node.children ? containsTreeKey(node.children, key) : false)
  )
}

export default function JsonViewer({ analysis, isParsing }: JsonViewerProps) {
  const [selectedKey, setSelectedKey] = useState<Key | null>(null)
  const [expandedKeys, setExpandedKeys] = useState<Key[]>(["root"])

  const treeData = useMemo<DataNode[]>(() => {
    if (analysis.kind !== "success") return []
    return [buildTree(analysis.tree)]
  }, [analysis])

  const expandableKeys = useMemo(() => collectExpandableKeys(treeData), [treeData])

  const selectedPath = useMemo(() => {
    if (selectedKey === null) return ""
    const keyExists = containsTreeKey(treeData, selectedKey)
    return keyExists ? toJsonPath(String(selectedKey)) : ""
  }, [selectedKey, treeData])

  const visibleExpandedKeys = useMemo(
    () => expandedKeys.filter((key) => expandableKeys.includes(key) || key === "root"),
    [expandableKeys, expandedKeys]
  )

  const handleSelect: TreeProps["onSelect"] = (selectedKeys) => {
    setSelectedKey(selectedKeys.length > 0 ? selectedKeys[0] : null)
  }

  const isEmpty = analysis.kind === "empty"
  const isError = analysis.kind === "error"
  const isSuccess = analysis.kind === "success"

  return (
    <ToolCard title="Interactive Tree View" className="json-card" bordered={false}>
      <div className="status-bar" style={{ marginBottom: 16 }}>
        {isEmpty ? (
          <Alert message="Awaiting Input" type="info" showIcon />
        ) : isError ? (
          <Alert
            message="Validation Failed"
            description={analysis.error}
            type="error"
            showIcon
            icon={<CloseCircleOutlined />}
          />
        ) : analysis.kind === "pending" || isParsing ? (
          <Alert
            message="Analyzing JSON"
            description="The tree will update shortly."
            type="info"
            showIcon
          />
        ) : (
          <Alert message="Valid JSON" type="success" showIcon icon={<CheckCircleOutlined />} />
        )}
        {isSuccess &&
          (analysis.treeMeta.depthLimitReached || analysis.treeMeta.nodeLimitReached) && (
            <Alert
              message="Tree view was limited for responsiveness"
              description={`Showing up to ${analysis.treeMeta.nodeCount.toLocaleString()} nodes and ${MAX_JSON_TREE_DEPTH} levels. Formatting and downloading still include the complete JSON.`}
              type="warning"
              showIcon
              style={{ marginTop: 8 }}
            />
          )}
      </div>

      {isSuccess && (
        <div className="path-extractor" style={{ marginBottom: 16 }}>
          <div className="path-toolbar">
            <Text type="secondary">Selected Node Path:</Text>
            <Space size="small">
              <Button
                size="small"
                icon={<ExpandOutlined />}
                onClick={() => setExpandedKeys(expandableKeys)}
                disabled={!expandableKeys.length}
              >
                Expand all
              </Button>
              <Button
                size="small"
                icon={<CompressOutlined />}
                onClick={() => setExpandedKeys([])}
                disabled={!expandableKeys.length}
              >
                Collapse all
              </Button>
            </Space>
          </div>
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
            <div className="path-code empty">Click a node to extract its JSONPath...</div>
          )}
        </div>
      )}

      <Divider style={{ margin: "16px 0" }} />

      <div className="json-tree-container">
        {isSuccess ? (
          <Tree
            showLine
            treeData={treeData}
            expandedKeys={visibleExpandedKeys}
            onExpand={(keys) => setExpandedKeys(keys)}
            onSelect={handleSelect}
            className="custom-json-tree"
          />
        ) : (
          <div className="empty-placeholder">
            {analysis.kind === "pending" || isParsing
              ? "Analyzing JSON tree..."
              : "Tree view will appear here upon valid entry."}
          </div>
        )}
      </div>
    </ToolCard>
  )
}
