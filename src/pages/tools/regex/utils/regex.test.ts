import { describe, expect, it } from "vitest"
import { analyzeRegex, DEFAULT_REGEX_FLAGS, MAX_REGEX_PATTERN_CHARACTERS } from "./regex"

describe("regex utilities", () => {
  it("returns matches and replacement output", () => {
    const result = analyzeRegex("a+", DEFAULT_REGEX_FLAGS, "aa b", "[$&]")

    expect(result.kind).toBe("success")
    if (result.kind === "success") {
      expect(result.matches[0]?.value).toBe("aa")
      expect(result.replacedText).toBe("[aa] b")
    }
  })

  it("rejects patterns above the safety limit", () => {
    const result = analyzeRegex(
      "a".repeat(MAX_REGEX_PATTERN_CHARACTERS + 1),
      DEFAULT_REGEX_FLAGS,
      "",
      ""
    )

    expect(result.kind).toBe("error")
  })
})
