import { useEffect, useState } from "react";
import axios from "axios";
import {
  ShieldAlert,
  Activity,
  Zap,
  Droplets,
  Trash2,
  Wind,
  Car,
  Wrench,
  Brain,
  CheckCircle,
  AlertTriangle
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

export default function Risk() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios.get(`${API}/api/risk`)
      .then((res) => setData(res.data))
      .catch((err) => {
        console.error(err);
        setError("Risk data load nahi ho paaya.");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="dashboard-page">
        <div className="loading-panel">
          <ShieldAlert size={30} />
          <h2>Loading Risk Intelligence...</h2>
          <p>Facility risk indicators analyze ho rahe hain.</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="dashboard-page">
        <div className="error-box">
          <AlertTriangle size={20} />
          {error || "Unable to load risk data."}
        </div>
      </div>
    );
  }

  const chartData = [
    { name: "Energy", value: data.energy_risk },
    { name: "Water", value: data.water_risk },
    { name: "Waste", value: data.waste_risk },
    { name: "Air", value: data.air_quality_risk },
    { name: "Traffic", value: data.traffic_risk },
    { name: "Assets", value: data.asset_risk }
  ];

  const riskItems = [
    { name: "Energy Risk", value: data.energy_risk, icon: Zap },
    { name: "Water Risk", value: data.water_risk, icon: Droplets },
    { name: "Waste Risk", value: data.waste_risk, icon: Trash2 },
    { name: "Air Quality Risk", value: data.air_quality_risk, icon: Wind },
    { name: "Traffic Risk", value: data.traffic_risk, icon: Car },
    { name: "Asset Risk", value: data.asset_risk, icon: Wrench }
  ];

  return (
    <div className="dashboard-page">
      <div className="page-header">
        <div>
          <h1>Facility Risk Intelligence</h1>
          <p>AI-powered operational risk monitoring and prediction</p>
        </div>
        <div className="live-status">
          <span className="status-dot"></span>
          RISK ENGINE ACTIVE
        </div>
      </div>

      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-icon"><ShieldAlert size={25} /></div>
          <div>
            <p>Overall Risk</p>
            <h2>{data.overall_risk}</h2>
            <span>{data.status}</span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon"><Activity size={25} /></div>
          <div>
            <p>Risk Score</p>
            <h2>{data.risk_score}<span>/100</span></h2>
            <span>Operational risk</span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon"><Car size={25} /></div>
          <div>
            <p>Traffic Risk</p>
            <h2>{data.traffic_risk}</h2>
            <span>Risk score</span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon"><Wind size={25} /></div>
          <div>
            <p>Air Quality Risk</p>
            <h2>{data.air_quality_risk}</h2>
            <span>Risk score</span>
          </div>
        </div>
      </div>

      <div className="panel">
        <div className="panel-title">
          <div>
            <h2>Risk Breakdown</h2>
            <p>Risk score across facility intelligence modules</p>
          </div>
          <ShieldAlert size={24} />
        </div>

        <div className="risk-chart">
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

      <div className="risk-grid">
        {riskItems.map((item) => {
          const Icon = item.icon;
          const warning = item.value >= 30;

          return (
            <div className="risk-item" key={item.name}>
              <div className="risk-item-icon">
                <Icon size={21} />
              </div>

              <div className="risk-item-content">
                <span>{item.name}</span>
                <strong>{item.value}</strong>
              </div>

              <div className={`risk-badge ${warning ? "warning" : "safe"}`}>
                {warning ? "Attention" : "Stable"}
              </div>
            </div>
          );
        })}
      </div>

      <div className="panel">
        <div className="panel-title">
          <div>
            <h2>Risk Intelligence Systems</h2>
            <p>AI monitoring and decision-support engines</p>
          </div>
          <Brain size={24} />
        </div>

        <div className="risk-status-grid">
          <div className="risk-status-item">
            <CheckCircle size={20} />
            <div>
              <span>Risk Monitoring</span>
              <strong>{data.monitoring}</strong>
            </div>
          </div>

          <div className="risk-status-item">
            <Brain size={20} />
            <div>
              <span>Risk Prediction</span>
              <strong>{data.risk_prediction}</strong>
            </div>
          </div>

          <div className="risk-status-item">
            <Activity size={20} />
            <div>
              <span>Recommendation Engine</span>
              <strong>{data.recommendation_engine}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
