import { useMemo, useState } from "react"
import type { Key } from "react"
import { Alert, Button, Card, Divider, Space, Tree, Typography } from "antd"
import type { DataNode, TreeProps } from "antd/es/tree"
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  CompressOutlined,
  CopyOutlined,
  ExpandOutlined
} from "@ant-design/icons"
import { buildTree } from "../utils/treeBuilder"
import { collectExpandableKeys, toJsonPath } from "../utils/json"

const { Text, Paragraph } = Typography

interface JsonViewerProps {
  inputVal: string
  parsedData: unknown | undefined
  error: string | null
}

function containsTreeKey(nodes: DataNode[], key: Key): boolean {
  return nodes.some(
    (node) => node.key === key || (node.children ? containsTreeKey(node.children, key) : false)
  )
}

export default function JsonViewer({ inputVal, parsedData, error }: JsonViewerProps) {
  const [selectedKey, setSelectedKey] = useState<Key | null>(null)
  const [expandedKeys, setExpandedKeys] = useState<Key[]>(["root"])

  const treeData = useMemo<DataNode[]>(() => {
    if (parsedData === undefined) return []
    return [buildTree(parsedData)]
  }, [parsedData])

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

  return (
    <Card title="Interactive Tree View" className="json-card" bordered={false}>
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

      {parsedData !== undefined && (
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
        {parsedData !== undefined ? (
          <Tree
            showLine
            treeData={treeData}
            expandedKeys={visibleExpandedKeys}
            onExpand={(keys) => setExpandedKeys(keys)}
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
