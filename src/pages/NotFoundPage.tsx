import { Button, Result } from "antd"
import { useNavigate } from "react-router-dom"

export default function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <Result
      status="404"
      title="Page not found"
      subTitle="The page you requested does not exist or may have moved."
      extra={
        <Button type="primary" onClick={() => navigate("/")}>
          Back to home
        </Button>
      }
    />
  )
}
