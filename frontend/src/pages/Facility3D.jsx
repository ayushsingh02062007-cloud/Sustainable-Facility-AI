import { useEffect, useState } from "react";
import api from "../services/api";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import {
  Activity,
  Building2,
  Droplets,
  Leaf,
  Zap,
  Trash2,
  Car,
  ShieldCheck
} from "lucide-react";

function Tree({ position, scale = 1 }) {
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 0.6, 0]}>
        <cylinderGeometry args={[0.12, 0.16, 1.2, 8]} />
        <meshStandardMaterial color="#5b4636" />
      </mesh>
      <mesh position={[0, 1.5, 0]}>
        <sphereGeometry args={[0.7, 12, 12]} />
        <meshStandardMaterial color="#1f8f55" roughness={0.8} />
      </mesh>
    </group>
  );
}

function SolarPanel({ position, rotation = [0, 0, 0] }) {
  return (
    <mesh position={position} rotation={rotation}>
      <boxGeometry args={[1.8, 0.08, 1.2]} />
      <meshStandardMaterial
        color="#123b67"
        metalness={0.8}
        roughness={0.25}
      />
    </mesh>
  );
}

function Building({ position, size, color = "#31506b", height = 2.5 }) {
  const windowRows = Math.max(2, Math.floor(height));

  return (
    <group position={position}>

      {/* Main building */}
      <mesh position={[0, height / 2, 0]}>
        <boxGeometry args={[size[0], height, size[1]]} />
        <meshStandardMaterial
          color={color}
          metalness={0.5}
          roughness={0.38}
        />
      </mesh>

      {/* Roof */}
      <mesh position={[0, height + 0.12, 0]}>
        <boxGeometry args={[size[0] + 0.24, 0.18, size[1] + 0.24]} />
        <meshStandardMaterial
          color="#91a9b9"
          metalness={0.65}
          roughness={0.28}
        />
      </mesh>

      {/* Glowing front windows */}
      {Array.from({ length: windowRows }).map((_, row) =>
        [-0.72, -0.36, 0, 0.36, 0.72].map((x, index) => (
          <mesh
            key={`${row}-${index}`}
            position={[
              x * (size[0] / 2.1),
              0.55 + row * 0.72,
              size[1] / 2 + 0.035
            ]}
          >
            <boxGeometry args={[0.24, 0.38, 0.045]} />
            <meshStandardMaterial
              color="#65d9ef"
              emissive="#0b7185"
              emissiveIntensity={1.2}
              metalness={0.2}
              roughness={0.25}
            />
          </mesh>
        ))
      )}

      {/* Side windows */}
      {Array.from({ length: windowRows }).map((_, row) => (
        <mesh
          key={`side-${row}`}
          position={[
            size[0] / 2 + 0.035,
            0.55 + row * 0.72,
            0
          ]}
        >
          <boxGeometry args={[0.045, 0.38, 1.25]} />
          <meshStandardMaterial
            color="#66e3a4"
            emissive="#126044"
            emissiveIntensity={0.8}
          />
        </mesh>
      ))}

      {/* Entrance */}
      <mesh position={[0, 0.72, size[1] / 2 + 0.06]}>
        <boxGeometry args={[0.9, 1.45, 0.08]} />
        <meshStandardMaterial
          color="#122d3c"
          metalness={0.7}
          roughness={0.2}
        />
      </mesh>

      {/* Entrance glow */}
      <mesh position={[0, 1.5, size[1] / 2 + 0.09]}>
        <boxGeometry args={[1.05, 0.08, 0.05]} />
        <meshStandardMaterial
          color="#66e3a4"
          emissive="#66e3a4"
          emissiveIntensity={2}
        />
      </mesh>

      {/* Solar panel */}
      <SolarPanel
        position={[0, height + 0.28, 0]}
        rotation={[0.12, 0, 0]}
      />

      {/* Rooftop equipment */}
      <mesh position={[size[0] * 0.32, height + 0.45, -size[1] * 0.25]}>
        <boxGeometry args={[0.5, 0.45, 0.5]} />
        <meshStandardMaterial
          color="#647789"
          metalness={0.65}
          roughness={0.35}
        />
      </mesh>

    </group>
  );
}
function Campus() {
  const trees = [
    [-6, 0, -4],
    [-5, 0, 4],
    [6, 0, -4],
    [6, 0, 4],
    [-8, 0, 1],
    [8, 0, 1],
    [-3, 0, 6],
    [3, 0, 6],
    [-3, 0, -6],
    [3, 0, -6]
  ];

  return (
    <group>
      {/* Campus base */}
      <mesh position={[0, -0.25, 0]}>
        <boxGeometry args={[20, 0.5, 15]} />
        <meshStandardMaterial color="#102c31" roughness={0.9} />
      </mesh>

      {/* Green zone */}
      <mesh position={[0, 0.02, 0]}>
        <boxGeometry args={[18.5, 0.08, 13.5]} />
        <meshStandardMaterial color="#153d35" roughness={0.9} />
      </mesh>

      {/* Main road */}
      <mesh position={[0, 0.08, 0]}>
        <boxGeometry args={[2.2, 0.08, 13]} />
        <meshStandardMaterial color="#202c35" roughness={0.9} />
      </mesh>

      <mesh position={[0, 0.08, 0]}>
        <boxGeometry args={[18, 0.08, 2.1]} />
        <meshStandardMaterial color="#202c35" roughness={0.9} />
      </mesh>

      {/* Buildings */}
      <Building
        position={[0, 0, 2.7]}
        size={[5.2, 3.2]}
        height={3.4}
        color="#41657b"
      />

      <Building
        position={[-5.4, 0, 2.7]}
        size={[3.1, 2.6]}
        height={2.5}
        color="#294d68"
      />

      <Building
        position={[5.4, 0, 2.7]}
        size={[3.1, 2.6]}
        height={2.5}
        color="#38576e"
      />

      <Building
        position={[-5.2, 0, -3.8]}
        size={[3.8, 2.5]}
        height={2.4}
        color="#31566a"
      />

      <Building
        position={[5.2, 0, -3.8]}
        size={[3.8, 2.5]}
        height={2.4}
        color="#31566a"
      />

      {/* Water tank */}
      <group position={[0, 0, -4.5]}>
        <mesh position={[0, 1.1, 0]}>
          <cylinderGeometry args={[0.9, 0.9, 2.2, 20]} />
          <meshStandardMaterial color="#638ea5" metalness={0.5} />
        </mesh>
        <mesh position={[0, 2.3, 0]}>
          <cylinderGeometry args={[0.95, 0.95, 0.15, 20]} />
          <meshStandardMaterial color="#66e3a4" emissive="#164d38" />
        </mesh>
      </group>

      {/* Parking */}
      <mesh position={[-6.3, 0.1, -0.4]}>
        <boxGeometry args={[3.5, 0.08, 2.5]} />
        <meshStandardMaterial color="#25333c" />
      </mesh>

      {/* Trees */}
      {trees.map((position, index) => (
        <Tree key={index} position={position} scale={0.8} />
      ))}
    </group>
  );
}

