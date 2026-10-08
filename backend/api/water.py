from fastapi import APIRouter
from pydantic import BaseModel
from backend.model_loader import load_model

router = APIRouter(prefix="/api/water", tags=["Water"])

water_model = load_model("water_model.pkl")


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


