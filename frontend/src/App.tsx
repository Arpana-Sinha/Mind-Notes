import { useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/login");
  }

  function handleAuth(t: string) {
    setToken(t);
    navigate("/");
  }

  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={token ? <Home onLogout={handleLogout} /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login onAuth={handleAuth} />} />
        <Route path="/register" element={<Register onAuth={handleAuth} />} />
      </Routes>
    </div>
  );
}

export default App;
