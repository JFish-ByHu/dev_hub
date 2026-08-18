import { useMemo, useState } from "react"
import { useDebouncedWorkerTask } from "../../../../hooks/useDebouncedWorkerTask"
import {
  analyzeRegex,
  DEFAULT_REGEX_FLAGS,
  DEFAULT_REGEX_PATTERN,
  DEFAULT_REGEX_TEXT,
  REGEX_PRESETS,
  type RegexAnalysis,
  type RegexFlagKey,
  type RegexFlags,
  type RegexPreset
} from "../utils/regex"

const REGEX_WORKER_URL = new URL("../workers/regexWorker.ts", import.meta.url)
const REGEX_WORKER_ERROR: RegexAnalysis = {
  kind: "error",
  message: "The regular expression could not be evaluated."
}
const REGEX_TIMEOUT_ERROR: RegexAnalysis = {
  kind: "error",
  message: "The expression took too long to evaluate. Try a simpler pattern or less text."
}

export function useRegexTester() {
  const [pattern, setPattern] = useState(DEFAULT_REGEX_PATTERN)
  const [flags, setFlags] = useState<RegexFlags>(DEFAULT_REGEX_FLAGS)
  const [testText, setTestText] = useState(DEFAULT_REGEX_TEXT)
  const [replacement, setReplacement] = useState("")
  const [selectedPreset, setSelectedPreset] = useState(REGEX_PRESETS[0])

  const initialAnalysis = useMemo(
    () => analyzeRegex(DEFAULT_REGEX_PATTERN, DEFAULT_REGEX_FLAGS, DEFAULT_REGEX_TEXT, ""),
    []
  )
  const workerInput = useMemo(
    () => ({ pattern, flags, testText, replacement }),
    [flags, pattern, replacement, testText]
  )
  const { data: analysis, isPending: isAnalyzing } = useDebouncedWorkerTask<
    typeof workerInput,
    RegexAnalysis
  >({
    input: workerInput,
    workerUrl: REGEX_WORKER_URL,
    initialData: initialAnalysis,
    timeout: 1200,
    workerError: REGEX_WORKER_ERROR,
    timeoutError: REGEX_TIMEOUT_ERROR
  })

  const setFlag = (key: RegexFlagKey, value: boolean) => {
    setFlags((current) => ({ ...current, [key]: value }))
  }

  const usePreset = (preset: RegexPreset) => {
    setSelectedPreset(preset)
    setPattern(preset.pattern)
    setFlags(preset.flags)
  }

  const loadExample = () => {
    setPattern(DEFAULT_REGEX_PATTERN)
    setFlags(DEFAULT_REGEX_FLAGS)
    setSelectedPreset(REGEX_PRESETS[0])
    setTestText(DEFAULT_REGEX_TEXT)
    setReplacement("")
  }

  const clear = () => {
    setPattern("")
    setTestText("")
    setReplacement("")
  }

  return {
    pattern,
    flags,
    testText,
    replacement,
    selectedPreset,
    analysis: analysis ?? initialAnalysis,
    isAnalyzing,
    setPattern,
    setFlag,
    setTestText,
    setReplacement,
    usePreset,
    setSelectedPreset,
    loadExample,
    clear
  }
}
