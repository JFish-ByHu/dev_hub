import { lazy, Suspense } from "react"
import type { ReactNode } from "react"
import { RouterProvider, createHashRouter } from "react-router-dom"
import MainLayout from "../layouts/MainLayout"
import HomePage from "../pages/home/HomePage"

const Base64Tool = lazy(() => import("../pages/tools/base64"))
const JsonTool = lazy(() => import("../pages/tools/json/index"))
const TimestampTool = lazy(() => import("../pages/tools/timestamp/index"))
const UrlTool = lazy(() => import("../pages/tools/url"))
const BaseConvertTool = lazy(() => import("../pages/tools/base-convert"))
const UuidTool = lazy(() => import("../pages/tools/uuid"))
const RegexTool = lazy(() => import("../pages/tools/regex"))
const ColorTool = lazy(() => import("../pages/tools/color"))
const ToolsIndex = lazy(() => import("../pages/tools"))

function RouteLoading() {
  return <div className="route-loading">Loading tool...</div>
}

function LazyRoute({ children }: { children: ReactNode }) {
  return <Suspense fallback={<RouteLoading />}>{children}</Suspense>
}

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
            index: true,
            element: (
              <LazyRoute>
                <ToolsIndex />
              </LazyRoute>
            )
          },
          {
            path: "json",
            element: (
              <LazyRoute>
                <JsonTool />
              </LazyRoute>
            )
          },
          {
            path: "base64",
            element: (
              <LazyRoute>
                <Base64Tool />
              </LazyRoute>
            )
          },
          {
            path: "url",
            element: (
              <LazyRoute>
                <UrlTool />
              </LazyRoute>
            )
          },
          {
            path: "base-convert",
            element: (
              <LazyRoute>
                <BaseConvertTool />
              </LazyRoute>
            )
          },
          {
            path: "timestamp",
            element: (
              <LazyRoute>
                <TimestampTool />
              </LazyRoute>
            )
          },
          {
            path: "uuid",
            element: (
              <LazyRoute>
                <UuidTool />
              </LazyRoute>
            )
          },
          {
            path: "regex",
            element: (
              <LazyRoute>
                <RegexTool />
              </LazyRoute>
            )
          },
          {
            path: "color",
            element: (
              <LazyRoute>
                <ColorTool />
              </LazyRoute>
            )
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
