import { useEffect, useState } from "react";
import api from "../services/api";
import {
  Wind,
  Thermometer,
  Droplets,
  Activity,
  Brain,
  CheckCircle,
  AlertTriangle,
  Gauge
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

export default function AirQuality() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/air-quality")
      .then((res) => setData(res.data))
      .catch((err) => {
        console.error(err);
        setError("Air quality data load nahi ho paaya.");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="dashboard-page">
        <div className="loading-panel">
          <Wind size={30} />
          <h2>Loading Air Quality Intelligence...</h2>
          <p>Environmental sensors se real-time data fetch ho raha hai.</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="dashboard-page">
        <div className="error-box">
          <AlertTriangle size={20} />
          {error || "Unable to load air quality data."}
        </div>
      </div>
    );
  }

  const chartData = [
    { name: "AQI", value: data.aqi },
    { name: "PM2.5", value: data.pm25 },
    { name: "PM10", value: data.pm10 },
    { name: "Temperature", value: data.temperature },
    { name: "Humidity", value: data.humidity }
  ];

  return (
    <div className="dashboard-page">
      <div className="page-header">
        <div>
          <h1>Air Quality Intelligence</h1>
          <p>
            Real-time environmental conditions and air quality monitoring
          </p>
        </div>

        <div className="live-status">
          <span className="status-dot"></span>
          AIR MONITORING ACTIVE
        </div>
      </div>

      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-icon">
            <Wind size={25} />
          </div>
          <div>
            <p>Air Quality Index</p>
            <h2>{data.aqi}</h2>
            <span>{data.status}</span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon">
            <Gauge size={25} />
          </div>
          <div>
            <p>PM2.5</p>
            <h2>{data.pm25}<span>µg/m³</span></h2>
            <span>Current concentration</span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon">
            <Activity size={25} />
          </div>
          <div>
            <p>PM10</p>
            <h2>{data.pm10}<span>µg/m³</span></h2>
            <span>Current concentration</span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon">
            <Thermometer size={25} />
          </div>
          <div>
            <p>Temperature</p>
            <h2>{data.temperature}<span>°C</span></h2>
            <span>Current temperature</span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon">
            <Droplets size={25} />
          </div>
          <div>
            <p>Humidity</p>
            <h2>{data.humidity}<span>%</span></h2>
            <span>Current humidity</span>
          </div>
        </div>
      </div>

      <div className="panel">
        <div className="panel-title">
          <div>
            <h2>Environmental Overview</h2>
            <p>Current air quality and environmental measurements</p>
          </div>

          <Wind size={24} />
        </div>

        <div className="air-quality-chart">
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar
                dataKey="value"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="panel">
        <div className="panel-title">
          <div>
            <h2>Air Quality Monitoring Status</h2>
            <p>Environmental intelligence systems</p>
          </div>

          <Brain size={24} />
        </div>

        <div className="air-quality-status-grid">
          <div className="air-quality-status-item">
            <CheckCircle size={20} />
            <div>
              <span>Air Quality Status</span>
              <strong>{data.status}</strong>
            </div>
          </div>

          <div className="air-quality-status-item">
            <Activity size={20} />
            <div>
              <span>Monitoring</span>
              <strong>{data.monitoring}</strong>
            </div>
          </div>

          <div className="air-quality-status-item">
            <Brain size={20} />
            <div>
              <span>Anomaly Detection</span>
              <strong>{data.anomaly_detection}</strong>
            </div>
          </div>

          <div className="air-quality-status-item">
            <Wind size={20} />
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



