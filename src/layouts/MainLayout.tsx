import React from "react"
import { Outlet, useNavigate, useLocation } from "react-router-dom"
import { Button, Input, Menu } from "antd"
import { AppstoreOutlined, SearchOutlined } from "@ant-design/icons"
import type { MenuProps } from "antd"
import { useThemeStore } from "../stores/useThemeStore"
import { useToolCatalogSearch } from "../hooks/useToolCatalogSearch"
import "./MainLayout.scss"

const MainLayout: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { mode, toggleTheme } = useThemeStore()
  const {
    query: toolQuery,
    setQuery: setToolQuery,
    groups: filteredToolGroups
  } = useToolCatalogSearch()

  const menuItems: MenuProps["items"] = [
    {
      key: "/",
      label: "Home"
    },
    {
      key: "/tools",
      label: "Tools",
      // 为了触发 popupRender，我们需要它是一个 SubMenu
      children: [
        {
          key: "sub-dummy", // 必须要有一个子节点，popupRender 才会展示
          label: "Dummy"
        }
      ]
    },
    {
      key: "/resources",
      label: "Resources"
    }
  ]

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    // 忽略子组件内部无意义的 key 跳转
    if (e.key !== "sub-dummy") {
      navigate(e.key)
    }
  }

  const handleMegaMenuWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    const { clientHeight, scrollHeight, scrollTop } = event.currentTarget
    const hasScrollableContent = scrollHeight > clientHeight
    const isAtTop = scrollTop <= 0
    const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1

    if (
      !hasScrollableContent ||
      (event.deltaY < 0 && isAtTop) ||
      (event.deltaY > 0 && isAtBottom)
    ) {
      event.preventDefault()
    }
  }

  const selectedMenuKey =
    location.pathname === "/"
      ? "/"
      : location.pathname.startsWith("/tools")
        ? "/tools"
        : location.pathname.startsWith("/resources")
          ? "/resources"
          : ""

  // 自定义 SubMenu 的弹出层
  const popupRender = () => {
    return (
      <div className="mega-menu-popup">
        <div className="mega-menu-toolbar">
          <Input
            value={toolQuery}
            onChange={(event) => setToolQuery(event.target.value)}
            onKeyDown={(event) => event.stopPropagation()}
            placeholder="Search tools..."
            prefix={<SearchOutlined />}
            allowClear
            className="mega-menu-search"
          />
          <Button
            type="link"
            icon={<AppstoreOutlined />}
            onClick={() => {
              setToolQuery("")
              navigate("/tools")
            }}
          >
            View all tools
          </Button>
        </div>
        <div className="mega-menu-scroll-area" onWheel={handleMegaMenuWheel}>
          {filteredToolGroups.length > 0 ? (
            <div className="mega-menu-groups">
              {filteredToolGroups.map(([category, tools]) => (
                <section className="mega-menu-group" key={category}>
                  <h3 className="mega-menu-category">{category}</h3>
                  <div className="mega-menu-grid">
                    {tools.map((tool) => {
                      const isActive = location.pathname.startsWith(tool.path)
                      return (
                        <div
                          key={tool.id}
                          className={`mega-menu-item ${isActive ? "active" : ""}`}
                          onClick={() => {
                            setToolQuery("")
                            navigate(tool.path)
                          }}
                        >
                          <h4 className="mega-menu-title">{tool.title}</h4>
                          <p className="mega-menu-desc">{tool.description}</p>
                        </div>
                      )
                    })}
                  </div>
                </section>
              ))}
            </div>
          ) : (
            <div className="mega-menu-empty">No tools match “{toolQuery}”.</div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="main-layout">
      <header className="main-header">
        <div className="header-content">
          <div className="logo" onClick={() => navigate("/")}>
            DevHub
          </div>
          <div className="nav-menu">
            <Menu
              selectedKeys={selectedMenuKey ? [selectedMenuKey] : []}
              mode="horizontal"
              items={menuItems}
              popupRender={popupRender}
              onClick={handleMenuClick}
              onOpenChange={(openKeys) => {
                if (!openKeys.includes("/tools")) setToolQuery("")
              }}
              className="custom-menu"
            />
          </div>
          <div className="header-actions">
            <button className="theme-toggle" onClick={toggleTheme}>
              {mode === "light" ? "🌙 Dark" : "☀️ Light"}
            </button>
          </div>
        </div>
      </header>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  )
}

export default MainLayout
