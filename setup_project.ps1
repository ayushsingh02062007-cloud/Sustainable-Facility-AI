$ErrorActionPreference = "Stop"

$root = Get-Location

$files = @{
"requirements.txt" = @"
fastapi
uvicorn[standard]
pandas
numpy
scikit-learn
joblib
pydantic
python-dotenv
sqlalchemy
psycopg2-binary
"@

"backend\main.py" = @"
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="Sustainable Facility AI",
    version="1.0.0",
    description="AI-powered Sustainable Facility and Estate Intelligence Platform"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {
        "status": "online",
        "project": "Sustainable Facility AI",
        "version": "1.0.0"
    }

@app.get("/api/health")
def health():
    return {"status": "healthy"}

@app.get("/api/dashboard")
def dashboard():
    return {
        "sustainability_score": 82,
        "energy": 14.2,
        "water": 18.4,
        "aqi": 76,
        "waste": 68,
        "risk": "LOW"
    }
"@

"backend\config.py" = @"
import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "sqlite:///./facility.db"
)

APP_NAME = "Sustainable Facility AI"
DEBUG = os.getenv("DEBUG", "True").lower() == "true"
"@

"backend\api\__init__.py" = ""
"backend\models\__init__.py" = ""
"backend\services\__init__.py" = ""
"backend\database\__init__.py" = ""

"backend\api\dashboard.py" = @"
from fastapi import APIRouter

router = APIRouter(prefix="/api/dashboard", tags=["Dashboard"])

@router.get("/")
def get_dashboard():
    return {
        "sustainability_score": 82,
        "energy": 14.2,
        "water": 18.4,
        "aqi": 76,
        "waste": 68,
        "risk": "LOW"
    }
"@

"backend\api\energy.py" = @"
from fastapi import APIRouter

router = APIRouter(prefix="/api/energy", tags=["Energy"])

@router.get("/")
def energy_data():
    return {
        "current": 14.2,
        "unit": "MWh",
        "status": "normal"
    }
"@

"backend\api\water.py" = @"
from fastapi import APIRouter

router = APIRouter(prefix="/api/water", tags=["Water"])

@router.get("/")
def water_data():
    return {
        "current": 18.4,
        "unit": "KL",
        "status": "normal"
    }
"@

"backend\api\waste.py" = @"
from fastapi import APIRouter

router = APIRouter(prefix="/api/waste", tags=["Waste"])

@router.get("/")
def waste_data():
    return {
        "average_bin_level": 68,
        "overflow_risk": 12,
        "status": "normal"
    }
"@

"backend\api\air_quality.py" = @"
from fastapi import APIRouter

router = APIRouter(prefix="/api/air-quality", tags=["Air Quality"])

@router.get("/")
def air_quality():
    return {
        "aqi": 76,
        "temperature": 29.4,
        "humidity": 61,
        "status": "moderate"
    }
"@

"backend\api\traffic.py" = @"
from fastapi import APIRouter

router = APIRouter(prefix="/api/traffic", tags=["Traffic"])

@router.get("/")
def traffic():
    return {
        "occupancy": 64,
        "parking_usage": 71,
        "hotspot": "Main Gate"
    }
"@

"backend\api\assets.py" = @"
from fastapi import APIRouter

router = APIRouter(prefix="/api/assets", tags=["Assets"])

@router.get("/")
def assets():
    return {
        "total_assets": 128,
        "active": 117,
        "maintenance": 11
    }
"@

"backend\api\anomalies.py" = @"
from fastapi import APIRouter

router = APIRouter(prefix="/api/anomalies", tags=["Anomalies"])

@router.get("/")
def anomalies():
    return {
        "total": 7,
        "high": 1,
        "medium": 3,
        "low": 3
    }
"@

"backend\api\forecasting.py" = @"
from fastapi import APIRouter

router = APIRouter(prefix="/api/forecast", tags=["Forecasting"])

@router.get("/")
def forecast():
    return {
        "next_24_hours_energy": 13.8,
        "next_day_water": 19.1,
        "confidence": 91
    }
