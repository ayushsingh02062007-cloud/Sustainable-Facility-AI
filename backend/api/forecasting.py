from fastapi import APIRouter

router = APIRouter(prefix="/api/forecast", tags=["Forecasting"])

@router.get("/")
def forecast():
    return {
        "next_24_hours_energy": 13.8,
        "next_day_water": 19.1,
        "confidence": 91
    }
