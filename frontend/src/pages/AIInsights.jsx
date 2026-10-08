import { useEffect, useState } from "react";
import api from "../services/api";
import {
  Brain,
  CheckCircle,
  AlertTriangle,
  Zap,
  Droplets,
  Car,
  Wrench,
  ArrowRight
} from "lucide-react";

const moduleIcons = {
  Energy: Zap,
  Water: Droplets,
  Traffic: Car,
  Assets: Wrench
};

export default function AIInsights() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/recommendations")
      .then((res) => setData(res.data))
      .catch((err) => {
        console.error(err);
        setError("AI recommendations load nahi ho paaye.");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="dashboard-page">
        <div className="loading-panel">
          <Brain size={30} />
          <h2>Loading AI Insights...</h2>
          <p>AI recommendation engine se data fetch ho raha hai.</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="dashboard-page">
        <div className="error-box">
          <AlertTriangle size={20} />
          {error || "Unable to load AI insights."}
        </div>
      </div>
    );
  }

  const recommendations = Array.isArray(data.recommendations)
    ? data.recommendations
    : [];

  const highPriorityCount = recommendations.filter(
    (item) => String(item.priority).toLowerCase() === "high"
  ).length;

  return (
    <div className="dashboard-page">
      <div className="page-header">
        <div>
          <h1>AI Facility Insights</h1>
          <p>
            AI-powered recommendations for sustainable facility operations
          </p>
        </div>

        <div className="live-status">
          <span className="status-dot"></span>
          AI ENGINE ACTIVE
        </div>
      </div>

      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-icon">
            <Brain size={25} />
          </div>
          <div>
            <p>AI Engine</p>
            <h2>{data.ai_engine || "Operational"}</h2>
            <span>System status</span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon">
            <CheckCircle size={25} />
          </div>
          <div>
            <p>Recommendations</p>
            <h2>{recommendations.length}</h2>
            <span>Active insights</span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon">
            <AlertTriangle size={25} />
          </div>
          <div>
            <p>High Priority</p>
            <h2>{highPriorityCount}</h2>
            <span>Requires attention</span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon">
            <CheckCircle size={25} />
          </div>
          <div>
            <p>System Status</p>
            <h2>{data.status || "Active"}</h2>
            <span>AI monitoring</span>
          </div>
        </div>
      </div>

      <div className="panel">
        <div className="panel-title">
          <div>
            <h2>AI Recommendations</h2>
            <p>Intelligent actions generated from facility data</p>
          </div>
          <Brain size={24} />
        </div>

        <div className="ai-recommendations">
          {recommendations.map((item) => {
            const Icon = moduleIcons[item.module] || Brain;
            const isHigh =
              String(item.priority).toLowerCase() === "high";

            return (
              <div className="ai-recommendation-card" key={item.id}>
                <div className="ai-recommendation-header">
                  <div className="ai-module">
                    <div className="ai-module-icon">
                      <Icon size={22} />
                    </div>

                    <div>
                      <h3>{item.module}</h3>
                      <span
                        className={
                          isHigh
                            ? "priority-badge high"
                            : "priority-badge medium"
                        }
                      >
                        {item.priority} Priority
                      </span>
                    </div>
                  </div>

                  <Brain size={20} />
                </div>

                <div className="ai-detail">
                  <span>Problem</span>
                  <p>{item.problem}</p>
                </div>

                <div className="ai-detail">
                  <span>Reason</span>
                  <p>{item.reason}</p>
                </div>

                <div className="ai-action">
                  <div>
                    <span>Recommended Action</span>
                    <p>{item.action}</p>
                  </div>

                  <ArrowRight size={20} />
                </div>

                <div className="ai-impact">
                  <span>Expected Impact</span>
                  <p>{item.impact}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}



