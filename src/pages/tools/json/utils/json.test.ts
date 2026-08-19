import { describe, expect, it } from "vitest"
import { analyzeJson } from "./json"

describe("JSON analysis", () => {
  it("returns formatted output and a serializable tree", () => {
    const result = analyzeJson('{"user":{"name":"DevHub"}}')

    expect(result.kind).toBe("success")
    if (result.kind === "success") {
      expect(result.formatted).toContain('"name": "DevHub"')
      expect(result.tree.key).toBe("root")
      expect(result.tree.children?.[0]?.key).toBe("root.user")
    }
  })

  it("limits tree expansion without changing formatted JSON", () => {
    const nested = "[".repeat(40) + "1" + "]".repeat(40)
    const result = analyzeJson(nested)

    expect(result.kind).toBe("success")
    if (result.kind === "success") {
      expect(result.treeMeta.depthLimitReached).toBe(true)
      expect(result.formatted).toContain("1")
    }
  })

  it("preserves nested JSON strings by default", () => {
    const result = analyzeJson('{"summaryContent":"[{\\"type\\":\\"count\\"}]"}')

    expect(result.kind).toBe("success")
    if (result.kind === "success") {
      expect(result.formatted).toContain('"summaryContent": "[{\\"type\\":\\"count\\"}]"')
      expect(result.tree.children?.[0]?.type).toBe("string")
    }
  })

  it("expands nested JSON strings when enabled", () => {
    const result = analyzeJson('{"summaryContent":"[{\\"type\\":\\"count\\"}]"}', {
      parseNestedJsonStrings: true
    })

    expect(result.kind).toBe("success")
    if (result.kind === "success") {
      expect(result.formatted).toContain('"type": "count"')
      expect(result.tree.children?.[0]?.type).toBe("array")
    }
  })
})
