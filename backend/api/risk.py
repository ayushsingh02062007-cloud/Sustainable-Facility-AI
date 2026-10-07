from fastapi import APIRouter
from pydantic import BaseModel
import joblib
from pathlib import Path

router = APIRouter(prefix="/api/risk", tags=["Risk"])

MODEL_PATH = Path(__file__).resolve().parents[2] / "ml" / "models" / "risk_model.pkl"
risk_model = joblib.load(MODEL_PATH)


class RiskPredictionInput(BaseModel):
    temperature: float
    humidity: float
    occupancy: float
    energy_kwh: float
    water_liters: float
    aqi: float
    waste_bin_level: float
    traffic_count: float
    asset_utilization: float


@router.get("")
def get_risk():
    return {
        "overall_risk": "LOW",
        "risk_score": 24,
        "energy_risk": 18,
        "water_risk": 21,
        "waste_risk": 16,
        "air_quality_risk": 28,
        "traffic_risk": 31,
        "asset_risk": 22,
        "status": "Stable",
        "monitoring": "Active",
        "risk_prediction": "Active",
        "recommendation_engine": "Active"
    }


@router.post("/predict")
def predict_risk(data: RiskPredictionInput):
    prediction = risk_model.predict([[
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

    score = round(float(prediction), 2)

    if score >= 70:
        level = "HIGH"
    elif score >= 40:
        level = "MEDIUM"
    else:
        level = "LOW"

    return {
        "risk_score": score,
        "overall_risk": level,
        "model": "RandomForestRegressor",
        "status": "Prediction successful"
    }
