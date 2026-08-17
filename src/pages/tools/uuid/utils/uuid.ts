export type UuidVersion = "v4" | "v7"

export interface UuidFormatOptions {
  uppercase: boolean
  hyphens: boolean
}

export const UUID_VERSION_OPTIONS: Array<{
  label: string
  value: UuidVersion
  description: string
}> = [
  {
    label: "UUID v4 · Random",
    value: "v4",
    description: "Randomly generated identifiers for general-purpose use."
  },
  {
    label: "UUID v7 · Time-ordered",
    value: "v7",
    description: "Timestamp-first identifiers that sort naturally by creation time."
  }
]

const UUID_HEX_GROUPS = [4, 2, 2, 2, 6]

function getRandomBytes(length: number) {
  const bytes = new Uint8Array(length)
  crypto.getRandomValues(bytes)
  return bytes
}

function bytesToUuid(bytes: Uint8Array, { uppercase, hyphens }: UuidFormatOptions) {
  const hex = Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("")
  const groups: string[] = []
  let offset = 0

  for (const size of UUID_HEX_GROUPS) {
    groups.push(hex.slice(offset, offset + size * 2))
    offset += size * 2
  }

  const value = hyphens ? groups.join("-") : hex
  return uppercase ? value.toUpperCase() : value
}

export function generateUuidV4(options: UuidFormatOptions): string {
  const bytes = getRandomBytes(16)
  bytes[6] = (bytes[6] & 0x0f) | 0x40
  bytes[8] = (bytes[8] & 0x3f) | 0x80
  return bytesToUuid(bytes, options)
}

export function generateUuidV7(options: UuidFormatOptions, timestamp = Date.now()): string {
  const bytes = getRandomBytes(16)
  let value = timestamp

  for (let index = 5; index >= 0; index -= 1) {
    bytes[index] = value % 256
    value = Math.floor(value / 256)
  }

  bytes[6] = (bytes[6] & 0x0f) | 0x70
  bytes[8] = (bytes[8] & 0x3f) | 0x80
  return bytesToUuid(bytes, options)
}

export function generateUuid(version: UuidVersion, options: UuidFormatOptions): string {
  return version === "v7" ? generateUuidV7(options) : generateUuidV4(options)
}

export function generateUuidBatch(
  version: UuidVersion,
  count: number,
  options: UuidFormatOptions
): string[] {
  return Array.from({ length: count }, () => generateUuid(version, options))
}

export function getUuidVersionDescription(version: UuidVersion) {
  return UUID_VERSION_OPTIONS.find((option) => option.value === version)?.description ?? ""
}
