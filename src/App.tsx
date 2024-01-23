import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import { Loader } from "./components/ui";
const Login = lazy(() => import("./pages/Login"));
const DashBoard = lazy(() => import("./pages/DashBoard"));
const ViewScore = lazy(() => import("./pages/ViewScore"));

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="*" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="dashboard" element={<DashBoard />} />
        <Route path="view-score/:id" element={<ViewScore />} />
      </Routes>
    </Suspense>
  );
}

export default App;
