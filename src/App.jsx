import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Loginpage";
import Dashboard from "./pages/Dashboard";
import History from "./pages/History";
import Analytics from "./pages/Analytics";

import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />

        
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/history" element={<History />} />

        
        <Route path="/analytics" element={<Analytics />} />
      </Routes>
    </BrowserRouter>
  );
}
