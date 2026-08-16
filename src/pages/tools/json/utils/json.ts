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

export interface JsonParseSuccess {
  ok: true
  data: unknown
}

export interface JsonParseFailure {
  ok: false
  error: string
}

export type JsonParseResult = JsonParseSuccess | JsonParseFailure

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
