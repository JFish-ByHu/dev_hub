import { useMemo, useState } from "react"
import { message } from "antd"
import {
  decodeBase64,
  encodeBase64Bytes,
  type Base64Variant,
  textToUtf8Bytes
} from "../utils/base64"

export type ConversionMode = "encode" | "decode"

export type ConversionResult =
  | { kind: "empty"; message: string }
  | { kind: "error"; message: string }
  | {
      kind: "encode"
      output: string
      inputBytes: number
      outputBytes: number
    }
  | {
      kind: "decode"
      output: string
      text: string | null
      bytes: Uint8Array
      inputBytes: number
    }

export function useBase64Conversion() {
  const [mode, setMode] = useState<ConversionMode>("encode")
  const [variant, setVariant] = useState<Base64Variant>("standard")
  const [includePadding, setIncludePadding] = useState(true)
  const [input, setInput] = useState("")
  const [fileBytes, setFileBytes] = useState<Uint8Array | null>(null)
  const [fileName, setFileName] = useState<string | null>(null)

  const conversion = useMemo<ConversionResult>(() => {
    if (mode === "encode") {
      if (!input && !fileBytes) {
        return { kind: "empty", message: "Enter text or load a file to encode." }
      }

      const bytes = fileBytes ?? textToUtf8Bytes(input)
      const output = encodeBase64Bytes(bytes, { variant, includePadding })
      return {
        kind: "encode",
        output,
        inputBytes: bytes.byteLength,
        outputBytes: output.length
      }
    }

    if (!input.trim()) {
      return { kind: "empty", message: "Enter a Base64 value to decode." }
    }

    try {
      const decoded = decodeBase64(input)
      return {
        kind: "decode",
        output: decoded.text ?? "",
        text: decoded.text,
        bytes: decoded.bytes,
        inputBytes: input.replace(/\s/g, "").length
      }
    } catch (error) {
      return {
        kind: "error",
        message: error instanceof Error ? error.message : "The input could not be decoded."
      }
    }
  }, [fileBytes, includePadding, input, mode, variant])

  const changeMode = (nextMode: ConversionMode) => {
    setMode(nextMode)
    setInput("")
    setFileBytes(null)
    setFileName(null)
  }

  const clearInput = () => {
    setInput("")
    setFileBytes(null)
    setFileName(null)
  }

  const setTextInput = (value: string) => {
    setInput(value)
    setFileBytes(null)
    setFileName(null)
  }

  const processFile = async (file: File) => {
    if (mode === "encode") {
      setFileBytes(new Uint8Array(await file.arrayBuffer()))
      setFileName(file.name)
      setInput("")
      message.success(`Loaded ${file.name}`)
      return
    }

    setTextInput(await file.text())
    setFileName(file.name)
    message.success(`Loaded ${file.name}`)
  }

  return {
    mode,
    variant,
    includePadding,
    input,
    fileBytes,
    fileName,
    conversion,
    isBinaryDecode: conversion.kind === "decode" && conversion.text === null,
    outputValue:
      conversion.kind === "encode" || conversion.kind === "decode" ? conversion.output : "",
    setVariant,
    setIncludePadding,
    changeMode,
    setTextInput,
    processFile,
    clearInput
  }
}
