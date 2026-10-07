from fastapi import APIRouter

router = APIRouter(
    prefix="/api/simulation",
    tags=["Simulation"]
)


@router.get("")
def get_simulation():
    return {
        "status": "Ready",
        "baseline": {
            "energy": 14.2,
            "water": 18.4,
            "waste": 68,
            "aqi": 76
        },
        "optimized": {
            "energy": 11.8,
            "water": 15.6,
            "waste": 57,
            "aqi": 69
        },
        "improvement": {
            "energy_reduction": 16.9,
            "water_reduction": 15.2,
            "waste_reduction": 16.2,
            "aqi_improvement": 9.2
        },
        "recommendation": "Apply optimized HVAC scheduling, water monitoring and waste management strategies."
    }
