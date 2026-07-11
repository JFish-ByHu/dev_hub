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
];
