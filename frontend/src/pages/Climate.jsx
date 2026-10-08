import { useEffect, useState } from "react";
import api from "../services/api";
import {
  Thermometer,
  Droplets,
  CloudRain,
  Sun,
  Brain,
  CheckCircle,
  AlertTriangle,
  Activity
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

export default function Climate() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/climate")
      .then((res) => setData(res.data))
      .catch((err) => {
        console.error(err);
        setError("Climate data load nahi ho paaya.");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="dashboard-page">
        <div className="loading-panel">
          <Brain size={30} />
          <h2>Loading Climate Intelligence...</h2>
          <p>Environmental conditions analyze ki ja rahi hain.</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="dashboard-page">
        <div className="error-box">
          <AlertTriangle size={20} />
          {error || "Unable to load climate data."}
        </div>
      </div>
    );
  }

  const chartData = [
    { name: "Temperature", value: data.temperature },
    { name: "Humidity", value: data.humidity },
    { name: "Rainfall", value: data.rainfall },
    { name: "Heat Index", value: data.heat_index }
  ];

  return (
    <div className="dashboard-page">
      <div className="page-header">
        <div>
          <h1>Climate Resilience</h1>
          <p>
            Monitor climate conditions and environmental risk
          </p>
        </div>

        <div className="live-status">
          <span className="status-dot"></span>
          CLIMATE MONITORING ACTIVE
        </div>
      </div>

      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-icon">
            <Activity size={25} />
          </div>
          <div>
            <p>Risk Level</p>
            <h2>{data.risk_level}</h2>
            <span>Climate risk assessment</span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon">
            <Thermometer size={25} />
          </div>
          <div>
            <p>Temperature</p>
            <h2>{data.temperature}<span>°C</span></h2>
            <span>Current condition</span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon">
            <Droplets size={25} />
          </div>
          <div>
            <p>Humidity</p>
            <h2>{data.humidity}<span>%</span></h2>
            <span>Current condition</span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon">
            <Sun size={25} />
          </div>
          <div>
            <p>Heat Index</p>
            <h2>{data.heat_index}<span>°C</span></h2>
            <span>Thermal stress indicator</span>
          </div>
        </div>
      </div>

      <div className="panel">
        <div className="panel-title">
          <div>
            <h2>Climate Indicators</h2>
            <p>Current environmental measurements</p>
          </div>

          <CloudRain size={24} />
        </div>

        <div className="climate-chart">
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="panel">
        <div className="panel-title">
          <div>
            <h2>Climate Monitoring Status</h2>
            <p>Environmental intelligence systems</p>
          </div>

          <Brain size={24} />
        </div>

        <div className="climate-status-grid">
          <div className="climate-status-item">
            <CloudRain size={20} />
            <div>
              <span>Rainfall</span>
              <strong>{data.rainfall} mm</strong>
            </div>
          </div>

          <div className="climate-status-item">
            <CheckCircle size={20} />
            <div>
              <span>System Status</span>
              <strong>{data.status}</strong>
            </div>
          </div>

          <div className="climate-status-item">
            <Activity size={20} />
            <div>
              <span>Monitoring</span>
              <strong>{data.monitoring}</strong>
            </div>
          </div>

          <div className="climate-status-item">
            <Brain size={20} />
            <div>
              <span>Anomaly Detection</span>
              <strong>{data.anomaly_detection}</strong>
            </div>
          </div>

          <div className="climate-status-item">
            <Sun size={20} />
            <div>
              <span>Forecasting</span>
              <strong>{data.forecasting}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



