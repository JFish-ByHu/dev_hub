import type { DataNode } from "antd/es/tree"
import type { JsonTreeNode } from "./jsonTree"

function renderNodeTitle(node: JsonTreeNode) {
  const isContainer = node.type === "array" || node.type === "object"
  const metaInfo = isContainer
    ? `${node.type === "array" ? "Array" : "Object"} ${node.type === "array" ? `[${node.size ?? 0}]` : `{${node.size ?? 0}}`}${node.truncated ? " · truncated" : ""}`
    : undefined

  return (
    <span className="json-tree-node">
      <span className="json-key">{JSON.stringify(node.name)}</span>:{" "}
      {metaInfo ? (
        <span className="json-meta">{metaInfo}</span>
      ) : (
        <span className={`json-val-${node.type}`}>{node.value}</span>
      )}
    </span>
  )
}

export function buildTree(node: JsonTreeNode): DataNode {
  const children = node.children?.map(buildTree)
  return {
    key: node.key,
    title: renderNodeTitle(node),
    isLeaf: !children?.length,
    ...(children?.length ? { children } : {})
  }
}
