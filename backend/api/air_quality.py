from fastapi import APIRouter

router = APIRouter(prefix="/api/air-quality", tags=["Air Quality"])


@router.get("")
def get_air_quality():
    return {
        "aqi": 76,
        "current_aqi": 76,
        "status": "Moderate",
        "pm25": 42,
        "pm10": 68,
        "temperature": 28.4,
        "humidity": 62,
        "monitoring": "Active",
        "anomaly_detection": "Active",
        "forecasting": "Active"
    }
