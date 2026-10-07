from fastapi import APIRouter

router = APIRouter(prefix="/api/dashboard", tags=["Dashboard"])

@router.get("/")
def get_dashboard():
    return {
        "sustainability_score": 82,
        "energy": 14.2,
        "water": 18.4,
        "aqi": 76,
        "waste": 68,
        "risk": "LOW"
    }
