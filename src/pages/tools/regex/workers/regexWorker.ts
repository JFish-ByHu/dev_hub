import { analyzeRegex, type RegexAnalysis, type RegexFlags } from "../utils/regex"

interface RegexWorkerRequest {
  pattern: string
  flags: RegexFlags
  testText: string
  replacement: string
}

interface RegexWorkerScope {
  onmessage: (event: MessageEvent<RegexWorkerRequest>) => void
  postMessage: (value: RegexAnalysis) => void
}

const workerScope = self as unknown as RegexWorkerScope

workerScope.onmessage = ({ data }) => {
  workerScope.postMessage(analyzeRegex(data.pattern, data.flags, data.testText, data.replacement))
}
