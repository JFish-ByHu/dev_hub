import { useMemo, useRef, useState } from "react"
import {
  getMarkdownStats,
  MARKDOWN_EXAMPLE,
  MARKDOWN_IMAGE_PREFIX,
  type MarkdownAssetMap
} from "../utils/markdown"

export function useMarkdownEditor() {
  const [value, setValue] = useState(MARKDOWN_EXAMPLE)
  const [assets, setAssets] = useState<MarkdownAssetMap>({})
  const assetIndexRef = useRef(0)
  const stats = useMemo(() => getMarkdownStats(value), [value])

  const loadExample = () => {
    setValue(MARKDOWN_EXAMPLE)
    setAssets({})
  }

  const loadMarkdown = (markdown: string) => {
    setValue(markdown)
    setAssets({})
  }

  const clear = () => {
    setValue("")
    setAssets({})
  }

  const addAsset = (dataUrl: string) => {
    assetIndexRef.current += 1
    const reference = `${MARKDOWN_IMAGE_PREFIX}image-${assetIndexRef.current}`
    setAssets((current) => ({ ...current, [reference]: dataUrl }))
    return reference
  }

  return {
    value,
    stats,
    assets,
    setValue,
    loadMarkdown,
    addAsset,
    loadExample,
    clear
  }
}
