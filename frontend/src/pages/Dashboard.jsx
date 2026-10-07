import { useEffect, useState } from "react";
import axios from "axios";
import {
  Activity,
  Zap,
  Droplets,
  Trash2,
  Wind,
  AlertTriangle,
  ShieldCheck,
  TrendingUp,
  Database
} from "lucide-react";

const API = "http://127.0.0.1:8000";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`${API}/api/dashboard`)
      .then((res) => setData(res.data))
      .catch((err) => {
        console.error(err);
        setError("Dashboard API connect nahi ho raha.");
      });
  }, []);

  const kpis = [
    {
      title: "Energy",
      value: data?.energy ?? "--",
      unit: "kWh",
      icon: Zap
    },
    {
      title: "Water",
      value: data?.water ?? "--",
      unit: "L",
      icon: Droplets
    },
    {
      title: "Waste",
      value: data?.waste ?? "--",
      unit: "kg",
      icon: Trash2
    },
    {
      title: "Air Quality",
      value: data?.aqi ?? "--",
      unit: "AQI",
      icon: Wind
    }
  ];

  return (
    <div className="dashboard-page">

      <div className="page-header">
        <div>
          <h1>Sustainable Facility AI</h1>
          <p>
            AI-powered facility intelligence and sustainability monitoring
          </p>
        </div>

        <div className="live-status">
          <span className="status-dot"></span>
          LIVE SYSTEM
        </div>
      </div>

      {error && (
        <div className="error-box">
          <AlertTriangle size={20} />
          {error}
        </div>
      )}

      <div className="kpi-grid">
        {kpis.map((item) => {
          const Icon = item.icon;

          return (
            <div className="kpi-card" key={item.title}>
              <div className="kpi-icon">
                <Icon size={25} />
              </div>

              <div>
                <p>{item.title}</p>

                <h2>
                  {item.value}
                  <span>{item.unit}</span>
                </h2>
              </div>
            </div>
          );
        })}
      </div>

      <div className="dashboard-grid">

        <div className="panel">
          <div className="panel-title">
            <div>
              <h2>Facility Overview</h2>
              <p>Current operational intelligence</p>
            </div>

            <Activity size={22} />
          </div>

          <div className="overview-list">

            <div>
              <span>Sustainability Score</span>
              <strong>
                {data?.sustainability_score ?? "--"}
                <small>/100</small>
              </strong>
            </div>

            <div>
              <span>Operational Risk</span>

              <strong className="risk-low">
                {data?.risk ?? "--"}
              </strong>
            </div>

            <div>
              <span>System Status</span>

              <strong className="status-active">
                ACTIVE
              </strong>
            </div>

          </div>
        </div>

        <div className="panel">

          <div className="panel-title">
            <div>
              <h2>AI System Status</h2>
              <p>Decision-support engine</p>
            </div>

            <ShieldCheck size={22} />
          </div>

          <div className="ai-status">

            <div className="ai-status-item">
              <ShieldCheck />

              <div>
                <strong>Anomaly Detection</strong>
                <span>Active</span>
              </div>
            </div>

            <div className="ai-status-item">
              <TrendingUp />

              <div>
                <strong>Forecasting Engine</strong>
                <span>Active</span>
              </div>
            </div>

            <div className="ai-status-item">
              <Activity />

              <div>
                <strong>Recommendation Engine</strong>
                <span>Active</span>
              </div>
            </div>

          </div>
        </div>

      </div>

      <div className="panel system-panel">

        <div className="system-item">
          <Database size={22} />

          <div>
            <strong>IoT Data Pipeline</strong>
            <span>Connected</span>
          </div>
        </div>

        <div className="system-item">
          <Activity size={22} />

          <div>
            <strong>FastAPI Backend</strong>
            <span>Online</span>
          </div>
        </div>

        <div className="system-item">
          <ShieldCheck size={22} />

          <div>
            <strong>ML Models</strong>
            <span>Loaded</span>
          </div>
        </div>

      </div>

      <div className="panel welcome-panel">

        <h2>🤖 AI Facility Intelligence</h2>

        <p>
          The platform combines IoT data, machine learning,
          anomaly detection, forecasting and risk analysis
          to support sustainable facility operations.
        </p>

      </div>

    </div>
  );
}
