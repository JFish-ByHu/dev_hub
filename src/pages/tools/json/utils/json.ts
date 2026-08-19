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

export interface JsonAnalyzeOptions {
  parseNestedJsonStrings?: boolean
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

function parseNestedJsonStrings(value: unknown, depth = 0): unknown {
  if (depth >= 8) return value

  if (Array.isArray(value)) {
    return value.map((item) => parseNestedJsonStrings(item, depth + 1))
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, parseNestedJsonStrings(item, depth + 1)])
    )
  }

  if (typeof value !== "string") return value
  const trimmed = value.trim()
  if (!(trimmed.startsWith("{") || trimmed.startsWith("["))) return value

  try {
    const parsed = JSON.parse(trimmed)
    if (!parsed || typeof parsed !== "object") return value
    return parseNestedJsonStrings(parsed, depth + 1)
  } catch {
    return value
  }
}

export function analyzeJson(value: string, options: JsonAnalyzeOptions = {}): JsonAnalysis {
  if (!value.trim()) return { kind: "empty" }
  if (value.length > MAX_JSON_INPUT_CHARACTERS) {
    return {
      kind: "error",
      error: `JSON input is limited to ${MAX_JSON_INPUT_CHARACTERS.toLocaleString()} characters.`
    }
  }

  const parsed = parseJson(value)
  if (!parsed.ok) return { kind: "error", error: parsed.error }

  const data = options.parseNestedJsonStrings ? parseNestedJsonStrings(parsed.data) : parsed.data
  const tree = buildJsonTree(data)
  return {
    kind: "success",
    formatted: serializeJson(data, true),
    minified: serializeJson(data, false),
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
