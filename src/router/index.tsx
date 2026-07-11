import { RouterProvider, createBrowserRouter } from "react-router-dom"
import MainLayout from "../layouts/MainLayout"
import HomePage from "../pages/home/HomePage"
import JsonTool from "../pages/tools/json/index"

const router = createBrowserRouter([
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
