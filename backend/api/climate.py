from fastapi import APIRouter

router = APIRouter(prefix="/api/climate", tags=["Climate"])


@router.get("")
def get_climate():
    return {
        "risk_level": "Moderate",
        "temperature": 28.4,
        "humidity": 62,
        "rainfall": 12.5,
        "heat_index": 31.2,
        "status": "Normal",
        "monitoring": "Active",
        "anomaly_detection": "Active",
        "forecasting": "Active"
    }
