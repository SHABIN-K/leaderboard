import { Route, Routes } from "react-router-dom";
import { DashBoard, Home, Login } from "./pages";

function App() {
  return (
    <Routes>
      <Route path="*" element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="dashboard" element={<DashBoard />} />
    </Routes>
  );
}

export default App;