"@

"backend\api\risk.py" = @"
from fastapi import APIRouter

router = APIRouter(prefix="/api/risk", tags=["Risk"])

@router.get("/")
def risk():
    return {
        "score": 27,
        "level": "LOW",
        "energy_risk": 18,
        "water_risk": 22,
        "air_risk": 31,
        "waste_risk": 42
    }
"@

"backend\api\recommendations.py" = @"
from fastapi import APIRouter

router = APIRouter(prefix="/api/recommendations", tags=["Recommendations"])

@router.get("/")
def recommendations():
    return [
        {
            "priority": "HIGH",
            "issue": "High energy consumption",
            "action": "Optimize HVAC schedule during low occupancy hours"
        },
        {
            "priority": "MEDIUM",
            "issue": "Waste bin level increasing",
            "action": "Schedule collection before predicted overflow"
        },
        {
            "priority": "LOW",
            "issue": "Water usage trend",
            "action": "Inspect high-consumption zones"
        }
    ]
"@

"backend\api\simulation.py" = @"
from fastapi import APIRouter

router = APIRouter(prefix="/api/simulation", tags=["Simulation"])

@router.get("/")
def simulation():
    return {
        "energy_saving_percent": 8.4,
        "waste_overflow_reduction": 31,
        "impact": "HIGH"
    }
"@

"backend\api\auth.py" = @"
from fastapi import APIRouter

router = APIRouter(prefix="/api/auth", tags=["Authentication"])

@router.post("/login")
def login(username: str, password: str):
    if username == "admin" and password == "admin123":
        return {
            "success": True,
            "role": "administrator",
            "token": "demo-token"
        }

    return {
        "success": False,
        "message": "Invalid credentials"
    }
"@

"backend\database\connection.py" = @"
from sqlalchemy import create_engine
from backend.config import DATABASE_URL

connect_args = {}

if DATABASE_URL.startswith("sqlite"):
    connect_args = {"check_same_thread": False}

engine = create_engine(
    DATABASE_URL,
    connect_args=connect_args
)
"@

"backend\database\crud.py" = @"
def get_dashboard_data():
    return {
        "sustainability_score": 82,
        "risk": "LOW"
    }
"@

"backend\models\database_models.py" = @"
from sqlalchemy.orm import DeclarativeBase

class Base(DeclarativeBase):
    pass
"@

"backend\models\schemas.py" = @"
from pydantic import BaseModel

class SensorReading(BaseModel):
    timestamp: str
    building: str
    energy: float
    water: float
    aqi: float
    temperature: float
    humidity: float
    occupancy: int
    waste_level: float
"@

"backend\services\data_service.py" = @"
def get_latest_data():
    return {
        "energy": 14.2,
        "water": 18.4,
        "aqi": 76
    }
"@

"backend\services\ml_service.py" = @"
def get_ml_status():
    return {
        "anomaly_model": "ready",
        "forecast_model": "ready",
        "risk_model": "ready"
    }
"@

"backend\services\ai_service.py" = @"
def generate_insight():
    return {
        "insight": "Energy consumption is above expected level during low occupancy hours.",
        "priority": "HIGH"
    }
"@

"backend\services\recommendation_service.py" = @"
def get_recommendation():
    return {
        "recommendation": "Optimize HVAC operation during low occupancy periods.",
        "priority": "HIGH"
    }
"@

"data_pipeline\generate_synthetic_data.py" = @"
import numpy as np
import pandas as pd
from pathlib import Path

np.random.seed(42)

N = 10000

timestamps = pd.date_range(
    start="2026-01-01",
    periods=N,
    freq="h"
)

buildings = [
    "Admin Block",
    "Engineering Block",
    "Computer Science Block",
    "Library",
    "Hostel A",
    "Hostel B",
    "Laboratory",
    "Auditorium"
]

