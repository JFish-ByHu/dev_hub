import { Card } from "antd"
import type { CardProps } from "antd"
import "../../styles/_tool.scss"

export default function ToolCard({ className, bordered = false, ...props }: CardProps) {
  return (
    <Card
      {...props}
      bordered={bordered}
      className={`tool-card${className ? ` ${className}` : ""}`}
    />
  )
}
