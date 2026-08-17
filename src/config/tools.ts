export interface ToolConfig {
  id: string;
  path: string;
  title: string;
  description: string;
  category?: string;
}

export const TOOLS_CONFIG: ToolConfig[] = [
  {
    id: "json",
    path: "/tools/json",
    title: "JSON Formatter",
    description: "Format, minify, validate, and analyze JSON data.",
    category: "Formatter",
  },
  {
    id: "base64",
    path: "/tools/base64",
    title: "Base64 Encoder/Decoder",
    description: "Encode and decode text or files using Base64.",
    category: "Encoder",
  },
  {
    id: "url",
    path: "/tools/url",
    title: "URL Encoder/Decoder",
    description: "Quickly encode and decode URL parameters.",
    category: "Encoder",
  },
  {
    id: "timestamp",
    path: "/tools/timestamp",
    title: "Timestamp Converter",
    description: "Convert between Unix timestamps and standard dates.",
    category: "Converter",
  },
  {
    id: "base-convert",
    path: "/tools/base-convert",
    title: "Base Converter",
    description: "Convert numbers between Binary, Octal, Decimal, and Hex.",
    category: "Converter",
  },
  {
    id: "uuid",
    path: "/tools/uuid",
    title: "UUID & ID Generator",
    description: "Generate UUID v4 and time-ordered UUID v7 identifiers in batches.",
    category: "Generator",
  },
  {
    id: "regex",
    path: "/tools/regex",
    title: "Regex Tester & Generator",
    description: "Test JavaScript regular expressions and start from practical templates.",
    category: "Tester",
  },
  {
    id: "color",
    path: "/tools/color",
    title: "Color Converter & Contrast",
    description: "Convert colors and check WCAG contrast ratios for accessible interfaces.",
    category: "Design",
  },
  {
    id: "markdown",
    path: "/tools/markdown",
    title: "Markdown Editor & Preview",
    description: "Write GitHub Flavored Markdown and preview a sanitized document locally.",
    category: "Formatter",
  }
];
