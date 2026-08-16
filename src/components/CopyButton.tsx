import type { ReactNode } from "react"
import { Button, message } from "antd"
import type { ButtonProps } from "antd"
import { CopyOutlined } from "@ant-design/icons"

interface CopyButtonProps extends Omit<ButtonProps, "children" | "icon" | "onClick"> {
  value: string
  children?: ReactNode
  iconOnly?: boolean
}

export default function CopyButton({
  value,
  children = "Copy",
  iconOnly = false,
  ...buttonProps
}: CopyButtonProps) {
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value)
      message.success("Copied to clipboard")
    } catch {
      message.error("Copy failed. Please copy the value manually.")
    }
  }

  return (
    <Button
      {...buttonProps}
      icon={<CopyOutlined />}
      aria-label={iconOnly ? "Copy to clipboard" : undefined}
      onClick={() => void copy()}
    >
      {iconOnly ? null : children}
    </Button>
  )
}
