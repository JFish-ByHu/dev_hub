import { useMemo, useState } from "react"
import {
  URL_EXAMPLE,
  decodeUrl,
  encodeUrl,
  getUrlStats,
  inspectUrl,
  type UrlEncodingMode,
  type UrlOperation
} from "../utils/url"

export type UrlConversionResult =
  | { kind: "empty"; message: string }
  | { kind: "error"; message: string }
  | { kind: "success"; output: string }

export function useUrlCodec() {
  const [operation, setOperation] = useState<UrlOperation>("encode")
  const [encodingMode, setEncodingMode] = useState<UrlEncodingMode>("component")
  const [input, setInput] = useState("")

  const conversion = useMemo<UrlConversionResult>(() => {
    if (!input) {
      return {
        kind: "empty",
        message:
          operation === "encode"
            ? "Enter a URL or text to encode."
            : "Enter an encoded URL to decode."
      }
    }

    try {
      return {
        kind: "success",
        output:
          operation === "encode" ? encodeUrl(input, encodingMode) : decodeUrl(input, encodingMode)
      }
    } catch {
      return {
        kind: "error",
        message: "The input contains an invalid percent-encoding sequence."
      }
    }
  }, [encodingMode, input, operation])

  const output = conversion.kind === "success" ? conversion.output : ""
  const detailsValue = operation === "encode" ? input : output
  const details = useMemo(() => inspectUrl(detailsValue), [detailsValue])
  const inputStats = useMemo(() => getUrlStats(input), [input])
  const outputStats = useMemo(() => getUrlStats(output), [output])

  const swapValues = () => {
    if (conversion.kind !== "success") return
    setInput(conversion.output)
    setOperation((current) => (current === "encode" ? "decode" : "encode"))
  }

  const loadExample = () => {
    setOperation("encode")
    setEncodingMode("component")
    setInput(URL_EXAMPLE)
  }

  const clear = () => setInput("")

  return {
    operation,
    encodingMode,
    input,
    output,
    conversion,
    details,
    inputStats,
    outputStats,
    setOperation,
    setEncodingMode,
    setInput,
    swapValues,
    loadExample,
    clear
  }
}
