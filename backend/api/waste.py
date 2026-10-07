from fastapi import APIRouter
from pydantic import BaseModel
import joblib
from pathlib import Path

router = APIRouter(prefix="/api/waste", tags=["Waste"])

MODEL_PATH = Path(__file__).resolve().parents[2] / "ml" / "models" / "waste_model.pkl"
waste_model = joblib.load(MODEL_PATH)


class WastePredictionInput(BaseModel):
    occupancy: float
    energy_kwh: float
    water_liters: float
    temperature: float
    traffic_count: float


@router.get("")
def get_waste():
    return {
        "waste": 68,
        "current_waste": 68,
        "status": "Normal",
        "efficiency": "Good",
        "unit": "kg",
        "monitoring": "Active",
        "anomaly_detection": "Active",
        "forecasting": "Active"
    }


@router.post("/predict")
def predict_waste(data: WastePredictionInput):
    prediction = waste_model.predict([[
        data.occupancy,
        data.energy_kwh,
        data.water_liters,
        data.temperature,
        data.traffic_count
    ]])[0]

    return {
        "predicted_waste_kg": round(float(prediction), 2),
        "model": "RandomForestRegressor",
        "status": "Prediction successful"
    }
