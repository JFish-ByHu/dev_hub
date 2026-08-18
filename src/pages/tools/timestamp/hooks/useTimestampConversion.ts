import { useEffect, useMemo, useState } from "react"
import {
  type TimestampUnit,
  type TimezoneMode,
  formatDateTime,
  formatRelativeTime,
  formatTimestamp,
  formatTimezone,
  getCurrentDateTimeInput,
  parseDateTimeInput,
  parseTimestampInput
} from "../utils/timestamp"

export type TimestampResult =
  | { ok: false; error: string }
  | {
      ok: true
      date: Date
      formatted: string
      iso: string
      relative: string
      timezone: string
      normalized: string
      subMillisecondNanoseconds: string
    }

export type DateResult =
  | { ok: false; error: string }
  | {
      ok: true
      date: Date
      timestamp: string
      milliseconds: string
      iso: string
      relative: string
      timezone: string
    }

export function useTimestampConversion() {
  const [now, setNow] = useState(() => new Date())
  const [timestampInput, setTimestampInput] = useState(() => formatTimestamp(new Date(), "seconds"))
  const [timestampUnit, setTimestampUnit] = useState<TimestampUnit>("seconds")
  const [timestampTimezone, setTimestampTimezone] = useState<TimezoneMode>("local")
  const [dateInput, setDateInput] = useState(() => getCurrentDateTimeInput("local"))
  const [dateTimezone, setDateTimezone] = useState<TimezoneMode>("local")
  const [dateOutputUnit, setDateOutputUnit] = useState<TimestampUnit>("milliseconds")

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000)
    return () => window.clearInterval(timer)
  }, [])

  const timestampResult = useMemo<TimestampResult>(() => {
    const result = parseTimestampInput(timestampInput, timestampUnit)
    if (!result.ok) return result

    return {
      ok: true,
      date: result.value.date,
      formatted: formatDateTime(result.value.date, timestampTimezone),
      iso: result.value.date.toISOString(),
      relative: formatRelativeTime(result.value.date, now.getTime()),
      timezone: formatTimezone(result.value.date, timestampTimezone),
      normalized: result.value.normalized,
      subMillisecondNanoseconds: result.value.subMillisecondNanoseconds.toString()
    }
  }, [now, timestampInput, timestampTimezone, timestampUnit])

  const dateResult = useMemo<DateResult>(() => {
    const result = parseDateTimeInput(dateInput, dateTimezone)
    if (!result.ok) return result

    return {
      ok: true,
      date: result.value,
      timestamp: formatTimestamp(result.value, dateOutputUnit),
      milliseconds: formatTimestamp(result.value, "milliseconds"),
      iso: result.value.toISOString(),
      relative: formatRelativeTime(result.value, now.getTime()),
      timezone: formatTimezone(result.value, dateTimezone)
    }
  }, [dateInput, dateOutputUnit, dateTimezone, now])

  return {
    now,
    timestampInput,
    timestampUnit,
    timestampTimezone,
    dateInput,
    dateTimezone,
    dateOutputUnit,
    timestampResult,
    dateResult,
    setNow,
    setTimestampInput,
    setTimestampUnit,
    setTimestampTimezone,
    setDateInput,
    setDateTimezone,
    setDateOutputUnit,
    setCurrentTimestamp: () => setTimestampInput(formatTimestamp(now, timestampUnit)),
    setCurrentDate: () => setDateInput(getCurrentDateTimeInput(dateTimezone))
  }
}
