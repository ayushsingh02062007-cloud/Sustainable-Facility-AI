from fastapi import APIRouter
from pydantic import BaseModel
from backend.model_loader import load_model

router = APIRouter(prefix="/api/waste", tags=["Waste"])

waste_model = None


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
    global waste_model
    if waste_model is None:
        waste_model = load_model("waste_model.pkl")
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


