import { useEffect, useState } from "react";
import axios from "axios";
import {
  Zap,
  Droplets,
  Trash2,
  Wind,
  Brain,
  CheckCircle,
  ArrowRight,
  AlertTriangle
} from "lucide-react";

const API = "http://127.0.0.1:8000";

const metrics = [
  {
    key: "energy",
    title: "Energy",
    unit: "kWh",
    icon: Zap,
    improvement: "energy_reduction"
  },
  {
    key: "water",
    title: "Water",
    unit: "L",
    icon: Droplets,
    improvement: "water_reduction"
  },
  {
    key: "waste",
    title: "Waste",
    unit: "kg",
    icon: Trash2,
    improvement: "waste_reduction"
  },
  {
    key: "aqi",
    title: "Air Quality",
    unit: "AQI",
    icon: Wind,
    improvement: "aqi_improvement"
  }
];

export default function Simulation() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`${API}/api/simulation`)
      .then((res) => setData(res.data))
      .catch((err) => {
        console.error(err);
        setError("Simulation data load nahi ho paaya.");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="dashboard-page">
        <div className="loading-panel">
          <Brain size={30} />
          <h2>Loading Facility Simulation...</h2>
          <p>AI-optimized scenario calculate ho raha hai.</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="dashboard-page">
        <div className="error-box">
          <AlertTriangle size={20} />
          {error || "Unable to load simulation data."}
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <div className="page-header">
        <div>
          <h1>Facility Simulation</h1>
          <p>
            Compare current operations with AI-optimized scenarios
          </p>
        </div>

        <div className="live-status">
          <span className="status-dot"></span>
          SIMULATION {data.status?.toUpperCase() || "READY"}
        </div>
      </div>

      <div className="kpi-grid">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          const improvement = data.improvement?.[metric.improvement];

          return (
            <div className="kpi-card" key={metric.key}>
              <div className="kpi-icon">
                <Icon size={25} />
              </div>

              <div>
                <p>{metric.title} Reduction</p>
                <h2>{improvement ?? "--"}%</h2>
                <span>AI-optimized scenario</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="panel">
        <div className="panel-title">
          <div>
            <h2>Baseline vs Optimized</h2>
            <p>Operational impact of the AI-recommended scenario</p>
          </div>

          <CheckCircle size={24} />
        </div>

        <div className="simulation-grid">
          {metrics.map((metric) => {
            const Icon = metric.icon;
            const baseline = data.baseline?.[metric.key];
            const optimized = data.optimized?.[metric.key];

            return (
              <div className="simulation-card" key={metric.key}>
                <div className="simulation-card-header">
                  <div className="simulation-icon">
                    <Icon size={21} />
                  </div>

                  <strong>{metric.title}</strong>
                </div>

                <div className="simulation-values">
                  <div>
                    <span>Current</span>
                    <strong>
                      {baseline ?? "--"}{" "}
                      <small>{metric.unit}</small>
                    </strong>
                  </div>

                  <ArrowRight size={20} />

                  <div>
                    <span>Optimized</span>
                    <strong className="optimized-value">
                      {optimized ?? "--"}{" "}
                      <small>{metric.unit}</small>
                    </strong>
                  </div>
                </div>

                <div className="simulation-improvement">
                  <span>Improvement</span>
                  <strong>
                    {data.improvement?.[metric.improvement] ?? "--"}%
                  </strong>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="panel simulation-recommendation">
        <div className="panel-title">
          <div>
            <h2>AI Optimization Strategy</h2>
            <p>Recommended operational changes</p>
          </div>

          <Brain size={24} />
        </div>

        <div className="recommendation-content">
          <CheckCircle size={22} />
          <p>{data.recommendation}</p>
        </div>
      </div>
    </div>
  );
}
