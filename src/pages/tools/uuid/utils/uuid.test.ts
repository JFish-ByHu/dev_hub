import { describe, expect, it } from "vitest"
import { generateUuidV4, generateUuidV7 } from "./uuid"

const formatOptions = { uppercase: false, hyphens: true }

describe("UUID utilities", () => {
  it("sets the version and variant bits for UUID v4", () => {
    const value = generateUuidV4(formatOptions)

    expect(value).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/)
  })

  it("keeps UUID v7 values lexicographically ordered within one millisecond", () => {
    const values = Array.from({ length: 5 }, () => generateUuidV7(formatOptions, 1710000000000))

    expect(new Set(values)).toHaveLength(values.length)
    expect([...values].sort()).toEqual(values)
    expect(values[0]).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-7[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/
    )
  })
})
