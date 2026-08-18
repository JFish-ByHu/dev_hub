import { useMemo, useState } from "react"
import { TOOLS_CONFIG, type ToolConfig } from "../config/tools"

export type ToolGroup = [category: string, tools: ToolConfig[]]

function groupTools(tools: readonly ToolConfig[], query: string): ToolGroup[] {
  const normalizedQuery = query.trim().toLowerCase()
  const grouped = new Map<string, ToolConfig[]>()

  tools.forEach((tool) => {
    const searchableText = `${tool.title} ${tool.description} ${tool.category ?? ""}`.toLowerCase()
    if (normalizedQuery && !searchableText.includes(normalizedQuery)) return

    const category = tool.category ?? "Other"
    const categoryTools = grouped.get(category) ?? []
    categoryTools.push(tool)
    grouped.set(category, categoryTools)
  })

  return Array.from(grouped.entries())
}

export function useToolCatalogSearch(tools: readonly ToolConfig[] = TOOLS_CONFIG) {
  const [query, setQuery] = useState("")
  const groups = useMemo(() => groupTools(tools, query), [query, tools])
  const visibleCount = useMemo(
    () => groups.reduce((total, [, groupTools]) => total + groupTools.length, 0),
    [groups]
  )

  return { query, setQuery, groups, visibleCount, totalCount: tools.length }
}
