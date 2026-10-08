import { useEffect, useState } from "react";
import api from "../services/api";
import {
  TrendingUp,
  Zap,
  Droplets,
  Brain,
  CheckCircle,
  AlertTriangle,
  Activity
} from "lucide-react";

export default function Forecasting() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/forecast/")
      .then((res) => setData(res.data))
      .catch((err) => {
        console.error(err);
        setError("Forecast data load nahi ho paaya.");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="dashboard-page">
        <div className="loading-panel">
          <Brain size={30} />
          <h2>Loading AI Forecast...</h2>
          <p>Future facility conditions predict ki ja rahi hain.</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="dashboard-page">
        <div className="error-box">
          <AlertTriangle size={20} />
          {error || "Unable to load forecast data."}
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <div className="page-header">
        <div>
          <h1>AI Forecasting</h1>
          <p>
            Predictive insights for future facility operations
          </p>
        </div>

        <div className="live-status">
          <span className="status-dot"></span>
          FORECAST ENGINE ACTIVE
        </div>
      </div>

      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-icon">
            <Zap size={25} />
          </div>

          <div>
            <p>Next 24 Hours Energy</p>
            <h2>{data.next_24_hours_energy} <span>kWh</span></h2>
            <small>Predicted consumption</small>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon">
            <Droplets size={25} />
          </div>

          <div>
            <p>Next Day Water</p>
            <h2>{data.next_day_water} <span>L</span></h2>
            <small>Predicted consumption</small>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon">
            <TrendingUp size={25} />
          </div>

          <div>
            <p>Forecast Confidence</p>
            <h2>{data.confidence}<span>%</span></h2>
            <small>Model confidence</small>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon">
            <CheckCircle size={25} />
          </div>

          <div>
            <p>Prediction Status</p>
            <h2>Active</h2>
            <small>AI forecasting engine</small>
          </div>
        </div>
      </div>

      <div className="panel">
        <div className="panel-title">
          <div>
            <h2>Forecast Status</h2>
            <p>Current predictive intelligence status</p>
          </div>

          <Activity size={24} />
        </div>

        <div className="forecast-status-grid">
          <div className="forecast-status-item">
            <div className="forecast-status-icon">
              <Brain size={20} />
            </div>
            <div>
              <span>AI Forecasting</span>
              <strong>Active</strong>
            </div>
          </div>

          <div className="forecast-status-item">
            <div className="forecast-status-icon">
              <TrendingUp size={20} />
            </div>
            <div>
              <span>Prediction Confidence</span>
              <strong>{data.confidence}%</strong>
            </div>
          </div>

          <div className="forecast-status-item">
            <div className="forecast-status-icon">
              <Zap size={20} />
            </div>
            <div>
              <span>Energy Forecast</span>
              <strong>{data.next_24_hours_energy} kWh</strong>
            </div>
          </div>

          <div className="forecast-status-item">
            <div className="forecast-status-icon">
              <Droplets size={20} />
            </div>
            <div>
              <span>Water Forecast</span>
              <strong>{data.next_day_water} L</strong>
            </div>
          </div>
        </div>
      </div>

      <div className="panel forecast-info-panel">
        <div className="panel-title">
          <div>
            <h2>Predictive Intelligence</h2>
            <p>How the forecasting engine supports operations</p>
          </div>

          <Brain size={24} />
        </div>

        <div className="forecast-info">
          <div>
            <CheckCircle size={20} />
            <p>Forecast future energy and water demand.</p>
          </div>

          <div>
            <CheckCircle size={20} />
            <p>Support proactive facility planning.</p>
          </div>

          <div>
            <CheckCircle size={20} />
            <p>Help administrators prepare for changing demand.</p>
          </div>
        </div>
      </div>
    </div>
  );
}



