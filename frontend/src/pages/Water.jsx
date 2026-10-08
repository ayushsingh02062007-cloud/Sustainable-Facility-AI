import { useEffect, useState } from "react";
import api from "../services/api";
import {
  Droplets,
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

export default function Water() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/water")
      .then((res) => setData(res.data))
      .catch((err) => {
        console.error(err);
        setError("Water data load nahi ho paaya.");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="dashboard-page">
        <div className="loading-panel">
          <Droplets size={30} />
          <h2>Loading Water Intelligence...</h2>
          <p>Facility water systems se real-time data fetch ho raha hai.</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="dashboard-page">
        <div className="error-box">
          <AlertTriangle size={20} />
          {error || "Unable to load water data."}
        </div>
      </div>
    );
  }

  const chartData = [
    { name: "Water Usage", value: data.water },
    { name: "Current Usage", value: data.current_water }
  ];

  return (
    <div className="dashboard-page">
      <div className="page-header">
        <div>
          <h1>Water Intelligence</h1>
          <p>
            Real-time facility water consumption, efficiency and monitoring
          </p>
        </div>

        <div className="live-status">
          <span className="status-dot"></span>
          WATER MONITORING ACTIVE
        </div>
      </div>

      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-icon">
            <Droplets size={25} />
          </div>
          <div>
            <p>Water Consumption</p>
            <h2>{data.water}<span>{data.unit}</span></h2>
            <span>Current consumption</span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon">
            <Activity size={25} />
          </div>
          <div>
            <p>Current Usage</p>
            <h2>{data.current_water}<span>{data.unit}</span></h2>
            <span>Live measurement</span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon">
            <Gauge size={25} />
          </div>
          <div>
            <p>Water Status</p>
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
            <span>Water efficiency</span>
          </div>
        </div>
      </div>

      <div className="panel">
        <div className="panel-title">
          <div>
            <h2>Water Usage Overview</h2>
            <p>Current water consumption measurements</p>
          </div>

          <Droplets size={24} />
        </div>

        <div className="water-chart">
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
            <h2>Water Monitoring Status</h2>
            <p>Water intelligence and optimization systems</p>
          </div>

          <Brain size={24} />
        </div>

        <div className="water-status-grid">
          <div className="water-status-item">
            <CheckCircle size={20} />
            <div>
              <span>System Status</span>
              <strong>{data.status}</strong>
            </div>
          </div>

          <div className="water-status-item">
            <Activity size={20} />
            <div>
              <span>Monitoring</span>
              <strong>{data.monitoring}</strong>
            </div>
          </div>

          <div className="water-status-item">
            <Brain size={20} />
            <div>
              <span>Anomaly Detection</span>
              <strong>{data.anomaly_detection}</strong>
            </div>
          </div>

          <div className="water-status-item">
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



