import { useEffect, useState } from "react"

export interface UseDebouncedWorkerTaskOptions<TInput, TOutput> {
  input: TInput | null
  workerUrl: URL
  initialData?: TOutput | null
  delay?: number
  timeout?: number
  workerError: TOutput
  timeoutError: TOutput
}

export function useDebouncedWorkerTask<TInput, TOutput>({
  input,
  workerUrl,
  initialData = null,
  delay = 180,
  timeout = 2000,
  workerError,
  timeoutError
}: UseDebouncedWorkerTaskOptions<TInput, TOutput>) {
  const [data, setData] = useState<TOutput | null>(initialData)
  const [isTaskPending, setIsTaskPending] = useState(false)

  useEffect(() => {
    let active = true
    let worker: Worker | null = null
    let timeoutId: number | undefined

    const finish = (nextData: TOutput) => {
      if (!active) return
      if (timeoutId !== undefined) window.clearTimeout(timeoutId)
      worker?.terminate()
      worker = null
      setData(nextData)
      setIsTaskPending(false)
    }

    if (input === null) {
      return () => {
        active = false
      }
    }

    const debounceId = window.setTimeout(() => {
      if (!active) return

      setIsTaskPending(true)
      try {
        worker = new Worker(workerUrl, { type: "module" })
        worker.onmessage = (event: MessageEvent<TOutput>) => finish(event.data)
        worker.onerror = () => finish(workerError)
        timeoutId = window.setTimeout(() => finish(timeoutError), timeout)
        worker.postMessage(input)
      } catch {
        finish(workerError)
      }
    }, delay)

    return () => {
      active = false
      window.clearTimeout(debounceId)
      if (timeoutId !== undefined) window.clearTimeout(timeoutId)
      worker?.terminate()
    }
  }, [delay, input, timeout, timeoutError, workerError, workerUrl])

  return { data, isPending: input !== null && isTaskPending }
}
