import { useEffect, useState } from "react";
import axios from "axios";
import {
  Wrench,
  Activity,
  CheckCircle,
  AlertTriangle,
  Brain,
  ShieldCheck,
  Settings,
  Zap
} from "lucide-react";

const API = "http://127.0.0.1:8000";

export default function Assets() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios.get(`${API}/api/assets`)
      .then((res) => setData(res.data))
      .catch((err) => {
        console.error(err);
        setError("Asset data load nahi ho paaya.");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="dashboard-page">
        <div className="loading-panel">
          <Wrench size={30} />
          <h2>Loading Asset Intelligence...</h2>
          <p>Facility assets ka health data fetch ho raha hai.</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="dashboard-page">
        <div className="error-box">
          <AlertTriangle size={20} />
          {error || "Unable to load asset data."}
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <div className="page-header">
        <div>
          <h1>Asset Intelligence</h1>
          <p>Monitor facility assets, health and maintenance status</p>
        </div>
        <div className="live-status">
          <span className="status-dot"></span>
          ASSET MONITORING ACTIVE
        </div>
      </div>

      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-icon"><Settings size={25} /></div>
          <div>
            <p>Total Assets</p>
            <h2>{data.total_assets}</h2>
            <span>Registered assets</span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon"><CheckCircle size={25} /></div>
          <div>
            <p>Active Assets</p>
            <h2>{data.active_assets}</h2>
            <span>Operational</span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon"><Wrench size={25} /></div>
          <div>
            <p>Maintenance</p>
            <h2>{data.maintenance_required}</h2>
            <span>Needs attention</span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon"><AlertTriangle size={25} /></div>
          <div>
            <p>Critical Assets</p>
            <h2>{data.critical_assets}</h2>
            <span>Priority assets</span>
          </div>
        </div>
      </div>

      <div className="panel">
        <div className="panel-title">
          <div>
            <h2>Asset Health Overview</h2>
            <p>Overall condition of monitored infrastructure</p>
          </div>
          <ShieldCheck size={24} />
        </div>

        <div className="asset-health-card">
          <div className="asset-health-score">
            <Activity size={24} />
            <div>
              <span>Overall Asset Health</span>
              <strong>{data.asset_health}%</strong>
            </div>
          </div>

          <div className="health-bar">
            <div style={{ width: `${data.asset_health}%` }}></div>
          </div>
        </div>
      </div>

      <div className="panel">
        <div className="panel-title">
          <div>
            <h2>Monitored Assets</h2>
            <p>Asset-level health and operational status</p>
          </div>
          <Brain size={24} />
        </div>

        <div className="asset-list">
          {data.assets.map((asset) => {
            const isMaintenance = asset.status === "Maintenance";
            const isCritical = asset.health < 70;

            return (
              <div className="asset-item" key={asset.id}>
                <div className="asset-icon">
                  {asset.category === "Energy" ? (
                    <Zap size={21} />
                  ) : (
                    <Settings size={21} />
                  )}
                </div>

                <div className="asset-info">
                  <strong>{asset.name}</strong>
                  <span>{asset.id} · {asset.category}</span>
                </div>

                <div className="asset-health">
                  <span>Health</span>
                  <strong>{asset.health}%</strong>
                </div>

                <div className={`asset-status ${isMaintenance || isCritical ? "warning" : "active"}`}>
                  {isMaintenance ? "Maintenance" : asset.status}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
