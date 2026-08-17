import { Alert, Card, Divider, Empty, Input, Tag, Typography } from "antd"
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons"
import type { RegexAnalysis } from "../utils/regex"
import CopyButton from "../../../../components/CopyButton"

const { TextArea } = Input
const { Text } = Typography

interface RegexResultCardProps {
  analysis: RegexAnalysis
}

export default function RegexResultCard({ analysis }: RegexResultCardProps) {
  return (
    <Card
      title="Match results"
      extra={
        analysis.kind === "success" ? (
          <Tag color="green">Valid expression</Tag>
        ) : analysis.kind === "error" ? (
          <Tag color="red">Invalid expression</Tag>
        ) : (
          <Tag>Waiting</Tag>
        )
      }
      className="regex-card regex-result-card"
      bordered={false}
    >
      {analysis.kind === "empty" && (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={analysis.message} />
      )}
      {analysis.kind === "error" && (
        <Alert
          message="Regular expression error"
          description={analysis.message}
          type="error"
          showIcon
          icon={<CloseCircleOutlined />}
        />
      )}
      {analysis.kind === "success" && (
        <>
          <Alert
            message={
              analysis.matches.length
                ? `${analysis.matches.length} match${analysis.matches.length === 1 ? "" : "es"} found`
                : "No matches found"
            }
            description={
              analysis.matches.length
                ? `Tested with /${analysis.pattern}/${analysis.flags}.`
                : "The expression is valid, but it did not match the current sample text."
            }
            type={analysis.matches.length ? "success" : "info"}
            showIcon
            icon={<CheckCircleOutlined />}
          />
          <div className="regex-result-stats">
            <div>
              <Text type="secondary">Matches</Text>
              <Text strong>{analysis.matches.length}</Text>
            </div>
            <div>
              <Text type="secondary">Flags</Text>
              <Text code>{analysis.flags || "none"}</Text>
            </div>
            <div>
              <Text type="secondary">Pattern length</Text>
              <Text strong>{analysis.pattern.length}</Text>
            </div>
          </div>
          <Divider />
          {analysis.matches.length > 0 && (
            <div className="regex-match-list">
              {analysis.matches.slice(0, 100).map((match, index) => (
                <div className="regex-match-item" key={`${match.index}-${index}`}>
                  <Text type="secondary" className="regex-match-index">
                    #{index + 1} · index {match.index}
                  </Text>
                  <Text code className="regex-match-value">
                    {match.value || "∅ empty match"}
                  </Text>
                  {match.groups.length > 0 && (
                    <Text type="secondary" className="regex-group-summary">
                      Groups:{" "}
                      {match.groups
                        .map((group, groupIndex) => `$${groupIndex + 1}=${group || "∅"}`)
                        .join(" · ")}
                    </Text>
                  )}
                  {match.namedGroups.length > 0 && (
                    <Text type="secondary" className="regex-group-summary">
                      Named:{" "}
                      {match.namedGroups
                        .map((group) => `${group.name}=${group.value || "∅"}`)
                        .join(" · ")}
                    </Text>
                  )}
                </div>
              ))}
              {analysis.matches.length > 100 && (
                <Text type="secondary" className="regex-list-hint">
                  Showing the first 100 matches to keep the page responsive.
                </Text>
              )}
            </div>
          )}
          <div className="regex-replacement-result">
            <div className="regex-replacement-heading">
              <Text strong>Replacement result</Text>
              <CopyButton
                value={analysis.replacedText}
                size="small"
                disabled={!analysis.replacedText}
              />
            </div>
            <TextArea
              value={analysis.replacedText}
              readOnly
              autoSize={{ minRows: 3, maxRows: 8 }}
              placeholder="Enter a replacement to preview the transformed text."
              className="regex-output-textarea"
            />
          </div>
        </>
      )}
    </Card>
  )
}
