from fastapi import APIRouter
from pydantic import BaseModel
import joblib
from pathlib import Path

router = APIRouter(prefix="/api/water", tags=["Water"])

MODEL_PATH = Path(__file__).resolve().parents[2] / "ml" / "models" / "water_model.pkl"
water_model = joblib.load(MODEL_PATH)


class WaterPredictionInput(BaseModel):
    temperature: float
    humidity: float
    occupancy: float
    energy_kwh: float
    aqi: float


@router.get("")
def get_water():
    return {
        "water": 18.4,
        "current_water": 18.4,
        "status": "Normal",
        "efficiency": "Good",
        "unit": "L",
        "monitoring": "Active",
        "anomaly_detection": "Active",
        "forecasting": "Active"
    }


@router.post("/predict")
def predict_water(data: WaterPredictionInput):
    prediction = water_model.predict([[
        data.temperature,
        data.humidity,
        data.occupancy,
        data.energy_kwh,
        data.aqi
    ]])[0]

    return {
        "predicted_water_liters": round(float(prediction), 2),
        "model": "RandomForestRegressor",
        "status": "Prediction successful"
    }
