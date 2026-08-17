export type Radix = 2 | 8 | 10 | 16

export const RADIX_OPTIONS: Array<{ value: Radix; label: string; shortLabel: string }> = [
  { value: 2, label: "Binary (base 2)", shortLabel: "BIN" },
  { value: 8, label: "Octal (base 8)", shortLabel: "OCT" },
  { value: 10, label: "Decimal (base 10)", shortLabel: "DEC" },
  { value: 16, label: "Hexadecimal (base 16)", shortLabel: "HEX" }
]

export const BASE_CONVERT_EXAMPLE = "255"

const PREFIXES: Record<Radix, string> = {
  2: "0b",
  8: "0o",
  10: "",
  16: "0x"
}

const DIGIT_PATTERNS: Record<Radix, RegExp> = {
  2: /^[01]+$/,
  8: /^[0-7]+$/,
  10: /^\d+$/,
  16: /^[0-9a-f]+$/i
}

export interface IntegerDetails {
  bitLength: number
  byteLength: number
  decimalDigits: number
  negative: boolean
}

export function parseRadixValue(input: string, radix: Radix): bigint {
  const compactValue = input.trim().replace(/[\s_]/g, "")
  if (!compactValue) {
    throw new Error("Enter a number to convert.")
  }

  const sign = compactValue.startsWith("-") ? "-" : ""
  const unsignedValue = compactValue.replace(/^[+-]/, "")
  const prefix = PREFIXES[radix]
  const digits =
    prefix && unsignedValue.toLowerCase().startsWith(prefix)
      ? unsignedValue.slice(prefix.length)
      : unsignedValue

  if (!digits || !DIGIT_PATTERNS[radix].test(digits)) {
    const allowed = radix === 2 ? "0-1" : radix === 8 ? "0-7" : radix === 10 ? "0-9" : "0-9 and A-F"
    throw new Error(`Invalid base ${radix} value. Allowed digits: ${allowed}.`)
  }

  try {
    const absoluteValue = radix === 10 ? BigInt(digits) : BigInt(`${PREFIXES[radix]}${digits}`)
    return sign ? -absoluteValue : absoluteValue
  } catch {
    throw new Error("The number is too large to convert.")
  }
}

export function formatRadixValue(
  value: bigint,
  radix: Radix,
  includePrefix: boolean,
  uppercase: boolean
): string {
  const sign = value < 0n ? "-" : ""
  let digits = (value < 0n ? -value : value).toString(radix)
  if (uppercase && radix === 16) digits = digits.toUpperCase()
  return includePrefix ? `${sign}${PREFIXES[radix]}${digits}` : `${sign}${digits}`
}

export function getIntegerDetails(value: bigint): IntegerDetails {
  const absoluteValue = value < 0n ? -value : value
  const binaryDigits = absoluteValue.toString(2)
  return {
    bitLength: binaryDigits === "0" ? 1 : binaryDigits.length,
    byteLength: Math.max(1, Math.ceil((binaryDigits === "0" ? 1 : binaryDigits.length) / 8)),
    decimalDigits: absoluteValue.toString(10).length,
    negative: value < 0n
  }
}
