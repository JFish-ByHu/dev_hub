export type Base64Variant = "standard" | "url"

export interface Base64EncodeOptions {
  variant: Base64Variant
  includePadding: boolean
}

export interface DecodedBase64 {
  bytes: Uint8Array
  text: string | null
}

const BYTE_CHUNK_SIZE = 0x8000

function bytesToBinaryString(bytes: Uint8Array): string {
  let binary = ""
  for (let index = 0; index < bytes.length; index += BYTE_CHUNK_SIZE) {
    binary += String.fromCharCode(...bytes.subarray(index, index + BYTE_CHUNK_SIZE))
  }
  return binary
}

function binaryStringToBytes(binary: string): Uint8Array {
  const bytes = new Uint8Array(binary.length)
  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index)
  }
  return bytes
}

export function encodeBase64Bytes(bytes: Uint8Array, options: Base64EncodeOptions): string {
  let encoded = btoa(bytesToBinaryString(bytes))

  if (options.variant === "url") {
    encoded = encoded.replace(/\+/g, "-").replace(/\//g, "_")
  }

  if (!options.includePadding) {
    encoded = encoded.replace(/=+$/, "")
  }

  return encoded
}

export function textToUtf8Bytes(text: string): Uint8Array {
  return new TextEncoder().encode(text)
}

export function decodeBase64(value: string): DecodedBase64 {
  const compactValue = value.replace(/\s/g, "")
  if (!compactValue) {
    throw new Error("Enter a Base64 value to decode.")
  }

  if (!/^[A-Za-z0-9+/_-]*={0,2}$/.test(compactValue)) {
    throw new Error("The input contains characters that are not valid Base64.")
  }

  const unpaddedValue = compactValue.replace(/=+$/, "")
  if (unpaddedValue.length % 4 === 1) {
    throw new Error("The Base64 value has an invalid length.")
  }

  const normalizedValue = unpaddedValue.replace(/-/g, "+").replace(/_/g, "/")
  const paddedValue = normalizedValue.padEnd(Math.ceil(normalizedValue.length / 4) * 4, "=")

  let bytes: Uint8Array
  try {
    bytes = binaryStringToBytes(atob(paddedValue))
  } catch {
    throw new Error("The input could not be decoded as Base64.")
  }

  let text: string | null = null
  try {
    text = new TextDecoder("utf-8", { fatal: true }).decode(bytes)
  } catch {
    // Valid Base64 can represent arbitrary binary data, which is not always UTF-8 text.
  }

  return { bytes, text }
}

export function formatByteSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}
