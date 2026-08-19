import { analyzeJson, type JsonAnalysis, type JsonAnalyzeOptions } from "../utils/json"

interface JsonWorkerRequest extends JsonAnalyzeOptions {
  value: string
}

interface JsonWorkerScope {
  onmessage: (event: MessageEvent<JsonWorkerRequest>) => void
  postMessage: (value: JsonAnalysis) => void
}

const workerScope = self as unknown as JsonWorkerScope

workerScope.onmessage = ({ data }) => {
  workerScope.postMessage(analyzeJson(data.value, data))
}
