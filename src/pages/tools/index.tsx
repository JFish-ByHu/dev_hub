import { Input, Tag, Typography } from "antd"
import { SearchOutlined } from "@ant-design/icons"
import { useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { TOOLS_CONFIG } from "../../config/tools"
import "./index.scss"

const { Text } = Typography

export default function ToolsIndexPage() {
  const navigate = useNavigate()
  const [query, setQuery] = useState("")

  const groups = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    const grouped = new Map<string, typeof TOOLS_CONFIG>()

    TOOLS_CONFIG.forEach((tool) => {
      const searchableText =
        `${tool.title} ${tool.description} ${tool.category ?? ""}`.toLowerCase()
      if (normalizedQuery && !searchableText.includes(normalizedQuery)) return

      const category = tool.category ?? "Other"
      const tools = grouped.get(category) ?? []
      tools.push(tool)
      grouped.set(category, tools)
    })

    return Array.from(grouped.entries())
  }, [query])

  const visibleCount = groups.reduce((total, [, tools]) => total + tools.length, 0)

  return (
    <div className="tools-index-page">
      <div className="tools-index-header">
        <div>
          <Text className="eyebrow">DEVHUB TOOLBOX</Text>
          <h1>All developer tools</h1>
          <p>Browse the complete toolkit by category or search for a specific workflow.</p>
        </div>
        <Tag color="blue">{TOOLS_CONFIG.length} tools</Tag>
      </div>

      <div className="tools-index-toolbar">
        <Input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search tools by name, description, or category..."
          prefix={<SearchOutlined />}
          allowClear
          size="large"
        />
        <Text type="secondary">
          {visibleCount} result{visibleCount === 1 ? "" : "s"}
        </Text>
      </div>

      {groups.length > 0 ? (
        <div className="tools-index-groups">
          {groups.map(([category, tools]) => (
            <section className="tools-index-group" key={category}>
              <div className="tools-index-group-heading">
                <h2>{category}</h2>
                <Text type="secondary">{tools.length} tools</Text>
              </div>
              <div className="tools-index-grid">
                {tools.map((tool) => (
                  <button
                    type="button"
                    className="tools-index-item"
                    key={tool.id}
                    onClick={() => navigate(tool.path)}
                  >
                    <span className="tools-index-item-title">{tool.title}</span>
                    <span className="tools-index-item-description">{tool.description}</span>
                    <span className="tools-index-item-link">Open tool →</span>
                  </button>
                ))}
              </div>
            </section>
          ))}
        </div>
      ) : (
        <div className="tools-index-empty">No tools match “{query}”.</div>
      )}
    </div>
  )
}
