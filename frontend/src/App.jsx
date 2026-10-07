import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

import Dashboard from "./pages/Dashboard";
import Energy from "./pages/Energy";
import Water from "./pages/Water";
import Waste from "./pages/Waste";
import AirQuality from "./pages/AirQuality";
import Traffic from "./pages/Traffic";
import Assets from "./pages/Assets";
import Risk from "./pages/Risk";
import AIInsights from "./pages/AIInsights";
import AIPrediction from "./pages/AIPrediction";
import Simulation from "./pages/Simulation";
import Facility3D from "./pages/Facility3D";
import Climate from "./pages/Climate";
import Forecasting from "./pages/Forecasting";
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <div className="app-layout">
        <Sidebar />

        <div className="app-main">
          <Navbar />

          <main className="app-content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/login" element={<Login />} />
              <Route path="/energy" element={<Energy />} />
              <Route path="/water" element={<Water />} />
              <Route path="/waste" element={<Waste />} />
              <Route path="/air-quality" element={<AirQuality />} />
              <Route path="/traffic" element={<Traffic />} />
              <Route path="/assets" element={<Assets />} />
              <Route path="/risk" element={<Risk />} />
              <Route path="/ai-insights" element={<AIInsights />} />
              <Route path="/ai-prediction" element={<AIPrediction />} />
              <Route path="/simulation" element={<Simulation />} />
              <Route path="/3d" element={<Facility3D />} />
              <Route path="/climate" element={<Climate />} />
              <Route path="/forecast" element={<Forecasting />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;



