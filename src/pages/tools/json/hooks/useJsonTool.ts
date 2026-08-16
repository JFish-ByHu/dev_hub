import { useMemo, useState } from "react"
import { message } from "antd"
import { JSON_EXAMPLE, getJsonStats, parseJson, serializeJson } from "../utils/json"

export function useJsonTool() {
  const [inputVal, setInputVal] = useState("")
  const [parsedData, setParsedData] = useState<unknown | undefined>(undefined)
  const [error, setError] = useState<string | null>(null)

  const parseAndSet = (value: string) => {
    setInputVal(value)
    const result = parseJson(value)
    if (result.ok) {
      setParsedData(result.data)
      setError(null)
    } else if (!value.trim()) {
      setParsedData(undefined)
      setError(null)
    } else {
      setParsedData(undefined)
      setError(result.error)
    }
    return result
  }

  const clearJson = () => {
    setInputVal("")
    setParsedData(undefined)
    setError(null)
  }

  const formatJson = () => {
    if (!isValid) return
    setInputVal(serializeJson(parsedData, true))
    message.success("JSON formatted successfully")
  }

  const minifyJson = () => {
    if (!isValid) return
    setInputVal(serializeJson(parsedData, false))
    message.success("JSON minified successfully")
  }

  const downloadJson = () => {
    if (!isValid) return
    const blob = new Blob([serializeJson(parsedData, true)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement("a")
    anchor.href = url
    anchor.download = "formatted.json"
    anchor.click()
    URL.revokeObjectURL(url)
    message.success("JSON file downloaded")
  }

  const loadExample = () => {
    parseAndSet(JSON_EXAMPLE)
    message.success("Example JSON loaded")
  }

  const processFile = async (file: File) => {
    try {
      const content = await file.text()
      const result = parseAndSet(content)
      if (result.ok) {
        message.success("File parsed successfully")
      } else {
        message.error("Failed to parse file: Invalid JSON")
      }
    } catch {
      setError("Unable to read this file.")
      setParsedData(undefined)
      message.error("Failed to read file")
    }
  }

  const isValid = parsedData !== undefined && error === null
  const formattedJson = useMemo(
    () => (isValid ? serializeJson(parsedData, true) : ""),
    [isValid, parsedData]
  )
  const stats = useMemo(() => getJsonStats(inputVal), [inputVal])

  return {
    inputVal,
    parsedData,
    error,
    isValid,
    formattedJson,
    stats,
    parseAndSet,
    processFile,
    formatJson,
    minifyJson,
    downloadJson,
    loadExample,
    clearJson
  }
}
