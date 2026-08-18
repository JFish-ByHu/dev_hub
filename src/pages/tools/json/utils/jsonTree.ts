export type JsonTreeNodeType = "array" | "object" | "string" | "number" | "boolean" | "null"

export interface JsonTreeNode {
  key: string
  name: string
  type: JsonTreeNodeType
  value?: string
  size?: number
  children?: JsonTreeNode[]
  truncated?: boolean
}

export interface JsonTreeMeta {
  nodeCount: number
  depthLimitReached: boolean
  nodeLimitReached: boolean
}

export interface JsonTreeResult {
  root: JsonTreeNode
  meta: JsonTreeMeta
}

export const MAX_JSON_TREE_NODES = 5_000
export const MAX_JSON_TREE_DEPTH = 32

const appendObjectPath = (currentPath: string, key: string) =>
  /^[A-Za-z_$][\w$]*$/.test(key)
    ? `${currentPath}.${key}`
    : `${currentPath}[${JSON.stringify(key)}]`

function getNodeType(value: unknown): JsonTreeNodeType {
  if (value === null) return "null"
  if (Array.isArray(value)) return "array"
  if (typeof value === "object") return "object"
  return typeof value as Exclude<JsonTreeNodeType, "array" | "object" | "null">
}

function createNode(value: unknown, key: string, name: string): JsonTreeNode {
  const type = getNodeType(value)
  if (type === "array") return { key, name, type, size: (value as unknown[]).length }
  if (type === "object") return { key, name, type, size: Object.keys(value as object).length }

  return {
    key,
    name,
    type,
    value: type === "string" ? JSON.stringify(value) : String(value)
  }
}

function isContainer(value: unknown): value is Record<string, unknown> | unknown[] {
  return value !== null && typeof value === "object"
}

export function buildJsonTree(value: unknown): JsonTreeResult {
  const root = createNode(value, "root", "root")
  const meta: JsonTreeMeta = {
    nodeCount: 1,
    depthLimitReached: false,
    nodeLimitReached: false
  }
  const stack: Array<{
    source: Record<string, unknown> | unknown[]
    target: JsonTreeNode
    depth: number
  }> = isContainer(value) ? [{ source: value, target: root, depth: 0 }] : []

  while (stack.length > 0) {
    const current = stack.pop()!
    if (current.depth >= MAX_JSON_TREE_DEPTH) {
      current.target.truncated = true
      meta.depthLimitReached = true
      continue
    }

    const children: JsonTreeNode[] = []
    current.target.children = children
    const appendChild = (key: string, childValue: unknown, childKey: string) => {
      if (meta.nodeCount >= MAX_JSON_TREE_NODES) {
        current.target.truncated = true
        meta.nodeLimitReached = true
        return false
      }

      const child = createNode(childValue, childKey, key)
      children.push(child)
      meta.nodeCount += 1

      if (isContainer(childValue)) {
        stack.push({ source: childValue, target: child, depth: current.depth + 1 })
      }

      return true
    }

    if (Array.isArray(current.source)) {
      for (let index = 0; index < current.source.length; index += 1) {
        const key = String(index)
        if (!appendChild(key, current.source[index], `${current.target.key}[${key}]`)) break
      }
    } else {
      for (const key of Object.keys(current.source)) {
        if (!appendChild(key, current.source[key], appendObjectPath(current.target.key, key))) break
      }
    }
  }

  return { root, meta }
}
