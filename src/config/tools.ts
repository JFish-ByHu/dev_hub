import { lazy } from "react"
import type { ComponentType, LazyExoticComponent } from "react"

export interface ToolConfig {
  id: string
  path: string
  title: string
  description: string
  category?: string
  component: LazyExoticComponent<ComponentType>
}

export const TOOLS_CONFIG: ToolConfig[] = [
  {
    id: "json",
    path: "/tools/json",
    title: "JSON Formatter",
    description: "Format, minify, validate, and analyze JSON data.",
    category: "Formatter",
    component: lazy(() => import("../pages/tools/json"))
  },
  {
    id: "base64",
    path: "/tools/base64",
    title: "Base64 Encoder/Decoder",
    description: "Encode and decode text or files using Base64.",
    category: "Encoder",
    component: lazy(() => import("../pages/tools/base64"))
  },
  {
    id: "url",
    path: "/tools/url",
    title: "URL Encoder/Decoder",
    description: "Quickly encode and decode URL parameters.",
    category: "Encoder",
    component: lazy(() => import("../pages/tools/url"))
  },
  {
    id: "timestamp",
    path: "/tools/timestamp",
    title: "Timestamp Converter",
    description: "Convert between Unix timestamps and standard dates.",
    category: "Converter",
    component: lazy(() => import("../pages/tools/timestamp"))
  },
  {
    id: "base-convert",
    path: "/tools/base-convert",
    title: "Base Converter",
    description: "Convert numbers between Binary, Octal, Decimal, and Hex.",
    category: "Converter",
    component: lazy(() => import("../pages/tools/base-convert"))
  },
  {
    id: "uuid",
    path: "/tools/uuid",
    title: "UUID & ID Generator",
    description: "Generate UUID v4 and time-ordered UUID v7 identifiers in batches.",
    category: "Generator",
    component: lazy(() => import("../pages/tools/uuid"))
  },
  {
    id: "regex",
    path: "/tools/regex",
    title: "Regex Tester & Generator",
    description: "Test JavaScript regular expressions and start from practical templates.",
    category: "Tester",
    component: lazy(() => import("../pages/tools/regex"))
  },
  {
    id: "color",
    path: "/tools/color",
    title: "Color Converter & Contrast",
    description: "Convert colors and check WCAG contrast ratios for accessible interfaces.",
    category: "Design",
    component: lazy(() => import("../pages/tools/color"))
  },
  {
    id: "markdown",
    path: "/tools/markdown",
    title: "Markdown Editor & Preview",
    description: "Write GitHub Flavored Markdown and preview a sanitized document locally.",
    category: "Formatter",
    component: lazy(() => import("../pages/tools/markdown"))
  }
]