df = pd.DataFrame({
    "timestamp": timestamps,
    "building": np.random.choice(buildings, N),
    "temperature": np.random.normal(28, 4, N).round(2),
    "humidity": np.random.normal(60, 10, N).clip(20, 95).round(2),
    "occupancy": np.random.randint(20, 500, N),
    "energy_kwh": np.random.normal(120, 35, N).clip(20, 300).round(2),
    "water_liters": np.random.normal(850, 250, N).clip(100, 2000).round(2),
    "aqi": np.random.normal(80, 25, N).clip(20, 300).round(2),
    "waste_bin_level": np.random.uniform(10, 100, N).round(2),
    "traffic_count": np.random.randint(5, 250, N),
    "asset_utilization": np.random.uniform(30, 100, N).round(2)
})

df["anomaly"] = 0

anomaly_idx = np.random.choice(
    df.index,
    size=int(N * 0.05),
    replace=False
)

df.loc[anomaly_idx, "anomaly"] = 1
df.loc[anomaly_idx, "energy_kwh"] *= np.random.uniform(1.5, 2.5, len(anomaly_idx))
df.loc[anomaly_idx, "water_liters"] *= np.random.uniform(1.4, 2.2, len(anomaly_idx))
df.loc[anomaly_idx, "aqi"] *= np.random.uniform(1.4, 2.0, len(anomaly_idx))

output = Path("data/synthetic")
output.mkdir(parents=True, exist_ok=True)

file = output / "facility_iot_10000.csv"
df.to_csv(file, index=False)

print(f"Dataset created: {file}")
print(f"Rows: {len(df)}")
print(f"Anomalies: {df.anomaly.sum()}")
"@

"data_pipeline\data_cleaning.py" = @"
import pandas as pd

def clean_data(input_file, output_file):
    df = pd.read_csv(input_file)

    df = df.drop_duplicates()

    numeric_columns = df.select_dtypes(include="number").columns

    for col in numeric_columns:
        df[col] = df[col].fillna(df[col].median())

    df.to_csv(output_file, index=False)

if __name__ == "__main__":
    clean_data(
        "data/synthetic/facility_iot_10000.csv",
        "data/processed/facility_clean.csv"
    )
"@

"data_pipeline\data_validation.py" = @"
import pandas as pd

def validate(file):
    df = pd.read_csv(file)

    print("Rows:", len(df))
    print("Columns:", len(df.columns))
    print("Missing values:")
    print(df.isnull().sum())
    print("\nDataset validation completed.")

if __name__ == "__main__":
    validate("data/synthetic/facility_iot_10000.csv")
"@

"data_pipeline\sensor_simulator.py" = @"
import random
import time

def generate_sensor_reading():
    return {
        "energy": round(random.uniform(80, 180), 2),
        "water": round(random.uniform(500, 1200), 2),
        "aqi": round(random.uniform(40, 150), 2),
        "occupancy": random.randint(20, 500),
        "waste_level": round(random.uniform(10, 100), 2)
    }

if __name__ == "__main__":
    while True:
        print(generate_sensor_reading())
        time.sleep(2)
"@

"ml\preprocessing\clean_data.py" = @"
import pandas as pd

def load_data(path):
    df = pd.read_csv(path)
    return df.drop_duplicates()

if __name__ == "__main__":
    df = load_data("data/synthetic/facility_iot_10000.csv")
    print(df.head())
"@

"ml\preprocessing\feature_engineering.py" = @"
import pandas as pd

def create_features(df):
    df["timestamp"] = pd.to_datetime(df["timestamp"])
    df["hour"] = df["timestamp"].dt.hour
    df["day"] = df["timestamp"].dt.dayofweek
    df["month"] = df["timestamp"].dt.month

    return df

if __name__ == "__main__":
    df = pd.read_csv("data/synthetic/facility_iot_10000.csv")
    df = create_features(df)
    print(df.head())
"@

"ml\training\train_anomaly.py" = @"
import pandas as pd
import joblib
from sklearn.ensemble import IsolationForest
from pathlib import Path

df = pd.read_csv("data/synthetic/facility_iot_10000.csv")

