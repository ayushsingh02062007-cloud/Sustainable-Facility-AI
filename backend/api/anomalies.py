from fastapi import APIRouter
from pydantic import BaseModel
import joblib
from pathlib import Path

router = APIRouter(prefix="/api/anomalies", tags=["Anomalies"])

MODEL_PATH = Path(__file__).resolve().parents[2] / "ml" / "models" / "anomaly_model.pkl"
anomaly_model = joblib.load(MODEL_PATH)


class AnomalyPredictionInput(BaseModel):
    temperature: float
    humidity: float
    occupancy: float
    energy_kwh: float
    water_liters: float
    aqi: float
    waste_bin_level: float
    traffic_count: float
    asset_utilization: float


@router.get("/")
def anomalies():
    return {
        "total": 7,
        "high": 1,
        "medium": 3,
        "low": 3
    }


@router.post("/predict")
def predict_anomaly(data: AnomalyPredictionInput):
    prediction = anomaly_model.predict([[
        data.temperature,
        data.humidity,
        data.occupancy,
        data.energy_kwh,
        data.water_liters,
        data.aqi,
        data.waste_bin_level,
        data.traffic_count,
        data.asset_utilization
    ]])[0]

    is_anomaly = int(prediction) == -1

    return {
        "prediction": int(prediction),
        "anomaly": is_anomaly,
        "status": "Anomaly detected" if is_anomaly else "Normal",
        "model": "IsolationForest"
    }
