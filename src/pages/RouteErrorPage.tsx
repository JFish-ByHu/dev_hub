import { Button, Result } from "antd"
import { isRouteErrorResponse, useNavigate, useRouteError } from "react-router-dom"

export default function RouteErrorPage() {
  const navigate = useNavigate()
  const error = useRouteError()
  const isNotFound = isRouteErrorResponse(error) && error.status === 404

  return (
    <Result
      status={isNotFound ? "404" : "error"}
      title={isNotFound ? "Page not found" : "Something went wrong"}
      subTitle={
        isNotFound
          ? "The page you requested does not exist or may have moved."
          : "This page could not be loaded. Try returning home and opening it again."
      }
      extra={
        <Button type="primary" onClick={() => navigate("/")}>
          Back to home
        </Button>
      }
    />
  )
}
