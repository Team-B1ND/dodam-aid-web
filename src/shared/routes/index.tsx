import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "@/pages/Home";
import Apps from "@/pages/Apps";
import AppsLayout from "@/layouts/AppsLayout";
import RootLayout from "@/layouts/RootLayout";
import RegisterApp from "@/pages/RegisterApp";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "apps",
        element: <AppsLayout />,
        children: [
          { index: true, element: <Apps /> },
          { path: "register", element: <RegisterApp /> },
          { path: ":id", element: <></> },
        ],
      },
      { path: "/teams", element: <></> },
      { path: "/teams/create", element: <></> },
      { path: "/teams/:id", element: <></> },
      { path: "/teams/:id/settings", element: <></> },
      { path: "/teams/:id/people", element: <></> },
      { path: "/docs", element: <></> },
    ],
  },
]);

const Router = () => <RouterProvider router={router} />;

export default Router;
