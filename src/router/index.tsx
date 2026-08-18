import { lazy, Suspense } from "react"
import type { ReactNode } from "react"
import { RouterProvider, createHashRouter } from "react-router-dom"
import { TOOLS_CONFIG } from "../config/tools"
import MainLayout from "../layouts/MainLayout"
import HomePage from "../pages/home/HomePage"
import NotFoundPage from "../pages/NotFoundPage"
import RouteErrorPage from "../pages/RouteErrorPage"

const ToolsIndex = lazy(() => import("../pages/tools"))

function RouteLoading() {
  return <div className="route-loading">Loading tool...</div>
}

function LazyRoute({ children }: { children: ReactNode }) {
  return <Suspense fallback={<RouteLoading />}>{children}</Suspense>
}

const toolRoutes = TOOLS_CONFIG.map(({ component: ToolComponent, path }) => ({
  path: path.replace("/tools/", ""),
  element: (
    <LazyRoute>
      <ToolComponent />
    </LazyRoute>
  )
}))

const router = createHashRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <RouteErrorPage />,
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
          ...toolRoutes
        ]
      },
      {
        path: "resources",
        element: <div>Resources Content</div>
      },
      {
        path: "*",
        element: <NotFoundPage />
      }
    ]
  }
])

export default function AppRouter() {
  return <RouterProvider router={router} />
}
