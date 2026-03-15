import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "@/pages/Home";
import Apps from "@/pages/Apps";
import ServiceLayout from "@/layouts/ServiceLayout";
import RootLayout from "@/layouts/RootLayout";
import RegisterApp from "@/pages/RegisterApp";
import TeamsPage from "@/pages/Teams";
import CreateTeamPage from "@/pages/CreateTeam";
import TeamApplications from "@/pages/TeamApplications";
import TeamLayout from "@/layouts/TeamLayout";

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
          {
            path: "teams/:id",
            element: <TeamLayout />,
            children: [
              { index: true, element: <TeamApplications /> },
              { path: "settings", element: <></> },
              { path: "members", element: <></> },
            ],
          },
          { path: "teams/:id/:appId", element: <></> },
        ],
      },
    ],
  },
]);

const Router = () => <RouterProvider router={router} />;

export default Router;