features = [
    "temperature",
    "humidity",
    "occupancy",
    "energy_kwh",
    "water_liters",
    "aqi",
    "waste_bin_level",
    "traffic_count",
    "asset_utilization"
]

X = df[features]

model = IsolationForest(
    n_estimators=200,
    contamination=0.05,
    random_state=42
)

model.fit(X)

Path("ml/models").mkdir(parents=True, exist_ok=True)

joblib.dump(model, "ml/models/anomaly_model.pkl")

print("Anomaly model trained successfully.")
"@

"ml\training\train_energy.py" = @"
import pandas as pd
import joblib
from sklearn.ensemble import RandomForestRegressor
from pathlib import Path

df = pd.read_csv("data/synthetic/facility_iot_10000.csv")

features = [
    "temperature",
    "humidity",
    "occupancy",
    "water_liters",
    "aqi",
    "traffic_count"
]

X = df[features]
y = df["energy_kwh"]

model = RandomForestRegressor(
    n_estimators=150,
    random_state=42,
    n_jobs=-1
)

model.fit(X, y)

Path("ml/models").mkdir(parents=True, exist_ok=True)

joblib.dump(model, "ml/models/energy_model.pkl")

print("Energy forecasting model trained successfully.")
"@

"ml\training\train_water.py" = @"
import pandas as pd
import joblib
from sklearn.ensemble import RandomForestRegressor
from pathlib import Path

df = pd.read_csv("data/synthetic/facility_iot_10000.csv")

features = [
    "temperature",
    "humidity",
    "occupancy",
    "energy_kwh",
    "aqi"
]

X = df[features]
y = df["water_liters"]

model = RandomForestRegressor(
    n_estimators=150,
    random_state=42,
    n_jobs=-1
)

model.fit(X, y)

Path("ml/models").mkdir(parents=True, exist_ok=True)

joblib.dump(model, "ml/models/water_model.pkl")

print("Water prediction model trained successfully.")
"@

"ml\training\train_waste.py" = @"
import pandas as pd
import joblib
from sklearn.ensemble import RandomForestRegressor
from pathlib import Path

df = pd.read_csv("data/synthetic/facility_iot_10000.csv")

features = [
    "occupancy",
    "energy_kwh",
    "water_liters",
    "temperature",
    "traffic_count"
]

X = df[features]
y = df["waste_bin_level"]

model = RandomForestRegressor(
    n_estimators=150,
    random_state=42,
    n_jobs=-1
)

model.fit(X, y)

Path("ml/models").mkdir(parents=True, exist_ok=True)

joblib.dump(model, "ml/models/waste_model.pkl")

print("Waste prediction model trained successfully.")
"@

"ml\training\train_risk.py" = @"
import pandas as pd
import joblib
from sklearn.ensemble import RandomForestRegressor
from pathlib import Path

df = pd.read_csv("data/synthetic/facility_iot_10000.csv")

features = [
    "temperature",
    "humidity",
    "occupancy",
    "energy_kwh",
    "water_liters",
    "aqi",
    "waste_bin_level",
    "traffic_count",
    "asset_utilization"
]

X = df[features]

y = (
    df["energy_kwh"].rank(pct=True) * 20 +
    df["water_liters"].rank(pct=True) * 20 +
    df["aqi"].rank(pct=True) * 20 +
    df["waste_bin_level"].rank(pct=True) * 20 +
    df["traffic_count"].rank(pct=True) * 20
)

model = RandomForestRegressor(
    n_estimators=150,
    random_state=42,
    n_jobs=-1
)

model.fit(X, y)

Path("ml/models").mkdir(parents=True, exist_ok=True)

joblib.dump(model, "ml/models/risk_model.pkl")

print("Risk model trained successfully.")
"@

"ml\evaluation\metrics.py" = @"
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
import numpy as np

def regression_metrics(y_true, y_pred):
    return {
        "MAE": mean_absolute_error(y_true, y_pred),
        "RMSE": np.sqrt(mean_squared_error(y_true, y_pred)),
        "R2": r2_score(y_true, y_pred)
    }
