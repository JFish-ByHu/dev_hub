import { describe, expect, it } from "vitest"
import { formatTimestamp, parseDateTimeInput, parseTimestampInput } from "./timestamp"

describe("timestamp utilities", () => {
  it("converts timestamps using the selected unit", () => {
    const result = parseTimestampInput("1710000000", "seconds")

    expect(result.ok).toBe(true)
    if (result.ok) expect(formatTimestamp(result.value.date, "milliseconds")).toBe("1710000000000")
  })

  it("preserves nanosecond precision beyond JavaScript number safety", () => {
    const result = parseTimestampInput("1710000000123456789", "nanoseconds")

    expect(result).toMatchObject({ ok: true })
    if (result.ok) {
      expect(result.value.date.getTime()).toBe(1710000000123)
      expect(result.value.normalized).toBe("1710000000123456789")
      expect(result.value.subMillisecondNanoseconds).toBe(456789n)
    }
  })

  it("rejects impossible calendar dates", () => {
    expect(parseDateTimeInput("2024-02-30 12:00", "utc").ok).toBe(false)
  })

  it("rejects high-precision values beyond the Date range", () => {
    const beyondMax = (8640000000000000n * 1000000n + 1n).toString()

    expect(parseTimestampInput(beyondMax, "nanoseconds").ok).toBe(false)
  })
})
