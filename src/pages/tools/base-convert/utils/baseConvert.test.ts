import { describe, expect, it } from "vitest"
import { formatRadixValue, parseRadixValue } from "./baseConvert"

describe("base conversion utilities", () => {
  it("parses prefixes and signs", () => {
    expect(parseRadixValue("-0xff", 16)).toBe(-255n)
    expect(parseRadixValue("1_000", 10)).toBe(1000n)
  })

  it("formats large integers without losing precision", () => {
    expect(formatRadixValue(255n, 16, true, true)).toBe("0xFF")
    expect(formatRadixValue(-8n, 2, false, false)).toBe("-1000")
  })
})