"@

"ml\evaluation\evaluate_models.py" = @"
import pandas as pd
import joblib
from sklearn.model_selection import train_test_split
from sklearn.metrics import r2_score

df = pd.read_csv("data/synthetic/facility_iot_10000.csv")

features = [
    "temperature",
    "humidity",
    "occupancy",
    "water_liters",
    "aqi",
    "traffic_count"
]

X = df[features]
y = df["energy_kwh"]

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

model = joblib.load("ml/models/energy_model.pkl")

pred = model.predict(X_test)

print("Energy Model R2 Accuracy:", round(r2_score(y_test, pred) * 100, 2), "%")
"@

"ai\insight_engine.py" = @"
def generate_insight(data):
    if data.get("energy", 0) > 150:
        return "Energy consumption is high. Check HVAC and equipment schedules."

    if data.get("waste_level", 0) > 85:
        return "Waste overflow risk is high. Schedule collection."

    if data.get("aqi", 0) > 150:
        return "Air quality is elevated. Inspect possible pollution sources."

    return "Facility conditions are within the expected operating range."
"@

"ai\recommendation_engine.py" = @"
def recommendations(data):
    actions = []

    if data.get("energy", 0) > 150:
        actions.append("Optimize HVAC and equipment schedules.")

    if data.get("waste_level", 0) > 85:
        actions.append("Prioritize waste collection.")

    if data.get("aqi", 0) > 150:
        actions.append("Inspect air-quality hotspot.")

    if not actions:
        actions.append("Continue normal monitoring.")

    return actions
"@

"ai\explainability.py" = @"
def explain_prediction(model_name, prediction):
    return {
        "model": model_name,
        "prediction": prediction,
        "explanation": "Prediction is based on facility operational and environmental features."
    }
"@

"frontend\package.json" = @"
{
  "name": "sustainable-facility-ai",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite",
    "preview": "vite"
  },
  "dependencies": {
    "@vitejs/plugin-react": "latest",
    "axios": "latest",
    "lucide-react": "latest",
    "react": "latest",
    "react-dom": "latest",
    "recharts": "latest",
    "three": "latest",
    "vite": "latest"
  },
  "devDependencies": {}
}
"@

"frontend\index.html" = @"
<!doctype html>
<html>
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Sustainable Facility AI</title>
</head>
<body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
</body>
</html>
"@

"frontend\src\main.jsx" = @"
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/global.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
"@

"frontend\src\App.jsx" = @"
import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "http://127.0.0.1:8000";

function Card({ title, value, unit, status }) {
    return (
        <div className="card">
            <div className="card-title">{title}</div>
            <div className="card-value">{value} <span>{unit}</span></div>
            <div className="status">{status}</div>
        </div>
    );
}

