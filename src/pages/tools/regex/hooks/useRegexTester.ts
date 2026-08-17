import { useMemo, useState } from "react"
import {
  analyzeRegex,
  DEFAULT_REGEX_FLAGS,
  DEFAULT_REGEX_PATTERN,
  DEFAULT_REGEX_TEXT,
  REGEX_PRESETS,
  type RegexFlagKey,
  type RegexFlags,
  type RegexPreset
} from "../utils/regex"

export function useRegexTester() {
  const [pattern, setPattern] = useState(DEFAULT_REGEX_PATTERN)
  const [flags, setFlags] = useState<RegexFlags>(DEFAULT_REGEX_FLAGS)
  const [testText, setTestText] = useState(DEFAULT_REGEX_TEXT)
  const [replacement, setReplacement] = useState("")
  const [selectedPreset, setSelectedPreset] = useState(REGEX_PRESETS[0])

  const analysis = useMemo(
    () => analyzeRegex(pattern, flags, testText, replacement),
    [flags, pattern, replacement, testText]
  )

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
    analysis,
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
