export type DownloadData = string | Uint8Array | Blob

export function downloadFile(
  data: DownloadData,
  filename: string,
  type = "application/octet-stream"
) {
  const blob =
    data instanceof Blob
      ? data
      : typeof data === "string"
        ? new Blob([data], { type })
        : new Blob([data.buffer as ArrayBuffer], { type })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement("a")
  anchor.href = url
  anchor.download = filename
  anchor.click()
  anchor.remove()
  window.setTimeout(() => URL.revokeObjectURL(url), 0)
}

export const MAX_TOOL_FILE_SIZE = 10 * 1024 * 1024
