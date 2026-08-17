export interface RgbaColor {
  r: number
  g: number
  b: number
  a: number
}

export interface ContrastLevel {
  label: "AAA" | "AA" | "Fail"
  passed: boolean
  threshold: number
}

export interface ContrastEvaluation {
  ratio: number
  normal: ContrastLevel
  large: ContrastLevel
}

export const COLOR_PRESETS = [
  { label: "Deep blue on white", foreground: "#2F27CE", background: "#FFFFFF" },
  { label: "Charcoal on soft gray", foreground: "#1F2937", background: "#F3F4F6" },
  { label: "White on dark surface", foreground: "#FFFFFF", background: "#12121A" },
  { label: "Accessible green", foreground: "#166534", background: "#DCFCE7" }
]

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function parseChannel(value: string) {
  if (value.endsWith("%")) {
    const percentage = Number.parseFloat(value.slice(0, -1))
    return Number.isFinite(percentage) ? clamp(Math.round((percentage / 100) * 255), 0, 255) : null
  }

  const channel = Number.parseFloat(value)
  return Number.isFinite(channel) ? clamp(Math.round(channel), 0, 255) : null
}

function parseAlpha(value: string | undefined) {
  if (value === undefined) return 1
  if (value.endsWith("%")) {
    const percentage = Number.parseFloat(value.slice(0, -1))
    return Number.isFinite(percentage) ? clamp(percentage / 100, 0, 1) : null
  }

  const alpha = Number.parseFloat(value)
  return Number.isFinite(alpha) ? clamp(alpha, 0, 1) : null
}

function hueToRgb(p: number, q: number, t: number) {
  let value = t
  if (value < 0) value += 1
  if (value > 1) value -= 1
  if (value < 1 / 6) return p + (q - p) * 6 * value
  if (value < 1 / 2) return q
  if (value < 2 / 3) return p + (q - p) * (2 / 3 - value) * 6
  return p
}

function hslToRgb(hue: number, saturation: number, lightness: number, alpha: number): RgbaColor {
  const h = (((hue % 360) + 360) % 360) / 360
  const s = clamp(saturation / 100, 0, 1)
  const l = clamp(lightness / 100, 0, 1)

  if (s === 0) {
    const value = Math.round(l * 255)
    return { r: value, g: value, b: value, a: alpha }
  }

  const q = l < 0.5 ? l * (1 + s) : l + s - l * s
  const p = 2 * l - q
  return {
    r: Math.round(hueToRgb(p, q, h + 1 / 3) * 255),
    g: Math.round(hueToRgb(p, q, h) * 255),
    b: Math.round(hueToRgb(p, q, h - 1 / 3) * 255),
    a: alpha
  }
}