function DataBeacon({ position, color = "#66e3a4" }) {
  return (
    <group position={position}>

      {/* Sensor core */}
      <mesh>
        <sphereGeometry args={[0.16, 20, 20]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={3}
          metalness={0.2}
          roughness={0.2}
        />
      </mesh>

      {/* Outer sensor ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.28, 0.34, 32]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.65}
        />
      </mesh>

      {/* Vertical signal beam */}
      <mesh position={[0, -0.7, 0]}>
        <cylinderGeometry args={[0.018, 0.018, 1.4, 8]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.32}
        />
      </mesh>

      {/* Antenna */}
      <mesh position={[0, 0.42, 0]}>
        <cylinderGeometry args={[0.025, 0.025, 0.55, 8]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={1.5}
        />
      </mesh>

      {/* Antenna tip */}
      <mesh position={[0, 0.72, 0]}>
        <sphereGeometry args={[0.055, 12, 12]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={3}
        />
      </mesh>

    </group>
  );
}
function Scene() {
  return (
    <>
      <ambientLight intensity={1.4} />

      <directionalLight
        position={[8, 12, 10]}
        intensity={2.4}
      />

      <pointLight
        position={[0, 5, 0]}
        intensity={3}
        distance={18}
        color="#66e3a4"
      />

      <Campus />

      <DataBeacon position={[0, 4.4, 2.7]} color="#66e3a4" />
      <DataBeacon position={[-5.4, 3, 2.7]} color="#38bdf8" />
      <DataBeacon position={[5.4, 3, 2.7]} color="#a78bfa" />

      <OrbitControls
        enableDamping
        dampingFactor={0.08}
        minDistance={9}
        maxDistance={25}
        maxPolarAngle={Math.PI / 2.05}
      />
    </>
  );
}

export default function Facility3D() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/3d")
      .then((res) => setData(res.data))
      .catch((err) => {
        console.error(err);
        setError("3D facility data load nahi ho paaya.");
      });
  }, []);

  return (
    <div className="dashboard-page facility-3d-page">

      <div className="page-header">
        <div>
          <h1>3D Facility View</h1>
          <p>Real-time digital twin of the sustainable facility</p>
        </div>

        <div className="live-status">
          <span className="status-dot"></span>
          SYSTEM ONLINE
        </div>
      </div>

      {error && <div className="error-box">{error}</div>}

      <div className="facility-3d-layout">

        {/* Left live data */}
        <div className="panel facility-side-panel">
          <div className="panel-title">
            <div>
              <h2>Live Facility Data</h2>
              <p>Current sensor conditions</p>
            </div>
            <Activity size={22} />
          </div>

          <div className="facility-live-list">
            <div>
              <span>?? Temperature</span>
              <strong>28.4 °C</strong>
            </div>

            <div>
              <span>?? Humidity</span>
              <strong>62%</strong>
            </div>

            <div>
              <span>?? Occupancy</span>
              <strong>250</strong>
            </div>

            <div>
              <span>?? AQI</span>
              <strong>76</strong>
            </div>

            <div>
              <span>?? Traffic</span>
              <strong>124</strong>
            </div>

            <div>
              <span>? Asset Utilization</span>
              <strong>85%</strong>
            </div>
          </div>
        </div>

        {/* 3D scene */}
        <div className="panel facility-3d-panel">
          <div className="facility-3d-header">
            <div>
              <h2>{data?.facility || "Sustainable Smart Campus"}</h2>
              <p>Interactive 3D digital twin</p>
            </div>

            <div className="facility-3d-badge">
              <Activity size={16} />
              LIVE
            </div>
          </div>

          <div className="facility-3d-canvas">
            <Canvas camera={{ position: [12, 10, 14], fov: 42 }}>
              <Scene />
            </Canvas>

            <div className="scene-label solar-label">
              <Zap size={15} />
              Solar System
            </div>

            <div className="scene-label water-label">
              <Droplets size={15} />
              Water Network
            </div>

            <div className="scene-label waste-label">
              <Trash2 size={15} />
              Waste Monitor
            </div>
          </div>
        </div>

        {/* Right status */}
        <div className="panel facility-side-panel">
          <div className="panel-title">
            <div>
              <h2>Facility Status</h2>
              <p>System health</p>
            </div>
            <ShieldCheck size={22} />
          </div>

          <div className="facility-status-list">
            <div>
              <Zap size={18} />
              <span>Energy System</span>
              <b>Normal</b>
            </div>

            <div>
              <Droplets size={18} />
              <span>Water System</span>
              <b>Normal</b>
            </div>

            <div>
              <Trash2 size={18} />
              <span>Waste System</span>
              <b>Normal</b>
            </div>

            <div>
              <Activity size={18} />
              <span>Air Quality</span>
              <b>Good</b>
            </div>

            <div>
              <Car size={18} />
              <span>Traffic Flow</span>
              <b>Normal</b>
            </div>

            <div>
              <Leaf size={18} />
              <span>Environment</span>
              <b>Healthy</b>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom KPIs */}
      <div className="kpi-grid facility-bottom-kpis">

        <div className="kpi-card">
          <div className="kpi-icon"><Zap size={25} /></div>
          <div>
            <p>Energy Consumption</p>
            <h2>119.19 <span>kWh</span></h2>
            <span>AI Predicted</span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon"><Droplets size={25} /></div>
          <div>
            <p>Water Usage</p>
            <h2>829.7 <span>L</span></h2>
            <span>AI Predicted</span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon"><Trash2 size={25} /></div>
          <div>
            <p>Waste Generation</p>
            <h2>57.79 <span>kg</span></h2>
            <span>AI Predicted</span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon"><Activity size={25} /></div>
          <div>
            <p>Risk Score</p>
            <h2>46.02</h2>
            <span>MEDIUM</span>
          </div>
        </div>

      </div>

      {data && (
        <div className="facility-meta">
          <span><Building2 size={16} /> Buildings: {data.buildings}</span>
          <span>Floors: {data.floors}</span>
          <span>Zones: {data.zones}</span>
          <span>IoT Devices: {data.iot_devices}</span>
          <span>Sustainability: {data.sustainability_score}/100</span>
        </div>
      )}

    </div>
  );
}





