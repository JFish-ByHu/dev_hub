export const JSON_EXAMPLE = JSON.stringify(
  {
    project: "DevHub",
    version: 1,
    features: ["format", "validate", "tree view"],
    settings: {
      theme: "dark",
      autosave: true
    }
  },
  null,
  2
)

export const MAX_JSON_INPUT_CHARACTERS = 2_000_000

export type { JsonTreeMeta, JsonTreeNode } from "./jsonTree"
import { buildJsonTree, type JsonTreeMeta, type JsonTreeNode } from "./jsonTree"

export interface JsonParseSuccess {
  ok: true
  data: unknown
}

export interface JsonParseFailure {
  ok: false
  error: string
}

export type JsonParseResult = JsonParseSuccess | JsonParseFailure

export type JsonAnalysis =
  | { kind: "empty" }
  | { kind: "pending" }
  | { kind: "error"; error: string }
  | {
      kind: "success"
      formatted: string
      minified: string
      tree: JsonTreeNode
      treeMeta: JsonTreeMeta
    }

export function parseJson(value: string): JsonParseResult {
  if (!value.trim()) {
    return { ok: false, error: "Enter JSON data to validate." }
  }

  try {
    return { ok: true, data: JSON.parse(value) }
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Invalid JSON format"
    }
  }
}

export function analyzeJson(value: string): JsonAnalysis {
  if (!value.trim()) return { kind: "empty" }
  if (value.length > MAX_JSON_INPUT_CHARACTERS) {
    return {
      kind: "error",
      error: `JSON input is limited to ${MAX_JSON_INPUT_CHARACTERS.toLocaleString()} characters.`
    }
  }

  const parsed = parseJson(value)
  if (!parsed.ok) return { kind: "error", error: parsed.error }

  const tree = buildJsonTree(parsed.data)
  return {
    kind: "success",
    formatted: serializeJson(parsed.data, true),
    minified: serializeJson(parsed.data, false),
    tree: tree.root,
    treeMeta: tree.meta
  }
}

export function serializeJson(data: unknown, pretty: boolean): string {
  return JSON.stringify(data, null, pretty ? 2 : undefined) ?? ""
}

export function getJsonStats(value: string) {
  return {
    characters: value.length,
    bytes: new TextEncoder().encode(value).byteLength,
    lines: value ? value.split(/\r?\n/).length : 0
  }
}

export function collectExpandableKeys(nodes: Array<{ key: Key; children?: unknown[] }>): Key[] {
  return nodes.flatMap((node) => {
    if (!node.children?.length) return []
    return [
      node.key,
      ...collectExpandableKeys(node.children as Array<{ key: Key; children?: unknown[] }>)
    ]
  })
}

export function toJsonPath(treeKey: string): string {
  if (treeKey === "root") return "$"
  return treeKey.startsWith("root") ? `$${treeKey.slice("root".length)}` : treeKey
}
import type { Key } from "react"
