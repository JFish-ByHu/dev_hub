import { analyzeJson, type JsonAnalysis } from "../utils/json"

interface JsonWorkerScope {
  onmessage: (event: MessageEvent<string>) => void
  postMessage: (value: JsonAnalysis) => void
}

const workerScope = self as unknown as JsonWorkerScope

workerScope.onmessage = ({ data }) => {
  workerScope.postMessage(analyzeJson(data))
}
