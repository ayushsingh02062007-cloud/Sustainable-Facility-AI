import { useEffect, useState } from "react";
import axios from "axios";
import {
  Zap,
  Activity,
  Sun,
  Gauge,
  Brain,
  CheckCircle,
  AlertTriangle,
  TrendingUp
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

const API = "http://127.0.0.1:8000";

export default function Energy() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`${API}/api/energy`)
      .then((res) => setData(res.data))
      .catch((err) => {
        console.error(err);
        setError("Energy data load nahi ho paaya.");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="dashboard-page">
        <div className="loading-panel">
          <Zap size={30} />
          <h2>Loading Energy Intelligence...</h2>
          <p>Facility energy systems se real-time data fetch ho raha hai.</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="dashboard-page">
        <div className="error-box">
          <AlertTriangle size={20} />
          {error || "Unable to load energy data."}
        </div>
      </div>
    );
  }

  const chartData = [
    { name: "Energy", value: data.energy },
    { name: "Peak Load", value: data.peak_load },
    { name: "Solar", value: data.solar_generation },
    { name: "Grid", value: data.grid_consumption }
  ];

  return (
    <div className="dashboard-page">
      <div className="page-header">
        <div>
          <h1>Energy Intelligence</h1>
          <p>
            Real-time facility energy consumption, generation and efficiency
          </p>
        </div>

        <div className="live-status">
          <span className="status-dot"></span>
          ENERGY MONITORING ACTIVE
        </div>
      </div>

      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-icon">
            <Zap size={25} />
          </div>
          <div>
            <p>Energy Consumption</p>
            <h2>{data.energy}<span>{data.unit}</span></h2>
            <span>Current consumption</span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon">
            <Gauge size={25} />
          </div>
          <div>
            <p>Peak Load</p>
            <h2>{data.peak_load}<span>{data.unit}</span></h2>
            <span>Maximum recorded load</span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon">
            <Sun size={25} />
          </div>
          <div>
            <p>Solar Generation</p>
            <h2>{data.solar_generation}<span>{data.unit}</span></h2>
            <span>Renewable energy</span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon">
            <TrendingUp size={25} />
          </div>
          <div>
            <p>Grid Consumption</p>
            <h2>{data.grid_consumption}<span>{data.unit}</span></h2>
            <span>Grid dependency</span>
          </div>
        </div>
      </div>

      <div className="panel">
        <div className="panel-title">
          <div>
            <h2>Energy Overview</h2>
            <p>Current energy consumption and generation metrics</p>
          </div>

          <Activity size={24} />
        </div>

        <div className="energy-chart">
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
            <h2>Energy Monitoring Status</h2>
            <p>Energy intelligence and optimization systems</p>
          </div>

          <Brain size={24} />
        </div>

        <div className="energy-status-grid">
          <div className="energy-status-item">
            <CheckCircle size={20} />
            <div>
              <span>System Status</span>
              <strong>{data.status}</strong>
            </div>
          </div>

          <div className="energy-status-item">
            <Zap size={20} />
            <div>
              <span>Efficiency</span>
              <strong>{data.efficiency}</strong>
            </div>
          </div>

          <div className="energy-status-item">
            <Activity size={20} />
            <div>
              <span>Monitoring</span>
              <strong>{data.monitoring}</strong>
            </div>
          </div>

          <div className="energy-status-item">
            <Brain size={20} />
            <div>
              <span>Anomaly Detection</span>
              <strong>{data.anomaly_detection}</strong>
            </div>
          </div>

          <div className="energy-status-item">
            <TrendingUp size={20} />
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
