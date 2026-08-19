import { useMemo, useState } from "react"
import { message } from "antd"
import { useDebouncedWorkerTask } from "../../../../hooks/useDebouncedWorkerTask"
import {
  JSON_EXAMPLE,
  MAX_JSON_INPUT_CHARACTERS,
  getJsonStats,
  type JsonAnalysis
} from "../utils/json"
import { downloadFile, MAX_TOOL_FILE_SIZE } from "../../../../utils/download"

const EMPTY_ANALYSIS: JsonAnalysis = { kind: "empty" }
const JSON_WORKER_URL = new URL("../workers/jsonWorker.ts", import.meta.url)
const JSON_WORKER_ERROR: JsonAnalysis = {
  kind: "error",
  error: "The JSON worker could not finish parsing this input."
}
const JSON_TIMEOUT_ERROR: JsonAnalysis = {
  kind: "error",
  error: "The JSON input took too long to analyze."
}

export function useJsonTool() {
  const [inputVal, setInputVal] = useState("")
  const [parseNestedJsonStrings, setParseNestedJsonStrings] = useState(false)
  const workerInput = useMemo(
    () =>
      inputVal.trim() && inputVal.length <= MAX_JSON_INPUT_CHARACTERS
        ? { value: inputVal, parseNestedJsonStrings }
        : null,
    [inputVal, parseNestedJsonStrings]
  )
  const { data: workerAnalysis, isPending } = useDebouncedWorkerTask<
    NonNullable<typeof workerInput>,
    JsonAnalysis
  >({
    input: workerInput,
    workerUrl: JSON_WORKER_URL,
    timeout: 2000,
    workerError: JSON_WORKER_ERROR,
    timeoutError: JSON_TIMEOUT_ERROR
  })

  const analysis = useMemo<JsonAnalysis>(() => {
    if (!inputVal.trim()) return EMPTY_ANALYSIS
    if (inputVal.length > MAX_JSON_INPUT_CHARACTERS) {
      return {
        kind: "error",
        error: `JSON input is limited to ${MAX_JSON_INPUT_CHARACTERS.toLocaleString()} characters.`
      }
    }
    if (isPending || !workerAnalysis) return { kind: "pending" }
    return workerAnalysis
  }, [inputVal, isPending, workerAnalysis])

  const setInput = (value: string) => setInputVal(value)

  const clearJson = () => setInput("")

  const formatJson = () => {
    if (analysis.kind !== "success") return
    setInput(analysis.formatted)
    message.success("JSON formatted successfully")
  }

  const minifyJson = () => {
    if (analysis.kind !== "success") return
    setInput(analysis.minified)
    message.success("JSON minified successfully")
  }

  const downloadJson = () => {
    if (analysis.kind !== "success") return
    downloadFile(analysis.formatted, "formatted.json", "application/json")
    message.success("JSON file downloaded")
  }

  const loadExample = () => {
    setInput(JSON_EXAMPLE)
    message.success("Example JSON loaded")
  }

  const processFile = async (file: File) => {
    if (file.size > MAX_TOOL_FILE_SIZE) {
      message.error("JSON files must be smaller than 10 MB.")
      return
    }

    try {
      setInput(await file.text())
      message.success("File loaded; validating JSON")
    } catch {
      message.error("Failed to read file")
    }
  }

  const isValid = analysis.kind === "success"
  const formattedJson = useMemo(
    () => (analysis.kind === "success" ? analysis.formatted : ""),
    [analysis]
  )
  const stats = useMemo(() => getJsonStats(inputVal), [inputVal])

  return {
    inputVal,
    analysis,
    isParsing: isPending && workerInput !== null,
    isValid,
    formattedJson,
    stats,
    setInput,
    processFile,
    formatJson,
    minifyJson,
    downloadJson,
    loadExample,
    clearJson,
    parseNestedJsonStrings,
    setParseNestedJsonStrings
  }
}
