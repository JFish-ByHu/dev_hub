import { Input, Tag, Typography } from "antd"
import { SearchOutlined } from "@ant-design/icons"
import { useNavigate } from "react-router-dom"
import { useToolCatalogSearch } from "../../hooks/useToolCatalogSearch"
import "./index.scss"

const { Text } = Typography

export default function ToolsIndexPage() {
  const navigate = useNavigate()
  const { query, setQuery, groups, visibleCount, totalCount } = useToolCatalogSearch()

  return (
    <div className="tools-index-page">
      <div className="tools-index-header">
        <div>
          <Text className="eyebrow">DEVHUB TOOLBOX</Text>
          <h1>All developer tools</h1>
          <p>Browse the complete toolkit by category or search for a specific workflow.</p>
        </div>
        <Tag color="blue">{totalCount} tools</Tag>
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
