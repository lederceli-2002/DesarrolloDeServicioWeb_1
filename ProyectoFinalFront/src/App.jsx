import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Login } from "./Pages/Login";
import { Registro } from "./Pages/Registro";
import { Index } from "./Pages/Index";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/index" element={<Index />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;