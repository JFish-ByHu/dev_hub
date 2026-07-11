import React from "react"
import { Outlet, useNavigate, useLocation } from "react-router-dom"
import { Menu } from "antd"
import type { MenuProps } from "antd"
import { useThemeStore } from "../stores/useThemeStore"
import { TOOLS_CONFIG } from "../config/tools"
import "./MainLayout.scss"

const MainLayout: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { mode, toggleTheme } = useThemeStore()

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

  // 自定义 SubMenu 的弹出层
  const popupRender = () => {
    return (
      <div className="mega-menu-popup">
        <div className="mega-menu-grid">
          {TOOLS_CONFIG.map((tool) => {
            const isActive = location.pathname.startsWith(tool.path)
            return (
              <div
                key={tool.id}
                className={`mega-menu-item ${isActive ? "active" : ""}`}
                onClick={() => navigate(tool.path)}
              >
                <h4 className="mega-menu-title">{tool.title}</h4>
                <p className="mega-menu-desc">{tool.description}</p>
              </div>
            )
          })}
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
              selectedKeys={[location.pathname]}
              mode="horizontal"
              items={menuItems}
              popupRender={popupRender}
              onClick={handleMenuClick}
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
