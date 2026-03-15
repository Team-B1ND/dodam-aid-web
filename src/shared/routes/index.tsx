import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "@/pages/Home";
import Apps from "@/pages/Apps";
import ServiceLayout from "@/layouts/ServiceLayout";
import RootLayout from "@/layouts/RootLayout";
import RegisterApp from "@/pages/RegisterApp";
import TeamsPage from "@/pages/Teams";
import CreateTeamPage from "@/pages/CreateTeam";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "/docs", element: <></> },
      {
        path: "/*",
        element: <ServiceLayout />,
        children: [
          { path: "apps", element: <Apps /> },
          { path: "apps/register", element: <RegisterApp /> },
          { path: "apps/:id", element: <></> },
          { path: "teams", element: <TeamsPage /> },
          { path: "teams/create", element: <CreateTeamPage /> },
          { path: "teams/:id", element: <></> },
          { path: "teams/:id/settings", element: <></> },
          { path: "teams/:id/people", element: <></> },
        ],
      },
    ],
  },
]);

const Router = () => <RouterProvider router={router} />;

export default Router;
