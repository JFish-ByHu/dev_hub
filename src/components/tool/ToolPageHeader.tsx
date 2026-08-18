import type { ReactNode } from "react"
import "../../styles/_tool.scss"

interface ToolPageHeaderProps {
  title: string
  description: string
  extra?: ReactNode
}

export default function ToolPageHeader({ title, description, extra }: ToolPageHeaderProps) {
  return (
    <div className="tool-page-header">
      <div>
        <h1 className="tool-page-title">{title}</h1>
        <p className="tool-page-description">{description}</p>
      </div>
      {extra ? <div className="tool-page-header-extra">{extra}</div> : null}
    </div>
  )
}