export default function App() {
    const [data, setData] = useState(null);
    const [online, setOnline] = useState(false);

    useEffect(() => {
        axios.get(`${API}/api/dashboard`)
            .then(res => {
                setData(res.data);
                setOnline(true);
            })
            .catch(() => setOnline(false));
    }, []);

    return (
        <div className="app">
            <aside className="sidebar">
                <h2>🌱 SFAI</h2>
                <p className="brand">Sustainable Facility AI</p>

                <nav>
                    <div className="active">Dashboard</div>
                    <div>⚡ Energy</div>
                    <div>💧 Water</div>
                    <div>🗑️ Waste</div>
                    <div>🌫️ Air Quality</div>
                    <div>🚗 Traffic</div>
                    <div>🔧 Assets</div>
                    <div>⚠️ Risk</div>
                    <div>🤖 AI Insights</div>
                    <div>🏢 3D Facility</div>
                    <div>🎯 Simulation</div>
                </nav>
            </aside>

            <main>
                <header>
                    <div>
                        <h1>Facility Intelligence Dashboard</h1>
                        <p>AI-powered sustainability and operations monitoring</p>
                    </div>

                    <div className={online ? "online" : "offline"}>
                        ● {online ? "Backend Online" : "Backend Offline"}
                    </div>
                </header>

                <section className="grid">
                    <Card
                        title="Sustainability Score"
                        value={data?.sustainability_score ?? "--"}
                        unit="/100"
                        status="Excellent"
                    />

                    <Card
                        title="Energy Consumption"
                        value={data?.energy ?? "--"}
                        unit="MWh"
                        status="Monitoring"
                    />

                    <Card
                        title="Water Usage"
                        value={data?.water ?? "--"}
                        unit="KL"
                        status="Normal"
                    />

                    <Card
                        title="Air Quality"
                        value={data?.aqi ?? "--"}
                        unit="AQI"
                        status="Moderate"
                    />

                    <Card
                        title="Waste Level"
                        value={data?.waste ?? "--"}
                        unit="%"
                        status="Monitoring"
                    />

                    <Card
                        title="Facility Risk"
                        value={data?.risk ?? "--"}
                        unit=""
                        status="Low"
                    />
                </section>

                <section className="content-grid">
                    <div className="panel large">
                        <h2>🏢 Facility Overview</h2>
                        <div className="building">
                            <div className="building-top">SUSTAINABLE CAMPUS</div>
                            <div className="building-body">
                                <div>🏢</div>
                                <div>🏢</div>
                                <div>🏢</div>
                            </div>
                            <div className="building-ground">
                                ● ● ● ● ● ● ●
                            </div>
                        </div>
                    </div>

                    <div className="panel">
                        <h2>🚨 AI Alerts</h2>

                        <div className="alert high">
                            <b>HIGH</b>
                            <p>Energy usage above expected level</p>
                        </div>

                        <div className="alert medium">
                            <b>MEDIUM</b>
                            <p>Waste collection recommended</p>
                        </div>

                        <div className="alert low">
                            <b>LOW</b>
                            <p>Water usage trend detected</p>
                        </div>
                    </div>
                </section>

                <section className="panel">
                    <h2>🤖 AI Recommendation</h2>
                    <div className="recommendation">
                        <strong>Optimize HVAC operation</strong>
                        <p>
                            Energy consumption appears higher during low occupancy
                            periods. Consider adjusting HVAC schedules.
                        </p>
                        <button>Run Simulation →</button>
                    </div>
                </section>

                <footer>
                    Sustainable Facility AI • Decision-support prototype
                </footer>
            </main>
        </div>
    );
}
"@

"frontend\src\styles\global.css" = @"
* {
    box-sizing: border-box;
}

body {
    margin: 0;
    font-family: Arial, Helvetica, sans-serif;
    background: #08111f;
    color: #e8f0f7;
}

.app {
    display: flex;
    min-height: 100vh;
}

.sidebar {
    width: 245px;
    background: #0d1728;
    border-right: 1px solid #20324a;
    padding: 25px 18px;
    position: fixed;
    top: 0;
    bottom: 0;
}

.sidebar h2 {
    margin: 0;
    font-size: 28px;
}

.brand {
    color: #8ca2ba;
    font-size: 12px;
    margin-bottom: 30px;
}

nav div {
    padding: 13px 12px;
    margin: 4px 0;
    border-radius: 9px;
    color: #9db0c5;
    cursor: pointer;
}

nav div:hover,
nav .active {
    background: #163047;
    color: #66e3a4;
}

main {
    margin-left: 245px;
    padding: 30px;
    width: calc(100% - 245px);
}

header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
}

header h1 {
    margin: 0 0 8px;
    font-size: 30px;
}

header p {
    color: #8195aa;
    margin: 0;
}

.online {
    color: #5ce69b;
}

.offline {
    color: #ff7272;
}

.grid {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 15px;
}

.card,
.panel {
    background: #101d30;
    border: 1px solid #20324a;
    border-radius: 15px;
}

.card {
    padding: 20px;
}

.card-title {
    color: #8ca2ba;
    font-size: 13px;
}

.card-value {
    font-size: 25px;
    font-weight: bold;
    margin-top: 12px;
}

