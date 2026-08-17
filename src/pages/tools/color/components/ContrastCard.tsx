import { Alert, Card, Divider, Progress, Tag, Typography } from "antd"
import { CheckCircleOutlined, WarningOutlined } from "@ant-design/icons"
import type { ContrastEvaluation, RgbaColor } from "../utils/color"
import { formatCssColor } from "../utils/color"

const { Text } = Typography

interface ContrastCardProps {
  foreground: RgbaColor | null
  background: RgbaColor | null
  contrast: ContrastEvaluation | null
}

function levelTag(label: ContrastEvaluation["normal"]) {
  return <Tag color={label.passed ? "green" : "red"}>{label.label}</Tag>
}

export default function ContrastCard({ foreground, background, contrast }: ContrastCardProps) {
  return (
    <Card title="WCAG contrast" className="color-card contrast-card" bordered={false}>
      {!contrast || !foreground || !background ? (
        <Alert
          message="Enter two valid colors"
          description="Contrast ratios become available when both the foreground and background values can be parsed."
          type="info"
          showIcon
        />
      ) : (
        <>
          <div className="contrast-score">
            <Text type="secondary">Contrast ratio</Text>
            <div className="contrast-score-value">
              <strong>{contrast.ratio.toFixed(2)}</strong>
              <span>:1</span>
            </div>
            <Progress
              percent={Math.min((contrast.ratio / 21) * 100, 100)}
              showInfo={false}
              strokeColor={contrast.normal.passed ? "#22c55e" : "#f59e0b"}
              trailColor="var(--border)"
            />
          </div>
          <div className="contrast-level-grid">
            <div>
              <Text type="secondary">Normal text</Text>
              <div>
                {levelTag(contrast.normal)} <Text type="secondary">4.5:1 required for AA</Text>
              </div>
            </div>
            <div>
              <Text type="secondary">Large text</Text>
              <div>
                {levelTag(contrast.large)} <Text type="secondary">3:1 required for AA</Text>
              </div>
            </div>
          </div>
          <Divider />
          <div
            className="contrast-preview"
            style={{
              color: formatCssColor(foreground),
              backgroundColor: formatCssColor(background)
            }}
          >
            <strong>Large text preview</strong>
            <span>Normal body text preview for accessibility testing.</span>
          </div>
          <div className="contrast-status">
            {contrast.normal.passed ? <CheckCircleOutlined /> : <WarningOutlined />}
            <Text type={contrast.normal.passed ? undefined : "warning"}>
              {contrast.normal.passed
                ? "This color pair passes WCAG AA for normal text."
                : "Increase the contrast for comfortable normal-size text."}
            </Text>
          </div>
        </>
      )}
    </Card>
  )
}
