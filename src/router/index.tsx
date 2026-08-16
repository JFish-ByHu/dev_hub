import { RouterProvider, createHashRouter } from "react-router-dom"
import MainLayout from "../layouts/MainLayout"
import HomePage from "../pages/home/HomePage"
import Base64Tool from "../pages/tools/base64"
import JsonTool from "../pages/tools/json/index"
import TimestampTool from "../pages/tools/timestamp/index"

const router = createHashRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: "tools",
        children: [
          {
            path: "json",
            element: <JsonTool />
          },
          {
            path: "base64",
            element: <Base64Tool />
          },
          {
            path: "timestamp",
            element: <TimestampTool />
          }
        ]
      },
      {
        path: "resources",
        element: <div>Resources Content</div>
      }
    ]
  }
])

export default function AppRouter() {
  return <RouterProvider router={router} />
}
