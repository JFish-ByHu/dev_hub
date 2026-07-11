import { ConfigProvider } from "antd"
import { useThemeStore } from "./stores/useThemeStore"
import { getAntdTheme } from "./styles/antdTheme"
import { useEffect } from "react"
import AppRouter from "./router/index"

function App() {
  const mode = useThemeStore((s) => s.mode)

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", mode)
  }, [mode])

  return (
    <ConfigProvider theme={getAntdTheme(mode === "dark")}>
      <AppRouter />
    </ConfigProvider>
  )
}

export default App
