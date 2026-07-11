import { theme, type ThemeConfig } from "antd"

// ========== 与 SCSS 主题变量保持一致的 antd Token ==========
// 后续组件中可通过 <ConfigProvider theme={themeConfig}> 注入

const lightTokens: ThemeConfig = {
  algorithm: theme.defaultAlgorithm,
  token: {
    colorText: "#050316",
    colorTextSecondary: "#6b6878",
    colorBgContainer: "#ffffff",
    colorBgLayout: "#fbfbfe",
    colorPrimary: "#2f27ce",
    colorPrimaryHover: "#3a31d8",
    colorBorder: "#e4e2f0",
    colorSuccess: "#16a34a",
    colorWarning: "#d97706",
    colorError: "#dc2626",
    colorInfo: "#2563eb",
    borderRadiusLG: 10,
    borderRadius: 8,
    borderRadiusSM: 6,
    borderRadiusXS: 4
  }
}

const darkTokens: ThemeConfig = {
  algorithm: theme.darkAlgorithm,
  token: {
    colorText: "#eae9fc",
    colorTextSecondary: "#9d9ab8",
    colorBgContainer: "#12121a",
    colorBgLayout: "#010104",
    colorPrimary: "#3a31d8",
    colorPrimaryHover: "#443dff",
    colorBorder: "#262438",
    colorSuccess: "#22c55e",
    colorWarning: "#f59e0b",
    colorError: "#ef4444",
    colorInfo: "#3b82f6",
    borderRadiusLG: 10,
    borderRadius: 8,
    borderRadiusSM: 6,
    borderRadiusXS: 4
  }
}

export function getAntdTheme(dark: boolean): ThemeConfig {
  return dark ? darkTokens : lightTokens
}
