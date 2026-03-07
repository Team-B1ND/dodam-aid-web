import { BrowserRouter, Route, Routes } from "react-router-dom";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<></>} />
        <Route path="/apps" element={<></>} />
        <Route path="/apps/register" element={<></>} />
        <Route path="/apps/:id" element={<></>} />
        <Route path="/teams" element={<></>} />
        <Route path="/teams/create" element={<></>} />
        <Route path="/teams/:id" element={<></>} />
        <Route path="/teams/:id/settings" element={<></>} />
        <Route path="/teams/:id/people" element={<></>} />
        <Route path="/docs" element={<></>} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
