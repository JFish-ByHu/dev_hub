import { describe, expect, it } from "vitest"
import { decodeBase64, encodeBase64Bytes, textToUtf8Bytes } from "./base64"

describe("base64 utilities", () => {
  it("round-trips UTF-8 text", () => {
    const encoded = encodeBase64Bytes(textToUtf8Bytes("DevHub 中文"), {
      variant: "standard",
      includePadding: true
    })

    expect(decodeBase64(encoded).text).toBe("DevHub 中文")
  })

  it("supports URL-safe values without padding", () => {
    const encoded = encodeBase64Bytes(new Uint8Array([251, 239, 190]), {
      variant: "url",
      includePadding: false
    })

    expect(encoded).toBe("----")
    expect(Array.from(decodeBase64(encoded).bytes)).toEqual([251, 239, 190])
  })
})
