import { useMemo, useState } from "react"
import { COLOR_PRESETS, getContrastEvaluation, parseColor } from "../utils/color"

export function useColorContrast() {
  const [foreground, setForeground] = useState(COLOR_PRESETS[0].foreground)
  const [background, setBackground] = useState(COLOR_PRESETS[0].background)

  const foregroundColor = useMemo(() => parseColor(foreground), [foreground])
  const backgroundColor = useMemo(() => parseColor(background), [background])
  const contrast = useMemo(
    () =>
      foregroundColor && backgroundColor
        ? getContrastEvaluation(foregroundColor, backgroundColor)
        : null,
    [backgroundColor, foregroundColor]
  )

  const swap = () => {
    setForeground(background)
    setBackground(foreground)
  }

  const applyPreset = (preset: { foreground: string; background: string }) => {
    setForeground(preset.foreground)
    setBackground(preset.background)
  }

  const clear = () => {
    setForeground("")
    setBackground("")
  }

  return {
    foreground,
    background,
    foregroundColor,
    backgroundColor,
    contrast,
    setForeground,
    setBackground,
    swap,
    applyPreset,
    clear
  }
}
