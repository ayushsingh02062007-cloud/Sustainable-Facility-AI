import { useEffect, useState } from "react";
import axios from "axios";
import {
  Car,
  Activity,
  Gauge,
  ParkingSquare,
  Brain,
  CheckCircle,
  AlertTriangle,
  MapPin
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

export default function Traffic() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios.get(`${API}/api/traffic`)
      .then((res) => setData(res.data))
      .catch((err) => {
        console.error(err);
        setError("Traffic data load nahi ho paaya.");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="dashboard-page">
        <div className="loading-panel">
          <Car size={30} />
          <h2>Loading Traffic Intelligence...</h2>
          <p>Mobility data fetch ho raha hai.</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="dashboard-page">
        <div className="error-box">
          <AlertTriangle size={20} />
          {error || "Unable to load traffic data."}
        </div>
      </div>
    );
  }

  const chartData = [
    { name: "Vehicles", value: data.vehicle_count },
    { name: "Speed", value: data.average_speed },
    { name: "Parking", value: data.parking_occupancy }
  ];

  return (
    <div className="dashboard-page">
      <div className="page-header">
        <div>
          <h1>Traffic Intelligence</h1>
          <p>Real-time facility traffic and mobility monitoring</p>
        </div>
        <div className="live-status">
          <span className="status-dot"></span>
          TRAFFIC MONITORING ACTIVE
        </div>
      </div>

      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-icon"><Car size={25} /></div>
          <div>
            <p>Traffic Level</p>
            <h2>{data.traffic_level}</h2>
            <span>{data.status}</span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon"><Activity size={25} /></div>
          <div>
            <p>Vehicle Count</p>
            <h2>{data.vehicle_count}</h2>
            <span>Active vehicles</span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon"><Gauge size={25} /></div>
          <div>
            <p>Average Speed</p>
            <h2>{data.average_speed}<span>km/h</span></h2>
            <span>Current average</span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon"><ParkingSquare size={25} /></div>
          <div>
            <p>Parking Occupancy</p>
            <h2>{data.parking_occupancy}<span>%</span></h2>
            <span>Facility parking</span>
          </div>
        </div>
      </div>

      <div className="panel">
        <div className="panel-title">
          <div>
            <h2>Traffic Overview</h2>
            <p>Current mobility measurements</p>
          </div>
          <Car size={24} />
        </div>

        <div className="traffic-chart">
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

      <div className="panel">
        <div className="panel-title">
          <div>
            <h2>Traffic Monitoring Status</h2>
            <p>Mobility intelligence systems</p>
          </div>
          <Brain size={24} />
        </div>

        <div className="traffic-status-grid">
          <div className="traffic-status-item">
            <CheckCircle size={20} />
            <div><span>Traffic Status</span><strong>{data.status}</strong></div>
          </div>

          <div className="traffic-status-item">
            <MapPin size={20} />
            <div><span>Hotspot</span><strong>{data.hotspot}</strong></div>
          </div>

          <div className="traffic-status-item">
            <Activity size={20} />
            <div><span>Monitoring</span><strong>{data.monitoring}</strong></div>
          </div>

          <div className="traffic-status-item">
            <Brain size={20} />
            <div><span>Anomaly Detection</span><strong>{data.anomaly_detection}</strong></div>
          </div>

          <div className="traffic-status-item">
            <Gauge size={20} />
            <div><span>Forecasting</span><strong>{data.forecasting}</strong></div>
          </div>
        </div>
      </div>
    </div>
  );
}
