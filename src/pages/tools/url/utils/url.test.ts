import { describe, expect, it } from "vitest"
import { decodeUrl, encodeUrl } from "./url"

describe("URL utilities", () => {
  it("keeps URI separators in full URI mode", () => {
    const value = "https://example.com/a b?q=中文"
    const encoded = encodeUrl(value, "uri")

    expect(encoded).toContain("https://example.com/a%20b")
    expect(decodeUrl(encoded, "uri")).toBe(value)
  })

  it("uses plus signs for form spaces", () => {
    expect(encodeUrl("hello world", "form")).toBe("hello+world")
    expect(decodeUrl("hello+world", "form")).toBe("hello world")
  })
})
