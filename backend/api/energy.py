from fastapi import APIRouter
from pydantic import BaseModel
from backend.model_loader import load_model

router = APIRouter(prefix="/api/energy", tags=["Energy"])

energy_model = None


class EnergyPredictionInput(BaseModel):
    temperature: float
    humidity: float
    occupancy: float
    water_liters: float
    aqi: float
    traffic_count: float


@router.get("")
def get_energy():
    return {
        "energy": 14.2,
        "current_energy": 14.2,
        "status": "Normal",
        "efficiency": "Good",
        "unit": "kWh",
        "peak_load": 18.7,
        "solar_generation": 6.4,
        "grid_consumption": 7.8,
        "monitoring": "Active",
        "anomaly_detection": "Active",
        "forecasting": "Active"
    }


@router.post("/predict")
def predict_energy(data: EnergyPredictionInput):
    global energy_model
    if energy_model is None:
        energy_model = load_model("energy_model.pkl")
    prediction = energy_model.predict([[
        data.temperature,
        data.humidity,
        data.occupancy,
        data.water_liters,
        data.aqi,
        data.traffic_count
    ]])[0]

    return {
        "predicted_energy_kwh": round(float(prediction), 2),
        "model": "RandomForestRegressor",
        "status": "Prediction successful"
    }





