import { useEffect, useState } from "react";
import api from "../services/api";
import {
  Trash2,
  Activity,
  Gauge,
  Brain,
  CheckCircle,
  AlertTriangle,
  TrendingDown
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

export default function Waste() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/waste")
      .then((res) => setData(res.data))
      .catch((err) => {
        console.error(err);
        setError("Waste data load nahi ho paaya.");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="dashboard-page">
        <div className="loading-panel">
          <Trash2 size={30} />
          <h2>Loading Waste Intelligence...</h2>
          <p>Facility waste systems se real-time data fetch ho raha hai.</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="dashboard-page">
        <div className="error-box">
          <AlertTriangle size={20} />
          {error || "Unable to load waste data."}
        </div>
      </div>
    );
  }

  const chartData = [
    { name: "Current Waste", value: data.current_waste },
    { name: "Waste Level", value: data.waste }
  ];

  return (
    <div className="dashboard-page">
      <div className="page-header">
        <div>
          <h1>Waste Intelligence</h1>
          <p>
            Real-time facility waste monitoring, efficiency and management
          </p>
        </div>

        <div className="live-status">
          <span className="status-dot"></span>
          WASTE MONITORING ACTIVE
        </div>
      </div>

      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-icon">
            <Trash2 size={25} />
          </div>
          <div>
            <p>Waste Generated</p>
            <h2>{data.waste}<span>{data.unit}</span></h2>
            <span>Current waste level</span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon">
            <Activity size={25} />
          </div>
          <div>
            <p>Current Waste</p>
            <h2>{data.current_waste}<span>{data.unit}</span></h2>
            <span>Live measurement</span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon">
            <Gauge size={25} />
          </div>
          <div>
            <p>Waste Status</p>
            <h2>{data.status}</h2>
            <span>Current condition</span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon">
            <TrendingDown size={25} />
          </div>
          <div>
            <p>Efficiency</p>
            <h2>{data.efficiency}</h2>
            <span>Management efficiency</span>
          </div>
        </div>
      </div>

      <div className="panel">
        <div className="panel-title">
          <div>
            <h2>Waste Overview</h2>
            <p>Current facility waste measurements</p>
          </div>

          <Trash2 size={24} />
        </div>

        <div className="waste-chart">
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
            <h2>Waste Monitoring Status</h2>
            <p>Waste intelligence and optimization systems</p>
          </div>

          <Brain size={24} />
        </div>

        <div className="waste-status-grid">
          <div className="waste-status-item">
            <CheckCircle size={20} />
            <div>
              <span>System Status</span>
              <strong>{data.status}</strong>
            </div>
          </div>

          <div className="waste-status-item">
            <Activity size={20} />
            <div>
              <span>Monitoring</span>
              <strong>{data.monitoring}</strong>
            </div>
          </div>

          <div className="waste-status-item">
            <Brain size={20} />
            <div>
              <span>Anomaly Detection</span>
              <strong>{data.anomaly_detection}</strong>
            </div>
          </div>

          <div className="waste-status-item">
            <TrendingDown size={20} />
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



