export type UrlOperation = "encode" | "decode"
export type UrlEncodingMode = "uri" | "component" | "form"

export const URL_ENCODING_OPTIONS: Array<{
  value: UrlEncodingMode
  label: string
  description: string
}> = [
  {
    value: "uri",
    label: "Full URI",
    description: "Preserves URL separators such as /, ?, &, and =."
  },
  {
    value: "component",
    label: "URI component",
    description: "Encodes a single URL part, including reserved characters."
  },
  {
    value: "form",
    label: "Form value",
    description: "Uses application/x-www-form-urlencoded rules where spaces become +."
  }
]

export const URL_EXAMPLE = "https://example.com/search?q=hello world&lang=中文#docs"

export interface UrlStats {
  characters: number
  bytes: number
}

export interface UrlDetails {
  protocol: string
  host: string
  pathname: string
  query: string
  hash: string
  parameterCount: number
}

export function encodeUrl(value: string, mode: UrlEncodingMode): string {
  if (mode === "uri") return encodeURI(value)
  if (mode === "component") return encodeURIComponent(value)
  return encodeURIComponent(value).replace(/%20/g, "+")
}

export function decodeUrl(value: string, mode: UrlEncodingMode): string {
  if (mode === "uri") return decodeURI(value)
  if (mode === "component") return decodeURIComponent(value)
  return decodeURIComponent(value.replace(/\+/g, " "))
}

export function getUrlStats(value: string): UrlStats {
  return {
    characters: value.length,
    bytes: new TextEncoder().encode(value).byteLength
  }
}

export function inspectUrl(value: string): UrlDetails | null {
  try {
    const url = new URL(value)
    return {
      protocol: url.protocol,
      host: url.host,
      pathname: url.pathname,
      query: url.search,
      hash: url.hash,
      parameterCount: Array.from(url.searchParams.keys()).length
    }
  } catch {
    return null
  }
}
