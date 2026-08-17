import { useMemo, useState } from "react"
import {
  BASE_CONVERT_EXAMPLE,
  RADIX_OPTIONS,
  formatRadixValue,
  getIntegerDetails,
  parseRadixValue,
  type Radix
} from "../utils/baseConvert"

export interface RadixOutput {
  radix: Radix
  label: string
  shortLabel: string
  value: string
}

export type BaseConvertResult =
  | { kind: "empty"; message: string }
  | { kind: "error"; message: string }
  | {
      kind: "success"
      value: bigint
      outputs: RadixOutput[]
      details: ReturnType<typeof getIntegerDetails>
    }

export function useBaseConvert() {
  const [sourceRadix, setSourceRadix] = useState<Radix>(10)
  const [input, setInput] = useState("")
  const [includePrefix, setIncludePrefix] = useState(false)
  const [uppercaseHex, setUppercaseHex] = useState(true)

  const conversion = useMemo<BaseConvertResult>(() => {
    if (!input.trim()) {
      return { kind: "empty", message: "Enter a number to convert." }
    }

    try {
      const value = parseRadixValue(input, sourceRadix)
      return {
        kind: "success",
        value,
        outputs: RADIX_OPTIONS.map((option) => ({
          radix: option.value,
          label: option.label,
          shortLabel: option.shortLabel,
          value: formatRadixValue(value, option.value, includePrefix, uppercaseHex)
        })),
        details: getIntegerDetails(value)
      }
    } catch (error) {
      return {
        kind: "error",
        message: error instanceof Error ? error.message : "Unable to convert this number."
      }
    }
  }, [includePrefix, input, sourceRadix, uppercaseHex])

  const loadExample = () => {
    setSourceRadix(10)
    setInput(BASE_CONVERT_EXAMPLE)
  }

  const clear = () => setInput("")

  return {
    sourceRadix,
    input,
    includePrefix,
    uppercaseHex,
    conversion,
    setSourceRadix,
    setInput,
    setIncludePrefix,
    setUppercaseHex,
    loadExample,
    clear
  }
}