function parseFunctionColor(value: string): RgbaColor | null {
  const match = value.match(/^(rgba?|hsla?)\((.*)\)$/i)
  if (!match) return null

  const functionName = match[1].toLowerCase()
  const tokens = match[2].replace(/\//g, " ").replace(/,/g, " ").trim().split(/\s+/)
  if (tokens.length < 3) return null

  const alpha = parseAlpha(tokens[3])
  if (alpha === null) return null

  if (functionName.startsWith("rgb")) {
    const channels = tokens.slice(0, 3).map(parseChannel)
    if (channels.some((channel) => channel === null)) return null
    return { r: channels[0]!, g: channels[1]!, b: channels[2]!, a: alpha }
  }

  const hue = Number.parseFloat(tokens[0].replace("deg", ""))
  const saturation = Number.parseFloat(tokens[1].replace("%", ""))
  const lightness = Number.parseFloat(tokens[2].replace("%", ""))
  if (![hue, saturation, lightness].every(Number.isFinite)) return null
  return hslToRgb(hue, saturation, lightness, alpha)
}

export function parseColor(input: string): RgbaColor | null {
  const value = input.trim()
  if (!value) return null

  const hex = value.replace(/^#/, "")
  if (/^[\da-f]{3,4}$/i.test(hex) || /^[\da-f]{6}(?:[\da-f]{2})?$/i.test(hex)) {
    const expanded =
      hex.length <= 4
        ? hex
            .split("")
            .map((char) => char + char)
            .join("")
        : hex
    return {
      r: Number.parseInt(expanded.slice(0, 2), 16),
      g: Number.parseInt(expanded.slice(2, 4), 16),
      b: Number.parseInt(expanded.slice(4, 6), 16),
      a: expanded.length === 8 ? Number.parseInt(expanded.slice(6, 8), 16) / 255 : 1
    }
  }

  return parseFunctionColor(value)
}

function formatAlpha(alpha: number) {
  return Number(alpha.toFixed(3)).toString()
}

function toHexByte(value: number) {
  return value.toString(16).padStart(2, "0").toUpperCase()
}

export function formatHex(color: RgbaColor) {
  const hex = `#${toHexByte(color.r)}${toHexByte(color.g)}${toHexByte(color.b)}`
  return color.a < 1 ? `${hex}${toHexByte(Math.round(color.a * 255))}` : hex
}

export function formatRgb(color: RgbaColor) {
  const channels = `${color.r}, ${color.g}, ${color.b}`
  return color.a < 1 ? `rgba(${channels}, ${formatAlpha(color.a)})` : `rgb(${channels})`
}

export function formatHsl(color: RgbaColor) {
  const r = color.r / 255
  const g = color.g / 255
  const b = color.b / 255
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const delta = max - min
  const lightness = (max + min) / 2
  let hue = 0
  let saturation = 0

  if (delta !== 0) {
    saturation = delta / (1 - Math.abs(2 * lightness - 1))
    if (max === r) hue = 60 * (((g - b) / delta) % 6)
    else if (max === g) hue = 60 * ((b - r) / delta + 2)
    else hue = 60 * ((r - g) / delta + 4)
  }

  hue = (hue + 360) % 360
  const result = `hsl(${Math.round(hue)}, ${Math.round(saturation * 100)}%, ${Math.round(lightness * 100)}%)`
  return color.a < 1
    ? `hsla(${Math.round(hue)}, ${Math.round(saturation * 100)}%, ${Math.round(lightness * 100)}%, ${formatAlpha(color.a)})`
    : result
}

export function formatCssColor(color: RgbaColor) {
  return `rgba(${color.r}, ${color.g}, ${color.b}, ${formatAlpha(color.a)})`
}

function composite(foreground: RgbaColor, background: RgbaColor): RgbaColor {
  const alpha = foreground.a + background.a * (1 - foreground.a)
  if (alpha === 0) return { r: 255, g: 255, b: 255, a: 0 }

  return {
    r: Math.round(
      (foreground.r * foreground.a + background.r * background.a * (1 - foreground.a)) / alpha
    ),
    g: Math.round(
      (foreground.g * foreground.a + background.g * background.a * (1 - foreground.a)) / alpha
    ),
    b: Math.round(
      (foreground.b * foreground.a + background.b * background.a * (1 - foreground.a)) / alpha
    ),
    a: alpha
  }
}

function relativeLuminance(color: RgbaColor) {
  const channels = [color.r, color.g, color.b].map((channel) => channel / 255)
  const linear = channels.map((channel) =>
    channel <= 0.03928 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4
  )
  return linear[0] * 0.2126 + linear[1] * 0.7152 + linear[2] * 0.0722
}

export function getContrastEvaluation(
  foreground: RgbaColor,
  background: RgbaColor
): ContrastEvaluation {
  const opaqueBackground = composite(background, { r: 255, g: 255, b: 255, a: 1 })
  const opaqueForeground = composite(foreground, opaqueBackground)
  const foregroundLuminance = relativeLuminance(opaqueForeground)
  const backgroundLuminance = relativeLuminance(opaqueBackground)
  const ratio =
    (Math.max(foregroundLuminance, backgroundLuminance) + 0.05) /
    (Math.min(foregroundLuminance, backgroundLuminance) + 0.05)

  const normal: ContrastLevel =
    ratio >= 7
      ? { label: "AAA", passed: true, threshold: 7 }
      : ratio >= 4.5
        ? { label: "AA", passed: true, threshold: 4.5 }
        : { label: "Fail", passed: false, threshold: 4.5 }
  const large: ContrastLevel =
    ratio >= 4.5
      ? { label: "AAA", passed: true, threshold: 4.5 }
      : ratio >= 3
        ? { label: "AA", passed: true, threshold: 3 }
        : { label: "Fail", passed: false, threshold: 3 }

  return { ratio, normal, large }
}

export function getTextColor(color: RgbaColor) {
  return formatCssColor(color)
}
