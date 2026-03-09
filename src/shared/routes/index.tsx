import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "@/pages/Home";
import Apps from "@/pages/Apps";
import AppsLayout from "@/layouts/AppsLayout";
import RootLayout from "@/layouts/RootLayout";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="apps" element={<AppsLayout />}>
            <Route index element={<Apps />} />
            <Route path="register" element={<></>} />
            <Route path=":id" element={<></>} />
          </Route>
          <Route path="/teams" element={<></>} />
          <Route path="/teams/create" element={<></>} />
          <Route path="/teams/:id" element={<></>} />
          <Route path="/teams/:id/settings" element={<></>} />
          <Route path="/teams/:id/people" element={<></>} />
          <Route path="/docs" element={<></>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
