import { useState } from "react";
import api from "../services/api";
import {
  Brain,
  Zap,
  Droplets,
  Trash2,
  ShieldAlert,
  Activity
} from "lucide-react";

export default function AIPrediction() {
  const [form, setForm] = useState({
    temperature: 28.4,
    humidity: 62,
    occupancy: 250,
    water_liters: 787.96,
    aqi: 76,
    traffic_count: 124,
    asset_utilization: 85
  });

  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: Number(e.target.value)
    });
  };

  const predict = async () => {
    setLoading(true);
    setError("");

    try {
      const energy = await api.post("/energy/predict", {
        temperature: form.temperature,
        humidity: form.humidity,
        occupancy: form.occupancy,
        water_liters: form.water_liters,
        aqi: form.aqi,
        traffic_count: form.traffic_count
      });

      const water = await api.post("/water/predict", {
        temperature: form.temperature,
        humidity: form.humidity,
        occupancy: form.occupancy,
        energy_kwh: energy.data.predicted_energy_kwh,
        aqi: form.aqi
      });

      const waste = await api.post("/waste/predict", {
        occupancy: form.occupancy,
        energy_kwh: energy.data.predicted_energy_kwh,
        water_liters: water.data.predicted_water_liters,
        temperature: form.temperature,
        traffic_count: form.traffic_count
      });

      const risk = await api.post("/risk/predict", {
        temperature: form.temperature,
        humidity: form.humidity,
        occupancy: form.occupancy,
        energy_kwh: energy.data.predicted_energy_kwh,
        water_liters: water.data.predicted_water_liters,
        aqi: form.aqi,
        waste_bin_level: waste.data.predicted_waste_kg,
        traffic_count: form.traffic_count,
        asset_utilization: form.asset_utilization
      });

      const anomaly = await api.post("/anomalies/predict", {
        temperature: form.temperature,
        humidity: form.humidity,
        occupancy: form.occupancy,
        energy_kwh: energy.data.predicted_energy_kwh,
        water_liters: water.data.predicted_water_liters,
        aqi: form.aqi,
        waste_bin_level: waste.data.predicted_waste_kg,
        traffic_count: form.traffic_count,
        asset_utilization: form.asset_utilization
      });

      setResults({
        energy: energy.data.predicted_energy_kwh,
        water: water.data.predicted_water_liters,
        waste: waste.data.predicted_waste_kg,
        risk: risk.data.risk_score,
        riskLevel: risk.data.overall_risk,
        anomaly: anomaly.data.anomaly,
        anomalyStatus: anomaly.data.status
      });
    } catch (err) {
      console.error(err);
      setError("AI prediction failed. Backend check karo.");
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    ["temperature", "Temperature (Â°C)"],
    ["humidity", "Humidity (%)"],
    ["occupancy", "Occupancy"],
    ["water_liters", "Current Water Usage (L)"],
    ["aqi", "AQI"],
    ["traffic_count", "Traffic Count"],
    ["asset_utilization", "Asset Utilization (%)"]
  ];

  return (
    <div className="dashboard-page">
      <div className="page-header">
        <div>
          <h1>AI Prediction Console</h1>
          <p>Enter facility sensor values and run ML predictions</p>
        </div>

        <div className="live-status">
          <span className="status-dot"></span>
          ML ENGINE ACTIVE
        </div>
      </div>

      <div className="panel">
        <div className="panel-title">
          <div>
            <h2>Facility Sensor Inputs</h2>
            <p>Enter current facility conditions</p>
          </div>
          <Brain size={24} />
        </div>

        <div className="ai-input-grid">
          {fields.map(([name, label]) => (
            <div className="ai-input-field" key={name}>
              <label>{label}</label>
              <input
                type="number"
                name={name}
                value={form[name]}
                onChange={handleChange}
                step="any"
              />
            </div>
          ))}
        </div>

        <button
          className="ai-predict-button"
          onClick={predict}
          disabled={loading}
        >
          <Activity size={18} />
          {loading ? "Running AI Models..." : "Run AI Prediction"}
        </button>

        {error && <div className="error-box">{error}</div>}
      </div>

      {results && (
        <div className="kpi-grid">
          <div className="kpi-card">
            <div className="kpi-icon">
              <Zap size={25} />
            </div>
            <div>
              <p>Predicted Energy</p>
              <h2>
                {results.energy} <span>kWh</span>
              </h2>
              <span>Random Forest</span>
            </div>
          </div>

          <div className="kpi-card">
            <div className="kpi-icon">
              <Droplets size={25} />
            </div>
            <div>
              <p>Predicted Water</p>
              <h2>
                {results.water} <span>L</span>
              </h2>
              <span>Random Forest</span>
            </div>
          </div>

          <div className="kpi-card">
            <div className="kpi-icon">
              <Trash2 size={25} />
            </div>
            <div>
              <p>Predicted Waste</p>
              <h2>
                {results.waste} <span>kg</span>
              </h2>
              <span>Random Forest</span>
            </div>
          </div>

          <div className="kpi-card">
            <div className="kpi-icon">
              <ShieldAlert size={25} />
            </div>
            <div>
              <p>Risk Prediction</p>
              <h2>{results.risk}</h2>
              <span>{results.riskLevel}</span>
            </div>
          </div>

          <div className="kpi-card">
            <div className="kpi-icon">
              <Activity size={25} />
            </div>
            <div>
              <p>Anomaly Detection</p>
              <h2>{results.anomaly ? "Anomaly" : "Normal"}</h2>
              <span>{results.anomalyStatus}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}