.card-value span {
    font-size: 12px;
    color: #8195aa;
}

.status {
    color: #63dca0;
    font-size: 12px;
    margin-top: 8px;
}

.content-grid {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 18px;
    margin-top: 20px;
}

.panel {
    padding: 22px;
    margin-top: 20px;
}

.panel h2 {
    margin-top: 0;
    font-size: 18px;
}

.large {
    min-height: 390px;
}

.building {
    height: 290px;
    background: linear-gradient(180deg, #152a42, #0a1524);
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.building-top {
    color: #62e4a0;
    font-size: 14px;
    margin-bottom: 20px;
}

.building-body {
    display: flex;
    gap: 25px;
    font-size: 80px;
    filter: drop-shadow(0 0 18px #245b51);
}

.building-ground {
    margin-top: 20px;
    color: #62e4a0;
}

.alert {
    padding: 14px;
    border-radius: 10px;
    margin-bottom: 12px;
    background: #172338;
}

.alert p {
    margin: 6px 0 0;
    color: #a6b7c8;
    font-size: 13px;
}

.high b {
    color: #ff7777;
}

.medium b {
    color: #ffc766;
}

.low b {
    color: #62e4a0;
}

.recommendation {
    background: #122b31;
    border: 1px solid #20554d;
    padding: 20px;
    border-radius: 12px;
}

.recommendation strong {
    color: #63e2a0;
}

.recommendation p {
    color: #a8bac9;
}

button {
    border: none;
    padding: 11px 18px;
    border-radius: 8px;
    background: #42d995;
    color: #06130e;
    font-weight: bold;
    cursor: pointer;
}

footer {
    text-align: center;
    color: #5e7187;
    padding: 30px;
    font-size: 12px;
}

@media (max-width: 1100px) {
    .grid {
        grid-template-columns: repeat(3, 1fr);
    }
}

@media (max-width: 750px) {
    .sidebar {
        display: none;
    }

    main {
        margin-left: 0;
        width: 100%;
    }

    .grid,
    .content-grid {
        grid-template-columns: 1fr;
    }
}
"@

"frontend\src\services\api.js" = @"
import axios from "axios";

const api = axios.create({
    baseURL: "http://127.0.0.1:8000/api"
});

export default api;
"@

"frontend\src\components\Navbar.jsx" = "export default function Navbar(){return <header>Navbar</header>}"
"frontend\src\components\Sidebar.jsx" = "export default function Sidebar(){return <aside>Sidebar</aside>}"
"frontend\src\components\KPIcard.jsx" = "export default function KPIcard(){return <div>KPI</div>}"
"frontend\src\components\AlertCard.jsx" = "export default function AlertCard(){return <div>Alert</div>}"
"frontend\src\components\AIInsight.jsx" = "export default function AIInsight(){return <div>AI Insight</div>}"
"frontend\src\components\Charts.jsx" = "export default function Charts(){return <div>Charts</div>}"
"frontend\src\components\Loading.jsx" = "export default function Loading(){return <div>Loading...</div>}"

"frontend\src\pages\Login.jsx" = "export default function Login(){return <h1>Login</h1>}"
"frontend\src\pages\Dashboard.jsx" = "export default function Dashboard(){return <h1>Dashboard</h1>}"
"frontend\src\pages\Energy.jsx" = "export default function Energy(){return <h1>Energy</h1>}"
"frontend\src\pages\Water.jsx" = "export default function Water(){return <h1>Water</h1>}"
"frontend\src\pages\Waste.jsx" = "export default function Waste(){return <h1>Waste</h1>}"
"frontend\src\pages\AirQuality.jsx" = "export default function AirQuality(){return <h1>Air Quality</h1>}"
"frontend\src\pages\Traffic.jsx" = "export default function Traffic(){return <h1>Traffic</h1>}"
"frontend\src\pages\Assets.jsx" = "export default function Assets(){return <h1>Assets</h1>}"
"frontend\src\pages\Risk.jsx" = "export default function Risk(){return <h1>Risk</h1>}"
"frontend\src\pages\AIInsights.jsx" = "export default function AIInsights(){return <h1>AI Insights</h1>}"
"frontend\src\pages\Simulation.jsx" = "export default function Simulation(){return <h1>Simulation</h1>}"
"frontend\src\pages\Facility3D.jsx" = "export default function Facility3D(){return <h1>3D Facility</h1>}"

"ai\prompts\recommendation_prompt.txt" = @"
You are a facility sustainability decision-support assistant.

Analyze:
- Energy
- Water
- Waste
- Air Quality
- Traffic
- Assets
- Risk

Generate:
1. Problem
2. Possible reason
3. Recommended action
4. Priority
5. Expected operational impact

Do not present outputs as official environmental, health or safety measurements.
"@

"docs\architecture.md" = @"
# Sustainable Facility AI

## Architecture

Data Sources -> Data Pipeline -> Database -> ML Engine -> FastAPI -> React Frontend -> AI Recommendations.

## AI Models

- Isolation Forest for anomaly detection
- Random Forest for energy prediction
- Random Forest for water prediction
- Random Forest for waste prediction
- Random Forest for facility risk

## Decision Support

Predictions and recommendations are intended for operational decision support.
"@

"docs\api.md" = @"
# API

GET /
GET /api/health
GET /api/dashboard
GET /api/energy
GET /api/water
GET /api/waste
GET /api/air-quality
GET /api/traffic
GET /api/assets
GET /api/anomalies
GET /api/forecast
GET /api/risk
GET /api/recommendations
GET /api/simulation
POST /api/auth/login
"@

"docs\ml_models.md" = @"
# ML Models

## Anomaly Detection
Isolation Forest.

## Forecasting / Prediction
Random Forest Regressor.

## Risk
Composite facility operational risk model.

## Evaluation
R2, MAE and RMSE should be reported for regression models.
"@

"ai\__init__.py" = ""
"ml\__init__.py" = ""
"data_pipeline\__init__.py" = ""
}

foreach ($entry in $files.GetEnumerator()) {
    $path = Join-Path $root $entry.Key
    $directory = Split-Path $path -Parent

    if (!(Test-Path $directory)) {
        New-Item -ItemType Directory -Path $directory -Force | Out-Null
    }

    Set-Content -Path $path -Value $entry.Value -Encoding UTF8
}

Write-Host ""
Write-Host "==============================================" -ForegroundColor Green
Write-Host " SUSTAINABLE FACILITY AI CREATED SUCCESSFULLY" -ForegroundColor Green
Write-Host "==============================================" -ForegroundColor Green
Write-Host ""

Write-Host "Installing Python packages..." -ForegroundColor Cyan
python -m pip install -r requirements.txt

Write-Host ""
Write-Host "Generating 10,000-row synthetic IoT dataset..." -ForegroundColor Cyan
python data_pipeline\generate_synthetic_data.py

Write-Host ""
Write-Host "Training anomaly model..." -ForegroundColor Cyan
python ml\training\train_anomaly.py

Write-Host ""
Write-Host "Training energy model..." -ForegroundColor Cyan
python ml\training\train_energy.py

Write-Host ""
Write-Host "Training water model..." -ForegroundColor Cyan
python ml\training\train_water.py

Write-Host ""
Write-Host "Training waste model..." -ForegroundColor Cyan
python ml\training\train_waste.py

Write-Host ""
Write-Host "Training risk model..." -ForegroundColor Cyan
python ml\training\train_risk.py

Write-Host ""
Write-Host "==============================================" -ForegroundColor Green
Write-Host " SETUP COMPLETED" -ForegroundColor Green
Write-Host "==============================================" -ForegroundColor Green
Write-Host ""
Write-Host "Backend command:" -ForegroundColor Yellow
Write-Host "python -m uvicorn backend.main:app --reload"
Write-Host ""
Write-Host "Frontend commands:" -ForegroundColor Yellow
Write-Host "cd frontend"
Write-Host "npm install"
Write-Host "npm run dev"
Write-Host ""
