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
const MAX_UUID_V7_TIMESTAMP = 0xffffffffffff
const MAX_UUID_V7_RANDOM = (1n << 74n) - 1n

let lastV7Timestamp = -1
let lastV7Random = 0n

function getRandomBytes(length: number) {
  const bytes = new Uint8Array(length)
  crypto.getRandomValues(bytes)
  return bytes
}

function getRandomV7Tail() {
  const bytes = getRandomBytes(10)
  let value = 0n
  bytes.forEach((byte) => {
    value = (value << 8n) | BigInt(byte)
  })
  return value & MAX_UUID_V7_RANDOM
}

function getMonotonicV7Values(timestamp: number) {
  if (!Number.isSafeInteger(timestamp) || timestamp < 0 || timestamp > MAX_UUID_V7_TIMESTAMP) {
    throw new RangeError("UUID v7 timestamps must be a non-negative millisecond value in range.")
  }

  let monotonicTimestamp = Math.max(timestamp, lastV7Timestamp)
  let randomTail: bigint

  if (monotonicTimestamp === lastV7Timestamp) {
    if (lastV7Random === MAX_UUID_V7_RANDOM) {
      monotonicTimestamp += 1
      if (monotonicTimestamp > MAX_UUID_V7_TIMESTAMP) {
        throw new RangeError("UUID v7 timestamp is outside the supported range.")
      }
      randomTail = getRandomV7Tail()
    } else {
      randomTail = lastV7Random + 1n
    }
  } else {
    randomTail = getRandomV7Tail()
  }

  lastV7Timestamp = monotonicTimestamp
  lastV7Random = randomTail
  return { timestamp: monotonicTimestamp, randomTail }
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
  const bytes = new Uint8Array(16)
  const monotonicValues = getMonotonicV7Values(Math.floor(timestamp))
  let value = monotonicValues.timestamp

  for (let index = 5; index >= 0; index -= 1) {
    bytes[index] = value % 256
    value = Math.floor(value / 256)
  }

  bytes[6] = 0x70 | Number((monotonicValues.randomTail >> 70n) & 0x0fn)
  bytes[7] = Number((monotonicValues.randomTail >> 62n) & 0xffn)
  bytes[8] = 0x80 | Number((monotonicValues.randomTail >> 56n) & 0x3fn)
  for (let index = 9; index < 16; index += 1) {
    const shift = BigInt((15 - index) * 8)
    bytes[index] = Number((monotonicValues.randomTail >> shift) & 0xffn)
  }
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
