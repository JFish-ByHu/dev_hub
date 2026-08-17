import { useMemo, useState } from "react"
import { generateUuidBatch, type UuidFormatOptions, type UuidVersion } from "../utils/uuid"

const DEFAULT_COUNT = 5

export function useUuidGenerator() {
  const [version, setVersion] = useState<UuidVersion>("v4")
  const [count, setCount] = useState(DEFAULT_COUNT)
  const [uppercase, setUppercase] = useState(false)
  const [hyphens, setHyphens] = useState(true)
  const [values, setValues] = useState<string[]>(() =>
    generateUuidBatch("v4", DEFAULT_COUNT, { uppercase: false, hyphens: true })
  )

  const formatOptions = useMemo<UuidFormatOptions>(
    () => ({ uppercase, hyphens }),
    [hyphens, uppercase]
  )

  const regenerate = () => {
    setValues(generateUuidBatch(version, count, formatOptions))
  }

  const clear = () => setValues([])

  return {
    version,
    count,
    uppercase,
    hyphens,
    values,
    formatOptions,
    setVersion,
    setCount,
    setUppercase,
    setHyphens,
    regenerate,
    clear
  }
}
