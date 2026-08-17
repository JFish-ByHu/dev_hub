export type RegexFlagKey = "global" | "ignoreCase" | "multiline" | "dotAll" | "unicode" | "sticky"

export type RegexFlags = Record<RegexFlagKey, boolean>

export interface RegexPreset {
  id: string
  label: string
  pattern: string
  flags: RegexFlags
  description: string
}

export interface RegexMatch {
  value: string
  index: number
  groups: string[]
  namedGroups: Array<{ name: string; value: string }>
}

export type RegexAnalysis =
  | { kind: "empty"; message: string }
  | { kind: "error"; message: string }
  | {
      kind: "success"
      matches: RegexMatch[]
      replacement: string
      replacedText: string
      flags: string
      pattern: string
    }

export const DEFAULT_REGEX_FLAGS: RegexFlags = {
  global: true,
  ignoreCase: false,
  multiline: false,
  dotAll: false,
  unicode: false,
  sticky: false
}

export const DEFAULT_REGEX_PATTERN = String.raw`\b[A-Za-z]+\b`
export const DEFAULT_REGEX_TEXT = "DevHub makes regex testing easier."

export const REGEX_FLAG_OPTIONS: Array<{
  key: RegexFlagKey
  label: string
  flag: string
  description: string
}> = [
  { key: "global", label: "Global", flag: "g", description: "Find every match" },
  { key: "ignoreCase", label: "Ignore case", flag: "i", description: "Match A and a" },
  { key: "multiline", label: "Multiline", flag: "m", description: "^ and $ per line" },
  { key: "dotAll", label: "Dot all", flag: "s", description: "Dot matches newlines" },
  { key: "unicode", label: "Unicode", flag: "u", description: "Unicode code points" },
  { key: "sticky", label: "Sticky", flag: "y", description: "Match at lastIndex" }
]

const allFlags = (overrides: Partial<RegexFlags> = {}): RegexFlags => ({
  ...DEFAULT_REGEX_FLAGS,
  ...overrides
})

export const REGEX_PRESETS: RegexPreset[] = [
  {
    id: "email",
    label: "Email address",
    pattern: String.raw`^[\w.+-]+@[\w-]+(?:\.[\w-]+)+$`,
    flags: allFlags({ global: false, ignoreCase: true }),
    description: "A practical email shape with a required domain suffix."
  },
  {
    id: "url",
    label: "HTTP(S) URL",
    pattern: String.raw`https?:\/\/[^\s/$.?#].[^\s]*`,
    flags: allFlags({ global: true, ignoreCase: true }),
    description: "Finds URLs that begin with http:// or https://."
  },
  {
    id: "ipv4",
    label: "IPv4 address",
    pattern: String.raw`\b(?:\d{1,3}\.){3}\d{1,3}\b`,
    flags: allFlags({ global: true }),
    description: "Locates IPv4-shaped values; validate numeric ranges separately."
  },
  {
    id: "uuid",
    label: "UUID",
    pattern: String.raw`\b[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}\b`,
    flags: allFlags({ global: true, ignoreCase: true }),
    description: "Matches the canonical UUID format for versions 1–5."
  },
  {
    id: "date",
    label: "ISO date",
    pattern: String.raw`\b\d{4}-\d{2}-\d{2}\b`,
    flags: allFlags({ global: true }),
    description: "Finds dates in YYYY-MM-DD form."
  },
  {
    id: "digits",
    label: "Digits only",
    pattern: String.raw`^\d+$`,
    flags: allFlags({ global: false }),
    description: "Validates a value containing one or more ASCII digits."
  },
  {
    id: "whitespace",
    label: "Whitespace runs",
    pattern: String.raw`\s+`,
    flags: allFlags({ global: true }),
    description: "Finds one or more whitespace characters for cleanup."
  }
]

export function flagsToString(flags: RegexFlags) {
  return REGEX_FLAG_OPTIONS.filter((option) => flags[option.key])
    .map((option) => option.flag)
    .join("")
}

function getMatchGroups(match: RegExpExecArray): RegexMatch {
  return {
    value: match[0],
    index: match.index,
    groups: match.slice(1).map((value) => value ?? ""),
    namedGroups: Object.entries(match.groups ?? {}).map(([name, value]) => ({
      name,
      value: value ?? ""
    }))
  }
}

export function analyzeRegex(
  pattern: string,
  flags: RegexFlags,
  testText: string,
  replacement: string
): RegexAnalysis {
  if (!pattern.trim()) {
    return { kind: "empty", message: "Enter a regular expression to start testing." }
  }

  const flagText = flagsToString(flags)

  try {
    const regex = new RegExp(pattern, flagText)
    const matches: RegexMatch[] = []

    if (testText) {
      if (regex.global || regex.sticky) {
        let match: RegExpExecArray | null
        let safetyCounter = 0

        while ((match = regex.exec(testText)) !== null && safetyCounter < 10000) {
          matches.push(getMatchGroups(match))
          safetyCounter += 1

          if (match[0] === "") {
            regex.lastIndex += 1
          }
        }
      } else {
        const match = regex.exec(testText)
        if (match) matches.push(getMatchGroups(match))
      }
    }

    regex.lastIndex = 0
    const replacedText = testText ? testText.replace(regex, replacement) : ""

    return {
      kind: "success",
      matches,
      replacement,
      replacedText,
      flags: flagText,
      pattern
    }
  } catch (error) {
    return {
      kind: "error",
      message: error instanceof Error ? error.message : "The regular expression is invalid."
    }
  }
}
