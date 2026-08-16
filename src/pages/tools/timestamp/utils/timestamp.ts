export type TimestampUnit = "seconds" | "milliseconds" | "microseconds" | "nanoseconds"
export type TimezoneMode = "local" | "utc"

export interface ParseSuccess<T> {
  ok: true
  value: T
}

export interface ParseFailure {
  ok: false
  error: string
}

export type ParseResult<T> = ParseSuccess<T> | ParseFailure

export const TIMESTAMP_UNIT_OPTIONS: Array<{
  value: TimestampUnit
  label: string
  shortLabel: string
}> = [
  { value: "seconds", label: "Seconds (s)", shortLabel: "s" },
  { value: "milliseconds", label: "Milliseconds (ms)", shortLabel: "ms" },
  { value: "microseconds", label: "Microseconds (μs)", shortLabel: "μs" },
  { value: "nanoseconds", label: "Nanoseconds (ns)", shortLabel: "ns" }
]

export const TIMEZONE_OPTIONS: Array<{ value: TimezoneMode; label: string }> = [
  { value: "local", label: "Local timezone" },
  { value: "utc", label: "UTC" }
]

const UNIT_TO_MILLISECONDS: Record<TimestampUnit, number> = {
  seconds: 1000,
  milliseconds: 1,
  microseconds: 0.001,
  nanoseconds: 0.000001
}

const UNIT_TO_SUBMILLISECONDS: Record<TimestampUnit, bigint> = {
  seconds: 1000n,
  milliseconds: 1n,
  microseconds: 1000n,
  nanoseconds: 1000000n
}

const pad = (value: number, length = 2) => String(value).padStart(length, "0")

export function parseTimestampInput(input: string, unit: TimestampUnit): ParseResult<Date> {
  const value = input.trim()
  if (!value) {
    return { ok: false, error: "Enter a timestamp to convert." }
  }

  const numericValue = Number(value)
  if (!Number.isFinite(numericValue)) {
    return { ok: false, error: "Timestamp must be a finite number." }
  }

  const milliseconds = numericValue * UNIT_TO_MILLISECONDS[unit]
  const date = new Date(milliseconds)
  if (!Number.isFinite(milliseconds) || Number.isNaN(date.getTime())) {
    return { ok: false, error: "This timestamp is outside the supported date range." }
  }

  return { ok: true, value: date }
}

export function parseDateTimeInput(input: string, timezone: TimezoneMode): ParseResult<Date> {
  const normalized = input.trim().replace(" ", "T")
  const match = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})(?::(\d{2})(?:\.(\d{1,3}))?)?$/.exec(
    normalized
  )

  if (!match) {
    return { ok: false, error: "Use the date format YYYY-MM-DD HH:mm:ss.SSS." }
  }

  const year = Number(match[1])
  const month = Number(match[2])
  const day = Number(match[3])
  const hour = Number(match[4])
  const minute = Number(match[5])
  const second = Number(match[6] ?? "0")
  const millisecond = Number((match[7] ?? "").padEnd(3, "0") || "0")

  const date =
    timezone === "utc"
      ? new Date(Date.UTC(year, month - 1, day, hour, minute, second, millisecond))
      : new Date(year, month - 1, day, hour, minute, second, millisecond)

  const matchesInput =
    timezone === "utc"
      ? date.getUTCFullYear() === year &&
        date.getUTCMonth() === month - 1 &&
        date.getUTCDate() === day &&
        date.getUTCHours() === hour &&
        date.getUTCMinutes() === minute &&
        date.getUTCSeconds() === second &&
        date.getUTCMilliseconds() === millisecond
      : date.getFullYear() === year &&
        date.getMonth() === month - 1 &&
        date.getDate() === day &&
        date.getHours() === hour &&
        date.getMinutes() === minute &&
        date.getSeconds() === second &&
        date.getMilliseconds() === millisecond

  if (!matchesInput || Number.isNaN(date.getTime())) {
    return { ok: false, error: "Enter a valid calendar date and time." }
  }

  return { ok: true, value: date }
}

export function formatDateTime(date: Date, timezone: TimezoneMode): string {
  const year = timezone === "utc" ? date.getUTCFullYear() : date.getFullYear()
  const month = timezone === "utc" ? date.getUTCMonth() + 1 : date.getMonth() + 1
  const day = timezone === "utc" ? date.getUTCDate() : date.getDate()
  const hour = timezone === "utc" ? date.getUTCHours() : date.getHours()
  const minute = timezone === "utc" ? date.getUTCMinutes() : date.getMinutes()
  const second = timezone === "utc" ? date.getUTCSeconds() : date.getSeconds()
  const millisecond = timezone === "utc" ? date.getUTCMilliseconds() : date.getMilliseconds()

  return `${year}-${pad(month)}-${pad(day)} ${pad(hour)}:${pad(minute)}:${pad(second)}.${pad(
    millisecond,
    3
  )}`
}

export function formatDateTimeInput(date: Date, timezone: TimezoneMode): string {
  return formatDateTime(date, timezone).replace(" ", "T")
}

export function formatTimestamp(date: Date, unit: TimestampUnit): string {
  const milliseconds = BigInt(date.getTime())
  if (unit === "seconds") {
    const seconds = Number(milliseconds) / 1000
    return Number.isInteger(seconds) ? String(seconds) : seconds.toFixed(3).replace(/0+$/, "")
  }

  return (milliseconds * UNIT_TO_SUBMILLISECONDS[unit]).toString()
}

export function formatTimezone(date: Date, timezone: TimezoneMode): string {
  if (timezone === "utc") return "UTC"

  const offsetMinutes = -date.getTimezoneOffset()
  const sign = offsetMinutes >= 0 ? "+" : "-"
  const absoluteMinutes = Math.abs(offsetMinutes)
  return `GMT${sign}${pad(Math.floor(absoluteMinutes / 60))}:${pad(absoluteMinutes % 60)}`
}

export function formatRelativeTime(date: Date, now = Date.now()): string {
  const differenceInSeconds = (date.getTime() - now) / 1000
  const absoluteSeconds = Math.abs(differenceInSeconds)
  let divisor = 1
  let unit: Intl.RelativeTimeFormatUnit = "second"

  if (absoluteSeconds >= 31536000) {
    divisor = 31536000
    unit = "year"
  } else if (absoluteSeconds >= 2592000) {
    divisor = 2592000
    unit = "month"
  } else if (absoluteSeconds >= 86400) {
    divisor = 86400
    unit = "day"
  } else if (absoluteSeconds >= 3600) {
    divisor = 3600
    unit = "hour"
  } else if (absoluteSeconds >= 60) {
    divisor = 60
    unit = "minute"
  }

  const value = Math.round(differenceInSeconds / divisor)
  return new Intl.RelativeTimeFormat("en", { numeric: "auto" }).format(value, unit)
}

export function getCurrentDateTimeInput(timezone: TimezoneMode): string {
  return formatDateTimeInput(new Date(), timezone)
}
